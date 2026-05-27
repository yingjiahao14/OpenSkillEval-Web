/* ==================== */
/* ShiftWise JavaScript */
/* ==================== */

document.addEventListener('DOMContentLoaded', function() {

  // ----- Header Scroll Effect -----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ----- Mobile Navigation -----
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ----- Testimonial Carousel -----
  const testimonialSlides = document.querySelector('.testimonial-slides');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const prevArrow = document.querySelector('.testimonial-arrow.prev');
  const nextArrow = document.querySelector('.testimonial-arrow.next');

  if (testimonialSlides && testimonialDots.length) {
    let currentSlide = 0;
    const totalSlides = testimonialDots.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      testimonialSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    if (prevArrow) prevArrow.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextArrow) nextArrow.addEventListener('click', () => goToSlide(currentSlide + 1));
    testimonialDots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

    // Auto-advance every 5 seconds
    setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  // ----- Pricing Toggle -----
  const pricingToggle = document.querySelector('.toggle-switch');
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const annualPrices = document.querySelectorAll('.price-annual');
  const monthlyPeriods = document.querySelectorAll('.period-monthly');
  const annualPeriods = document.querySelectorAll('.period-annual');

  if (pricingToggle) {
    pricingToggle.addEventListener('click', function() {
      pricingToggle.classList.toggle('annual');
      const isAnnual = pricingToggle.classList.contains('annual');

      // Update active label
      document.querySelectorAll('.toggle-label').forEach(label => {
        label.classList.toggle('active', isAnnual ? label.dataset.billing === 'annual' : label.dataset.billing === 'monthly');
      });

      // Toggle prices
      monthlyPrices.forEach(el => el.style.display = isAnnual ? 'none' : 'inline');
      annualPrices.forEach(el => el.style.display = isAnnual ? 'inline' : 'none');
      monthlyPeriods.forEach(el => el.style.display = isAnnual ? 'none' : 'inline');
      annualPeriods.forEach(el => el.style.display = isAnnual ? 'inline' : 'none');
    });
  }

  // ----- FAQ Accordion -----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const wasOpen = item.classList.contains('open');
        // Close all items
        faqItems.forEach(faq => faq.classList.remove('open'));
        // Open clicked item if it wasn't already open
        if (!wasOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ----- Contact Form Validation -----
  const contactForm = document.querySelector('#contact-form');
  const formSuccess = document.querySelector('.form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');

      // Clear previous errors
      contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
      });

      // Validate each required field
      requiredFields.forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          group.classList.add('has-error');
          isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          group.classList.add('has-error');
          isValid = false;
        }
      });

      if (isValid) {
        // Hide form and show success message
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('show');
        }
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ----- Stats Counter Animation -----
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  if (statValues.length) {
    const observerOptions = {
      threshold: 0.5
    };

    const animateCount = (el) => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCount = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target + suffix;
        }
      };

      updateCount();
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    statValues.forEach(stat => statsObserver.observe(stat));
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});