/* ShiftWise — Shared JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  initMobileNav();
  initTestimonialCarousel();
  initPricingToggle();
  initFAQAccordion();
  initContactForm();
  initAnimatedCounters();
});

/* Mobile Navigation */
function initMobileNav() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  const links = mobileNav.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* Testimonial Carousel */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-nav .prev');
  const nextBtn = document.querySelector('.testimonial-nav .next');

  if (!track) return;

  let current = 0;
  const total = track.children.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto-advance
  setInterval(() => goTo(current + 1), 5000);
}

/* Pricing Toggle */
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  const monthlyPrices = document.querySelectorAll('[data-monthly]');
  const annualPrices = document.querySelectorAll('[data-annual]');

  if (!toggle) return;

  let isAnnual = false;

  toggle.addEventListener('click', function() {
    isAnnual = !isAnnual;
    toggle.classList.toggle('active', isAnnual);

    // Update toggle labels
    const labels = document.querySelectorAll('.toggle-label');
    labels.forEach((label, i) => {
      label.classList.toggle('active', (i === 0 && !isAnnual) || (i === 1 && isAnnual));
    });

    // Update prices
    monthlyPrices.forEach(el => el.style.display = isAnnual ? 'none' : 'inline');
    annualPrices.forEach(el => el.style.display = isAnnual ? 'inline' : 'none');
  });
}

/* FAQ Accordion */
function initFAQAccordion() {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(question => {
    question.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Contact Form Validation */
function initContactForm() {
  const form = document.querySelector('#contact-form');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const group = field.closest('.form-group');
      const error = group.querySelector('.form-error');

      if (!field.value.trim()) {
        group.classList.add('has-error');
        field.classList.add('error');
        isValid = false;
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        group.classList.add('has-error');
        field.classList.add('error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
        field.classList.remove('error');
      }
    });

    if (isValid) {
      // Show success message
      const formContainer = form.closest('.contact-form') || form.parentElement;
      form.style.display = 'none';
      const success = document.createElement('div');
      success.className = 'form-success';
      success.innerHTML = `
        <div class="form-success-icon">✓</div>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. Our team will respond within one business day.</p>
      `;
      formContainer.appendChild(success);
    }
  });

  // Clear error on input
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      const group = this.closest('.form-group');
      group.classList.remove('has-error');
      this.classList.remove('error');
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Animated Counters */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-item h2');

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

function animateCounter(element) {
  const text = element.textContent;
  const match = text.match(/^([\d,.]+)(.*)/);
  if (!match) return;

  const target = parseFloat(match[1].replace(/,/g, ''));
  const suffix = match[2] || '';
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);

    if (match[1].includes(',')) {
      element.textContent = current.toLocaleString() + suffix;
    } else if (match[1].includes('.')) {
      element.textContent = current.toFixed(1) + suffix;
    } else {
      element.textContent = current + suffix;
    }

    if (step >= steps) clearInterval(timer);
  }, duration / steps);
}