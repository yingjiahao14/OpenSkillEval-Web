/**
 * ShiftWise — Main JavaScript
 * Handles: mobile nav, testimonial carousel, pricing toggle, FAQ accordion, contact form, header scroll
 */

(function () {
  'use strict';

  /* ============================================
     HEADER SCROLL EFFECT
     ============================================ */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ============================================
     MOBILE NAVIGATION
     ============================================ */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* ============================================
     TESTIMONIAL CAROUSEL
     ============================================ */
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialNext = document.querySelector('.testimonial-next');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');

  let currentTestimonial = 0;
  let testimonialCount = 0;

  if (testimonialTrack) {
    testimonialCount = testimonialTrack.children.length;
  }

  function goToTestimonial(index) {
    if (!testimonialTrack || testimonialCount === 0) return;
    if (index < 0) index = testimonialCount - 1;
    if (index >= testimonialCount) index = 0;
    currentTestimonial = index;
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;

    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentTestimonial);
      dot.setAttribute('aria-current', i === currentTestimonial ? 'true' : 'false');
    });
  }

  if (testimonialPrev) {
    testimonialPrev.addEventListener('click', () => goToTestimonial(currentTestimonial - 1));
  }

  if (testimonialNext) {
    testimonialNext.addEventListener('click', () => goToTestimonial(currentTestimonial + 1));
  }

  testimonialDots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToTestimonial(i));
  });

  // Auto-advance testimonials every 6 seconds
  let testimonialInterval;
  function startTestimonialAuto() {
    testimonialInterval = setInterval(() => {
      goToTestimonial(currentTestimonial + 1);
    }, 6000);
  }

  function stopTestimonialAuto() {
    clearInterval(testimonialInterval);
  }

  if (testimonialTrack && testimonialCount > 1) {
    startTestimonialAuto();
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopTestimonialAuto);
      carousel.addEventListener('mouseleave', startTestimonialAuto);
    }
  }

  /* ============================================
     PRICING TOGGLE
     ============================================ */
  const pricingToggle = document.querySelector('.toggle-switch');
  const monthlyLabel = document.querySelector('.pricing-toggle-label.monthly');
  const annualLabel = document.querySelector('.pricing-toggle-label.annual');

  const monthlyPrices = { starter: 29.99, premium: 69.99 };
  const annualPrices = { starter: 23.99, premium: 55.99 };

  function updatePrices(isAnnual) {
    const starterPrice = document.querySelector('.pricing-starter-price');
    const premiumPrice = document.querySelector('.pricing-premium-price');
    const starterPeriod = document.querySelector('.pricing-starter-period');
    const premiumPeriod = document.querySelector('.pricing-premium-period');

    if (starterPrice) {
      starterPrice.textContent = isAnnual ? annualPrices.starter.toFixed(2) : monthlyPrices.starter.toFixed(2);
    }
    if (premiumPrice) {
      premiumPrice.textContent = isAnnual ? annualPrices.premium.toFixed(2) : monthlyPrices.premium.toFixed(2);
    }
    if (starterPeriod) {
      starterPeriod.textContent = isAnnual ? '/mo billed annually' : '/mo';
    }
    if (premiumPeriod) {
      premiumPeriod.textContent = isAnnual ? '/mo billed annually' : '/mo';
    }

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);
  }

  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      const isAnnual = !pricingToggle.classList.contains('annual');
      pricingToggle.classList.toggle('annual', isAnnual);
      pricingToggle.setAttribute('aria-checked', isAnnual ? 'true' : 'false');
      updatePrices(isAnnual);
    });
  }

  /* ============================================
     FAQ ACCORDION
     ============================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          const otherQ = other.querySelector('.faq-question');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  /* ============================================
     CONTACT FORM VALIDATION
     ============================================ */
  const contactForm = document.querySelector('.contact-form');
  const formSuccess = document.querySelector('.form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach((field) => {
        const formGroup = field.closest('.form-group');
        const errorEl = formGroup ? formGroup.querySelector('.form-error') : null;

        // Reset
        field.classList.remove('error');
        if (errorEl) errorEl.classList.remove('visible');

        // Validate
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          if (errorEl) errorEl.classList.add('visible');
        } else if (field.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            field.classList.add('error');
            if (errorEl) {
              errorEl.textContent = 'Please enter a valid email address.';
              errorEl.classList.add('visible');
            }
          }
        }
      });

      if (isValid) {
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('visible');
          // Focus the success message for screen readers
          formSuccess.setAttribute('tabindex', '-1');
          formSuccess.focus();
        }
      } else {
        // Focus first invalid field
        const firstInvalid = contactForm.querySelector('.error');
        if (firstInvalid) firstInvalid.focus();
      }
    });

    // Inline validation on blur
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => {
        const formGroup = input.closest('.form-group');
        const errorEl = formGroup ? formGroup.querySelector('.form-error') : null;

        if (input.hasAttribute('required') && !input.value.trim()) {
          input.classList.add('error');
          if (errorEl) errorEl.classList.add('visible');
        } else {
          input.classList.remove('error');
          if (errorEl) errorEl.classList.remove('visible');
        }

        if (input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            input.classList.add('error');
            if (errorEl) {
              errorEl.textContent = 'Please enter a valid email address.';
              errorEl.classList.add('visible');
            }
          }
        }
      });
    });
  }

  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ============================================
     ANIMATED COUNT-UP FOR STATS
     ============================================ */
  const statValues = document.querySelectorAll('.stat-value[data-count]');

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;

      if (Number.isInteger(target)) {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      } else {
        el.textContent = prefix + current.toFixed(1) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  if (statValues.length > 0 && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statValues.forEach((el) => statsObserver.observe(el));
  }
})();
