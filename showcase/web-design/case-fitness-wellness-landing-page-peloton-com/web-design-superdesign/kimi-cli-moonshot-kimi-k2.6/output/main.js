/**
 * WellStream Platform — Global JavaScript
 */

// ============================================
// Mobile Navigation
// ============================================
function initMobileNav() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================
// Tabs
// ============================================
function initTabs(container) {
  container = container || document;
  container.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('[data-tab]');
    const panels = tabGroup.querySelectorAll('[data-tab-panel]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        panels.forEach(p => {
          p.classList.toggle('active', p.dataset.tabPanel === target);
        });
      });
    });
  });
}

// ============================================
// Accordion
// ============================================
function initAccordions(container) {
  container = container || document;
  container.querySelectorAll('[data-accordion]').forEach(acc => {
    const header = acc.querySelector('[data-accordion-header]');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = acc.classList.contains('open');

      // Close siblings if accordion group is set
      const group = acc.closest('[data-accordion-group]');
      if (group) {
        group.querySelectorAll('[data-accordion]').forEach(item => {
          item.classList.remove('open');
        });
      }

      acc.classList.toggle('open', !isOpen);
    });
  });
}

// ============================================
// Testimonial Carousel
// ============================================
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-carousel-track]');
    const dots = carousel.querySelectorAll('[data-carousel-dot]');
    const slides = track ? track.children : [];
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    function getSlidesPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function goTo(index) {
      const perView = getSlidesPerView();
      const maxIndex = Math.max(0, total - perView);
      current = Math.max(0, Math.min(index, maxIndex));
      const percent = current * (100 / perView);
      track.style.transform = `translateX(-${percent}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    window.addEventListener('resize', () => goTo(current));
    goTo(0);
  });
}

// ============================================
// Cookie Banner
// ============================================
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const consent = localStorage.getItem('cookie-consent');
  if (!consent) {
    setTimeout(() => banner.classList.add('show'), 1000);
  }

  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'accepted');
      banner.classList.remove('show');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'declined');
      banner.classList.remove('show');
    });
  }
}

// ============================================
// Scroll Reveal
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// ============================================
// Stat Circle Animation
// ============================================
function initStatCircles() {
  const circles = document.querySelectorAll('[data-stat-circle]');
  if (circles.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const fill = circle.querySelector('.stat-circle-fill');
        const value = parseFloat(circle.dataset.statCircle);
        if (fill && !isNaN(value)) {
          const offset = 440 - (440 * value / 100);
          setTimeout(() => {
            fill.style.strokeDashoffset = offset;
          }, 200);
        }
        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.5 });

  circles.forEach(c => observer.observe(c));
}

// ============================================
// Form Validation
// ============================================
function initFormValidation() {
  const form = document.getElementById('demo-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      const group = field.closest('.form-group');
      let error = group ? group.querySelector('.form-error') : null;

      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#ef4444';
        if (error) error.textContent = 'This field is required';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        valid = false;
        field.style.borderColor = '#ef4444';
        if (error) error.textContent = 'Please enter a valid email';
      } else {
        field.style.borderColor = '';
        if (error) error.textContent = '';
      }
    });

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Submitted!';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Submit';
          btn.disabled = false;
          form.reset();
        }, 3000);
      }
    }
  });
}

// ============================================
// Header scroll effect
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current > 50) {
      header.style.background = 'rgba(13, 27, 42, 0.95)';
    } else {
      header.style.background = 'rgba(13, 27, 42, 0.85)';
    }
    lastScroll = current;
  });
}

// ============================================
// Initialize All
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTabs();
  initAccordions();
  initCarousels();
  initCookieBanner();
  initScrollReveal();
  initStatCircles();
  initFormValidation();
  initHeaderScroll();

  // Init Lucide icons if present
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
