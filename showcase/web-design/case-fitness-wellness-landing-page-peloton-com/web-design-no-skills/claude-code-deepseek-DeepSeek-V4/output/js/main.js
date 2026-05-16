/* WellStream Platform — Shared Interactions */

// ========== MOBILE NAV TOGGLE ==========
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMain = document.querySelector('.nav-main');
  if (navToggle && navMain) {
    navToggle.addEventListener('click', function() {
      navMain.classList.toggle('open');
      this.classList.toggle('open');
    });
  }

  // ========== NAV DROPDOWN ==========
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function(dropdown) {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
      });
      // Close when clicking outside
      document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
          toggle.classList.remove('open');
          menu.classList.remove('open');
        }
      });
    }
  });

  // ========== INDUSTRY TABS (Home) ==========
  initIndustryTabs();

  // ========== ACCORDION (Platform Overview) ==========
  initAccordion();

  // ========== PLATFORM TABS (Platform Overview — Our Company / Careers) ==========
  initPlatformTabs();

  // ========== TESTIMONIAL CAROUSEL (Platform Overview) ==========
  initTestimonialCarousel();

  // ========== SECURITY TABS (Security page) ==========
  initTabs('.security-tabs');

  // ========== INTEGRATION TABS (Integration page) ==========
  initIntegrationTabs();

  // ========== DEMO FORM (Request Demo) ==========
  initDemoForm();

  // ========== COOKIE BANNER (Home) ==========
  initCookieBanner();

  // ========== ANIMATE STAT CIRCLES ON SCROLL ==========
  initScrollAnimations();
});

// ========== INDUSTRY TABS ==========
function initIndustryTabs() {
  const tabs = document.querySelectorAll('.industry-tab');
  const panels = document.querySelectorAll('.industry-content');
  if (tabs.length === 0 || panels.length === 0) return;

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
      var target = this.getAttribute('data-industry');
      panels.forEach(function(p) {
        p.classList.toggle('active', p.getAttribute('data-industry') === target);
      });
    });
  });
}

// ========== ACCORDION ==========
function initAccordion() {
  var headers = document.querySelectorAll('.accordion-header');
  headers.forEach(function(header) {
    header.addEventListener('click', function() {
      var isOpen = this.classList.contains('open');
      // Close all in same accordion group
      var parent = this.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion-header').forEach(function(h) {
          h.classList.remove('open');
          h.nextElementSibling.classList.remove('open');
        });
      }
      // Open clicked one (toggle)
      if (!isOpen) {
        this.classList.add('open');
        this.nextElementSibling.classList.add('open');
      }
    });
  });
  // Open first accordion item by default
  var firstHeader = document.querySelector('.accordion-header');
  if (firstHeader) {
    firstHeader.classList.add('open');
    firstHeader.nextElementSibling.classList.add('open');
  }
}

// ========== PLATFORM TABS (Our Company / Careers) ==========
function initPlatformTabs() {
  initTabs('.platform-tabs');
}

// ========== GENERIC TABS ==========
function initTabs(containerSelector) {
  var containers = document.querySelectorAll(containerSelector);
  containers.forEach(function(container) {
    var tabBtns = container.querySelectorAll('.tab-btn');
    var panels = container.querySelectorAll('.tab-panel');
    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        var target = this.getAttribute('data-tab');
        panels.forEach(function(p) {
          p.classList.toggle('active', p.getAttribute('data-tab') === target);
        });
      });
    });
  });
}

// ========== INTEGRATION TABS ==========
function initIntegrationTabs() {
  initTabs('.integration-tabs');
}

// ========== TESTIMONIAL CAROUSEL ==========
function initTestimonialCarousel() {
  var track = document.querySelector('.testimonial-track');
  var dots = document.querySelectorAll('.carousel-dot');
  if (!track || dots.length === 0) return;

  var currentIndex = 0;
  var totalSlides = dots.length;

  dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      currentIndex = parseInt(this.getAttribute('data-index'));
      updateCarousel(track, dots, currentIndex);
    });
  });

  // Auto-rotate every 6 seconds
  setInterval(function() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel(track, dots, currentIndex);
  }, 6000);
}

function updateCarousel(track, dots, index) {
  track.style.transform = 'translateX(-' + (index * 100) + '%)';
  dots.forEach(function(d) { d.classList.remove('active'); });
  dots[index].classList.add('active');
}

// ========== DEMO FORM ==========
function initDemoForm() {
  var form = document.getElementById('demo-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm(form)) {
      // Simulate submission
      var successMsg = document.querySelector('.form-success');
      form.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
      // Scroll to success message
      if (successMsg) successMsg.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function validateForm(form) {
  var valid = true;
  var requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(function(field) {
    var group = field.closest('.form-group');
    if (!group) return;

    // Remove prior error state
    group.classList.remove('error');

    if (!field.value.trim()) {
      group.classList.add('error');
      valid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value.trim())) {
      group.classList.add('error');
      valid = false;
    }
  });

  return valid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========== COOKIE BANNER ==========
function initCookieBanner() {
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Check if preference already stored
  var pref = localStorage.getItem('wellstream_cookie_pref');
  if (!pref) {
    // Show banner after a short delay
    setTimeout(function() { banner.classList.add('show'); }, 500);
  }

  var acceptBtn = banner.querySelector('.cookie-accept');
  var declineBtn = banner.querySelector('.cookie-decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      localStorage.setItem('wellstream_cookie_pref', 'accepted');
      banner.classList.remove('show');
    });
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      localStorage.setItem('wellstream_cookie_pref', 'declined');
      banner.classList.remove('show');
    });
  }
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  // Animate progress bars when they come into view
  var progressBars = document.querySelectorAll('.progress-bar .fill');
  if (progressBars.length === 0) return;

  function checkProgressBars() {
    progressBars.forEach(function(bar) {
      var rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        bar.style.width = bar.getAttribute('data-width') || '0%';
      }
    });
  }

  // Set initial widths to 0
  progressBars.forEach(function(bar) {
    bar.setAttribute('data-width', bar.style.width || '100%');
    bar.style.width = '0%';
  });

  window.addEventListener('scroll', checkProgressBars);
  // Check on load
  setTimeout(checkProgressBars, 300);
}
