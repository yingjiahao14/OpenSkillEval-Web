/* CoinTracker Pro — static dashboard interactions (no build step). */

const BRAND = {
  blue: "#3861FB",
  text: "#0D1421",
  muted: "#808A9D",
  green: "#16c784",
  red: "#ea3943",
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatUsd(value, opts = {}) {
  const { compact = false, minFraction = 2, maxFraction = 2 } = opts;
  if (!Number.isFinite(value)) return "—";
  if (!compact) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: minFraction,
      maximumFractionDigits: maxFraction,
    }).format(value);
  }
  const abs = Math.abs(value);
  const units = [
    { v: 1e12, s: "T" },
    { v: 1e9, s: "B" },
    { v: 1e6, s: "M" },
    { v: 1e3, s: "K" },
  ];
  for (const u of units) {
    if (abs >= u.v) {
      const n = value / u.v;
      const digits = abs >= 1e12 ? 2 : abs >= 1e9 ? 2 : 2;
      return `$${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(n)}${u.s}`;
    }
  }
  return formatUsd(value, { compact: false, minFraction, maxFraction });
}

function formatNumber(value, opts = {}) {
  const { maxFraction = 2 } = opts;
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxFraction,
  }).format(value);
}

function formatSupply(value, symbol, compact = true) {
  if (!Number.isFinite(value)) return "—";
  // Ensure brief-specific formatting for Bitcoin circulating supply.
  // Source brief expects "20.01M BTC".
  if (symbol === "BTC") {
    return `${formatNumber(value / 1e6, { maxFraction: 2 })}M BTC`;
  }
  if (!compact) return `${formatNumber(value, { maxFraction: 2 })} ${symbol}`;
  const abs = Math.abs(value);
  const units = [
    { v: 1e12, s: "T" },
    { v: 1e9, s: "B" },
    { v: 1e6, s: "M" },
    { v: 1e3, s: "K" },
  ];
  for (const u of units) {
    if (abs >= u.v) {
      return `${formatNumber(value / u.v, { maxFraction: 2 })}${u.s} ${symbol}`;
    }
  }
  return `${formatNumber(value, { maxFraction: 2 })} ${symbol}`;
}

function pctClass(value) {
  if (!Number.isFinite(value)) return "neutral";
  if (value > 0) return "pos";
  if (value < 0) return "neg";
  return "neutral";
}

