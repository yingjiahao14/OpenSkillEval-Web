/* ChartPulse — Shared JavaScript */
document.addEventListener('DOMContentLoaded', () => {

  // ── Tab Switching ──
  document.querySelectorAll('.tabs, .detail-tabs, .market-nav, .chart-timeframe, .chart-options, .broker-filters').forEach(tabGroup => {
    tabGroup.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn, .detail-tab, .market-nav-btn, .tf-btn, .broker-cat-btn');
      if (!btn) return;
      const siblings = btn.parentElement.children;
      for (const s of siblings) s.classList.remove('active');
      btn.classList.add('active');

      // If tabs control content panels
      const tabId = btn.dataset.tab;
      if (tabId) {
        // Collect all tab IDs in this group to scope deactivation
        const allTabIds = [...btn.parentElement.children]
          .map(b => b.dataset.tab)
          .filter(Boolean);
        const container = btn.closest('.section, .detail-panel, .market-content, .broker-listings-wrap') || document;
        container.querySelectorAll('.tab-content').forEach(tc => {
          if (allTabIds.includes(tc.dataset.tabContent)) {
            tc.classList.remove('active');
          }
        });
        const target = container.querySelector(`[data-tab-content="${tabId}"]`);
        if (target) target.classList.add('active');
      }
    });
  });

  // ── Accordion (Watchlist) ──
  document.querySelectorAll('.watchlist-category-header').forEach(header => {
    header.addEventListener('click', () => {
      const cat = header.closest('.watchlist-category');
      cat.classList.toggle('open');
    });
  });

  // ── Filter Toggles ──
  document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
    });
  });

  // ── Watchlist Item Click ──
  document.querySelectorAll('.watchlist-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.watchlist-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ── Draw Candlestick Chart ──
  const chartCanvas = document.getElementById('candlestickCanvas');
  if (chartCanvas) {
    drawCandlestickChart(chartCanvas);
    window.addEventListener('resize', () => drawCandlestickChart(chartCanvas));
  }

  // ── Draw Sparklines ──
  document.querySelectorAll('.sparkline-canvas').forEach(canvas => {
    drawSparkline(canvas);
  });

  // ── Draw mini charts on markets page ──
  document.querySelectorAll('.mini-chart-canvas').forEach(canvas => {
    drawMiniChart(canvas);
  });
});

function drawCandlestickChart(canvas) {
  const ctx = canvas.getContext('2d');
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);
  const W = rect.width;
  const H = rect.height;

  // Generate realistic-looking candle data
  const numCandles = 60;
  const data = [];
  let price = 260;
  for (let i = 0; i < numCandles; i++) {
    const open = price + (Math.random() - 0.48) * 4;
    const close = open + (Math.random() - 0.48) * 6;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    data.push({ open, close, high, low });
    price = close;
  }

  const allPrices = data.flatMap(d => [d.high, d.low]);
  const minP = Math.min(...allPrices) - 2;
  const maxP = Math.max(...allPrices) + 2;
  const range = maxP - minP;

  const pad = { top: 20, right: 60, bottom: 30, left: 10 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const candleW = chartW / numCandles;
  const bodyW = candleW * 0.65;

  const yScale = p => pad.top + chartH - ((p - minP) / range) * chartH;

  // Background
  ctx.fillStyle = '#0F0F0F';
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = '#1E222D';
  ctx.lineWidth = 1;
  const gridLines = 6;
  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + (chartH / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(W - pad.right, y);
    ctx.stroke();
    // Price labels
    const pVal = maxP - (range / gridLines) * i;
    ctx.fillStyle = '#4A4E59';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(pVal.toFixed(2), W - pad.right + 8, y + 4);
  }

  // Volume bars
  const maxVol = 50;
  for (let i = 0; i < numCandles; i++) {
    const x = pad.left + i * candleW + candleW / 2;
    const vol = Math.random() * maxVol;
    const volH = (vol / maxVol) * (chartH * 0.15);
    const isGreen = data[i].close >= data[i].open;
    ctx.fillStyle = isGreen ? 'rgba(38,166,154,0.15)' : 'rgba(247,82,95,0.15)';
    ctx.fillRect(x - bodyW / 2, H - pad.bottom - volH, bodyW, volH);
  }

  // Candles
  for (let i = 0; i < numCandles; i++) {
    const d = data[i];
    const x = pad.left + i * candleW + candleW / 2;
    const isGreen = d.close >= d.open;
    const color = isGreen ? '#26A69A' : '#F7525F';

    // Wick
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, yScale(d.high));
    ctx.lineTo(x, yScale(d.low));
    ctx.stroke();

    // Body
    const bodyTop = yScale(Math.max(d.open, d.close));
    const bodyBot = yScale(Math.min(d.open, d.close));
    ctx.fillStyle = color;
    ctx.fillRect(x - bodyW / 2, bodyTop, bodyW, Math.max(bodyBot - bodyTop, 1));
  }

  // Current price line
  const lastPrice = data[data.length - 1].close;
  const lastY = yScale(lastPrice);
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = '#26A69A';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, lastY);
  ctx.lineTo(W - pad.right, lastY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Price label
  ctx.fillStyle = '#26A69A';
  ctx.fillRect(W - pad.right, lastY - 10, 56, 20);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 11px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(lastPrice.toFixed(2), W - pad.right + 4, lastY + 4);

  // Date labels
  ctx.fillStyle = '#4A4E59';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'center';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  for (let i = 0; i < numCandles; i += 10) {
    const x = pad.left + i * candleW + candleW / 2;
    const d = new Date(2026, 0, 1);
    d.setDate(d.getDate() + i);
    ctx.fillText(`${months[d.getMonth()]} ${d.getDate()}`, x, H - 8);
  }
}

function drawSparkline(canvas) {
  const ctx = canvas.getContext('2d');
  const isPositive = canvas.dataset.trend === 'positive';
  const W = canvas.width;
  const H = canvas.height;
  const points = [];
  let val = 50;
  for (let i = 0; i < 20; i++) {
    val += (Math.random() - (isPositive ? 0.4 : 0.6)) * 5;
    points.push(val);
  }
  const min = Math.min(...points) - 5;
  const max = Math.max(...points) + 5;
  const stepX = W / (points.length - 1);

  ctx.beginPath();
  points.forEach((p, i) => {
    const x = i * stepX;
    const y = H - ((p - min) / (max - min)) * H;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.strokeStyle = isPositive ? '#26A69A' : '#F7525F';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawMiniChart(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const displayW = canvas.clientWidth;
  const displayH = canvas.clientHeight;
  canvas.width = displayW * dpr;
  canvas.height = displayH * dpr;
  ctx.scale(dpr, dpr);

  const isPositive = canvas.dataset.trend === 'positive';
  const points = [];
  let val = 50;
  for (let i = 0; i < 30; i++) {
    val += (Math.random() - (isPositive ? 0.4 : 0.6)) * 4;
    points.push(val);
  }
  const min = Math.min(...points) - 5;
  const max = Math.max(...points) + 5;
  const stepX = displayW / (points.length - 1);
  const color = isPositive ? '#26A69A' : '#F7525F';

  // Area fill
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = i * stepX;
    const y = displayH - ((p - min) / (max - min)) * displayH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo(displayW, displayH);
  ctx.lineTo(0, displayH);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, displayH);
  grad.addColorStop(0, isPositive ? 'rgba(38,166,154,0.2)' : 'rgba(247,82,95,0.2)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = i * stepX;
    const y = displayH - ((p - min) / (max - min)) * displayH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}
