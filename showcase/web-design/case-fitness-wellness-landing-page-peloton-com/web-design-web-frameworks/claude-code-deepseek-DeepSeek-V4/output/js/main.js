/* ===== WellStream Platform — Shared Interactions ===== */
(function() {
  'use strict';

  // ===== Navigation =====
  function initNav() {
    var dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(function(dropdown) {
      var toggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var wasOpen = dropdown.classList.contains('open');
        dropdowns.forEach(function(d) { d.classList.remove('open'); });
        if (!wasOpen) dropdown.classList.add('open');
      });
    });

    document.addEventListener('click', function() {
      dropdowns.forEach(function(d) { d.classList.remove('open'); });
    });

    var mobileToggle = document.getElementById('mobileMenuToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('mobile-open');
      });
    }
  }

  // ===== Tabs =====
  function initTabs(containerSelector) {
    var containers = document.querySelectorAll(containerSelector);
    containers.forEach(function(container) {
      var buttons = container.querySelectorAll('.tabs-nav-btn');
      var panels = container.querySelectorAll('.tab-panel');
      buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var tabId = btn.getAttribute('data-tab');
          buttons.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          panels.forEach(function(p) {
            p.classList.toggle('active', p.getAttribute('data-tab') === tabId);
          });
        });
      });
    });
  }

  // ===== Accordion =====
  function initAccordion(containerSelector) {
    var containers = document.querySelectorAll(containerSelector);
    containers.forEach(function(container) {
      var headers = container.querySelectorAll('.accordion-header');
      headers.forEach(function(header) {
        header.addEventListener('click', function() {
          var item = header.parentElement;
          var isOpen = item.classList.contains('open');
          container.querySelectorAll('.accordion-item').forEach(function(i) {
            i.classList.remove('open');
          });
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      });
    });
  }

  // ===== Testimonials Carousel =====
  function initCarousel() {
    var track = document.querySelector('.testimonials-track');
    var dots = document.querySelectorAll('.carousel-dot');
    if (!track || !dots.length) return;
    var slides = track.querySelectorAll('.testimonial-slide');
    var currentIndex = 0;
    var totalSlides = slides.length;

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(dot.getAttribute('data-index'), 10));
      });
    });

    // Auto-advance
    setInterval(function() {
      goToSlide((currentIndex + 1) % totalSlides);
    }, 6000);
  }

  // ===== Demo Form Validation =====
  function initDemoForm() {
    var form = document.getElementById('demoForm');
    if (!form) return;

    var successMsg = document.getElementById('formSuccess');
    var formContent = document.getElementById('formContent');

    function showError(field, message) {
      var group = field.closest('.form-group');
      var error = group.querySelector('.form-error');
      field.classList.add('error');
      if (error) {
        error.textContent = message;
        error.classList.add('visible');
      }
    }

    function clearError(field) {
      var group = field.closest('.form-group');
      var error = group.querySelector('.form-error');
      field.classList.remove('error');
      if (error) {
        error.textContent = '';
        error.classList.remove('visible');
      }
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
      return /^[\d\s\-\(\)\+\.]{7,}$/.test(phone);
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var valid = true;
      var fields = form.querySelectorAll('[required]');

      fields.forEach(function(field) {
        clearError(field);
      });

      fields.forEach(function(field) {
        var value = field.value.trim();
        if (!value) {
          showError(field, 'This field is required.');
          valid = false;
        } else if (field.type === 'email' && !validateEmail(value)) {
          showError(field, 'Please enter a valid email address.');
          valid = false;
        } else if (field.id === 'phone' && !validatePhone(value)) {
          showError(field, 'Please enter a valid phone number.');
          valid = false;
        }
      });

      if (valid) {
        if (formContent) formContent.style.display = 'none';
        if (successMsg) successMsg.classList.add('visible');
      }
    });

    // Clear error on input
    form.querySelectorAll('input, select, textarea').forEach(function(field) {
      field.addEventListener('input', function() {
        clearError(field);
      });
    });
  }

  // ===== Cookie Banner =====
  function initCookieBanner() {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;

    if (!localStorage.getItem('wellstream-cookies')) {
      setTimeout(function() {
        banner.classList.add('visible');
      }, 800);
    }

    var acceptBtn = document.getElementById('cookieAccept');
    var declineBtn = document.getElementById('cookieDecline');

    function dismissBanner(choice) {
      localStorage.setItem('wellstream-cookies', choice);
      banner.classList.remove('visible');
      setTimeout(function() {
        banner.classList.add('hidden');
      }, 500);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() { dismissBanner('accepted'); });
    }
    if (declineBtn) {
      declineBtn.addEventListener('click', function() { dismissBanner('declined'); });
    }
  }

  // ===== Industry Tabs on Home Page =====
  function initIndustryTabs() {
    var container = document.querySelector('.industry-tabs-container');
    if (!container) return;
    initTabs('.industry-tabs-container');
  }

  // ===== Timeline Bar Animation =====
  function initTimelineAnimation() {
    var bars = document.querySelectorAll('.timeline-bar-fill');
    if (!bars.length) return;

    function animateBars() {
      bars.forEach(function(bar) {
        var rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          var targetWidth = bar.getAttribute('data-width') || bar.style.width;
          bar.style.width = targetWidth;
        }
      });
    }

    animateBars();
    window.addEventListener('scroll', animateBars);
  }

  // ===== Initialize All =====
  document.addEventListener('DOMContentLoaded', function() {
    initNav();
    initTabs('.tabs-container');
    initAccordion('.accordion-container');
    initCarousel();
    initDemoForm();
    initCookieBanner();
    initIndustryTabs();
    initTimelineAnimation();
  });

})();
