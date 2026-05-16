/* CoinTracker Pro — lightweight static dashboard interactions */

const state = {
  category: 'Top',
  network: 'All Networks',
  page: 1,
  perPage: 100,
  totalAssets: 8364,
  sortKey: 'rank',
  sortDir: 'asc',
  primarySort: 'marketCap',
  query: '',
  minMc: '',
  chg24: 'any',
  columns: {
    h1: true,
    h24: true,
    d7: true,
    marketCap: true,
    volume: true,
    supply: true,
    spark: true,
  },
};

const el = (sel, root = document) => root.querySelector(sel);
const els = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const formatUsd = (n) => {
  const abs = Math.abs(n);
  if (abs >= 1000) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  }
  if (abs >= 1) {
    // Always show cents for prices >= $1 (CoinMarketCap-style).
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  }
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(n);
};

const parseCompact = (s) => {
  if (typeof s !== 'string') return Number(s) || 0;
  const m = s.trim().match(/^([0-9]*\.?[0-9]+)\s*([KMBT])?$/i);
  if (!m) return 0;
  const v = Number(m[1]);
  const u = (m[2] || '').toUpperCase();
  const mult = u === 'K' ? 1e3 : u === 'M' ? 1e6 : u === 'B' ? 1e9 : u === 'T' ? 1e12 : 1;
  return v * mult;
};

const sparkPath = (pts, w = 140, h = 26, pad = 2) => {
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = Math.max(1e-9, max - min);
  const step = (w - pad * 2) / (pts.length - 1);
  const xy = pts.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (h - pad * 2) * (1 - (v - min) / span);
    return [x, y];
  });
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  return { d, min, max };
};

const pctClass = (v) => (v > 0 ? 'chg--pos' : v < 0 ? 'chg--neg' : '');
const pctText = (v) => `${v > 0 ? '+' : ''}${v.toFixed(2)}%`;

let COINS = [];

function setActiveTabs() {
  els('.tab').forEach((b) => b.classList.toggle('is-active', b.dataset.category === state.category));
  els('.tab2').forEach((b) => b.classList.toggle('is-active', b.dataset.network === state.network));
}

function applyColumnVisibility() {
  const root = document.documentElement;
  Object.entries(state.columns).forEach(([k, on]) => {
    root.classList.toggle(`hide-col-${k}`, !on);
  });
}

function filteredCoins() {
  let rows = COINS.slice();

  if (state.category !== 'More') {
    rows = rows.filter((r) => r.category === state.category);
  }

  if (state.network !== 'All Networks' && state.network !== 'More') {
    rows = rows.filter((r) => r.network === state.network);
  }

  const q = state.query.trim().toLowerCase();
  if (q) {
    rows = rows.filter((r) => `${r.name} ${r.symbol}`.toLowerCase().includes(q));
  }

  const minMc = Number(state.minMc);
  if (!Number.isNaN(minMc) && minMc > 0) {
    rows = rows.filter((r) => parseCompact(r.marketCap) >= minMc);
  }

  if (state.chg24 === 'pos') rows = rows.filter((r) => r.h24 > 0);
  if (state.chg24 === 'neg') rows = rows.filter((r) => r.h24 < 0);

  return rows;
}

function sortCoins(rows) {
  const key = state.sortKey;
  const dir = state.sortDir === 'asc' ? 1 : -1;
  const get = (r) => {
    if (key === 'marketCap' || key === 'volume') return parseCompact(r[key]);
    if (key === 'spark') return r.spark?.[r.spark.length - 1] ?? 0;
    return r[key];
  };
  return rows.sort((a, b) => {
    const av = get(a);
    const bv = get(b);
    if (typeof av === 'string' && typeof bv === 'string') return av.localeCompare(bv) * dir;
    return (av - bv) * dir;
  });
}

