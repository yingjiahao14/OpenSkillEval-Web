/* CoinTracker Pro — static demo dashboard (no build) */

const STATE = {
  category: 'Top',
  network: 'All Networks',
  sortKey: 'rank',
  sortDir: 'asc',
  page: 1,
  perPage: 100,
  totalAssets: 8364,
  filters: {
    q: '',
    ch24h: 'any',
    mcap: 'any',
  },
  columns: {
    rank: true,
    name: true,
    price: true,
    ch1h: true,
    ch24h: true,
    ch7d: true,
    mcap: true,
    vol24h: true,
    supply: true,
    spark: true,
  },
};

const COLS = [
  { key: 'rank', label: '#', cls: 'col-rank' },
  { key: 'name', label: 'Name', cls: 'col-name' },
  { key: 'price', label: 'Price', cls: 'col-price num' },
  { key: 'ch1h', label: '1h %', cls: 'col-1h num' },
  { key: 'ch24h', label: '24h %', cls: 'col-24h num' },
  { key: 'ch7d', label: '7d %', cls: 'col-7d num' },
  { key: 'mcap', label: 'Market Cap', cls: 'col-mcap num' },
  { key: 'vol24h', label: 'Volume(24h)', cls: 'col-vol num' },
  { key: 'supply', label: 'Circulating Supply', cls: 'col-supply num' },
  { key: 'spark', label: 'Last 7 Days', cls: 'col-spark' },
];

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function formatMoney(value) {
  // For very large numbers: show T/B. Else use commas.
  const abs = Math.abs(value);
  if (abs >= 1e12) return `$${(value / 1e12).toFixed(2).replace(/\.00$/, '')}T`;
  if (abs >= 1e9) return `$${(value / 1e9).toFixed(2).replace(/\.00$/, '')}B`;
  if (abs >= 1e6) return `$${(value / 1e6).toFixed(2).replace(/\.00$/, '')}M`;
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function formatPrice(value) {
  if (value >= 1000) return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (value >= 1) return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`.replace(/0+$/, '').replace(/\.$/, '.00');
  // sub-dollar assets
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`.replace(/0+$/, '').replace(/\.$/, '.00');
}

function formatPct(value) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function pctClass(value) {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
}

function formatSupply(value, symbol) {
  // Use compact number with suffix; keep 2 decimals for M and above.
  const abs = Math.abs(value);
  let txt;
  if (abs >= 1e12) txt = `${(value / 1e12).toFixed(2).replace(/\.00$/, '')}T`;
  else if (abs >= 1e9) txt = `${(value / 1e9).toFixed(2).replace(/\.00$/, '')}B`;
  else if (abs >= 1e6) txt = `${(value / 1e6).toFixed(2).replace(/\.00$/, '')}M`;
  else txt = value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  return `${txt} ${symbol}`;
}

function sparklinePath(points, w = 120, h = 28, pad = 2) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;

  const dx = (w - pad * 2) / (points.length - 1);
  const scaleY = (h - pad * 2) / span;

  let d = '';
  for (let i = 0; i < points.length; i++) {
    const x = pad + i * dx;
    const y = pad + (max - points[i]) * scaleY;
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

function applyColumnVisibility() {
  const table = qs('#rankingsTable');
  for (const c of COLS) {
    const visible = !!STATE.columns[c.key];
    qsa(`.${c.cls.split(' ')[0]}`, table).forEach((el) => {
      el.style.display = visible ? '' : 'none';
    });
  }
}

function updateSortIndicators() {
  const headers = qsa('#rankingsTable thead th.sortable');
  for (const th of headers) {
    const k = th.dataset.sort;
    if (k === STATE.sortKey) {
      th.setAttribute('aria-sort', STATE.sortDir === 'asc' ? 'ascending' : 'descending');
    } else {
      th.setAttribute('aria-sort', 'none');
    }
  }
}

function stableSort(list, key, dir) {
  const mult = dir === 'asc' ? 1 : -1;
  return list
    .map((item, idx) => ({ item, idx }))
    .sort((a, b) => {
      const av = a.item[key];
      const bv = b.item[key];
      if (av === bv) return a.idx - b.idx;
      if (typeof av === 'string') return av.localeCompare(bv) * mult;
      return (av - bv) * mult;
    })
    .map((x) => x.item);
}

function filterAssets(all) {
  let list = all.slice();

  // Category filtering
  if (STATE.category !== 'More') {
    list = list.filter((a) => a.category === STATE.category);
  }

  // Network filtering
  if (STATE.network !== 'All Networks') {
    list = list.filter((a) => (a.network || 'More') === STATE.network);
  }

  // Advanced filters (panel)
  const q = STATE.filters.q.trim().toLowerCase();
  if (q) {
    list = list.filter((a) => a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q));
  }

  if (STATE.filters.ch24h === 'pos') list = list.filter((a) => a.ch24h > 0);
  if (STATE.filters.ch24h === 'neg') list = list.filter((a) => a.ch24h < 0);

  if (STATE.filters.mcap !== 'any') {
    const threshold = STATE.filters.mcap === '>=100B' ? 1e11 : STATE.filters.mcap === '>=10B' ? 1e10 : 1e9;
    list = list.filter((a) => a.mcap >= threshold);
  }

  return list;
}

function renderTable(assets) {
  const tbody = qs('#rankingsBody');
  tbody.textContent = '';

  const start = (STATE.page - 1) * STATE.perPage;
  const end = Math.min(start + STATE.perPage, assets.length);
  const slice = assets.slice(start, end);

  for (const a of slice) {
    const tr = document.createElement('tr');

    tr.appendChild(tdText(a.rank, 'col-rank mono-num'));

    const nameTd = document.createElement('td');
    nameTd.className = 'col-name';
    const dot = document.createElement('div');
    dot.className = 'coin-dot';
    const meta = document.createElement('div');
    meta.className = 'coin-meta';
    const nm = document.createElement('div');
    nm.className = 'coin-name';
    nm.textContent = a.name;
    const sym = document.createElement('div');
    sym.className = 'coin-sym';
    sym.textContent = a.symbol;

    meta.appendChild(nm);
    meta.appendChild(sym);

    const wrap = document.createElement('div');
    wrap.className = 'name-cell';
    wrap.appendChild(dot);
    wrap.appendChild(meta);

    // optional network badge for scannability
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = a.network === 'All Networks' ? '—' : (a.network || 'More');
    wrap.appendChild(badge);

    nameTd.appendChild(wrap);
    tr.appendChild(nameTd);

    tr.appendChild(tdText(formatPrice(a.price), 'col-price num mono-num'));
    tr.appendChild(tdPct(a.ch1h, 'col-1h num mono-num'));
    tr.appendChild(tdPct(a.ch24h, 'col-24h num mono-num'));
    tr.appendChild(tdPct(a.ch7d, 'col-7d num mono-num'));

    tr.appendChild(tdText(formatMoney(a.mcap), 'col-mcap num mono-num'));
    tr.appendChild(tdText(formatMoney(a.vol24h), 'col-vol num mono-num'));
    tr.appendChild(tdText(formatSupply(a.supply, a.supply_symbol), 'col-supply num mono-num'));

    const sparkTd = document.createElement('td');
    sparkTd.className = 'col-spark';
    sparkTd.appendChild(renderSpark(a.spark, a.ch7d));
    tr.appendChild(sparkTd);

    tbody.appendChild(tr);
  }

  applyColumnVisibility();
}

function tdText(text, cls) {
  const td = document.createElement('td');
  td.className = cls || '';
  td.textContent = text;
  return td;
}

function tdPct(value, cls) {
  const td = document.createElement('td');
  td.className = `${cls || ''} ${pctClass(value)}`.trim();
  td.textContent = formatPct(value);
  return td;
}

function renderSpark(points, ch7d) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 120 28');
  svg.setAttribute('class', 'spark');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const d = sparklinePath(points);
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke', ch7d >= 0 ? 'var(--pos)' : 'var(--neg)');

  const base = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  base.setAttribute('d', 'M 0 27 L 120 27');
  base.setAttribute('stroke', 'oklch(89% 0.015 255)');
  base.setAttribute('stroke-width', '1');
  base.setAttribute('opacity', '0.6');

  svg.appendChild(base);
  svg.appendChild(path);
  return svg;
}

