/* CoinTracker Pro — static dashboard interactions */

const PROMOS = [
  { title: 'CTP Launch: Secure $GENIUS Airdrop — Join Now', tone: 'announcement' },
  { title: 'Featured Partner: Earn boosted yields on blue-chip LSTs', tone: 'partner' },
  { title: 'Ecosystem Update: New listings and deeper market data coverage', tone: 'update' },
];

const TOTAL_ASSETS = 8364;
const PAGE_SIZE = 100;
const TOTAL_PAGES = 84;

const CATEGORY_SEEDS = {
  Top: 1,
  Trending: 2,
  Watchlist: 3,
  'Prediction Markets': 4,
  'Most Visited': 5,
  New: 6,
  More: 7,
};

const NETWORK_SEEDS = {
  'All Networks': 1,
  BSC: 2,
  Solana: 3,
  Base: 4,
  Ethereum: 5,
  More: 6,
};

const COIN_TEMPLATES = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 75612.78,
    change1h: 0.45,
    change24h: 1.33,
    change7d: 4.84,
    marketCap: 1.51e12,
    volume24h: 42.82e9,
    circulating: { amount: 20.01e6, symbol: 'BTC' },
    spark: [0.1, 0.18, 0.28, 0.48, 0.62, 0.8, 0.72],
    networks: ['All Networks', 'Ethereum'],
    categories: ['Top', 'Trending', 'Most Visited'],
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2356.0,
    change1h: 0.51,
    change24h: 0.8,
    change7d: 6.29,
    marketCap: 284.35e9,
    volume24h: 21.36e9,
    circulating: { amount: 120.69e6, symbol: 'ETH' },
    spark: [0.14, 0.24, 0.35, 0.53, 0.7, 0.78, 0.86],
    networks: ['All Networks', 'Ethereum', 'Base'],
    categories: ['Top', 'Trending', 'Most Visited'],
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    price: 1.0,
    change1h: 0.01,
    change24h: 0.03,
    change7d: 0.01,
    marketCap: 185.84e9,
    volume24h: 138.79e9,
    circulating: { amount: 185.8e9, symbol: 'USDT' },
    spark: [0.55, 0.56, 0.55, 0.56, 0.56, 0.55, 0.56],
    networks: ['All Networks', 'Ethereum', 'BSC', 'Solana', 'Base'],
    categories: ['Top', 'Most Visited'],
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 1.44,
    change1h: 0.71,
    change24h: 2.71,
    change7d: 7.89,
    marketCap: 89.13e9,
    volume24h: 4.03e9,
    circulating: { amount: 61.56e9, symbol: 'XRP' },
    spark: [0.16, 0.24, 0.26, 0.4, 0.62, 0.7, 0.9],
    networks: ['All Networks', 'More'],
    categories: ['Top', 'Trending', 'Most Visited'],
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    price: 632.59,
    change1h: 0.38,
    change24h: 1.89,
    change7d: 4.98,
    marketCap: 85.27e9,
    volume24h: 1.95e9,
    circulating: { amount: 134.78e6, symbol: 'BNB' },
    spark: [0.22, 0.24, 0.34, 0.52, 0.64, 0.74, 0.82],
    networks: ['All Networks', 'BSC'],
    categories: ['Top', 'Trending', 'Most Visited'],
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 88.25,
    change1h: 0.67,
    change24h: 3.74,
    change7d: 5.67,
    marketCap: 50.77e9,
    volume24h: 6.71e9,
    circulating: { amount: 575.26e6, symbol: 'SOL' },
    spark: [0.12, 0.2, 0.32, 0.5, 0.64, 0.72, 0.8],
    networks: ['All Networks', 'Solana'],
    categories: ['Top', 'Trending', 'Most Visited'],
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatCompactUsd(number) {
  if (!Number.isFinite(number)) return '—';
  const abs = Math.abs(number);
  if (abs >= 1e12) return `$${(number / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `$${(number / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(number / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(number / 1e3).toFixed(2)}K`;
  return `$${number.toFixed(2)}`;
}

function formatUsdPrice(number) {
  if (!Number.isFinite(number)) return '—';
  if (number >= 1000) {
    return `$${number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (number >= 1) {
    return `$${number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
  }
  return `$${number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
}

function formatPercent(number) {
  if (!Number.isFinite(number)) return '—';
  const sign = number > 0 ? '+' : '';
  return `${sign}${number.toFixed(2)}%`;
}

function formatSupply(amount) {
  if (!Number.isFinite(amount)) return '—';
  const abs = Math.abs(amount);
  if (abs >= 1e12) return `${(amount / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${(amount / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${(amount / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${(amount / 1e3).toFixed(2)}K`;
  return amount.toFixed(2);
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

function seededSpark(seed) {
  const rnd = mulberry32(seed);
  const points = [];
  let v = rnd() * 0.4 + 0.25;
  for (let i = 0; i < 7; i++) {
    v += (rnd() - 0.5) * 0.18;
    v = clamp(v, 0.1, 0.95);
    points.push(v);
  }
  return points;
}

function deriveCoin(rank, activeCategory, activeNetwork, page) {
  const base = COIN_TEMPLATES[(rank - 1) % COIN_TEMPLATES.length];
  if (rank <= 7) {
    // Keep top data anchored to brief values.
    if (rank === 6) {
      // Intentionally skip rank 6, but fill table ranks sequentially.
    }
  }

  const categorySeed = CATEGORY_SEEDS[activeCategory] ?? 1;
  const networkSeed = NETWORK_SEEDS[activeNetwork] ?? 1;
  const seed = (rank + 1) * 1009 + categorySeed * 10007 + networkSeed * 1000003 + page * 11;
  const rnd = mulberry32(seed);

  const drift = (rnd() - 0.5) * 0.06;
  const price = base.price * (1 + drift + (rank / 4500) * (rnd() * 0.01));

  const change1h = base.change1h + (rnd() - 0.5) * 1.4;
  const change24h = base.change24h + (rnd() - 0.5) * 4.2;
  const change7d = base.change7d + (rnd() - 0.5) * 10.2;
  const marketCap = base.marketCap * (1 - (rank - 1) / 210) * (0.92 + rnd() * 0.18);
  const volume24h = base.volume24h * (0.8 + rnd() * 0.6) * (1 - (rank - 1) / 260);

  const supplyAmount = base.circulating.amount * (0.9 + rnd() * 0.2);
  const spark = rank <= 7 ? base.spark : seededSpark(seed + 99);

  const name = rank <= 6 ? base.name : `${base.name} ${rank}`;
  const symbol = rank <= 6 ? base.symbol : `${base.symbol}${rank}`;

  return {
    rank,
    name,
    symbol,
    price,
    change1h,
    change24h,
    change7d,
    marketCap,
    volume24h,
    circulating: { amount: supplyAmount, symbol: base.circulating.symbol },
    spark,
    networks: base.networks,
    categories: base.categories,
  };
}

function matchesCategoryNetwork(coin, activeCategory, activeNetwork) {
  const okCat = activeCategory === 'Top' ? true : coin.categories.includes(activeCategory);
  const okNet = activeNetwork === 'All Networks' ? true : coin.networks.includes(activeNetwork);
  return okCat && okNet;
}

function buildPageCoins(page, activeCategory, activeNetwork) {
  const coins = [];
  const startRank = (page - 1) * PAGE_SIZE + 1;
  const endRank = Math.min(startRank + PAGE_SIZE - 1, TOTAL_ASSETS);
  for (let rank = startRank; rank <= endRank; rank++) {
    coins.push(deriveCoin(rank, activeCategory, activeNetwork, page));
  }

  // Ensure the brief’s example coins appear early on page 1.
  if (page === 1) {
    const forced = [
      {
        rank: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 75612.78,
        change1h: 0.45,
        change24h: 1.33,
        change7d: 4.84,
        marketCap: 1.51e12,
        volume24h: 42.82e9,
        circulating: { amount: 20.01e6, symbol: 'BTC' },
        spark: [0.1, 0.18, 0.28, 0.48, 0.62, 0.8, 0.72],
        networks: ['All Networks', 'Ethereum'],
        categories: ['Top', 'Trending', 'Most Visited'],
      },
      {
        rank: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        price: 2356.0,
        change1h: 0.51,
        change24h: 0.8,
        change7d: 6.29,
        marketCap: 284.35e9,
        volume24h: 21.36e9,
        circulating: { amount: 120.69e6, symbol: 'ETH' },
        spark: [0.14, 0.24, 0.35, 0.53, 0.7, 0.78, 0.86],
        networks: ['All Networks', 'Ethereum', 'Base'],
        categories: ['Top', 'Trending', 'Most Visited'],
      },
      {
        rank: 3,
        name: 'Tether',
        symbol: 'USDT',
        price: 1.0,
        change1h: 0.01,
        change24h: 0.03,
        change7d: 0.01,
        marketCap: 185.84e9,
        volume24h: 138.79e9,
        circulating: { amount: 185.8e9, symbol: 'USDT' },
        spark: [0.55, 0.56, 0.55, 0.56, 0.56, 0.55, 0.56],
        networks: ['All Networks', 'Ethereum', 'BSC', 'Solana', 'Base'],
        categories: ['Top', 'Most Visited'],
      },
      {
        rank: 4,
        name: 'XRP',
        symbol: 'XRP',
        price: 1.44,
        change1h: 0.71,
        change24h: 2.71,
        change7d: 7.89,
        marketCap: 89.13e9,
        volume24h: 4.03e9,
        circulating: { amount: 61.56e9, symbol: 'XRP' },
        spark: [0.16, 0.24, 0.26, 0.4, 0.62, 0.7, 0.9],
        networks: ['All Networks', 'More'],
        categories: ['Top', 'Trending', 'Most Visited'],
      },
      {
        rank: 5,
        name: 'BNB',
        symbol: 'BNB',
        price: 632.59,
        change1h: 0.38,
        change24h: 1.89,
        change7d: 4.98,
        marketCap: 85.27e9,
        volume24h: 1.95e9,
        circulating: { amount: 134.78e6, symbol: 'BNB' },
        spark: [0.22, 0.24, 0.34, 0.52, 0.64, 0.74, 0.82],
        networks: ['All Networks', 'BSC'],
        categories: ['Top', 'Trending', 'Most Visited'],
      },
      {
        rank: 7,
        name: 'Solana',
        symbol: 'SOL',
        price: 88.25,
        change1h: 0.67,
        change24h: 3.74,
        change7d: 5.67,
        marketCap: 50.77e9,
        volume24h: 6.71e9,
        circulating: { amount: 575.26e6, symbol: 'SOL' },
        spark: [0.12, 0.2, 0.32, 0.5, 0.64, 0.72, 0.8],
        networks: ['All Networks', 'Solana'],
        categories: ['Top', 'Trending', 'Most Visited'],
      },
    ];
    for (const coin of forced) {
      const idx = coins.findIndex((c) => c.rank === coin.rank);
      if (idx >= 0) coins[idx] = coin;
    }
  }

  return coins;
}

function colorClassForChange(n) {
  if (!Number.isFinite(n)) return '';
  if (n > 0) return 'is-pos';
  if (n < 0) return 'is-neg';
  return 'is-neutral';
}

function sparkSvg(points, positive) {
  const w = 120;
  const h = 26;
  const pad = 2;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const step = (w - pad * 2) / (points.length - 1);

  const coords = points
    .map((v, i) => {
      const x = pad + i * step;
      const y = pad + (1 - (v - min) / span) * (h - pad * 2);
      return [x, y];
    })
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');

  const stroke = positive ? '#16c784' : '#ea3943';
  const fill = positive ? 'rgba(22,199,132,0.14)' : 'rgba(234,57,67,0.14)';
  const last = coords.split(' ').at(-1);
  const first = coords.split(' ')[0];
  const area = `${first} ${coords} ${last.split(',')[0]},${h - pad} ${first.split(',')[0]},${h - pad}`;

  return `
    <svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${area}" fill="${fill}" stroke="none" />
      <polyline points="${coords}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

function setActiveTab(tablistEl, clickedBtn) {
  const btns = Array.from(tablistEl.querySelectorAll('.tab'));
  for (const b of btns) {
    const active = b === clickedBtn;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  }
}

function buildPagination(currentPage) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const makeBtn = (label, page, active = false) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `page-btn${active ? ' is-active' : ''}`;
    btn.textContent = label;
    btn.dataset.page = String(page);
    btn.setAttribute('aria-label', `Page ${label}`);
    if (active) btn.setAttribute('aria-current', 'page');
    return btn;
  };

  const addEllipsis = () => {
    const span = document.createElement('span');
    span.className = 'page-ellipsis';
    span.textContent = '…';
    pagination.appendChild(span);
  };

  const pages = new Set([1, 2, 3, 4, TOTAL_PAGES, currentPage, currentPage - 1, currentPage + 1]);
  const list = Array.from(pages)
    .filter((p) => p >= 1 && p <= TOTAL_PAGES)
    .sort((a, b) => a - b);

  let prev = 0;
  for (const p of list) {
    if (prev && p - prev > 1) addEllipsis();
    pagination.appendChild(makeBtn(String(p), p, p === currentPage));
    prev = p;
  }
}

function applyColumnVisibility() {
  const checks = Array.from(document.querySelectorAll('#columnsPanel input[type="checkbox"][data-col]'));
  const visible = new Set(checks.filter((c) => c.checked).map((c) => c.dataset.col));

  const colToClass = {
    rank: 'col-rank',
    name: 'col-name',
    price: 'col-price',
    change1h: 'col-change1h',
    change24h: 'col-change24h',
    change7d: 'col-change7d',
    marketCap: 'col-marketCap',
    volume24h: 'col-volume24h',
    circulating: 'col-circulating',
    sparkline: 'col-sparkline',
  };

  for (const [key, cls] of Object.entries(colToClass)) {
    const show = visible.has(key);
    for (const el of document.querySelectorAll(`.${cls}`)) {
      el.style.display = show ? '' : 'none';
    }
  }
}

function updateTableMeta(currentPage, showingCount) {
  const start = (currentPage - 1) * PAGE_SIZE + 1;
  const end = start + showingCount - 1;
  const meta = document.getElementById('tableMeta');
  meta.textContent = `Showing ${start.toLocaleString()}–${end.toLocaleString()} of ${TOTAL_ASSETS.toLocaleString()} assets`;
}

function setLiveStatus(message) {
  const live = document.getElementById('liveStatus');
  live.textContent = message;
}

function renderTable(state) {
  const tbody = document.getElementById('cryptoTbody');
  tbody.innerHTML = '';

  const pageCoins = buildPageCoins(state.page, state.category, state.network);
  let coins = pageCoins.filter((c) => matchesCategoryNetwork(c, state.category, state.network));

  if (state.filters.search) {
    const q = state.filters.search.toLowerCase();
    coins = coins.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
  }
  if (state.filters.change24h !== 'all') {
    coins = coins.filter((c) => (state.filters.change24h === 'gainers' ? c.change24h > 0 : c.change24h < 0));
  }
  if (Number.isFinite(state.filters.minMarketCap)) {
    coins = coins.filter((c) => c.marketCap >= state.filters.minMarketCap);
  }

  const dir = state.sortDir;
  const key = state.sortKey;
  coins.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === 'string') return dir * av.localeCompare(bv);
    return dir * (bv - av);
  });

  const limited = coins.slice(0, PAGE_SIZE);
  for (const coin of limited) {
    const tr = document.createElement('tr');
    tr.className = 'row';
    tr.innerHTML = `
      <td class="td col-rank mono">${coin.rank}</td>
      <td class="td col-name">
        <div class="name-cell">
          <div class="coin-icon" aria-hidden="true">${coin.symbol.slice(0, 1)}</div>
          <div style="min-width:0">
            <div class="coin-name">${coin.name}</div>
            <div class="coin-symbol mono">${coin.symbol}</div>
          </div>
        </div>
      </td>
      <td class="td td--num col-price mono">${formatUsdPrice(coin.price)}</td>
      <td class="td td--num col-change1h mono ${colorClassForChange(coin.change1h)}">${formatPercent(coin.change1h)}</td>
      <td class="td td--num col-change24h mono ${colorClassForChange(coin.change24h)}">${formatPercent(coin.change24h)}</td>
      <td class="td td--num col-change7d mono ${colorClassForChange(coin.change7d)}">${formatPercent(coin.change7d)}</td>
      <td class="td td--num col-marketCap mono">${formatCompactUsd(coin.marketCap)}</td>
      <td class="td td--num col-volume24h mono">${formatCompactUsd(coin.volume24h)}</td>
      <td class="td td--num col-circulating mono">${formatSupply(coin.circulating.amount)} ${coin.circulating.symbol}</td>
      <td class="td col-sparkline">${sparkSvg(coin.spark, coin.change7d >= 0)}</td>
    `;
    tbody.appendChild(tr);
  }

  updateTableMeta(state.page, limited.length);
  applyColumnVisibility();

  setLiveStatus(
    `Showing ${limited.length} rows — Category ${state.category}, Network ${state.network}, Page ${state.page}.`
  );
}

function setupSorting(state) {
  const ths = Array.from(document.querySelectorAll('th[data-sortkey]'));
  for (const th of ths) {
    th.addEventListener('click', () => {
      const key = th.dataset.sortkey;
      if (!key) return;
      if (state.sortKey === key) {
        state.sortDir *= -1;
      } else {
        state.sortKey = key;
        state.sortDir = key === 'rank' ? 1 : -1;
      }
      renderTable(state);
    });
  }
}

function setupPanels() {
  const columnsBtn = document.getElementById('columnsBtn');
  const filtersBtn = document.getElementById('filtersBtn');
  const columnsPanel = document.getElementById('columnsPanel');
  const filtersPanel = document.getElementById('filtersPanel');

  const toggle = (btn, panel, otherBtn, otherPanel) => {
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    if (willOpen) {
      otherPanel.hidden = true;
      otherBtn.setAttribute('aria-expanded', 'false');
    }
  };

  columnsBtn.addEventListener('click', () => toggle(columnsBtn, columnsPanel, filtersBtn, filtersPanel));
  filtersBtn.addEventListener('click', () => toggle(filtersBtn, filtersPanel, columnsBtn, columnsPanel));

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const within = target.closest('#columnsPanel, #filtersPanel, #columnsBtn, #filtersBtn');
    if (!within) {
      columnsPanel.hidden = true;
      filtersPanel.hidden = true;
      columnsBtn.setAttribute('aria-expanded', 'false');
      filtersBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupColumnToggles(state) {
  const checks = Array.from(document.querySelectorAll('#columnsPanel input[type="checkbox"][data-col]'));
  for (const c of checks) {
    c.addEventListener('change', () => {
      applyColumnVisibility();
      setLiveStatus('Updated visible columns.');
    });
  }
  applyColumnVisibility();
}

function setupFilters(state) {
  const searchInput = document.getElementById('searchInput');
  const change24hSelect = document.getElementById('change24hSelect');
  const minMarketCap = document.getElementById('minMarketCap');
  const applyBtn = document.getElementById('applyFilters');
  const clearBtn = document.getElementById('clearFilters');

  applyBtn.addEventListener('click', () => {
    state.filters.search = searchInput.value.trim();
    state.filters.change24h = change24hSelect.value;
    const v = minMarketCap.value.trim();
    state.filters.minMarketCap = v ? Number(v) : null;
    renderTable(state);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    change24hSelect.value = 'all';
    minMarketCap.value = '';
    state.filters = { search: '', change24h: 'all', minMarketCap: null };
    renderTable(state);
  });
}

function setupTabs(state) {
  const catTabs = document.getElementById('categoryTabs');
  const netTabs = document.getElementById('networkTabs');

  catTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-category]');
    if (!btn) return;
    setActiveTab(catTabs, btn);
    state.category = btn.dataset.category;
    state.page = 1;
    renderTable(state);
  });

  netTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-network]');
    if (!btn) return;
    setActiveTab(netTabs, btn);
    state.network = btn.dataset.network;
    state.page = 1;
    renderTable(state);
  });
}

function setupSortPills(state) {
  const btns = Array.from(document.querySelectorAll('.segmented__btn[data-sort]'));
  for (const btn of btns) {
    btn.addEventListener('click', () => {
      for (const b of btns) b.classList.toggle('is-active', b === btn);
      state.sortKey = btn.dataset.sort;
      state.sortDir = -1;
      renderTable(state);
    });
  }
}

function setupPagination(state) {
  buildPagination(state.page);
  const pagination = document.getElementById('pagination');
  pagination.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-page]');
    if (!btn) return;
    const page = Number(btn.dataset.page);
    if (!Number.isFinite(page)) return;
    state.page = clamp(page, 1, TOTAL_PAGES);
    buildPagination(state.page);
    renderTable(state);
  });
}

function setupMarketAccordion() {
  const btn = document.getElementById('marketReadMore');
  const details = document.getElementById('marketDetails');
  btn.addEventListener('click', () => {
    const willOpen = details.hidden;
    details.hidden = !willOpen;
    btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    btn.textContent = willOpen ? 'Read Less' : 'Read More';
  });
}

function setupPromoCarousel() {
  const content = document.getElementById('promoContent');
  const dots = document.getElementById('promoDots');
  const prev = document.getElementById('promoPrev');
  const next = document.getElementById('promoNext');
  let idx = 0;
  let timer = null;

  function render() {
    const item = PROMOS[idx];
    content.textContent = item.title;
    dots.innerHTML = '';
    for (let i = 0; i < PROMOS.length; i++) {
      const d = document.createElement('div');
      d.className = `dot${i === idx ? ' is-active' : ''}`;
      d.role = 'button';
      d.tabIndex = 0;
      d.setAttribute('aria-label', `Announcement ${i + 1}`);
      d.addEventListener('click', () => {
        idx = i;
        render();
        restart();
      });
      d.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          idx = i;
          render();
          restart();
        }
      });
      dots.appendChild(d);
    }
  }

  function restart() {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(() => {
      idx = (idx + 1) % PROMOS.length;
      render();
    }, 5000);
  }

  prev.addEventListener('click', () => {
    idx = (idx - 1 + PROMOS.length) % PROMOS.length;
    render();
    restart();
  });
  next.addEventListener('click', () => {
    idx = (idx + 1) % PROMOS.length;
    render();
    restart();
  });

  render();
  restart();
}

function main() {
  document.getElementById('year').textContent = String(new Date().getFullYear());

  const state = {
    category: 'Top',
    network: 'All Networks',
    page: 1,
    sortKey: 'marketCap',
    sortDir: -1,
    filters: { search: '', change24h: 'all', minMarketCap: null },
  };

  setupPromoCarousel();
  setupMarketAccordion();
  setupPanels();
  setupTabs(state);
  setupSortPills(state);
  setupSorting(state);
  setupFilters(state);
  setupColumnToggles(state);
  setupPagination(state);

  renderTable(state);
}

document.addEventListener('DOMContentLoaded', main);

