/* LearnForge site interactions (vanilla JS) */

function qs(sel, root = document) {
  return root.querySelector(sel);
}
function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function initReveal() {
  const els = qsa('[data-reveal]');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  for (const el of els) {
    el.classList.add('reveal');
    io.observe(el);
  }
}

function initNav() {
  const header = qs('.site-header');
  const btn = qs('[data-nav-toggle]');
  if (!header || !btn) return;

  btn.addEventListener('click', () => {
    const open = header.getAttribute('data-open') === 'true';
    header.setAttribute('data-open', open ? 'false' : 'true');
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });

  // Close on navigation
  qsa('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => {
      header.setAttribute('data-open', 'false');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initTabs(rootSel) {
  const root = qs(rootSel);
  if (!root) return;
  const tabs = qsa('[role="tab"]', root);
  const panels = qsa('[role="tabpanel"]', root);
  if (!tabs.length || !panels.length) return;

  function activate(id) {
    for (const t of tabs) {
      const selected = t.getAttribute('aria-controls') === id;
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.tabIndex = selected ? 0 : -1;
    }
    for (const p of panels) {
      const show = p.id === id;
      p.hidden = !show;
    }
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => activate(t.getAttribute('aria-controls')));
    t.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(t);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = (idx + dir + tabs.length) % tabs.length;
        tabs[next].focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        t.click();
      }
    });
  });

  const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
  activate(initial.getAttribute('aria-controls'));
}

function initAccordion(scope = document) {
  qsa('[data-accordion]', scope).forEach((acc) => {
    const items = qsa('.acc-item', acc);
    items.forEach((item) => {
      const trigger = qs('.acc-trigger', item);
      const panel = qs('.acc-panel', item);
      if (!trigger || !panel) return;

      function set(open) {
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
          panel.style.height = panel.scrollHeight + 'px';
        } else {
          panel.style.height = '0px';
        }
      }

      // initial
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      set(expanded);

      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        set(!isOpen);
      });

      window.addEventListener('resize', () => {
        if (trigger.getAttribute('aria-expanded') === 'true') {
          panel.style.height = panel.scrollHeight + 'px';
        }
      });
    });
  });
}

function initCarousel(rootSel) {
  const root = qs(rootSel);
  if (!root) return;
  const track = qs('.carousel-track', root);
  const slides = qsa('.slide', root);
  const prev = qs('[data-prev]', root);
  const next = qs('[data-next]', root);
  const dots = qsa('[data-dot]', root);
  if (!track || !slides.length) return;

  let index = 0;
  let timer = null;
  const autoplay = root.getAttribute('data-autoplay') !== 'false';
  const interval = Number(root.getAttribute('data-interval') || 6500);

  function clamp(n) {
    return (n + slides.length) % slides.length;
  }

  function render() {
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
  }

  function go(to) {
    index = clamp(to);
    render();
  }

  function start() {
    if (!autoplay) return;
    stop();
    timer = window.setInterval(() => go(index + 1), interval);
  }
  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  prev?.addEventListener('click', () => {
    go(index - 1);
    start();
  });
  next?.addEventListener('click', () => {
    go(index + 1);
    start();
  });
  dots.forEach((d) => {
    d.addEventListener('click', () => {
      go(Number(d.getAttribute('data-dot')));
      start();
    });
  });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);

  render();
  start();
}

function initAllCarousels() {
  qsa('[data-carousel]').forEach((el) => initCarousel(`#${el.id}`));
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initAccordion();
  initTabs('[data-home-hero-tabs]');
  initTabs('[data-why-tabs]');
  initAllCarousels();
});

