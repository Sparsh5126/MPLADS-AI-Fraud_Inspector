Create a polished, production-quality web dashboard for an **MPLADS Fraud & Anomaly Detection System**.

The dashboard is for government officers/auditors who need to identify suspicious MPLADS works, investigate anomalies, inspect evidence, and understand why a work has been assigned a particular risk score.

Build the frontend as a **real interactive dashboard**, not a static mockup.

## 1. Overall visual style

Use a modern government/enterprise analytics design.

Design characteristics:
- Clean
- Professional
- Data-dense but not cluttered
- Trustworthy
- Modern SaaS dashboard aesthetic
- White/light-gray main background
- Dark navy sidebar
- Blue as the primary accent
- Rounded cards with subtle borders and shadows
- Clear typography
- Plenty of whitespace
- Strong visual hierarchy
- Avoid excessive gradients
- Avoid glassmorphism
- Avoid overly colorful/neon UI
- Avoid a generic admin-template appearance

The interface should look suitable for an actual Indian government monitoring and audit platform.

Use:
- Font similar to Inter / Geist / Manrope
- Rounded corners around 8–12px
- Thin #E5E7EB-style borders
- Subtle shadows
- Primary blue around #1677FF / #2563EB
- Dark navy sidebar around #0F1B2D
- Main background around #F7F9FC

Risk colors:
- Critical = red
- High = orange
- Medium = yellow/amber
- Low = green

Do not overuse these colors. They should primarily communicate risk.

---

# 2. Application structure

Create a responsive application with:

- Fixed left sidebar
- Top navigation/search bar
- Main dashboard content area
- Responsive behavior for smaller screens
- Interactive navigation
- Interactive filters
- Interactive tables
- Clickable work records
- Modal/detail drawer where appropriate

Main navigation:

1. Dashboard
2. Works
3. Map View
4. Investigations
5. Cost Analysis
6. Payment Analysis
7. Duplicate Works
8. Image Forensics
9. Vendor Network
10. Compliance
11. Reports
12. Settings

Dashboard should be selected by default.

---

# 3. LEFT SIDEBAR

Create a dark navy vertical sidebar approximately 240px wide.

At the top:

Indian government emblem-style icon or a tasteful government emblem placeholder.

Text:

MPLADS

Fraud & Anomaly Detection

Transparent Development
Stronger India

Use a compact professional logo area.

Below it, navigation items with icons:

Dashboard
Works
Map View
Investigations
Cost Analysis
Payment Analysis
Duplicate Works
Image Forensics
Vendor Network
Compliance
Reports
Settings

Dashboard should have:
- Slightly lighter blue/navy active background
- Blue vertical indicator on the left
- White icon
- White text

Inactive navigation:
- Muted gray/blue-white text
- Subtle hover background

Use appropriate Lucide icons.

At the bottom of the sidebar create a subtle quote/info card:

“Accountability
today for a better
tomorrow.”

Below:

MPLADS
People's Development,
People's Trust

Keep this understated.

---

# 4. TOP HEADER

The main content starts to the right of the sidebar.

At the top create a horizontal header.

Left/center:

Large rounded search input.

Placeholder:

Search work ID, district, vendor, MP...

Include a search icon.

The search should actually work against the mock data.

Right side:

Notification bell icon.

Show a small red notification badge:

3

Then circular user avatar:

AO

Then:

Admin

with a dropdown chevron.

Create a small dropdown menu when the Admin area is clicked:

- Profile
- Preferences
- Sign out

---

# 5. PAGE HEADER

Below the top header:

Large heading:

Dashboard

Subtitle:

Overview of MPLADS works, risk indicators and anomalies

To the right / below depending on screen width, create filter controls.

Filters:

State
[All ▼]

District
[All ▼]

Category
[All ▼]

Year
[2025 ▼]

Risk Level
[All ▼]

Blue button:

Apply

All filters must be functional.

When filters change and Apply is clicked:
- KPI values update
- charts update
- investigation table updates
- map indicators update where possible

