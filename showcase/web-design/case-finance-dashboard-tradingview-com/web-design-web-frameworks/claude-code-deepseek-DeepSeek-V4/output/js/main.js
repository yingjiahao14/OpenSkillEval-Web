/* ===== ChartPulse — Shared JavaScript ===== */

// ===== TAB SWITCHING =====
document.addEventListener('DOMContentLoaded', function() {
  initAllTabs();
  initWatchlistAccordion();
  initMarketSummaryTabs();
  initTimeframeToggles();
  initBrokerFilters();
  initIdeasFilters();
  initChartCanvas();
  initSparklines();
  initMarketsTabs();
  initGainerTabs();
  initPagination();
});

function initAllTabs() {
  document.querySelectorAll('.tabs').forEach(function(tabGroup) {
    if (tabGroup.dataset.initialized) return;
    tabGroup.dataset.initialized = 'true';

    tabGroup.addEventListener('click', function(e) {
      var tab = e.target.closest('.tab');
      if (!tab) return;

      // Update active tab
      tabGroup.querySelectorAll('.tab').forEach(function(t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');

      // Update associated content
      var target = tab.dataset.target;
      if (target) {
        var container = tab.closest('[data-tab-container]') || document;
        var allContent = container.querySelectorAll('.tab-content');
        allContent.forEach(function(c) { c.style.display = 'none'; });

        var activeContent = document.getElementById(target);
        if (activeContent) {
          activeContent.style.display = 'block';
        }
      }

      // For filter-style tabs, dispatch custom event
      var filterType = tab.dataset.filter;
      if (filterType) {
        document.dispatchEvent(new CustomEvent('tabFilter', {
          detail: { filter: filterType, tab: tab }
        }));
      }
    });
  });
}

// ===== MARKET SUMMARY BAR =====
function initMarketSummaryTabs() {
  var marketBar = document.querySelector('.market-bar');
  if (!marketBar) return;

  marketBar.addEventListener('click', function(e) {
    var item = e.target.closest('.market-item');
    if (!item) return;

    marketBar.querySelectorAll('.market-item').forEach(function(i) {
      i.classList.remove('active');
    });
    item.classList.add('active');

    var category = item.dataset.category;
    if (!category) return;

    // Show/hide market content sections
    var allPanels = document.querySelectorAll('.market-panel');
    allPanels.forEach(function(p) { p.style.display = 'none'; });

    var activePanel = document.getElementById('market-' + category);
    if (activePanel) {
      activePanel.style.display = 'block';
    }
  });
}

// ===== WATCHLIST ACCORDION =====
function initWatchlistAccordion() {
  document.querySelectorAll('.watchlist-cat-header').forEach(function(header) {
    header.addEventListener('click', function() {
      var category = this.closest('.watchlist-category');
      var items = category.querySelector('.watchlist-items');
      var isCollapsed = items.classList.contains('collapsed');

      if (isCollapsed) {
        items.classList.remove('collapsed');
        this.classList.remove('collapsed');
        items.style.maxHeight = items.scrollHeight + 'px';
      } else {
        items.classList.add('collapsed');
        this.classList.add('collapsed');
        items.style.maxHeight = '0px';
      }
    });
  });
}

// ===== TIMEFRAME TOGGLES (CHART PAGE) =====
function initTimeframeToggles() {
  var tfContainers = document.querySelectorAll('.timeframes');
  tfContainers.forEach(function(container) {
    container.addEventListener('click', function(e) {
      var btn = e.target.closest('.tf-btn');
      if (!btn) return;

      container.querySelectorAll('.tf-btn').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      var timeframe = btn.dataset.timeframe;
      if (timeframe && window.updateChartTimeframe) {
        window.updateChartTimeframe(timeframe);
      }
    });
  });
}

// ===== BROKER FILTERS =====
function initBrokerFilters() {
  document.addEventListener('tabFilter', function(e) {
    var filter = e.detail.filter;
    var brokerCards = document.querySelectorAll('.broker-card');
    if (!brokerCards.length) return;

    brokerCards.forEach(function(card) {
      if (filter === 'all' || card.dataset.categories.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ===== IDEAS FILTERS =====
function initIdeasFilters() {
  document.addEventListener('tabFilter', function(e) {
    var filter = e.detail.filter;
    var ideaCards = document.querySelectorAll('.idea-card');
    if (!ideaCards.length) return;

    // Video toggle
    var videoToggle = document.getElementById('videoOnlyToggle');
    var onlyVideos = videoToggle && videoToggle.checked;

    ideaCards.forEach(function(card) {
      var matchFilter = (filter === 'all' || filter === 'popular' || filter === 'editors') ?
        card.dataset.category === filter || !filter || filter === 'all' || filter === 'popular' :
        true;

      var matchVideo = !onlyVideos || card.dataset.hasVideo === 'true';

      if (matchFilter && matchVideo) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  var videoToggle = document.getElementById('videoOnlyToggle');
  if (videoToggle) {
    videoToggle.addEventListener('change', function() {
      document.dispatchEvent(new CustomEvent('tabFilter', {
        detail: { filter: 'refresh' }
      }));
    });
  }
}

// ===== CANDLESTICK CHART (CANVAS) =====
function initChartCanvas() {
  var canvas = document.getElementById('candlestickChart');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;

  function resizeCanvas() {
    var rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener('resize', function() {
    resizeCanvas();
    drawChart();
  });

  var priceData = [];
  var currentTimeframe = '1M';

  // Generate realistic candlestick data
  function generateData(timeframe) {
    var counts = { '1D': 78, '5D': 130, '1M': 90, '3M': 90, '6M': 126, 'YTD': 90, '1Y': 252, '5Y': 260, 'All': 300 };
    var count = counts[timeframe] || 90;
    var data = [];
    var basePrice = 263.40;
    var volatility = 0.015;

    for (var i = 0; i < count; i++) {
      var open = basePrice;
      var change = (Math.random() - 0.48) * volatility * basePrice;
      var close = open + change;
      var high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5;
      var low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5;
      var volume = Math.floor(Math.random() * 50000000) + 20000000;

      data.push({
        open: open,
        high: high,
        low: low,
        close: close,
        volume: volume,
        time: i
      });
      basePrice = close;
    }
    return data;
  }

  priceData = generateData(currentTimeframe);

  window.updateChartTimeframe = function(timeframe) {
    currentTimeframe = timeframe;
    priceData = generateData(timeframe);
    drawChart();
  };

  var tooltip = null;
  var crosshairX = null;
  var startDrag = null;
  var viewStart = 0;
  var viewEnd = 1;

  canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var w = rect.width;
    var h = rect.height;

    var padding = { top: 30, right: 20, bottom: 30, left: 70 };
    var chartW = w - padding.left - padding.right;
    var chartH = h - padding.top - padding.bottom;

    var visibleData = priceData.slice(
      Math.floor(viewStart * priceData.length),
      Math.ceil(viewEnd * priceData.length)
    );

    if (visibleData.length < 2) return;

    var idx = Math.floor(((x - padding.left) / chartW) * visibleData.length);
    idx = Math.max(0, Math.min(visibleData.length - 1, idx));

    crosshairX = x;
    tooltip = {
      candle: visibleData[idx],
      x: x,
      y: y
    };
    drawChart();
  });

  canvas.addEventListener('mouseleave', function() {
    crosshairX = null;
    tooltip = null;
    drawChart();
  });

  canvas.addEventListener('wheel', function(e) {
    e.preventDefault();
    var delta = e.deltaY > 0 ? 0.1 : -0.1;
    viewStart = Math.max(0, Math.min(0.9, viewStart + delta));
    viewEnd = Math.min(1, Math.max(viewStart + (viewEnd - viewStart), viewStart + 0.1));
    if (viewEnd - viewStart > 0.9) {
      viewStart = 0;
      viewEnd = 1;
    }
    drawChart();
  });

  canvas.addEventListener('mousedown', function(e) {
    var rect = canvas.getBoundingClientRect();
    startDrag = { x: e.clientX - rect.left, viewStart: viewStart, viewEnd: viewEnd };
  });

  canvas.addEventListener('mousemove', function(e) {
    if (!startDrag) return;
    var rect = canvas.getBoundingClientRect();
    var dx = (e.clientX - rect.left - startDrag.x) / rect.width;
    var range = startDrag.viewEnd - startDrag.viewStart;
    var newStart = Math.max(0, Math.min(1 - range, startDrag.viewStart - dx * range));
    viewStart = newStart;
    viewEnd = newStart + range;
    drawChart();
  });

  window.addEventListener('mouseup', function() { startDrag = null; });

  function drawChart() {
    var rect = canvas.parentElement.getBoundingClientRect();
    var w = rect.width;
    var h = rect.height;
    var padding = { top: 30, right: 20, bottom: 30, left: 70 };
    var chartW = w - padding.left - padding.right;
    var chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w * dpr, h * dpr);
    ctx.save();
    ctx.scale(dpr, dpr);

    var visibleData = priceData.slice(
      Math.floor(viewStart * priceData.length),
      Math.ceil(viewEnd * priceData.length)
    );

    if (visibleData.length < 2) {
      ctx.restore();
      return;
    }

    var allPrices = visibleData.reduce(function(acc, d) {
      return acc.concat([d.high, d.low]);
    }, []);
    var minPrice = Math.min.apply(null, allPrices);
    var maxPrice = Math.max.apply(null, allPrices);
    var priceRange = maxPrice - minPrice || 1;
    minPrice -= priceRange * 0.05;
    maxPrice += priceRange * 0.05;
    priceRange = maxPrice - minPrice;

    var candleWidth = Math.min(12, (chartW / visibleData.length) * 0.7);
    var spacing = chartW / visibleData.length;

    function priceToY(p) { return padding.top + chartH - ((p - minPrice) / priceRange) * chartH; }

    // Grid lines
    ctx.strokeStyle = 'rgba(42, 42, 74, 0.4)';
    ctx.lineWidth = 0.5;
    for (var i = 0; i <= 5; i++) {
      var gy = padding.top + (chartH / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, gy);
      ctx.lineTo(w - padding.right, gy);
      ctx.stroke();

      // Price labels
      var priceLabel = maxPrice - (priceRange / 5) * i;
      ctx.fillStyle = '#6a6a80';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(priceLabel.toFixed(2), padding.left - 8, gy + 3);
    }

    // Candles
    visibleData.forEach(function(d, i) {
      var x = padding.left + spacing * i + spacing / 2;
      var openY = priceToY(d.open);
      var closeY = priceToY(d.close);
      var highY = priceToY(d.high);
      var lowY = priceToY(d.low);

      var isUp = d.close >= d.open;
      ctx.strokeStyle = isUp ? '#00c853' : '#F7525F';
      ctx.fillStyle = isUp ? '#00c853' : '#F7525F';

      // Wick
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Body
      var bodyTop = isUp ? closeY : openY;
      var bodyH = Math.max(1, Math.abs(closeY - openY));
      if (isUp) {
        ctx.fillStyle = '#00c853';
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyH);
      } else {
        ctx.fillStyle = '#F7525F';
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyH);
      }
    });

    // Crosshair
    if (crosshairX !== null) {
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(crosshairX, padding.top);
      ctx.lineTo(crosshairX, padding.top + chartH);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Tooltip
    if (tooltip && tooltip.candle) {
      var d = tooltip.candle;
      var tx = tooltip.x + 15;
      var ty = Math.min(tooltip.y - 60, h - 100);

      ctx.fillStyle = 'rgba(15, 15, 15, 0.95)';
      ctx.strokeStyle = '#2a2a4a';
      ctx.lineWidth = 1;
      var tw = 140;
      var th = 70;
      ctx.beginPath();
      ctx.roundRect(tx, ty, tw, th, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('AAPL', tx + 10, ty + 18);

      ctx.fillStyle = '#a0a0b8';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText('O: ' + d.open.toFixed(2) + '  H: ' + d.high.toFixed(2), tx + 10, ty + 37);
      ctx.fillText('L: ' + d.low.toFixed(2) + '  C: ' + d.close.toFixed(2), tx + 10, ty + 55);
    }

    ctx.restore();
  }

  drawChart();
  window.addEventListener('resize', drawChart);
}

// ===== SPARKLINE MINI CHARTS =====
function initSparklines() {
  document.querySelectorAll('.sparkline').forEach(function(canvas) {
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);

    var w = rect.width;
    var h = rect.height;
    var isUp = canvas.dataset.trend !== 'down';
    var color = isUp ? '#00c853' : '#F7525F';

    // Generate sparkline data
    var points = [];
    var count = 30;
    var trend = isUp ? 1 : -1;
    var base = h / 2;
    for (var i = 0; i < count; i++) {
      points.push(base + trend * (Math.random() * h * 0.3) - (i * trend * 2));
      base = points[points.length - 1];
    }

    // Normalize
    var min = Math.min.apply(null, points);
    var max = Math.max.apply(null, points);
    var range = max - min || 1;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    points.forEach(function(p, i) {
      var nx = (w / (count - 1)) * i;
      var ny = h - ((p - min) / range) * (h - 6) - 3;
      if (i === 0) ctx.moveTo(nx, ny);
      else ctx.lineTo(nx, ny);
    });
    ctx.stroke();

    // Fill
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = color + '15';
    ctx.fill();
  });
}

// ===== MARKETS TABS =====
function initMarketsTabs() {
  document.addEventListener('tabFilter', function(e) {
    var filter = e.detail.filter;
    var sections = document.querySelectorAll('.market-section');
    sections.forEach(function(s) {
      if (filter === 'all' || s.dataset.section === filter) {
        s.style.display = '';
      } else {
        s.style.display = 'none';
      }
    });
  });
}

// ===== STOCK GAINER/LOSER TABS =====
function initGainerTabs() {
  document.addEventListener('tabFilter', function(e) {
    var filter = e.detail.filter;
    var panels = document.querySelectorAll('.session-panel');
    panels.forEach(function(p) {
      if (p.dataset.session === filter) {
        p.style.display = '';
      } else {
        p.style.display = 'none';
      }
    });
  });
}

// ===== PAGINATION =====
function initPagination() {
  document.querySelectorAll('.pagination').forEach(function(pager) {
    pager.addEventListener('click', function(e) {
      var btn = e.target.closest('button');
      if (!btn) return;

      pager.querySelectorAll('button').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });
}

// ===== DETAIL PANEL TABS (INCOME STATEMENT) =====
document.addEventListener('DOMContentLoaded', function() {
  var detailTabs = document.querySelectorAll('.detail-tab');
  detailTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var group = tab.closest('.detail-tab-group');
      group.querySelectorAll('.detail-tab').forEach(function(t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');

      var target = tab.dataset.target;
      if (target) {
        group.querySelectorAll('.detail-tab-content').forEach(function(c) {
          c.style.display = 'none';
        });
        var el = document.getElementById(target);
        if (el) el.style.display = 'block';
      }
    });
  });
});

// ===== MOBILE NAV TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById('mobileNavToggle');
  var nav = document.getElementById('navLinks');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
  }
});
