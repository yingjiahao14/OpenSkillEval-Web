# Global Energy Flow Sankey Data (2022 Approximate)

## Overview
This dataset represents an approximate global energy balance for 2022, structured as a three-stage Sankey diagram with 9 primary energy sources, 4 transformation/conversion stages, and 5 end-use sectors plus a waste/rejected heat node. All flow values are in exajoules (EJ).

## Data Source

### energy_sankey
- **nodes**: 19 nodes total, each with `id` (string, unique identifier), `stage` (one of: primary, transformation, end_use), and `label` (display name).
  - Primary sources (9): Oil, Coal, Natural Gas, Nuclear, Hydropower, Wind, Solar, Biomass, Geothermal
  - Transformation (4): Thermal Power Generation, Refining & Petrochemicals, Direct Use, Electricity Grid
  - End use (5+1): Transport, Industry, Buildings, Agriculture, Other, and Waste/Rejected Heat
- **flows**: 27 directed edges, each with `source` (node id), `target` (node id), and `value` (numeric, in EJ). Values range from 1.0 EJ (geothermal→grid) to 162.3 EJ (oil→refining).
- **unit**: EJ (exajoules)

## Data Notes
- Values are rounded approximations based on IEA and LLNL-style energy flow estimates.
- Total waste/rejected heat (~167.7 EJ) exceeds total renewable inputs (hydro+wind+solar+biomass+geothermal ≈ 73.7 EJ).
- "Direct Use" includes gas, coal, and biomass consumed without electricity conversion.
- Minor balancing discrepancies may exist due to rounding.