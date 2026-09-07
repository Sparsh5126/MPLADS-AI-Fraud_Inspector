import React, { useState } from 'react';
import { Search, Download, Eye, TrendingUp } from 'lucide-react';

const works = [
  { id: 'W1042', title: 'Community hall construction', village: 'Brahmpuri', district: 'Meerut', ia: 'Dev Infra Pvt Ltd', status: 'Completed', risk: 'Low', cost: '₹24.8 L', progress: 100, year: 2024 },
  { id: 'W1038', title: 'Primary road widening', village: 'Kharkhoda', district: 'Meerut', ia: 'UP Roads Corp', status: 'In Progress', risk: 'Medium', cost: '₹38.5 L', progress: 62, year: 2024 },
  { id: 'W0987', title: 'Primary school building', village: 'Sardhana', district: 'Meerut', ia: 'EduBuild Co', status: 'In Progress', risk: 'Low', cost: '₹31.2 L', progress: 55, year: 2024 },
  { id: 'W0931', title: 'Rural road development', village: 'Daurala', district: 'Meerut', ia: 'UP Roads Corp', status: 'In Progress', risk: 'Medium', cost: '₹28.5 L', progress: 40, year: 2023 },
  { id: 'W0876', title: 'Drinking water facility', village: 'Mawana', district: 'Meerut', ia: 'Aqua Projects Ltd', status: 'Delayed', risk: 'High', cost: '₹22.1 L', progress: 20, year: 2023 },
  { id: 'W0763', title: 'Street light installation', village: 'Hastinapur', district: 'Meerut', ia: 'LightTech Infra', status: 'Completed', risk: 'Low', cost: '₹12.6 L', progress: 100, year: 2023 },
  { id: 'W0712', title: 'Anganwadi center', village: 'Kithor', district: 'Meerut', ia: 'GreenBuild Assoc', status: 'Completed', risk: 'Low', cost: '₹19.6 L', progress: 100, year: 2022 },
  { id: 'W0648', title: 'Community health center', village: 'Mawana', district: 'Meerut', ia: 'HealthPro Infra', status: 'Delayed', risk: 'Critical', cost: '₹54.0 L', progress: 15, year: 2022 },
];

const statusStyles: Record<string, string> = {
  'Completed':   'bg-green-100 text-green-700 border-green-200',
  'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
  'Delayed':     'bg-red-100 text-red-700 border-red-200',
  'Not Started': 'bg-gray-100 text-gray-600 border-gray-200',
};
const riskStyles: Record<string, string> = {
  'Critical': 'bg-red-100 text-red-700',
  'High':     'bg-orange-100 text-orange-700',
  'Medium':   'bg-yellow-100 text-yellow-700',
  'Low':      'bg-green-100 text-green-700',
};

export const MPWorks: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  const filtered = works.filter(w => {
    const q = search.toLowerCase();
    const matchQ = !q || w.id.toLowerCase().includes(q) || w.title.toLowerCase().includes(q) || w.village.toLowerCase().includes(q);
    const matchS = statusFilter === 'All' || w.status === statusFilter;
    const matchY = yearFilter === 'All' || w.year === Number(yearFilter);
    return matchQ && matchS && matchY;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Yatharth Works</h1>
          <p className="text-sm text-gray-500 mt-0.5">All sanctioned works — Meerut constituency</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700">
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search work ID, village, title..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none">
          {['All', 'Completed', 'In Progress', 'Delayed'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none">
          {['All', '2024', '2023', '2022'].map(y => <option key={y}>{y}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Work ID', 'Title', 'Village', 'District', 'IA', 'Cost', 'Progress', 'Risk', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-blue-600">{w.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium max-w-[160px] truncate">{w.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{w.village}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{w.district}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[120px] truncate">{w.ia}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{w.cost}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 bg-gray-100 rounded-full" style={{ width: 56 }}>
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${w.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{w.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${riskStyles[w.risk]}`}>{w.risk}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusStyles[w.status]}`}>{w.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-blue-600">
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500">
          <span>Showing {filtered.length} of {works.length} works</span>
          <div className="flex items-center gap-3">
            <span className="text-green-600 font-medium">{works.filter(w => w.status === 'Completed').length} Completed</span>
            <span className="text-blue-600 font-medium">{works.filter(w => w.status === 'In Progress').length} In Progress</span>
            <span className="text-red-600 font-medium">{works.filter(w => w.status === 'Delayed').length} Delayed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
