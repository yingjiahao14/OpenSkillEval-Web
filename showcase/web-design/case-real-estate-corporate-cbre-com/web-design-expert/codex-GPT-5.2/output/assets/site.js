/* GlobalStone — shared interactions (no dependencies) */

(function(){
  const qs = (sel, el=document) => el.querySelector(sel);
  const qsa = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  function setAriaExpanded(el, value){
    if(!el) return;
    el.setAttribute('aria-expanded', value ? 'true' : 'false');
  }

  // Mega menu (desktop)
  const header = qs('[data-site-header]');
  const mega = qs('[data-mega]');
  const megaTrigger = qs('[data-mega-trigger]');

  let megaOpen = false;
  let megaCloseTimer = null;

  function openMega(){
    if(!mega || !megaTrigger) return;
    megaOpen = true;
    mega.dataset.open = 'true';
    setAriaExpanded(megaTrigger, true);
  }

  function closeMega(){
    if(!mega || !megaTrigger) return;
    megaOpen = false;
    mega.dataset.open = 'false';
    setAriaExpanded(megaTrigger, false);
  }

  function scheduleCloseMega(){
    clearTimeout(megaCloseTimer);
    megaCloseTimer = setTimeout(() => closeMega(), 120);
  }

  function cancelCloseMega(){
    clearTimeout(megaCloseTimer);
  }

  if(megaTrigger && mega){
    mega.dataset.open = 'false';
    setAriaExpanded(megaTrigger, false);

    // Hover intent
    megaTrigger.addEventListener('mouseenter', () => { cancelCloseMega(); openMega(); });
    megaTrigger.addEventListener('mouseleave', () => scheduleCloseMega());
    mega.addEventListener('mouseenter', () => cancelCloseMega());
    mega.addEventListener('mouseleave', () => scheduleCloseMega());

    // Click toggle
    megaTrigger.addEventListener('click', (e) => {
      // On desktop only; if mobile nav open, let accordion handle.
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if(!isDesktop) return;
      e.preventDefault();
      megaOpen ? closeMega() : openMega();
    });

    // Escape closes
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeMega();
    });

    // Click outside closes
    document.addEventListener('pointerdown', (e) => {
      if(!megaOpen) return;
      const t = e.target;
      if(mega.contains(t) || megaTrigger.contains(t)) return;
      closeMega();
    });

    // Resize: ensure closed when switching modes
    window.addEventListener('resize', () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if(!isDesktop) closeMega();
    });
  }

  // Mobile nav toggle
  const mobileToggle = qs('[data-mobile-toggle]');
  const mobilePanel = qs('[data-mobile-panel]');

  function openMobile(){
    if(!mobileToggle || !mobilePanel) return;
    mobilePanel.dataset.open = 'true';
    setAriaExpanded(mobileToggle, true);
    closeMega();
  }
  function closeMobile(){
    if(!mobileToggle || !mobilePanel) return;
    mobilePanel.dataset.open = 'false';
    setAriaExpanded(mobileToggle, false);
  }

  if(mobileToggle && mobilePanel){
    mobilePanel.dataset.open = 'false';
    setAriaExpanded(mobileToggle, false);

    mobileToggle.addEventListener('click', () => {
      const open = mobilePanel.dataset.open === 'true';
      open ? closeMobile() : openMobile();
    });

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeMobile();
    });
  }

  // Mobile accordions
  qsa('[data-acc]')
    .forEach((acc) => {
      const btn = qs('[data-acc-btn]', acc);
      const panel = qs('[data-acc-panel]', acc);
      if(!btn || !panel) return;
      panel.dataset.open = 'false';
      setAriaExpanded(btn, false);

      btn.addEventListener('click', () => {
        const open = panel.dataset.open === 'true';
        panel.dataset.open = open ? 'false' : 'true';
        setAriaExpanded(btn, !open);
      });
    });

  // What we do tabs (home)
  const tabRoot = qs('[data-tabs]');
  if(tabRoot){
    const tabButtons = qsa('[role="tab"]', tabRoot);
    const panels = qsa('[role="tabpanel"]', tabRoot);

    function activateTab(id){
      tabButtons.forEach((btn) => {
        const selected = btn.getAttribute('aria-controls') === id;
        btn.setAttribute('aria-selected', selected ? 'true' : 'false');
        btn.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        const show = p.id === id;
        p.hidden = !show;
      });
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => activateTab(btn.getAttribute('aria-controls')));
      btn.addEventListener('keydown', (e) => {
        const idx = tabButtons.indexOf(btn);
        if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){
          e.preventDefault();
          const next = tabButtons[(idx + 1) % tabButtons.length];
          next.focus();
          activateTab(next.getAttribute('aria-controls'));
        }
        if(e.key === 'ArrowUp' || e.key === 'ArrowLeft'){
          e.preventDefault();
          const prev = tabButtons[(idx - 1 + tabButtons.length) % tabButtons.length];
          prev.focus();
          activateTab(prev.getAttribute('aria-controls'));
        }
      });
    });

    // Default active
    const selected = tabButtons.find(b => b.getAttribute('aria-selected') === 'true') || tabButtons[0];
    if(selected) activateTab(selected.getAttribute('aria-controls'));
  }

  // Newsletter subscribe (home)
  const subscribeBtn = qs('[data-newsletter-subscribe]');
  if(subscribeBtn){
    subscribeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // For this static site, use a lightweight placeholder.
      alert('Thanks — subscription flow placeholder.');
    });
  }

  // Simple carousel (Invest page)
  const carousel = qs('[data-carousel]');
  if(carousel){
    const track = qs('[data-carousel-track]', carousel);
    const slides = qsa('[data-carousel-slide]', carousel);
    const prev = qs('[data-carousel-prev]', carousel);
    const next = qs('[data-carousel-next]', carousel);
    const dots = qsa('[data-carousel-dot]', carousel);

    let index = 0;
    function update(){
      if(!track) return;
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
      if(prev) prev.disabled = index === 0;
      if(next) next.disabled = index === slides.length - 1;
    }

    function goTo(i){
      index = Math.max(0, Math.min(slides.length - 1, i));
      update();
    }

    if(prev) prev.addEventListener('click', () => goTo(index - 1));
    if(next) next.addEventListener('click', () => goTo(index + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    update();
  }
})();
