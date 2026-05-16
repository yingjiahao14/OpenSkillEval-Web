/* ============================================================
   GlobalStone — Shared JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Mobile Navigation Toggle ---------- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', !isOpen);
      mobileToggle.classList.toggle('active', !isOpen);
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Mobile subnav accordions
    const subnavTriggers = mobileNav.querySelectorAll('.mobile-nav-link');
    subnavTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const subnav = this.nextElementSibling;
        if (subnav && subnav.classList.contains('mobile-subnav')) {
          const isOpen = subnav.classList.contains('open');
          subnav.classList.toggle('open', !isOpen);
          this.classList.toggle('open', !isOpen);
        }
      });
    });
  }

  /* ---------- Mega Menu Dropdown ---------- */
  const navItems = document.querySelectorAll('.nav-item.services');

  navItems.forEach(function (item) {
    const link = item.querySelector('.nav-link');
    const menu = item.querySelector('.mega-menu');
    if (!link || !menu) return;

    let hideTimeout;

    function showMenu() {
      clearTimeout(hideTimeout);
      menu.classList.add('open');
      link.setAttribute('aria-expanded', 'true');
    }

    function hideMenu() {
      hideTimeout = setTimeout(function () {
        menu.classList.remove('open');
        link.setAttribute('aria-expanded', 'false');
      }, 150);
    }

    link.addEventListener('mouseenter', showMenu);
    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (menu.classList.contains('open')) {
        hideMenu();
      } else {
        showMenu();
      }
    });
    item.addEventListener('mouseenter', showMenu);
    item.addEventListener('mouseleave', hideMenu);
    menu.addEventListener('mouseenter', showMenu);
    menu.addEventListener('mouseleave', hideMenu);

    // Keyboard: close on Escape
    link.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideMenu();
    });
  });

  /* ---------- What We Do — Vertical Tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length && tabPanels.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = this.getAttribute('data-tab');
        tabBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(function (p) { p.classList.remove('active'); });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        var panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ---------- Carousel (Featured Partners) ---------- */
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;

    // Create dots
    if (dotsContainer && slides.length > 1) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', function () { goToSlide(i); });
        dotsContainer.appendChild(dot);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = 'translateX(' + (-100 * index) + '%)';

      var dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === index);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        var idx = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        goToSlide(idx);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        var idx = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        goToSlide(idx);
      });
    }

    // Auto-advance
    if (slides.length > 1) {
      setInterval(function () {
        var idx = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        goToSlide(idx);
      }, 6000);
    }
  }

  /* ---------- Newsletter Subscribe ---------- */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = this.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        alert('Thank you for subscribing to Our Take Newsletter. You will receive a confirmation email shortly.');
        input.value = '';
      }
    });
  }

  /* ---------- Active Nav Link Highlighting ---------- */
  (function () {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.main-nav .nav-link, .mobile-subnav a, .mobile-nav-link[href]');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPath || (currentPath === 'index.html' && href === './')) {
        link.classList.add('active');
      }
    });
  })();

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

})();
