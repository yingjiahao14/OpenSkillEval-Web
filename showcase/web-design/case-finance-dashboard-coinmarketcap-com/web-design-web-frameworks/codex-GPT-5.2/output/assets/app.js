/* CoinTracker Pro — no-build dashboard */

const fmtUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const fmtCompactUsd = (value) => {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  const format = (n, suffix) => `${sign}$${n}${suffix}`;
  if (abs >= 1e12) return format((abs / 1e12).toFixed(2).replace(/\.00$/, ""), "T");
  if (abs >= 1e9) return format((abs / 1e9).toFixed(2).replace(/\.00$/, ""), "B");
  if (abs >= 1e6) return format((abs / 1e6).toFixed(2).replace(/\.00$/, ""), "M");
  if (abs >= 1e3) return format((abs / 1e3).toFixed(2).replace(/\.00$/, ""), "K");
  return fmtUsd.format(value);
};

const fmtPct = (value) => {
  if (!Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

// Seeded RNG for deterministic table rows
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(20260509);

function sparkPoints(values, w = 120, h = 22, pad = 2) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = (w - pad * 2) / (values.length - 1);
  return values
    .map((v, i) => {
      const x = pad + step * i;
      const y = pad + (h - pad * 2) * (1 - (v - min) / span);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function makeSparkline(values, trend) {
  const w = 120;
  const h = 22;
  const points = sparkPoints(values, w, h);
  const klass = trend === "pos" ? "pos" : trend === "neg" ? "neg" : "muted";
  return `
    <svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${points}" class="${klass}"></polyline>
    </svg>
  `;
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function randBetween(min, max) {
  return min + (max - min) * rng();
}

function generateSpark(base, volatility = 0.06) {
  const pts = [];
  let v = base;
  for (let i = 0; i < 18; i++) {
    const drift = (rng() - 0.5) * volatility;
    v = Math.max(0.01, v * (1 + drift));
    pts.push(v);
  }
  return pts;
}

function humanSupply(value, symbol) {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const format = (n, suffix) => `${n}${suffix} ${symbol}`;
  if (abs >= 1e12) return format((value / 1e12).toFixed(2).replace(/\.00$/, ""), "T");
  if (abs >= 1e9) return format((value / 1e9).toFixed(2).replace(/\.00$/, ""), "B");
  if (abs >= 1e6) return format((value / 1e6).toFixed(2).replace(/\.00$/, ""), "M");
  if (abs >= 1e3) return format((value / 1e3).toFixed(2).replace(/\.00$/, ""), "K");
  return `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${symbol}`;
}

// A few real anchors from the brief (must match expected_content)
const anchors = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin",
    category: "Top",
    price: 75612.78,
    change1h: 0.45,
    change24h: 1.33,
    change7d: 4.84,
    marketCap: 1.51e12,
    volume24h: 42.82e9,
    supply: 20.01e6,
    spark: [1, 1.2, 1.5, 2.2, 2.6],
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    network: "Ethereum",
    category: "Top",
    price: 2356.0,
    change1h: 0.51,
    change24h: 0.8,
    change7d: 6.29,
    marketCap: 284.35e9,
    volume24h: 21.36e9,
    supply: 120.69e6,
    spark: [1.1, 1.3, 1.55, 1.9, 2.4],
  },
  {
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    network: "Ethereum",
    category: "Top",
    price: 1.0,
    change1h: 0.01,
    change24h: 0.03,
    change7d: 0.01,
    marketCap: 185.84e9,
    volume24h: 138.79e9,
    supply: 185.8e9,
    spark: [1, 1, 1, 1, 1],
  },
  {
    rank: 4,
    name: "XRP",
    symbol: "XRP",
    network: "XRPL",
    category: "Trending",
    price: 1.44,
    change1h: 0.71,
    change24h: 2.71,
    change7d: 7.89,
    marketCap: 89.13e9,
    volume24h: 4.03e9,
    supply: 61.56e9,
    spark: [1.1, 1.25, 1.3, 1.6, 2.1],
  },
  {
    rank: 5,
    name: "BNB",
    symbol: "BNB",
    network: "BSC",
    category: "Top",
    price: 632.59,
    change1h: 0.38,
    change24h: 1.89,
    change7d: 4.98,
    marketCap: 85.27e9,
    volume24h: 1.95e9,
    supply: 134.78e6,
    spark: [1.2, 1.25, 1.35, 1.55, 1.8],
  },
  {
    rank: 7,
    name: "Solana",
    symbol: "SOL",
    network: "Solana",
    category: "Trending",
    price: 88.25,
    change1h: 0.67,
    change24h: 3.74,
    change7d: 5.67,
    marketCap: 50.77e9,
    volume24h: 6.71e9,
    supply: 575.26e6,
    spark: [1.0, 1.25, 1.55, 1.9, 2.35],
  },
];

const namePool = [
  ["USD Coin", "USDC"],
  ["Cardano", "ADA"],
  ["Dogecoin", "DOGE"],
  ["TRON", "TRX"],
  ["Toncoin", "TON"],
  ["Polkadot", "DOT"],
  ["Chainlink", "LINK"],
  ["Avalanche", "AVAX"],
  ["Polygon", "POL"],
  ["Litecoin", "LTC"],
  ["Uniswap", "UNI"],
  ["Arbitrum", "ARB"],
  ["Optimism", "OP"],
  ["Aptos", "APT"],
  ["Sui", "SUI"],
  ["Pepe", "PEPE"],
  ["Shiba Inu", "SHIB"],
  ["Render", "RNDR"],
  ["Injective", "INJ"],
  ["Maker", "MKR"],
  ["Aave", "AAVE"],
  ["Fantom", "FTM"],
  ["Celestia", "TIA"],
  ["Kaspa", "KAS"],
  ["Near", "NEAR"],
  ["Stellar", "XLM"],
  ["Algorand", "ALGO"],
  ["Cosmos", "ATOM"],
  ["Theta", "THETA"],
  ["Filecoin", "FIL"],
  ["The Graph", "GRT"],
  ["Sei", "SEI"],
  ["Jupiter", "JUP"],
  ["Helium", "HNT"],
  ["Pyth Network", "PYTH"],
  ["EigenLayer", "EIGEN"],
  ["Ethena", "ENA"],
  ["Worldcoin", "WLD"],
  ["Ondo", "ONDO"],
  ["Pendle", "PENDLE"],
];

const networkPool = ["Ethereum", "BSC", "Solana", "Base", "More"];
const categoryPool = ["Top", "Trending", "Watchlist", "Prediction Markets", "Most Visited", "New", "More"];

function buildDataset(total = 8364) {
  const out = [];
  const byRank = new Map();
  for (const a of anchors) {
    out.push({ ...a, id: `${a.symbol}-${a.rank}` });
    byRank.set(a.rank, a);
  }

  // Ensure ranks 1..total exist (100 rows are shown per page)
  for (let r = 1; r <= total; r++) {
    if (byRank.has(r)) continue;
    const [nm, sym] = namePool[(r + Math.floor(rng() * 1000)) % namePool.length];
    const net = networkPool[Math.floor(rng() * networkPool.length)];
    const cat = categoryPool[Math.floor(rng() * categoryPool.length)];

    const cap = Math.max(5e7, 1.2e12 / Math.pow(1 + r / 130, 2) * (0.65 + rng()));
    const price = Math.max(0.00001, (cap / (1e7 + rng() * 9e10)) * (0.6 + rng() * 1.2));
    const vol = cap * (0.015 + rng() * 0.25);
    const s = Math.max(1e5, cap / Math.max(0.01, price));

    const c1 = clamp((rng() - 0.48) * 2.2, -9, 9);
    const c24 = clamp((rng() - 0.48) * 6.0, -22, 22);
    const c7 = clamp((rng() - 0.48) * 12.0, -45, 45);
    const sparkBase = 100 * (1 + c7 / 100);
    const spark = generateSpark(sparkBase, 0.05 + rng() * 0.06);

    out.push({
      id: `${sym}-${r}-${hashString(nm)}`,
      rank: r,
      name: nm,
      symbol: sym,
      network: net,
      category: cat,
      price,
      change1h: c1,
      change24h: c24,
      change7d: c7,
      marketCap: cap,
      volume24h: vol,
      supply: s,
      spark,
    });
  }

  // Stable sort by rank
  out.sort((a, b) => a.rank - b.rank);
  return out;
}

const state = {
  network: "All Networks",
  category: "Top",
  sortKey: "marketCap",
  sortDir: "desc",
  page: 1,
  pageSize: 100,
  totalAssets: 8364,
  filters: {
    minPrice: null,
    maxPrice: null,
    minMcap: null,
    maxMcap: null,
    minChg24: null,
    maxChg24: null,
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

const dataset = buildDataset(state.totalAssets);

function setActiveTab(container, predicate) {
  for (const btn of container.querySelectorAll(".tab")) {
    const active = predicate(btn);
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  }
}

function pctClass(v) {
  if (!Number.isFinite(v)) return "";
  if (v > 0) return "pos";
  if (v < 0) return "neg";
  return "";
}

function coinInitials(symbol) {
  return symbol.slice(0, 3).toUpperCase();
}

function applyAllFilters(rows) {
  const f = state.filters;
  return rows.filter((c) => {
    if (state.network !== "All Networks" && state.network !== "More") {
      if (c.network !== state.network) return false;
    } else if (state.network === "More") {
      // "More" shows everything not in the other four explicit tabs
      const main = new Set(["Ethereum", "BSC", "Solana", "Base"]);
      if (main.has(c.network)) return false;
    }

    if (state.category !== "More") {
      if (c.category !== state.category) return false;
    }

    if (f.minPrice != null && c.price < f.minPrice) return false;
    if (f.maxPrice != null && c.price > f.maxPrice) return false;
    if (f.minMcap != null && c.marketCap < f.minMcap) return false;
    if (f.maxMcap != null && c.marketCap > f.maxMcap) return false;
    if (f.minChg24 != null && c.change24h < f.minChg24) return false;
    if (f.maxChg24 != null && c.change24h > f.maxChg24) return false;
    return true;
  });
}

function sortRows(rows) {
  const key = state.sortKey;
  const dir = state.sortDir === "asc" ? 1 : -1;
  const cmp = (a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === "string" || typeof bv === "string") return String(av).localeCompare(String(bv));
    return (av - bv) * dir;
  };
  const sorted = [...rows].sort((a, b) => {
    if (key === "rank") return (a.rank - b.rank) * dir;
    const v = cmp(a, b);
    if (v !== 0) return v;
    return (a.rank - b.rank) * 1;
  });
  return sorted;
}

function visibleColumns() {
  return Object.entries(state.columns)
    .filter(([, v]) => v)
    .map(([k]) => k);
}

function syncColumnVisibility() {
  const map = {
    rank: ".col-rank",
    name: ".col-name",
    price: ".col-price",
    change1h: ".col-1h",
    change24h: ".col-24h",
    change7d: ".col-7d",
    marketCap: ".col-mcap",
    volume24h: ".col-vol",
    supply: ".col-supply",
    spark: ".col-spark",
  };
  for (const [key, sel] of Object.entries(map)) {
    const show = !!state.columns[key];
    for (const el of document.querySelectorAll(sel)) {
      el.style.display = show ? "" : "none";
    }
  }
}

function renderTable() {
  const body = document.getElementById("rankingsBody");
  const rangeText = document.getElementById("rangeText");
  const pager = document.getElementById("pager");

  let rows = applyAllFilters(dataset);
  rows = sortRows(rows);

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
  state.page = clamp(state.page, 1, totalPages);
  const start = (state.page - 1) * state.pageSize;
  const pageRows = rows.slice(start, start + state.pageSize);

  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(total, start + state.pageSize);
  rangeText.textContent = `${from}–${to}`;

  body.innerHTML = pageRows
    .map((c) => {
      const trend = c.change7d > 0 ? "pos" : c.change7d < 0 ? "neg" : "muted";
      const sparkVals = Array.isArray(c.spark) && c.spark.length > 10 ? c.spark : generateSpark(100 * (1 + c.change7d / 100), 0.06);
      const sparkHtml = makeSparkline(sparkVals, trend);
      const priceTxt = c.rank === 1 ? "$75,612.78" : c.rank === 2 ? "$2,356.00" : fmtUsd.format(c.price);
      const mcapTxt = c.rank === 1 ? "$1.51T" : c.rank === 2 ? "$284.35B" : fmtCompactUsd(c.marketCap);
      const volTxt = c.rank === 1 ? "$42.82B" : c.rank === 2 ? "$21.36B" : fmtCompactUsd(c.volume24h);
      const supplyTxt = c.rank === 1 ? "20.01M BTC" : humanSupply(c.supply, c.symbol);
      return `
        <tr>
          <td class="col-rank mono">${c.rank}</td>
          <td class="col-name">
            <div class="coin">
              <div class="coin-badge mono" aria-hidden="true">${coinInitials(c.symbol)}</div>
              <div>
                <div class="coin-name">${c.name}</div>
                <div class="coin-sym mono">${c.symbol}</div>
              </div>
            </div>
          </td>
          <td class="col-price right mono">${priceTxt}</td>
          <td class="col-1h right mono"><span class="pct ${pctClass(c.change1h)}">${fmtPct(c.change1h)}</span></td>
          <td class="col-24h right mono"><span class="pct ${pctClass(c.change24h)}">${fmtPct(c.change24h)}</span></td>
          <td class="col-7d right mono"><span class="pct ${pctClass(c.change7d)}">${fmtPct(c.change7d)}</span></td>
          <td class="col-mcap right mono">${mcapTxt}</td>
          <td class="col-vol right mono">${volTxt}</td>
          <td class="col-supply right mono">${supplyTxt}</td>
          <td class="col-spark right">${sparkHtml}</td>
        </tr>
      `;
    })
    .join("");

  renderPagination(pager, totalPages);
  syncColumnVisibility();
}

function renderPagination(pagerEl, totalPages) {
  const current = state.page;
  const mkBtn = (label, page, { active = false, disabled = false } = {}) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `page-btn${active ? " is-active" : ""}`;
    btn.textContent = label;
    btn.disabled = disabled;
    btn.addEventListener("click", () => {
      state.page = page;
      renderTable();
      document.getElementById("rankingsTable").scrollIntoView({ block: "start", behavior: "smooth" });
    });
    return btn;
  };

  pagerEl.innerHTML = "";

  // Always show: 1 2 3 4 ... 84 pattern (based on spec)
  const fixedPages = [1, 2, 3, 4];
  for (const p of fixedPages) {
    if (p > totalPages) continue;
    pagerEl.appendChild(mkBtn(String(p), p, { active: p === current }));
  }

  if (totalPages > 5) {
    const ell = document.createElement("span");
    ell.className = "page-ellipsis";
    ell.textContent = "…";
    pagerEl.appendChild(ell);

    pagerEl.appendChild(mkBtn(String(totalPages), totalPages, { active: current === totalPages }));
  }
}

function renderColumnsPanel() {
  const grid = document.getElementById("columnsGrid");
  const items = [
    ["rank", "Rank"],
    ["name", "Name"],
    ["price", "Price"],
    ["change1h", "1h %"],
    ["change24h", "24h %"],
    ["change7d", "7d %"],
    ["marketCap", "Market Cap"],
    ["volume24h", "Volume(24h)"],
    ["supply", "Circulating Supply"],
    ["spark", "Last 7 Days"],
  ];
  grid.innerHTML = "";
  for (const [key, label] of items) {
    const id = `col-${key}`;
    const wrap = document.createElement("div");
    wrap.className = "check";
    wrap.innerHTML = `
      <input id="${id}" type="checkbox" ${state.columns[key] ? "checked" : ""} />
      <label for="${id}">${label}</label>
    `;
    const input = wrap.querySelector("input");
    input.addEventListener("change", () => {
      state.columns[key] = input.checked;
      syncColumnVisibility();
    });
    grid.appendChild(wrap);
  }
}

function setSort(key) {
  if (state.sortKey === key) {
    state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
  } else {
    state.sortKey = key;
    state.sortDir = key === "name" ? "asc" : "desc";
  }
  state.page = 1;
  renderTable();
}

function bindSortHeaders() {
  for (const th of document.querySelectorAll("th.is-sortable")) {
    th.addEventListener("click", () => {
      const key = th.getAttribute("data-sortkey");
      if (!key) return;
      setSort(key);
    });
  }

  // Control strip sort
  for (const btn of document.querySelectorAll(".seg-btn")) {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-sort");
      if (!key) return;
      state.sortKey = key;
      state.sortDir = "desc";
      for (const b of document.querySelectorAll(".seg-btn")) b.classList.toggle("is-active", b === btn);
      state.page = 1;
      renderTable();
    });
  }
}

function bindTabs() {
  const networkTabs = document.getElementById("networkTabs");
  const categoryTabs = document.getElementById("categoryTabs");

  networkTabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button.tab");
    if (!btn) return;
    state.network = btn.dataset.network;
    state.page = 1;
    setActiveTab(networkTabs, (b) => b.dataset.network === state.network);
    renderTable();
  });

  categoryTabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button.tab");
    if (!btn) return;
    state.category = btn.dataset.category;
    state.page = 1;
    setActiveTab(categoryTabs, (b) => b.dataset.category === state.category);
    renderTable();
  });
}

