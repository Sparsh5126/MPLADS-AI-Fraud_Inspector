import React, { useState, useMemo } from 'react';
import { InvestigationTable } from '../components/InvestigationTable';
import { RiskBadge } from '../components/RiskBadge';
import { mockWorks, allStates, allDistricts, allCategories } from '../data/mockWorks';
import { filterWorks, defaultFilters, type FilterState } from '../utils/filters';

export const Works: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [applied, setApplied] = useState<FilterState>(defaultFilters);

  const filtered = useMemo(() => filterWorks(mockWorks, applied), [applied]);
  const sortedByRisk = useMemo(() => [...filtered].sort((a, b) => b.risk_score - a.risk_score), [filtered]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Works</h1>
          <p className="text-sm text-gray-500 mt-0.5">Browse and filter all Yatharth works</p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">State</label>
            <select className="select-filter" value={filters.state} onChange={e => setFilters(f => ({ ...f, state: e.target.value }))}>
              <option value="All">All States</option>
              {allStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">District</label>
            <select className="select-filter" value={filters.district} onChange={e => setFilters(f => ({ ...f, district: e.target.value }))}>
              <option value="All">All Districts</option>
              {allDistricts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Category</label>
            <select className="select-filter" value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
              <option value="All">All Categories</option>
              {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Risk Level</label>
            <select className="select-filter" value={filters.riskLevel} onChange={e => setFilters(f => ({ ...f, riskLevel: e.target.value }))}>
              <option value="All">All</option>
              {['Critical', 'High', 'Medium', 'Low'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button onClick={() => setApplied({ ...filters })} className="btn-primary">Apply</button>
        </div>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-2">
        {(['Critical', 'High', 'Medium', 'Low'] as const).map(level => {
          const count = filtered.filter(w => w.risk_level === level).length;
          return (
            <div key={level} className="card flex items-center gap-2 px-3 py-2">
              <RiskBadge level={level} size="sm" />
              <span className="text-sm font-semibold text-gray-700">{count}</span>
            </div>
          );
        })}
        <div className="card flex items-center gap-2 px-3 py-2">
          <span className="text-xs text-gray-500">Total</span>
          <span className="text-sm font-semibold text-gray-700">{filtered.length}</span>
        </div>
      </div>

      <div className="card">
        <InvestigationTable works={sortedByRisk} showPagination />
      </div>
    </div>
  );
};
