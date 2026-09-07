import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Filter, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const anomalies = [
  { id: 'AN-0041', workId: 'W0994', title: 'Community health center', type: 'Cost Overrun', severity: 'Critical', score: 0.91, detected: '18 Jun 2025', desc: 'Cost 340% above benchmark for similar works' },
  { id: 'AN-0039', workId: 'W1029', title: 'Drainage system phase-2', type: 'Progress Stall', severity: 'High', score: 0.78, detected: '14 Jun 2025', desc: 'No progress update for 45+ days' },
  { id: 'AN-0035', workId: 'W1008', title: 'Water supply pipeline', type: 'Payment Structuring', severity: 'High', score: 0.72, detected: '10 Jun 2025', desc: 'Multiple small payments within 3-day window' },
  { id: 'AN-0031', workId: 'W1038', title: 'Primary road widening', type: 'Vendor Duplication', severity: 'Medium', score: 0.58, detected: '05 Jun 2025', desc: 'Vendor linked to 3 blacklisted entities' },
  { id: 'AN-0028', workId: 'W1002', title: 'School building renovation', type: 'Timeline Violation', severity: 'Medium', score: 0.51, detected: '01 Jun 2025', desc: 'Expected start missed by 90 days' },
];

const trendData = [
  { month: 'Jan', critical: 2, high: 4, medium: 6 },
  { month: 'Feb', critical: 3, high: 5, medium: 5 },
  { month: 'Mar', critical: 1, high: 6, medium: 8 },
  { month: 'Apr', critical: 4, high: 3, medium: 7 },
  { month: 'May', critical: 3, high: 7, medium: 9 },
  { month: 'Jun', critical: 5, high: 8, medium: 6 },
];

const severityStyles: Record<string, string> = {
  'Critical': 'bg-red-100 text-red-700',
  'High':     'bg-orange-100 text-orange-700',
  'Medium':   'bg-yellow-100 text-yellow-700',
  'Low':      'bg-green-100 text-green-700',
};

export const DistrictAnomalyAnalysis: React.FC = () => {
  const [severityFilter, setSeverityFilter] = useState('All');
  const filtered = anomalies.filter(a => severityFilter === 'All' || a.severity === severityFilter);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Anomaly Analysis</h1>
        <p className="text-sm text-gray-500 mt-0.5">Detected irregularities in Meerut district MPLADS works</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Anomalies', value: 5, color: 'text-gray-700 bg-gray-50' },
          { label: 'Critical', value: 1, color: 'text-red-700 bg-red-50' },
          { label: 'High', value: 2, color: 'text-orange-700 bg-orange-50' },
          { label: 'Medium', value: 2, color: 'text-yellow-700 bg-yellow-50' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border border-gray-200 p-4 shadow-sm ${s.color.split(' ')[1]} bg-white`}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-extrabold ${s.color.split(' ')[0]}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h2 className="text-sm font-bold text-gray-900 mb-3">Anomaly Trend (Jan–Jun 2025)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={trendData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="critical" name="Critical" fill="#EF4444" radius={[3,3,0,0]} />
            <Bar dataKey="high"     name="High"     fill="#F97316" radius={[3,3,0,0]} />
            <Bar dataKey="medium"   name="Medium"   fill="#EAB308" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter + Table */}
      <div className="flex items-center gap-3 mb-2">
        <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
          {['All', 'Critical', 'High', 'Medium', 'Low'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Anomaly ID', 'Work ID', 'Title', 'Type', 'Severity', 'Risk Score', 'Detected', 'Description'].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{a.id}</td>
                  <td className="px-4 py-3 font-mono text-sm text-blue-600 font-semibold">{a.workId}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 max-w-[150px] truncate">{a.title}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{a.type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${severityStyles[a.severity]}`}>{a.severity}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 bg-gray-100 rounded-full w-16">
                        <div className="h-full rounded-full bg-red-500" style={{ width: `${a.score * 100}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gray-700">{a.score.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{a.detected}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-[200px]">{a.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
