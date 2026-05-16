# Airbnb Listings: NYC, London, Paris, Tokyo & More

## About the Dataset

This dataset contains **292,802 Airbnb listings** across **10 of the world's most visited cities**: New York, London, Paris, Barcelona, Tokyo, Los Angeles, Amsterdam, Bangkok, Rome, and Sydney. The data is compiled from [Inside Airbnb](http://insideairbnb.com) and is licensed under CC BY 4.0. It comprises **20 columns** covering listing details, host information, location, pricing, review activity, and availability.

The dataset is stored in a single CSV file: `airbnb_top_cities.csv`.

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `id` | Integer | Unique listing identifier |
| `name` | String | Listing title/name as displayed on Airbnb |
| `host_id` | Integer | Unique identifier for the host |
| `host_name` | String | First name of the host |
| `neighbourhood_group` | Integer | Higher-level geographic grouping (e.g., borough); **frequently missing/empty** for many cities |
| `neighbourhood` | String | Specific neighbourhood where the listing is located |
| `latitude` | Float | Latitude coordinate of the listing |
| `longitude` | Float | Longitude coordinate of the listing |
| `room_type` | String | Type of accommodation. Values: `Entire home/apt`, `Private room`, `Shared room`, `Hotel room` |
| `price` | Float | Nightly price in local-equivalent USD. **Some values are missing** (null/blank) |
| `minimum_nights` | Integer | Minimum number of nights required for a booking |
| `number_of_reviews` | Integer | Total cumulative number of reviews for the listing |
| `last_review` | String | Date of the most recent review (format: `YYYY-MM-DD`). Blank if no reviews exist |
| `reviews_per_month` | Float | Average number of reviews received per month. Null if no reviews |
| `calculated_host_listings_count` | Integer | Number of listings the host has in the dataset (calculated field) |
| `availability_365` | Integer | Number of days the listing is available for booking in the next 365 days (0–365) |
| `number_of_reviews_ltm` | Integer | Number of reviews received in the last twelve months |
| `license` | Integer | License/registration number indicator; **mostly empty or zero** for many cities |
| `city` | String | City identifier. Values: `New York`, `London`, `Paris`, `Barcelona`, `Tokyo`, `Los Angeles`, `Amsterdam`, `Bangkok`, `Rome`, `Sydney` |
| `scrape_date` | String | Date the data was scraped (format: `YYYY-MM-DD`) |

## Data Quality Notes

- **Missing prices**: The `price` column has null values for some listings (see sample row 4). These should be handled carefully — either excluded or flagged — when computing price statistics.
- **neighbourhood_group**: This column appears to be empty or null for most cities (London rows in the sample show blank values). It may only be populated for cities like New York that have well-defined borough structures. Analysts should verify population before relying on it.
- **license**: Largely empty or zero. Not useful for most analyses.
- **last_review and reviews_per_month**: Null for listings with zero reviews. These listings represent properties that have never been booked (or never received a review).
- **Scrape date**: The data appears to be from a single recent scrape (sample shows `2026-03-29`), so it represents a snapshot rather than a time series.
- **Price currency**: Prices are assumed to be normalized to a common currency (USD) by the data compiler, but this should be verified during analysis as the original Inside Airbnb data uses local currencies.

## Suggested Use

This dataset is well-suited for cross-city market comparison, pricing analysis by room type and neighbourhood, host portfolio analysis (identifying professional vs. casual hosts), and demand estimation via review metrics. The geographic coordinates also enable spatial analysis and mapping.