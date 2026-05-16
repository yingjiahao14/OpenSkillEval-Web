// ChartPulse Main JavaScript

// Tab switching utility
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
          if (p.dataset.panel === target) {
            p.classList.remove('hidden');
            p.classList.add('fade-in');
          } else {
            p.classList.add('hidden');
            p.classList.remove('fade-in');
          }
        });
        
        if (callback) callback(target, tab);
      });
    });
  });
}

// Accordion utility
function initAccordions(selector) {
  const headers = document.querySelectorAll(selector);
  headers.forEach(header => {
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

// Toggle switch utility
function initToggleSwitches(selector, callback) {
  const switches = document.querySelectorAll(selector);
  switches.forEach(sw => {
    sw.addEventListener('click', () => {
      sw.classList.toggle('on');
      if (callback) callback(sw.classList.contains('on'), sw);
    });
  });
}

// Generate random sparkline path
function generateSparkline(width, height, points = 20, trend = 'random') {
  const step = width / (points - 1);
  let y = height / 2;
  let path = `M0,${y}`;
  
  for (let i = 1; i < points; i++) {
    const change = trend === 'up' 
      ? (Math.random() - 0.3) * height * 0.3
      : trend === 'down'
      ? (Math.random() - 0.7) * height * 0.3
      : (Math.random() - 0.5) * height * 0.4;
    y = Math.max(2, Math.min(height - 2, y + change));
    path += ` L${i * step},${y}`;
  }
  
  return path;
}

// Draw sparkline on SVG element
function drawSparkline(svgId, trend = 'random', color = null) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  
  const width = svg.clientWidth || 80;
  const height = svg.clientHeight || 30;
  const pathData = generateSparkline(width, height, 25, trend);
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathData);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', color || (trend === 'up' ? '#22c55e' : trend === 'down' ? '#F7525F' : '#9ca3af'));
  path.setAttribute('stroke-width', '1.5');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  
  svg.innerHTML = '';
  svg.appendChild(path);
}

// Draw mini area chart
function drawMiniAreaChart(canvasId, dataPoints, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.clientWidth || 120;
  const height = canvas.height = canvas.clientHeight || 40;
  
  const min = Math.min(...dataPoints);
  const max = Math.max(...dataPoints);
  const range = max - min || 1;
  
  ctx.clearRect(0, 0, width, height);
  
  // Gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, color + '40');
  gradient.addColorStop(1, color + '05');
  
  ctx.beginPath();
  ctx.moveTo(0, height);
  
  dataPoints.forEach((val, i) => {
    const x = (i / (dataPoints.length - 1)) * width;
    const y = height - ((val - min) / range) * height * 0.8 - height * 0.1;
    ctx.lineTo(x, y);
  });
  
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Line
  ctx.beginPath();
  dataPoints.forEach((val, i) => {
    const x = (i / (dataPoints.length - 1)) * width;
    const y = height - ((val - min) / range) * height * 0.8 - height * 0.1;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// Generate random candlestick data
function generateCandleData(count = 100) {
  const data = [];
  let price = 260;
  
  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (Math.random() - 0.48) * 6;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    
    data.push({ open, high, low, close });
    price = close;
  }
  
  return data;
}

// Draw candlestick chart
function drawCandlestickChart(canvasId, data, timeframe = '1D') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const width = canvas.width = rect.width;
  const height = canvas.height = rect.height;
  
  ctx.clearRect(0, 0, width, height);
  
  // Grid lines
  ctx.strokeStyle = '#2a2a40';
  ctx.lineWidth = 0.5;
  for (let i = 1; i < 5; i++) {
    const y = (height / 5) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let i = 1; i < 6; i++) {
    const x = (width / 6) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  if (!data || data.length === 0) return;
  
  const visibleData = data.slice(-Math.floor(width / 8));
  const candleWidth = Math.max(2, (width / visibleData.length) * 0.7);
  const spacing = width / visibleData.length;
  
  const prices = visibleData.flatMap(d => [d.high, d.low]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;
  
  const padding = height * 0.05;
  const chartHeight = height - padding * 2;
  
  const priceToY = (p) => padding + chartHeight - ((p - minPrice) / priceRange) * chartHeight;
  
  visibleData.forEach((candle, i) => {
    const x = i * spacing + spacing / 2;
    const yOpen = priceToY(candle.open);
    const yClose = priceToY(candle.close);
    const yHigh = priceToY(candle.high);
    const yLow = priceToY(candle.low);
    
    const isGreen = candle.close >= candle.open;
    ctx.fillStyle = isGreen ? '#22c55e' : '#F7525F';
    ctx.strokeStyle = isGreen ? '#22c55e' : '#F7525F';
    
    // Wick
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, yHigh);
    ctx.lineTo(x, yLow);
    ctx.stroke();
    
    // Body
    const bodyTop = Math.min(yOpen, yClose);
    const bodyHeight = Math.max(1, Math.abs(yOpen - yClose));
    ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
  });
  
  // Price labels on right
  ctx.fillStyle = '#9ca3af';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'left';
  for (let i = 0; i <= 4; i++) {
    const price = minPrice + (priceRange * i) / 4;
    const y = padding + chartHeight - (chartHeight * i) / 4;
    ctx.fillText(price.toFixed(2), width - 45, y + 3);
  }
}

// DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize all accordions
    initAccordions('.accordion-header');
    
    // Initialize sparklines
    document.querySelectorAll('[data-sparkline]').forEach(el => {
      const trend = el.dataset.sparkline;
      const color = el.dataset.sparklineColor;
      drawSparkline(el.id, trend, color);
    });
  });
}
