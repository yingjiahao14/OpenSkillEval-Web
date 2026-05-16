# Digital Divide: Internet Penetration Inequality Across Four Dimensions

## Overview
This collection of datasets captures internet penetration rates across four dimensions of inequality — income quintile, age group, urban vs. rural setting, and world region — for the year 2023. The data covers Sub-Saharan Africa, South Asia, Europe, and North America.

## Data Source

### internet_by_income_quintile
- **Fields**: `region` (string, 4 regions), `quintile` (string, Q1–Q5 from lowest to highest household income), `penetration` (numeric, 0–100%)
- 20 rows total (5 quintiles × 4 regions)

### internet_by_age_group
- **Fields**: `region` (string), `age_group` (string, six bands from 15-24 to 65+), `penetration` (numeric, 0–100%)
- 24 rows total (6 age groups × 4 regions)

### internet_by_urban_rural
- **Fields**: `region` (string), `setting` (Urban or Rural), `penetration` (numeric, 0–100%)
- 8 rows total (2 settings × 4 regions)

### internet_overall_by_region
- **Fields**: `region` (string), `overall_penetration` (numeric, 0–100%), `population_millions` (numeric), `internet_users_millions` (numeric)
- 4 rows, one per region

## Data Notes
- Estimates are synthesized from ITU, World Bank, and Pew Research Center methodologies for 2023.
- Income quintiles are based on national household income distributions within each region.
- Penetration is defined as the share of individuals who used the internet in the past three months.
- Rural/urban classification follows national statistical office definitions, which vary by country.