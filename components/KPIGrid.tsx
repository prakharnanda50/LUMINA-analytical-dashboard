import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Activity, Percent } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { KPI } from '../types';

const kpiData: KPI[] = [
  { 
    id: '1', 
    label: 'Total Revenue', 
    value: '$2.4M', 
    change: 12.5, 
    trend: 'up', 
    description: 'vs last month',
    history: [1.8, 2.0, 1.9, 2.1, 2.2, 2.3, 2.4]
  },
  { 
    id: '2', 
    label: 'Active Users', 
    value: '45.2K', 
    change: 8.1, 
    trend: 'up', 
    description: 'vs last month',
    history: [40, 41, 41.5, 42, 44, 44.8, 45.2]
  },
  { 
    id: '3', 
    label: 'Churn Rate', 
    value: '2.1%', 
    change: -0.4, 
    trend: 'down', 
    description: 'vs last month (Good)',
    history: [2.8, 2.7, 2.5, 2.4, 2.2, 2.15, 2.1]
  },
  { 
    id: '4', 
    label: 'Avg. Session', 
    value: '4m 32s', 
    change: -1.2, 
    trend: 'down', 
    description: 'vs last month',
    history: [280, 275, 278, 270, 265, 272, 272] // in seconds
  },
];

export const KPIGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, idx) => {
        // Custom logic: For Churn (index 2), 'down' is actually green/positive. 
        // For others, 'up' is green.
        const isPositiveOutcome = idx === 2 ? kpi.trend === 'down' : kpi.trend === 'up';
        const color = isPositiveOutcome ? '#2ECC71' : '#E76F51';
        
        // Transform history for Recharts
        const sparkData = kpi.history.map((val, i) => ({ i, val }));

        return (
          <div key={kpi.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2 rounded-lg bg-slate-50">
                {idx === 0 && <DollarSign className="w-5 h-5 text-primary" />}
                {idx === 1 && <Users className="w-5 h-5 text-secondary" />}
                {idx === 2 && <Activity className="w-5 h-5 text-warning" />}
                {idx === 3 && <Percent className="w-5 h-5 text-primary" />}
              </div>
              <div className={`flex items-center space-x-1 text-xs font-semibold px-2 py-1 rounded-full ${
                isPositiveOutcome ? 'bg-green-50 text-success' : 'bg-red-50 text-error'
              }`}>
                {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{Math.abs(kpi.change)}%</span>
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-slate-500 text-sm font-medium mb-1">{kpi.label}</h3>
              <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
              <p className="text-xs text-slate-400 mt-2">{kpi.description}</p>
            </div>

            {/* Sparkline Overlay */}
            <div className="absolute bottom-4 right-4 w-24 h-12 opacity-50">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData}>
                  <Line 
                    type="monotone" 
                    dataKey="val" 
                    stroke={color} 
                    strokeWidth={2} 
                    dot={false} 
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
};
