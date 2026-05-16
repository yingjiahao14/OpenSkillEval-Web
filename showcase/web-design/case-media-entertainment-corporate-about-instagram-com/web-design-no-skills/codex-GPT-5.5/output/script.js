const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const carousel = document.querySelector('.news-carousel');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

function setMenu(open) {
  menuToggle.classList.toggle('is-active', open);
  navMenu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
}

menuToggle.addEventListener('click', () => {
  setMenu(!navMenu.classList.contains('is-open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenu(false);
  }
});

function scrollCarousel(direction) {
  const card = carousel.querySelector('.news-card');
  const cardWidth = card ? card.getBoundingClientRect().width : 340;
  carousel.scrollBy({ left: direction * (cardWidth + 22), behavior: 'smooth' });
}

prevButton.addEventListener('click', () => scrollCarousel(-1));
nextButton.addEventListener('click', () => scrollCarousel(1));

carousel.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    scrollCarousel(1);
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    scrollCarousel(-1);
  }
});
