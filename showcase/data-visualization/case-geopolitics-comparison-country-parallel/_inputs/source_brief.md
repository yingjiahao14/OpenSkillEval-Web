# National Development Parallel Coordinates Dataset

## Overview
This dataset contains 30 countries spanning four World Bank income groups (High, Upper-Middle, Lower-Middle, Low) with seven development indicators, designed for a parallel coordinates visualization of multidimensional national profiles.

## Data Source

### national_development
Each record represents one country with the following fields:
- **country** (string): Country name
- **income_group** (string): World Bank income classification — one of High, Upper-Middle, Lower-Middle, Low
- **gdp_per_capita_usd** (numeric): GDP per capita in current USD, range ~380–87,720
- **hdi** (numeric): Human Development Index, range 0.394–0.961
- **freedom_index** (numeric): Freedom House aggregate score, 0–100 (100 = most free)
- **corruption_perceptions_index** (numeric): Transparency International CPI score, 0–100 (100 = least corrupt)
- **co2_emissions_per_capita_tons** (numeric): Annual CO₂ emissions in metric tons per capita, range 0.1–21.8
- **military_expenditure_pct_gdp** (numeric): Military spending as percentage of GDP, range 0.6–6.0
- **internet_penetration_pct** (numeric): Percentage of population using the internet, range 14–99

## Data Notes
- Values are approximate 2023 estimates compiled from World Bank, UNDP, Freedom House, Transparency International, IEA, SIPRI, and ITU.
- Income group assignments follow the World Bank July 2023 classification.
- Some values for conflict-affected states (e.g., Afghanistan) carry higher uncertainty.
- CO₂ figures are production-based and exclude land-use change emissions.