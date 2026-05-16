/* ==========================================================================
   LearnForge — Shared JavaScript
   Handles: tab switching, accordions, carousels, mobile nav, scroll animations
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMobile = document.querySelector('[data-nav-mobile]');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     Nav Scroll Shadow
     -------------------------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 10);
    });
  }

  /* --------------------------------------------------------------------------
     Tab Switcher — Generic (data-tabs pattern)
     -------------------------------------------------------------------------- */
  function initTabs(container) {
    var tabs = container.querySelectorAll('[data-tab]');
    var panels = container.querySelectorAll('[data-panel]');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = this.getAttribute('data-tab');
        tabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        panels.forEach(function (p) {
          p.classList.toggle('active', p.getAttribute('data-panel') === target);
        });
      });
    });
  }

  document.querySelectorAll('[data-tabs]').forEach(initTabs);

  /* --------------------------------------------------------------------------
     Why Choose Us — Feature Tabs (specific structure)
     -------------------------------------------------------------------------- */
  var whyTabsContainer = document.querySelector('[data-why-tabs]');
  if (whyTabsContainer) {
    var whyTriggers = whyTabsContainer.querySelectorAll('[data-why-trigger]');
    var whyPanels = whyTabsContainer.querySelectorAll('[data-why-panel]');

    whyTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var target = this.getAttribute('data-why-trigger');
        whyTriggers.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        whyPanels.forEach(function (p) {
          p.classList.toggle('active', p.getAttribute('data-why-panel') === target);
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     FAQ Accordion
     -------------------------------------------------------------------------- */
  document.querySelectorAll('[data-accordion]').forEach(function (container) {
    container.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = this.closest('[data-accordion-item]');
        var isOpen = item.classList.contains('open');
        container.querySelectorAll('[data-accordion-item]').forEach(function (i) {
          i.classList.remove('open');
        });
        if (!isOpen) { item.classList.add('open'); }
      });
    });
  });

  /* --------------------------------------------------------------------------
     Product Demo Accordion (single toggle, no collapse-others)
     -------------------------------------------------------------------------- */
  var productDemo = document.querySelector('[data-product-demo]');
  if (productDemo) {
    var demoToggle = productDemo.querySelector('[data-product-demo-trigger]');
    if (demoToggle) {
      demoToggle.addEventListener('click', function () {
        productDemo.classList.toggle('open');
      });
    }
  }

  /* --------------------------------------------------------------------------
     Testimonials Carousel
     -------------------------------------------------------------------------- */
  function Carousel(el) {
    this.el = el;
    this.track = el.querySelector('[data-carousel-track]');
    this.slides = Array.from(this.track.querySelectorAll('[data-carousel-slide]'));
    this.prevBtn = el.querySelector('[data-carousel-prev]');
    this.nextBtn = el.querySelector('[data-carousel-next]');
    this.dotsContainer = el.querySelector('[data-carousel-dots]');
    this.index = 0;
    this.totalSlides = this.slides.length;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000;

    this.renderDots();
    this.update();
    this.startAutoplay();

    var self = this;

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', function () { self.prev(); });
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', function () { self.next(); });
    }

    // Pause autoplay on hover
    el.addEventListener('mouseenter', function () { self.stopAutoplay(); });
    el.addEventListener('mouseleave', function () { self.startAutoplay(); });

    // Touch support
    var touchStartX = 0;
    var touchEndX = 0;
    this.track.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    this.track.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) { self.next(); } else { self.prev(); }
      }
    });
  }

  Carousel.prototype.renderDots = function () {
    var self = this;
    if (!this.dotsContainer || this.totalSlides <= 1) {
      if (this.dotsContainer) this.dotsContainer.style.display = 'none';
      return;
    }
    this.dotsContainer.innerHTML = '';
    for (var i = 0; i < this.totalSlides; i++) {
      var dot = document.createElement('button');
      dot.className = 'testimonials__dot';
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.setAttribute('data-carousel-dot', '');
      if (i === 0) dot.classList.add('active');
      (function (idx) {
        dot.addEventListener('click', function () { self.goTo(idx); });
      })(i);
      this.dotsContainer.appendChild(dot);
    }
  };

  Carousel.prototype.update = function () {
    this.track.style.transform = 'translateX(-' + (this.index * 100) + '%)';
    var dots = this.dotsContainer ? this.dotsContainer.querySelectorAll('[data-carousel-dot]') : [];
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === this.index);
    }, this);
  };

  Carousel.prototype.goTo = function (idx) {
    this.index = idx;
    this.update();
    this.resetAutoplay();
  };

  Carousel.prototype.next = function () {
    this.index = (this.index + 1) % this.totalSlides;
    this.update();
    this.resetAutoplay();
  };

  Carousel.prototype.prev = function () {
    this.index = (this.index - 1 + this.totalSlides) % this.totalSlides;
    this.update();
    this.resetAutoplay();
  };

  Carousel.prototype.startAutoplay = function () {
    var self = this;
    this.stopAutoplay();
    if (this.totalSlides > 1) {
      this.autoplayInterval = setInterval(function () { self.next(); }, this.autoplayDelay);
    }
  };

  Carousel.prototype.stopAutoplay = function () {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  };

  Carousel.prototype.resetAutoplay = function () {
    this.stopAutoplay();
    this.startAutoplay();
  };

  // Initialize all carousels
  document.querySelectorAll('[data-carousel]').forEach(function (el) {
    new Carousel(el);
  });

  /* --------------------------------------------------------------------------
     Scroll Reveal Animation
     -------------------------------------------------------------------------- */
  var animatedElements = document.querySelectorAll('.animate-on-scroll');

  function checkVisibility() {
    var windowHeight = window.innerHeight;
    animatedElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  if (animatedElements.length > 0) {
    checkVisibility();
    var scrollTimer;
    window.addEventListener('scroll', function () {
      if (scrollTimer) { cancelAnimationFrame(scrollTimer); }
      scrollTimer = requestAnimationFrame(checkVisibility);
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     Active Nav Link Highlighting
     -------------------------------------------------------------------------- */
  var currentPath = window.location.pathname;
  var navLinks = document.querySelectorAll('.nav__link[href]');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href) {
      var linkFile = href.split('/').pop();
      var currentFile = currentPath.split('/').pop() || 'index.html';
      if (linkFile === currentFile) {
        link.classList.add('nav__link--active');
      }
    }
  });

})();
