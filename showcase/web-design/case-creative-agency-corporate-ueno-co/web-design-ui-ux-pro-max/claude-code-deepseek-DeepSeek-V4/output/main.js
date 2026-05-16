/* ============================================
   Volta Studio — Shared JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  function openMenu() {
    hamburger.classList.add('active');
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      if (hamburger.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- Header scroll state ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Client Marquee — duplicate content for seamless loop ---
  document.querySelectorAll('.marquee-track').forEach(function (track) {
    var original = track.innerHTML;
    track.innerHTML = original + original;
  });

})();
