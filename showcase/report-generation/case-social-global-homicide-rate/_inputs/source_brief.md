# Global Intentional Homicide Rates by Country

## About the Dataset

This dataset, sourced from **Kaggle** (lucalullo/global-homicide-rates-by-country), contains global intentional homicide rates by country, year, sex, and age group spanning from **1990 to 2023**. The underlying data are derived from the **United Nations Office on Drugs and Crime (UNODC) Crime Trends Survey (CTS)**, which reports victims of intentional homicide per 100,000 population.

- **File**: `tassi-di-omicidi-globali-per-paese.csv`
- **Total rows**: 22,092
- **Total columns**: 6

Each row represents a unique combination of country, year, sex, and age group, making this a rich multi-dimensional panel dataset suitable for trend analysis, demographic breakdowns, and cross-country comparisons.

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `iso_code` | String | Three-letter ISO country or territory code (e.g., "AFG" for Afghanistan, "USA" for United States). |
| `country` | String | Full name of the country or territory. |
| `year` | Integer | Year of observation, ranging from 1990 to 2023. |
| `sex` | String | Sex category of victims. Possible values: **"both"** (total), **"male"**, **"female"**. |
| `age_group` | String | Age category. Includes **"ALL"** for total population and specific age ranges (e.g., "0-14", "15-29", "30-44", "45-59", "60+", among others depending on country reporting). |
| `homicide_rate` | Float | Victims of intentional homicide per 100,000 population. This is the primary metric of interest. |

## Key Column Details

### `sex`
Three distinct values allow analysis of overall rates (`both`) as well as gender-disaggregated rates (`male`, `female`). Not all countries report sex-disaggregated data for every year.

### `age_group`
The value `"ALL"` represents the total population rate. Specific age ranges vary by country and year. Analysts should filter on `"ALL"` for country-level comparisons and use specific age groups for demographic deep-dives.

### `homicide_rate`
This is a continuous variable measured per 100,000 population. Values range from near zero (very safe countries) to potentially over 50 or higher in the most affected nations. The metric is directly comparable across countries due to population normalization.

## Data Quality Notes

1. **Unbalanced panel**: This is critically important. Not all countries have observations for every year. Coverage depends on national reporting systems and data availability. Some countries may have only a handful of years while others have near-complete time series.

2. **Missing data**: Years with no available data were left as missing (i.e., rows are simply absent) and were **not interpolated**. Analysts should be cautious when computing averages or trends, as the set of reporting countries changes year to year.

3. **United Kingdom caveat**: UK data refer to **England and Wales only**, as reported in the original UNODC dataset. Scotland and Northern Ireland are reported separately in the source but may appear as distinct entries.

4. **Territories**: Some territories are included separately when reported by the original source (e.g., Hong Kong, Macao, Puerto Rico). These should not be double-counted with their parent countries.

5. **No null encoding issues**: The `homicide_rate` column contains valid float values where data exists; rows without data are simply omitted from the dataset.

## Suggested Analytical Approaches

- Filter `sex = 'both'` and `age_group = 'ALL'` for high-level country comparisons.
- Use year-over-year analysis cautiously, accounting for reporting gaps.
- Leverage the sex and age_group dimensions for demographic disparity analysis.
- Group countries by region (using ISO codes or external mappings) for regional trend analysis.
