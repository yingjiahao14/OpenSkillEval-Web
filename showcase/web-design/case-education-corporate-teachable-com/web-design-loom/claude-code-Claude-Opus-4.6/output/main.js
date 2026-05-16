document.addEventListener('DOMContentLoaded', function () {

  // Navbar scroll effect
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // Mobile menu
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // FAQ Accordions
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      var parent = item.closest('.faq-list');
      if (parent) {
        parent.querySelectorAll('.faq-item.open').forEach(function (openItem) {
          openItem.classList.remove('open');
        });
      }
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Hero Tab Switch (Homepage)
  var heroTabBtns = document.querySelectorAll('.hero-tab-btn');
  heroTabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = btn.getAttribute('data-tab');
      heroTabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.hero-tab-panel').forEach(function (panel) {
        panel.classList.remove('active');
      });
      var target = document.getElementById('tab-' + tab);
      if (target) target.classList.add('active');
    });
  });

  // Why Choose Us Tabs (Homepage)
  var whyTabBtns = document.querySelectorAll('.why-tab-btn');
  whyTabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = btn.getAttribute('data-why-tab');
      whyTabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.why-tab-panel').forEach(function (panel) {
        panel.classList.remove('active');
      });
      var target = document.getElementById('why-' + tab);
      if (target) target.classList.add('active');
    });
  });

  // Testimonial Carousels
  document.querySelectorAll('.carousel-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var carouselId = btn.getAttribute('data-carousel');
      var dir = btn.getAttribute('data-dir');
      var track = document.getElementById(carouselId);
      if (!track) return;

      var cards = track.querySelectorAll('.testimonial-card');
      if (cards.length === 0) return;

      var cardWidth = cards[0].offsetWidth + 24; // gap
      var maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
      var currentTransform = getTranslateX(track);

      if (dir === 'next') {
        var next = currentTransform - cardWidth;
        if (Math.abs(next) > maxScroll) next = 0;
        track.style.transform = 'translateX(' + next + 'px)';
      } else {
        var prev = currentTransform + cardWidth;
        if (prev > 0) prev = -(maxScroll);
        track.style.transform = 'translateX(' + prev + 'px)';
      }
    });
  });

  function getTranslateX(el) {
    var transform = window.getComputedStyle(el).transform;
    if (transform === 'none') return 0;
    var matrix = transform.match(/matrix.*\((.+)\)/);
    if (matrix) {
      var values = matrix[1].split(', ');
      return parseFloat(values[4]) || 0;
    }
    return 0;
  }

  // Scroll animations
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

});
