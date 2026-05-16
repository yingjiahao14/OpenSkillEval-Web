# American Express (AXP) Stock Data (1972–2026)

## About the Dataset

This dataset provides a comprehensive historical record of **American Express Company (ticker: AXP)** daily stock market data spanning from June 1972 through early 2026. It contains **13,556 rows** of daily trading records across **8 columns**, making it one of the longest continuous stock price datasets available for a single U.S. financial services company.

The data was sourced from the Kaggle dataset *"American Express (AXP) Stock Data (1972–2026)"* (anadiskt/american-express-axp-stock-data-19722026). The prices appear to be **adjusted for splits and dividends** (note that early 1972 prices are around $1.22, reflecting retroactive adjustment from the original nominal prices).

## File Information

- **File name:** `axp_stock_prices.csv`
- **Total rows:** 13,556
- **Total columns:** 8

## Column Schema

| Column Name   | Type    | Description |
|---------------|---------|-------------|
| Date          | String  | Trading date with timezone offset (e.g., `1972-06-01 00:00:00-04:00`). Represents each market trading day. |
| Open          | Float   | Opening stock price for the trading day (split/dividend-adjusted). |
| High          | Float   | Highest stock price reached during the trading day (split/dividend-adjusted). |
| Low           | Float   | Lowest stock price reached during the trading day (split/dividend-adjusted). |
| Close         | Float   | Closing stock price for the trading day (split/dividend-adjusted). This is the primary price field for trend analysis. |
| Volume        | Integer | Number of shares traded during the day. Note: early records (1972 era) show volume as 0, likely due to data unavailability for that period. |
| Dividends     | Float   | Dividend amount paid on that date. Most rows are 0.0; non-zero values indicate a dividend distribution event. |
| Stock Splits  | Float   | Stock split ratio on that date. Most rows are 0.0; non-zero values (e.g., 2.0 for a 2-for-1 split) indicate a split event. |

## Data Quality Notes

1. **Date format:** The `Date` column is stored as a string with timezone information (e.g., `-04:00` for Eastern Time). Parsing should account for this format.
2. **Early data sparsity:** Records from the early 1970s have identical Open, High, Low, and Close values and zero Volume, suggesting only closing prices were available for that era. OHLC differentiation and volume data become reliable in later years.
3. **Adjusted prices:** All price columns appear to be retroactively adjusted for stock splits and dividends, meaning the 1972 closing price of ~$1.22 does not reflect the nominal price at that time but rather the adjusted equivalent.
4. **Dividends and Splits columns:** These are event-based — the vast majority of rows contain 0.0. Non-zero entries mark specific corporate action dates.
5. **No missing values** are expected in the numeric columns, but the zero-volume and identical OHLC values in early records should be treated carefully in volatility and volume analyses.

## Coverage & Context

The 50+ year span captures numerous significant economic events including the 1973–74 oil crisis, the 1987 Black Monday crash, the dot-com bubble, the 2008 Global Financial Crisis (where AXP was notably impacted as a financial services firm), the COVID-19 market crash of 2020, and the subsequent recovery. This makes the dataset exceptionally valuable for studying long-term equity performance through multiple market cycles.