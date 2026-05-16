(function(){
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root=document) => root.querySelector(sel);

  function setActive(list, activeEl){
    list.forEach(el => el.setAttribute('aria-selected', el === activeEl ? 'true' : 'false'));
  }

  function initTabs(){
    $$('[data-tabs]').forEach(group => {
      const btns = $$('[data-tab]', group);
      const panels = $$('[data-panel]', group);
      const name = group.getAttribute('data-tabs');

      function activate(id){
        btns.forEach(b => b.setAttribute('aria-selected', b.getAttribute('data-tab') === id ? 'true' : 'false'));
        panels.forEach(p => {
          const show = p.getAttribute('data-panel') === id;
          p.hidden = !show;
        });
        if(name){
          try{ localStorage.setItem('tabs:'+name, id); }catch(e){}
        }
      }

      const stored = name ? (function(){ try{return localStorage.getItem('tabs:'+name);}catch(e){return null;} })() : null;
      const start = stored && btns.some(b => b.getAttribute('data-tab')===stored) ? stored : (btns[0] && btns[0].getAttribute('data-tab'));
      if(start) activate(start);

      btns.forEach(b => b.addEventListener('click', () => activate(b.getAttribute('data-tab'))));
    });
  }

  function initAccordion(){
    $$('[data-accordion]').forEach(root => {
      $$('[data-acc-btn]', root).forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-acc-btn');
          const panel = root.querySelector(`[data-acc-panel="${id}"]`);
          const expanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          if(panel) panel.hidden = expanded;
        });
      });
    });
  }

  function initTimeframes(){
    const root = $('[data-timeframes]');
    if(!root) return;
    const btns = $$('[data-tf]', root);
    const label = $('[data-chart-range]');
    const note = $('[data-chart-note]');

    function activate(tf){
      btns.forEach(b => b.setAttribute('aria-selected', b.getAttribute('data-tf')===tf ? 'true':'false'));
      if(label) label.textContent = tf;
      if(note) note.textContent = tf === '1D' ? 'Intraday candles (simulated)' : `Historical candles (${tf}) (simulated)`;
      try{ localStorage.setItem('chart:tf', tf); }catch(e){}
      // redraw mini-candles (simple visual variation)
      const canvas = document.getElementById('cp-canvas');
      if(canvas) drawCandles(canvas, tf);
    }

    const stored = (function(){ try{return localStorage.getItem('chart:tf');}catch(e){return null;} })();
    const start = stored && btns.some(b => b.getAttribute('data-tf')===stored) ? stored : '1D';
    activate(start);
    btns.forEach(b => b.addEventListener('click', () => activate(b.getAttribute('data-tf'))));
  }

  function drawCandles(canvas, tf){
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.clientWidth * devicePixelRatio;
    const h = canvas.height = canvas.clientHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const W = canvas.clientWidth, H = canvas.clientHeight;

    // background grid
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    for(let x=0; x<W; x+=80){ ctx.fillRect(x,0,1,H); }
    for(let y=0; y<H; y+=60){ ctx.fillRect(0,y,W,1); }

    // deterministic-ish seed by timeframe
    const seed = Array.from(tf).reduce((a,c)=>a+c.charCodeAt(0), 0);
    let r = seed;
    const rand = () => (r = (r*9301 + 49297) % 233280) / 233280;

    const candles = 80;
    const pad = 16;
    const cw = (W - pad*2) / candles;

    let price = 260 + (rand()-0.5)*6;
    const minP = price - 18, maxP = price + 18;

    function y(p){
      return pad + (maxP - p) / (maxP - minP) * (H - pad*2);
    }

    for(let i=0;i<candles;i++){
      const o = price;
      const drift = (rand()-0.5) * (tf==='1D'?2.6: (tf==='5D'?2.2:1.6));
      const c = o + drift;
      const hi = Math.max(o,c) + rand()*2.2;
      const lo = Math.min(o,c) - rand()*2.2;
      price = c;

      const x = pad + i*cw + cw*0.2;
      const bw = cw*0.6;
      const up = c>=o;
      ctx.strokeStyle = up ? 'rgba(77, 232, 153, 0.85)' : 'rgba(247, 82, 95, 0.85)';
      ctx.fillStyle = up ? 'rgba(77, 232, 153, 0.25)' : 'rgba(247, 82, 95, 0.25)';
      ctx.lineWidth = 1;

      // wick
      ctx.beginPath();
      ctx.moveTo(x + bw/2, y(hi));
      ctx.lineTo(x + bw/2, y(lo));
      ctx.stroke();

      // body
      const y1 = y(o), y2 = y(c);
      const top = Math.min(y1,y2);
      const height = Math.max(2, Math.abs(y2-y1));
      ctx.fillRect(x, top, bw, height);
      ctx.strokeRect(x, top, bw, height);
    }

    // overlay label
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(10,10,210,28);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace';
    ctx.fillText(`AAPL · Candles · ${tf}`, 18, 29);
  }

  function initCanvas(){
    const canvas = document.getElementById('cp-canvas');
    if(!canvas) return;
    const tf = (function(){ try{return localStorage.getItem('chart:tf')||'1D';}catch(e){return '1D';} })();
    drawCandles(canvas, tf);
    window.addEventListener('resize', () => drawCandles(canvas, (function(){ try{return localStorage.getItem('chart:tf')||'1D';}catch(e){return '1D';} })()));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initAccordion();
    initTimeframes();
    initCanvas();
    // mark active nav
    const path = location.pathname.split('/').pop() || 'index.html';
    $$('a[data-nav]').forEach(a => {
      if(a.getAttribute('href') === path){ a.setAttribute('aria-current', 'page'); }
    });
  });
})();
