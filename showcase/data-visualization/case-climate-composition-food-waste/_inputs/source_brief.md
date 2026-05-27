# Global Food Waste Supply Chain Analysis

## Overview
This dataset collection characterizes food waste across the global supply chain — from production through consumption — quantifying waste shares, associated greenhouse gas emissions, avoidable waste proportions, and intervention potential across five world regions.

## Data Source

### waste_by_stage_and_region
Contains 24 rows covering 6 region groups (including Global Average) × 4 supply chain stages. Fields: `region` (string), `stage` (categorical: Production, Processing, Retail, Consumption), `waste_pct` (numeric, percent of total food waste within that region, sums to 100 per region).

### carbon_emissions_by_stage
Contains 4 rows, one per supply chain stage. Fields: `stage` (categorical), `emission_pct` (numeric, percent of total food-waste emissions, sums to 100), `emission_mt_co2e` (numeric, absolute emissions in megatonnes CO2 equivalent). Total global food-waste emissions approximately 4,500 Mt CO2e.

### avoidable_waste_by_stage
Contains 24 rows (6 regions × 4 stages). Fields: `region` (string), `stage` (categorical), `avoidable_pct` (numeric, 0–100, proportion of that stage's waste deemed avoidable).

### intervention_impact_potential
Contains 4 rows. Fields: `stage` (categorical), `food_saveable_mt` (numeric, megatonnes of food potentially saved), `co2_avoidable_mt` (numeric, megatonnes CO2e avoidable), `key_interventions` (string, summary of primary intervention types).

## Data Notes
- Estimates are synthesized from FAO and UNEP 2021–2023 reports with regional adjustments.
- Avoidable waste percentages reflect technical feasibility, not economic viability.
- Carbon emission figures include embedded agricultural, transport, and disposal emissions.