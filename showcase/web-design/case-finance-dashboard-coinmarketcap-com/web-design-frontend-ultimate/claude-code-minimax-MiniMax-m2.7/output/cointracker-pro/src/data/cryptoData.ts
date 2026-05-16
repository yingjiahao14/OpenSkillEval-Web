export interface CryptoAsset {
  rank: number
  name: string
  symbol: string
  price: number
  change1h: number
  change24h: number
  change7d: number
  marketCap: number
  volume24h: number
  circulatingSupply: number
  supply: string
  network: string
  sparkline: number[]
}

export const cryptoData: CryptoAsset[] = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 75612.78, change1h: 0.45, change24h: 1.33, change7d: 4.84, marketCap: 1510000000000, volume24h: 42820000000, circulatingSupply: 20010000, supply: '20.01M BTC', network: 'Bitcoin', sparkline: [1, 2, 3, 5, 6, 7, 8] },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: 2356.00, change1h: 0.51, change24h: 0.80, change7d: 6.29, marketCap: 284350000000, volume24h: 21360000000, circulatingSupply: 120690000, supply: '120.69M ETH', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 9] },
  { rank: 3, name: 'Tether', symbol: 'USDT', price: 1.00, change1h: 0.01, change24h: 0.03, change7d: 0.01, marketCap: 185840000000, volume24h: 138790000000, circulatingSupply: 185800000000, supply: '185.8B USDT', network: 'Ethereum', sparkline: [0, 0, 0, 0, 0, 0, 0] },
  { rank: 4, name: 'XRP', symbol: 'XRP', price: 1.44, change1h: 0.71, change24h: 2.71, change7d: 7.89, marketCap: 89130000000, volume24h: 4030000000, circulatingSupply: 61560000000, supply: '61.56B XRP', network: 'Ripple', sparkline: [2, 3, 3, 5, 7, 8, 9] },
  { rank: 5, name: 'BNB', symbol: 'BNB', price: 632.59, change1h: 0.38, change24h: 1.89, change7d: 4.98, marketCap: 85270000000, volume24h: 1950000000, circulatingSupply: 134780000, supply: '134.78M BNB', network: 'BSC', sparkline: [3, 3, 4, 5, 6, 7, 8] },
  { rank: 6, name: 'Solana', symbol: 'SOL', price: 88.25, change1h: 0.67, change24h: 3.74, change7d: 5.67, marketCap: 50770000000, volume24h: 6710000000, circulatingSupply: 575260000, supply: '575.26M SOL', network: 'Solana', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 7, name: 'USDC', symbol: 'USDC', price: 1.00, change1h: 0.00, change24h: 0.01, change7d: 0.00, marketCap: 54000000000, volume24h: 8900000000, circulatingSupply: 54000000000, supply: '54B USDC', network: 'Ethereum', sparkline: [0, 0, 0, 0, 0, 0, 0] },
  { rank: 8, name: 'Cardano', symbol: 'ADA', price: 0.58, change1h: 0.32, change24h: 1.21, change7d: 3.45, marketCap: 20600000000, volume24h: 845000000, circulatingSupply: 35500000000, supply: '35.5B ADA', network: 'Cardano', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 9, name: 'Avalanche', symbol: 'AVAX', price: 42.18, change1h: 0.54, change24h: 2.87, change7d: 8.23, marketCap: 16800000000, volume24h: 1120000000, circulatingSupply: 398000000, supply: '398M AVAX', network: 'Avalanche', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 10, name: 'Dogecoin', symbol: 'DOGE', price: 0.1267, change1h: 0.89, change24h: 3.21, change7d: 9.45, marketCap: 18200000000, volume24h: 2100000000, circulatingSupply: 143000000000, supply: '143B DOGE', network: 'Dogecoin', sparkline: [2, 3, 4, 6, 7, 9, 10] },
  { rank: 11, name: 'Polkadot', symbol: 'DOT', price: 8.42, change1h: 0.28, change24h: 1.56, change7d: 4.12, marketCap: 12100000000, volume24h: 567000000, circulatingSupply: 1437000000, supply: '1.44B DOT', network: 'Polkadot', sparkline: [2, 3, 4, 4, 5, 6, 7] },
  { rank: 12, name: 'Chainlink', symbol: 'LINK', price: 18.92, change1h: 0.42, change24h: 2.34, change7d: 7.89, marketCap: 11200000000, volume24h: 789000000, circulatingSupply: 592000000, supply: '592M LINK', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 13, name: 'Polygon', symbol: 'MATIC', price: 0.72, change1h: 0.35, change24h: 1.87, change7d: 5.23, marketCap: 9800000000, volume24h: 456000000, circulatingSupply: 13630000000, supply: '13.63B MATIC', network: 'Polygon', sparkline: [2, 3, 4, 5, 6, 6, 7] },
  { rank: 14, name: 'Litecoin', symbol: 'LTC', price: 92.45, change1h: 0.23, change24h: 1.12, change7d: 3.67, marketCap: 8900000000, volume24h: 567000000, circulatingSupply: 96300000, supply: '96.3M LTC', network: 'Litecoin', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 15, name: 'Shiba Inu', symbol: 'SHIB', price: 0.0000234, change1h: 1.23, change24h: 4.56, change7d: 12.34, marketCap: 7800000000, volume24h: 890000000, circulatingSupply: 589000000000000, supply: '589T SHIB', network: 'Ethereum', sparkline: [3, 5, 7, 8, 10, 12, 14] },
  { rank: 16, name: 'Uniswap', symbol: 'UNI', price: 12.67, change1h: 0.45, change24h: 2.12, change7d: 6.78, marketCap: 7600000000, volume24h: 345000000, circulatingSupply: 600000000, supply: '600M UNI', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 17, name: 'Algorand', symbol: 'ALGO', price: 0.28, change1h: 0.31, change24h: 1.45, change7d: 4.23, marketCap: 4500000000, volume24h: 234000000, circulatingSupply: 16100000000, supply: '16.1B ALGO', network: 'Algorand', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 18, name: 'VeChain', symbol: 'VET', price: 0.045, change1h: 0.28, change24h: 1.67, change7d: 4.89, marketCap: 4100000000, volume24h: 189000000, circulatingSupply: 72700000000, supply: '72.7B VET', network: 'VeChain', sparkline: [2, 3, 3, 4, 5, 6, 6] },
  { rank: 19, name: 'Filecoin', symbol: 'FIL', price: 8.92, change1h: 0.38, change24h: 2.23, change7d: 7.45, marketCap: 5200000000, volume24h: 456000000, circulatingSupply: 583000000, supply: '583M FIL', network: 'Filecoin', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 20, name: 'Internet Computer', symbol: 'ICP', price: 15.67, change1h: 0.52, change24h: 2.89, change7d: 8.12, marketCap: 7300000000, volume24h: 234000000, circulatingSupply: 466000000, supply: '466M ICP', network: 'Internet Computer', sparkline: [3, 4, 5, 7, 8, 9, 10] },
  { rank: 21, name: 'Aptos', symbol: 'APT', price: 11.23, change1h: 0.48, change24h: 2.45, change7d: 6.89, marketCap: 5100000000, volume24h: 345000000, circulatingSupply: 454000000, supply: '454M APT', network: 'Aptos', sparkline: [3, 4, 5, 6, 7, 8, 8] },
  { rank: 22, name: 'Arbitrum', symbol: 'ARB', price: 1.34, change1h: 0.41, change24h: 1.98, change7d: 5.67, marketCap: 4300000000, volume24h: 567000000, circulatingSupply: 3200000000, supply: '3.2B ARB', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 23, name: 'Render', symbol: 'RNDR', price: 13.45, change1h: 0.56, change24h: 3.12, change7d: 9.23, marketCap: 5100000000, volume24h: 678000000, circulatingSupply: 379000000, supply: '379M RNDR', network: 'Ethereum', sparkline: [4, 5, 6, 7, 8, 10, 11] },
  { rank: 24, name: 'NEAR Protocol', symbol: 'NEAR', price: 7.89, change1h: 0.43, change24h: 2.34, change7d: 7.12, marketCap: 8100000000, volume24h: 456000000, circulatingSupply: 1030000000, supply: '1.03B NEAR', network: 'NEAR', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 25, name: 'Optimism', symbol: 'OP', price: 3.45, change1h: 0.39, change24h: 2.12, change7d: 6.45, marketCap: 3800000000, volume24h: 456000000, circulatingSupply: 1100000000, supply: '1.1B OP', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 26, name: 'Stacks', symbol: 'STX', price: 2.78, change1h: 0.52, change24h: 2.89, change7d: 8.67, marketCap: 4100000000, volume24h: 234000000, circulatingSupply: 1480000000, supply: '1.48B STX', network: 'Bitcoin', sparkline: [3, 4, 5, 6, 8, 9, 10] },
  { rank: 27, name: 'Kaspa', symbol: 'KAS', price: 0.18, change1h: 0.67, change24h: 3.45, change7d: 10.23, marketCap: 4200000000, volume24h: 189000000, circulatingSupply: 23300000000, supply: '23.3B KAS', network: 'Kaspa', sparkline: [4, 5, 7, 8, 10, 12, 14] },
  { rank: 28, name: 'Immutable', symbol: 'IMX', price: 2.89, change1h: 0.44, change24h: 2.23, change7d: 7.45, marketCap: 4300000000, volume24h: 345000000, circulatingSupply: 1490000000, supply: '1.49B IMX', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 29, name: 'Injective', symbol: 'INJ', price: 34.56, change1h: 0.58, change24h: 3.12, change7d: 9.87, marketCap: 3200000000, volume24h: 456000000, circulatingSupply: 93000000, supply: '93M INJ', network: 'Injective', sparkline: [4, 5, 7, 8, 9, 11, 12] },
  { rank: 30, name: 'Cosmos', symbol: 'ATOM', price: 10.23, change1h: 0.35, change24h: 1.87, change7d: 5.67, marketCap: 4000000000, volume24h: 234000000, circulatingSupply: 391000000, supply: '391M ATOM', network: 'Cosmos', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 31, name: 'The Graph', symbol: 'GRT', price: 0.34, change1h: 0.42, change24h: 2.12, change7d: 6.23, marketCap: 3200000000, volume24h: 189000000, circulatingSupply: 9430000000, supply: '9.43B GRT', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 32, name: 'Sui', symbol: 'SUI', price: 1.78, change1h: 0.51, change24h: 2.67, change7d: 7.89, marketCap: 3600000000, volume24h: 456000000, circulatingSupply: 2020000000, supply: '2.02B SUI', network: 'Sui', sparkline: [3, 4, 5, 6, 7, 9, 10] },
  { rank: 33, name: 'Stellar', symbol: 'XLM', price: 0.145, change1h: 0.32, change24h: 1.45, change7d: 4.23, marketCap: 4200000000, volume24h: 156000000, circulatingSupply: 29000000000, supply: '29B XLM', network: 'Stellar', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 34, name: 'Monero', symbol: 'XMR', price: 178.90, change1h: 0.28, change24h: 1.23, change7d: 3.89, marketCap: 3300000000, volume24h: 123000000, circulatingSupply: 18400000, supply: '18.4M XMR', network: 'Monero', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 35, name: 'Hedera', symbol: 'HBAR', price: 0.089, change1h: 0.45, change24h: 2.34, change7d: 6.78, marketCap: 3100000000, volume24h: 234000000, circulatingSupply: 34800000000, supply: '34.8B HBAR', network: 'Hedera', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 36, name: 'Mantle', symbol: 'MNT', price: 1.23, change1h: 0.48, change24h: 2.56, change7d: 7.45, marketCap: 4000000000, volume24h: 345000000, circulatingSupply: 3250000000, supply: '3.25B MNT', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 37, name: 'Celestia', symbol: 'TIA', price: 12.34, change1h: 0.55, change24h: 2.89, change7d: 8.67, marketCap: 2500000000, volume24h: 456000000, circulatingSupply: 203000000, supply: '203M TIA', network: 'Celestia', sparkline: [3, 4, 6, 7, 8, 10, 11] },
  { rank: 38, name: 'Maker', symbol: 'MKR', price: 2890.00, change1h: 0.38, change24h: 1.87, change7d: 5.23, marketCap: 2600000000, volume24h: 189000000, circulatingSupply: 900000, supply: '900K MKR', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 39, name: 'Lido DAO', symbol: 'LDO', price: 2.89, change1h: 0.42, change24h: 2.12, change7d: 6.45, marketCap: 2600000000, volume24h: 234000000, circulatingSupply: 899000000, supply: '899M LDO', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 40, name: 'Aave', symbol: 'AAVE', price: 98.45, change1h: 0.35, change24h: 1.67, change7d: 4.89, marketCap: 2300000000, volume24h: 345000000, circulatingSupply: 23400000, supply: '23.4M AAVE', network: 'Ethereum', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 41, name: 'Cronos', symbol: 'CRO', price: 0.112, change1h: 0.28, change24h: 1.34, change7d: 3.67, marketCap: 3000000000, volume24h: 89000000, circulatingSupply: 26800000000, supply: '26.8B CRO', network: 'Cronos', sparkline: [2, 2, 3, 4, 4, 5, 5] },
  { rank: 42, name: 'Flow', symbol: 'FLOW', price: 1.12, change1h: 0.39, change24h: 1.89, change7d: 5.23, marketCap: 1700000000, volume24h: 156000000, circulatingSupply: 1520000000, supply: '1.52B FLOW', network: 'Flow', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 43, name: 'MultiversX', symbol: 'EGLD', price: 42.30, change1h: 0.44, change24h: 2.12, change7d: 6.12, marketCap: 1100000000, volume24h: 89000000, circulatingSupply: 26000000, supply: '26M EGLD', network: 'MultiversX', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 44, name: 'Bitget Token', symbol: 'BGB', price: 1.45, change1h: 0.52, change24h: 2.45, change7d: 7.23, marketCap: 2000000000, volume24h: 234000000, circulatingSupply: 1380000000, supply: '1.38B BGB', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 45, name: 'Quant', symbol: 'QNT', price: 112.00, change1h: 0.38, change24h: 1.78, change7d: 5.12, marketCap: 1900000000, volume24h: 78000000, circulatingSupply: 17000000, supply: '17M QNT', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 6, 7] },
  { rank: 46, name: 'XDC Network', symbol: 'XDC', price: 0.045, change1h: 0.25, change24h: 1.23, change7d: 3.45, marketCap: 1800000000, volume24h: 45000000, circulatingSupply: 40000000000, supply: '40B XDC', network: 'XDC', sparkline: [2, 2, 3, 4, 4, 4, 5] },
  { rank: 47, name: 'Theta Network', symbol: 'THETA', price: 1.78, change1h: 0.32, change24h: 1.56, change7d: 4.23, marketCap: 1800000000, volume24h: 67000000, circulatingSupply: 1010000000, supply: '1.01B THETA', network: 'Theta', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 48, name: 'DeFi Chain', symbol: 'DFI', price: 1.89, change1h: 0.41, change24h: 1.98, change7d: 5.67, marketCap: 1200000000, volume24h: 23000000, circulatingSupply: 635000000, supply: '635M DFI', network: 'DeFi Chain', sparkline: [2, 3, 4, 5, 6, 6, 7] },
  { rank: 49, name: 'Blur', symbol: 'BLUR', price: 0.45, change1h: 0.56, change24h: 2.78, change7d: 8.12, marketCap: 1500000000, volume24h: 345000000, circulatingSupply: 3300000000, supply: '3.3B BLUR', network: 'Ethereum', sparkline: [3, 4, 5, 7, 8, 9, 10] },
  { rank: 50, name: 'dYdX', symbol: 'DYDX', price: 3.45, change1h: 0.43, change24h: 2.12, change7d: 6.45, marketCap: 1300000000, volume24h: 189000000, circulatingSupply: 377000000, supply: '377M DYDX', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 51, name: 'Frax Share', symbol: 'FXS', price: 8.90, change1h: 0.48, change24h: 2.34, change7d: 7.12, marketCap: 1200000000, volume24h: 156000000, circulatingSupply: 135000000, supply: '135M FXS', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 52, name: 'WOO Network', symbol: 'WOO', price: 0.38, change1h: 0.39, change24h: 1.87, change7d: 5.67, marketCap: 1100000000, volume24h: 123000000, circulatingSupply: 2900000000, supply: '2.9B WOO', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 53, name: 'Curve DAO', symbol: 'CRV', price: 0.56, change1h: 0.42, change24h: 2.12, change7d: 6.23, marketCap: 1000000000, volume24h: 234000000, circulatingSupply: 1790000000, supply: '1.79B CRV', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 54, name: 'Gala', symbol: 'GALA', price: 0.045, change1h: 0.67, change24h: 3.45, change7d: 10.23, marketCap: 1800000000, volume24h: 456000000, circulatingSupply: 40000000000, supply: '40B GALA', network: 'Ethereum', sparkline: [4, 5, 7, 8, 10, 12, 14] },
  { rank: 55, name: 'Zilliqa', symbol: 'ZIL', price: 0.023, change1h: 0.35, change24h: 1.67, change7d: 4.89, marketCap: 900000000, volume24h: 89000000, circulatingSupply: 39100000000, supply: '39.1B ZIL', network: 'Zilliqa', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 56, name: 'Synthetix', symbol: 'SNX', price: 3.78, change1h: 0.44, change24h: 2.23, change7d: 6.89, marketCap: 1100000000, volume24h: 156000000, circulatingSupply: 291000000, supply: '291M SNX', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 57, name: 'Enjin Coin', symbol: 'ENJ', price: 0.34, change1h: 0.38, change24h: 1.89, change7d: 5.23, marketCap: 800000000, volume24h: 67000000, circulatingSupply: 2350000000, supply: '2.35B ENJ', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 6, 7] },
  { rank: 58, name: '1inch', symbol: '1INCH', price: 0.45, change1h: 0.36, change24h: 1.76, change7d: 4.98, marketCap: 700000000, volume24h: 78000000, circulatingSupply: 1550000000, supply: '1.55B 1INCH', network: 'Ethereum', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 59, name: 'Loopring', symbol: 'LRC', price: 0.28, change1h: 0.41, change24h: 2.01, change7d: 5.87, marketCap: 650000000, volume24h: 89000000, circulatingSupply: 2320000000, supply: '2.32B LRC', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 60, name: 'Ocean Protocol', symbol: 'OCEAN', price: 0.89, change1h: 0.47, change24h: 2.34, change7d: 7.12, marketCap: 700000000, volume24h: 123000000, circulatingSupply: 786000000, supply: '786M OCEAN', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 61, name: 'Band Protocol', symbol: 'BAND', price: 1.67, change1h: 0.32, change24h: 1.54, change7d: 4.34, marketCap: 380000000, volume24h: 45000000, circulatingSupply: 228000000, supply: '228M BAND', network: 'Ethereum', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 62, name: 'Celo', symbol: 'CELO', price: 0.78, change1h: 0.39, change24h: 1.87, change7d: 5.23, marketCap: 600000000, volume24h: 67000000, circulatingSupply: 769000000, supply: '769M CELO', network: 'Celo', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 63, name: 'Dent', symbol: 'DENT', price: 0.0012, change1h: 0.55, change24h: 2.67, change7d: 7.89, marketCap: 320000000, volume24h: 89000000, circulatingSupply: 267000000000, supply: '267B DENT', network: 'Ethereum', sparkline: [2, 3, 5, 6, 7, 8, 10] },
  { rank: 64, name: 'Harmony', symbol: 'ONE', price: 0.017, change1h: 0.43, change24h: 2.12, change7d: 6.01, marketCap: 350000000, volume24h: 56000000, circulatingSupply: 20500000000, supply: '20.5B ONE', network: 'Harmony', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 65, name: 'IOST', symbol: 'IOST', price: 0.012, change1h: 0.31, change24h: 1.45, change7d: 4.12, marketCap: 320000000, volume24h: 34000000, circulatingSupply: 26700000000, supply: '26.7B IOST', network: 'IOST', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 66, name: 'Kava', symbol: 'KAVA', price: 0.78, change1h: 0.38, change24h: 1.89, change7d: 5.34, marketCap: 420000000, volume24h: 78000000, circulatingSupply: 538000000, supply: '538M KAVA', network: 'Kava', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 67, name: 'Livepeer', symbol: 'LPT', price: 18.90, change1h: 0.52, change24h: 2.56, change7d: 7.67, marketCap: 680000000, volume24h: 89000000, circulatingSupply: 36000000, supply: '36M LPT', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 9, 10] },
  { rank: 68, name: 'Mask Network', symbol: 'MASK', price: 3.45, change1h: 0.41, change24h: 2.01, change7d: 6.12, marketCap: 520000000, volume24h: 156000000, circulatingSupply: 151000000, supply: '151M MASK', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 69, name: 'Metal', symbol: 'MTL', price: 1.23, change1h: 0.35, change24h: 1.67, change7d: 4.78, marketCap: 380000000, volume24h: 45000000, circulatingSupply: 309000000, supply: '309M MTL', network: 'Ethereum', sparkline: [2, 2, 3, 4, 5, 6, 6] },
  { rank: 70, name: 'Numeraire', symbol: 'NMR', price: 28.90, change1h: 0.44, change24h: 2.12, change7d: 6.45, marketCap: 320000000, volume24h: 23000000, circulatingSupply: 11100000, supply: '11.1M NMR', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 71, name: 'Origin Protocol', symbol: 'OGN', price: 0.18, change1h: 0.36, change24h: 1.76, change7d: 4.98, marketCap: 280000000, volume24h: 34000000, circulatingSupply: 1550000000, supply: '1.55B OGN', network: 'Ethereum', sparkline: [2, 2, 3, 4, 5, 6, 6] },
  { rank: 72, name: 'PAX Gold', symbol: 'PAXG', price: 2340.00, change1h: 0.12, change24h: 0.45, change7d: 1.23, marketCap: 680000000, volume24h: 45000000, circulatingSupply: 290000, supply: '290K PAXG', network: 'Ethereum', sparkline: [1, 1, 1, 1, 1, 2, 2] },
  { rank: 73, name: 'PlayDapp', symbol: 'PLA', price: 0.18, change1h: 0.48, change24h: 2.34, change7d: 6.89, marketCap: 250000000, volume24h: 67000000, circulatingSupply: 1390000000, supply: '1.39B PLA', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 74, name: 'QuarkChain', symbol: 'QKC', price: 0.014, change1h: 0.32, change24h: 1.54, change7d: 4.23, marketCap: 180000000, volume24h: 23000000, circulatingSupply: 12800000000, supply: '12.8B QKC', network: 'QuarkChain', sparkline: [2, 2, 3, 4, 4, 5, 6] },
  { rank: 75, name: 'Reserve Rights', symbol: 'RSR', price: 0.0078, change1h: 0.56, change24h: 2.78, change7d: 8.12, marketCap: 380000000, volume24h: 89000000, circulatingSupply: 48700000000, supply: '48.7B RSR', network: 'Ethereum', sparkline: [3, 4, 5, 7, 8, 9, 10] },
  { rank: 76, name: 'SXP', symbol: 'SXP', price: 0.34, change1h: 0.38, change24h: 1.87, change7d: 5.12, marketCap: 320000000, volume24h: 56000000, circulatingSupply: 941000000, supply: '941M SXP', network: 'BSC', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 77, name: 'Tellor', symbol: 'TRB', price: 78.90, change1h: 0.45, change24h: 2.23, change7d: 6.78, marketCap: 280000000, volume24h: 34000000, circulatingSupply: 3550000, supply: '3.55M TRB', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 78, name: 'Un的目的', symbol: 'UNFI', price: 2.34, change1h: 0.42, change24h: 2.01, change7d: 6.01, marketCap: 180000000, volume24h: 45000000, circulatingSupply: 77000000, supply: '77M UNFI', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 79, name: 'VIDT DAO', symbol: 'VIDT', price: 0.23, change1h: 0.39, change24h: 1.89, change7d: 5.45, marketCap: 120000000, volume24h: 23000000, circulatingSupply: 522000000, supply: '522M VIDT', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 6, 7] },
  { rank: 80, name: 'WAX', symbol: 'WAXP', price: 0.045, change1h: 0.28, change24h: 1.34, change7d: 3.78, marketCap: 250000000, volume24h: 23000000, circulatingSupply: 5550000000, supply: '5.55B WAXP', network: 'WAX', sparkline: [2, 2, 3, 4, 4, 5, 5] },
  { rank: 81, name: 'Xensor', symbol: 'XMR', price: 0.12, change1h: 0.35, change24h: 1.67, change7d: 4.67, marketCap: 150000000, volume24h: 18000000, circulatingSupply: 1250000000, supply: '1.25B XMR', network: 'Ethereum', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 82, name: 'Yield Guild', symbol: 'YGG', price: 0.34, change1h: 0.48, change24h: 2.34, change7d: 6.89, marketCap: 220000000, volume24h: 67000000, circulatingSupply: 647000000, supply: '647M YGG', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 83, name: 'Zencral', symbol: 'ZEN', price: 12.30, change1h: 0.41, change24h: 1.98, change7d: 5.67, marketCap: 180000000, volume24h: 23000000, circulatingSupply: 14600000, supply: '14.6M ZEN', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 84, name: 'Aleph Zero', symbol: 'AZERO', price: 1.23, change1h: 0.52, change24h: 2.56, change7d: 7.45, marketCap: 280000000, volume24h: 45000000, circulatingSupply: 228000000, supply: '228M AZERO', network: 'Aleph Zero', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 85, name: 'Bodhi', symbol: 'BOT', price: 0.89, change1h: 0.38, change24h: 1.87, change7d: 5.34, marketCap: 150000000, volume24h: 23000000, circulatingSupply: 169000000, supply: '169M BOT', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 6, 7] },
  { rank: 86, name: 'Covalent', symbol: 'CQT', price: 0.18, change1h: 0.44, change24h: 2.12, change7d: 6.23, marketCap: 220000000, volume24h: 34000000, circulatingSupply: 1220000000, supply: '1.22B CQT', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 87, name: 'Dapr', symbol: 'DAPR', price: 2.45, change1h: 0.36, change24h: 1.76, change7d: 5.01, marketCap: 180000000, volume24h: 18000000, circulatingSupply: 73500000, supply: '73.5M DAPR', network: 'Ethereum', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 88, name: 'Ethernity', symbol: 'ERN', price: 2.89, change1h: 0.47, change24h: 2.34, change7d: 6.89, marketCap: 190000000, volume24h: 34000000, circulatingSupply: 65800000, supply: '65.8M ERN', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 89, name: 'FIO Protocol', symbol: 'FIO', price: 0.056, change1h: 0.32, change24h: 1.54, change7d: 4.34, marketCap: 140000000, volume24h: 12000000, circulatingSupply: 2500000000, supply: '2.5B FIO', network: 'Ethereum', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 90, name: 'Graphlinq', symbol: 'GLQ', price: 0.23, change1h: 0.41, change24h: 2.01, change7d: 5.78, marketCap: 78000000, volume24h: 8900000, circulatingSupply: 339000000, supply: '339M GLQ', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 6, 7] },
  { rank: 91, name: 'Hifi Finance', symbol: 'HIFI', price: 0.78, change1h: 0.39, change24h: 1.89, change7d: 5.45, marketCap: 120000000, volume24h: 23000000, circulatingSupply: 154000000, supply: '154M HIFI', network: 'Ethereum', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 92, name: 'Inverse Finance', symbol: 'INV', price: 23.40, change1h: 0.43, change24h: 2.12, change7d: 6.23, marketCap: 150000000, volume24h: 12000000, circulatingSupply: 6410000, supply: '6.41M INV', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 93, name: 'JasmyCoin', symbol: 'JASMY', price: 0.012, change1h: 0.56, change24h: 2.78, change7d: 8.12, marketCap: 320000000, volume24h: 89000000, circulatingSupply: 26700000000, supply: '26.7B JASMY', network: 'Ethereum', sparkline: [3, 4, 6, 7, 8, 10, 11] },
  { rank: 94, name: 'Kylin', symbol: 'KYL', price: 0.089, change1h: 0.35, change24h: 1.67, change7d: 4.78, marketCap: 95000000, volume24h: 12000000, circulatingSupply: 1068000000, supply: '1.07B KYL', network: 'Ethereum', sparkline: [2, 2, 3, 4, 5, 5, 6] },
  { rank: 95, name: 'Lition', symbol: 'LIT', price: 0.34, change1h: 0.42, change24h: 2.01, change7d: 5.87, marketCap: 68000000, volume24h: 8900000, circulatingSupply: 200000000, supply: '200M LIT', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 6, 7] },
  { rank: 96, name: 'Marlin', symbol: 'POND', price: 0.023, change1h: 0.48, change24h: 2.34, change7d: 6.89, marketCap: 130000000, volume24h: 34000000, circulatingSupply: 5650000000, supply: '5.65B POND', network: 'Ethereum', sparkline: [3, 4, 5, 6, 7, 8, 9] },
  { rank: 97, name: 'Nervos Network', symbol: 'CKB', price: 0.0078, change1h: 0.36, change24h: 1.76, change7d: 4.98, marketCap: 180000000, volume24h: 23000000, circulatingSupply: 23000000000, supply: '23B CKB', network: 'Nervos', sparkline: [2, 2, 3, 4, 5, 6, 6] },
  { rank: 98, name: 'Orbs', symbol: 'ORBS', price: 0.034, change1h: 0.44, change24h: 2.12, change7d: 6.12, marketCap: 160000000, volume24h: 34000000, circulatingSupply: 4700000000, supply: '4.7B ORBS', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 7, 8] },
  { rank: 99, name: 'Propy', symbol: 'PRO', price: 1.89, change1h: 0.38, change24h: 1.87, change7d: 5.23, marketCap: 78000000, volume24h: 8900000, circulatingSupply: 41300000, supply: '41.3M PRO', network: 'Ethereum', sparkline: [2, 3, 4, 5, 5, 6, 7] },
  { rank: 100, name: 'Quanta', symbol: 'QTZ', price: 0.18, change1h: 0.41, change24h: 1.98, change7d: 5.67, marketCap: 95000000, volume24h: 12000000, circulatingSupply: 528000000, supply: '528M QTZ', network: 'Ethereum', sparkline: [2, 3, 4, 5, 6, 6, 7] },
]

export const marketStats = {
  totalMarketCap: 2560000000000,
  marketCapChange24h: 1.46,
  ctp20Index: 155.36,
  ctp20Change: 1.5,
  fearGreedIndex: 57,
  fearGreedLabel: 'Neutral',
  altcoinSeason: 37,
  altcoinSeasonLabel: 'Bitcoin season'
}

export const indexData = {
  name: 'CoinTracker 20 Index',
  symbol: 'DTFCTP20',
  price: 154.29,
  change1h: 0.21,
  change24h: 1.15,
  change7d: 4.97
}

export const marketSummaryData = {
  globalMarketCap: 2560000000000,
  marketCapChange24h: 1.47,
  totalVolume24h: 156900000000,
  volumeChange24h: 14.51,
  defiVolume: 12200000000,
  defiVolumeShare: 7.78,
  stablecoinVolume: 195530000000,
  stablecoinVolumeShare: 124.63,
  btcDominance: 59.04,
  btcDominanceChange: -0.05
}
