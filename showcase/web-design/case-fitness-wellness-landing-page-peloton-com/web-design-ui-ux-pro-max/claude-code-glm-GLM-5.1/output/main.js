/* ============================================
   WellStream Platform — Shared JavaScript
   ============================================ */

(function () {
  'use strict';

  /* --- Mobile Navigation --- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close on link click (mobile)
    navLinks.querySelectorAll('a, .nav-dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggle.classList.remove('active');
          navLinks.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* --- Dropdown Toggle (mobile + keyboard) --- */
  document.querySelectorAll('.nav-dropdown > .nav-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = btn.parentElement;
        dropdown.classList.toggle('open');
      }
    });
  });

  // Close dropdowns on outside click (desktop)
  document.addEventListener('click', (e) => {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.nav-dropdown.open').forEach(d => {
        if (!d.contains(e.target)) d.classList.remove('open');
      });
    }
  });

  /* --- Tab Switching --- */
  function initTabs(container) {
    if (!container) return;
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetPanel = container.querySelector(`[data-panel="${target}"]`);
        if (targetPanel) targetPanel.classList.add('active');
      });

      // Keyboard: arrow keys
      btn.addEventListener('keydown', (e) => {
        const btns = Array.from(buttons);
        const idx = btns.indexOf(btn);
        let next;
        if (e.key === 'ArrowRight') next = btns[(idx + 1) % btns.length];
        else if (e.key === 'ArrowLeft') next = btns[(idx - 1 + btns.length) % btns.length];
        if (next) {
          e.preventDefault();
          next.click();
          next.focus();
        }
      });
    });
  }

  document.querySelectorAll('.tabs-container').forEach(initTabs);

  /* --- Accordion --- */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(ai => {
        ai.classList.remove('open');
        const ab = ai.querySelector('.accordion-body');
        if (ab) ab.style.maxHeight = '0';
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });

    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  /* --- Testimonial Carousel --- */
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonial-dot');

  if (track && dots.length) {
    let currentSlide = 0;
    const totalSlides = dots.length;

    function goToSlide(idx) {
      currentSlide = idx;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // Auto-advance every 6s
    let autoPlay = setInterval(() => {
      goToSlide((currentSlide + 1) % totalSlides);
    }, 6000);

    // Pause on hover
    const wrapper = document.querySelector('.testimonials-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
      wrapper.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
          goToSlide((currentSlide + 1) % totalSlides);
        }, 6000);
      });
    }
  }

  /* --- Cookie Banner --- */
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    cookieBanner.classList.add('visible');
  }

  document.querySelectorAll('.cookie-accept').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('visible');
    });
  });

  document.querySelectorAll('.cookie-decline').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.remove('visible');
    });
  });

  /* --- Demo Form Validation --- */
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    const fields = {
      firstName: { required: true, label: 'First Name' },
      lastName: { required: true, label: 'Last Name' },
      email: { required: true, label: 'Business Email', type: 'email' },
      company: { required: true, label: 'Company' },
      phone: { required: false, label: 'Phone Number' },
      jobTitle: { required: false, label: 'Job Title' },
      country: { required: false, label: 'Country' },
      comments: { required: false, label: 'Comments' }
    };

    function validateField(name, config) {
      const input = demoForm.querySelector(`[name="${name}"]`);
      if (!input) return true;
      const errorEl = input.parentElement.querySelector('.form-error');
      const value = input.value.trim();
      let valid = true;
      let message = '';

      if (config.required && !value) {
        valid = false;
        message = `${config.label} is required`;
      } else if (config.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          valid = false;
          message = 'Please enter a valid email address';
        }
      }

      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.toggle('visible', !valid);
      }
      input.classList.toggle('error', !valid);
      return valid;
    }

    // Inline validation on blur
    Object.entries(fields).forEach(([name, config]) => {
      const input = demoForm.querySelector(`[name="${name}"]`);
      if (input) {
        input.addEventListener('blur', () => validateField(name, config));
      }
    });

    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;

      Object.entries(fields).forEach(([name, config]) => {
        if (!validateField(name, config)) allValid = false;
      });

      if (allValid) {
        demoForm.style.display = 'none';
        const success = document.querySelector('.form-success');
        if (success) success.classList.add('visible');
      } else {
        // Focus first invalid field
        const firstError = demoForm.querySelector('.error');
        if (firstError) firstError.focus();
      }
    });
  }

  /* --- Stat Circle Animation (Intersection Observer) --- */
  const statCircles = document.querySelectorAll('.stat-circle');
  if (statCircles.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const fill = circle.getAttribute('data-fill');
          circle.style.setProperty('--fill', fill + '%');
          observer.unobserve(circle);
        }
      });
    }, { threshold: 0.3 });

    statCircles.forEach(c => observer.observe(c));
  }

  /* --- Timeline Bar Animation --- */
  const timelineBars = document.querySelectorAll('.timeline-bar-fill');
  if (timelineBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    timelineBars.forEach(bar => {
      bar.style.width = '0';
      observer.observe(bar);
    });
  }

})();
