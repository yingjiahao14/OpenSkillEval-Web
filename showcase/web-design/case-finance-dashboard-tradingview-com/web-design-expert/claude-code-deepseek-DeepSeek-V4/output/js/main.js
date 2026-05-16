/* ============================================================
   ChartPulse — Shared JavaScript
   Tab switching, mobile menu, watchlist, chart rendering
   ============================================================ */

// --- Mobile Menu ---
(function() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });
  }
})();

// --- Active Nav ---
(function() {
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
})();

// --- Generic Tab System ---
function initTabs(container) {
  const tabs = container.querySelectorAll('.tab');
  const panels = container.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      panels.forEach(p => {
        p.classList.toggle('hidden', p.dataset.tab !== target);
      });
    });
  });

  // Activate first tab if none active
  if (!container.querySelector('.tab.active') && tabs.length) {
    tabs[0].click();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tabs').forEach(initTabs);
});

// --- Watchlist Accordion ---
function initWatchlist() {
  document.querySelectorAll('.watchlist-cat-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('open');
    });
  });
  // Open first category by default
  const firstCat = document.querySelector('.watchlist-category');
  if (firstCat) firstCat.classList.add('open');
}

// --- Timeframe Toggle ---
function initTimeframeToggle(container) {
  container.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (typeof onTimeframeChange === 'function') {
        onTimeframeChange(btn.dataset.tf);
      }
    });
  });
}

// --- Asset Class Tabs ---
function initAssetTabs(container) {
  container.querySelectorAll('.asset-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.asset-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const section = document.getElementById('section-' + tab.dataset.asset);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// --- Broker Filter ---
function initBrokerFilters(container) {
  const filterTabs = container.querySelectorAll('.broker-filter-tab');
  const brokerCards = container.querySelectorAll('.broker-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;
      brokerCards.forEach(card => {
        if (category === 'all' || card.dataset.categories.includes(category)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- Ideas Feed Toggle (videos only) ---
function initIdeasToggle() {
  const toggle = document.querySelector('.videos-toggle');
  if (toggle) {
    toggle.addEventListener('change', () => {
      document.querySelectorAll('.idea-card').forEach(card => {
        if (toggle.checked && !card.classList.contains('has-video')) {
          card.style.display = 'none';
        } else {
          card.style.display = '';
        }
      });
    });
  }
}

// --- Chart Canvas: Candlestick Renderer ---
function drawCandlestickChart(canvas, data, options = {}) {
  if (!canvas || !data || !data.length) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const pad = { top: 30, right: 60, bottom: 40, left: 60 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  // Compute price range
  let minPrice = Infinity, maxPrice = -Infinity;
  data.forEach(d => {
    minPrice = Math.min(minPrice, d.l);
    maxPrice = Math.max(maxPrice, d.h);
  });
  const padding = (maxPrice - minPrice) * 0.1 || 5;
  minPrice -= padding;
  maxPrice += padding;

  const priceToY = (p) => pad.top + plotH * (1 - (p - minPrice) / (maxPrice - minPrice));
  const candleWidth = Math.max(1, Math.min(plotW / data.length * 0.6, 12));

  // Clear
  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'oklch(22% 0.01 260)';
  ctx.lineWidth = 1;
  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + (plotH / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(W - pad.right, y);
    ctx.stroke();

    const price = maxPrice - ((maxPrice - minPrice) / gridLines) * i;
    ctx.fillStyle = 'oklch(50% 0.01 260)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(price.toFixed(2), pad.left - 8, y + 4);
  }

  // Draw candles
  data.forEach((d, i) => {
    const x = pad.left + (plotW / data.length) * i + (plotW / data.length) / 2;
    const isUp = d.c >= d.o;

    // Wick
    ctx.strokeStyle = isUp ? 'oklch(65% 0.17 145)' : 'oklch(55% 0.22 25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, priceToY(d.h));
    ctx.lineTo(x, priceToY(d.l));
    ctx.stroke();

    // Body
    const bodyTop = priceToY(isUp ? d.c : d.o);
    const bodyBot = priceToY(isUp ? d.o : d.c);
    const bodyH = Math.max(1, Math.abs(bodyBot - bodyTop));

    if (isUp) {
      ctx.fillStyle = 'oklch(65% 0.17 145)';
    } else {
      ctx.fillStyle = 'oklch(55% 0.22 25)';
    }
    ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyH);
  });

  // Time axis labels
  ctx.fillStyle = 'oklch(50% 0.01 260)';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  const labelCount = Math.min(6, data.length);
  const step = Math.floor(data.length / labelCount);
  for (let i = 0; i < data.length; i += step) {
    const x = pad.left + (plotW / data.length) * i + (plotW / data.length) / 2;
    if (data[i].label) {
      ctx.fillText(data[i].label, x, H - pad.bottom + 16);
    }
  }

  // Tooltip on mousemove
  canvas.onmousemove = function(e) {
    const mx = e.offsetX;
    const my = e.offsetY;
    let tooltip = document.querySelector('.chart-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'chart-tooltip';
      tooltip.style.cssText = `
        position:absolute;background:oklch(20% 0.01 260);border:1px solid oklch(28% 0.01 260);
        border-radius:6px;padding:8px 12px;font-family:'JetBrains Mono',monospace;font-size:12px;
        pointer-events:none;z-index:200;box-shadow:0 4px 12px rgba(0,0,0,0.5);
      `;
      canvas.parentElement.appendChild(tooltip);
    }

    const idx = Math.floor((mx - pad.left) / (plotW / data.length));
    if (idx >= 0 && idx < data.length) {
      const d = data[idx];
      const chg = d.c >= d.o ? '+' : '';
      const chgPct = ((d.c - d.o) / d.o * 100).toFixed(2);
      tooltip.innerHTML = `
        <div style="color:oklch(70% 0.01 260);margin-bottom:4px">${d.label || ''}</div>
        <div>O: ${d.o.toFixed(2)}</div>
        <div>H: ${d.h.toFixed(2)}</div>
        <div>L: ${d.l.toFixed(2)}</div>
        <div>C: ${d.c.toFixed(2)}</div>
        <div style="color:${d.c >= d.o ? 'var(--gain)' : 'var(--loss)'}">${chg}${chgPct}%</div>
      `;
      tooltip.style.display = 'block';
      tooltip.style.left = (e.offsetX + 16) + 'px';
      tooltip.style.top = (e.offsetY - 80) + 'px';
    } else {
      tooltip.style.display = 'none';
    }
  };

  canvas.onmouseleave = function() {
    const tooltip = document.querySelector('.chart-tooltip');
    if (tooltip) tooltip.style.display = 'none';
  };
}

// Generate sample candle data
function generateCandleData(count, basePrice, volatility) {
  const data = [];
  let price = basePrice;
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const open = price;
    const change = (Math.random() - 0.5) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      o: parseFloat(open.toFixed(2)),
      h: parseFloat(high.toFixed(2)),
      l: parseFloat(low.toFixed(2)),
      c: parseFloat(close.toFixed(2)),
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
    price = close;
  }
  return data;
}

// --- Mini Sparkline ---
function drawSparkline(container, values, isUp) {
  if (!container || !values.length) return;
  const color = isUp ? 'oklch(65% 0.17 145)' : 'oklch(55% 0.22 25)';
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = container.offsetWidth;
  const h = container.offsetHeight;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.style.display = 'block';

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h * 0.8) - h * 0.1;
    return `${x},${y}`;
  }).join(' ');

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', points);
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', color);
  polyline.setAttribute('stroke-width', '1.5');
  polyline.setAttribute('stroke-linejoin', 'round');
  polyline.setAttribute('stroke-linecap', 'round');

  svg.appendChild(polyline);
  container.innerHTML = '';
  container.appendChild(svg);
}

// --- Mini sparklines auto-init ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sparkline[data-values]').forEach(el => {
    try {
      const values = JSON.parse(el.dataset.values);
      const isUp = el.dataset.trend === 'up';
      drawSparkline(el, values, isUp);
    } catch(e) { /* ignore */ }
  });
});

