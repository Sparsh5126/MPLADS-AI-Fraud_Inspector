import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { Maximize2 } from 'lucide-react';
import 'react-tooltip/dist/react-tooltip.css';

interface IndiaRiskMapProps {
  onViewFullMap?: () => void;
}

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
    default: return '#E5E7EB';
  }
};

const getRiskHoverColor = (level: string) => {
  switch (level) {
    case 'Critical': return '#DC2626';
    case 'High': return '#EA580C';
    case 'Medium': return '#CA8A04';
    case 'Low': return '#16A34A';
    default: return '#D1D5DB';
  }
};

// Bundled locally so the map does not depend on an external request.
const INDIA_GEOJSON_URL = '/india-states.geojson';

export const IndiaRiskMap: React.FC<IndiaRiskMapProps> = ({ onViewFullMap }) => {
  const [tooltipContent, setTooltipContent] = useState('');

  return (
    <div className="w-full h-64 relative flex flex-col" data-tooltip-id="india-map-tooltip">
      <div className="flex-1 bg-blue-50/30 rounded-lg border border-blue-50 relative overflow-hidden">
        <ComposableMap 
          projection="geoMercator"
          projectionConfig={{
            scale: 850,
            center: [80, 22] // Center on India
          }}
          width={400}
          height={300}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup center={[80, 22]} zoom={1} minZoom={1} maxZoom={4}>
            <Geographies geography={INDIA_GEOJSON_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.NAME_1 || geo.properties.name || geo.properties.st_nm || "Unknown";
                  
                  // Match with mock data
                  let matchedData = mockStateData[stateName];
                  
                  // Fuzzy match
                  if (!matchedData) {
                    const key = Object.keys(mockStateData).find(k => k.toLowerCase().includes(stateName.toLowerCase()) || stateName.toLowerCase().includes(k.toLowerCase()));
                    if (key) matchedData = mockStateData[key];
                  }

                  const riskLevel = matchedData?.riskLevel || 'Low';
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
                        if (matchedData) {
                          setTooltipContent(`
                            <div class="p-1">
                              <p class="font-bold text-sm mb-1">${stateName}</p>
                              <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                <span class="text-gray-500">Total Works:</span>
                                <span class="font-semibold text-right">${matchedData.totalWorks}</span>
                                <span class="text-gray-500">High Risk:</span>
                                <span class="font-semibold text-right text-orange-600">${matchedData.highRisk}</span>
                              </div>
                            </div>
                          `);
                        } else {
                          setTooltipContent(`<div class="p-1 font-bold text-sm">${stateName}</div>`);
                        }
                      }}
                      onMouseLeave={() => {
                        setTooltipContent('');
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
        <div className="absolute bottom-2 left-2 flex gap-3 text-[10px] font-medium text-gray-600 bg-white/80 p-1.5 rounded-md backdrop-blur-sm border border-gray-200">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div>Critical</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div>High</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>Medium</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div>Low</div>
        </div>
      </div>
      
      <Tooltip id="india-map-tooltip" html={tooltipContent} className="z-50 !bg-white !text-gray-800 !border !border-gray-200 !shadow-lg !rounded-lg !opacity-100" />

      {onViewFullMap && (
        <button onClick={onViewFullMap} className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg">
          <Maximize2 size={14} />
          Explore Full Map
        </button>
      )}
    </div>
  );
};
