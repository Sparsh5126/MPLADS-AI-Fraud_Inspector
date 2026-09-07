import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Clock, CheckCircle2, IndianRupee, TrendingUp,
  Calendar, Info, ArrowRight, AlertTriangle, Search, BarChart3,
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { MeerutDistrictMap } from '../components/MeerutDistrictMap';
import { districtWorkloadData } from '../data/meerutGeoData';

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const workStatus = [
  { name: 'Completed',   value: 612,  pct: 49.0, color: '#22C55E' },
  { name: 'In Progress', value: 512,  pct: 41.0, color: '#3B82F6' },
  { name: 'Not Started', value: 76,   pct: 6.1,  color: '#EAB308' },
  { name: 'Delayed',     value: 48,   pct: 3.9,  color: '#EF4444' },
];

const riskClassification = [
  { name: 'Critical', value: 150, pct: 12, color: '#EF4444' },
  { name: 'High',     value: 349, pct: 28, color: '#F97316' },
  { name: 'Medium',   value: 449, pct: 36, color: '#EAB308' },
  { name: 'Low',      value: 300, pct: 24, color: '#22C55E' },
];

const recommendedWorks = [
  { id: 1, title: 'Community health center', location: 'Mawana',     cost: '₹48.5 L', status: 'Under Review' },
  { id: 2, title: 'Library building',        location: 'Sardhana',   cost: '₹32.0 L', status: 'Pending' },
  { id: 3, title: 'Rural road (Phase 2)',    location: 'Daurala',    cost: '₹28.7 L', status: 'Pending' },
  { id: 4, title: 'Drinking water facility', location: 'Hastinapur', cost: '₹21.4 L', status: 'Approved' },
  { id: 5, title: 'Anganwadi center',        location: 'Kithor',     cost: '₹19.6 L', status: 'Under Review' },
];

const recentWorks = [
  { id: 'W1042', title: 'Community hall construction', location: 'Brahmpuri',  status: 'Completed' },
  { id: 'W0987', title: 'Primary school building',     location: 'Sardhana',   status: 'In Progress' },
  { id: 'W0931', title: 'Rural road development',      location: 'Daurala',    status: 'In Progress' },
  { id: 'W0876', title: 'Drinking water facility',     location: 'Mawana',     status: 'Delayed' },
  { id: 'W0763', title: 'Street light installation',   location: 'Hastinapur', status: 'Completed' },
];

const alerts = [
  { icon: AlertTriangle, color: 'text-red-500',    bg: 'bg-red-50',    msg: '18 works delayed beyond 6 months' },
  { icon: Clock,         color: 'text-orange-500', bg: 'bg-orange-50', msg: '32 works with low progress (< 25%)' },
  { icon: AlertTriangle, color: 'text-amber-500',  bg: 'bg-amber-50',  msg: '5 works pending completion certificate' },
  { icon: IndianRupee,   color: 'text-purple-500', bg: 'bg-purple-50', msg: '3 implementing agencies with high delay rate' },
  { icon: FileText,      color: 'text-blue-500',   bg: 'bg-blue-50',   msg: '12 works without recent progress update' },
];

