// WellStream Platform - Interactions

document.addEventListener('DOMContentLoaded', function() {
  initTabs();
  initAccordion();
  initCarousel();
  initFormValidation();
  initCookieBanner();
  initMobileMenu();
});

// Tab System
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(tabId)?.classList.add('active');
    });
  });
}

// Accordion System
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
      });

      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Testimonial Carousel
function initCarousel() {
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  if (!track) return;

  const testimonials = track.querySelectorAll('.testimonial-card');
  const totalSlides = testimonials.length;

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Auto-advance every 5 seconds
  setInterval(() => {
    goToSlide((currentIndex + 1) % totalSlides);
  }, 5000);
}

// Form Validation
function initFormValidation() {
  const form = document.getElementById('demo-form');

  if (!form) return;

  const requiredFields = ['firstName', 'lastName', 'email', 'company', 'jobTitle', 'country'];

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    requiredFields.forEach(fieldName => {
      const field = document.getElementById(fieldName);
      const group = field?.closest('.form-group');

      if (!field) return;

      if (!field.value.trim()) {
        isValid = false;
        group?.classList.add('has-error');
        field.classList.add('error');
      } else {
        group?.classList.remove('has-error');
        field.classList.remove('error');
      }
    });

    // Email validation
    const emailField = document.getElementById('email');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.classList.add('error');
        emailField.closest('.form-group')?.classList.add('has-error');
      }
    }

    if (isValid) {
      // Show success message
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Demo Request Submitted!';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
      }, 3000);
    }
  });

  // Clear error on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      field.closest('.form-group')?.classList.remove('has-error');
    });
  });
}

// Cookie Banner
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');

  if (!banner) return;

  // Check if already dismissed
  if (localStorage.getItem('cookieConsent')) return;

  setTimeout(() => {
    banner.classList.add('show');
  }, 1500);

  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.classList.remove('show');
  });

  document.getElementById('cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    banner.classList.remove('show');
  });
}

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });
}

// Animate progress bars on scroll
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute('data-width') || '100%';
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// Initialize progress bar animations
document.addEventListener('DOMContentLoaded', animateProgressBars);
