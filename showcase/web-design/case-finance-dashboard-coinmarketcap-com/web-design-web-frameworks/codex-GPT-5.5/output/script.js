const categories = ["Top", "Trending", "Watchlist", "Prediction Markets", "Most Visited", "New", "More"];
const networks = ["All Networks", "BSC", "Solana", "Base", "Ethereum", "More"];
const quickAsks = [
  "Why is the market up today?",
  "Are altcoins outperforming Bitcoin?",
  "What are the trending narratives?",
  "What cryptos are showing bullish momentum?",
  "What upcoming events may impact crypto?",
  "What is the market sentiment?",
  "What are KOLs discussing?"
];
const promos = [
  ["CTP Launch: Secure $GENIUS Airdrop — Join Now", "Complete market tasks and unlock rewards in the CoinTracker Pro ecosystem."],
  ["Partner Spotlight: Institutional custody rails are live", "Compare liquidity, volatility, and market structure across major networks."],
  ["New Dashboard: Exchange Inflows and Outflows", "Track capital rotation with faster market overview signals."]
];
const seedCoins = [
  { rank: 1, name: "Bitcoin", symbol: "BTC", price: 75612.78, h1: .45, h24: 1.33, d7: 4.84, marketCap: 1.51e12, volume: 42.82e9, supply: "20.01M BTC", network: "Bitcoin", category: ["Top", "Most Visited", "Watchlist"] },
  { rank: 2, name: "Ethereum", symbol: "ETH", price: 2356.00, h1: .51, h24: .80, d7: 6.29, marketCap: 284.35e9, volume: 21.36e9, supply: "120.69M ETH", network: "Ethereum", category: ["Top", "Trending", "Watchlist"] },
  { rank: 3, name: "Tether", symbol: "USDT", price: 1.00, h1: .01, h24: .03, d7: .01, marketCap: 185.84e9, volume: 138.79e9, supply: "185.8B USDT", network: "Ethereum", category: ["Top"] },
  { rank: 4, name: "XRP", symbol: "XRP", price: 1.44, h1: .71, h24: 2.71, d7: 7.89, marketCap: 89.13e9, volume: 4.03e9, supply: "61.56B XRP", network: "More", category: ["Top", "Trending"] },
  { rank: 5, name: "BNB", symbol: "BNB", price: 632.59, h1: .38, h24: 1.89, d7: 4.98, marketCap: 85.27e9, volume: 1.95e9, supply: "134.78M BNB", network: "BSC", category: ["Top", "Most Visited"] },
  { rank: 6, name: "USD Coin", symbol: "USDC", price: 1.00, h1: .00, h24: .02, d7: .02, marketCap: 61.35e9, volume: 13.42e9, supply: "61.34B USDC", network: "Base", category: ["Top", "Watchlist"] },
  { rank: 7, name: "Solana", symbol: "SOL", price: 88.25, h1: .67, h24: 3.74, d7: 5.67, marketCap: 50.77e9, volume: 6.71e9, supply: "575.26M SOL", network: "Solana", category: ["Top", "Trending", "Most Visited"] },
  { rank: 8, name: "TRON", symbol: "TRX", price: .287, h1: -.12, h24: .54, d7: 2.11, marketCap: 24.74e9, volume: .92e9, supply: "86.15B TRX", network: "More", category: ["Top"] },
  { rank: 9, name: "Dogecoin", symbol: "DOGE", price: .156, h1: .22, h24: 2.05, d7: 9.12, marketCap: 23.39e9, volume: 1.84e9, supply: "149.61B DOGE", network: "More", category: ["Top", "Trending", "Most Visited"] },
  { rank: 10, name: "Cardano", symbol: "ADA", price: .512, h1: -.18, h24: 1.14, d7: 3.26, marketCap: 18.22e9, volume: .73e9, supply: "35.59B ADA", network: "More", category: ["Top", "Watchlist"] }
];
const names = [
  ["Hyperliquid", "HYPE"], ["Chainlink", "LINK"], ["Avalanche", "AVAX"], ["Sui", "SUI"], ["Stellar", "XLM"], ["Wrapped Bitcoin", "WBTC"], ["Shiba Inu", "SHIB"], ["Toncoin", "TON"], ["Hedera", "HBAR"], ["Polkadot", "DOT"],
  ["Litecoin", "LTC"], ["Bitcoin Cash", "BCH"], ["Uniswap", "UNI"], ["Pepe", "PEPE"], ["Aptos", "APT"], ["Aave", "AAVE"], ["Cronos", "CRO"], ["Near Protocol", "NEAR"], ["Internet Computer", "ICP"], ["Kaspa", "KAS"],
  ["Mantle", "MNT"], ["Bittensor", "TAO"], ["Ethereum Classic", "ETC"], ["VeChain", "VET"], ["Render", "RNDR"], ["Arbitrum", "ARB"], ["Optimism", "OP"], ["Filecoin", "FIL"], ["Cosmos", "ATOM"], ["Celestia", "TIA"],
  ["Injective", "INJ"], ["Stacks", "STX"], ["Immutable", "IMX"], ["Bonk", "BONK"], ["Worldcoin", "WLD"], ["The Graph", "GRT"], ["Maker", "MKR"], ["Algorand", "ALGO"], ["Sei", "SEI"], ["Jupiter", "JUP"],
  ["Fantom", "FTM"], ["Lido DAO", "LDO"], ["Quant", "QNT"], ["Flare", "FLR"], ["Flow", "FLOW"], ["Theta Network", "THETA"], ["Gala", "GALA"], ["JasmyCoin", "JASMY"], ["Core", "CORE"], ["Sonic", "S"],
  ["Pyth Network", "PYTH"], ["Raydium", "RAY"], ["Curve DAO", "CRV"], ["PancakeSwap", "CAKE"], ["Ondo", "ONDO"], ["Helium", "HNT"], ["Polygon", "POL"], ["Rocket Pool", "RPL"], ["Pendle", "PENDLE"], ["Virtuals", "VIRTUAL"],
  ["Frax Share", "FXS"], ["Decentraland", "MANA"], ["The Sandbox", "SAND"], ["Axie Infinity", "AXS"], ["Chiliz", "CHZ"], ["Conflux", "CFX"], ["Mina", "MINA"], ["Akash", "AKT"], ["Kava", "KAVA"], ["Zcash", "ZEC"],
  ["eCash", "XEC"], ["dYdX", "DYDX"], ["Blur", "BLUR"], ["Notcoin", "NOT"], ["Ethena", "ENA"], ["Starknet", "STRK"], ["Wormhole", "W"], ["EigenLayer", "EIGEN"], ["Mog Coin", "MOG"], ["MemeCore", "M"],
  ["Aster", "ASTER"], ["Morpho", "MORPHO"], ["Berachain", "BERA"], ["Aerodrome", "AERO"], ["Zora", "ZORA"], ["Kamino", "KMNO"], ["Grass", "GRASS"], ["Jito", "JTO"], ["LayerZero", "ZRO"], ["Safe", "SAFE"]
];
const palette = ["#f7931a", "#627eea", "#26a17b", "#23292f", "#f0b90b", "#2775ca", "#9945ff", "#ff060a", "#c2a633", "#0033ad", "#3861fb", "#16c784", "#ea3943", "#8b5cf6", "#06b6d4", "#f97316"];
const state = { category: "Top", network: "All Networks", page: 1, sortKey: "marketCap", sortDir: "desc", priceFilter: "all", performanceFilter: "all", search: "", hiddenCols: new Set() };
const allCoins = buildCoins();

