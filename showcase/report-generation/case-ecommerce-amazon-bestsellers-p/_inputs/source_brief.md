# Amazon Bestsellers: Price vs User Rating Analysis (2009–2019)

## About the Dataset

This dataset captures the **50 bestselling books on Amazon for each year from 2009 to 2019**, providing an 11-year window into consumer preferences and market dynamics in the book retail industry. The data was originally curated from Amazon's public bestseller lists.

- **Source:** Kaggle (obaidhere/amazon-bestsellers-price-vs-user-rating-analysis)
- **Total Records:** 550 rows (50 books × 11 years)
- **Total Columns:** 7
- **File:** `bestsellers with categories.csv`

Note: The filename contains spaces, so care should be taken when loading the file programmatically.

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| Name | String | Title of the book. Some titles may be truncated with ellipsis ("..."). A single book can appear in multiple years if it achieved bestseller status more than once. |
| Author | String | Name of the book's author or creator (e.g., "Stephen King", "National Geographic Kids"). |
| User Rating | Float | Average customer rating on a scale of 0 to 5, typically ranging from approximately 3.3 to 4.9 in this dataset. |
| Reviews | Integer | Total number of customer reviews/testimonials the book has received. Ranges from a few hundred to over 80,000. |
| Price | Integer | Retail price of the book in US dollars. Prices range from $0 (free promotional titles) to approximately $105. |
| Year | Integer | The year the book achieved bestseller status, ranging from 2009 to 2019. |
| Genre | String | Book category, with exactly two possible values: **"Fiction"** or **"Non Fiction"**. Note the space in "Non Fiction" (no hyphen). |

## Key Data Characteristics

### Duplicate Entries by Design
Because the dataset records the top 50 bestsellers **per year**, the same book can appear in multiple rows if it was a bestseller in more than one year. For example, a perennial classic like *1984* may appear in several years. When analyzing unique books vs. annual appearances, this distinction is important.

### Genre Distribution
The 550 records are split between Fiction and Non-Fiction. The balance between these two genres across years is an important dimension for analysis.

### Rating Distribution
User ratings in this dataset are generally high (most above 4.0), which is expected since these are bestselling books that have already been validated by the market. The narrow range of ratings means that even small differences (e.g., 4.5 vs. 4.7) can be meaningful.

### Price Range
Prices are stored as integers (whole dollar amounts). The range is wide — from free/very cheap books to premium-priced titles over $100 — providing a good basis for price-rating correlation analysis.

### Review Counts
Review counts vary dramatically (from hundreds to tens of thousands), reflecting differences in book popularity and how long a title has been available. High review counts may correlate with repeated bestseller appearances.

## Data Quality Notes

- **No missing values** have been reported in this dataset; all 550 rows appear to be complete.
- **Encoding:** Standard UTF-8. Some book titles contain special characters (colons, parentheses, commas, numbers).
- **Price = 0:** A small number of books may have a price of $0, likely representing free Kindle editions or promotional pricing.
- **Author name consistency:** Author names appear to be consistently formatted, but the same author may have multiple books in the dataset.

This dataset is well-suited for exploratory analysis of pricing strategies, genre-based comparisons, temporal trends, and the relationship between price and customer satisfaction in the book retail market.