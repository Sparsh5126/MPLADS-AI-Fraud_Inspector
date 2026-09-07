import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';

const normalizeName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const MEERUT_GEO_URL = '/meerut-blocks.geojson';

const BLOCK_CENTROIDS: Record<string, [number, number]> = {
  'Sardhana': [77.5042, 29.1445],
  'Daurala': [77.7792, 29.1972],
  'Mawana': [77.9876, 29.1622],
  'Hastinapur': [78.0613, 28.9564],
  'Meerut City': [77.6045, 28.8825],
  'Kithor': [77.8443, 28.8191],
};

export interface MeerutSimpleMapProps {
  colorFn: (data: any) => string;
  tooltipFn: (region: any) => string;
  regionDataMap: Record<string, any>;
  height?: number | string;
}

export const MeerutSimpleMap: React.FC<MeerutSimpleMapProps> = ({
  colorFn,
  tooltipFn,
  regionDataMap,
  height = 300,
}) => {
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);
  const [position, setPosition] = useState({ coordinates: [77.77, 29.00] as [number, number], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  return (
    <div 
      className="w-full relative select-none bg-white rounded-lg overflow-hidden" 
      style={{ height, backgroundColor: '#ffffff' }}
      onMouseMove={(e) => {
        if (tooltip) {
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltip(prev => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
        }
      }}
      onMouseLeave={() => setTooltip(null)}
    >
      {/* Zoom Controls */}
      <div className="absolute top-2 left-2 z-10 flex flex-col shadow-sm border border-gray-200 rounded-md overflow-hidden bg-white">
        <button onClick={handleZoomIn} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-b border-gray-200 font-medium pb-0.5">+</button>
        <button onClick={handleZoomOut} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-medium pb-0.5">-</button>
      </div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 36000,
          center: [77.77, 29.00], // True center of Meerut district
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
          onMoveEnd={handleMoveEnd}
          minZoom={1} 
          maxZoom={4}
        >
          <Geographies geography={MEERUT_GEO_URL}>
            {({ geographies }) => (
              <>
                {geographies.map((geo, i) => {
                  const rawName = geo.properties.name || '';
                  const normalizedName = normalizeName(rawName);

                  let matchedData = null;
                  for (const [key, data] of Object.entries(regionDataMap)) {
                    if (normalizeName(key) === normalizedName) {
                      matchedData = data;
                      break;
                    }
                  }
                  
                  if (!matchedData) {
                    const key = Object.keys(regionDataMap).find((k) =>
                      normalizeName(k).includes(normalizedName) || normalizedName.includes(normalizeName(k))
                    );
                    if (key) matchedData = regionDataMap[key];
                  }

                  const data = matchedData || { name: rawName, riskLevel: 'No Data', works: 0 };
                  const fillColor = colorFn(data);

                  return (
                    <Geography
                      key={geo.rsmKey || i}
                      geography={geo}
                      fill={fillColor}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      onMouseEnter={(e) => {
                        const content = tooltipFn(data);
                        const rect = e.currentTarget.closest('.relative')?.getBoundingClientRect();
                        const x = rect ? e.clientX - rect.left : e.clientX;
                        const y = rect ? e.clientY - rect.top : e.clientY;
                        setTooltip({ content, x, y });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: { outline: 'none', transition: 'all 0.2s' },
                        hover: { outline: 'none', filter: 'brightness(1.1)', cursor: 'pointer', transition: 'all 0.2s' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })}
                {geographies.map((geo, i) => {
                  const rawName = geo.properties.name || '';
                  const centroid = BLOCK_CENTROIDS[rawName] || [77.77, 29.00];
                  return (
                    <Marker key={`label-${i}`} coordinates={centroid as [number, number]}>
                      <text
                        textAnchor="middle"
                        y={3}
                        style={{
                          fontFamily: "system-ui, sans-serif",
                          fill: "#1E293B",
                          fontSize: "10px",
                          fontWeight: 700,
                          pointerEvents: "none",
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
      
      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 bg-white text-gray-800 border border-gray-200 shadow-xl rounded-xl p-2.5 text-xs"
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
