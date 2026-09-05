export interface Alert {
  id: string;
  type: 'cost' | 'duplicate' | 'payment' | 'image' | 'vendor' | 'compliance';
  title: string;
  description: string;
  work_id: string;
  reference: string;
  timestamp: string;
  timeAgo: string;
  severity: 'Critical' | 'High' | 'Medium';
}

export const mockAlerts: Alert[] = [
  {
    id: 'A001', type: 'cost', title: 'Cost anomaly detected',
    description: 'Work W1042 cost is 73% above expected for similar Drainage works in Meerut.',
    work_id: 'W1042', reference: 'Work W1042 (Meerut)', timestamp: '2025-06-24T06:00:00Z', timeAgo: '2h ago', severity: 'Critical',
  },
  {
    id: 'A002', type: 'duplicate', title: 'Possible duplicate work',
    description: 'Work W0812 has 91% text similarity with W0733, with vendor overlap detected.',
    work_id: 'W0812', reference: 'Work W0812 (Baghpat)', timestamp: '2025-06-24T04:00:00Z', timeAgo: '4h ago', severity: 'Critical',
  },
  {
    id: 'A003', type: 'payment', title: 'Unusual payment pattern',
    description: '3 payments near ₹9-10L threshold within 10 days detected for W0931.',
    work_id: 'W0931', reference: 'Work W0931 (Ghaziabad)', timestamp: '2025-06-24T02:00:00Z', timeAgo: '6h ago', severity: 'High',
  },
  {
    id: 'A004', type: 'image', title: 'Image location mismatch',
    description: 'GPS location of completion photo is 4.8 km from project site for W0678.',
    work_id: 'W0678', reference: 'Work W0678 (Lucknow)', timestamp: '2025-06-23T14:00:00Z', timeAgo: '1d ago', severity: 'High',
  },
  {
    id: 'A005', type: 'vendor', title: 'High vendor overlap',
    description: 'Vendor A appears in 62% of works under IA-02, suggesting possible cartelization.',
    work_id: 'W0990', reference: 'IA-02 (Meerut)', timestamp: '2025-06-23T08:00:00Z', timeAgo: '1d ago', severity: 'High',
  },
  {
    id: 'A006', type: 'cost', title: 'Peer Z-score exceeded threshold',
    description: 'W0990 has a peer Z-score of 3.0, significantly above the 2.5 threshold.',
    work_id: 'W0990', reference: 'Work W0990 (Meerut)', timestamp: '2025-06-22T14:00:00Z', timeAgo: '2d ago', severity: 'High',
  },
  {
    id: 'A007', type: 'compliance', title: 'Payment exceeds sanction amount',
    description: 'Total payments for W0733 have exceeded the originally sanctioned amount.',
    work_id: 'W0733', reference: 'Work W0733 (Baghpat)', timestamp: '2025-06-22T10:00:00Z', timeAgo: '2d ago', severity: 'Critical',
  },
  {
    id: 'A008', type: 'duplicate', title: 'Image similarity flag',
    description: 'Completion photo for W1042 matches W0982 with 91% visual similarity.',
    work_id: 'W1042', reference: 'Work W1042 & W0982', timestamp: '2025-06-21T16:00:00Z', timeAgo: '3d ago', severity: 'Critical',
  },
  {
    id: 'A009', type: 'payment', title: 'Multiple payments near threshold',
    description: 'Work W0812 shows 3 payments of ₹9.2L, ₹9.5L, ₹9.7L within 12 days.',
    work_id: 'W0812', reference: 'Work W0812 (Baghpat)', timestamp: '2025-06-21T08:00:00Z', timeAgo: '3d ago', severity: 'Critical',
  },
  {
    id: 'A010', type: 'vendor', title: 'Vendor network cluster detected',
    description: 'Vendor A and Vendor B share 5 common sub-contractors across 12 works.',
    work_id: 'W0931', reference: 'IA-01, IA-02 cluster', timestamp: '2025-06-20T14:00:00Z', timeAgo: '4d ago', severity: 'High',
  },
];
