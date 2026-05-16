# Gold Price Dynamics Dataset

## About the Dataset

**Title:** Gold Price Dynamics  
**Source:** Kaggle — krupalpatel07/gold-price-dynamics  
**Domain:** Financial Markets / Macro Assets  
**Rows:** 6,399  
**Columns:** 6  

This dataset contains daily OHLCV (Open, High, Low, Close, Volume) data for gold priced in US dollars, spanning from August 30, 2000 through approximately early 2025. Gold is one of the most important global macro assets and often reflects risk sentiment, inflation expectations, and macroeconomic stress. The dataset enables a wide range of analyses including trend identification, volatility modeling, regime detection, seasonal decomposition, and liquidity profiling.

## Column Schema

| Column Name | Type    | Description |
|-------------|---------|-------------|
| Date        | String  | Trading date in `DD-MM-YY` format (e.g., "30-08-00" represents August 30, 2000). Requires parsing with an appropriate date format; note the two-digit year encoding. |
| Open        | Float   | Opening price of gold in USD for the trading day. |
| High        | Float   | Highest price of gold in USD reached during the trading day. |
| Low         | Float   | Lowest price of gold in USD reached during the trading day. |
| Close       | Float   | Closing price of gold in USD for the trading day. This is typically the primary price used for return calculations and trend analysis. |
| Volume      | Integer | Number of contracts or units traded on the given day. Represents market liquidity and participation. |

## Key Column Details

- **Date:** The date column uses a `DD-MM-YY` string format. The two-digit year means that "00" maps to 2000, "01" to 2001, etc. Agents should parse this carefully to avoid misinterpretation (e.g., "25" should map to 2025, not 1925). Dates are not perfectly continuous — weekends and market holidays are excluded, as is standard for trading data.

- **Open / High / Low / Close:** These four columns define the daily price bar (candlestick). In the earliest rows of the dataset, Open, High, Low, and Close are sometimes identical, suggesting either flat trading or data sourced from a single daily fixing price. As the dataset progresses into more recent years, these values diverge normally, reflecting intraday price ranges.

- **Volume:** In the early portion of the dataset (roughly 2000–2003), volume values are frequently 0 or very small integers. This likely reflects limitations in the data source for that period rather than actual zero trading activity. Analysts should be cautious when interpreting volume-based metrics for the early years and may consider filtering or flagging low-volume periods.

## Data Quality Notes

1. **Date parsing:** The `DD-MM-YY` format requires explicit format specification during parsing. Default parsers may misinterpret month and day order.
2. **Zero / low volume in early years:** A significant number of rows in the 2000–2003 range have `Volume = 0`. This should be treated as missing or unreliable rather than literal zero activity.
3. **Flat OHLC bars:** Some rows show Open = High = Low = Close, particularly in the earliest period. These may represent single-price fixings or data gaps.
4. **Floating-point precision:** Price values contain typical floating-point artifacts (e.g., 273.8999939 instead of 273.90). Rounding to 2 decimal places is recommended for display.
5. **No missing rows:** All 6,399 rows contain non-null values across all six columns.

## Analytical Potential

The dataset supports a rich set of analyses:
- **Long-term trend analysis** of gold from ~$274 (2000) through multi-thousand-dollar levels
- **Volatility clustering** and regime identification using rolling statistics or clustering algorithms
- **Seasonal decomposition** by month, quarter, or day-of-week
- **Return distribution profiling** including fat tails and skewness
- **Momentum and mean-reversion** signal evaluation
- **Volume-price relationship** analysis (primarily for the post-2003 period where volume data is reliable)