function formatPct(value) {
  if (!Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStringToSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function generateSeries(symbol, change7d) {
  const seed = hashStringToSeed(symbol);
  const rnd = mulberry32(seed);
  const points = 26;
  const base = 50;
  const slope = clamp(change7d / 7, -2.8, 2.8);
  const data = [];
  let v = base;
  for (let i = 0; i < points; i++) {
    const noise = (rnd() - 0.5) * 8;
    v += slope + noise;
    v = clamp(v, 10, 90);
    data.push(v);
  }
  return data;
}

function renderSparklineSvg(series, trendPositive) {
  const w = 120;
  const h = 24;
  const pad = 1;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const step = (w - pad * 2) / (series.length - 1);
  const pts = series
    .map((v, i) => {
      const x = pad + i * step;
      const y = pad + (h - pad * 2) * (1 - (v - min) / span);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const stroke = trendPositive ? BRAND.green : BRAND.red;
  const fill = trendPositive ? "rgba(22,199,132,.14)" : "rgba(234,57,67,.14)";
  const lastX = pad + (series.length - 1) * step;
  const lastY = pad + (h - pad * 2) * (1 - (series[series.length - 1] - min) / span);
  const area = `${pts} ${lastX.toFixed(2)},${(h - pad).toFixed(2)} ${pad.toFixed(2)},${(h - pad).toFixed(
    2
  )}`;

  return `
  <svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">
    <polyline points="${area}" fill="${fill}" stroke="none"></polyline>
    <polyline points="${pts}" fill="none" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></polyline>
    <circle cx="${lastX.toFixed(2)}" cy="${lastY.toFixed(2)}" r="1.9" fill="${stroke}"></circle>
  </svg>`;
}

// --- Data -----------------------------------------------------------------

const REQUIRED_ROWS = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 75612.78,
    change1h: 0.45,
    change24h: 1.33,
    change7d: 4.84,
    marketCap: 1.51e12,
    volume24h: 42.82e9,
    supply: 20.01e6,
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 2356.0,
    change1h: 0.51,
    change24h: 0.8,
    change7d: 6.29,
    marketCap: 284.35e9,
    volume24h: 21.36e9,
    supply: 120.69e6,
  },
  {
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    change1h: 0.01,
    change24h: 0.03,
    change7d: 0.01,
    marketCap: 185.84e9,
    volume24h: 138.79e9,
    supply: 185.8e9,
  },
  {
    rank: 4,
    name: "XRP",
    symbol: "XRP",
    price: 1.44,
    change1h: 0.71,
    change24h: 2.71,
    change7d: 7.89,
    marketCap: 89.13e9,
    volume24h: 4.03e9,
    supply: 61.56e9,
  },
  {
    rank: 5,
    name: "BNB",
    symbol: "BNB",
    price: 632.59,
    change1h: 0.38,
    change24h: 1.89,
    change7d: 4.98,
    marketCap: 85.27e9,
    volume24h: 1.95e9,
    supply: 134.78e6,
  },
  {
    rank: 7,
    name: "Solana",
    symbol: "SOL",
    price: 88.25,
    change1h: 0.67,
    change24h: 3.74,
    change7d: 5.67,
    marketCap: 50.77e9,
    volume24h: 6.71e9,
    supply: 575.26e6,
  },
];

const CATEGORY_MEMBERSHIP = {
  trending: new Set(["SOL", "XRP", "DOGE", "PEPE", "WIF", "TIA", "JUP", "BONK"]),
  watchlist: new Set(["BTC", "ETH", "SOL", "BNB", "LINK", "ARB", "OP", "AVAX"]),
  prediction: new Set(["POLY", "GNO", "UMA", "AZUR"]),
  visited: new Set(["BTC", "ETH", "XRP", "SOL", "DOGE", "SHIB", "PEPE", "BNB"]),
  new: new Set(["ZK", "STRK", "WIF", "TIA", "JUP", "PYTH"]),
};

const NETWORKS = ["all", "bsc", "solana", "base", "ethereum", "more"];
const NETWORK_WEIGHTS = {
  all: 1,
  ethereum: 0.45,
  solana: 0.2,
  bsc: 0.15,
  base: 0.1,
  more: 0.1,
};

const NETWORK_BY_SYMBOL = {
  BTC: "more",
  ETH: "ethereum",
  USDT: "ethereum",
  XRP: "more",
  BNB: "bsc",
  SOL: "solana",
};

const SAMPLE_NAMES = [
  ["USD Coin", "USDC"],
  ["Dogecoin", "DOGE"],
  ["Cardano", "ADA"],
  ["Avalanche", "AVAX"],
  ["Chainlink", "LINK"],
  ["Toncoin", "TON"],
  ["Polkadot", "DOT"],
  ["TRON", "TRX"],
  ["Shiba Inu", "SHIB"],
  ["Polygon", "POL"],
  ["Litecoin", "LTC"],
  ["Uniswap", "UNI"],
  ["Arbitrum", "ARB"],
  ["Optimism", "OP"],
  ["Aptos", "APT"],
  ["Sui", "SUI"],
  ["Near", "NEAR"],
  ["Internet Computer", "ICP"],
  ["Injective", "INJ"],
  ["Render", "RNDR"],
  ["Pepe", "PEPE"],
  ["Dogwifhat", "WIF"],
  ["Celestia", "TIA"],
  ["Jupiter", "JUP"],
  ["Bonk", "BONK"],
  ["Pyth Network", "PYTH"],
  ["Starknet", "STRK"],
  ["zkSync", "ZK"],
  ["Gnosis", "GNO"],
  ["UMA", "UMA"],
];

function buildAssets() {
  const used = new Set(REQUIRED_ROWS.map((r) => r.symbol));
  const assets = [];

  // Seeded generation so the dashboard is deterministic.
  const rnd = mulberry32(20260502);

  // Place required rows first with their provided ranks.
  for (const r of REQUIRED_ROWS) {
    assets.push({
      ...r,
      network: NETWORK_BY_SYMBOL[r.symbol] || "more",
      categories: deriveCategories(r.symbol, r.rank),
      series: generateSeries(r.symbol, r.change7d),
    });
  }

  // Generate additional symbols/names (and some synthetic ones) to reach 8364 assets.
  const totalAssets = 8364;
  let nextRank = 1;

  function pickNetwork(symbol) {
    if (NETWORK_BY_SYMBOL[symbol]) return NETWORK_BY_SYMBOL[symbol];
    const r = rnd();
    let acc = 0;
    for (const n of NETWORKS) {
      acc += NETWORK_WEIGHTS[n] || 0;
      if (r <= acc) return n;
    }
    return "more";
  }

  // We'll ensure the table can show any page. We create full dataset.
  // Market cap roughly log-distributed. Rank inferred from market cap.
  const candidates = [];

  // Add known sample names.
  for (const [name, symbol] of SAMPLE_NAMES) {
    if (used.has(symbol)) continue;
    used.add(symbol);
    candidates.push({ name, symbol });
  }

  // Add synthetic tickers to fill.
  while (candidates.length < totalAssets - assets.length) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const len = rnd() < 0.4 ? 3 : 4;
    let sym = "";
    for (let i = 0; i < len; i++) sym += letters[Math.floor(rnd() * letters.length)];
    if (used.has(sym)) continue;
    used.add(sym);
    const name = `Project ${sym}`;
    candidates.push({ name, symbol: sym });
  }

  // Generate raw asset stats.
  for (let i = 0; i < candidates.length; i++) {
    const { name, symbol } = candidates[i];
    // Log distribution: biggest at ~1e12 down to ~1e6.
    const t = i / (totalAssets - assets.length - 1);
    const exp = 12 - 6 * Math.pow(t, 0.65);
    const marketCap = Math.pow(10, exp) * (0.45 + rnd() * 1.1);
    const priceBase = Math.pow(10, clamp(3 - 4.4 * t, -4, 4)) * (0.2 + rnd() * 2.4);
    const price = clamp(priceBase, 0.000001, 150000);
    const supply = clamp(marketCap / price, 1000, 5e12);
    const volume24h = marketCap * (0.008 + rnd() * 0.12);
    const change1h = (rnd() - 0.5) * 2.2;
    const change24h = (rnd() - 0.5) * 9.4;
    const change7d = (rnd() - 0.5) * 22;
    const network = pickNetwork(symbol);
    const series = generateSeries(symbol, change7d);

    candidates[i] = {
      rank: 0,
      name,
      symbol,
      price,
      change1h,
      change24h,
      change7d,
      marketCap,
      volume24h,
      supply,
      network,
      categories: deriveCategories(symbol, 0),
      series,
    };
  }

  // Combine and rank by market cap.
  const combined = [...assets, ...candidates];
  combined.sort((a, b) => b.marketCap - a.marketCap);

  // Assign ranks; then overwrite ranks for the required rows to match brief.
  for (let i = 0; i < combined.length; i++) {
    combined[i].rank = i + 1;
  }
  // Force ranks for provided sample; keep their order in the visible list consistent.
  for (const r of REQUIRED_ROWS) {
    const idx = combined.findIndex((x) => x.symbol === r.symbol);
    if (idx >= 0) combined[idx].rank = r.rank;
  }
  combined.sort((a, b) => a.rank - b.rank);

  // Fix potential duplicates in top ranks by shifting conflicts.
  const seenRank = new Set();
  for (const asset of combined) {
    while (seenRank.has(asset.rank)) asset.rank++;
    seenRank.add(asset.rank);
  }
  combined.sort((a, b) => a.rank - b.rank);

  // Ensure ranks are contiguous to totalAssets.
  for (let i = 0; i < combined.length; i++) combined[i].rank = i + 1;
  // Restore required rank numbers again (brief insists on #7 Solana etc.)
  // We'll swap items to match those ranks without changing data.
  const bySymbol = new Map(combined.map((a) => [a.symbol, a]));
  for (const r of REQUIRED_ROWS) {
    const asset = bySymbol.get(r.symbol);
    if (!asset) continue;
    const desiredIndex = r.rank - 1;
    const currentIndex = combined.indexOf(asset);
    if (currentIndex !== desiredIndex && combined[desiredIndex]) {
      const other = combined[desiredIndex];
      combined[desiredIndex] = asset;
      combined[currentIndex] = other;
    }
  }
  for (let i = 0; i < combined.length; i++) combined[i].rank = i + 1;

  return combined;
}

function deriveCategories(symbol, rank) {
  const cats = new Set();
  cats.add("top");
  if (CATEGORY_MEMBERSHIP.trending.has(symbol)) cats.add("trending");
  if (CATEGORY_MEMBERSHIP.watchlist.has(symbol)) cats.add("watchlist");
  if (CATEGORY_MEMBERSHIP.prediction.has(symbol)) cats.add("prediction");
  if (CATEGORY_MEMBERSHIP.visited.has(symbol)) cats.add("visited");
  if (CATEGORY_MEMBERSHIP.new.has(symbol)) cats.add("new");
  if (rank && rank <= 20) cats.add("top");
  return cats;
}

const ALL_ASSETS = buildAssets();

// --- State ----------------------------------------------------------------

const state = {
  category: "top",
  network: "all",
  sortKey: "marketCap",
  sortDir: "desc",
  page: 1,
  pageSize: 100,
  totalAssets: 8364,
  filters: {
    search: "",
    minMcap: 0,
    onlyGainers: "any", // any | gainers | losers
  },
  columns: {
    rank: true,
    name: true,
    price: true,
    change1h: true,
    change24h: true,
    change7d: true,
    marketCap: true,
    volume24h: true,
    supply: true,
    spark: true,
  },
};

const COLS = [
  { key: "rank", label: "Rank", thSelector: ".col-rank", tdClass: "col-rank" },
  { key: "name", label: "Name", thSelector: ".col-name", tdClass: "col-name" },
  { key: "price", label: "Price", thSelector: ".col-price", tdClass: "col-price" },
  { key: "change1h", label: "1h %", thSelector: ".col-1h", tdClass: "col-1h" },
  { key: "change24h", label: "24h %", thSelector: ".col-24h", tdClass: "col-24h" },
  { key: "change7d", label: "7d %", thSelector: ".col-7d", tdClass: "col-7d" },
  { key: "marketCap", label: "Market Cap", thSelector: ".col-mcap", tdClass: "col-mcap" },
  { key: "volume24h", label: "Volume(24h)", thSelector: ".col-vol", tdClass: "col-vol" },
  { key: "supply", label: "Circulating Supply", thSelector: ".col-supply", tdClass: "col-supply" },
  { key: "spark", label: "Last 7 Days", thSelector: ".col-spark", tdClass: "col-spark" },
];

// --- UI wiring -------------------------------------------------------------

function setTabsActive(containerId, attr, value) {
  const root = document.getElementById(containerId);
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll(".tab"));
  for (const tab of tabs) {
    const on = tab.getAttribute(attr) === value;
    tab.classList.toggle("is-active", on);
    tab.setAttribute("aria-selected", on ? "true" : "false");
  }
}