function renderTable() {
  const tbody = el('#tbody');
  const rows = sortCoins(filteredCoins());

  // Pagination is spec'd as 100 per page with 84 pages overall; we keep visual pagination independent
  const start = (state.page - 1) * state.perPage;
  const pageRows = rows.slice(start, start + state.perPage);

  tbody.innerHTML = pageRows
    .map((r) => {
      const icon = r.symbol.slice(0, 1);
      const spark = sparkPath(r.spark);
      const sparkStroke = r.d7 >= 0 ? getComputedStyle(document.documentElement).getPropertyValue('--green').trim() : getComputedStyle(document.documentElement).getPropertyValue('--red').trim();

      return `
        <tr>
          <td class="td--rank" aria-label="rank">${r.rank}</td>
          <td>
            <div class="namecell">
              <div class="coin" aria-hidden="true">${icon}</div>
              <div>
                <div class="nm">${escapeHtml(r.name)}</div>
                <div class="sym">${escapeHtml(r.symbol)} • <span class="muted">${escapeHtml(r.network)}</span></div>
              </div>
            </div>
          </td>
          <td class="right num">$${formatUsd(r.price)}</td>
          <td class="right pctv" data-col="h1"><span class="${pctClass(r.h1)}">${pctText(r.h1)}</span></td>
          <td class="right pctv" data-col="h24"><span class="${pctClass(r.h24)}">${pctText(r.h24)}</span></td>
          <td class="right pctv" data-col="d7"><span class="${pctClass(r.d7)}">${pctText(r.d7)}</span></td>
          <td class="right num" data-col="marketCap">$${escapeHtml(r.marketCap)}</td>
          <td class="right num" data-col="volume">$${escapeHtml(r.volume)}</td>
          <td class="right num" data-col="supply">${escapeHtml(r.supply)}</td>
          <td data-col="spark">
            <svg class="spark" viewBox="0 0 140 26" role="img" aria-label="7 day sparkline">
              <path d="${spark.d}" fill="none" stroke="${sparkStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </td>
        </tr>
      `;
    })
    .join('');

  // Update info line to match spec phrasing, but keep total fixed
  const shownFrom = (state.page - 1) * state.perPage + 1;
  const shownTo = Math.min(state.page * state.perPage, state.totalAssets);
  el('#pagerInfo').textContent = `Showing ${shownFrom}–${shownTo} of ${state.totalAssets.toLocaleString('en-US')} assets`;
}

function renderPager() {
  const pager = el('#pager');
  const totalPages = 84; // from brief
  const p = state.page;

  const mkBtn = (label, page, cls = '') => {
    const active = page === p;
    const disabled = page < 1 || page > totalPages || page === null;
    return `<button class="pbtn ${cls} ${active ? 'is-active' : ''}" type="button" data-page="${page}" ${disabled ? 'disabled' : ''}>${label}</button>`;
  };

  const items = [];
  items.push(mkBtn('1', 1));
  items.push(mkBtn('2', 2));
  items.push(mkBtn('3', 3));
  items.push(mkBtn('4', 4));
  items.push(`<button class="pbtn is-ghost" type="button" disabled aria-hidden="true">…</button>`);
  items.push(mkBtn('84', 84));

  pager.innerHTML = items.join('');

  pager.onclick = (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn) return;
    const next = Number(btn.dataset.page);
    if (!Number.isFinite(next) || next < 1 || next > totalPages) return;
    state.page = next;
    renderTable();
    renderPager();
    // keep focus context
    el('#table').scrollIntoView({ block: 'start', behavior: 'smooth' });
  };
}

function wireTabs() {
  els('[data-category]').forEach((b) => {
    b.addEventListener('click', () => {
      state.category = b.dataset.category;
      state.page = 1;
      setActiveTabs();
      renderTable();
      renderPager();
    });
  });
  els('[data-network]').forEach((b) => {
    b.addEventListener('click', () => {
      state.network = b.dataset.network;
      state.page = 1;
      setActiveTabs();
      renderTable();
      renderPager();
    });
  });
}

function wireSort() {
  els('th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortKey = key;
        state.sortDir = key === 'rank' ? 'asc' : 'desc';
      }
      renderTable();
      updateSortIndicators();
    });
  });

  els('[data-primary-sort]').forEach((b) => {
    b.addEventListener('click', () => {
      els('[data-primary-sort]').forEach((x) => x.classList.toggle('is-active', x === b));
      const k = b.dataset.primarySort;
      state.primarySort = k;
      state.sortKey = k;
      state.sortDir = 'desc';
      renderTable();
      updateSortIndicators();
    });
  });
}

function updateSortIndicators() {
  els('th[data-sort]').forEach((th) => {
    const btn = th.querySelector('.thbtn');
    const key = th.dataset.sort;
    const base = btn.textContent.replace(/\s[↑↓]$/, '');
    if (key === state.sortKey) {
      btn.textContent = `${base} ${state.sortDir === 'asc' ? '↑' : '↓'}`;
    } else {
      btn.textContent = base;
    }
  });
}

