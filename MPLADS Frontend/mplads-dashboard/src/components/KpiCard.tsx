import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  trend: number;
  trendLabel?: string;
  isRisk?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  icon, iconBg, label, value, trend, trendLabel = 'vs last year', isRisk = false,
}) => {
  const isPositiveTrend = trend > 0;
  // For risk metrics, positive trend = bad (red). For good metrics, positive = green.
  const trendGood = isRisk ? !isPositiveTrend : isPositiveTrend;
  const trendColor = trendGood ? 'text-green-600' : 'text-red-500';
  const TrendIcon = trend === 0 ? Minus : isPositiveTrend ? TrendingUp : TrendingDown;

  return (
    <div className="card card-hover flex items-start gap-3 p-4">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-500 mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
        <div className={`flex items-center gap-1 mt-1 ${trendColor}`}>
          <TrendIcon size={13} />
          <span className="text-xs font-medium">{trend > 0 ? '+' : ''}{trend}%</span>
          <span className="text-xs text-gray-400">{trendLabel}</span>
        </div>
      </div>
    </div>
  );
};
