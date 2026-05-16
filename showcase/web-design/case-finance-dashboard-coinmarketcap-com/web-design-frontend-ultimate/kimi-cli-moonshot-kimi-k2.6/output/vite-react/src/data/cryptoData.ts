export interface CryptoAsset {
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  supplyUnit: string;
  sparkline: number[];
  network: string;
  category: string[];
}

export const topAssets: CryptoAsset[] = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 75612.78,
    change1h: 0.45,
    change24h: 1.33,
    change7d: 4.84,
    marketCap: 1510000000000,
    volume24h: 42820000000,
    circulatingSupply: 20.01,
    supplyUnit: "M BTC",
    sparkline: [73000, 73800, 74200, 74800, 75100, 75612],
    network: "Bitcoin",
    category: ["Top", "Most Visited"],
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 2356.0,
    change1h: 0.51,
    change24h: 0.8,
    change7d: 6.29,
    marketCap: 284350000000,
    volume24h: 21360000000,
    circulatingSupply: 120.69,
    supplyUnit: "M ETH",
    sparkline: [2200, 2250, 2280, 2320, 2340, 2356],
    network: "Ethereum",
    category: ["Top", "Most Visited"],
  },
  {
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    change1h: 0.01,
    change24h: 0.03,
    change7d: 0.01,
    marketCap: 185840000000,
    volume24h: 138790000000,
    circulatingSupply: 185.8,
    supplyUnit: "B USDT",
    sparkline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    network: "Ethereum",
    category: ["Top", "Most Visited"],
  },
  {
    rank: 4,
    name: "XRP",
    symbol: "XRP",
    price: 1.44,
    change1h: 0.71,
    change24h: 2.71,
    change7d: 7.89,
    marketCap: 89130000000,
    volume24h: 4030000000,
    circulatingSupply: 61.56,
    supplyUnit: "B XRP",
    sparkline: [1.32, 1.35, 1.38, 1.40, 1.42, 1.44],
    network: "XRP Ledger",
    category: ["Top", "Trending", "Most Visited"],
  },
  {
    rank: 5,
    name: "BNB",
    symbol: "BNB",
    price: 632.59,
    change1h: 0.38,
    change24h: 1.89,
    change7d: 4.98,
    marketCap: 85270000000,
    volume24h: 1950000000,
    circulatingSupply: 134.78,
    supplyUnit: "M BNB",
    sparkline: [600, 610, 618, 625, 628, 632.59],
    network: "BSC",
    category: ["Top", "Most Visited"],
  },
  {
    rank: 6,
    name: "Solana",
    symbol: "SOL",
    price: 88.25,
    change1h: 0.67,
    change24h: 3.74,
    change7d: 5.67,
    marketCap: 50770000000,
    volume24h: 6710000000,
    circulatingSupply: 575.26,
    supplyUnit: "M SOL",
    sparkline: [82, 84, 85, 86, 87, 88.25],
    network: "Solana",
    category: ["Top", "Trending", "Most Visited"],
  },
  {
    rank: 7,
    name: "USDC",
    symbol: "USDC",
    price: 1.0,
    change1h: 0.0,
    change24h: 0.02,
    change7d: 0.0,
    marketCap: 42000000000,
    volume24h: 8500000000,
    circulatingSupply: 42.0,
    supplyUnit: "B USDC",
    sparkline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    network: "Ethereum",
    category: ["Top", "Most Visited"],
  },
  {
    rank: 8,
    name: "Cardano",
    symbol: "ADA",
    price: 0.72,
    change1h: 0.42,
    change24h: 1.12,
    change7d: 3.45,
    marketCap: 25500000000,
    volume24h: 520000000,
    circulatingSupply: 35.4,
    supplyUnit: "B ADA",
    sparkline: [0.68, 0.69, 0.70, 0.71, 0.715, 0.72],
    network: "Cardano",
    category: ["Top"],
  },
  {
    rank: 9,
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.18,
    change1h: 0.85,
    change24h: 4.21,
    change7d: 8.33,
    marketCap: 26000000000,
    volume24h: 1800000000,
    circulatingSupply: 144.4,
    supplyUnit: "B DOGE",
    sparkline: [0.16, 0.165, 0.17, 0.172, 0.175, 0.18],
    network: "Dogecoin",
    category: ["Top", "Trending", "Most Visited"],
  },
  {
    rank: 10,
    name: "TRON",
    symbol: "TRX",
    price: 0.24,
    change1h: 0.15,
    change24h: 0.78,
    change7d: 2.12,
    marketCap: 22000000000,
    volume24h: 380000000,
    circulatingSupply: 91.6,
    supplyUnit: "B TRX",
    sparkline: [0.23, 0.232, 0.235, 0.237, 0.238, 0.24],
    network: "TRON",
    category: ["Top"],
  },
  {
    rank: 11,
    name: "Avalanche",
    symbol: "AVAX",
    price: 36.5,
    change1h: 0.62,
    change24h: 2.15,
    change7d: 5.42,
    marketCap: 15000000000,
    volume24h: 620000000,
    circulatingSupply: 410.8,
    supplyUnit: "M AVAX",
    sparkline: [34, 34.5, 35, 35.5, 36, 36.5],
    network: "Avalanche",
    category: ["Top"],
  },
  {
    rank: 12,
    name: "Chainlink",
    symbol: "LINK",
    price: 14.2,
    change1h: 0.48,
    change24h: 1.65,
    change7d: 4.18,
    marketCap: 8800000000,
    volume24h: 420000000,
    circulatingSupply: 620.3,
    supplyUnit: "M LINK",
    sparkline: [13.5, 13.7, 13.8, 13.9, 14.0, 14.2],
    network: "Ethereum",
    category: ["Top"],
  },
  {
    rank: 13,
    name: "Toncoin",
    symbol: "TON",
    price: 3.85,
    change1h: 0.33,
    change24h: 1.02,
    change7d: 3.78,
    marketCap: 9600000000,
    volume24h: 280000000,
    circulatingSupply: 2.49,
    supplyUnit: "B TON",
    sparkline: [3.7, 3.72, 3.75, 3.78, 3.8, 3.85],
    network: "TON",
    category: ["Top"],
  },
  {
    rank: 14,
    name: "Stellar",
    symbol: "XLM",
    price: 0.32,
    change1h: 0.55,
    change24h: 1.88,
    change7d: 6.12,
    marketCap: 9600000000,
    volume24h: 310000000,
    circulatingSupply: 30.0,
    supplyUnit: "B XLM",
    sparkline: [0.30, 0.305, 0.31, 0.312, 0.315, 0.32],
    network: "Stellar",
    category: ["Top"],
  },
  {
    rank: 15,
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.000018,
    change1h: 0.92,
    change24h: 3.45,
    change7d: 7.21,
    marketCap: 10600000000,
    volume24h: 450000000,
    circulatingSupply: 589.3,
    supplyUnit: "T SHIB",
    sparkline: [0.000016, 0.0000165, 0.000017, 0.0000172, 0.0000175, 0.000018],
    network: "Ethereum",
    category: ["Top", "Trending"],
  },
  {
    rank: 16,
    name: "Polkadot",
    symbol: "DOT",
    price: 6.12,
    change1h: 0.28,
    change24h: 0.95,
    change7d: 2.88,
    marketCap: 9200000000,
    volume24h: 220000000,
    circulatingSupply: 1.5,
    supplyUnit: "B DOT",
    sparkline: [5.9, 5.95, 6.0, 6.02, 6.05, 6.12],
    network: "Polkadot",
    category: ["Top"],
  },
  {
    rank: 17,
    name: "Polygon",
    symbol: "MATIC",
    price: 0.42,
    change1h: 0.38,
    change24h: 1.25,
    change7d: 3.55,
    marketCap: 4200000000,
    volume24h: 180000000,
    circulatingSupply: 10.0,
    supplyUnit: "B MATIC",
    sparkline: [0.40, 0.405, 0.41, 0.412, 0.415, 0.42],
    network: "Ethereum",
    category: ["Top"],
  },
  {
    rank: 18,
    name: "Litecoin",
    symbol: "LTC",
    price: 82.5,
    change1h: 0.45,
    change24h: 1.55,
    change7d: 4.22,
    marketCap: 6200000000,
    volume24h: 320000000,
    circulatingSupply: 75.1,
    supplyUnit: "M LTC",
    sparkline: [78, 79, 80, 80.5, 81, 82.5],
    network: "Litecoin",
    category: ["Top"],
  },
  {
    rank: 19,
    name: "Uniswap",
    symbol: "UNI",
    price: 8.75,
    change1h: 0.52,
    change24h: 1.82,
    change7d: 5.15,
    marketCap: 6500000000,
    volume24h: 180000000,
    circulatingSupply: 742.5,
    supplyUnit: "M UNI",
    sparkline: [8.2, 8.3, 8.4, 8.5, 8.6, 8.75],
    network: "Ethereum",
    category: ["Top"],
  },
  {
    rank: 20,
    name: "Bitcoin Cash",
    symbol: "BCH",
    price: 385.2,
    change1h: 0.35,
    change24h: 1.12,
    change7d: 3.78,
    marketCap: 7600000000,
    volume24h: 210000000,
    circulatingSupply: 19.7,
    supplyUnit: "M BCH",
    sparkline: [370, 372, 375, 378, 380, 385.2],
    network: "Bitcoin Cash",
    category: ["Top"],
  },
];

