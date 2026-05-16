/* ChartPulse - Global JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all tab-based interactions
  initTabs();
});

function initTabs() {
  // Find all tab containers and attach click handlers
  document.querySelectorAll('.tabs').forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll('.tab');
    const parent = tabContainer.closest('.card, .section');
    if (!parent) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active from all tabs in this container
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Find corresponding content and show it
        const targetId = tab.dataset.tab;
        if (targetId) {
          const contents = parent.querySelectorAll('.tab-content');
          contents.forEach(c => c.classList.remove('active'));
          const target = parent.querySelector(`#${targetId}`);
          if (target) target.classList.add('active');
        }
      });
    });
  });
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Generate sparkline SVG (simple line chart)
function generateSparkline(points, color = '#22C55E') {
  if (!points || points.length < 2) return '';

  const width = 60;
  const height = 20;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const pathPoints = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  });

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <polyline fill="none" stroke="${color}" stroke-width="1.5" points="${pathPoints.join(' ')}"/>
  </svg>`;
}

// Watchlist accordion toggle
function initWatchlistAccordion() {
  document.querySelectorAll('.watchlist-category-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isCollapsed = header.classList.contains('collapsed');

      if (isCollapsed) {
        header.classList.remove('collapsed');
        content.style.display = 'block';
      } else {
        header.classList.add('collapsed');
        content.style.display = 'none';
      }
    });
  });
}

// Chart timeframe toggle
function initChartTimeframeToggle() {
  document.querySelectorAll('.timeframe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.timeframe-selector');
      container.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Trigger chart update event
      window.dispatchEvent(new CustomEvent('chartTimeframeChange', { detail: { timeframe: btn.dataset.timeframe }}));
    });
  });
}

// Simulate candlestick chart rendering
function renderCandlestickChart(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const width = container.clientWidth || 800;
  const height = container.clientHeight || 400;

  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

  // Draw grid lines
  for (let i = 0; i < 5; i++) {
    const y = (i / 4) * height;
    svg += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#2a2a3e" stroke-width="1"/>`;
  }

  // Draw candlesticks
  const candleWidth = Math.max(2, (width / data.length) * 0.7);
  const gap = (width / data.length) * 0.3;

  data.forEach((candle, i) => {
    const x = i * (candleWidth + gap) + gap / 2;
    const isGreen = candle.close >= candle.open;
    const color = isGreen ? '#22C55E' : '#F7525F';

    // Wick
    const wickX = x + candleWidth / 2;
    svg += `<line x1="${wickX}" y1="${candle.high * height / 100}" x2="${wickX}" y2="${candle.low * height / 100}" stroke="${color}" stroke-width="1"/>`;

    // Body
    const bodyTop = candle.open * height / 100;
    const bodyBottom = candle.close * height / 100;
    const bodyHeight = Math.max(1, Math.abs(bodyTop - bodyBottom));
    svg += `<rect x="${x}" y="${Math.min(bodyTop, bodyBottom)}" width="${candleWidth}" height="${bodyHeight}" fill="${color}"/>`;
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

// Generate sample candlestick data
function generateCandlestickData(days = 90) {
  const data = [];
  let price = 50;

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.48) * 5;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;

    data.push({ open, high, low, close });
    price = close;
  }

  return data;
}

// Initialize candlestick chart when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const chartContainer = document.getElementById('candlestick-chart');
  if (chartContainer) {
    const data = generateCandlestickData();
    renderCandlestickChart('candlestick-chart', data);
  }

  initWatchlistAccordion();
  initChartTimeframeToggle();
});

// Export for use in other pages
window.ChartPulse = {
  formatNumber,
  generateSparkline,
  initTabs,
  renderCandlestickChart,
  generateCandlestickData
};
