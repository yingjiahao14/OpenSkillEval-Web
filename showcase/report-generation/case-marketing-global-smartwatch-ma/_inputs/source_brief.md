# Global Smartwatch Marketplace Insights 2026

## About the Dataset

This dataset contains **3,607 active secondary-market smartwatch listings** scraped from publicly accessible e-commerce platforms in Q1 2026. It covers three major wearable tech brands — **Apple, Garmin, and Samsung** — and is designed for e-commerce trend analysis, consumer electronics pricing modeling, and resale market intelligence.

- **Source:** Kaggle (jahnavikachhia23/global-smartwatch-marketplace-insights-2026)
- **Total Rows:** 3,607
- **Total Columns:** 8
- **File:** `Global_Smartwatch_Marketplace_Insights_2026.csv`

A **$70 USD price floor** was applied during data collection to filter out low-value accessories, replacement bands, and spare parts. Seller identities have been fully anonymized using sequential IDs (`Seller_0001` through `Seller_1754`), preserving relational analysis capability while ensuring privacy.

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `brand` | String | Standardized manufacturer name. Expected values: Apple, Garmin, Samsung. Cleaned from raw listing text using NLP normalization. |
| `condition` | String | Item condition as listed by the seller. Expected values include "New" and "Used" (and potentially other condition grades). |
| `Case_Size_mm` | Float | Physical watch face diameter in millimeters, extracted from unstructured listing titles via regex/NLP. **Contains missing values** — not all listings include case size information in their titles. |
| `Country` | String | Country where the listing is posted or the seller is located. Multiple countries represented (e.g., Japan, Canada, United States, etc.). |
| `price` | Float | Listing price in USD. Minimum value is approximately $70 due to the scraping filter. |
| `Seller_ID` | String | Anonymized seller identifier (e.g., `Seller_0001`). Maps to 1,754 unique sellers. Enables seller-volume and power-seller analysis without revealing identities. |
| `Is_Worldwide_Shipping` | Integer | Binary flag: `1` = seller offers worldwide shipping, `0` = domestic/limited shipping only. |
| `title` | String | Original listing title text (may be truncated). Contains unstructured product descriptions, model names, and specifications as entered by sellers. |

## Data Quality Notes

1. **Missing `Case_Size_mm` values:** This column has significant missing data, as case size could only be extracted when sellers included dimensions in their listing titles. Analysts should handle nulls appropriately — the sample data shows multiple rows with blank Case_Size_mm values.
2. **Brand standardization:** Brand names have been cleaned from raw text that originally contained emojis, typos, and promotional text. The cleaned values should be consistent categorical labels.
3. **Price floor:** All listings are ≥ ~$70 USD by design. There are no extremely low-value entries, but high-value outliers may exist for premium models.
4. **Title truncation:** The `title` column may contain truncated strings. It can be used for supplementary text analysis but should not be relied upon as a complete product description.
5. **Seller distribution:** With 1,754 unique sellers across 3,607 listings, many sellers have only one listing while some "power sellers" have multiple. This skew is analytically meaningful.

## Key Analysis Angles

- **Brand value retention:** Compare resale pricing across Apple, Garmin, and Samsung.
- **Geographic arbitrage:** Identify countries where specific brands are priced significantly above or below the global median.
- **Size premium:** Quantify the price impact of larger case sizes.
- **Seller behavior:** Distinguish power-seller pricing patterns from casual single-listing sellers.
- **Condition impact:** Measure the premium for new vs. used items across brands and regions.