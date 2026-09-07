# MPLADS Dashboard --- Complete Fix Prompt

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

The priority is:

**Correct data → Correct geographic boundaries → Correct colors →
Correct interactions → Reference-quality UI**

Do not fabricate data or use fake geographic polygons just to make the
screenshots look correct.

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
-   The data relationships between works, districts, IAs, payments, risk
    scores, and delay metrics.

Do not assume field names or GeoJSON property names.

Determine why each of the four problems is occurring before implementing
the fix.

Do not replace working project data with newly invented mock data.

------------------------------------------------------------------------

# 2. Fix the UP district map data matching

The UP map previously rendered with the correct geographic style, but
all districts were green.

After the latest changes it now renders all districts grey / `No Data`.

This indicates that the GeoJSON regions are not matching the district
names in the actual application data.

Fix the underlying matching logic.

The intended flow is:

``` text
GeoJSON district
      ↓
Extract geographic name
      ↓
Normalize name
      ↓
Match against actual dashboard data
      ↓
Retrieve actual metrics/risk
      ↓
Determine classification
      ↓
Render color
```

## Name normalization

Create a reusable function such as:

``` ts
const normalizeName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
```

But do not assume this alone solves the problem.

Inspect the actual names in:

-   `public/up-districts.json`
-   the district/work/risk data used by the dashboard

and identify the actual mismatch.

Handle genuine naming variations such as:

``` text
Meerut
meerut
Meerut District
```

where necessary.

Do not create an unnecessarily large hard-coded alias list.

------------------------------------------------------------------------

# 3. Correctly distinguish Low risk from No Data

This is critical.

The map must NOT use `Low` as the fallback when data is missing.

The states must be:

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

Use a neutral/light grey.

The logic must be:

``` text
Matched + Critical → Red
Matched + High     → Orange
Matched + Medium   → Yellow
Matched + Low      → Green
Unmatched          → Grey / No Data
```

Do not make unmatched districts green.

Do not make every district grey.

------------------------------------------------------------------------

# 4. Verify the UP matching before finishing

Temporarily inspect the mapping if necessary.

For example:

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

Use this to confirm that expected districts are matching.

Remove unnecessary debugging before completion.

------------------------------------------------------------------------

# 5. Meerut district maps must match the reference image

The provided reference image shows two maps:

1.  `Works Load Heatmap`
2.  `Delay Heatmap`

The Meerut maps in the current implementation do not resemble this
design.

Use the reference image as the visual standard.

The maps should have:

-   Real administrative geographic boundaries.
-   Irregular but geographically accurate regions.
-   Smooth edges.
-   White boundaries.
-   Labels inside regions.
-   `+` and `−` zoom controls in the upper-left.
-   Legend on the right.
-   Clean light background.
-   Same card styling.
-   Same typography hierarchy.
-   Same spacing.
-   Same overall proportions.

The reference includes regions such as:

-   Sardhana
-   Meerut (City)
-   Hastinapur
-   Daurala
-   Mawana
-   Kithor

These labels should correspond to the actual geographic regions
represented by the correct GeoJSON.

Do not manually draw these shapes.

------------------------------------------------------------------------

# 6. Use the correct geographic level for Meerut

Inspect the existing geographic files and determine exactly what
administrative level the reference represents.

Do not assume it is simply a district boundary.

Determine whether the required geometry represents:

-   tehsils/sub-districts,
-   blocks,
-   constituencies,
-   or another administrative level.

The visible regions in the reference must correspond to the actual
geographic dataset.

If the correct GeoJSON does not exist in the project, add the
appropriate real GeoJSON under `public/`.

For example:

``` text
public/meerut-subdistricts.json
```

Only use a filename appropriate to the actual geographic level.

Do not create fake geometry.

------------------------------------------------------------------------

# 7. Use local GeoJSON files

Avoid external GeoJSON URLs when a local project asset can be used.

For example:

