import React, { useState } from 'react';
import { MapPin, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

const forensicImages = [
  {
    id: 'IMG001', work_id: 'W1042', label: 'Completion Photo', status: 'LOCATION MISMATCH',
    imageGps: '28.9842, 77.7064', projectGps: '28.9501, 77.7231', distance: '4.8 km',
    uploadDate: '2024-12-20', isFlagged: true, isBlueBox: true,
  },
  {
    id: 'IMG002', work_id: 'W0982', label: 'Progress Photo', status: 'DUPLICATE DETECTED',
    imageGps: '28.9618, 77.7388', projectGps: '28.9620, 77.7400', distance: '0.02 km',
    uploadDate: '2024-11-10', isFlagged: true, isBlueBox: false,
  },
  {
    id: 'IMG003', work_id: 'W0678', label: 'Before Photo', status: 'LOCATION MISMATCH',
    imageGps: '26.8921, 80.9601', projectGps: '26.8467, 80.9462', distance: '5.2 km',
    uploadDate: '2024-08-15', isFlagged: true, isBlueBox: true,
  },
  {
    id: 'IMG004', work_id: 'W0931', label: 'Site Photo', status: 'OK',
    imageGps: '28.6695, 77.4542', projectGps: '28.6692, 77.4538', distance: '0.04 km',
    uploadDate: '2024-10-22', isFlagged: false, isBlueBox: false,
  },
  {
    id: 'IMG005', work_id: 'W0812', label: 'Completion Photo', status: 'OK',
    imageGps: '28.9442, 77.2258', projectGps: '28.9445, 77.2260', distance: '0.04 km',
    uploadDate: '2024-12-18', isFlagged: false, isBlueBox: false,
  },
  {
    id: 'IMG006', work_id: 'W0451', label: 'Progress Photo', status: 'OK',
    imageGps: '25.5938, 85.1374', projectGps: '25.5941, 85.1376', distance: '0.03 km',
    uploadDate: '2024-09-05', isFlagged: false, isBlueBox: false,
  },
];

export const ImageForensics: React.FC = () => {
  const [selected, setSelected] = useState<typeof forensicImages[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'flagged' | 'ok'>('all');

  const displayed = forensicImages.filter(img => {
    if (filter === 'flagged') return img.isFlagged;
    if (filter === 'ok') return !img.isFlagged;
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image Forensics</h1>
          <p className="text-sm text-gray-500 mt-0.5">GPS metadata verification and visual similarity analysis for project photos</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'flagged', 'ok'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${filter === f ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {f === 'all' ? 'All' : f === 'flagged' ? '⚠ Flagged' : '✓ OK'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {displayed.map(img => (
          <div
            key={img.id}
            className={`card card-hover cursor-pointer border-2 ${img.isFlagged ? 'border-red-100' : 'border-gray-100'}`}
            onClick={() => setSelected(img)}
          >
            {/* Image placeholder */}
            <div
              className={`h-40 rounded-lg mb-3 flex items-center justify-center text-sm font-medium ${img.isBlueBox ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}
            >
              {img.isBlueBox ? '📸 Project Photo' : '🏗 Site Photo'}
            </div>

            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-mono text-primary font-bold">{img.work_id}</p>
                <p className="text-sm font-semibold text-gray-800">{img.label}</p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${img.isFlagged ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
              >
                {img.status === 'OK' ? '✓ OK' : img.status}
              </span>
            </div>

            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={11} className="text-gray-400" />
                <span>GPS: {img.imageGps}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={11} className="text-blue-400" />
                <span>Project: {img.projectGps}</span>
              </div>
              {img.isFlagged && (
                <div className="flex items-center gap-1.5 text-red-600 font-medium mt-1">
                  <AlertTriangle size={11} />
                  <span>Distance: {img.distance}</span>
                </div>
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Uploaded: {img.uploadDate}</p>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="card border-2 border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800">Evidence Detail — {selected.work_id} / {selected.label}</p>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="bg-blue-50 rounded-xl h-52 flex items-center justify-center text-blue-500 text-sm font-medium border border-blue-100">
                📸 Project Photo<br/><span className="text-xs text-blue-400">GPS: {selected.imageGps}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Image GPS</p>
                <p className="text-sm font-mono font-semibold text-gray-800">{selected.imageGps}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Project GPS</p>
                <p className="text-sm font-mono font-semibold text-gray-800">{selected.projectGps}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Distance</p>
                <p className={`text-sm font-bold ${selected.isFlagged ? 'text-red-600' : 'text-green-600'}`}>{selected.distance}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${selected.isFlagged ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {selected.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
