/**
 * ShiftWise — Main JavaScript
 * Handles navigation, pricing toggle, FAQ accordion, testimonial carousel, contact form, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initPricingToggle();
  initFAQAccordion();
  initTestimonialCarousel();
  initContactForm();
  initScrollAnimations();
  initCountUp();
});

/* ========== Header Scroll Effect ========== */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ========== Mobile Navigation ========== */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  const overlay = document.querySelector('.overlay');
  const mobileLinks = document.querySelectorAll('.nav-mobile a');

  if (!toggle || !mobileNav || !overlay) return;

  function open() {
    toggle.classList.add('active');
    mobileNav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    toggle.classList.remove('active');
    mobileNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? close() : open();
  });

  overlay.addEventListener('click', close);
  mobileLinks.forEach(link => link.addEventListener('click', close));
}

/* ========== Pricing Toggle ========== */
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  if (!toggle) return;

  const monthlyLabel = document.querySelector('.pricing-toggle .monthly-label');
  const annualLabel = document.querySelector('.pricing-toggle .annual-label');
  const starterPrice = document.querySelector('.starter-price');
  const premiumPrice = document.querySelector('.premium-price');
  const starterPeriod = document.querySelector('.starter-period');
  const premiumPeriod = document.querySelector('.premium-period');
  const starterNote = document.querySelector('.starter-note');
  const premiumNote = document.querySelector('.premium-note');

  const prices = {
    monthly: { starter: '$29.99', premium: '$69.99' },
    annual: { starter: '$23.99', premium: '$55.99' }
  };

  toggle.addEventListener('click', () => {
    const isAnnual = toggle.classList.toggle('active');

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

    if (starterPrice) starterPrice.textContent = isAnnual ? prices.annual.starter : prices.monthly.starter;
    if (premiumPrice) premiumPrice.textContent = isAnnual ? prices.annual.premium : prices.monthly.premium;

    if (starterPeriod) starterPeriod.textContent = isAnnual ? '/month, billed annually' : '/month';
    if (premiumPeriod) premiumPeriod.textContent = isAnnual ? '/month, billed annually' : '/month';

    if (starterNote) starterNote.textContent = isAnnual ? 'Save 20% with annual billing' : '';
    if (premiumNote) premiumNote.textContent = isAnnual ? 'Save 20% with annual billing' : '';
  });
}

/* ========== FAQ Accordion ========== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
    });
  });
}

/* ========== Testimonial Carousel ========== */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');

  let current = 0;
  const total = cards.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto-advance every 6 seconds
  setInterval(() => goTo(current + 1), 6000);
}

/* ========== Contact Form ========== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const successMessage = document.querySelector('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    requiredFields.forEach(field => {
      const value = field.value.trim();
      let error = '';

      if (!value) {
        error = 'This field is required.';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address.';
      }

      if (error) {
        isValid = false;
        field.classList.add('error');
        const errorEl = document.createElement('p');
        errorEl.className = 'error-message';
        errorEl.textContent = error;
        field.parentNode.appendChild(errorEl);
      }
    });

    if (isValid) {
      form.style.display = 'none';
      if (successMessage) successMessage.classList.add('show');
    }
  });
}

/* ========== Scroll Animations ========== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.feature-card, .step, .stat-item, .pricing-card, .team-card, .office-card, .integration-category').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/* ========== Count-Up Animation ========== */
function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.dataset.value || el.textContent;
        const numeric = parseFloat(raw.replace(/[^0-9.]/g, ''));
        const suffix = raw.replace(/[0-9.,]/g, '');
        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(numeric * eased);

          if (raw.includes('.')) {
            el.textContent = (numeric * eased).toFixed(1) + suffix;
          } else {
            el.textContent = current.toLocaleString() + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = raw;
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}
