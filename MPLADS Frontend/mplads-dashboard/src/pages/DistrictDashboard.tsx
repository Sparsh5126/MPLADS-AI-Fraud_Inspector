import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Calendar, Info, IndianRupee, AlertTriangle,
  ArrowRight, TrendingUp, Clock, Users, BarChart3, Search, CreditCard,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';
import { MeerutDistrictMap } from '../components/MeerutDistrictMap';
import { districtWorkloadData } from '../data/meerutGeoData';

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const worksStatus = [
  { name: 'Completed',   value: 214, pct: 62.6, color: '#22C55E' },
  { name: 'In Progress', value: 78,  pct: 22.8, color: '#3B82F6' },
  { name: 'Not Started', value: 32,  pct: 9.4,  color: '#EAB308' },
  { name: 'Delayed',     value: 18,  pct: 5.3,  color: '#EF4444' },
];

const upcomingSanctioned = [
  { id: 'W1102', title: 'Community hall construction', village: 'Kharkhoda', daysLeft: 3 },
  { id: 'W1120', title: 'Primary school building', village: 'Daurala', daysLeft: 7 },
  { id: 'W1134', title: 'Drainage system', village: 'Sardhana', daysLeft: 10 },
  { id: 'W1141', title: 'Street light installation', village: 'Mawana', daysLeft: 12 },
  { id: 'W1150', title: 'Water supply scheme', village: 'Hastinapur', daysLeft: 15 },
];

const recommendedWorks = [
  { id: 'RW028', title: 'Anganwadi building', cost: '₹18.5 L' },
  { id: 'RW031', title: 'Rural road construction', cost: '₹24.0 L' },
  { id: 'RW037', title: 'Solar street lights', cost: '₹12.6 L' },
  { id: 'RW041', title: 'Drinking water facility', cost: '₹21.8 L' },
  { id: 'RW046', title: 'Community center', cost: '₹27.4 L' },
];

