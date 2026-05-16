/**
 * LearnForge — Main JavaScript
 * Vanilla JS, no dependencies
 */

(function() {
  'use strict';

  // ============================================
  // Mobile Navigation
  // ============================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // ============================================
  // Hero Tab Switcher
  // ============================================
  function initHeroTabs() {
    const tabs = document.querySelectorAll('.hero-tab');
    const preview = document.querySelector('.hero-preview');
    if (!tabs.length || !preview) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const view = tab.dataset.view;
        if (view === 'student') {
          preview.classList.add('student-view');
        } else {
          preview.classList.remove('student-view');
        }
      });
    });
  }

  // ============================================
  // Why Choose Us Tabs
  // ============================================
  function initWhyTabs() {
    const tabs = document.querySelectorAll('.why-tab');
    const panels = document.querySelectorAll('.why-panel');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach(panel => {
          panel.classList.toggle('active', panel.dataset.panel === target);
        });
      });
    });
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others (optional accordion behavior)
        const parent = item.closest('.faq-list');
        if (parent) {
          parent.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        }

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // ============================================
  // Testimonials Carousel
  // ============================================
  function initCarousel() {
    const carousels = document.querySelectorAll('.testimonials-carousel');

    carousels.forEach(carousel => {
      const track = carousel.querySelector('.testimonials-track');
      const cards = carousel.querySelectorAll('.testimonial-card');
      const prevBtn = carousel.querySelector('.carousel-btn.prev');
      const nextBtn = carousel.querySelector('.carousel-btn.next');
      const dotsContainer = carousel.querySelector('.carousel-dots');

      if (!track || !cards.length) return;

      let currentIndex = 0;
      let itemsPerView = getItemsPerView();
      const maxIndex = Math.max(0, cards.length - itemsPerView);

      // Create dots
      if (dotsContainer) {
        const dotCount = Math.ceil(cards.length / itemsPerView);
        dotsContainer.innerHTML = '';
        for (let i = 0; i < dotCount; i++) {
          const dot = document.createElement('button');
          dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
          dot.addEventListener('click', () => goTo(i * itemsPerView));
          dotsContainer.appendChild(dot);
        }
      }

      function getItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
      }

      function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const activeDot = Math.floor(currentIndex / itemsPerView);
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeDot));
      }

      function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight || 24);
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
      }

      function next() {
        if (currentIndex >= maxIndex) {
          goTo(0);
        } else {
          goTo(currentIndex + 1);
        }
      }

      function prev() {
        if (currentIndex <= 0) {
          goTo(maxIndex);
        } else {
          goTo(currentIndex - 1);
        }
      }

      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);

      // Touch/swipe support
      let startX = 0;
      let isDragging = false;

      track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? next() : prev();
        }
        isDragging = false;
      }, { passive: true });

      // Auto-resize
      window.addEventListener('resize', () => {
        const newItems = getItemsPerView();
        if (newItems !== itemsPerView) {
          itemsPerView = newItems;
          currentIndex = 0;
          track.style.transform = 'translateX(0)';
          updateDots();
        }
      });
    });
  }

  // ============================================
  // Product Demo Accordion
  // ============================================
  function initProductDemo() {
    const demoToggle = document.querySelector('.demo-toggle');
    const demoContent = document.querySelector('.demo-content');
    if (!demoToggle || !demoContent) return;

    demoToggle.addEventListener('click', () => {
      demoContent.classList.toggle('active');
      demoToggle.classList.toggle('active');
      demoToggle.setAttribute('aria-expanded', demoContent.classList.contains('active'));
    });
  }

  // ============================================
  // Scroll Reveal
  // ============================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ============================================
  // Smooth scroll for anchor links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ============================================
  // Initialize everything
  // ============================================
  function init() {
    initHeroTabs();
    initWhyTabs();
    initFAQ();
    initCarousel();
    initProductDemo();
    initScrollReveal();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
