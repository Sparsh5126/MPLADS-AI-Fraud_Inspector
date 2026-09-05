import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, AlertTriangle, IndianRupee, CheckCircle2, ArrowRight,
  Search, BarChart3, Users,
} from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { RiskChart } from '../components/RiskChart';
import { StateUPRiskMap } from '../components/StateUPRiskMap';

// Mock UP District Data for State Dashboard
const upDistrictData = {
  'Meerut': { name: 'Meerut', totalWorks: 342, highRisk: 28, critical: 9, riskLevel: 'Critical' as const },
  'Baghpat': { name: 'Baghpat', totalWorks: 281, highRisk: 21, critical: 6, riskLevel: 'Critical' as const },
  'Ghaziabad': { name: 'Ghaziabad', totalWorks: 276, highRisk: 18, critical: 5, riskLevel: 'High' as const },
  'Lucknow': { name: 'Lucknow', totalWorks: 412, highRisk: 17, critical: 4, riskLevel: 'High' as const },
  'Saharanpur': { name: 'Saharanpur', totalWorks: 265, highRisk: 16, critical: 4, riskLevel: 'Medium' as const },
  'Varanasi': { name: 'Varanasi', totalWorks: 512, highRisk: 12, critical: 2, riskLevel: 'Medium' as const },
  'Kanpur Nagar': { name: 'Kanpur Nagar', totalWorks: 388, highRisk: 8, critical: 1, riskLevel: 'Low' as const },
  'Agra': { name: 'Agra', totalWorks: 310, highRisk: 5, critical: 0, riskLevel: 'Low' as const },
};

const recentAlerts = [
  { id: '1', date: '24 Jun 2025, 08:12', workId: 'W1042', district: 'Meerut', issue: 'Unusual increase in cost', risk: 'Critical', status: 'Open' },
  { id: '2', date: '23 Jun 2025, 16:45', workId: 'W0871', district: 'Saharanpur', issue: 'Image location mismatch', risk: 'High', status: 'Reviewing' },
  { id: '3', date: '23 Jun 2025, 11:20', workId: 'W0931', district: 'Ghaziabad', issue: 'Possible duplicate work', risk: 'High', status: 'Open' },
  { id: '4', date: '22 Jun 2025, 14:05', workId: 'W0678', district: 'Lucknow', issue: 'High expenditure, low progress', risk: 'Medium', status: 'Pending' },
  { id: '5', date: '22 Jun 2025, 09:30', workId: 'W0551', district: 'Varanasi', issue: 'Delay in work completion', risk: 'Medium', status: 'Open' },
];

const riskDistribution = [
  { name: 'Critical', value: 6, color: '#EF4444' },
  { name: 'High', value: 481, color: '#F97316' },
  { name: 'Medium', value: 1924, color: '#EAB308' },
  { name: 'Low', value: 10431, color: '#22C55E' },
];

