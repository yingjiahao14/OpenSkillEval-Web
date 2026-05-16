# Air Jordan Sneaker Market & Resale Data (2023–2026)

## About the Dataset

This dataset originates from Kaggle (abdullahmeo/air-jordan-sneaker-market-and-resale-data2023-2026) and contains **5,000 synthetically generated sales records** spanning from 2023 to 2026. It models realistic secondary-market behaviors for Air Jordan sneakers, capturing how a shoe's model, colorway, physical condition, and sales channel influence its final resale price and time spent in inventory.

The data bridges global online marketplace dynamics (StockX, GOAT) with independent retail storefronts (e.g., kick hub 2026, Stadium Goods, walk-in retail), providing a comprehensive view of the modern sneaker resale ecosystem.

**File:** `jordan_market_dataset_2026.csv`  
**Rows:** 5,000  
**Columns:** 10

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| Transaction_ID | String | Unique alphanumeric identifier for each sale (e.g., TRX-100001). |
| Sale_Date | String | Date the transaction was completed, formatted as YYYY-MM-DD. Ranges from 2023 to 2026. |
| Shoe_Model | String | The specific Air Jordan silhouette. Examples include "Air Jordan 1 High", "Air Jordan 4 Retro", "Air Jordan 11 Retro", "Air Jordan 1 Low", among others. |
| Colorway | String | The recognized color scheme or collaboration name. Examples: "Lost & Found", "Mocha", "Chicago", "Concord", "Sail", and others. |
| Condition | String | Physical state of the shoe at time of sale. Three possible values: **Deadstock (Brand New)**, **VNDS** (Very Near Deadstock), and **Used**. |
| Retail_Price_USD | Integer | The original Manufacturer's Suggested Retail Price (MSRP) at launch, in US dollars. Varies by model (observed range roughly $130–$250). |
| Resale_Price_USD | Float | The final clearing price paid by the buyer on the secondary market, in US dollars. Can be above or below retail. |
| Sales_Channel | String | The platform or location where the sale occurred. Includes global platforms (StockX, GOAT, Stadium Goods) and independent/local channels (kick hub 2026, walk-in retail, etc.). |
| Days_in_Inventory | Integer | Number of days the shoe sat in the seller's possession before the transaction was completed. Lower values indicate faster turnover. |
| Profit_Margin_USD | Float | The difference between Resale_Price_USD and Retail_Price_USD. Positive values indicate a profit; negative values indicate a loss relative to retail. |

## Key Observations & Data Quality Notes

- **Derived column:** `Profit_Margin_USD` is pre-computed as `Resale_Price_USD - Retail_Price_USD`. Analysts can verify this relationship or compute additional ratios.
- **Date parsing:** `Sale_Date` is stored as a string in YYYY-MM-DD format and should be parsed to a date/datetime type for temporal analysis.
- **Synthetic data:** The dataset is synthetically generated to model realistic market behaviors. There are no reported missing values, but analysts should verify completeness upon loading.
- **Condition categories:** The three condition tiers (Deadstock, VNDS, Used) have a significant impact on pricing. Deadstock items typically command premiums while Used items often sell below retail.
- **Channel diversity:** The mix of large tech-driven marketplaces and smaller independent retailers allows for meaningful channel-level comparisons in pricing power and inventory velocity.
- **Profit margins can be negative:** Many transactions clear below retail price, especially for Used-condition shoes or less sought-after colorways, making the distribution of Profit_Margin_USD an important area of analysis.

This dataset is well-suited for exploratory data analysis, price prediction modeling, and strategic market reporting in the sneaker resale domain.