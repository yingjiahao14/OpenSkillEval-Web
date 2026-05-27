/* ShiftWise — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyHeader();
  initScrollAnimations();
  initTestimonialCarousel();
  initPricingToggle();
  initFaqAccordion();
  initContactForm();
  initCountUp();
});

/* ── Mobile Navigation ── */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('nav-overlay');
  const closeBtn = document.getElementById('mobile-close-btn');
  if (!btn || !drawer) return;

  function openNav() {
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (overlay) overlay.addEventListener('click', closeNav);

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

/* ── Sticky Header ── */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ── Scroll Animations ── */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}

/* ── Testimonial Carousel ── */
function initTestimonialCarousel() {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  let current = 0;
  const total = slides.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  if (dotsContainer) {
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Auto-advance every 6 seconds
  let autoplay = setInterval(() => goTo(current + 1), 6000);
  track.closest('.relative')?.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.closest('.relative')?.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 6000);
  });
}

/* ── Pricing Toggle ── */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  const monthlyLabel = document.getElementById('monthly-label');
  const annualLabel = document.getElementById('annual-label');
  const knob = toggle.querySelector('.toggle-knob');
  let isAnnual = false;

  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggle.classList.toggle('bg-primary', isAnnual);
    toggle.classList.toggle('bg-slate-300', !isAnnual);
    knob.style.transform = isAnnual ? 'translateX(24px)' : 'translateX(0)';

    if (monthlyLabel && annualLabel) {
      monthlyLabel.classList.toggle('text-slate-900', !isAnnual);
      monthlyLabel.classList.toggle('font-semibold', !isAnnual);
      monthlyLabel.classList.toggle('text-slate-400', isAnnual);
      annualLabel.classList.toggle('text-slate-900', isAnnual);
      annualLabel.classList.toggle('font-semibold', isAnnual);
      annualLabel.classList.toggle('text-slate-400', !isAnnual);
    }

    document.querySelectorAll('[data-monthly]').forEach(el => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
    });

    document.querySelectorAll('[data-period]').forEach(el => {
      el.textContent = isAnnual ? '/mo (billed annually)' : '/mo';
    });

    const badge = document.getElementById('save-badge');
    if (badge) badge.classList.toggle('hidden', !isAnnual);
  });
}

/* ── FAQ Accordion ── */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const chevron = item.querySelector('.faq-chevron');

    question.addEventListener('click', () => {
      const isOpen = answer.classList.contains('open');

      // Close all
      items.forEach(other => {
        other.querySelector('.faq-answer').classList.remove('open');
        other.querySelector('.faq-chevron').classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        answer.classList.add('open');
        chevron.classList.add('open');
      }
    });
  });
}

/* ── Contact Form ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.form-input').forEach(input => input.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(err => err.classList.remove('show'));

    // Validate required fields
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const company = form.querySelector('[name="company"]');
    const message = form.querySelector('[name="message"]');

    if (!name.value.trim()) {
      showError(name, 'Full name is required');
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, 'Email address is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    if (!company.value.trim()) {
      showError(company, 'Company name is required');
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'Message is required');
      isValid = false;
    }

    if (isValid) {
      form.style.display = 'none';
      const successEl = document.getElementById('form-success');
      if (successEl) successEl.classList.remove('hidden');
    }
  });

  function showError(input, msg) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('show');
    }
  }
}

/* ── Count-Up Animation ── */
function initCountUp() {
  const stats = document.querySelectorAll('[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  stats.forEach(stat => observer.observe(stat));
}

function animateCount(el) {
  const target = el.dataset.count;
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isDecimal = target.includes('.');
  const numTarget = parseFloat(target.replace(/,/g, ''));
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = numTarget * eased;

    if (isDecimal) {
      el.textContent = prefix + current.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    } else {
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + numTarget.toLocaleString() + suffix;
    }
  }
  requestAnimationFrame(update);
}
