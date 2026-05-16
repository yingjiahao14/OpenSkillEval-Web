/* CoinTracker Pro — static dashboard interactions */

const STATE = {
  category: 'Top',
  network: 'All Networks',
  sortKey: 'marketCap',
  sortDir: 'desc',
  page: 1,
  perPage: 100,
  totalAssets: 8364,
  filters: {
    q: '',
    minMcap: null,
    maxMcap: null,
    onlyGainers: false,
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

const PROMOS = [
  {
    kicker: 'Announcement',
    title: 'CTP Launch: Secure $GENIUS Airdrop — Join Now',
    meta: 'Limited-time campaign. Verify eligibility and connect a wallet to participate.',
    primary: 'Join Now',
    secondary: 'Learn More',
  },
  {
    kicker: 'Partner',
    title: 'Perps Liquidity Boost — Reduced Fees This Week',
    meta: 'Track top derivative venues and compare funding rates across majors.',
    primary: 'Explore Markets',
    secondary: 'View Exchanges',
  },
  {
    kicker: 'Update',
    title: 'New: Network Filters for Base & Solana',
    meta: 'Filter the rankings table by ecosystem to scan sector momentum faster.',
    primary: 'Try Filters',
    secondary: 'Read Changelog',
  },
];

// Seeded RNG for deterministic mock data
function mulberry32(a){
  return function(){
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260508);

const FIXED = [
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
    supplyRaw: 20.01e6,
    supplyText: '20.01M BTC',
    network: 'All Networks',
    category: 'Top',
    spark: [12,14,18,24,27,31,28],
  },
  {
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2356.00,
    change1h: 0.51,
    change24h: 0.80,
    change7d: 6.29,
    marketCap: 284.35e9,
    volume24h: 21.36e9,
    supplyRaw: 120.69e6,
    supplyText: '120.69M ETH',
    network: 'Ethereum',
    category: 'Top',
    spark: [10,13,17,22,26,30,33],
  },
  {
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    change1h: 0.01,
    change24h: 0.03,
    change7d: 0.01,
    marketCap: 185.84e9,
    volume24h: 138.79e9,
    supplyRaw: 185.8e9,
    supplyText: '185.8B USDT',
    network: 'Ethereum',
    category: 'Top',
    spark: [26,26,26,26,26,26,26],
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
    supplyRaw: 61.56e9,
    supplyText: '61.56B XRP',
    network: 'All Networks',
    category: 'Trending',
    spark: [11,14,15,22,35,40,46],
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
    supplyRaw: 134.78e6,
    supplyText: '134.78M BNB',
    network: 'BSC',
    category: 'Top',
    spark: [15,15,18,24,27,30,32],
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
    supplyRaw: 575.26e6,
    supplyText: '575.26M SOL',
    network: 'Solana',
    category: 'Trending',
    spark: [9,12,18,24,26,28,30],
  },
];

const NETWORKS = ['BSC','Solana','Base','Ethereum'];
const CATEGORIES = ['Top','Trending','Watchlist','Prediction Markets','Most Visited','New'];

function clamp(n,min,max){return Math.max(min,Math.min(max,n));}

function formatUSD(n){
  if (n >= 1e12) return `$${(n/1e12).toFixed(2)}T`.replace(/\.00T$/,'T');
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`.replace(/\.00B$/,'B');
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`.replace(/\.00M$/,'M');
  if (n >= 1e3) return `$${n.toLocaleString(undefined,{maximumFractionDigits:2})}`;
  if (n >= 1) return `$${n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  return `$${n.toPrecision(4)}`;
}

function formatPrice(n){
  if (n >= 1000) return `$${n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  if (n >= 1) return `$${n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:4})}`;
  return `$${n.toPrecision(4)}`;
}

function formatPct(n){
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}%`;
}

function isPositive(n){return n >= 0;}

function buildSparkSeries(base, volatility){
  const series = [];
  let v = base;
  for (let i=0;i<7;i++){
    const drift = (rng() - 0.48) * volatility;
    v = clamp(v + drift, 3, 48);
    series.push(v);
  }
  return series;
}

function makeMockAsset(rank){
  const network = NETWORKS[Math.floor(rng()*NETWORKS.length)];
  const category = CATEGORIES[Math.floor(rng()*CATEGORIES.length)];
  const name = `Asset ${rank}`;
  const symbol = `A${rank}`;

  const price = Math.pow(10, rng()*4) * (0.5 + rng()); // ~0.5 .. 50k
  const change1h = (rng()-0.48) * 2.4;
  const change24h = (rng()-0.45) * 8.0;
  const change7d = (rng()-0.42) * 18.0;

  const marketCap = clamp((rng()**2) * 2.4e11, 1.2e8, 2.4e11);
  const volume24h = clamp(marketCap * (0.02 + rng()*0.15), 4e6, 9e10);

  const supplyRaw = clamp(marketCap / price, 1e5, 1e12);
  const supplyText = humanSupply(supplyRaw, symbol);

  const spark = buildSparkSeries(18 + rng()*8, 8 + rng()*10);

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
    supplyRaw,
    supplyText,
    network,
    category,
    spark,
  };
}

function humanSupply(n, symbol){
  if (n >= 1e12) return `${(n/1e12).toFixed(2)}T ${symbol}`;
  if (n >= 1e9) return `${(n/1e9).toFixed(2)}B ${symbol}`;
  if (n >= 1e6) return `${(n/1e6).toFixed(2)}M ${symbol}`;
  return `${Math.round(n).toLocaleString()} ${symbol}`;
}

function buildDataset(){
  const rows = [];
  // Build 100 unique ranks; include fixed rows first
  const fixedByRank = new Map(FIXED.map(a => [a.rank, a]));
  for (let rank=1; rank<=100; rank++){
    if (fixedByRank.has(rank)) rows.push(fixedByRank.get(rank));
    else rows.push(makeMockAsset(rank));
  }

  // Ensure specific values appear even if ranks overlap
  const ensure = {
    btc: rows.find(r => r.name === 'Bitcoin'),
    eth: rows.find(r => r.name === 'Ethereum'),
    sol: rows.find(r => r.name === 'Solana'),
  };
  if (!ensure.sol) rows[6] = FIXED.find(r => r.name === 'Solana');

  // Make some rows watchlisted / most visited etc for tab filtering
  rows.forEach((r, i) => {
    if (i % 13 === 0) r.category = 'Watchlist';
    if (i % 17 === 0) r.category = 'Most Visited';
    if (i % 19 === 0) r.category = 'New';
    if (i % 23 === 0) r.category = 'Prediction Markets';
  });

  return rows;
}

const DATA_100 = buildDataset();

function applyCategoryNetworkFilters(rows){
  let out = rows;

  if (STATE.category && STATE.category !== 'More'){
    if (STATE.category === 'Top'){
      // Top: keep by rank
      out = out.slice().sort((a,b)=>a.rank-b.rank);
    } else {
      out = out.filter(r => r.category === STATE.category);
    }
  }

  if (STATE.network && STATE.network !== 'All Networks' && STATE.network !== 'More'){
    out = out.filter(r => r.network === STATE.network);
  }

  // free-text filter
  const q = (STATE.filters.q || '').trim().toLowerCase();
  if (q){
    out = out.filter(r => (r.name + ' ' + r.symbol).toLowerCase().includes(q));
  }

  // numeric filters
  if (typeof STATE.filters.minMcap === 'number') out = out.filter(r => r.marketCap >= STATE.filters.minMcap);
  if (typeof STATE.filters.maxMcap === 'number') out = out.filter(r => r.marketCap <= STATE.filters.maxMcap);

  if (STATE.filters.onlyGainers) out = out.filter(r => r.change24h > 0);

  return out;
}

function sortRows(rows){
  const key = STATE.sortKey;
  const dir = STATE.sortDir;
  const mult = dir === 'asc' ? 1 : -1;
  const collator = new Intl.Collator(undefined,{numeric:true,sensitivity:'base'});

  const sorted = rows.slice().sort((a,b)=>{
    if (key === 'name') return mult * collator.compare(a.name, b.name);
    return mult * ((a[key] ?? 0) - (b[key] ?? 0));
  });

  // stable tie-breaker
  return sorted.sort((a,b)=>{
    const v = (key === 'name') ? collator.compare(a.name,b.name) : ((a[key] ?? 0) - (b[key] ?? 0));
    if (v !== 0) return mult * v;
    return a.rank - b.rank;
  });
}

function pageRows(rows){
  // This dashboard shows 100 rows per page; for pages > 1 we generate mock pages.
  if (STATE.page === 1) return rows.slice(0, 100);

  const startRank = (STATE.page - 1) * STATE.perPage + 1;
  const seeded = mulberry32(20260508 + STATE.page * 97);
  const localRng = () => seeded();

  const result = [];
  for (let i=0;i<STATE.perPage;i++){
    const rank = startRank + i;
    // Create pseudo assets with localRng
    const network = NETWORKS[Math.floor(localRng()*NETWORKS.length)];
    const category = CATEGORIES[Math.floor(localRng()*CATEGORIES.length)];
    const name = `Asset ${rank}`;
    const symbol = `A${rank}`;

    const price = Math.pow(10, localRng()*4) * (0.5 + localRng());
    const change1h = (localRng()-0.48) * 2.4;
    const change24h = (localRng()-0.45) * 8.0;
    const change7d = (localRng()-0.42) * 18.0;

    const marketCap = clamp((localRng()**2) * 2.4e11, 1.2e8, 2.4e11);
    const volume24h = clamp(marketCap * (0.02 + localRng()*0.15), 4e6, 9e10);

    const supplyRaw = clamp(marketCap / price, 1e5, 1e12);
    const supplyText = humanSupply(supplyRaw, symbol);

    const spark = (()=>{
      const series=[]; let v = 18 + localRng()*8;
      for(let j=0;j<7;j++){
        v = clamp(v + (localRng()-0.48) * (8 + localRng()*10), 3, 48);
        series.push(v);
      }
      return series;
    })();

    result.push({
      rank,
      name,
      symbol,
      price,
      change1h,
      change24h,
      change7d,
      marketCap,
      volume24h,
      supplyRaw,
      supplyText,
      network,
      category,
      spark,
    });
  }

  // Apply current filters to generated page (approx)
  let filtered = result;
  if (STATE.network && STATE.network !== 'All Networks' && STATE.network !== 'More'){
    filtered = filtered.filter(r => r.network === STATE.network);
  }
  if (STATE.category && STATE.category !== 'Top' && STATE.category !== 'More'){
    filtered = filtered.filter(r => r.category === STATE.category);
  }
  const q = (STATE.filters.q || '').trim().toLowerCase();
  if (q) filtered = filtered.filter(r => (r.name + ' ' + r.symbol).toLowerCase().includes(q));

  if (STATE.filters.onlyGainers) filtered = filtered.filter(r => r.change24h > 0);
  if (typeof STATE.filters.minMcap === 'number') filtered = filtered.filter(r => r.marketCap >= STATE.filters.minMcap);
  if (typeof STATE.filters.maxMcap === 'number') filtered = filtered.filter(r => r.marketCap <= STATE.filters.maxMcap);

  return sortRows(filtered).slice(0, 100);
}

function sparklineSVG(values, isUp){
  const w = 120, h = 32;
  const pad = 2;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);

  const pts = values.map((v, i)=>{
    const x = pad + (i * (w - pad*2) / (values.length - 1));
    const y = pad + (h - pad*2) * (1 - (v - min) / span);
    return [x,y];
  });

  const d = pts.map((p, i)=> `${i===0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');
  const color = isUp ? '#16c784' : '#ea3943';
  const fill = isUp ? 'rgba(22,199,132,.12)' : 'rgba(234,57,67,.12)';

  const area = `${d} L ${w-pad} ${h-pad} L ${pad} ${h-pad} Z`;

  return `
    <svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">
      <path d="${area}" fill="${fill}"></path>
      <path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `.trim();
}

function renderTable(){
  const tbody = document.getElementById('cryptoTbody');

  // Base rows: on page 1 use DATA_100 then filter/sort
  let base = (STATE.page === 1) ? DATA_100 : [];
  let rows;

  if (STATE.page === 1){
    rows = sortRows(applyCategoryNetworkFilters(base));
    rows = rows.slice(0, 100);
  } else {
    // Generate pseudo page that respects filters and sort
    rows = pageRows([]);
  }

  tbody.innerHTML = rows.map(r => {
    const c1h = isPositive(r.change1h);
    const c24h = isPositive(r.change24h);
    const c7d = isPositive(r.change7d);

    const iconLabel = (r.symbol || '•').slice(0,3);
    const sparkUp = (r.spark[r.spark.length-1] - r.spark[0]) >= 0;

    return `
      <tr>
        <td class="col-rank mono num">${r.rank}</td>
        <td class="col-name">
          <div class="asset">
            <div class="icon" aria-hidden="true">${iconLabel}</div>
            <div class="asset-meta">
              <div class="asset-name">${escapeHtml(r.name)}</div>
              <div class="asset-sym">${escapeHtml(r.symbol)} • ${escapeHtml(r.network)}</div>
            </div>
          </div>
        </td>
        <td class="col-price mono num">${formatPrice(r.price)}</td>
        <td class="col-1h mono num ${c1h ? 'pos' : 'neg'}">${formatPct(r.change1h)}</td>
        <td class="col-24h mono num ${c24h ? 'pos' : 'neg'}">${formatPct(r.change24h)}</td>
        <td class="col-7d mono num ${c7d ? 'pos' : 'neg'}">${formatPct(r.change7d)}</td>
        <td class="col-mcap mono num">${formatUSD(r.marketCap)}</td>
        <td class="col-vol mono num">${formatUSD(r.volume24h)}</td>
        <td class="col-supply mono num">${escapeHtml(r.supplyText)}</td>
        <td class="col-spark num">${sparklineSVG(r.spark, sparkUp)}</td>
      </tr>
    `.trim();
  }).join('');

  renderRangeLabel();
  syncAriaSort();
}

function escapeHtml(s){
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');
}

function renderRangeLabel(){
  const start = (STATE.page - 1) * STATE.perPage + 1;
  const end = Math.min(STATE.page * STATE.perPage, STATE.totalAssets);
  document.getElementById('rangeLabel').textContent = `Showing ${start}–${end} of ${STATE.totalAssets.toLocaleString()} assets`;
}

function buildPager(){
  const pager = document.getElementById('pager');
  const totalPages = Math.ceil(STATE.totalAssets / STATE.perPage); // 84

  const current = STATE.page;

  function pageBtn(page, label=String(page), active=false){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'page-btn' + (active ? ' is-active' : '');
    btn.textContent = label;
    btn.setAttribute('aria-label', `Go to page ${page}`);
    btn.addEventListener('click', ()=>{
      STATE.page = page;
      renderAll();
      window.scrollTo({top: document.querySelector('.table-card').offsetTop - 90, behavior:'smooth'});
    });
    return btn;
  }

  function ellipsis(){
    const s = document.createElement('span');
    s.className = 'page-ellipsis';
    s.textContent = '…';
    return s;
  }

  pager.innerHTML = '';

  // Show: 1 2 3 4 ... 84 (as in brief). Keep current highlighted.
  const leading = [1,2,3,4].filter(p => p <= totalPages);
  leading.forEach(p => pager.appendChild(pageBtn(p, String(p), p === current)));

  if (totalPages > 5){
    pager.appendChild(ellipsis());
    pager.appendChild(pageBtn(totalPages, String(totalPages), totalPages === current));
  }
}

function setActiveTab(groupEl, selector, value){
  const tabs = Array.from(groupEl.querySelectorAll(selector));
  tabs.forEach(btn => {
    const isActive = (btn.dataset.network === value) || (btn.dataset.category === value);
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

function wireTabs(){
  const networkTabs = document.getElementById('networkTabs');
  const categoryTabs = document.getElementById('categoryTabs');

  networkTabs.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-network]');
    if (!btn) return;
    STATE.network = btn.dataset.network;
    STATE.page = 1;
    setActiveTab(networkTabs, 'button[data-network]', STATE.network);
    renderAll();
  });

  categoryTabs.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-category]');
    if (!btn) return;
    STATE.category = btn.dataset.category;
    STATE.page = 1;
    setActiveTab(categoryTabs, 'button[data-category]', STATE.category);
    renderAll();
  });
}

