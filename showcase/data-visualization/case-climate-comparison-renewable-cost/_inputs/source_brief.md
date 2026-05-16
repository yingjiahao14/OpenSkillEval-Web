# Renewable Energy Cost Revolution: LCOE, Capacity & Fossil Fuel Subsidies (2010–2024)

## Overview
This collection of four datasets tracks the economic transformation of the global energy sector from 2010 to 2024. It covers the declining levelized cost of energy for solar PV, onshore wind, and battery storage; the cost range of new fossil fuel generation; cumulative renewable installed capacity; and annual global fossil fuel subsidies.

## Data Source

### lcoe_trends
Annual LCOE values for three technologies: `solar_pv`, `onshore_wind`, and `battery_storage`. All values in 2023 real USD per MWh. 15 rows (2010–2024). Solar PV ranges from 359 to 33; onshore wind from 95 to 35; battery storage from 1,100 to 102.

### fossil_fuel_lcoe_range
Biennial LCOE ranges for new-build gas CCGT (`gas_ccgt_low`, `gas_ccgt_high`) and coal (`coal_low`, `coal_high`). 8 rows at even-year intervals. Values in 2023 real USD/MWh. These define the reference band against which renewable crossover points are identified.

### installed_capacity
Cumulative global installed capacity in GW for `solar_pv_gw` and `onshore_wind_gw`. 15 rows (2010–2024). Solar PV grows from 40 to 1,950 GW; onshore wind from 178 to 960 GW.

### fossil_fuel_subsidies
Annual global fossil fuel subsidies in nominal billion USD, split into `consumption_subsidies_bn` and `production_subsidies_bn`, with a `total_subsidies_bn` sum. 15 rows (2010–2024). Total ranges from ~290 to ~700 billion.

## Data Notes
- LCOE figures are illustrative estimates aligned with IRENA and BloombergNEF reporting trends but rounded for clarity.
- Battery storage LCOE reflects 4-hour lithium-ion systems.
- 2022 spike in fossil LCOE and subsidies reflects the global energy price crisis.
- Fossil fuel subsidy estimates cover direct government subsidies only; implicit subsidies (e.g., unpriced externalities) are excluded.
- 2024 values are preliminary estimates.