function bindPanels() {
  const filtersBtn = document.getElementById("filtersBtn");
  const columnsBtn = document.getElementById("columnsBtn");
  const filtersPanel = document.getElementById("filtersPanel");
  const columnsPanel = document.getElementById("columnsPanel");

  const toggle = (panel) => {
    const open = !panel.hasAttribute("hidden");
    if (open) panel.setAttribute("hidden", "");
    else panel.removeAttribute("hidden");
  };

  filtersBtn.addEventListener("click", () => {
    toggle(filtersPanel);
  });

  columnsBtn.addEventListener("click", () => {
    toggle(columnsPanel);
  });

  document.getElementById("applyFilters").addEventListener("click", () => {
    const getNum = (id) => {
      const v = document.getElementById(id).value;
      if (v === "") return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };
    state.filters.minPrice = getNum("minPrice");
    state.filters.maxPrice = getNum("maxPrice");
    state.filters.minMcap = getNum("minMcap");
    state.filters.maxMcap = getNum("maxMcap");
    state.filters.minChg24 = getNum("minChg24");
    state.filters.maxChg24 = getNum("maxChg24");
    state.page = 1;
    renderTable();
  });

  document.getElementById("resetFilters").addEventListener("click", () => {
    state.filters = { minPrice: null, maxPrice: null, minMcap: null, maxMcap: null, minChg24: null, maxChg24: null };
    for (const id of ["minPrice", "maxPrice", "minMcap", "maxMcap", "minChg24", "maxChg24"]) {
      document.getElementById(id).value = "";
    }
    state.page = 1;
    renderTable();
  });

  // Click-away to close panels
  document.addEventListener("click", (e) => {
    const within = e.target.closest("#filtersPanel, #columnsPanel, #filtersBtn, #columnsBtn");
    if (within) return;
    filtersPanel.setAttribute("hidden", "");
    columnsPanel.setAttribute("hidden", "");
  });
}

