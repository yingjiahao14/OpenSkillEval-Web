const baseCoins = [
  { rank: 1, name: "Bitcoin", symbol: "BTC", price: 75612.78, h1: 0.45, h24: 1.33, d7: 4.84, marketCap: 1.51e12, volume: 42.82e9, supply: "20.01M BTC", network: "Bitcoin", category: "Top", color: "#f7931a" },
  { rank: 2, name: "Ethereum", symbol: "ETH", price: 2356.00, h1: 0.51, h24: 0.80, d7: 6.29, marketCap: 284.35e9, volume: 21.36e9, supply: "120.69M ETH", network: "Ethereum", category: "Top", color: "#627eea" },
  { rank: 3, name: "Tether", symbol: "USDT", price: 1.00, h1: 0.01, h24: 0.03, d7: 0.01, marketCap: 185.84e9, volume: 138.79e9, supply: "185.8B USDT", network: "Ethereum", category: "Top", color: "#26a17b" },
  { rank: 4, name: "XRP", symbol: "XRP", price: 1.44, h1: 0.71, h24: 2.71, d7: 7.89, marketCap: 89.13e9, volume: 4.03e9, supply: "61.56B XRP", network: "More", category: "Top", color: "#23292f" },
  { rank: 5, name: "BNB", symbol: "BNB", price: 632.59, h1: 0.38, h24: 1.89, d7: 4.98, marketCap: 85.27e9, volume: 1.95e9, supply: "134.78M BNB", network: "BSC", category: "Top", color: "#f3ba2f" },
  { rank: 6, name: "USDC", symbol: "USDC", price: 1.00, h1: 0.00, h24: 0.02, d7: 0.01, marketCap: 61.18e9, volume: 11.93e9, supply: "61.17B USDC", network: "Ethereum", category: "Top", color: "#2775ca" },
  { rank: 7, name: "Solana", symbol: "SOL", price: 88.25, h1: 0.67, h24: 3.74, d7: 5.67, marketCap: 50.77e9, volume: 6.71e9, supply: "575.26M SOL", network: "Solana", category: "Top", color: "#14f195" }
];

