import React, { useState } from 'react';
import { Users, AlertTriangle, CheckCircle2, TrendingDown } from 'lucide-react';

const agencies = [
  { id: 'IA001', name: 'Dev Infra Pvt Ltd', works: 48, completed: 30, delayed: 3, delayRate: '6.3%', rating: 'Good', contact: 'Ravi Kumar' },
  { id: 'IA002', name: 'UP Roads Corporation', works: 35, completed: 18, delayed: 8, delayRate: '22.9%', rating: 'Average', contact: 'Suresh Singh' },
  { id: 'IA003', name: 'City Construct Ltd', works: 28, completed: 10, delayed: 12, delayRate: '42.9%', rating: 'Poor', contact: 'Dinesh Sharma' },
  { id: 'IA004', name: 'GreenBuild Associates', works: 22, completed: 20, delayed: 1, delayRate: '4.5%', rating: 'Good', contact: 'Priya Verma' },
  { id: 'IA005', name: 'LightTech Infra', works: 18, completed: 16, delayed: 0, delayRate: '0%', rating: 'Excellent', contact: 'Anil Gupta' },
  { id: 'IA006', name: 'Aqua Projects Ltd', works: 15, completed: 6, delayed: 4, delayRate: '26.7%', rating: 'Average', contact: 'Meena Rani' },
  { id: 'IA007', name: 'HealthPro Infra', works: 12, completed: 3, delayed: 6, delayRate: '50.0%', rating: 'Poor', contact: 'Karan Mehta' },
];

const ratingStyles: Record<string, string> = {
  'Excellent': 'bg-green-100 text-green-700',
  'Good':      'bg-blue-100 text-blue-700',
  'Average':   'bg-yellow-100 text-yellow-700',
  'Poor':      'bg-red-100 text-red-700',
};

export const DistrictAgencies: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = agencies.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Implementing Agencies</h1>
          <p className="text-sm text-gray-500 mt-0.5">All registered agencies for Meerut district</p>
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search agency..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-56" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Agencies', value: agencies.length, icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Excellent/Good', value: agencies.filter(a => ['Excellent','Good'].includes(a.rating)).length, icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
          { label: 'Average', value: agencies.filter(a => a.rating === 'Average').length, icon: TrendingDown, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Poor', value: agencies.filter(a => a.rating === 'Poor').length, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color.split(' ')[1]}`}>
              <s.icon size={18} className={s.color.split(' ')[0]} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['ID', 'Agency Name', 'Total Works', 'Completed', 'Delayed', 'Delay Rate', 'Performance', 'Contact'].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{a.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{a.name}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{a.works}</td>
                  <td className="px-4 py-3 text-sm text-green-700 font-semibold">{a.completed}</td>
                  <td className="px-4 py-3 text-sm text-red-600 font-semibold">{a.delayed}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.delayRate}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ratingStyles[a.rating]}`}>{a.rating}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
