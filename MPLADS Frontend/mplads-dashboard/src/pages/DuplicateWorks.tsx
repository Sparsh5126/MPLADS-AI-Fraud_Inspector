import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, MapPin, Eye } from 'lucide-react';
import { RiskBadge } from '../components/RiskBadge';
import { formatAmount } from '../utils/filters';

const workA = { id: 'W1042', title: 'Construction of village drainage system', district: 'Meerut', state: 'UP', category: 'Drainage', amount: 2480000, risk: 'Critical' as const, vendor: 'Vendor A', date: '2024-04-10', similarity: 0.91 };
const workB = { id: 'W0982', title: 'Drainage channel improvement', district: 'Meerut', state: 'UP', category: 'Drainage', amount: 2210000, risk: 'High' as const, vendor: 'Vendor A', date: '2024-02-08', similarity: 0.91 };

export const DuplicateWorks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Duplicate Works Analysis</h1>
        <p className="text-sm text-gray-500 mt-0.5">Side-by-side comparison of potentially duplicate work records</p>
      </div>

      {/* Score banner */}
      <div className="card border-l-4 border-l-orange-500">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Duplicate Score</p>
            <p className="text-3xl font-black text-orange-600">91%</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Potential Duplicate</span>
          </div>
          <div className="flex-1 text-sm text-gray-600">
            <p>High text and image similarity detected between <span className="font-mono font-bold text-primary">W1042</span> and <span className="font-mono font-bold text-primary">W0982</span>. Both works share the same vendor, district, and category with sites 180m apart.</p>
          </div>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[workA, workB].map((work, idx) => (
          <div key={work.id} className={`card border-2 ${idx === 0 ? 'border-red-200' : 'border-orange-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-primary text-lg">{work.id}</span>
                <RiskBadge level={work.risk} />
              </div>
                  <button onClick={() => navigate(`/ministry/works/${work.id}`)} className="flex items-center gap-1 text-xs text-primary border border-primary/20 rounded-lg px-2.5 py-1.5 hover:bg-primary/5">
                <Eye size={12} /> View
              </button>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">{work.title}</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'District', value: `${work.district}, ${work.state}` },
                { label: 'Category', value: work.category },
                { label: 'Amount', value: formatAmount(work.amount) },
                { label: 'Vendor', value: work.vendor },
                { label: 'Sanction Date', value: work.date },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Similarity metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Text Similarity', value: '91%', color: 'text-red-600' },
          { label: 'Location Distance', value: '180 m', color: 'text-red-600' },
          { label: 'Same Vendor', value: 'Yes', color: 'text-red-600' },
          { label: 'Amount Diff', value: '₹2.7 L', color: 'text-orange-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card py-3 text-center">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="card">
        <p className="text-sm font-semibold text-gray-800 mb-3">Project Locations</p>
        <div className="bg-blue-50 rounded-xl h-48 flex items-center justify-center border border-blue-100">
          <div className="text-center text-gray-500">
            <div className="flex items-center justify-center gap-6 mb-2">
              <div className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                <MapPin size={16} fill="currentColor" /> W1042 (28.9501, 77.7231)
              </div>
              <ArrowLeftRight size={20} className="text-gray-400" />
              <div className="flex items-center gap-1.5 text-sm font-medium text-orange-500">
                <MapPin size={16} fill="currentColor" /> W0982 (28.9620, 77.7400)
              </div>
            </div>
            <p className="text-xs text-gray-400">Distance: ~180m apart · Both in Meerut district</p>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex gap-3">
        <button className="btn-primary flex items-center gap-2">Investigate Relationship</button>
        <button className="btn-outline">Mark as Unrelated</button>
        <button className="btn-outline">Flag for Audit</button>
      </div>
    </div>
  );
};
