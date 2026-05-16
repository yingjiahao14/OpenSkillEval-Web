const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');
const body = document.body;

if (toggle && menu) {
  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
  };

  toggle.addEventListener('click', () => {
    setMenu(!body.classList.contains('menu-open'));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
}
