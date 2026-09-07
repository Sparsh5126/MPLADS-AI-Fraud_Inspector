import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons for webpack/vite
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export interface RegionData {
  name: string;
  works?: number;
  delayed?: number;
  delayRate?: string;
  highRisk?: number;
  activeWorks?: number;
  pct?: number;
}

export interface LeafletHeatmapProps {
  center: [number, number];
  zoom?: number;
  geoJsonData: any;
  colorFn: (feature: any) => string;
  regionDataMap: Record<string, RegionData>;
  tooltipFn: (region: RegionData) => string;
  height?: number | string;
}

function FitBounds({ geoJsonData }: { geoJsonData: any }) {
  const map = useMap();
  useEffect(() => {
    if (!geoJsonData) return;
    try {
      const layer = L.geoJSON(geoJsonData);
      const bounds = layer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    } catch {}
  }, [geoJsonData, map]);
  return null;
}

export const LeafletHeatmap: React.FC<LeafletHeatmapProps> = ({
  center, zoom = 10, geoJsonData, colorFn, regionDataMap, tooltipFn, height = 300,
}) => {
  const onEachFeature = (feature: any, layer: L.Layer) => {
    const name = feature.properties?.district || feature.properties?.tehsil || feature.properties?.name || '';
    const regionKey = Object.keys(regionDataMap).find(
      k => name.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(name.toLowerCase())
    );
    const regionData = regionKey ? regionDataMap[regionKey] : { name };

    (layer as L.Path).setStyle({
      fillColor: colorFn(feature),
      fillOpacity: 0.75,
      color: '#fff',
      weight: 1.5,
    });

    layer.on({
      mouseover: (e) => {
        const l = e.target as L.Path;
        l.setStyle({ fillOpacity: 0.9, weight: 2.5, color: '#fff' });
        l.bindTooltip(tooltipFn(regionData), {
          permanent: false,
          direction: 'auto',
          className: 'leaflet-custom-tooltip',
        }).openTooltip();
      },
      mouseout: (e) => {
        const l = e.target as L.Path;
        l.setStyle({ fillOpacity: 0.75, weight: 1.5 });
        l.closeTooltip();
      },
    });
  };

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.4}
        />
        {geoJsonData && (
          <>
            <GeoJSON
              key={JSON.stringify(geoJsonData)}
              data={geoJsonData}
              style={(feature) => ({
                fillColor: colorFn(feature),
                fillOpacity: 0.75,
                color: '#fff',
                weight: 1.5,
              })}
              onEachFeature={onEachFeature}
            />
            <FitBounds geoJsonData={geoJsonData} />
          </>
        )}
      </MapContainer>
      <style>{`
        .leaflet-custom-tooltip {
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 8px 12px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          white-space: pre-line;
        }
        .leaflet-custom-tooltip::before { display: none; }
      `}</style>
    </div>
  );
};
