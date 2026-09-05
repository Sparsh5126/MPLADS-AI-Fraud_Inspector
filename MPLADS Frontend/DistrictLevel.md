Create a pixel-accurate, production-quality frontend dashboard based on the provided reference image.

IMPORTANT:
This prompt is ONLY for the DISTRICT AUTHORITY dashboard.

Do not create the MoSPI dashboard.
Do not create the State Nodal Authority dashboard.
Do not create the MP dashboard.

The logged-in user is:

DISTRICT AUTHORITY
District: Meerut
State: Uttar Pradesh

The dashboard should be a high-level district monitoring command center. Detailed analytics should be accessible through separate pages.

==================================================
1. CORE REQUIREMENTS FROM THE PROJECT NOTE
==================================================

The District Authority dashboard MUST prioritize these four requirements:

1. Sanctioned Due
2. Workload Heatmap
3. Delay Heatmap
4. Preliminary Risk Score / Pre-score

These are the core district-level requirements.

The dashboard should also include the useful operational information shown in the reference:

- Total works
- Funds utilised
- Works status
- Needs attention
- Recommended works pending approval
- Upcoming sanctioned-due works
- Key insights
- Quick actions

IMPORTANT:

Do NOT add an MP View.

There must be NO:
- MP View card
- MP profile
- MP photograph
- MP-specific statistics
- MP navigation item

The District Authority can see information related to recommended works, but should not have an MP-specific dashboard/view.

==================================================
2. REFERENCE IMAGE
==================================================

Use the uploaded reference image as the exact visual reference.

The final dashboard should closely reproduce:

- overall composition
- sidebar width
- header
- card arrangement
- typography
- spacing
- map placement
- colors
- chart styles
- table layout
- risk indicators
- quick actions

The dashboard should look like the same application/system as the reference.

Do not redesign it into a different style.

==================================================
3. USER ROLE
==================================================

Logged-in user:

District Authority

District:

Meerut

State:

Uttar Pradesh

Display this clearly in the interface.

The dashboard must only show information relevant to Meerut district.

==================================================
4. OVERALL LAYOUT
==================================================

Use this exact hierarchy:

LEFT SIDEBAR
+
TOP HEADER
+
MAIN DASHBOARD

Main dashboard order:

1. Page heading
2. KPI cards
3. Two heatmaps
4. Work status + upcoming sanctioned due + recommended works + key insights
5. Quick actions

Do not rearrange these major sections.

==================================================
5. SIDEBAR
==================================================

Create a dark navy sidebar approximately 260px wide.

Background:

#0D233D
or a very similar dark navy.

At the top:

Use a government emblem-style icon/placeholder.

Text:

MoSPI

Ministry of Statistics &
Programme Implementation

MPLADS Monitoring Portal

Below this, create a role card:

DISTRICT AUTHORITY

Meerut, Uttar Pradesh

The role card should have a government/building icon.

==================================================
6. SIDEBAR NAVIGATION
==================================================

Navigation must contain:

Dashboard
Works & Projects
Implementing Agencies
Payments
Anomaly Analysis
Work Progress
Reports
Settings

IMPORTANT:

DO NOT include:

MP View

There should be absolutely no MP View option anywhere in the District Authority interface.

Use Lucide-style icons.

Suggested icons:

Dashboard:
Home

Works & Projects:
FileText

Implementing Agencies:
Users

Payments:
CreditCard

Anomaly Analysis:
BarChart3 / AlertTriangle

Work Progress:
Clock / Activity

Reports:
FileBarChart

Settings:
Settings

Dashboard is active.

Active styling:

- blue background
- subtle blue glow
- white icon
- white text
- thin bright-blue indicator on left

==================================================
7. SIDEBAR FOOTER
==================================================

At the bottom of the sidebar show a subtle government/development illustration.

Text:

Data for Development
Transparent Governance
Stronger India

At the very bottom add a thin Indian tricolor line:

saffron
white
green

Keep it subtle.

==================================================
8. TOP HEADER
==================================================

Main content starts to the right of the sidebar.

Create a white top header approximately 64px high.

LEFT:

Search bar.

Placeholder:

Search work ID, village, IA, keyword...

Do NOT include MP in the search placeholder.

Search icon on left.

Search bar approximately 400–500px wide.

RIGHT:

Notification bell.

Red notification badge:

3

Then circular avatar:

DA

Then:

District Authority

Meerut, Uttar Pradesh

Then dropdown chevron.

Then vertical divider.

Then:

Logout

with logout icon.

==================================================
9. PAGE HEADER
==================================================

Display:

Welcome, Meerut

Large dark navy heading.

Below:

Monitor MPLADS works, track progress and address potential anomalies

On the right:

Calendar icon

Last updated

24 Jun 2025, 10:30 AM

Chevron/dropdown.

==================================================
10. KPI ROW
==================================================

Create FIVE KPI cards.

The five cards must be:

1. Total Works
2. Sanctioned Due
3. Preliminary Risk Score
4. Funds Utilised
5. Needs Attention

Use exactly this order.

==================================================
11. KPI CARD 1 — TOTAL WORKS
==================================================

Title:

Total Works

Value:

342

Supporting text:

↑ 6% from last year

Use a blue document/work icon.

Color treatment:
light blue background.

==================================================
12. KPI CARD 2 — SANCTIONED DUE
==================================================

Title:

Sanctioned Due

Value:

18

Supporting text:

Works not yet sanctioned

Use a red calendar icon.

This is an important district-level requirement.

The card should visually indicate attention is required.

Use a light red/pink background.

Do NOT call this "Pending Approval".

Use:

Sanctioned Due

as the primary label.

==================================================
13. KPI CARD 3 — PRELIMINARY RISK SCORE
==================================================

Title:

Preliminary Risk Score

Value:

0.62

Supporting text:

Moderate risk

Add a small information icon beside the score.

Use a purple/lavender visual treatment.

The score should be clearly visible.

This is the district-level PRE-SCORE.

Do not call it the final fraud score.

Use terminology:

Preliminary Risk Score

==================================================
14. KPI CARD 4 — FUNDS UTILISED
==================================================

Title:

Funds Utilised

Value:

₹68.3 Cr

Supporting text:

72% of sanctioned

Include a horizontal progress bar.

Progress:

72%

Use green.

Use a rupee icon.

==================================================
15. KPI CARD 5 — NEEDS ATTENTION
==================================================

Title:

Needs Attention

Value:

42

Supporting text:

Works require review

Use an orange warning icon.

Use a light amber/orange background.

==================================================
16. HEATMAP SECTION
==================================================

This is one of the MOST IMPORTANT sections.

There must be TWO heatmaps side-by-side:

LEFT:
Works Load Heatmap

RIGHT:
Delay Heatmap

Do NOT replace either one.

Do NOT combine them.

Both must be visible on the dashboard.

==================================================
17. WORKS LOAD HEATMAP
==================================================

Title:

Works Load Heatmap

Add small information icon.

Show a geographic map of Meerut district divided into relevant sub-district/administrative areas.

Example labels:

Meerut (City)
Meerut (Rural)
Sardhana
Daurala
Mawana
Hastinapur
Kithor

Color the regions based on workload.

Legend:

Works Load

Very High
High
Medium
Low

Use:

Very High = dark red
High = red/orange
Medium = light orange
Low = pale yellow

Meerut City should be shown as an example high/very-high workload region.

Add map zoom controls:

+
−

Map should have subtle boundaries and labels.

Hover over a region should show:

Region:
Meerut (City)

Total Works:
128

Active Works:
...

High Risk:
...

Clicking a region can navigate to or open its detailed view.

==================================================
18. DELAY HEATMAP
==================================================

Immediately beside the workload heatmap create:

Delay Heatmap

Add information icon.

This must be a SECOND independent geographic visualization.

Use the same Meerut district geography so the user can visually compare:

Workload
vs
Delay

Color the regions based on percentage of delayed works.

Legend:

% Delayed Works

> 50%
25% – 50%
10% – 25%
< 10%

Use:

>50% = dark red
25–50% = orange/red
10–25% = yellow
<10% = green

Example:

Meerut City should have elevated delay.

Sardhana, Hastinapur, etc. can have lower delay percentages.

Hover tooltip:

District/Region:
Meerut City

Total Works:
128

Delayed:
18

Delay Rate:
14.1%

Click should open detailed work-progress analysis for that region.

IMPORTANT:

The workload heatmap and delay heatmap are separate metrics.

Workload Heatmap:
How many works are concentrated in an area.

Delay Heatmap:
How much delay is occurring in an area.

Do not calculate or display them as the same metric.

