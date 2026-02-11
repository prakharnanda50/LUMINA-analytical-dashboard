import React, { useState } from 'react';
import { FileText, Download, Clock, CheckCircle, Loader2, Plus, Filter } from 'lucide-react';

const initialReports = [
  { id: 1, name: 'Q3 2023 Financial Summary', type: 'PDF', date: 'Oct 01, 2023', size: '2.4 MB', status: 'Ready' },
  { id: 2, name: 'User Acquisition Deep Dive', type: 'CSV', date: 'Sep 28, 2023', size: '145 KB', status: 'Ready' },
  { id: 3, name: 'Churn Analysis - September', type: 'PDF', date: 'Sep 15, 2023', size: '1.8 MB', status: 'Ready' },
  { id: 4, name: 'Product Usage Heatmap', type: 'XLSX', date: 'Sep 10, 2023', size: '3.2 MB', status: 'Ready' },
  { id: 5, name: 'Executive Overview - August', type: 'PDF', date: 'Aug 31, 2023', size: '2.1 MB', status: 'Ready' },
];

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState(initialReports);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        name: `Custom Report - ${new Date().toLocaleDateString()}`,
        type: 'PDF',
        date: 'Just now',
        size: 'Pending',
        status: 'Processing'
      };
      setReports([newReport, ...reports]);
      setGenerating(false);

      // Simulate completion
      setTimeout(() => {
        setReports(prev => prev.map(r => r.id === newReport.id ? { ...r, status: 'Ready', size: '1.2 MB' } : r));
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports Center</h1>
          <p className="text-slate-500">Access, generate, and manage your analytics exports.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button 
            onClick={handleGenerate}
            disabled={generating}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors flex items-center disabled:opacity-70"
          >
            {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Generate New Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Report Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date Generated</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 text-primary rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-slate-700">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div className="flex items-center">
                       <Clock className="w-3 h-3 mr-1.5 opacity-70" />
                       {report.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{report.size}</td>
                  <td className="px-6 py-4">
                    {report.status === 'Ready' ? (
                      <span className="inline-flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Processing
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${report.status !== 'Ready' ? 'opacity-30 cursor-not-allowed' : 'text-slate-500 hover:text-primary'}`}
                      disabled={report.status !== 'Ready'}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {reports.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            No reports found. Generate one to get started.
          </div>
        )}
      </div>
    </div>
  );
};
