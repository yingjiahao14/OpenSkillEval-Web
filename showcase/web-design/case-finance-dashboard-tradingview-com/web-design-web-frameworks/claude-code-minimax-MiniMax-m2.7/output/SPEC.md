# ChartPulse — Track All Markets

## Brand
- **Name:** ChartPulse
- **Tagline:** "Every trade a #ChartPulse trade"
- **Promise:** Free to sign up — $0 forever, no credit card needed. Join 100 million traders.
- **Colors:**
  - Primary Dark: `#0F0F0F`
  - Accent Blue: `#2962FF`
  - Negative/Red: `#F7525F`
  - Positive/Green: `#22C55E`

## Visual Direction
- **Dark-mode first** — deep charcoal backgrounds (`#0F0F0F`, `#1a1a2e`)
- **Vibrant accents:** Green for gains, red for losses, blue for primary actions
- **Typography:** Inter (Google Font), clean sans-serif
- **Layout:** Dense information, data-heavy — traders want data density, not whitespace
- **Visual language:** Mini sparkline charts, color-coded percentage badges, compact tables

## Page Structure

### 1. index.html (Home)
- **Hero:** "The best trades require research, then commitment." with CTAs
- **Market Summary Bar:** Tabs for US stocks, Crypto, Futures, Forex, Economy, Brokers
- **Community Ideas:** Editors' picks / Popular tabs with idea cards
- **Indicators & Strategies:** Editors' picks / Popular tabs
- **Top Stories:** Financial news headlines
- **Trending Stocks:** Community trending stocks list
- **Trade Ideas:** Bullish/Bearish idea cards
- **Footer:** Navigation links organized by category

### 2. chart.html (Chart Workspace)
- **Toolbar:** Drawing tools, indicators, chart types, timeframe toggles (1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All)
- **Candlestick Chart:** Large interactive chart area with candlestick rendering
- **Watchlist Sidebar:** Accordion categories (Indices, Stocks, Futures, Forex, Crypto)
- **Stock Detail Panel:**
  - Tabs: Overview, Financials, KPIs
  - Financials sub-tabs: Income Statement (Annual/Quarterly), Balance Sheet, Cash Flow
- **Key Stats:** Price, change, volume, market cap, earnings
- **Financials:** Dividend yield, payout ratio, analyst rating, price targets

### 3. ideas.html (Community Ideas)
- **Header Filters:** Popular / Editors' picks tabs, Videos toggle
- **Idea Feed:** Card grid with author, ticker, sentiment, price targets, charts
- **Pagination:** Page navigation

### 4. markets.html (Markets Overview)
- **Market Tabs:** Indices, US stocks, Crypto, Futures, Forex, Bonds, ETFs, Economy
- **US Market Indices Table:** All major indices with prices and changes
- **World Stocks Table:** Top companies with sparklines
- **Stock Movers:** Gainers/Losers with Regular hours, Pre-market, After-hours tabs
- **Crypto Section:** Bitcoin, Ethereum prices and dominance
- **Forex Table:** Major currency pairs
- **Government Bonds:** Yield curve data
- **Corporate Bonds:** High-yield bond listings
- **Earnings Calendar:** Today's earnings with actual vs estimate
- **Chart Type Toggle:** 1D, 1M, 3M, 1Y, 5Y, All, Area, Candles

### 5. brokers.html (Broker Comparison)
- **Hero:** Platform stats (100M+ traders, millions daily orders)
- **Broker Filters:** Category tabs (All, Stocks, Crypto, Forex, Futures, ETFs, Options)
- **Broker Listings:** Cards with tier badges (Platinum/Gold), ratings, reviews, accounts, promotions
- **Rating Tabs:** Best rated / All brokers

## Interactions
- **Tab switching:** All pages use tabs to filter content
- **Watchlist accordion:** Click category headers to expand/collapse
- **Timeframe toggles:** Chart updates on range selection
- **Video toggle:** Filter ideas by video content
- **Trading session tabs:** Regular hours, Pre-market, After-hours

## Data Sources (from source_brief.md)
All market data, stock prices, financial metrics, broker listings as specified in source_brief.md.

## Technical Approach
- Single HTML files with embedded CSS and JavaScript
- No build step required — opens directly in browser
- Vanilla JavaScript for interactivity
- CSS Grid and Flexbox for layouts
- CSS custom properties for theming
- Google Fonts (Inter) via CDN
- Chart.js for candlestick charts (via CDN)
- RemixIcon for icons (via CDN)