Use realistic mock data.

---

# 6. KPI CARDS

Create six KPI cards in a horizontal responsive grid.

Card 1:

Icon: cube/box

Total Works

1,284

+12%
vs last year

Card 2:

Icon: warning triangle

High Risk Works

47

+28%
vs last year

Card 3:

Icon: critical alert

Critical Works

12

+50%
vs last year

Card 4:

Icon: clock

Delayed Works

83

+18%
vs last year

Card 5:

Icon: rupee/currency

Total Sanctioned

₹324.7 Cr

+9%
vs last year

Card 6:

Icon: check circle

Completed Works

612

+15%
vs last year

Each card:
- White background
- Thin border
- Rounded corners
- Small colored icon container on the left
- Label
- Large bold number
- Small trend indicator
- Small "vs last year" text

Use green for positive trends where appropriate and red for concerning risk increases.

For High Risk, Critical and Delayed Works, an increase should visually communicate increased risk rather than being treated as positive.

---

# 7. RISK DISTRIBUTION CARD

Create a large card titled:

Risk Distribution

Use a donut chart.

Center:

1,284
Works

Segments:

Critical:
12 (0.9%)

High:
35 (2.7%)

Medium:
71 (5.5%)

Low:
1,166 (90.8%)

Use:
- Critical red
- High orange
- Medium amber/yellow
- Low green

Place the legend to the right of the donut.

Make the chart interactive:
- Hover shows count and percentage
- Clicking a segment filters the dashboard by that risk level

---

# 8. WORKS BY CATEGORY CARD

Title:

Works by Category

Use horizontal progress/bar charts.

Categories:

Road                 286
Drainage             198
Community Hall       154
Water Supply         132
School               121
Health Center         98
Others                295

Each row:
- Category name
- Horizontal bar
- Count at the right

Use subtle variations of the primary visual treatment, but keep the chart clean.

Hover should show:
- Number of works
- Percentage of total

---

# 9. GEOGRAPHIC RISK MAP

Create a large card titled:

Geographic Risk Map

Show a recognizable outline/map of India with district/state risk visualization.

The map should visually resemble a choropleth/point-risk map.

Legend:

Critical
High
Medium
Low

Display several risk indicators over India.

To the right of/below the map show:

Top 5 Districts by High/Critical Risk

1. Meerut — 15
2. Baghpat — 11
3. Ghaziabad — 9
4. Lucknow — 8
5. Patna — 7

Add map controls:
+
−

Bottom right:

View Full Map →

Clicking View Full Map should navigate to the Map View page.

Clicking a district should show a tooltip containing:
- District
- Total works
- Critical works
- High-risk works
- Average risk score

If a true geographic map library is available, use it. Otherwise create a visually convincing India SVG/map representation with clickable regions.

---

# 10. PRIORITY INVESTIGATIONS

Create a large card below the charts.

Header:

Priority Investigations

Right side:

View All →

Create a table with columns:

#
Work ID
District
Category
Amount
Risk
Main Reason
Status
Action

Rows:

1
W1042
Meerut
Drainage
₹24.8 L
Critical
Cost + duplicate photo
Open
View

2
W0812
Baghpat
Road
₹18.2 L
Critical
Payment structuring
Open
View

3
W0931
Ghaziabad
Water Supply
₹31.5 L
High
Vendor network
Reviewing
View

4
W0678
Lucknow
Community Hall
₹12.6 L
High
Image location mismatch
Open
View

5
W0451
Patna
School
₹28.4 L
Medium
Execution delay
Pending
View

Risk should use pill badges:

Critical
High
Medium
Low

Status should use:
Open
Reviewing
Pending
Resolved

The View button should be clickable.

Clicking a work should open the detailed Work Investigation view.

---

# 11. RECENT ALERTS

Place a card to the right of the Priority Investigations table.

Title:

Recent Alerts

Right side:

View All →

Create alert rows:

Cost anomaly detected
Work W1042 (Meerut)
2h ago

