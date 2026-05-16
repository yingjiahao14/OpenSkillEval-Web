// Mobile menu toggle
(function () {
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = overlay && overlay.querySelector('.overlay-close');

  function openMenu() {
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && overlay) {
    hamburger.addEventListener('click', function () {
      overlay.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close on overlay link click
  if (overlay) {
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }
})();
