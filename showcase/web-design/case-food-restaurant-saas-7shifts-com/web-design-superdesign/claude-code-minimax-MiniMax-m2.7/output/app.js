// ShiftWise Shared JavaScript

document.addEventListener('DOMContentLoaded', function() {
  initMobileNav();
});

// Mobile Navigation Toggle
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Testimonial Carousel
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (!track || !dots.length) return;

  let currentIndex = 0;
  const totalSlides = dots.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Auto-advance
  setInterval(() => goToSlide(currentIndex + 1), 5000);
}

// Pricing Toggle
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  const monthlyPrices = document.querySelectorAll('[data-monthly]');
  const annualPrices = document.querySelectorAll('[data-annual]');

  if (!toggle) return;

  let isAnnual = false;

  toggle.addEventListener('click', function() {
    isAnnual = !isAnnual;
    toggle.classList.toggle('active', isAnnual);

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

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Contact Form Validation
function initContactForm() {
  const form = document.querySelector('#contact-form');
  const successMessage = document.querySelector('.form-success');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const formGroup = field.closest('.form-group');
      const errorMsg = formGroup.querySelector('.error-message');

      if (!field.value.trim()) {
        formGroup.classList.add('has-error');
        field.classList.add('error');
        isValid = false;
      } else {
        formGroup.classList.remove('has-error');
        field.classList.remove('error');
      }

      // Email validation
      if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          formGroup.classList.add('has-error');
          field.classList.add('error');
          isValid = false;
        }
      }
    });

    if (isValid) {
      form.style.display = 'none';
      if (successMessage) {
        successMessage.classList.add('show');
      }
    }
  });

  // Clear error on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', function() {
      const formGroup = this.closest('.form-group');
      formGroup.classList.remove('has-error');
      this.classList.remove('error');
    });
  });
}

// Stats Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-value[data-count]');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };

    // Start animation when in view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(counter);
  });
}

// Initialize page-specific scripts
document.addEventListener('DOMContentLoaded', function() {
  const page = document.body.getAttribute('data-page');

  switch(page) {
    case 'home':
      initTestimonialCarousel();
      animateCounters();
      break;
    case 'pricing':
      initPricingToggle();
      initFaqAccordion();
      break;
    case 'contact':
      initContactForm();
      break;
  }
});
