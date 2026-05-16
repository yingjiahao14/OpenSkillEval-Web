# Amazon Sales Dataset

## About the Dataset

This dataset originates from **Kaggle** (karkavelrajaj/amazon-sales-dataset) and contains information on **1,400+ Amazon products** including their pricing, discounts, customer ratings, and user reviews as listed on the official Amazon India website. It is a snapshot of product catalog data useful for e-commerce analytics, pricing strategy evaluation, and customer sentiment analysis.

- **Source:** Kaggle — Amazon Sales Dataset
- **Total Rows:** 1,465
- **Total Columns:** 16
- **Domain:** E-commerce (Amazon India)

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `product_id` | String | Unique Amazon product identifier (ASIN format, e.g., "B07JW9H4J1"). |
| `product_name` | String | Full product name/title as displayed on Amazon. May be truncated. |
| `category` | String | Hierarchical product category path separated by pipe characters (`|`). Example: `Computers&Accessories|Accessories&Peripherals|Cables&Accessories`. Contains both top-level and sub-level categories. |
| `discounted_price` | String | Current selling price in Indian Rupees. Stored as string with currency symbol and commas (e.g., "₹399"). **Requires cleaning** — remove `₹` symbol and commas, then convert to numeric. |
| `actual_price` | String | Original/list price in Indian Rupees. Same string format as `discounted_price`. **Requires cleaning** before numeric analysis. |
| `discount_percentage` | String | Discount offered as a percentage string (e.g., "64%"). **Requires cleaning** — remove `%` symbol and convert to numeric. |
| `rating` | Float | Average customer rating on a 1.0–5.0 scale. This is the only natively numeric column. Some values may be missing or malformed (e.g., pipe-separated). |
| `rating_count` | String | Total number of customer ratings/votes. Stored as string with commas (e.g., "24,269"). **Requires cleaning** — remove commas and convert to integer. Some entries may be missing. |
| `about_product` | String | Product description/feature bullets. Long text field. |
| `user_id` | String | Comma-separated list of reviewer user IDs for the product. Multiple reviewers per row. |
| `user_name` | String | Comma-separated list of reviewer names corresponding to `user_id`. |
| `review_id` | String | Comma-separated list of review identifiers. |
| `review_title` | String | Comma-separated short review headlines from multiple users. |
| `review_content` | String | Comma-separated full review texts from multiple users. Useful for sentiment analysis. |
| `img_link` | String | URL to the product image on Amazon. |
| `product_link` | String | URL to the product page on Amazon India. |

## Key Data Quality Notes

1. **Currency & Percentage Columns Are Strings:** The columns `discounted_price`, `actual_price`, `discount_percentage`, and `rating_count` all contain formatted strings with symbols (₹, %, commas). These must be parsed and converted to numeric types before any quantitative analysis.
2. **Hierarchical Category Field:** The `category` column uses pipe (`|`) delimiters to encode a multi-level category hierarchy. Analysts should split this field to extract top-level categories (e.g., "Computers&Accessories", "Electronics", "Home&Kitchen") and sub-categories for meaningful grouping.
3. **Multi-Value Review Fields:** The `user_id`, `user_name`, `review_id`, `review_title`, and `review_content` columns contain comma-separated values representing multiple reviewers per product row. This means the dataset is structured at the **product level**, not the review level. Counting unique reviewers requires splitting these fields.
4. **Potential Missing Values:** The `rating` column may contain null or malformed entries. The `rating_count` field may also have missing values for some products. Handle these appropriately during analysis.
5. **Indian Market Context:** All prices are in Indian Rupees (₹). The product links point to amazon.in, indicating this dataset reflects the Indian Amazon marketplace.

## Suggested Use

This dataset is well-suited for category performance benchmarking, pricing and discount strategy evaluation, customer rating distribution analysis, and lightweight review sentiment exploration. The hierarchical category structure enables multi-level drill-down analysis across product segments.