function generateExtendedAssets(): CryptoAsset[] {
  const networks = ["Ethereum", "BSC", "Solana", "Base", "Bitcoin", "Cardano", "Avalanche", "TRON", "TON", "Polkadot"];
  const names = [
    "Aave", "Maker", "Compound", "SushiSwap", "Curve", "1inch", "dYdX", "Lido", "Rocket Pool", "Frax",
    "PancakeSwap", "Venus", "Alpaca", "Biswap", "Auto", "Beefy", "ApeSwap", "BakerySwap", "JulSwap", "Pancake Bunny",
    "Raydium", "Serum", "Orca", "Marinade", "Jupiter", "Drift", "Mango", "Bonfida", "Star Atlas", "StepN",
    "Aerodrome", "BaseSwap", "Alien Base", "Dackie", "Synthswap", "SwapBased", "BaseX", "Baseswap V3", "Infusion", "Moonwell",
    "Cosmos", "Near", "Algorand", "Tezos", "VeChain", "Filecoin", "Internet Computer", "Theta", "EOS", "Neo",
    "Kava", "Harmony", "Fantom", "Hedera", "Elrond", "Zilliqa", "Waves", "Decred", "Dash", "Monero",
    "Zcash", "Siacoin", "Basic Attention", "Enjin", "Chiliz", "Decentraland", "The Sandbox", "Axie Infinity", "Gala", "Illuvium",
    "Immutable X", "Loopring", "Celo", "Ankr", "Fetch.ai", "Render", "Akash", "Livepeer", "Helium", "Arweave",
    "Stacks", "Kusama", "Oasis", "Casper", "Moonbeam", "Astar", "Acala", "Karura", "Phala", "Bifrost",
  ];

  const assets: CryptoAsset[] = [...topAssets];

  for (let i = 0; i < 80; i++) {
    const basePrice = Math.random() * 200 + 0.1;
    const change1h = (Math.random() - 0.5) * 2;
    const change24h = (Math.random() - 0.5) * 6;
    const change7d = (Math.random() - 0.5) * 15;
    const marketCap = (100 - i) * 80000000 + Math.random() * 50000000;
    const volume = marketCap * (0.01 + Math.random() * 0.15);
    const supply = marketCap / basePrice;

    let supplyVal: number;
    let supplyUnit: string;
    if (supply > 1000000000) {
      supplyVal = supply / 1000000000;
      supplyUnit = "B " + names[i % names.length].substring(0, 3).toUpperCase();
    } else if (supply > 1000000) {
      supplyVal = supply / 1000000;
      supplyUnit = "M " + names[i % names.length].substring(0, 3).toUpperCase();
    } else {
      supplyVal = supply;
      supplyUnit = " " + names[i % names.length].substring(0, 3).toUpperCase();
    }

    const sparkline = Array.from({ length: 7 }, (_, j) => {
      return basePrice * (1 + (Math.random() - 0.5) * 0.1 * (j + 1) / 7);
    });

    assets.push({
      rank: i + 21,
      name: names[i % names.length],
      symbol: names[i % names.length].substring(0, 4).toUpperCase(),
      price: basePrice,
      change1h: Number(change1h.toFixed(2)),
      change24h: Number(change24h.toFixed(2)),
      change7d: Number(change7d.toFixed(2)),
      marketCap,
      volume24h: volume,
      circulatingSupply: Number(supplyVal.toFixed(2)),
      supplyUnit,
      sparkline,
      network: networks[i % networks.length],
      category: ["Top"],
    });
  }

  return assets;
}

