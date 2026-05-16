# EV Charging & Grid Optimization Data

## About the Dataset

This dataset originates from Kaggle (mjawad17/ev-charging-and-grid-optimization-data) and captures multi-variable interactions within a smart-grid EV charging network. It is designed to support analysis of charging demand prediction, queue optimization, grid load balancing, and renewable energy utilization.

- **Source**: Kaggle
- **Total Rows**: 8,354
- **Total Columns**: 27
- **Time Range**: Data begins from January 1, 2025 and covers a simulated operational period.

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| timestamp | String | Date and time of the record logging (format: M/D/YYYY H:MM) |
| station_id | String | Unique identifier for the charging station (e.g., ST004, ST019) |
| location_type | String | Categorical location: Urban, Highway, Suburban |
| vehicle_id | String | Unique identifier for the electric vehicle (e.g., EV10000) |
| vehicle_type | String | Type of EV: Two-Wheeler, Car, Bus, Sedan, SUV, Truck, etc. |
| arrival_time | String | Exact time the vehicle arrived at the station |
| charging_start_time | String | Time when the active charging session began |
| charging_end_time | String | Time when the active charging session finished |
| waiting_time | Integer | Time spent in queue before charging started (minutes) |
| battery_capacity_kWh | Integer | Total battery capacity of the vehicle (kWh) |
| initial_soc | Float | State of Charge (%) when the vehicle arrived |
| final_soc | Integer | State of Charge (%) upon session completion |
| energy_consumed_kWh | Float | Total energy transferred to the vehicle during the session (kWh) |
| charging_power_kW | Integer | Power delivery rate of the assigned charger (kW) |
| charging_duration | Float | Total time spent actively charging (minutes) |
| queue_length | Integer | Number of vehicles waiting at the station upon arrival |
| station_load | Float | Current electrical load on the station's local grid (kW) |
| electricity_price | Float | Dynamic cost of electricity during the session (currency units) |
| renewable_energy_ratio | Float | Proportion of grid energy from renewable sources (0 to 1) |
| traffic_density | String | Local traffic conditions: Low, Medium, High |
| weather_condition | String | Weather during the session: Clear, Cloudy, Rainy, Snowy, etc. |
| day_of_week | String | Day the session occurred: Monday through Sunday |
| time_slot | String | Categorical time block: Peak, Off-Peak, Mid-Peak |
| charging_demand | Float | Aggregated demand score for the station at that time |
| assigned_charger_id | String | Specific charger unit allocated (e.g., CH1, CH4, CH9) |
| charging_priority | String | Priority level: Low, Medium, High |
| optimization_reward | Float | Synthetic reward metric for reinforcement learning; can be negative |

## Key Notes

- **Temporal columns** (timestamp, arrival_time, charging_start_time, charging_end_time) are stored as strings and will need parsing for time-based analysis.
- **initial_soc** is a float while **final_soc** is an integer, reflecting rounding at session completion.
- **optimization_reward** can be negative, representing suboptimal grid conditions or high costs; positive values indicate favorable optimization outcomes.
- **renewable_energy_ratio** ranges from 0 to 1, where higher values indicate greater renewable energy penetration.
- **electricity_price** varies dynamically and is expected to correlate with time_slot and demand conditions.
- The dataset is synthetic/simulated, designed for machine learning and optimization research. Data quality is generally clean with no explicitly documented missing values, but analysts should verify completeness during processing.
- **station_id** values like ST004, ST008, ST019 suggest a network of at least 20 stations across different location types.
- **vehicle_type** includes a diverse fleet from Two-Wheelers to Buses, each with different battery capacities and charging profiles.

## Analysis Potential

The dataset supports multi-dimensional analysis across temporal patterns (day_of_week, time_slot), spatial dimensions (station_id, location_type), vehicle characteristics (vehicle_type, battery_capacity_kWh), environmental factors (weather_condition, traffic_density), and economic variables (electricity_price, renewable_energy_ratio). The optimization_reward column provides a composite signal for evaluating grid optimization strategies.