import React, { useMemo } from 'react';
import { KPIGrid } from './KPIGrid';
import { ChartsSection } from './ChartsSection';
import { DataTable } from './DataTable';
import { MarketInsights } from './MarketInsights';
import { DocumentAnalyzer } from './DocumentAnalyzer';
import { AnomalyPanel } from './AnomalyPanel';

// Move data here to share with Anomaly Detector
const trendData = [
  { name: 'Jan', value1: 4000, value2: 2400 },
  { name: 'Feb', value1: 3000, value2: 1398 },
  { name: 'Mar', value1: 2000, value2: 9800 },
  { name: 'Apr', value1: 2780, value2: 3908 },
  { name: 'May', value1: 1890, value2: 4800 },
  { name: 'Jun', value1: 2390, value2: 3800 },
  { name: 'Jul', value1: 3490, value2: 4300 },
];

export const Dashboard: React.FC = () => {
  // Aggregate data for the anomaly detector to scan
  const dataForAnalysis = useMemo(() => {
    return {
      revenueTrend: trendData,
      reportContext: "Monthly Revenue Performance (Current Year vs Last Year)"
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Header Section inside Dashboard content */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Overview</h1>
          <p className="text-slate-500">Welcome back, Jane. Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
            Oct 24, 2023 - Today
          </span>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <KPIGrid />
      
      <ChartsSection trendData={trendData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable />
        </div>
        <div className="space-y-6">
          {/* AI Tools Column */}
          <div className="h-[300px]">
             <AnomalyPanel data={dataForAnalysis} />
          </div>
          <div className="h-[400px]">
             <MarketInsights />
          </div>
          <div className="h-[350px]">
             <DocumentAnalyzer />
          </div>
        </div>
      </div>
    </div>
  );
};
