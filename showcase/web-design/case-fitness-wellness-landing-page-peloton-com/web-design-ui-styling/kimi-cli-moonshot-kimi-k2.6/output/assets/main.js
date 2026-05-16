// WellStream Platform - Global JavaScript

(function() {
  'use strict';

  // Cookie banner
  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    const accepted = localStorage.getItem('cookie-consent');
    if (accepted === null) {
      setTimeout(() => banner.classList.add('show'), 1000);
    }
    banner.querySelectorAll('[data-cookie-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.cookieAction;
        localStorage.setItem('cookie-consent', action);
        banner.classList.remove('show');
      });
    });
  }

  // Mobile nav
  function initMobileNav() {
    const toggle = document.getElementById('nav-mobile-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
      toggle.classList.toggle('active');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('mobile-open');
        toggle.classList.remove('active');
      });
    });
  }

  // Scroll reveal
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
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

  // Tab system
  window.initTabs = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const buttons = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-tab-panel]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`[data-tab-panel="${tab}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  };

  // Accordion
  window.initAccordion = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const items = container.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        items.forEach(i => i.classList.remove('active'));
        // Open clicked if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  };

  // Carousel
  window.initCarousel = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const track = container.querySelector('.carousel-track');
    const dots = container.querySelectorAll('.carousel-dot');
    const slides = container.querySelectorAll('.carousel-slide');
    if (!track || !slides.length) return;
    let current = 0;

    function goTo(index) {
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Auto-advance
    setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 6000);
  };

  // Stat circles animation
  window.initStatCircles = function() {
    const circles = document.querySelectorAll('.stat-circle[data-value]');
    if (!circles.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const value = parseFloat(circle.dataset.value);
          const max = parseFloat(circle.dataset.max) || 100;
          const circumference = 440;
          const offset = circumference - (value / max) * circumference;
          const fill = circle.querySelector('.stat-circle-fill');
          if (fill) {
            setTimeout(() => {
              fill.style.strokeDashoffset = offset;
            }, 200);
          }
          observer.unobserve(circle);
        }
      });
    }, { threshold: 0.5 });
    circles.forEach(c => observer.observe(c));
  };

  // Progress bars animation
  window.initProgressBars = function() {
    const bars = document.querySelectorAll('.progress-bar[data-progress]');
    if (!bars.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const fill = bar.querySelector('.progress-bar-fill');
          const value = bar.dataset.progress;
          if (fill) {
            setTimeout(() => {
              fill.style.width = value + '%';
            }, 200);
          }
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    bars.forEach(b => observer.observe(b));
  };

  // Form validation
  window.initFormValidation = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        const group = field.closest('.form-group');
        if (!group) return;
        if (!field.value.trim()) {
          valid = false;
          group.classList.add('has-error');
        } else {
          group.classList.remove('has-error');
        }
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            valid = false;
            group.classList.add('has-error');
          }
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
    // Clear errors on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        const group = field.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  };

  // Initialize everything on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initCookieBanner();
    initMobileNav();
    initScrollReveal();
  });
})();
