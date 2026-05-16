# GDP Rankings of Top 15 Economies (1970–2025)

## Overview
This dataset tracks the nominal GDP rankings of 15 major economies across six decade-level snapshots: 1970, 1980, 1990, 2000, 2010, and 2025. It is designed for a bump chart showing how country rankings shift over time.

## Data Source

### gdp_rankings
- **country** (string): Name of the country. 15 unique values.
- **1970, 1980, 1990, 2000, 2010, 2025** (integer): Each column represents the country's GDP rank in that year, where 1 = largest nominal GDP. Ranks range from 1 to 15, with no ties within a given year.
- **highlight_countries** (array): Three countries flagged for visual emphasis — China, Japan, and India.
- **unit**: Rank position (1 = highest GDP). Lower number = larger economy.

## Data Notes
- Rankings are approximate and based on nominal GDP in current US dollars at each snapshot year.
- The 2025 figures reflect IMF and World Bank projections and estimates.
- Russia's pre-1991 ranking is an approximation based on the Russian SFSR's estimated share of Soviet GDP.
- Rankings are simplified to 15 slots; some borderline economies (e.g., Netherlands, Indonesia) are excluded for clarity.
- Each year column contains a complete 1–15 permutation with no duplicate ranks.