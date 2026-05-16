(() => {
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  // -----------------------------
  // Header: services mega menu (desktop)
  // -----------------------------
  const megaToggle = qs('[data-mega-toggle]');
  const mega = qs('[data-mega]');
  const header = qs('[data-header]');

  const setMega = (open) => {
    if (!megaToggle || !mega) return;
    mega.classList.toggle('open', open);
    megaToggle.setAttribute('aria-expanded', String(open));
  };

  if (megaToggle && mega) {
    const openMega = () => setMega(true);
    const closeMega = () => setMega(false);

    megaToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = mega.classList.contains('open');
      setMega(!isOpen);
    });

    // Hover intent: open on mouse enter, close when leaving header region
    const supportsHover = window.matchMedia('(hover:hover)').matches;
    if (supportsHover) {
      megaToggle.addEventListener('mouseenter', openMega);
      mega.addEventListener('mouseenter', openMega);
      const closeIfOutside = (ev) => {
        const toEl = ev.relatedTarget;
        if (!toEl) return closeMega();
        if (header && header.contains(toEl)) return;
        closeMega();
      };
      megaToggle.addEventListener('mouseleave', closeIfOutside);
      mega.addEventListener('mouseleave', closeIfOutside);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMega();
    });

    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!t) return;
      if (mega.contains(t) || megaToggle.contains(t)) return;
      closeMega();
    });
  }

  // -----------------------------
  // Mobile nav drawer + accordion
  // -----------------------------
  const drawerBtn = qs('[data-drawer-open]');
  const drawer = qs('[data-drawer]');
  const overlay = qs('[data-drawer-overlay]');
  const drawerClose = qs('[data-drawer-close]');

  const setDrawer = (open) => {
    if (!drawer || !overlay || !drawerBtn) return;
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    drawerBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      drawer.setAttribute('aria-hidden', 'false');
      const first = qs('button, a, input, [tabindex]:not([tabindex="-1"])', drawer);
      first?.focus?.();
      document.body.style.overflow = 'hidden';
    } else {
      drawer.setAttribute('aria-hidden', 'true');
      drawerBtn.focus?.();
      document.body.style.overflow = '';
    }
  };

  if (drawerBtn && drawer && overlay) {
    drawerBtn.addEventListener('click', () => setDrawer(true));
    overlay.addEventListener('click', () => setDrawer(false));
    drawerClose?.addEventListener('click', () => setDrawer(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setDrawer(false);
    });
  }

  qsa('[data-acc-btn]').forEach((btn) => {
    const panel = qs(`#${btn.getAttribute('aria-controls')}`);
    if (!panel) return;
    const setOpen = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      } else {
        panel.style.maxHeight = '0px';
      }
    };
    setOpen(false);
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });
  });

  // -----------------------------
  // Home: "What we do" vertical tabs
  // -----------------------------
  const tablist = qs('[data-tablist]');
  if (tablist) {
    const tabs = qsa('[role="tab"]', tablist);
    const panels = qsa('[role="tabpanel"]');

    const activate = (id) => {
      tabs.forEach((t) => {
        const selected = t.getAttribute('aria-controls') === id;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        const show = p.id === id;
        p.hidden = !show;
      });
    };

    const active = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    activate(active?.getAttribute('aria-controls') || panels[0]?.id);

    tabs.forEach((t) => {
      t.addEventListener('click', () => activate(t.getAttribute('aria-controls')));
      t.addEventListener('keydown', (e) => {
        const idx = tabs.indexOf(t);
        let next = idx;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
        if (next !== idx) {
          e.preventDefault();
          tabs[next].focus();
          activate(tabs[next].getAttribute('aria-controls'));
        }
      });
    });
  }

  // -----------------------------
  // Invest page: featured partners carousel
  // -----------------------------
  const carousel = qs('[data-carousel]');
  if (carousel) {
    const track = qs('[data-carousel-track]', carousel);
    const slides = qsa('[data-slide]', carousel);
    const prev = qs('[data-carousel-prev]', carousel);
    const next = qs('[data-carousel-next]', carousel);
    const status = qs('[data-carousel-status]', carousel);
    let index = 0;

    const render = () => {
      if (!track) return;
      track.style.transform = `translateX(${-index * 100}%)`;
      status && (status.textContent = `Slide ${index + 1} of ${slides.length}`);
      prev && (prev.disabled = index === 0);
      next && (next.disabled = index === slides.length - 1);
    };

    prev?.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      render();
    });
    next?.addEventListener('click', () => {
      index = Math.min(slides.length - 1, index + 1);
      render();
    });

    render();
  }

  // -----------------------------
  // Newsletter: basic behavior
  // -----------------------------
  qsa('[data-newsletter-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = qs('input[type="email"]', form)?.value?.trim();
      const out = qs('[data-newsletter-output]', form);
      if (!out) return;
      if (!email) {
        out.textContent = 'Please enter an email address.';
        return;
      }
      out.textContent = 'Thanks — subscription request received.';
      form.reset();
    });
  });
})();

