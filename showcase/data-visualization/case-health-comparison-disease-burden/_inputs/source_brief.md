# Global Disease Burden Transition: 1990 vs 2024 DALY Comparison

## Overview
This collection of datasets captures the global epidemiological transition between 1990 and 2024, covering top causes of disability-adjusted life years (DALYs), disease burden composition by World Bank income group, and aggregate category totals.

## Data Source

### top10_daly_causes
Contains 20 rows (10 per year). Fields: `year` (1990 or 2024), `rank` (1–10), `cause` (disease/condition name, string), `dalys_millions` (float, millions of DALYs), `category` (one of: Communicable, NCD, Injury). Represents the top 10 global DALY causes for each reference year.

### daly_by_income_group
Contains 8 rows (4 income groups × 2 years). Fields: `year`, `income_group` (Low income, Lower-middle income, Upper-middle income, High income), `communicable_pct`, `ncd_pct`, `injury_pct` — each a float summing to approximately 100% per row. Represents percentage share of total DALYs by disease category within each income group.

### global_category_totals
Contains 6 rows (3 categories × 2 years). Fields: `year`, `category` (Communicable, NCD, Injury), `dalys_millions` (float). Represents aggregate global DALYs by broad disease category.

## Data Notes
- DALY estimates are modeled based on GBD-style methodology; 2024 figures are projected estimates.
- Communicable category includes maternal, neonatal, and nutritional conditions per GBD convention.
- Percentages may not sum to exactly 100% due to rounding.