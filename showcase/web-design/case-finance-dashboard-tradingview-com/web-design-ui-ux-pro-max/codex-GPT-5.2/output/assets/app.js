/* ChartPulse UI interactions (no build step). */

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function formatNumber(n, decimals = 2) {
  if (typeof n !== 'number' || Number.isNaN(n)) return '';
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function setActiveTabs(container) {
  const tabs = qsa('[data-tab]', container);
  const panels = qsa('[data-tab-panel]', container);
  if (!tabs.length) return;

  function activate(tab) {
    const key = tab.getAttribute('data-tab');
    tabs.forEach((t) => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
    panels.forEach((p) => {
      const match = p.getAttribute('data-tab-panel') === key;
      p.hidden = !match;
    });
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => activate(t));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(t);
      }
    });
  });

  const defaultTab = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
  activate(defaultTab);
}

function initAccordions(root = document) {
  qsa('[data-accordion]', root).forEach((acc) => {
    qsa('[data-acc-trigger]', acc).forEach((btn) => {
      const id = btn.getAttribute('aria-controls');
      const panel = id ? qs(`#${CSS.escape(id)}`, acc) : btn.nextElementSibling;
      if (!panel) return;

      const inner = qs('.acc-content-inner', panel) || panel.firstElementChild;
      const open = btn.getAttribute('aria-expanded') === 'true';
      panel.style.maxHeight = open ? `${inner.scrollHeight}px` : '0px';

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        panel.style.maxHeight = isOpen ? '0px' : `${inner.scrollHeight}px`;
      });
    });
  });
}

function seedSparklines(root = document) {
  qsa('canvas[data-spark]', root).forEach((c) => {
    const values = (c.getAttribute('data-values') || '')
      .split(',')
      .map((v) => Number(v.trim()))
      .filter((v) => Number.isFinite(v));
    drawSparkline(c, values);
  });
}

