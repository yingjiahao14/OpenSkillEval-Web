# Nike Inc. (NKE) Historical Stock Price Dataset

## About the Dataset

This dataset contains **historical daily stock prices and trading volumes** for Nike Inc. (NKE), one of the world's largest athletic footwear and apparel companies. The data spans from **January 3, 2000 through early 2026**, providing over two decades of market data suitable for financial analysis, time series forecasting, and investment research.

- **Source:** Kaggle — hassanjameelahmed/nike-nke-stock-market-analysis
- **Total Rows:** 6,559 (each representing one trading day)
- **Total Columns:** 6
- **File:** `NKE.csv`

## Column Schema

| Column Name | Type    | Description |
|-------------|---------|-------------|
| Date        | String  | The trading date in M/D/YYYY format (e.g., "1/3/2000"). Represents each market trading day; weekends and holidays are excluded. |
| Close       | Float   | The adjusted closing price of NKE stock for that trading day, in USD. This is the primary price used for return calculations and trend analysis. |
| High        | Float   | The highest price at which NKE traded during the trading day, in USD. Useful for intraday range and volatility analysis. |
| Low         | Float   | The lowest price at which NKE traded during the trading day, in USD. Together with High, defines the daily price range. |
| Open        | Float   | The opening price of NKE stock at market open for that trading day, in USD. |
| Volume      | Integer | The total number of shares traded during the trading day. Volume is a key indicator of market interest and liquidity. |

## Key Notes on the Data

### Price Values
The price columns (Close, High, Low, Open) appear to be **adjusted for stock splits and dividends**. Early values in 2000 are in the range of approximately $4–$5, which reflects retroactive adjustment rather than the nominal price at the time. This is standard practice for long-horizon stock datasets and ensures that return calculations are accurate across the full period. By the later years in the dataset, prices are significantly higher, reflecting Nike's substantial long-term appreciation.

### Date Format
The `Date` column is stored as a **string** in `M/D/YYYY` format. Parsing this column into a proper datetime type is necessary before performing any time-based analysis, sorting, or resampling (e.g., monthly or yearly aggregation).

### Volume
Trading volume values range from the low millions to tens of millions of shares per day. Volume patterns can shift over time due to changes in market microstructure, index inclusion, and overall market conditions.

### Data Quality
- The dataset appears to be **clean and complete** with 6,559 rows covering approximately 26 years of trading days.
- No explicit mention of missing values; however, analysts should verify there are no gaps in the trading day sequence.
- All numeric columns are continuous (float for prices, integer for volume).

### Coverage Period
The dataset covers a rich period of financial history including the **dot-com bust (2000–2002)**, the **2008 Global Financial Crisis**, the **COVID-19 market crash and recovery (2020)**, and subsequent market dynamics through 2026. This makes it particularly valuable for studying how Nike's stock responded to major macroeconomic events.

### Suggested Preprocessing
- Parse `Date` to datetime and set as index.
- Compute derived features such as daily returns, rolling averages, and daily price range (High − Low).
- Resample to weekly, monthly, or annual frequencies for higher-level trend analysis.