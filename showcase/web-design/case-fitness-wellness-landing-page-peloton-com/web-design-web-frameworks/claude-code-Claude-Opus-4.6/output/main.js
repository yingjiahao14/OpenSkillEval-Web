/* WellStream Platform — Shared JavaScript */

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var mobileToggle = document.getElementById('mobileToggle');
  var navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Tabs
  document.querySelectorAll('.tabs-nav').forEach(function (nav) {
    var btns = nav.querySelectorAll('.tab-btn');
    var parent = nav.parentElement;
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var tabId = btn.getAttribute('data-tab');
        parent.querySelectorAll('.tab-panel').forEach(function (panel) {
          panel.classList.remove('active');
        });
        var target = document.getElementById('tab-' + tabId);
        if (target) target.classList.add('active');
      });
    });
  });

  // Accordion
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', function () {
        var parent = item.parentElement;
        var isOpen = item.classList.contains('open');
        parent.querySelectorAll('.accordion-item').forEach(function (i) {
          i.classList.remove('open');
        });
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // Testimonial Carousel
  var track = document.querySelector('.testimonials-track');
  var dots = document.querySelectorAll('.carousel-dot');
  if (track && dots.length) {
    var currentSlide = 0;
    dots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () {
        currentSlide = idx;
        track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        dots.forEach(function (d) { d.classList.remove('active'); });
        dot.classList.add('active');
      });
    });
  }

  // Cookie Banner
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAccept = document.getElementById('cookieAccept');
  var cookieDecline = document.getElementById('cookieDecline');
  var cookieSettingsLink = document.getElementById('cookieSettingsLink');

  if (cookieBanner) {
    var pref = localStorage.getItem('wellstream_cookies');
    if (pref) {
      cookieBanner.classList.add('hidden');
    }
    if (cookieAccept) {
      cookieAccept.addEventListener('click', function () {
        localStorage.setItem('wellstream_cookies', 'accepted');
        cookieBanner.classList.add('hidden');
      });
    }
    if (cookieDecline) {
      cookieDecline.addEventListener('click', function () {
        localStorage.setItem('wellstream_cookies', 'declined');
        cookieBanner.classList.add('hidden');
      });
    }
    if (cookieSettingsLink) {
      cookieSettingsLink.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('wellstream_cookies');
        cookieBanner.classList.remove('hidden');
      });
    }
  }

  // Demo Form Validation
  var demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var requiredFields = demoForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        var errorEl = field.parentElement.querySelector('.form-error');
        field.classList.remove('error');
        if (errorEl) errorEl.style.display = 'none';

        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
          if (errorEl) {
            errorEl.textContent = 'This field is required.';
            errorEl.style.display = 'block';
          }
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          valid = false;
          field.classList.add('error');
          if (errorEl) {
            errorEl.textContent = 'Please enter a valid email address.';
            errorEl.style.display = 'block';
          }
        }
      });

      if (valid) {
        demoForm.style.display = 'none';
        var successEl = document.getElementById('formSuccess');
        if (successEl) successEl.style.display = 'block';
      }
    });
  }

  // Header scroll effect
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(13,27,42,0.98)';
      } else {
        header.style.background = 'rgba(13,27,42,0.95)';
      }
    });
  }

  // Animate stats on scroll
  var statCircles = document.querySelectorAll('.stat-circle');
  if (statCircles.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeIn 0.6s ease forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statCircles.forEach(function (el) { observer.observe(el); });
  }

  // Animate progress bars on scroll
  var progressBars = document.querySelectorAll('.progress-fill');
  if (progressBars.length) {
    var progressObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var width = target.getAttribute('data-width');
          if (width) target.style.width = width;
          progressObserver.unobserve(target);
        }
      });
    }, { threshold: 0.3 });
    progressBars.forEach(function (el) {
      el.style.width = '0';
      progressObserver.observe(el);
    });
  }
});
