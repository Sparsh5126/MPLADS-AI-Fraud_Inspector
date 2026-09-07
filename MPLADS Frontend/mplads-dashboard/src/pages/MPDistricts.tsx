import React from 'react';

import { TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { districtWorkloadData } from '../data/meerutGeoData';

import { MeerutDistrictMap } from '../components/MeerutDistrictMap';



const districts = [
  { rank: 1, name: 'Meerut',     total: 312, completed: 214, inProgress: 78, delayed: 20 },
  { rank: 2, name: 'Kithor',     total: 250, completed: 150, inProgress: 68, delayed: 32 },
  { rank: 3, name: 'Mawana',     total: 210, completed: 148, inProgress: 44, delayed: 18 },
  { rank: 4, name: 'Sardhana',   total: 186, completed: 102, inProgress: 58, delayed: 26 },
  { rank: 5, name: 'Hastinapur', total: 148, completed: 90,  inProgress: 40, delayed: 18 },
  { rank: 6, name: 'Daurala',    total: 142, completed: 88,  inProgress: 38, delayed: 16 },
];

export const MPDistricts: React.FC = () => {

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Districts</h1>
        <p className="text-sm text-gray-500 mt-0.5">Work distribution across Meerut constituency regions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Leaflet Map */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col">
          <h2 className="text-sm font-bold text-gray-900 mb-3">District Map</h2>
          <div className="flex-1 flex gap-4">
            <div className="flex-1 rounded-lg overflow-hidden border border-gray-100 bg-white">
              <MeerutDistrictMap
                metric="workload"
                regionData={districtWorkloadData}
                height={360}
              />
            </div>
          </div>
        </div>

        {/* District table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">District Rankings</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {districts.map(d => (
              <div key={d.rank} className="px-4 py-3 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono w-5">{d.rank}</span>
                    <span className="text-sm font-bold text-gray-900">{d.name}</span>
                  </div>
                  <span className="text-sm font-extrabold text-gray-800">{d.total} works</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1 text-green-600"><TrendingUp size={11} /> {d.completed} done</span>
                  <span className="flex items-center gap-1 text-blue-600">{d.inProgress} in progress</span>
                  {d.delayed > 0 && <span className="flex items-center gap-1 text-red-500"><AlertTriangle size={11} /> {d.delayed} delayed</span>}
                </div>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-green-400" style={{ width: `${(d.completed / d.total) * 100}%` }} />
                  <div className="h-full bg-blue-400" style={{ width: `${(d.inProgress / d.total) * 100}%` }} />
                  <div className="h-full bg-red-400" style={{ width: `${(d.delayed / d.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
