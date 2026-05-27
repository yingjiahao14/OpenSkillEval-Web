# U.S. Inflation Spiral Indicators (2021–2024)

## Overview
Four monthly time-series datasets covering January 2021 through December 2024 that together describe the U.S. inflation cycle: consumer price inflation, nominal wage growth, the Federal Reserve's policy rate, and the derived real (inflation-adjusted) wage growth.

## Data Source

### cpi_inflation
Year-over-year CPI-U inflation rate (%). 48 monthly observations. Values range from approximately 1.4% to 9.1%. Source basis: Bureau of Labor Statistics CPI-U All Items.

### wage_growth
Year-over-year growth in average hourly earnings for all private-sector employees (%). 48 monthly observations. Values range from approximately 0.7% to 5.6%. Source basis: Bureau of Labor Statistics Current Employment Statistics.

### federal_funds_rate
Effective federal funds rate (%) at month-end. 48 monthly observations. Values range from approximately 0.06% to 5.33%. Source basis: Federal Reserve Board H.15 Selected Interest Rates.

### real_wage_growth
Derived series: nominal wage growth minus CPI inflation (%). 48 monthly observations. Values range from approximately −3.9% to +4.0%. Positive values indicate purchasing power gains; negative values indicate erosion.

## Data Notes
- CPI and wage figures are year-over-year percentage changes, not seasonally adjusted month-over-month.
- Real wage growth is an arithmetic approximation (nominal − CPI) rather than a geometric deflation.
- Federal funds rate reflects the effective rate, which may differ slightly from the target range midpoint.
- Early 2021 wage data may reflect base-effect distortions from pandemic-era compositional shifts in employment.