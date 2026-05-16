// ChartPulse - shared interactive behaviors

// Tab groups: any element with [data-tabs] containing buttons with [data-tab]
// And targets with [data-tab-panel] in a [data-tabs-panels] container with the same group id
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const groupId = group.dataset.tabs;
    const buttons = group.querySelectorAll('[data-tab]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        const panels = document.querySelectorAll(`[data-tabs-panels="${groupId}"] [data-tab-panel]`);
        panels.forEach(p => {
          if (p.dataset.tabPanel === target) p.classList.remove('hidden');
          else p.classList.add('hidden');
        });
      });
    });
  });
}

// Accordion: [data-accordion] groups can collapse
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(t => {
    t.addEventListener('click', () => {
      t.closest('.accordion-group').classList.toggle('collapsed');
    });
  });
}

// Generic toggle buttons within [data-toggle-group] - single selection
function initToggleGroups() {
  document.querySelectorAll('[data-toggle-group]').forEach(group => {
    const buttons = group.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
}

// Sparkline generator
function makeSparkline(values, opts = {}) {
  const { width = 60, height = 28, color = '#4ade80', stroke = 1.5 } = opts;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const points = values.map((v, i) => `${(i * step).toFixed(1)},${(height - ((v - min) / range) * height).toFixed(1)}`).join(' ');
  const last = values[values.length - 1];
  const lastY = (height - ((last - min) / range) * height).toFixed(1);
  return `<svg class="spark" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
    <polyline points="${points}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${width}" cy="${lastY}" r="2" fill="${color}"/>
  </svg>`;
}

function randomSpark(seed, trend = 1) {
  let v = 50;
  const arr = [];
  let s = seed;
  for (let i = 0; i < 20; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = (s / 233280) - 0.5;
    v += r * 8 + trend * 0.3;
    arr.push(v);
  }
  return arr;
}

// Inject sparklines into [data-spark] elements
function initSparklines() {
  document.querySelectorAll('[data-spark]').forEach(el => {
    const trend = parseFloat(el.dataset.trend || '0');
    const seed = parseInt(el.dataset.seed || '42');
    const color = trend >= 0 ? '#4ade80' : '#F7525F';
    const w = parseInt(el.dataset.w || '60');
    const h = parseInt(el.dataset.h || '28');
    el.innerHTML = makeSparkline(randomSpark(seed, trend), { width: w, height: h, color });
  });
}

// Candlestick chart generator for chart.html
function generateCandles(count = 80, seed = 1) {
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const candles = [];
  let price = 250;
  for (let i = 0; i < count; i++) {
    const open = price;
    const move = (rand() - 0.48) * 6;
    const close = open + move;
    const high = Math.max(open, close) + rand() * 3;
    const low = Math.min(open, close) - rand() * 3;
    candles.push({ open, close, high, low });
    price = close;
  }
  return candles;
}

function renderCandlestickChart(container) {
  const w = container.clientWidth || 1000;
  const h = container.clientHeight || 500;
  const candles = generateCandles(90, 7);
  const padding = { l: 50, r: 60, t: 20, b: 30 };
  const chartW = w - padding.l - padding.r;
  const chartH = h - padding.t - padding.b;

  const allPrices = candles.flatMap(c => [c.high, c.low]);
  const min = Math.min(...allPrices);
  const max = Math.max(...allPrices);
  const range = max - min;
  const yScale = v => padding.t + chartH - ((v - min) / range) * chartH;
  const candleW = chartW / candles.length;

  // Grid lines
  const gridLines = [];
  for (let i = 0; i <= 6; i++) {
    const v = min + (range / 6) * i;
    const y = yScale(v);
    gridLines.push(`<line x1="${padding.l}" y1="${y}" x2="${w - padding.r}" y2="${y}" stroke="#1c1c20" stroke-width="1"/>`);
    gridLines.push(`<text x="${w - padding.r + 6}" y="${y + 3}" fill="#5f5f68" font-size="10" font-family="JetBrains Mono">${v.toFixed(2)}</text>`);
  }

  // Time labels
  const timeLabels = [];
  for (let i = 0; i < 6; i++) {
    const x = padding.l + (chartW / 6) * i + candleW / 2;
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i + 2];
    timeLabels.push(`<text x="${x}" y="${h - 10}" fill="#5f5f68" font-size="10">${month}</text>`);
  }

  // Candles
  const candleSvg = candles.map((c, i) => {
    const x = padding.l + i * candleW + candleW / 2;
    const isUp = c.close >= c.open;
    const color = isUp ? '#26a69a' : '#F7525F';
    const bodyTop = yScale(Math.max(c.open, c.close));
    const bodyBot = yScale(Math.min(c.open, c.close));
    const bodyH = Math.max(1, bodyBot - bodyTop);
    const bodyW = Math.max(2, candleW * 0.7);
    return `<line x1="${x}" y1="${yScale(c.high)}" x2="${x}" y2="${yScale(c.low)}" stroke="${color}" stroke-width="1"/>
      <rect x="${x - bodyW/2}" y="${bodyTop}" width="${bodyW}" height="${bodyH}" fill="${color}"/>`;
  }).join('');

  // Volume bars at bottom (in same chart, semi-transparent)
  const volH = 50;
  const volSvg = candles.map((c, i) => {
    const x = padding.l + i * candleW + candleW / 2;
    const h = Math.random() * volH;
    const isUp = c.close >= c.open;
    const color = isUp ? '#26a69a' : '#F7525F';
    return `<rect x="${x - candleW * 0.35}" y="${chartH + padding.t - h}" width="${candleW * 0.7}" height="${h}" fill="${color}" opacity="0.25"/>`;
  }).join('');

  // Current price line (last close)
  const lastClose = candles[candles.length - 1].close;
  const lastY = yScale(lastClose);

  // MA line (simple moving average)
  const maPoints = candles.map((_, i) => {
    if (i < 10) return null;
    const slice = candles.slice(i - 10, i);
    const avg = slice.reduce((a, c) => a + c.close, 0) / slice.length;
    const x = padding.l + i * candleW + candleW / 2;
    return `${x},${yScale(avg)}`;
  }).filter(Boolean).join(' ');

  container.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    ${gridLines.join('')}
    ${volSvg}
    <polyline points="${maPoints}" fill="none" stroke="#a855f7" stroke-width="1.5" opacity="0.8"/>
    ${candleSvg}
    <line x1="${padding.l}" y1="${lastY}" x2="${w - padding.r}" y2="${lastY}" stroke="#2962FF" stroke-width="1" stroke-dasharray="3,3"/>
    <rect x="${w - padding.r}" y="${lastY - 9}" width="56" height="18" fill="#2962FF" rx="2"/>
    <text x="${w - padding.r + 28}" y="${lastY + 4}" fill="white" font-size="11" font-weight="700" font-family="JetBrains Mono" text-anchor="middle">${lastClose.toFixed(2)}</text>
    ${timeLabels.join('')}
  </svg>`;
}

// Idea thumbnail SVG generator
function ideaChart(seed, type = 'long') {
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const w = 320, h = 180;
  const points = [];
  let v = h * 0.6;
  for (let i = 0; i <= 30; i++) {
    const trend = type === 'long' ? -0.8 : 0.8;
    v += (rand() - 0.5) * 8 + trend;
    v = Math.max(20, Math.min(h - 20, v));
    points.push(`${(i / 30) * w},${v}`);
  }
  const color = type === 'long' ? '#26a69a' : '#F7525F';
  const fillPoints = `0,${h} ${points.join(' ')} ${w},${h}`;
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <defs><linearGradient id="g${seed}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="${color}" stop-opacity="0.3"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    <polygon points="${fillPoints}" fill="url(#g${seed})"/>
    <polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2"/>
    <line x1="0" y1="${h*0.4}" x2="${w}" y2="${h*0.4}" stroke="#2962FF" stroke-dasharray="4 4" stroke-width="1" opacity="0.6"/>
    <line x1="0" y1="${h*0.7}" x2="${w}" y2="${h*0.7}" stroke="#a855f7" stroke-dasharray="4 4" stroke-width="1" opacity="0.5"/>
  </svg>`;
}

window.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordions();
  initToggleGroups();
  initSparklines();

  // chart canvas
  const chartCanvas = document.getElementById('chart-canvas');
  if (chartCanvas) {
    renderCandlestickChart(chartCanvas);
    window.addEventListener('resize', () => renderCandlestickChart(chartCanvas));
  }

  // idea card thumbnails
  document.querySelectorAll('[data-idea-chart]').forEach((el, i) => {
    const type = el.dataset.ideaChart;
    el.innerHTML = ideaChart(i * 17 + 3, type);
  });
});