const insights = [
  { icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-50', text: 'Works load in Meerut (City) is 2.3× higher than district average' },
  { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', text: '18 works pending sanction older than 60 days' },
  { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50', text: '5 implementing agencies with high delay rate' },
  { icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', text: 'Utilization lower than state average (72% vs 78%)' },
];

// ─────────────────────────────────────────────
// HEATMAP COMPONENT
// ─────────────────────────────────────────────
type HeatmapType = 'workload' | 'delay';

interface HeatmapProps {
  type: HeatmapType;
  title: string;
}

const DistrictHeatmap: React.FC<HeatmapProps> = ({ type, title }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col min-h-[340px]">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        <div className="group relative cursor-help">
          <Info size={14} className="text-gray-400" />
          <div className="absolute left-5 top-0 hidden group-hover:block w-52 bg-gray-800 text-white text-xs rounded-lg p-2.5 z-50 shadow-lg leading-relaxed">
            {type === 'workload'
              ? 'Shows concentration of Yatharth works across Meerut tehsils. Darker = more works assigned.'
              : 'Shows % of delayed works per tehsil. Red = high delay rate.'}
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg overflow-hidden border border-gray-100">
        <MeerutDistrictMap
          metric={type}
          regionData={districtWorkloadData}
          height={300}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// DAYS LEFT PILL
// ─────────────────────────────────────────────
const DaysLeftPill: React.FC<{ days: number }> = ({ days }) => {
  const style =
    days <= 5
      ? 'bg-red-100 text-red-700 border-red-200'
      : days <= 10
      ? 'bg-amber-100 text-amber-700 border-amber-200'
      : 'bg-blue-100 text-blue-700 border-blue-200';
  return (
    <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full border text-xs font-bold ${style}`}>
      {days}
    </span>
  );
};

// ─────────────────────────────────────────────
// RISK SCORE INFO TOOLTIP
// ─────────────────────────────────────────────
const RiskInfoTooltip: React.FC = () => (
  <div className="group relative inline-flex cursor-help">
    <Info size={14} className="text-purple-400" />
    <div className="absolute left-5 top-0 hidden group-hover:block w-56 bg-gray-800 text-white text-xs rounded-lg p-2.5 z-50 shadow-lg leading-relaxed">
      <strong className="block mb-1">Preliminary Risk Score</strong>
      This is a pre-score based on initial data indicators. It is NOT the final fraud risk assessment. Final scoring includes deep anomaly analysis by MoSPI.
    </div>
  </div>
);

// ─────────────────────────────────────────────
// DONUT CHART CUSTOM LABEL
// ─────────────────────────────────────────────
const DonutCenter = ({ cx, cy }: { cx?: number; cy?: number }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
    <tspan x={cx} dy="-8" fontSize="22" fontWeight="700" fill="#1E293B">342</tspan>
    <tspan x={cx} dy="20" fontSize="11" fill="#94A3B8">Works</tspan>
  </text>
);

// ─────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────
export const DistrictDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeDonut, setActiveDonut] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      {/* ── PAGE HEADING ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#0D233D] tracking-tight leading-tight">
            Welcome, Meerut
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Monitor Yatharth works, track progress and address potential anomalies
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-xs text-gray-500">Last updated</span>
          <strong className="text-gray-700 text-xs">24 Jun 2025, 10:30 AM</strong>
          <button className="text-gray-400 hover:text-gray-600 ml-0.5">▾</button>
        </div>
      </div>

      {/* ── KPI ROW (5 cards) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {/* 1. Total Works */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-50">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Total Works</p>
              <p className="text-[26px] font-extrabold text-gray-900 leading-tight">342</p>
              <p className="text-xs text-green-600 font-medium mt-0.5 flex items-center gap-1">
                <TrendingUp size={11} /> 6% from last year
              </p>
            </div>
          </div>
        </div>

        {/* 2. Sanctioned Due */}
        <div className="bg-red-50 border border-red-100 rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-100">
              <Calendar size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-red-700">Sanctioned Due</p>
              <p className="text-[26px] font-extrabold text-red-700 leading-tight">18</p>
              <p className="text-xs text-red-500 font-medium mt-0.5">Works not yet sanctioned</p>
            </div>
          </div>
        </div>

        {/* 3. Preliminary Risk Score */}
        <div className="bg-purple-50 border border-purple-100 rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100">
              <BarChart3 size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-purple-700">Preliminary Risk Score</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[26px] font-extrabold text-purple-800 leading-tight">0.62</p>
                <RiskInfoTooltip />
              </div>
              <p className="text-xs text-purple-600 font-medium">Moderate risk</p>
            </div>
          </div>
        </div>

        {/* 4. Funds Utilised */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-50">
              <IndianRupee size={20} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500">Funds Utilised</p>
              <p className="text-[22px] font-extrabold text-gray-900 leading-tight">₹68.3 Cr</p>
              <p className="text-xs text-gray-500 mt-0.5">72% of sanctioned</p>
              <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Needs Attention */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-amber-700">Needs Attention</p>
              <p className="text-[26px] font-extrabold text-amber-700 leading-tight">42</p>
              <p className="text-xs text-amber-600 font-medium mt-0.5">Works require review</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO HEATMAPS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DistrictHeatmap type="workload" title="Works Load Heatmap" />
        <DistrictHeatmap type="delay" title="Delay Heatmap" />
      </div>

      {/* ── LOWER ROW: Works Status + Upcoming Sanctioned Due + Key Insights ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Works Status Donut */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Works Status</h2>
          <div className="flex items-center gap-4">
            <div className="relative" style={{ width: 130, height: 130, flexShrink: 0 }}>
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie
                    data={worksStatus}
                    cx={60}
                    cy={60}
                    innerRadius={42}
                    outerRadius={60}
                    dataKey="value"
                    paddingAngle={2}
                    onMouseEnter={(_, i) => setActiveDonut(i)}
                    onMouseLeave={() => setActiveDonut(null)}
                  >
                    {worksStatus.map((entry, i) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                        opacity={activeDonut === null || activeDonut === i ? 1 : 0.4}
                        style={{ cursor: 'pointer', outline: 'none' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number, name: string) => [`${val} works`, name]}
                    contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #E2E8F0' }}
                  />
                  <DonutCenter cx={60} cy={60} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              {worksStatus.map((s, i) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between text-xs cursor-pointer hover:opacity-80 transition-opacity"
                  onMouseEnter={() => setActiveDonut(i)}
                  onMouseLeave={() => setActiveDonut(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-gray-600 truncate">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
                    <span className="font-bold text-gray-800">{s.value}</span>
                    <span className="text-gray-400">({s.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Sanctioned Due */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">Upcoming Sanctioned Due</h2>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                {['#', 'Work ID', 'Title', 'Village', 'Days Left'].map(h => (
                  <th key={h} className="pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-50">
              {upcomingSanctioned.map((w, i) => (
                <tr key={w.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-2.5 text-gray-400 font-mono">{i + 1}</td>
                  <td className="py-2.5 font-mono font-semibold text-blue-600 group-hover:text-blue-700 cursor-pointer">{w.id}</td>
                  <td className="py-2.5 text-gray-700 max-w-[100px] truncate">{w.title}</td>
                  <td className="py-2.5 text-gray-500">{w.village}</td>
                  <td className="py-2.5"><DaysLeftPill days={w.daysLeft} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Insights */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold text-gray-900">Key Insights</h2>
            <div className="group relative cursor-help">
              <Info size={14} className="text-gray-400" />
              <div className="absolute left-5 top-0 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded-lg p-2.5 z-50 shadow-lg">
                AI-generated insights based on current district data.
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${ins.bg}`}>
                  <ins.icon size={15} className={ins.color} />
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECOMMENDED WORKS ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Recommended Works</h2>
            <p className="text-xs text-gray-400 mt-0.5">Pending Approval</p>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                {['#', 'Work ID', 'Title', 'Estimated Cost'].map(h => (
                  <th key={h} className="pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-50">
              {recommendedWorks.map((w, i) => (
                <tr key={w.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-2.5 text-gray-400 font-mono">{i + 1}</td>
                  <td className="py-2.5 font-mono font-semibold text-blue-600 group-hover:text-blue-700 cursor-pointer">{w.id}</td>
                  <td className="py-2.5 text-gray-700 font-medium">{w.title}</td>
                  <td className="py-2.5 font-semibold text-gray-800">{w.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            {
              icon: FileText, iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
              title: 'View All Works', desc: 'Search and manage Yatharth works in Meerut',
              path: '/district/works',
            },
            {
              icon: Search, iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
              title: 'Analyze Anomalies', desc: 'Identify and investigate potential irregularities',
              path: '/district/anomaly-analysis',
            },
            {
              icon: CreditCard, iconBg: 'bg-green-50', iconColor: 'text-green-600',
              title: 'Track Payments', desc: 'Monitor fund disbursement and payment status',
              path: '/district/payments',
            },
            {
              icon: BarChart3, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
              title: 'Generate Report', desc: 'Create district-level reports (PDF / Excel)',
              path: '/district/reports',
            },
          ].map(action => (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between text-left group hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${action.iconBg} group-hover:scale-105 transition-transform`}>
                  <action.icon size={20} className={action.iconColor} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{action.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-tight">{action.desc}</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
