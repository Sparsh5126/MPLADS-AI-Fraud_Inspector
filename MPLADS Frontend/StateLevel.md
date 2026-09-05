Create ONLY the frontend dashboard for the:

STATE NODAL AUTHORITY
MPLADS Monitoring Portal

Do NOT create the MoSPI dashboard, District Authority dashboard, or MP dashboard.

This is one specific dashboard that will later be part of a larger role-based application. For now, focus entirely on making this State Nodal Authority dashboard polished, realistic, and production-quality.

The dashboard is for a State Nodal Authority responsible for monitoring MPLADS implementation across the entire state.

Use Uttar Pradesh as the demo state.

==================================================
1. CORE PURPOSE
==================================================

The State Nodal Authority dashboard should provide a high-level overview of the state's MPLADS implementation.

It should help the officer quickly answer:

1. How are MPLADS works performing across the state?
2. How many works require attention?
3. Which districts have higher risk?
4. What are the latest important alerts?
5. Where should I go next for detailed analysis?

IMPORTANT:

Do NOT put every available feature directly on the dashboard.

The dashboard should be an overview/command center.

Detailed information should be accessible through navigation pages such as:
- Works & Projects
- Districts
- Anomaly Analysis
- Compare Districts
- IAS Performance
- Budget & Utilization
- Reports

The dashboard itself should remain clean and easy to understand.

==================================================
2. VISUAL REFERENCE
==================================================

Use the provided reference image as the primary visual direction.

The final dashboard should closely resemble the reference in:

- overall layout
- spacing
- card structure
- sidebar
- typography
- colors
- map placement
- KPI layout
- table layout
- visual hierarchy

The design should look like a real government monitoring platform rather than a generic SaaS admin template.

==================================================
3. OVERALL VISUAL STYLE
==================================================

Style:

Modern
Professional
Minimal
Government/enterprise
Data-driven
Trustworthy
Clean

Main background:

#F7F9FC

Cards:

#FFFFFF

Sidebar:

Dark navy, approximately #0F1B2D

Primary accent:

Professional blue, approximately #2563EB

Text:

Dark navy / #0F172A

Secondary text:

#64748B

Borders:

#E2E8F0

Use subtle shadows only.

Cards should have approximately:

8–12px border radius.

Avoid:

- excessive gradients
- glassmorphism
- neon colors
- excessive animations
- excessive rounded/pill UI
- unnecessary decorative graphics
- overly dense information

==================================================
4. PAGE DIMENSIONS
==================================================

Design primarily for:

1440 × 900 desktop viewport.

The main dashboard should look balanced and usable at this size.

Use a fixed sidebar of approximately:

250px

The remaining area is the main dashboard.

The dashboard should not feel excessively long.

The most important information should be visible without requiring excessive scrolling.

==================================================
5. SIDEBAR
==================================================

Create a fixed dark navy sidebar.

Width:

approximately 250px.

At the top display:

Government emblem placeholder

MoSPI

Ministry of Statistics &
Programme Implementation

MPLADS Monitoring Portal

Use a small professional government-style emblem.

Do not use an inaccurate official logo if an actual asset is unavailable. A tasteful emblem placeholder is acceptable.

Below the branding, create a role indicator card:

STATE NODAL AUTHORITY

Uttar Pradesh

This should clearly communicate that the currently logged-in user is a State Nodal Authority for Uttar Pradesh.

==================================================
6. SIDEBAR NAVIGATION
==================================================

Navigation items:

Dashboard
Works & Projects
Districts
Anomaly Analysis
Compare Districts
IAS Performance
Budget & Utilization
Reports
Settings

Use Lucide icons or another consistent icon library.

Icons should be simple and professional.

Dashboard must be active.

Active Dashboard styling:

- slightly lighter navy/blue background
- blue vertical indicator on left
- white icon
- white text

Inactive items:

- muted light-blue/gray text
- subtle hover state

Navigation items should be clickable.

For this dashboard implementation, navigation can route to placeholder pages or use appropriate page stubs, but the Dashboard itself must be fully implemented.

==================================================
7. SIDEBAR BOTTOM
==================================================

At the bottom of the sidebar add a subtle government-themed visual.

Text:

Transparent Governance
Stronger India

Add a very subtle Indian tricolor line.

Do not make this visually dominant.

==================================================
8. TOP HEADER
==================================================

