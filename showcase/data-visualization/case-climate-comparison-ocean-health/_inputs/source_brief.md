# Ocean Health Multi-Indicator Time Series (1990–2024)

## Overview
Four global ocean health indicators tracked biennially from 1990 to 2014 and annually from 2015 to 2024, each with distinct units and trend directions, designed to illustrate the compound stress on marine ecosystems.

## Data Source

### sea_surface_temperature_anomaly
- **Fields**: `year` (integer, 1990–2024), `anomaly_c` (float, °C relative to 1961–1990 baseline)
- **Range**: 0.04 to 0.91 °C
- **Trend**: Generally increasing with interannual variability; sharp rise post-2022

### ocean_ph
- **Fields**: `year` (integer, 1990–2024), `ph` (float, dimensionless pH scale)
- **Range**: 8.034 to 8.110
- **Trend**: Steady decline (increasing acidity); narrow numerical range requiring fine-scale axis

### coral_cover
- **Fields**: `year` (integer, 1990–2024), `cover_pct` (float, percentage of reef area)
- **Range**: 11.5% to 33.5%
- **Trend**: Long-term decline with a notable drop during the 1998 bleaching event and accelerating loss after 2015

### ocean_plastic_pollution
- **Fields**: `year` (integer, 1990–2024), `plastic_mmt` (float, million metric tons cumulative)
- **Range**: 25 to 255 million metric tons
- **Trend**: Near-exponential growth throughout the period

## Data Notes
- Temperature anomalies are modeled global means; regional values vary significantly.
- Ocean pH values represent open-ocean surface averages; coastal and deep-water pH differ.
- Coral cover estimates are synthesized from GCRMN-style monitoring and carry ±2–4% uncertainty.
- Plastic pollution figures are cumulative stock estimates and include modeled seafloor accumulation, which is the largest and most uncertain component.