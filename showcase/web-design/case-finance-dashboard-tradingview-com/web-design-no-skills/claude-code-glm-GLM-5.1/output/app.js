/* ChartPulse — Application JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordions();
  initChartPage();
  initMarketsPage();
  initIdeasPage();
  initBrokersPage();
  initNavActive();
});

/* ─── Navigation Active State ─── */
function initNavActive() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ─── Tabs ─── */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.tab, .markets-tab, .detail-tab');
    const targetId = tabGroup.dataset.tabs;
    const container = document.getElementById(targetId);
    if (!container) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.dataset.tab;
        container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const target = container.querySelector(`[data-tab-content="${key}"]`);
        if (target) target.classList.add('active');
      });
    });
  });

  // Standalone tab groups with inline behavior
  document.querySelectorAll('.tabs, .tabs--pills').forEach(group => {
    if (group.dataset.tabs) return; // already handled
    const tabs = group.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
}

/* ─── Accordion ─── */
function initAccordions() {
  document.querySelectorAll('[data-accordion]').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      if (!body) return;
      header.classList.toggle('collapsed');
      body.classList.toggle('collapsed');
    });
  });
}

/* ─── Chart Page ─── */
function initChartPage() {
  const canvas = document.getElementById('candlestick-canvas');
  if (!canvas) return;

  drawCandlestickChart(canvas, '1D');

  // Redraw chart on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const activeTf = document.querySelector('.tf-btn.active');
      drawCandlestickChart(canvas, activeTf ? activeTf.dataset.tf : '1D');
    }, 150);
  });

  // Timeframe buttons
  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      drawCandlestickChart(canvas, btn.dataset.tf);
    });
  });

  // Watchlist accordion
  document.querySelectorAll('.watchlist__category-header').forEach(header => {
    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      const items = header.nextElementSibling;
      if (items) items.classList.toggle('collapsed');
    });
  });

  // Watchlist item click
  document.querySelectorAll('.watchlist__item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.watchlist__item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Detail panel tabs
  document.querySelectorAll('.detail-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const panel = tab.closest('.detail-panel');
      if (!panel) return;
      panel.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const target = panel.querySelector(`[data-tab-content="${tab.dataset.tab}"]`);
      if (target) target.classList.add('active');
    });
  });

  // Toolbar buttons
  document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });
}

function drawCandlestickChart(canvas, timeframe) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const padding = { top: 60, right: 60, bottom: 40, left: 10 };

  // Generate candle data based on timeframe
  const data = generateCandleData(timeframe);
  const chartW = W - padding.left - padding.right;
  const chartH = H - padding.top - padding.bottom;

  const minP = Math.min(...data.map(d => d.low));
  const maxP = Math.max(...data.map(d => d.high));
  const range = maxP - minP || 1;
  const candleW = Math.max(2, (chartW / data.length) - 2);
  const gap = chartW / data.length;

  // Clear
  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = '#1e222d';
  ctx.lineWidth = 1;
  const gridLines = 6;
  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (chartH / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(W - padding.right, y);
    ctx.stroke();

    // Price labels
    const price = maxP - (range / gridLines) * i;
    ctx.fillStyle = '#555862';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(price.toFixed(2), W - padding.right + 6, y + 3);
  }

  // Volume bars
  const maxVol = Math.max(...data.map(d => d.volume));
  data.forEach((d, i) => {
    const x = padding.left + gap * i + gap / 2;
    const volH = (d.volume / maxVol) * 40;
    ctx.fillStyle = d.close >= d.open ? 'rgba(38,166,154,0.15)' : 'rgba(247,82,95,0.15)';
    ctx.fillRect(x - candleW / 2, H - padding.bottom - volH, candleW, volH);
  });

  // Candles
  data.forEach((d, i) => {
    const x = padding.left + gap * i + gap / 2;
    const isGreen = d.close >= d.open;
    const color = isGreen ? '#26a69a' : '#F7525F';

    // Wick
    const highY = padding.top + ((maxP - d.high) / range) * chartH;
    const lowY = padding.top + ((maxP - d.low) / range) * chartH;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, highY);
    ctx.lineTo(x, lowY);
    ctx.stroke();

    // Body
    const openY = padding.top + ((maxP - d.open) / range) * chartH;
    const closeY = padding.top + ((maxP - d.close) / range) * chartH;
    const bodyTop = Math.min(openY, closeY);
    const bodyH = Math.max(1, Math.abs(closeY - openY));

    if (isGreen) {
      ctx.fillStyle = color;
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
    }
  });

  // Moving averages
  drawMA(ctx, data, 20, '#2962FF', padding, chartH, range, maxP);
  drawMA(ctx, data, 50, '#ff9800', padding, chartH, range, maxP);
}

