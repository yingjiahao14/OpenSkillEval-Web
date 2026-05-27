/* ===== ShiftWise — Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCarousel();
  initPricingToggle();
  initFaqAccordion();
  initContactForm();
  initScrollAnimations();
  initStatCounters();
});

/* ===== Mobile Navigation ===== */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (!toggle || !mobileNav) return;

  function close() {
    toggle.classList.remove('open');
    mobileNav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      close();
    } else {
      toggle.classList.add('open');
      mobileNav.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  if (overlay) overlay.addEventListener('click', close);
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
}

/* ===== Testimonial Carousel ===== */
function initCarousel() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;
  const total = cards.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  let autoplay = setInterval(() => goTo(current + 1), 5000);
  const carousel = document.querySelector('.testimonials-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1), 5000);
    });
  }
}

/* ===== Pricing Toggle ===== */
function initPricingToggle() {
  const toggle = document.querySelector('.pricing-toggle__switch');
  if (!toggle) return;

  const monthlyLabel = document.querySelector('.pricing-toggle__label--monthly');
  const annualLabel = document.querySelector('.pricing-toggle__label--annual');
  let isAnnual = false;

  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggle.classList.toggle('active', isAnnual);
    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

    document.querySelectorAll('[data-monthly]').forEach(el => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
    });
    document.querySelectorAll('[data-period-monthly]').forEach(el => {
      el.textContent = isAnnual ? el.dataset.periodAnnual : el.dataset.periodMonthly;
    });
  });
}

/* ===== FAQ Accordion ===== */
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ===== Contact Form ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successEl = document.querySelector('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(input => {
      const error = input.parentElement.querySelector('.form-error');
      if (!input.value.trim()) {
        input.classList.add('error');
        if (error) error.style.display = 'block';
        valid = false;
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.classList.add('error');
        if (error) {
          error.textContent = 'Please enter a valid email address.';
          error.style.display = 'block';
        }
        valid = false;
      } else {
        input.classList.remove('error');
        if (error) error.style.display = 'none';
      }
    });

    if (valid) {
      form.style.display = 'none';
      if (successEl) successEl.classList.add('show');
    }
  });

  form.querySelectorAll('[required]').forEach(input => {
    input.addEventListener('input', () => {
      const error = input.parentElement.querySelector('.form-error');
      if (input.value.trim()) {
        input.classList.remove('error');
        if (error) error.style.display = 'none';
      }
    });
  });
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

/* ===== Animated Stat Counters ===== */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.countTo);
  const suffix = el.dataset.countSuffix || '';
  const prefix = el.dataset.countPrefix || '';
  const hasDecimal = String(target).includes('.');
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    if (hasDecimal) {
      el.textContent = prefix + current.toFixed(0) + suffix;
    } else {
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + (hasDecimal ? target : target.toLocaleString()) + suffix;
  }

  requestAnimationFrame(update);
}
