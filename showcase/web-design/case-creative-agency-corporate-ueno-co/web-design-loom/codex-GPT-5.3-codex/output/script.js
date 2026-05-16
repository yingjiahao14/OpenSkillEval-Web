(function () {
  const menuButton = document.querySelector('[data-menu-btn]');
  const overlay = document.querySelector('[data-mobile-overlay]');

  if (menuButton && overlay) {
    menuButton.addEventListener('click', function () {
      const isOpen = menuButton.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuButton.classList.remove('open');
        overlay.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();
