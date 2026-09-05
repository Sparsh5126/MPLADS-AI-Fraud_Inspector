import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getScoreColor, getScoreStatus } from '../utils/riskCalculations';

interface DetectorCardProps {
  name: string;
  score: number;
  description: string;
  onViewAnalysis?: () => void;
}

export const DetectorCard: React.FC<DetectorCardProps> = ({ name, score, description, onViewAnalysis }) => {
  const status = getScoreStatus(score);
  const color = getScoreColor(score);
  const pct = Math.round(score * 100);

  return (
    <div className="card border-l-4 hover:shadow-card-hover transition-shadow" style={{ borderLeftColor: color }}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: color + '18', color }}
        >
          {status.label}
        </span>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Score</span>
          <span className="text-sm font-bold" style={{ color }}>{score.toFixed(2)}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-2 leading-relaxed">{description}</p>
      {onViewAnalysis && (
        <button
          onClick={onViewAnalysis}
          className="text-xs text-primary hover:text-primary-light font-medium"
        >
          View Analysis →
        </button>
      )}
    </div>
  );
};

interface EvidenceCardProps {
  type: string;
  title: string;
  summary: string;
  details: Array<{ label: string; value: string }>;
  color?: string;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ type, title, summary, details, color = '#EF4444' }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
          style={{ backgroundColor: color + '18', color }}
        >
          {type}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{summary}</p>
        </div>
        <div className="flex-shrink-0 mt-0.5">
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
          <div className="pt-3 space-y-2">
            {details.map((d, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                <span className="text-gray-500 flex-shrink-0 min-w-[180px]">{d.label}:</span>
                <span className="font-medium text-gray-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
