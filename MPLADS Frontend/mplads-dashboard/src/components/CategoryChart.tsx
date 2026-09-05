import React, { useState } from 'react';
import type { CategoryStat } from '../utils/filters';

interface CategoryChartProps {
  data: CategoryStat[];
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="flex flex-col gap-2.5">
      {data.map((item, idx) => {
        const barWidth = (item.count / maxCount) * 100;
        const isHovered = hoveredIdx === idx;
        return (
          <div
            key={item.category}
            className="group relative"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-28 flex-shrink-0 truncate">{item.category}</span>
              <div className="flex-1 relative">
                <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: isHovered ? '#1D4ED8' : '#3B82F6',
                    }}
                  />
                </div>
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
                    {item.count} works · {item.percentage}%
                  </div>
                )}
              </div>
              <span className="text-xs font-semibold text-gray-700 w-8 text-right flex-shrink-0">{item.count}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
