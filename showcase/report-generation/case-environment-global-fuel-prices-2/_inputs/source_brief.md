# Global Fuel Prices 2020–2026

## About the Dataset

This dataset, sourced from Kaggle (belbino/global-fuel-prices-20202026), provides a comprehensive weekly record of retail fuel prices across **84 countries** spanning **January 2020 to April 2026**. It contains **27,468 rows** and **10 columns**, covering petrol, diesel, and LPG prices normalized to USD per liter, alongside global Brent Crude oil benchmarks and national-level fiscal indicators (tax percentage and subsidy level).

The data was aggregated through a multi-stage ETL pipeline: extracted from global energy ministries, regulatory bodies (EIA, OPEC), and economic databases (World Bank); normalized from local currencies to USD using historical spot exchange rates; and aligned to a weekly frequency matching global crude oil reporting cycles.

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `date` | String | Weekly recording date in YYYY-MM-DD format. Covers Jan 2020 – Apr 2026. |
| `country` | String | Name of the sovereign state or territory. 84 unique countries. |
| `region` | String | Geographic region. Expected values include: Asia, Europe, North America, South America, Africa, Middle East, Oceania (7 regions). |
| `income_level` | String | Economic classification based on GNI per capita. Values: "High", "Middle", "Low". |
| `subsidy_level` | String | Degree of government intervention in fuel pricing. Values: "High", "Low". |
| `petrol_usd_liter` | Float | Retail price of petrol (gasoline) at the pump in USD per liter. |
| `diesel_usd_liter` | Float | Retail price of diesel at the pump in USD per liter. |
| `lpg_usd_liter` | Float | Retail price of Liquefied Petroleum Gas in USD per liter. |
| `brent_crude_usd` | Float | Global benchmark price for Brent Crude oil in USD per barrel. This is a market-level variable, not country-specific. |
| `tax_percentage` | Float | Estimated percentage of the retail price attributed to taxes. Values vary widely (observed range roughly 27–63% in sample rows). |

## Key Observations & Data Notes

- **Date column** is stored as a string and should be parsed to a proper date type for time series analysis.
- **Brent Crude** is a global benchmark and will share the same value across all countries for a given week. It can be used as a baseline to measure how much retail prices deviate from the international commodity price.
- **Tax percentage** appears to vary week-to-week even within the same country (e.g., United States shows values from 27.6% to 62.3% in the first five rows), which may reflect estimation methodology or compositional changes. Analysts should be aware of this variability.
- **Subsidy level** is a binary categorical variable (High/Low) and serves as a key segmentation axis for policy analysis.
- **Income level** has three categories (High, Middle, Low) and enables affordability and equity analyses.
- All price columns are already standardized to USD, removing the need for currency conversion.
- No explicit missing value indicators were noted in the metadata, but analysts should verify completeness across all 84 countries and the full date range.

## Analytical Context

The 2020–2026 period encompasses several major global energy events: the COVID-19 demand collapse (2020), the post-pandemic recovery and supply chain disruptions (2021), the energy price crisis linked to geopolitical tensions (2022), and subsequent market adjustments. This dataset is well-suited for analyzing how these shocks propagated from global crude markets to retail consumers across different economic and policy contexts.