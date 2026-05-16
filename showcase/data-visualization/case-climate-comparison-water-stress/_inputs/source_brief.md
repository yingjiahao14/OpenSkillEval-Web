# Global Water Stress: Multi-Indicator Country Comparison

## Overview
Four datasets capture different dimensions of water stress for 10 countries spanning arid, semi-arid, and water-rich regions. Together they enable a composite view of regional water crisis severity.

## Data Source

### water_supply_demand
Fields: `country` (string), `iso` (ISO 3166 alpha-3), `supply_demand_ratio` (float, renewable supply ÷ total withdrawal; values 0.31–6.12), `stress_class` (categorical: Extremely High / High / Medium-High / Medium / Low). Year: 2023 estimate.

### per_capita_freshwater
Fields: `country` (string), `per_capita_m3` (integer, cubic meters per person per year; range 84–80,620). Year: 2023 estimate. The 1,000 m³ threshold is commonly used to indicate water scarcity.

### groundwater_extraction
Fields: `country` (string), `extraction_km3_yr` (float, km³/year), `recharge_km3_yr` (float, km³/year), `extraction_recharge_ratio` (float; values 0.05–5.66). Ratio > 1.0 signals overdraft. Year: 2023 estimate.

### precipitation_trends
Fields: `country` (string), `decade` (categorical: 1990s / 2000s / 2010s), `mean_precip_mm` (integer, mm/year; range 41–1,761). Three decadal averages per country (30 rows total).

## Data Notes
- Supply-demand ratios are modeled estimates combining FAO AQUASTAT and WRI Aqueduct data.
- Groundwater recharge estimates carry ±15% uncertainty in arid regions.
- Precipitation values are country-wide spatial averages and mask sub-national variability.
- Saudi Arabia's extremely high extraction-to-recharge ratio reflects reliance on non-renewable fossil aquifers.