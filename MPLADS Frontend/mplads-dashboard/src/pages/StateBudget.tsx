import React, { useState } from 'react';
import { IndianRupee, TrendingUp, PieChart as PieIcon, Download, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const districtBudget = [
  { district: 'Varanasi', sanctioned: 310, utilized: 273, pending: 37 },
  { district: 'Kanpur Nagar', sanctioned: 224, utilized: 204, pending: 20 },
  { district: 'Agra', sanctioned: 178, utilized: 169, pending: 9 },
  { district: 'Lucknow', sanctioned: 256, utilized: 182, pending: 74 },
  { district: 'Ghaziabad', sanctioned: 188, utilized: 154, pending: 34 },
  { district: 'Meerut', sanctioned: 164, utilized: 128, pending: 36 },
  { district: 'Prayagraj', sanctioned: 290, utilized: 247, pending: 43 },
  { district: 'Saharanpur', sanctioned: 112, utilized: 65, pending: 47 },
];

const quarterlyTrend = [
  { quarter: 'Q1 FY25', released: 420, utilized: 380 },
  { quarter: 'Q2 FY25', released: 510, utilized: 462 },
  { quarter: 'Q3 FY25', released: 680, utilized: 598 },
  { quarter: 'Q4 FY25', released: 790, utilized: 712 },
  { quarter: 'Q1 FY26', released: 640, utilized: 556 },
];

const categoryDistribution = [
  { name: 'Infrastructure', value: 42, color: '#3B82F6' },
  { name: 'Education', value: 18, color: '#8B5CF6' },
  { name: 'Health', value: 14, color: '#10B981' },
  { name: 'Sanitation', value: 12, color: '#F59E0B' },
  { name: 'Others', value: 14, color: '#6B7280' },
];

const totalSanctioned = districtBudget.reduce((a, b) => a + b.sanctioned, 0);
const totalUtilized = districtBudget.reduce((a, b) => a + b.utilized, 0);
const totalPending = districtBudget.reduce((a, b) => a + b.pending, 0);

export const StateBudget: React.FC = () => {
  const [view, setView] = useState<'district' | 'trend'>('district');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Budget & Utilization</h1>
          <p className="text-sm text-gray-500 mt-1">Fund allocation, expenditure tracking and utilization analysis for Uttar Pradesh</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={15} /> Export Budget Report
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Sanctioned', value: `₹${totalSanctioned} Cr`, icon: <IndianRupee size={20} className="text-blue-600" />, bg: '#EFF6FF', color: 'text-blue-700' },
          { label: 'Total Utilized', value: `₹${totalUtilized} Cr`, icon: <CheckCircle2 size={20} className="text-green-600" />, bg: '#F0FDF4', color: 'text-green-700' },
          { label: 'Pending Release', value: `₹${totalPending} Cr`, icon: <Clock size={20} className="text-amber-500" />, bg: '#FFFBEB', color: 'text-amber-700' },
        ].map(c => (
          <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.bg }}>{c.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{c.label}</p>
              <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">FY 2025–26</p>
            </div>
          </div>
        ))}
      </div>

      {/* Overall utilization meter */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-800">Overall Budget Utilization</h2>
          <span className="text-lg font-bold text-blue-700">{Math.round((totalUtilized / totalSanctioned) * 100)}%</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all" style={{ width: `${(totalUtilized / totalSanctioned) * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1.5">
          <span>₹0 Cr</span>
          <span>₹{totalSanctioned} Cr sanctioned</span>
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2">
        {(['district', 'trend'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === v ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {v === 'district' ? 'District-wise' : 'Quarterly Trend'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main chart */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            {view === 'district' ? 'District-wise Budget (₹ Cr)' : 'Quarterly Budget Trend (₹ Cr)'}
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            {view === 'district' ? (
              <BarChart data={districtBudget} margin={{ top: 4, right: 10, left: -5, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="district" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="sanctioned" fill="#BFDBFE" radius={[4, 4, 0, 0]} name="Sanctioned" />
                <Bar dataKey="utilized" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Utilized" />
              </BarChart>
            ) : (
              <BarChart data={quarterlyTrend} margin={{ top: 4, right: 10, left: -5, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="released" fill="#BFDBFE" radius={[4, 4, 0, 0]} name="Released" />
                <Bar dataKey="utilized" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Utilized" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2"><PieIcon size={15} className="text-blue-500" /> By Category</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {categoryDistribution.map(c => <Cell key={c.name} fill={c.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryDistribution.map(c => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-gray-600">{c.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-700">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