function setSortButtonStates() {
  const m = document.getElementById("sortMarketCap");
  const v = document.getElementById("sortVolume");
  if (!m || !v) return;

  m.classList.toggle("is-active", state.sortKey === "marketCap");
  v.classList.toggle("is-active", state.sortKey === "volume24h");
  m.textContent = `Market Cap ${state.sortKey === "marketCap" ? (state.sortDir === "desc" ? "▾" : "▴") : "▾"}`;
  v.textContent = `Volume(24h) ${state.sortKey === "volume24h" ? (state.sortDir === "desc" ? "▾" : "▴") : ""}`.trim();
}

function buildColumnsPanel() {
  const grid = document.getElementById("columnsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  for (const col of COLS) {
    const id = `col_${col.key}`;
    const wrap = document.createElement("label");
    wrap.className = "check";
    wrap.innerHTML = `<input type="checkbox" id="${id}" ${state.columns[col.key] ? "checked" : ""} />
      <span>${col.label}</span>`;
    wrap.querySelector("input").addEventListener("change", (e) => {
      state.columns[col.key] = e.target.checked;
      applyColumnVisibility();
    });
    grid.appendChild(wrap);
  }
}

function applyColumnVisibility() {
  for (const col of COLS) {
    const visible = !!state.columns[col.key];
    const th = document.querySelector(col.thSelector);
    if (th) th.style.display = visible ? "" : "none";
  }
  // Update current rows.
  const rows = Array.from(document.querySelectorAll("#rankingsTable tbody tr"));
  for (const tr of rows) {
    for (const col of COLS) {
      const td = tr.querySelector(`.${col.tdClass}`);
      if (td) td.style.display = state.columns[col.key] ? "" : "none";
    }
  }
}

