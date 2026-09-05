import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndiaRiskMap } from '../components/IndiaRiskMap';
import { InvestigationTable } from '../components/InvestigationTable';
import { mockWorks, allStates, allDistricts } from '../data/mockWorks';
import { useState } from 'react';

export const MapView: React.FC = () => {
  const navigate = useNavigate();
  const [stateFilter, setStateFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('2025');

  const filtered = useMemo(() => mockWorks.filter(w => {
    if (stateFilter !== 'All' && w.state !== stateFilter) return false;
    if (districtFilter !== 'All' && w.district !== districtFilter) return false;
    if (riskFilter !== 'All' && w.risk_level !== riskFilter) return false;
    return true;
  }), [stateFilter, districtFilter, riskFilter]);

  const stats = useMemo(() => ({
    total: filtered.length,
    critical: filtered.filter(w => w.risk_level === 'Critical').length,
    high: filtered.filter(w => w.risk_level === 'High').length,
    avgRisk: filtered.length > 0 ? Math.round(filtered.reduce((s, w) => s + w.risk_score, 0) / filtered.length) : 0,
  }), [filtered]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Map View</h1>
        <p className="text-sm text-gray-500 mt-0.5">Geographic distribution of MPLADS works and risk concentration</p>
      </div>

      {/* Filters */}
      <div className="card flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-[11px] font-medium text-gray-500 mb-1">State</label>
          <select className="select-filter" value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
            <option value="All">All States</option>
            {allStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-medium text-gray-500 mb-1">District</label>
          <select className="select-filter" value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}>
            <option value="All">All Districts</option>
            {allDistricts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-medium text-gray-500 mb-1">Risk Level</label>
          <select className="select-filter" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
            <option value="All">All</option>
            {['Critical', 'High', 'Medium', 'Low'].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-medium text-gray-500 mb-1">Year</label>
          <select className="select-filter" value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
            {['2023', '2024', '2025'].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Works', value: stats.total, color: 'text-gray-900' },
          { label: 'Critical Works', value: stats.critical, color: 'text-red-600' },
          { label: 'High Risk Works', value: stats.high, color: 'text-orange-500' },
          { label: 'Avg Risk Score', value: stats.avgRisk, color: 'text-gray-900' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card py-3">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Full map */}
      <div className="card" style={{ minHeight: 380 }}>
        <p className="text-sm font-semibold text-gray-800 mb-3">India Risk Overview</p>
        <div style={{ height: 320 }}>
          <IndiaRiskMap />
        </div>
      </div>

      {/* Works in filtered area */}
      <div className="card">
        <p className="text-sm font-semibold text-gray-800 mb-4">
          Works in Selected Area <span className="text-xs font-normal text-gray-400 ml-2">({filtered.length} works)</span>
        </p>
        <InvestigationTable works={filtered.slice(0, 20)} />
      </div>
    </div>
  );
};