``` text
public/
├── up-districts.json
├── india-states.json
└── <correct-meerut-geography>.json
```

Reference local files like:

``` ts
const geoUrl = "/up-districts.json";
```

or:

``` ts
const geoUrl = "/<correct-meerut-geography>.json";
```

Do not use an external GitHub Gist for a map that is expected to work
reliably in the local application.

------------------------------------------------------------------------

# 8. Build one reusable district heatmap component

Do not duplicate the entire map implementation.

Create/reuse a component similar to:

``` tsx
<DistrictHeatmap
  title="Works Load Heatmap"
  metric="workload"
  geoUrl="/<correct-meerut-geography>.json"
/>
```

and:

``` tsx
<DistrictHeatmap
  title="Delay Heatmap"
  metric="delay"
  geoUrl="/<correct-meerut-geography>.json"
/>
```

Both maps must use the exact same geographic geometry.

Only the metric and color classification should change.

------------------------------------------------------------------------

# 9. Works Load Heatmap

Match the reference image.

Title:

``` text
Works Load Heatmap
```

Zoom controls:

``` text
+
−
```

Place them in the upper-left.

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

Use this color hierarchy:

``` text
Very High → Red
High      → Orange
Medium    → Yellow/Amber
Low       → Light Yellow
```

The actual threshold logic must be based on the existing workload data.

Do not hard-code individual region colors.

------------------------------------------------------------------------

# 10. Delay Heatmap

Title:

``` text
Delay Heatmap
```

Use exactly the same geographic shapes as the Works Load map.

Legend title:

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
25%–50%    → Orange
10%–25%    → Yellow
< 10%      → Green
```

The delay percentage must be calculated from the actual application
data.

Do not fabricate percentages.

------------------------------------------------------------------------

# 11. Map labels

Labels should be rendered from the geographic/data source.

They should appear inside the relevant regions where there is enough
space.

For example:

``` text
Sardhana
Meerut (City)
Hastinapur
Daurala
Mawana
Kithor
```

Do not hard-code arbitrary screen coordinates for labels.

Use geographic centroids/appropriate label positions derived from the
geometry.

Labels should:

-   Be readable.
-   Have appropriate font size.
-   Remain centered.
-   Not overlap unnecessarily.
-   Remain visible when the map is at its default zoom.

------------------------------------------------------------------------

# 12. Map boundaries and interactions

Use `react-simple-maps`.

Use:

``` tsx
stroke="#ffffff"
```

with a small appropriate stroke width.

On hover:

-   Highlight the region.
-   Show a tooltip.
-   Keep the hover color related to the region's current metric color.

Use `ZoomableGroup` for zoom/pan.

Keep zoom controls in the upper-left.

The map must remain centered and properly fitted inside its card.

------------------------------------------------------------------------

# 13. Map tooltips

Tooltips must use actual data.

For Works Load, something similar to:

``` text
Meerut (City)

Total Works: 342
Workload: Very High
```

For Delay:

``` text
Meerut (City)

Delayed Works: 42
Delay Rate: 32%
```

Use whatever actual fields are available in the project.

Do not invent numbers.

------------------------------------------------------------------------

# 14. Do not redesign the dashboards

Keep the existing dashboard layout.

Do not remove or rearrange unrelated sections.

Do not remove:

-   KPI cards
-   Upcoming Sanctioned Due
-   Recommended Works
-   Key Insights
-   Sidebar
-   Header
-   Existing navigation
-   Existing reports
-   Existing dashboard functionality

Only change what is necessary to fix the maps and State Portal issues.

------------------------------------------------------------------------

# 15. Fix State Portal pie-chart filters

The State Portal pie-chart filters currently do not work.

Inspect the existing implementation.

The filter must not merely change the dropdown visually.

It must change the underlying dataset used by the chart.

The correct flow is:

``` text
Selected filter
      ↓
React state
      ↓
Filter source dataset
      ↓
