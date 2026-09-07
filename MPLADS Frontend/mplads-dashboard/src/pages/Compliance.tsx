import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const rules = [
  {
    id: 'R001', name: 'Recommendation vs Sanction', description: 'Sanctioned amount should not exceed MP recommendation by more than 10%.',
    currentValue: '112%', expected: '≤ 110%', status: 'Warning', affectedWorks: 8,
  },
  {
    id: 'R002', name: 'Sanctioned but Not Started', description: 'Works sanctioned more than 90 days ago must show progress.',
    currentValue: '3 works stalled', expected: '0 stalled > 90 days', status: 'Normal', affectedWorks: 3,
  },
  {
    id: 'R003', name: 'Payment Exceeds Sanction', description: 'Total payments for a work must not exceed sanctioned amount.',
    currentValue: '2 violations', expected: '0 violations', status: 'Violation', affectedWorks: 2,
  },
  {
    id: 'R004', name: 'Annual MP Entitlement', description: 'Total sanctioned amount for an MP must not exceed ₹5 Cr per year.',
    currentValue: '₹4.2 Cr', expected: '≤ ₹5 Cr', status: 'Normal', affectedWorks: 0,
  },
  {
    id: 'R005', name: 'Minimum 3 Estimates Required', description: 'Every work must have at least 3 comparative estimates before sanction.',
    currentValue: '5 works missing', expected: '0 missing', status: 'Violation', affectedWorks: 5,
  },
  {
    id: 'R006', name: 'Completion Certificate Submission', description: 'Completion certificate must be submitted within 30 days of project completion.',
    currentValue: '12 pending', expected: '0 pending beyond 30 days', status: 'Warning', affectedWorks: 12,
  },
  {
    id: 'R007', name: 'Minimum Work Category Diversity', description: 'At least 15% of works in each MP must be in social sector categories.',
    currentValue: '22%', expected: '≥ 15%', status: 'Normal', affectedWorks: 0,
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'Violation') return <XCircle size={16} className="text-red-500" />;
  if (status === 'Warning') return <AlertTriangle size={16} className="text-amber-500" />;
  return <CheckCircle size={16} className="text-green-500" />;
};

const statusBg: Record<string, string> = {
  Violation: 'bg-red-50 border-red-200',
  Warning: 'bg-amber-50 border-amber-200',
  Normal: 'bg-green-50 border-green-200',
};

export const Compliance: React.FC = () => {
  const violations = rules.filter(r => r.status === 'Violation').length;
  const warnings = rules.filter(r => r.status === 'Warning').length;
  const normal = rules.filter(r => r.status === 'Normal').length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compliance Rules</h1>
        <p className="text-sm text-gray-500 mt-0.5">Rule-based monitoring of Yatharth guidelines and regulatory requirements</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card py-3 border-l-4 border-l-red-500">
          <p className="text-xs text-gray-500 mb-1">Violations</p>
          <p className="text-2xl font-bold text-red-600">{violations}</p>
        </div>
        <div className="card py-3 border-l-4 border-l-amber-400">
          <p className="text-xs text-gray-500 mb-1">Warnings</p>
          <p className="text-2xl font-bold text-amber-500">{warnings}</p>
        </div>
        <div className="card py-3 border-l-4 border-l-green-500">
          <p className="text-xs text-gray-500 mb-1">Compliant</p>
          <p className="text-2xl font-bold text-green-600">{normal}</p>
        </div>
      </div>

      {/* Rules table */}
      <div className="card">
        <p className="text-sm font-semibold text-gray-800 mb-4">Compliance Rules Status</p>
        <div className="space-y-2">
          {rules.map(rule => (
            <div
              key={rule.id}
              className={`border rounded-xl p-4 ${statusBg[rule.status]}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5"><StatusIcon status={rule.status} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-800">{rule.name}</p>
                    <div className="flex items-center gap-3">
                      {rule.affectedWorks > 0 && (
                        <span className="text-xs text-gray-500">{rule.affectedWorks} works affected</span>
                      )}
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rule.status === 'Violation' ? 'bg-red-100 text-red-700' : rule.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {rule.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{rule.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <span className="text-gray-500">Current: <span className="font-medium text-gray-700">{rule.currentValue}</span></span>
                    <span className="text-gray-500">Expected: <span className="font-medium text-gray-700">{rule.expected}</span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
