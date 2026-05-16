const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function qs(root, selector) {
  return root.querySelector(selector);
}

function qsa(root, selector) {
  return Array.from(root.querySelectorAll(selector));
}

function supportsReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setAriaExpanded(el, expanded) {
  el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

function createCarousel(root, { autoplayMs = 6500, dots = true } = {}) {
  const track = qs(root, '[data-track]');
  const viewport = qs(root, '[data-viewport]');
  const slides = qsa(root, '[data-slide]');
  const prev = qs(root, '[data-prev]');
  const next = qs(root, '[data-next]');
  const dotsRoot = qs(root, '[data-dots]');

  let index = 0;
  let width = 0;
  let autoplayId = null;
  let drag = null;

  function measure() {
    width = viewport.getBoundingClientRect().width;
    goTo(index, { animate: false });
  }

  function goTo(nextIndex, { animate = true } = {}) {
    index = clamp(nextIndex, 0, slides.length - 1);
    if (!animate || supportsReducedMotion()) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${-index * width}px)`;
      // force reflow to avoid transition sticking
      track.getBoundingClientRect();
      track.style.transition = '';
    } else {
      track.style.transform = `translateX(${-index * width}px)`;
    }

    if (dots && dotsRoot) {
      qsa(dotsRoot, '.dot').forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }
  }

  function nextSlide() {
    goTo((index + 1) % slides.length);
  }

  function prevSlide() {
    goTo((index - 1 + slides.length) % slides.length);
  }

  function stopAutoplay() {
    if (autoplayId) window.clearInterval(autoplayId);
    autoplayId = null;
  }

  function startAutoplay() {
    if (supportsReducedMotion()) return;
    stopAutoplay();
    autoplayId = window.setInterval(nextSlide, autoplayMs);
  }

  function ensureDots() {
    if (!dots || !dotsRoot) return;
    dotsRoot.innerHTML = '';
    slides.forEach((_, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'dot' + (i === 0 ? ' is-active' : '');
      button.setAttribute('aria-label', `Go to item ${i + 1}`);
      button.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      button.addEventListener('click', () => {
        goTo(i);
        startAutoplay();
      });
      dotsRoot.appendChild(button);
    });
  }

  function onPointerDown(ev) {
    if (!ev.isPrimary) return;
    drag = {
      id: ev.pointerId,
      startX: ev.clientX,
      lastX: ev.clientX,
      startIndex: index,
      moved: false,
    };
    viewport.setPointerCapture(ev.pointerId);
    stopAutoplay();
  }

  function onPointerMove(ev) {
    if (!drag || ev.pointerId !== drag.id) return;
    const dx = ev.clientX - drag.startX;
    drag.lastX = ev.clientX;
    if (Math.abs(dx) > 6) drag.moved = true;
    track.style.transition = 'none';
    track.style.transform = `translateX(${-(drag.startIndex * width) + dx}px)`;
  }

  function onPointerUp(ev) {
    if (!drag || ev.pointerId !== drag.id) return;
    const dx = ev.clientX - drag.startX;
    const threshold = width * 0.18;
    track.style.transition = '';

    if (dx > threshold) {
      prevSlide();
    } else if (dx < -threshold) {
      nextSlide();
    } else {
      goTo(index);
    }

    drag = null;
    startAutoplay();
  }

  ensureDots();
  measure();
  goTo(0, { animate: false });

  window.addEventListener('resize', measure);
  prev?.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
  });
  next?.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
  });

  viewport?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    }
  });

  viewport?.addEventListener('pointerdown', onPointerDown);
  viewport?.addEventListener('pointermove', onPointerMove);
  viewport?.addEventListener('pointerup', onPointerUp);
  viewport?.addEventListener('pointercancel', onPointerUp);

  viewport?.addEventListener('mouseenter', stopAutoplay);
  viewport?.addEventListener('mouseleave', startAutoplay);
  viewport?.addEventListener('focusin', stopAutoplay);
  viewport?.addEventListener('focusout', startAutoplay);

  startAutoplay();

  return {
    goTo,
    next: nextSlide,
    prev: prevSlide,
    setSlidesCount: () => {
      // in case slides are re-rendered
    },
  };
}

function initNav() {
  const nav = qs(document, '.nav');
  const toggle = qs(document, '[data-nav-toggle]');

  if (!nav || !toggle) return;
  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    setAriaExpanded(toggle, open);
  });

  qsa(document, '.nav-panel a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      setAriaExpanded(toggle, false);
    });
  });
}

function initLanguageSelector() {
  const root = qs(document, '[data-lang]');
  if (!root) return;

  const trigger = qs(root, '[data-lang-trigger]');
  const label = qs(root, '.lang-label');
  const menu = qs(root, '[data-lang-menu]');
  const options = qsa(root, '[data-lang-option]');

  function close() {
    root.classList.remove('is-open');
    setAriaExpanded(trigger, false);
  }

  function open() {
    root.classList.add('is-open');
    setAriaExpanded(trigger, true);
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = root.classList.contains('is-open');
    if (isOpen) close();
    else open();
  });

  options.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-lang-option');
      label.textContent = value;
      close();
    });
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function initCookieConsent() {
  const banner = qs(document, '[data-cookie]');
  const modal = qs(document, '[data-cookie-modal]');
  if (!banner || !modal) return;

  const accept = qs(document, '[data-cookie-accept]');
  const decline = qs(document, '[data-cookie-decline]');
  const manage = qs(document, '[data-cookie-settings-open]');
  const openSettingsLinks = qsa(document, '[data-cookie-settings]');
  const save = qs(document, '[data-cookie-save]');
  const closeButtons = qsa(document, '[data-modal-close]');

  const analytics = qs(document, '[data-cookie-analytics]');
  const marketing = qs(document, '[data-cookie-marketing]');

  const KEY = 'leapstudio_cookie_preferences_v1';

  const defaultPrefs = { necessary: true, analytics: true, marketing: false };

  function readPrefs() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return {
        necessary: true,
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
      };
    } catch {
      return null;
    }
  }

  function writePrefs(prefs) {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  }

  function hideBanner() {
    banner.hidden = true;
  }

  function showBanner() {
    banner.hidden = false;
  }

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function applyToUI(prefs) {
    analytics.checked = Boolean(prefs.analytics);
    marketing.checked = Boolean(prefs.marketing);
  }

  function ensureInitial() {
    const prefs = readPrefs();
    if (!prefs) {
      showBanner();
      applyToUI(defaultPrefs);
      return;
    }
    hideBanner();
    applyToUI(prefs);
  }

  accept.addEventListener('click', () => {
    writePrefs({ necessary: true, analytics: true, marketing: true });
    hideBanner();
  });

  decline.addEventListener('click', () => {
    writePrefs({ necessary: true, analytics: false, marketing: false });
    hideBanner();
  });

  manage.addEventListener('click', () => {
    openModal();
  });

  openSettingsLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  save.addEventListener('click', () => {
    writePrefs({ necessary: true, analytics: analytics.checked, marketing: marketing.checked });
    hideBanner();
    closeModal();
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => closeModal());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  ensureInitial();
}

function initWorkControls() {
  const scroller = qs(document, '[data-work-scroller]');
  if (!scroller) return;
  const track = qs(scroller, '.work-track');
  const prev = qs(scroller, '[data-work-prev]');
  const next = qs(scroller, '[data-work-next]');

  function scrollByCards(direction) {
    const card = qs(track, '.work-card');
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width;
    track.scrollBy({ left: direction * (cardWidth + 16), behavior: supportsReducedMotion() ? 'auto' : 'smooth' });
  }

  prev?.addEventListener('click', () => scrollByCards(-1));
  next?.addEventListener('click', () => scrollByCards(1));
}

function initTeamRegionCarousel() {
  const carouselRoot = qs(document, '[data-carousel="team"]');
  if (!carouselRoot) return;

  const track = qs(carouselRoot, '[data-track]');
  const tabs = qsa(document, '[data-region-tab]');
  const dataEl = qs(document, '#teamData');
  const data = JSON.parse(dataEl.textContent);

  let currentRegion = 'north-america';
  let carousel = null;

  function render(regionKey) {
    const members = data[regionKey] || [];
    track.innerHTML = '';

    members.forEach((m) => {
      const slide = document.createElement('article');
      slide.className = 'team-card';
      slide.setAttribute('data-slide', '');

      const photo = document.createElement('div');
      photo.className = 'team-photo';
      photo.style.backgroundImage = `linear-gradient(120deg, rgba(46,107,255,.12), rgba(0,0,0,.55)), url('${m.image}')`;
      photo.setAttribute('role', 'img');
      photo.setAttribute('aria-label', `${m.name} portrait`);

      const body = document.createElement('div');
      body.className = 'team-body';
      body.innerHTML = `
        <p class="hero-tag">${m.office}</p>
        <h3 class="team-name">${m.name}</h3>
        <p class="team-meta">${m.title} · ${m.office}</p>
        <p class="team-quote">${m.quote}</p>
        <a class="btn" href="#contact">Contact Leap Studio ${m.office}</a>
      `.trim();

      slide.appendChild(photo);
      slide.appendChild(body);
      track.appendChild(slide);
    });

    // re-init carousel after rerender
    carousel = createCarousel(carouselRoot, { autoplayMs: 7000, dots: true });
  }

  function setRegion(regionKey) {
    currentRegion = regionKey;
    tabs.forEach((t) => {
      const key = t.getAttribute('data-region-tab');
      const active = key === regionKey;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    render(regionKey);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-region-tab');
      setRegion(key);
    });
  });

  setRegion(currentRegion);
}

function initHeroCarousel() {
  const root = qs(document, '[data-carousel="hero"]');
  if (!root) return;
  createCarousel(root, { autoplayMs: 6500, dots: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLanguageSelector();
  initCookieConsent();
  initHeroCarousel();
  initTeamRegionCarousel();
  initWorkControls();
});

