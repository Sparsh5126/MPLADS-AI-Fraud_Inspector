import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Maximize2 } from 'lucide-react';

interface IndiaRiskMapProps {
  onViewFullMap?: () => void;
}

const normalizeName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

// Mock state data for the Ministry Level dashboard
const mockStateData: Record<string, { totalWorks: number, highRisk: number, riskLevel: string }> = {
  'Uttar Pradesh': { totalWorks: 12842, highRisk: 487, riskLevel: 'Critical' },
  'Bihar': { totalWorks: 8432, highRisk: 312, riskLevel: 'Critical' },
  'Maharashtra': { totalWorks: 11200, highRisk: 210, riskLevel: 'High' },
  'Madhya Pradesh': { totalWorks: 9100, highRisk: 198, riskLevel: 'High' },
  'Karnataka': { totalWorks: 7600, highRisk: 85, riskLevel: 'Medium' },
  'Gujarat': { totalWorks: 6500, highRisk: 60, riskLevel: 'Medium' },
  'Kerala': { totalWorks: 4200, highRisk: 12, riskLevel: 'Low' },
  'Tamil Nadu': { totalWorks: 8100, highRisk: 40, riskLevel: 'Low' },
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

// Bundled locally so the map does not depend on an external request.
const INDIA_GEOJSON_URL = '/india-states.geojson';

export const IndiaRiskMap: React.FC<IndiaRiskMapProps> = ({ onViewFullMap }) => {
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);

  return (
    <div 
      className="w-full h-72 relative flex flex-col"
      onMouseMove={(e) => {
        if (tooltip) {
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltip(prev => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
        }
      }}
      onMouseLeave={() => setTooltip(null)}
    >
      <div className="flex-1 bg-blue-50/30 rounded-lg border border-blue-50 relative overflow-hidden">
        <ComposableMap 
          projection="geoMercator"
          projectionConfig={{
            scale: 700,
            center: [82, 23], // Centered to show full India
          }}
          width={500}
          height={420}
          style={{ width: '100%', height: '100%' }}
        >
          {/* White background so polygon overflow doesn't bleed */}
          <rect x={0} y={0} width={500} height={420} fill="#EFF6FF" />
          <ZoomableGroup center={[82, 23]} zoom={1} minZoom={1} maxZoom={4}>
            <Geographies geography={INDIA_GEOJSON_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.NAME_1 || geo.properties.name || geo.properties.st_nm || "Unknown";
                  const normalizedStateName = normalizeName(stateName);
                  
                  // Match with mock data
                  let matchedData = null;
                  for (const [key, data] of Object.entries(mockStateData)) {
                    if (normalizeName(key) === normalizedStateName) {
                      matchedData = data;
                      break;
                    }
                  }
                  
                  // Fuzzy match
                  if (!matchedData) {
                    const key = Object.keys(mockStateData).find(k => 
                      normalizeName(k).includes(normalizedStateName) || 
                      normalizedStateName.includes(normalizeName(k))
                    );
                    if (key) matchedData = mockStateData[key];
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
                      onMouseEnter={() => {
                        let content = '';
                        if (matchedData) {
                          content = `
                            <div class="p-1 min-w-[120px]">
                              <p class="font-bold text-sm mb-1 border-b border-gray-100 pb-1">${stateName}</p>
                              <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-1.5">
                                <span class="text-gray-500">Risk:</span>
                                <span class="font-bold text-right" style="color: ${fillColor}">${matchedData.riskLevel}</span>
                                <span class="text-gray-500">Total Works:</span>
                                <span class="font-semibold text-right">${matchedData.totalWorks}</span>
                                <span class="text-gray-500">High Risk:</span>
                                <span class="font-semibold text-right text-orange-600">${matchedData.highRisk}</span>
                              </div>
                            </div>
                          `;
                        } else {
                          content = `
                            <div class="p-1">
                              <p class="font-bold text-sm mb-1">${stateName}</p>
                              <p class="text-xs text-gray-500 font-medium">Risk: No Data</p>
                            </div>
                          `;
                        }
                        setTooltip({ content, x: 0, y: 0 });
                      }}
                      onMouseLeave={() => setTooltip(null)}
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
      </div>
      
      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg opacity-100 p-0"
          style={{
            left: tooltip.x + 15,
            top: tooltip.y + 15,
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}

      {onViewFullMap && (
        <button onClick={onViewFullMap} className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg">
          <Maximize2 size={14} />
          Explore Full Map
        </button>
      )}
    </div>
  );
};
