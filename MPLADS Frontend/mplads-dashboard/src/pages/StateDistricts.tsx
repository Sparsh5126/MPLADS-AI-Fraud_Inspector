import React, { useState } from 'react';
import { MapPin, AlertTriangle, FileText, TrendingUp, ChevronRight } from 'lucide-react';

const districts = [
  { name: 'Meerut', totalWorks: 342, highRisk: 28, critical: 9, budget: '₹164 Cr', utilization: 78, riskLevel: 'Critical' },
  { name: 'Baghpat', totalWorks: 281, highRisk: 21, critical: 6, budget: '₹98 Cr', utilization: 65, riskLevel: 'Critical' },
  { name: 'Ghaziabad', totalWorks: 276, highRisk: 18, critical: 5, budget: '₹188 Cr', utilization: 82, riskLevel: 'High' },
  { name: 'Lucknow', totalWorks: 412, highRisk: 17, critical: 4, budget: '₹256 Cr', utilization: 71, riskLevel: 'High' },
  { name: 'Saharanpur', totalWorks: 265, highRisk: 16, critical: 4, budget: '₹112 Cr', utilization: 58, riskLevel: 'Medium' },
  { name: 'Varanasi', totalWorks: 512, highRisk: 12, critical: 2, budget: '₹310 Cr', utilization: 88, riskLevel: 'Medium' },
  { name: 'Kanpur Nagar', totalWorks: 388, highRisk: 8, critical: 1, budget: '₹224 Cr', utilization: 91, riskLevel: 'Low' },
  { name: 'Agra', totalWorks: 310, highRisk: 5, critical: 0, budget: '₹178 Cr', utilization: 95, riskLevel: 'Low' },
  { name: 'Prayagraj', totalWorks: 440, highRisk: 6, critical: 1, budget: '₹290 Cr', utilization: 85, riskLevel: 'Low' },
  { name: 'Mathura', totalWorks: 199, highRisk: 10, critical: 3, budget: '₹88 Cr', utilization: 62, riskLevel: 'High' },
];

const riskStyle: Record<string, { badge: string; bar: string }> = {
  Critical: { badge: 'bg-red-100 text-red-700', bar: 'bg-red-500' },
  High: { badge: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500' },
  Medium: { badge: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-500' },
  Low: { badge: 'bg-green-100 text-green-700', bar: 'bg-green-500' },
};

export const StateDistricts: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedDistrict = districts.find(d => d.name === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Districts Overview</h1>
        <p className="text-sm text-gray-500 mt-1">District-wise MPLADS performance and risk assessment for Uttar Pradesh</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* District List */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">All Districts</h2>
            <span className="text-xs text-gray-400">{districts.length} districts</span>
          </div>
          <div className="divide-y divide-gray-50">
            {districts.map(d => (
              <button
                key={d.name}
                onClick={() => setSelected(d.name === selected ? null : d.name)}
                className={`w-full flex items-center px-5 py-4 text-left hover:bg-blue-50/40 transition-colors group ${selected === d.name ? 'bg-blue-50' : ''}`}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 group-hover:bg-blue-100 transition-colors">
                  <MapPin size={16} className="text-gray-500 group-hover:text-blue-600" />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{d.name}</p>
                    <span className={`ml-2 inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${riskStyle[d.riskLevel].badge}`}>{d.riskLevel}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><FileText size={11} /> {d.totalWorks} works</span>
                    <span className="text-xs text-orange-600 font-medium flex items-center gap-1"><AlertTriangle size={11} /> {d.highRisk} high risk</span>
                    <span className="text-xs text-gray-500">{d.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${riskStyle[d.riskLevel].bar}`} style={{ width: `${d.utilization}%` }} />
                    </div>
                    <span className="text-xs font-medium text-gray-500">{d.utilization}% utilized</span>
                  </div>
                </div>
                <ChevronRight size={16} className={`ml-3 text-gray-300 group-hover:text-blue-500 transition-transform ${selected === d.name ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="space-y-4">
          {selectedDistrict ? (
            <div className="bg-white border border-blue-200 rounded-xl shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">{selectedDistrict.name}</h2>
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${riskStyle[selectedDistrict.riskLevel].badge}`}>{selectedDistrict.riskLevel}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Works', value: selectedDistrict.totalWorks },
                  { label: 'High Risk', value: selectedDistrict.highRisk },
                  { label: 'Critical', value: selectedDistrict.critical },
                  { label: 'Budget', value: selectedDistrict.budget },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                    <p className="text-base font-bold text-gray-900">{s.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 font-medium">Budget Utilization</span>
                  <span className="text-xs font-bold text-gray-700">{selectedDistrict.utilization}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${riskStyle[selectedDistrict.riskLevel].bar}`} style={{ width: `${selectedDistrict.utilization}%` }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center text-gray-400">
              <MapPin size={32} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">Select a district to view details</p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><TrendingUp size={15} className="text-blue-500" /> State Summary</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Critical Risk Districts', value: districts.filter(d => d.riskLevel === 'Critical').length, color: 'text-red-600' },
                { label: 'High Risk Districts', value: districts.filter(d => d.riskLevel === 'High').length, color: 'text-orange-600' },
                { label: 'Medium Risk Districts', value: districts.filter(d => d.riskLevel === 'Medium').length, color: 'text-yellow-600' },
                { label: 'Low Risk Districts', value: districts.filter(d => d.riskLevel === 'Low').length, color: 'text-green-600' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{s.label}</span>
                  <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
