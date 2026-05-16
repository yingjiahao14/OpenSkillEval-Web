// ============================================
// Volta Studio — Main JavaScript
// ============================================

(function () {
  'use strict';

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (menuToggle && mobileOverlay) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.classList.toggle('open');
      mobileOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    mobileOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Header scroll state
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // Marquee: duplicate content for seamless loop
  document.querySelectorAll('.marquee-row').forEach(function (row) {
    const track = row.querySelector('.marquee-track');
    if (track) {
      track.innerHTML += track.innerHTML;
    }
  });
})();
