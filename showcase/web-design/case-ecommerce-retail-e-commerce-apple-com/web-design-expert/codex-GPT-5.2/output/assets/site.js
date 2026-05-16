(function () {
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach((root) => {
      const track = root.querySelector('[data-carousel-track]');
      const prev = root.querySelector('[data-carousel-prev]');
      const next = root.querySelector('[data-carousel-next]');
      if (!track || !prev || !next) return;

      function getStep() {
        const firstCard = track.querySelector(':scope > *');
        if (!firstCard) return track.clientWidth * 0.9;
        const rect = firstCard.getBoundingClientRect();
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
        return rect.width + gap;
      }

      function updateDisabled() {
        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        const sl = track.scrollLeft;
        prev.disabled = sl <= 2;
        next.disabled = sl >= maxScrollLeft - 2;
      }

      function scrollByCards(dir) {
        const step = getStep();
        const delta = step * 1.8 * dir;
        track.scrollBy({ left: delta, behavior: 'smooth' });
      }

      prev.addEventListener('click', () => scrollByCards(-1));
      next.addEventListener('click', () => scrollByCards(1));
      track.addEventListener('scroll', () => window.requestAnimationFrame(updateDisabled), { passive: true });
      window.addEventListener('resize', () => window.requestAnimationFrame(updateDisabled));
      updateDisabled();
    });
  }

  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach((tabs) => {
      const buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));
      const panels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));
      if (!buttons.length || !panels.length) return;

      function setActive(id) {
        buttons.forEach((b) => {
          const active = b.getAttribute('aria-controls') === id;
          b.setAttribute('aria-selected', active ? 'true' : 'false');
          b.tabIndex = active ? 0 : -1;
        });
        panels.forEach((p) => {
          p.classList.toggle('is-active', p.id === id);
        });
      }

      buttons.forEach((b) => {
        b.addEventListener('click', () => setActive(b.getAttribute('aria-controls')));
        b.addEventListener('keydown', (e) => {
          const idx = buttons.indexOf(b);
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const dir = e.key === 'ArrowRight' ? 1 : -1;
            const nextIdx = (idx + dir + buttons.length) % buttons.length;
            buttons[nextIdx].focus();
            setActive(buttons[nextIdx].getAttribute('aria-controls'));
          }
        });
      });

      const initially = buttons.find((b) => b.getAttribute('aria-selected') === 'true') || buttons[0];
      setActive(initially.getAttribute('aria-controls'));
    });
  }

  function initStickySubnav() {
    document.querySelectorAll('[data-subnav]').forEach((nav) => {
      const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
      if (!links.length) return;

      function setActiveByHash(hash) {
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === hash));
      }

      const targets = links
        .map((a) => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          setActiveByHash('#' + visible.target.id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: [0.1, 0.25, 0.5] }
      );
      targets.forEach((t) => io.observe(t));

      links.forEach((a) => {
        a.addEventListener('click', () => setActiveByHash(a.getAttribute('href')));
      });
    });
  }

  function initFooterAccordion() {
    const isMobile = () => window.matchMedia('(max-width: 640px)').matches;
    document.querySelectorAll('[data-footer-accordion] .footcol').forEach((col) => {
      const header = col.querySelector('h3');
      if (!header) return;
      header.addEventListener('click', () => {
        if (!isMobile()) return;
        col.classList.toggle('is-open');
      });
    });
  }

  function init() {
    initCarousels();
    initTabs();
    initStickySubnav();
    initFooterAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