function syncAriaSort(){
  const ths = document.querySelectorAll('thead th[data-sort-key]');
  ths.forEach(th => {
    const key = th.getAttribute('data-sort-key');
    if (key === STATE.sortKey){
      th.setAttribute('aria-sort', STATE.sortDir === 'asc' ? 'ascending' : 'descending');
    } else {
      th.setAttribute('aria-sort', 'none');
    }
  });
}

function wireTableSorting(){
  const table = document.getElementById('cryptoTable');
  table.querySelector('thead').addEventListener('click', (e)=>{
    const th = e.target.closest('th[data-sort-key]');
    if (!th) return;

    const key = th.getAttribute('data-sort-key');
    if (STATE.sortKey === key){
      STATE.sortDir = STATE.sortDir === 'desc' ? 'asc' : 'desc';
    } else {
      STATE.sortKey = key;
      STATE.sortDir = (key === 'name' || key === 'rank') ? 'asc' : 'desc';
    }

    // reflect preset button text if matches
    const presetLabel = document.querySelector('#sortPreset .btn-label');
    presetLabel.textContent = th.textContent.trim() === '#' ? 'Rank' : th.textContent.trim();

    STATE.page = 1;
    renderAll();
  });
}

function wirePanels(){
  const filtersBtn = document.getElementById('filtersBtn');
  const columnsBtn = document.getElementById('columnsBtn');
  const filtersPanel = document.getElementById('filtersPanel');
  const columnsPanel = document.getElementById('columnsPanel');

  function closeMenus(){
    hideSortMenu();
  }

  function togglePanel(btn, panel){
    const open = !panel.hasAttribute('hidden');
    if (open){
      panel.setAttribute('hidden','');
      btn.setAttribute('aria-expanded','false');
      return;
    }

    // close others
    [filtersPanel, columnsPanel].forEach(p => p.setAttribute('hidden',''));
    [filtersBtn, columnsBtn].forEach(b => b.setAttribute('aria-expanded','false'));

    panel.removeAttribute('hidden');
    btn.setAttribute('aria-expanded','true');
    closeMenus();
  }

  filtersBtn.addEventListener('click', ()=> togglePanel(filtersBtn, filtersPanel));
  columnsBtn.addEventListener('click', ()=> togglePanel(columnsBtn, columnsPanel));

  document.addEventListener('click', (e)=>{
    const inside = e.target.closest('.panel, #filtersBtn, #columnsBtn, .control-group');
    if (!inside){
      filtersPanel.setAttribute('hidden','');
      columnsPanel.setAttribute('hidden','');
      filtersBtn.setAttribute('aria-expanded','false');
      columnsBtn.setAttribute('aria-expanded','false');
      hideSortMenu();
    }
  });

  // Filters
  const searchInput = document.getElementById('searchInput');
  const minMcap = document.getElementById('minMcap');
  const maxMcap = document.getElementById('maxMcap');
  const onlyGainers = document.getElementById('onlyGainers');

  function parseNum(s){
    const cleaned = String(s||'').replace(/[^0-9.]/g,'');
    if (!cleaned) return null;
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  }

  document.getElementById('applyFilters').addEventListener('click', ()=>{
    STATE.filters.q = searchInput.value || '';
    STATE.filters.minMcap = parseNum(minMcap.value);
    STATE.filters.maxMcap = parseNum(maxMcap.value);
    STATE.filters.onlyGainers = !!onlyGainers.checked;
    STATE.page = 1;
    renderAll();
  });

  document.getElementById('clearFilters').addEventListener('click', ()=>{
    searchInput.value = '';
    minMcap.value = '';
    maxMcap.value = '';
    onlyGainers.checked = false;
    STATE.filters.q = '';
    STATE.filters.minMcap = null;
    STATE.filters.maxMcap = null;
    STATE.filters.onlyGainers = false;
    STATE.page = 1;
    renderAll();
  });

  // Columns toggles
  columnsPanel.addEventListener('change', (e)=>{
    const cb = e.target.closest('input[type="checkbox"][data-col]');
    if (!cb) return;
    STATE.columns[cb.dataset.col] = cb.checked;
    applyColumnVisibility();
  });

  document.getElementById('columnsReset').addEventListener('click', ()=>{
    Object.keys(STATE.columns).forEach(k => STATE.columns[k] = true);
    columnsPanel.querySelectorAll('input[data-col]').forEach(cb => cb.checked = true);
    applyColumnVisibility();
  });

  document.getElementById('columnsDone').addEventListener('click', ()=>{
    columnsPanel.setAttribute('hidden','');
    columnsBtn.setAttribute('aria-expanded','false');
  });
}

