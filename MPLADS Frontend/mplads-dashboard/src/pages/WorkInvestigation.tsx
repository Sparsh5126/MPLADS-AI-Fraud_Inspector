import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag, IndianRupee, Calendar, AlertTriangle } from 'lucide-react';
import { mockWorks } from '../data/mockWorks';
import { RiskBadge, StatusBadge } from '../components/RiskBadge';
import { DetectorCard, EvidenceCard } from '../components/DetectorCard';
import { formatAmount } from '../utils/filters';

export const WorkInvestigation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const work = mockWorks.find(w => w.work_id === id);

  if (!work) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <AlertTriangle size={40} className="mb-3 text-gray-300" />
        <p className="text-lg font-medium">Work not found</p>
        <p className="text-sm mt-1">Work ID "{id}" does not exist in the database.</p>
        <button onClick={() => navigate('/works')} className="btn-primary mt-4">Back to Works</button>
      </div>
    );
  }

  const riskScoreColor = work.risk_level === 'Critical' ? '#EF4444' : work.risk_level === 'High' ? '#F97316' : work.risk_level === 'Medium' ? '#F59E0B' : '#22C55E';

  const detectors = [
    { name: 'Cost Anomaly', score: work.cost_anomaly_score, description: `Peer Z-score: ${work.peer_zscore.toFixed(1)}. ML relative residual: ${(work.ml_relative_residual * 100).toFixed(0)}% above expected.` },
    { name: 'Duplicate Work', score: work.duplicate_score, description: 'Text and image similarity comparison with all works in the same district and category.' },
    { name: 'Payment Anomaly', score: work.payment_anomaly_score, description: 'Analysis of payment timing, amounts, and proximity to threshold limits.' },
    { name: 'Image Forensics', score: work.image_anomaly_score, description: 'GPS metadata verification, image hash comparison, and visual similarity analysis.' },
    { name: 'Vendor Network', score: work.vendor_network_score, description: `Vendor: ${work.vendor}. Network overlap score across related IAs.` },
    { name: 'Execution Risk', score: work.execution_risk_score, description: 'Sanction date vs. progress analysis, deadline adherence, and delay patterns.' },
    { name: 'Compliance', score: work.compliance_score, description: 'Rule-based checks: payment vs. sanction, MP entitlement limits, recommendation compliance.' },
  ];

  // Evidence blocks only for flagged detectors
  const evidenceBlocks = [];
  if (work.cost_anomaly_score >= 0.5) {
    evidenceBlocks.push({
      type: 'COST ANOMALY', title: 'Cost significantly above expected',
      summary: `This project costs ${Math.round(work.ml_relative_residual * 100)}% more than the expected cost for similar works.`,
      color: '#EF4444',
      details: [
        { label: 'Peer-group Z-score', value: work.peer_zscore.toFixed(1) },
        { label: 'ML expected cost', value: formatAmount(work.sanctioned_amount / (1 + work.ml_relative_residual)) },
        { label: 'Actual sanctioned amount', value: formatAmount(work.sanctioned_amount) },
        { label: 'Relative difference', value: `+${Math.round(work.ml_relative_residual * 100)}%` },
      ],
    });
  }
  if (work.duplicate_score >= 0.7) {
    evidenceBlocks.push({
      type: 'DUPLICATE PHOTO', title: 'A completion image appears similar to another work',
      summary: 'Possible duplicate submission detected via image hash comparison.',
      color: '#F97316',
      details: [
        { label: 'Similarity score', value: `${Math.round(work.duplicate_score * 100)}%` },
        { label: 'Related work', value: 'W0982' },
        { label: 'Distance between sites', value: '180 m' },
      ],
    });
  }
  if (work.image_anomaly_score >= 0.75) {
    evidenceBlocks.push({
      type: 'IMAGE LOCATION MISMATCH', title: 'Image GPS location differs significantly from project location',
      summary: 'The coordinates embedded in the photo metadata do not match the registered project location.',
      color: '#EF4444',
      details: [
        { label: 'Project location', value: `${work.latitude.toFixed(4)}, ${work.longitude.toFixed(4)}` },
        { label: 'Image GPS location', value: `${(work.latitude + 0.034).toFixed(4)}, ${(work.longitude - 0.017).toFixed(4)}` },
        { label: 'Distance', value: '4.8 km' },
      ],
    });
  }
  if (work.payment_anomaly_score >= 0.7) {
    evidenceBlocks.push({
      type: 'PAYMENT STRUCTURING', title: 'Multiple payments near threshold detected',
      summary: 'Payments appear structured to stay just below the applicable approval threshold.',
      color: '#F97316',
      details: [
        { label: 'Payment 1', value: '₹9.2 L' },
        { label: 'Payment 2', value: '₹9.5 L' },
        { label: 'Payment 3', value: '₹9.7 L' },
        { label: 'Period', value: '10 days' },
        { label: 'Payment structuring score', value: work.payment_anomaly_score.toFixed(2) },
      ],
    });
  }

  return (
    <div className="space-y-5">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header card */}
      <div className="card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xl font-bold text-primary">{work.work_id}</span>
              <RiskBadge level={work.risk_level} />
              {work.investigation_status && <StatusBadge status={work.investigation_status} />}
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{work.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" />{work.district}, {work.state}</span>
              <span className="flex items-center gap-1.5"><Tag size={14} className="text-gray-400" />{work.category}</span>
              <span className="flex items-center gap-1.5"><IndianRupee size={14} className="text-gray-400" />{formatAmount(work.sanctioned_amount)}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400" />Sanctioned: {work.sanction_date}</span>
              <span className="font-medium text-gray-700">Status: {work.status}</span>
            </div>
          </div>

          {/* Risk score */}
          <div className="flex-shrink-0 text-center">
            <div
              className="w-28 h-28 rounded-full border-8 flex flex-col items-center justify-center"
              style={{ borderColor: riskScoreColor + '30', backgroundColor: riskScoreColor + '08' }}
            >
              <span className="text-3xl font-black" style={{ color: riskScoreColor }}>{work.risk_score}</span>
              <span className="text-xs text-gray-400 font-medium">/ 100</span>
            </div>
            <p className="text-sm font-bold mt-2" style={{ color: riskScoreColor }}>{work.risk_level.toUpperCase()}</p>
            <p className="text-xs text-gray-400">Risk Score</p>
          </div>
        </div>
      </div>

      {/* Metadata row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Vendor', value: work.vendor },
          { label: 'IA Name', value: work.ia_name },
          { label: 'Completion Date', value: work.completion_date },
          { label: 'Scale', value: `${work.scale}%` },
        ].map(({ label, value }) => (
          <div key={label} className="card py-3">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-sm font-semibold text-gray-800">{value}</p>
          </div>
        ))}
      </div>

      {/* Detector cards */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Risk Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {detectors.map(d => (
            <DetectorCard key={d.name} {...d} />
          ))}
        </div>
      </div>

      {/* Evidence */}
      {evidenceBlocks.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Why is this work suspicious?</h2>
          <p className="text-xs text-gray-500 mb-3">The following anomalies have been detected. Each item requires human review before any conclusion can be drawn.</p>
          <div className="space-y-2">
            {evidenceBlocks.map((e, i) => (
              <EvidenceCard key={i} type={e.type} title={e.title} summary={e.summary} details={e.details} color={e.color} />
            ))}
          </div>
        </div>
      )}

      {evidenceBlocks.length === 0 && (
        <div className="card text-center py-8 text-gray-400">
          <p className="text-sm">No significant anomalies flagged for this work. Risk score is within acceptable range.</p>
        </div>
      )}
    </div>
  );
};