Possible duplicate work
Work W0812 (Baghpat)
4h ago

Unusual payment pattern
Work W0931 (Ghaziabad)
6h ago

Image location mismatch
Work W0678 (Lucknow)
1d ago

High vendor overlap
IA-02 (Meerut)
1d ago

Each alert should have:
- Alert icon
- Title
- Work/reference
- Timestamp
- Subtle red/pink icon container

Clicking an alert should open the related investigation.

---

# 12. QUICK ACTION CARDS

At the bottom create four horizontal action cards.

Card 1:

Icon: Search

Investigate a Work

Search and view detailed analysis
for any work

Arrow →

Card 2:

Icon: Network

Vendor Network Analysis

Explore connections between
IAs and vendors

Arrow →

Card 3:

Icon: Credit Card / Payment

Payment Analysis

Detect suspicious payment patterns

Arrow →

Card 4:

Icon: Shield

Compliance Rules

Check rule violations and deviations

Arrow →

Each card must be clickable and navigate to the relevant section.

---

# 13. WORK INVESTIGATION PAGE

Implement a complete page that opens when the user clicks a work.

Example work:

W1042

Header:

Work W1042

Construction of village drainage system

Meerut, Uttar Pradesh

Show:

District: Meerut
State: Uttar Pradesh
Category: Drainage
Sanctioned Amount: ₹24.8 L
Status: In Progress

Large risk score card:

87 / 100

CRITICAL

Then show a risk breakdown.

---

# 14. RISK BREAKDOWN

Create individual detector cards:

Cost Anomaly
Score: 0.82
Status: Flagged

Duplicate Work
Score: 0.91
Status: Flagged

Payment Anomaly
Score: 0.35
Status: Normal

Image Forensics
Score: 1.00
Status: Flagged

Vendor Network
Score: 0.24
Status: Normal

Execution Risk
Score: 0.61
Status: Warning

Compliance
Score: 0.30
Status: Normal

Each detector should have:
- Score
- Status
- Short explanation
- "View Analysis" button

---

# 15. WHY IS THIS WORK SUSPICIOUS?

Create a prominent evidence/explanation card.

Title:

Why is this work suspicious?

Show:

COST ANOMALY

This project costs 73% more than
the expected cost for similar works.

• Peer-group Z-score: 3.8
• ML expected cost: ₹14.3 L
• Actual sanctioned amount: ₹24.8 L

DUPLICATE PHOTO

A completion image appears similar
to an image associated with another work.

• Similarity: 91%
• Related work: W982
• Distance: 180 m

IMAGE LOCATION MISMATCH

The image GPS location is significantly
different from the project location.

• Project location → 28.9501, 77.7231
• Image location → 28.9842, 77.7064
• Distance → 4.8 km

Make each evidence block expandable.

---

# 16. COST ANALYSIS PAGE

Create a dedicated Cost Analysis page corresponding to the backend cost_anomaly.py detector.

Header:

Cost Anomaly Analysis

Filters:
- State
- District
- Category
- Year
- Risk

Show summary:

Actual Sanctioned Cost
₹24.8 L

Expected Cost
₹14.3 L

Difference
₹10.5 L

Relative Difference
+73.4%

Peer Z-score
3.8

Peer Anomaly Score
1.00

ML Anomaly Score
0.73

Final Cost Anomaly Score
1.00

Create a chart comparing:
- Actual cost
- Expected cost
- Similar works

Also create a peer-group visualization.

Include a section:

How the score was calculated

Peer-group method:
Category + State
↓
Cost per scale
↓
Median + MAD
↓
Robust Z-score

ML method:
Category + State + District + Scale + Year
↓
Random Forest
↓
Expected Cost
↓
Relative Residual

Final:
MAX(Peer Score, ML Score)

Make this technically accurate but visually understandable.

---

# 17. PAYMENT ANALYSIS PAGE

Create:

Payment Analysis

