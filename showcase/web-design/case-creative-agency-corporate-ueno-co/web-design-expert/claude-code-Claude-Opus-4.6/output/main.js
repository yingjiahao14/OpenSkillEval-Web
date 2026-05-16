// Volta Studio — Main JavaScript

(function() {
  'use strict';

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-overlay');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', function() {
      const isActive = hamburger.classList.toggle('is-active');
      overlay.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isActive);
      overlay.setAttribute('aria-hidden', !isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('is-active');
        overlay.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }
})();
