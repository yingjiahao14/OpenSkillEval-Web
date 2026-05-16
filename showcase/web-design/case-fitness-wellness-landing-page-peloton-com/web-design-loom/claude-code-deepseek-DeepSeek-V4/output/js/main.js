/* ============================================
   WellStream Platform — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initTabs();
  initAccordion();
  initCarousel();
  initAnimations();
  initCookieBanner();
  initDemoForm();
});

/* Navigation */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');

  if (!nav) return;

  // Scroll behavior
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
  }

  // Platform dropdown
  const dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    const dropdownToggle = dropdown.querySelector('.nav-dropdown-toggle');

    dropdownToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
      }
    });
  }

  // Close mobile nav on link click
  const navLinks = nav.querySelectorAll('.nav-link, .nav-dropdown-item');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('open');
    });
  });

  // Highlight active page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

/* Tabs */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs-container');

  tabContainers.forEach(function(container) {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const target = this.getAttribute('data-tab');

        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        tabPanels.forEach(function(p) { p.classList.remove('active'); });

        this.classList.add('active');
        const panel = container.querySelector('.tab-panel[data-tab="' + target + '"]');
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* Accordion */
function initAccordion() {
  const accordion = document.querySelector('.accordion');
  if (!accordion) return;

  const headers = accordion.querySelectorAll('.accordion-header');

  headers.forEach(function(header) {
    header.addEventListener('click', function() {
      const item = this.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all
      accordion.querySelectorAll('.accordion-item').forEach(function(i) {
        i.classList.remove('open');
      });

      // Open clicked (if wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* Carousel */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  let currentIndex = 0;
  let interval;

  // Create dots
  slides.forEach(function(_, idx) {
    var dot = document.createElement('span');
    dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
    dot.addEventListener('click', function() { goToSlide(idx); });
    dotsContainer.appendChild(dot);
  });

  var dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach(function(d, i) { d.classList.toggle('active', i === index); });
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
  }

  // Auto-advance
  interval = setInterval(nextSlide, 5000);

  // Pause on hover
  carousel.addEventListener('mouseenter', function() { clearInterval(interval); });
  carousel.addEventListener('mouseleave', function() { interval = setInterval(nextSlide, 5000); });
}

/* Animation on scroll */
function initAnimations() {
  var observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .stat-circle, .timeline-item, .use-case-card, .eco-pillar, .etl-benefit-card, .security-card').forEach(function(el) {
    observer.observe(el);
  });

  // Animate stat rings when visible
  var statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var rings = entry.target.querySelectorAll('.stat-ring-fill');
        rings.forEach(function(ring) {
          var circumference = 2 * Math.PI * 58;
          var percent = parseFloat(ring.getAttribute('data-percent')) || 0;
          var offset = circumference - (percent / 100) * circumference;
          ring.style.strokeDasharray = circumference;
          ring.style.strokeDashoffset = circumference;
          setTimeout(function() {
            ring.style.strokeDashoffset = offset;
          }, 200);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  var statsRow = document.querySelector('.stats-row');
  if (statsRow) statObserver.observe(statsRow);

  // Animate progress bars
  var progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var fills = entry.target.querySelectorAll('.progress-bar-fill');
        fills.forEach(function(fill) {
          var width = fill.getAttribute('data-width') || '0';
          fill.style.width = width;
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  var timeline = document.querySelector('.timeline');
  if (timeline) progressObserver.observe(timeline);
}

/* Cookie Banner */
function initCookieBanner() {
  var banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  // Check if already accepted/declined
  if (localStorage.getItem('wellstream_cookies')) {
    banner.style.display = 'none';
    return;
  }

  banner.style.display = 'flex';

  var acceptBtn = banner.querySelector('.cookie-accept');
  var declineBtn = banner.querySelector('.cookie-decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      localStorage.setItem('wellstream_cookies', 'accepted');
      banner.style.display = 'none';
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      localStorage.setItem('wellstream_cookies', 'declined');
      banner.style.display = 'none';
    });
  }
}

/* Demo Form */
function initDemoForm() {
  var form = document.querySelector('.demo-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var isValid = true;

    // Validate required fields
    var requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function(field) {
      var errorEl = field.parentElement.querySelector('.form-error');
      field.classList.remove('error');
      if (errorEl) errorEl.classList.remove('visible');

      if (!field.value.trim()) {
        field.classList.add('error');
        if (errorEl) errorEl.classList.add('visible');
        isValid = false;
      }
    });

    // Validate email
    var emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value.trim())) {
        emailField.classList.add('error');
        var emailError = emailField.parentElement.querySelector('.form-error');
        if (emailError) {
          emailError.textContent = 'Please enter a valid email address.';
          emailError.classList.add('visible');
        }
        isValid = false;
      }
    }

    // Validate phone (basic)
    var phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value.trim()) {
      var phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
      if (!phoneRegex.test(phoneField.value.trim())) {
        phoneField.classList.add('error');
        var phoneError = phoneField.parentElement.querySelector('.form-error');
        if (phoneError) {
          phoneError.textContent = 'Please enter a valid phone number.';
          phoneError.classList.add('visible');
        }
        isValid = false;
      }
    }

    if (isValid) {
      var successEl = form.querySelector('.form-success');
      if (successEl) {
        form.reset();
        successEl.classList.add('visible');
        setTimeout(function() {
          successEl.classList.remove('visible');
        }, 5000);
      }
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, select, textarea').forEach(function(field) {
    field.addEventListener('input', function() {
      this.classList.remove('error');
      var errorEl = this.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.classList.remove('visible');
    });
  });
}
