const seedCoins = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 75612.78, h1: 0.45, h24: 1.33, d7: 4.84, marketCap: 1510000000000, volume: 42820000000, supply: '20.01M BTC', network: 'Bitcoin', category: 'Top', spark: [12, 18, 29, 47, 58, 70, 84] },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: 2356.00, h1: 0.51, h24: 0.80, d7: 6.29, marketCap: 284350000000, volume: 21360000000, supply: '120.69M ETH', network: 'Ethereum', category: 'Top', spark: [18, 26, 35, 48, 61, 74, 88] },
  { rank: 3, name: 'Tether', symbol: 'USDT', price: 1.00, h1: 0.01, h24: 0.03, d7: 0.01, marketCap: 185840000000, volume: 138790000000, supply: '185.8B USDT', network: 'Ethereum', category: 'Top', spark: [50, 51, 49, 50, 51, 50, 50] },
  { rank: 4, name: 'XRP', symbol: 'XRP', price: 1.44, h1: 0.71, h24: 2.71, d7: 7.89, marketCap: 89130000000, volume: 4030000000, supply: '61.56B XRP', network: 'More', category: 'Trending', spark: [14, 23, 26, 41, 59, 71, 91] },
  { rank: 5, name: 'BNB', symbol: 'BNB', price: 632.59, h1: 0.38, h24: 1.89, d7: 4.98, marketCap: 85270000000, volume: 1950000000, supply: '134.78M BNB', network: 'BSC', category: 'Top', spark: [28, 31, 38, 46, 57, 69, 76] },
  { rank: 6, name: 'USD Coin', symbol: 'USDC', price: 1.00, h1: 0.00, h24: 0.01, d7: 0.02, marketCap: 61260000000, volume: 11840000000, supply: '61.24B USDC', network: 'Base', category: 'Most Visited', spark: [50, 50, 51, 50, 49, 50, 51] },
  { rank: 7, name: 'Solana', symbol: 'SOL', price: 88.25, h1: 0.67, h24: 3.74, d7: 5.67, marketCap: 50770000000, volume: 6710000000, supply: '575.26M SOL', network: 'Solana', category: 'Trending', spark: [17, 28, 36, 50, 63, 72, 82] },
  { rank: 8, name: 'Dogecoin', symbol: 'DOGE', price: 0.1824, h1: -0.12, h24: 2.06, d7: 6.18, marketCap: 26910000000, volume: 2470000000, supply: '147.54B DOGE', network: 'More', category: 'Most Visited', spark: [20, 22, 35, 34, 52, 66, 80] },
  { rank: 9, name: 'Cardano', symbol: 'ADA', price: 0.53, h1: 0.22, h24: -0.84, d7: 2.96, marketCap: 19080000000, volume: 823000000, supply: '35.99B ADA', network: 'More', category: 'Watchlist', spark: [34, 41, 38, 31, 42, 54, 62] },
  { rank: 10, name: 'TRON', symbol: 'TRX', price: 0.286, h1: 0.08, h24: 0.44, d7: 1.72, marketCap: 24620000000, volume: 1090000000, supply: '86.08B TRX', network: 'More', category: 'Top', spark: [44, 46, 45, 49, 53, 56, 60] }
];

