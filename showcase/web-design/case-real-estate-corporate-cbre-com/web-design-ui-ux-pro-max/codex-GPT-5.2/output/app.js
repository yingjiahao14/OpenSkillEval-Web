(() => {
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  // ---- Header: mega menu (desktop) ----
  const servicesBtn = qs('[data-services-trigger]');
  const mega = qs('[data-mega]');

  const setMega = (open) => {
    if (!mega || !servicesBtn) return;
    mega.dataset.open = open ? 'true' : 'false';
    servicesBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  if (servicesBtn && mega) {
    let hoverCloseTimer;

    const openMega = () => {
      window.clearTimeout(hoverCloseTimer);
      setMega(true);
    };
    const closeMega = () => {
      window.clearTimeout(hoverCloseTimer);
      setMega(false);
    };
    const closeMegaSoon = () => {
      window.clearTimeout(hoverCloseTimer);
      hoverCloseTimer = window.setTimeout(() => setMega(false), 120);
    };

    servicesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = mega.dataset.open === 'true';
      setMega(!isOpen);
    });

    // Hover intent
    servicesBtn.addEventListener('mouseenter', openMega);
    mega.addEventListener('mouseenter', openMega);
    servicesBtn.addEventListener('mouseleave', closeMegaSoon);
    mega.addEventListener('mouseleave', closeMegaSoon);

    // Close on Escape / outside click
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMega();
    });
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!target) return;
      const inside = servicesBtn.contains(target) || mega.contains(target);
      if (!inside) closeMega();
    });
  }

  // ---- Mobile nav drawer + accordion ----
  const mobileOpen = qs('[data-mobile-open]');
  const mobileDrawer = qs('[data-mobile-drawer]');
  const mobileClose = qs('[data-mobile-close]');

  const setMobile = (open) => {
    if (!mobileDrawer || !mobileOpen) return;
    mobileDrawer.dataset.open = open ? 'true' : 'false';
    mobileOpen.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };

  if (mobileOpen && mobileDrawer) {
    mobileOpen.addEventListener('click', () => setMobile(true));
    if (mobileClose) mobileClose.addEventListener('click', () => setMobile(false));
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) setMobile(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMobile(false);
    });
  }

  qsa('[data-accordion-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('[data-accordion-item]');
      if (!item) return;
      const willOpen = item.dataset.open !== 'true';
      item.dataset.open = willOpen ? 'true' : 'false';
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  // ---- What We Do vertical tabs ----
  const tabRoot = qs('[data-tabs]');
  if (tabRoot) {
    const tabs = qsa('[role="tab"]', tabRoot);
    const panels = qsa('[role="tabpanel"]', tabRoot);
    const activate = (id) => {
      tabs.forEach((t) => {
        const selected = t.getAttribute('aria-controls') === id;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        const show = p.id === id;
        p.hidden = !show;
        if (show) {
          p.classList.remove('fade');
          // restart animation
          void p.offsetWidth;
          p.classList.add('fade');
        }
      });
    };

    tabs.forEach((t) => {
      t.addEventListener('click', () => activate(t.getAttribute('aria-controls')));
      t.addEventListener('keydown', (e) => {
        const idx = tabs.indexOf(t);
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const next = tabs[(idx + 1) % tabs.length];
          next.focus();
          activate(next.getAttribute('aria-controls'));
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
          prev.focus();
          activate(prev.getAttribute('aria-controls'));
        }
      });
    });

    // Initial state
    const selected = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
    if (selected) activate(selected.getAttribute('aria-controls'));
  }

  // ---- Simple carousel (Invest page) ----
  const car = qs('[data-carousel]');
  if (car) {
    const track = qs('[data-carousel-track]', car);
    const prev = qs('[data-carousel-prev]', car);
    const next = qs('[data-carousel-next]', car);
    const slides = track ? qsa('[data-carousel-slide]', track) : [];
    let index = 0;

    const go = (i) => {
      if (!track || slides.length === 0) return;
      index = (i + slides.length) % slides.length;
      const target = slides[index];
      track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
      slides.forEach((s, j) => s.setAttribute('aria-hidden', j === index ? 'false' : 'true'));
    };

    if (prev) prev.addEventListener('click', () => go(index - 1));
    if (next) next.addEventListener('click', () => go(index + 1));
    go(0);
  }
})();