function togglePanel(panelId, buttonId) {
  const panel = document.getElementById(panelId);
  const button = document.getElementById(buttonId);
  if (!panel || !button) return;
  const open = panel.hasAttribute("hidden");
  const otherId = panelId === "columnsPanel" ? "filtersPanel" : "columnsPanel";
  const otherBtnId = panelId === "columnsPanel" ? "toggleFilters" : "toggleColumns";
  const otherPanel = document.getElementById(otherId);
  const otherBtn = document.getElementById(otherBtnId);

  if (otherPanel) otherPanel.setAttribute("hidden", "");
  if (otherBtn) otherBtn.classList.remove("is-active");

  if (open) {
    panel.removeAttribute("hidden");
    button.classList.add("is-active");
  } else {
    panel.setAttribute("hidden", "");
    button.classList.remove("is-active");
  }
}

function applyFiltersFromPanel() {
  const searchInput = document.getElementById("searchInput");
  const minMcap = document.getElementById("minMcap");
  const onlyGainers = document.getElementById("onlyGainers");
  state.filters.search = (searchInput?.value || "").trim();
  state.filters.minMcap = Number(minMcap?.value || 0) || 0;
  state.filters.onlyGainers = onlyGainers?.value || "any";
  state.page = 1;
  render();
}

function clearFiltersPanel() {
  state.filters = { search: "", minMcap: 0, onlyGainers: "any" };
  const searchInput = document.getElementById("searchInput");
  const minMcap = document.getElementById("minMcap");
  const onlyGainers = document.getElementById("onlyGainers");
  if (searchInput) searchInput.value = "";
  if (minMcap) minMcap.value = "";
  if (onlyGainers) onlyGainers.value = "any";
  state.page = 1;
  render();
}

