// ChartPulse Site Configuration
export const siteConfig = {
  name: "ChartPulse",
  tagline: "Track All Markets",
  description: "A supercharged charting platform and social network for traders and investors to analyze, discuss, and trade global markets.",
  brand: {
    dark: "#0F0F0F",
    accent: "#2962FF",
    negative: "#F7525F",
    positive: "#00C853",
  },
  hero: {
    badge: "100M+ Traders",
    title: "The best trades require research, then commitment.",
    subtitle: "Where the world charts, chats, and trades markets. A supercharged super-charting platform and social network for traders and investors.",
    cta: { text: "Get started for free", href: "#" },
    secondaryCta: { text: "Explore features", href: "#" },
  },
  nav: [
    { label: "Products", href: "chart.html", items: [
      { label: "Supercharts", href: "chart.html" },
      { label: "Screeners", href: "markets.html" },
      { label: "Pine Script", href: "#" },
      { label: "Heatmaps", href: "#" },
      { label: "Calendars", href: "markets.html" },
    ]},
    { label: "Community", href: "ideas.html", items: [
      { label: "Social Network", href: "ideas.html" },
      { label: "Ideas", href: "ideas.html" },
      { label: "Indicators & Strategies", href: "#" },
      { label: "Editors' Picks", href: "ideas.html" },
    ]},
    { label: "Markets", href: "markets.html", items: [
      { label: "Stocks", href: "markets.html" },
      { label: "ETFs", href: "markets.html" },
      { label: "Crypto", href: "markets.html" },
      { label: "Forex", href: "markets.html" },
      { label: "Futures", href: "markets.html" },
      { label: "Bonds", href: "markets.html" },
    ]},
    { label: "Brokers", href: "brokers.html" },
  ],
  footer: {
    products: ["Supercharts", "Screeners", "Pine Script", "Heatmaps", "Calendars"],
    community: ["Social Network", "Ideas", "Indicators & Strategies", "Editors' Picks"],
    markets: ["Stocks", "ETFs", "Crypto", "Forex", "Futures", "Bonds", "Economy"],
    brokers: ["Top Brokers", "Broker Comparison", "Special Offers"],
    company: ["About", "Blog", "Careers", "Media Kit"],
    legal: ["Terms of Use", "Privacy Policy", "Cookies Policy", "Disclaimer"],
  },
  stats: {
    traders: "100M+",
    tagline: "Every trade a #ChartPulse trade",
  },
};

// Market Data
export const marketData = {
  indices: [
    { name: "S&P 500", ticker: "SPX", price: "7,041.29", change: "+0.26%", currency: "USD" },
    { name: "Nasdaq 100", ticker: "NDX", price: "26,333.00", change: "+0.49%", currency: "USD" },
    { name: "Japan 225", ticker: "NI225", price: "58,475.90", change: "−1.75%", currency: "JPY" },
    { name: "SSE Composite", ticker: "000001", price: "4,051.4254", change: "−0.10%", currency: "CNY" },
    { name: "FTSE 100", ticker: "UKX", price: "10,562.63", change: "−0.26%", currency: "GBP" },
    { name: "DAX", ticker: "DAX", price: "24,269.50", change: "+0.48%", currency: "EUR" },
  ],
  crypto: {
    marketCap: "2.54 T",
    marketCapChange: "+1.37%",
    btcDominance: "59.61%",
    ethShare: "11.20%",
    btc: { price: "75,593", change: "+0.55%" },
    eth: { price: "2,355.7", change: "+0.28%" },
  },
  commodities: [
    { name: "Light crude oil", ticker: "CL1!", price: "87.72", unit: "USD/barrel", change: "−7.36%" },
    { name: "Natural gas", ticker: "NG1!", price: "2.692", unit: "USD/mmBTU", change: "+1.70%" },
    { name: "Gold", ticker: "GC1!", price: "4,818.6", unit: "USD/troy oz", change: "+0.21%" },
    { name: "Copper", ticker: "HG1!", price: "6.0430", unit: "USD/lb", change: "−0.55%" },
    { name: "Silver", ticker: "SI1!", price: "79.645", unit: "USD/troy oz", change: "+1.19%" },
  ],
  trendingStocks: [
    { ticker: "NFLX", company: "Netflix, Inc.", price: "107.79", change: "+0.07%" },
    { ticker: "PBM", company: "Psyence Biomedical Ltd.", price: "5.87", change: "+103.82%" },
    { ticker: "AMD", company: "Advanced Micro Devices", price: "278.26", change: "+7.80%" },
    { ticker: "ONFO", company: "Onfolio Holdings Inc.", price: "1.50", change: "+124.89%" },
    { ticker: "RKLB", company: "Rocket Lab Corporation", price: "82.93", change: "+12.68%" },
    { ticker: "AXTI", company: "AXT Inc", price: "81.78", change: "+29.95%" },
    { ticker: "PL", company: "Planet Labs PBC", price: "39.89", change: "+15.93%" },
    { ticker: "MARA", company: "MARA Holdings, Inc.", price: "11.55", change: "+10.32%" },
  ],
};

