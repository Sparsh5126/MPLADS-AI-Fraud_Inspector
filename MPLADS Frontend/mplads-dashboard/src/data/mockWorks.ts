export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type WorkStatus = 'Completed' | 'In Progress' | 'Not Started' | 'Delayed' | 'Stalled';
export type InvestigationStatus = 'Open' | 'Reviewing' | 'Pending' | 'Resolved';

export interface Work {
  work_id: string;
  state: string;
  district: string;
  category: string;
  sanctioned_amount: number;
  scale: number;
  sanction_date: string;
  completion_date: string;
  status: WorkStatus;
  risk_score: number;
  risk_level: RiskLevel;
  cost_anomaly_score: number;
  peer_zscore: number;
  ml_relative_residual: number;
  payment_anomaly_score: number;
  duplicate_score: number;
  image_anomaly_score: number;
  vendor_network_score: number;
  execution_risk_score: number;
  compliance_score: number;
  latitude: number;
  longitude: number;
  vendor: string;
  ia_name: string;
  title: string;
  main_reason?: string;
  investigation_status?: InvestigationStatus;
}

const seed: Work[] = [
  {
    work_id: 'W1042', state: 'Uttar Pradesh', district: 'Meerut', category: 'Drainage',
    sanctioned_amount: 2480000, scale: 100, sanction_date: '2024-04-10', completion_date: '2025-01-15',
    status: 'In Progress', risk_score: 87, risk_level: 'Critical',
    cost_anomaly_score: 1.0, peer_zscore: 3.8, ml_relative_residual: 0.73,
    payment_anomaly_score: 0.35, duplicate_score: 0.91, image_anomaly_score: 1.0,
    vendor_network_score: 0.24, execution_risk_score: 0.61, compliance_score: 0.30,
    latitude: 28.9501, longitude: 77.7231, vendor: 'Vendor A', ia_name: 'IA-01',
    title: 'Construction of village drainage system', main_reason: 'Cost + Duplicate Photo',
    investigation_status: 'Open',
  },
  {
    work_id: 'W0812', state: 'Uttar Pradesh', district: 'Baghpat', category: 'Road',
    sanctioned_amount: 1820000, scale: 80, sanction_date: '2024-03-05', completion_date: '2024-12-20',
    status: 'In Progress', risk_score: 84, risk_level: 'Critical',
    cost_anomaly_score: 0.91, peer_zscore: 3.2, ml_relative_residual: 0.68,
    payment_anomaly_score: 0.91, duplicate_score: 0.30, image_anomaly_score: 0.45,
    vendor_network_score: 0.55, execution_risk_score: 0.40, compliance_score: 0.25,
    latitude: 28.9445, longitude: 77.2260, vendor: 'Vendor B', ia_name: 'IA-02',
    title: 'Rural road upgradation', main_reason: 'Payment Structuring',
    investigation_status: 'Open',
  },
  {
    work_id: 'W0931', state: 'Uttar Pradesh', district: 'Ghaziabad', category: 'Water Supply',
    sanctioned_amount: 3150000, scale: 120, sanction_date: '2024-05-15', completion_date: '2025-02-28',
    status: 'In Progress', risk_score: 71, risk_level: 'High',
    cost_anomaly_score: 0.45, peer_zscore: 1.9, ml_relative_residual: 0.42,
    payment_anomaly_score: 0.60, duplicate_score: 0.25, image_anomaly_score: 0.35,
    vendor_network_score: 0.88, execution_risk_score: 0.55, compliance_score: 0.40,
    latitude: 28.6692, longitude: 77.4538, vendor: 'Vendor A', ia_name: 'IA-01',
    title: 'Community water supply scheme', main_reason: 'Vendor Network',
    investigation_status: 'Reviewing',
  },
  {
    work_id: 'W0678', state: 'Uttar Pradesh', district: 'Lucknow', category: 'Community Hall',
    sanctioned_amount: 1260000, scale: 60, sanction_date: '2024-02-20', completion_date: '2024-10-15',
    status: 'In Progress', risk_score: 68, risk_level: 'High',
    cost_anomaly_score: 0.55, peer_zscore: 2.1, ml_relative_residual: 0.48,
    payment_anomaly_score: 0.30, duplicate_score: 0.40, image_anomaly_score: 0.92,
    vendor_network_score: 0.35, execution_risk_score: 0.45, compliance_score: 0.30,
    latitude: 26.8467, longitude: 80.9462, vendor: 'Vendor C', ia_name: 'IA-03',
    title: 'Construction of community hall', main_reason: 'Image Location Mismatch',
    investigation_status: 'Open',
  },
  {
    work_id: 'W0451', state: 'Bihar', district: 'Patna', category: 'School',
    sanctioned_amount: 2840000, scale: 110, sanction_date: '2024-01-12', completion_date: '2024-11-30',
    status: 'Delayed', risk_score: 52, risk_level: 'Medium',
    cost_anomaly_score: 0.35, peer_zscore: 1.4, ml_relative_residual: 0.30,
    payment_anomaly_score: 0.40, duplicate_score: 0.20, image_anomaly_score: 0.25,
    vendor_network_score: 0.45, execution_risk_score: 0.78, compliance_score: 0.45,
    latitude: 25.5941, longitude: 85.1376, vendor: 'Vendor D', ia_name: 'IA-04',
    title: 'School boundary wall construction', main_reason: 'Execution Delay',
    investigation_status: 'Pending',
  },
  {
    work_id: 'W0712', state: 'Uttar Pradesh', district: 'Bulandshahr', category: 'Water Supply',
    sanctioned_amount: 1240000, scale: 55, sanction_date: '2024-03-18', completion_date: '2024-09-30',
    status: 'In Progress', risk_score: 67, risk_level: 'High',
    cost_anomaly_score: 0.50, peer_zscore: 2.0, ml_relative_residual: 0.45,
    payment_anomaly_score: 0.25, duplicate_score: 0.35, image_anomaly_score: 0.88,
    vendor_network_score: 0.30, execution_risk_score: 0.40, compliance_score: 0.30,
    latitude: 28.4071, longitude: 77.8497, vendor: 'Vendor A', ia_name: 'IA-01',
    title: 'Water supply scheme village', main_reason: 'Image Anomaly',
    investigation_status: 'Open',
  },
  {
    work_id: 'W0620', state: 'Uttar Pradesh', district: 'Aligarh', category: 'School',
    sanctioned_amount: 1670000, scale: 70, sanction_date: '2024-04-22', completion_date: '2025-01-10',
    status: 'In Progress', risk_score: 48, risk_level: 'Medium',
    cost_anomaly_score: 0.62, peer_zscore: 2.3, ml_relative_residual: 0.55,
    payment_anomaly_score: 0.20, duplicate_score: 0.30, image_anomaly_score: 0.15,
    vendor_network_score: 0.25, execution_risk_score: 0.35, compliance_score: 0.20,
    latitude: 27.8974, longitude: 78.0880, vendor: 'Vendor B', ia_name: 'IA-02',
    title: 'School boundary wall Aligarh', main_reason: 'Cost Anomaly',
    investigation_status: 'Pending',
  },
  {
    work_id: 'W0982', state: 'Uttar Pradesh', district: 'Meerut', category: 'Drainage',
    sanctioned_amount: 2210000, scale: 95, sanction_date: '2024-02-08', completion_date: '2024-12-15',
    status: 'Completed', risk_score: 62, risk_level: 'High',
    cost_anomaly_score: 0.70, peer_zscore: 2.6, ml_relative_residual: 0.60,
    payment_anomaly_score: 0.30, duplicate_score: 0.91, image_anomaly_score: 0.55,
    vendor_network_score: 0.40, execution_risk_score: 0.25, compliance_score: 0.20,
    latitude: 28.9620, longitude: 77.7400, vendor: 'Vendor A', ia_name: 'IA-01',
    title: 'Drainage channel improvement', main_reason: 'Duplicate work suspected',
    investigation_status: 'Reviewing',
  },
  {
    work_id: 'W0990', state: 'Uttar Pradesh', district: 'Meerut', category: 'Road',
    sanctioned_amount: 3400000, scale: 140, sanction_date: '2024-01-30', completion_date: '2024-11-15',
    status: 'Delayed', risk_score: 76, risk_level: 'High',
    cost_anomaly_score: 0.82, peer_zscore: 3.0, ml_relative_residual: 0.65,
    payment_anomaly_score: 0.55, duplicate_score: 0.45, image_anomaly_score: 0.50,
    vendor_network_score: 0.70, execution_risk_score: 0.72, compliance_score: 0.48,
    latitude: 28.9800, longitude: 77.7050, vendor: 'Vendor A', ia_name: 'IA-01',
    title: 'State highway link road', main_reason: 'Cost + Vendor Network',
    investigation_status: 'Reviewing',
  },
  {
    work_id: 'W0733', state: 'Uttar Pradesh', district: 'Baghpat', category: 'Drainage',
    sanctioned_amount: 1950000, scale: 84, sanction_date: '2024-02-14', completion_date: '2024-10-30',
    status: 'Stalled', risk_score: 65, risk_level: 'High',
    cost_anomaly_score: 0.72, peer_zscore: 2.7, ml_relative_residual: 0.62,
    payment_anomaly_score: 0.58, duplicate_score: 0.42, image_anomaly_score: 0.48,
    vendor_network_score: 0.62, execution_risk_score: 0.68, compliance_score: 0.52,
    latitude: 28.9640, longitude: 77.2430, vendor: 'Vendor B', ia_name: 'IA-02',
    title: 'Village drainage Baghpat', main_reason: 'Multiple anomalies detected',
    investigation_status: 'Reviewing',
  },
  {
    work_id: 'W0291', state: 'Uttar Pradesh', district: 'Ghaziabad', category: 'Road',
    sanctioned_amount: 2880000, scale: 122, sanction_date: '2024-01-20', completion_date: '2024-10-10',
    status: 'Delayed', risk_score: 58, risk_level: 'Medium',
    cost_anomaly_score: 0.55, peer_zscore: 2.1, ml_relative_residual: 0.48,
    payment_anomaly_score: 0.45, duplicate_score: 0.30, image_anomaly_score: 0.35,
    vendor_network_score: 0.50, execution_risk_score: 0.72, compliance_score: 0.42,
    latitude: 28.6750, longitude: 77.4800, vendor: 'Vendor C', ia_name: 'IA-03',
    title: 'Ring road link NH58', main_reason: 'Execution delay, cost above expected',
    investigation_status: 'Pending',
  },
  {
    work_id: 'W0477', state: 'Uttar Pradesh', district: 'Noida', category: 'Community Hall',
    sanctioned_amount: 1750000, scale: 75, sanction_date: '2024-08-15', completion_date: '2025-06-01',
    status: 'Not Started', risk_score: 42, risk_level: 'Medium',
    cost_anomaly_score: 0.50, peer_zscore: 1.8, ml_relative_residual: 0.40,
    payment_anomaly_score: 0.22, duplicate_score: 0.15, image_anomaly_score: 0.12,
    vendor_network_score: 0.28, execution_risk_score: 0.60, compliance_score: 0.35,
    latitude: 28.5355, longitude: 77.3910, vendor: 'Vendor B', ia_name: 'IA-02',
    title: 'Community center construction Noida', main_reason: 'Not started after sanction',
    investigation_status: 'Open',
  },
  {
    work_id: 'W0388', state: 'Bihar', district: 'Gaya', category: 'Road',
    sanctioned_amount: 2600000, scale: 108, sanction_date: '2024-03-10', completion_date: '2024-12-05',
    status: 'Delayed', risk_score: 55, risk_level: 'Medium',
    cost_anomaly_score: 0.48, peer_zscore: 1.9, ml_relative_residual: 0.42,
    payment_anomaly_score: 0.38, duplicate_score: 0.25, image_anomaly_score: 0.30,
    vendor_network_score: 0.42, execution_risk_score: 0.70, compliance_score: 0.40,
    latitude: 24.7914, longitude: 84.9994, vendor: 'Vendor P', ia_name: 'IA-16',
    title: 'Village road Gaya district', main_reason: 'Execution Delay + Cost',
    investigation_status: 'Pending',
  },
  {
    work_id: 'W0758', state: 'West Bengal', district: 'Kolkata', category: 'Drainage',
    sanctioned_amount: 1980000, scale: 88, sanction_date: '2024-03-25', completion_date: '2024-11-20',
    status: 'Delayed', risk_score: 44, risk_level: 'Medium',
    cost_anomaly_score: 0.38, peer_zscore: 1.6, ml_relative_residual: 0.35,
    payment_anomaly_score: 0.30, duplicate_score: 0.22, image_anomaly_score: 0.28,
    vendor_network_score: 0.35, execution_risk_score: 0.65, compliance_score: 0.32,
    latitude: 22.5726, longitude: 88.3639, vendor: 'Vendor I', ia_name: 'IA-09',
    title: 'Drainage improvement Kolkata', main_reason: 'Execution Delay',
    investigation_status: 'Pending',
  },
  {
    work_id: 'W0560', state: 'Punjab', district: 'Amritsar', category: 'Road',
    sanctioned_amount: 2750000, scale: 115, sanction_date: '2024-04-05', completion_date: '2025-01-25',
    status: 'In Progress', risk_score: 38, risk_level: 'Medium',
    cost_anomaly_score: 0.42, peer_zscore: 1.7, ml_relative_residual: 0.38,
    payment_anomaly_score: 0.35, duplicate_score: 0.18, image_anomaly_score: 0.22,
    vendor_network_score: 0.32, execution_risk_score: 0.42, compliance_score: 0.28,
    latitude: 31.6340, longitude: 74.8723, vendor: 'Vendor L', ia_name: 'IA-12',
    title: 'Rural connectivity road Punjab', main_reason: 'Cost Anomaly',
    investigation_status: 'Pending',
  },
];

