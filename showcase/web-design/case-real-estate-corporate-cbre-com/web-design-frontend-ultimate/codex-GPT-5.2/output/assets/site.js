(function(){
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  // Desktop mega menu: hover + click toggle
  const servicesBtn = qs('[data-mega-trigger="services"]');
  const mega = qs('[data-mega="services"]');
  let megaHoverTimer = null;

  function setMega(open){
    if (!servicesBtn || !mega) return;
    servicesBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    mega.dataset.open = open ? 'true' : 'false';
  }

  function closeMega(){ setMega(false); }
  function openMega(){ setMega(true); }

  if (servicesBtn && mega){
    servicesBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      const isOpen = servicesBtn.getAttribute('aria-expanded') === 'true';
      setMega(!isOpen);
    });

    servicesBtn.addEventListener('mouseenter', ()=>{
      clearTimeout(megaHoverTimer);
      megaHoverTimer = setTimeout(openMega, 60);
    });

    const wrap = servicesBtn.closest('.mega-wrap');
    if (wrap){
      wrap.addEventListener('mouseleave', ()=>{
        clearTimeout(megaHoverTimer);
        megaHoverTimer = setTimeout(closeMega, 110);
      });
    }

    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') closeMega();
    });

    document.addEventListener('click', (e)=>{
      const t = e.target;
      if (!wrap) return;
      if (wrap.contains(t)) return;
      closeMega();
    });
  }

  // Mobile sheet + accordion
  const mobileOpen = qs('[data-mobile-open]');
  const mobileClose = qs('[data-mobile-close]');
  const sheet = qs('[data-mobile-sheet]');

  function setSheet(open){
    if (!sheet) return;
    sheet.dataset.open = open ? 'true' : 'false';
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeMega();
  }

  if (mobileOpen && sheet){
    mobileOpen.addEventListener('click', ()=> setSheet(true));
  }
  if (mobileClose && sheet){
    mobileClose.addEventListener('click', ()=> setSheet(false));
  }
  if (sheet){
    sheet.addEventListener('click', (e)=>{
      if (e.target === sheet) setSheet(false);
    });
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') setSheet(false);
    });
  }

  qsa('[data-acc-btn]').forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.acc-item');
      if (!item) return;
      const open = item.dataset.open === 'true';
      // allow multiple sections open; feel free to close siblings if desired
      item.dataset.open = open ? 'false' : 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });

  // Homepage vertical tabs
  const tablist = qs('[data-tabs="whatwedo"]');
  if (tablist){
    const tabs = qsa('[role="tab"]', tablist);
    const panels = qsa('[role="tabpanel"]');

    function activate(id){
      tabs.forEach((t)=>{
        const selected = t.getAttribute('aria-controls') === id;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p)=>{
        const show = p.id === id;
        p.hidden = !show;
      });
    }

    tabs.forEach((t)=>{
      t.addEventListener('click', ()=> activate(t.getAttribute('aria-controls')));
      t.addEventListener('keydown', (e)=>{
        const idx = tabs.indexOf(t);
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight'){
          e.preventDefault();
          const next = tabs[(idx+1) % tabs.length];
          next.focus();
          activate(next.getAttribute('aria-controls'));
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft'){
          e.preventDefault();
          const prev = tabs[(idx-1 + tabs.length) % tabs.length];
          prev.focus();
          activate(prev.getAttribute('aria-controls'));
        }
      });
    });

    // default
    const selected = tabs.find(t=>t.getAttribute('aria-selected')==='true') || tabs[0];
    if (selected) activate(selected.getAttribute('aria-controls'));
  }

  // Simple carousel (Invest page)
  qsa('[data-carousel]').forEach((root)=>{
    const track = qs('[data-carousel-track]', root);
    const slides = qsa('[data-slide]', root);
    const prev = qs('[data-carousel-prev]', root);
    const next = qs('[data-carousel-next]', root);
    if (!track || slides.length === 0) return;
    let idx = 0;

    function render(){
      track.style.transform = `translateX(${-idx*100}%)`;
      if (prev) prev.disabled = idx === 0;
      if (next) next.disabled = idx === slides.length-1;
    }

    if (prev) prev.addEventListener('click', ()=>{ idx = Math.max(0, idx-1); render(); });
    if (next) next.addEventListener('click', ()=>{ idx = Math.min(slides.length-1, idx+1); render(); });
    render();
  });
})();
