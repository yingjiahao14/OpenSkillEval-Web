// ChartPulse — Shared JavaScript
(function() {
  'use strict';

  // ===== Tab System =====
  function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var parent = this.parentElement;
        if (!parent) return;

        // Deactivate siblings
        parent.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        // Handle content switching via data attributes
        var targetId = this.getAttribute('data-target');
        if (targetId) {
          var container = this.closest('.tab-container') || document;
          container.querySelectorAll('.tab-content').forEach(function(c) { c.style.display = 'none'; });
          var target = document.getElementById(targetId);
          if (target) target.style.display = 'block';
        }
      });
    });
  }

  // ===== Ghost Tab System (for ideas page, etc.) =====
  function initGhostTabs() {
    document.querySelectorAll('.tab-btn.ghost').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var parent = this.parentElement;
        if (!parent) return;
        parent.querySelectorAll('.tab-btn.ghost').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        var targetId = this.getAttribute('data-target');
        if (targetId) {
          var scope = this.closest('[data-tab-scope]') || document;
          scope.querySelectorAll('.ghost-tab-content').forEach(function(c) { c.style.display = 'none'; });
          var target = document.getElementById(targetId);
          if (target) target.style.display = 'block';
        }
      });
    });
  }

  // ===== Accordion System =====
  function initAccordions() {
    document.querySelectorAll('.watchlist-header').forEach(function(header) {
      header.addEventListener('click', function() {
        this.classList.toggle('open');
        var body = this.nextElementSibling;
        if (body) body.classList.toggle('open');
      });
    });
  }

  // ===== Timeframe Toggle =====
  function initTimeframeToggles() {
    document.querySelectorAll('.timeframe-toggle button').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var parent = this.parentElement;
        parent.querySelectorAll('button').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        // Trigger chart redraw if on chart page
        if (typeof window.redrawChart === 'function') {
          window.redrawChart(this.textContent.trim());
        }
      });
    });
  }

  // ===== Toggle Switches =====
  function initToggles() {
    document.querySelectorAll('.toggle-wrap').forEach(function(wrap) {
      wrap.addEventListener('click', function(e) {
        var toggle = this.querySelector('.toggle');
        if (toggle) toggle.classList.toggle('active');
        var targetId = this.getAttribute('data-filter-target');
        if (targetId) {
          var isActive = toggle.classList.contains('active');
          var scope = this.closest('[data-filter-scope]') || document;
          scope.querySelectorAll('.filterable-item').forEach(function(item) {
            if (isActive) {
              if (item.getAttribute('data-video') === 'true') item.style.display = '';
              else item.style.display = 'none';
            } else {
              item.style.display = '';
            }
          });
        }
      });
    });
  }

  // ===== Sparkline Charts =====
  window.drawSparkline = function(canvas, data, color) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width = canvas.offsetWidth || 80;
    var h = canvas.height = canvas.offsetHeight || 30;
    ctx.clearRect(0, 0, w, h);

    if (!data || data.length < 2) return;

    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    var range = max - min || 1;
    var padding = 2;

    ctx.beginPath();
    ctx.strokeStyle = color || 'var(--accent-blue)';
    ctx.lineWidth = 1.5;

    data.forEach(function(val, i) {
      var x = padding + (i / (data.length - 1)) * (w - padding * 2);
      var y = h - padding - ((val - min) / range) * (h - padding * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill area
    ctx.lineTo(w - padding, h - padding);
    ctx.lineTo(padding, h - padding);
    ctx.closePath();
    var gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, (color || '#2962FF') + '30');
    gradient.addColorStop(1, (color || '#2962FF') + '05');
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  // ===== Generate Random Sparkline Data =====
  window.generateSparkData = function(points, base, volatility) {
    points = points || 30;
    base = base || 50;
    volatility = volatility || 10;
    var data = [];
    var val = base;
    for (var i = 0; i < points; i++) {
      val += (Math.random() - 0.48) * volatility;
      val = Math.max(val, base - volatility * 3);
      val = Math.min(val, base + volatility * 3);
      data.push(val);
    }
    return data;
  };

  // ===== Candlestick Chart (chart.html) =====
  window.initCandlestickChart = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var timeframe = '1D';

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    function generateCandleData(count) {
      var candles = [];
      var price = 263.40;
      var minPrice = 200, maxPrice = 320;
      for (var i = 0; i < count; i++) {
        var open = price;
        var volatility = Math.random() * 4;
        var direction = Math.random() > 0.48 ? 1 : -1;
        var close = open + direction * volatility;
        close = Math.max(minPrice, Math.min(maxPrice, close));
        var high = Math.max(open, close) + Math.random() * 2;
        var low = Math.min(open, close) - Math.random() * 2;
        candles.push({ open: open, high: high, low: low, close: close });
        price = close;
      }
      return candles;
    }

    var candleData = generateCandleData(120);

    function draw() {
      var rect = canvas.parentElement.getBoundingClientRect();
      var W = rect.width, H = rect.height;
      if (W === 0 || H === 0) return;
      ctx.clearRect(0, 0, W, H);

      var margin = { top: 20, right: 20, bottom: 40, left: 60 };
      var chartW = W - margin.left - margin.right;
      var chartH = H - margin.top - margin.bottom;

      // Determine data subset based on timeframe
      var subset;
      switch(timeframe) {
        case '1D': subset = candleData.slice(-25); break;
        case '5D': subset = candleData.slice(-35); break;
        case '1M': subset = candleData.slice(-45); break;
        case '3M': subset = candleData.slice(-65); break;
        case '6M': subset = candleData.slice(-80); break;
        case 'YTD': subset = candleData.slice(-95); break;
        case '1Y': subset = candleData.slice(-110); break;
        case '5Y': subset = candleData; break;
        case 'All': subset = candleData; break;
        default: subset = candleData.slice(-25);
      }

      // Price range
      var allPrices = [];
      subset.forEach(function(c) { allPrices.push(c.high, c.low); });
      var priceMin = Math.min.apply(null, allPrices) - 2;
      var priceMax = Math.max.apply(null, allPrices) + 2;
      var priceRange = priceMax - priceMin;

      var candleWidth = Math.max(2, (chartW / subset.length) * 0.6);
      var spacing = chartW / subset.length;

      // Grid lines
      ctx.strokeStyle = '#1e1e3a';
      ctx.lineWidth = 0.5;
      var gridLines = 6;
      for (var g = 0; g <= gridLines; g++) {
        var y = margin.top + (chartH / gridLines) * g;
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(W - margin.right, y);
        ctx.stroke();

        // Price labels
        var priceLabel = priceMax - (priceRange / gridLines) * g;
        ctx.fillStyle = '#6a6a82';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(priceLabel.toFixed(2), margin.left - 8, y + 3);
      }

      // Candles
      subset.forEach(function(candle, i) {
        var x = margin.left + spacing * i + spacing / 2;
        var isGreen = candle.close >= candle.open;
        var color = isGreen ? '#00C853' : '#F7525F';

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, margin.top + ((priceMax - candle.high) / priceRange) * chartH);
        ctx.lineTo(x, margin.top + ((priceMax - candle.low) / priceRange) * chartH);
        ctx.stroke();

        // Body
        var bodyTop = margin.top + ((priceMax - Math.max(candle.open, candle.close)) / priceRange) * chartH;
        var bodyBottom = margin.top + ((priceMax - Math.min(candle.open, candle.close)) / priceRange) * chartH;
        var bodyHeight = Math.max(1, bodyBottom - bodyTop);

        ctx.fillStyle = color;
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
      });

      // Crosshair line at current price
      var lastPrice = subset[subset.length - 1].close;
      var priceY = margin.top + ((priceMax - lastPrice) / priceRange) * chartH;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(41,98,255,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin.left, priceY);
      ctx.lineTo(W - margin.right, priceY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Price label on crosshair
      ctx.fillStyle = '#2962FF';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(lastPrice.toFixed(2), W - margin.right + 4, priceY - 4);
    }

    window.redrawChart = function(tf) {
      timeframe = tf;
      draw();
    };

    // Mouse tracking for tooltip
    canvas.addEventListener('mousemove', function(e) {
      var rect = canvas.getBoundingClientRect();
      var tooltip = document.getElementById('chart-tooltip');
      if (!tooltip) return;
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      tooltip.style.display = 'block';
      tooltip.style.left = (x + 15) + 'px';
      tooltip.style.top = (y - 40) + 'px';

      // Find nearest candle and show OHLC
      var margin = { left: 60 };
      var chartW = rect.width - margin.left - 20;
      var subset = candleData.slice(-25);
      if (subset.length > 0 && chartW > 0) {
        var spacing = chartW / subset.length;
        var idx = Math.floor((x - margin.left) / spacing);
        idx = Math.max(0, Math.min(subset.length - 1, idx));
        var c = subset[idx];
        tooltip.innerHTML = 'O: ' + c.open.toFixed(2) + ' H: ' + c.high.toFixed(2) + ' L: ' + c.low.toFixed(2) + ' C: ' + c.close.toFixed(2);
      }
    });

    canvas.addEventListener('mouseleave', function() {
      var tooltip = document.getElementById('chart-tooltip');
      if (tooltip) tooltip.style.display = 'none';
    });

    // Handle window resize
    var resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        resize();
        draw();
      }, 150);
    });

    resize();
    draw();
  };

  // ===== Homepage Market Tabs =====
  function initMarketCategoryTabs() {
    document.querySelectorAll('[data-market-tab]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var parent = this.closest('.tab-bar');
        parent.querySelectorAll('[data-market-tab]').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        var category = this.getAttribute('data-market-tab');
        var container = document.getElementById('market-category-content');
        if (!container) return;
        var panes = container.querySelectorAll('.market-pane');
        panes.forEach(function(p) { p.style.display = 'none'; });
        var target = container.querySelector('[data-market="' + category + '"]');
        if (target) target.style.display = 'block';
      });
    });
  }

  // ===== Filter Buttons (brokers page) =====
  function initFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var parent = this.closest('.filters-bar') || this.parentElement;
        parent.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        var filter = this.getAttribute('data-filter');
        var container = document.querySelector('.broker-grid');
        if (!container) return;
        var cards = container.querySelectorAll('.broker-card');
        cards.forEach(function(card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== Mobile Menu Toggle =====
  function initMobileMenu() {
    var toggle = document.getElementById('mobile-menu-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function() {
      var nav = document.getElementById('main-nav');
      if (nav) nav.classList.toggle('open');
    });
  }

  // ===== Initialize All =====
  function init() {
    initTabs();
    initGhostTabs();
    initAccordions();
    initTimeframeToggles();
    initToggles();
    initMarketCategoryTabs();
    initFilterButtons();
    initMobileMenu();

    // Draw all sparklines on page
    document.querySelectorAll('.sparkline canvas').forEach(function(canvas) {
      var color = canvas.getAttribute('data-color') || '#2962FF';
      var points = parseInt(canvas.getAttribute('data-points')) || 30;
      var base = parseFloat(canvas.getAttribute('data-base')) || 50;
      var volatility = parseFloat(canvas.getAttribute('data-vol')) || 10;
      var trend = canvas.getAttribute('data-trend') || 'neutral';
      var data;

      if (trend === 'up') {
        data = window.generateSparkData(points, base, volatility * 0.7);
        // Bias upward
        for (var i = 0; i < data.length; i++) data[i] += (i / data.length) * volatility * 2;
      } else if (trend === 'down') {
        data = window.generateSparkData(points, base, volatility * 0.7);
        for (var i = 0; i < data.length; i++) data[i] -= (i / data.length) * volatility * 2;
      } else {
        data = window.generateSparkData(points, base, volatility);
      }
      window.drawSparkline(canvas, data, color);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
