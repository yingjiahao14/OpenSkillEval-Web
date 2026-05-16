const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const carousel = document.querySelector('.product-carousel');
document.querySelectorAll('.carousel-btn').forEach((button) => {
  button.addEventListener('click', () => {
    if (!carousel) return;
    const direction = button.dataset.direction === 'prev' ? -1 : 1;
    const card = carousel.querySelector('.product-card');
    const cardWidth = card ? card.getBoundingClientRect().width : 320;
    carousel.scrollBy({ left: direction * (cardWidth + 22) * 2, behavior: 'smooth' });
  });
});

const locatorForm = document.querySelector('#locator-form');
const storeResults = document.querySelector('#store-results');
const zipInput = document.querySelector('#zip-code');

locatorForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!storeResults || !zipInput) return;
  zipInput.value = zipInput.value.trim() || '60614';
  storeResults.hidden = false;
  storeResults.animate([
    { opacity: 0, transform: 'translateY(14px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 320, easing: 'ease-out' });
});

const newsletterForm = document.querySelector('#newsletter-form');
const newsletterMessage = document.querySelector('#newsletter-message');

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = newsletterForm.querySelector('input[type="email"]');
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  newsletterMessage.hidden = false;
  newsletterMessage.animate([
    { opacity: 0, transform: 'translateY(10px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 260, easing: 'ease-out' });
  newsletterForm.reset();
});