export const StateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [districtFilter, setDistrictFilter] = useState('All Districts');

  const quickActions = [
    { icon: <Search size={20} />, title: 'View All Works', desc: 'Search and explore MPLADS works', path: '/state/works' },
    { icon: <BarChart3 size={20} />, title: 'Analyze Anomalies', desc: 'Detailed anomaly analysis and trends', path: '/state/anomaly-analysis' },
    { icon: <IndianRupee size={20} />, title: 'Budget & Utilization', desc: 'Fund allocation and expenditure', path: '/state/budget' },
    { icon: <Users size={20} />, title: 'IAS Performance', desc: 'Monitor district performance', path: '/state/ias-performance' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome, Uttar Pradesh</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor MPLADS implementation and address potential anomalies</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
          <FileText size={14} className="text-gray-400" />
          <span>Last updated: <strong>24 Jun 2025, 10:30 AM</strong></span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard icon={<FileText size={20} className="text-blue-600" />} iconBg="#EFF6FF"
          label="Total Works" value="12,842" trend={8} />
        <KpiCard icon={<AlertTriangle size={20} className="text-red-500" />} iconBg="#FEF2F2"
          label="High Risk Works" value="487" trend={22} isRisk />
        <KpiCard icon={<IndianRupee size={20} className="text-amber-500" />} iconBg="#FFFBEB"
          label="Total Sanctioned Amount" value="₹3,246 Cr" trend={11} />
        <KpiCard icon={<CheckCircle2 size={20} className="text-green-600" />} iconBg="#F0FDF4"
          label="Completed Works" value="7,892" trend={14} />
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Risk Distribution Donut */}
        <div className="card bg-white border border-gray-200 rounded-xl shadow-sm p-5 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Risk Distribution</h2>
            <select 
              value={districtFilter} 
              onChange={e => setDistrictFilter(e.target.value)}
              className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none"
            >
              <option>All Districts</option>
              {Object.keys(upDistrictData).map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="h-64">
            <RiskChart distribution={{ critical: 6, high: 481, medium: 1924, low: 10431 }} total={12842} />
          </div>
        </div>

        {/* District-wise Overview */}
        <div className="card bg-white border border-gray-200 rounded-xl shadow-sm p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">District-wise Overview</h2>
            <button onClick={() => navigate('/state/districts')} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All Districts <ArrowRight size={12} />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 h-[260px]">
            {/* UP Map */}
            <div className="w-full md:w-1/2 h-full bg-blue-50/30 rounded-xl border border-blue-50 relative overflow-hidden">
              <StateUPRiskMap districtData={upDistrictData} onDistrictClick={(d) => navigate(`/state/districts`)} />
            </div>
            
            {/* Top 5 Districts Table */}
            <div className="w-full md:w-1/2 flex flex-col">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Top 5 Districts by Risk</h3>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-2 text-xs font-medium text-gray-400 font-mono w-8">#</th>
                      <th className="pb-2 text-xs font-medium text-gray-500">District</th>
                      <th className="pb-2 text-xs font-medium text-gray-500 text-right">High Risk</th>
                      <th className="pb-2 text-xs font-medium text-gray-500 text-right">Critical</th>
                      <th className="pb-2 text-xs font-medium text-gray-500 text-right pr-2">Total Works</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {Object.values(upDistrictData).slice(0, 5).map((d, i) => (
                      <tr key={d.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => navigate('/state/districts')}>
                        <td className="py-2.5 text-xs text-gray-400 font-mono">{i + 1}</td>
                        <td className="py-2.5 font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{d.name}</td>
                        <td className="py-2.5 text-right text-orange-600 font-semibold">{d.highRisk}</td>
                        <td className="py-2.5 text-right text-red-600 font-semibold">{d.critical}</td>
                        <td className="py-2.5 text-right text-gray-600 pr-2">{d.totalWorks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="card bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Recent Alerts</h2>
          <button onClick={() => navigate('/state/anomaly-analysis')} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View All Alerts <ArrowRight size={12} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-100">
                <th className="py-2.5 px-3 text-xs font-medium text-gray-500 w-10">#</th>
                <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Date & Time</th>
                <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Work ID</th>
                <th className="py-2.5 px-3 text-xs font-medium text-gray-500">District</th>
                <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Issue</th>
                <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Risk Level</th>
                <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Status</th>
                <th className="py-2.5 px-3 text-xs font-medium text-gray-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {recentAlerts.map((alert, i) => (
                <tr key={alert.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="py-3 px-3 text-xs text-gray-400 font-mono">{i + 1}</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">{alert.date}</td>
                  <td className="py-3 px-3 font-mono text-blue-600 font-medium text-xs">{alert.workId}</td>
                  <td className="py-3 px-3 font-medium text-gray-700">{alert.district}</td>
                  <td className="py-3 px-3 text-gray-800">{alert.issue}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                      ${alert.risk === 'Critical' ? 'bg-red-100 text-red-700' : 
                        alert.risk === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {alert.risk}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-xs font-medium
                      ${alert.status === 'Open' ? 'text-red-600' : 
                        alert.status === 'Reviewing' ? 'text-blue-600' : 'text-amber-600'}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button onClick={() => navigate(`/state/works/${alert.workId}`)} className="text-[11px] font-semibold text-blue-600 border border-blue-200 rounded px-3 py-1 hover:bg-blue-50 transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {quickActions.map(action => (
          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between group hover:border-blue-400 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {action.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
