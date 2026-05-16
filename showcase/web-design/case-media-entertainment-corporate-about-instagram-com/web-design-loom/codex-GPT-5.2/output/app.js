const qs = (sel, el = document) => el.querySelector(sel);
const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

function lockScroll(locked) {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

function setupMobileNav() {
  const openBtn = qs('#navToggle');
  const overlay = qs('#navOverlay');
  const closeBtn = qs('#navClose');
  const panel = qs('#navPanel');

  if (!openBtn || !overlay || !closeBtn || !panel) return;

  let lastFocused = null;

  const open = () => {
    lastFocused = document.activeElement;
    overlay.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    lockScroll(true);
    closeBtn.focus();
  };

  const close = () => {
    overlay.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    lockScroll(false);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  openBtn.addEventListener('click', () => {
    const isOpen = overlay.getAttribute('aria-hidden') === 'false';
    if (isOpen) close();
    else open();
  });

  closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  qsa('a[data-close-nav="true"]', overlay).forEach((a) => {
    a.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    const isOpen = overlay.getAttribute('aria-hidden') === 'false';
    if (!isOpen) return;
    if (e.key === 'Escape') close();

    if (e.key === 'Tab') {
      const focusables = qsa('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', panel)
        .filter((node) => !node.hasAttribute('disabled') && node.getAttribute('aria-hidden') !== 'true');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

function setupNewsCarousel() {
  const track = qs('#newsCarousel');
  const prev = qs('#newsPrev');
  const next = qs('#newsNext');
  if (!track || !prev || !next) return;

  const updateControls = () => {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft >= maxScrollLeft - 2;
    prev.disabled = atStart;
    next.disabled = atEnd;
  };

  const pageScroll = (dir) => {
    const cards = qsa('.news-card', track);
    const cardWidth = cards[0]?.getBoundingClientRect().width ?? 320;
    const gap = 14;
    const delta = (cardWidth + gap) * 1.15;
    track.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  prev.addEventListener('click', () => pageScroll(-1));
  next.addEventListener('click', () => pageScroll(1));
  track.addEventListener('scroll', updateControls, { passive: true });

  // Keyboard affordance for desktop users
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      pageScroll(1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      pageScroll(-1);
    }
  });

  const ro = new ResizeObserver(updateControls);
  ro.observe(track);
  window.addEventListener('load', updateControls, { once: true });
  updateControls();
}

setupMobileNav();
setupNewsCarousel();