function drawSparkline(canvas, values) {
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(10, Math.floor(rect.width * dpr));
  const h = Math.max(10, Math.floor(rect.height * dpr));
  canvas.width = w;
  canvas.height = h;

  ctx.clearRect(0, 0, w, h);
  const pad = 2 * dpr;

  if (!values.length) {
    ctx.fillStyle = 'rgba(255,255,255,.08)';
    ctx.fillRect(pad, h / 2, w - pad * 2, 1 * dpr);
    return;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const up = values[values.length - 1] - values[0] >= 0;
  const stroke = up ? 'rgba(33,192,122,.85)' : 'rgba(247,82,95,.85)';
  const fill = up ? 'rgba(33,192,122,.12)' : 'rgba(247,82,95,.12)';

  function x(i) {
    return pad + (i * (w - pad * 2)) / (values.length - 1 || 1);
  }
  function y(v) {
    const t = (v - min) / span;
    return pad + (1 - t) * (h - pad * 2);
  }

  ctx.beginPath();
  values.forEach((v, i) => {
    const px = x(i);
    const py = y(v);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });

  // Area fill
  ctx.lineTo(pad + (w - pad * 2), h - pad);
  ctx.lineTo(pad, h - pad);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();

  // Stroke path again
  ctx.beginPath();
  values.forEach((v, i) => {
    const px = x(i);
    const py = y(v);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.lineWidth = 2 * dpr;
  ctx.strokeStyle = stroke;
  ctx.stroke();
}

function drawCandles(canvas, candles, options = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = Math.floor(rect.width * dpr);
  const h = Math.floor(rect.height * dpr);
  canvas.width = w;
  canvas.height = h;

  const pad = 42 * dpr;
  const leftPad = 54 * dpr;
  const topPad = 18 * dpr;
  const innerW = Math.max(10, w - leftPad - pad);
  const innerH = Math.max(10, h - pad - topPad);

  const highs = candles.map((c) => c.h);
  const lows = candles.map((c) => c.l);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const span = max - min || 1;

  const bgGrid = 'rgba(255,255,255,.06)';
  const txt = 'rgba(169,180,198,.92)';

  ctx.clearRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = bgGrid;
  ctx.lineWidth = 1 * dpr;
  ctx.setLineDash([3 * dpr, 6 * dpr]);
  for (let i = 0; i <= 6; i++) {
    const y = topPad + (i * innerH) / 6;
    ctx.beginPath();
    ctx.moveTo(leftPad, y);
    ctx.lineTo(leftPad + innerW, y);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Axes labels (left)
  ctx.fillStyle = txt;
  ctx.font = `${12 * dpr}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 6; i++) {
    const t = 1 - i / 6;
    const v = min + span * t;
    const y = topPad + (i * innerH) / 6;
    ctx.fillText(formatNumber(v, 2), leftPad - 10 * dpr, y);
  }

  const candleW = (innerW / candles.length) * 0.62;
  const gap = innerW / candles.length;
  const wickW = 2 * dpr;

  function yFor(v) {
    const t = (v - min) / span;
    return topPad + (1 - t) * innerH;
  }

  candles.forEach((c, i) => {
    const x = leftPad + i * gap + gap / 2;
    const yO = yFor(c.o);
    const yC = yFor(c.c);
    const yH = yFor(c.h);
    const yL = yFor(c.l);
    const up = c.c >= c.o;
    const col = up ? 'rgba(33,192,122,.95)' : 'rgba(247,82,95,.95)';
    const colFill = up ? 'rgba(33,192,122,.24)' : 'rgba(247,82,95,.24)';

    // Wick
    ctx.strokeStyle = col;
    ctx.lineWidth = wickW;
    ctx.beginPath();
    ctx.moveTo(x, yH);
    ctx.lineTo(x, yL);
    ctx.stroke();

    // Body
    const top = Math.min(yO, yC);
    const bottom = Math.max(yO, yC);
    const bodyH = Math.max(3 * dpr, bottom - top);
    ctx.fillStyle = colFill;
    ctx.strokeStyle = col;
    ctx.lineWidth = 1 * dpr;
    ctx.beginPath();
    ctx.roundRect(x - candleW / 2, top, candleW, bodyH, 3 * dpr);
    ctx.fill();
    ctx.stroke();
  });

  // Overlay last price line
  const last = candles[candles.length - 1];
  const lastY = yFor(last.c);
  ctx.strokeStyle = 'rgba(45,212,191,.5)';
  ctx.lineWidth = 1 * dpr;
  ctx.setLineDash([4 * dpr, 5 * dpr]);
  ctx.beginPath();
  ctx.moveTo(leftPad, lastY);
  ctx.lineTo(leftPad + innerW, lastY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Label
  ctx.fillStyle = 'rgba(10,14,20,.85)';
  ctx.strokeStyle = 'rgba(45,212,191,.55)';
  ctx.lineWidth = 1 * dpr;
  const label = `${formatNumber(last.c, 2)}`;
  const tw = ctx.measureText(label).width;
  const boxW = tw + 18 * dpr;
  const boxH = 20 * dpr;
  const bx = leftPad + innerW - boxW;
  const by = clamp(lastY - boxH / 2, topPad, topPad + innerH - boxH);
  ctx.beginPath();
  ctx.roundRect(bx, by, boxW, boxH, 8 * dpr);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'rgba(230,237,247,.92)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, bx + boxW / 2, by + boxH / 2);

  if (options.onDraw) options.onDraw({ min, max, last });
}

function chartDataForTimeframe(tf) {
  // Deterministic synthetic candles (not market data) — used only for the visual chart.
  // The *numbers* shown in tables/stats come from the brief and must match exactly.
  const base = 263.4;
  const points = {
    '1D': 42,
    '5D': 56,
    '1M': 72,
    '6M': 86,
    '1Y': 98,
    '5Y': 120,
  };
  const n = points[tf] || 72;
  const candles = [];
  let p = base;
  for (let i = 0; i < n; i++) {
    const drift = (Math.sin(i / 6) + Math.cos(i / 11)) * 0.55;
    const noise = Math.sin(i * 1.7) * 0.18;
    const delta = (drift + noise) * (tf === '1D' ? 0.35 : 0.55);
    const o = p;
    const c = p + delta;
    const hi = Math.max(o, c) + Math.abs(Math.cos(i / 3)) * 0.85;
    const lo = Math.min(o, c) - Math.abs(Math.sin(i / 4)) * 0.85;
    candles.push({ o, h: hi, l: lo, c });
    p = c;
  }
  return candles;
}

function initChartWorkspace(root = document) {
  const canvas = qs('#candles', root);
  if (!canvas) return;
  const legend = qs('[data-chart-legend]', root);

  function render(tf) {
    const candles = chartDataForTimeframe(tf);
    drawCandles(canvas, candles, {
      onDraw({ last }) {
        if (!legend) return;
        legend.textContent = `AAPL · ${tf} · Close ${formatNumber(last.c, 2)} (synthetic)`;
      },
    });
  }

  function setTf(btn) {
    qsa('[data-timeframe]', root).forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
    render(btn.getAttribute('data-timeframe'));
  }

  qsa('[data-timeframe]', root).forEach((btn) => {
    btn.addEventListener('click', () => setTf(btn));
  });
  const defaultBtn = qsa('[data-timeframe]', root).find((b) => b.getAttribute('aria-pressed') === 'true') || qsa('[data-timeframe]', root)[0];
  if (defaultBtn) setTf(defaultBtn);

  const ro = new ResizeObserver(() => {
    const active = qsa('[data-timeframe]', root).find((b) => b.getAttribute('aria-pressed') === 'true');
    if (active) render(active.getAttribute('data-timeframe'));
  });
  ro.observe(canvas);
}

function initWatchlistSelection(root = document) {
  const title = qs('[data-selected-symbol]', root);
  const exchange = qs('[data-selected-exchange]', root);
  const price = qs('[data-selected-price]', root);
  const change = qs('[data-selected-change]', root);
  const headline = qs('[data-selected-headline]', root);

  qsa('[data-watch-row]', root).forEach((row) => {
    row.addEventListener('click', () => {
      const sym = row.getAttribute('data-symbol') || '';
      const last = row.getAttribute('data-last') || '';
      const chg = row.getAttribute('data-chg') || '';
      const chgp = row.getAttribute('data-chgp') || '';
      const name = row.getAttribute('data-name') || '';
      const ex = row.getAttribute('data-exchange') || '';
      if (title) title.textContent = `${sym} — ${name}`.trim();
      if (exchange) exchange.textContent = ex;
      if (price) price.textContent = last;
      if (change) change.textContent = `${chg} (${chgp})`;
      if (headline) {
        headline.textContent =
          sym === 'AAPL'
            ? "Apple's iPhone shipments in China rose 20% in Q1, the strongest growth among major smartphone vendors."
            : 'Select AAPL to see the brief headline.';
      }
    });
  });
}

function initAll() {
  qsa('[data-tabs]').forEach(setActiveTabs);
  initAccordions();
  seedSparklines();
  initChartWorkspace();
  initWatchlistSelection();
}

document.addEventListener('DOMContentLoaded', initAll);