To the right of the sidebar, create a top horizontal header.

Height approximately:

64px.

Use a white background.

Bottom border:

#E2E8F0

LEFT SIDE:

Large search box.

Placeholder:

Search work ID, district, MP, constituency...

Search icon on the left.

The search box should be approximately:

400–500px wide.

It should have:
- subtle border
- rounded corners
- clean focus state

RIGHT SIDE:

Notification bell.

Show a small red badge:

3

Then a vertical divider.

Then user profile:

Circular avatar:

SN

Text:

State Nodal Authority
Uttar Pradesh

Dropdown chevron.

Then another divider.

Logout icon +:

Logout

==================================================
9. MAIN CONTENT
==================================================

Main content should have approximately:

24px–28px padding.

At the top create:

Welcome, Uttar Pradesh

Large bold heading.

Below:

Monitor MPLADS implementation and address potential anomalies

Use muted text.

On the right side of this header:

Calendar icon

Last updated

24 Jun 2025, 10:30 AM

Add a small dropdown/chevron if appropriate.

==================================================
10. KPI SECTION
==================================================

Create exactly FOUR primary KPI cards.

Do not create six or eight cards.

The dashboard should remain uncluttered.

Cards:

--------------------------------------------

CARD 1

Total Works

12,842

↑ 8% from last year

Icon:
document/work icon

--------------------------------------------

CARD 2

High Risk Works

487

↑ 22% from last year

Icon:
warning/alert icon

The increase should be visually shown as a concerning red trend.

--------------------------------------------

CARD 3

Total Sanctioned Amount

₹3,246 Cr

↑ 11% from last year

Icon:
₹ / currency icon

--------------------------------------------

CARD 4

Completed Works

7,892

↑ 14% from last year

Icon:
check-circle icon

--------------------------------------------

Card design:

White background.

Thin light border.

Rounded corners.

Subtle shadow.

Each card should contain:

small icon container
label
large number
trend
comparison text

The number should be the strongest visual element.

Use appropriate colors:

Total Works:
blue

High Risk:
red

Sanctioned Amount:
amber/yellow

Completed:
green

==================================================
11. RISK DISTRIBUTION CARD
==================================================

Below the KPI cards, create a two-column layout.

LEFT:

Risk Distribution

Use a donut chart.

Center of donut:

12,842

Works

Segments:

Critical:
6

High:
481

Medium:
1,924

Low:
10,431

Calculate percentages dynamically.

Display legend next to the donut:

Critical
6 (0.5%)

High
481 (3.7%)

Medium
1,924 (15.0%)

Low
10,431 (81.2%)

Use:

Critical = red
High = orange
Medium = yellow
Low = green

At the top right of this card add:

All Districts ▼

This is a filter.

The donut should be interactive.

Hover:
show count + percentage.

Click:
filter the dashboard by that risk level.

==================================================
12. DISTRICT-WISE OVERVIEW CARD
==================================================

To the right of Risk Distribution, create a larger card:

District-wise Overview

This is the primary geographic overview.

The card should contain:

LEFT:

Uttar Pradesh district map.

Show the state divided into districts.

Use a proper SVG/map visualization if possible.

Color districts based on risk:

Critical = red
High = orange
Medium = yellow
Low = green

The map should have subtle district boundaries.

Do NOT make the map overly large.

It should fit naturally inside the card.

Include a small legend:

Critical
High
Medium
Low

RIGHT:

Top 5 Districts by Risk

Create a compact table.

Columns:

#
District
High Risk
Critical
Total Works

Data:

1
Meerut
28
9
342

2
Baghpat
21
6
281

3
Ghaziabad
18
5
276

4
Lucknow
17
4
412

5
Saharanpur
16
4
265

At the top right:

View All Districts →

This should be clickable.

==================================================
13. MAP INTERACTION
==================================================

The Uttar Pradesh map should be interactive.

When hovering over a district:

show tooltip:

District: Meerut
Total Works: 342
High Risk: 28
Critical: 9

When clicking a district:

open/navigate to the district detail page.

For this demo, it is acceptable to route to a placeholder District page.

The map should visually respond to hover.

Do not require the user to understand the map to use the dashboard.

==================================================
14. RECENT ALERTS
==================================================

Below the Risk Distribution + District Overview section, create one full-width card.

Title:

Recent Alerts

Right side:

View All Alerts →

The table should show only the five most important recent alerts.