function applyColumnVisibility(){
  const body = document.body;
  const map = {
    rank: 'hide-col-rank',
    name: 'hide-col-name',
    price: 'hide-col-price',
    change1h: 'hide-col-1h',
    change24h: 'hide-col-24h',
    change7d: 'hide-col-7d',
    marketCap: 'hide-col-mcap',
    volume24h: 'hide-col-vol',
    supply: 'hide-col-supply',
    spark: 'hide-col-spark',
  };

  Object.entries(map).forEach(([k, cls])=>{
    body.classList.toggle(cls, !STATE.columns[k]);
  });
}

function wireSortPresetMenu(){
  const btn = document.getElementById('sortPreset');
  const menu = document.getElementById('sortMenu');

  btn.addEventListener('click', ()=>{
    const open = btn.getAttribute('aria-expanded') === 'true';
    if (open){
      hideSortMenu();
      return;
    }
    btn.setAttribute('aria-expanded','true');
    menu.hidden = false;
  });

  menu.addEventListener('click', (e)=>{
    const item = e.target.closest('button[data-sort]');
    if (!item) return;
    STATE.sortKey = item.dataset.sort;
    STATE.sortDir = item.dataset.dir;
    btn.querySelector('.btn-label').textContent = item.textContent.trim();
    STATE.page = 1;
    renderAll();
    hideSortMenu();
  });
}

