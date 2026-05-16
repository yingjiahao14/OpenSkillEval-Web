// GlobalStone — Main JavaScript
(function() {
  'use strict';

  // ========================
  // HEADER SCROLL EFFECT
  // ========================
  const header = document.getElementById('siteHeader');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ========================
  // MOBILE NAV TOGGLE
  // ========================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
  }

  // ========================
  // MOBILE ACCORDION
  // ========================
  document.querySelectorAll('.mobile-nav-item[data-accordion]').forEach(function(item) {
    var link = item.querySelector('.mobile-nav-link');
    if (link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.mobile-nav-item.open').forEach(function(openItem) {
          openItem.classList.remove('open');
          var btn = openItem.querySelector('.mobile-nav-link');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          link.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ========================
  // TABS — WHAT WE DO
  // ========================
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tabId = btn.getAttribute('data-tab');

      tabBtns.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      tabPanels.forEach(function(panel) {
        panel.classList.remove('active');
      });

      var target = document.getElementById('panel-' + tabId);
      if (target) {
        target.classList.add('active');
      }
    });
  });

  // ========================
  // CAROUSEL
  // ========================
  var currentSlide = 0;
  var carousel = document.getElementById('partnersCarousel');

  if (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var dots = carousel.querySelectorAll('.carousel-dot');
    var totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    window.moveCarousel = function(direction) {
      goToSlide(currentSlide + direction);
    };

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(dot.getAttribute('data-slide')));
      });
    });

    // Auto-advance
    setInterval(function() {
      goToSlide(currentSlide + 1);
    }, 6000);
  }

  // ========================
  // FADE-IN ON SCROLL
  // ========================
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ========================
  // MEGA MENU ACCESSIBILITY
  // ========================
  document.querySelectorAll('.nav-item').forEach(function(item) {
    var link = item.querySelector('.nav-link[aria-haspopup]');
    var menu = item.querySelector('.mega-menu');
    if (!link || !menu) return;

    link.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var expanded = link.getAttribute('aria-expanded') === 'true';
        link.setAttribute('aria-expanded', !expanded);
        menu.style.opacity = expanded ? '0' : '1';
        menu.style.visibility = expanded ? 'hidden' : 'visible';
        menu.style.transform = expanded ? 'translateX(-50%) translateY(10px)' : 'translateX(-50%) translateY(0)';
      }
    });

    item.addEventListener('mouseleave', function() {
      link.setAttribute('aria-expanded', 'false');
    });

    item.addEventListener('mouseenter', function() {
      link.setAttribute('aria-expanded', 'true');
    });
  });

})();
