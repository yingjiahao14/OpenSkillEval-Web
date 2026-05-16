# UK Retail Fuel Prices — Price History Dataset

## About the Dataset

This dataset is sourced from **Kaggle (jamesb7/fuel-prices-uk)** and provides UK retail fuel prices at an individual forecourt level, originally collected from the UK Government's official Fuel Finder API. The data is aggregated by [fuelcosts.co.uk](https://fuelcosts.co.uk), a fuel price comparison platform covering over 8,000 petrol stations across England, Scotland, and Wales.

The file `price_history.csv` contains **396,502 rows** and **6 columns**. Each row represents a single fuel price observation at a specific station at a specific point in time.

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `id` | Integer | Unique auto-incrementing identifier for each price record. |
| `node_id` | String | Hashed identifier for the fuel station (forecourt). Each unique value represents a distinct station. These are SHA-style hashes (64+ characters), not human-readable names. |
| `fuel_type` | String | The type of fuel. Known values include: **E10** (standard unleaded petrol), **B7_STANDARD** (standard diesel), **E5** (super unleaded petrol), and potentially premium diesel variants. |
| `price_pence` | Integer | The retail price of the fuel in **pence per litre (PPL)**. Whole number values (e.g., 133 means £1.33/litre). |
| `recorded_at` | String (ISO 8601 datetime) | Timestamp when the price was recorded/collected into the dataset. Format: `YYYY-MM-DDTHH:MM:SS.sssZ`. |
| `source_updated_at` | String (ISO 8601 datetime) | Timestamp when the retailer last updated/reported this price to the government feed. Format: `YYYY-MM-DDTHH:MM:SS.sssZ`. |

## Key Column Details

### fuel_type
The dataset covers multiple fuel types mandated under the UK open data scheme:
- **E10**: Standard unleaded petrol (the default grade at most UK pumps since 2021)
- **B7_STANDARD**: Standard diesel (containing up to 7% biodiesel)
- **E5**: Super unleaded petrol (higher octane, contains up to 5% ethanol)
- Other premium or specialty fuels may also appear

Not all stations sell every fuel type — some may only report E10 and B7_STANDARD.

### node_id
Station identifiers are anonymised hashes. Without a separate station metadata lookup table, individual station names, brands, or geographic locations cannot be determined from this file alone. However, the `node_id` can be used to group records by station and analyse per-station behaviour.

### Timestamps
The difference between `recorded_at` and `source_updated_at` is analytically meaningful. `source_updated_at` reflects when the retailer actually changed or confirmed their price, while `recorded_at` reflects when the data collection system captured it. The lag between these two timestamps can indicate how fresh the data is and how frequently retailers update their feeds.

## Data Quality Notes

- **No missing values** are apparent in the sample, but analysts should verify for nulls across the full 396,502 rows.
- **Price values** are integers in pence. Typical UK fuel prices in early 2026 range roughly from 125 to 165+ pence per litre depending on fuel type and location. Outliers outside this range should be investigated.
- **Timestamps** are in UTC (indicated by the `Z` suffix). All datetime parsing should account for ISO 8601 format.
- The sample data is from **early February 2026**. The full dataset's date range should be confirmed during analysis.
- Since station metadata (brand, address, coordinates) is not included in this CSV, geographic or brand-level analysis is not possible with this file alone.

## Attribution

- Data compiled by fuelcosts.co.uk
- Source data: UK Government Fuel Finder scheme
- License: CC BY 4.0