import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, BrainCircuit, Loader2, Info } from 'lucide-react';
import { detectDataAnomalies } from '../services/geminiService';
import { Anomaly } from '../types';

interface AnomalyPanelProps {
  data: any;
}

export const AnomalyPanel: React.FC<AnomalyPanelProps> = ({ data }) => {
  const [anomalies, setAnomalies] = useState<Anomaly[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    const results = await detectDataAnomalies(data);
    setAnomalies(results);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-purple-100 p-2 rounded-lg">
            <BrainCircuit className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Anomaly Detection</h3>
        </div>
        {!anomalies && !loading && (
          <button 
            onClick={handleScan}
            className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-full hover:bg-purple-700 transition-colors shadow-sm font-medium"
          >
            Run AI Audit
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center h-40 space-y-3">
            <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
            <span className="text-sm text-slate-500">Scanning data patterns...</span>
          </div>
        )}

        {!loading && !anomalies && (
          <div className="text-sm text-slate-500 leading-relaxed">
            Click 'Run AI Audit' to let Gemini scan your revenue and transaction data for outliers, unexpected spikes, or drops that require attention.
          </div>
        )}

        {!loading && anomalies && anomalies.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-center">
             <CheckCircle className="w-10 h-10 text-success mb-2" />
             <p className="font-semibold text-slate-800">All Systems Normal</p>
             <p className="text-xs text-slate-400">No significant anomalies detected in current dataset.</p>
             <button onClick={handleScan} className="mt-4 text-xs text-primary hover:underline">Scan Again</button>
          </div>
        )}

        {!loading && anomalies && anomalies.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-bold uppercase text-slate-400">{anomalies.length} Issues Found</span>
               <button onClick={handleScan} className="text-xs text-primary hover:underline">Re-scan</button>
            </div>
            {anomalies.map((anomaly, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg border-l-4 text-sm ${
                  anomaly.severity === 'critical' ? 'bg-red-50 border-red-500' :
                  anomaly.severity === 'warning' ? 'bg-amber-50 border-amber-500' :
                  'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold text-xs uppercase px-1.5 py-0.5 rounded ${
                     anomaly.severity === 'critical' ? 'bg-red-200 text-red-800' :
                     anomaly.severity === 'warning' ? 'bg-amber-200 text-amber-800' :
                     'bg-blue-200 text-blue-800'
                  }`}>
                    {anomaly.severity}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{anomaly.period}</span>
                </div>
                <div className="flex items-start space-x-2">
                   {anomaly.severity === 'critical' ? <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> : <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />}
                   <p className="text-slate-700">{anomaly.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