// Watchlist Data
export const watchlistData = [
  { category: "Indices", items: [
    { symbol: "SPX", last: "7,041.29", chg: "+18.33", chgPct: "+0.26%" },
    { symbol: "NDQ", last: "26,333.00", chg: "+128.42", chgPct: "+0.49%" },
    { symbol: "DJI", last: "48,578.72", chg: "+115.00", chgPct: "+0.24%" },
    { symbol: "VIX", last: "17.86", chg: "−0.08", chgPct: "−0.45%" },
  ]},
  { category: "Stocks", items: [
    { symbol: "AAPL", last: "263.40", chg: "−3.03", chgPct: "−1.14%" },
    { symbol: "TSLA", last: "388.90", chg: "−3.05", chgPct: "−0.78%" },
    { symbol: "NFLX", last: "107.79", chg: "+0.08", chgPct: "+0.07%" },
  ]},
  { category: "Futures", items: [
    { symbol: "USOIL", last: "87.53", chg: "−5.65", chgPct: "−6.06%" },
    { symbol: "GOLD", last: "4,801.92", chg: "+14.50", chgPct: "+0.30%" },
  ]},
  { category: "Forex", items: [
    { symbol: "EURUSD", last: "1.17949", chg: "+0.00138", chgPct: "+0.12%" },
    { symbol: "GBPUSD", last: "1.35335", chg: "+0.00080", chgPct: "+0.06%" },
  ]},
  { category: "Crypto", items: [
    { symbol: "BTCUSD", last: "75,585", chg: "+407", chgPct: "+0.54%" },
    { symbol: "ETHUSD", last: "2,355.1", chg: "+5.9", chgPct: "+0.25%" },
  ]},
];

// Stock Detail
export const stockDetail = {
  ticker: "AAPL",
  name: "Apple Inc",
  exchange: "NASDAQ",
  price: "263.40",
  change: "−3.03",
  changePct: "−1.14%",
  volume: "43.32 M",
  avgVolume: "40.70 M",
  marketCap: "3.87 T",
  nextEarnings: "In 14 days",
  preMarket: "267.14 USD (+1.42%)",
  headline: "Apple's iPhone shipments in China rose 20% in Q1, the strongest growth among major smartphone vendors.",
  financials: {
    dividendYield: "0.39%",
    payoutRatio: "13.03%",
    lastDividend: "0.26",
    exDividendDate: "Feb 9, 2026",
    analystRating: "Neutral",
    priceTarget: "300.40 (+14.05%)",
    perf1W: "+1.70%",
    perf1M: "+4.13%",
    perf1Y: "+32.79%",
    technicals: "Neutral",
  },
};

