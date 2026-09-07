import React, { useState } from 'react';
import { FileBarChart, Download, Eye, Calendar, Printer } from 'lucide-react';

const reports = [
  { id: 'RPT-MP-001', title: 'Constituency Work Status – Jun 2025', category: 'Progress', date: '01 Jul 2025', size: '1.4 MB', format: 'PDF' },
  { id: 'RPT-MP-002', title: 'Fund Utilisation Analysis – Q2 2025', category: 'Finance', date: '15 Jun 2025', size: '0.9 MB', format: 'PDF' },
  { id: 'RPT-MP-003', title: 'Recommended Works Status – May 2025', category: 'Progress', date: '05 Jun 2025', size: '0.7 MB', format: 'Excel' },
  { id: 'RPT-MP-004', title: 'High Risk Works Report', category: 'Risk Analysis', date: '22 May 2025', size: '1.1 MB', format: 'PDF' },
];

const categories = ['All', 'Progress', 'Risk Analysis', 'Finance', 'Agency'];
const formatBadge: Record<string, string> = {
  'PDF':   'bg-red-100 text-red-700',
  'Excel': 'bg-green-100 text-green-700',
};

export const MPReports: React.FC = () => {
  const [category, setCategory] = useState('All');
  const filtered = reports.filter(r => category === 'All' || r.category === category);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-0.5">Generated reports for Meerut constituency</p>
        </div>
        <button className="flex items-center gap-2 text-sm bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors">
          <FileBarChart size={15} /> Generate New Report
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${category === c ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FileBarChart size={20} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 leading-tight">{r.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.category}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1"><Calendar size={12} /> {r.date}</div>
              <div className="flex items-center gap-2">
                <span>{r.size}</span>
                <span className={`px-2 py-0.5 rounded font-semibold ${formatBadge[r.format]}`}>{r.format}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-1 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 transition-colors py-1.5">
                <Eye size={13} /> Preview
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 transition-colors py-1.5">
                <Download size={13} /> Download
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 transition-colors py-1.5">
                <Printer size={13} /> Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
