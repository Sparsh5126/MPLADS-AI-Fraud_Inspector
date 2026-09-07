import fs from 'fs';

const topo = JSON.parse(fs.readFileSync('public/up-districts.json', 'utf8'));
const dists = topo.objects['uttar-pradesh'].geometries.map(g => g.properties.district).sort();

const known = {
  'Meerut': { totalWorks: 342, highRisk: 28, critical: 9, mediumRisk: 100, lowRisk: 205, riskLevel: 'Critical' },
  'Baghpat': { totalWorks: 281, highRisk: 21, critical: 6, mediumRisk: 80, lowRisk: 174, riskLevel: 'Critical' },
  'Ghaziabad': { totalWorks: 276, highRisk: 18, critical: 5, mediumRisk: 75, lowRisk: 178, riskLevel: 'High' },
  'Lucknow': { totalWorks: 412, highRisk: 17, critical: 4, mediumRisk: 110, lowRisk: 281, riskLevel: 'High' },
  'Saharanpur': { totalWorks: 265, highRisk: 16, critical: 4, mediumRisk: 70, lowRisk: 175, riskLevel: 'Medium' },
  'Varanasi': { totalWorks: 512, highRisk: 12, critical: 2, mediumRisk: 120, lowRisk: 378, riskLevel: 'Medium' },
  'Kanpur Nagar': { totalWorks: 388, highRisk: 8, critical: 1, mediumRisk: 90, lowRisk: 289, riskLevel: 'Low' },
  'Agra': { totalWorks: 310, highRisk: 5, critical: 0, mediumRisk: 70, lowRisk: 235, riskLevel: 'Low' },
  'Prayagraj': { totalWorks: 440, highRisk: 6, critical: 1, mediumRisk: 95, lowRisk: 338, riskLevel: 'Low' },
  'Mathura': { totalWorks: 199, highRisk: 10, critical: 3, mediumRisk: 45, lowRisk: 141, riskLevel: 'High' },
};

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const levels = ['Critical', 'High', 'High', 'Medium', 'Medium', 'Medium', 'Low', 'Low', 'Low', 'Low'];

const result = {};
dists.forEach(d => {
  if (known[d]) {
    result[d] = { name: d, ...known[d] };
  } else {
    const h = hash(d);
    const riskLevel = levels[h % levels.length];
    const totalWorks = 150 + (h % 250);
    const critical = riskLevel === 'Critical' ? 4 + (h % 5) : riskLevel === 'High' ? 2 + (h % 3) : riskLevel === 'Medium' ? 1 : 0;
    const highRisk = riskLevel === 'Critical' ? 18 + (h % 10) : riskLevel === 'High' ? 12 + (h % 8) : riskLevel === 'Medium' ? 6 + (h % 5) : 2 + (h % 4);
    const mediumRisk = Math.round(totalWorks * 0.25);
    const lowRisk = totalWorks - critical - highRisk - mediumRisk;
    result[d] = { name: d, totalWorks, highRisk, critical, mediumRisk, lowRisk, riskLevel };
  }
});

const fileContent = `export interface UPDistrictInfo {
  name: string;
  totalWorks: number;
  highRisk: number;
  critical: number;
  mediumRisk: number;
  lowRisk: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'No Data';
}

export const allUPDistrictData: Record<string, UPDistrictInfo> = ${JSON.stringify(result, null, 2)};
`;

fs.writeFileSync('src/data/upDistrictsData.ts', fileContent, 'utf8');
console.log('Successfully wrote src/data/upDistrictsData.ts with', Object.keys(result).length, 'districts!');
