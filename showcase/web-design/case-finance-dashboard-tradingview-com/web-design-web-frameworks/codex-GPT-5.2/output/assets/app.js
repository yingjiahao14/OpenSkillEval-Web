(function () {
  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function setActiveTabs(groupEl, nextValue) {
    const tabs = qa('[data-tab]', groupEl);
    for (const tab of tabs) {
      const selected = tab.getAttribute('data-tab') === nextValue;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    }
    const panels = qa('[data-panel]', groupEl);
    for (const panel of panels) {
      const show = panel.getAttribute('data-panel') === nextValue;
      panel.hidden = !show;
    }
  }

  function initTabs() {
    const groups = qa('[data-tabs]');
    for (const group of groups) {
      const defaultTab = group.getAttribute('data-default') || (q('[data-tab]', group) || {}).getAttribute?.('data-tab');
      if (defaultTab) setActiveTabs(group, defaultTab);

      group.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-tab]');
        if (!btn || !group.contains(btn)) return;
        setActiveTabs(group, btn.getAttribute('data-tab'));
      });
    }
  }

  function initAccordion() {
    const root = q('[data-accordion]');
    if (!root) return;
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-acc-trigger]');
      if (!btn) return;
      const group = btn.closest('[data-acc-group]');
      if (!group) return;
      const next = group.getAttribute('data-open') !== 'true';
      group.setAttribute('data-open', next ? 'true' : 'false');
      btn.setAttribute('aria-expanded', next ? 'true' : 'false');
    });
  }

  function initScrollNav() {
    const scrollers = qa('[data-scrollto]');
    for (const el of scrollers) {
      el.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-scrollto]');
        if (!btn) return;
        const id = btn.getAttribute('data-scrollto');
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  function initToggleFilters() {
    const toggles = qa('[data-toggle-target]');
    for (const wrap of toggles) {
      const input = q('input[type="checkbox"]', wrap);
      if (!input) continue;
      input.addEventListener('change', () => {
        const selector = wrap.getAttribute('data-toggle-target');
        if (!selector) return;
        const only = input.checked;
        const items = qa(selector);
        for (const item of items) {
          const flag = item.getAttribute('data-flag') === 'true';
          item.hidden = only ? !flag : false;
        }
      });
    }
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function drawCandles(canvas, candles, colors) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,.06)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const y = (h * i) / 5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const highs = candles.map((c) => c.h);
    const lows = candles.map((c) => c.l);
    const max = Math.max(...highs);
    const min = Math.min(...lows);
    const pad = (max - min) * 0.08;
    const top = max + pad;
    const bottom = min - pad;

    const xPad = 10;
    const usableW = w - xPad * 2;
    const candleW = usableW / candles.length;
    const bodyW = Math.max(4, candleW * 0.62);

    function yFor(price) {
      const t = (price - bottom) / (top - bottom);
      return h - t * h;
    }

    for (let i = 0; i < candles.length; i++) {
      const c = candles[i];
      const xCenter = xPad + candleW * i + candleW / 2;
      const yO = yFor(c.o);
      const yC = yFor(c.c);
      const yH = yFor(c.h);
      const yL = yFor(c.l);

      const up = c.c >= c.o;
      const col = up ? colors.up : colors.down;

      // Wick
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(xCenter, yH);
      ctx.lineTo(xCenter, yL);
      ctx.stroke();

      // Body
      const yTop = Math.min(yO, yC);
      const yBot = Math.max(yO, yC);
      const bodyH = Math.max(2, yBot - yTop);
      ctx.fillStyle = col;
      ctx.globalAlpha = 0.92;
      ctx.fillRect(xCenter - bodyW / 2, yTop, bodyW, bodyH);
      ctx.globalAlpha = 1;
    }

    // Crosshair-ish last price line
    const last = candles[candles.length - 1];
    const yLast = yFor(last.c);
    ctx.strokeStyle = 'rgba(46,230,200,.30)';
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(0, yLast);
    ctx.lineTo(w, yLast);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function generateCandles(seed, count) {
    // Deterministic pseudo-random-ish walk from a seed.
    let s = seed;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    let price = 260;
    const candles = [];
    for (let i = 0; i < count; i++) {
      const drift = lerp(-1.2, 1.2, rand());
      const vol = lerp(0.8, 3.8, rand());
      const o = price;
      const c = price + drift * vol;
      const hi = Math.max(o, c) + lerp(0.2, 2.6, rand());
      const lo = Math.min(o, c) - lerp(0.2, 2.6, rand());
      candles.push({ o, h: hi, l: lo, c });
      price = c;
    }
    return candles;
  }

  function initChartTimeframe() {
    const canvas = q('[data-candles]');
    if (!canvas) return;

    const colors = {
      up: 'rgba(25,209,138,1)',
      down: 'rgba(247,82,95,1)',
    };

    const datasets = {
      '1D': generateCandles(12, 42),
      '5D': generateCandles(34, 65),
      '1M': generateCandles(56, 85),
      '3M': generateCandles(78, 110),
      '6M': generateCandles(90, 130),
      'YTD': generateCandles(123, 150),
      '1Y': generateCandles(222, 170),
      '5Y': generateCandles(333, 200),
      All: generateCandles(444, 220),
    };

    function render(range) {
      const data = datasets[range] || datasets['1D'];
      drawCandles(canvas, data, colors);
      const label = q('[data-timeframe-label]');
      if (label) label.textContent = range;
    }

    const buttons = qa('[data-timeframe]');
    for (const b of buttons) {
      b.addEventListener('click', () => {
        const v = b.getAttribute('data-timeframe');
        for (const x of buttons) x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
        render(v);
      });
    }

    const active = (q('[data-timeframe][aria-pressed="true"]') || {}).getAttribute?.('data-timeframe') || '1D';
    render(active);
    window.addEventListener('resize', () => render((q('[data-timeframe][aria-pressed="true"]') || {}).getAttribute?.('data-timeframe') || '1D'));
  }

  function initBrokersFilters() {
    const root = q('[data-brokers]');
    if (!root) return;

    const list = q('[data-broker-list]', root);
    if (!list) return;

    const items = qa('[data-broker]', list);

    function apply() {
      const cat = (q('[data-tabs="broker-category"] [aria-selected="true"]') || {}).getAttribute?.('data-tab') || 'all';
      const sort = (q('[data-tabs="broker-sort"] [aria-selected="true"]') || {}).getAttribute?.('data-tab') || 'all';

      const filtered = items.filter((el) => {
        const cats = (el.getAttribute('data-cats') || '').split(',').map((x) => x.trim()).filter(Boolean);
        if (cat === 'all') return true;
        return cats.includes(cat);
      });

      const ordered = filtered.slice();
      if (sort === 'best') {
        ordered.sort((a, b) => Number(b.getAttribute('data-rating') || 0) - Number(a.getAttribute('data-rating') || 0));
      }

      for (const el of items) el.hidden = true;
      for (const el of ordered) {
        el.hidden = false;
        list.appendChild(el);
      }

      const count = q('[data-broker-count]', root);
      if (count) count.textContent = String(ordered.length);
    }

    root.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-tab]');
      if (!tab) return;
      window.setTimeout(apply, 0);
    });

    apply();
  }

  function initIdeasFilters() {
    const root = q('[data-ideas]');
    if (!root) return;

    const items = qa('[data-idea]', root);
    const toggleWrap = q('[data-toggle-target]', root);
    const toggle = toggleWrap ? q('input[type="checkbox"]', toggleWrap) : null;

    function apply() {
      const mode = (q('[data-tabs="ideas-filter"] [aria-selected="true"]') || {}).getAttribute?.('data-tab') || 'popular';
      const videosOnly = !!(toggle && toggle.checked);

      for (const item of items) {
        const okMode = item.getAttribute('data-mode') === mode;
        const isVideo = item.getAttribute('data-video') === 'true';
        const okVideo = videosOnly ? isVideo : true;
        item.hidden = !(okMode && okVideo);
      }
    }

    root.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-tab]');
      if (!tab) return;
      window.setTimeout(apply, 0);
    });
    if (toggle) toggle.addEventListener('change', apply);
    apply();
  }

  function initMarketMiniChartToggle() {
    const root = q('[data-mini-charts]');
    if (!root) return;

    function update() {
      const tf = (q('[data-tabs="mini-timeframe"] [aria-selected="true"]', root) || {}).getAttribute?.('data-tab') || '1D';
      const type = (q('[data-tabs="mini-type"] [aria-selected="true"]', root) || {}).getAttribute?.('data-tab') || 'area';
      const label = q('[data-mini-label]', root);
      if (label) label.textContent = `${tf} • ${type === 'candles' ? 'Candles' : 'Area'}`;

      const canvases = qa('canvas.spark', root);
      for (const canvas of canvases) {
        drawSpark(canvas, tf, type);
      }
    }

    function drawSpark(canvas, tf, type) {
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const seed = (canvas.getAttribute('data-seed') || '1').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
      const scale = tf === '1D' ? 20 : tf === '1M' ? 30 : tf === '1Y' ? 42 : tf === 'All' ? 52 : 26;
      const count = Math.min(60, Math.max(18, scale));
      const candles = generateCandles(seed + scale, count);

      const up = candles[candles.length - 1].c >= candles[0].o;
      const base = up ? 'rgba(25,209,138,1)' : 'rgba(247,82,95,1)';

      if (type === 'candles') {
        drawCandles(canvas, candles.slice(-28), { up: base, down: base });
        return;
      }

      const closes = candles.map((c) => c.c);
      const max = Math.max(...closes);
      const min = Math.min(...closes);
      const pad = (max - min) * 0.1;
      const top = max + pad;
      const bottom = min - pad;

      const xPad = 6;
      const yPad = 6;
      const usableW = w - xPad * 2;
      const usableH = h - yPad * 2;
      const step = usableW / (closes.length - 1);

      const pts = closes.map((p, i) => {
        const t = (p - bottom) / (top - bottom);
        return { x: xPad + i * step, y: yPad + (1 - t) * usableH };
      });

      ctx.lineWidth = 1.6;
      ctx.strokeStyle = base;
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        if (i === 0) ctx.moveTo(pts[i].x, pts[i].y);
        else ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();

      // Area fill
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = base;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, h);
      for (const p of pts) ctx.lineTo(p.x, p.y);
      ctx.lineTo(pts[pts.length - 1].x, h);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    root.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-tab]');
      if (!tab) return;
      window.setTimeout(update, 0);
    });
    window.addEventListener('resize', update);
    update();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initAccordion();
    initScrollNav();
    initToggleFilters();
    initChartTimeframe();
    initBrokersFilters();
    initIdeasFilters();
    initMarketMiniChartToggle();
  });
})();