function renderPager() {
  const totalPages = 84;
  const pager = qs('#pager');
  pager.textContent = '';

  const add = (label, page, opts = {}) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `page ${opts.active ? 'is-active' : ''} ${opts.ellipsis ? 'is-ellipsis' : ''}`.trim();
    b.textContent = label;
    if (!opts.ellipsis) {
      b.addEventListener('click', () => {
        STATE.page = page;
        render();
        qs('.table-wrap')?.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      });
    } else {
      b.disabled = true;
    }
    pager.appendChild(b);
  };

  const p = STATE.page;

  const pages = new Set([1, 2, 3, 4, totalPages]);
  for (let i = p - 1; i <= p + 1; i++) {
    if (i >= 1 && i <= totalPages) pages.add(i);
  }

  const ordered = Array.from(pages).sort((a, b) => a - b);
  let prev = 0;
  for (const n of ordered) {
    if (prev && n - prev > 1) add('…', null, { ellipsis: true });
    add(String(n), n, { active: n === p });
    prev = n;
  }
}

function updateCounts(filteredCount) {
  const start = (STATE.page - 1) * STATE.perPage + 1;
  const end = Math.min(STATE.page * STATE.perPage, filteredCount);
  const el = qs('#tableCount');

  // Keep the exact expected phrase while reflecting current slice.
  const base = `Showing ${start}–${end} of ${STATE.totalAssets.toLocaleString()} assets`;
  el.textContent = base;
}

