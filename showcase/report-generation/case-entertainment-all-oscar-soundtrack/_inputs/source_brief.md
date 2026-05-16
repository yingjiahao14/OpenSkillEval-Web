# All Oscar Soundtracks (1934–2026)

## About the Dataset

This dataset provides the definitive record of every Academy Award winner for **Best Original Score**, spanning from the 6th Academy Awards ceremony in 1934 through the 98th ceremony in March 2026. It is sourced from Kaggle (igormerlinicomposer/all-oscar-soundtracks) and maintained by ActarusLab, with data cross-referenced against the Official Academy Awards Database (awardsdatabase.oscars.org), AMPAS press releases, IMDb, and MusicBrainz.

The dataset contains **93 rows** and **3 columns**, with each row representing one ceremony year and its corresponding winning film and composer.

## Column Schema

| Column Name | Type    | Description |
|-------------|---------|-------------|
| `Year`      | Integer | Year of the Academy Awards ceremony. Ranges from 1934 to 2026. Each year appears exactly once. |
| `Film`      | String  | Title of the winning motion picture that received the Best Original Score award. |
| `Composer`  | String  | Name(s) of the award recipient(s). Composer names have been standardized and normalized for consistent analysis. In cases where multiple composers shared the award, they may appear as a combined string. |

## Key Column Details

### Year
The `Year` column represents the ceremony year, not necessarily the film's release year (which is typically the prior calendar year). Values span continuously from 1934 to 2026, yielding 93 entries. Note that the award category has undergone name changes and occasional splits (e.g., separate awards for dramatic and comedy/musical scores in certain years), but this dataset consolidates to one winner per year.

### Film
The `Film` column contains the English-language title of each winning film. Titles are presented in their standard release form. Examples include classics like *The Adventures of Robin Hood* (1938) and modern entries like *Sinners* (2026).

### Composer
The `Composer` column contains standardized composer names. Some composers appear multiple times across different years, reflecting repeat wins. Notable repeat winners in Oscar history include figures such as John Williams, who has won multiple times. The most recent entry is Ludwig Göransson, who won for *Sinners* at the 2026 ceremony — described as his third historic win.

## Data Quality Notes

- **Completeness**: The dataset appears complete with no missing values across all 93 rows and 3 columns.
- **Encoding**: Standard UTF-8 encoding. Some composer names include special characters (e.g., accented letters in names like "Erich Wolfgang Korngold" or "Ludwig Göransson").
- **Standardization**: Composer names have been normalized by the dataset author to ensure consistency (e.g., avoiding variant spellings or abbreviations).
- **Era and Musical_Style columns**: The dataset description references `Era` and `Musical_Style` columns, but these are **not present** in the actual CSV file. Any era-based analysis must be derived by the analyst from the `Year` column using reasonable historical boundaries (e.g., Golden Age: 1934–~1960, Silver Age: ~1960–~1980, Modern: ~1980–~2000, Contemporary: ~2000–2026).
- **Category history**: The Best Original Score category has evolved over time. In some years the Academy split the award into subcategories (e.g., dramatic vs. comedy/musical). This dataset presents one consolidated winner per year.

## Suggested Analysis Approaches

Since the dataset has only three columns, the primary analytical value lies in:
1. **Frequency analysis** of the `Composer` column to identify the most awarded individuals.
2. **Temporal analysis** using the `Year` column to detect patterns, streaks, and decade-level trends.
3. **Cross-referencing** composer win counts with the time span of their careers to understand longevity and dominance.

The dataset is compact but historically rich, making it ideal for narrative-driven trend analysis.