function buildCoins() {
  const generated = names.map(([name, symbol], index) => {
    const rank = index + 11;
    const scale = Math.pow(rank, 1.13);
    const marketCap = Math.max(380e6, 17.5e9 / (scale / 8));
    const price = symbol === "SHIB" || symbol === "PEPE" || symbol === "BONK" || symbol === "XEC" || symbol === "MOG" ? randomish(rank, .000006, .00008) : randomish(rank, .05, 220) / Math.pow(rank / 12, .45);
    const volume = marketCap * randomish(rank + 8, .025, .21);
    const h1 = randomish(rank, -1.18, 1.48);
    const h24 = randomish(rank + 3, -5.9, 8.6);
    const d7 = randomish(rank + 5, -12.2, 18.9);
    const networkList = ["Ethereum", "BSC", "Solana", "Base", "More"];
    const categoryList = ["Top"];
    if (rank % 3 === 0) categoryList.push("Trending");
    if (rank % 4 === 0) categoryList.push("Watchlist");
    if (rank % 9 === 0) categoryList.push("Prediction Markets");
    if (rank % 5 === 0) categoryList.push("Most Visited");
    if (rank > 82) categoryList.push("New");
    return { rank, name, symbol, price, h1, h24, d7, marketCap, volume, supply: supplyFor(symbol, rank, price, marketCap), network: networkList[rank % networkList.length], category: categoryList };
  });
  return [...seedCoins, ...generated].slice(0, 100);
}
function randomish(seed, min, max) {
  const x = Math.sin(seed * 999) * 10000;
  return min + (x - Math.floor(x)) * (max - min);
}
function supplyFor(symbol, rank, price, marketCap) {
  const supply = marketCap / Math.max(price, .000001);
  if (supply >= 1e12) return `${(supply / 1e12).toFixed(2)}T ${symbol}`;
  if (supply >= 1e9) return `${(supply / 1e9).toFixed(2)}B ${symbol}`;
  if (supply >= 1e6) return `${(supply / 1e6).toFixed(2)}M ${symbol}`;
  return `${Math.round(supply).toLocaleString()} ${symbol}`;
}
function formatMoney(value, price = false) {
  if (price) {
    if (value < .01) return `$${value.toFixed(8)}`;
    if (value < 1) return `$${value.toFixed(4)}`;
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}
function pct(value) {
  const cls = value >= 0 ? "positive" : "negative";
  const sign = value >= 0 ? "+" : "";
  return `<span class="${cls}">${sign}${value.toFixed(2)}%</span>`;
}
function initTabs(containerId, values, stateKey) {
  const container = document.getElementById(containerId);
  container.innerHTML = values.map((value) => `<button class="tab-btn ${state[stateKey] === value ? "active" : ""}" type="button" data-value="${value}">${value}</button>`).join("");
  container.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;
    state[stateKey] = btn.dataset.value;
    state.page = 1;
    initTabs(containerId, values, stateKey);
    render();
  }, { once: true });
}
function renderQuickAsks() {
  document.getElementById("quickAsks").innerHTML = quickAsks.map((ask) => `<button type="button">${ask}</button>`).join("");
}
function filteredCoins() {
  let rows = [...allCoins];
  if (state.category !== "Top" && state.category !== "More") rows = rows.filter((coin) => coin.category.includes(state.category));
  if (state.network !== "All Networks") rows = rows.filter((coin) => coin.network === state.network || (state.network === "More" && coin.network === "More"));
  if (state.priceFilter === "large") rows = rows.filter((coin) => coin.price >= 100);
  if (state.priceFilter === "mid") rows = rows.filter((coin) => coin.price >= 1 && coin.price < 100);
  if (state.priceFilter === "micro") rows = rows.filter((coin) => coin.price < 1);
  if (state.performanceFilter === "gainers") rows = rows.filter((coin) => coin.h24 >= 0);
  if (state.performanceFilter === "losers") rows = rows.filter((coin) => coin.h24 < 0);
  if (state.search) {
    const q = state.search.toLowerCase();
    rows = rows.filter((coin) => coin.name.toLowerCase().includes(q) || coin.symbol.toLowerCase().includes(q));
  }
  rows.sort((a, b) => {
    const direction = state.sortDir === "asc" ? 1 : -1;
    return (a[state.sortKey] - b[state.sortKey]) * direction;
  });
  return rows;
}
function render() {
  const rows = visibleCoins();
  const pageSize = 100;
  const pageRows = isGlobalBrowse() ? rows : rows.slice((state.page - 1) * pageSize, state.page * pageSize);
  document.getElementById("tableSubtitle").textContent = `Showing ${state.category} assets across ${state.network} — ranked by ${labelForSort(state.sortKey)}.`;
  document.getElementById("cryptoRows").innerHTML = pageRows.length ? pageRows.map(rowHtml).join("") : `<tr class="empty-row"><td colspan="10">No assets match the active filters.</td></tr>`;
  const start = pageRows.length ? ((state.page - 1) * pageSize) + 1 : 0;
  const end = Math.min(state.page * pageSize, isGlobalBrowse() ? 8364 : rows.length);
  document.getElementById("pageInfo").textContent = isGlobalBrowse() ? `Showing ${start}–${end} of 8,364 assets` : `Showing ${pageRows.length ? 1 : 0}–${pageRows.length} of ${rows.length || 0} filtered assets · 8,364 total assets`;
  renderPagination(rows.length);
  applyColumnVisibility();
  document.querySelectorAll("th.sortable").forEach((th) => th.classList.toggle("sorted", th.dataset.sort === state.sortKey));
}
function isGlobalBrowse() {
  return state.category === "Top" && state.network === "All Networks" && state.priceFilter === "all" && state.performanceFilter === "all" && !state.search;
}
function visibleCoins() {
  return isGlobalBrowse() && state.page > 1 ? pageCoins(state.page) : filteredCoins();
}
function pageCoins(page) {
  const startRank = (page - 1) * 100 + 1;
  return Array.from({ length: Math.min(100, Math.max(0, 8364 - startRank + 1)) }, (_, offset) => {
    const rank = startRank + offset;
    const [baseName, baseSymbol] = names[(rank - 11 + names.length * 50) % names.length];
    const symbol = `${baseSymbol}${rank}`.slice(0, 7);
    const marketCap = Math.max(7.5e6, 1.51e12 / Math.pow(rank, 1.08));
    const price = rank % 13 === 0 ? randomish(rank, .00001, .009) : randomish(rank, .015, 95) / Math.pow(rank / 90, .35);
    const volume = marketCap * randomish(rank + 17, .018, .19);
    const networkList = ["Ethereum", "BSC", "Solana", "Base", "More"];
    return {
      rank,
      name: `${baseName} ${rank}`,
      symbol,
      price,
      h1: randomish(rank, -1.25, 1.35),
      h24: randomish(rank + 3, -6.4, 7.8),
      d7: randomish(rank + 5, -14.5, 17.2),
      marketCap,
      volume,
      supply: supplyFor(symbol, rank, price, marketCap),
      network: networkList[rank % networkList.length],
      category: ["Top"]
    };
  }).sort((a, b) => {
    const direction = state.sortDir === "asc" ? 1 : -1;
    return (a[state.sortKey] - b[state.sortKey]) * direction;
  });
}
function labelForSort(key) {
  return ({ marketCap: "market cap", volume: "24h volume", price: "price", h1: "1h change", h24: "24h change", d7: "7d change" })[key] || key;
}
function rowHtml(coin) {
  const up = coin.d7 >= 0;
  return `<tr>
    <td data-col="rank" class="rank-num">${coin.rank}</td>
    <td data-col="name"><div class="name-cell"><span class="coin-icon" style="background:${palette[coin.rank % palette.length]}">${coin.symbol.slice(0, 2)}</span><div class="coin-name"><strong>${coin.name} <span>${coin.symbol}</span><span class="network-chip">${coin.network}</span></strong></div></div></td>
    <td data-col="price" class="num">${formatMoney(coin.price, true)}</td>
    <td data-col="h1" class="num">${pct(coin.h1)}</td>
    <td data-col="h24" class="num">${pct(coin.h24)}</td>
    <td data-col="d7" class="num">${pct(coin.d7)}</td>
    <td data-col="marketCap" class="num">${formatMoney(coin.marketCap)}</td>
    <td data-col="volume" class="num">${formatMoney(coin.volume)}</td>
    <td data-col="supply" class="num supply">${coin.supply}</td>
    <td data-col="spark" class="chart-col">${sparkline(coin.rank, up)}</td>
  </tr>`;
}
function sparkline(seed, up) {
  const points = Array.from({ length: 9 }, (_, index) => {
    const base = up ? 24 + index * 4.9 : 66 - index * 4.4;
    const wobble = randomish(seed + index, -12, 12);
    return Math.max(8, Math.min(84, base + wobble));
  });
  const poly = points.map((y, index) => `${index * 14},${90 - y}`).join(" ");
  return `<svg class="mini-chart ${up ? "up" : "down"}" viewBox="0 0 112 72" preserveAspectRatio="none" aria-label="${up ? "Rising" : "Falling"} 7-day sparkline"><polyline points="${poly}"></polyline></svg>`;
}
function renderPagination(count) {
  const pages = isGlobalBrowse() ? 84 : Math.max(1, Math.ceil(count / 100));
  const display = [1, 2, 3, 4].filter((page) => page <= pages);
  const buttons = display.map((page) => `<button class="page-btn ${state.page === page ? "active" : ""}" type="button" data-page="${page}">${page}</button>`).join("");
  const trailing = pages > 4 ? `<span class="ellipsis">…</span><button class="page-btn" type="button" data-page="84">84</button>` : "";
  document.getElementById("paginationButtons").innerHTML = `<button class="page-btn" type="button" data-step="prev" ${state.page === 1 ? "disabled" : ""}>‹</button>${buttons}${trailing}<button class="page-btn" type="button" data-step="next" ${state.page >= pages ? "disabled" : ""}>›</button>`;
}
function setupControls() {
  document.querySelector("thead").addEventListener("click", (event) => {
    const th = event.target.closest("th.sortable");
    if (!th) return;
    if (state.sortKey === th.dataset.sort) state.sortDir = state.sortDir === "desc" ? "asc" : "desc";
    else { state.sortKey = th.dataset.sort; state.sortDir = "desc"; }
    render();
  });
  document.getElementById("paginationButtons").addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn || btn.disabled) return;
    const pages = isGlobalBrowse() ? 84 : Math.max(1, Math.ceil(filteredCoins().length / 100));
    if (btn.dataset.step === "prev") state.page = Math.max(1, state.page - 1);
    else if (btn.dataset.step === "next") state.page = Math.min(pages, state.page + 1);
    else state.page = Math.min(Number(btn.dataset.page), pages);
    render();
  });
  [["filtersBtn", "filterPanel"], ["columnsBtn", "columnsPanel"]].forEach(([btnId, panelId]) => {
    const btn = document.getElementById(btnId), panel = document.getElementById(panelId);
    btn.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      btn.setAttribute("aria-expanded", String(!panel.hidden));
      btn.classList.toggle("active", !panel.hidden);
    });
  });
  document.getElementById("priceFilter").addEventListener("change", (event) => { state.priceFilter = event.target.value; state.page = 1; render(); });
  document.getElementById("performanceFilter").addEventListener("change", (event) => { state.performanceFilter = event.target.value; state.page = 1; render(); });
  document.getElementById("searchFilter").addEventListener("input", (event) => { state.search = event.target.value; state.page = 1; render(); });
  document.getElementById("readMoreBtn").addEventListener("click", () => {
    const more = document.getElementById("moreSummary");
    more.hidden = !more.hidden;
    document.getElementById("readMoreBtn").textContent = more.hidden ? "Read More" : "Show Less";
  });
}
function setupColumns() {
  const labels = { rank: "Rank", name: "Name", price: "Price", h1: "1h %", h24: "24h %", d7: "7d %", marketCap: "Market Cap", volume: "Volume", supply: "Supply", spark: "7-Day Chart" };
  document.getElementById("columnsPanel").innerHTML = Object.entries(labels).map(([key, label]) => `<label class="column-toggle"><input type="checkbox" data-col-toggle="${key}" checked ${key === "name" ? "disabled" : ""}>${label}</label>`).join("");
  document.getElementById("columnsPanel").addEventListener("change", (event) => {
    const input = event.target.closest("input[data-col-toggle]");
    if (!input) return;
    if (input.checked) state.hiddenCols.delete(input.dataset.colToggle);
    else state.hiddenCols.add(input.dataset.colToggle);
    applyColumnVisibility();
  });
}
function applyColumnVisibility() {
  document.querySelectorAll("[data-col]").forEach((el) => el.dataset.hidden = String(state.hiddenCols.has(el.dataset.col)));
}
function setupPromo() {
  let index = 0;
  const show = () => { document.getElementById("promoTitle").textContent = promos[index][0]; document.getElementById("promoText").textContent = promos[index][1]; };
  document.getElementById("promoPrev").addEventListener("click", () => { index = (index + promos.length - 1) % promos.length; show(); });
  document.getElementById("promoNext").addEventListener("click", () => { index = (index + 1) % promos.length; show(); });
  setInterval(() => { index = (index + 1) % promos.length; show(); }, 6000);
}
function boot() {
  renderQuickAsks();
  initTabs("categoryTabs", categories, "category");
  initTabs("networkTabs", networks, "network");
  setupColumns();
  setupControls();
  setupPromo();
  render();
}
boot();
