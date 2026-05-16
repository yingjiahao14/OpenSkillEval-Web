const carousel = document.querySelector('#product-carousel');
const prevButton = document.querySelector('#carousel-prev');
const nextButton = document.querySelector('#carousel-next');
const locatorForm = document.querySelector('#locator-form');
const storeResults = document.querySelector('#store-results');
const newsletterForm = document.querySelector('#newsletter-form');
const newsletterConfirmation = document.querySelector('#newsletter-confirmation');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#primary-nav');

const getScrollAmount = () => {
  const firstCard = carousel?.querySelector('.product-card');
  if (!carousel || !firstCard) return 320;
  const styles = window.getComputedStyle(carousel);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || '20');
  return firstCard.getBoundingClientRect().width + gap;
};

prevButton?.addEventListener('click', () => {
  carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});

nextButton?.addEventListener('click', () => {
  carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});

locatorForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  storeResults.hidden = false;
  storeResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  newsletterConfirmation.hidden = false;
  newsletterForm.reset();
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});