const ConstituencyMap: React.FC = () => {
  return (
    <div className="mp-card min-w-0 overflow-hidden h-full lg:h-[300px] bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-900">Constituency-wise Work Distribution</h2>
          <div className="group relative cursor-help">
            <Info size={13} className="text-gray-400" />
            <div className="absolute left-5 top-0 hidden group-hover:block w-52 bg-gray-800 text-white text-xs rounded-lg p-2.5 z-50 shadow-lg">
              Number of Yatharth works per tehsil in Meerut constituency.
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg overflow-hidden border border-gray-100">
        <MeerutDistrictMap
          metric="workload"
          regionData={districtWorkloadData}
          height={240}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// DONUT CENTER LABEL
// ─────────────────────────────────────────────
const DonutCenter = ({ cx, cy, total, label }: { cx?: number; cy?: number; total: string; label: string }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
    <tspan x={cx} dy="-8" fontSize="20" fontWeight="700" fill="#1E293B">{total}</tspan>
    <tspan x={cx} dy="19" fontSize="10" fill="#94A3B8">{label}</tspan>
  </text>
);

// ─────────────────────────────────────────────
// MAIN MP DASHBOARD
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    'Completed':   'bg-green-100 text-green-700 border-green-200',
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
    'Delayed':     'bg-red-100 text-red-700 border-red-200',
    'Under Review':'bg-blue-100 text-blue-700 border-blue-200',
    'Pending':     'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Approved':    'bg-green-100 text-green-700 border-green-200',
    'Not Started': 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded border text-[10px] font-semibold ${styles[status] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  );
};

export const MPDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<number | null>(null);
  const [activeRisk, setActiveRisk] = useState<number | null>(null);

  return (
    <div className="space-y-5">

      {/* ── PAGE HEADING ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Welcome, Shri Rajendra Agrawal
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Track the progress of Yatharth works in your constituency and ensure greater impact
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm flex-shrink-0">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-xs text-gray-400">Last updated</span>
          <strong className="text-gray-700 text-xs">24 Jun 2025, 10:30 AM</strong>
          <span className="text-gray-400 text-xs">▾</span>
        </div>
      </div>

      {/* ── KPI ROW ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
        {/* 1. Total Sanctioned Works */}
        <div className="min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Total Sanctioned Works</p>
              <p className="text-[24px] font-extrabold text-gray-900 leading-tight">1,248</p>
              <p className="text-xs text-green-600 font-medium mt-0.5 flex items-center gap-1">
                <TrendingUp size={11} /> 12% from last year
              </p>
            </div>
          </div>
        </div>

        {/* 2. Works in Progress */}
        <div className="min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
              <Clock size={20} className="text-red-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Works in Progress</p>
              <p className="text-[24px] font-extrabold text-gray-900 leading-tight">512</p>
              <p className="text-xs text-green-600 font-medium mt-0.5 flex items-center gap-1">
                <TrendingUp size={11} /> 8% from last year
              </p>
            </div>
          </div>
        </div>

        {/* 3. Completed Works */}
        <div className="min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Completed Works</p>
              <p className="text-[24px] font-extrabold text-gray-900 leading-tight">612</p>
              <p className="text-xs text-green-600 font-medium mt-0.5 flex items-center gap-1">
                <TrendingUp size={11} /> 18% from last year
              </p>
            </div>
          </div>
        </div>

        {/* 4. Total Yatharth Fund */}
        <div className="min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
              <IndianRupee size={20} className="text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Total Yatharth Fund</p>
              <p className="text-[22px] font-extrabold text-gray-900 leading-tight">₹25.0 Cr</p>
              <p className="text-xs text-gray-400 mt-0.5">(₹5 Cr per year)</p>
            </div>
          </div>
        </div>

        {/* 5. Funds Utilised */}
        <div className="min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <BarChart3 size={20} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500">Funds Utilised</p>
              <p className="text-[22px] font-extrabold text-gray-900 leading-tight">₹18.4 Cr</p>
              <p className="text-xs text-gray-500 mt-0.5">74% of sanctioned</p>
              <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '74%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN ANALYTICS ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[300px] gap-5 items-stretch">
        {/* Constituency-wise Work Distribution */}
        <ConstituencyMap />

        {/* Work Status Donut */}
        <div className="mp-card min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold text-gray-900">Work Status</h2>
            <span className="text-xs text-gray-400">(All Works)</span>
            <div className="group relative cursor-help ml-0.5">
              <Info size={13} className="text-gray-400" />
              <div className="absolute left-5 top-0 hidden group-hover:block w-44 bg-gray-800 text-white text-xs rounded-lg p-2.5 z-50 shadow-lg">
                Current status breakdown of all 1,248 Yatharth works.
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 min-h-[190px]">
            <div className="w-[130px] h-[130px] flex-shrink-0">
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie
                    data={workStatus}
                    cx={60} cy={60}
                    innerRadius={42} outerRadius={60}
                    dataKey="value" paddingAngle={2}
                    onMouseEnter={(_, i) => setActiveStatus(i)}
                    onMouseLeave={() => setActiveStatus(null)}
                  >
                    {workStatus.map((entry, i) => (
                      <Cell key={entry.name} fill={entry.color}
                        opacity={activeStatus === null || activeStatus === i ? 1 : 0.35}
                        style={{ cursor: 'pointer', outline: 'none' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number, n: string) => [`${v} works`, n]}
                    contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #E2E8F0' }} />
                  <DonutCenter cx={60} cy={60} total="1,248" label="Works" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              {workStatus.map((s, i) => (
                <div key={s.name}
                  className="flex items-center justify-between text-xs cursor-pointer hover:opacity-75 transition-opacity"
                  onMouseEnter={() => setActiveStatus(i)}
                  onMouseLeave={() => setActiveStatus(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-gray-600 truncate">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                    <span className="font-bold text-gray-800">{s.value}</span>
                    <span className="text-gray-400">({s.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Works */}
        <div className="mp-card min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-gray-900">Recent Works</h2>
                <div className="group relative cursor-help">
                  <Info size={13} className="text-gray-400" />
                  <div className="absolute left-5 top-0 hidden group-hover:block w-40 bg-gray-800 text-white text-xs rounded-lg p-2 z-50 shadow-lg">
                    Latest Yatharth works activity.
                  </div>
                </div>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
                View All <ArrowRight size={12} />
              </button>
            </div>
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  {['#', 'Work ID', 'Title', 'Village / Location', 'Status'].map(h => (
                    <th key={h} className={`pb-1.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wider ${h === '#' ? 'pr-3' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-gray-50">
                {recentWorks.map((w, i) => (
                  <tr key={w.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-2 pr-3 text-gray-400 font-mono">{i + 1}</td>
                    <td className="py-2 pr-3 font-mono text-blue-600 font-semibold group-hover:text-blue-700 cursor-pointer">{w.id}</td>
                    <td className="py-2 pr-2 text-gray-700 truncate">{w.title}</td>
                    <td className="py-2 pr-2 text-gray-500 truncate">{w.location}</td>
                    <td className="py-2 whitespace-nowrap"><StatusBadge status={w.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── SECONDARY ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[320px] gap-5 items-stretch">

        {/* Recommended Works */}
        <div className="mp-card min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-gray-900">Recommended Works</h2>
              <div className="group relative cursor-help">
                <Info size={13} className="text-gray-400" />
                <div className="absolute left-5 top-0 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded-lg p-2.5 z-50 shadow-lg">
                  Works recommended for approval in your constituency.
                </div>
              </div>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="min-w-0 overflow-hidden">
            <table className="w-full table-fixed text-left border-collapse">
              <colgroup>
                <col style={{ width: '8%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '24%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr className="border-b border-gray-100">
                  {['#', 'Title', 'Proposed Location', 'Estimated Cost', 'Status', 'Action'].map(h => (
                    <th key={h} className={`pb-2 text-[9px] font-semibold text-gray-400 uppercase tracking-wider ${h === '#' ? 'pr-3' : h === 'Title' ? 'pl-2' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-gray-50">
                {recommendedWorks.map(w => (
                  <tr key={w.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-2.5 pr-3 text-gray-400">{w.id}</td>
                    <td className="py-2.5 pl-2 pr-1 text-gray-800 font-medium truncate">{w.title}</td>
                    <td className="py-2.5 pr-1 text-gray-500 truncate">{w.location}</td>
                    <td className="py-2.5 pr-1 font-semibold text-gray-800 whitespace-nowrap">{w.cost}</td>
                    <td className="py-2.5 pr-2 whitespace-nowrap"><StatusBadge status={w.status} /></td>
                    <td className="py-2.5 pl-2 text-right whitespace-nowrap">
                      <button className="min-w-[44px] text-[11px] font-semibold text-blue-600 border border-blue-200 rounded px-1.5 py-0.5 hover:bg-blue-50 transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Classification of Works — Risk Level */}
        <div className="mp-card min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Classification of Works</h2>
                <p className="text-[10px] text-gray-400">(Risk Level)</p>
              </div>
              <div className="group relative cursor-help">
                <Info size={13} className="text-gray-400" />
                <div className="absolute left-5 top-0 hidden group-hover:block w-52 bg-gray-800 text-white text-xs rounded-lg p-2.5 z-50 shadow-lg leading-relaxed">
                  Works classified by risk level: Critical, High, Medium, Low. Not by project category.
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/mp/classification')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5"
            >
              View Details <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 min-h-[190px]">
            <div className="w-[140px] h-[140px] flex-shrink-0">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie
                    data={riskClassification}
                    cx={65} cy={65}
                    innerRadius={46} outerRadius={64}
                    dataKey="value" paddingAngle={2}
                    onMouseEnter={(_, i) => setActiveRisk(i)}
                    onMouseLeave={() => setActiveRisk(null)}
                  >
                    {riskClassification.map((entry, i) => (
                      <Cell key={entry.name} fill={entry.color}
                        opacity={activeRisk === null || activeRisk === i ? 1 : 0.35}
                        style={{ cursor: 'pointer', outline: 'none' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number, n: string) => [`${v} works`, n]}
                    contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #E2E8F0' }} />
                  <DonutCenter cx={65} cy={65} total="1,248" label="Works" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {riskClassification.map((r, i) => (
                <div key={r.name}
                  className="flex items-center justify-between text-xs cursor-pointer hover:opacity-75 transition-opacity"
                  onMouseEnter={() => setActiveRisk(i)}
                  onMouseLeave={() => setActiveRisk(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: r.color }} />
                    <span className="text-gray-700 font-medium">{r.name}</span>
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

        {/* Alerts & Attention */}
        <div className="mp-card min-w-0 overflow-hidden h-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">Alerts & Attention</h2>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <button
                key={i}
                onClick={() => navigate('/mp/anomaly-analysis')}
                className="w-full flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors text-left group"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${a.bg}`}>
                  <a.icon size={15} className={a.color} />
                </div>
                <p className="min-w-0 truncate text-xs text-gray-700 font-medium leading-relaxed group-hover:text-gray-900">{a.msg}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            {
              icon: FileText, iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
              title: 'View My Works',
              desc: 'Search and manage your Yatharth works',
              path: '/mp/works',
            },
            {
              icon: Search, iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
              title: 'Analyze Anomalies',
              desc: 'Identify and investigate potential irregularities',
              path: '/mp/anomaly-analysis',
            },
            {
              icon: BarChart3, iconBg: 'bg-green-50', iconColor: 'text-green-600',
              title: 'Track Fund Utilization',
              desc: 'Monitor expenditure and fund-wise progress',
              path: '/mp/payments',
            },
            {
              icon: FileText, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
              title: 'Generate Report',
              desc: 'Create constituency reports (PDF / Excel)',
              path: '/mp/reports',
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
