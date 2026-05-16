/* ==============================================
   LearnForge — Shared JavaScript
   ============================================== */

(function () {
  'use strict';

  // =============================================
  // NAVIGATION
  // =============================================

  function initNav() {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav-mobile-toggle');
    var links = document.querySelector('.nav-links');
    var overlay = document.querySelector('.nav-mobile-overlay');

    if (!nav || !toggle || !links) return;

    // Scroll shadow
    function onScroll() {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile toggle
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.contains('open');
      toggle.classList.toggle('open', !isOpen);
      links.classList.toggle('open', !isOpen);
      if (overlay) overlay.classList.toggle('open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Close on link click
    var navLinks = links.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Overlay click
    if (overlay) {
      overlay.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Active link detection
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // =============================================
  // FAQ ACCORDIONS
  // =============================================

  function initFaqAccordions() {
    var faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // Close all in same list
        var list = item.parentElement;
        if (list) {
          list.querySelectorAll('.faq-item.open').forEach(function (openItem) {
            openItem.classList.remove('open');
          });
        }
        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // =============================================
  // TESTIMONIAL CAROUSELS
  // =============================================

  function initCarousel(carouselEl) {
    if (!carouselEl) return;
    var track = carouselEl.querySelector('.testimonials-track');
    var cards = carouselEl.querySelectorAll('.testimonial-card');
    var prevBtn = carouselEl.querySelector('.carousel-prev');
    var nextBtn = carouselEl.querySelector('.carousel-next');
    var dotsContainer = carouselEl.querySelector('.carousel-dots');

    if (!track || !cards.length) return;

    var currentIndex = 0;
    var visibleCount = window.innerWidth <= 900 ? 1 : 3;
    var cardWidth = 0;
    var gap = 24;

    function updateDimensions() {
      visibleCount = window.innerWidth <= 900 ? 1 : 3;
      var firstCard = cards[0];
      var computed = window.getComputedStyle(carouselEl);
      var containerWidth = carouselEl.clientWidth;
      cardWidth = (containerWidth - (visibleCount - 1) * gap) / visibleCount;

      cards.forEach(function (card) {
        card.style.flex = '0 0 ' + cardWidth + 'px';
        card.style.marginRight = gap + 'px';
      });

      goToSlide(currentIndex);
    }

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      var totalDots = Math.ceil(cards.length / visibleCount);
      for (var i = 0; i < totalDots; i++) {
        var dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', function () {
          goToSlide(parseInt(this.getAttribute('data-index')));
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      var dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      var maxIndex = Math.max(0, cards.length - visibleCount);
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      track.style.transform = 'translateX(-' + (currentIndex * (cardWidth + gap)) + 'px)';
      updateDots();
    }

    function next() {
      var maxIndex = Math.max(0, cards.length - visibleCount);
      if (currentIndex >= maxIndex) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    }

    function prev() {
      if (currentIndex <= 0) {
        goToSlide(Math.max(0, cards.length - visibleCount));
      } else {
        goToSlide(currentIndex - 1);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    updateDimensions();
    createDots();

    window.addEventListener('resize', function () {
      updateDimensions();
      createDots();
    });

    // Auto-advance
    setInterval(function () {
      if (!document.hidden) next();
    }, 5000);
  }

  function initAllCarousels() {
    document.querySelectorAll('.testimonials-carousel').forEach(function (carousel) {
      initCarousel(carousel);
    });
  }

  // =============================================
  // HERO TAB SWITCH (Homepage)
  // =============================================

  function initHeroTabs() {
    var tabs = document.querySelectorAll('.hero-tab');
    var creatorView = document.querySelector('.hero-preview-creator');
    var studentView = document.querySelector('.hero-preview-student');

    if (!tabs.length || !creatorView || !studentView) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        var view = tab.getAttribute('data-view');
        if (view === 'student') {
          creatorView.style.display = 'none';
          studentView.style.display = 'block';
        } else {
          creatorView.style.display = 'block';
          studentView.style.display = 'none';
        }
      });
    });
  }

  // =============================================
  // WHY CHOOSE US TABS (Homepage)
  // =============================================

  function initWhyChooseTabs() {
    var tabs = document.querySelectorAll('.feature-tab');
    var contents = document.querySelectorAll('.features-panel');

    if (!tabs.length || !contents.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        var target = tab.getAttribute('data-target');
        contents.forEach(function (panel) {
          panel.style.display = panel.getAttribute('data-panel') === target ? 'block' : 'none';
        });
      });
    });
  }

  // =============================================
  // PRODUCT DEMO ACCORDION (Online Courses page)
  // =============================================

  function initDemoAccordion() {
    var toggle = document.querySelector('.demo-toggle');
    var content = document.querySelector('.demo-content');

    if (!toggle || !content) return;

    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.contains('open');
      toggle.classList.toggle('open', !isOpen);
      content.classList.toggle('open', !isOpen);
    });
  }

  // =============================================
  // SCROLL ANIMATIONS
  // =============================================

  function initScrollAnimations() {
    var observers = [];

    function observeElements(selector, className) {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function (el) {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add(className || 'visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(el);
        observers.push(observer);
      });
    }

    observeElements('.fade-up');
    observeElements('.fade-in');
    observeElements('.stagger-children');
  }

  // =============================================
  // INIT ALL
  // =============================================

  function init() {
    initNav();
    initFaqAccordions();
    initAllCarousels();
    initHeroTabs();
    initWhyChooseTabs();
    initDemoAccordion();
    initScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