const seedCoins = [
  ["DOGE","Dogecoin",0.175,"More"],["ADA","Cardano",0.59,"More"],["TRX","TRON",0.274,"More"],["LINK","Chainlink",14.85,"Ethereum"],["AVAX","Avalanche",22.14,"More"],["XLM","Stellar",0.27,"More"],["SUI","Sui",2.85,"More"],["TON","Toncoin",3.11,"More"],["HBAR","Hedera",0.169,"More"],["SHIB","Shiba Inu",0.000013,"Ethereum"],["BCH","Bitcoin Cash",412.42,"More"],["DOT","Polkadot",4.29,"More"],["LTC","Litecoin",85.81,"More"],["LEO","UNUS SED LEO",9.14,"Ethereum"],["DAI","Dai",1.00,"Ethereum"],["UNI","Uniswap",7.42,"Ethereum"],["NEAR","NEAR Protocol",2.92,"More"],["APT","Aptos",5.61,"More"],["ICP","Internet Computer",5.33,"More"],["ETC","Ethereum Classic",18.94,"More"],["TAO","Bittensor",386.15,"More"],["ONDO","Ondo",0.88,"Ethereum"],["POL","Polygon",0.235,"Ethereum"],["FIL","Filecoin",2.87,"More"],["ARB","Arbitrum",0.371,"Ethereum"],["KAS","Kaspa",0.082,"More"],["ATOM","Cosmos",4.77,"More"],["VET","VeChain",0.022,"More"],["RENDER","Render",4.38,"Solana"],["FET","Artificial Superintelligence",0.71,"Ethereum"],["ALGO","Algorand",0.19,"More"],["JUP","Jupiter",0.48,"Solana"],["SEI","Sei",0.21,"More"],["OP","Optimism",0.69,"Ethereum"],["BONK","Bonk",0.000018,"Solana"],["WIF","dogwifhat",0.71,"Solana"],["INJ","Injective",11.62,"More"],["AAVE","Aave",169.04,"Ethereum"],["MKR","Maker",1487.3,"Ethereum"],["GRT","The Graph",0.091,"Ethereum"],["RUNE","THORChain",1.28,"More"],["IMX","Immutable",0.55,"Ethereum"],["QNT","Quant",91.42,"Ethereum"],["ENA","Ethena",0.32,"Ethereum"],["TIA","Celestia",2.42,"More"],["STX","Stacks",0.64,"More"],["MNT","Mantle",0.61,"Ethereum"],["LDO","Lido DAO",0.83,"Ethereum"],["BGB","Bitget Token",4.82,"More"],["FLOW","Flow",0.41,"More"],["SAND","The Sandbox",0.28,"Ethereum"],["GALA","Gala",0.017,"Ethereum"],["FTM","Fantom",0.49,"More"],["XTZ","Tezos",0.64,"More"],["EGLD","MultiversX",16.9,"More"],["JASMY","JasmyCoin",0.014,"Ethereum"],["RAY","Raydium",2.18,"Solana"],["FLOKI","FLOKI",0.000082,"BSC"],["PYTH","Pyth Network",0.15,"Solana"],["BSV","Bitcoin SV",31.52,"More"],["CORE","Core",0.48,"BSC"],["EOS","EOS",0.56,"More"],["PENDLE","Pendle",2.93,"Ethereum"],["NEO","Neo",5.87,"More"],["AXS","Axie Infinity",2.78,"Ethereum"],["KAVA","Kava",0.42,"More"],["CFX","Conflux",0.086,"More"],["WLD","Worldcoin",0.89,"Ethereum"],["DYDX","dYdX",0.54,"Ethereum"],["CHZ","Chiliz",0.041,"Ethereum"],["CRV","Curve DAO",0.53,"Ethereum"],["MINA","Mina",0.24,"More"],["MANA","Decentraland",0.27,"Ethereum"],["ZEC","Zcash",33.26,"More"],["SNX","Synthetix",0.72,"Ethereum"],["CAKE","PancakeSwap",2.14,"BSC"],["ENS","Ethereum Name Service",17.36,"Ethereum"],["APE","ApeCoin",0.55,"Ethereum"],["ROSE","Oasis",0.031,"More"],["KSM","Kusama",14.18,"More"],["1INCH","1inch Network",0.18,"Ethereum"],["GMX","GMX",13.72,"Base"],["COMP","Compound",42.15,"Ethereum"],["ZIL","Zilliqa",0.011,"More"],["BAT","Basic Attention Token",0.13,"Ethereum"],["LUNC","Terra Classic",0.000058,"More"],["RSR","Reserve Rights",0.006,"Ethereum"],["BLUR","Blur",0.086,"Ethereum"],["SUSHI","SushiSwap",0.66,"Ethereum"],["ANKR","Ankr",0.017,"Ethereum"],["GMT","GMT",0.041,"Solana"],["SKL","SKALE",0.026,"Ethereum"],["ILV","Illuvium",13.48,"Ethereum"]
];

const categories = ["Top", "Trending", "Watchlist", "Prediction Markets", "Most Visited", "New"];
const colors = ["#3861fb", "#16c784", "#ea3943", "#8b5cf6", "#f59e0b", "#06b6d4", "#64748b"];

const generatedCoins = seedCoins.map((coin, index) => {
  const rank = index + 8;
  const marketCap = Math.max(360e6, 48e9 / Math.pow(rank - 4, 0.72));
  const volume = Math.max(14e6, marketCap * (0.018 + ((rank % 9) * 0.006)));
  const h24 = Number((((rank % 11) - 4) * 0.37 + (rank % 3) * 0.11).toFixed(2));
  const h1 = Number((((rank % 7) - 3) * 0.13).toFixed(2));
  const d7 = Number((h24 * 2.15 + ((rank % 10) - 4) * 0.63).toFixed(2));
  const supplyAmount = Math.max(8.7, marketCap / coin[2]);
  const unit = supplyAmount > 1e9 ? `${(supplyAmount / 1e9).toFixed(2)}B` : `${(supplyAmount / 1e6).toFixed(2)}M`;
  return {
    rank,
    symbol: coin[0],
    name: coin[1],
    price: coin[2],
    network: coin[3],
    h1,
    h24,
    d7,
    marketCap,
    volume,
    supply: `${unit} ${coin[0]}`,
    category: categories[rank % categories.length],
    color: colors[rank % colors.length]
  };
});

