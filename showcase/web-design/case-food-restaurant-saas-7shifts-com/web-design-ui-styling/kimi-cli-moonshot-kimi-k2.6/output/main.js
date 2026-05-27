// ============================================
// ShiftWise — Global JavaScript
// ============================================

(function () {
  'use strict';

  // Mobile navigation
  const mobileNav = document.getElementById('mobile-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (menuClose && mobileNav) {
    menuClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Testimonial carousel
  const carousel = document.getElementById('testimonial-carousel');
  if (carousel) {
    const slides = carousel.querySelector('.testimonial-slides');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    let current = 0;
    const total = slides.children.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      slides.style.transform = `translateX(-${current * 100}%)`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-advance every 6 seconds
    setInterval(() => goTo(current + 1), 6000);
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach((i) => i.classList.remove('open'));
        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Pricing toggle
  const pricingToggle = document.getElementById('pricing-toggle');
  if (pricingToggle) {
    const monthlyLabel = document.getElementById('label-monthly');
    const annualLabel = document.getElementById('label-annual');
    const starterPrice = document.getElementById('starter-price');
    const premiumPrice = document.getElementById('premium-price');
    const starterPeriod = document.getElementById('starter-period');
    const premiumPeriod = document.getElementById('premium-period');
    let isAnnual = false;

    function updatePricing() {
      isAnnual = !isAnnual;
      pricingToggle.classList.toggle('active', isAnnual);
      monthlyLabel.classList.toggle('active', !isAnnual);
      annualLabel.classList.toggle('active', isAnnual);

      if (isAnnual) {
        starterPrice.textContent = '$23.99';
        premiumPrice.textContent = '$55.99';
        starterPeriod.textContent = '/mo billed annually';
        premiumPeriod.textContent = '/mo billed annually';
      } else {
        starterPrice.textContent = '$29.99';
        premiumPrice.textContent = '$69.99';
        starterPeriod.textContent = '/mo';
        premiumPeriod.textContent = '/mo';
      }
    }

    pricingToggle.addEventListener('click', updatePricing);
    if (monthlyLabel) monthlyLabel.addEventListener('click', () => { if (isAnnual) updatePricing(); });
    if (annualLabel) annualLabel.addEventListener('click', () => { if (!isAnnual) updatePricing(); });
  }

  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const fields = ['fullName', 'email', 'company', 'locations', 'message'];
      fields.forEach((id) => {
        const el = document.getElementById(id);
        const group = el?.closest('.form-group');
        if (!el || !el.value.trim()) {
          valid = false;
          if (group) group.classList.add('has-error');
        } else {
          if (group) group.classList.remove('has-error');
        }
      });

      // Email validation
      const emailEl = document.getElementById('email');
      if (emailEl && emailEl.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailEl.value.trim())) {
          valid = false;
          const group = emailEl.closest('.form-group');
          if (group) group.classList.add('has-error');
        }
      }

      if (valid) {
        contactForm.style.display = 'none';
        const success = document.getElementById('form-success');
        if (success) success.classList.add('show');
      }
    });

    // Clear errors on input
    contactForm.querySelectorAll('input, textarea, select').forEach((el) => {
      el.addEventListener('input', function () {
        const group = this.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  }

  // Stats count-up animation
  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    const statNumbers = statsSection.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
      if (animated) return;
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        animated = true;
        statNumbers.forEach((el) => {
          const targetText = el.dataset.target || el.textContent;
          const numericPart = parseFloat(targetText.replace(/[^0-9.]/g, ''));
          const suffix = targetText.replace(/[0-9.]/g, '');
          const duration = 1500;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericPart * eased;

            if (Number.isInteger(numericPart)) {
              el.textContent = Math.floor(current).toLocaleString() + suffix;
            } else {
              el.textContent = current.toFixed(2) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = targetText;
            }
          }

          requestAnimationFrame(update);
        });
      }
    }

    window.addEventListener('scroll', animateStats, { passive: true });
    animateStats(); // Check on load
  }
})();
