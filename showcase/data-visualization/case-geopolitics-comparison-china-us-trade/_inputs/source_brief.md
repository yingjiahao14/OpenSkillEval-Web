# US-China Trade War: Tariffs, Trade Volumes, and Supply Chain Shifts (2016–2024)

## Overview
This collection of datasets tracks the evolution of the US-China trade war from 2016 to 2024, covering tariff rate changes, bilateral trade volumes, supply chain diversification patterns, and key policy milestones.

## Data Source

### tariff_rates
Average effective tariff rates by half-year period (2017-H1 to 2024-H1). Fields: `period` (string, format YYYY-HX), `us_tariff_on_china` (percent, range 3.1–25.4), `china_tariff_on_us` (percent, range 8.0–23.1). Rates represent trade-weighted averages across all tariff lines.

### bilateral_trade
Annual US-China bilateral trade from 2016 to 2024. Fields: `year` (integer), `us_exports_to_china` (billion USD), `us_imports_from_china` (billion USD), `total_bilateral` (billion USD, sum of exports and imports).

### supply_chain_share
Annual share of total US goods imports by source. Fields: `year` (integer), `china` (percent), `vietnam` (percent), `india` (percent), `rest_of_world` (percent). Values for each year sum to approximately 100%.

### policy_events
Key policy milestones. Fields: `date` (ISO date string), `period_approx` (corresponding half-year period), `event` (short description), `category` (one of: investigation, tariff, deal, review). Contains 12 events spanning August 2017 to May 2024.

## Data Notes
- Tariff rates are approximate trade-weighted averages and may differ from statutory rates on specific product categories
- 2024 data is partial (H1 only for tariffs; full-year trade figures are estimates)
- Supply chain shares are rounded and may not sum to exactly 100%
- Rest-of-world is a residual category capturing all non-China, non-Vietnam, non-India imports