let coins = [...baseCoins, ...generatedCoins].slice(0, 100);
let state = { category: "Top", network: "All Networks", sort: "marketCap", page: 1, minCap: 0, movement: "all", query: "" };
let promoIndex = 0;
const promos = [
  ["CTP Launch: Secure $GENIUS Airdrop — Join Now", "Participate in CoinTracker Pro launch rewards and track eligible ecosystem actions in one dashboard."],
  ["Featured partner promotions and ecosystem updates", "Monitor exchange campaigns, ecosystem grants, and liquidity milestones as market narratives rotate."],
  ["Institutional dashboards, now faster", "Sortable rankings, market alerts, and sector views optimized for high-frequency scanning."]
];

const tbody = document.getElementById("coinRows");
const statusEl = document.getElementById("tableStatus");
const showingRange = document.getElementById("showingRange");

function formatCurrency(value) {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1) return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${value.toLocaleString(undefined, { minimumSignificantDigits: 2, maximumSignificantDigits: 4 })}`;
}

function formatPrice(value) {
  if (value >= 1000) return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (value >= 1) return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${value.toLocaleString(undefined, { maximumSignificantDigits: 4 })}`;
}

function percentCell(value) {
  const cls = value >= 0 ? "positive" : "negative";
  const sign = value >= 0 ? "+" : "";
  return `<span class="${cls}">${sign}${value.toFixed(2)}%</span>`;
}

function sparkline(coin) {
  const points = Array.from({ length: 7 }, (_, i) => {
    const wave = Math.sin((coin.rank + i) * 0.85) * 7;
    const trend = coin.d7 >= 0 ? i * 4.5 : (6 - i) * 4.5;
    const base = 27 - trend + wave;
    return Math.max(4, Math.min(34, base));
  });
  const coords = points.map((y, i) => `${i * 20},${y}`).join(" ");
  const area = `M0,38 L${coords.replaceAll(" ", " L")} L120,38 Z`;
  const line = `M${coords.replaceAll(" ", " L")}`;
  return `<span class="sparkline ${coin.d7 < 0 ? "negative" : ""}" aria-label="7-day ${coin.d7 >= 0 ? "upward" : "downward"} trend"><svg viewBox="0 0 120 38" role="img"><path class="area" d="${area}"/><path class="line" d="${line}"/></svg></span>`;
}

function filteredCoins() {
  let rows = [...coins];
  if (state.category !== "Top") {
    if (state.category === "Watchlist") rows = rows.filter(c => [1,2,5,6,8,11,24,39,56].includes(c.rank));
    else rows = rows.filter(c => c.category === state.category || c.rank % (categories.indexOf(state.category) + 2) === 0);
  }
  if (state.network !== "All Networks") rows = rows.filter(c => c.network === state.network || (state.network === "More" && !["BSC","Solana","Base","Ethereum"].includes(c.network)));
  if (state.minCap) rows = rows.filter(c => c.marketCap >= state.minCap);
  if (state.movement === "gainers") rows = rows.filter(c => c.h24 >= 0);
  if (state.movement === "losers") rows = rows.filter(c => c.h24 < 0);
  if (state.query) rows = rows.filter(c => `${c.name} ${c.symbol}`.toLowerCase().includes(state.query));
  rows.sort((a, b) => state.sort === "volume" ? b.volume - a.volume : b.marketCap - a.marketCap);
  return rows;
}

