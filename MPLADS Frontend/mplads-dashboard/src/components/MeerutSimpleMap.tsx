import React, { useState, useEffect } from 'react';

// ─── Projection constants (same as MeerutDistrictMap) ─────────────────────────
const SVG_W = 800;
const SVG_H = 600;
const PAD   = 30;

const GEO_MIN_LON = 77.4227;
const GEO_MAX_LON = 78.1239;
const GEO_MIN_LAT = 28.7366;
const GEO_MAX_LAT = 29.2659;

const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

const MERC_Y_MIN = mercY(GEO_MIN_LAT);
const MERC_Y_MAX = mercY(GEO_MAX_LAT);

const AVAIL_W = SVG_W - 2 * PAD;
const AVAIL_H = SVG_H - 2 * PAD;

const SCALE_X = AVAIL_W / (GEO_MAX_LON - GEO_MIN_LON);
const SCALE_Y = AVAIL_H / (MERC_Y_MAX - MERC_Y_MIN);

function projectPoint([lon, lat]: [number, number]): [number, number] {
  const x = PAD + (lon - GEO_MIN_LON) * SCALE_X;
  const y = PAD + (MERC_Y_MAX - mercY(lat)) * SCALE_Y;
  return [x, y];
}

function ringToPath(ring: [number, number][]): string {
  return ring
    .map((pt, i) => {
      const [x, y] = projectPoint(pt);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ') + ' Z';
}

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

const LABEL_POS: Record<string, [number, number]> = {
  Sardhana:      [77.56, 29.17],
  Daurala:       [77.74, 29.13],
  Mawana:        [77.93, 29.20],
  Hastinapur:    [78.01, 29.10],
  'Meerut City': [77.67, 28.94],
  Kithor:        [77.95, 28.86],
};

const normalizeName = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ');

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MeerutSimpleMapProps {
  colorFn: (data: any) => string;
  tooltipFn: (region: any) => string;
  regionDataMap: Record<string, any>;
  height?: number | string;
}

interface GeoFeature {
  properties: { name: string };
  geometry: { type: string; coordinates: any };
}

// ─── Component ────────────────────────────────────────────────────────────────

export const MeerutSimpleMap: React.FC<MeerutSimpleMapProps> = ({
  colorFn,
  tooltipFn,
  regionDataMap,
  height = 300,
}) => {
  const [blocks, setBlocks] = useState<GeoFeature[]>([]);
  const [tooltip, setTooltip] = useState<{ html: string; x: number; y: number } | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    fetch('/meerut-blocks.geojson')
      .then(r => r.json())
      .then(fc => setBlocks(fc.features ?? []))
      .catch(console.error);
  }, []);

  const resolveData = (rawName: string) => {
    const norm = normalizeName(rawName);
    let found: any = null;
    for (const [k, v] of Object.entries(regionDataMap)) {
      if (normalizeName(k) === norm) { found = v; break; }
    }
    if (!found) {
      const k = Object.keys(regionDataMap).find(
        k => normalizeName(k).includes(norm) || norm.includes(normalizeName(k))
      );
      if (k) found = regionDataMap[k];
    }
    return found ?? { name: rawName, riskLevel: 'No Data', works: 0 };
  };

  const transform = `translate(${pan[0]}, ${pan[1]}) scale(${zoom})`;

  return (
    <div
      className="w-full relative select-none rounded-lg overflow-hidden"
      style={{ height, background: '#ffffff' }}
      onMouseLeave={() => { setTooltip(null); setHoveredName(null); }}
    >
      {/* Zoom controls */}
      <div className="absolute top-2 left-2 z-10 flex flex-col shadow-sm border border-gray-200 rounded-md overflow-hidden bg-white">
        <button
          onClick={() => setZoom(z => Math.min(z * 1.5, 4))}
          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-b border-gray-200 font-medium"
        >+</button>
        <button
          onClick={() => { setZoom(z => Math.max(z / 1.5, 1)); setPan([0,0]); }}
          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-medium"
        >-</button>
      </div>

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', background: '#ffffff' }}
      >
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="#ffffff" />
        <g transform={transform} style={{ transformOrigin: `${SVG_W/2}px ${SVG_H/2}px` }}>
          {blocks.map((block) => {
            const name = block.properties.name || '';
            const data = resolveData(name);
            const fill = colorFn(data);
            const isHovered = hoveredName === name;

            return (
              <path
                key={name}
                d={geometryToPath(block.geometry)}
                fill={isHovered ? fill + 'cc' : fill}
                stroke="#ffffff"
                strokeWidth={1.5 / zoom}
                strokeLinejoin="round"
                style={{ transition: 'fill 0.15s ease', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  setHoveredName(name);
                  const svgEl = (e.target as SVGElement).closest('div');
                  if (svgEl) {
                    const rect = svgEl.getBoundingClientRect();
                    setTooltip({ html: tooltipFn(data), x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }
                }}
                onMouseMove={(e) => {
                  const svgEl = (e.target as SVGElement).closest('div');
                  if (svgEl) {
                    const rect = svgEl.getBoundingClientRect();
                    setTooltip(t => t ? { ...t, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
                  }
                }}
                onMouseLeave={() => { setHoveredName(null); setTooltip(null); }}
              />
            );
          })}

          {/* Labels */}
          {blocks.map((block) => {
            const name = block.properties.name || '';
            const pos = LABEL_POS[name];
            if (!pos) return null;
            const [lx, ly] = projectPoint(pos);
            return (
              <text
                key={`lbl-${name}`}
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

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 bg-white text-gray-800 border border-gray-200 shadow-xl rounded-xl p-2.5 text-xs"
          style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
          dangerouslySetInnerHTML={{ __html: tooltip.html }}
        />
      )}
    </div>
  );
};
