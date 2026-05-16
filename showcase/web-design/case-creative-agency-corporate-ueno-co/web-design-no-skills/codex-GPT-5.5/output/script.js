const toggle = document.querySelector('.menu-toggle');
const overlay = document.querySelector('.mobile-overlay');
const body = document.body;

if (toggle && overlay) {
  const setMenu = (isOpen) => {
    body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    overlay.setAttribute('aria-hidden', String(!isOpen));
  };

  toggle.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  overlay.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
}
