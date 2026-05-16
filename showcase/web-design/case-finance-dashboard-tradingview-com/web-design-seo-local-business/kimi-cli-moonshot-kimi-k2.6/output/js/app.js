// ChartPulse App Logic

// Tab switching utility
function initTabs(containerSelector, contentSelector, callback) {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(container => {
    const buttons = container.querySelectorAll('[data-tab]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        // Update buttons
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Update content
        if (contentSelector) {
          const contents = document.querySelectorAll(contentSelector);
          contents.forEach(c => {
            if (c.dataset.tabContent === tab) {
              c.style.display = '';
            } else {
              c.style.display = 'none';
            }
          });
        }
        if (callback) callback(tab);
      });
    });
  });
}

// Accordion utility
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isCollapsed = header.classList.contains('collapsed');
      if (isCollapsed) {
        header.classList.remove('collapsed');
        body.classList.remove('collapsed');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        header.classList.add('collapsed');
        body.classList.add('collapsed');
        body.style.maxHeight = '0';
      }
    });
  });
}

// Mobile menu
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.position = 'absolute';
      nav.style.top = '56px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = 'var(--bg-secondary)';
      nav.style.flexDirection = 'column';
      nav.style.padding = '1rem';
      nav.style.borderBottom = '1px solid var(--border-color)';
    });
  }
}

// Draw sparkline on canvas
function drawSparkline(canvas, data, color) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;

  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - pad - ((val - min) / range) * (h - pad * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Fill gradient
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + '20');
  grad.addColorStop(1, color + '00');
  ctx.fillStyle = grad;
  ctx.fill();
}

// Draw candlestick chart
function drawCandlestickChart(canvas, candles) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const padding = { top: 20, right: 60, bottom: 30, left: 10 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  const highs = candles.map(c => c.high);
  const lows = candles.map(c => c.low);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const range = max - min || 1;

  ctx.clearRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = '#2a2a45';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();

    const price = max - (i / 4) * range;
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(price.toFixed(2), w - padding.right + 6, y + 3);
  }

  // Candles
  const candleW = Math.max(2, (chartW / candles.length) * 0.7);
  const gap = chartW / candles.length;

  candles.forEach((c, i) => {
    const x = padding.left + i * gap + gap / 2;
    const yO = padding.top + ((max - c.open) / range) * chartH;
    const yC = padding.top + ((max - c.close) / range) * chartH;
    const yH = padding.top + ((max - c.high) / range) * chartH;
    const yL = padding.top + ((max - c.low) / range) * chartH;

    const isGreen = c.close >= c.open;
    ctx.fillStyle = isGreen ? '#22c55e' : '#F7525F';
    ctx.strokeStyle = isGreen ? '#22c55e' : '#F7525F';

    // Wick
    ctx.beginPath();
    ctx.moveTo(x, yH);
    ctx.lineTo(x, yL);
    ctx.stroke();

    // Body
    const bodyTop = Math.min(yO, yC);
    const bodyH = Math.max(1, Math.abs(yC - yO));
    ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
  });
}

// Generate random candlestick data
function generateCandles(count, basePrice, volatility) {
  const candles = [];
  let price = basePrice;
  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (Math.random() - 0.5) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    candles.push({ open, high, low, close });
    price = close;
  }
  return candles;
}