function wireToggles() {
  const filtersBtn = el('#filtersBtn');
  const colsBtn = el('#colsBtn');
  const filtersPanel = el('#filtersPanel');
  const colsPanel = el('#colsPanel');

  filtersBtn.addEventListener('click', () => {
    const next = filtersPanel.hasAttribute('hidden');
    filtersPanel.toggleAttribute('hidden');
    if (next) colsPanel.setAttribute('hidden', '');
    filtersBtn.setAttribute('aria-expanded', String(next));
    colsBtn.setAttribute('aria-expanded', String(!colsPanel.hasAttribute('hidden')));
  });

  colsBtn.addEventListener('click', () => {
    const next = colsPanel.hasAttribute('hidden');
    colsPanel.toggleAttribute('hidden');
    if (next) filtersPanel.setAttribute('hidden', '');
    colsBtn.setAttribute('aria-expanded', String(next));
    filtersBtn.setAttribute('aria-expanded', String(!filtersPanel.hasAttribute('hidden')));
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    const within = e.target.closest('#filtersPanel, #colsPanel, #filtersBtn, #colsBtn');
    if (within) return;
    filtersPanel.setAttribute('hidden', '');
    colsPanel.setAttribute('hidden', '');
    filtersBtn.setAttribute('aria-expanded', 'false');
    colsBtn.setAttribute('aria-expanded', 'false');
  });

  // Filters inputs
  el('#q').addEventListener('input', (e) => {
    state.query = e.target.value;
    state.page = 1;
    renderTable();
    renderPager();
  });
  el('#minMc').addEventListener('input', (e) => {
    state.minMc = e.target.value;
    state.page = 1;
    renderTable();
    renderPager();
  });
  el('#chg24').addEventListener('change', (e) => {
    state.chg24 = e.target.value;
    state.page = 1;
    renderTable();
    renderPager();
  });

  // Quick chips
  els('[data-quick]').forEach((b) => {
    b.addEventListener('click', () => {
      const k = b.dataset.quick;
      if (k === 'reset') {
        state.query = '';
        state.minMc = '';
        state.chg24 = 'any';
        el('#q').value = '';
        el('#minMc').value = '';
        el('#chg24').value = 'any';
      }
      if (k === 'largecap') {
        state.minMc = String(10_000_000_000);
        el('#minMc').value = state.minMc;
      }
      if (k === 'volatile') {
        // filter by losers/gainers via 24h, keep it simple
        state.chg24 = 'pos';
        el('#chg24').value = 'pos';
      }
      state.page = 1;
      renderTable();
      renderPager();
    });
  });

  // Columns
  els('input[type="checkbox"][data-col]').forEach((cb) => {
    cb.addEventListener('change', () => {
      state.columns[cb.dataset.col] = cb.checked;
      applyColumnVisibility();
    });
  });
}

function wireReadMore() {
  const btn = el('#readMore');
  const more = el('#moreText');
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    more.toggleAttribute('hidden');
  });
}

function wirePromoCarousel() {
  const promos = [
    { text: 'CTP Launch: Secure $GENIUS Airdrop — Join Now', meta: 'Announcement · Limited-time' },
    { text: 'Partner Spotlight: Institutional custody integrations now live', meta: 'Ecosystem · Security' },
    { text: 'New: Token Unlocks and Historical Snapshots in Cryptocurrencies', meta: 'Product · Update' },
  ];

  let idx = 0;
  const track = el('#promoTrack');

  const render = () => {
    const p = promos[idx];
    track.innerHTML = `
      <div class="promo__text">${escapeHtml(p.text)}</div>
      <div class="promo__meta">${escapeHtml(p.meta)} · <span class="num">${idx + 1}/${promos.length}</span></div>
    `;
  };

  const next = () => {
    idx = (idx + 1) % promos.length;
    render();
  };
  const prev = () => {
    idx = (idx - 1 + promos.length) % promos.length;
    render();
  };

  el('#promoNext').addEventListener('click', next);
  el('#promoPrev').addEventListener('click', prev);

  render();
  setInterval(next, 6500);
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function boot() {
  setActiveTabs();
  applyColumnVisibility();
  wireTabs();
  wireSort();
  wireToggles();
  wireReadMore();
  wirePromoCarousel();

  const res = await fetch('assets/coins.json');
  COINS = await res.json();

  // Start in Market Cap sort to match UI control
  state.sortKey = 'marketCap';
  state.sortDir = 'desc';

  updateSortIndicators();
  renderTable();
  renderPager();
}

boot();
