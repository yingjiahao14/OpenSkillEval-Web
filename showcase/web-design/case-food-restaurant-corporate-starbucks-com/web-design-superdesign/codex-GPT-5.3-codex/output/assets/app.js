const qs = (s,p=document)=>p.querySelector(s);
const qsa = (s,p=document)=>[...p.querySelectorAll(s)];

document.addEventListener('DOMContentLoaded', () => {
  const cookie = qs('#cookieBanner');
  const agree = qs('#cookieAgree');
  if (agree && cookie) agree.addEventListener('click', () => cookie.classList.add('hidden'));

  qsa('.footer-group').forEach(group => {
    const btn = qs('.mobile-acc-btn', group);
    if (btn) btn.addEventListener('click', () => group.classList.toggle('open'));
  });

  qsa('[data-tabs]').forEach(tabRoot => {
    const buttons = qsa('[data-tab]', tabRoot);
    const panels = qsa('[data-panel]', tabRoot);
    buttons.forEach(btn => btn.addEventListener('click', () => {
      const id = btn.dataset.tab;
      buttons.forEach(b => b.classList.toggle('active', b===btn));
      panels.forEach(p => p.classList.toggle('active', p.dataset.panel===id));
    }));
  });

  qsa('[data-carousel]').forEach(car => {
    const track = qs('.carousel-track', car);
    const slides = qsa('.slide', car);
    if (!track || !slides.length) return;
    let index = 0;
    const redraw = () => track.style.transform = `translateX(-${index*100}%)`;
    const next = qs('[data-next]', car);
    const prev = qs('[data-prev]', car);
    next && next.addEventListener('click', () => { index = (index+1)%slides.length; redraw(); });
    prev && prev.addEventListener('click', () => { index = (index-1+slides.length)%slides.length; redraw(); });
  });

  const input = qs('#storeSearch');
  const suggestions = qs('#searchSuggestions');
  const list = [
    'Seattle, WA','Portland, OR','San Diego, CA','Austin, TX','Chicago, IL'
  ];
  if (input && suggestions) {
    input.addEventListener('input', () => {
      const v = input.value.trim().toLowerCase();
      if (!v) { suggestions.classList.remove('show'); suggestions.innerHTML=''; return; }
      const matches = list.filter(i=>i.toLowerCase().includes(v)).slice(0,5);
      suggestions.innerHTML = matches.map(m=>`<div class="suggestion">${m}</div>`).join('');
      suggestions.classList.toggle('show', matches.length>0);
      const results = qs('#resultsTitle');
      if (results) results.textContent = `Showing stores near "${input.value}"`;
    });
    suggestions.addEventListener('click', (e)=>{
      const item = e.target.closest('.suggestion');
      if (!item) return;
      input.value = item.textContent;
      suggestions.classList.remove('show');
    });
  }

  const filterBtn = qs('#filterBtn');
  const filterPanel = qs('#filterPanel');
  if (filterBtn && filterPanel) filterBtn.addEventListener('click', ()=>filterPanel.toggleAttribute('hidden'));

  const orderToggle = qs('#orderToggle');
  if (orderToggle) {
    qsa('button', orderToggle).forEach(btn => btn.addEventListener('click', ()=>{
      qsa('button', orderToggle).forEach(b=>b.classList.toggle('active', b===btn));
      const mode = btn.dataset.mode;
      const badge = qs('#orderTypeBadge');
      if (badge) badge.textContent = mode;
    }));
  }
});
