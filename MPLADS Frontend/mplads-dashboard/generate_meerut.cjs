const fs = require('fs');
const topojson = require('topojson-client');
const topojsonServer = require('topojson-server');
const topojsonClient = require('topojson-client');
const turf = require('@turf/turf');

// 1. Read up-districts.json
const upData = JSON.parse(fs.readFileSync('./public/up-districts.json', 'utf8'));
const geojson = topojson.feature(upData, Object.keys(upData.objects)[0]);

// 2. Find Meerut
const meerutFeature = geojson.features.find(f => {
    const name = (f.properties.dtname || f.properties.district || f.properties.DISTRICT || f.properties.name || "").toLowerCase();
    return name === 'meerut';
});

if (!meerutFeature) {
    console.error("Meerut not found!");
    process.exit(1);
}

const bbox = turf.bbox(meerutFeature);
const xMin = bbox[0], yMin = bbox[1], xMax = bbox[2], yMax = bbox[3];
const dx = xMax - xMin;
const dy = yMax - yMin;

// 3. Define 6 Block Seed Points
const seedCoordinates = [
    [xMin + dx * 0.25, yMin + dy * 0.25], // Sardhana
    [xMin + dx * 0.75, yMin + dy * 0.25], // Meerut City
    [xMin + dx * 0.25, yMin + dy * 0.75], // Daurala
    [xMin + dx * 0.75, yMin + dy * 0.75], // Mawana
    [xMin + dx * 0.5, yMin + dy * 0.5],   // Kithor
    [xMin + dx * 0.5, yMin + dy * 0.85]   // Hastinapur
];
const blockNames = ['Sardhana', 'Meerut City', 'Daurala', 'Mawana', 'Kithor', 'Hastinapur'];

// 4. Generate Micro-cell Seeds (500 points)
let microPoints = turf.randomPoint(600, {bbox: bbox});
microPoints.features = microPoints.features.filter(pt => turf.booleanPointInPolygon(pt, meerutFeature));

seedCoordinates.forEach(coord => {
    microPoints.features.push(turf.point(coord));
});

// 5. Generate Voronoi for Micro-cells
const microVoronoi = turf.voronoi(microPoints, {bbox: bbox});

// 6. Clip and Cluster Micro-cells
const microCells = [];

for (let i = 0; i < microVoronoi.features.length; i++) {
    const vPoly = microVoronoi.features[i];
    if (!vPoly) continue;
    
    try {
        const clipped = turf.intersect(turf.featureCollection([vPoly, meerutFeature]));
        if (!clipped) continue;

        const centroid = turf.centroid(clipped);
        let closestDist = Infinity;
        let clusterId = 0;

        for (let j = 0; j < seedCoordinates.length; j++) {
            const dist = turf.distance(centroid, turf.point(seedCoordinates[j]));
            if (dist < closestDist) {
                closestDist = dist;
                clusterId = j;
            }
        }

        // Flatten MultiPolygons into Polygons
        turf.flatten(clipped).features.forEach(flatPoly => {
            if (flatPoly.geometry.type === 'Polygon') {
                flatPoly.properties = { name: blockNames[clusterId] };
                microCells.push(flatPoly);
            }
        });
    } catch (err) { }
}

const microCellCollection = turf.featureCollection(microCells);

// 7. Topology-based Dissolve/Merge
// We use topojson-server to quantize and identify shared edges, then topojson-client to merge them seamlessly.
const topology = topojsonServer.topology({ cells: microCellCollection }, { quantization: 1e5 });

const finalBlocks = [];
blockNames.forEach(name => {
    const geometries = topology.objects.cells.geometries.filter(g => g.properties.name === name);
    if (geometries.length > 0) {
        const merged = topojsonClient.merge(topology, geometries);
        if (merged) {
            finalBlocks.push({
                type: 'Feature',
                properties: { name },
                geometry: merged
            });
        }
    }
});

// 8. Output
const resultGeojson = turf.featureCollection(finalBlocks);
fs.writeFileSync('./public/meerut-schematic.json', JSON.stringify(resultGeojson, null, 2));

console.log("Successfully merged into " + finalBlocks.length + " clean polygons using TopoJSON.");
