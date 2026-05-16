# Global Fuel Price Trends (1970–2026)

## About the Dataset

This dataset, sourced from Kaggle (minahilfatima12328/global-fuel-price-trends-19702026), provides a monthly time series of crude oil prices spanning from January 1970 through 2026. It is designed to support historical analysis, data visualization, and trend identification in the global energy sector. The dataset is particularly useful for researchers, data science learners, and analysts investigating long-term fuel price dynamics shaped by geopolitical events, global demand shifts, and macroeconomic conditions.

- **File**: `fuel_prices_1970_2026.csv`
- **Total Rows**: 675
- **Total Columns**: 2
- **Granularity**: Monthly observations
- **Time Span**: Approximately January 1970 to mid-2026

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `Date` | String | The date of the observation in `YYYY-MM-DD` format. Each entry represents the first day of a given month (e.g., `1970-01-01` represents January 1970). This column serves as the time axis for the entire dataset. |
| `Crude_Oil_Price` | Float | The crude oil price for the corresponding month, expressed in US dollars per barrel (USD/bbl). This is the primary metric of the dataset and reflects the global benchmark price of crude oil. |

## Key Column Details

### Date
The `Date` column is stored as a string and follows the ISO 8601 date format (`YYYY-MM-DD`). All dates correspond to the first day of each month, providing a consistent monthly cadence. With 675 rows, the dataset covers approximately 56 years of monthly data. Analysts should parse this column into a proper datetime type for time series operations such as resampling, rolling calculations, and period-based grouping.

### Crude_Oil_Price
The `Crude_Oil_Price` column contains the monthly crude oil price in US dollars. Early values in the dataset (e.g., $1.21 in January 1970) reflect the historically low and stable prices of the pre-oil-crisis era. Over the decades, prices have experienced dramatic swings — from the oil embargoes of the 1970s, the price collapse of the mid-1980s, the spike preceding the 2008 financial crisis, the shale revolution of the 2010s, the COVID-19 demand shock in 2020, and subsequent recovery. The dataset may include projected or estimated values for the most recent months approaching 2026.

## Data Quality Notes

- **Missing Values**: Based on the row count of 675 for a dataset spanning roughly 56 years (which would yield approximately 672 monthly observations), the data appears largely complete. However, analysts should verify whether any months contain null or anomalous values in the `Crude_Oil_Price` column.
- **String Date Column**: The `Date` column is stored as a string rather than a native date type. It must be converted to a datetime format before performing any time-based analysis.
- **Forward-Looking Data**: Since the dataset title indicates coverage through 2026, some of the later data points may represent forecasts or projections rather than actual observed prices. Analysts should note this distinction when interpreting recent values.
- **Single Variable**: The dataset contains only one numeric variable (crude oil price). All analysis dimensions (yearly trends, decade groupings, volatility windows) must be derived from the `Date` column through feature engineering.
- **Currency**: Prices are assumed to be in nominal US dollars. No inflation adjustment is provided in the raw data; analysts may wish to apply CPI-based deflation for real-price comparisons across decades.

## Suggested Use

This dataset is well-suited for time series trend analysis, volatility studies, decade-based comparative analysis, and historical event correlation. Its simplicity (two columns) makes it accessible for learners while still offering rich analytical depth across more than five decades of global energy pricing history.