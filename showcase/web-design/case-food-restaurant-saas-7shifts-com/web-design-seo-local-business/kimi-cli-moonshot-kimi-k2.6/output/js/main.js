/**
 * ShiftWise — Main JavaScript
 */

(function () {
  'use strict';

  /* ============================================
     Mobile Navigation
     ============================================ */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

  function toggleMobileNav() {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      mobileNav.classList.remove('open');
      mobileNavOverlay.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileNav.classList.add('open');
      mobileNavOverlay.classList.add('open');
      menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileNav);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', toggleMobileNav);
  }

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  });

  /* ============================================
     Testimonial Carousel
     ============================================ */
  const carouselTrack = document.querySelector('.testimonial-track');
  const carouselSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');

  let currentSlide = 0;
  const totalSlides = carouselSlides.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    if (carouselTrack) {
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-advance every 6 seconds
  if (totalSlides > 0) {
    setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);
  }

  /* ============================================
     Pricing Toggle
     ============================================ */
  const pricingToggle = document.querySelector('.toggle-switch');
  const monthlyLabel = document.querySelector('.pricing-toggle-label.monthly');
  const annualLabel = document.querySelector('.pricing-toggle-label.annual');
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const annualPrices = document.querySelectorAll('.price-annual');

  let isAnnual = false;

  function updatePricing() {
    isAnnual = !isAnnual;

    if (pricingToggle) {
      pricingToggle.classList.toggle('active', isAnnual);
    }

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

    monthlyPrices.forEach(el => {
      el.style.display = isAnnual ? 'none' : 'block';
    });

    annualPrices.forEach(el => {
      el.style.display = isAnnual ? 'block' : 'none';
    });
  }

  if (pricingToggle) {
    pricingToggle.addEventListener('click', updatePricing);
  }

  /* ============================================
     FAQ Accordion
     ============================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const otherAnswer = other.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  /* ============================================
     Contact Form Validation
     ============================================ */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      const successMessage = document.getElementById('form-success');

      // Clear previous errors
      contactForm.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));
      contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

      requiredFields.forEach(field => {
        const value = field.value.trim();
        const errorEl = field.parentElement.querySelector('.form-error');

        if (!value) {
          isValid = false;
          field.classList.add('error');
          if (errorEl) errorEl.classList.add('visible');
        } else if (field.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
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
        contactForm.reset();
        if (successMessage) {
          successMessage.classList.add('visible');
          setTimeout(() => {
            successMessage.classList.remove('visible');
          }, 5000);
        }
      }
    });
  }

  /* ============================================
     Scroll Reveal Animation
     ============================================ */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ============================================
     Stats Counter Animation
     ============================================ */
  const statValues = document.querySelectorAll('.stat-value[data-count]');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);

          el.textContent = prefix + current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }

        requestAnimationFrame(updateCounter);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => statsObserver.observe(el));

  /* ============================================
     Header Scroll Effect
     ============================================ */
  const header = document.querySelector('.header');

  if (header) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 20) {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    });
  }

})();
