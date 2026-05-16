// GlobalStone — Main JavaScript
(function() {
  'use strict';

  // Header scroll effect
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Desktop mega menu
  const servicesToggle = document.getElementById('servicesToggle');
  const megaMenu = document.getElementById('megaMenu');
  if (servicesToggle && megaMenu) {
    let megaTimeout;

    servicesToggle.addEventListener('mouseenter', function() {
      clearTimeout(megaTimeout);
      megaMenu.classList.add('open');
      servicesToggle.classList.add('active');
    });

    servicesToggle.addEventListener('click', function(e) {
      e.preventDefault();
      megaMenu.classList.toggle('open');
      servicesToggle.classList.toggle('active');
    });

    megaMenu.addEventListener('mouseenter', function() {
      clearTimeout(megaTimeout);
    });

    var headerEl = servicesToggle.closest('.site-header');
    if (headerEl) {
      headerEl.addEventListener('mouseleave', function() {
        megaTimeout = setTimeout(function() {
          megaMenu.classList.remove('open');
          servicesToggle.classList.remove('active');
        }, 200);
      });
    }

    document.addEventListener('click', function(e) {
      if (!megaMenu.contains(e.target) && !servicesToggle.contains(e.target)) {
        megaMenu.classList.remove('open');
        servicesToggle.classList.remove('active');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        megaMenu.classList.remove('open');
        servicesToggle.classList.remove('active');
      }
    });
  }

  // Mobile nav
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Mobile accordion
  var mobileServicesToggle = document.getElementById('mobileServicesToggle');
  var mobileServicesContent = document.getElementById('mobileServicesContent');
  if (mobileServicesToggle && mobileServicesContent) {
    mobileServicesToggle.addEventListener('click', function() {
      mobileServicesToggle.classList.toggle('active');
      mobileServicesContent.classList.toggle('open');
    });
  }

  // What We Do tabs
  var tabButtons = document.querySelectorAll('.tab-button');
  if (tabButtons.length > 0) {
    tabButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        tabButtons.forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        var tabId = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-panel').forEach(function(panel) {
          panel.classList.remove('active');
        });
        var targetPanel = document.getElementById('panel-' + tabId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // Carousel (invest-finance-value page)
  var carouselTrack = document.getElementById('carouselTrack');
  var prevBtn = document.getElementById('carouselPrev');
  var nextBtn = document.getElementById('carouselNext');
  if (carouselTrack && prevBtn && nextBtn) {
    var currentSlide = 0;
    var slides = carouselTrack.querySelectorAll('.carousel-slide');

    function getSlidesPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateCarousel() {
      var perView = getSlidesPerView();
      var maxSlide = Math.max(0, slides.length - perView);
      if (currentSlide > maxSlide) currentSlide = maxSlide;
      var offset = currentSlide * (100 / perView);
      carouselTrack.style.transform = 'translateX(-' + offset + '%)';
    }

    nextBtn.addEventListener('click', function() {
      var perView = getSlidesPerView();
      var maxSlide = slides.length - perView;
      if (currentSlide < maxSlide) {
        currentSlide++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener('click', function() {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });

    window.addEventListener('resize', updateCarousel);
  }

  // Scroll-triggered reveal animations
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  var animElements = document.querySelectorAll(
    '.insight-card, .service-card, .capability-card, .commitment-card, .latest-card, .topic-card, .property-card, .related-card, .wwd-item, .carousel-card'
  );
  animElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();
