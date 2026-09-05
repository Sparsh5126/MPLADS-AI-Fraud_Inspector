import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

const blacklistedData = [
  { id: 'IA-084', name: 'Zila Parishad, Meerut', district: 'Meerut', state: 'UP', reason: 'Severe cost anomalies and vendor cartelization', date: '2025-05-12', severity: 'High' },
  { id: 'IA-032', name: 'Public Works Dept (Rural)', district: 'Baghpat', state: 'UP', reason: 'Repeated payment structuring violations', date: '2025-03-28', severity: 'High' },
  { id: 'IA-112', name: 'Municipal Corp, Patna', district: 'Patna', state: 'Bihar', reason: 'Submitting duplicate completion certificates', date: '2025-01-15', severity: 'Critical' },
  { id: 'IA-045', name: 'Rural Dev Authority', district: 'Ghaziabad', state: 'UP', reason: 'Non-compliance with MP recommendation limits', date: '2024-11-04', severity: 'Medium' },
];

export const BlacklistedIAsList: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="text-red-500" />
          <p className="text-sm font-semibold text-gray-800">Blacklisted Candidates (IAs)</p>
        </div>
        <span className="text-xs font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-full">
          {blacklistedData.length} Active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-3">
        {blacklistedData.map(ia => (
          <div key={ia.id} className="p-3 border border-red-100 bg-red-50/30 rounded-xl hover:bg-red-50/50 transition-colors">
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">{ia.id}</span>
                <span className="text-sm font-semibold text-gray-900">{ia.name}</span>
              </div>
              <span className="text-[10px] text-gray-500">{ia.date}</span>
            </div>
            
            <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              {ia.district}, {ia.state}
            </p>
            
            <div className="flex items-start gap-1.5 bg-white border border-red-100 p-2 rounded-lg">
              <Info size={12} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-800 leading-tight">
                <span className="font-semibold">Reason:</span> {ia.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-3 py-2 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
        View Full Registry →
      </button>
    </div>
  );
};
