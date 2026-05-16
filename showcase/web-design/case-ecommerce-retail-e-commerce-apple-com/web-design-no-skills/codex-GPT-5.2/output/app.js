function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function initCarousel(root) {
  const track = root.querySelector('[data-carousel-track]');
  const prev = root.querySelector('[data-carousel-prev]');
  const next = root.querySelector('[data-carousel-next]');
  if (!track || !prev || !next) return;

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const left = track.scrollLeft;
    prev.disabled = left <= 2;
    next.disabled = left >= maxScroll - 2;
  };

  const scrollByCard = (dir) => {
    const firstCard = track.querySelector('.card');
    const delta = firstCard
      ? firstCard.getBoundingClientRect().width + 14
      : Math.max(280, Math.floor(track.clientWidth * 0.9));
    track.scrollTo({ left: track.scrollLeft + dir * delta, behavior: 'smooth' });
  };

  prev.addEventListener('click', () => scrollByCard(-1));
  next.addEventListener('click', () => scrollByCard(1));
  track.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);
  update();
}

function initAllCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
}

function initTabs(root) {
  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
  if (!tabs.length || !panels.length) return;

  const setActive = (id) => {
    tabs.forEach((t) => {
      const selected = t.getAttribute('aria-controls') === id;
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((p) => {
      p.hidden = p.id !== id;
    });
  };

  const current = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
  setActive(current ? current.getAttribute('aria-controls') : tabs[0].getAttribute('aria-controls'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => setActive(tab.getAttribute('aria-controls')));
    tab.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const nextIdx = (idx + dir + tabs.length) % tabs.length;
        tabs[nextIdx].focus();
        setActive(tabs[nextIdx].getAttribute('aria-controls'));
      }
    });
  });
}

function initAllTabs() {
  document.querySelectorAll('[data-tabs]').forEach(initTabs);
}

function initFooterAccordion() {
  const root = document.querySelector('[data-footer-accordion]');
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll('button[data-accordion-trigger]'));
  const closeAll = () => {
    buttons.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      const panel = root.querySelector(`#${btn.getAttribute('aria-controls')}`);
      if (panel) panel.classList.remove('open');
    });
  };

  const applyMode = () => {
    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    if (!isMobile) {
      closeAll();
      return;
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = root.querySelector(`#${panelId}`);
      if (!panel) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      closeAll();
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (!expanded) panel.classList.add('open');
    });
  });

  window.addEventListener('resize', applyMode);
  applyMode();
}

function initSectionNav() {
  const nav = document.querySelector('[data-section-nav]');
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  };

  const onScroll = () => {
    const y = window.scrollY + 140;
    let activeId = sections[0]?.id;
    sections.forEach((s) => {
      if (s.offsetTop <= y) activeId = s.id;
    });
    if (activeId) setActive(activeId);
  };

  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: clamp(top, 0, document.body.scrollHeight), behavior: 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });

  document.addEventListener('scroll', () => window.requestAnimationFrame(onScroll), { passive: true });
  onScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  initAllCarousels();
  initAllTabs();
  initFooterAccordion();
  initSectionNav();
});

