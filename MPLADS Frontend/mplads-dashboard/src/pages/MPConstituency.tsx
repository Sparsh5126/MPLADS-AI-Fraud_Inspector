import React from 'react';

import { Info, TrendingUp, FileText, Calendar, Activity, AlertTriangle, ArrowRight } from 'lucide-react';
import { MeerutDistrictMap } from '../components/MeerutDistrictMap';
import { districtWorkloadData } from '../data/meerutGeoData';

const totalWorks = Object.values(districtWorkloadData).reduce((s, d) => s + d.works, 0);

const regionStats = [
  { name: 'Meerut',     works: 312, pct: 25.0, status: 'Highest load' },
  { name: 'Kithor',     works: 250, pct: 20.0, status: 'High load' },
  { name: 'Mawana',     works: 210, pct: 16.8, status: 'Moderate' },
  { name: 'Sardhana',   works: 186, pct: 14.9, status: 'Moderate' },
  { name: 'Hastinapur', works: 148, pct: 11.9, status: 'Lower' },
  { name: 'Daurala',    works: 142, pct: 11.4, status: 'Lower' },
];

const getColor = (works: number) => {
  if (works > 300) return '#DC2626';
  if (works > 220) return '#EA580C';
  if (works > 180) return '#D97706';
  if (works > 145) return '#65A30D';
  return '#16A34A';
};

export const MPConstituency: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Constituency Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">Meerut constituency — Yatharth works distribution map</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold text-gray-900">Works Distribution Map</h2>
            <div className="group relative cursor-help">
              <Info size={13} className="text-gray-400" />
              <div className="absolute left-5 top-0 hidden group-hover:block w-52 bg-gray-800 text-white text-xs rounded-lg p-2.5 z-50 shadow-lg">
                Hover over each region to see detailed work counts. Colors indicate work density.
              </div>
            </div>
          </div>

          <div className="flex-1 flex gap-4">
          <div className="flex-1 rounded-lg overflow-hidden border border-gray-100 bg-white">
              <MeerutDistrictMap
                metric="workload"
                regionData={districtWorkloadData}
                height={400}
              />
            </div>
          </div>
        </div>

        {/* Region stats sidebar */}
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Region Breakdown</h2>
            <div className="space-y-3">
              {regionStats.map(r => (
                <div key={r.name} className="group">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-800">{r.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{r.works}</span>
                      <span className="text-gray-400">({r.pct}%)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${(r.works / 312) * 100}%`, backgroundColor: getColor(r.works) }} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{r.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Constituency Summary</h2>
            <div className="space-y-2.5">
              {[
                { label: 'Total Works', value: '1,248', color: 'text-gray-900' },
                { label: 'Constituencies', value: '6 Regions', color: 'text-blue-700' },
                { label: 'Highest Load', value: 'Meerut (312)', color: 'text-red-700' },
                { label: 'Lowest Load', value: 'Daurala (142)', color: 'text-green-700' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{s.label}</span>
                  <span className={`font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
