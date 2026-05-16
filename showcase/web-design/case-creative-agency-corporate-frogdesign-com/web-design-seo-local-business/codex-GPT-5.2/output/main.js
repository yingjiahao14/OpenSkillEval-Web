const LS = {
  lang: 'leapstudio_lang',
  cookie: 'leapstudio_cookie_consent',
  cookieSettings: 'leapstudio_cookie_settings'
};

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function clampIndex(i, n) {
  if (n <= 0) return 0;
  return ((i % n) + n) % n;
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initLanguageDropdown() {
  const btn = qs('[data-lang-btn]');
  const panel = qs('[data-lang-panel]');
  const label = qs('[data-lang-label]');
  if (!btn || !panel || !label) return;

  const stored = localStorage.getItem(LS.lang);
  if (stored) label.textContent = stored;

  function close() {
    panel.dataset.open = 'false';
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const open = panel.dataset.open === 'true';
    panel.dataset.open = open ? 'false' : 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });

  qsa('button[data-lang-option]', panel).forEach((opt) => {
    opt.addEventListener('click', () => {
      const next = opt.getAttribute('data-lang-option') || opt.textContent.trim();
      label.textContent = next;
      localStorage.setItem(LS.lang, next);
      close();
    });
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function initHeroCarousel() {
  const root = qs('[data-hero]');
  if (!root) return;

  const slides = qsa('[data-hero-slide]', root);
  const dots = qsa('[data-hero-dot]', root);
  const prev = qs('[data-hero-prev]', root);
  const next = qs('[data-hero-next]', root);
  const pauseBtn = qs('[data-hero-pause]', root);

  let index = 0;
  let timer = null;
  let paused = prefersReducedMotion();

  function render() {
    slides.forEach((s, i) => {
      s.dataset.active = i === index ? 'true' : 'false';
    });
    dots.forEach((d, i) => {
      d.setAttribute('aria-selected', i === index ? 'true' : 'false');
      d.setAttribute('tabindex', i === index ? '0' : '-1');
    });
  }

  function go(nextIndex) {
    index = clampIndex(nextIndex, slides.length);
    render();
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (paused) return;
    timer = window.setInterval(() => go(index + 1), 6500);
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
      const i = Number(d.getAttribute('data-hero-dot'));
      if (Number.isFinite(i)) go(i);
      start();
    });
  });

  pauseBtn?.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    pauseBtn.textContent = paused ? 'Play' : 'Pause';
    start();
  });

  // Keyboard: left/right when focused inside hero
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      go(index - 1);
      start();
    }
    if (e.key === 'ArrowRight') {
      go(index + 1);
      start();
    }
  });

  render();
  start();
}

function initScrollerControls() {
  qsa('[data-scroll-group]').forEach((group) => {
    const scroller = qs('[data-scroller]', group);
    const prev = qs('[data-scroll-prev]', group);
    const next = qs('[data-scroll-next]', group);
    if (!scroller) return;

    function step(dir) {
      const card = scroller.querySelector(':scope > *');
      const amount = (card?.getBoundingClientRect().width || 320) + 14;
      scroller.scrollBy({ left: dir * amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }

    prev?.addEventListener('click', () => step(-1));
    next?.addEventListener('click', () => step(1));
  });
}

function initTeamRegionToggle() {
  const root = qs('[data-team]');
  if (!root) return;

  const tabs = qsa('[data-region-tab]', root);
  const scroller = qs('[data-team-scroller]', root);
  const cards = qsa('[data-team-card]', root);
  if (!tabs.length || !scroller || !cards.length) return;

  function setRegion(region) {
    tabs.forEach((t) => {
      const active = t.getAttribute('data-region-tab') === region;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    cards.forEach((c) => {
      const show = c.getAttribute('data-region') === region;
      c.style.display = show ? '' : 'none';
    });
    // snap to start of scroller after filtering
    scroller.scrollTo({ left: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    root.setAttribute('data-active-region', region);
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => setRegion(t.getAttribute('data-region-tab')));
  });

  setRegion(tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.getAttribute('data-region-tab') || tabs[0].getAttribute('data-region-tab'));
}

function initCookieConsent() {
  const banner = qs('[data-cookie-banner]');
  const manageBtn = qs('[data-cookie-manage]');
  const acceptBtn = qs('[data-cookie-accept]');
  const declineBtn = qs('[data-cookie-decline]');
  const settingsLink = qs('[data-cookie-settings-link]');
  const backdrop = qs('[data-cookie-backdrop]');
  const modal = qs('[data-cookie-modal]');
  const closeModal = qs('[data-cookie-close]');
  const saveSettings = qs('[data-cookie-save]');
  const cookieSettingsBtns = qsa('[data-open-cookie-settings]');

  function getConsent() {
    try {
      return JSON.parse(localStorage.getItem(LS.cookie) || 'null');
    } catch {
      return null;
    }
  }

  function setConsent(consent) {
    localStorage.setItem(LS.cookie, JSON.stringify({ ...consent, ts: new Date().toISOString() }));
  }

  function openBanner() {
    if (!banner) return;
    banner.dataset.open = 'true';
  }

  function closeBanner() {
    if (!banner) return;
    banner.dataset.open = 'false';
  }

  function openModal() {
    if (!modal || !backdrop) return;
    modal.dataset.open = 'true';
    backdrop.dataset.open = 'true';
    modal.focus();
  }

  function closeModalFn() {
    if (!modal || !backdrop) return;
    modal.dataset.open = 'false';
    backdrop.dataset.open = 'false';
  }

  function applyUIFromStored() {
    const consent = getConsent();
    if (!consent) {
      openBanner();
      return;
    }
    closeBanner();
  }

  acceptBtn?.addEventListener('click', () => {
    setConsent({ analytics: true, marketing: true });
    closeBanner();
  });

  declineBtn?.addEventListener('click', () => {
    setConsent({ analytics: false, marketing: false });
    closeBanner();
  });

  manageBtn?.addEventListener('click', () => {
    openModal();
  });

  cookieSettingsBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  settingsLink?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeModal?.addEventListener('click', () => closeModalFn());
  backdrop?.addEventListener('click', () => closeModalFn());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalFn();
  });

  saveSettings?.addEventListener('click', () => {
    const analytics = Boolean(qs('#cookie-analytics')?.checked);
    const marketing = Boolean(qs('#cookie-marketing')?.checked);
    setConsent({ analytics, marketing });
    closeModalFn();
    closeBanner();
  });

  // Load previous settings into toggles
  const saved = getConsent();
  if (saved) {
    const a = qs('#cookie-analytics');
    const m = qs('#cookie-marketing');
    if (a) a.checked = !!saved.analytics;
    if (m) m.checked = !!saved.marketing;
  }

  applyUIFromStored();
}

function initMobileNav() {
  const btn = qs('[data-menu-btn]');
  const panel = qs('[data-menu-panel]');
  if (!btn || !panel) return;

  function close() {
    panel.dataset.open = 'false';
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    const open = panel.dataset.open === 'true';
    panel.dataset.open = open ? 'false' : 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });
  qsa('a', panel).forEach((a) => a.addEventListener('click', () => close()));
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function initSmoothAnchors() {
  qsa('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = qs(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initLanguageDropdown();
  initMobileNav();
  initHeroCarousel();
  initTeamRegionToggle();
  initScrollerControls();
  initCookieConsent();
  initSmoothAnchors();
});

