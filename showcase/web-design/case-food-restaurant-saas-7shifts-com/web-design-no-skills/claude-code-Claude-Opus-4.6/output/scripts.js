// ===== ShiftWise Global Scripts =====

document.addEventListener('DOMContentLoaded', function () {

  // --- Header scroll effect ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // --- Mobile nav ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');

  function closeMobileNav() {
    hamburger && hamburger.classList.remove('active');
    mobileNav && mobileNav.classList.remove('open');
    overlay && overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    hamburger && hamburger.classList.add('active');
    mobileNav && mobileNav.classList.add('open');
    overlay && overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileNav && mobileNav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileNav);
  }

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // --- Testimonial Carousel ---
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentSlide = 0;

  function goToSlide(index) {
    if (!track || slides.length === 0) return;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); });
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goToSlide(i); });
  });

  // Auto-advance carousel every 5s
  if (track && slides.length > 0) {
    setInterval(function () { goToSlide(currentSlide + 1); }, 5000);
  }

  // --- Pricing Toggle ---
  const billingToggle = document.getElementById('billing-toggle');
  const monthlyLabel = document.querySelector('.billing-monthly');
  const annualLabel = document.querySelector('.billing-annual');

  if (billingToggle) {
    billingToggle.addEventListener('change', function () {
      const isAnnual = this.checked;
      monthlyLabel && monthlyLabel.classList.toggle('active', !isAnnual);
      annualLabel && annualLabel.classList.toggle('active', isAnnual);

      document.querySelectorAll('[data-monthly]').forEach(function (el) {
        if (isAnnual) {
          el.textContent = el.getAttribute('data-annual');
        } else {
          el.textContent = el.getAttribute('data-monthly');
        }
      });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.parentElement;
      var wasActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(function (faqItem) {
        faqItem.classList.remove('active');
      });

      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  // --- Contact Form ---
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      contactForm.querySelectorAll('.form-group').forEach(function (group) {
        group.classList.remove('has-error');
      });

      var requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        var group = field.closest('.form-group');
        if (!field.value.trim()) {
          group.classList.add('has-error');
          isValid = false;
        }
        if (field.type === 'email' && field.value.trim()) {
          var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(field.value.trim())) {
            group.classList.add('has-error');
            group.querySelector('.form-error').textContent = 'Please enter a valid email address.';
            isValid = false;
          }
        }
      });

      if (isValid) {
        contactForm.style.display = 'none';
        var success = document.querySelector('.form-success');
        if (success) success.classList.add('show');
      }
    });
  }

  // --- Animated Stats (count-up) ---
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');
  var statsObserved = false;

  function animateCount(el) {
    var target = el.getAttribute('data-target');
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var isDecimal = target.indexOf('.') !== -1;
    var end = parseFloat(target);
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * end;

      if (isDecimal) {
        el.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (isDecimal) {
          el.textContent = prefix + end.toFixed(1) + suffix;
        } else {
          el.textContent = prefix + end.toLocaleString() + suffix;
        }
      }
    }

    requestAnimationFrame(step);
  }

  if (statNumbers.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsObserved) {
          statsObserved = true;
          statNumbers.forEach(animateCount);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(function (el) { observer.observe(el); });
  }

  // --- Active nav link ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
