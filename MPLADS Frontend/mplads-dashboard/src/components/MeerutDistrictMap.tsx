import React, { useState, useEffect, useRef } from 'react';
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

// ─── Color helpers ────────────────────────────────────────────────────────────

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

function workloadColor(works: number): string {
  if (works === 0) return '#CBD5E1';
  if (works > 100) return '#DC2626';
  if (works > 60)  return '#EA580C';
  if (works > 30)  return '#D97706';
  if (works > 10)  return '#65A30D';
  return '#16A34A';
}

function delayColor(rateStr: string): string {
  const r = parseFloat(rateStr.replace('%', ''));
  if (isNaN(r)) return '#CBD5E1';
  if (r > 40) return '#DC2626';
  if (r > 25) return '#EA580C';
  if (r > 10) return '#D97706';
  return '#16A34A';
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

function getFill(metric: MapMetric, data: TehsilData | null): string {
  if (!data) return '#CBD5E1';
  switch (metric) {
    case 'workload': return workloadColor(data.works);
    case 'delay':    return delayColor(data.delayRate);
    case 'risk':     return riskColor(data.riskLevel);
  }
}

function getHover(metric: MapMetric, data: TehsilData | null): string {
  const base = getFill(metric, data);
  // darken by ~12% for hover
  return base === '#CBD5E1' ? '#94A3B8' : base;
}

// ─── Legend config ────────────────────────────────────────────────────────────

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
      ? [['Total Works', String(data.works)], ['Active', String(data.activeWorks)], ['High Risk', String(data.highRisk)], ['Delayed', String(data.delayed)]]
      : metric === 'delay'
      ? [['Delay Rate', data.delayRate], ['Delayed Works', String(data.delayed)], ['Total Works', String(data.works)]]
      : [['Risk Level', data.riskLevel ?? 'No Data'], ['High Risk Works', String(data.highRisk)], ['Total Works', String(data.works)]];

  const rowsHtml = rows
    .map(([k, v]) => `<div style="display:flex;justify-content:space-between;gap:16px;font-size:11px;margin-top:3px"><span style="color:#94A3B8">${k}</span><span style="font-weight:600;color:#1E293B">${v}</span></div>`)
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

// ─── Pure-SVG Mercator projection ─────────────────────────────────────────────
//
// Meerut district bbox (from up-districts.json):
//   lon  77.4227 → 78.1239   (span 0.7012°)
//   lat  28.7366 → 29.2659   (span 0.5293°)
//
// We project to a 760×560 logical canvas with 20px padding on each side,
// giving a final 800×600 SVG with the district perfectly filling the space.

const SVG_W = 800;
const SVG_H = 600;
const PAD   = 30; // pixels of padding on each side

// Geographic bounds of Meerut district
const GEO_MIN_LON = 77.4227;
const GEO_MAX_LON = 78.1239;
const GEO_MIN_LAT = 28.7366;
const GEO_MAX_LAT = 29.2659;

// Mercator Y value for a latitude
const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

const MERC_Y_MIN = mercY(GEO_MIN_LAT);
const MERC_Y_MAX = mercY(GEO_MAX_LAT);

// Scale factors: how many pixels per degree-lon and per mercator-unit
const AVAIL_W = SVG_W - 2 * PAD;
const AVAIL_H = SVG_H - 2 * PAD;

const SCALE_X = AVAIL_W / (GEO_MAX_LON - GEO_MIN_LON);
const SCALE_Y = AVAIL_H / (MERC_Y_MAX - MERC_Y_MIN);

function projectPoint([lon, lat]: [number, number]): [number, number] {
  const x = PAD + (lon - GEO_MIN_LON) * SCALE_X;
  // Mercator Y increases northward but SVG Y increases downward, so flip
  const y = PAD + (MERC_Y_MAX - mercY(lat)) * SCALE_Y;
  return [x, y];
}

// Build an SVG path "d" string from a GeoJSON ring (array of [lon,lat])
function ringToPath(ring: [number, number][]): string {
  return ring
    .map((pt, i) => {
      const [x, y] = projectPoint(pt);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ') + ' Z';
}

// Build full path "d" from a GeoJSON geometry (Polygon or MultiPolygon)
function geometryToPath(geometry: { type: string; coordinates: any }): string {
  if (geometry.type === 'Polygon') {
    return (geometry.coordinates as [number, number][][]).map(ringToPath).join(' ');
  }
  if (geometry.type === 'MultiPolygon') {
    return (geometry.coordinates as [number, number][][][])
      .flatMap(poly => poly.map(ringToPath))
      .join(' ');
  }
  return '';
}

// Centroid of each tehsil in geographic coordinates (used for labels)
const LABEL_POS: Record<string, [number, number]> = {
  Sardhana:      [77.56, 29.17],
  Daurala:       [77.74, 29.13],
  Mawana:        [77.93, 29.20],
  Hastinapur:    [78.01, 29.10],
  'Meerut City': [77.67, 28.94],
  Kithor:        [77.95, 28.86],
};

// ─── GeoJSON loader hook ──────────────────────────────────────────────────────

interface GeoFeature {
  properties: { name: string };
  geometry: { type: string; coordinates: any };
}

function useMeerutBlocks() {
  const [blocks, setBlocks] = useState<GeoFeature[]>([]);
  useEffect(() => {
    fetch('/meerut-blocks.geojson')
      .then(r => r.json())
      .then(fc => setBlocks(fc.features ?? []))
      .catch(console.error);
  }, []);
  return blocks;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const MeerutDistrictMap: React.FC<MeerutDistrictMapProps> = ({
  metric,
  regionData,
  height = 360,
  onRegionClick,
}) => {
  const blocks = useMeerutBlocks();
  const [tooltip, setTooltip] = useState<{ html: string; x: number; y: number } | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<[number, number]>([0, 0]);
  const dragging = useRef(false);
  const lastMouse = useRef<[number, number]>([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const zoomIn  = () => setZoom(z => Math.min(z * 1.5, 8));
  const zoomOut = () => setZoom(z => Math.max(z / 1.5, 1));
  const reset   = () => { setZoom(1); setPan([0, 0]); };

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastMouse.current = [e.clientX, e.clientY];
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) {
      const dx = e.clientX - lastMouse.current[0];
      const dy = e.clientY - lastMouse.current[1];
      lastMouse.current = [e.clientX, e.clientY];
      setPan(([px, py]) => [px + dx, py + dy]);
    }
    if (tooltip && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltip(t => t ? { ...t, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
    }
  };
  const onMouseUp = () => { dragging.current = false; };

  // SVG transform for zoom+pan
  const transform = `translate(${pan[0]}, ${pan[1]}) scale(${zoom})`;
  const transformOrigin = `${SVG_W / 2}px ${SVG_H / 2}px`;

  return (
    <div
      ref={containerRef}
      className="w-full relative select-none"
      style={{ height, background: '#ffffff', cursor: dragging.current ? 'grabbing' : 'grab' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => { onMouseUp(); setTooltip(null); setHoveredName(null); }}
    >
      {/* ── SVG canvas ── */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', background: '#ffffff' }}
      >
        {/* White background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="#ffffff" />

        {/* Zoom+pan group */}
        <g transform={transform} style={{ transformOrigin }}>
          {/* Filled block regions */}
          {blocks.map((block) => {
            const name = block.properties.name || '';
            const data = resolve(name);
            const fill = getFill(metric, data);
            const isHovered = hoveredName === name;
            const displayFill = isHovered ? getHover(metric, data) : fill;

            return (
              <path
                key={name}
                d={geometryToPath(block.geometry)}
                fill={displayFill}
                stroke="#ffffff"
                strokeWidth={1.5 / zoom}
                strokeLinejoin="round"
                style={{ transition: 'fill 0.15s ease', cursor: 'pointer' }}
                onClick={() => data && onRegionClick?.(name, data)}
                onMouseEnter={(e) => {
                  setHoveredName(name);
                  if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    setTooltip({
                      html: buildTooltip(metric, name, data, fill),
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }
                }}
                onMouseLeave={() => { setHoveredName(null); setTooltip(null); }}
              />
            );
          })}

          {/* Outer district boundary stroke (crisp outline matching reference shape) */}
          {blocks.map((block) => (
            <path
              key={`outline-${block.properties.name}`}
              d={geometryToPath(block.geometry)}
              fill="none"
              stroke="#ffffff"
              strokeWidth={2 / zoom}
              strokeLinejoin="round"
              pointerEvents="none"
            />
          ))}

          {/* Labels */}
          {blocks.map((block) => {
            const name = block.properties.name || '';
            const pos = LABEL_POS[name];
            if (!pos) return null;
            const [lx, ly] = projectPoint(pos);
            return (
              <text
                key={`label-${name}`}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0F172A"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={3 / zoom}
                paintOrder="stroke"
                style={{
                  fontSize: `${11 / zoom}px`,
                  fontWeight: 700,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  pointerEvents: 'none',
                }}
              >
                {name}
              </text>
            );
          })}
        </g>
      </svg>

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
            onClick={(e) => { e.stopPropagation(); action(); }}
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
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[9px] font-medium text-gray-600 whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tooltip ── */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 bg-white text-gray-800 border border-gray-200 shadow-xl rounded-xl"
          style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
          dangerouslySetInnerHTML={{ __html: tooltip.html }}
        />
      )}
    </div>
  );
};
