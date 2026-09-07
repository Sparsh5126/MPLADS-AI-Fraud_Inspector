# Prompt: Fix and Standardize All MPLADS Dashboard Maps

I am working on a React + Vite dashboard for the MPLADS project. We have
multiple map visualizations:

-   India map on the Ministry dashboard
-   District maps on the District Authority dashboard
-   Constituency maps on the MP dashboard
-   Uttar Pradesh district map

## Current issues

1.  The Uttar Pradesh (UP) district map has the correct visual style and
    administrative boundaries, but **all districts are showing green
    (Low risk)** instead of being colored according to their actual risk
    data.
2.  The other maps do not match the UP map. They look like simplified
    polygon diagrams instead of proper geographic/administrative maps.

## Goal

Make **all maps consistent with the existing UP map** while ensuring
that every map displays the correct underlying data.

------------------------------------------------------------------------

## 1. Use the UP map as the visual standard

Treat the existing working UP district map as the reference
implementation.

All other maps should use the same visual language and rendering
approach:

-   Use `react-simple-maps`.
-   Use proper administrative GeoJSON boundaries.
-   Use white boundary strokes between regions.
-   Use the same risk-based color system.
-   Use the same hover behavior.
-   Use the same tooltip style.
-   Use the same legend style.
-   Use `ZoomableGroup` for zoom/pan where appropriate.
-   Keep the map clean, professional, and suitable for a government
    analytics dashboard.
-   **Do not use manually drawn, arbitrary, or simplified polygon
    shapes** as substitutes for real geographic boundaries.

The India map, district maps, and constituency maps should look like the
same map system at different geographic levels.

------------------------------------------------------------------------

## 2. Fix the UP district map coloring

The UP map is currently showing every district as green because the
GeoJSON district names are not correctly matching the risk-data district
names.

**Do not solve this by hard-coding colors.**

The color of every district must come from the actual risk data.

Implement robust geographic-name matching that handles:

-   Uppercase/lowercase differences
-   Leading/trailing spaces
-   Multiple spaces
-   Common naming variations
-   Minor spelling/name-format differences where appropriate

For example:

``` ts
const normalizeName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
```

Create a reliable lookup from normalized geographic names to the
corresponding data.

### Important

If a district exists in the GeoJSON but cannot be matched to data:

-   **Do not classify it as Low risk.**
-   Show it as `No Data`.
-   Use a neutral/light-gray color.
-   Optionally show `No Data` in its tooltip.

### Risk colors

Use the same colors everywhere:

  Risk Level   Color
  ------------ --------------------
  Critical     `#EF4444`
  High         `#F97316`
  Medium       `#EAB308`
  Low          `#22C55E`
  No Data      Neutral/light gray

------------------------------------------------------------------------

## 3. Use proper GeoJSON files

Do not use simplified decorative polygons.

### India map

The Ministry dashboard India map should use a proper India states/UTs
GeoJSON containing real administrative boundaries.

Store it locally in:

``` text
public/india-states.json
```

Reference it as:

``` ts
const geoUrl = "/india-states.json";
```

Do not depend on an external GitHub Gist or external URL when a local
GeoJSON file can be used.

### UP district map

Continue using:

``` text
public/up-districts.json
```

and reference it as:

``` ts
const geoUrl = "/up-districts.json";
```

### Other geographic levels

For district and constituency maps, use appropriate real administrative
GeoJSON files and place them in `public/`.

Examples:

``` text
public/india-states.json
public/up-districts.json
public/meerut-districts.json
public/meerut-constituencies.json
```

Only create files that correspond to the actual geographic level being
displayed.

------------------------------------------------------------------------

## 4. Standardize map behavior

All maps should follow the same interaction pattern.

### Hover

On hover:

-   Highlight the region.
-   Show a tooltip.
-   Display the geographic name.
-   Display relevant statistics.
-   Display risk level.
-   Display total works and high-risk works where applicable.

Example:

``` text
Meerut
Risk: High
Total Works: 342
High Risk Works: 28
```

### Hover styling

Use a slightly darker version of the region's existing risk color while
hovering.

Do not change it to an unrelated color.

### Boundaries

Use a small white stroke such as:

``` tsx
stroke="#ffffff"
```

### Zoom and pan

Keep the existing `ZoomableGroup` behavior where useful.

------------------------------------------------------------------------

## 5. Make every map fit correctly

All maps must:

-   Be centered correctly.
-   Fit inside their dashboard cards.
-   Maintain the correct geographic aspect ratio.
-   Avoid excessive empty space.
-   Avoid clipping important regions.
-   Scale responsively.
-   Look good at the current dashboard dimensions.

