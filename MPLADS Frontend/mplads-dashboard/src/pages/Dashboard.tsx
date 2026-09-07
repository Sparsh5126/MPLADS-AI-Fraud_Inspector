import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, AlertTriangle, Zap, Clock, IndianRupee, CheckCircle2, ArrowRight,
  Search, Network, CreditCard, ShieldCheck,
} from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { CategoryChart } from '../components/CategoryChart';
import { IndiaRiskMap } from '../components/IndiaRiskMap';
import { InvestigationTable } from '../components/InvestigationTable';
import { AlertList } from '../components/AlertList';
import { AnomalyTrendsChart } from '../components/AnomalyTrendsChart';
import { BudgetForecastChart } from '../components/BudgetForecastChart';
import { BlacklistedIAsList } from '../components/BlacklistedIAsList';
import { mockWorks, allStates, allDistricts, allCategories, allYears } from '../data/mockWorks';
import { mockAlerts } from '../data/mockAlerts';
import {
  filterWorks, computeKpis, computeCategoryStats,
  defaultFilters, type FilterState, formatCrore,
} from '../utils/filters';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [pendingFilters, setPendingFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);

  const filteredWorks = useMemo(() => filterWorks(mockWorks, appliedFilters), [appliedFilters]);
  const kpis = useMemo(() => computeKpis(filteredWorks), [filteredWorks]);
  const categoryStats = useMemo(() => computeCategoryStats(filteredWorks), [filteredWorks]);
  const priorityWorks = useMemo(
    () => filteredWorks.filter(w => w.risk_level === 'Critical' || w.risk_level === 'High').sort((a, b) => b.risk_score - a.risk_score).slice(0, 5),
    [filteredWorks]
  );

  const handleApply = () => setAppliedFilters({ ...pendingFilters });

  const quickActions = [
    { icon: <Search size={20} />, title: 'Investigate a Work', desc: 'Search and view detailed analysis for any work', path: '/works', color: '#EFF6FF', iconColor: '#2563EB' },
    { icon: <Network size={20} />, title: 'Vendor Network Analysis', desc: 'Explore connections between IAs and vendors', path: '/vendor-network', color: '#FFF7ED', iconColor: '#F97316' },
    { icon: <CreditCard size={20} />, title: 'Payment Analysis', desc: 'Detect suspicious payment patterns', path: '/payment-analysis', color: '#F0FDF4', iconColor: '#22C55E' },
    { icon: <ShieldCheck size={20} />, title: 'Compliance Rules', desc: 'Check rule violations and deviations', path: '/compliance', color: '#F5F3FF', iconColor: '#7C3AED' },
  ];

  return (
    <div className="space-y-5">
      {/* Page header + filters */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ministry Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Overview of MPLADS works, risk indicators and anomalies</p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">State</label>
            <select className="select-filter" value={pendingFilters.state} onChange={e => setPendingFilters(f => ({ ...f, state: e.target.value }))}>
              <option value="All">All</option>
              {allStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">District</label>
            <select className="select-filter" value={pendingFilters.district} onChange={e => setPendingFilters(f => ({ ...f, district: e.target.value }))}>
              <option value="All">All</option>
              {allDistricts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Category</label>
            <select className="select-filter" value={pendingFilters.category} onChange={e => setPendingFilters(f => ({ ...f, category: e.target.value }))}>
              <option value="All">All</option>
              {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Year</label>
            <select className="select-filter" value={pendingFilters.year} onChange={e => setPendingFilters(f => ({ ...f, year: e.target.value }))}>
              {allYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Risk Level</label>
            <select className="select-filter" value={pendingFilters.riskLevel} onChange={e => setPendingFilters(f => ({ ...f, riskLevel: e.target.value }))}>
              <option value="All">All</option>
              {['Critical', 'High', 'Medium', 'Low'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button onClick={handleApply} className="btn-primary">Apply</button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard icon={<Package size={18} className="text-blue-600" />} iconBg="#EFF6FF"
          label="Total Works" value={kpis.totalWorks.toLocaleString('en-IN')} trend={12} />
        <KpiCard icon={<AlertTriangle size={18} className="text-orange-500" />} iconBg="#FFF7ED"
          label="High Risk Works" value={kpis.highRiskWorks.toString()} trend={28} isRisk />
        <KpiCard icon={<Zap size={18} className="text-red-500" />} iconBg="#FEF2F2"
          label="Critical Works" value={kpis.criticalWorks.toString()} trend={50} isRisk />
        <KpiCard icon={<Clock size={18} className="text-amber-500" />} iconBg="#FFFBEB"
          label="Delayed Works" value={kpis.delayedWorks.toString()} trend={18} isRisk />
        <KpiCard icon={<IndianRupee size={18} className="text-green-600" />} iconBg="#F0FDF4"
          label="Total Sanctioned" value={formatCrore(kpis.totalSanctioned)} trend={9} />
        <KpiCard icon={<CheckCircle2 size={18} className="text-emerald-600" />} iconBg="#ECFDF5"
          label="Completed Works" value={kpis.completedWorks.toLocaleString('en-IN')} trend={15} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Anomaly Trends */}
        <div className="card">
          <p className="text-sm font-semibold text-gray-800 mb-4">Anomaly Trends (Past 5 Years)</p>
          <div className="h-44">
            <AnomalyTrendsChart />
          </div>
        </div>

        {/* Works by Category */}
        <div className="card">
          <p className="text-sm font-semibold text-gray-800 mb-4">Works by Category</p>
          <CategoryChart data={categoryStats.slice(0, 7)} />
        </div>

        {/* Geographic Risk Map */}
        <div className="card">
          <p className="text-sm font-semibold text-gray-800 mb-3">Geographic Risk Map</p>
          <IndiaRiskMap onViewFullMap={() => navigate('/map')} />
        </div>
      </div>

      {/* Financial & IA Risk row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Budget Forecasting */}
        <div className="card xl:col-span-2">
          <BudgetForecastChart />
        </div>

        {/* Blacklisted IAs */}
        <div className="card">
          <BlacklistedIAsList />
        </div>
      </div>

      {/* Investigations + Alerts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Priority Investigations */}
        <div className="card xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800">Priority Investigations</p>
            <button onClick={() => navigate('/investigations')} className="text-xs text-primary hover:text-primary-light font-medium flex items-center gap-1">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <InvestigationTable works={priorityWorks.length > 0 ? priorityWorks : filteredWorks.slice(0, 5)} limit={5} />
        </div>

        {/* Recent Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800">Recent Alerts</p>
            <button onClick={() => navigate('/investigations')} className="text-xs text-primary hover:text-primary-light font-medium flex items-center gap-1">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <AlertList alerts={mockAlerts} limit={5} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {quickActions.map(action => (
          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className="card card-hover flex items-start gap-3 text-left group w-full"
          >
            <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: action.color, color: action.iconColor }}>
              {action.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">{action.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{action.desc}</p>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          </button>
        ))}
      </div>
    </div>
  );
};
