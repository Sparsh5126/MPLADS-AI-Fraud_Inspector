const fs = require('fs');
const topojson = require('topojson-client');
const turf = require('@turf/turf');

// Read up-districts.json
const upData = JSON.parse(fs.readFileSync('./public/up-districts.json', 'utf8'));
const geojson = topojson.feature(upData, Object.keys(upData.objects)[0]);

// Find Meerut
const meerutFeature = geojson.features.find(f => {
    const name = (f.properties.dtname || f.properties.DISTRICT || f.properties.name || "").toLowerCase();
    return name === 'meerut';
});

if (!meerutFeature) {
    console.error("Meerut not found!");
    process.exit(1);
}

const bbox = turf.bbox(meerutFeature);

// Fixed seed points to ensure we get 6 well-distributed regions
const xMin = bbox[0], yMin = bbox[1], xMax = bbox[2], yMax = bbox[3];
const dx = xMax - xMin;
const dy = yMax - yMin;

const seedPoints = turf.featureCollection([
    turf.point([xMin + dx * 0.25, yMin + dy * 0.25]),
    turf.point([xMin + dx * 0.75, yMin + dy * 0.25]),
    turf.point([xMin + dx * 0.25, yMin + dy * 0.75]),
    turf.point([xMin + dx * 0.75, yMin + dy * 0.75]),
    turf.point([xMin + dx * 0.5, yMin + dy * 0.5]),
    turf.point([xMin + dx * 0.5, yMin + dy * 0.8]),
]);

// Generate Voronoi
const voronoiPolygons = turf.voronoi(seedPoints, {bbox: bbox});

// Clip each Voronoi polygon with Meerut
const blocks = [];
const blockNames = ['Sardhana', 'Meerut City', 'Daurala', 'Mawana', 'Kithor', 'Hastinapur'];

for (let i = 0; i < 6; i++) {
    const vPoly = voronoiPolygons.features[i];
    if (!vPoly) continue;
    
    // Intersect
    try {
        // turf.intersect expects two features in v6
        const clipped = turf.intersect(vPoly, meerutFeature);
        if (clipped) {
            clipped.properties = { name: blockNames[i] };
            blocks.push(clipped);
        }
    } catch (err) {
        console.error("Intersection failed for block " + blockNames[i], err);
    }
}

const resultGeojson = turf.featureCollection(blocks);
fs.writeFileSync('./public/meerut-schematic.json', JSON.stringify(resultGeojson, null, 2));
console.log("Successfully generated public/meerut-schematic.json with " + blocks.length + " blocks.");