==================================================
19. WORK STATUS CARD
==================================================

Below the heatmaps, create a card:

Works Status

Use a donut chart.

Center:

342

Works

Segments:

Completed
214 (62.6%)

In Progress
78 (22.8%)

Not Started
32 (9.4%)

Delayed
18 (5.3%)

Colors:

Completed = green
In Progress = blue
Not Started = yellow
Delayed = red

On the right side show the legend with:

colored square
label
count
percentage

The chart should be interactive.

Hover should show exact values.

==================================================
20. UPCOMING SANCTIONED DUE
==================================================

Create a table card:

Upcoming Sanctioned Due

Top right:

View All →

Show five upcoming works.

Columns:

#
Work ID
Title
Village
Days Left

Example:

1
W1102
Community hall construction
Kharkhoda
3

2
W1120
Primary school building
Daurala
7

3
W1134
Drainage system
Sardhana
10

4
W1141
Street light installation
Mawana
12

5
W1150
Water supply scheme
Hastinapur
15

Days Left should use compact colored pills.

3 days:
red

7–10 days:
yellow/orange

10+ days:
light blue/purple

This section represents works approaching their sanction deadline / due status.

==================================================
21. RECOMMENDED WORKS
==================================================

Create a table card:

Recommended Works
(Pending Approval)

Top right:

View All →

Columns:

#
Work ID
Title
Estimated Cost

Example:

1
RW028
Anganwadi building
₹18.5 L

2
RW031
Rural road construction
₹24.0 L

3
RW037
Solar street lights
₹12.6 L

4
RW041
Drinking water facility
₹21.8 L

5
RW046
Community center
₹27.4 L

IMPORTANT:

This is about recommended works entering the district workflow.

Do NOT turn this into an MP View.

Do NOT show MP details.

Do NOT show an MP profile.

==================================================
22. KEY INSIGHTS
==================================================

Create a card:

Key Insights

Show four concise insights.

Insight 1:

Works load in Meerut (City)
is 2.3× higher than district average

Use upward-trend icon.

Insight 2:

18 works pending sanction
older than 60 days

Use clock icon.

Insight 3:

5 implementing agencies
with high delay rate

Use warning icon.

Insight 4:

Utilization lower than state average

72% vs 78%

Use people/analytics icon.

Each insight should have:

icon
short statement
appropriate visual color

Do not add long paragraphs.

==================================================
23. QUICK ACTIONS
==================================================

At the bottom create four cards.

Card 1:

View All Works

Search and manage MPLADS works
in Meerut

Arrow →

Icon:
document

Card 2:

Analyze Anomalies

Identify and investigate
potential irregularities

Arrow →

Icon:
search

Card 3:

Track Payments

Monitor fund disbursement
and payment status

Arrow →

Icon:
credit card

Card 4:

Generate Report

Create district-level reports
(PDF / Excel)

Arrow →

Icon:
bar chart

All four cards should be clickable.

==================================================
24. IMPORTANT: NO MP VIEW
==================================================

The following must NOT exist anywhere:

"MP View"

"MP View – Meerut"

MP profile

MP photograph

MP-specific funds

MP-specific recommended works section

MP-specific navigation

MP-specific dashboard

MP-specific quick action

MP-specific statistics

The District Authority dashboard is district-focused.

Recommended works can be shown because they are part of the district workflow, but do not attribute them to an MP in this dashboard.

==================================================
25. INFORMATION DENSITY
==================================================

The dashboard should NOT be excessively crowded.

The hierarchy should be:

TOP:
5 critical district KPIs

MIDDLE:
two geographic heatmaps

LOWER:
work status
sanctioned-due works
recommended works
key insights

BOTTOM:
quick actions

Do not add additional charts just to fill empty space.

==================================================
26. RESPONSIVENESS
==================================================

Primary target:

1440 × 900

Desktop layout:

Sidebar:
260px

Main:
remaining width

KPI:
5 columns

Heatmaps:
2 columns

Lower section:
3-column layout where appropriate

Quick actions:
4 columns

For laptop screens:
- preserve two heatmaps side-by-side if space allows
- otherwise stack them

For tablet/mobile:
- sidebar becomes drawer
- KPI cards become 2-column
- heatmaps stack vertically
- tables become horizontally scrollable
- quick actions become 2-column/1-column

==================================================
27. INTERACTION
==================================================

