/* GlobalStone — minimal, framework-free interactions */

function qs(sel, el = document) {
  return el.querySelector(sel);
}

function qsa(sel, el = document) {
  return Array.from(el.querySelectorAll(sel));
}

function closeMega() {
  document.body.classList.remove('mega-open');
  const btn = qs('[data-mega-trigger]');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

function openMega() {
  document.body.classList.add('mega-open');
  const btn = qs('[data-mega-trigger]');
  if (btn) btn.setAttribute('aria-expanded', 'true');
}

function toggleMega() {
  const open = document.body.classList.contains('mega-open');
  if (open) closeMega();
  else openMega();
}

function closeDrawer() {
  document.body.classList.remove('drawer-open');
  const btn = qs('[data-drawer-open]');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

function openDrawer() {
  document.body.classList.add('drawer-open');
  const btn = qs('[data-drawer-open]');
  if (btn) btn.setAttribute('aria-expanded', 'true');
}

function toggleDrawer() {
  const open = document.body.classList.contains('drawer-open');
  if (open) closeDrawer();
  else openDrawer();
}

function initNav() {
  const megaTrigger = qs('[data-mega-trigger]');
  const mega = qs('[data-mega]');

  if (megaTrigger && mega) {
    megaTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMega();
    });

    // Hover intent on desktop
    let hoverTimer;
    megaTrigger.addEventListener('mouseenter', () => {
      hoverTimer = window.setTimeout(openMega, 60);
    });
    megaTrigger.addEventListener('mouseleave', () => {
      window.clearTimeout(hoverTimer);
      // Let the user move into the panel
      window.setTimeout(() => {
        const stillHovering = mega.matches(':hover') || megaTrigger.matches(':hover');
        if (!stillHovering) closeMega();
      }, 120);
    });
    mega.addEventListener('mouseleave', closeMega);
    mega.addEventListener('mouseenter', openMega);
  }

  const drawerOpen = qs('[data-drawer-open]');
  const drawerClose = qs('[data-drawer-close]');
  const backdrop = qs('[data-drawer-backdrop]');
  if (drawerOpen) drawerOpen.addEventListener('click', toggleDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Mobile accordion
  qsa('[data-accordion]').forEach((group) => {
    const btn = qs('button', group);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const expanded = group.getAttribute('aria-expanded') === 'true';
      group.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  // Close on escape / click outside
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeDrawer();
    closeMega();
  });

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const clickedInsideMega = t.closest('[data-mega]') || t.closest('[data-mega-trigger]');
    if (!clickedInsideMega) closeMega();
  });
}

function initTabs() {
  const root = qs('[data-tabs]');
  if (!root) return;
  const tabs = qsa('[role="tab"]', root);
  const panel = qs('[role="tabpanel"]', root);
  if (!tabs.length || !panel) return;

  function setActive(id) {
    tabs.forEach((t) => {
      const active = t.getAttribute('data-tab') === id;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.tabIndex = active ? 0 : -1;
    });

    const data = qs(`[data-panel="${CSS.escape(id)}"]`, root);
    if (!data) return;
    panel.innerHTML = data.innerHTML;
    panel.classList.remove('fade-swap');
    void panel.offsetWidth; // restart animation
    panel.classList.add('fade-swap');
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => setActive(t.getAttribute('data-tab')));
    t.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(t);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = tabs[(idx + 1) % tabs.length];
        next.focus();
        setActive(next.getAttribute('data-tab'));
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
        prev.focus();
        setActive(prev.getAttribute('data-tab'));
      }
    });
  });

  const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
  setActive(initial.getAttribute('data-tab'));
}

function initCarousel() {
  const root = qs('[data-carousel]');
  if (!root) return;
  const slides = qsa('[data-slide]', root);
  if (!slides.length) return;
  const prev = qs('[data-prev]', root);
  const next = qs('[data-next]', root);
  const dots = qsa('[data-dot]', root);
  let idx = 0;

  function render() {
    slides.forEach((s, i) => {
      s.style.display = i === idx ? 'block' : 'none';
    });
    dots.forEach((d, i) => {
      d.setAttribute('aria-current', i === idx ? 'true' : 'false');
    });
  }

  function go(n) {
    idx = (n + slides.length) % slides.length;
    render();
  }

  if (prev) prev.addEventListener('click', () => go(idx - 1));
  if (next) next.addEventListener('click', () => go(idx + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

  render();
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTabs();
  initCarousel();
});