Recalculate chart data
      ↓
Render updated pie chart
      ↓
Update total / percentages / legend
```

------------------------------------------------------------------------

# 16. State Portal filter implementation

If the State Portal has a district filter such as:

``` text
All Districts
```

and individual district selections, selecting a district must update the
pie chart.

Example pattern:

``` tsx
const [selectedDistrict, setSelectedDistrict] =
  useState("All Districts");

const filteredWorks = useMemo(() => {
  if (selectedDistrict === "All Districts") {
    return works;
  }

  return works.filter(
    work =>
      normalizeName(work.district) ===
      normalizeName(selectedDistrict)
  );
}, [works, selectedDistrict]);
```

Then derive pie-chart data from `filteredWorks`.

Use the actual structure of the existing application rather than blindly
copying this example.

------------------------------------------------------------------------

# 17. Fix common filter bugs

Inspect for:

-   Filter state being declared but never used.
-   Dropdown value changing while chart data remains static.
-   `useMemo` missing the filter dependency.
-   Filtering one dataset while the chart uses another.
-   District-name mismatch.
-   Hard-coded pie-chart values.
-   Derived data calculated outside the relevant React state flow.
-   Stale props.
-   `useEffect` dependency problems.
-   Filter being reset during re-render.
-   Multiple components maintaining conflicting filter state.

Fix the actual root cause.

------------------------------------------------------------------------

# 18. Pie charts must be data-driven

Do not use hard-coded values such as:

``` ts
[
  { name: "Critical", value: 6 },
  { name: "High", value: 481 },
  { name: "Medium", value: 1924 },
  { name: "Low", value: 10431 }
]
```

if those values are supposed to respond to filters.

Derive the chart values from the filtered source dataset.

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

Adapt this to the actual data schema.

------------------------------------------------------------------------

# 19. Test State Portal filters

Test the default:

``` text
All Districts
```

Then select a specific district.

Verify:

-   Pie chart changes.
-   Total changes.
-   Percentages change.
-   Legend values change.
-   Any related KPI/count changes if they are intended to follow the
    same filter.

Then switch back to:

``` text
All Districts
```

and verify the original aggregate returns.

Test multiple filters if the existing UI provides them.

------------------------------------------------------------------------

# 20. FIX "IAS PERFORMANCE"

There is an incorrect State Portal section currently labeled:

``` text
IAS Performance
```

This is wrong for this dashboard.

It should represent:

``` text
Implementing Agencies Performance
```

or, if space is limited:

``` text
IA Performance
```

The section must display **Implementing Agencies (IAs)**, NOT IAS
officers.

------------------------------------------------------------------------

# 21. Correct IA data relationship

Use the existing Implementing Agency data in the project.

The intended relationship is:

``` text
Work
  ↓
Implementing Agency (IA)
  ↓
IA performance metrics
```

Do not use:

``` text
Work
  ↓
IAS officer
  ↓
Performance
```

unless there is a separate, explicitly intended IAS feature elsewhere.

Inspect the current data model and replace the accidental IAS-officer
mapping with the actual IA mapping.

------------------------------------------------------------------------

# 22. IA Performance metrics

The section should compare Implementing Agencies using actual available
metrics.

Use only fields that exist in the project.

Possible metrics include:

-   Total works assigned
-   Completed works
-   Works in progress
-   Delayed works
-   Funds utilised
-   Sanctioned amount
-   Completion rate
-   Delay rate
-   Risk/anomaly count

Do not fabricate missing metrics.

If the current UI is a chart, preserve the chart style and replace the
underlying IAS data with IA data.

If it is a table, preserve the table style and replace the entities with
IA names.

------------------------------------------------------------------------

# 23. IA Performance filters

If the State Portal filters include:

-   District
-   IA
-   Work status
-   Risk level
-   Date/year

the IA Performance section should respond to relevant filters.

For example:

``` text
District filter
      ↓
