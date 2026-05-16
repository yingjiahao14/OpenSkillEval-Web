/* ========================================
   WellStream Platform — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initDropdowns();
  initTabs();
  initAccordions();
  initTestimonialCarousel();
  initCookieBanner();
  initFormValidation();
  initProgressBars();
  initScrollReveal();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

/* Dropdowns */
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) dropdown.classList.add('open');
    });
  });

  document.addEventListener('click', closeAllDropdowns);
}

function closeAllDropdowns() {
  document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
}

/* Tabs */
function initTabs() {
  const tabGroups = document.querySelectorAll('[data-tabs]');

  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-tab-panel]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = group.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* Accordions */
function initAccordions() {
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach(acc => {
    const items = acc.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        if (acc.dataset.accordion === 'single') {
          items.forEach(i => i.classList.remove('open'));
        }

        if (!isOpen) {
          item.classList.add('open');
        } else {
          item.classList.remove('open');
        }
      });
    });
  });
}

/* Testimonial Carousel */
function initTestimonialCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('.testimonial-track');
  const slides = carousel.querySelectorAll('.testimonial-slide');
  const dots = carousel.querySelectorAll('.testimonial-dot');
  if (!track || slides.length === 0) return;

  let current = 0;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  goTo(0);
}

/* Cookie Banner */
function initCookieBanner() {
  const banner = document.querySelector('[data-cookie-banner]');
  if (!banner) return;

  const accepted = localStorage.getItem('cookie-consent');
  if (!accepted) {
    setTimeout(() => banner.classList.add('show'), 1000);
  }

  const acceptBtn = banner.querySelector('[data-cookie-accept]');
  const declineBtn = banner.querySelector('[data-cookie-decline]');

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

/* Form Validation */
function initFormValidation() {
  const form = document.querySelector('[data-demo-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const requiredFields = form.querySelectorAll('[data-required]');
    requiredFields.forEach(field => {
      const group = field.closest('.form-group');
      if (!group) return;

      if (!field.value.trim()) {
        group.classList.add('has-error');
        valid = false;
      } else {
        group.classList.remove('has-error');
      }
    });

    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
      const group = emailField.closest('.form-group');
      if (!emailValid && group) {
        group.classList.add('has-error');
        valid = false;
      }
    }

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : 'Submit';
      if (btn) {
        btn.textContent = 'Request Submitted!';
        btn.disabled = true;
      }
      setTimeout(() => {
        form.reset();
        if (btn) {
          btn.textContent = originalText;
          btn.disabled = false;
        }
      }, 3000);
    }
  });
}

/* Progress Bars Animation */
function initProgressBars() {
  const bars = document.querySelectorAll('[data-progress]');
  if (bars.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-fill');
        if (fill) {
          const width = entry.target.dataset.progress;
          fill.style.width = width + '%';
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* Scroll Reveal */
function initScrollReveal() {
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}