// Generate 70+ low-risk works
const states = ['Uttar Pradesh', 'Bihar', 'Rajasthan', 'Maharashtra', 'Madhya Pradesh', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Andhra Pradesh', 'Punjab', 'Haryana', 'Odisha'];
const districtsByState: Record<string, string[]> = {
  'Uttar Pradesh': ['Agra', 'Varanasi', 'Kanpur', 'Allahabad', 'Bareilly', 'Moradabad', 'Muzaffarnagar', 'Mathura'],
  'Bihar': ['Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Begusarai'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer'],
  'Maharashtra': ['Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  'West Bengal': ['Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
  'Punjab': ['Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda'],
  'Haryana': ['Gurugram', 'Faridabad', 'Hisar', 'Rohtak'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Berhampur', 'Rourkela'],
};
const categories = ['Road', 'Drainage', 'Community Hall', 'Water Supply', 'School', 'Health Center', 'Others'];
const vendors = ['Vendor E', 'Vendor F', 'Vendor G', 'Vendor H', 'Vendor J', 'Vendor K', 'Vendor M', 'Vendor N', 'Vendor O', 'Vendor Q', 'Vendor R', 'Vendor S'];
const ias = ['IA-05', 'IA-06', 'IA-07', 'IA-08', 'IA-09', 'IA-10', 'IA-11', 'IA-12', 'IA-13', 'IA-14'];
const statusOptions: WorkStatus[] = ['Completed', 'In Progress', 'Not Started', 'Completed', 'Completed'];

const generated: Work[] = Array.from({ length: 70 }, (_, i) => {
  const state = states[i % states.length];
  const stateDistricts = districtsByState[state] || ['District A'];
  const district = stateDistricts[i % stateDistricts.length];
  const category = categories[i % categories.length];
  const riskScore = Math.floor(5 + (i % 30));
  const riskLevel: RiskLevel = riskScore >= 70 ? 'High' : riskScore >= 45 ? 'Medium' : 'Low';
  return {
    work_id: `W${String(1100 + i).padStart(4, '0')}`,
    state, district, category,
    sanctioned_amount: Math.floor(800000 + (i * 37000) % 2200000),
    scale: 40 + (i * 7) % 100,
    sanction_date: `2024-0${1 + (i % 9)}-${String(1 + (i * 3) % 28).padStart(2, '0')}`,
    completion_date: `2025-0${1 + (i % 9)}-${String(1 + (i * 5) % 28).padStart(2, '0')}`,
    status: statusOptions[i % statusOptions.length],
    risk_score: riskScore,
    risk_level: riskLevel,
    cost_anomaly_score: parseFloat((0.05 + (i % 25) * 0.01).toFixed(2)),
    peer_zscore: parseFloat((0.1 + (i % 12) * 0.08).toFixed(2)),
    ml_relative_residual: parseFloat((0.03 + (i % 18) * 0.01).toFixed(2)),
    payment_anomaly_score: parseFloat((0.04 + (i % 15) * 0.01).toFixed(2)),
    duplicate_score: parseFloat((0.02 + (i % 10) * 0.01).toFixed(2)),
    image_anomaly_score: parseFloat((0.03 + (i % 12) * 0.01).toFixed(2)),
    vendor_network_score: parseFloat((0.05 + (i % 20) * 0.01).toFixed(2)),
    execution_risk_score: parseFloat((0.08 + (i % 25) * 0.01).toFixed(2)),
    compliance_score: parseFloat((0.03 + (i % 15) * 0.01).toFixed(2)),
    latitude: 18 + (i * 0.31) % 14,
    longitude: 72 + (i * 0.23) % 18,
    vendor: vendors[i % vendors.length],
    ia_name: ias[i % ias.length],
    title: `${category} project ${district} ${i + 1}`,
    main_reason: '',
    investigation_status: 'Resolved',
  };
});

export const mockWorks: Work[] = [...seed, ...generated];

export const allStates = [...new Set(mockWorks.map(w => w.state))].sort();
export const allDistricts = [...new Set(mockWorks.map(w => w.district))].sort();
export const allCategories = [...new Set(mockWorks.map(w => w.category))].sort();
export const allYears = ['2023', '2024', '2025'];
