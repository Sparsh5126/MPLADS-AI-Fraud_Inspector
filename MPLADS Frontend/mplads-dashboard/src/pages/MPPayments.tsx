import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Clock, AlertTriangle, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const payments = [
  { id: 'PAY-MP-0041', workId: 'W1042', title: 'Community hall construction', ia: 'Dev Infra Pvt Ltd', amount: '₹12.4 L', date: '12 Jun 2025', status: 'Released', year: 2025 },
  { id: 'PAY-MP-0039', workId: 'W0987', title: 'Primary school building', ia: 'EduBuild Co', amount: '₹9.8 L', date: '08 Jun 2025', status: 'Released', year: 2025 },
  { id: 'PAY-MP-0037', workId: 'W0931', title: 'Rural road development', ia: 'UP Roads Corp', amount: '₹6.2 L', date: '01 Jun 2025', status: 'Pending', year: 2025 },
  { id: 'PAY-MP-0034', workId: 'W1038', title: 'Primary road widening', ia: 'UP Roads Corp', amount: '₹8.5 L', date: '22 May 2025', status: 'Released', year: 2025 },
  { id: 'PAY-MP-0028', workId: 'W0876', title: 'Drinking water facility', ia: 'Aqua Projects Ltd', amount: '₹11.2 L', date: '10 May 2025', status: 'On Hold', year: 2025 },
  { id: 'PAY-MP-0021', workId: 'W0763', title: 'Street light installation', ia: 'LightTech Infra', amount: '₹8.0 L', date: '28 Apr 2025', status: 'Released', year: 2025 },
];

const yearlyData = [
  { year: '2021', released: 3.2, pending: 0.8 },
  { year: '2022', released: 4.1, pending: 1.2 },
  { year: '2023', released: 3.8, pending: 0.9 },
  { year: '2024', released: 4.5, pending: 1.5 },
  { year: '2025', released: 2.8, pending: 2.2 },
];

const statusStyles: Record<string, string> = { 'Released': 'bg-green-100 text-green-700 border-green-200', 'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200', 'On Hold': 'bg-red-100 text-red-700 border-red-200' };

export const MPPayments: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const filtered = payments.filter(p => statusFilter === 'All' || p.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500 mt-0.5">Yatharth fund disbursement for Meerut constituency</p>
        </div>
        <button className="flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700">
          <Download size={15} /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Funds', value: '₹25.0 Cr', icon: IndianRupee, col: 'text-blue-600 bg-blue-50' },
          { label: 'Released', value: '₹18.4 Cr', icon: TrendingUp, col: 'text-green-600 bg-green-50' },
          { label: 'Pending', value: '₹4.8 Cr', icon: Clock, col: 'text-yellow-600 bg-yellow-50' },
          { label: 'On Hold', value: '₹1.8 Cr', icon: AlertTriangle, col: 'text-red-600 bg-red-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.col.split(' ')[1]}`}>
              <s.icon size={18} className={s.col.split(' ')[0]} />
            </div>
            <div><p className="text-xs text-gray-500">{s.label}</p><p className="text-lg font-extrabold text-gray-900">{s.value}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h2 className="text-sm font-bold text-gray-900 mb-3">Yearly Fund Utilisation (₹ Cr)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={yearlyData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="released" name="Released (₹Cr)" fill="#22C55E" radius={[3,3,0,0]} />
            <Bar dataKey="pending"  name="Pending (₹Cr)"  fill="#EAB308" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-3">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none">
          {['All', 'Released', 'Pending', 'On Hold'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Payment ID', 'Work ID', 'Title', 'IA', 'Amount', 'Date', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.id}</td>
                  <td className="px-4 py-3 font-mono text-sm text-blue-600 font-semibold">{p.workId}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 max-w-[160px] truncate">{p.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-[140px] truncate">{p.ia}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{p.amount}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.date}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusStyles[p.status]}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