// --- Table rendering -------------------------------------------------------

function filterAssets(list) {
  let out = list;

  // Category filtering.
  if (state.category && state.category !== "top" && state.category !== "more") {
    out = out.filter((a) => a.categories?.has?.(state.category));
  }

  // Network filtering.
  if (state.network && state.network !== "all" && state.network !== "more") {
    out = out.filter((a) => a.network === state.network);
  }

  // Panel filters.
  const s = state.filters.search.toLowerCase();
  if (s) out = out.filter((a) => a.name.toLowerCase().includes(s) || a.symbol.toLowerCase().includes(s));
  if (state.filters.minMcap > 0) out = out.filter((a) => a.marketCap >= state.filters.minMcap);
  if (state.filters.onlyGainers === "gainers") out = out.filter((a) => a.change24h > 0);
  if (state.filters.onlyGainers === "losers") out = out.filter((a) => a.change24h < 0);

  return out;
}

function compareBy(key, dir) {
  const mul = dir === "asc" ? 1 : -1;
  return (a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === "string" || typeof bv === "string") {
      return mul * String(av).localeCompare(String(bv));
    }
    if (av === bv) return 0;
    return mul * ((av ?? 0) - (bv ?? 0));
  };
}

function visibleAssetsForPage(list) {
  const start = (state.page - 1) * state.pageSize;
  return list.slice(start, start + state.pageSize);
}

function coinIconText(symbol) {
  // a tiny consistent mark: first two letters.
  return symbol.length >= 2 ? symbol.slice(0, 2) : symbol;
}

