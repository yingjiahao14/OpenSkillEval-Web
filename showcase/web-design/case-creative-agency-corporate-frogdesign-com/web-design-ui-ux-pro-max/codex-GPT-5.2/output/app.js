/* Leap Studio — interactions (no build step) */

function qs(sel, el = document) { return el.querySelector(sel); }
function qsa(sel, el = document) { return Array.from(el.querySelectorAll(sel)); }

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setAriaCurrent(dots, index) {
  dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
}

function setupHeroCarousel() {
  const root = qs('[data-hero-carousel]');
  if (!root) return;

  const track = qs('.carousel__track', root);
  const slides = qsa('.slide', root);
  const prevBtn = qs('[data-hero-prev]', root);
  const nextBtn = qs('[data-hero-next]', root);
  const dots = qsa('[data-hero-dot]', root);
  const live = qs('[data-hero-live]', root);

  let index = 0;
  let timer = null;
  const autoplayMs = 5600;

  function render() {
    track.style.transform = `translateX(${-index * 100}%)`;
    setAriaCurrent(dots, index);
    slides.forEach((s, i) => s.setAttribute('aria-hidden', i === index ? 'false' : 'true'));
    if (live) {
      const title = qs('[data-slide-title]', slides[index])?.textContent?.trim() || `Slide ${index + 1}`;
      live.textContent = `Featured: ${title}`;
    }
  }

  function goTo(nextIndex, userInitiated = false) {
    index = (nextIndex + slides.length) % slides.length;
    render();
    if (userInitiated) restartAutoplay();
  }

  function restartAutoplay() {
    stopAutoplay();
    if (prefersReducedMotion()) return;
    timer = window.setInterval(() => goTo(index + 1, false), autoplayMs);
  }

  function stopAutoplay() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  prevBtn?.addEventListener('click', () => goTo(index - 1, true));
  nextBtn?.addEventListener('click', () => goTo(index + 1, true));

  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i, true)));

  // Keyboard support
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1, true); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1, true); }
  });

  // Pause on hover/focus
  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', restartAutoplay);
  qsa('button,[href]', root).forEach((el) => {
    el.addEventListener('focus', stopAutoplay);
    el.addEventListener('blur', restartAutoplay);
  });

  render();
  restartAutoplay();
}

function setupDropdowns() {
  const dd = qs('[data-language-dropdown]');
  if (!dd) return;
  const button = qs('[data-language-button]', dd);
  const items = qsa('[data-language-item]', dd);
  const label = qs('[data-language-label]', dd);

  function close() {
    dd.setAttribute('aria-expanded', 'false');
    button?.setAttribute('aria-expanded', 'false');
  }
  function open() {
    dd.setAttribute('aria-expanded', 'true');
    button?.setAttribute('aria-expanded', 'true');
  }
  function toggle() {
    const expanded = dd.getAttribute('aria-expanded') === 'true';
    expanded ? close() : open();
  }

  button?.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const value = item.getAttribute('data-value') || item.textContent.trim();
      if (label) label.textContent = value;
      close();
    });
  });

  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function setupMobileNav() {
  const btn = qs('[data-menu-button]');
  const panel = qs('[data-mobile-panel]');
  if (!btn || !panel) return;

  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  qsa('a', panel).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btn) setOpen(false);
  });
}

