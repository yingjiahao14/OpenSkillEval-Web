(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function setExpanded(el, expanded) {
    el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  // Desktop mega menu
  const servicesTrigger = $('#servicesTrigger');
  const servicesWrap = $('#servicesWrap');
  let megaCloseTimer = null;

  function openMega() {
    if (!servicesWrap) return;
    servicesWrap.dataset.open = 'true';
    if (servicesTrigger) setExpanded(servicesTrigger, true);
  }

  function closeMega() {
    if (!servicesWrap) return;
    servicesWrap.dataset.open = 'false';
    if (servicesTrigger) setExpanded(servicesTrigger, false);
  }

  function scheduleCloseMega() {
    if (megaCloseTimer) window.clearTimeout(megaCloseTimer);
    megaCloseTimer = window.setTimeout(() => closeMega(), 120);
  }

  function cancelCloseMega() {
    if (megaCloseTimer) window.clearTimeout(megaCloseTimer);
    megaCloseTimer = null;
  }

  if (servicesTrigger && servicesWrap) {
    servicesTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const open = servicesWrap.dataset.open === 'true';
      if (open) closeMega();
      else openMega();
    });

    servicesWrap.addEventListener('mouseenter', () => {
      cancelCloseMega();
      openMega();
    });
    servicesWrap.addEventListener('mouseleave', () => scheduleCloseMega());
    servicesTrigger.addEventListener('mouseenter', () => {
      cancelCloseMega();
      openMega();
    });
    servicesTrigger.addEventListener('mouseleave', () => scheduleCloseMega());

    document.addEventListener('click', (e) => {
      if (!servicesWrap.contains(e.target)) closeMega();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMega();
    });
  }

  // Mobile drawer + accordion
  const drawer = $('#mobileDrawer');
  const openBtn = $('#mobileOpen');
  const closeBtn = $('#mobileClose');

  function openDrawer() {
    if (!drawer) return;
    drawer.dataset.open = 'true';
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.dataset.open = 'false';
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) closeDrawer();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  $$('.drawer-accordion').forEach((acc) => {
    const btn = $('.acc-btn', acc);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = acc.dataset.open === 'true';
      acc.dataset.open = open ? 'false' : 'true';
      setExpanded(btn, !open);
    });
  });

  // Homepage: What We Do tabs
  const tabRoot = $('#whatWeDo');
  if (tabRoot) {
    const tabs = $$('.tab', tabRoot);
    const panels = $$('.tabpanel', tabRoot);

    function activate(id) {
      tabs.forEach((t) => {
        const selected = t.dataset.tab === id;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        const show = p.dataset.panel === id;
        p.hidden = !show;
      });
    }

    tabs.forEach((t) => {
      t.addEventListener('click', () => activate(t.dataset.tab));
      t.addEventListener('keydown', (e) => {
        const i = tabs.indexOf(t);
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const n = tabs[(i + 1) % tabs.length];
          n.focus();
          activate(n.dataset.tab);
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const p = tabs[(i - 1 + tabs.length) % tabs.length];
          p.focus();
          activate(p.dataset.tab);
        }
      });
    });

    activate(tabs[0]?.dataset.tab || 'insights');
  }

  // Invest page carousel
  const carousel = $('#partnerCarousel');
  if (carousel) {
    const track = $('.carousel-track', carousel);
    const prev = $('#carouselPrev');
    const next = $('#carouselNext');
    const cards = $$('.carousel-card', carousel);
    let index = 0;

    function pageSize() {
      const w = window.innerWidth;
      if (w <= 780) return 1;
      if (w <= 980) return 2;
      return 3;
    }

    function clamp() {
      const ps = pageSize();
      const max = Math.max(0, Math.ceil(cards.length / ps) - 1);
      index = Math.max(0, Math.min(index, max));
    }

    function scrollToIndex() {
      clamp();
      const ps = pageSize();
      const card = cards[index * ps];
      if (!card || !track) return;
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }

    if (prev) {
      prev.addEventListener('click', () => {
        index -= 1;
        scrollToIndex();
      });
    }
    if (next) {
      next.addEventListener('click', () => {
        index += 1;
        scrollToIndex();
      });
    }
    window.addEventListener('resize', () => scrollToIndex());
  }

  // Newsletter subscribe (no backend): show inline confirmation
  const newsletterForm = $('#newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = $('#newsletterMsg');
      if (msg) {
        msg.textContent = 'Thanks — you are subscribed (demo).';
        msg.style.opacity = '1';
      }
      const input = $('#newsletterEmail');
      if (input) input.value = '';
    });
  }

  // Ensure keyboard users can reach mega menu links
  if (servicesTrigger && servicesWrap) {
    servicesTrigger.addEventListener('focus', () => openMega());
    servicesWrap.addEventListener('focusout', (e) => {
      if (!servicesWrap.contains(e.relatedTarget)) closeMega();
    });
  }
})();
