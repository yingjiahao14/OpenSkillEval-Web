const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

function setupTabs(scope=document){
  $$('.tabbar[data-tabs]', scope).forEach(tabbar=>{
    const key = tabbar.dataset.tabs;
    const tabs = $$('.tab', tabbar);
    const pages = $$(`[data-tab-content="${key}"]`, scope);
    tabs.forEach(tab=>tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const val = tab.dataset.tab;
      pages.forEach(p=>p.style.display = p.dataset.value===val ? '' : 'none');
    }));
    const active = $('.tab.active', tabbar) || tabs[0];
    if (active) active.click();
  });
}

function setupWatchAccordion(){
  $$('.watch-head').forEach(head=>{
    head.addEventListener('click', ()=> head.parentElement.classList.toggle('open'));
  });
}

function setupVideoToggle(){
  const t = $('#videoOnly'); if(!t) return;
  t.addEventListener('change', ()=>{
    $$('.idea-card').forEach(card=>{
      const isVideo = card.dataset.video === 'true';
      card.style.display = (!t.checked || isVideo) ? '' : 'none';
    });
  });
}

function drawSparks(){
  $$('.spark').forEach(svg=>{
    const up = svg.dataset.trend !== 'down';
    const pts = up ? '2,30 22,26 42,24 62,18 82,20 102,14 122,8' : '2,8 22,11 42,14 62,18 82,19 102,25 122,29';
    svg.innerHTML = `<polyline fill="none" stroke="${up?'#22c55e':'#f7525f'}" stroke-width="2" points="${pts}" />`;
  });
}

function drawCandles(){
  const svg = $('#candles'); if(!svg) return;
  const w = svg.clientWidth || 820; const h = svg.clientHeight || 360;
  let x = 16; let out='';
  for(let i=0;i<60;i++){
    const open = 140 + Math.sin(i/6)*38 + (Math.random()*18);
    const close = open + (Math.random()*24-12);
    const high = Math.max(open, close) + (Math.random()*12);
    const low = Math.min(open, close) - (Math.random()*12);
    const y = v => h - (v/250)*h;
    const up = close >= open;
    out += `<line x1="${x+4}" x2="${x+4}" y1="${y(high)}" y2="${y(low)}" stroke="${up?'#22c55e':'#f7525f'}"/>`;
    out += `<rect x="${x}" y="${y(Math.max(open,close))}" width="8" height="${Math.max(2, Math.abs(y(open)-y(close)))}" fill="${up?'#22c55e':'#f7525f'}"/>`;
    x += 12;
  }
  svg.innerHTML = out;
}

document.addEventListener('DOMContentLoaded', ()=>{
  setupTabs();
  setupWatchAccordion();
  setupVideoToggle();
  drawSparks();
  drawCandles();
});
