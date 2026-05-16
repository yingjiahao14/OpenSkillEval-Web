# Chocolate Sales Dataset (2023–2024)

## About the Dataset

This dataset contains **1,000,000 synthetic retail transaction records** for chocolate product sales spanning the years 2023 and 2024. It was sourced from Kaggle (ssssws/chocolate-sales-dataset-2023-2024) and is designed to simulate realistic FMCG (Fast-Moving Consumer Goods) retail patterns.

The dataset follows a **star schema** design with a central fact table (`sales.csv`) and four dimension tables (`products.csv`, `stores.csv`, `customers.csv`, `calendar.csv`). For this benchmark, the primary file to analyze is `sales.csv`, which should be enriched by joining with the dimension tables.

## File: sales.csv

- **Rows:** 1,000,000
- **Columns:** 11

| Column Name | Type | Description |
|---|---|---|
| `order_id` | String | Unique order identifier (e.g., `0RD00000001`). One row per transaction. |
| `order_date` | String (YYYY-MM-DD) | Date of the purchase, ranging from 2023-01-01 to 2024-12-31. |
| `product_id` | String | Foreign key linking to the products dimension (e.g., `P0080`). |
| `store_id` | String | Foreign key linking to the stores dimension (e.g., `S093`). |
| `customer_id` | String | Foreign key linking to the customers dimension (e.g., `C040749`). |
| `quantity` | Integer | Number of items sold in the transaction (typically 1–10). |
| `unit_price` | Float | Price per unit in currency (e.g., 14.43). |
| `discount` | Float | Discount rate applied to the transaction (0.0 = no discount; e.g., 0.15 = 15%). |
| `revenue` | Float | Total revenue after discount: `quantity × unit_price × (1 - discount)`. |
| `cost` | Float | Estimated product cost for the transaction. |
| `profit` | Float | Profit from the transaction: `revenue - cost`. |

## Dimension Tables

### products.csv
Contains product details: `product_id`, `product_name`, `brand`, `category`, `cocoa_percent`, `weight_g`. Use this to analyze performance by brand, category, or cocoa percentage.

### stores.csv
Contains store details: `store_id`, `store_name`, `city`, `country`, `store_type`. Use this to perform geographic and store-type comparisons.

### customers.csv
Contains customer demographics: `customer_id`, `age`, `gender`, `loyalty_member` (boolean), `join_date`. Use this to segment customers by age group, gender, and loyalty status.

### calendar.csv
Contains date attributes: `date`, `year`, `month`, `day`, `week`, `day_of_week`. Use this for time-based aggregations and seasonality analysis.

## Data Quality Notes

- The dataset is **synthetically generated** and intended for educational and portfolio purposes.
- The `order_date` column is stored as a string and should be parsed to a date type for time-series analysis.
- The `discount` column contains values of 0.0 for transactions with no discount applied; non-zero values represent percentage discounts (e.g., 0.10 = 10%).
- Revenue is pre-calculated as `quantity × unit_price × (1 - discount)`. Profit is `revenue - cost`.
- No missing values are expected in the core fact table, but validation is recommended.
- Foreign keys (`product_id`, `store_id`, `customer_id`) should join cleanly with their respective dimension tables.

## Analytical Scope

The dataset supports a wide range of analyses including sales trend analysis over time, product and brand performance comparison, store and geographic benchmarking, discount effectiveness evaluation, and customer segmentation by demographics and loyalty status.