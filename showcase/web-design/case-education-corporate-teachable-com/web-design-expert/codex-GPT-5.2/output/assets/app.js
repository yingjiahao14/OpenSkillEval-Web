function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function initMobileNav() {
  const toggle = qs('[data-mobile-toggle]');
  const menu = qs('[data-mobile-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const next = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(next));
    menu.style.display = next ? 'block' : 'none';
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.style.display = 'none';
    }
  });
}

function initHeroTabs() {
  const root = qs('[data-hero-tabs]');
  if (!root) return;
  const tabs = qsa('[role="tab"]', root);
  const panels = qsa('[role="tabpanel"]', root);
  if (!tabs.length || !panels.length) return;

  function activate(id) {
    tabs.forEach((t) => {
      const isOn = t.getAttribute('aria-controls') === id;
      t.setAttribute('aria-selected', String(isOn));
      t.tabIndex = isOn ? 0 : -1;
    });
    panels.forEach((p) => {
      p.classList.toggle('is-active', p.id === id);
    });
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => activate(t.getAttribute('aria-controls')));
    t.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(t);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = tabs[(idx + dir + tabs.length) % tabs.length];
        next.focus();
        activate(next.getAttribute('aria-controls'));
      }
    });
  });

  activate(tabs[0].getAttribute('aria-controls'));
}

function initTabs() {
  qsa('[data-tabs]').forEach((root) => {
    const tabs = qsa('[role="tab"]', root);
    const panels = qsa('[role="tabpanel"]', root);
    if (!tabs.length || !panels.length) return;

    function activate(panelId) {
      tabs.forEach((t) => {
        const on = t.getAttribute('aria-controls') === panelId;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach((p) => p.classList.toggle('is-active', p.id === panelId));
    }

    tabs.forEach((t) => {
      t.addEventListener('click', () => activate(t.getAttribute('aria-controls')));
    });
    activate(tabs[0].getAttribute('aria-controls'));
  });
}

function initAccordion() {
  qsa('[data-accordion]').forEach((root) => {
    const items = qsa('[data-acc-item]', root);
    items.forEach((item) => {
      const btn = qs('[data-acc-button]', item);
      const panel = qs('[data-acc-panel]', item);
      if (!btn || !panel) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach((it) => {
          it.classList.remove('is-open');
          const b = qs('[data-acc-button]', it);
          const p = qs('[data-acc-panel]', it);
          if (b) b.setAttribute('aria-expanded', 'false');
          if (p) p.setAttribute('aria-hidden', 'true');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          panel.setAttribute('aria-hidden', 'false');
        }
      });
    });
  });
}

function initCarousels() {
  qsa('[data-carousel]').forEach((root) => {
    const track = qs('[data-carousel-track]', root);
    const slides = qsa('[data-carousel-slide]', root);
    const prev = qs('[data-carousel-prev]', root);
    const next = qs('[data-carousel-next]', root);
    if (!track || slides.length === 0) return;

    let idx = 0;

    function render() {
      idx = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(${idx * -100}%)`;
      slides.forEach((s, i) => s.setAttribute('aria-hidden', i === idx ? 'false' : 'true'));
    }

    function go(delta) {
      idx = clamp(idx + delta, -1e9, 1e9);
      render();
    }

    if (prev) prev.addEventListener('click', () => go(-1));
    if (next) next.addEventListener('click', () => go(1));

    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    });

    render();
  });
}

function initRevealOnScroll() {
  const els = qsa('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '80px 0px -10% 0px', threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

function initProductDemoAccordion() {
  const root = qs('[data-demo-accordion]');
  if (!root) return;
  const btn = qs('[data-demo-toggle]', root);
  const panel = qs('[data-demo-panel]', root);
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    const open = root.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
    panel.style.display = open ? 'block' : 'none';
  });

  // default open on desktop, closed on mobile
  const mq = window.matchMedia('(min-width: 1024px)');
  function sync() {
    const open = mq.matches;
    root.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    panel.style.display = open ? 'block' : 'none';
  }
  sync();
  mq.addEventListener('change', sync);
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroTabs();
  initTabs();
  initAccordion();
  initCarousels();
  initRevealOnScroll();
  initProductDemoAccordion();
});