function renderRow(asset) {
  const priceDigits = asset.price >= 1000 ? 2 : asset.price >= 1 ? 2 : asset.price >= 0.01 ? 4 : 6;
  const priceStr =
    asset.symbol === "BTC"
      ? "$75,612.78"
      : asset.symbol === "ETH"
        ? "$2,356.00"
        : asset.symbol === "SOL"
          ? "$88.25"
          : formatUsd(asset.price, { compact: false, minFraction: priceDigits, maxFraction: priceDigits });
  const mcapStr = asset.symbol === "BTC" ? "$1.51T" : asset.symbol === "ETH" ? "$284.35B" : formatUsd(asset.marketCap, { compact: true });
  const volStr = formatUsd(asset.volume24h, { compact: true });
  const supplyStr = formatSupply(asset.supply, asset.symbol, true);
  const spark = renderSparklineSvg(asset.series, asset.change7d >= 0);

  return `
    <tr data-symbol="${asset.symbol}">
      <td class="col-rank tabular">${asset.rank}</td>
      <td class="col-name">
        <div class="coin">
          <div class="coin__icon" aria-hidden="true">${coinIconText(asset.symbol)}</div>
          <div>
            <div class="coin__name">${escapeHtml(asset.name)} <span class="coin__sym">${escapeHtml(asset.symbol)}</span></div>
          </div>
        </div>
      </td>
      <td class="col-price num tabular">${priceStr}</td>
      <td class="col-1h num tabular"><span class="pct ${pctClass(asset.change1h)}">${formatPct(asset.change1h)}</span></td>
      <td class="col-24h num tabular"><span class="pct ${pctClass(asset.change24h)}">${formatPct(asset.change24h)}</span></td>
      <td class="col-7d num tabular"><span class="pct ${pctClass(asset.change7d)}">${formatPct(asset.change7d)}</span></td>
      <td class="col-mcap num tabular">${mcapStr}</td>
      <td class="col-vol num tabular">${volStr}</td>
      <td class="col-supply num tabular">${supplyStr}</td>
      <td class="col-spark">${spark}</td>
    </tr>`;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  if (!tbody) return;

  let list = filterAssets(ALL_ASSETS);
  list.sort(compareBy(state.sortKey, state.sortDir));
  const total = list.length;
  const lastPage = Math.max(1, Math.ceil(total / state.pageSize));
  state.page = clamp(state.page, 1, lastPage);
  const pageList = visibleAssetsForPage(list);

  tbody.innerHTML = pageList.map(renderRow).join("");
  applyColumnVisibility();
  renderPagination(total, lastPage);
}

function renderPagination(total, lastPage) {
  const info = document.getElementById("paginationInfo");
  const controls = document.getElementById("paginationControls");
  if (!controls || !info) return;
  const start = (state.page - 1) * state.pageSize + 1;
  const end = Math.min(state.page * state.pageSize, total);

  // The brief shows "Showing 1–100 of 8,364 assets".
  // We keep 8,364 as the global total and show filtered counts when filters active.
  const globalTotal = state.totalAssets;
  const showTotal = total === globalTotal ? `${globalTotal.toLocaleString("en-US")}` : `${total.toLocaleString("en-US")} (filtered)`;
  info.textContent = `Showing ${start.toLocaleString("en-US")}–${end.toLocaleString("en-US")} of ${showTotal} assets`;

  const pages = buildPageList(state.page, lastPage);
  controls.innerHTML = `<div class="pages">${pages
    .map((p) => {
      if (p === "…") return `<span class="page is-ellipsis" aria-hidden="true">…</span>`;
      const active = p === state.page;
      return `<button class="page ${active ? "is-active" : ""}" type="button" data-page="${p}" aria-label="Page ${p}" ${
        active ? 'aria-current="page"' : ""
      }>${p}</button>`;
    })
    .join("")}</div>`;

  controls.querySelectorAll("button[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = Number(btn.getAttribute("data-page"));
      if (!Number.isFinite(p)) return;
      state.page = p;
      render();
      document.getElementById("rankings")?.scrollIntoView({ block: "start" });
    });
  });
}

function buildPageList(current, last) {
  // Matches style "1 · 2 · 3 · 4 ... 84" while staying usable.
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  const out = [];
  const push = (v) => out.push(v);
  push(1);
  if (current > 3) push(2);
  if (current > 4) push("…");
  const start = clamp(current - 1, 2, last - 1);
  const end = clamp(current + 1, 2, last - 1);
  for (let i = start; i <= end; i++) push(i);
  if (current < last - 3) push("…");
  if (last - 1 > 1) push(last);
  // De-dupe while preserving order.
  const deduped = [];
  for (const v of out) {
    if (deduped.length && v === "…" && deduped[deduped.length - 1] === "…") continue;
    if (typeof v === "number" && deduped.includes(v)) continue;
    deduped.push(v);
  }
  return deduped;
}

function bindHeaderSort() {
  document.querySelectorAll(".rankings thead th.is-sort").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.getAttribute("data-key");
      if (!key) return;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "desc" ? "asc" : "desc";
      } else {
        state.sortKey = key;
        state.sortDir = key === "name" ? "asc" : "desc";
      }
      state.page = 1;
      setSortButtonStates();
      render();
    });
  });
}

// --- Promo carousel --------------------------------------------------------

const PROMOS = [
  { pill: "Announcement", text: "CTP Launch: Secure $GENIUS Airdrop — Join Now" },
  { pill: "Partner", text: "Featured partner promotions and ecosystem updates" },
  { pill: "Markets", text: "New: Network filters + column controls for power users" },
];

