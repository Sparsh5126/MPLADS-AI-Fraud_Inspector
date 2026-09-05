import type { RiskLevel } from '../data/mockWorks';

export const riskColors: Record<RiskLevel, { bg: string; text: string; border: string; dot: string }> = {
  Critical: { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA', dot: '#EF4444' },
  High: { bg: '#FFF7ED', text: '#EA580C', border: '#FED7AA', dot: '#F97316' },
  Medium: { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A', dot: '#F59E0B' },
  Low: { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0', dot: '#22C55E' },
};

export const riskChartColors: Record<RiskLevel, string> = {
  Critical: '#EF4444',
  High: '#F97316',
  Medium: '#F59E0B',
  Low: '#22C55E',
};

export function getRiskBadgeClass(risk: RiskLevel): string {
  switch (risk) {
    case 'Critical': return 'badge-critical';
    case 'High': return 'badge-high';
    case 'Medium': return 'badge-medium';
    case 'Low': return 'badge-low';
  }
}

export function getScoreColor(score: number): string {
  if (score >= 0.75) return '#EF4444';
  if (score >= 0.50) return '#F97316';
  if (score >= 0.30) return '#F59E0B';
  return '#22C55E';
}

export function getScoreStatus(score: number): { label: string; color: string } {
  if (score >= 0.75) return { label: 'Flagged', color: '#EF4444' };
  if (score >= 0.45) return { label: 'Warning', color: '#F97316' };
  return { label: 'Normal', color: '#22C55E' };
}

export function getRiskFromScore(score: number): RiskLevel {
  if (score >= 75) return 'Critical';
  if (score >= 55) return 'High';
  if (score >= 35) return 'Medium';
  return 'Low';
}
