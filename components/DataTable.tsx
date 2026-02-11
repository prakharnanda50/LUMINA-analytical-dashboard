import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, CreditCard, User } from 'lucide-react';

const tableData = [
  { 
    id: '#TR-8832', 
    client: 'Acme Corp', 
    amount: '$12,450', 
    status: 'Completed', 
    date: 'Oct 24, 2023',
    details: { items: 4, plan: 'Enterprise', contact: 'alice@acme.com' }
  },
  { 
    id: '#TR-8833', 
    client: 'Stark Ind', 
    amount: '$8,200', 
    status: 'Pending', 
    date: 'Oct 24, 2023',
    details: { items: 2, plan: 'Professional', contact: 'tony@stark.com' }
  },
  { 
    id: '#TR-8834', 
    client: 'Wayne Ent', 
    amount: '$45,000', 
    status: 'Completed', 
    date: 'Oct 23, 2023',
    details: { items: 12, plan: 'Enterprise Plus', contact: 'bruce@wayne.com' }
  },
  { 
    id: '#TR-8835', 
    client: 'Cyberdyne', 
    amount: '$3,150', 
    status: 'Failed', 
    date: 'Oct 22, 2023',
    details: { items: 1, plan: 'Starter', contact: 'miles@cyberdyne.net' }
  },
  { 
    id: '#TR-8836', 
    client: 'Massive Dynamic', 
    amount: '$18,900', 
    status: 'Processing', 
    date: 'Oct 22, 2023',
    details: { items: 6, plan: 'Professional', contact: 'nina@massive.com' }
  },
];

export const DataTable: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
        <button className="text-sm text-primary font-medium hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-3 w-4"></th>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tableData.map((row) => (
              <React.Fragment key={row.id}>
                <tr 
                  onClick={() => toggleRow(row.id)}
                  className={`group cursor-pointer transition-colors text-sm text-slate-700 ${
                    expandedRow === row.id ? 'bg-slate-50' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="px-6 py-4 text-slate-400">
                    {expandedRow === row.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{row.id}</td>
                  <td className="px-6 py-4 font-semibold">{row.client}</td>
                  <td className="px-6 py-4 text-slate-500">{row.date}</td>
                  <td className="px-6 py-4 font-bold">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      row.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      row.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
                {expandedRow === row.id && (
                  <tr className="bg-slate-50/50">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Transaction Breakdown</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-50 p-2 rounded-lg">
                              <Package className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Items Purchased</p>
                              <p className="text-sm font-semibold text-slate-800">{row.details.items} Units</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-50 p-2 rounded-lg">
                              <CreditCard className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Plan Type</p>
                              <p className="text-sm font-semibold text-slate-800">{row.details.plan}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-50 p-2 rounded-lg">
                              <User className="w-4 h-4 text-success" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Contact</p>
                              <p className="text-sm font-semibold text-slate-800">{row.details.contact}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                           <button className="text-xs font-medium text-primary hover:text-primary/80">View Full Invoice &rarr;</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
