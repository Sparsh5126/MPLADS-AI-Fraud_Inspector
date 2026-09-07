import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MapMetric = 'workload' | 'delay' | 'risk';

export interface TehsilData {
  name: string;
  works: number;
  activeWorks: number;
  highRisk: number;
  delayed: number;
  delayRate: string;
  riskLevel?: 'Critical' | 'High' | 'Medium' | 'Low' | 'No Data';
}

export interface MeerutDistrictMapProps {
  metric: MapMetric;
  regionData: Record<string, TehsilData>;
  height?: number | string;
  onRegionClick?: (name: string, data: TehsilData) => void;
}

// ─── Color helpers ─────────────────────────────────────────────────────────────

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

function workloadColor(works: number): string {
  if (works === 0) return '#CBD5E1';
  if (works > 100) return '#DC2626';
  if (works > 60)  return '#EA580C';
  if (works > 30)  return '#D97706';
  if (works > 10)  return '#65A30D';
  return '#16A34A';
}

function workloadHover(works: number): string {
  if (works === 0) return '#94A3B8';
  if (works > 100) return '#B91C1C';
  if (works > 60)  return '#C2410C';
  if (works > 30)  return '#B45309';
  if (works > 10)  return '#4D7C0F';
  return '#15803D';
}

function delayColor(rateStr: string): string {
  const r = parseFloat(rateStr.replace('%', ''));
  if (isNaN(r)) return '#CBD5E1';
  if (r > 40) return '#DC2626';
  if (r > 25) return '#EA580C';
  if (r > 10) return '#D97706';
  return '#16A34A';
}

function delayHover(rateStr: string): string {
  const r = parseFloat(rateStr.replace('%', ''));
  if (isNaN(r)) return '#94A3B8';
  if (r > 40) return '#B91C1C';
  if (r > 25) return '#C2410C';
  if (r > 10) return '#B45309';
  return '#15803D';
}

function riskColor(level?: string): string {
  switch (level) {
    case 'Critical': return '#DC2626';
    case 'High':     return '#EA580C';
    case 'Medium':   return '#D97706';
    case 'Low':      return '#16A34A';
    default:         return '#CBD5E1';
  }
}

function riskHover(level?: string): string {
  switch (level) {
    case 'Critical': return '#B91C1C';
    case 'High':     return '#C2410C';
    case 'Medium':   return '#B45309';
    case 'Low':      return '#15803D';
    default:         return '#94A3B8';
  }
}

function getFill(metric: MapMetric, data: TehsilData | null): string {
  if (!data) return '#CBD5E1';
  switch (metric) {
    case 'workload': return workloadColor(data.works);
    case 'delay':    return delayColor(data.delayRate);
    case 'risk':     return riskColor(data.riskLevel);
  }
}

function getHover(metric: MapMetric, data: TehsilData | null): string {
  if (!data) return '#94A3B8';
  switch (metric) {
    case 'workload': return workloadHover(data.works);
    case 'delay':    return delayHover(data.delayRate);
    case 'risk':     return riskHover(data.riskLevel);
  }
}

// ─── Legend config ─────────────────────────────────────────────────────────────

const LEGENDS: Record<MapMetric, Array<{ color: string; label: string }>> = {
  workload: [
    { color: '#DC2626', label: '> 100 works' },
    { color: '#EA580C', label: '61 – 100 works' },
    { color: '#D97706', label: '31 – 60 works' },
    { color: '#65A30D', label: '11 – 30 works' },
    { color: '#16A34A', label: '≤ 10 works' },
    { color: '#CBD5E1', label: 'No data' },
  ],
  delay: [
    { color: '#DC2626', label: '> 40% delayed' },
    { color: '#EA580C', label: '25 – 40% delayed' },
    { color: '#D97706', label: '10 – 25% delayed' },
    { color: '#16A34A', label: '< 10% delayed' },
    { color: '#CBD5E1', label: 'No data' },
  ],
  risk: [
    { color: '#DC2626', label: 'Critical' },
    { color: '#EA580C', label: 'High' },
    { color: '#D97706', label: 'Medium' },
    { color: '#16A34A', label: 'Low' },
    { color: '#CBD5E1', label: 'No data' },
  ],
};

// ─── Tooltip builder ──────────────────────────────────────────────────────────

