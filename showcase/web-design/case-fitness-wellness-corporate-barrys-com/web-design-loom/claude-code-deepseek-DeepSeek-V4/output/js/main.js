/* =============================================
   RedRoom Fitness — Shared JavaScript
   ============================================= */

(function () {
  'use strict';

  /* --- Mobile Navigation --- */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var mobileNav = document.querySelector('.mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Carousel --- */
  function initCarousel() {
    var carousel = document.querySelector('.carousel');
    if (!carousel) return;

    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var prevBtn = carousel.querySelector('.carousel-btn-prev');
    var nextBtn = carousel.querySelector('.carousel-btn-next');
    var dotsContainer = carousel.querySelector('.carousel-dots');
    var currentIndex = 0;
    var slideCount = slides.length;
    var autoPlayInterval;
    var isTransitioning = false;

    function goToSlide(index) {
      if (isTransitioning || index === currentIndex) return;
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;

      isTransitioning = true;
      currentIndex = index;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      updateDots();

      setTimeout(function () {
        isTransitioning = false;
      }, 500);
    }

    function updateDots() {
      if (!dotsContainer) return;
      var dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, 4500);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); startAutoPlay(); });

    if (dotsContainer) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () {
          goToSlide(i);
          startAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    /* Touch/swipe support */
    var touchStartX = 0;
    var touchEndX = 0;

    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      startAutoPlay();
    });

    startAutoPlay();
  }

  /* --- Floor/Treadmill Toggle --- */
  function initWorkoutToggle() {
    var toggleBtns = document.querySelectorAll('.toggle-btn');
    var toggleContents = document.querySelectorAll('.toggle-content');
    if (!toggleBtns.length || !toggleContents.length) return;

    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = this.getAttribute('data-target');
        toggleBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        toggleContents.forEach(function (c) {
          c.classList.toggle('active', c.getAttribute('data-content') === target);
        });
      });
    });
  }

  /* --- Instructor Filter --- */
  function initInstructorFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var instructorCards = document.querySelectorAll('.instructor-card');
    if (!filterBtns.length || !instructorCards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var location = this.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        instructorCards.forEach(function (card) {
          if (location === 'all' || card.getAttribute('data-location') === location) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.35s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* --- FAQ Accordion --- */
  function initFaqAccordion() {
    var accordionItems = document.querySelectorAll('.accordion-item');
    if (!accordionItems.length) return;

    accordionItems.forEach(function (item) {
      var header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', function () {
        var isActive = item.classList.contains('active');

        accordionItems.forEach(function (other) {
          other.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  /* --- Newsletter Validation --- */
  function initNewsletter() {
    var forms = document.querySelectorAll('.newsletter-form');
    if (!forms.length) return;

    forms.forEach(function (form) {
      var input = form.querySelector('.newsletter-input');
      var messageEl = form.querySelector('.newsletter-message');
      if (!input) return;

      var section = form.closest('.newsletter') || form.parentElement;
      if (!messageEl) {
        messageEl = section ? section.querySelector('.newsletter-message') : null;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = input.value.trim();

        input.classList.remove('error');

        if (!email) {
          input.classList.add('error');
          if (messageEl) {
            messageEl.textContent = 'Please enter your email address.';
            messageEl.className = 'newsletter-message error';
          }
          return;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          input.classList.add('error');
          if (messageEl) {
            messageEl.textContent = 'Please enter a valid email address.';
            messageEl.className = 'newsletter-message error';
          }
          return;
        }

        input.value = '';
        if (messageEl) {
          messageEl.textContent = 'You\'re subscribed! Welcome to the Red Room.';
          messageEl.className = 'newsletter-message success';
        }

        setTimeout(function () {
          if (messageEl) {
            messageEl.textContent = '';
            messageEl.className = 'newsletter-message';
          }
        }, 4000);
      });

      input.addEventListener('input', function () {
        input.classList.remove('error');
        if (messageEl) {
          messageEl.textContent = '';
          messageEl.className = 'newsletter-message';
        }
      });
    });
  }

  /* --- Country Selector --- */
  function initCountrySelector() {
    var selectors = document.querySelectorAll('.country-selector');
    if (!selectors.length) return;

    selectors.forEach(function (selector) {
      var btn = selector.querySelector('.country-selector-btn');
      var dropdown = selector.querySelector('.country-dropdown');
      var label = btn.querySelector('.selected-country');
      if (!btn || !dropdown) return;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = selector.classList.contains('open');
        document.querySelectorAll('.country-selector.open').forEach(function (s) {
          s.classList.remove('open');
        });
        if (!isOpen) selector.classList.add('open');
      });

      dropdown.querySelectorAll('button').forEach(function (option) {
        option.addEventListener('click', function () {
          if (label) label.textContent = this.textContent;
          selector.classList.remove('open');
        });
      });
    });

    document.addEventListener('click', function () {
      document.querySelectorAll('.country-selector.open').forEach(function (s) {
        s.classList.remove('open');
      });
    });
  }

  /* --- Set active nav link based on current page --- */
  function setActiveNavLink() {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    var pageMap = {
      'index.html': 'home',
      'the-workout.html': 'workout',
      'instructors.html': 'instructors',
      'ride-faq.html': 'ride',
      'digital-platform.html': 'digital'
    };
    var currentPage = pageMap[page];

    document.querySelectorAll('.nav-links a[data-page]').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-page') === currentPage);
    });
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initCarousel();
    initWorkoutToggle();
    initInstructorFilter();
    initFaqAccordion();
    initNewsletter();
    initCountrySelector();
    setActiveNavLink();
  });
})();