Columns:

#
Date & Time
Work ID
District
Issue
Risk Level
Status
Action

Use these example records:

1
24 Jun 2025, 08:12
W1042
Meerut
Unusual increase in cost
Critical
Open
View

2
23 Jun 2025, 16:45
W0871
Saharanpur
Image location mismatch
High
Reviewing
View

3
23 Jun 2025, 11:20
W0931
Ghaziabad
Possible duplicate work
High
Open
View

4
22 Jun 2025, 14:05
W0678
Lucknow
High expenditure, low progress
Medium
Pending
View

5
22 Jun 2025, 09:30
W0551
Varanasi
Delay in work completion
Medium
Open
View

==================================================
15. RISK BADGES
==================================================

Use compact badges.

Critical:
red

High:
orange

Medium:
yellow

Low:
green

Do not make the badges enormous.

They should be small and easy to scan.

==================================================
16. ALERT STATUS
==================================================

Statuses:

Open
Reviewing
Pending
Resolved

Use subtle text colors rather than very large colored boxes.

==================================================
17. ALERT ACTION
==================================================

Each row should contain:

View

as a small outlined blue button.

Clicking View should open the corresponding work investigation/details view.

The detailed investigation should NOT be displayed inside the dashboard.

The dashboard should only identify the alert.

==================================================
18. QUICK ACTION SECTION
==================================================

At the bottom create exactly FOUR compact action cards.

CARD 1:

View All Works

Search and explore MPLADS works

→

CARD 2:

Analyze Anomalies

Detailed anomaly analysis and trends

→

CARD 3:

Budget & Utilization

Fund allocation and expenditure

→

CARD 4:

IAS Performance

Monitor district performance

→

Each should be clickable.

Use a simple icon on the left.

Keep these cards compact.

==================================================
19. WHAT MUST NOT BE ON THIS DASHBOARD
==================================================

This is extremely important.

DO NOT put detailed analytics directly on the dashboard.

Do NOT display:

- MAD calculations
- Z-score calculations
- ML residuals
- Random Forest details
- detailed cost anomaly calculations
- payment threshold analysis
- Benford analysis
- image metadata
- image similarity calculations
- duplicate-work comparison details
- vendor network graphs
- detailed budget forecasts
- detailed historical statistical comparisons
- blacklist tables
- individual IA performance cards
- detailed work timelines
- complete work lists
- detailed compliance rules

Those belong in dedicated pages.

The dashboard should only provide a high-level summary and entry points into those features.

==================================================
20. DASHBOARD INFORMATION HIERARCHY
==================================================

The visual hierarchy must be:

1. Current state overview
2. High-risk situation
3. Geographic distribution
4. Recent alerts
5. Navigation to detailed analysis

The officer should understand the current situation within approximately 5–10 seconds.

==================================================
21. MOCK DATA
==================================================

Use realistic MPLADS data.

Do not use lorem ipsum.

Primary state:

Uttar Pradesh

Example districts:

Meerut
Baghpat
Ghaziabad
Lucknow
Saharanpur
Varanasi
Kanpur Nagar
Prayagraj
Agra
Gorakhpur

Create enough mock data behind the dashboard so filters and interactions feel realistic.

At minimum create mock records for:
- works
- districts
- risk levels
- alerts

==================================================
22. FILTERING
==================================================

The dashboard should have functional filtering.

The primary filter visible on the dashboard is:

All Districts ▼

When selecting a district:
- KPI values should update
- Risk Distribution should update
- District overview should update where appropriate
- Recent alerts should filter

Do not add a huge filter panel.

Additional filters should be available inside detailed pages rather than cluttering the dashboard.

==================================================
23. RESPONSIVENESS
==================================================

Desktop is the primary target.

At approximately 1440×900:

Sidebar:
250px

Main:
remaining width

KPI cards:
4 columns

Second section:
2 columns

Alerts:
full width

Quick actions:
4 columns

For smaller screens:

Sidebar collapses into a drawer.

KPI cards become:
2 columns.

Risk Distribution and District Overview:
stack vertically.

Alert table:
horizontal scrolling or responsive card layout.

Quick actions:
2 columns or 1 column.

==================================================
24. ANIMATIONS
==================================================

Use subtle animations only.

Examples:

- KPI numbers can animate slightly on page load
- Cards can have a very subtle hover elevation
- Map districts can highlight on hover
- Charts can animate when rendered
- Navigation can have a subtle active transition