Show:
- Total sanctioned
- Total paid
- Number of payments
- Suspicious payment count

Create a timeline/chart of payments.

Highlight suspicious patterns such as:

Payment amount near threshold
Multiple payments in short period
Payments inconsistent with progress

Example:

₹9.2 L
₹9.5 L
₹9.7 L

Then show:

Payment Structuring Score
0.91

Explanation:
3 payments occurred within a short period and are close to the applicable threshold.

---

# 18. DUPLICATE WORKS PAGE

Create a comparison interface.

Example:

Work W1042
vs
Work W982

Show:

Text Similarity
91%

Location Distance
180 m

Category
Drainage

Amount
₹24.8 L vs ₹22.1 L

Use two side-by-side work cards.

Include a map showing the two project locations.

Add:
Potential Duplicate

Button:
Investigate Relationship

---

# 19. IMAGE FORENSICS PAGE

Create a gallery/grid of project photographs.

For each image show:

Image preview

GPS:
28.9842, 77.7064

Project GPS:
28.9501, 77.7231

Distance:
4.8 km

Status:

LOCATION MISMATCH

Also support:
- Image similarity
- Duplicate image detection
- Metadata
- Upload date
- Work association

Create an evidence comparison view for suspicious images.

---

# 20. VENDOR NETWORK PAGE

Create an interactive network graph.

Nodes:
- Individual Assemblies / IAs
- Vendors
- Works

Edges represent relationships.

Example:

IA-01 → Vendor A
IA-01 → Vendor B
IA-02 → Vendor A
IA-03 → Vendor B
Vendor A → Work W1042
Vendor B → Work W982

Allow:
- Zoom
- Pan
- Node selection
- Hover
- Filtering by district/year/vendor

When selecting a vendor show:

Vendor A

Connected Works: 42
Connected IAs: 7
Districts: 3
Vendor overlap: 62%

Possible suspicious cluster

Use a graph visualization library if available.

---

# 21. COMPLIANCE PAGE

Create a rules monitoring dashboard.

Example rules:

Recommendation vs Sanction
Status: Warning

Sanctioned but not started
Status: Normal

Payment exceeds sanction
Status: Violation

Annual MP entitlement
Status: Normal

Each rule should show:
- Rule name
- Current value
- Expected condition
- Status
- Number of affected works

---

# 22. MAP VIEW PAGE

Make the map page more detailed than the dashboard map.

Include:
- Full India map
- State selection
- District selection
- Risk filters
- Category filters
- Year filter

Show:
- Total works
- Critical works
- High-risk works
- Average risk

Clicking a location opens a work list for that area.

---

# 23. REPORTS PAGE

Create a reporting interface.

Cards:

Risk Summary Report
Cost Anomaly Report
Payment Anomaly Report
Duplicate Works Report
Vendor Network Report
Compliance Report

Buttons:

Generate Report
Export CSV
Export PDF

The UI can use mock functionality if backend export is not implemented.

---

# 24. DATA MODEL / MOCK DATA

Create realistic mock data instead of lorem ipsum.

Use at least 50–100 mock works.

Fields:

work_id
state
district
category
sanctioned_amount
scale
sanction_date
completion_date
status
risk_score
risk_level
cost_anomaly_score
peer_zscore
ml_relative_residual
payment_anomaly_score
duplicate_score
image_anomaly_score
vendor_network_score
execution_risk_score
compliance_score
latitude
longitude
vendor
ia_name

Example:

{
  work_id: "W1042",
  state: "Uttar Pradesh",
  district: "Meerut",
  category: "Drainage",
  sanctioned_amount: 2480000,
  scale: 100,
  risk_score: 87,
  risk_level: "Critical",
  cost_anomaly_score: 1.0,
  peer_zscore: 3.8,
  ml_relative_residual: 0.73,
  payment_anomaly_score: 0.35,
  duplicate_score: 0.91,
  image_anomaly_score: 1.0,
  vendor_network_score: 0.24,
  execution_risk_score: 0.61,
  compliance_score: 0.30,
  status: "In Progress"
}

