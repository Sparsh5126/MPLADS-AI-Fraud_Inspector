# MPLADS Dashboard --- Demo-Ready Map, Filter & IA Fixes

## Objective

Fix the current React + Vite MPLADS dashboard without redesigning
unrelated parts of the application.

There are currently four issues that must be fixed together:

1.  The Uttar Pradesh (UP) district map now shows every district as grey
    / `No Data`.
2.  The Meerut district maps do not look like the provided reference
    maps.
3.  The pie-chart filters on the State Portal are not actually
    filtering/updating the charts.
4.  The State Portal section called `IAS Performance` is incorrectly
    showing IAS officers instead of **Implementing Agencies (IAs)**.

The supplied reference image is the visual standard for the district
maps.

This is currently a **demo/prototype**, so realistic mock data is
allowed and encouraged where actual data is insufficient. However, the
architecture must be data-driven so that real MPLADS data can later
replace the mock data without rewriting the UI.

Priority:

**Working data flow → Correct geographic boundaries → Correct colors →
Working interactions → Reference-quality UI**

------------------------------------------------------------------------

# 1. Audit the current implementation first

Before changing code, inspect the existing project.

Find and inspect:

-   All map components.
-   All GeoJSON files under `public/`.
-   All district/state/constituency data sources.
-   The State Portal dashboard.
-   The State Portal pie-chart components.
-   The current `IAS Performance` section.
-   The relationships between works, districts, IAs, payments, risk
    scores, and delay metrics.

Do not assume field names or GeoJSON property names.

Determine why each issue is occurring before implementing the fix.

------------------------------------------------------------------------

# 2. Demo data is allowed

This is a prototype/demo at the moment.

If the existing data is insufficient to make the UI demonstrate all
required states and interactions, create realistic mock data.

Mock data can be used for:

-   State-level risk
-   District-level risk
-   Meerut workload
-   Meerut delay percentages
-   Work counts
-   Completed/in-progress/delayed works
-   Payment/fund metrics
-   Implementing Agency performance
-   Pie-chart distributions

The mock data should be realistic and internally consistent.

For example:

``` text
Total Works = Completed + In Progress + Delayed
Delay Rate = Delayed Works / Total Works × 100
```

Do not create arbitrary values that contradict each other.

------------------------------------------------------------------------

# 3. Separate mock data from UI components

Do NOT hard-code demo values directly into map/chart components.

Prefer a structure such as:

``` text
src/
  data/
    mockData.ts
    mockRiskData.ts
    mockDistrictData.ts
    mockIAData.ts
```

Use the project's existing structure if it already has an appropriate
data layer.

Components should receive data rather than containing the data
themselves.

Prefer:

``` tsx
<DistrictHeatmap
  data={districtWorkloadData}
  metric="workload"
/>
```

rather than:

``` tsx
if (district === "Meerut") {
  color = "red";
}
```

The UI should not know whether the data comes from mock data, CSV, API,
or database.

------------------------------------------------------------------------

# 4. Prepare for future real data

The intended architecture should be:

``` text
CURRENT DEMO

Mock Data Provider
       ↓
Normalized Application Data
       ↓
Dashboard Components
       ↓
Maps / Charts / Tables
```

Later:

``` text
REAL MPLADS DATA

CSV / API / Database
       ↓
Data Adapter / Normalizer
       ↓
Normalized Application Data
       ↓
Same Dashboard Components
```

Create normalization/adaptor functions where appropriate, such as:

``` ts
normalizeWorkData()
normalizeDistrictData()
normalizeIAData()
normalizeRiskData()
```

Later, real data should replace the mock provider without requiring a
rewrite of the visual components.

------------------------------------------------------------------------

# 5. Fix the UP district map

The UP map previously rendered with the correct geographic style but all
districts were green.

After the latest changes it renders all districts grey / `No Data`.

This means the GeoJSON-to-data matching is failing.

Fix the underlying matching logic.

Required flow:

``` text
GeoJSON district
      ↓
Extract geographic name
      ↓
Normalize name
      ↓
Match against application data
      ↓
Retrieve metrics/risk
      ↓
Determine classification
      ↓
Render color
```

