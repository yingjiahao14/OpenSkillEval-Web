const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const carousel = document.querySelector('[data-carousel]');
const prevButton = document.querySelector('[data-carousel-prev]');
const nextButton = document.querySelector('[data-carousel-next]');

function setMenu(open) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  mobileMenu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  setMenu(!isOpen);
});

mobileMenu?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenu(false);
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenu(false);
  }
});

function scrollCarousel(direction) {
  if (!carousel) return;
  const card = carousel.querySelector('.news-card');
  const cardWidth = card ? card.getBoundingClientRect().width + 18 : carousel.clientWidth * 0.8;
  carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

prevButton?.addEventListener('click', () => scrollCarousel(-1));
nextButton?.addEventListener('click', () => scrollCarousel(1));

carousel?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    scrollCarousel(-1);
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    scrollCarousel(1);
  }
});