const names = [
  ['Lido Staked Ether','STETH','Ethereum'], ['Wrapped Bitcoin','WBTC','Ethereum'], ['Chainlink','LINK','Ethereum'], ['Avalanche','AVAX','More'], ['Stellar','XLM','More'], ['Sui','SUI','More'], ['Toncoin','TON','More'], ['Shiba Inu','SHIB','Ethereum'], ['Hedera','HBAR','More'], ['Polkadot','DOT','More'], ['Bitcoin Cash','BCH','More'], ['Uniswap','UNI','Ethereum'], ['Litecoin','LTC','More'], ['Pepe','PEPE','Ethereum'], ['Aptos','APT','More'], ['Near Protocol','NEAR','More'], ['Internet Computer','ICP','More'], ['Aave','AAVE','Ethereum'], ['Ethereum Classic','ETC','More'], ['Render','RENDER','Solana'], ['Ondo','ONDO','Ethereum'], ['Polygon','POL','Ethereum'], ['VeChain','VET','More'], ['Cosmos','ATOM','More'], ['Kaspa','KAS','More'], ['Filecoin','FIL','More'], ['Arbitrum','ARB','Ethereum'], ['Optimism','OP','Ethereum'], ['Injective','INJ','More'], ['Mantle','MNT','Ethereum'], ['Celestia','TIA','More'], ['First Digital USD','FDUSD','BSC'], ['Ethena USDe','USDE','Ethereum'], ['Bittensor','TAO','More'], ['Jupiter','JUP','Solana'], ['Raydium','RAY','Solana'], ['Bonk','BONK','Solana'], ['Pyth Network','PYTH','Solana'], ['The Graph','GRT','Ethereum'], ['Fantom','FTM','More'], ['Algorand','ALGO','More'], ['Sei','SEI','More'], ['Floki','FLOKI','BSC'], ['Maker','MKR','Ethereum'], ['Stacks','STX','More'], ['Immutable','IMX','Ethereum'], ['Worldcoin','WLD','Ethereum'], ['Quant','QNT','Ethereum'], ['Theta Network','THETA','More'], ['JasmyCoin','JASMY','Ethereum'], ['Lido DAO','LDO','Ethereum'], ['GateToken','GT','Ethereum'], ['KuCoin Token','KCS','Ethereum'], ['Flow','FLOW','More'], ['Gala','GALA','Ethereum'], ['Helium','HNT','Solana'], ['Core','CORE','BSC'], ['Curve DAO','CRV','Ethereum'], ['Tezos','XTZ','More'], ['IOTA','IOTA','More'], ['Bitget Token','BGB','Ethereum'], ['PancakeSwap','CAKE','BSC'], ['THORChain','RUNE','More'], ['Sonic','S','More'], ['Aerodrome Finance','AERO','Base'], ['Virtuals Protocol','VIRTUAL','Base'], ['Brett','BRETT','Base'], ['Axie Infinity','AXS','Ethereum'], ['Decentraland','MANA','Ethereum'], ['The Sandbox','SAND','Ethereum'], ['Beam','BEAM','Ethereum'], ['Pendle','PENDLE','Ethereum'], ['Mog Coin','MOG','Ethereum'], ['Jito','JTO','Solana'], ['Marinade','MNDE','Solana'], ['Orca','ORCA','Solana'], ['Wormhole','W','Solana'], ['Akash Network','AKT','More'], ['dYdX','DYDX','Ethereum'], ['Compound','COMP','Ethereum'], ['Frax Share','FXS','Ethereum'], ['Zcash','ZEC','More'], ['EOS','EOS','More'], ['NEO','NEO','More'], ['Kava','KAVA','More'], ['Chiliz','CHZ','Ethereum'], ['Enjin Coin','ENJ','Ethereum'], ['Blur','BLUR','Ethereum'], ['Safe','SAFE','Base'], ['Zora','ZORA','Base']
];

const categories = ['Top', 'Trending', 'Watchlist', 'Prediction Markets', 'Most Visited', 'New'];
const colorPalette = ['#f7931a','#627eea','#26a17b','#23292f','#f3ba2f','#2775ca','#14f195','#c2a633','#0033ad','#eb0029','#3861fb','#00a3ff'];

function buildCoins() {
  const generated = names.map((item, idx) => {
    const rank = idx + 11;
    const scale = Math.pow(0.935, idx);
    const baseCap = 17600000000 * scale;
    const price = Math.max(0.000012, (210 - idx * 2.07) * scale + (idx % 9) * 0.13);
    const h24 = Number(((idx % 7) * 0.72 - 1.55 + (idx % 3) * 0.34).toFixed(2));
    const h1 = Number(((idx % 5) * 0.17 - 0.22).toFixed(2));
    const d7 = Number(((idx % 11) * 0.84 - 2.15).toFixed(2));
    return {
      rank,
      name: item[0],
      symbol: item[1],
      network: item[2],
      category: categories[idx % categories.length],
      price,
      h1,
      h24,
      d7,
      marketCap: Math.round(baseCap),
      volume: Math.round(baseCap * (0.035 + (idx % 8) * 0.014)),
      supply: `${formatCompact((baseCap / Math.max(price, 0.00001)), false)} ${item[1]}`,
      spark: Array.from({ length: 7 }, (_, day) => Math.max(8, Math.min(92, 36 + day * (d7 >= 0 ? 6 : -3) + ((idx + day) % 5) * 5)))
    };
  });
  return [...seedCoins, ...generated].slice(0, 100);
}