Use a reusable normalizer:

``` ts
const normalizeName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
```

Inspect the actual names in:

-   `public/up-districts.json`
-   the district/work/risk data

and determine the real mismatch.

Handle genuine naming differences such as:

``` text
Meerut
meerut
Meerut District
```

where appropriate.

Do not create a huge arbitrary alias list.

------------------------------------------------------------------------

# 6. Correctly distinguish Low risk from No Data

The map must distinguish between actual Low risk and missing data.

### Critical

``` text
#EF4444
```

### High

``` text
#F97316
```

### Medium

``` text
#EAB308
```

### Low

``` text
#22C55E
```

### No Data

Neutral/light grey.

Logic:

``` text
Matched + Critical → Red
Matched + High     → Orange
Matched + Medium   → Yellow
Matched + Low      → Green
Unmatched          → Grey / No Data
```

For the demo, ensure the mock data contains a realistic mixture of
Critical, High, Medium, and Low districts so the map visibly
demonstrates the classification.

Do not make all districts green or all districts grey.

------------------------------------------------------------------------

# 7. Verify UP matching

Temporarily inspect the mapping if necessary:

``` ts
console.table(
  geographies.map((geo) => {
    const geoName = getDistrictName(geo);
    const data = getDistrictData(geo);

    return {
      geoName,
      normalizedName: normalizeName(geoName),
      matched: !!data,
      risk: data?.riskLevel,
    };
  })
);
```

Use this to verify that expected districts match.

Remove unnecessary debug logging before completion.

------------------------------------------------------------------------

# 8. Meerut maps must match the reference

The provided reference image contains:

-   Works Load Heatmap
-   Delay Heatmap
-   Real geographic administrative regions
-   Labels inside regions
-   Zoom + / − controls in the upper-left
-   Legend on the right
-   Clean light background
-   White region boundaries
-   Compact dashboard-card layout

The current Meerut maps do not resemble the reference.

Treat the reference as the visual standard.

The maps must NOT use:

-   Hexagons
-   Generic polygons
-   Random polygons
-   Rectangles
-   Artificial Voronoi regions
-   Manually positioned shapes pretending to be geography

Use real geographic geometry.

------------------------------------------------------------------------

# 9. Determine the correct Meerut geographic level

Inspect the reference and current GeoJSON.

Determine whether the regions represent:

-   Tehsils/sub-districts
-   Blocks
-   Constituencies
-   Another administrative level

The reference contains regions such as:

``` text
Sardhana
Meerut (City)
Hastinapur
Daurala
Mawana
Kithor
```

Use the correct real geographic dataset corresponding to the level
represented by these regions.

If the correct GeoJSON is missing, add the appropriate real geographic
GeoJSON under `public/`.

Do NOT invent the geometry.

------------------------------------------------------------------------

# 10. Use local GeoJSON

Prefer local geographic files over external URLs.

Example:

``` text
public/
  india-states.json
  up-districts.json
  <correct-meerut-geography>.json
```

Reference them like:

``` ts
const geoUrl = "/up-districts.json";
```

and:

``` ts
const geoUrl = "/<correct-meerut-geography>.json";
```

Avoid relying on external GitHub Gists for core application geography.

------------------------------------------------------------------------

# 11. Build/reuse a reusable district heatmap

Do not duplicate the complete map implementation.

Create/reuse something like:

``` tsx
<DistrictHeatmap
  title="Works Load Heatmap"
  metric="workload"
  geoUrl="/<correct-meerut-geography>.json"
  data={districtData}
/>
```

and:

``` tsx
<DistrictHeatmap
  title="Delay Heatmap"
  metric="delay"
  geoUrl="/<correct-meerut-geography>.json"
  data={districtData}
/>
```

Both must use the same geographic geometry.

Only the metric/classification/coloring changes.

------------------------------------------------------------------------

# 12. Works Load Heatmap

Match the reference.

Title:

``` text
Works Load Heatmap
```

Zoom controls:

``` text
+
−
```

Position them in the upper-left.

Legend title:

``` text
Works Load
```

Categories:

``` text
Very High
High
Medium
Low
```

Use:

