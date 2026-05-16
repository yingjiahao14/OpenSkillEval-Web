# Maternal Mortality, Health Investment & Service Coverage: 8-Country Comparison

## Overview
Four interrelated datasets track maternal mortality outcomes, health spending, skilled birth attendance, and rural-urban disparities across eight low- and middle-income countries (Ethiopia, India, Rwanda, Bangladesh, Nigeria, Cambodia, Peru, Nepal) from 2005 to 2021.

## Data Source

### maternal_mortality_timeseries
- **Fields**: `country` (string, 8 values), `year` (integer, 2005/2009/2013/2017/2021), `mmr` (integer, deaths per 100,000 live births, range 69–946)
- 40 rows total (8 countries × 5 time points)

### health_expenditure_gdp
- **Fields**: `country` (string), `year` (integer), `health_exp_pct_gdp` (float, % of GDP, range 2.4–8.2)
- 40 rows, same country-year grid as mortality data

### midwife_coverage
- **Fields**: `country` (string), `period` (string, two survey windows: "2008-2012" and "2018-2021"), `skilled_birth_attendant_pct` (integer, % of births, range 10–95)
- 16 rows (8 countries × 2 periods)

### rural_urban_mmr_gap
- **Fields**: `country` (string), `setting` ("urban" or "rural"), `mmr` (integer, deaths per 100,000 live births, range 38–860)
- 16 rows (8 countries × 2 settings), representing latest estimates (~2019-2021)

## Data Notes
- MMR figures are modeled estimates aligned with WHO/UNICEF methodology; sub-national rural-urban splits are approximate.
- Health expenditure includes both public and private spending.
- Skilled birth attendant percentages are drawn from Demographic and Health Surveys and may not align exactly with the mortality time points.
- Cambodia's MMR shows a reversal in 2021 reflecting reporting methodology changes.