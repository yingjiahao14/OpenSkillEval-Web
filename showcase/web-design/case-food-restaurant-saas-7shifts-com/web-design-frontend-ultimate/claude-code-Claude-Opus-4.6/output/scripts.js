// ShiftWise - Shared JavaScript
(function() {
  'use strict';

  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Mobile nav
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');

  function toggleMobileNav() {
    const isOpen = mobileNav.classList.contains('open');
    hamburger.classList.toggle('open', !isOpen);
    mobileNav.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav);
    overlay.addEventListener('click', toggleMobileNav);
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (mobileNav.classList.contains('open')) toggleMobileNav();
      });
    });
  }

  // Scroll-triggered fade animations
  var fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function(el) { observer.observe(el); });
  }

  // Animated number count-up
  var statEls = document.querySelectorAll('[data-count]');
  if (statEls.length > 0) {
    var statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statEls.forEach(function(el) { statsObserver.observe(el); });
  }

  function animateCount(el) {
    var target = el.getAttribute('data-count');
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var isFloat = target.indexOf('.') !== -1;
    var targetNum = parseFloat(target.replace(/,/g, ''));
    var duration = 2000;
    var start = performance.now();

    function update(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = targetNum * eased;

      if (isFloat) {
        el.textContent = prefix + current.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // Testimonial carousel
  var carousel = document.querySelector('.testimonial-track');
  if (carousel) {
    var slides = carousel.querySelectorAll('.testimonial-slide');
    var dots = document.querySelectorAll('.carousel-dot');
    var prevBtn = document.querySelector('.carousel-prev');
    var nextBtn = document.querySelector('.carousel-next');
    var current = 0;
    var total = slides.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      carousel.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); });
    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { goTo(i); });
    });

    // Auto-advance every 6s
    setInterval(function() { goTo(current + 1); }, 6000);
  }

  // FAQ accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      var wasOpen = item.classList.contains('open');
      faqItems.forEach(function(fi) { fi.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Pricing toggle
  var toggle = document.querySelector('.toggle-switch');
  var monthlyLabel = document.querySelector('.monthly-label');
  var annualLabel = document.querySelector('.annual-label');

  if (toggle) {
    toggle.addEventListener('click', function() {
      var isAnnual = toggle.classList.toggle('active');
      if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
      if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

      document.querySelectorAll('[data-monthly]').forEach(function(el) {
        if (isAnnual) {
          el.textContent = el.getAttribute('data-annual');
        } else {
          el.textContent = el.getAttribute('data-monthly');
        }
      });

      var saveBadge = document.querySelector('.save-badge');
      if (saveBadge) saveBadge.style.opacity = isAnnual ? '1' : '0.5';
    });
  }

  // Contact form validation
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var valid = true;
      var fields = contactForm.querySelectorAll('[data-required]');

      fields.forEach(function(field) {
        var errorEl = field.parentElement.querySelector('.form-error');
        var isEmpty = !field.value.trim();
        var isEmail = field.type === 'email';
        var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

        if (isEmpty || (isEmail && !emailValid)) {
          valid = false;
          field.classList.add('error');
          if (errorEl) errorEl.classList.add('visible');
        } else {
          field.classList.remove('error');
          if (errorEl) errorEl.classList.remove('visible');
        }
      });

      if (valid) {
        contactForm.style.display = 'none';
        var success = document.querySelector('.form-success');
        if (success) success.classList.add('visible');
      }
    });

    contactForm.querySelectorAll('[data-required]').forEach(function(field) {
      field.addEventListener('input', function() {
        field.classList.remove('error');
        var errorEl = field.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  }
})();
