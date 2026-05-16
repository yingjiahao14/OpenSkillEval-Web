const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const carousel = document.querySelector('[data-carousel]');
const scrollButtons = document.querySelectorAll('[data-scroll]');

function setMenuState(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  menu.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

menu?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuState(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    setMenuState(false);
    menuToggle.focus();
  }
});

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!carousel) return;
    const direction = button.dataset.scroll === 'left' ? -1 : 1;
    const card = carousel.querySelector('.news-card');
    const scrollAmount = card ? card.getBoundingClientRect().width + 22 : 390;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  });
});