``` text
Very High → Red
High      → Orange
Medium    → Yellow/Amber
Low       → Light Yellow
```

The category must be calculated from workload data.

Do not assign categories based on region names.

For the demo, create realistic workload values so multiple categories
appear.

------------------------------------------------------------------------

# 13. Delay Heatmap

Title:

``` text
Delay Heatmap
```

Use the exact same geographic shapes as the Works Load map.

Legend:

``` text
% Delayed Works
```

Categories:

``` text
> 50%
25% – 50%
10% – 25%
< 10%
```

Use:

``` text
> 50%      → Red
25–50%     → Orange
10–25%     → Yellow
< 10%      → Green
```

Calculate:

``` text
delayRate = delayedWorks / totalWorks × 100
```

Then classify the region.

Do not hard-code the final color.

------------------------------------------------------------------------

# 14. Map labels

Labels should come from the geographic/data source.

They should appear inside the relevant regions.

Examples:

``` text
Sardhana
Meerut (City)
Hastinapur
Daurala
Mawana
Kithor
```

Do not use arbitrary screen coordinates.

Use geographic centroids or appropriate label positions derived from the
geometry.

Labels should:

-   Be readable.
-   Be centered.
-   Avoid unnecessary overlap.
-   Remain visible at default zoom.

------------------------------------------------------------------------

# 15. Map interactions

Use `react-simple-maps`.

Use:

``` tsx
stroke="#ffffff"
```

with an appropriate small stroke width.

On hover:

-   Highlight the region.
-   Show a tooltip.
-   Keep the hover color related to the current metric color.

Use `ZoomableGroup`.

Keep zoom controls in the upper-left.

The map must be properly centered and fitted inside its card.

------------------------------------------------------------------------

# 16. Map tooltips

Use actual demo/application data.

Works Load example:

``` text
Meerut (City)

Total Works: 342
Workload: Very High
```

Delay example:

``` text
Meerut (City)

Delayed Works: 42
Delay Rate: 32%
```

These are examples only. Generate coherent demo values based on the
project's actual geographic regions.

------------------------------------------------------------------------

# 17. India map

The Ministry dashboard India map should use real India state/UT GeoJSON.

It should:

-   Show proper state boundaries.
-   Use the same visual style as the UP map.
-   Use state-level risk data.
-   Use data-driven risk colors.
-   Support hover/tooltips.
-   Include a risk legend.
-   Fit correctly inside the card.

For the demo, create realistic mock state risk data so the map contains:

``` text
Critical
High
Medium
Low
```

Do not make every state green.

States without data can be grey, but preferably provide demo values for
all states represented by the dashboard.

------------------------------------------------------------------------

# 18. District Authority maps

The District Authority dashboard should use real administrative
boundaries for the selected district/geographic level.

For Meerut:

-   Use the correct real regions.
-   Use the same geometry for Works Load and Delay.
-   Use data-driven coloring.
-   Use labels.
-   Use zoom controls.
-   Use a right-side legend.
-   Match the supplied reference.

Do not replace the map with generic shapes.

------------------------------------------------------------------------

# 19. MP / constituency map

The MP dashboard constituency map should use real constituency
boundaries.

It should:

-   Show relevant constituencies.
-   Use proper geographic geometry.
-   Use actual or realistic demo data.
-   Use data-driven colors.
-   Provide tooltips.
-   Use consistent styling with the other maps.
-   Fit correctly in the dashboard card.

For the prototype, mock constituency data is allowed.

------------------------------------------------------------------------

# 20. Fix State Portal pie-chart filters

The State Portal pie-chart filters currently do not work.

The filter must actually affect the underlying chart data.

Required flow:

``` text
Selected filter
      ↓
React state
      ↓
Filtered dataset
      ↓
Recalculate chart data
      ↓
Render updated pie chart
      ↓
Update total / percentages / legend
```

If the State Portal has:

``` text
All Districts
```

and individual districts, selecting a district must change the pie
chart.

------------------------------------------------------------------------

# 21. Check common filter bugs

Inspect for:

-   Filter state declared but never used.
-   Dropdown changing but chart remaining static.
-   `useMemo` missing filter dependencies.
-   Filtering one dataset while chart uses another.
-   District-name mismatch.
-   Hard-coded chart values.
-   Stale props.
-   Incorrect `useEffect` dependencies.
-   Filter state being reset on re-render.
-   Multiple components maintaining conflicting state.

Fix the actual root cause.

------------------------------------------------------------------------

# 22. Pie charts must be data-driven

Do not use hard-coded values if the chart is expected to respond to
filters.

Instead derive the pie-chart values from the currently filtered dataset.

For example:

``` ts
const riskDistribution = [
  {
    name: "Critical",
    value: filteredWorks.filter(
      w => w.riskLevel === "Critical"
    ).length
  },
  {
    name: "High",
    value: filteredWorks.filter(
      w => w.riskLevel === "High"
    ).length
  },
  {
    name: "Medium",
    value: filteredWorks.filter(
      w => w.riskLevel === "Medium"
    ).length
  },
  {
    name: "Low",
    value: filteredWorks.filter(
      w => w.riskLevel === "Low"
    ).length
  }
];
```

Adapt this to the actual application schema.

------------------------------------------------------------------------

# 23. Test State Portal filters

Test:

### Default

``` text
All Districts
```

### Specific district

Select a district and verify:

-   Pie chart changes.
-   Total changes.
-   Percentages change.
-   Legend changes.
-   Related statistics update if intended.

Then switch back to:

``` text
All Districts
```

and verify the aggregate returns.

Test all existing filter combinations.

------------------------------------------------------------------------

# 24. Fix "IAS Performance"

The State Portal currently contains:

``` text
IAS Performance
```

This is incorrect.

It should be:

``` text
Implementing Agencies Performance
```

or:

``` text
IA Performance
```

The section must display **Implementing Agencies (IAs)**, NOT IAS
officers.

------------------------------------------------------------------------

# 25. Correct the IA data relationship

The intended relationship is:

``` text
Work
  ↓
Implementing Agency (IA)
  ↓
IA performance metrics
```

Do not use IAS officer data.

Inspect the existing IA data and use the correct IA identifier/name.

------------------------------------------------------------------------

# 26. IA Performance demo data

If actual IA data is insufficient, create realistic mock IA data.

Possible metrics:

-   Total works assigned
-   Completed works
-   Works in progress
-   Delayed works
-   Funds utilised
-   Sanctioned amount
-   Completion rate
-   Delay rate
-   Risk/anomaly count

Only display metrics appropriate to the current UI and available data
model.

Example structure:

``` text
Implementing Agency
Works
Completed
Delayed
Utilisation
```

Do not put the mock values directly into the chart/table component.

------------------------------------------------------------------------

# 27. IA Performance filters

The IA Performance section should respond to relevant State Portal
filters.

Required flow:

``` text
District / other relevant filter
          ↓
Filtered works
          ↓
Group by Implementing Agency
          ↓
Calculate IA metrics
          ↓
Render IA Performance
```

Selecting a district should show the IAs relevant to that filtered
dataset.

------------------------------------------------------------------------

# 28. Correct IAS/IA labels

Search the State Portal code for:

``` text
IAS Performance
IAS Officer
IAS Officers
IAS
```

Determine which references are accidental.

For the affected performance section, use:

``` text
Implementing Agency
Implementing Agencies
IA
```

Do not globally replace legitimate IAS references if another feature
genuinely requires them.

------------------------------------------------------------------------

# 29. Keep dashboard design intact

Do not redesign unrelated dashboard sections.

Do not remove:

-   KPI cards
-   Upcoming Sanctioned Due
-   Recommended Works
-   Key Insights
-   Sidebar
-   Header
-   Navigation
-   Reports
-   Existing functionality

Only modify what is necessary for the fixes.

------------------------------------------------------------------------

# 30. Demo data should demonstrate the full product

Because this is a prototype, intentionally ensure the demo data
demonstrates:

-   Multiple risk levels.
-   Multiple workload levels.
-   Multiple delay levels.
-   Different IA performance levels.
-   Different district totals.
-   Working filters.
-   Different pie-chart distributions.
-   Tooltips with meaningful values.
-   Maps that visibly change based on data.

