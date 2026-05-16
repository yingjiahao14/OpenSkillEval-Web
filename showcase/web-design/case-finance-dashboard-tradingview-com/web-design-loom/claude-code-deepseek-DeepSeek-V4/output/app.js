/* ChartPulse — Shared Application Logic */

// ── Generic Tab System ──
function initTabs(containerId, panelPrefix) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.addEventListener('click', function(e) {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    const tabValue = tab.dataset.tab || tab.dataset.cat || tab.dataset.sort || tab.dataset.section || tab.dataset.tf;
    if (!tabValue) return;

    // Deactivate siblings
    container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Hide all panels with this prefix, show the selected one
    if (panelPrefix) {
      document.querySelectorAll('[id^="' + panelPrefix + '"]').forEach(p => { p.style.display = 'none'; });
      const target = document.getElementById(panelPrefix + tabValue);
      if (target) target.style.display = '';
    }
  });
}

// ── Home: Market Summary Tabs ──
initTabs('marketTabs', 'panel-');

// ── Home: Community Ideas Tabs (Popular / Editors) ──
document.addEventListener('DOMContentLoaded', function() {
  const ideasTabs = document.getElementById('ideasTabs');
  if (ideasTabs) {
    ideasTabs.addEventListener('click', function(e) {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      ideasTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const val = tab.dataset.tab;
      const popularGrid = document.getElementById('ideasGrid');
      const editorsGrid = document.getElementById('editorsGrid');
      if (popularGrid) popularGrid.style.display = val === 'popular' ? '' : 'none';
      if (editorsGrid) editorsGrid.style.display = val === 'editors' ? '' : 'none';
    });
  }
});

// ── Home: Indicators Tabs ──
document.addEventListener('DOMContentLoaded', function() {
  const indTabs = document.getElementById('indicatorTabs');
  if (indTabs) {
    indTabs.addEventListener('click', function(e) {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      indTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const val = tab.dataset.tab;
      const popGrid = document.getElementById('indicatorGrid');
      const edGrid = document.getElementById('editorsIndGrid');
      if (popGrid) popGrid.style.display = val === 'pop-ind' ? '' : 'none';
      if (edGrid) edGrid.style.display = val === 'editors-ind' ? '' : 'none';
    });
  }
});

// ── Chart: Watchlist Accordion ──
document.addEventListener('DOMContentLoaded', function() {
  const watchlist = document.getElementById('watchlist');
  if (!watchlist) return;
  watchlist.addEventListener('click', function(e) {
    const header = e.target.closest('.watchlist-header');
    if (!header) return;
    const group = header.dataset.group;
    const body = document.getElementById('group-' + group);
    if (!body) return;
    const isOpen = body.classList.contains('open');
    if (isOpen) {
      body.classList.remove('open');
      header.classList.remove('open');
    } else {
      body.classList.add('open');
      header.classList.add('open');
    }
  });
});

// ── Chart: Timeframe Toggle ──
document.addEventListener('DOMContentLoaded', function() {
  const tfBtns = document.getElementById('timeframeBtns');
  if (!tfBtns) return;
  tfBtns.addEventListener('click', function(e) {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    tfBtns.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    drawChart(tab.dataset.tf);
  });
});

// ── Chart: Financial Tabs (Annual/Quarterly) ──
document.addEventListener('DOMContentLoaded', function() {
  const finTabs = document.getElementById('financialTabs');
  if (!finTabs) return;
  finTabs.addEventListener('click', function(e) {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    finTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const annual = document.getElementById('fin-annual');
    const quarterly = document.getElementById('fin-quarterly');
    if (tab.dataset.tab === 'annual') {
      if (annual) annual.style.display = '';
      if (quarterly) quarterly.style.display = 'none';
    } else {
      if (annual) annual.style.display = 'none';
      if (quarterly) quarterly.style.display = '';
    }
  });
});

// ── Ideas: Filter Tabs ──
document.addEventListener('DOMContentLoaded', function() {
  const filterTabs = document.getElementById('ideasFilterTabs');
  if (!filterTabs) return;
  filterTabs.addEventListener('click', function(e) {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    filterTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const val = tab.dataset.tab;
    document.querySelectorAll('[id^="panel-"]').forEach(function(p) {
      if (p.id.startsWith('panel-') && (p.id.includes('-ideas') || p.id.includes('popular') || p.id.includes('editors') || p.id.includes('trending') || p.id.includes('latest'))) {
        p.style.display = 'none';
      }
    });
    const target = document.getElementById('panel-' + val);
    if (target) target.style.display = '';
  });
});

