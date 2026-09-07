const fs = require('fs');
const topojsonServer = require('topojson-server');
const topojsonClient = require('topojson-client');
const turf = require('@turf/turf');

const geojson = JSON.parse(fs.readFileSync('./public/meerut-schematic.json'));
console.log('Original features:', geojson.features.length);

// Wait, the currently saved meerut-schematic.json already contains the 6 MultiPolygons that have hundreds of sub-polygons.
// Let's flatten them into individual polygons, assign their cluster, and then merge with TopoJSON.
const flatFeatures = turf.flatten(geojson).features;
console.log('Flattened features:', flatFeatures.length);

// Build Topology with quantization to snap coordinates
const topology = topojsonServer.topology({ cells: turf.featureCollection(flatFeatures) }, { quantization: 1e5 });

const blockNames = ['Sardhana', 'Meerut City', 'Daurala', 'Mawana', 'Kithor', 'Hastinapur'];
const mergedFeatures = [];

blockNames.forEach(name => {
    // Find geometries in the topology that belong to this block
    const geometries = topology.objects.cells.geometries.filter(g => g.properties.name === name);
    if (geometries.length > 0) {
        // Merge them
        const merged = topojsonClient.merge(topology, geometries);
        if (merged) {
            mergedFeatures.push({
                type: 'Feature',
                properties: { name },
                geometry: merged
            });
        }
    }
});

console.log('Merged features:', mergedFeatures.length);
fs.writeFileSync('./test-merged.json', JSON.stringify(turf.featureCollection(mergedFeatures), null, 2));
