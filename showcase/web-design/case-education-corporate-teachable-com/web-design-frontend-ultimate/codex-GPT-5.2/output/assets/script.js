function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function initReveal() {
  const els = qsa('[data-reveal]');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  els.forEach((el) => io.observe(el));
}

function initTabs(group) {
  const root = qs(`[data-tabs="${group}"]`);
  if (!root) return;

  const tablist = qs('[role="tablist"]', root);
  const tabs = qsa('[role="tab"]', tablist);
  const panels = qsa('[role="tabpanel"]', root);
  if (tabs.length === 0 || panels.length === 0) return;

  function activate(id) {
    tabs.forEach((t) => {
      const on = t.getAttribute('aria-controls') === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p) => {
      const on = p.id === id;
      p.classList.toggle('is-active', on);
      p.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => activate(t.getAttribute('aria-controls')));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const idx = tabs.indexOf(t);
      const next = e.key === 'ArrowRight' ? idx + 1 : idx - 1;
      const el = tabs[(next + tabs.length) % tabs.length];
      el.focus();
      activate(el.getAttribute('aria-controls'));
    });
  });

  const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
  activate(initial.getAttribute('aria-controls'));
}

function initAccordions() {
  qsa('[data-accordion]').forEach((root) => {
    const items = qsa('.acc-item', root);
    const buttons = qsa('.acc-btn', root);

    function closeAll(exceptBtn = null) {
      items.forEach((it) => {
        const btn = qs('.acc-btn', it);
        if (!btn) return;
        if (exceptBtn && btn === exceptBtn) return;
        it.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.acc-item');
        if (!item) return;
        const isOpen = item.classList.contains('is-open');
        closeAll(btn);
        item.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', (!isOpen).toString());
      });
    });

    // open first by default for discoverability
    const first = buttons[0];
    if (first) first.click();
  });
}

function initCarousel(id) {
  const root = qs(`[data-carousel="${id}"]`);
  if (!root) return;

  const track = qs('.carousel-track', root);
  const slides = qsa('.slide', root);
  const prev = qs('[data-prev]', root);
  const next = qs('[data-next]', root);
  const dots = qsa('[data-dot]', root);
  if (!track || slides.length === 0) return;

  let index = 0;
  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, j) => d.setAttribute('aria-current', j === index ? 'true' : 'false'));
  }

  prev?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));
  dots.forEach((d) => d.addEventListener('click', () => go(parseInt(d.getAttribute('data-dot') || '0', 10))));

  let timer = null;
  const auto = root.getAttribute('data-auto') === 'true';
  if (auto) {
    const start = () => {
      timer = window.setInterval(() => go(index + 1), 6500);
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    start();
  }

  go(0);
}

function initAll() {
  initReveal();
  initTabs('hero-preview');
  initTabs('why-choose');
  initAccordions();

  qsa('[data-carousel]').forEach((el) => {
    const id = el.getAttribute('data-carousel');
    if (id) initCarousel(id);
  });
}

document.addEventListener('DOMContentLoaded', initAll);

