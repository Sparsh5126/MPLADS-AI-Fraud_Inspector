import React, { useState } from 'react';
import { Users, CheckCircle2, AlertTriangle } from 'lucide-react';

const agencies = [
  { id: 'IA001', name: 'Dev Infra Pvt Ltd', works: 180, completed: 132, delayed: 8, rating: 'Good' },
  { id: 'IA002', name: 'UP Roads Corporation', works: 142, completed: 88, delayed: 24, rating: 'Average' },
  { id: 'IA003', name: 'City Construct Ltd', works: 96, completed: 42, delayed: 38, rating: 'Poor' },
  { id: 'IA004', name: 'GreenBuild Associates', works: 88, completed: 80, delayed: 4, rating: 'Good' },
  { id: 'IA005', name: 'LightTech Infra', works: 72, completed: 70, delayed: 0, rating: 'Excellent' },
  { id: 'IA006', name: 'Aqua Projects Ltd', works: 68, completed: 30, delayed: 18, rating: 'Average' },
  { id: 'IA007', name: 'HealthPro Infra', works: 52, completed: 14, delayed: 28, rating: 'Poor' },
  { id: 'IA008', name: 'EduBuild Co', works: 48, completed: 40, delayed: 2, rating: 'Good' },
];

const ratingStyles: Record<string, string> = { 'Excellent': 'bg-green-100 text-green-700', 'Good': 'bg-blue-100 text-blue-700', 'Average': 'bg-yellow-100 text-yellow-700', 'Poor': 'bg-red-100 text-red-700' };

export const MPAgencies: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = agencies.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Implementing Agencies</h1>
          <p className="text-sm text-gray-500 mt-0.5">Agencies executing Yatharth works in Meerut constituency</p>
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search agency..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none w-56" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Agencies', value: agencies.length, icon: Users, col: 'text-blue-600 bg-blue-50' },
          { label: 'Excellent/Good', value: agencies.filter(a => ['Excellent','Good'].includes(a.rating)).length, icon: CheckCircle2, col: 'text-green-600 bg-green-50' },
          { label: 'Poor Performance', value: agencies.filter(a => a.rating === 'Poor').length, icon: AlertTriangle, col: 'text-red-600 bg-red-50' },
          { label: 'Blacklisted', value: 0, icon: AlertTriangle, col: 'text-gray-600 bg-gray-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.col.split(' ')[1]}`}>
              <s.icon size={18} className={s.col.split(' ')[0]} />
            </div>
            <div><p className="text-xs text-gray-500">{s.label}</p><p className="text-xl font-extrabold text-gray-900">{s.value}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['ID', 'Agency Name', 'Total Works', 'Completed', 'Delayed', 'Completion Rate', 'Performance'].map(h => (
                <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{a.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{a.name}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{a.works}</td>
                  <td className="px-4 py-3 text-sm text-green-700 font-semibold">{a.completed}</td>
                  <td className="px-4 py-3 text-sm text-red-600 font-semibold">{a.delayed}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 bg-gray-100 rounded-full w-16">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(a.completed / a.works) * 100}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{Math.round((a.completed / a.works) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ratingStyles[a.rating]}`}>{a.rating}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