// US Market Indices
export const usIndices = [
  { name: "S&P 500", ticker: "SPX", price: "7,041.29", change: "+0.26%", currency: "USD" },
  { name: "Nasdaq 100", ticker: "NDX", price: "26,333.00", change: "+0.49%", currency: "USD" },
  { name: "Dow 30", ticker: "DJI", price: "48,578.73", change: "+0.24%", currency: "USD" },
  { name: "US 2000 Small Cap", ticker: "RUT", price: "2,735.734", change: "+0.41%", currency: "USD" },
  { name: "VIX", ticker: "VIX", price: "17.87", change: "−0.39%", currency: "POINT" },
  { name: "NYSE Composite", ticker: "NYA", price: "22,955.59", change: "0.00%", currency: "USD" },
  { name: "S&P 100", ticker: "OEX", price: "3,462.23", change: "+0.18%", currency: "USD" },
];

// World Stocks
export const worldStocks = [
  { name: "NVIDIA", ticker: "NVDA", price: "198.35", change: "−0.26%" },
  { name: "Apple", ticker: "AAPL", price: "263.40", change: "−1.14%" },
  { name: "Microsoft", ticker: "MSFT", price: "420.26", change: "+2.20%" },
  { name: "Tesla", ticker: "TSLA", price: "388.90", change: "−0.78%" },
  { name: "Amazon", ticker: "AMZN", price: "249.70", change: "+0.48%" },
  { name: "Alphabet", ticker: "GOOG", price: "332.77", change: "−0.51%" },
];

// Stock Movers
export const stockMovers = {
  gainers: [
    { company: "Myseum, Inc.", change: "+129.17%" },
    { company: "Psyence Biomedical Ltd.", change: "+103.82%" },
    { company: "Mega Fortune Company", change: "+53.96%" },
  ],
  losers: [
    { company: "Texxon Holding Limited", change: "−44.96%" },
    { company: "Allbirds, Inc.", change: "−35.79%" },
    { company: "MMTec, Inc.", change: "−33.66%" },
  ],
};

// Forex Pairs
export const forexPairs = [
  { pair: "EUR to USD", rate: "1.17932", change: "+0.13%" },
  { pair: "GBP to USD", rate: "1.3529", change: "+0.06%" },
  { pair: "USD to JPY", rate: "159.210", change: "+0.06%" },
  { pair: "USD to CHF", rate: "0.78260", change: "−0.05%" },
  { pair: "AUD to USD", rate: "0.71718", change: "+0.19%" },
];

// Government Bonds
export const govBonds = [
  { bond: "US 1Y", ticker: "US01Y", price: "—", yield: "3.682%" },
  { bond: "US 2Y", ticker: "US02Y", price: "100.199%", yield: "3.767%" },
  { bond: "US 5Y", ticker: "US05Y", price: "99.875%", yield: "3.903%" },
  { bond: "US 10Y", ticker: "US10Y", price: "98.645%", yield: "4.295%" },
  { bond: "US 20Y", ticker: "US20Y", price: "96.531%", yield: "4.900%" },
  { bond: "US 30Y", ticker: "US30Y", price: "97.363%", yield: "4.919%" },
];

// Corporate Bonds
export const corpBonds = [
  { issuer: "Petroleos Mexicanos", coupon: "7.69%", ytm: "8.60%", maturity: "Jan 23, 2050" },
  { issuer: "Grupo Televisa", coupon: "6.125%", ytm: "8.59%", maturity: "Jan 31, 2046" },
  { issuer: "Petroleos Mexicanos", coupon: "6.95%", ytm: "8.48%", maturity: "Jan 28, 2060" },
  { issuer: "Grupo Televisa", coupon: "5.0%", ytm: "8.43%", maturity: "May 13, 2045" },
  { issuer: "SBL Holdings", coupon: "7.2%", ytm: "8.38%", maturity: "Oct 30, 2034" },
];

// Earnings Calendar
export const earnings = [
  { date: "Today", company: "Autoliv, Inc.", actual: "2.05", estimate: "1.83" },
  { date: "Today", company: "Regions Financial", actual: "0.62", estimate: "0.60" },
  { date: "Today", company: "Fifth Third Bancorp", actual: "0.15", estimate: "−0.10" },
  { date: "Today", company: "Ally Financial", actual: "—", estimate: "0.93" },
  { date: "Today", company: "State Street Corp", actual: "—", estimate: "2.64" },
];

