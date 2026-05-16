/**
 * GlobalStone — Main JavaScript
 * Handles: mobile nav, mega menu, tabs, carousel, scroll effects
 */

(function() {
  'use strict';

  // ============================================
  // Mobile Navigation
  // ============================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', function() {
      const isOpen = navMobile.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navMobile.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMobile.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // Mobile Accordion
  // ============================================
  document.querySelectorAll('.mobile-accordion-header').forEach(function(header) {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all others
      document.querySelectorAll('.mobile-accordion-header').forEach(function(h) {
        if (h !== header) {
          h.setAttribute('aria-expanded', 'false');
          h.nextElementSibling.classList.remove('open');
        }
      });

      this.setAttribute('aria-expanded', !isExpanded);
      content.classList.toggle('open', !isExpanded);
    });
  });

  // ============================================
  // Header Scroll Effect
  // ============================================
  const header = document.querySelector('.header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          header.classList.toggle('scrolled', window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ============================================
  // What We Do Tabs
  // ============================================
  const tabsWrapper = document.querySelector('.tabs-wrapper');
  if (tabsWrapper) {
    const tabBtns = tabsWrapper.querySelectorAll('.tab-btn');
    const tabPanels = tabsWrapper.querySelectorAll('.tab-panel');

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const targetId = this.getAttribute('data-tab');

        tabBtns.forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(function(p) {
          p.classList.remove('active');
        });

        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // ============================================
  // Carousel
  // ============================================
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;
      track.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
      });
    }
  });

  // ============================================
  // Mega Menu Click (for touch devices)
  // ============================================
  const megaTrigger = document.querySelector('.mega-menu-trigger');
  if (megaTrigger) {
    const triggerLink = megaTrigger.querySelector('.nav-link');
    const megaMenu = megaTrigger.querySelector('.mega-menu');

    if (triggerLink && megaMenu) {
      triggerLink.addEventListener('click', function(e) {
        // Only toggle on touch devices or when menu isn't already showing via hover
        if (window.innerWidth < 1024 || window.matchMedia('(hover: none)').matches) {
          e.preventDefault();
          megaMenu.classList.toggle('open');
        }
      });

      // Close on outside click
      document.addEventListener('click', function(e) {
        if (!megaTrigger.contains(e.target)) {
          megaMenu.classList.remove('open');
        }
      });
    }
  }

  // ============================================
  // Smooth scroll for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
