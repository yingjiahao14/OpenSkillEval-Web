(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function initCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach((root) => {
      const track = root.querySelector('[data-carousel-track]');
      const prev = root.querySelector('[data-carousel-prev]');
      const next = root.querySelector('[data-carousel-next]');
      if (!track || !prev || !next) return;

      function updateDisabled() {
        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        const left = track.scrollLeft;
        prev.disabled = left <= 2;
        next.disabled = left >= maxScrollLeft - 2;
      }

      function pageSizePx() {
        const first = track.querySelector('.carousel-item');
        const itemWidth = first ? first.getBoundingClientRect().width : 320;
        return Math.round(itemWidth * 1.1);
      }

      function scrollByDir(dir) {
        const delta = pageSizePx() * dir;
        const target = clamp(track.scrollLeft + delta, 0, track.scrollWidth);
        track.scrollTo({ left: target, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }

      prev.addEventListener('click', () => scrollByDir(-1));
      next.addEventListener('click', () => scrollByDir(1));
      track.addEventListener('scroll', () => updateDisabled(), { passive: true });
      window.addEventListener('resize', updateDisabled);
      updateDisabled();
    });
  }

  function initTabs() {
    const tabRoots = document.querySelectorAll('[data-tabs]');
    tabRoots.forEach((root) => {
      const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
      const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
      if (!tabs.length || !panels.length) return;

      function activate(id, focus) {
        tabs.forEach((t) => {
          const selected = t.getAttribute('aria-controls') === id;
          t.setAttribute('aria-selected', String(selected));
          t.tabIndex = selected ? 0 : -1;
        });
        panels.forEach((p) => {
          const active = p.id === id;
          p.hidden = !active;
        });
        if (focus) {
          const activeTab = tabs.find((t) => t.getAttribute('aria-controls') === id);
          activeTab && activeTab.focus();
        }
      }

      tabs.forEach((t) => {
        t.addEventListener('click', () => activate(t.getAttribute('aria-controls') || '', false));
        t.addEventListener('keydown', (e) => {
          const idx = tabs.indexOf(t);
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const dir = e.key === 'ArrowRight' ? 1 : -1;
            const next = tabs[(idx + dir + tabs.length) % tabs.length];
            activate(next.getAttribute('aria-controls') || '', true);
          }
        });
      });

      const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
      activate(initial.getAttribute('aria-controls') || '', false);
    });
  }

  function initFooterAccordion() {
    const footers = document.querySelectorAll('[data-footer]');
    footers.forEach((root) => {
      const toggles = root.querySelectorAll('[data-footer-toggle]');
      toggles.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (window.matchMedia('(min-width: 720px)').matches) return;
          const controls = btn.getAttribute('aria-controls');
          const panel = controls ? document.getElementById(controls) : null;
          if (!panel) return;
          const expanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', String(!expanded));
          panel.hidden = expanded;
        });
      });
    });
  }

  function initSectionNavActiveState() {
    const nav = document.querySelector('[data-section-nav]');
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const targets = links
      .map((a) => document.querySelector(a.getAttribute('href') || ''))
      .filter(Boolean);
    if (!links.length || !targets.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.id;
        links.forEach((a) => {
          const active = (a.getAttribute('href') || '') === `#${id}`;
          a.classList.toggle('active', active);
        });
      },
      { rootMargin: `-${Math.round(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 56) + 40}px 0px -65% 0px`, threshold: [0.1, 0.25, 0.5] }
    );

    targets.forEach((t) => obs.observe(t));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCarousels();
    initTabs();
    initFooterAccordion();
    initSectionNavActiveState();
  });
})();

