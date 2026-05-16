(function(){
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  // Mobile menu
  const menuBtn = qs('[data-menu-button]');
  const overlay = qs('#mobileNav');
  const closeBtn = qs('[data-menu-close]');

  function setMenu(open){
    if(!overlay) return;
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    if(menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';

    if(open){
      const first = qs('a, button, select, [tabindex]:not([tabindex="-1"])', overlay);
      if(first) first.focus();
    } else {
      if(menuBtn) menuBtn.focus();
    }
  }

  if(menuBtn && overlay){
    menuBtn.addEventListener('click', () => {
      const isOpen = overlay.getAttribute('aria-hidden') === 'false';
      setMenu(!isOpen);
    });
  }

  if(closeBtn){
    closeBtn.addEventListener('click', () => setMenu(false));
  }

  if(overlay){
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) setMenu(false);
    });

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false'){
        setMenu(false);
      }

      // basic focus trap
      if(e.key === 'Tab' && overlay.getAttribute('aria-hidden') === 'false'){
        const focusables = qsa('a, button, select, [tabindex]:not([tabindex="-1"])', overlay)
          .filter(el => !el.hasAttribute('disabled'));
        if(focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if(e.shiftKey && document.activeElement === first){
          e.preventDefault();
          last.focus();
        } else if(!e.shiftKey && document.activeElement === last){
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // Carousel controls
  const scroller = qs('[data-news-scroller]');
  const prevBtn = qs('[data-carousel-prev]');
  const nextBtn = qs('[data-carousel-next]');

  function getStep(){
    if(!scroller) return 0;
    const card = qs('.news-card', scroller);
    if(!card) return Math.max(280, Math.floor(scroller.clientWidth * 0.8));
    const styles = window.getComputedStyle(scroller);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function scrollByDir(dir){
    if(!scroller) return;
    scroller.scrollBy({ left: dir * getStep(), behavior: 'smooth' });
  }

  if(prevBtn) prevBtn.addEventListener('click', () => scrollByDir(-1));
  if(nextBtn) nextBtn.addEventListener('click', () => scrollByDir(1));

  // Optional: improve wheel scroll on desktop trackpads/mice
  if(scroller){
    scroller.addEventListener('wheel', (e) => {
      if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
        scroller.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });
  }
})();
