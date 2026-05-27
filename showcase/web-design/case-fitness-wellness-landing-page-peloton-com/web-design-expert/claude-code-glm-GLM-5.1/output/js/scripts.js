/* ============================================
   WellStream Platform — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initDemoForm();
  initStatAnimations();
});

/* --- Navigation --- */
function initNavigation() {
  const dropdowns = document.querySelectorAll('.nav__dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav__dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      dropdowns.forEach(d => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('open'));
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const navLinks = document.querySelector('.nav__links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav__links--open');
    });
  }
}

/* --- Tabs --- */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tabs__tab');
    const panels = container.querySelectorAll('.tabs__panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('tabs__tab--active'));
        tab.classList.add('tabs__tab--active');

        panels.forEach(p => {
          p.classList.remove('tabs__panel--active');
          if (p.dataset.panel === target) {
            p.classList.add('tabs__panel--active');
          }
        });
      });
    });
  });
}

/* --- Accordion --- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion__item');
  items.forEach(item => {
    const header = item.querySelector('.accordion__header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('accordion__item--open');
      // Close all items in the same accordion
      const parent = item.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion__item').forEach(i => {
          i.classList.remove('accordion__item--open');
        });
      }
      if (!isOpen) {
        item.classList.add('accordion__item--open');
      }
    });
  });
}

/* --- Carousel --- */
function initCarousel() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel__track');
    const dots = carousel.querySelectorAll('.carousel__dot');
    let currentSlide = 0;
    const totalSlides = dots.length;

    function goToSlide(index) {
      currentSlide = index;
      if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
      dots.forEach((dot, i) => {
        dot.classList.toggle('carousel__dot--active', i === currentSlide);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // Auto-advance every 6 seconds
    setInterval(() => {
      goToSlide((currentSlide + 1) % totalSlides);
    }, 6000);
  });
}

/* --- Cookie Banner --- */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  const accepted = localStorage.getItem('wellstream-cookies');
  if (!accepted) {
    banner.classList.add('cookie-banner--visible');
  }

  const acceptBtn = banner.querySelector('.cookie-banner__btn--accept');
  const declineBtn = banner.querySelector('.cookie-banner__btn--decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('wellstream-cookies', 'accepted');
      banner.classList.remove('cookie-banner--visible');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('wellstream-cookies', 'declined');
      banner.classList.remove('cookie-banner--visible');
    });
  }
}

/* --- Demo Form --- */
function initDemoForm() {
  const form = document.getElementById('demo-form');
  if (!form) return;

  const successMsg = document.querySelector('.demo-form__success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.demo-form__error').forEach(err => {
      err.classList.remove('demo-form__error--visible');
    });
    form.querySelectorAll('.demo-form__input, .demo-form__textarea, .demo-form__select').forEach(input => {
      input.classList.remove('demo-form__input--error');
    });

    // Required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.classList.add('demo-form__input--error');
        const errorEl = field.parentElement.querySelector('.demo-form__error');
        if (errorEl) errorEl.classList.add('demo-form__error--visible');
      }
    });

    // Email validation
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value.trim())) {
        valid = false;
        emailField.classList.add('demo-form__input--error');
        const errorEl = emailField.parentElement.querySelector('.demo-form__error');
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid email address';
          errorEl.classList.add('demo-form__error--visible');
        }
      }
    }

    if (valid) {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('demo-form__success--visible');
      }
    }
  });
}

/* --- Stat Circle Animations --- */
function initStatAnimations() {
  const statCircles = document.querySelectorAll('.stat__circle-fill');
  if (!statCircles.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const circumference = 2 * Math.PI * 65;
        const percent = parseFloat(circle.dataset.percent) || 0;
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        requestAnimationFrame(() => {
          circle.style.strokeDashoffset = offset;
        });
        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.3 });

  statCircles.forEach(circle => observer.observe(circle));
}

/* --- Timeline Bar Animations --- */
function initTimelineAnimations() {
  const bars = document.querySelectorAll('.timeline__bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.dataset.width || '0%';
        requestAnimationFrame(() => {
          bar.style.width = targetWidth;
        });
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// Run timeline animations on load
document.addEventListener('DOMContentLoaded', initTimelineAnimations);
