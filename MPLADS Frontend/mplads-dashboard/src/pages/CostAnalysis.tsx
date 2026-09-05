import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, ScatterChart, Scatter, ZAxis,
} from 'recharts';

const peerData = [
  { name: 'W0231', amount: 12.1, expected: 13.8, category: 'Drainage', highlight: false },
  { name: 'W0445', amount: 11.5, expected: 13.5, category: 'Drainage', highlight: false },
  { name: 'W0512', amount: 14.2, expected: 14.1, category: 'Drainage', highlight: false },
  { name: 'W0689', amount: 13.8, expected: 13.9, category: 'Drainage', highlight: false },
  { name: 'W0731', amount: 15.0, expected: 14.0, category: 'Drainage', highlight: false },
  { name: 'W1042', amount: 24.8, expected: 14.3, category: 'Drainage', highlight: true },
  { name: 'W0901', amount: 13.2, expected: 13.7, category: 'Drainage', highlight: false },
  { name: 'W0810', amount: 12.8, expected: 13.6, category: 'Drainage', highlight: false },
];

const METHODOLOGY_STEPS = [
  {
    group: 'Peer-group Method',
    steps: ['Category + State grouping', 'Cost per scale unit', 'Median + MAD (robust stats)', 'Robust Z-score'],
    color: '#3B82F6',
  },
  {
    group: 'ML Method',
    steps: ['Category + State + District + Scale + Year', 'Random Forest Regressor', 'Expected Cost prediction', 'Relative residual'],
    color: '#8B5CF6',
  },
  {
    group: 'Final Score',
    steps: ['MAX(Peer Score, ML Score)'],
    color: '#EF4444',
  },
];

export const CostAnalysis: React.FC = () => {
  const [workId, setWorkId] = useState('W1042');

  const summary = {
    actual: 24.8, expected: 14.3, diff: 10.5, relDiff: 73.4,
    peerZ: 3.8, peerScore: 1.00, mlScore: 0.73, finalScore: 1.00,
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cost Anomaly Analysis</h1>
          <p className="text-sm text-gray-500 mt-0.5">Peer-group and ML-based cost deviation analysis</p>
        </div>
        <div className="flex items-end gap-2">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Work ID</label>
            <input
              type="text" value={workId} onChange={e => setWorkId(e.target.value)}
              className="select-filter w-28" placeholder="W1042"
            />
          </div>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Actual Sanctioned Cost', value: `₹${summary.actual} L`, color: 'text-gray-900' },
          { label: 'Expected Cost (ML)', value: `₹${summary.expected} L`, color: 'text-gray-900' },
          { label: 'Difference', value: `₹${summary.diff} L`, color: 'text-red-600' },
          { label: 'Relative Difference', value: `+${summary.relDiff}%`, color: 'text-red-600' },
          { label: 'Peer Z-score', value: summary.peerZ.toFixed(1), color: 'text-orange-500' },
          { label: 'Peer Anomaly Score', value: summary.peerScore.toFixed(2), color: 'text-red-600' },
          { label: 'ML Anomaly Score', value: summary.mlScore.toFixed(2), color: 'text-orange-500' },
          { label: 'Final Cost Score', value: summary.finalScore.toFixed(2), color: 'text-red-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card py-3">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Peer comparison chart */}
      <div className="card">
        <p className="text-sm font-semibold text-gray-800 mb-4">Peer Group Comparison — Drainage Works (Meerut, UP)</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={peerData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v}L`} />
            <Tooltip formatter={(v: number) => `₹${v} L`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="amount" name="Actual Cost" fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              label={{ position: 'top', fontSize: 10, formatter: (v: number) => peerData.find(d => d.amount === v)?.highlight ? '⚠' : '' }}
            />
            <Bar dataKey="expected" name="Expected Cost" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            <ReferenceLine y={14.3} stroke="#EF4444" strokeDasharray="4 2" label={{ value: 'Expected', fill: '#EF4444', fontSize: 10 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* How the score was calculated */}
      <div className="card">
        <p className="text-sm font-semibold text-gray-800 mb-4">How the Score Was Calculated</p>
        <div className="flex flex-wrap gap-6">
          {METHODOLOGY_STEPS.map(m => (
            <div key={m.group} className="flex-1 min-w-[180px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                <p className="text-sm font-semibold text-gray-700">{m.group}</p>
              </div>
              <div className="space-y-2">
                {m.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {i < m.steps.length - 1 ? (
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold text-white" style={{ backgroundColor: m.color }}>{i + 1}</div>
                        <div className="w-0.5 h-4 mt-0.5" style={{ backgroundColor: m.color + '30' }} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold text-white flex-shrink-0" style={{ backgroundColor: m.color }}>→</div>
                    )}
                    <p className="text-xs text-gray-600 leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
