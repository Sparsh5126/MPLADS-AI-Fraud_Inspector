Create a production-quality, responsive web dashboard that EXACTLY reproduces the provided reference design.

IMPORTANT:
This prompt is ONLY for the MP / MP View dashboard of the MPLADS Monitoring Portal.

Do NOT create:
- MoSPI dashboard
- State Nodal Authority dashboard
- District Authority dashboard

The logged-in user is an MP.

Demo MP:
Shri Rajendra Agrawal

Constituency:
Meerut

State:
Uttar Pradesh

The dashboard must be constituency-focused.

==================================================
1. CORE REQUIREMENTS FROM THE PROJECT NOTE
==================================================

The MP dashboard must prioritize these MP-level requirements:

1. Constituency
2. Funds Utilised
3. Recommended Works Status
4. Needs Attention
5. Classification of Works

IMPORTANT:
"Classification" means CLASSIFICATION BY RISK LEVEL.

It must NOT mean classification by project category.

Risk levels are:

- Critical
- High
- Medium
- Low

The dashboard should make these risk classifications immediately understandable.

The MP dashboard should also provide:

- Total sanctioned works
- Works in progress
- Completed works
- Total MPLADS fund
- Funds utilised
- Constituency-wise work distribution
- Work status
- Recent works
- Recommended works
- Alerts & attention
- Quick actions

==================================================
2. OVERALL DESIGN
==================================================

Reproduce the provided reference image closely.

Visual style:

- Modern government dashboard
- Clean enterprise analytics UI
- Dark navy sidebar
- White/light-gray main workspace
- Blue primary accent
- Subtle green/red/orange/yellow status colors
- Thin borders
- Soft shadows
- Rounded cards
- Professional typography
- Dense but readable
- No unnecessary decoration

The application should look like a real Indian government monitoring system.

Avoid:
- generic admin dashboard appearance
- excessive gradients
- glassmorphism
- neon colors
- excessive animations
- oversized cards
- unnecessary charts

==================================================
3. PRIMARY VIEWPORT
==================================================

Design primarily for:

1440 × 900

Sidebar:

approximately 260px wide.

Main content occupies the remaining width.

The dashboard should fit comfortably within the viewport while still allowing a small amount of scrolling if necessary.

==================================================
4. SIDEBAR
==================================================

Create a dark navy sidebar.

At the top:

Government emblem-style icon

MoSPI

Ministry of Statistics &
Programme Implementation

MPLADS Monitoring Portal

Below:

Do NOT create a separate "My MPLADS Profile" card.

The MP's identity can appear in the top header.

==================================================
5. SIDEBAR NAVIGATION
==================================================

Navigation items:

Dashboard
My MPLADS Works
Constituency Overview
Districts
Implementing Agencies
Payments
Recommended Works
Classification
Anomaly Analysis
Reports
Settings

Use Lucide-style icons.

Dashboard is active.

Active item:
- blue background
- white icon
- white text
- thin bright blue indicator on left

Inactive items:
- muted white/light-blue text
- subtle hover background

IMPORTANT:

Classification is a navigation item because the MP can view risk classification.

The Classification page should contain:

Critical
High
Medium
Low

It should NOT classify works by categories such as Education, Health, etc.

==================================================
6. SIDEBAR FOOTER
==================================================

At the bottom display a subtle Parliament/government-building illustration.

Text:

People's Development
Transparent Governance
Stronger India

At the bottom:

thin Indian tricolor line.

Keep this subtle.

==================================================
7. TOP HEADER
==================================================

White horizontal header.

LEFT:

Search box.

Placeholder:

Search work ID, village, district, IA, keyword...

Do NOT include another MP-specific search option.

RIGHT:

Notification bell

Red badge:

3

Then:

Circular avatar:

MP

Then:

Shri Rajendra Agrawal

Member of Parliament

Meerut, Uttar Pradesh

Dropdown chevron.

Then vertical divider.

Then:

Logout

with logout icon.

==================================================
8. PAGE HEADER
==================================================

Large heading:

Welcome, Shri Rajendra Agrawal