Generate enough data so charts and filters feel real.

---

# 25. INTERACTION REQUIREMENTS

The frontend must feel like a working application.

Implement:

- Sidebar navigation
- Search
- Dropdown filters
- Apply button
- Chart hover states
- Chart click filtering
- Table sorting
- Table pagination
- Work detail navigation
- Alert navigation
- Map interactions
- Risk badges
- Detector detail views
- Expandable evidence cards
- Modal/drawer for work details
- Responsive layout
- Hover states
- Loading states
- Empty states

Do not leave buttons as purely decorative elements when a reasonable interaction can be implemented.

---

# 26. DASHBOARD RESPONSIVENESS

Desktop:
- 1440px+ should look like the primary design
- Sidebar fixed at approximately 240px
- Main dashboard fills remaining width

Laptop:
- 1024–1366px
- Cards should reflow naturally
- Charts remain readable

Tablet:
- Collapse sidebar into icon/expandable navigation

Mobile:
- Sidebar becomes a drawer
- KPI cards become 2-column or 1-column
- Tables become horizontally scrollable or transform into cards
- Map remains usable
- Charts resize

---

# 27. IMPORTANT DESIGN DETAIL

The application should communicate:

"AI identifies anomalies; humans investigate them."

Never present the anomaly score as proof of fraud.

Use language such as:

- Anomaly detected
- Requires review
- Potential duplicate
- Possible payment structuring
- Cost significantly above expected
- Location mismatch
- Possible vendor relationship

Avoid automatically saying:

- Fraud confirmed
- Corrupt officer
- Fraudster
- Guilty

unless explicitly referring to a confirmed external finding.

---

# 28. TECHNICAL REQUIREMENTS

Preferred stack:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons
- Recharts for charts
- Leaflet or another suitable map library
- React Router for navigation

If the environment already has an established stack, use the existing stack instead of replacing it.

Keep components modular.

Suggested structure:

src/
  components/
    Sidebar
    Topbar
    KpiCard
    RiskBadge
    RiskChart
    CategoryChart
    IndiaRiskMap
    InvestigationTable
    AlertList
    DetectorCard
  pages/
    Dashboard
    Works
    WorkInvestigation
    MapView
    Investigations
    CostAnalysis
    PaymentAnalysis
    DuplicateWorks
    ImageForensics
    VendorNetwork
    Compliance
    Reports
    Settings
  data/
    mockWorks
    mockAlerts
  utils/
    riskCalculations
    filters

---

# 29. VISUAL PRIORITY

The dashboard's hierarchy should be:

1. Critical/high-risk works
2. Overall risk situation
3. Geographic concentration
4. Reasons for anomalies
5. Detailed detector evidence
6. Supporting analytics

The user should be able to answer these questions within seconds:

"What is risky?"
"Where is it happening?"
"Which work should I investigate first?"
"Why is it suspicious?"
"What evidence supports the alert?"

---

# 30. EXACT DASHBOARD LAYOUT

On the primary Dashboard page use this layout:

SIDEBAR
│
├── MPLADS branding
├── Dashboard
├── Works
├── Map View
├── Investigations
├── Cost Analysis
├── Payment Analysis
├── Duplicate Works
├── Image Forensics
├── Vendor Network
├── Compliance
├── Reports
└── Settings

MAIN AREA
│
├── Top search/header
│
├── Dashboard title + filters
│
├── 6 KPI cards
│
├── Risk Distribution
│
├── Works by Category
│
├── Geographic Risk Map
│
├── Priority Investigations
│
├── Recent Alerts
│
└── Quick Actions

Keep the first screen visually close to a professional enterprise analytics dashboard and ensure the most important information is visible without excessive scrolling on a 1440×900 desktop viewport.

Do not add unnecessary widgets that are not related to MPLADS fraud/anomaly detection.

The final result should look like a polished **MPLADS AI-powered investigation command center**, not a generic admin dashboard.