export const allAssets = generateExtendedAssets();

export const marketStats = {
  marketCap: "$2.56T",
  marketCapChange: "1.46%",
  ctp20Index: "$155.36",
  ctp20Change: "1.5%",
  fearGreed: 57,
  fearGreedLabel: "Neutral",
  altcoinSeason: "37/100",
  altcoinSeasonLabel: "Bitcoin season",
};

export const indexTracker = {
  name: "CoinTracker 20 Index (DTFCTP20)",
  price: 154.29,
  change1h: 0.21,
  change24h: 1.15,
  change7d: 4.97,
};

export const marketSummary = {
  globalCap: "$2.56T",
  globalCapChange: "1.47%",
  volume24h: "$156.9B",
  volumeChange: "14.51%",
  defiVolume: "$12.2B",
  defiShare: "7.78%",
  stablecoinVolume: "$195.53B",
  stablecoinShare: "124.63%",
  btcDominance: "59.04%",
  btcDominanceChange: "0.05%",
};

export const promoBanners = [
  "CTP Launch: Secure $GENIUS Airdrop — Join Now",
  "New Listings: Explore the hottest tokens this week",
  "Earn up to 12% APY on select stablecoins",
  "Bitcoin ETF inflows hit all-time high this month",
];

export const aiSuggestions = [
  "Why is the market up today?",
  "Are altcoins outperforming Bitcoin?",
  "What are the trending narratives?",
  "What cryptos are showing bullish momentum?",
  "What upcoming events may impact crypto?",
  "What is the market sentiment?",
  "What are KOLs discussing?",
];
