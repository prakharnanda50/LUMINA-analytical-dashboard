import React from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { ChartDataPoint } from '../types';

interface ChartsSectionProps {
  trendData: ChartDataPoint[];
}

const distributionData = [
  { name: 'Enterprise', value: 400 },
  { name: 'SMB', value: 300 },
  { name: 'Startup', value: 300 },
  { name: 'Indie', value: 200 },
];

export const ChartsSection: React.FC<ChartsSectionProps> = ({ trendData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Main Trend Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Revenue Trajectory</h3>
          <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1 outline-none focus:border-primary">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F3C88" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#1F3C88" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#1E293B' }}
              />
              <Area type="monotone" dataKey="value1" stroke="#1F3C88" strokeWidth={3} fillOpacity={1} fill="url(#colorValue1)" name="Current Year" />
              <Area type="monotone" dataKey="value2" stroke="#2EC4B6" strokeWidth={2} strokeDasharray="4 4" fill="none" name="Previous Year" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Bar Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Customer Segments</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
               <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
               <XAxis type="number" hide />
               <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
               <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
               <Bar dataKey="value" fill="#1F3C88" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