// Generate sparkline data
function generateSparkline(count, start, volatility) {
  const data = [start];
  for (let i = 1; i < count; i++) {
    data.push(data[i - 1] + (Math.random() - 0.5) * volatility);
  }
  return data;
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initMobileMenu();

  // Init sparklines
  document.querySelectorAll('canvas[data-sparkline]').forEach(canvas => {
    const count = parseInt(canvas.dataset.sparkline) || 30;
    const start = parseFloat(canvas.dataset.start) || 100;
    const vol = parseFloat(canvas.dataset.vol) || 5;
    const color = canvas.dataset.color || '#22c55e';
    const data = generateSparkline(count, start, vol);
    drawSparkline(canvas, data, color);
  });

  // Init candlestick charts
  document.querySelectorAll('canvas[data-candles]').forEach(canvas => {
    const count = parseInt(canvas.dataset.candles) || 60;
    const base = parseFloat(canvas.dataset.base) || 263;
    const vol = parseFloat(canvas.dataset.vol) || 3;
    const candles = generateCandles(count, base, vol);
    drawCandlestickChart(canvas, candles);
  });

  // Init home market tabs
  initTabs('.market-tabs', '.market-tab-content');

  // Init ideas tabs
  initTabs('.ideas-tabs', '.ideas-tab-content');

  // Init indicators tabs
  initTabs('.indicators-tabs', '.indicators-tab-content');

  // Init brokers tabs
  initTabs('.brokers-tabs', '.brokers-tab-content');

  // Init chart timeframe toggles
  document.querySelectorAll('.timeframe-toggle [data-timeframe]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.timeframe-toggle');
      parent.querySelectorAll('[data-timeframe]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Regenerate candles with different volatility
      const canvas = document.querySelector('canvas[data-candles]');
      if (canvas) {
        const tf = btn.dataset.timeframe;
        let count = 60, vol = 3;
        if (tf === '1D') { count = 24; vol = 1; }
        else if (tf === '5D') { count = 50; vol = 2; }
        else if (tf === '1M') { count = 30; vol = 3; }
        else if (tf === '3M') { count = 60; vol = 4; }
        else if (tf === '6M') { count = 90; vol = 5; }
        else if (tf === '1Y') { count = 120; vol = 6; }
        else if (tf === '5Y') { count = 100; vol = 8; }
        else if (tf === 'All') { count = 150; vol = 10; }
        const base = parseFloat(canvas.dataset.base) || 263;
        const candles = generateCandles(count, base, vol);
        drawCandlestickChart(canvas, candles);
      }
    });
  });

  // Init markets asset tabs (scroll to section)
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Init markets session tabs
  initTabs('.session-tabs', '.session-tab-content');

  // Init video toggle on ideas page
  const videoToggle = document.getElementById('video-toggle');
  if (videoToggle) {
    videoToggle.addEventListener('change', (e) => {
      document.querySelectorAll('.idea-card').forEach(card => {
        if (e.target.checked && !card.dataset.video) {
          card.style.display = 'none';
        } else {
          card.style.display = '';
        }
      });
    });
  }

  // Init brokers rating tabs
  initTabs('.rating-tabs', '.rating-tab-content', (tab) => {
    const grid = document.querySelector('.brokers-grid');
    if (grid) {
      const cards = Array.from(grid.querySelectorAll('.broker-card'));
      cards.sort((a, b) => {
        if (tab === 'best') {
          const ra = parseFloat(a.dataset.rating || 0);
          const rb = parseFloat(b.dataset.rating || 0);
          return rb - ra;
        }
        return 0;
      });
      cards.forEach(c => grid.appendChild(c));
    }
  });
});

// Handle window resize for canvas redraw
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    document.querySelectorAll('canvas[data-sparkline]').forEach(canvas => {
      const count = parseInt(canvas.dataset.sparkline) || 30;
      const start = parseFloat(canvas.dataset.start) || 100;
      const vol = parseFloat(canvas.dataset.vol) || 5;
      const color = canvas.dataset.color || '#22c55e';
      const data = generateSparkline(count, start, vol);
      drawSparkline(canvas, data, color);
    });
    document.querySelectorAll('canvas[data-candles]').forEach(canvas => {
      const count = parseInt(canvas.dataset.candles) || 60;
      const base = parseFloat(canvas.dataset.base) || 263;
      const vol = parseFloat(canvas.dataset.vol) || 3;
      const candles = generateCandles(count, base, vol);
      drawCandlestickChart(canvas, candles);
    });
  }, 200);
});