// Broker Listings
export const brokers = [
  { name: "FOREX.com", tier: "Platinum", rating: "4.5", ratingLabel: "Great", reviews: "13.7K", accounts: "175.7K", promotion: null },
  { name: "OKX", tier: "Platinum", rating: "4.9", ratingLabel: "Excellent", reviews: "22.5K", accounts: "239.9K", promotion: "Unlock ChartPulse Plus!" },
  { name: "AMP Futures", tier: "Platinum", rating: "4.6", ratingLabel: "Excellent", reviews: "8.5K", accounts: "33.9K", promotion: null },
  { name: "moomoo", tier: "Gold", rating: "4.6", ratingLabel: "Excellent", reviews: "4K", accounts: "81.7K", promotion: "8.1% APY + Free Premium" },
  { name: "OANDA", tier: "Platinum", rating: "4.5", ratingLabel: "Great", reviews: "31.3K", accounts: "296.7K", promotion: "Free ChartPulse plan" },
  { name: "Interactive Brokers", tier: "Platinum", rating: "4.2", ratingLabel: "Good", reviews: "36.4K", accounts: "343.2K", promotion: null },
  { name: "TradeStation", tier: "Platinum", rating: "4.3", ratingLabel: "Good", reviews: "16.6K", accounts: "131.4K", promotion: "$150 + $0 Options Fees" },
];

// Trading Ideas
export const ideas = [
  {
    id: 1,
    author: "TradingView",
    avatar: "TV",
    time: "2 hours ago",
    type: "Idea",
    symbol: "AAPL",
    title: "AAPL - Apple could be forming a double bottom pattern",
    description: "Looking at the daily timeframe, AAPL has been consolidating in a narrow range between $255 and $270 for the past month. The recent bounce from the $260 level could indicate the formation of a double bottom pattern. Key resistance at $270.",
    bullish: true,
    likes: 342,
    comments: 89,
    timeframe: "1D",
    views: "15.2K",
  },
  {
    id: 2,
    author: "MegaInvestor",
    avatar: "MI",
    time: "4 hours ago",
    type: "Analysis",
    symbol: "TSLA",
    title: "Tesla approaching critical support level",
    description: "Tesla has been in a downtrend since early 2024. Currently approaching the $380 support level which coincides with the 200-day moving average. A break below could lead to further downside.",
    bullish: false,
    likes: 567,
    comments: 156,
    timeframe: "4H",
    views: "28.1K",
  },
  {
    id: 3,
    author: "CryptoKing",
    avatar: "CK",
    time: "6 hours ago",
    type: "Idea",
    symbol: "BTCUSD",
    title: "Bitcoin forming bull flag on 4H chart",
    description: "After the recent surge above $75K, Bitcoin is now consolidating in a bull flag pattern. Target remains at $80K if the pattern completes.",
    bullish: true,
    likes: 892,
    comments: 234,
    timeframe: "4H",
    views: "42.3K",
  },
  {
    id: 4,
    author: "ForexPro",
    avatar: "FP",
    time: "8 hours ago",
    type: "Analysis",
    symbol: "EURUSD",
    title: "EUR/USD facing headwinds from ECB",
    description: "The European Central Bank signaling potential rate cuts while the Fed maintains a hawkish stance is weighing on EUR/USD. Key support at 1.1750.",
    bullish: false,
    likes: 234,
    comments: 67,
    timeframe: "1D",
    views: "12.8K",
  },
  {
    id: 5,
    author: "ChartMaster",
    avatar: "CM",
    time: "10 hours ago",
    type: "Idea",
    symbol: "NVDA",
    title: "NVIDIA breakout incoming",
    description: "NVIDIA continues to consolidate near all-time highs. Volume is declining which typically precedes a major move. Watch for a breakout above $200.",
    bullish: true,
    likes: 678,
    comments: 145,
    timeframe: "1D",
    views: "31.5K",
  },
];