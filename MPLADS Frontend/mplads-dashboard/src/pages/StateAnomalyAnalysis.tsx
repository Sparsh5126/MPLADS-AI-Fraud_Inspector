import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Filter, Clock, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const anomalyTrend = [
  { month: 'Jan', critical: 3, high: 42, medium: 180 },
  { month: 'Feb', critical: 5, high: 55, medium: 210 },
  { month: 'Mar', critical: 4, high: 48, medium: 195 },
  { month: 'Apr', critical: 7, high: 70, medium: 240 },
  { month: 'May', critical: 6, high: 65, medium: 220 },
  { month: 'Jun', critical: 9, high: 81, medium: 260 },
];

const anomalyByDistrict = [
  { district: 'Meerut', count: 37 },
  { district: 'Baghpat', count: 27 },
  { district: 'Ghaziabad', count: 23 },
  { district: 'Lucknow', count: 21 },
  { district: 'Mathura', count: 13 },
  { district: 'Saharanpur', count: 20 },
];

const anomalies = [
  { id: 'A001', workId: 'W1042', district: 'Meerut', type: 'Cost Inflation', severity: 'Critical', detected: '24 Jun 2025', status: 'Open', desc: 'Cost increased 340% with no site changes recorded.' },
  { id: 'A002', workId: 'W0871', district: 'Saharanpur', type: 'Image Mismatch', severity: 'High', detected: '23 Jun 2025', status: 'Reviewing', desc: 'Geo-tagged images do not match project location.' },
  { id: 'A003', workId: 'W0931', district: 'Ghaziabad', type: 'Duplicate Work', severity: 'High', detected: '23 Jun 2025', status: 'Open', desc: 'Possible duplicate of W0912 in same ward.' },
  { id: 'A004', workId: 'W0678', district: 'Lucknow', type: 'Progress Stall', severity: 'Medium', detected: '22 Jun 2025', status: 'Pending', desc: 'No progress update for 45 days despite funds released.' },
  { id: 'A005', workId: 'W0218', district: 'Baghpat', type: 'Vendor Conflict', severity: 'Critical', detected: '21 Jun 2025', status: 'Open', desc: 'Same vendor contracted for 6 simultaneous projects.' },
  { id: 'A006', workId: 'W0551', district: 'Varanasi', type: 'Delay', severity: 'Medium', detected: '20 Jun 2025', status: 'Pending', desc: 'Project delayed by 8 months beyond timeline.' },
];

const sevColor: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700',
  High: 'bg-orange-100 text-orange-700',
  Medium: 'bg-yellow-100 text-yellow-700',
};

const statusIcon: Record<string, React.ReactNode> = {
  Open: <AlertTriangle size={12} className="text-red-500" />,
  Reviewing: <Clock size={12} className="text-blue-500" />,
  Pending: <Clock size={12} className="text-amber-500" />,
  Resolved: <CheckCircle2 size={12} className="text-green-500" />,
};

export const StateAnomalyAnalysis: React.FC = () => {
  const [severityFilter, setSeverityFilter] = useState('All');

  const filtered = anomalies.filter(a => severityFilter === 'All' || a.severity === severityFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Anomaly Analysis</h1>
          <p className="text-sm text-gray-500 mt-1">AI-detected anomalies, trends, and risk assessment across Uttar Pradesh</p>
        </div>
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          <AlertTriangle size={15} className="text-red-500" />
          <span className="text-sm font-semibold text-red-700">6 Critical Anomalies Active</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Anomalies', value: '487', color: 'text-gray-900', bg: '#F3F4F6' },
          { label: 'Critical', value: '6', color: 'text-red-600', bg: '#FEF2F2' },
          { label: 'High', value: '81', color: 'text-orange-600', bg: '#FFF7ED' },
          { label: 'Resolved This Month', value: '142', color: 'text-green-600', bg: '#F0FDF4' },
        ].map(c => (
          <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{c.label}</p>
            <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp size={15} className="text-blue-500" /> Anomaly Trend (2025)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={anomalyTrend} margin={{ top: 4, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Critical" />
              <Line type="monotone" dataKey="high" stroke="#F97316" strokeWidth={2} dot={{ r: 3 }} name="High" />
              <Line type="monotone" dataKey="medium" stroke="#EAB308" strokeWidth={2} dot={{ r: 3 }} name="Medium" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Anomalies by District</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={anomalyByDistrict} margin={{ top: 4, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="district" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Anomalies" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Anomaly Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-gray-800">Active Anomalies</h2>
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-gray-400" />
            <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-blue-400">
              <option value="All">All Severities</option>
              <option>Critical</option><option>High</option><option>Medium</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['ID', 'Work ID', 'District', 'Type', 'Severity', 'Detected', 'Status', 'Description'].map(h => (
                  <th key={h} className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-red-50/20 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-gray-500">{a.id}</td>
                  <td className="py-3 px-4 font-mono text-xs font-medium text-blue-600">{a.workId}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{a.district}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{a.type}</td>
                  <td className="py-3 px-4"><span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${sevColor[a.severity]}`}>{a.severity}</span></td>
                  <td className="py-3 px-4 text-xs text-gray-500">{a.detected}</td>
                  <td className="py-3 px-4"><span className="flex items-center gap-1.5 text-xs font-medium text-gray-700">{statusIcon[a.status]} {a.status}</span></td>
                  <td className="py-3 px-4 text-xs text-gray-500 max-w-[200px] truncate">{a.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