Subtitle:

Track the progress of MPLADS works in your constituency and ensure greater impact

On the right:

Calendar icon

Last updated

24 Jun 2025, 10:30 AM

Chevron.

==================================================
9. KPI ROW
==================================================

Create exactly FIVE KPI cards.

Order:

1. Total Sanctioned Works
2. Works in Progress
3. Completed Works
4. Total MPLADS Fund
5. Funds Utilised

==================================================
10. KPI — TOTAL SANCTIONED WORKS
==================================================

Title:

Total Sanctioned Works

Value:

1,248

Trend:

↑ 12% from last year

Icon:

document/file

Use light blue styling.

==================================================
11. KPI — WORKS IN PROGRESS
==================================================

Title:

Works in Progress

Value:

512

Trend:

↑ 8% from last year

Icon:

clock/progress

Use light red/pink styling.

==================================================
12. KPI — COMPLETED WORKS
==================================================

Title:

Completed Works

Value:

612

Trend:

↑ 18% from last year

Icon:

check-circle

Use light green styling.

==================================================
13. KPI — TOTAL MPLADS FUND
==================================================

Title:

Total MPLADS Fund

Value:

₹25.0 Cr

Supporting text:

(₹5 Cr per year)

Icon:

Indian Rupee

Use light green styling.

==================================================
14. KPI — FUNDS UTILISED
==================================================

Title:

Funds Utilised

Value:

₹18.4 Cr

Supporting text:

74% of sanctioned

Add a green progress bar:

74%

The progress bar should be clearly visible.

==================================================
15. MAIN ANALYTICS ROW
==================================================

Below the KPI row, create three columns:

LEFT:
Constituency-wise Work Distribution

CENTER:
Work Status

RIGHT:
Top 5 Districts by Number of Works

IMPORTANT:

Do NOT put an MP profile card here.

The MP identity is already displayed in the top header.

==================================================
16. CONSTITUENCY-WISE WORK DISTRIBUTION
==================================================

Title:

Constituency-wise Work Distribution

Add information icon.

Show a map of the Meerut constituency / constituent regions.

Use these areas:

Meerut
Sardhana
Daurala
Mawana
Kithor
Hastinapur

Display work counts:

Meerut:
312

Kithor:
250

Mawana:
210

Sardhana:
186

Hastinapur:
148

Daurala:
142

Use a heatmap-style color scale.

Legend:

Number of Works

> 250
151–250
101–150
< 100

Colors:

>250 = dark red
151–250 = orange
101–150 = light orange/yellow
<100 = pale yellow

Include:

+
−

zoom controls.

Hover should show:

Region
Number of works
Percentage of constituency works

Clicking a region should open the relevant detailed constituency/district view.

==================================================
17. WORK STATUS
==================================================

Title:

Work Status
(All Works)

Add information icon.

Create a donut chart.

Center:

1,248

Works

Segments:

Completed
612 (49.0%)

In Progress
512 (41.0%)

Not Started
76 (6.1%)

Delayed
48 (3.9%)

Colors:

Completed = green
In Progress = blue
Not Started = yellow
Delayed = red

Show legend on the right.

Hover should display exact values.

==================================================
18. TOP 5 DISTRICTS
==================================================

Title:

Top 5 Districts by Number of Works

Add information icon.

Top right:

View All →

Create a compact table.

Columns:

#
District
Total Works

Data:

1
Meerut
312

2
Kithor
250

3
Mawana
210

4
Sardhana
186

5
Hastinapur
148

This section is a simple geographic overview.

Do not add unnecessary risk calculations here.

==================================================
19. SECOND CONTENT ROW
==================================================

Below the main analytics row, create three sections:

LEFT:
Recommended Works

CENTER:
Classification of Works (Risk Level)

RIGHT:
Alerts & Attention

==================================================
20. RECOMMENDED WORKS
==================================================

Title:

Recommended Works

Add information icon.

Top right:

View All →

Create a table.

Columns:

#
Title
Proposed Location
Estimated Cost
Status
Action

Example:

1
Community health center
Mawana
₹48.5 L
Under Review
View