function renderTable() {
  const rows = filteredCoins();
  const displayRows = rows.length ? rows : coins.slice(0, 100);
  tbody.innerHTML = displayRows.map((coin, index) => `
    <tr>
      <td class="rank-col num">${coin.rank}</td>
      <td class="name-col">
        <div class="coin-name">
          <span class="star" aria-hidden="true">☆</span>
          <span class="logo" style="--coin-color:${coin.color}">${coin.symbol.slice(0, 2)}</span>
          <span><strong>${coin.name}</strong><small>${coin.symbol}</small><span class="network-badge">${coin.network}</span></span>
        </div>
      </td>
      <td class="num col-price">${formatPrice(coin.price)}</td>
      <td class="num col-h1">${percentCell(coin.h1)}</td>
      <td class="num col-h24">${percentCell(coin.h24)}</td>
      <td class="num col-d7">${percentCell(coin.d7)}</td>
      <td class="num col-marketCap">${formatCurrency(coin.marketCap)}</td>
      <td class="num col-volume">${formatCurrency(coin.volume)}</td>
      <td class="num col-supply">${coin.supply}</td>
      <td class="spark-col col-sparkline">${sparkline(coin)}</td>
    </tr>`).join("");
  const visible = displayRows.length;
  statusEl.textContent = `Showing ${visible ? 1 : 0}–${visible} of 8,364 assets · ${state.category} · ${state.network}`;
  showingRange.textContent = state.page === 1 ? `1–${visible}` : `${(state.page - 1) * 100 + 1}–${state.page * 100}`;
}

function setActive(group, key, value) {
  document.querySelectorAll(`#${group} .tab`).forEach(button => {
    const active = button.dataset[key] === value;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

document.getElementById("categoryTabs").addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  setActive("categoryTabs", "category", state.category);
  renderTable();
});

document.getElementById("networkTabs").addEventListener("click", event => {
  const button = event.target.closest("button[data-network]");
  if (!button) return;
  state.network = button.dataset.network;
  setActive("networkTabs", "network", state.network);
  renderTable();
});

document.getElementById("filtersToggle").addEventListener("click", event => {
  const panel = document.getElementById("filterPanel");
  panel.hidden = !panel.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!panel.hidden));
});

document.getElementById("columnsToggle").addEventListener("click", event => {
  const panel = document.getElementById("columnsPanel");
  panel.hidden = !panel.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!panel.hidden));
});

document.getElementById("marketCapFilter").addEventListener("change", event => { state.minCap = Number(event.target.value); renderTable(); });
document.getElementById("movementFilter").addEventListener("change", event => { state.movement = event.target.value; renderTable(); });
document.getElementById("assetSearch").addEventListener("input", event => { state.query = event.target.value.trim().toLowerCase(); renderTable(); });

document.getElementById("sortMarketCap").addEventListener("click", event => {
  state.sort = "marketCap";
  document.getElementById("sortVolume").classList.remove("active-sort");
  event.currentTarget.classList.add("active-sort");
  renderTable();
});
document.getElementById("sortVolume").addEventListener("click", event => {
  state.sort = "volume";
  document.getElementById("sortMarketCap").classList.remove("active-sort");
  event.currentTarget.classList.add("active-sort");
  renderTable();
});

document.getElementById("columnsPanel").addEventListener("change", event => {
  const checkbox = event.target.closest("input[type='checkbox']");
  if (!checkbox) return;
  document.body.classList.toggle(`hide-${checkbox.dataset.column}`, !checkbox.checked);
});

document.getElementById("pageButtons").addEventListener("click", event => {
  const button = event.target.closest("button[data-page]");
  if (!button) return;
  state.page = Number(button.dataset.page);
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active", page === button));
  const offset = (state.page - 1) * 100;
  coins = coins.map((coin, index) => ({ ...coin, rank: offset + index + 1 }));
  renderTable();
  document.querySelector(".dashboard-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

function updatePromo(next = 1) {
  promoIndex = (promoIndex + next + promos.length) % promos.length;
  document.getElementById("promoTitle").textContent = promos[promoIndex][0];
  document.getElementById("promoText").textContent = promos[promoIndex][1];
}
document.getElementById("promoPrev").addEventListener("click", () => updatePromo(-1));
document.getElementById("promoNext").addEventListener("click", () => updatePromo(1));
setInterval(() => updatePromo(1), 6500);

document.getElementById("summaryToggle").addEventListener("click", event => {
  const more = document.getElementById("summaryMore");
  more.hidden = !more.hidden;
  event.currentTarget.textContent = more.hidden ? "Read More" : "Show Less";
  event.currentTarget.setAttribute("aria-expanded", String(!more.hidden));
});

renderTable();
