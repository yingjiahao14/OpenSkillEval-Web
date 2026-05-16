# Education Investment vs. Outcomes: 30-Country Comparison

## Overview
This dataset compiles education-related metrics for 30 countries spanning Europe, Asia, the Americas, and Oceania. It pairs public education spending with three outcome dimensions — academic performance, tertiary access, and youth labor market integration — to enable cross-country comparison.

## Data Source

### education_spending
One row per country. Fields: `country` (string, country name), `region` (string, broad geographic grouping), `edu_spending_pct_gdp` (float, public education expenditure as % of GDP, range ~2.9–7.2%). Based on OECD/World Bank estimates circa 2022.

### pisa_scores
One row per country. Fields: `country` (string), `pisa_avg` (integer, average of reading, math, and science scores from PISA 2022, range 379–561).

### tertiary_enrollment
One row per country. Fields: `country` (string), `enrollment_rate` (integer, gross tertiary enrollment as % of the relevant age cohort, range 43–110%). Values above 100% are possible due to mature-age and international students.

### youth_unemployment
One row per country. Fields: `country` (string), `youth_unemp_rate` (float, unemployment rate for ages 15–24 as % of youth labor force, range ~4.1–30.2%). Data circa 2022–2023.

## Data Notes
- All four datasets share the same 30 countries and are joinable on the `country` field.
- Gross enrollment rates can exceed 100% due to inclusion of students outside the typical age cohort.
- PISA scores represent a combined average; individual subject scores may differ.
- Youth unemployment definitions follow ILO standards but national measurement practices may vary slightly.