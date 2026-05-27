/**
 * ShiftWise — Main JavaScript
 * Handles: mobile nav, testimonials, pricing toggle, FAQ accordion, form validation, scroll reveal
 */

(function () {
  'use strict';

  /* ── Mobile Navigation Drawer ─────────────── */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  /* Close drawer on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ── Testimonial Carousel ─────────────────── */
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    const track = carousel.querySelector('.testimonial-slides');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const prevBtn = carousel.querySelector('.testimonial-btn[data-dir="prev"]');
    const nextBtn = carousel.querySelector('.testimonial-btn[data-dir="next"]');
    const dotsContainer = carousel.querySelector('.testimonial-dots');
    let current = 0;
    const total = slides.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.testimonial-dot');
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.testimonial-dot');
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goTo(i));
      });
    }

    /* Auto-advance every 6s */
    setInterval(() => goTo(current + 1), 6000);
  }

  /* ── Pricing Toggle ───────────────────────── */
  const pricingToggle = document.querySelector('.toggle-switch');
  if (pricingToggle) {
    const monthlyLabel = document.querySelector('.toggle-label[data-plan="monthly"]');
    const annualLabel = document.querySelector('.toggle-label[data-plan="annual"]');
    const priceEls = document.querySelectorAll('[data-price-monthly]');

    function setAnnual(isAnnual) {
      pricingToggle.classList.toggle('is-annual', isAnnual);
      if (monthlyLabel) monthlyLabel.classList.toggle('is-active', !isAnnual);
      if (annualLabel) annualLabel.classList.toggle('is-active', isAnnual);

      priceEls.forEach((el) => {
        const monthly = el.dataset.priceMonthly;
        const annual = el.dataset.priceAnnual;
        if (monthly && annual) {
          el.textContent = isAnnual ? annual : monthly;
        }
      });
    }

    pricingToggle.addEventListener('click', () => {
      const isAnnual = !pricingToggle.classList.contains('is-annual');
      setAnnual(isAnnual);
    });
  }

  /* ── FAQ Accordion ────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      /* Close all others */
      faqItems.forEach((i) => i.classList.remove('is-open'));
      /* Toggle current */
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* ── Contact Form Validation ──────────────── */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const fields = contactForm.querySelectorAll('[data-required]');
      fields.forEach((field) => {
        const group = field.closest('.form-group');
        const value = field.value.trim();
        if (!value) {
          isValid = false;
          group.classList.add('has-error');
        } else {
          group.classList.remove('has-error');
        }
      });

      /* Email validation */
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField) {
        const group = emailField.closest('.form-group');
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
          isValid = false;
          group.classList.add('has-error');
        }
      }

      const successMsg = document.querySelector('.form-success');
      if (isValid) {
        contactForm.style.display = 'none';
        if (successMsg) successMsg.classList.add('is-visible');
      }
    });

    /* Clear errors on input */
    contactForm.querySelectorAll('.form-input, .form-textarea, .form-select').forEach((input) => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  }

  /* ── Scroll Reveal ────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ── Stats Count-Up Animation ─────────────── */
  const statValues = document.querySelectorAll('[data-count]');
  if (statValues.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statValues.forEach((el) => countObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); /* easeOutCubic */
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ── Active Nav Link ──────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .drawer-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
