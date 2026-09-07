import React, { useState } from 'react';
import { Users, TrendingUp, TrendingDown, Star, Award, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const iasData = [
  { name: 'Arun Kumar Sharma', district: 'Varanasi', works: 512, completion: 82, utilization: 88, anomalies: 12, score: 91, rank: 1 },
  { name: 'Priya Mehta', district: 'Kanpur Nagar', works: 388, completion: 88, utilization: 91, anomalies: 8, score: 89, rank: 2 },
  { name: 'Vikram Singh', district: 'Agra', works: 310, completion: 92, utilization: 95, anomalies: 5, score: 88, rank: 3 },
  { name: 'Sunita Rao', district: 'Lucknow', works: 412, completion: 68, utilization: 71, anomalies: 17, score: 74, rank: 4 },
  { name: 'Deepak Gupta', district: 'Ghaziabad', works: 276, completion: 70, utilization: 82, anomalies: 18, score: 71, rank: 5 },
  { name: 'Ramesh Tiwari', district: 'Prayagraj', works: 440, completion: 85, utilization: 85, anomalies: 6, score: 87, rank: 6 },
  { name: 'Anita Verma', district: 'Saharanpur', works: 265, completion: 55, utilization: 58, anomalies: 16, score: 62, rank: 7 },
  { name: 'Mohit Srivastava', district: 'Baghpat', works: 281, completion: 54, utilization: 65, anomalies: 21, score: 56, rank: 8 },
  { name: 'Kavita Joshi', district: 'Mathura', works: 199, completion: 60, utilization: 62, anomalies: 13, score: 64, rank: 9 },
  { name: 'Suresh Pandey', district: 'Meerut', works: 342, completion: 62, utilization: 78, anomalies: 28, score: 55, rank: 10 },
];

const chartData = iasData.slice(0, 6).map(d => ({ name: d.name.split(' ')[0], score: d.score }));

function ScoreBar({ score }: { score: number }) {
  const color = score >= 85 ? 'bg-green-500' : score >= 70 ? 'bg-blue-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden" style={{ minWidth: 80 }}>
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-bold text-gray-700 w-7">{score}</span>
    </div>
  );
}

export const StateIASPerformance: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const selData = iasData.find(d => d.name === selected);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">IAS Performance</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor and rank IAS officer performance across districts</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
          <Award size={15} className="text-blue-500" />
          <span className="text-sm font-semibold text-blue-700">Top performer: Arun Kumar Sharma</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total IAS Officers', value: iasData.length, color: 'text-blue-600' },
          { label: 'Above 80 Score', value: iasData.filter(d => d.score >= 80).length, color: 'text-green-600' },
          { label: 'Below 60 Score', value: iasData.filter(d => d.score < 60).length, color: 'text-red-600' },
          { label: 'Avg Score', value: Math.round(iasData.reduce((a, b) => a + b.score, 0) / iasData.length), color: 'text-gray-800' },
        ].map(c => (
          <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{c.label}</p>
            <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp size={15} className="text-blue-500" /> Score Comparison</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 4, right: 10, left: -10, bottom: 0 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={60} />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden lg:col-span-2">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2"><Users size={15} className="text-blue-500" /> Performance Leaderboard</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Rank', 'Officer', 'District', 'Works', 'Completion', 'Anomalies', 'Score'].map(h => (
                    <th key={h} className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {iasData.map(d => (
                  <tr
                    key={d.name}
                    onClick={() => setSelected(d.name === selected ? null : d.name)}
                    className={`cursor-pointer transition-colors ${selected === d.name ? 'bg-blue-50' : 'hover:bg-gray-50/60'}`}
                  >
                    <td className="py-3 px-4">
                      <span className={`text-sm font-bold ${d.rank <= 3 ? 'text-amber-500' : 'text-gray-400'}`}>
                        {d.rank <= 3 ? '🏆' : ''} #{d.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-sm text-gray-800">{d.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{d.district}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{d.works}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`font-semibold ${d.completion >= 80 ? 'text-green-600' : d.completion >= 65 ? 'text-blue-600' : 'text-red-500'}`}>{d.completion}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-semibold flex items-center gap-1 ${d.anomalies > 20 ? 'text-red-600' : d.anomalies > 10 ? 'text-orange-500' : 'text-gray-600'}`}>
                        {d.anomalies > 10 && <AlertTriangle size={12} />} {d.anomalies}
                      </span>
                    </td>
                    <td className="py-3 px-4 min-w-[130px]"><ScoreBar score={d.score} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
