import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvestigationTable } from '../components/InvestigationTable';
import { AlertList } from '../components/AlertList';
import { mockWorks } from '../data/mockWorks';
import { mockAlerts } from '../data/mockAlerts';

export const Investigations: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'open' | 'reviewing' | 'pending' | 'resolved'>('open');

  const byStatus = useMemo(() => ({
    open: mockWorks.filter(w => w.investigation_status === 'Open').sort((a, b) => b.risk_score - a.risk_score),
    reviewing: mockWorks.filter(w => w.investigation_status === 'Reviewing').sort((a, b) => b.risk_score - a.risk_score),
    pending: mockWorks.filter(w => w.investigation_status === 'Pending').sort((a, b) => b.risk_score - a.risk_score),
    resolved: mockWorks.filter(w => w.investigation_status === 'Resolved').sort((a, b) => b.risk_score - a.risk_score),
  }), []);

  const tabs = [
    { key: 'open', label: 'Open', count: byStatus.open.length },
    { key: 'reviewing', label: 'Reviewing', count: byStatus.reviewing.length },
    { key: 'pending', label: 'Pending', count: byStatus.pending.length },
    { key: 'resolved', label: 'Resolved', count: byStatus.resolved.length },
  ] as const;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Investigations</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track and manage flagged works under investigation</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="card">
            <div className="flex border-b border-gray-100 mb-4 -mx-4 px-4">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`pb-3 mr-6 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {t.label}
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
            <InvestigationTable works={byStatus[tab]} showPagination />
          </div>
        </div>

        {/* Alerts panel */}
        <div className="card">
          <p className="text-sm font-semibold text-gray-800 mb-4">All Recent Alerts</p>
          <AlertList alerts={mockAlerts} />
        </div>
      </div>
    </div>
  );
};
