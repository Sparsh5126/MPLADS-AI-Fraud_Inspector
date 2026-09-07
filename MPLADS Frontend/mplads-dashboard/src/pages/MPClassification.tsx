import React, { useState } from 'react';
import { ShieldAlert, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const riskData = [
  { name: 'Critical', value: 150, pct: 12, color: '#EF4444' },
  { name: 'High',     value: 349, pct: 28, color: '#F97316' },
  { name: 'Medium',   value: 449, pct: 36, color: '#EAB308' },
  { name: 'Low',      value: 300, pct: 24, color: '#22C55E' },
];

const districtRisk = [
  { district: 'Meerut',     critical: 45, high: 90, medium: 120, low: 57 },
  { district: 'Kithor',     critical: 38, high: 72, medium: 95,  low: 45 },
  { district: 'Mawana',     critical: 28, high: 58, medium: 80,  low: 44 },
  { district: 'Sardhana',   critical: 22, high: 68, medium: 68,  low: 28 },
  { district: 'Hastinapur', critical: 12, high: 40, medium: 56,  low: 40 },
  { district: 'Daurala',    critical: 5,  high: 21, medium: 30,  low: 86 },
];

const worksTable = [
  { id: 'W0994', title: 'Community health center', district: 'Meerut',     risk: 'Critical', score: 0.91, type: 'Cost Overrun' },
  { id: 'W1029', title: 'Drainage system phase-2',  district: 'Meerut',     risk: 'Critical', score: 0.87, type: 'Progress Stall' },
  { id: 'W0648', title: 'Rural infra project',       district: 'Sardhana',   risk: 'High',     score: 0.74, type: 'Vendor Risk' },
  { id: 'W0876', title: 'Drinking water facility',   district: 'Mawana',     risk: 'High',     score: 0.71, type: 'Payment Irregularity' },
  { id: 'W1038', title: 'Primary road widening',     district: 'Kithor',     risk: 'High',     score: 0.68, type: 'Delay' },
  { id: 'W0931', title: 'Rural road development',    district: 'Daurala',    risk: 'Medium',   score: 0.52, type: 'Timeline Violation' },
];

const riskStyles: Record<string, string> = {
  'Critical': 'bg-red-100 text-red-700',
  'High':     'bg-orange-100 text-orange-700',
  'Medium':   'bg-yellow-100 text-yellow-700',
  'Low':      'bg-green-100 text-green-700',
};

export const MPClassification: React.FC = () => {
  const [activeRisk, setActiveRisk] = useState<number | null>(null);
  const [riskFilter, setRiskFilter] = useState('All');
  const filtered = worksTable.filter(w => riskFilter === 'All' || w.risk === riskFilter);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Classification of Works</h1>
        <p className="text-sm text-gray-500 mt-0.5">Works classified by risk level — Meerut constituency</p>
      </div>

      {/* Summary badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {riskData.map(r => (
          <div key={r.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
            <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${r.color}20` }}>
              <ShieldAlert size={20} style={{ color: r.color }} />
            </div>
            <p className="text-sm font-bold text-gray-800">{r.name}</p>
            <p className="text-2xl font-extrabold mt-0.5" style={{ color: r.color }}>{r.value}</p>
            <p className="text-xs text-gray-400">{r.pct}% of total</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Donut chart */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Risk Distribution (All 1,248 Works)</h2>
          <div className="flex items-center gap-4">
            <div style={{ width: 180, height: 180, flexShrink: 0 }}>
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={riskData} cx={85} cy={85} innerRadius={56} outerRadius={82} dataKey="value" paddingAngle={2}
                    onMouseEnter={(_, i) => setActiveRisk(i)} onMouseLeave={() => setActiveRisk(null)}>
                    {riskData.map((r, i) => (
                      <Cell key={r.name} fill={r.color} opacity={activeRisk === null || activeRisk === i ? 1 : 0.35} style={{ cursor: 'pointer' }} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number, n: string) => [`${v} works`, n]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <text x={86} y={82} textAnchor="middle" fontSize="20" fontWeight="700" fill="#1E293B">1,248</text>
                  <text x={86} y={100} textAnchor="middle" fontSize="10" fill="#94A3B8">Works</text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2.5">
              {riskData.map((r, i) => (
                <div key={r.name} className="flex items-center justify-between gap-6 text-xs cursor-pointer hover:opacity-75"
                  onMouseEnter={() => setActiveRisk(i)} onMouseLeave={() => setActiveRisk(null)}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: r.color }} />
                    <span className="font-semibold text-gray-700">{r.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-800">{r.pct}%</span>
                    <span className="text-gray-400 ml-1">({r.value})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stacked bar by district */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Risk by District</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={districtRisk} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="district" type="category" tick={{ fontSize: 10 }} width={60} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="critical" name="Critical" stackId="a" fill="#EF4444" />
              <Bar dataKey="high"     name="High"     stackId="a" fill="#F97316" />
              <Bar dataKey="medium"   name="Medium"   stackId="a" fill="#EAB308" />
              <Bar dataKey="low"      name="Low"      stackId="a" fill="#22C55E" radius={[0,3,3,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* High-risk works table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <h2 className="text-sm font-bold text-gray-900 flex-1">High-Priority Works (Risk Flagged)</h2>
          <div className="flex gap-2">
            {['All', 'Critical', 'High', 'Medium'].map(s => (
              <button key={s} onClick={() => setRiskFilter(s)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${riskFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Work ID', 'Title', 'District', 'Risk Level', 'Risk Score', 'Anomaly Type', ''].map(h => (
                <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-sm text-blue-600 font-semibold">{w.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 max-w-[180px] truncate">{w.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{w.district}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${riskStyles[w.risk]}`}>{w.risk}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 bg-gray-100 rounded-full w-16">
                        <div className="h-full rounded-full bg-red-500" style={{ width: `${w.score * 100}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gray-700">{w.score.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{w.type}</td>
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
