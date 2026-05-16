const toggle = document.querySelector('[data-menu-toggle]');
const overlay = document.querySelector('[data-mobile-overlay]');
const body = document.body;

function setMenu(open) {
  body.classList.toggle('menu-open', open);
  if (toggle) toggle.setAttribute('aria-expanded', String(open));
  if (overlay) overlay.setAttribute('aria-hidden', String(!open));
}

if (toggle) {
  toggle.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
}

document.querySelectorAll('[data-mobile-overlay] a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});