// ── Ideas: Video Toggle ──
document.addEventListener('DOMContentLoaded', function() {
  const videoToggle = document.getElementById('videoToggle');
  if (!videoToggle) return;
  videoToggle.addEventListener('click', function() {
    videoToggle.classList.toggle('on');
  });
});

// ── Markets: Asset Class Tab Navigation ──
document.addEventListener('DOMContentLoaded', function() {
  const marketTabs = document.getElementById('marketTabs');
  if (!marketTabs) return;
  marketTabs.addEventListener('click', function(e) {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    marketTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const section = document.getElementById('section-' + tab.dataset.section);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Markets: Chart Type/Timeframe Toggles ──
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.chart-toggles').forEach(function(group) {
    group.addEventListener('click', function(e) {
      const toggle = e.target.closest('.chart-toggle');
      if (!toggle) return;
      if (toggle.dataset.range) {
        group.querySelectorAll('[data-range]').forEach(t => t.classList.remove('active'));
      }
      if (toggle.dataset.type) {
        group.querySelectorAll('[data-type]').forEach(t => t.classList.remove('active'));
      }
      toggle.classList.add('active');
    });
  });
});

// ── Markets: Gainers/Losers Session Tabs ──
document.addEventListener('DOMContentLoaded', function() {
  ['gainersTabs', 'losersTabs'].forEach(function(id) {
    const tabs = document.getElementById(id);
    if (!tabs) return;
    tabs.addEventListener('click', function(e) {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      var prefix = id === 'gainersTabs' ? 'panel-' : 'panel-';
      var suffix = id === 'gainersTabs' ? '-gainers' : '-losers';
      document.querySelectorAll('[id$="' + suffix + '"]').forEach(function(p) { p.style.display = 'none'; });
      var target = document.getElementById(prefix + tab.dataset.tab);
      if (target) target.style.display = '';
    });
  });
});

