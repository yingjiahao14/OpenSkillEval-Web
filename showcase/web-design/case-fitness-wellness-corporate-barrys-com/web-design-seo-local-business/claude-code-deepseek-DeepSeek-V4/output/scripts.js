/* ============================================
   REDROOM FITNESS — Shared Scripts
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navUtility = document.getElementById('navUtility');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks && navLinks.classList.contains('mobile-open');
      if (navLinks) navLinks.classList.toggle('mobile-open', !isOpen);
      if (navUtility) navUtility.classList.toggle('mobile-open', !isOpen);
    });
  }

  // Close mobile nav on link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('mobile-open');
        if (navUtility) navUtility.classList.remove('mobile-open');
      });
    });
  }

  // --- Lifestyle Carousel ---
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    var slides = track.querySelectorAll('.carousel-slide');
    var currentIndex = 0;
    var totalSlides = slides.length;
    var autoPlayInterval;

    function createDots() {
      dotsContainer.innerHTML = '';
      for (var i = 0; i < totalSlides; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', (function (idx) {
          return function () { goToSlide(idx); };
        })(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      var dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      updateDots();
      resetAutoPlay();
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % totalSlides);
    }

    function prevSlide() {
      goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Swipe support
    var touchStartX = 0;
    var touchEndX = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });

    createDots();
    startAutoPlay();
  }

  // --- Floor / Treadmill Toggle ---
  var toggleButtons = document.getElementById('toggleButtons');
  if (toggleButtons) {
    toggleButtons.querySelectorAll('.toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = this.getAttribute('data-tab');
        toggleButtons.querySelectorAll('.toggle-btn').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.toggle-content').forEach(function (c) { c.classList.remove('active'); });
        var target = document.getElementById('toggle' + tab.charAt(0).toUpperCase() + tab.slice(1));
        if (target) target.classList.add('active');
      });
    });
  }

  // --- Instructor Location Filter ---
  var filterContainer = document.getElementById('instructorFilters');
  if (filterContainer) {
    var filterBtns = filterContainer.querySelectorAll('.filter-btn');
    var instructorCards = document.querySelectorAll('.instructor-card');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        var filter = this.getAttribute('data-filter');

        instructorCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-location') === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.4s ease';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- FAQ Accordion (single-open) ---
  var faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.querySelectorAll('.faq-question').forEach(function (question) {
      question.addEventListener('click', function () {
        var faqItem = this.parentElement;
        var isOpen = faqItem.classList.contains('open');

        // Close all items
        faqList.querySelectorAll('.faq-item').forEach(function (item) {
          item.classList.remove('open');
          item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it wasn't already open
        if (!isOpen) {
          faqItem.classList.add('open');
          this.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // --- Newsletter Validation ---
  var newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(function (form) {
    var emailInput = form.querySelector('input[type="email"]');
    var errorMsg = form.querySelector('.error-msg');
    var successMsg = form.closest('.newsletter') ? form.closest('.newsletter').querySelector('.newsletter-success') : form.parentElement.querySelector('.newsletter-success');

    if (!emailInput || !errorMsg || !successMsg) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = emailInput.value.trim();

      // Email validation regex
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        emailInput.classList.add('error');
        errorMsg.classList.add('visible');
        successMsg.classList.remove('visible');
      } else {
        emailInput.classList.remove('error');
        errorMsg.classList.remove('visible');
        successMsg.classList.add('visible');
        form.style.display = 'none';
        emailInput.value = '';

        // Reset after 5 seconds
        setTimeout(function () {
          form.style.display = '';
          successMsg.classList.remove('visible');
        }, 5000);
      }
    });

    emailInput.addEventListener('input', function () {
      if (emailInput.classList.contains('error')) {
        emailInput.classList.remove('error');
        errorMsg.classList.remove('visible');
      }
    });
  });

  // --- Country Selector ---
  var countrySelectors = document.querySelectorAll('.country-selector');
  countrySelectors.forEach(function (selector) {
    var selectBtn = selector.querySelector('.country-select-btn');
    var dropdown = selector.querySelector('.country-dropdown');
    var selectedDisplay = selector.querySelector('#selectedCountry');

    if (!selectBtn || !dropdown) return;

    selectBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    dropdown.querySelectorAll('button').forEach(function (option) {
      option.addEventListener('click', function (e) {
        e.stopPropagation();
        var country = this.getAttribute('data-country');
        if (selectedDisplay) selectedDisplay.textContent = country;
        dropdown.classList.remove('open');
      });
    });
  });

  // Close country dropdowns on outside click
  document.addEventListener('click', function () {
    document.querySelectorAll('.country-dropdown.open').forEach(function (dd) {
      dd.classList.remove('open');
    });
  });

  // --- Sticky nav shadow on scroll ---
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 1px 20px rgba(0,0,0,0.5)';
      } else {
        navbar.style.boxShadow = '';
      }
    });
  }

})();
