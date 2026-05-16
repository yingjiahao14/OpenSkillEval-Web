(function () {
  const menuBtn = document.querySelector('[data-menu-btn]');
  const overlay = document.querySelector('[data-mobile-overlay]');

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', function () {
      const isOpen = overlay.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.textContent = isOpen ? '×' : '☰';
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        overlay.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      });
    });
  }
})();