The demo should make the application's capabilities obvious during a
presentation.

------------------------------------------------------------------------

# 31. Do not hard-code presentation outcomes

Even though mock data is allowed, do not do this:

``` ts
if (district === "Meerut") return "#EF4444";
```

Instead:

``` text
Mock data
   ↓
Metric
   ↓
Classification
   ↓
Color
```

This is important because the same implementation must later work with
real data.

------------------------------------------------------------------------

# 32. Final architecture target

Aim for:

``` text
             DATA PROVIDER
                   │
          ┌────────┴────────┐
          │                 │
      DEMO DATA          REAL DATA
          │                 │
          └────────┬────────┘
                   ↓
             DATA NORMALIZER
                   ↓
          NORMALIZED APP DATA
                   ↓
        ┌──────────┼──────────┐
        ↓          ↓          ↓
      MAPS       CHARTS     TABLES
        │          │          │
        └──────────┼──────────┘
                   ↓
              DASHBOARD UI
```

This means later the mock provider can be replaced with CSV/API/database
data while keeping the dashboard components intact.

------------------------------------------------------------------------

# 33. Final validation checklist

## UP map

-   [ ] GeoJSON loads.
-   [ ] District names are extracted correctly.
-   [ ] District names match the demo data.
-   [ ] Critical = red.
-   [ ] High = orange.
-   [ ] Medium = yellow.
-   [ ] Low = green.
-   [ ] Truly missing data = grey.
-   [ ] Multiple colors are visible in the demo.
-   [ ] Tooltip works.
-   [ ] Hover works.
-   [ ] Zoom works.

## Meerut Works Load Heatmap

-   [ ] Uses real geographic boundaries.
-   [ ] Matches the supplied reference.
-   [ ] Correct geographic regions are shown.
-   [ ] Labels are visible.
-   [ ] Zoom controls are upper-left.
-   [ ] Legend is on the right.
-   [ ] Workload colors are data-driven.
-   [ ] Multiple workload categories are visible.
-   [ ] Tooltip works.
-   [ ] Map fits the card.

## Meerut Delay Heatmap

-   [ ] Uses exactly the same geographic geometry as Works Load.
-   [ ] Uses actual/demo delay data.
-   [ ] Correct delay thresholds.
-   [ ] Correct color scale.
-   [ ] Same labels as Works Load.
-   [ ] Tooltip works.
-   [ ] Legend matches reference.
-   [ ] Zoom works.
-   [ ] Multiple delay categories are visible.

## State Portal pie charts

-   [ ] Default filter works.
-   [ ] District filter works.
-   [ ] Chart values update.
-   [ ] Center total updates.
-   [ ] Percentages update.
-   [ ] Legend updates.
-   [ ] Switching back to All Districts works.
-   [ ] No hard-coded values prevent updates.

## Implementing Agencies Performance

-   [ ] Heading says `Implementing Agencies Performance` or
    `IA Performance`.
-   [ ] Shows IAs, not IAS officers.
-   [ ] Uses correct IA identifiers/names.
-   [ ] Demo IA data is realistic.
-   [ ] Metrics are data-driven.
-   [ ] Relevant filters work.
-   [ ] No accidental IAS-officer data remains in this section.

## Future real-data compatibility

-   [ ] Mock data is separated from UI components.
-   [ ] Map components receive data rather than hard-coded values.
-   [ ] Chart components receive derived data.
-   [ ] Geographic name normalization is reusable.
-   [ ] Data normalization/adapters exist where necessary.
-   [ ] Replacing the mock data provider will not require rewriting the
    UI.

------------------------------------------------------------------------

# MOST IMPORTANT INSTRUCTION

This is a demo, so **realistic mock data is completely acceptable**.

What must NOT be fake is the application's architecture and behavior.

The dashboard should behave as though real MPLADS data has been loaded:

``` text
Mock/Real Data
      ↓
Data Normalization
      ↓
Filtering
      ↓
Metrics
      ↓
Risk / Workload / Delay Classification
      ↓
Maps + Charts + Tables
```

Make the current demo visually impressive and fully functional, while
keeping the data layer replaceable so the same application can later run
on the actual MPLADS dataset.
