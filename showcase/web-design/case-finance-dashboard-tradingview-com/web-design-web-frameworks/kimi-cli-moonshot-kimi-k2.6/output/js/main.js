// ChartPulse — Main JavaScript

// Tab switching helper
function initTabs(containerSelector, tabSelector, panelSelector, callback) {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(container => {
    const tabs = container.querySelectorAll(tabSelector);
    const panels = container.querySelectorAll(panelSelector);
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        panels.forEach(p => {
          p.classList.toggle('hidden', p.dataset.panel !== target);
        });
        if (callback) callback(target);
      });
    });
  });
}

// Accordion helper
function initAccordions(selector) {
  document.querySelectorAll(selector).forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      const isOpen = body.style.display !== 'none' && body.style.display !== '';
      body.style.display = isOpen ? 'none' : 'block';
      if (icon) icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
}

// Mobile nav toggle
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
    });
  }
}

// Sparkline SVG generator
function generateSparkline(data, width, height, color) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  let path = `M0,${height - ((data[0] - min) / range) * height}`;
  for (let i = 1; i < data.length; i++) {
    const x = i * stepX;
    const y = height - ((data[i] - min) / range) * height;
    path += ` L${x},${y}`;
  }
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><path d="${path}" fill="none" stroke="${color}" stroke-width="1.5"/></svg>`;
}

// Render sparklines on page
function renderSparklines() {
  document.querySelectorAll('[data-sparkline]').forEach(el => {
    const data = JSON.parse(el.dataset.sparkline);
    const color = el.dataset.color || '#22c55e';
    el.innerHTML = generateSparkline(data, 80, 28, color);
  });
}

// Candlestick chart canvas renderer
function renderCandlestickChart(canvasId, data, timeframe) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = '#2a2a45';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = (h / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  if (!data || data.length === 0) return;

  const candleW = Math.max(2, (w / data.length) * 0.6);
  const gap = w / data.length;
  const allPrices = data.flatMap(d => [d.high, d.low]);
  const minP = Math.min(...allPrices);
  const maxP = Math.max(...allPrices);
  const range = maxP - minP || 1;
  const pad = 20;
  const chartH = h - pad * 2;

  const priceToY = p => pad + chartH - ((p - minP) / range) * chartH;

  data.forEach((c, i) => {
    const x = i * gap + gap / 2;
    const isGreen = c.close >= c.open;
    ctx.fillStyle = isGreen ? '#22c55e' : '#F7525F';
    ctx.strokeStyle = isGreen ? '#22c55e' : '#F7525F';

    // Wick
    ctx.beginPath();
    ctx.moveTo(x, priceToY(c.high));
    ctx.lineTo(x, priceToY(c.low));
    ctx.stroke();

    // Body
    const bodyTop = priceToY(Math.max(c.open, c.close));
    const bodyBottom = priceToY(Math.min(c.open, c.close));
    const bodyH = Math.max(1, bodyBottom - bodyTop);
    ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
  });

  // Price labels on right
  ctx.fillStyle = '#6b6b8a';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'left';
  for (let i = 0; i <= 4; i++) {
    const price = minP + (range * (1 - i / 4));
    ctx.fillText(price.toFixed(2), w - 50, (h / 4) * i + 10);
  }
}

// Generate sample candlestick data
function generateCandleData(count, basePrice, volatility) {
  const data = [];
  let price = basePrice;
  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (Math.random() - 0.48) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    data.push({ open, high, low, close });
    price = close;
  }
  return data;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  renderSparklines();

  // Chart page init
  const chartCanvas = document.getElementById('candlestickCanvas');
  if (chartCanvas) {
    let tf = '1D';
    let data = generateCandleData(60, 263, 4);
    const draw = () => renderCandlestickChart('candlestickCanvas', data, tf);
    draw();
    window.addEventListener('resize', draw);

    document.querySelectorAll('.tf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tf = btn.dataset.tf;
        const counts = { '1D': 60, '5D': 100, '1M': 80, '3M': 90, '6M': 120, 'YTD': 150, '1Y': 200, '5Y': 250, 'All': 300 };
        data = generateCandleData(counts[tf] || 60, 263, tf === '1D' ? 4 : tf === '5Y' ? 15 : 8);
        draw();
      });
    });
  }
});