function hideSortMenu(){
  const btn = document.getElementById('sortPreset');
  const menu = document.getElementById('sortMenu');
  btn.setAttribute('aria-expanded','false');
  menu.hidden = true;
}

function wireMarketSummary(){
  const t = document.getElementById('summaryToggle');
  const more = document.getElementById('summaryMore');
  t.addEventListener('click', ()=>{
    const expanded = t.getAttribute('aria-expanded') === 'true';
    t.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    if (expanded) more.hidden = true; else more.hidden = false;
  });
}

function wireNavToggle(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.top-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', ()=>{
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
  });
}

function renderPromos(){
  const track = document.getElementById('promoTrack');
  const dots = document.getElementById('promoDots');

  track.innerHTML = PROMOS.map((p, i)=>{
    return `
      <div class="promo-slide" role="group" aria-roledescription="slide" aria-label="${i+1} of ${PROMOS.length}">
        <div>
          <div class="promo-kicker">${escapeHtml(p.kicker)}</div>
          <div class="promo-title">${escapeHtml(p.title)}</div>
          <div class="promo-meta">${escapeHtml(p.meta)}</div>
        </div>
        <div class="promo-cta">
          <button class="btn btn-primary" type="button">${escapeHtml(p.primary)}</button>
          <button class="btn btn-soft" type="button">${escapeHtml(p.secondary)}</button>
        </div>
      </div>
    `.trim();
  }).join('');

  dots.innerHTML = PROMOS.map((_, i)=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'promo-dot' + (i === 0 ? ' is-active' : '');
    b.setAttribute('aria-label', `Go to announcement ${i+1}`);
    b.addEventListener('click', ()=> setPromo(i));
    return b;
  }).map(b => b.outerHTML).join('');

  // Rewire because we used outerHTML
  Array.from(dots.querySelectorAll('button')).forEach((b, i)=>{
    b.addEventListener('click', ()=> setPromo(i));
  });
}

