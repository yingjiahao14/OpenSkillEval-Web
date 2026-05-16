/* ============================================
   Volta Studio — Global Scripts
   ============================================ */

(function () {
  'use strict';

  /* ---- Mobile Menu Toggle ---- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const menuOpenIcon = document.getElementById('menuOpenIcon');
  const menuCloseIcon = document.getElementById('menuCloseIcon');

  function toggleMenu() {
    const isOpen = mobileOverlay.classList.toggle('open');
    if (menuOpenIcon) menuOpenIcon.style.display = isOpen ? 'none' : 'block';
    if (menuCloseIcon) menuCloseIcon.style.display = isOpen ? 'block' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuToggle && mobileOverlay) {
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu();
      });
    });
  }

  /* ---- Header scroll state ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 10) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ---- Marquee: duplicate content for seamless loop ---- */
  document.querySelectorAll('.marquee-row').forEach(function (row) {
    const content = row.querySelector('.marquee-content');
    if (content && !row.dataset.duplicated) {
      const clone = content.cloneNode(true);
      row.appendChild(clone);
      row.dataset.duplicated = 'true';
    }
  });
})();
