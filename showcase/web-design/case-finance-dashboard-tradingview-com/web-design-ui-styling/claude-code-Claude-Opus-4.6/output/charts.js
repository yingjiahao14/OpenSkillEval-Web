// ChartPulse — Chart Rendering Utilities

function generateSparklineData(trend, points) {
  points = points || 20;
  const data = [];
  let val = 50;
  for (let i = 0; i < points; i++) {
    if (trend === 'up') val += (Math.random() - 0.35) * 4;
    else if (trend === 'down') val += (Math.random() - 0.65) * 4;
    else val += (Math.random() - 0.5) * 3;
    data.push(Math.max(10, Math.min(90, val)));
  }
  return data;
}

function drawSparkline(canvas, trend, color) {
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const w = rect.width, h = rect.height;
  const data = generateSparklineData(trend);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  // Area fill
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, color + '30');
  gradient.addColorStop(1, color + '05');

  ctx.beginPath();
  ctx.moveTo(0, h);
  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = pad + (1 - (val - min) / range) * (h - pad * 2);
    if (i === 0) ctx.lineTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = pad + (1 - (val - min) / range) * (h - pad * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawIdeaChart(canvas, type, color) {
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const w = rect.width, h = rect.height;
  const isUp = color === '#26a69a' || color === '#2962FF';

  // Background grid
  ctx.strokeStyle = 'rgba(42,42,74,0.2)';
  ctx.lineWidth = 0.5;
  for (let i = 1; i < 4; i++) {
    const y = (h / 4) * i;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  if (type === 'candle') {
    const numCandles = 30;
    const candleW = w / numCandles;
    const gap = candleW * 0.3;
    const bodyW = candleW - gap;
    let price = isUp ? 40 : 70;
    const candles = [];

    for (let i = 0; i < numCandles; i++) {
      const bias = isUp ? 0.55 : 0.45;
      const open = price;
      const change = (Math.random() - (1 - bias)) * 5;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;
      candles.push({ open, close, high, low });
      price = close;
    }

    const allP = candles.flatMap(c => [c.high, c.low]);
    const minP = Math.min(...allP) - 1;
    const maxP = Math.max(...allP) + 1;

    candles.forEach((c, i) => {
      const x = i * candleW + gap / 2;
      const cx = x + bodyW / 2;
      const green = c.close >= c.open;
      const col = green ? '#26a69a' : '#ef5350';

      const yH = 8 + (1 - (c.high - minP) / (maxP - minP)) * (h - 16);
      const yL = 8 + (1 - (c.low - minP) / (maxP - minP)) * (h - 16);
      const yO = 8 + (1 - (c.open - minP) / (maxP - minP)) * (h - 16);
      const yC = 8 + (1 - (c.close - minP) / (maxP - minP)) * (h - 16);

      ctx.strokeStyle = col;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx, yH); ctx.lineTo(cx, yL); ctx.stroke();

      ctx.fillStyle = col;
      const top = Math.min(yO, yC);
      const bH = Math.max(Math.abs(yO - yC), 1);
      ctx.fillRect(x, top, bodyW, bH);
    });
  } else {
    const data = generateSparklineData(isUp ? 'up' : 'down', 40);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, color + '25');
    gradient.addColorStop(1, color + '02');

    ctx.beginPath();
    ctx.moveTo(0, h);
    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = 8 + (1 - (val - min) / range) * (h - 16);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = 8 + (1 - (val - min) / range) * (h - 16);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function initCharts() {
  document.querySelectorAll('.sparkline, .spark-mini').forEach(canvas => {
    const trend = canvas.dataset.trend || 'up';
    const color = canvas.dataset.color || '#26a69a';
    drawSparkline(canvas, trend, color);
  });

  document.querySelectorAll('.idea-chart, .idea-chart-sm').forEach(canvas => {
    const type = canvas.dataset.type || 'line';
    const color = canvas.dataset.color || '#26a69a';
    drawIdeaChart(canvas, type, color);
  });
}

window.addEventListener('load', initCharts);
window.addEventListener('resize', initCharts);
