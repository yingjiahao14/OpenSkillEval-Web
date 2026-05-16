/* GlobalStone — Interactive Components */

(function () {
  'use strict';

  // ─── Header scroll effect ───
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // ─── Mega Menu (Desktop) ───
  const servicesNav = document.getElementById('servicesNav');
  if (servicesNav) {
    let closeTimer;

    servicesNav.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
      servicesNav.classList.add('open');
    });

    servicesNav.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        servicesNav.classList.remove('open');
      }, 200);
    });

    var servicesLink = servicesNav.querySelector(':scope > a');
    if (servicesLink) {
      servicesLink.addEventListener('click', function (e) {
        if (window.innerWidth <= 1024) return;
        if (servicesNav.classList.contains('open')) {
          return;
        }
        e.preventDefault();
        servicesNav.classList.toggle('open');
      });
    }
  }

  // ─── Mobile Navigation ───
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
  }

  // ─── Mobile Accordion ───
  var accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var targetId = this.getAttribute('data-target');
      var panel = document.getElementById(targetId);
      if (!panel) return;
      this.classList.toggle('open');
      panel.classList.toggle('open');
    });
  });

  // ─── Vertical Tabs ───
  var tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabContainer = this.closest('.tabs-container') || this.closest('section');
      if (!tabContainer) return;

      var allBtns = tabContainer.querySelectorAll('.tab-btn');
      var allPanels = tabContainer.querySelectorAll('.tab-panel');
      var tabId = this.getAttribute('data-tab');

      allBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      allPanels.forEach(function (p) { p.classList.remove('active'); });

      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      var targetPanel = tabContainer.querySelector('#tab-' + tabId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // ─── Carousel ───
  var carouselTrack = document.getElementById('carouselTrack');
  var prevBtn = document.getElementById('carouselPrev');
  var nextBtn = document.getElementById('carouselNext');

  if (carouselTrack && prevBtn && nextBtn) {
    var currentSlide = 0;
    var slides = carouselTrack.querySelectorAll('.carousel-slide');
    var totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    }

    prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); });
    nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); });

    setInterval(function () { goToSlide(currentSlide + 1); }, 6000);
  }

  // ─── Close mega menu on outside click ───
  document.addEventListener('click', function (e) {
    if (servicesNav && !servicesNav.contains(e.target)) {
      servicesNav.classList.remove('open');
    }
  });

  // ─── Close mobile nav on resize to desktop ───
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Intersection Observer for fade-in animations ───
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  var animateElements = document.querySelectorAll(
    '.insight-card, .service-card, .capability-card, .commitment-card, ' +
    '.topic-card, .property-type-card, .related-service-card, .stat-card'
  );

  animateElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    fadeObserver.observe(el);
  });

})();
