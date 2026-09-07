import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

interface DistrictData {
  name: string;
  totalWorks: number;
  highRisk: number;
  critical: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'No Data';
}

const normalizeName = (name: string) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\bdistrict\b/g, '') // remove the word 'district'
    .replace(/[^a-z0-9]/g, '');   // remove all non-alphanumeric chars (spaces, hyphens, etc)
};

const getRiskColor = (level: string) => {
  switch (level) {
    case 'Critical': return '#EF4444'; // red-500
    case 'High': return '#F97316'; // orange-500
    case 'Medium': return '#EAB308'; // yellow-500
    case 'Low': return '#22C55E'; // green-500
    case 'No Data': return '#D1D5DB'; // gray-300
    default: return '#D1D5DB';
  }
};

const getRiskHoverColor = (level: string) => {
  switch (level) {
    case 'Critical': return '#DC2626';
    case 'High': return '#EA580C';
    case 'Medium': return '#CA8A04';
    case 'Low': return '#16A34A';
    case 'No Data': return '#9CA3AF'; // gray-400
    default: return '#9CA3AF';
  }
};

interface StateUPRiskMapProps {
  districtData: Record<string, DistrictData>;
  onDistrictClick?: (district: string) => void;
}

export const StateUPRiskMap: React.FC<StateUPRiskMapProps> = ({ districtData, onDistrictClick }) => {
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);

  return (
    <div 
      className="w-full h-full relative select-none"
      onMouseMove={(e) => {
        if (tooltip) {
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltip(prev => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
        }
      }}
      onMouseLeave={() => setTooltip(null)}
    >
      <ComposableMap 
        projection="geoMercator"
        projectionConfig={{
          scale: 2600,
          center: [80.5, 27.0], // Center on UP to show full state
        }}
        width={600}
        height={500}
        style={{ width: '100%', height: '100%' }}
      >
        {/* White background prevents polygon color bleed */}
        <rect x={0} y={0} width={600} height={500} fill="#f8fafc" />
        <ZoomableGroup center={[80.5, 27.0]} zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography="/up-districts.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const districtName = geo.properties.district || geo.properties.dtname || geo.properties.DISTRICT || geo.properties.name || "Unknown";
                const normalizedDistrictName = normalizeName(districtName);
                
                let matchedData = null;
                for (const [key, data] of Object.entries(districtData)) {
                  if (normalizeName(key) === normalizedDistrictName) {
                    matchedData = data;
                    break;
                  }
                }
                
                // Fallback fuzzy match if exact match fails
                if (!matchedData) {
                  const key = Object.keys(districtData).find(k => 
                    normalizeName(k).includes(normalizedDistrictName) || 
                    normalizedDistrictName.includes(normalizeName(k))
                  );
                  if (key) matchedData = districtData[key];
                }

                const riskLevel = matchedData?.riskLevel || 'No Data';
                const fillColor = getRiskColor(riskLevel);
                const hoverColor = getRiskHoverColor(riskLevel);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    onClick={() => {
                      if (onDistrictClick && matchedData) {
                        onDistrictClick(matchedData.name);
                      }
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.closest('.relative')?.getBoundingClientRect();
                      const x = rect ? e.clientX - rect.left : e.clientX;
                      const y = rect ? e.clientY - rect.top : e.clientY;
                      const content = matchedData ? `
                        <div class="p-1 min-w-[120px]">
                          <p class="font-bold text-sm mb-1 border-b border-gray-100 pb-1">${matchedData.name}</p>
                          <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-1.5">
                            <span class="text-gray-500">Risk:</span>
                            <span class="font-bold text-right" style="color: ${fillColor}">${matchedData.riskLevel}</span>
                            <span class="text-gray-500">Total Works:</span>
                            <span class="font-semibold text-right">${matchedData.totalWorks}</span>
                            <span class="text-gray-500">High Risk:</span>
                            <span class="font-semibold text-right text-orange-600">${matchedData.highRisk}</span>
                            <span class="text-gray-500">Critical:</span>
                            <span class="font-semibold text-right text-red-600">${matchedData.critical}</span>
                          </div>
                        </div>
                      ` : `
                        <div class="p-1">
                          <p class="font-bold text-sm mb-1">${districtName}</p>
                          <p class="text-xs text-gray-500 font-medium">Risk: No Data</p>
                        </div>
                      `;
                      setTooltip({ content, x, y });
                    }}
                    onMouseLeave={() => {
                      setTooltip(null);
                    }}
                    style={{
                      default: { outline: 'none', transition: 'all 0.2s' },
                      hover: { fill: hoverColor, outline: 'none', cursor: 'pointer', transition: 'all 0.2s' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur border border-gray-200 rounded-lg p-2 shadow-sm pointer-events-none">
        <div className="flex flex-col gap-1.5 text-[10px] font-medium text-gray-600">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-red-500"></div>Critical</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-orange-500"></div>High</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-yellow-500"></div>Medium</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-green-500"></div>Low</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-gray-300"></div>No Data</div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 bg-white text-gray-800 border border-gray-200 shadow-xl rounded-xl p-2"
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
