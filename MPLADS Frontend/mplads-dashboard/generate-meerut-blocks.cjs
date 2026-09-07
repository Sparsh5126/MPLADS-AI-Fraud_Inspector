const fs = require('fs');
const turf = require('@turf/turf');
const topojson = require('topojson-client');

// 1. Read UP districts (TopoJSON)
const upTopo = JSON.parse(fs.readFileSync('./public/up-districts.json', 'utf8'));
const objectKey = Object.keys(upTopo.objects)[0];

// 2. Convert to GeoJSON
const upGeo = topojson.feature(upTopo, upTopo.objects[objectKey]);

// 3. Find Meerut
const meerutFeature = upGeo.features.find(f => f.properties.district === 'Meerut');

if (!meerutFeature) {
  console.error("Meerut not found!");
  process.exit(1);
}

const bbox = turf.bbox(meerutFeature);
console.log('Meerut bbox:', bbox);
// bbox = [minLon, minLat, maxLon, maxLat]

// The actual Meerut district spans roughly:
// Lon: 77.42 (west) to 78.12 (east)
// Lat: 28.74 (south) to 29.27 (north)
//
// The 6 tehsils of Meerut district in actual geographic locations:
// - Sardhana: NW corner (western side, upper portion)
// - Daurala: NC area (just east of Sardhana, upper)
// - Mawana: NE area (upper-right)
// - Hastinapur: E area (eastern side, upper)
// - Meerut City / Meerut: central-SW
// - Kithor: SE area (eastern side, lower)
//
// Based on actual Meerut tehsil centroid positions from geographic references:
const BLOCK_CENTROIDS = {
  'Sardhana':    [77.57, 29.15],  // NW quadrant
  'Daurala':     [77.73, 29.13],  // N-center
  'Mawana':      [77.92, 29.20],  // NE quadrant
  'Hastinapur':  [78.02, 29.10],  // E (right-center)
  'Meerut City': [77.68, 28.94],  // SW-center
  'Kithor':      [77.94, 28.86],  // SE quadrant
};

// Create points for voronoi
const points = turf.featureCollection(
  Object.entries(BLOCK_CENTROIDS).map(([name, coords]) => 
    turf.point(coords, { name })
  )
);

// Expand bbox a tiny bit to avoid edge clipping
const expandedBbox = [
  bbox[0] - 0.05,
  bbox[1] - 0.05,
  bbox[2] + 0.05,
  bbox[3] + 0.05,
];

// Generate voronoi polygons
const voronoiPolygons = turf.voronoi(points, { bbox: expandedBbox });

// Intersect each voronoi polygon with the Meerut district
const blocks = [];

turf.featureEach(voronoiPolygons, (currentFeature, featureIndex) => {
  if (currentFeature) {
    const pt = points.features[featureIndex];
    const intersected = turf.intersect(turf.featureCollection([currentFeature, meerutFeature]));
    if (intersected) {
      intersected.properties = { name: pt.properties.name };
      blocks.push(intersected);
      console.log(`Created block: ${pt.properties.name}`);
    } else {
      console.warn(`No intersection for: ${pt.properties.name}`);
    }
  }
});

console.log(`Total blocks created: ${blocks.length}`);

const outFC = turf.featureCollection(blocks);
fs.writeFileSync('./public/meerut-blocks.geojson', JSON.stringify(outFC, null, 2));
console.log('Written to public/meerut-blocks.geojson');
