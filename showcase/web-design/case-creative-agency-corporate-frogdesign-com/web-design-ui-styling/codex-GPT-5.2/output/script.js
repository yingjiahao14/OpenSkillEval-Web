(function(){
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function qs(sel, root=document){return root.querySelector(sel)}
  function qsa(sel, root=document){return Array.from(root.querySelectorAll(sel))}

  // Mobile nav
  const burger = qs('[data-burger]');
  const mobilePanel = qs('[data-mobile-panel]');
  if(burger && mobilePanel){
    burger.addEventListener('click', () => {
      const open = mobilePanel.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    qsa('a[href^="#"]', mobilePanel).forEach(a => {
      a.addEventListener('click', () => {
        mobilePanel.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
      })
    })
  }

  // Language dropdown
  const lang = qs('[data-lang-dropdown]');
  const langBtn = qs('[data-lang-trigger]');
  if(lang && langBtn){
    function closeLang(){lang.setAttribute('aria-expanded','false')}
    function toggleLang(){
      const isOpen = lang.getAttribute('aria-expanded') === 'true';
      lang.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    }
    langBtn.addEventListener('click', (e) => {e.stopPropagation(); toggleLang()});
    document.addEventListener('click', (e) => {
      if(!lang.contains(e.target)) closeLang();
    });
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeLang();
    });
    qsa('button[data-lang-option]', lang).forEach(btn => {
      btn.addEventListener('click', () => {
        const label = btn.getAttribute('data-lang-option');
        langBtn.querySelector('[data-lang-label]').textContent = label;
        closeLang();
      })
    })
  }

  // Generic carousel (track translate)
  function createCarousel(root){
    const track = qs('[data-track]', root);
    const slides = qsa('[data-slide]', root);
    const prev = qs('[data-prev]', root);
    const next = qs('[data-next]', root);
    const dots = qsa('[data-dot]', root);
    const viewport = qs('[data-viewport]', root);

    if(!track || slides.length === 0) return null;

    let index = 0;
    let autoTimer = null;

    function clampIndex(i){
      if(i < 0) return slides.length - 1;
      if(i >= slides.length) return 0;
      return i;
    }

    function render(newIndex){
      index = clampIndex(newIndex);
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
      root.setAttribute('data-index', String(index));
    }

    function nextSlide(){render(index + 1)}
    function prevSlide(){render(index - 1)}

    if(prev) prev.addEventListener('click', prevSlide);
    if(next) next.addEventListener('click', nextSlide);
    dots.forEach((d, i) => d.addEventListener('click', () => render(i)));

    // Keyboard
    root.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowLeft') prevSlide();
      if(e.key === 'ArrowRight') nextSlide();
    });

    // Touch swipe
    let startX = 0;
    let dragging = false;
    if(viewport){
      viewport.addEventListener('pointerdown', (e) => {
        dragging = true;
        startX = e.clientX;
        viewport.setPointerCapture(e.pointerId);
      });
      viewport.addEventListener('pointerup', (e) => {
        if(!dragging) return;
        dragging = false;
        const dx = e.clientX - startX;
        if(Math.abs(dx) > 40){
          if(dx < 0) nextSlide(); else prevSlide();
        }
      });
      viewport.addEventListener('pointercancel', () => {dragging = false});
    }

    // Autoplay for hero only (if attribute)
    const autoplayMs = Number(root.getAttribute('data-autoplay') || '0');
    function startAuto(){
      if(prefersReducedMotion) return;
      if(!autoplayMs) return;
      stopAuto();
      autoTimer = window.setInterval(nextSlide, autoplayMs);
    }
    function stopAuto(){
      if(autoTimer){
        window.clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    if(autoplayMs){
      root.addEventListener('mouseenter', stopAuto);
      root.addEventListener('mouseleave', startAuto);
      root.addEventListener('focusin', stopAuto);
      root.addEventListener('focusout', startAuto);
      startAuto();
    }

    render(0);

    return { render, next: nextSlide, prev: prevSlide, stopAuto, startAuto };
  }

  // Hero carousel
  const heroCarousel = qs('[data-carousel="hero"]');
  if(heroCarousel) createCarousel(heroCarousel);

  // Team region toggle + member carousel (horizontal scroll)
  const teamRoot = qs('[data-team]');
  if(teamRoot){
    const tabs = qsa('[data-region-tab]', teamRoot);
    const list = qs('[data-team-list]', teamRoot);

    function setRegion(region){
      tabs.forEach(t => t.setAttribute('aria-selected', t.getAttribute('data-region-tab') === region ? 'true' : 'false'));
      if(list){
        qsa('[data-team-card]', list).forEach(card => {
          const match = card.getAttribute('data-region') === region;
          card.style.display = match ? '' : 'none';
        });
        // scroll to start
        list.scrollTo({left:0, behavior: prefersReducedMotion ? 'auto' : 'smooth'});
      }
      teamRoot.setAttribute('data-region', region);
    }

    tabs.forEach(t => {
      t.addEventListener('click', () => setRegion(t.getAttribute('data-region-tab')));
    });

    const prev = qs('[data-team-prev]', teamRoot);
    const next = qs('[data-team-next]', teamRoot);
    function scrollByCard(dir){
      if(!list) return;
      const firstVisible = qsa('[data-team-card]', list).find(c => c.style.display !== 'none');
      const cardW = firstVisible ? firstVisible.getBoundingClientRect().width : 340;
      const gap = 14;
      list.scrollBy({left: dir * (cardW + gap), behavior: prefersReducedMotion ? 'auto' : 'smooth'});
    }
    if(prev) prev.addEventListener('click', () => scrollByCard(-1));
    if(next) next.addEventListener('click', () => scrollByCard(1));

    // default region
    setRegion('North America');
  }

  // Work carousel (horizontal scroll)
  const workRoot = qs('[data-work]');
  if(workRoot){
    const list = qs('[data-work-list]', workRoot);
    const prev = qs('[data-work-prev]', workRoot);
    const next = qs('[data-work-next]', workRoot);
    function scroll(dir){
      if(!list) return;
      const card = qs('[data-work-card]', list);
      const w = card ? card.getBoundingClientRect().width : 360;
      list.scrollBy({left: dir * (w + 14), behavior: prefersReducedMotion ? 'auto' : 'smooth'});
    }
    if(prev) prev.addEventListener('click', () => scroll(-1));
    if(next) next.addEventListener('click', () => scroll(1));
  }

  // Cookie consent banner + settings modal
  const cookie = qs('[data-cookie]');
  const modalBackdrop = qs('[data-cookie-backdrop]');
  const openSettings = qs('[data-cookie-open-settings]');
  const closeSettings = qs('[data-cookie-close-settings]');
  const saveSettings = qs('[data-cookie-save-settings]');
  const acceptAll = qs('[data-cookie-accept]');
  const declineAll = qs('[data-cookie-decline]');

  const STORAGE_KEY = 'leapstudio_cookie_consent_v1';

  function showCookie(){
    if(cookie) cookie.classList.add('show');
  }
  function hideCookie(){
    if(cookie) cookie.classList.remove('show');
  }
  function showModal(){
    if(modalBackdrop) modalBackdrop.classList.add('show');
    const modal = qs('[data-cookie-modal]');
    if(modal) modal.setAttribute('aria-hidden','false');
  }
  function hideModal(){
    if(modalBackdrop) modalBackdrop.classList.remove('show');
    const modal = qs('[data-cookie-modal]');
    if(modal) modal.setAttribute('aria-hidden','true');
  }
  function setConsent(value){
    try{localStorage.setItem(STORAGE_KEY, JSON.stringify(value));}catch(e){}
  }
  function getConsent(){
    try{const v=localStorage.getItem(STORAGE_KEY); return v? JSON.parse(v): null;}catch(e){return null}
  }

  if(cookie){
    const existing = getConsent();
    if(!existing) showCookie();

    if(acceptAll) acceptAll.addEventListener('click', () => {
      setConsent({ necessary:true, analytics:true, marketing:true, timestamp: Date.now() });
      hideCookie();
      hideModal();
    });
    if(declineAll) declineAll.addEventListener('click', () => {
      setConsent({ necessary:true, analytics:false, marketing:false, timestamp: Date.now() });
      hideCookie();
      hideModal();
    });
    if(openSettings) openSettings.addEventListener('click', () => {
      showModal();
    });
    if(closeSettings) closeSettings.addEventListener('click', hideModal);
    if(modalBackdrop) modalBackdrop.addEventListener('click', hideModal);
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') hideModal(); });

    // toggles in modal
    const toggles = qsa('[data-consent-toggle]');
    function syncFrom(consent){
      toggles.forEach(t => {
        const k = t.getAttribute('data-consent-toggle');
        const sw = qs('[data-switch]', t);
        const on = consent && consent[k] === true;
        if(sw) sw.setAttribute('aria-checked', on ? 'true' : 'false');
      })
    }
    const current = getConsent();
    syncFrom(current || {analytics:false, marketing:false});

    toggles.forEach(t => {
      const k = t.getAttribute('data-consent-toggle');
      const sw = qs('[data-switch]', t);
      if(!sw) return;
      sw.addEventListener('click', () => {
        const on = sw.getAttribute('aria-checked') === 'true';
        sw.setAttribute('aria-checked', on ? 'false' : 'true');
      })
    })

    if(saveSettings) saveSettings.addEventListener('click', () => {
      const consent = { necessary:true, timestamp: Date.now() };
      toggles.forEach(t => {
        const k = t.getAttribute('data-consent-toggle');
        const sw = qs('[data-switch]', t);
        consent[k] = (sw && sw.getAttribute('aria-checked') === 'true') ? true : false;
      });
      setConsent(consent);
      hideCookie();
      hideModal();
    });

    // footer cookie settings link
    const footerCookieSettings = qsa('[data-open-cookie-settings]');
    footerCookieSettings.forEach(a => a.addEventListener('click', (e) => {
      e.preventDefault();
      showCookie();
      showModal();
    }));
  }

  // Smooth anchor scroll
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const target = qs(href);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior: prefersReducedMotion ? 'auto' : 'smooth', block:'start'});
    });
  });
})();
