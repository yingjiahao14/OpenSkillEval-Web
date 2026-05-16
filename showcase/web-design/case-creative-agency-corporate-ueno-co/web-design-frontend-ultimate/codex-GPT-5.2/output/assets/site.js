(function () {
  const body = document.body;

  function qs(sel) {
    return document.querySelector(sel);
  }

  function setAriaExpanded(el, expanded) {
    if (!el) return;
    el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function trapFocus(container, enabled) {
    if (!container) return;
    if (!enabled) {
      container._trapHandler && document.removeEventListener('keydown', container._trapHandler);
      container._trapHandler = null;
      return;
    }

    const handler = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const items = Array.from(focusables).filter((x) => x.offsetParent !== null);
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container._trapHandler = handler;
    document.addEventListener('keydown', handler);
  }

  const menuBtn = qs('[data-menu-button]');
  const overlay = qs('[data-menu-overlay]');
  const closeBtn = qs('[data-menu-close]');

  function openMenu() {
    if (!overlay) return;
    overlay.dataset.open = 'true';
    body.style.overflow = 'hidden';
    setAriaExpanded(menuBtn, true);
    trapFocus(overlay, true);
    const firstLink = overlay.querySelector('a');
    firstLink && firstLink.focus();
  }

  function closeMenu() {
    if (!overlay) return;
    overlay.dataset.open = 'false';
    body.style.overflow = '';
    setAriaExpanded(menuBtn, false);
    trapFocus(overlay, false);
    menuBtn && menuBtn.focus();
  }

  function toggleMenu() {
    if (!overlay) return;
    const isOpen = overlay.dataset.open === 'true';
    isOpen ? closeMenu() : openMenu();
  }

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', toggleMenu);
    closeBtn && closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });
    overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  }

  // Marquee: duplicate content for seamless loop and set duration based on content width
  function setupMarquee() {
    const rows = document.querySelectorAll('[data-marquee-row]');
    rows.forEach((row) => {
      const track = row.querySelector('[data-marquee-track]');
      if (!track) return;
      if (track.dataset.ready === 'true') return;

      const original = track.innerHTML;
      track.innerHTML = original + original;
      track.dataset.ready = 'true';

      // After paint, compute width and set duration (px/sec feel)
      requestAnimationFrame(() => {
        const total = track.scrollWidth;
        const half = total / 2;
        const pxPerSecond = row.dataset.speed === 'slow' ? 65 : row.dataset.speed === 'fast' ? 95 : 78;
        const seconds = Math.max(14, Math.min(42, half / pxPerSecond));
        track.style.animationDuration = seconds.toFixed(2) + 's';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMarquee);
  } else {
    setupMarquee();
  }
})();

