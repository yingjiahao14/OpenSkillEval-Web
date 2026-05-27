// ChartPulse - Shared JavaScript

// Tab switching
function initTabs(container) {
  const tabs = container.querySelectorAll('[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('[data-tab-group]');
      if (!group) return;
      const target = tab.dataset.tab;
      group.querySelectorAll('[data-tab]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      group.querySelectorAll('[data-tab-content]').forEach(c => {
        c.style.display = c.dataset.tabContent === target ? '' : 'none';
      });
    });
  });
}

// Accordion
function initAccordions(container) {
  const headers = container.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });
}

// Toggle switches
function initToggles(container) {
  const toggles = container.querySelectorAll('.toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      const wrapper = toggle.closest('.toggle-wrapper');
      if (wrapper) {
        const event = new CustomEvent('toggle', { detail: toggle.classList.contains('active') });
        wrapper.dispatchEvent(event);
      }
    });
  });
}

// Sparkline drawing
function drawSparkline(canvas, data, color = '#22C55E', fillColor = 'rgba(34,197,94,0.1)') {
  if (!canvas || !data || data.length < 2) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth * 2;
  const h = canvas.height = canvas.offsetHeight * 2;
  ctx.scale(2, 2);
  const cw = canvas.offsetWidth;
  const ch = canvas.offsetHeight;
  ctx.clearRect(0, 0, cw, ch);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data.map((v, i) => ({
    x: padding + (i / (data.length - 1)) * (cw - padding * 2),
    y: padding + (1 - (v - min) / range) * (ch - padding * 2)
  }));

  // Fill
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length - 1].x, ch);
  ctx.lineTo(points[0].x, ch);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// Candlestick chart drawing
function drawCandlestickChart(canvas, data) {
  if (!canvas || !data || data.length === 0) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;

  const allHigh = data.map(d => d.high);
  const allLow = data.map(d => d.low);
  const min = Math.min(...allLow);
  const max = Math.max(...allHigh);
  const range = max - min || 1;
  const padTop = 20, padBot = 30, padLeft = 50, padRight = 20;
  const chartW = w - padLeft - padRight;
  const chartH = h - padTop - padBot;

  const candleW = Math.max(3, (chartW / data.length) * 0.7);
  const gap = chartW / data.length;

  // Grid
  ctx.strokeStyle = 'rgba(42,42,69,0.5)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 5; i++) {
    const y = padTop + (i / 5) * chartH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(w - padRight, y);
    ctx.stroke();
    const val = max - (i / 5) * range;
    ctx.fillStyle = '#6B6B8D';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val.toFixed(2), padLeft - 8, y + 4);
  }

  // Candles
  data.forEach((d, i) => {
    const x = padLeft + i * gap + gap / 2;
    const isGreen = d.close >= d.open;
    const color = isGreen ? '#22C55E' : '#F7525F';

    const openY = padTop + (1 - (d.open - min) / range) * chartH;
    const closeY = padTop + (1 - (d.close - min) / range) * chartH;
    const highY = padTop + (1 - (d.high - min) / range) * chartH;
    const lowY = padTop + (1 - (d.low - min) / range) * chartH;

    // Wick
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, highY);
    ctx.lineTo(x, lowY);
    ctx.stroke();

    // Body
    const bodyTop = Math.min(openY, closeY);
    const bodyH = Math.max(Math.abs(closeY - openY), 1);
    if (isGreen) {
      ctx.strokeStyle = color;
      ctx.strokeRect(x - candleW / 2, bodyTop, candleW, bodyH);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
    }
  });

  // Volume bars
  const maxVol = Math.max(...data.map(d => d.volume || 1));
  const volH = 40;
  data.forEach((d, i) => {
    const x = padLeft + i * gap + gap / 2;
    const isGreen = d.close >= d.open;
    const vH = ((d.volume || 0) / maxVol) * volH;
    ctx.fillStyle = isGreen ? 'rgba(34,197,94,0.3)' : 'rgba(247,82,95,0.3)';
    ctx.fillRect(x - candleW / 2, h - padBot - vH, candleW, vH);
  });

  // X-axis dates
  ctx.fillStyle = '#6B6B8D';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'center';
  const step = Math.max(1, Math.floor(data.length / 8));
  data.forEach((d, i) => {
    if (i % step === 0) {
      const x = padLeft + i * gap + gap / 2;
      ctx.fillText(d.date || '', x, h - 8);
    }
  });
}

// Generate sample candlestick data
function generateCandleData(days = 60) {
  const data = [];
  let price = 260;
  for (let i = 0; i < days; i++) {
    const date = new Date(2026, 0, 1);
    date.setDate(date.getDate() + i);
    const change = (Math.random() - 0.48) * 6;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    const volume = 20 + Math.random() * 40;
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume
    });
    price = close;
  }
  return data;
}

// Generate sparkline data
function generateSparkline(points = 20, trend = 0.5) {
  const data = [];
  let val = 50 + Math.random() * 50;
  for (let i = 0; i < points; i++) {
    val += (Math.random() - 0.5 + (trend - 0.5) * 0.3) * 5;
    data.push(Math.max(0, val));
  }
  return data;
}

// Init all on page load
document.addEventListener('DOMContentLoaded', () => {
  initTabs(document);
  initAccordions(document);
  initToggles(document);

  // Draw all sparklines
  document.querySelectorAll('canvas[data-sparkline]').forEach(canvas => {
    const trend = parseFloat(canvas.dataset.trend || 0.5);
    const isPositive = trend > 0.5;
    const data = generateSparkline(20, trend);
    drawSparkline(canvas, data,
      isPositive ? '#22C55E' : '#F7525F',
      isPositive ? 'rgba(34,197,94,0.1)' : 'rgba(247,82,95,0.1)');
  });
});
