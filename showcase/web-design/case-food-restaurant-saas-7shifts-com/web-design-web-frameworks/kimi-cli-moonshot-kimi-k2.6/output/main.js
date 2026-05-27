/**
 * ShiftWise — Global JavaScript
 */

// Mobile Navigation
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.mobile-nav');
  const close = document.querySelector('.mobile-nav-close');
  const links = document.querySelectorAll('.mobile-nav-links a');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => nav.classList.add('open'));
  close?.addEventListener('click', () => nav.classList.remove('open'));
  nav.addEventListener('click', (e) => {
    if (e.target === nav) nav.classList.remove('open');
  });
  links.forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// Testimonial Carousel
function initTestimonialCarousel() {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) return;

  const cards = carousel.querySelectorAll('.testimonial-card');
  const prevBtn = carousel.querySelector('.testimonial-prev');
  const nextBtn = carousel.querySelector('.testimonial-next');
  const dots = carousel.querySelectorAll('.testimonial-dot');
  let current = 0;

  function show(index) {
    cards.forEach((card, i) => {
      card.style.display = i === index ? 'block' : 'none';
      card.style.opacity = i === index ? '1' : '0';
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    current = index;
  }

  show(0);

  prevBtn?.addEventListener('click', () => {
    show((current - 1 + cards.length) % cards.length);
  });

  nextBtn?.addEventListener('click', () => {
    show((current + 1) % cards.length);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => show(i));
  });

  // Auto-advance every 6 seconds
  setInterval(() => {
    show((current + 1) % cards.length);
  }, 6000);
}

// Pricing Toggle
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  if (!toggle) return;

  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const annualPrices = document.querySelectorAll('.price-annual');
  const monthlyLabel = document.querySelector('.pricing-toggle-label.monthly');
  const annualLabel = document.querySelector('.pricing-toggle-label.annual');

  function update(isAnnual) {
    toggle.classList.toggle('active', isAnnual);
    monthlyLabel?.classList.toggle('active', !isAnnual);
    annualLabel?.classList.toggle('active', isAnnual);
    monthlyPrices.forEach(el => el.style.display = isAnnual ? 'none' : 'flex');
    annualPrices.forEach(el => el.style.display = isAnnual ? 'flex' : 'none');
  }

  toggle.addEventListener('click', () => {
    update(!toggle.classList.contains('active'));
  });

  update(false);
}

// FAQ Accordion
function initFAQ() {
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

// Contact Form Validation
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = form.querySelectorAll('[data-required]');
    fields.forEach(field => {
      const errorEl = field.closest('.form-group')?.querySelector('.form-error');
      if (!field.value.trim()) {
        valid = false;
        field.classList.add('error');
        errorEl?.classList.add('visible');
      } else {
        field.classList.remove('error');
        errorEl?.classList.remove('visible');
      }
    });

    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errorEl = emailField.closest('.form-group')?.querySelector('.form-error');
      if (!emailRe.test(emailField.value.trim())) {
        valid = false;
        emailField.classList.add('error');
        errorEl?.classList.add('visible');
      }
    }

    const successEl = form.querySelector('.form-success');
    if (valid) {
      successEl?.classList.add('visible');
      form.reset();
      fields.forEach(f => f.classList.remove('error'));
      fields.forEach(f => {
        const err = f.closest('.form-group')?.querySelector('.form-error');
        err?.classList.remove('visible');
      });
      setTimeout(() => successEl?.classList.remove('visible'), 5000);
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const err = field.closest('.form-group')?.querySelector('.form-error');
      err?.classList.remove('visible');
    });
  });
}

// Stats Counter Animation
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-value[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const isDecimal = el.dataset.decimal === 'true';
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = target * ease;

          if (isDecimal) {
            el.textContent = prefix + current.toFixed(1) + suffix;
          } else {
            el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTestimonialCarousel();
  initPricingToggle();
  initFAQ();
  initContactForm();
  initStatsCounter();
});
