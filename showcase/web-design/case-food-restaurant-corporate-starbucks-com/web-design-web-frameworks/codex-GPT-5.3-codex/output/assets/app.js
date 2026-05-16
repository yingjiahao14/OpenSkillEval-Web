(function(){
  const cookie = document.querySelector('[data-cookie]');
  const agree = document.querySelector('[data-cookie-agree]');
  if (cookie && agree) agree.addEventListener('click', ()=> cookie.classList.add('hidden'));

  document.querySelectorAll('[data-accordion]').forEach(col=>{
    const btn = col.querySelector('.mobile-accordion-toggle');
    if (!btn) return;
    btn.addEventListener('click', ()=> col.classList.toggle('open'));
  });

  const tabBtns = document.querySelectorAll('[data-tab-btn]');
  if (tabBtns.length) {
    tabBtns.forEach(btn=>btn.addEventListener('click', ()=>{
      const key = btn.dataset.tabBtn;
      document.querySelectorAll('[data-tab-btn]').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('[data-tab-panel]').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.querySelector(`[data-tab-panel="${key}"]`);
      if (panel) panel.classList.add('active');
    }));
  }

  document.querySelectorAll('[data-carousel]').forEach(car=>{
    const track = car.querySelector('.track');
    const slides = car.querySelectorAll('.slide');
    const prev = car.querySelector('.prev');
    const next = car.querySelector('.next');
    let index = 0;
    const visible = () => Math.max(1, Math.floor(car.querySelector('.track-wrap').offsetWidth / 234));
    const update = () => {
      const max = Math.max(0, slides.length - visible());
      index = Math.max(0, Math.min(index, max));
      track.style.transform = `translateX(${-index*234}px)`;
    };
    prev && prev.addEventListener('click', ()=>{ index -= 1; update(); });
    next && next.addEventListener('click', ()=>{ index += 1; update(); });
    window.addEventListener('resize', update);
    update();
  });

  const search = document.querySelector('[data-store-search]');
  if (search) {
    const suggestions = document.querySelector('[data-suggestions]');
    const mapText = document.querySelector('[data-map-text]');
    const results = document.querySelector('[data-results]');
    const places = ['Seattle, WA', 'Portland, OR', 'Denver, CO', 'Austin, TX', 'Chicago, IL'];
    const render = (q='') => {
      const filtered = places.filter(p=>p.toLowerCase().includes(q.toLowerCase()));
      suggestions.innerHTML = filtered.map(p=>`<div class="suggestion">${p}</div>`).join('');
      results.innerHTML = filtered.map((p,i)=>`<div class="card" style="margin-bottom:8px"><strong>${p}</strong><p style="margin:.3rem 0;color:#666">${(i+1)*0.6} mi · Open until 9:00 PM</p></div>`).join('') || '<p>No stores found.</p>';
      mapText.textContent = filtered.length ? `Showing ${filtered.length} stores near ${filtered[0]}` : 'No matching map results';
      suggestions.querySelectorAll('.suggestion').forEach(el=>el.addEventListener('click', ()=>{ search.value = el.textContent; render(el.textContent); }));
    };
    search.addEventListener('input', e=>render(e.target.value));
    render('');

    const filterBtn = document.querySelector('[data-filter-btn]');
    const filterPanel = document.querySelector('[data-filter-panel]');
    filterBtn && filterBtn.addEventListener('click', ()=> filterPanel.classList.toggle('open'));

    const orderBtns = document.querySelectorAll('[data-order-type]');
    orderBtns.forEach(btn=>btn.addEventListener('click', ()=>{
      orderBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.orderType;
      const marker = type === 'delivery' ? 'Delivery-ready stores highlighted' : 'Pickup-ready stores highlighted';
      mapText.textContent = marker;
    }));
  }
})();
