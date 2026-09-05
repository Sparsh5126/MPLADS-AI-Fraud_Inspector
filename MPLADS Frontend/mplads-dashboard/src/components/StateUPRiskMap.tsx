import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface DistrictData {
  name: string;
  totalWorks: number;
  highRisk: number;
  critical: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
}

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

interface StateUPRiskMapProps {
  districtData: Record<string, DistrictData>;
  onDistrictClick?: (district: string) => void;
}

export const StateUPRiskMap: React.FC<StateUPRiskMapProps> = ({ districtData, onDistrictClick }) => {
  const [tooltipContent, setTooltipContent] = useState('');

  return (
    <div className="w-full h-full relative" data-tooltip-id="up-map-tooltip">
      <ComposableMap 
        projection="geoMercator"
        projectionConfig={{
          scale: 3000,
          center: [80.9, 27.2] // Center on UP
        }}
        width={400}
        height={300}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup center={[80.9, 27.2]} zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography="/up-districts.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                // The geojson has district name in properties.DISTRICT or similar depending on the source
                const districtName = geo.properties.dtname || geo.properties.DISTRICT || geo.properties.name || "Unknown";
                
                // Match with mock data, fallback to Low risk if no data
                // In a real app we'd need exact matching of district names.
                let matchedData = districtData[districtName];
                
                // Temporary fuzzy match for demo since topojson might have different spellings
                if (!matchedData) {
                  const key = Object.keys(districtData).find(k => k.toLowerCase().includes(districtName.toLowerCase()) || districtName.toLowerCase().includes(k.toLowerCase()));
                  if (key) matchedData = districtData[key];
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
                    onClick={() => {
                      if (onDistrictClick && matchedData) {
                        onDistrictClick(matchedData.name);
                      }
                    }}
                    onMouseEnter={() => {
                      if (matchedData) {
                        setTooltipContent(`
                          <div class="p-1">
                            <p class="font-bold text-sm mb-1">${matchedData.name}</p>
                            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                              <span class="text-gray-500">Total Works:</span>
                              <span class="font-semibold text-right">${matchedData.totalWorks}</span>
                              <span class="text-gray-500">High Risk:</span>
                              <span class="font-semibold text-right text-orange-600">${matchedData.highRisk}</span>
                              <span class="text-gray-500">Critical:</span>
                              <span class="font-semibold text-right text-red-600">${matchedData.critical}</span>
                            </div>
                          </div>
                        `);
                      } else {
                        setTooltipContent(`<div class="p-1 font-bold text-sm">${districtName}</div>`);
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
      
      <Tooltip id="up-map-tooltip" html={tooltipContent} className="z-50 !bg-white !text-gray-800 !border !border-gray-200 !shadow-lg !rounded-lg !opacity-100" />
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur border border-gray-200 rounded-lg p-2 shadow-sm pointer-events-none">
        <div className="flex flex-col gap-1.5 text-[10px] font-medium text-gray-600">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-red-500"></div>Critical</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-orange-500"></div>High</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-yellow-500"></div>Medium</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-green-500"></div>Low</div>
        </div>
      </div>
    </div>
  );
};