2
Library building
Sardhana
₹32.0 L
Pending
View

3
Rural road (Phase 2)
Daurala
₹28.7 L
Pending
View

4
Drinking water facility
Hastinapur
₹21.4 L
Approved
View

5
Anganwadi center
Kithor
₹19.6 L
Under Review
View

Status badges:

Under Review = blue
Pending = yellow
Approved = green

Action:

View

This section represents recommended works and their approval status.

Do NOT attach an MP profile to this section.

==================================================
21. CLASSIFICATION OF WORKS — RISK LEVEL
==================================================

This section is extremely important.

Title:

Classification of Works
(Risk Level)

Add information icon.

Top right:

View Details →

Create a DONUT CHART.

The chart must classify works ONLY according to risk.

Risk categories:

Critical
High
Medium
Low

Use realistic sample values:

Critical:
150 (12%)

High:
349 (28%)

Medium:
449 (36%)

Low:
300 (24%)

Total:

1,248 Works

Center of donut:

1,248
Works

Legend:

Critical
12% (150)

High
28% (349)

Medium
36% (449)

Low
24% (300)

Colors:

Critical = red
High = orange
Medium = yellow
Low = green

IMPORTANT:

DO NOT use:

Education
Health
Rural Development
Drinking Water
Sanitation
Other

Those are NOT the classification required here.

Classification means:

RISK LEVEL.

==================================================
22. ALERTS & ATTENTION
==================================================

Title:

Alerts & Attention

Top right:

View All →

Create a vertical list of important issues.

Use:

18 works delayed beyond 6 months

32 works with low progress (< 25%)

5 works pending completion certificate

3 implementing agencies with high delay rate

12 works without recent progress update

Each alert should have:

- icon
- short message
- appropriate risk color

Use:

red = serious delay
orange = warning
yellow = attention
purple/blue = information

Clicking an alert should open the relevant detailed page.

==================================================
23. QUICK ACTIONS
==================================================

Bottom section:

Quick Actions

Create four cards.

CARD 1:

View My Works

Search and manage your
MPLADS works

Arrow →

Icon:
document

CARD 2:

Analyze Anomalies

Identify and investigate
potential irregularities

Arrow →

Icon:
search

CARD 3:

Track Fund Utilization

Monitor expenditure and
fund-wise progress

Arrow →

Icon:
bar chart

CARD 4:

Generate Report

Create constituency reports
(PDF / Excel)

Arrow →

Icon:
document/report

==================================================
24. IMPORTANT MP-SPECIFIC BEHAVIOR
==================================================

This dashboard is only for the logged-in MP.

The MP should only see information related to their constituency.

For this demo:

MP:
Shri Rajendra Agrawal

Constituency:
Meerut

State:
Uttar Pradesh

The MP must NOT be able to see:

- other MPs
- other constituencies outside their permitted view
- national-level analytics
- state-level administrative controls
- district-authority controls
- MoSPI controls

The MP can view their own constituency's works and statistics.

==================================================
25. DASHBOARD INFORMATION HIERARCHY
==================================================

The dashboard should answer:

1. How many works are sanctioned?
2. How many are in progress?
3. How many are completed?
4. How much MPLADS funding is available?
5. How much has been utilised?
6. Where are the works concentrated?
7. What is the current work status?
8. What works are recommended?
9. What is the risk classification?
10. What needs my attention?

Detailed anomaly calculations should NOT be displayed here.

==================================================
26. DO NOT PUT DETAILED ANALYTICS ON THE DASHBOARD
==================================================

Do NOT display:

- MAD
- Z-score
- Random Forest output
- ML residual
- payment structuring calculations
- image GPS metadata
- image similarity scores
- vendor graph
- duplicate similarity calculations
- detailed anomaly formulas
- raw model outputs

Those belong inside the dedicated:

Anomaly Analysis

page.

The dashboard only needs to show that something requires attention.

==================================================
27. SEARCH
==================================================

Search should support:

Work ID
Village
District
Implementing Agency
Keyword

Example:

W1042

Search result should show:

Work ID
Title
Location
Status
Risk Level

==================================================
28. RESPONSIVE DESIGN
==================================================

Primary viewport:

1440 × 900.

Desktop:

Sidebar:
260px

KPI:
5 columns

Main analytics:
3 columns

Second row:
3 columns

Quick actions:
4 columns

On smaller screens:

Sidebar becomes a drawer.

KPI cards:
2 columns

Main analytics:
stack vertically

Tables:
horizontal scrolling or responsive cards

Quick actions:
2 columns / 1 column

==================================================
29. INTERACTIONS
==================================================

Implement realistic interactions.

Sidebar:
navigation works.

Search:
functional mock search.

Notifications:
open notification panel.

Work map:
hover and click.

Work status donut:
interactive hover.

Risk classification donut:
interactive hover/click.

Recommended works:
View button opens work details.

Alerts:
click opens relevant detail.

Quick actions:
navigate to appropriate pages.

"View All":
navigate to detailed page.

==================================================
30. VISUAL CONSISTENCY
==================================================

Use:

Inter / Geist / Manrope

Cards:

white

Border:

#E2E8F0

Radius:

8–12px

Shadow:

very subtle

Primary:

#2563EB

Sidebar:

#0D233D

Background:

#F7F9FC

Text:

#0F172A

Secondary text:

#64748B

==================================================
31. EXACT PAGE STRUCTURE
==================================================

SIDEBAR
│
├── MoSPI
├── MPLADS Monitoring Portal
│
├── Dashboard
├── My MPLADS Works
├── Constituency Overview
├── Districts
├── Implementing Agencies
├── Payments
├── Recommended Works
├── Classification
├── Anomaly Analysis
├── Reports
└── Settings
│
└── People's Development
    Transparent Governance
    Stronger India


MAIN
│
├── TOP HEADER
│   ├── Search
│   ├── Notifications
│   ├── MP identity
│   └── Logout
│
├── PAGE HEADER
│   ├── Welcome, Shri Rajendra Agrawal
│   ├── Subtitle
│   └── Last updated
│
├── KPI ROW
│   ├── Total Sanctioned Works
│   ├── Works in Progress
│   ├── Completed Works
│   ├── Total MPLADS Fund
│   └── Funds Utilised
│
├── MAIN ANALYTICS
│   ├── Constituency-wise Work Distribution
│   ├── Work Status
│   └── Top 5 Districts
│
├── SECONDARY ANALYTICS
│   ├── Recommended Works
│   ├── Classification of Works (Risk Level)
│   └── Alerts & Attention
│
└── QUICK ACTIONS
    ├── View My Works
    ├── Analyze Anomalies
    ├── Track Fund Utilization
    └── Generate Report


==================================================
32. CRITICAL CORRECTIONS
==================================================

Make sure the following are correct:

1. There is NO "My MP Profile" section.

2. There is NO MP profile card in the dashboard body.

3. The MP identity is only shown in the top header.

4. "Classification of Works" means:
   Critical / High / Medium / Low risk.

5. Do NOT classify works by:
   Education / Health / Rural Development / etc.

6. Recommended Works is present.

7. Recommended Works shows:
   proposed location,
   estimated cost,
   status,
   and action.

8. Alerts & Attention is present.

9. Constituency-wise Work Distribution is present.

10. Work Status is present.

11. Top 5 districts is present.

12. Funds Utilised is present.

13. Total MPLADS Fund is present.

14. No state-level or district-authority controls appear.

==================================================
33. FINAL QUALITY BAR
==================================================

The final dashboard should look almost identical in structure and visual language to the supplied reference image.

It should feel like:

A real MP-facing MPLADS monitoring portal.

The most important concepts should be immediately visible:

CONSTITUENCY
+
FUNDS
+
WORK STATUS
+
RECOMMENDED WORKS
+
RISK CLASSIFICATION
+
ATTENTION REQUIRED

Keep the dashboard clean.

Do not add unrelated analytics.

Do not add an MP profile card.

Do not change the meaning of Classification.

Classification = Risk Level:
Critical / High / Medium / Low.