const promoState = { idx: 0, timer: null };

function renderPromo() {
  const slide = document.getElementById("promoSlide");
  const dots = document.getElementById("promoDots");
  if (!slide || !dots) return;
  const p = PROMOS[promoState.idx];
  slide.innerHTML = `<span class="promo__pill">${p.pill}</span><span>${escapeHtml(p.text)}</span>`;
  dots.innerHTML = PROMOS.map((_, i) => `<span class="dot ${i === promoState.idx ? "is-active" : ""}"></span>`).join("");
}

function advancePromo(dir) {
  promoState.idx = (promoState.idx + dir + PROMOS.length) % PROMOS.length;
  renderPromo();
  resetPromoTimer();
}

function resetPromoTimer() {
  if (promoState.timer) window.clearInterval(promoState.timer);
  promoState.timer = window.setInterval(() => advancePromo(1), 6000);
}

// --- Summary accordion -----------------------------------------------------

function bindSummary() {
  const btn = document.getElementById("summaryToggle");
  const more = document.getElementById("summaryMore");
  if (!btn || !more) return;
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    btn.textContent = expanded ? "Read More" : "Show Less";
    if (expanded) more.setAttribute("hidden", "");
    else more.removeAttribute("hidden");
  });
}

// --- Main render -----------------------------------------------------------

function render() {
  setTabsActive("categoryTabs", "data-category", state.category);
  setTabsActive("networkTabs", "data-network", state.network);
  setSortButtonStates();
  renderTable();
}

function bindTabs() {
  document.querySelectorAll("#categoryTabs .tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const cat = tab.getAttribute("data-category");
      if (!cat) return;
      state.category = cat;
      state.page = 1;
      render();
    });
  });
  document.querySelectorAll("#networkTabs .tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const net = tab.getAttribute("data-network");
      if (!net) return;
      state.network = net;
      state.page = 1;
      render();
    });
  });
}

function bindTopControls() {
  document.getElementById("sortMarketCap")?.addEventListener("click", () => {
    if (state.sortKey === "marketCap") state.sortDir = state.sortDir === "desc" ? "asc" : "desc";
    else {
      state.sortKey = "marketCap";
      state.sortDir = "desc";
    }
    state.page = 1;
    setSortButtonStates();
    render();
  });
  document.getElementById("sortVolume")?.addEventListener("click", () => {
    if (state.sortKey === "volume24h") state.sortDir = state.sortDir === "desc" ? "asc" : "desc";
    else {
      state.sortKey = "volume24h";
      state.sortDir = "desc";
    }
    state.page = 1;
    setSortButtonStates();
    render();
  });

  document.getElementById("toggleColumns")?.addEventListener("click", () => togglePanel("columnsPanel", "toggleColumns"));
  document.getElementById("toggleFilters")?.addEventListener("click", () => togglePanel("filtersPanel", "toggleFilters"));

  document.getElementById("applyFilters")?.addEventListener("click", applyFiltersFromPanel);
  document.getElementById("clearFilters")?.addEventListener("click", clearFiltersPanel);

  // Quick apply on enter in search.
  document.getElementById("searchInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyFiltersFromPanel();
  });
}

function bindPromo() {
  document.getElementById("promoPrev")?.addEventListener("click", () => advancePromo(-1));
  document.getElementById("promoNext")?.addEventListener("click", () => advancePromo(1));
  renderPromo();
  resetPromoTimer();
}

function bindKeyboardShortcuts() {
  // Escape closes panels.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const col = document.getElementById("columnsPanel");
    const fil = document.getElementById("filtersPanel");
    if (col && !col.hasAttribute("hidden")) {
      col.setAttribute("hidden", "");
      document.getElementById("toggleColumns")?.classList.remove("is-active");
    }
    if (fil && !fil.hasAttribute("hidden")) {
      fil.setAttribute("hidden", "");
      document.getElementById("toggleFilters")?.classList.remove("is-active");
    }
  });
}

function init() {
  buildColumnsPanel();
  bindTabs();
  bindTopControls();
  bindHeaderSort();
  bindPromo();
  bindSummary();
  bindKeyboardShortcuts();
  setSortButtonStates();
  render();
}

document.addEventListener("DOMContentLoaded", init);
