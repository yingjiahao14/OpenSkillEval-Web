const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileOverlay = document.querySelector('[data-mobile-overlay]');

if (menuToggle && mobileOverlay) {
  const setMenuState = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileOverlay.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  mobileOverlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });
}
