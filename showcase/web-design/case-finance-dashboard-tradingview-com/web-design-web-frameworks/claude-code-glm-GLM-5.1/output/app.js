/* ChartPulse — Shared JavaScript */

// ===== TAB SWITCHING =====
function initTabs(container) {
  const tabBtns = container.querySelectorAll('.tab-btn');
  const tabPanels = container.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      const panel = container.querySelector(`.tab-panel[data-tab="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ===== SIMPLE TABS (underline style) =====
function initSimpleTabs(container) {
  const tabBtns = container.querySelectorAll('.tab-btn');
  const tabPanels = container.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      const panel = container.querySelector(`.tab-panel[data-tab="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ===== ACCORDION =====
function initAccordion(container) {
  const headers = container.querySelectorAll('.watchlist-category-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      const items = header.nextElementSibling;
      items.classList.toggle('collapsed');
    });
  });
}

// ===== FILTER CHIPS =====
function initFilterChips(container) {
  const chips = container.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      const items = container.querySelectorAll('[data-category]');
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ===== TOGGLE FILTER =====
function initToggleFilter(toggleEl) {
  toggleEl.addEventListener('click', () => {
    toggleEl.classList.toggle('active');
    const target = toggleEl.dataset.toggle;
    const items = document.querySelectorAll(`[data-${target}]`);
    const isActive = toggleEl.classList.contains('active');
    items.forEach(item => {
      if (!isActive || item.dataset[target] === 'true') {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// ===== SPARKLINE DRAWING =====
function drawSparkline(canvas, data, color) {
  if (!canvas || !data || data.length === 0) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * (h * 0.8) - h * 0.1;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // gradient fill
  const lastX = (data.length - 1) * step;
  ctx.lineTo(lastX, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + '30');
  grad.addColorStop(1, color + '05');
  ctx.fillStyle = grad;
  ctx.fill();
}

// ===== CANDLESTICK CHART =====
function drawCandlestickChart(canvas, data) {
  if (!canvas || !data || data.length === 0) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const parent = canvas.parentElement;
  const w = parent.clientWidth;
  const h = parent.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);

  const padding = { top: 20, right: 70, bottom: 30, left: 10 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;
  const volumeH = chartH * 0.15;

  // Find price range
  const prices = data.flatMap(d => [d.high, d.low]);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const pRange = maxP - minP || 1;
  const volMax = Math.max(...data.map(d => d.volume));

  const candleW = Math.max(2, (chartW / data.length) * 0.6);
  const gap = chartW / data.length;

  // Grid lines
  ctx.strokeStyle = '#2a2e39';
  ctx.lineWidth = 0.5;
  const gridLines = 6;
  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (chartH / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();
    // Price label
    const price = maxP - (pRange / gridLines) * i;
    ctx.fillStyle = '#787b86';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(price.toFixed(2), w - padding.right + 8, y + 4);
  }

  // Candles
  data.forEach((d, i) => {
    const x = padding.left + i * gap + gap / 2;
    const isUp = d.close >= d.open;
    const color = isUp ? '#26a69a' : '#ef5350';
    const bodyTop = padding.top + ((maxP - Math.max(d.open, d.close)) / pRange) * chartH;
    const bodyBot = padding.top + ((maxP - Math.min(d.open, d.close)) / pRange) * chartH;
    const wickTop = padding.top + ((maxP - d.high) / pRange) * chartH;
    const wickBot = padding.top + ((maxP - d.low) / pRange) * chartH;

    // Wick
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, wickTop);
    ctx.lineTo(x, wickBot);
    ctx.stroke();

    // Body
    const bodyH = Math.max(1, bodyBot - bodyTop);
    ctx.fillStyle = color;
    if (isUp) {
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
    } else {
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
    }

    // Volume bar
    const volH = (d.volume / volMax) * volumeH;
    ctx.fillStyle = isUp ? 'rgba(38,166,154,0.3)' : 'rgba(239,83,80,0.3)';
    ctx.fillRect(x - candleW / 2, padding.top + chartH - volH, candleW, volH);
  });

  // Time axis
  ctx.fillStyle = '#787b86';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'center';
  const labelInterval = Math.ceil(data.length / 8);
  data.forEach((d, i) => {
    if (i % labelInterval === 0) {
      const x = padding.left + i * gap + gap / 2;
      ctx.fillText(d.label || '', x, h - 8);
    }
  });

  // Current price line
  const lastCandle = data[data.length - 1];
  const lastY = padding.top + ((maxP - lastCandle.close) / pRange) * chartH;
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = '#2962FF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding.left, lastY);
  ctx.lineTo(w - padding.right, lastY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Price tag
  ctx.fillStyle = '#2962FF';
  ctx.fillRect(w - padding.right, lastY - 10, 68, 20);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 10px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(lastCandle.close.toFixed(2), w - padding.right + 4, lastY + 4);
}

// ===== GENERATE CANDLESTICK DATA =====
function generateCandleData(count, basePrice, timeframe) {
  const data = [];
  let price = basePrice;
  const labels = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.48) * price * 0.02;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * price * 0.01;
    const low = Math.min(open, close) - Math.random() * price * 0.01;
    const volume = 1000000 + Math.random() * 5000000;

    let label = '';
    const d = new Date(now);
    if (timeframe === '1D') {
      d.setMinutes(d.getMinutes() - (count - i) * 5);
      label = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
    } else if (timeframe === '5D') {
      d.setHours(d.getHours() - (count - i) * 2);
      label = d.getHours() + ':00';
    } else if (timeframe === '1M') {
      d.setDate(d.getDate() - (count - i));
      label = (d.getMonth() + 1) + '/' + d.getDate();
    } else {
      d.setDate(d.getDate() - (count - i) * 3);
      label = (d.getMonth() + 1) + '/' + d.getDate();
    }

    data.push({ open, high, low, close, volume, label });
    price = close;
  }
  return data;
}

// ===== GENERATE SPARKLINE DATA =====
function generateSparkData(points, trend) {
  const data = [];
  let v = 50 + Math.random() * 30;
  for (let i = 0; i < points; i++) {
    v += (Math.random() - 0.5 + trend * 0.1) * 3;
    v = Math.max(10, Math.min(90, v));
    data.push(v);
  }
  return data;
}

// ===== NAVIGATION ACTIVE STATE =====
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===== MINI CHART FOR MARKETS PAGE =====
function drawMiniChart(canvas, trend) {
  if (!canvas) return;
  const data = generateSparkData(30, trend);
  const color = trend >= 0 ? '#26a69a' : '#ef5350';
  drawSparkline(canvas, data, color);
}

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();

  // Init all tab containers
  document.querySelectorAll('.tabs, .tabs-simple').forEach(initTabs);

  // Init accordions
  document.querySelectorAll('.watchlist-sidebar').forEach(initAccordion);

  // Init filter chips
  document.querySelectorAll('.filter-bar').forEach(initFilterChips);

  // Init toggle filters
  document.querySelectorAll('.toggle-filter').forEach(initToggleFilter);

  // Draw all sparklines
  document.querySelectorAll('canvas[data-sparkline]').forEach(canvas => {
    const trend = parseFloat(canvas.dataset.trend || 0);
    const data = generateSparkData(20, trend);
    const color = trend >= 0 ? '#26a69a' : '#ef5350';
    drawSparkline(canvas, data, color);
  });

  // Draw all mini charts
  document.querySelectorAll('canvas[data-mini-chart]').forEach(canvas => {
    const trend = parseFloat(canvas.dataset.trend || 0);
    drawMiniChart(canvas, trend);
  });
});

// ===== CHART PAGE SPECIFIC =====
function initChartPage() {
  const canvas = document.getElementById('mainChart');
  if (!canvas) return;

  let currentTF = '1M';
  const tfCounts = { '1D': 78, '5D': 80, '1M': 30, '3M': 65, '6M': 60, 'YTD': 55, '1Y': 52, '5Y': 60, 'All': 72 };
  let chartData = generateCandleData(tfCounts[currentTF], 263.40, currentTF);

  function render() {
    drawCandlestickChart(canvas, chartData);
  }

  render();
  window.addEventListener('resize', render);

  // Timeframe buttons
  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTF = btn.dataset.tf;
      chartData = generateCandleData(tfCounts[currentTF] || 60, 263.40, currentTF);
      render();
    });
  });

  // Watchlist item click
  document.querySelectorAll('.watchlist-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.watchlist-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const symbol = item.querySelector('.symbol').textContent;
      const price = parseFloat(item.querySelector('.last').textContent.replace(/,/g, ''));
      document.querySelector('.ticker-symbol').textContent = symbol;
      document.querySelector('.ticker-price').textContent = price.toFixed(2);
      chartData = generateCandleData(tfCounts[currentTF] || 60, price, currentTF);
      render();
    });
  });

  // Detail panel tabs
  document.querySelectorAll('.detail-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.detail-tabs');
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      const panel = document.querySelector(`.detail-tab-panel[data-tab="${target}"]`);
      document.querySelectorAll('.detail-tab-panel').forEach(p => p.classList.remove('active'));
      if (panel) panel.classList.add('active');
    });
  });
}

// ===== IDEAS PAGE SPARKLINES =====
function initIdeasPage() {
  document.querySelectorAll('.idea-chart-placeholder canvas').forEach(canvas => {
    const trend = parseFloat(canvas.dataset.trend || 0);
    const data = generateSparkData(40, trend);
    const color = trend >= 0 ? '#26a69a' : '#ef5350';
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
    drawSparkline(canvas, data, color);
  });
}
