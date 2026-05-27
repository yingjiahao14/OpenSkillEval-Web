// ShiftWise - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
  initMobileNav();
  initTestimonialCarousel();
  initPricingToggle();
  initFaqAccordion();
  initContactForm();
  initCountUpStats();
});

// Mobile Navigation
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Testimonial Carousel
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');

  if (!track) return;

  let currentIndex = 0;
  const totalSlides = dots.length;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  // Auto-advance every 5 seconds
  setInterval(nextSlide, 5000);
}

// Pricing Toggle (Monthly/Annual)
function initPricingToggle() {
  const toggle = document.querySelector('.pricing-toggle .toggle-switch');
  const toggleLabels = document.querySelectorAll('.toggle-label');
  const monthlyPrices = document.querySelectorAll('[data-monthly]');
  const annualPrices = document.querySelectorAll('[data-annual]');

  if (!toggle) return;

  let isAnnual = false;

  toggle.addEventListener('click', function() {
    isAnnual = !isAnnual;
    toggle.classList.toggle('active', isAnnual);

    toggleLabels.forEach((label, i) => {
      label.classList.toggle('active', (i === 0 && !isAnnual) || (i === 1 && isAnnual));
    });

    monthlyPrices.forEach(el => {
      el.style.display = isAnnual ? 'none' : 'inline';
    });

    annualPrices.forEach(el => {
      el.style.display = isAnnual ? 'inline' : 'none';
    });
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(faq => {
        faq.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Contact Form Validation
function initContactForm() {
  const form = document.querySelector('.contact-form form');
  const successMessage = document.querySelector('.form-success');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const formGroup = field.closest('.form-group');
      const error = formGroup.querySelector('.form-error');

      if (!field.value.trim()) {
        formGroup.classList.add('error');
        isValid = false;
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        formGroup.classList.add('error');
        isValid = false;
      } else {
        formGroup.classList.remove('error');
      }
    });

    if (isValid) {
      successMessage.classList.add('show');
      form.reset();

      // Hide success after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 5000);
    }
  });

  // Real-time validation on blur
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('blur', function() {
      const formGroup = this.closest('.form-group');

      if (!this.value.trim()) {
        formGroup.classList.add('error');
      } else if (this.type === 'email' && !isValidEmail(this.value)) {
        formGroup.classList.add('error');
      } else {
        formGroup.classList.remove('error');
      }
    });

    field.addEventListener('input', function() {
      const formGroup = this.closest('.form-group');
      if (formGroup.classList.contains('error')) {
        if (this.value.trim() && (this.type !== 'email' || isValidEmail(this.value))) {
          formGroup.classList.remove('error');
        }
      }
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Animated Count-Up for Stats
function initCountUpStats() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString() + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }
  }, 16);
}
