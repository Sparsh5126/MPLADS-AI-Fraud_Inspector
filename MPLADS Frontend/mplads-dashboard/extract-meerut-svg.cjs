/**
 * extract-meerut-svg.cjs
 * Extracts Meerut boundary + computes Voronoi tehsil blocks,
 * then emits everything needed for the pure-SVG renderer as a TypeScript file.
 */
const fs = require('fs');
const turf = require('@turf/turf');
const topojson = require('topojson-client');

// ── 1. Load Meerut boundary ──────────────────────────────────────────────────
const topo = JSON.parse(fs.readFileSync('./public/up-districts.json', 'utf8'));
const key  = Object.keys(topo.objects)[0];
const upGeo = topojson.feature(topo, topo.objects[key]);
const meerutFeature = upGeo.features.find(f => f.properties.district === 'Meerut');
if (!meerutFeature) { console.error('Meerut not found'); process.exit(1); }

// ── 2. Voronoi block centroids (geographic positions of 6 tehsils) ───────────
const CENTROIDS = {
  Sardhana:    [77.57, 29.15],
  Daurala:     [77.73, 29.13],
  Mawana:      [77.92, 29.20],
  Hastinapur:  [78.02, 29.10],
  'Meerut City': [77.68, 28.94],
  Kithor:      [77.94, 28.86],
};

const points = turf.featureCollection(
  Object.entries(CENTROIDS).map(([name, coords]) => turf.point(coords, { name }))
);

const bbox = turf.bbox(meerutFeature);
const expanded = [bbox[0]-0.05, bbox[1]-0.05, bbox[2]+0.05, bbox[3]+0.05];
const voronoi = turf.voronoi(points, { bbox: expanded });

const blocks = [];
turf.featureEach(voronoi, (cell, i) => {
  const pt = points.features[i];
  const clipped = turf.intersect(turf.featureCollection([cell, meerutFeature]));
  if (clipped) {
    clipped.properties = { name: pt.properties.name };
    blocks.push(clipped);
    console.log('Block:', pt.properties.name,
      'verts:', clipped.geometry.type === 'Polygon'
        ? clipped.geometry.coordinates[0].length
        : clipped.geometry.coordinates.reduce((s,r)=>s+r[0].length,0));
  }
});

const geojson = turf.featureCollection(blocks);

// ── 3. Write updated meerut-blocks.geojson ───────────────────────────────────
fs.writeFileSync('./public/meerut-blocks.geojson', JSON.stringify(geojson, null, 2));
console.log(`\nWrote ${blocks.length} blocks to public/meerut-blocks.geojson`);

// ── 4. Emit the boundary polygon for the TypeScript data file ─────────────────
// We'll use the actual Meerut boundary ring as the clip path
const ring = meerutFeature.geometry.coordinates[0];
console.log('\nMeerut boundary ring has', ring.length, 'points');
console.log('Done!');