// --- Initialize on DOM ready ---
document.addEventListener('DOMContentLoaded', () => {
  initWatchlist();

  const tfContainer = document.querySelector('.timeframe-toggle');
  if (tfContainer) initTimeframeToggle(tfContainer);

  const assetContainer = document.querySelector('.asset-tabs');
  if (assetContainer) initAssetTabs(assetContainer);

  const brokerContainer = document.querySelector('.broker-filters');
  if (brokerContainer) initBrokerFilters(brokerContainer);

  initIdeasToggle();

  // Init chart if canvas present
  const chartCanvas = document.querySelector('#candlestick-canvas');
  if (chartCanvas) {
    const data = generateCandleData(60, 263.40, 3);
    drawCandlestickChart(chartCanvas, data);
    window._chartData = data;
    window._chartBasePrice = 263.40;

    window.onTimeframeChange = function(tf) {
      const counts = { '1D': 24, '5D': 30, '1M': 40, '3M': 50, '6M': 60, 'YTD': 70, '1Y': 80, '5Y': 100, 'All': 120 };
      const vols = { '1D': 2, '5D': 3, '1M': 4, '3M': 5, '6M': 6, 'YTD': 7, '1Y': 8, '5Y': 10, 'All': 12 };
      const count = counts[tf] || 60;
      const vol = vols[tf] || 3;
      window._chartData = generateCandleData(count, window._chartBasePrice, vol);
      drawCandlestickChart(chartCanvas, window._chartData);
    };
  }
});