Do not distort the geography just to fill the card.

Use an appropriate projection and `projectionConfig` for each geographic
level.

The numerical projection settings can differ between India, UP,
district, and constituency maps, but the visual treatment must remain
consistent.

------------------------------------------------------------------------

## 6. Ministry dashboard --- India map

The Ministry dashboard India map should:

-   Show all Indian states/UTs represented by the GeoJSON.
-   Use actual state-level risk data.
-   Use proper state boundaries.
-   Use the same colors, tooltip, hover, and legend style as the UP map.
-   Make high-risk states immediately visible.

Do not make every state green.

If a state has no matching risk data, display `No Data` instead of Low.

------------------------------------------------------------------------

## 7. District Authority dashboard --- district maps

The District Authority dashboard should use real administrative
boundaries for the selected district.

For example, for Meerut:

-   Show actual relevant administrative boundaries.
-   Color each region according to the corresponding workload/delay/risk
    data.
-   Maintain the same map style as the UP map.
-   Keep labels readable.
-   Preserve both the **Works Load Heatmap** and **Delay Heatmap**
    concepts.

Do not replace these maps with arbitrary hexagons, rectangles, or
manually positioned polygons.

------------------------------------------------------------------------

## 8. MP dashboard --- constituency map

The MP dashboard constituency map should use real constituency
boundaries.

It should:

-   Show the relevant constituencies.
-   Use the same geographic rendering style.
-   Use actual constituency-level data.
-   Use risk-based colors where risk classification is being displayed.
-   Provide tooltips.
-   Use proper boundaries.
-   Fit the dashboard card correctly.

Do not use decorative polygon approximations.

------------------------------------------------------------------------

## 9. Keep risk classification consistent

Where a map represents risk classification:

``` text
Critical → Red
High → Orange
Medium → Yellow
Low → Green
No Data → Gray
```

The same classification must have the same meaning on every dashboard.

------------------------------------------------------------------------

## 10. Do not break existing functionality

While fixing the maps:

-   Do not remove existing dashboard sections.
-   Do not change sidebar navigation.
-   Do not change KPI calculations unless required for map data.
-   Do not remove existing tooltips or legends.
-   Do not remove existing interactions.
-   Do not introduce unnecessary dependencies.
-   Keep TypeScript types correct.
-   Keep the existing React/Vite architecture.

Modify only the relevant map components, geographic data mapping,
GeoJSON files, and supporting utilities.

------------------------------------------------------------------------

## 11. Recommended implementation process

1.  Inspect the existing working UP map component and use it as the
    reference.
2.  Identify every map component in the project.
3.  Identify the GeoJSON used by each map.
4.  Replace simplified polygon data with proper administrative GeoJSON
    where necessary.
5.  Move external GeoJSON dependencies into `public/`.
6.  Standardize the `react-simple-maps` implementation.
7.  Create a reusable geographic-name normalization/data-matching
    utility.
8.  Fix the UP district risk-data matching.
9.  Ensure unmatched regions display `No Data`, not Low.
10. Standardize colors, strokes, tooltips, hover states, legends, zoom,
    and responsive sizing.
11. Test every map independently.

------------------------------------------------------------------------

## 12. Use actual data --- do not fabricate values

The flow should be:

``` text
Actual dashboard data
        ↓
Normalize geographic name
        ↓
Match GeoJSON region
        ↓
Get risk level/statistics
        ↓
Determine color
        ↓
Render region
```

Do not assign random colors or manually assign risk levels just to make
the maps look different.

If the current data source does not contain the required
geographic-level information, identify that data gap instead of
fabricating values.

------------------------------------------------------------------------

## 13. Expected final result

### UP map

-   Proper district boundaries.
-   Existing good visual style preserved.
-   Different districts visibly use different colors when the data
    indicates different risk levels.
-   No automatic fallback to green for unmatched districts.
-   Correct tooltips and legend.

### India map

-   Real India state/UT boundaries.
-   Same visual style as UP.
-   State-level risk coloring.
-   Correct tooltips and legend.

### District maps

-   Real administrative boundaries.
-   Same visual style as UP.
-   Correct workload/delay/risk coloring based on the relevant data.

### MP/constituency map

-   Real constituency boundaries.
-   Same visual style as UP.
-   Correct data-driven coloring and tooltips.

The final result should make all maps look like they belong to the
**same professional MPLADS monitoring platform**, with the UP map
serving as the reference design and the underlying data determining the
colors.
