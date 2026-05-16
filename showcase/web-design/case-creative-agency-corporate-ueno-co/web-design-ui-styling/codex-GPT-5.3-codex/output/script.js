(function () {
  const menuBtn = document.querySelector('[data-menu-btn]');
  const overlay = document.querySelector('[data-mobile-overlay]');

  if (menuBtn && overlay) {
    const toggle = () => {
      const open = menuBtn.classList.toggle('open');
      overlay.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', toggle);
    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        overlay.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();