let allCoins = buildCoins();
let state = { category: 'Top', network: 'All Networks', page: 1, sort: 'marketCap', minCap: 0, change: 'all' };
const tableBody = document.getElementById('tableBody');

function formatMoney(value) {
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1) return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${value.toFixed(value < 0.001 ? 6 : 4)}`;
}

function formatCompact(value) {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
  return value.toFixed(2);
}

function formatPct(value) {
  const cls = value >= 0 ? 'up' : 'down';
  const arrow = value >= 0 ? '▲' : '▼';
  return `<span class="${cls}">${arrow} ${Math.abs(value).toFixed(2)}%</span>`;
}

function sparkline(points, positive) {
  const width = 128, height = 38, pad = 3;
  const max = Math.max(...points), min = Math.min(...points);
  const coords = points.map((point, index) => {
    const x = pad + index * ((width - pad * 2) / (points.length - 1));
    const y = height - pad - ((point - min) / Math.max(1, max - min)) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const stroke = positive ? '#16c784' : '#ea3943';
  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" aria-label="7 day sparkline"><polyline fill="none" stroke="${stroke}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" points="${coords}"/></svg>`;
}

function filteredCoins() {
  let coins = [...allCoins];
  if (state.category !== 'Top') coins = coins.filter(coin => coin.category === state.category || coin.rank <= 10);
  if (state.network !== 'All Networks') coins = coins.filter(coin => coin.network === state.network || (state.network === 'More' && !['BSC','Solana','Base','Ethereum'].includes(coin.network)));
  if (state.minCap) coins = coins.filter(coin => coin.marketCap >= state.minCap);
  if (state.change === 'gainers') coins = coins.filter(coin => coin.h24 >= 0);
  if (state.change === 'decliners') coins = coins.filter(coin => coin.h24 < 0);
  coins.sort((a, b) => state.sort === 'volume' ? b.volume - a.volume : b.marketCap - a.marketCap);
  return coins;
}

function renderTable() {
  const coins = filteredCoins();
  tableBody.innerHTML = coins.map((coin, index) => `
    <tr>
      <td class="rank">${coin.rank}</td>
      <td>
        <div class="name-cell">
          <span class="coin-icon" style="background:${colorPalette[index % colorPalette.length]}">${coin.symbol.slice(0, 2)}</span>
          <div>
            <div><span class="coin-name">${coin.name}</span><span class="coin-symbol">${coin.symbol}</span></div>
            <div class="coin-tags"><span>${coin.network}</span><span>${coin.category}</span></div>
          </div>
        </div>
      </td>
      <td class="num price col-price">${formatMoney(coin.price)}</td>
      <td class="num col-h1">${formatPct(coin.h1)}</td>
      <td class="num col-h24">${formatPct(coin.h24)}</td>
      <td class="num col-d7">${formatPct(coin.d7)}</td>
      <td class="num cap col-marketCap">${formatMoney(coin.marketCap)}</td>
      <td class="num volume col-volume">${formatMoney(coin.volume)}</td>
      <td class="num supply col-supply">${coin.supply}</td>
      <td class="col-spark">${sparkline(coin.spark, coin.d7 >= 0)}</td>
    </tr>
  `).join('');
  document.getElementById('tableContext').textContent = `${state.category} assets on ${state.network.toLowerCase()} ranked by ${state.sort === 'volume' ? '24h volume' : 'market cap'}.`;
  const pageStart = coins.length ? (state.page - 1) * 100 + 1 : 0;
  const pageEnd = coins.length ? pageStart + coins.length - 1 : 0;
  document.getElementById('showingText').textContent = `Showing ${pageStart}–${pageEnd} of 8,364 assets`;
  applyColumnVisibility();
}