Implement realistic interactions.

Sidebar:
navigation works.

Search:
search mock works by:
- work ID
- village
- IA
- keyword

Notifications:
click opens notification panel.

District heatmaps:
hover tooltip
click region

Risk score:
information tooltip explaining that this is a preliminary/pre-score.

Works Status:
hover chart segments.

Tables:
click Work ID / View All.

Quick actions:
navigate to respective pages.

==================================================
28. MOCK DATA
==================================================

Use realistic data based on:

District:
Meerut

State:
Uttar Pradesh

Total Works:
342

Sanctioned Due:
18

Preliminary Risk Score:
0.62

Funds Utilised:
₹68.3 Cr

Utilization:
72%

Needs Attention:
42

Completed:
214

In Progress:
78

Not Started:
32

Delayed:
18

Use realistic villages/regions:

Meerut City
Meerut Rural
Sardhana
Daurala
Mawana
Hastinapur
Kithor
Kharkhoda

==================================================
29. TYPOGRAPHY
==================================================

Use:

Inter
or
Geist
or
Manrope

Heading:

dark navy

Body:

muted blue-gray

Numbers:

bold and prominent

Use consistent typography throughout.

==================================================
30. ICON STYLE
==================================================

Use Lucide icons.

Icons should be:
- simple
- thin/medium stroke
- consistent
- professional

Do not use random emoji.

==================================================
31. CARD DESIGN
==================================================

Cards:

white background

border:
#E2E8F0

radius:
8–12px

subtle shadow

padding:
16–20px

Section headers:
dark navy

Supporting text:
#64748B

Keep cards aligned to a consistent grid.

==================================================
32. FINAL EXACT STRUCTURE
==================================================

The final dashboard should look like:

┌───────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR │ SEARCH                                      🔔 DA  Logout       │
│          ├────────────────────────────────────────────────────────────────┤
│          │ Welcome, Meerut                         Last updated           │
│          │ Monitor MPLADS works...                                       │
│          │                                                               │
│          │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                │
│          │ │Total │ │Sanct.│ │Risk  │ │Funds │ │Need  │                │
│          │ │Works │ │Due   │ │Score │ │Used  │ │Attn. │                │
│          │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                │
│          │                                                               │
│          │ ┌──────────────────────┐ ┌──────────────────────┐             │
│          │ │ Works Load Heatmap   │ │ Delay Heatmap        │             │
│          │ │                      │ │                      │             │
│          │ │    MEERUT MAP        │ │    MEERUT MAP        │             │
│          │ │                      │ │                      │             │
│          │ └──────────────────────┘ └──────────────────────┘             │
│          │                                                               │
│          │ ┌──────────────┐ ┌────────────────┐ ┌──────────────┐          │
│          │ │ Works Status │ │ Upcoming       │ │ Key Insights │          │
│          │ │    DONUT     │ │ Sanctioned Due │ │              │          │
│          │ └──────────────┘ └────────────────┘ └──────────────┘          │
│          │                                                               │
│          │ ┌─────────────────────────────┐ ┌──────────────────────────┐  │
│          │ │ Recommended Works           │ │                          │  │
│          │ │ Pending Approval             │ │                          │  │
│          │ └─────────────────────────────┘ └──────────────────────────┘  │
│          │                                                               │
│          │ Quick Actions                                                 │
│          │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                          │
│          │ │Works │ │Anomaly│ │Pay   │ │Report│                          │
│          │ └──────┘ └──────┘ └──────┘ └──────┘                          │
└───────────────────────────────────────────────────────────────────────────┘

==================================================
33. MOST IMPORTANT REQUIREMENT
==================================================

The four district-level requirements from the project note have priority over decorative dashboard elements:

1. SANCTIONED DUE
2. WORKS LOAD HEATMAP
3. DELAY HEATMAP
4. PRELIMINARY RISK SCORE / PRE-SCORE

If there is ever a conflict between adding another visual element and preserving these four features, preserve these four.

The final dashboard must clearly communicate:

DISTRICT STATUS
+
WORKLOAD
+
DELAYS
+
PRELIMINARY RISK
+
SANCTIONING STATUS

Do not add MP View.

Do not replace either heatmap.

Do not turn the dashboard into an overly detailed analytics page.

The final result should look like a polished, realistic District Authority command center for the MPLADS Monitoring Portal.