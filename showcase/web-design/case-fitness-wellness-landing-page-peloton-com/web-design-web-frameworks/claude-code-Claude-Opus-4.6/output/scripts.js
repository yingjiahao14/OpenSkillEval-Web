/* WellStream Platform - Shared JavaScript */

document.addEventListener('DOMContentLoaded', function() {

  // ─── MOBILE NAV ───
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
    // Mobile dropdown toggle
    document.querySelectorAll('.nav-links .dropdown-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.closest('.dropdown').classList.toggle('open');
        }
      });
    });
  }

  // ─── TABS ───
  document.querySelectorAll('[data-tabs]').forEach(function(tabGroup) {
    var buttons = tabGroup.querySelectorAll('.tab-btn');
    var contentId = tabGroup.getAttribute('data-tabs');
    var contents = document.querySelectorAll('[data-tab-group="' + contentId + '"] .tab-content');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var target = this.getAttribute('data-tab');
        buttons.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        contents.forEach(function(c) {
          c.classList.remove('active');
          if (c.getAttribute('data-tab-id') === target) {
            c.classList.add('active');
          }
        });
      });
    });
  });

  // ─── ACCORDION ───
  document.querySelectorAll('.accordion-header').forEach(function(header) {
    header.addEventListener('click', function() {
      var item = this.parentElement;
      var accordion = item.parentElement;
      var wasActive = item.classList.contains('active');
      accordion.querySelectorAll('.accordion-item').forEach(function(i) {
        i.classList.remove('active');
      });
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  // ─── TESTIMONIAL CAROUSEL ───
  var track = document.querySelector('.testimonial-track');
  var dots = document.querySelectorAll('.carousel-dot');
  if (track && dots.length > 0) {
    var currentSlide = 0;
    var totalSlides = dots.length;
    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === index);
      });
    }
    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { goToSlide(i); });
    });
    setInterval(function() {
      goToSlide((currentSlide + 1) % totalSlides);
    }, 6000);
  }

  // ─── COOKIE BANNER ───
  var cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    var cookieChoice = localStorage.getItem('wellstream_cookies');
    if (!cookieChoice) {
      setTimeout(function() {
        cookieBanner.classList.add('show');
      }, 1500);
    }
    cookieBanner.querySelectorAll('[data-cookie]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        localStorage.setItem('wellstream_cookies', this.getAttribute('data-cookie'));
        cookieBanner.classList.remove('show');
      });
    });
  }

  // ─── DEMO FORM VALIDATION ───
  var demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var valid = true;
      var requiredFields = demoForm.querySelectorAll('[required]');
      requiredFields.forEach(function(field) {
        field.classList.remove('error');
        var errorEl = field.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.style.display = 'none';
        if (!field.value.trim()) {
          field.classList.add('error');
          if (errorEl) errorEl.style.display = 'block';
          valid = false;
        }
        if (field.type === 'email' && field.value.trim()) {
          var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(field.value.trim())) {
            field.classList.add('error');
            if (errorEl) {
              errorEl.textContent = 'Please enter a valid business email.';
              errorEl.style.display = 'block';
            }
            valid = false;
          }
        }
      });
      if (valid) {
        demoForm.style.display = 'none';
        document.querySelector('.form-success').classList.add('show');
      }
    });
    demoForm.querySelectorAll('[required]').forEach(function(field) {
      field.addEventListener('input', function() {
        this.classList.remove('error');
        var errorEl = this.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.style.display = 'none';
      });
    });
  }

  // ─── SCROLL ANIMATIONS (stats, progress bars) ───
  var animated = new Set();
  function animateOnScroll() {
    document.querySelectorAll('.stat-circle .progress').forEach(function(circle) {
      if (animated.has(circle)) return;
      var rect = circle.closest('.stat-item').getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        animated.add(circle);
        var pct = parseFloat(circle.getAttribute('data-percent')) || 0;
        var circumference = 2 * Math.PI * 70;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        requestAnimationFrame(function() {
          circle.style.strokeDashoffset = circumference - (circumference * pct / 100);
        });
      }
    });
    document.querySelectorAll('.progress-bar .fill').forEach(function(bar) {
      if (animated.has(bar)) return;
      var rect = bar.closest('.timeline-item').getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        animated.add(bar);
        var w = bar.getAttribute('data-width') || '0%';
        requestAnimationFrame(function() {
          bar.style.width = w;
        });
      }
    });
  }
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // ─── HEADER SCROLL STATE ───
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(13,27,42,0.98)';
      } else {
        header.style.background = 'rgba(13,27,42,0.92)';
      }
    });
  }

});
