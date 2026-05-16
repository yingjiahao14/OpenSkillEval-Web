const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const modal = document.querySelector('[data-modal]');
const modalClose = document.querySelector('[data-modal-close]');
const donateTriggers = document.querySelectorAll('.donate-trigger');
let lastFocusedElement = null;

function closeMenu() {
  body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

primaryNav?.querySelectorAll('a, button').forEach((item) => {
  item.addEventListener('click', () => closeMenu());
});

function openModal() {
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  body.classList.add('modal-open');
  modal.querySelector('[data-modal-close]')?.focus();
}

function closeModal() {
  modal.hidden = true;
  body.classList.remove('modal-open');
  lastFocusedElement?.focus();
}

donateTriggers.forEach((trigger) => {
  trigger.addEventListener('click', openModal);
});

modalClose?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!modal.hidden) closeModal();
    closeMenu();
  }
});

document.querySelectorAll('.amount-option').forEach((option) => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.amount-option').forEach((item) => item.classList.remove('is-selected'));
    option.classList.add('is-selected');
    const customInput = document.querySelector('.custom-amount input');
    if (customInput) customInput.value = '';
  });
});

document.querySelector('.custom-amount input')?.addEventListener('input', () => {
  document.querySelectorAll('.amount-option').forEach((item) => item.classList.remove('is-selected'));
});

document.querySelector('.donation-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = event.currentTarget.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Thank you — donation flow ready';
  submitButton.disabled = true;
  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2400);
});

document.querySelectorAll('[data-accordion] .accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const isOpen = item.classList.contains('is-open');
    item.parentElement.querySelectorAll('.accordion-item').forEach((sibling) => {
      sibling.classList.remove('is-open');
      sibling.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

const carousel = document.querySelector('[data-carousel]');
const track = carousel?.querySelector('.carousel-track');
const cards = track ? Array.from(track.children) : [];
const nextButton = document.querySelector('[data-carousel-next]');
const prevButton = document.querySelector('[data-carousel-prev]');
const dotsContainer = document.querySelector('[data-carousel-dots]');
let carouselIndex = 0;

function visibleCount() {
  if (window.matchMedia('(max-width: 640px)').matches) return 1;
  if (window.matchMedia('(max-width: 1024px)').matches) return 2;
  return 3;
}

function maxIndex() {
  return Math.max(0, cards.length - visibleCount());
}

function cardStep() {
  if (!cards[0]) return 0;
  const cardWidth = cards[0].getBoundingClientRect().width;
  const styles = window.getComputedStyle(track);
  return cardWidth + parseFloat(styles.gap || '0');
}

function renderDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  for (let index = 0; index <= maxIndex(); index += 1) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show news slide ${index + 1}`);
    dot.addEventListener('click', () => {
      carouselIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
  if (!track) return;
  carouselIndex = Math.min(Math.max(carouselIndex, 0), maxIndex());
  track.style.transform = `translateX(-${carouselIndex * cardStep()}px)`;
  dotsContainer?.querySelectorAll('button').forEach((dot, index) => {
    dot.classList.toggle('is-active', index === carouselIndex);
  });
}

nextButton?.addEventListener('click', () => {
  carouselIndex = carouselIndex >= maxIndex() ? 0 : carouselIndex + 1;
  updateCarousel();
});

prevButton?.addEventListener('click', () => {
  carouselIndex = carouselIndex <= 0 ? maxIndex() : carouselIndex - 1;
  updateCarousel();
});

window.addEventListener('resize', () => {
  renderDots();
  updateCarousel();
});

renderDots();
updateCarousel();

const counters = document.querySelectorAll('[data-counter]');
let countersStarted = false;

function formatCounter(value, element) {
  if (element.dataset.format === 'compact') {
    return value >= 1000 ? `${Math.round(value / 1000)}K` : String(value);
  }
  return `${value}${element.dataset.suffix || ''}`;
}

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      counter.textContent = formatCounter(current, counter);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  const root = document.querySelector('[data-counter-root]');
  if (root) observer.observe(root);
} else {
  animateCounters();
}
