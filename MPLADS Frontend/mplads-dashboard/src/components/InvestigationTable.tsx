import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiskBadge, StatusBadge } from './RiskBadge';
import type { Work, InvestigationStatus } from '../data/mockWorks';
import { formatAmount } from '../utils/filters';
import { ChevronUp, ChevronDown, Eye } from 'lucide-react';

interface InvestigationTableProps {
  works: Work[];
  limit?: number;
  showPagination?: boolean;
}

type SortKey = 'risk_score' | 'sanctioned_amount' | 'work_id' | 'district';
type SortDir = 'asc' | 'desc';

export const InvestigationTable: React.FC<InvestigationTableProps> = ({
  works, limit, showPagination = false,
}) => {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>('risk_score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
    setPage(0);
  };

  const sorted = [...works].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const displayed = limit ? sorted.slice(0, limit) : showPagination ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;
  const totalPages = Math.ceil(sorted.length / pageSize);

  const SortIcon: React.FC<{ col: SortKey }> = ({ col }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="text-gray-300" />;
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-primary" /> : <ChevronDown size={12} className="text-primary" />;
  };

  const ThSort: React.FC<{ col: SortKey; children: React.ReactNode }> = ({ col, children }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-gray-700 select-none"
      onClick={() => handleSort(col)}
    >
      <div className="flex items-center gap-1">
        {children}
        <SortIcon col={col} />
      </div>
    </th>
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
              <ThSort col="work_id">Work ID</ThSort>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
              <ThSort col="district">District</ThSort>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
              <ThSort col="sanctioned_amount">Amount</ThSort>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Risk</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Main Reason</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((work, idx) => (
              <tr
                key={work.work_id}
                className="table-row-hover border-b border-gray-50"
                onClick={() => navigate(`/works/${work.work_id}`)}
              >
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {showPagination ? page * pageSize + idx + 1 : idx + 1}
                </td>
                <td className="px-4 py-3 font-mono font-semibold text-primary text-xs">{work.work_id}</td>
                <td className="px-4 py-3 text-gray-700 max-w-[160px] truncate">{work.title}</td>
                <td className="px-4 py-3 text-gray-600">{work.district}</td>
                <td className="px-4 py-3 text-gray-600">{work.category}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{formatAmount(work.sanctioned_amount)}</td>
                <td className="px-4 py-3"><RiskBadge level={work.risk_level} /></td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-[140px] truncate">{work.main_reason || '—'}</td>
                <td className="px-4 py-3">
                  {work.investigation_status ? <StatusBadge status={work.investigation_status} /> : <span className="text-gray-400 text-xs">—</span>}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/works/${work.work_id}`); }}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary-light font-medium border border-primary/20 hover:border-primary/40 rounded-lg px-2.5 py-1.5 transition-all"
                  >
                    <Eye size={12} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >Prev</button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-3 py-1 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >Next</button>
          </div>
        </div>
      )}
    </div>
  );
};
