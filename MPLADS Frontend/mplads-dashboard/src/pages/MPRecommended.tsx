import React, { useState } from 'react';
import { BookMarked, Eye, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const recommended = [
  { id: 'RW001', title: 'Community health center', location: 'Mawana', cost: '₹48.5 L', status: 'Under Review', priority: 'High', submittedOn: '01 Jun 2025' },
  { id: 'RW002', title: 'Library building', location: 'Sardhana', cost: '₹32.0 L', status: 'Pending', priority: 'Medium', submittedOn: '10 May 2025' },
  { id: 'RW003', title: 'Rural road (Phase 2)', location: 'Daurala', cost: '₹28.7 L', status: 'Pending', priority: 'Medium', submittedOn: '05 May 2025' },
  { id: 'RW004', title: 'Drinking water facility', location: 'Hastinapur', cost: '₹21.4 L', status: 'Approved', priority: 'High', submittedOn: '28 Apr 2025' },
  { id: 'RW005', title: 'Anganwadi center', location: 'Kithor', cost: '₹19.6 L', status: 'Under Review', priority: 'Medium', submittedOn: '22 Apr 2025' },
  { id: 'RW006', title: 'Solar street lights', location: 'Meerut', cost: '₹14.2 L', status: 'Approved', priority: 'Low', submittedOn: '10 Apr 2025' },
  { id: 'RW007', title: 'Sports complex', location: 'Sardhana', cost: '₹52.0 L', status: 'Rejected', priority: 'Low', submittedOn: '01 Apr 2025' },
];

const statusStyles: Record<string, string> = {
  'Approved':     'bg-green-100 text-green-700 border-green-200',
  'Under Review': 'bg-blue-100 text-blue-700 border-blue-200',
  'Pending':      'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Rejected':     'bg-red-100 text-red-700 border-red-200',
};
const priorityStyles: Record<string, string> = {
  'High':   'text-red-600 bg-red-50',
  'Medium': 'text-yellow-600 bg-yellow-50',
  'Low':    'text-green-600 bg-green-50',
};

export const MPRecommended: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const filtered = recommended.filter(r => statusFilter === 'All' || r.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Recommended Works</h1>
          <p className="text-sm text-gray-500 mt-0.5">Works proposed for Yatharth sanction — Meerut constituency</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <BookMarked size={15} /> Propose New Work
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Proposed', value: recommended.length, icon: BookMarked, col: 'text-blue-600 bg-blue-50' },
          { label: 'Approved', value: recommended.filter(r => r.status === 'Approved').length, icon: CheckCircle2, col: 'text-green-600 bg-green-50' },
          { label: 'Under Review', value: recommended.filter(r => r.status === 'Under Review').length, icon: Clock, col: 'text-blue-600 bg-blue-50' },
          { label: 'Rejected', value: recommended.filter(r => r.status === 'Rejected').length, icon: AlertTriangle, col: 'text-red-600 bg-red-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.col.split(' ')[1]}`}>
              <s.icon size={18} className={s.col.split(' ')[0]} />
            </div>
            <div><p className="text-xs text-gray-500">{s.label}</p><p className="text-xl font-extrabold text-gray-900">{s.value}</p></div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {['All', 'Approved', 'Under Review', 'Pending', 'Rejected'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['#', 'Title', 'Proposed Location', 'Estimated Cost', 'Priority', 'Status', 'Submitted', 'Action'].map(h => (
                <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((r, i) => (
                <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800 max-w-[180px] truncate">{r.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r.location}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{r.cost}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${priorityStyles[r.priority]}`}>{r.priority}</span></td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusStyles[r.status]}`}>{r.status}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-500">{r.submittedOn}</td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 rounded px-2 py-0.5 hover:bg-blue-50">
                      <Eye size={12} /> View
                    </button>
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
