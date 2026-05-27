/* ===== VOLTA STUDIO — Scripts ===== */

(function () {
  'use strict';

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-overlay');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', function () {
      const isOpen = overlay.classList.toggle('is-open');
      hamburger.classList.toggle('is-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close overlay when a link is clicked
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        overlay.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Client Marquee (duplicate items for seamless loop) ---
  document.querySelectorAll('.marquee-row').forEach(function (row) {
    const items = row.innerHTML;
    row.innerHTML = items + items;
  });

})();
