import React, { useState } from 'react';
import { FileBarChart, Download, Calendar, Eye, Printer } from 'lucide-react';

const reports = [
  { id: 'RPT001', title: 'Monthly Risk Assessment – June 2025', category: 'Risk Analysis', date: '01 Jul 2025', status: 'Ready', size: '2.4 MB' },
  { id: 'RPT002', title: 'Budget Utilization Q1 FY26', category: 'Finance', date: '15 Jun 2025', status: 'Ready', size: '1.8 MB' },
  { id: 'RPT003', title: 'District Performance Overview – UP 2025', category: 'Performance', date: '28 Jun 2025', status: 'Ready', size: '3.1 MB' },
  { id: 'RPT004', title: 'Anomaly Detection Summary – H1 2025', category: 'Fraud Detection', date: '20 Jun 2025', status: 'Ready', size: '5.6 MB' },
  { id: 'RPT005', title: 'IAS Officer Performance Report', category: 'Performance', date: '10 Jun 2025', status: 'Ready', size: '1.2 MB' },
  { id: 'RPT006', title: 'Duplicate Works Analysis Report', category: 'Fraud Detection', date: '05 Jun 2025', status: 'Ready', size: '2.9 MB' },
  { id: 'RPT007', title: 'Budget Forecast FY 2025–26', category: 'Finance', date: '01 Jun 2025', status: 'Processing', size: '—' },
  { id: 'RPT008', title: 'Works Completion Rate – Annual Review', category: 'Performance', date: '25 May 2025', status: 'Ready', size: '4.2 MB' },
];

const categories = ['All', 'Risk Analysis', 'Finance', 'Performance', 'Fraud Detection'];

const categoryColor: Record<string, string> = {
  'Risk Analysis': 'bg-red-100 text-red-700',
  'Finance': 'bg-blue-100 text-blue-700',
  'Performance': 'bg-green-100 text-green-700',
  'Fraud Detection': 'bg-purple-100 text-purple-700',
};

export const StateReports: React.FC = () => {
  const [category, setCategory] = useState('All');

  const filtered = reports.filter(r => category === 'All' || r.category === category);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Download and view generated reports for Uttar Pradesh</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <FileBarChart size={15} /> Generate New Report
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${category === c ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md hover:border-blue-200 transition-all group">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-50 group-hover:bg-blue-100 transition-colors">
                <FileBarChart size={18} className="text-blue-600" />
              </div>
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${categoryColor[r.category]}`}>{r.category}</span>
            </div>

            <h3 className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">{r.title}</h3>
            <p className="text-xs text-gray-500 font-mono mb-3">{r.id}</p>

            <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
              <span className="flex items-center gap-1"><Calendar size={11} /> {r.date}</span>
              {r.status === 'Ready' && <span>{r.size}</span>}
              <span className={`ml-auto font-semibold ${r.status === 'Ready' ? 'text-green-600' : 'text-amber-500'}`}>{r.status}</span>
            </div>

            <div className="flex items-center gap-2">
              {r.status === 'Ready' ? (
                <>
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Download size={13} /> Download
                  </button>
                  <button className="w-9 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye size={14} className="text-gray-500" />
                  </button>
                  <button className="w-9 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Printer size={14} className="text-gray-500" />
                  </button>
                </>
              ) : (
                <div className="flex-1 flex items-center gap-2 text-xs text-amber-600 font-medium py-2">
                  <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  Processing report...
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-xl">
          <FileBarChart size={40} className="mx-auto mb-3 text-gray-200" />
          <p className="text-sm text-gray-400">No reports found for selected category</p>
        </div>
      )}
    </div>
  );
};
