(function () {
  'use strict';

  // ─── Header scroll state ───
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Mobile menu toggle ───
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.mobile-overlay');

  if (toggle && overlay) {
    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });
  }

  // ─── Marquee: duplicate tracks for seamless loop ───
  document.querySelectorAll('.marquee-row').forEach(row => {
    const track = row.querySelector('.marquee-track');
    if (!track) return;
    // Clone the track and append it so the content repeats seamlessly
    const clone = track.cloneNode(true);
    row.appendChild(clone);
  });
})();