function setupScroller(rootSel) {
  const root = qs(rootSel);
  if (!root) return;
  const viewport = qs('[data-scroller-viewport]', root);
  const prevBtn = qs('[data-scroll-prev]', root);
  const nextBtn = qs('[data-scroll-next]', root);

  function step(dir) {
    if (!viewport) return;
    const amount = Math.round(viewport.clientWidth * 0.85);
    viewport.scrollBy({ left: dir * amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  // Keyboard
  viewport?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  });
}

function setupTeamRegionAndCarousel() {
  const root = qs('[data-team]');
  if (!root) return;

  const tabs = qsa('[data-region-tab]', root);
  const viewport = qs('[data-team-viewport]', root);
  const track = qs('[data-team-track]', root);
  const prevBtn = qs('[data-team-prev]', root);
  const nextBtn = qs('[data-team-next]', root);
  const live = qs('[data-team-live]', root);

  const allCards = qsa('[data-team-card]', root).map((el) => ({
    el,
    region: (el.getAttribute('data-region') || '').toLowerCase(),
    name: el.getAttribute('data-name') || qs('[data-team-name]', el)?.textContent?.trim() || 'Team member'
  }));

  let activeRegion = (tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.getAttribute('data-region') || 'north-america').toLowerCase();
  let activeIndex = 0;

  function visibleCards() {
    return allCards.filter((c) => c.region === activeRegion);
  }

  function updateLive() {
    const vis = visibleCards();
    const name = vis[activeIndex]?.name || 'Team member';
    if (live) live.textContent = `${activeRegion.replace(/-/g, ' ')}: ${name}`;
  }

  function applyFilter() {
    const vis = visibleCards();
    allCards.forEach((c) => {
      const show = c.region === activeRegion;
      c.el.style.display = show ? '' : 'none';
      c.el.setAttribute('aria-hidden', show ? 'false' : 'true');
    });

    // Rebuild track order (keeps scroll snapping consistent)
    if (track) {
      track.innerHTML = '';
      vis.forEach((c) => track.appendChild(c.el));
    }

    activeIndex = 0;
    viewport?.scrollTo({ left: 0, behavior: 'auto' });
    updateLive();
  }

  function setRegion(region) {
    activeRegion = region.toLowerCase();
    tabs.forEach((t) => t.setAttribute('aria-selected', t.getAttribute('data-region') === region ? 'true' : 'false'));
    applyFilter();
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => setRegion(t.getAttribute('data-region') || 'north-america'));
  });

  function step(dir) {
    if (!viewport) return;
    const amount = Math.round(viewport.clientWidth * 0.88);
    viewport.scrollBy({ left: dir * amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  // Swipe-friendly via native scrolling; we just keep activeIndex for live region
  let raf = 0;
  viewport?.addEventListener('scroll', () => {
    if (!viewport) return;
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      const visEls = qsa('[data-team-card]', viewport);
      if (!visEls.length) return;
      const cardW = visEls[0].getBoundingClientRect().width + 16;
      const idx = clamp(Math.round(viewport.scrollLeft / Math.max(1, cardW)), 0, visEls.length - 1);
      activeIndex = idx;
      updateLive();
    });
  }, { passive: true });

  applyFilter();
}

function setupCookieConsent() {
  const banner = qs('[data-cookie-banner]');
  const accept = qs('[data-cookie-accept]');
  const declineButtons = qsa('[data-cookie-decline]');
  const manage = qs('[data-cookie-manage]');

  const modal = qs('[data-cookie-modal]');
  const modalClose = qs('[data-cookie-close]');
  const save = qs('[data-cookie-save]');

  if (!banner) return;

  const KEY = 'leapstudio_cookie_pref_v1';

  function hideBanner() {
    banner.setAttribute('aria-hidden', 'true');
  }

  function showBanner() {
    banner.setAttribute('aria-hidden', 'false');
  }

  function openModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    const first = qs('button,[href],[tabindex]:not([tabindex="-1"])', modal);
    first?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
  }

  function setPref(value) {
    try { localStorage.setItem(KEY, value); } catch (_) { /* ignore */ }
  }

  function getPref() {
    try { return localStorage.getItem(KEY); } catch (_) { return null; }
  }

  // Init
  if (!getPref()) showBanner();
  else hideBanner();

  accept?.addEventListener('click', () => { setPref('all'); hideBanner(); closeModal(); });
  declineButtons.forEach((btn) => btn.addEventListener('click', () => { setPref('none'); hideBanner(); closeModal(); }));
  manage?.addEventListener('click', () => openModal());
  modalClose?.addEventListener('click', () => closeModal());
  qs('[data-cookie-backdrop]', modal)?.addEventListener('click', () => closeModal());
  save?.addEventListener('click', () => { setPref('custom'); hideBanner(); closeModal(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Toggle switches in modal (pure UI)
  qsa('[data-switch]', modal).forEach((sw) => {
    sw.addEventListener('click', () => {
      const v = sw.getAttribute('aria-checked') === 'true';
      sw.setAttribute('aria-checked', v ? 'false' : 'true');
    });
  });
}

function setupNavScrollSpy() {
  const links = qsa('[data-nav-link]');
  if (!links.length) return;

  const targets = links
    .map((a) => document.getElementById((a.getAttribute('href') || '').replace('#', '')))
    .filter(Boolean);

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    let best = null;
    for (const sec of targets) {
      const top = sec.getBoundingClientRect().top + y;
      if (y + 140 >= top) best = sec;
    }
    links.forEach((a) => a.setAttribute('aria-current', 'false'));
    if (best) {
      const id = best.getAttribute('id');
      const active = links.find((a) => a.getAttribute('href') === `#${id}`);
      active?.setAttribute('aria-current', 'true');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  setupHeroCarousel();
  setupDropdowns();
  setupMobileNav();
  setupScroller('[data-work-scroller]');
  setupTeamRegionAndCarousel();
  setupCookieConsent();
  setupNavScrollSpy();
});