Filtered works
      ↓
Group by Implementing Agency
      ↓
Calculate IA metrics
      ↓
Render IA Performance
```

Selecting a district should show the implementing agencies relevant to
that filtered dataset.

------------------------------------------------------------------------

# 24. Correct all IAS/IA labels

Search the State Portal code for accidental references such as:

``` text
IAS Performance
IAS Officer
IAS Officers
IAS
```

and determine whether each reference is actually intended.

For the affected performance section, use:

``` text
Implementing Agency
Implementing Agencies
IA
```

Do not globally replace legitimate IAS references if they are used
elsewhere for a genuine IAS-related feature.

Only correct the accidental IAS/IA confusion.

------------------------------------------------------------------------

# 25. Do not fabricate any data

This is an important requirement for the entire fix.

These must come from the actual application data:

-   Map colors.
-   Risk levels.
-   Work counts.
-   Workload values.
-   Delay percentages.
-   District statistics.
-   State statistics.
-   Pie-chart values.
-   IA names.
-   IA performance metrics.
-   Tooltips.

The screenshots define the desired **visual design**, not the numbers.

------------------------------------------------------------------------

# 26. Final validation

## UP map

-   [ ] GeoJSON loads.
-   [ ] District names are extracted correctly.
-   [ ] District names match actual data.
-   [ ] Critical districts are red.
-   [ ] High districts are orange.
-   [ ] Medium districts are yellow.
-   [ ] Low districts are green.
-   [ ] Only genuinely missing data is grey.
-   [ ] Not every district is grey.
-   [ ] Not every district is green.
-   [ ] Tooltip works.
-   [ ] Hover works.
-   [ ] Zoom works.

## Meerut Works Load Heatmap

-   [ ] Uses real geographic boundaries.
-   [ ] Looks like the supplied reference.
-   [ ] Correct geographic regions are shown.
-   [ ] Labels are visible.
-   [ ] Zoom controls are upper-left.
-   [ ] Legend is on the right.
-   [ ] Workload colors are data-driven.
-   [ ] Tooltip works.
-   [ ] Map fits the card.

## Meerut Delay Heatmap

-   [ ] Uses exactly the same geographic geometry as Works Load.
-   [ ] Uses actual delay data.
-   [ ] Correct delay thresholds.
-   [ ] Correct color scale.
-   [ ] Same labels as Works Load.
-   [ ] Tooltip works.
-   [ ] Legend matches reference.
-   [ ] Zoom works.

## State Portal pie charts

-   [ ] Default filter works.
-   [ ] District filter works.
-   [ ] Chart values update.
-   [ ] Center total updates.
-   [ ] Percentages update.
-   [ ] Legend updates.
-   [ ] Switching back to All Districts works.
-   [ ] No hard-coded values prevent updates.

## State Portal IA Performance

-   [ ] Heading says `Implementing Agencies Performance` or
    `IA Performance`.
-   [ ] Shows Implementing Agencies, not IAS officers.
-   [ ] Uses actual IA data.
-   [ ] IA names are correct.
-   [ ] Metrics are data-driven.
-   [ ] Relevant filters affect the section.
-   [ ] No accidental IAS-officer data remains in this section.

------------------------------------------------------------------------

# 27. Most important implementation rule

Do not keep changing the visual appearance while the underlying data
flow is broken.

First make this work:

``` text
GeoJSON
   ↓
Geographic name
   ↓
Name normalization
   ↓
Data matching
   ↓
Actual metrics
   ↓
Classification
   ↓
Color
   ↓
Map
```

And for State Portal:

``` text
Filter
   ↓
Filtered dataset
   ↓
Derived metrics
   ↓
Pie chart / IA performance
```

Only after those data flows are correct should you finalize the visual
styling.

The final result must provide:

**Correct data + real geographic boundaries + correct colors + working
filters + correct Implementing Agency data + reference-quality maps.**
