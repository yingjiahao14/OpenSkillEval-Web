function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function getScrollStep(viewport) {
  const first = viewport.querySelector(':scope > *');
  if (!first) return Math.max(280, viewport.clientWidth * 0.8);
  const rect = first.getBoundingClientRect();
  const style = getComputedStyle(viewport);
  const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
  return Math.max(240, rect.width + gap);
}

function updateCarouselButtons(root) {
  const viewport = root.querySelector('[data-carousel-viewport]');
  const prev = root.querySelector('[data-carousel-prev]');
  const next = root.querySelector('[data-carousel-next]');
  if (!viewport || !prev || !next) return;

  const maxScroll = viewport.scrollWidth - viewport.clientWidth;
  const left = clamp(viewport.scrollLeft, 0, maxScroll);
  prev.disabled = left <= 2;
  next.disabled = left >= maxScroll - 2;
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const viewport = root.querySelector('[data-carousel-viewport]');
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    if (!viewport || !prev || !next) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = reducedMotion ? 'auto' : 'smooth';

    prev.addEventListener('click', () => {
      viewport.scrollBy({ left: -getScrollStep(viewport), behavior });
    });
    next.addEventListener('click', () => {
      viewport.scrollBy({ left: getScrollStep(viewport), behavior });
    });

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => updateCarouselButtons(root));
    };

    viewport.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => updateCarouselButtons(root));
    updateCarouselButtons(root);
  });
}

function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((root) => {
    const tablist = root.querySelector('[role="tablist"]');
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));

    function setActive(id) {
      tabs.forEach((t) => {
        const selected = t.getAttribute('aria-controls') === id;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        p.hidden = p.id !== id;
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => setActive(tab.getAttribute('aria-controls')));
      tab.addEventListener('keydown', (e) => {
        const i = tabs.indexOf(tab);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const n = tabs[(i + 1) % tabs.length];
          n.focus();
          setActive(n.getAttribute('aria-controls'));
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const n = tabs[(i - 1 + tabs.length) % tabs.length];
          n.focus();
          setActive(n.getAttribute('aria-controls'));
        }
      });
    });

    const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initial) setActive(initial.getAttribute('aria-controls'));
  });
}

function initFooterAccordion() {
  const footer = document.querySelector('[data-footer]');
  if (!footer) return;

  const mq = window.matchMedia('(max-width: 700px)');
  const cols = Array.from(footer.querySelectorAll('[data-footer-col]'));

  function setOpen(col, open) {
    col.dataset.open = open ? 'true' : 'false';
    const btn = col.querySelector('button[data-footer-toggle]');
    if (btn) btn.setAttribute('aria-expanded', String(open));
  }

  cols.forEach((col) => {
    const btn = col.querySelector('button[data-footer-toggle]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (!mq.matches) return;
      const isOpen = col.dataset.open === 'true';
      setOpen(col, !isOpen);
    });
  });

  function sync() {
    if (!mq.matches) {
      cols.forEach((c) => setOpen(c, true));
    } else {
      cols.forEach((c, idx) => setOpen(c, idx === 0));
    }
  }

  mq.addEventListener?.('change', sync);
  window.addEventListener('resize', sync);
  sync();
}

function initSectionNav() {
  const nav = document.querySelector('[data-section-nav]');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a[data-section-link]'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reducedMotion ? 'auto' : 'smooth';

  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior, block: 'start' });
    });
  });

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = `#${visible.target.id}`;
      links.forEach((l) => l.setAttribute('aria-current', String(l.getAttribute('href') === id)));
    },
    {
      rootMargin: `-${52 + 52 + 6}px 0px -60% 0px`,
      threshold: [0.15, 0.3, 0.5, 0.7],
    }
  );

  sections.forEach((s) => obs.observe(s));
}

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initTabs();
  initFooterAccordion();
  initSectionNav();
});

