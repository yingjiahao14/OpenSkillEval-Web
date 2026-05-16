(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function on(el, evt, cb, opts) {
    if (!el) return;
    el.addEventListener(evt, cb, opts);
  }

  // Header mega menu (desktop)
  const servicesTrigger = qs('[data-mega-trigger="services"]');
  const mega = qs('#mega-services');

  function closeMega() {
    if (!mega) return;
    mega.classList.remove('open');
    servicesTrigger?.setAttribute('aria-expanded', 'false');
  }

  function openMega() {
    if (!mega) return;
    mega.classList.add('open');
    servicesTrigger?.setAttribute('aria-expanded', 'true');
  }

  function toggleMega(forceState) {
    if (!mega) return;
    const isOpen = mega.classList.contains('open');
    const nextOpen = typeof forceState === 'boolean' ? forceState : !isOpen;
    if (nextOpen) openMega();
    else closeMega();
  }

  on(servicesTrigger, 'click', (e) => {
    // Click toggles mega menu on desktop; on mobile the trigger is in drawer.
    if (window.matchMedia('(max-width: 820px)').matches) return;
    e.preventDefault();
    toggleMega();
  });

  // Hover open with small delay
  let hoverTimer = 0;
  function hoverOpen() {
    if (window.matchMedia('(max-width: 820px)').matches) return;
    window.clearTimeout(hoverTimer);
    hoverTimer = window.setTimeout(() => openMega(), 70);
  }
  function hoverClose() {
    if (window.matchMedia('(max-width: 820px)').matches) return;
    window.clearTimeout(hoverTimer);
    hoverTimer = window.setTimeout(() => closeMega(), 120);
  }

  on(servicesTrigger, 'mouseenter', hoverOpen);
  on(servicesTrigger?.parentElement, 'mouseleave', hoverClose);
  on(mega, 'mouseenter', () => window.clearTimeout(hoverTimer));
  on(mega, 'mouseleave', hoverClose);

  on(document, 'keydown', (e) => {
    if (e.key === 'Escape') {
      closeMega();
      closeMobile();
    }
  });

  on(document, 'click', (e) => {
    if (!mega || !mega.classList.contains('open')) return;
    const target = e.target;
    if (!(target instanceof Element)) return;
    const clickedInside = mega.contains(target) || servicesTrigger?.contains(target);
    if (!clickedInside) closeMega();
  });

  // Mobile drawer
  const hamburger = qs('[data-mobile-open]');
  const drawer = qs('#mobile-drawer');
  const drawerBackdrop = qs('[data-mobile-backdrop]');
  const drawerClose = qs('[data-mobile-close]');

  function openMobile() {
    if (!drawer) return;
    drawer.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    hamburger?.setAttribute('aria-expanded', 'true');
  }

  function closeMobile() {
    if (!drawer) return;
    drawer.classList.remove('open');
    document.documentElement.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
  }

  on(hamburger, 'click', () => {
    if (!drawer) return;
    const isOpen = drawer.classList.contains('open');
    if (isOpen) closeMobile();
    else openMobile();
  });
  on(drawerBackdrop, 'click', closeMobile);
  on(drawerClose, 'click', closeMobile);

  // Mobile accordion
  qsa('[data-acc-btn]').forEach((btn) => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = panelId ? qs('#' + panelId) : null;
    on(btn, 'click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      panel?.classList.toggle('open', !expanded);
    });
  });

  // What We Do vertical tabs (homepage)
  const tabsRoot = qs('[data-tabs]');
  if (tabsRoot) {
    const tabButtons = qsa('[role="tab"]', tabsRoot);
    const panels = qsa('[role="tabpanel"]', tabsRoot);

    function activateTab(nextId) {
      tabButtons.forEach((btn) => {
        const isSelected = btn.getAttribute('data-tab') === nextId;
        btn.setAttribute('aria-selected', String(isSelected));
        btn.tabIndex = isSelected ? 0 : -1;
      });
      panels.forEach((p) => {
        const isActive = p.getAttribute('data-panel') === nextId;
        p.hidden = !isActive;
        if (!prefersReducedMotion && isActive) {
          p.animate(
            [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0px)' }],
            { duration: 200, easing: 'cubic-bezier(.2,.8,.2,1)' }
          );
        }
      });
    }

    tabButtons.forEach((btn) => {
      on(btn, 'click', () => activateTab(btn.getAttribute('data-tab')));
      on(btn, 'keydown', (e) => {
        const idx = tabButtons.indexOf(btn);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          tabButtons[(idx + 1) % tabButtons.length].focus();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          tabButtons[(idx - 1 + tabButtons.length) % tabButtons.length].focus();
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateTab(btn.getAttribute('data-tab'));
        }
      });
    });
  }

  // Simple carousel (Invest page: featured partners)
  const carousel = qs('[data-carousel]');
  if (carousel) {
    const track = qs('[data-carousel-track]', carousel);
    const slides = track ? qsa('[data-slide]', track) : [];
    const prev = qs('[data-carousel-prev]', carousel);
    const next = qs('[data-carousel-next]', carousel);
    let idx = 0;

    function render() {
      slides.forEach((s, i) => {
        s.hidden = i !== idx;
        if (!prefersReducedMotion && i === idx) {
          s.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out' });
        }
      });
      prev?.toggleAttribute('disabled', idx === 0);
      next?.toggleAttribute('disabled', idx === slides.length - 1);
    }

    on(prev, 'click', () => {
      idx = Math.max(0, idx - 1);
      render();
    });
    on(next, 'click', () => {
      idx = Math.min(slides.length - 1, idx + 1);
      render();
    });

    render();
  }
})();

