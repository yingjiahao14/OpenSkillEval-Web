(function () {
  const header = document.querySelector('[data-site-header]');
  const overlay = document.querySelector('[data-mobile-overlay]');
  const toggle = document.querySelector('[data-mobile-toggle]');
  const overlayClose = document.querySelector('[data-mobile-close]');

  function setOverlay(open) {
    if (!overlay) return;
    overlay.classList.toggle('is-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      const firstLink = overlay.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      if (toggle) toggle.focus();
    }
  }

  if (toggle && overlay) {
    toggle.addEventListener('click', () => setOverlay(!overlay.classList.contains('is-open')));
  }
  if (overlayClose && overlay) {
    overlayClose.addEventListener('click', () => setOverlay(false));
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target && e.target.matches('[data-overlay-backdrop]')) setOverlay(false);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOverlay(false);
  });
  document.addEventListener('click', (e) => {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    const target = e.target;
    if (target && target.tagName === 'A') setOverlay(false);
  });

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Marquee: duplicate content for seamless -50% translation.
  document.querySelectorAll('[data-marquee-track]').forEach((track) => {
    const original = track.innerHTML;
    track.innerHTML = original + original;
  });
})();
