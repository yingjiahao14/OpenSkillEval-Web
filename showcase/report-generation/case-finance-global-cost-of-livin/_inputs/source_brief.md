# Global Cost of Living Crisis Index 2026

## About the Dataset

This dataset, sourced from Kaggle (alitaqishah/global-cost-of-living-crisis-index-2026), provides a comprehensive snapshot of economic pressure and cost-of-living conditions across **80 major cities** worldwide. Each row represents a single city, with 22 columns capturing cost indices, income levels, rent burdens, inflation rates, and crisis classifications. All index values are benchmarked against New York, USA (index = 100).

**Key facts:**
- **Rows:** 80 (one per city)
- **Columns:** 22
- **Data year:** 2026
- **Baseline reference:** New York, USA (index = 100)

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| rank | Integer | Global rank of the city by cost of living (1 = highest cost) |
| city | String | Name of the city |
| country | String | Country where the city is located |
| region | String | Geographic/economic region (e.g., Western Europe, Asia, Americas) |
| cost_of_living_index | Float | Overall cost of living index relative to New York (100) |
| rent_index | Float | Rent price index relative to New York (100) |
| cost_of_living_plus_rent_index | Float | Combined cost of living and rent index relative to New York (100) |
| groceries_index | Float | Grocery prices index relative to New York (100) |
| restaurant_price_index | Float | Restaurant prices index relative to New York (100) |
| local_purchasing_power_index | Float | Local purchasing power index relative to New York (100); higher values indicate greater purchasing power |
| avg_monthly_net_salary_usd | Integer | Average monthly net salary in USD |
| monthly_rent_1br_city_center_usd | Integer | Monthly rent for a 1-bedroom apartment in the city center, in USD |
| monthly_rent_1br_outside_center_usd | Integer | Monthly rent for a 1-bedroom apartment outside the city center, in USD |
| petrol_price_usd_per_liter | Float | Petrol (gasoline) price in USD per liter |
| annual_inflation_rate_2025_pct | Float | Annual inflation rate as of 2025 (percentage) |
| population_city_millions | Float | City population in millions |
| cost_crisis_tier | Integer | Numeric tier classifying the severity of the cost-of-living crisis (lower values may indicate affluent/high-cost cities; higher values indicate more severe crisis conditions) |
| crisis_label | String | Descriptive label for the crisis tier (e.g., "Affluent – High Cost", and other categories indicating varying levels of economic stress) |
| oil_shock_exposure | String | Categorical assessment of the city's vulnerability to oil price shocks (e.g., "Low", "Medium", "High") |
| rent_to_salary_ratio_pct | Float | Percentage of average monthly salary consumed by city-center 1BR rent; higher values indicate greater rent burden |
| data_year | Integer | Year the data represents (all values are 2026) |
| baseline_city | String | Reference city for all index calculations ("New York, USA (index=100)") |

## Key Analytical Notes

- **Index interpretation:** All index columns (cost_of_living_index, rent_index, groceries_index, restaurant_price_index, local_purchasing_power_index, and the combined index) are relative to New York City = 100. Values above 100 indicate higher costs (or greater purchasing power) than New York; values below 100 indicate lower.
- **Crisis classification:** The `cost_crisis_tier` (integer) and `crisis_label` (string) columns together classify each city's economic stress level. Analysts should examine the distribution of these tiers to understand how many cities fall into each category.
- **Rent burden:** The `rent_to_salary_ratio_pct` is a pre-calculated metric that directly measures housing affordability. Values above 50% are generally considered severe.
- **Oil shock exposure:** This categorical variable (Low/Medium/High) can be cross-referenced with inflation and cost indices to assess vulnerability.
- **Data quality:** The dataset is compiled for analytical and educational purposes and may include estimated or aggregated values. The `data_year` and `baseline_city` columns are constant across all rows (2026 and New York respectively). No missing values are indicated in the schema, but analysts should verify completeness during processing.
- **Scope:** With 80 cities across multiple regions, the dataset enables both city-level deep dives and region-level aggregations.