Do NOT use:
- excessive bouncing
- flashy transitions
- page-wide animation
- unnecessary loading animations

==================================================
25. ICONS
==================================================

Use Lucide React icons or an equivalent professional icon set.

Suggested:

Dashboard:
Home

Works:
FileText

Districts:
MapPin

Anomaly Analysis:
BarChart3 / AlertTriangle

Compare Districts:
GitCompare

IAS Performance:
Users / UserCheck

Budget:
IndianRupee

Reports:
FileBarChart

Settings:
Settings

Notifications:
Bell

Search:
Search

Logout:
LogOut

==================================================
26. CHART LIBRARY
==================================================

Use Recharts or an equivalent chart library.

Risk Distribution:

Donut/Pie chart.

The chart should have:
- clean tooltips
- no unnecessary grid
- responsive sizing
- clear legend

==================================================
27. MAP
==================================================

Prefer a proper Uttar Pradesh district SVG/geographic map.

If a geographic library is available, use it.

If an accurate district map is unavailable, use a clean stylized SVG representation rather than an inaccurate generic India map.

The map must represent Uttar Pradesh specifically.

District boundaries should be visible.

==================================================
28. COMPONENT STRUCTURE
==================================================

Keep the code modular.

Suggested components:

StateDashboard
Sidebar
TopHeader
KpiCard
RiskDistribution
DistrictOverview
UPDistrictMap
TopDistrictTable
RecentAlerts
QuickActionCard
RiskBadge
FilterDropdown

Suggested data:

stateDashboardData
districtData
riskDistributionData
alertData

==================================================
29. ACCESSIBILITY
==================================================

Use:

- proper semantic HTML
- accessible buttons
- keyboard navigation
- aria labels where necessary
- sufficient contrast
- visible focus states

Charts should have text-based labels/data where practical.

==================================================
30. IMPORTANT UX RULE
==================================================

The dashboard is NOT supposed to answer every question.

It should act as the State Nodal Authority's command center.

For example:

Dashboard says:

"487 High Risk Works"

Then the user clicks:

Anomaly Analysis

to understand WHY.

Dashboard says:

"Meerut has 28 high-risk works"

Then the user clicks:

Meerut

to inspect the district.

Dashboard says:

"Unusual increase in cost — W1042"

Then the user clicks:

View

to investigate W1042.

This separation between overview and detailed investigation is intentional.

==================================================
31. FINAL DASHBOARD LAYOUT
==================================================

The final page should visually follow this structure:

SIDEBAR
│
├── MoSPI branding
├── State Nodal Authority
│   Uttar Pradesh
│
├── Dashboard
├── Works & Projects
├── Districts
├── Anomaly Analysis
├── Compare Districts
├── IAS Performance
├── Budget & Utilization
├── Reports
└── Settings
│
└── Transparent Governance
    Stronger India


MAIN CONTENT
│
├── TOP HEADER
│   ├── Search
│   ├── Notifications
│   ├── State Nodal Authority
│   └── Logout
│
├── PAGE HEADER
│   ├── Welcome, Uttar Pradesh
│   ├── Subtitle
│   └── Last Updated
│
├── KPI ROW
│   ├── Total Works
│   ├── High Risk Works
│   ├── Total Sanctioned Amount
│   └── Completed Works
│
├── ANALYTICS ROW
│   ├── Risk Distribution
│   │
│   └── District-wise Overview
│       ├── UP District Map
│       └── Top 5 Districts
│
├── RECENT ALERTS
│   └── 5 important alerts
│
└── QUICK ACTIONS
    ├── View All Works
    ├── Analyze Anomalies
    ├── Budget & Utilization
    └── IAS Performance


==================================================
32. FINAL QUALITY BAR
==================================================

The result should look like a polished government technology product that could realistically be shown in an SIH presentation/demo.

It should NOT look like:

- a student CRUD project
- a generic Bootstrap dashboard
- an overly complex analytics screen
- a cryptocurrency dashboard
- a banking dashboard

It should look like:

A professional MPLADS State Monitoring Command Center.

Prioritize:
- clarity
- hierarchy
- credibility
- useful information
- clean spacing
- professional government aesthetic

Most importantly:

KEEP THE DASHBOARD SIMPLE.

Show the important information here.

Put detailed investigation and analysis on separate pages.