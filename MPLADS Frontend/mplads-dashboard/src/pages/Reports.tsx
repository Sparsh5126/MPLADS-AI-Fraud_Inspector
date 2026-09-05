import React, { useState } from 'react';
import { FileText, Download, RefreshCw } from 'lucide-react';

const reports = [
  { id: 'R1', title: 'Risk Summary Report', desc: 'Overall risk distribution, critical works, and anomaly summary for the selected period.', icon: '📊', lastGenerated: '2025-06-24' },
  { id: 'R2', title: 'Cost Anomaly Report', desc: 'Works with above-expected costs, peer Z-scores, and ML-predicted deviations.', icon: '💰', lastGenerated: '2025-06-23' },
  { id: 'R3', title: 'Payment Anomaly Report', desc: 'Suspicious payment patterns, structuring scores, and threshold proximity analysis.', icon: '💳', lastGenerated: '2025-06-22' },
  { id: 'R4', title: 'Duplicate Works Report', desc: 'Works with high text/image similarity, overlapping locations, and vendor overlap.', icon: '📋', lastGenerated: '2025-06-22' },
  { id: 'R5', title: 'Vendor Network Report', desc: 'IA-vendor relationships, cluster analysis, and suspicious vendor overlap.', icon: '🕸', lastGenerated: '2025-06-20' },
  { id: 'R6', title: 'Compliance Report', desc: 'Rule violations, warnings, and compliance scores across all works.', icon: '🛡', lastGenerated: '2025-06-21' },
];

export const Reports: React.FC = () => {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState<Record<string, boolean>>({});

  const handleGenerate = (id: string) => {
    setGenerating(id);
    setTimeout(() => {
      setGenerating(null);
      setGenerated(prev => ({ ...prev, [id]: true }));
    }, 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-0.5">Generate and export MPLADS audit and analysis reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map(report => (
          <div key={report.id} className="card card-hover flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                {report.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{report.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{report.desc}</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mb-4">Last generated: {report.lastGenerated}</p>
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleGenerate(report.id)}
                disabled={!!generating}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-primary text-white rounded-lg py-2 hover:bg-primary-light transition-colors disabled:opacity-60"
              >
                {generating === report.id ? (
                  <><RefreshCw size={12} className="animate-spin" /> Generating...</>
                ) : generated[report.id] ? (
                  <><FileText size={12} /> Generated ✓</>
                ) : (
                  <><RefreshCw size={12} /> Generate Report</>
                )}
              </button>
              <button
                disabled={!generated[report.id]}
                className="flex items-center gap-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                title="Export CSV"
              >
                <Download size={12} /> CSV
              </button>
              <button
                disabled={!generated[report.id]}
                className="flex items-center gap-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                title="Export PDF"
              >
                <Download size={12} /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-blue-50 border-blue-200">
        <p className="text-sm font-medium text-blue-800 mb-1">Note on Report Exports</p>
        <p className="text-xs text-blue-600">Reports are generated from the current mock data. CSV and PDF export functionality requires backend integration. Click "Generate Report" first to enable export buttons.</p>
      </div>
    </div>
  );
};
