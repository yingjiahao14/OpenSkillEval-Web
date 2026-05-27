/* ============================================
   ChartPulse — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordions();
  initToggles();
  initNavActive();
});

/* ---- Tab Switching ---- */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const container = tabGroup.closest('.tab-container') || tabGroup.parentElement;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Deactivate siblings
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding content
        const targetId = btn.dataset.tab;
        if (targetId) {
          const contents = container.querySelectorAll('.tab-content');
          contents.forEach(c => c.classList.remove('active'));
          const target = container.querySelector(`#${targetId}`);
          if (target) target.classList.add('active');
        }
      });
    });
  });
}

/* ---- Accordion Toggle ---- */
function initAccordions() {
  document.querySelectorAll('.watchlist-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const group = header.closest('.watchlist-group');
      group.classList.toggle('collapsed');
    });
  });
}

/* ---- Filter Toggles (Videos only, etc.) ---- */
function initToggles() {
  document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      // Filter idea cards if on ideas page
      const ideasGrid = document.querySelector('.ideas-grid');
      if (ideasGrid) {
        const isVideoOnly = toggle.classList.contains('active') && toggle.dataset.filter === 'video';
        const cards = ideasGrid.querySelectorAll('.idea-card');
        cards.forEach(card => {
          if (isVideoOnly) {
            card.style.display = card.dataset.type === 'video' ? '' : 'none';
          } else {
            card.style.display = '';
          }
        });
      }
    });
  });

  // Broker category tabs
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.tabs');
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      const listings = document.querySelectorAll('.broker-card');
      listings.forEach(card => {
        if (category === 'all') {
          card.style.display = '';
        } else {
          card.style.display = card.dataset.category === category ? '' : 'none';
        }
      });
    });
  });

  // Broker rating tabs
  document.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.tabs');
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sortType = btn.dataset.sort;
      const grid = document.querySelector('.brokers-grid');
      if (!grid) return;

      const cards = Array.from(grid.querySelectorAll('.broker-card'));
      if (sortType === 'rated') {
        cards.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
      } else {
        cards.sort((a, b) => parseInt(a.dataset.order) - parseInt(b.dataset.order));
      }
      cards.forEach(card => grid.appendChild(card));
    });
  });

  // Market asset tabs (scroll to section)
  document.querySelectorAll('[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.tabs');
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sectionId = btn.dataset.section;
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Session tabs (Regular/Pre-market/After-hours)
  document.querySelectorAll('.session-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.session-tabs');
      parent.querySelectorAll('.session-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const session = btn.dataset.session;
      const container = parent.closest('.movers-card') || parent.parentElement;
      const rows = container.querySelectorAll('.movers-row');
      rows.forEach(row => {
        if (session === 'all') {
          row.style.display = '';
        } else {
          row.style.display = row.dataset.session === session ? '' : 'none';
        }
      });
    });
  });

  // Chart timeframe toggle
  document.querySelectorAll('.timeframe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.toolbar-group');
      parent.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Chart type toggle
  document.querySelectorAll('.chart-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.toolbar-group');
      parent.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Chart detail tabs (Annual/Quarterly)
  document.querySelectorAll('[data-detail-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.tabs');
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabId = btn.dataset.detailTab;
      const container = parent.closest('.tab-container') || parent.parentElement;
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const target = container.querySelector(`#${tabId}`);
      if (target) target.classList.add('active');
    });
  });

  // Markets chart controls
  document.querySelectorAll('.chart-ctrl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.chart-controls');
      if (!parent) return;
      // Only toggle within same group (timeframe vs chart-type)
      const group = btn.dataset.ctrlGroup;
      if (group) {
        parent.querySelectorAll(`.chart-ctrl-btn[data-ctrl-group="${group}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });
}

/* ---- Navigation Active State ---- */
function initNavActive() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---- Sparkline Data Generator ---- */
function generateSparkline(points, positive) {
  const values = [];
  let val = 50;
  for (let i = 0; i < points; i++) {
    val += (Math.random() - (positive ? 0.4 : 0.6)) * 8;
    val = Math.max(10, Math.min(90, val));
    values.push(val);
  }
  return values;
}

function sparklineSVG(values, width, height, positive) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);

  const points = values.map((v, i) =>
    `${i * step},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(' ');

  // Area fill path
  const areaPath = `M0,${height} ` +
    values.map((v, i) => `L${i * step},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ') +
    ` L${width},${height} Z`;

  const color = positive ? 'var(--brand-green)' : 'var(--brand-red)';
  const fillColor = positive ? 'oklch(65% 0.14 165 / 0.1)' : 'oklch(63% 0.22 15 / 0.1)';

  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
    <path d="${areaPath}" fill="${fillColor}"/>
    <polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/* ---- Candlestick Chart SVG ---- */
function generateCandlestickData(numCandles) {
  const candles = [];
  let price = 265;
  for (let i = 0; i < numCandles; i++) {
    const open = price + (Math.random() - 0.5) * 4;
    const close = open + (Math.random() - 0.48) * 6;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    candles.push({ open, close, high, low, positive: close >= open });
    price = close;
  }
  return candles;
}

function candlestickChartSVG(candles, width, height) {
  const allPrices = candles.flatMap(c => [c.high, c.low]);
  const min = Math.min(...allPrices);
  const max = Math.max(...allPrices);
  const range = max - min || 1;
  const padding = { top: 20, bottom: 30, left: 10, right: 10 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const candleWidth = chartW / candles.length;
  const bodyWidth = candleWidth * 0.6;

  const yScale = (p) => padding.top + chartH - ((p - min) / range) * chartH;

  let svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">`;

  // Grid lines
  const gridLines = 6;
  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (chartH / gridLines) * i;
    const price = max - (range / gridLines) * i;
    svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="oklch(25% 0.01 270)" stroke-width="0.5"/>`;
    svg += `<text x="${width - padding.right + 2}" y="${y + 4}" fill="oklch(50% 0.01 265)" font-size="9" font-family="Inter, sans-serif">${price.toFixed(2)}</text>`;
  }

  // Candles
  candles.forEach((c, i) => {
    const x = padding.left + i * candleWidth + candleWidth / 2;
    const color = c.positive ? 'var(--brand-green)' : 'var(--brand-red)';
    const fill = c.positive ? 'none' : color;

    // Wick
    svg += `<line x1="${x}" y1="${yScale(c.high)}" x2="${x}" y2="${yScale(c.low)}" stroke="${color}" stroke-width="1"/>`;

    // Body
    const bodyTop = yScale(Math.max(c.open, c.close));
    const bodyBottom = yScale(Math.min(c.open, c.close));
    const bodyH = Math.max(bodyBottom - bodyTop, 1);
    svg += `<rect x="${x - bodyWidth / 2}" y="${bodyTop}" width="${bodyWidth}" height="${bodyH}" fill="${fill}" stroke="${color}" stroke-width="1" rx="1"/>`;
  });

  // Volume bars (simplified)
  const volumeH = 30;
  candles.forEach((c, i) => {
    const x = padding.left + i * candleWidth;
    const vol = Math.random() * volumeH + 5;
    const color = c.positive ? 'oklch(65% 0.14 165 / 0.3)' : 'oklch(63% 0.22 15 / 0.3)';
    svg += `<rect x="${x + 2}" y="${height - vol}" width="${candleWidth - 4}" height="${vol}" fill="${color}" rx="1"/>`;
  });

  // X-axis labels
  const labels = ['9:30', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  labels.forEach((label, i) => {
    const x = padding.left + (chartW / (labels.length - 1)) * i;
    svg += `<text x="${x}" y="${height - 5}" fill="oklch(50% 0.01 265)" font-size="9" font-family="Inter, sans-serif" text-anchor="middle">${label}</text>`;
  });

  svg += `</svg>`;
  return svg;
}