function buildTooltip(metric: MapMetric, name: string, data: TehsilData | null, fill: string): string {
  if (!data) {
    return `<div style="padding:8px"><p style="font-weight:700;font-size:13px;color:#0F172A">${name}</p><p style="font-size:11px;color:#94A3B8;margin-top:2px">No data available</p></div>`;
  }
  const rows: Array<[string, string]> =
    metric === 'workload'
      ? [
          ['Total Works', String(data.works)],
          ['Active', String(data.activeWorks)],
          ['High Risk', String(data.highRisk)],
          ['Delayed', String(data.delayed)],
        ]
      : metric === 'delay'
      ? [
          ['Delay Rate', data.delayRate],
          ['Delayed Works', String(data.delayed)],
          ['Total Works', String(data.works)],
        ]
      : [
          ['Risk Level', data.riskLevel ?? 'No Data'],
          ['High Risk Works', String(data.highRisk)],
          ['Total Works', String(data.works)],
        ];

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<div style="display:flex;justify-content:space-between;gap:16px;font-size:11px;margin-top:3px"><span style="color:#94A3B8">${k}</span><span style="font-weight:600;color:#1E293B">${v}</span></div>`
    )
    .join('');

  return `
    <div style="padding:10px;min-width:155px">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:7px;padding-bottom:6px;border-bottom:1px solid #F1F5F9">
        <div style="width:9px;height:9px;border-radius:3px;background:${fill};flex-shrink:0"></div>
        <span style="font-weight:700;font-size:13px;color:#0F172A">${name}</span>
      </div>
      ${rowsHtml}
    </div>
  `;
}

// ─── Component ────────────────────────────────────────────────────────────────

// Pre-computed 6 blocks of Meerut district
const MEERUT_GEO_URL = '/meerut-blocks.geojson';
const INIT_CENTER: [number, number] = [77.77, 29.00];
const INIT_ZOOM = 1;

const BLOCK_CENTROIDS: Record<string, [number, number]> = {
  'Sardhana': [77.5042, 29.1445],
  'Daurala': [77.7792, 29.1972],
  'Mawana': [77.9876, 29.1622],
  'Hastinapur': [78.0613, 28.9564],
  'Meerut City': [77.6045, 28.8825],
  'Kithor': [77.8443, 28.8191],
};

export const MeerutDistrictMap: React.FC<MeerutDistrictMapProps> = ({
  metric,
  regionData,
  height = 360,
  onRegionClick,
}) => {
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: INIT_CENTER, zoom: INIT_ZOOM });

  const zoomIn  = () => setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.5, 8) }));
  const zoomOut = () => setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.5, 1) }));
  const reset   = () => setPosition({ coordinates: INIT_CENTER, zoom: INIT_ZOOM });

  const resolve = (rawName: string): TehsilData | null => {
    const norm = normalize(rawName);
    for (const [k, v] of Object.entries(regionData)) {
      if (normalize(k) === norm) return v;
    }
    const key = Object.keys(regionData).find(
      k => normalize(k).includes(norm) || norm.includes(normalize(k))
    );
    return key ? regionData[key] : null;
  };

  return (
    <div
      className="w-full relative select-none"
      style={{ height, background: 'white' }}
      onMouseMove={(e) => {
        if (tooltip) {
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltip(prev => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
        }
      }}
      onMouseLeave={() => setTooltip(null)}
    >
      {/* ── Map canvas ── */}
      {/*
        projectionConfig.scale = 35000 makes Meerut district (~0.75° wide)
        render at ~460px within an 800px-wide SVG → good fit with padding.
        The SVG is rendered at 100% width/height but internally uses
        width=800, height=600 coordinates.
      */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 36000,
          center: [77.77, 29.00],
        }}
        width={800}
        height={600}
        style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}
      >
        {/* Pure white background */}
        <rect x={0} y={0} width={800} height={600} fill="#ffffff" />

        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={pos => setPosition(pos as typeof position)}
          minZoom={1}
          maxZoom={8}
        >
          <Geographies geography={MEERUT_GEO_URL}>
            {({ geographies }) => (
              <>
                {/* Phase 1: Draw the 6 filled regions */}
                {geographies.map((geo, i) => {
                  const rawName = geo.properties.name || '';
                  const data = resolve(rawName);
                  
                  let fill = '#CBD5E1'; // No Data grey
                  if (data) {
                    fill =
                      metric === 'workload'
                        ? workloadColor(data.works)
                        : metric === 'delay'
                        ? delayColor(data.delayRate)
                        : riskColor(data.riskLevel || 'No Data');
                  }
                  
                  return (
                    <Geography
                      key={geo.rsmKey || i}
                      geography={geo}
                      fill={fill}
                      stroke="#ffffff"
                      strokeWidth={2}
                      onClick={() => data && onRegionClick?.(rawName, data)}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.closest('.relative')?.getBoundingClientRect();
                        const x = rect ? e.clientX - rect.left : e.clientX;
                        const y = rect ? e.clientY - rect.top : e.clientY;
                        setTooltip({
                          content: buildTooltip(metric, rawName, data, fill),
                          x,
                          y
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: {
                          outline: 'none',
                          transition: 'fill 0.15s ease',
                        },
                        hover: {
                          fill: getHover(metric, data),
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'fill 0.15s ease',
                        },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })}

                {/* Phase 2: Draw the labels centered on each region */}
                {geographies.map((geo, i) => {
                  const rawName = geo.properties.name || '';
                  const centroid = BLOCK_CENTROIDS[rawName] || [77.77, 29.00];

                  return (
                    <Marker key={`marker-${i}`} coordinates={centroid as [number, number]}>
                      <text
                        textAnchor="middle"
                        y={4}
                        style={{
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fill: '#0F172A',
                          fontSize: '12px',
                          fontWeight: 700,
                          pointerEvents: 'none',
                          textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 2px rgba(255,255,255,0.9)'
                        }}
                      >
                        {rawName}
                      </text>
                    </Marker>
                  );
                })}
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* ── Zoom controls ── */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
        {[
          { icon: <ZoomIn size={12} />,    action: zoomIn,  label: 'Zoom in'  },
          { icon: <ZoomOut size={12} />,   action: zoomOut, label: 'Zoom out' },
          { icon: <RotateCcw size={11} />, action: reset,   label: 'Reset'    },
        ].map(({ icon, action, label }) => (
          <button
            key={label}
            aria-label={label}
            onClick={action}
            className="w-6 h-6 rounded bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all"
          >
            {icon}
          </button>
        ))}
      </div>

      {/* ── Legend ── */}
      <div className="absolute bottom-2 left-2 bg-white/95 border border-gray-200 rounded-lg p-2 shadow-sm pointer-events-none z-10">
        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
          {metric === 'workload' ? 'Works Load' : metric === 'delay' ? '% Delayed' : 'Risk Level'}
        </p>
        <div className="flex flex-col gap-1">
          {LEGENDS[metric].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-[9px] font-medium text-gray-600 whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tooltip ── */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 bg-white text-gray-800 border border-gray-200 shadow-xl rounded-xl opacity-100 p-0"
          style={{
            left: tooltip.x + 15,
            top: tooltip.y + 15,
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </div>
  );
};
