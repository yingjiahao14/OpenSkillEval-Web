(function(){
  const doc = document;

  function setAriaCurrent(){
    const path = (location.pathname.split('/').pop() || 'index.html');
    doc.querySelectorAll('[data-nav] a').forEach((a)=>{
      const href = a.getAttribute('href');
      if(!href) return;
      const normalized = href.replace(/^\.\//,'');
      const isCurrent = normalized === path;
      if(isCurrent) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
  }

  function initMobileMenu(){
    const openBtn = doc.querySelector('[data-menu-open]');
    const overlay = doc.querySelector('[data-overlay]');
    const closeBtn = doc.querySelector('[data-menu-close]');
    if(!openBtn || !overlay || !closeBtn) return;

    const focusableSel = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    let lastActive = null;

    function setOpen(isOpen){
      overlay.dataset.open = isOpen ? 'true' : 'false';
      openBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      overlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      doc.body.style.overflow = isOpen ? 'hidden' : '';

      if(isOpen){
        lastActive = doc.activeElement;
        const first = overlay.querySelector(focusableSel);
        if(first) first.focus();
      } else {
        if(lastActive && typeof lastActive.focus === 'function') lastActive.focus();
      }
    }

    function onKeydown(e){
      if(overlay.dataset.open !== 'true') return;
      if(e.key === 'Escape'){
        e.preventDefault();
        setOpen(false);
        return;
      }
      if(e.key !== 'Tab') return;

      const focusables = Array.from(overlay.querySelectorAll(focusableSel)).filter(el=>!el.hasAttribute('disabled'));
      if(focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length-1];
      const active = doc.activeElement;

      if(e.shiftKey && active === first){
        e.preventDefault();
        last.focus();
      } else if(!e.shiftKey && active === last){
        e.preventDefault();
        first.focus();
      }
    }

    openBtn.addEventListener('click', ()=> setOpen(true));
    closeBtn.addEventListener('click', ()=> setOpen(false));

    overlay.addEventListener('click', (e)=>{
      if(e.target && e.target.matches('[data-overlay]')) setOpen(false);
    });

    overlay.querySelectorAll('a').forEach((a)=>{
      a.addEventListener('click', ()=> setOpen(false));
    });

    doc.addEventListener('keydown', onKeydown);

    setOpen(false);
  }

  function duplicateMarqueeRow(track){
    // Duplicate content to make a seamless loop; requires width = max-content
    const row = track.querySelector('.marquee-row');
    if(!row) return;
    const clone = row.cloneNode(true);
    clone.setAttribute('aria-hidden','true');
    track.appendChild(clone);
  }

  function initMarquee(){
    doc.querySelectorAll('[data-marquee-track]').forEach((track)=>{
      duplicateMarqueeRow(track);
      // Optional: adjust duration based on content length (subtle)
      const itemCount = track.querySelectorAll('.item').length;
      const base = track.dataset.dir === 'right' ? 28 : 26;
      const dur = Math.max(18, Math.min(34, base + Math.round(itemCount/6)));
      track.style.setProperty('--dur', dur + 's');
    });
  }

  doc.addEventListener('DOMContentLoaded', ()=>{
    setAriaCurrent();
    initMobileMenu();
    initMarquee();
  });
})();
