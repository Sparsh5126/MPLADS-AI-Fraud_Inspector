import React, { useState } from 'react';
import { Search, Filter, Download, FileText, CheckCircle2, Clock, AlertTriangle, Eye } from 'lucide-react';

const works = [
  { id: 'W1042', title: 'Community hall construction', village: 'Brahmpuri', ia: 'Dev Infra Pvt Ltd', status: 'Completed', risk: 'Low', cost: '₹24.8 L', progress: 100 },
  { id: 'W1038', title: 'Primary road widening', village: 'Kharkhoda', ia: 'UP Roads Corp', status: 'In Progress', risk: 'Medium', cost: '₹38.5 L', progress: 62 },
  { id: 'W1029', title: 'Drainage system phase-2', village: 'Sardhana', ia: 'City Construct Ltd', status: 'Delayed', risk: 'High', cost: '₹41.2 L', progress: 28 },
  { id: 'W1021', title: 'Anganwadi building', village: 'Daurala', ia: 'GreenBuild Assoc', status: 'In Progress', risk: 'Low', cost: '₹18.5 L', progress: 78 },
  { id: 'W1015', title: 'Solar street lights (Phase 1)', village: 'Mawana', ia: 'LightTech Infra', status: 'Completed', risk: 'Low', cost: '₹12.6 L', progress: 100 },
  { id: 'W1008', title: 'Water supply pipeline', village: 'Hastinapur', ia: 'Aqua Projects Ltd', status: 'In Progress', risk: 'Medium', cost: '₹29.3 L', progress: 44 },
  { id: 'W1002', title: 'School building renovation', village: 'Kithor', ia: 'EduBuild Co', status: 'Not Started', risk: 'Medium', cost: '₹22.1 L', progress: 0 },
  { id: 'W0994', title: 'Community health center', village: 'Meerut City', ia: 'HealthPro Infra', status: 'Delayed', risk: 'Critical', cost: '₹54.0 L', progress: 15 },
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

export const DistrictWorks: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = works.filter(w => {
    const q = search.toLowerCase();
    const matchQ = !q || w.id.toLowerCase().includes(q) || w.title.toLowerCase().includes(q) || w.village.toLowerCase().includes(q);
    const matchS = statusFilter === 'All' || w.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Works & Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">All MPLADS works in Meerut district</p>
        </div>
        <button className="flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors text-gray-700">
          <Download size={15} /> Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search work ID, village, title..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none">
          {['All', 'Completed', 'In Progress', 'Delayed', 'Not Started'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Work ID', 'Title', 'Village', 'Implementing Agency', 'Cost', 'Progress', 'Risk', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-blue-600">{w.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium max-w-[180px] truncate">{w.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{w.village}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-[150px] truncate">{w.ia}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{w.cost}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 bg-gray-100 rounded-full flex-1" style={{ minWidth: 60 }}>
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${w.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{w.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${riskStyles[w.risk]}`}>{w.risk}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusStyles[w.status]}`}>{w.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
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
          <div className="flex items-center gap-1">
            <FileText size={13} className="text-green-600" /> {works.filter(w => w.status === 'Completed').length} completed
            <span className="ml-3"><Clock size={13} className="inline text-blue-500 mr-1" />{works.filter(w => w.status === 'In Progress').length} in progress</span>
            <span className="ml-3"><AlertTriangle size={13} className="inline text-red-500 mr-1" />{works.filter(w => w.status === 'Delayed').length} delayed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
