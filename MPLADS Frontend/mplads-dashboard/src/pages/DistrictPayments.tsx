import React, { useState } from 'react';
import { IndianRupee, CheckCircle2, Clock, AlertTriangle, Download } from 'lucide-react';

const payments = [
  { id: 'PAY-2024-0841', workId: 'W1042', title: 'Community hall construction', ia: 'Dev Infra Pvt Ltd', amount: '₹12.4 L', date: '12 Jun 2025', status: 'Released', installment: '2nd' },
  { id: 'PAY-2024-0829', workId: 'W1038', title: 'Primary road widening', ia: 'UP Roads Corp', amount: '₹9.8 L', date: '08 Jun 2025', status: 'Released', installment: '1st' },
  { id: 'PAY-2024-0817', workId: 'W1029', title: 'Drainage system phase-2', ia: 'City Construct Ltd', amount: '₹6.2 L', date: '01 Jun 2025', status: 'Pending', installment: '1st' },
  { id: 'PAY-2024-0804', workId: 'W1021', title: 'Anganwadi building', ia: 'GreenBuild Assoc', amount: '₹5.6 L', date: '28 May 2025', status: 'Released', installment: '3rd' },
  { id: 'PAY-2024-0792', workId: 'W1015', title: 'Solar street lights', ia: 'LightTech Infra', amount: '₹8.0 L', date: '22 May 2025', status: 'Released', installment: 'Final' },
  { id: 'PAY-2024-0781', workId: 'W1008', title: 'Water supply pipeline', ia: 'Aqua Projects Ltd', amount: '₹11.2 L', date: '18 May 2025', status: 'On Hold', installment: '2nd' },
  { id: 'PAY-2024-0769', workId: 'W0994', title: 'Community health center', ia: 'HealthPro Infra', amount: '₹14.8 L', date: '10 May 2025', status: 'Pending', installment: '1st' },
];

const statusStyles: Record<string, string> = {
  'Released':  'bg-green-100 text-green-700 border-green-200',
  'Pending':   'bg-yellow-100 text-yellow-700 border-yellow-200',
  'On Hold':   'bg-red-100 text-red-700 border-red-200',
};

export const DistrictPayments: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const filtered = payments.filter(p => statusFilter === 'All' || p.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500 mt-0.5">Fund disbursement and payment tracking — Meerut district</p>
        </div>
        <button className="flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700">
          <Download size={15} /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Total Released', value: '₹51.2 Cr', icon: IndianRupee, color: 'text-green-600 bg-green-50' },
          { label: 'Pending Release', value: '₹16.8 Cr', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'On Hold', value: '₹4.2 Cr', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color.split(' ')[1]}`}>
              <s.icon size={18} className={s.color.split(' ')[0]} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-lg font-extrabold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none">
          {['All', 'Released', 'Pending', 'On Hold'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Payment ID', 'Work ID', 'Work Title', 'Implementing Agency', 'Amount', 'Installment', 'Date', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.id}</td>
                  <td className="px-4 py-3 font-mono text-sm text-blue-600 font-semibold">{p.workId}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 max-w-[160px] truncate">{p.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-[140px] truncate">{p.ia}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{p.amount}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.installment}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusStyles[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