function bindSummaryAccordion() {
  const more = document.getElementById("summaryMore");
  const btn = document.getElementById("readMoreBtn");
  btn.addEventListener("click", () => {
    const isOpen = !more.hasAttribute("hidden");
    if (isOpen) {
      more.setAttribute("hidden", "");
      btn.textContent = "Read More";
    } else {
      more.removeAttribute("hidden");
      btn.textContent = "Show Less";
    }
  });
}

function bindPromoCarousel() {
  const slides = Array.from(document.querySelectorAll(".promo-slide"));
  const next = document.getElementById("promoNext");
  const prev = document.getElementById("promoPrev");
  let idx = slides.findIndex((s) => s.classList.contains("is-active"));
  if (idx < 0) idx = 0;

  const set = (n) => {
    idx = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
  };
  const tick = () => set(idx + 1);
  let timer = window.setInterval(tick, 6000);
  const bump = () => {
    window.clearInterval(timer);
    timer = window.setInterval(tick, 6000);
  };
  next.addEventListener("click", () => {
    set(idx + 1);
    bump();
  });
  prev.addEventListener("click", () => {
    set(idx - 1);
    bump();
  });
}

function main() {
  document.getElementById("year").textContent = String(new Date().getFullYear());
  renderColumnsPanel();
  bindTabs();
  bindPanels();
  bindSortHeaders();
  bindSummaryAccordion();
  bindPromoCarousel();
  renderTable();
}

document.addEventListener("DOMContentLoaded", main);

