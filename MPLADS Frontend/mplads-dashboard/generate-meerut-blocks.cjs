const fs = require('fs');
const turf = require('@turf/turf');
const topojson = require('topojson-client');

// 1. Read UP districts (TopoJSON)
const upTopo = JSON.parse(fs.readFileSync('./public/up-districts.json', 'utf8'));

// TopoJSON usually has objects. If the key is known, use it. Let's find it dynamically.
const objectKey = Object.keys(upTopo.objects)[0];

// 2. Convert to GeoJSON
const upGeo = topojson.feature(upTopo, upTopo.objects[objectKey]);

// 3. Find Meerut
const meerutFeature = upGeo.features.find(f => 
  (f.properties.district && f.properties.district === 'Meerut') || 
  (f.properties.name && f.properties.name === 'Meerut') ||
  (f.properties.dtname && f.properties.dtname === 'Meerut')
);

if (!meerutFeature) {
  console.error("Meerut not found! Available districts:", upGeo.features.map(f => f.properties.district || f.properties.name || f.properties.dtname).slice(0, 10));
  process.exit(1);
}

// 4. Define block centroids
const BLOCK_CENTROIDS = {
  'Sardhana': [77.61, 29.14],
  'Daurala': [77.72, 29.13],
  'Mawana': [77.93, 29.10],
  'Hastinapur': [78.02, 29.16],
  'Meerut City': [77.70, 28.98],
  'Kithor': [77.94, 28.87]
};

// Create points for voronoi
const points = turf.featureCollection(
  Object.entries(BLOCK_CENTROIDS).map(([name, coords]) => turf.point(coords, { name }))
);

// Create a bounding box slightly larger than Meerut
const bbox = turf.bbox(meerutFeature);

// Generate voronoi polygons
const voronoiPolygons = turf.voronoi(points, { bbox });

// Intersect each voronoi polygon with the Meerut district
const blocks = [];

turf.featureEach(voronoiPolygons, (currentFeature, featureIndex) => {
  if (currentFeature) {
    const pt = points.features[featureIndex];
    // intersect with Meerut
    const intersected = turf.intersect(turf.featureCollection([currentFeature, meerutFeature]));
    if (intersected) {
      intersected.properties = { name: pt.properties.name };
      blocks.push(intersected);
    }
  }
});

const outFC = turf.featureCollection(blocks);
fs.writeFileSync('./public/meerut-blocks.geojson', JSON.stringify(outFC, null, 2));
console.log("Created meerut-blocks.geojson successfully.");
