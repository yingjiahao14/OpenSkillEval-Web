(function(){
  function qs(sel, root){ return (root||document).querySelector(sel); }
  function qsa(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  function initTabs(root){
    qsa('[data-tabs]', root).forEach(function(group){
      var tabs = qsa('[role="tab"]', group);
      if(!tabs.length) return;
      function activate(id){
        tabs.forEach(function(t){
          var on = t.getAttribute('data-tab') === id;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        qsa('[role="tabpanel"]', group).forEach(function(p){
          var on = p.getAttribute('data-panel') === id;
          p.hidden = !on;
        });
      }
      tabs.forEach(function(t){
        t.addEventListener('click', function(){ activate(t.getAttribute('data-tab')); });
      });
      var initial = (tabs.find(function(t){ return t.getAttribute('aria-selected') === 'true'; }) || tabs[0]).getAttribute('data-tab');
      activate(initial);
    });
  }

  function initAccordions(root){
    qsa('[data-accordion]', root).forEach(function(acc){
      qsa('.acc-item', acc).forEach(function(item){
        var header = qs('.acc-header', item);
        if(!header) return;
        header.addEventListener('click', function(){
          var open = item.getAttribute('data-open') === 'true';
          item.setAttribute('data-open', open ? 'false' : 'true');
          header.setAttribute('aria-expanded', open ? 'false' : 'true');
        });
      });
    });
  }

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
  function hashToSeed(str){
    var h = 2166136261;
    for (var i=0;i<str.length;i++) h = (h ^ str.charCodeAt(i)) * 16777619;
    return (h >>> 0);
  }
  function mulberry32(a){
    return function(){
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }

  function drawSpark(svg, values, pos){
    var w = svg.viewBox.baseVal.width || 110;
    var h = svg.viewBox.baseVal.height || 28;
    var min = Math.min.apply(null, values);
    var max = Math.max.apply(null, values);
    var pad = 3;
    var span = (max - min) || 1;
    var d = values.map(function(v, i){
      var x = (i/(values.length-1))*(w-2*pad)+pad;
      var y = (1-((v-min)/span))*(h-2*pad)+pad;
      return (i===0? 'M':'L')+x.toFixed(2)+','+y.toFixed(2);
    }).join(' ');
    var path = svg.querySelector('path');
    if(!path){
      path = document.createElementNS('http://www.w3.org/2000/svg','path');
      svg.appendChild(path);
    }
    path.setAttribute('d', d);
    path.setAttribute('fill','none');
    path.setAttribute('stroke', pos ? 'rgba(52,211,153,.95)' : 'rgba(247,82,95,.95)');
    path.setAttribute('stroke-width','2');
    path.setAttribute('stroke-linecap','round');
  }

  function initSparks(root){
    qsa('svg[data-spark]', root).forEach(function(svg){
      var raw = (svg.getAttribute('data-values')||'').trim();
      var values = raw ? raw.split(',').map(function(x){ return parseFloat(x); }) : [];
      if(!values.length){
        var seed = hashToSeed(svg.getAttribute('data-spark')||'spark');
        var r = mulberry32(seed);
        var base = 100 + r()*20;
        for(var i=0;i<24;i++) values.push(base + (r()-0.5)*12 + i*(r()-0.5));
      }
      var pos = (svg.getAttribute('data-direction')||'pos') !== 'neg';
      drawSpark(svg, values, pos);
    });
  }

  // Allow other pages to request spark regeneration.
  document.addEventListener('chartpulse:refresh-sparks', function(){
    initSparks(document);
  });

  function computeOHLC(seed, count){
    var r = mulberry32(seed);
    var price = 100 + r()*40;
    var data = [];
    for(var i=0;i<count;i++){
      var drift = (r()-0.5) * 1.6;
      var open = price;
      var close = clamp(price + drift + (r()-0.5)*1.6, 1, 1000000);
      var high = Math.max(open, close) + r()*1.2;
      var low = Math.min(open, close) - r()*1.2;
      data.push({o:open, h:high, l:low, c:close});
      price = close;
    }
    return data;
  }

  function drawCandles(canvas, data, opts){
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    ctx.scale(dpr, dpr);

    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(10,16,32,.0)';
    ctx.fillRect(0,0,w,h);

    var padL = 44, padR = 14, padT = 12, padB = 18;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    if(plotW <= 10 || plotH <= 10) return;

    var min = Infinity, max = -Infinity;
    data.forEach(function(p){ min = Math.min(min, p.l); max = Math.max(max, p.h); });
    var span = (max-min) || 1;

    function yOf(v){ return padT + (1-((v-min)/span))*plotH; }

    // grid
    ctx.strokeStyle = 'rgba(148,163,184,.10)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    var gridN = 5;
    for(var i=0;i<=gridN;i++){
      var y = padT + (i/gridN)*plotH;
      ctx.moveTo(padL, y);
      ctx.lineTo(w-padR, y);
    }
    ctx.stroke();

    // y axis labels
    ctx.fillStyle = 'rgba(154,164,178,.85)';
    ctx.font = '11px Inter, ui-sans-serif, system-ui';
    for(var j=0;j<=gridN;j++){
      var vv = max - (j/gridN)*span;
      var yy = padT + (j/gridN)*plotH;
      ctx.fillText(vv.toFixed(2), 6, yy+4);
    }

    // candles
    var n = data.length;
    var gap = 2;
    var candleW = Math.max(4, Math.floor(plotW/n) - gap);
    var step = plotW/n;
    for(var k=0;k<n;k++){
      var p = data[k];
      var x = padL + k*step + (step-candleW)/2;
      var up = p.c >= p.o;
      var col = up ? 'rgba(52,211,153,.95)' : 'rgba(247,82,95,.95)';
      // wick
      ctx.strokeStyle = col;
      ctx.beginPath();
      ctx.moveTo(x + candleW/2, yOf(p.h));
      ctx.lineTo(x + candleW/2, yOf(p.l));
      ctx.stroke();
      // body
      var yO = yOf(p.o);
      var yC = yOf(p.c);
      var yTop = Math.min(yO, yC);
      var yBot = Math.max(yO, yC);
      var bh = Math.max(2, yBot - yTop);
      ctx.fillStyle = up ? 'rgba(52,211,153,.35)' : 'rgba(247,82,95,.35)';
      ctx.fillRect(x, yTop, candleW, bh);
      ctx.strokeStyle = col;
      ctx.strokeRect(x + 0.5, yTop + 0.5, candleW-1, bh-1);
    }

    // watermark
    ctx.fillStyle = 'rgba(229,231,235,.04)';
    ctx.font = '900 44px Inter, ui-sans-serif, system-ui';
    ctx.fillText(opts && opts.watermark ? opts.watermark : 'ChartPulse', padL+8, padT+56);
  }

  function initChartWorkspace(root){
    var wrap = qs('[data-chart-workspace]', root);
    if(!wrap) return;

    var canvas = qs('canvas[data-candles]', wrap);
    if(!canvas) return;

    var symEl = qs('[data-chart-symbol]', wrap);
    var tfEls = qsa('[data-timeframe]', wrap);
    var statusEl = qs('[data-chart-status]', wrap);

    function currentSymbol(){ return (symEl && symEl.textContent || 'AAPL').trim(); }
    function seedFor(sym, tf){ return hashToSeed(sym + '|' + tf); }

    function pointsFor(tf){
      switch(tf){
        case '1D': return 42;
        case '5D': return 70;
        case '1M': return 110;
        case '3M': return 170;
        case '6M': return 210;
        case 'YTD': return 230;
        case '1Y': return 260;
        case '5Y': return 360;
        case 'All': return 420;
        default: return 170;
      }
    }

    function render(tf){
      var sym = currentSymbol();
      var data = computeOHLC(seedFor(sym, tf), pointsFor(tf));
      drawCandles(canvas, data, { watermark: sym });
      if(statusEl) statusEl.textContent = 'Timeframe: ' + tf;
    }

    function setTf(tf){
      tfEls.forEach(function(b){ b.setAttribute('aria-selected', b.getAttribute('data-timeframe')===tf ? 'true':'false'); });
      render(tf);
    }

    tfEls.forEach(function(b){
      b.addEventListener('click', function(){ setTf(b.getAttribute('data-timeframe')); });
    });

    // Watchlist row click -> update symbol header + rerender
    qsa('[data-watch-symbol]', wrap).forEach(function(row){
      row.addEventListener('click', function(){
        var sym = row.getAttribute('data-watch-symbol');
        if(symEl) symEl.textContent = sym;
        // keep current TF
        var active = (tfEls.find(function(b){ return b.getAttribute('aria-selected')==='true'; }) || tfEls[0]);
        setTf(active.getAttribute('data-timeframe'));
      });
    });

    // initial
    var init = (tfEls.find(function(b){ return b.getAttribute('aria-selected')==='true'; }) || tfEls[0]);
    setTf(init.getAttribute('data-timeframe'));

    // responsive redraw
    var t;
    window.addEventListener('resize', function(){
      window.clearTimeout(t);
      t = window.setTimeout(function(){
        var active = (tfEls.find(function(b){ return b.getAttribute('aria-selected')==='true'; }) || tfEls[0]);
        render(active.getAttribute('data-timeframe'));
      }, 120);
    });
  }

  function init(){
    initTabs(document);
    initAccordions(document);
    initSparks(document);
    initChartWorkspace(document);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
