/* ==========================================================================
   Volta Studio — JavaScript
   Hamburger menu toggle + marquee duplication for seamless loop
   ========================================================================== */

(function() {
  'use strict';

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Marquee: duplicate content for seamless infinite scroll ---
  var tracks = document.querySelectorAll('.marquee-track');
  tracks.forEach(function(track) {
    var clone = track.innerHTML;
    track.innerHTML = clone + clone;
  });

})();
