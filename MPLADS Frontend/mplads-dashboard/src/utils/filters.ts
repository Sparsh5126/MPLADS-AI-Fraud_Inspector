import type { Work, RiskLevel } from '../data/mockWorks';

export interface FilterState {
  state: string;
  district: string;
  category: string;
  year: string;
  riskLevel: string;
}

export const defaultFilters: FilterState = {
  state: 'All',
  district: 'All',
  category: 'All',
  year: '2025',
  riskLevel: 'All',
};

export function filterWorks(works: Work[], filters: FilterState): Work[] {
  return works.filter(w => {
    if (filters.state !== 'All' && w.state !== filters.state) return false;
    if (filters.district !== 'All' && w.district !== filters.district) return false;
    if (filters.category !== 'All' && w.category !== filters.category) return false;
    if (filters.riskLevel !== 'All' && w.risk_level !== filters.riskLevel) return false;
    return true;
  });
}

export interface KpiStats {
  totalWorks: number;
  highRiskWorks: number;
  criticalWorks: number;
  delayedWorks: number;
  totalSanctioned: number;
  completedWorks: number;
}

export function computeKpis(works: Work[]): KpiStats {
  return {
    totalWorks: works.length,
    highRiskWorks: works.filter(w => w.risk_level === 'High' || w.risk_level === 'Critical').length,
    criticalWorks: works.filter(w => w.risk_level === 'Critical').length,
    delayedWorks: works.filter(w => w.status === 'Delayed' || w.status === 'Stalled').length,
    totalSanctioned: works.reduce((sum, w) => sum + w.sanctioned_amount, 0),
    completedWorks: works.filter(w => w.status === 'Completed').length,
  };
}

export interface RiskDistribution {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export function computeRiskDistribution(works: Work[]): RiskDistribution {
  return {
    critical: works.filter(w => w.risk_level === 'Critical').length,
    high: works.filter(w => w.risk_level === 'High').length,
    medium: works.filter(w => w.risk_level === 'Medium').length,
    low: works.filter(w => w.risk_level === 'Low').length,
  };
}

export interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
}

export function computeCategoryStats(works: Work[]): CategoryStat[] {
  const counts: Record<string, number> = {};
  works.forEach(w => { counts[w.category] = (counts[w.category] || 0) + 1; });
  const total = works.length || 1;
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count, percentage: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count);
}

export function formatAmount(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatCrore(amount: number): string {
  return `₹${(amount / 10000000).toFixed(1)} Cr`;
}
