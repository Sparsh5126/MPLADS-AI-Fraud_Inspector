import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import type { RiskDistribution } from '../utils/filters';

interface RiskChartProps {
  distribution: RiskDistribution;
  total: number;
  onFilterByRisk?: (risk: string) => void;
}

const RISK_DATA_CONFIG = [
  { key: 'critical', label: 'Critical', color: '#EF4444' },
  { key: 'high', label: 'High', color: '#F97316' },
  { key: 'medium', label: 'Medium', color: '#F59E0B' },
  { key: 'low', label: 'Low', color: '#22C55E' },
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius - 2} outerRadius={outerRadius + 6}
        startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-800">{d.label}</p>
        <p className="text-gray-600">{d.value} works ({d.percentage}%)</p>
      </div>
    );
  }
  return null;
};

export const RiskChart: React.FC<RiskChartProps> = ({ distribution, total, onFilterByRisk }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = RISK_DATA_CONFIG.map(cfg => ({
    label: cfg.label,
    key: cfg.key,
    value: distribution[cfg.key as keyof RiskDistribution],
    color: cfg.color,
    percentage: total > 0 ? ((distribution[cfg.key as keyof RiskDistribution] / total) * 100).toFixed(1) : '0',
  })).filter(d => d.value > 0);

  return (
    <div className="flex items-center gap-4 h-44">
      <div className="relative flex-shrink-0" style={{ width: 160, height: 160 }}>
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx={75} cy={75}
              innerRadius={48} outerRadius={70}
              dataKey="value"
              activeIndex={activeIndex ?? undefined}
              activeShape={renderActiveShape}
              onMouseEnter={(_, idx) => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={(d) => onFilterByRisk?.(d.label)}
              style={{ cursor: 'pointer', outline: 'none' }}
            >
              {data.map((entry, index) => (
                <Cell key={entry.key} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-lg font-bold text-gray-900">{total.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-gray-500">Works</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 flex-1">
        {RISK_DATA_CONFIG.map(cfg => {
          const val = distribution[cfg.key as keyof RiskDistribution];
          const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
          return (
            <div
              key={cfg.key}
              className="flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onFilterByRisk?.(cfg.label)}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color }} />
                <span className="text-sm text-gray-700">{cfg.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{val}</span>
                <span className="text-xs text-gray-400">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