function drawMA(ctx, data, period, color, padding, chartH, range, maxP) {
  if (data.length < period) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  const gap = (ctx.canvas.width / (window.devicePixelRatio || 1) - padding.left - padding.right) / data.length;
  let started = false;
  for (let i = period - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) sum += data[j].close;
    const avg = sum / period;
    const x = padding.left + gap * i + gap / 2;
    const y = padding.top + ((maxP - avg) / range) * chartH;
    if (!started) { ctx.moveTo(x, y); started = true; }
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function generateCandleData(timeframe) {
  const seed = timeframe.charCodeAt(0) * 137;
  const rand = (i) => {
    const x = Math.sin(seed + i * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };

  let count, basePrice;
  switch (timeframe) {
    case '1D': count = 78; basePrice = 263; break;
    case '5D': count = 60; basePrice = 260; break;
    case '1M': count = 44; basePrice = 255; break;
    case '3M': count = 65; basePrice = 240; break;
    case '6M': count = 52; basePrice = 220; break;
    case 'YTD': count = 70; basePrice = 230; break;
    case '1Y': count = 80; basePrice = 200; break;
    case '5Y': count = 60; basePrice = 120; break;
    case 'All': count = 50; basePrice = 80; break;
    default: count = 78; basePrice = 263;
  }

  const data = [];
  let price = basePrice;
  for (let i = 0; i < count; i++) {
    const change = (rand(i) - 0.48) * 4;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + rand(i + 100) * 2;
    const low = Math.min(open, close) - rand(i + 200) * 2;
    const volume = 2000000 + rand(i + 300) * 8000000;
    data.push({ open, close, high, low, volume });
    price = close;
  }
  // Ensure last price is near 263.40
  const lastDiff = 263.40 - data[data.length - 1].close;
  data[data.length - 1].close += lastDiff;
  data[data.length - 1].high = Math.max(data[data.length - 1].high, data[data.length - 1].close);
  return data;
}

/* ─── Markets Page ─── */
function initMarketsPage() {
  // Market tab scrolling
  document.querySelectorAll('.markets-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.markets-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const section = document.getElementById(tab.dataset.section);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Chart type toggle
  document.querySelectorAll('.chart-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const group = opt.closest('.market-section__controls');
      if (group) {
        group.querySelectorAll('.chart-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
      }
    });
  });

  // Stock movers session tabs
  document.querySelectorAll('[data-mover-tabs]').forEach(group => {
    const tabs = group.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.dataset.tab;
        const container = group.closest('.mover-card') || group.parentElement;
        container.querySelectorAll('.mover-list').forEach(l => l.classList.remove('active'));
        const target = container.querySelector(`[data-movers="${key}"]`);
        if (target) target.classList.add('active');
      });
    });
  });

  // Draw mini sparklines
  document.querySelectorAll('.mini-chart').forEach(canvas => {
    drawSparkline(canvas);
  });
}

function drawSparkline(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const points = [];
  let val = 50 + Math.random() * 30;
  const isUp = Math.random() > 0.4;
  for (let i = 0; i < 20; i++) {
    val += (Math.random() - (isUp ? 0.4 : 0.6)) * 5;
    points.push(val);
  }
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const color = isUp ? '#26a69a' : '#F7525F';

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = (i / (points.length - 1)) * W;
    const y = H - ((p - min) / range) * (H - 4) - 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Fill
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, isUp ? 'rgba(38,166,154,0.15)' : 'rgba(247,82,95,0.15)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fill();
}

/* ─── Ideas Page ─── */
function initIdeasPage() {
  // Video toggle
  document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      if (toggle.dataset.filter === 'video') {
        document.querySelectorAll('.idea-card').forEach(card => {
          if (toggle.classList.contains('active')) {
            if (!card.dataset.video) card.style.display = 'none';
          } else {
            card.style.display = '';
          }
        });
      }
    });
  });

  // Draw idea chart placeholders
  document.querySelectorAll('.idea-card__chart').forEach(canvas => {
    drawIdeaChart(canvas);
  });
}

function drawIdeaChart(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;

  // Background
  ctx.fillStyle = '#131722';
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = '#1e222d';
  for (let i = 0; i < 5; i++) {
    const y = (H / 5) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Random line chart
  const points = [];
  let val = H * 0.5 + Math.random() * H * 0.2;
  const isUp = Math.random() > 0.35;
  for (let i = 0; i < 40; i++) {
    val += (Math.random() - (isUp ? 0.42 : 0.58)) * 6;
    val = Math.max(20, Math.min(H - 20, val));
    points.push(val);
  }

  ctx.strokeStyle = isUp ? '#26a69a' : '#F7525F';
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = (i / (points.length - 1)) * W;
    if (i === 0) ctx.moveTo(x, p);
    else ctx.lineTo(x, p);
  });
  ctx.stroke();

  // Area fill
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, isUp ? 'rgba(38,166,154,0.2)' : 'rgba(247,82,95,0.2)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fill();

  // Annotations
  const annotX = W * (0.3 + Math.random() * 0.4);
  const annotY = points[Math.floor(points.length * 0.6)];
  ctx.fillStyle = '#2962FF';
  ctx.beginPath();
  ctx.arc(annotX, annotY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(41,98,255,0.3)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(annotX, annotY);
  ctx.lineTo(annotX, H);
  ctx.stroke();
  ctx.setLineDash([]);
}

/* ─── Brokers Page ─── */
function initBrokersPage() {
  // Category filter tabs
  document.querySelectorAll('[data-broker-category]').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.tabs');
      if (group) group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.brokerCategory;
      document.querySelectorAll('.broker-card').forEach(card => {
        if (cat === 'all') card.style.display = '';
        else {
          const categories = (card.dataset.categories || '').split(',');
          card.style.display = categories.includes(cat) ? '' : 'none';
        }
      });
    });
  });

  // Rating tabs
  document.querySelectorAll('[data-broker-rating]').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.tabs');
      if (group) group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const rating = tab.dataset.brokerRating;
      const list = document.querySelector('.broker-listings');
      if (!list) return;
      const cards = Array.from(list.querySelectorAll('.broker-card'));

      if (rating === 'best') {
        cards.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
      } else {
        cards.sort((a, b) => parseInt(a.dataset.order) - parseInt(b.dataset.order));
      }
      cards.forEach(card => list.appendChild(card));
    });
  });
}

/* ─── Home Page Sparklines ─── */
function initHomeSparklines() {
  document.querySelectorAll('.stock-row__sparkline').forEach(canvas => {
    drawSparkline(canvas);
  });
}

// Run home sparklines if on home page
if (document.querySelector('.stock-row__sparkline')) {
  window.addEventListener('load', initHomeSparklines);
}
