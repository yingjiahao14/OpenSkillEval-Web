const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
function setActive(group,btn){$$(group).forEach(b=>b.classList.remove('active'));btn.classList.add('active')}
function initTabs(){
  $$('[data-tab-target]').forEach(btn=>btn.addEventListener('click',()=>{const target=btn.dataset.tabTarget;const group=btn.dataset.tabGroup;setActive(`[data-tab-group="${group}"]`,btn);$$(`[data-tab-panel][data-tab-group="${group}"]`).forEach(p=>p.classList.toggle('hidden',p.dataset.tabPanel!==target));}));
  $$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{setActive(`[data-filter-group="${btn.dataset.filterGroup}"]`,btn);const root=$(`#${btn.dataset.filterRoot}`)||document;const val=btn.dataset.filter;$$('[data-category]',root).forEach(el=>el.classList.toggle('hidden',val!=='all'&&!el.dataset.category.includes(val)));}));
}
function initWatchlist(){ $$('.accordion-btn').forEach(btn=>btn.addEventListener('click',()=>{const body=btn.nextElementSibling;const collapsed=body.classList.toggle('collapsed');btn.setAttribute('aria-expanded',String(!collapsed));btn.querySelector('span:last-child').textContent=collapsed?'+':'−'})); }
function initTimeframes(){ $$('[data-timeframe]').forEach(btn=>btn.addEventListener('click',()=>{setActive('[data-timeframe]',btn);const label=$('[data-range-label]'); if(label) label.textContent=`AAPL · ${btn.dataset.timeframe} range`; const chart=$('.candles'); if(chart){chart.style.filter=`hue-rotate(${btn.dataset.i||0}deg)`}})); }
function initIdeasVideo(){ const toggle=$('#videosOnly'); if(toggle) toggle.addEventListener('change',()=>document.body.classList.toggle('video-only',toggle.checked)); }
function initMarketNav(){ $$('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>{setActive('[data-scroll]',btn);const el=$(btn.dataset.scroll); if(el) el.scrollIntoView({behavior:'smooth',block:'start'});})); }
document.addEventListener('DOMContentLoaded',()=>{initTabs();initWatchlist();initTimeframes();initIdeasVideo();initMarketNav();});
