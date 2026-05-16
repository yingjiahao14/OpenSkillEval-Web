# Emerging Market Debt Vulnerability & Fed Rate Transmission (2021–2024)

## Overview
Four datasets capture the transmission of US monetary tightening to eight emerging-market economies (Turkey, Argentina, Egypt, South Africa, Brazil, Pakistan, Ghana, Sri Lanka) across four dimensions: US interest rates, external debt burdens, currency depreciation, and sovereign credit rating actions.

## Data Source

### fed_funds_rate
Quarterly upper-bound Fed Funds rate from Q4 2021 to Q4 2024. Fields: `date` (YYYY-QN string), `rate_pct` (float, percent). 13 rows.

### external_debt_to_gdp
Annual external-debt-to-GDP ratios for 8 countries, 2021–2024. Fields: `country` (string), `year` (int), `debt_gdp_pct` (float, percent of GDP). 32 rows.

### currency_depreciation
Cumulative local-currency depreciation against the USD from a January 2021 baseline, measured at year-end. Fields: `country` (string), `year` (int), `depreciation_pct` (float, positive = weaker). 32 rows.

### sovereign_rating_changes
Composite sovereign credit rating actions from major agencies. Fields: `country` (string), `date` (YYYY-MM string), `action` (enum: affirm, downgrade, upgrade, default), `rating_level` (string, S&P-style notation). 31 rows.

## Data Notes
- Rating levels are simplified composites and may not exactly match any single agency's scale.
- Currency depreciation is cumulative from Jan 2021, not year-over-year.
- Sri Lanka and Ghana entered selective default during the observation period.
- External debt figures are estimates rounded to one decimal place.