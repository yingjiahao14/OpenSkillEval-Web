(function () {
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-mobile-panel]');
  const links = document.querySelectorAll('[data-mobile-panel] a');

  if (!toggle || !panel) return;

  function setOpen(isOpen) {
    document.body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    panel.setAttribute('aria-hidden', String(!isOpen));
  }

  toggle.addEventListener('click', () => {
    setOpen(!document.body.classList.contains('menu-open'));
  });

  links.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}());
