/* CoinTracker Pro — static dashboard interactions */
(function () {
  const POSITIVE = '#16c784';
  const NEGATIVE = '#ea3943';
  const NEUTRAL = '#3861FB';

  const fmt = {
    usd(value, digits = 2) {
      const n = Number(value);
      if (!Number.isFinite(n)) return String(value);
      return n.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      });
    },
    pct(value, digits = 2) {
      const n = Number(value);
      if (!Number.isFinite(n)) return String(value);
      const sign = n > 0 ? '+' : '';
      return `${sign}${n.toFixed(digits)}%`;
    },
    num(value, digits = 0) {
      const n = Number(value);
      if (!Number.isFinite(n)) return String(value);
      return n.toLocaleString(undefined, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      });
    },
    compact(value, digits = 2) {
      const n = Number(value);
      if (!Number.isFinite(n)) return String(value);
      const abs = Math.abs(n);
      const units = [
        { s: 'T', v: 1e12 },
        { s: 'B', v: 1e9 },
        { s: 'M', v: 1e6 },
        { s: 'K', v: 1e3 },
      ];
      for (const u of units) {
        if (abs >= u.v) return `${(n / u.v).toFixed(digits)}${u.s}`;
      }
      return String(n);
    },
  };

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function seeded(seed) {
    // mulberry32
    let t = seed >>> 0;
    return function () {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function sparkSvg(points, trend) {
    const w = 110;
    const h = 26;
    const pad = 2;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const span = max - min || 1;
    const step = (w - pad * 2) / (points.length - 1);
    const d = points
      .map((p, i) => {
        const x = pad + i * step;
        const y = pad + (h - pad * 2) * (1 - (p - min) / span);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
    const color = trend >= 0 ? POSITIVE : NEGATIVE;
    const fill = trend >= 0 ? 'rgba(22,199,132,.12)' : 'rgba(234,57,67,.12)';
    return `
      <svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true" focusable="false">
        <path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" />
        <path d="${d} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z" fill="${fill}" stroke="none" />
      </svg>
    `.trim();
  }

  function coinClass(symbol) {
    const stable = new Set(['USDT', 'USDC', 'DAI', 'TUSD', 'FDUSD']);
    if (stable.has(symbol)) return 'coin stable';
    if (symbol === 'BTC' || symbol === 'ETH') return 'coin';
    return 'coin alt';
  }

  function chgClass(n) {
    return n >= 0 ? 'chg positive' : 'chg negative';
  }

  function makeAssets() {
    const base = [
      {
        id: 'btc',
        rank: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        network: 'Bitcoin',
        category: 'Top',
        price: 75612.78,
        chg1h: 0.45,
        chg24h: 1.33,
        chg7d: 4.84,
        marketCap: 1.51e12,
        volume24h: 42.82e9,
        supply: 20.01e6,
      },
      {
        id: 'eth',
        rank: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        network: 'Ethereum',
        category: 'Top',
        price: 2356.0,
        chg1h: 0.51,
        chg24h: 0.8,
        chg7d: 6.29,
        marketCap: 284.35e9,
        volume24h: 21.36e9,
        supply: 120.69e6,
      },
      {
        id: 'usdt',
        rank: 3,
        name: 'Tether',
        symbol: 'USDT',
        network: 'Ethereum',
        category: 'Top',
        price: 1.0,
        chg1h: 0.01,
        chg24h: 0.03,
        chg7d: 0.01,
        marketCap: 185.84e9,
        volume24h: 138.79e9,
        supply: 185.8e9,
      },
      {
        id: 'xrp',
        rank: 4,
        name: 'XRP',
        symbol: 'XRP',
        network: 'XRPL',
        category: 'Trending',
        price: 1.44,
        chg1h: 0.71,
        chg24h: 2.71,
        chg7d: 7.89,
        marketCap: 89.13e9,
        volume24h: 4.03e9,
        supply: 61.56e9,
      },
      {
        id: 'bnb',
        rank: 5,
        name: 'BNB',
        symbol: 'BNB',
        network: 'BSC',
        category: 'Top',
        price: 632.59,
        chg1h: 0.38,
        chg24h: 1.89,
        chg7d: 4.98,
        marketCap: 85.27e9,
        volume24h: 1.95e9,
        supply: 134.78e6,
      },
      {
        id: 'sol',
        rank: 7,
        name: 'Solana',
        symbol: 'SOL',
        network: 'Solana',
        category: 'Trending',
        price: 88.25,
        chg1h: 0.67,
        chg24h: 3.74,
        chg7d: 5.67,
        marketCap: 50.77e9,
        volume24h: 6.71e9,
        supply: 575.26e6,
      },
    ];

    const networks = ['Ethereum', 'BSC', 'Solana', 'Base'];
    const categories = ['Top', 'Trending', 'Watchlist', 'Prediction Markets', 'Most Visited', 'New'];
    const namesA = ['Arbitrum', 'Celestia', 'Avalanche', 'Chainlink', 'Uniswap', 'Aave', 'Sui', 'Aptos', 'Render', 'Optimism', 'Polygon', 'Kaspa', 'Near', 'Stacks', 'Maker', 'Fantom', 'Sei', 'Pyth', 'Jupiter', 'Injective'];
    const namesB = ['Finance', 'Network', 'Protocol', 'Token', 'DAO', 'Labs', 'Swap', 'Vault', 'Index', 'Yield', 'Bridge', 'L2', 'Oracle', 'Staking', 'Perps', 'AI', 'Gaming', 'RWA', 'Infra', 'Meme'];

    const out = [...base];
    for (let i = 1; i <= 100; i++) {
      if (out.some((x) => x.rank === i)) continue;
      const rng = seeded(1000 + i * 97);
      const n1 = namesA[Math.floor(rng() * namesA.length)];
      const n2 = namesB[Math.floor(rng() * namesB.length)];
      const name = `${n1} ${n2}`;
      const symbol = `${n1.slice(0, 1)}${n2.slice(0, 2)}${String(i).padStart(2, '0')}`.toUpperCase();
      const network = networks[Math.floor(rng() * networks.length)];
      const category = categories[Math.floor(rng() * categories.length)];

      // Price distribution: a few high, many mid/small.
      const tier = rng();
      let price;
      if (tier > 0.93) price = 400 + rng() * 1200;
      else if (tier > 0.65) price = 5 + rng() * 250;
      else price = 0.02 + rng() * 5;

      const chg24h = (rng() - 0.48) * 8;
      const chg7d = (rng() - 0.45) * 18;
      const chg1h = clamp(chg24h * 0.18 + (rng() - 0.5) * 0.9, -3.5, 3.5);

      const marketCap = (2e8 + rng() * 7e10) * (tier > 0.9 ? 4 : 1);
      const volume24h = marketCap * (0.02 + rng() * 0.16);
      const supply = (marketCap / price) * (0.65 + rng() * 0.55);

      out.push({
        id: `asset-${i}`,
        rank: i,
        name,
        symbol,
        network,
        category,
        price,
        chg1h,
        chg24h,
        chg7d,
        marketCap,
        volume24h,
        supply,
      });
    }
    out.sort((a, b) => a.rank - b.rank);
    return out;
  }

  const state = {
    category: 'Top',
    network: 'All Networks',
    sort: { key: 'marketCap', dir: 'desc' },
    page: 1,
    pageSize: 100,
    columns: {
      rank: true,
      name: true,
      price: true,
      chg1h: true,
      chg24h: true,
      chg7d: true,
      marketCap: true,
      volume24h: true,
      supply: true,
      spark: true,
    },
    filters: {
      search: '',
      minMarketCap: '',
      minVolume: '',
      priceMin: '',
    },
  };

  const allAssets = makeAssets();

  function getFiltered() {
    let rows = allAssets.slice();
    if (state.category && state.category !== 'Top') {
      rows = rows.filter((r) => r.category === state.category);
    }
    if (state.network && state.network !== 'All Networks') {
      rows = rows.filter((r) => r.network === state.network);
    }
    const q = state.filters.search.trim().toLowerCase();
    if (q) {
      rows = rows.filter((r) => r.name.toLowerCase().includes(q) || r.symbol.toLowerCase().includes(q));
    }
    const minCap = Number(state.filters.minMarketCap);
    if (Number.isFinite(minCap) && state.filters.minMarketCap !== '') rows = rows.filter((r) => r.marketCap >= minCap);
    const minVol = Number(state.filters.minVolume);
    if (Number.isFinite(minVol) && state.filters.minVolume !== '') rows = rows.filter((r) => r.volume24h >= minVol);
    const minPrice = Number(state.filters.priceMin);
    if (Number.isFinite(minPrice) && state.filters.priceMin !== '') rows = rows.filter((r) => r.price >= minPrice);
    return rows;
  }

  function sortRows(rows) {
    const { key, dir } = state.sort;
    const mul = dir === 'asc' ? 1 : -1;
    rows.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av === bv) return a.rank - b.rank;
      return (av > bv ? 1 : -1) * mul;
    });
    return rows;
  }

  function render() {
    const tbody = document.querySelector('#rankings-body');
    const thead = document.querySelector('#rankings-head');
    if (!tbody || !thead) return;

    // Column visibility
    document.querySelectorAll('[data-col]').forEach((el) => {
      const k = el.getAttribute('data-col');
      if (!k) return;
      el.style.display = state.columns[k] ? '' : 'none';
    });

    const filtered = sortRows(getFiltered());
    const total = filtered.length;
    const maxPage = Math.max(1, Math.ceil(total / state.pageSize));
    state.page = clamp(state.page, 1, maxPage);

    const start = (state.page - 1) * state.pageSize;
    const end = Math.min(total, start + state.pageSize);
    const pageRows = filtered.slice(start, end);

    // Update "showing" label (keeps the canonical 8,364 text as in brief)
    const showing = document.querySelector('#showing');
    if (showing) showing.textContent = `Showing ${start + 1}–${end} of 8,364 assets`;

    // Update sort label
    const sortBtn = document.querySelector('#sortBtn');
    if (sortBtn) {
      const label = {
        marketCap: 'Market Cap',
        volume24h: 'Volume(24h)',
        price: 'Price',
        chg24h: '24h %',
        chg7d: '7d %',
      }[state.sort.key] || 'Market Cap';
      sortBtn.querySelector('[data-sort-label]').textContent = `${label} ▾`;
    }

    // Render body
    tbody.innerHTML = '';

    // Index tracker row (from brief)
    const indexRow = document.createElement('tr');
    indexRow.className = 'index-row';
    indexRow.innerHTML = `
      <td data-col="rank" class="center num">—</td>
      <td data-col="name">
        <div class="index-label">
          <strong>CoinTracker 20 Index (DTFCTP20)</strong>
          <span>Index Tracker</span>
        </div>
      </td>
      <td data-col="price" class="num">$154.29</td>
      <td data-col="chg1h" class="chg positive">+0.21%</td>
      <td data-col="chg24h" class="chg positive">+1.15%</td>
      <td data-col="chg7d" class="chg positive">+4.97%</td>
      <td data-col="marketCap" class="num">—</td>
      <td data-col="volume24h" class="num">—</td>
      <td data-col="supply" class="num">—</td>
      <td data-col="spark" class="right">${sparkSvg([1, 1.1, 1.15, 1.22, 1.28, 1.33, 1.45, 1.56, 1.6, 1.68], 1)}</td>
    `;
    tbody.appendChild(indexRow);

    for (const r of pageRows) {
      const row = document.createElement('tr');
      const rng = seeded(r.rank * 31337);
      const base = 50 + rng() * 40;
      const points = Array.from({ length: 12 }, (_, i) => {
        const t = i / 11;
        const drift = r.chg7d / 7;
        const noise = (rng() - 0.5) * 3.2;
        return base + t * drift * 2.5 + noise;
      });
      row.innerHTML = `
        <td data-col="rank" class="center num">${r.rank}</td>
        <td data-col="name">
          <div class="namecell">
            <div class="${coinClass(r.symbol)}" aria-hidden="true"></div>
            <div class="names">
              <strong>${r.name}</strong>
              <em>${r.symbol}</em>
            </div>
          </div>
        </td>
        <td data-col="price" class="num">${fmt.usd(r.price, r.price < 2 ? 4 : 2)}</td>
        <td data-col="chg1h" class="${chgClass(r.chg1h)}">${fmt.pct(r.chg1h, 2)}</td>
        <td data-col="chg24h" class="${chgClass(r.chg24h)}">${fmt.pct(r.chg24h, 2)}</td>
        <td data-col="chg7d" class="${chgClass(r.chg7d)}">${fmt.pct(r.chg7d, 2)}</td>
        <td data-col="marketCap" class="num">$${fmt.compact(r.marketCap, 2)}</td>
        <td data-col="volume24h" class="num">$${fmt.compact(r.volume24h, 2)}</td>
        <td data-col="supply" class="num">${fmt.compact(r.supply, 2)} ${r.symbol}</td>
        <td data-col="spark" class="right">${sparkSvg(points, r.chg7d)}</td>
      `;
      tbody.appendChild(row);
    }

    // Render pagination (1 2 3 4 ... 84)
    const pager = document.querySelector('#pager');
    if (pager) {
      pager.innerHTML = '';
      const last = 84;
      const pages = [1, 2, 3, 4, '…', last];
      for (const p of pages) {
        const btn = document.createElement('button');
        btn.className = 'page';
        if (p === '…') {
          btn.textContent = '…';
          btn.disabled = true;
          btn.style.opacity = '0.65';
          btn.style.cursor = 'default';
        } else {
          btn.textContent = String(p);
          btn.setAttribute('aria-label', `Page ${p}`);
          if (p === state.page) btn.setAttribute('aria-current', 'page');
          btn.addEventListener('click', () => {
            state.page = Number(p);
            render();
          });
        }
        pager.appendChild(btn);
      }
    }

    // Update selected tabs
    document.querySelectorAll('[data-category-tab]').forEach((b) => {
      const v = b.getAttribute('data-category-tab');
      b.setAttribute('aria-selected', String(v === state.category));
    });
    document.querySelectorAll('[data-network-tab]').forEach((b) => {
      const v = b.getAttribute('data-network-tab');
      b.setAttribute('aria-selected', String(v === state.network));
    });
  }

  function setUpTabs() {
    document.querySelectorAll('[data-category-tab]').forEach((b) => {
      b.addEventListener('click', () => {
        state.category = b.getAttribute('data-category-tab') || 'Top';
        state.page = 1;
        render();
      });
    });
    document.querySelectorAll('[data-network-tab]').forEach((b) => {
      b.addEventListener('click', () => {
        state.network = b.getAttribute('data-network-tab') || 'All Networks';
        state.page = 1;
        render();
      });
    });
  }

  function setUpMenus() {
    const columnsBtn = document.querySelector('#columnsBtn');
    const columnsMenu = document.querySelector('#columnsMenu');
    const sortBtn = document.querySelector('#sortBtn');
    const sortMenu = document.querySelector('#sortMenu');

    function closeAll() {
      columnsMenu?.classList.remove('open');
      sortMenu?.classList.remove('open');
    }
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.closest('#columnsDropdown') || t.closest('#sortDropdown')) return;
      closeAll();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });

    columnsBtn?.addEventListener('click', () => {
      sortMenu?.classList.remove('open');
      columnsMenu?.classList.toggle('open');
    });
    sortBtn?.addEventListener('click', () => {
      columnsMenu?.classList.remove('open');
      sortMenu?.classList.toggle('open');
    });

    // Column toggles
    document.querySelectorAll('[data-column-toggle]').forEach((el) => {
      const key = el.getAttribute('data-column-toggle');
      if (!key) return;
      const input = el;
      if (!(input instanceof HTMLInputElement)) return;
      input.checked = !!state.columns[key];
      input.addEventListener('change', () => {
        state.columns[key] = input.checked;
        render();
      });
    });

    // Sort menu
    document.querySelectorAll('[data-sort-key]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-sort-key');
        if (!key) return;
        if (state.sort.key === key) {
          state.sort.dir = state.sort.dir === 'desc' ? 'asc' : 'desc';
        } else {
          state.sort.key = key;
          state.sort.dir = 'desc';
        }
        sortMenu?.classList.remove('open');
        state.page = 1;
        render();
      });
    });
  }

  function setUpFilters() {
    const filtersBtn = document.querySelector('#filtersBtn');
    const panel = document.querySelector('#filtersPanel');
    filtersBtn?.addEventListener('click', () => {
      panel?.classList.toggle('open');
    });

    const map = [
      ['search', '#filterSearch'],
      ['minMarketCap', '#filterMinCap'],
      ['minVolume', '#filterMinVol'],
      ['priceMin', '#filterMinPrice'],
    ];
    for (const [k, sel] of map) {
      const el = document.querySelector(sel);
      if (!(el instanceof HTMLInputElement)) continue;
      el.addEventListener('input', () => {
        state.filters[k] = el.value;
        state.page = 1;
        render();
      });
    }
    const reset = document.querySelector('#filtersReset');
    reset?.addEventListener('click', () => {
      state.filters = { search: '', minMarketCap: '', minVolume: '', priceMin: '' };
      (document.querySelector('#filterSearch') || {}).value = '';
      (document.querySelector('#filterMinCap') || {}).value = '';
      (document.querySelector('#filterMinVol') || {}).value = '';
      (document.querySelector('#filterMinPrice') || {}).value = '';
      state.page = 1;
      render();
    });
  }

  function setUpMarketSummary() {
    const btn = document.querySelector('#readMore');
    const more = document.querySelector('#summaryMore');
    btn?.addEventListener('click', () => {
      more?.classList.toggle('open');
      btn.textContent = more?.classList.contains('open') ? 'Read Less' : 'Read More';
    });
  }

  function setUpPromoCarousel() {
    const items = Array.from(document.querySelectorAll('[data-promo-item]'));
    if (!items.length) return;
    let i = 0;
    function show(idx) {
      i = (idx + items.length) % items.length;
      items.forEach((el, j) => {
        el.style.display = j === i ? 'flex' : 'none';
      });
    }
    const prev = document.querySelector('#promoPrev');
    const next = document.querySelector('#promoNext');
    prev?.addEventListener('click', () => show(i - 1));
    next?.addEventListener('click', () => show(i + 1));
    show(0);
    setInterval(() => show(i + 1), 6500);
  }

  function setUpAiChips() {
    const out = document.querySelector('#aiResult');
    document.querySelectorAll('[data-ai-chip]').forEach((b) => {
      b.addEventListener('click', () => {
        const q = b.getAttribute('data-ai-chip') || '';
        if (!out) return;
        out.textContent = `Query queued: ${q}`;
        out.style.opacity = '1';
        out.style.color = 'rgba(13,20,33,.78)';
        setTimeout(() => {
          out.style.opacity = '0.75';
        }, 1800);
      });
    });
  }

  setUpTabs();
  setUpMenus();
  setUpFilters();
  setUpMarketSummary();
  setUpPromoCarousel();
  setUpAiChips();
  render();
})();

