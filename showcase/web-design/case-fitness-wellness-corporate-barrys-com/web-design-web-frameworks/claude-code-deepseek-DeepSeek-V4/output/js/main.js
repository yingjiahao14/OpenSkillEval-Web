/* ============================================================
   RedRoom Fitness — Shared JavaScript
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile Navigation ---
  function initMobileNav() {
    var toggle = document.querySelector('.nav__mobile-toggle');
    var overlay = document.querySelector('.nav__mobile-overlay');
    if (!toggle || !overlay) return;

    toggle.addEventListener('click', function () {
      var isOpen = overlay.classList.toggle('nav__mobile-overlay--open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    overlay.querySelectorAll('.nav__mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        overlay.classList.remove('nav__mobile-overlay--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Carousel ---
  function initCarousel() {
    var carousel = document.querySelector('.carousel');
    if (!carousel) return;

    var track = carousel.querySelector('.carousel__track');
    var slides = carousel.querySelectorAll('.carousel__slide');
    var prevBtn = carousel.querySelector('.carousel__prev');
    var nextBtn = carousel.querySelector('.carousel__next');
    var dotsContainer = carousel.querySelector('.carousel__dots');
    var currentIndex = 0;
    var totalSlides = slides.length;
    var autoplayInterval;
    var isTransitioning = false;
    var autoplayPaused = false;

    if (totalSlides < 2 && prevBtn && nextBtn) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }

    if (!dotsContainer) return;

    // Create dots
    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', (function (idx) {
        return function () { goToSlide(idx); };
      })(i));
      dotsContainer.appendChild(dot);
    }

    var dots = dotsContainer.querySelectorAll('.carousel__dot');

    function goToSlide(index) {
      if (isTransitioning || index === currentIndex) return;
      isTransitioning = true;

      currentIndex = index;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';

      dots.forEach(function (d, i) {
        d.classList.toggle('carousel__dot--active', i === index);
      });

      setTimeout(function () {
        isTransitioning = false;
      }, 500);
    }

    function nextSlide() { goToSlide((currentIndex + 1) % totalSlides); }
    function prevSlide() { goToSlide((currentIndex - 1 + totalSlides) % totalSlides); }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Touch support
    var touchStartX = 0;

    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      var touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    });

    // Autoplay with overlap guard
    function startAutoplay() {
      stopAutoplay();
      if (autoplayPaused) return;
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }

    startAutoplay();

    carousel.addEventListener('mouseenter', function () {
      autoplayPaused = true;
      stopAutoplay();
    });

    carousel.addEventListener('mouseleave', function () {
      autoplayPaused = false;
      startAutoplay();
    });

    carousel.addEventListener('touchstart', function () {
      autoplayPaused = true;
      stopAutoplay();
    });

    carousel.addEventListener('touchend', function () {
      setTimeout(function () {
        autoplayPaused = false;
        startAutoplay();
      }, 3000);
    });
  }

  // --- Floor/Treadmill Toggle ---
  function initToggleTabs() {
    var tabs = document.querySelectorAll('.toggle-tab');
    var contents = document.querySelectorAll('.toggle-content');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-target');

        tabs.forEach(function (t) { t.classList.remove('toggle-tab--active'); });
        tab.classList.add('toggle-tab--active');

        contents.forEach(function (c) {
          c.classList.toggle('toggle-content--active', c.getAttribute('data-content') === target);
        });
      });
    });
  }

  // --- Instructor Filter ---
  function initInstructorFilter() {
    var filterBar = document.querySelector('.filter-bar');
    if (!filterBar) return;

    var buttons = filterBar.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.instructor-card');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var location = btn.getAttribute('data-filter');

        buttons.forEach(function (b) { b.classList.remove('filter-btn--active'); });
        btn.classList.add('filter-btn--active');

        cards.forEach(function (card) {
          if (location === 'all' || card.getAttribute('data-location') === location) {
            card.classList.remove('instructor-card--hidden');
          } else {
            card.classList.add('instructor-card--hidden');
          }
        });
      });
    });
  }

  // --- FAQ Accordion ---
  function initAccordion() {
    var accordion = document.querySelector('.accordion');
    if (!accordion) return;

    var items = accordion.querySelectorAll('.accordion__item');

    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion__trigger');
      var panel = item.querySelector('.accordion__panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', function () {
        var isActive = item.classList.contains('accordion__item--active');

        // Close all
        items.forEach(function (other) {
          other.classList.remove('accordion__item--active');
          var otherTrigger = other.querySelector('.accordion__trigger');
          var otherPanel = other.querySelector('.accordion__panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = '0';
        });

        // Open clicked (if it wasn't already open)
        if (!isActive) {
          item.classList.add('accordion__item--active');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  // --- Newsletter Validation ---
  function initNewsletter() {
    var forms = document.querySelectorAll('.newsletter__form');
    if (!forms.length) return;

    forms.forEach(function (form) {
      var input = form.querySelector('.newsletter__input');
      var feedback = form.querySelector('.newsletter__feedback');
      if (!input) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var email = input.value.trim();

        if (!email) {
          input.classList.add('newsletter__input--error');
          if (feedback) {
            feedback.textContent = 'Please enter your email address.';
            feedback.className = 'newsletter__feedback newsletter__feedback--error';
          }
          return;
        }

        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
          input.classList.add('newsletter__input--error');
          if (feedback) {
            feedback.textContent = 'Please enter a valid email address.';
            feedback.className = 'newsletter__feedback newsletter__feedback--error';
          }
          return;
        }

        // Success
        input.classList.remove('newsletter__input--error');
        input.value = '';
        if (feedback) {
          feedback.textContent = 'You\'re in! Check your inbox for a confirmation.';
          feedback.className = 'newsletter__feedback newsletter__feedback--success';
        }
      });

      input.addEventListener('input', function () {
        input.classList.remove('newsletter__input--error');
        if (feedback) {
          feedback.textContent = '';
        }
      });
    });
  }

  // --- Country Selector ---
  function initCountrySelector() {
    var select = document.querySelector('.footer__country-select select');
    if (!select) return;

    select.addEventListener('change', function () {
      // Country selection handler — redirect or filter content in production
    });
  }

  // --- Scroll Animations ---
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    var ticking = false;

    function checkVisibility() {
      var windowHeight = window.innerHeight;

      elements.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < windowHeight * 0.85) {
          el.classList.add('fade-up--visible');
        }
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(checkVisibility);
        ticking = true;
      }
    }, { passive: true });

    checkVisibility();
  }

  // --- Init All ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  function initAll() {
    initMobileNav();
    initCarousel();
    initToggleTabs();
    initInstructorFilter();
    initAccordion();
    initNewsletter();
    initCountrySelector();
    initScrollAnimations();
  }

})();
