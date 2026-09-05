import React from 'react';
import type { RiskLevel } from '../data/mockWorks';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md' }) => {
  const classMap: Record<RiskLevel, string> = {
    Critical: 'badge-critical',
    High: 'badge-high',
    Medium: 'badge-medium',
    Low: 'badge-low',
  };

  return (
    <span className={`${classMap[level]} ${size === 'sm' ? 'text-[11px] px-2 py-0.5' : ''}`}>
      {level}
    </span>
  );
};

interface StatusBadgeProps {
  status: 'Open' | 'Reviewing' | 'Pending' | 'Resolved';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const classMap = {
    Open: 'status-open',
    Reviewing: 'status-reviewing',
    Pending: 'status-pending',
    Resolved: 'status-resolved',
  };

  return <span className={classMap[status]}>{status}</span>;
};