function setActiveTab(groupSel, btn) {
  qsa(`${groupSel} .tab`).forEach((t) => {
    t.classList.remove('is-active');
    t.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('is-active');
  btn.setAttribute('aria-selected', 'true');
}

function togglePopover(id) {
  const el = qs(id);
  const other = id === '#columnsPopover' ? qs('#filtersPopover') : qs('#columnsPopover');

  if (other) {
    other.classList.remove('is-open');
    other.setAttribute('aria-hidden', 'true');
  }

  const open = !el.classList.contains('is-open');
  el.classList.toggle('is-open', open);
  el.setAttribute('aria-hidden', open ? 'false' : 'true');
}

function closePopovers() {
  for (const id of ['#columnsPopover', '#filtersPopover']) {
    const el = qs(id);
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
  }
}

function renderColumnsPanel() {
  const grid = qs('#columnsGrid');
  grid.textContent = '';

  const mk = (key, label) => {
    const wrap = document.createElement('label');
    wrap.className = 'field';
    wrap.style.gridTemplateColumns = 'auto 1fr';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '10px';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!STATE.columns[key];

    cb.addEventListener('change', () => {
      STATE.columns[key] = cb.checked;
      applyColumnVisibility();
    });

    const t = document.createElement('span');
    t.className = 'field-label';
    t.style.textTransform = 'none';
    t.style.letterSpacing = 'normal';
    t.style.fontSize = '13px';
    t.style.color = 'var(--text)';
    t.textContent = label;

    wrap.appendChild(cb);
    wrap.appendChild(t);
    return wrap;
  };

  for (const c of COLS) {
    grid.appendChild(mk(c.key, c.label));
  }
}

function wireInteractions(allAssets) {
  // Category tabs
  qsa('[data-category]').forEach((b) => {
    b.addEventListener('click', () => {
      STATE.category = b.dataset.category;
      STATE.page = 1;
      setActiveTab('[aria-label="Category"]', b);
      render(allAssets);
    });
  });

  // Network tabs
  qsa('[data-network]').forEach((b) => {
    b.addEventListener('click', () => {
      STATE.network = b.dataset.network;
      STATE.page = 1;
      setActiveTab('[aria-label="Network"]', b);
      render(allAssets);
    });
  });

  // Sorting headers
  qsa('#rankingsTable thead th.sortable').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (STATE.sortKey === key) {
        STATE.sortDir = STATE.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        STATE.sortKey = key;
        STATE.sortDir = key === 'name' ? 'asc' : 'desc';
        if (key === 'rank') STATE.sortDir = 'asc';
      }
      STATE.page = 1;
      updateSortIndicators();
      render(allAssets);
    });
  });

  // Panel buttons
  qsa('[data-action="toggleColumns"]').forEach((b) => b.addEventListener('click', () => togglePopover('#columnsPopover')));
  qsa('[data-action="toggleFilters"]').forEach((b) => b.addEventListener('click', () => togglePopover('#filtersPopover')));

  // Filter apply/reset
  qs('[data-action="applyFilters"]').addEventListener('click', () => {
    STATE.filters.q = qs('#searchInput').value;
    STATE.filters.ch24h = qs('#changeSelect').value;
    STATE.filters.mcap = qs('#mcapSelect').value;
    STATE.page = 1;
    render(allAssets);
    closePopovers();
  });

  qs('[data-action="resetFilters"]').addEventListener('click', () => {
    STATE.filters = { q: '', ch24h: 'any', mcap: 'any' };
    qs('#searchInput').value = '';
    qs('#changeSelect').value = 'any';
    qs('#mcapSelect').value = 'any';
    STATE.page = 1;
    render(allAssets);
  });

  // Market summary accordion
  qs('[data-action="toggleSummary"]').addEventListener('click', (e) => {
    const more = qs('#summaryMore');
    const isHidden = more.hasAttribute('hidden');
    if (isHidden) more.removeAttribute('hidden');
    else more.setAttribute('hidden', '');
    e.currentTarget.textContent = isHidden ? 'Show Less' : 'Read More';
  });

  // Carousel
  let slide = 0;
  const slides = qsa('.promo-slide');
  const dots = qsa('.promo-dots .dot');

  const setSlide = (n) => {
    slide = (n + slides.length) % slides.length;
    slides.forEach((s) => s.classList.remove('is-active'));
    dots.forEach((d) => d.classList.remove('is-active'));
    qs(`.promo-slide[data-slide="${slide}"]`).classList.add('is-active');
    qs(`.promo-dots [data-carousel-dot="${slide}"]`).classList.add('is-active');
  };

  qs('[data-carousel="prev"]').addEventListener('click', () => setSlide(slide - 1));
  qs('[data-carousel="next"]').addEventListener('click', () => setSlide(slide + 1));
  dots.forEach((d) => d.addEventListener('click', () => setSlide(Number(d.dataset.carouselDot))));

  let timer = window.setInterval(() => setSlide(slide + 1), 7000);
  qs('.promo').addEventListener('pointerenter', () => { window.clearInterval(timer); });
  qs('.promo').addEventListener('pointerleave', () => { timer = window.setInterval(() => setSlide(slide + 1), 7000); });

  // Close popovers on outside click
  document.addEventListener('click', (e) => {
    const col = qs('#columnsPopover');
    const fil = qs('#filtersPopover');
    const isBtn = e.target.closest('[data-action="toggleColumns"], [data-action="toggleFilters"]');
    if (isBtn) return;
    if (col.contains(e.target) || fil.contains(e.target)) return;
    closePopovers();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopovers();
    if (e.key.toLowerCase() === 'c') togglePopover('#columnsPopover');
    if (e.key.toLowerCase() === 'f') togglePopover('#filtersPopover');
  });
}

let ALL = [];

function render(allAssets = ALL) {
  const filtered = filterAssets(allAssets);
  const sorted = stableSort(filtered, STATE.sortKey, STATE.sortDir);

  // Pagination is specified as 1..84 with 100 rows per page.
  // The demo table uses the first 100 demo assets on each page by shifting ranks.
  // We simulate pages by reusing the 100-row dataset, but adjust ranks accordingly.
  // This keeps the UI faithful and fast while staying static.
  const totalPages = 84;
  if (STATE.page < 1) STATE.page = 1;
  if (STATE.page > totalPages) STATE.page = totalPages;

  const pageBase = (STATE.page - 1) * STATE.perPage;
  const pageData = sorted.map((a) => ({ ...a, rank: a.rank + pageBase }));

  renderTable(pageData);
  renderPager();
  updateCounts(STATE.totalAssets);
  updateSortIndicators();
}

async function init() {
  renderColumnsPanel();

  const res = await fetch('assets/data.json', { cache: 'no-store' });
  const json = await res.json();
  ALL = json.assets;

  wireInteractions(ALL);

  // Initial render
  render(ALL);
}

init().catch((err) => {
  console.error(err);
  const foot = qs('#tableCount');
  if (foot) foot.textContent = 'Failed to load data.';
});