function setActive(container, target) {
  container.querySelectorAll('button').forEach(button => button.classList.toggle('active', button === target));
}

document.getElementById('categoryTabs').addEventListener('click', event => {
  if (!event.target.matches('button')) return;
  setActive(event.currentTarget, event.target);
  state.category = event.target.dataset.category;
  renderTable();
});

document.getElementById('networkTabs').addEventListener('click', event => {
  if (!event.target.matches('button')) return;
  setActive(event.currentTarget, event.target);
  state.network = event.target.dataset.network;
  renderTable();
});

document.getElementById('sortMarketCap').addEventListener('click', () => {
  state.sort = 'marketCap';
  document.getElementById('sortMarketCap').classList.add('active');
  document.getElementById('sortVolume').classList.remove('active');
  renderTable();
});
document.getElementById('sortVolume').addEventListener('click', () => {
  state.sort = 'volume';
  document.getElementById('sortVolume').classList.add('active');
  document.getElementById('sortMarketCap').classList.remove('active');
  renderTable();
});

function togglePanel(buttonId, panelId) {
  const button = document.getElementById(buttonId);
  const panel = document.getElementById(panelId);
  const isHidden = panel.hidden;
  panel.hidden = !isHidden;
  button.setAttribute('aria-expanded', String(isHidden));
  button.classList.toggle('active', isHidden);
}
document.getElementById('filtersBtn').addEventListener('click', () => togglePanel('filtersBtn', 'filterPanel'));
document.getElementById('columnsBtn').addEventListener('click', () => togglePanel('columnsBtn', 'columnsPanel'));

document.getElementById('capFilter').addEventListener('change', event => { state.minCap = Number(event.target.value); renderTable(); });
document.getElementById('changeFilter').addEventListener('change', event => { state.change = event.target.value; renderTable(); });
document.getElementById('resetFilters').addEventListener('click', () => {
  state.minCap = 0; state.change = 'all';
  document.getElementById('capFilter').value = '0';
  document.getElementById('changeFilter').value = 'all';
  renderTable();
});

function applyColumnVisibility() {
  document.querySelectorAll('#columnsPanel input').forEach(input => {
    document.querySelectorAll(`.col-${input.dataset.column}`).forEach(cell => cell.classList.toggle('hide-col', !input.checked));
  });
}
document.getElementById('columnsPanel').addEventListener('change', applyColumnVisibility);

document.getElementById('pages').addEventListener('click', event => {
  if (!event.target.matches('button')) return;
  document.querySelectorAll('#pages button').forEach(button => button.classList.toggle('active', button === event.target));
  const page = Number(event.target.dataset.page);
  state.page = page;
  const pageShift = (page - 1) * 0.006;
  allCoins = buildCoins().map(coin => ({ ...coin, h24: Number((coin.h24 - pageShift).toFixed(2)), volume: Math.round(coin.volume * (1 - pageShift)) }));
  renderTable();
});

const promos = [
  ['CTP Launch: Secure $GENIUS Airdrop — Join Now', 'Track campaign eligibility and ecosystem rewards directly from your CoinTracker Pro dashboard.'],
  ['Exchange Inflows Update: Bitcoin spot volume expands 14.51%', 'Follow real-time liquidity changes across centralized and decentralized venues.'],
  ['New Solana DeFi Lens', 'Identify trending Solana assets, volume leaders, and ecosystem momentum in seconds.']
];
let promoIndex = 0;
function showPromo(delta = 1) {
  promoIndex = (promoIndex + delta + promos.length) % promos.length;
  document.getElementById('promoTitle').textContent = promos[promoIndex][0];
  document.getElementById('promoText').textContent = promos[promoIndex][1];
}
document.getElementById('promoPrev').addEventListener('click', () => showPromo(-1));
document.getElementById('promoNext').addEventListener('click', () => showPromo(1));
setInterval(() => showPromo(1), 6500);

document.getElementById('readMoreBtn').addEventListener('click', event => {
  const panel = document.getElementById('summaryMore');
  panel.hidden = !panel.hidden;
  event.target.textContent = panel.hidden ? 'Read More' : 'Show Less';
  event.target.setAttribute('aria-expanded', String(!panel.hidden));
});

renderTable();