let promoIndex = 0;
let promoTimer = null;

function setPromo(i){
  promoIndex = (i + PROMOS.length) % PROMOS.length;
  const track = document.getElementById('promoTrack');
  track.style.transform = `translateX(-${promoIndex * 100}%)`;

  const dots = document.getElementById('promoDots');
  if (dots){
    Array.from(dots.querySelectorAll('.promo-dot')).forEach((d, idx)=>{
      d.classList.toggle('is-active', idx === promoIndex);
    });
  }
}

function wireCarousel(){
  document.querySelectorAll('[data-carousel]').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const dir = btn.getAttribute('data-carousel');
      setPromo(promoIndex + (dir === 'next' ? 1 : -1));
      resetPromoTimer();
    });
  });

  const viewport = document.querySelector('.promo-viewport');
  let startX = null;
  viewport.addEventListener('pointerdown', (e)=>{
    startX = e.clientX;
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointerup', (e)=>{
    if (startX == null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40){
      setPromo(promoIndex + (dx < 0 ? 1 : -1));
      resetPromoTimer();
    }
  });

  resetPromoTimer();
}

function resetPromoTimer(){
  if (promoTimer) window.clearInterval(promoTimer);
  promoTimer = window.setInterval(()=>{
    setPromo(promoIndex + 1);
  }, 6500);
}

function renderAll(){
  applyColumnVisibility();
  buildPager();
  renderTable();
}

function init(){
  renderPromos();
  wireCarousel();

  wireNavToggle();
  wireTabs();
  wirePanels();
  wireSortPresetMenu();
  wireTableSorting();
  wireMarketSummary();

  setActiveTab(document.getElementById('networkTabs'), 'button[data-network]', STATE.network);
  setActiveTab(document.getElementById('categoryTabs'), 'button[data-category]', STATE.category);

  renderAll();
}

document.addEventListener('DOMContentLoaded', init);
