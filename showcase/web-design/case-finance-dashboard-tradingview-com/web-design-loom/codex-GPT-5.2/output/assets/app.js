(function(){
  function q(sel, root){ return (root||document).querySelector(sel); }
  function qa(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  function initTabs(scope){
    qa('[data-tabs]', scope).forEach(function(group){
      var buttons = qa('[data-tab]', group);
      var panels = qa('[data-tab-panel]', group);

      function setActive(key){
        buttons.forEach(function(btn){
          var on = btn.getAttribute('data-tab') === key;
          btn.setAttribute('aria-selected', on ? 'true' : 'false');
          btn.classList.toggle('active', on);
        });
        panels.forEach(function(p){
          var on = p.getAttribute('data-tab-panel') === key;
          p.hidden = !on;
        });
      }

      buttons.forEach(function(btn){
        btn.setAttribute('role','tab');
        btn.setAttribute('tabindex', btn.getAttribute('aria-selected')==='true' ? '0' : '-1');
        btn.addEventListener('click', function(){
          var key = btn.getAttribute('data-tab');
          setActive(key);
          buttons.forEach(function(b){ b.setAttribute('tabindex', b.getAttribute('aria-selected')==='true' ? '0' : '-1'); });
        });
        btn.addEventListener('keydown', function(e){
          if(e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
          e.preventDefault();
          var idx = buttons.indexOf(btn);
          var next = e.key==='ArrowRight' ? buttons[idx+1] : buttons[idx-1];
          if(!next) next = e.key==='ArrowRight' ? buttons[0] : buttons[buttons.length-1];
          next.focus();
        });
      });

      var selected = buttons.find(function(b){return b.getAttribute('aria-selected')==='true';});
      setActive(selected ? selected.getAttribute('data-tab') : (buttons[0] && buttons[0].getAttribute('data-tab')));
    });
  }

  function initAccordions(scope){
    qa('[data-accordion]', scope).forEach(function(acc){
      qa('[data-acc-item]', acc).forEach(function(item){
        var btn = q('[data-acc-btn]', item);
        if(!btn) return;
        btn.addEventListener('click', function(){
          var open = item.getAttribute('data-open') === 'true';
          item.setAttribute('data-open', open ? 'false' : 'true');
          btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        });
      });
    });
  }

  function initToggles(scope){
    qa('[data-toggle]', scope).forEach(function(btn){
      btn.addEventListener('click', function(){
        var target = btn.getAttribute('data-toggle');
        var el = q(target);
        if(!el) return;
        var hidden = el.hasAttribute('hidden');
        if(hidden) el.removeAttribute('hidden');
        else el.setAttribute('hidden','');
        btn.setAttribute('aria-pressed', hidden ? 'true' : 'false');
      });
    });
  }

  function drawSpark(canvas, points, color){
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);
    var min = Math.min.apply(null, points);
    var max = Math.max.apply(null, points);
    var pad = 2;
    function x(i){ return (i/(points.length-1))*(w-2*pad)+pad; }
    function y(v){
      if(max===min) return h/2;
      var t = (v-min)/(max-min);
      return (h-pad) - t*(h-2*pad);
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach(function(v,i){
      if(i===0) ctx.moveTo(x(i), y(v));
      else ctx.lineTo(x(i), y(v));
    });
    ctx.stroke();
    ctx.globalAlpha = .14;
    ctx.lineTo(x(points.length-1), h-pad);
    ctx.lineTo(x(0), h-pad);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function seededSeries(seed, n){
    var x = seed;
    function rnd(){ x = (x*1664525 + 1013904223) % 4294967296; return x/4294967296; }
    var v = 50 + rnd()*30;
    var out = [];
    for(var i=0;i<n;i++){
      v += (rnd()-.5)*8;
      out.push(v);
    }
    return out;
  }

  function initSparks(scope){
    qa('canvas[data-spark]', scope).forEach(function(c){
      var seed = parseInt(c.getAttribute('data-seed')||'1',10);
      var dir = c.getAttribute('data-dir')||'up';
      var points = seededSeries(seed, 18);
      var color = dir==='down' ? getComputedStyle(document.documentElement).getPropertyValue('--bad').trim() : getComputedStyle(document.documentElement).getPropertyValue('--good').trim();
      c.width = 84; c.height = 22;
      drawSpark(c, points, color);
    });
  }

  function initChart(){
    var canvas = q('#cpChart');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    function resize(){
      var rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(600, Math.floor(rect.width*window.devicePixelRatio));
      canvas.height = Math.max(320, Math.floor(rect.height*window.devicePixelRatio));
      draw();
    }
    function draw(){
      var w = canvas.width, h = canvas.height;
      ctx.clearRect(0,0,w,h);
      ctx.globalAlpha = 1;
      // simple candlesticks (illustrative only)
      var n = 60;
      var base = 260;
      var x = 1;
      function rnd(){ x = (x*1103515245 + 12345) % 2147483648; return x/2147483648; }
      var prices = [];
      var p = base;
      for(var i=0;i<n;i++){ p += (rnd()-.5)*3; prices.push(p); }
      var min = Math.min.apply(null, prices)-6;
      var max = Math.max.apply(null, prices)+6;
      function py(v){ return (h-12) - ((v-min)/(max-min))*(h-24); }
      var step = (w-30)/n;
      for(var i2=0;i2<n;i2++){
        var open = prices[i2-1] || prices[i2];
        var close = prices[i2];
        var hi = Math.max(open, close) + rnd()*4;
        var lo = Math.min(open, close) - rnd()*4;
        var up = close>=open;
        ctx.strokeStyle = up ? 'rgba(46,229,157,.9)' : 'rgba(247,82,95,.9)';
        ctx.fillStyle = up ? 'rgba(46,229,157,.35)' : 'rgba(247,82,95,.35)';
        var cx = 14 + i2*step;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, py(hi));
        ctx.lineTo(cx, py(lo));
        ctx.stroke();
        var top = py(Math.max(open, close));
        var bot = py(Math.min(open, close));
        var cw = Math.max(6, step*.55);
        ctx.fillRect(cx-cw/2, top, cw, Math.max(2, bot-top));
      }
      // last price marker
      var last = prices[prices.length-1];
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(41,98,255,.65)';
      ctx.setLineDash([6,6]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, py(last));
      ctx.lineTo(w, py(last));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    window.addEventListener('resize', resize);
    resize();
  }

  document.addEventListener('DOMContentLoaded', function(){
    initTabs(document);
    initAccordions(document);
    initToggles(document);
    initSparks(document);
    initChart();
  });
})();

