/* ============================================
   ShiftWise — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTestimonialCarousel();
  initPricingToggle();
  initFaqAccordion();
  initContactForm();
  initAnimatedCounters();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  });

  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* Testimonial Carousel */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-slides');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');

  if (!track) return;

  let current = 0;
  const slides = track.children;
  const total = slides.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Auto-advance every 6 seconds
  setInterval(() => goTo(current + 1), 6000);
}

/* Pricing Toggle */
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  const monthlyLabel = document.querySelector('[data-billing="monthly"]');
  const annualLabel = document.querySelector('[data-billing="annual"]');

  if (!toggle) return;

  let isAnnual = false;

  function updatePrices() {
    const prices = document.querySelectorAll('[data-price]');
    prices.forEach(el => {
      const monthly = el.dataset.priceMonthly;
      const annual = el.dataset.priceAnnual;
      if (!monthly || !annual) return;
      el.textContent = isAnnual ? annual : monthly;
    });

    const periods = document.querySelectorAll('[data-period]');
    periods.forEach(el => {
      el.textContent = isAnnual ? '/mo billed annually' : '/mo';
    });

    toggle.classList.toggle('active', isAnnual);
    monthlyLabel?.classList.toggle('active', !isAnnual);
    annualLabel?.classList.toggle('active', isAnnual);
  }

  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    updatePrices();
  });

  monthlyLabel?.addEventListener('click', () => {
    isAnnual = false;
    updatePrices();
  });

  annualLabel?.addEventListener('click', () => {
    isAnnual = true;
    updatePrices();
  });
}

/* FAQ Accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* Contact Form */
function initContactForm() {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  const successMsg = form.parentElement.querySelector('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const group = field.closest('.form-group');
      const error = group?.querySelector('.form-error');

      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
        error?.classList.add('visible');
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        isValid = false;
        field.classList.add('error');
        if (error) {
          error.textContent = 'Please enter a valid email address.';
          error.classList.add('visible');
        }
      } else {
        field.classList.remove('error');
        error?.classList.remove('visible');
      }
    });

    if (isValid) {
      form.style.display = 'none';
      successMsg?.classList.add('visible');
    }
  });

  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const group = field.closest('.form-group');
      const error = group?.querySelector('.form-error');
      error?.classList.remove('visible');
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Animated Counters */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);
    el.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
