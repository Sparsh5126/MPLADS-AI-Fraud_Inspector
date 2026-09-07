import React, { useState } from 'react';
import { GitCompare, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const districtOptions = ['Meerut', 'Baghpat', 'Ghaziabad', 'Lucknow', 'Saharanpur', 'Varanasi', 'Kanpur Nagar', 'Agra'];

const districtStats: Record<string, { totalWorks: number; highRisk: number; budgetCr: number; utilization: number; completionRate: number; avgDelay: number }> = {
  Meerut:       { totalWorks: 342, highRisk: 28, budgetCr: 164, utilization: 78, completionRate: 62, avgDelay: 42 },
  Baghpat:      { totalWorks: 281, highRisk: 21, budgetCr: 98,  utilization: 65, completionRate: 54, avgDelay: 55 },
  Ghaziabad:    { totalWorks: 276, highRisk: 18, budgetCr: 188, utilization: 82, completionRate: 70, avgDelay: 38 },
  Lucknow:      { totalWorks: 412, highRisk: 17, budgetCr: 256, utilization: 71, completionRate: 68, avgDelay: 30 },
  Saharanpur:   { totalWorks: 265, highRisk: 16, budgetCr: 112, utilization: 58, completionRate: 55, avgDelay: 60 },
  Varanasi:     { totalWorks: 512, highRisk: 12, budgetCr: 310, utilization: 88, completionRate: 82, avgDelay: 22 },
  'Kanpur Nagar': { totalWorks: 388, highRisk: 8, budgetCr: 224, utilization: 91, completionRate: 88, avgDelay: 10 },
  Agra:         { totalWorks: 310, highRisk: 5,  budgetCr: 178, utilization: 95, completionRate: 92, avgDelay: 8  },
};

const radarKeys = [
  { key: 'utilization', label: 'Utilization %' },
  { key: 'completionRate', label: 'Completion %' },
  { key: 'riskScore', label: 'Risk Score (inv)' },
];

function buildRadarData(d1: string, d2: string) {
  const s1 = districtStats[d1];
  const s2 = districtStats[d2];
  if (!s1 || !s2) return [];
  return [
    { metric: 'Utilization', [d1]: s1.utilization, [d2]: s2.utilization },
    { metric: 'Completion', [d1]: s1.completionRate, [d2]: s2.completionRate },
    { metric: 'Low Risk', [d1]: 100 - (s1.highRisk / s1.totalWorks) * 100, [d2]: 100 - (s2.highRisk / s2.totalWorks) * 100 },
    { metric: 'On-Time', [d1]: Math.max(0, 100 - s1.avgDelay), [d2]: Math.max(0, 100 - s2.avgDelay) },
    { metric: 'Budget Eff', [d1]: Math.min(100, (s1.utilization + s1.completionRate) / 2), [d2]: Math.min(100, (s2.utilization + s2.completionRate) / 2) },
  ];
}

function CmpCell({ v1, v2, unit = '' }: { v1: number; v2: number; unit?: string }) {
  const diff = v1 - v2;
  const Icon = diff > 0 ? TrendingUp : diff < 0 ? TrendingDown : Minus;
  const color = diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-500' : 'text-gray-400';
  return (
    <span className={`flex items-center justify-end gap-1 text-xs font-medium ${color}`}>
      <Icon size={12} /> {Math.abs(diff).toFixed(1)}{unit}
    </span>
  );
}

export const StateCompareDistricts: React.FC = () => {
  const [d1, setD1] = useState('Meerut');
  const [d2, setD2] = useState('Varanasi');

  const s1 = districtStats[d1];
  const s2 = districtStats[d2];
  const radarData = buildRadarData(d1, d2);

  const metrics = [
    { label: 'Total Works', v1: s1.totalWorks, v2: s2.totalWorks, unit: '' },
    { label: 'High Risk Works', v1: s1.highRisk, v2: s2.highRisk, unit: '' },
    { label: 'Budget (Cr)', v1: s1.budgetCr, v2: s2.budgetCr, unit: '' },
    { label: 'Utilization %', v1: s1.utilization, v2: s2.utilization, unit: '%' },
    { label: 'Completion Rate', v1: s1.completionRate, v2: s2.completionRate, unit: '%' },
    { label: 'Avg Delay (days)', v1: s1.avgDelay, v2: s2.avgDelay, unit: 'd' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Compare Districts</h1>
        <p className="text-sm text-gray-500 mt-1">Side-by-side performance and risk comparison between districts</p>
      </div>

      {/* Selectors */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-wrap items-center gap-4">
        <GitCompare size={20} className="text-blue-500 flex-shrink-0" />
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">District A</label>
            <select value={d1} onChange={e => setD1(e.target.value)} className="text-sm border border-blue-200 bg-blue-50 text-blue-800 font-semibold rounded-lg px-3 py-2 outline-none focus:border-blue-500">
              {districtOptions.filter(d => d !== d2).map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <span className="text-gray-400 font-bold text-lg mt-4">vs</span>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">District B</label>
            <select value={d2} onChange={e => setD2(e.target.value)} className="text-sm border border-purple-200 bg-purple-50 text-purple-800 font-semibold rounded-lg px-3 py-2 outline-none focus:border-purple-500">
              {districtOptions.filter(d => d !== d1).map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Radar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Performance Comparison</h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Radar name={d1} dataKey={d1} stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
              <Radar name={d2} dataKey={d2} stroke="#A855F7" fill="#A855F7" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100 px-5 py-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Metric</span>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider text-center">{d1}</span>
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider text-center">{d2}</span>
          </div>
          <div className="divide-y divide-gray-50">
            {metrics.map(m => (
              <div key={m.label} className="grid grid-cols-3 px-5 py-3.5 hover:bg-gray-50/50">
                <span className="text-sm text-gray-700 font-medium">{m.label}</span>
                <div className="text-center">
                  <span className="text-sm font-bold text-blue-700">{m.v1}{m.unit}</span>
                  <div className="mt-0.5"><CmpCell v1={m.v1} v2={m.v2} unit={m.unit} /></div>
                </div>
                <div className="text-center">
                  <span className="text-sm font-bold text-purple-700">{m.v2}{m.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
