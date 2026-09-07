import React, { useState } from 'react';
import { Search, Filter, FileText, AlertTriangle, CheckCircle2, Clock, Download } from 'lucide-react';

const worksData = [
  { id: 'W1042', name: 'Concrete Road Construction – Meerut Bypass', district: 'Meerut', mp: 'Rajendra Agarwal', amount: '₹48.2L', status: 'In Progress', risk: 'Critical', completion: 62 },
  { id: 'W0871', name: 'Primary School Renovation – Saharanpur Block 4', district: 'Saharanpur', mp: 'Imran Masood', amount: '₹22.5L', status: 'Completed', risk: 'High', completion: 100 },
  { id: 'W0931', name: 'Drainage Construction – Ghaziabad Ward 12', district: 'Ghaziabad', mp: 'Gen. V.K. Singh', amount: '₹35.0L', status: 'In Progress', risk: 'High', completion: 44 },
  { id: 'W0678', name: 'Community Hall – Lucknow Zone B', district: 'Lucknow', mp: 'Rajnath Singh', amount: '₹60.0L', status: 'Delayed', risk: 'Medium', completion: 28 },
  { id: 'W0551', name: 'Tube Well Installation – Varanasi Rural', district: 'Varanasi', mp: 'Narendra Modi', amount: '₹12.8L', status: 'Delayed', risk: 'Medium', completion: 50 },
  { id: 'W0445', name: 'Solar Street Lights – Kanpur Phase 2', district: 'Kanpur Nagar', mp: 'Satyadev Pachauri', amount: '₹28.4L', status: 'Completed', risk: 'Low', completion: 100 },
  { id: 'W0322', name: 'Footpath & Drain – Agra Heritage Zone', district: 'Agra', mp: 'S.P. Singh Baghel', amount: '₹19.6L', status: 'Completed', risk: 'Low', completion: 100 },
  { id: 'W0218', name: 'Anganwadi Center – Baghpat Block 2', district: 'Baghpat', mp: 'Satyapal Singh', amount: '₹15.3L', status: 'In Progress', risk: 'Critical', completion: 30 },
];

const riskColor: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700',
  High: 'bg-orange-100 text-orange-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

const statusIcon: Record<string, React.ReactNode> = {
  'In Progress': <Clock size={13} className="text-blue-500" />,
  'Completed': <CheckCircle2 size={13} className="text-green-500" />,
  'Delayed': <AlertTriangle size={13} className="text-amber-500" />,
};

export const StateWorks: React.FC = () => {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = worksData.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase()) || w.district.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === 'All' || w.risk === riskFilter;
    const matchStatus = statusFilter === 'All' || w.status === statusFilter;
    return matchSearch && matchRisk && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Works & Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Browse and monitor all MPLADS works in Uttar Pradesh</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={15} /> Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Works', value: '12,842', color: 'text-blue-600', bg: '#EFF6FF', icon: <FileText size={18} className="text-blue-600" /> },
          { label: 'In Progress', value: '4,950', color: 'text-blue-500', bg: '#EFF6FF', icon: <Clock size={18} className="text-blue-500" /> },
          { label: 'Completed', value: '7,892', color: 'text-green-600', bg: '#F0FDF4', icon: <CheckCircle2 size={18} className="text-green-600" /> },
          { label: 'Delayed', value: '487', color: 'text-amber-600', bg: '#FFFBEB', icon: <AlertTriangle size={18} className="text-amber-600" /> },
        ].map(c => (
          <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.bg }}>{c.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{c.label}</p>
              <p className={`text-xl font-bold ${c.color}`}>{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search works, district, or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter size={14} />
            <span className="font-medium">Filters:</span>
          </div>
          <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400">
            <option value="All">All Risk Levels</option>
            <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400">
            <option value="All">All Statuses</option>
            <option>In Progress</option><option>Completed</option><option>Delayed</option>
          </select>
        </div>
      </div>

      {/* Works Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Work ID', 'Work Name', 'District', 'MP', 'Amount', 'Status', 'Risk', 'Completion'].map(h => (
                  <th key={h} className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                  <td className="py-3 px-4 font-mono text-blue-600 font-medium text-xs">{w.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800 max-w-[220px] truncate">{w.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{w.district}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{w.mp}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-800">{w.amount}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                      {statusIcon[w.status]} {w.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${riskColor[w.risk]}`}>{w.risk}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden" style={{ minWidth: 60 }}>
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${w.completion}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{w.completion}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No works found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