// ── Brokers: Category Filter Tabs ──
document.addEventListener('DOMContentLoaded', function() {
  var catTabs = document.getElementById('brokerCategoryTabs');
  if (!catTabs) return;
  catTabs.addEventListener('click', function(e) {
    var tab = e.target.closest('.tab');
    if (!tab) return;
    catTabs.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');
    var cat = tab.dataset.cat;
    document.querySelectorAll('.broker-card').forEach(function(card) {
      if (cat === 'all' || card.dataset.categories.includes(cat)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ── Brokers: Rating Sort Tabs ──
document.addEventListener('DOMContentLoaded', function() {
  var ratingTabs = document.getElementById('brokerRatingTabs');
  if (!ratingTabs) return;
  ratingTabs.addEventListener('click', function(e) {
    var tab = e.target.closest('.tab');
    if (!tab) return;
    ratingTabs.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');
    var sort = tab.dataset.sort;
    var container = document.querySelector('#broker-listings .container > div');
    if (!container) return;
    var cards = Array.from(container.querySelectorAll('.broker-card'));
    cards.sort(function(a, b) {
      if (sort === 'best') {
        var ratingA = parseFloat(a.querySelector('.broker-info span[style] + span') ? (a.textContent.match(/(\d+\.\d+)/) || [0])[0] : 0);
        var ratingB = parseFloat(b.querySelector('.broker-info span[style] + span') ? (b.textContent.match(/(\d+\.\d+)/) || [0])[0] : 0);
        return ratingB - ratingA;
      }
      if (sort === 'reviews') {
        var revA = parseFloat((a.querySelector('.broker-stat .big') || {}).textContent || '0');
        var revB = parseFloat((b.querySelector('.broker-stat .big') || {}).textContent || '0');
        return revB - revA;
      }
      return 0;
    });
    cards.forEach(function(c) { container.appendChild(c); });
  });
});

// ── Mobile Menu ──
document.addEventListener('DOMContentLoaded', function() {
  var menuBtn = document.getElementById('mobileMenuBtn');
  var navLinks = document.getElementById('navLinks');
  if (!menuBtn || !navLinks) return;
  menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('mobile-open');
  });
});

// ── Candlestick Chart ──
function generateOHLC(count, startPrice, volatility, trend) {
  var data = [];
  var price = startPrice;
  var date = new Date(2026, 2, 1);
  for (var i = 0; i < count; i++) {
    var open = price;
    var range = price * (volatility / 100);
    var high = open + Math.random() * range;
    var low = open - Math.random() * range * 0.8;
    var close = low + Math.random() * (high - low);
    close = close + (trend * range * 0.03);
    price = close;
    var d = new Date(date);
    d.setDate(d.getDate() + i);
    data.push({
      time: d.toISOString().slice(0, 10),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2)
    });
  }
  return data;
}

var chartData = {
  '1D': generateOHLC(78, 263, 0.4, 0),
  '5D': generateOHLC(78, 260, 0.6, 0.3),
  '1M': generateOHLC(120, 255, 0.8, 0.5),
  '3M': generateOHLC(180, 248, 1.0, 1.0),
  '6M': generateOHLC(180, 240, 1.2, 1.5),
  'YTD': generateOHLC(200, 235, 1.3, 2.0),
  '1Y': generateOHLC(220, 200, 1.5, 3.0),
  '5Y': generateOHLC(240, 100, 2.0, 8.0),
  'All': generateOHLC(260, 28, 3.0, 12.0)
};

function drawChart(timeframe) {
  var canvas = document.getElementById('chartCanvas');
  if (!canvas) return;
  var container = canvas.parentElement;
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  canvas.width = container.clientWidth * dpr;
  canvas.height = container.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  var W = container.clientWidth;
  var H = container.clientHeight;

  ctx.clearRect(0, 0, W, H);

  var data = chartData[timeframe] || chartData['1M'];
  var prices = [];
  data.forEach(function(d) { prices.push(d.high, d.low); });
  var minP = Math.min.apply(null, prices);
  var maxP = Math.max.apply(null, prices);
  var pad = (maxP - minP) * 0.08;
  minP -= pad;
  maxP += pad;
  var margin = { top: 30, right: 50, bottom: 40, left: 60 };
  var pw = W - margin.left - margin.right;
  var ph = H - margin.top - margin.bottom;

  function x(i) { return margin.left + (i / (data.length - 1)) * pw; }
  function y(p) { return margin.top + ph - ((p - minP) / (maxP - minP)) * ph; }

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 0.5;
  var gridLines = 8;
  for (var gi = 0; gi <= gridLines; gi++) {
    var gy = margin.top + (gi / gridLines) * ph;
    ctx.beginPath(); ctx.moveTo(margin.left, gy); ctx.lineTo(W - margin.right, gy); ctx.stroke();
    var gval = maxP - (gi / gridLines) * (maxP - minP);
    ctx.fillStyle = '#666';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(gval.toFixed(2), margin.left - 8, gy + 4);
  }

  // Crosshair line at last price
  var lastPrice = data[data.length - 1].close;
  var lastY = y(lastPrice);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 8]);
  ctx.beginPath(); ctx.moveTo(margin.left, lastY); ctx.lineTo(W - margin.right, lastY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(lastPrice.toFixed(2), W - margin.right + 4, lastY + 4);

  // Candles
  var candleWidth = Math.max(2, (pw / data.length) * 0.6);
  var gap = (pw / data.length) - candleWidth;

  data.forEach(function(d, i) {
    var cx = x(i) - candleWidth / 2;
    var isUp = d.close >= d.open;
    ctx.fillStyle = isUp ? '#00C853' : '#F7525F';
    ctx.strokeStyle = isUp ? '#00C853' : '#F7525F';

    // Wick
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x(i), y(d.high));
    ctx.lineTo(x(i), y(d.low));
    ctx.stroke();

    // Body
    var bodyTop = y(Math.max(d.open, d.close));
    var bodyH = Math.max(1, y(Math.min(d.open, d.close)) - bodyTop);
    if (bodyH < 1) bodyH = 1;
    if (isUp) {
      ctx.fillRect(cx, bodyTop, candleWidth, bodyH);
    } else {
      ctx.fillRect(cx, bodyTop, candleWidth, bodyH);
    }
  });

  // Volume bars at bottom
  var volHeight = ph * 0.15;
  var volBase = margin.top + ph;
  var maxVol = 0;
  data.forEach(function(d) { maxVol = Math.max(maxVol, d.high - d.low + Math.abs(d.close - d.open)); });
  data.forEach(function(d, i) {
    var vol = d.high - d.low + Math.abs(d.close - d.open);
    var barH = (vol / maxVol) * volHeight;
    var isUp = d.close >= d.open;
    ctx.fillStyle = isUp ? 'rgba(0,200,83,0.3)' : 'rgba(247,82,95,0.3)';
    ctx.fillRect(x(i) - candleWidth / 2, volBase - barH, candleWidth, barH);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('chartCanvas');
  if (!canvas) return;
  drawChart('1M');
  window.addEventListener('resize', function() { drawChart('1M'); });
  // Re-get active timeframe on resize
  window.addEventListener('resize', function() {
    var activeTF = document.querySelector('#timeframeBtns .tab.active');
    drawChart(activeTF ? activeTF.dataset.tf : '1M');
  });
});

// ── Navbar: Highlight current page ──
document.addEventListener('DOMContentLoaded', function() {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
