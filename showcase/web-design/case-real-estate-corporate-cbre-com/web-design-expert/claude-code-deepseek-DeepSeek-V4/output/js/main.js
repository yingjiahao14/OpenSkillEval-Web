/* ============================================================
   GlobalStone — Shared Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     Header scroll effect
     ========================================================== */
  function initHeaderScroll() {
    var header = document.querySelector('.header');
    if (!header) return;

    var scrollHandler = function () {
      if (window.scrollY > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler();
  }

  /* ==========================================================
     Mega Menu
     ========================================================== */
  function initMegaMenu() {
    var trigger = document.querySelector('.nav__link.has-dropdown');
    var menu = document.querySelector('.mega-menu');
    if (!trigger || !menu) return;

    var isOpen = false;
    var closeTimeout = null;
    var openTimeout = null;

    function openMenu() {
      clearTimeout(closeTimeout);
      clearTimeout(openTimeout);
      isOpen = true;
      trigger.classList.add('open');
      menu.classList.add('mega-menu--visible');
    }

    function closeMenu() {
      clearTimeout(closeTimeout);
      closeTimeout = setTimeout(function () {
        isOpen = false;
        trigger.classList.remove('open');
        menu.classList.remove('mega-menu--visible');
      }, 100);
    }

    function openMenuDelayed() {
      clearTimeout(openTimeout);
      openTimeout = setTimeout(openMenu, 150);
    }

    trigger.addEventListener('mouseenter', openMenuDelayed);
    trigger.addEventListener('mouseleave', closeMenu);
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (isOpen) {
        clearTimeout(closeTimeout);
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.addEventListener('mouseenter', function () {
      clearTimeout(closeTimeout);
    });
    menu.addEventListener('mouseleave', closeMenu);

    document.addEventListener('click', function (e) {
      if (isOpen && !trigger.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        trigger.focus();
      }
    });
  }

  /* ==========================================================
     Mobile Navigation
     ========================================================== */
  function initMobileNav() {
    var toggle = document.querySelector('.mobile-toggle');
    var nav = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('mobile-nav--open');
      if (isOpen) {
        nav.classList.remove('mobile-nav--open');
        toggle.classList.remove('mobile-toggle--active');
        document.body.style.overflow = '';
      } else {
        nav.classList.add('mobile-nav--open');
        toggle.classList.add('mobile-toggle--active');
        document.body.style.overflow = 'hidden';
      }
    });

    var accordions = nav.querySelectorAll('.mobile-nav__accordion-toggle');
    accordions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains('mobile-nav__submenu')) {
          var isOpen = submenu.classList.contains('mobile-nav__submenu--open');
          submenu.classList.toggle('mobile-nav__submenu--open', !isOpen);
          this.classList.toggle('mobile-nav__accordion-toggle--open', !isOpen);
        }
      });
    });
  }

  /* ==========================================================
     What We Do — Vertical Tabs
     ========================================================== */
  function initTabs() {
    var tabs = document.querySelectorAll('.tab-btn');
    var panels = document.querySelectorAll('.tab-panel');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = this.getAttribute('data-tab');

        tabs.forEach(function (t) { t.classList.remove('tab-btn--active'); });
        panels.forEach(function (p) { p.classList.remove('tab-panel--active'); });

        this.classList.add('tab-btn--active');
        var panel = document.getElementById('tab-' + target);
        if (panel) {
          panel.classList.add('tab-panel--active');
        }
      });
    });
  }

  /* ==========================================================
     Partners Carousel
     ========================================================== */
  function initCarousel() {
    var carousel = document.querySelector('.carousel');
    if (!carousel) return;

    var track = carousel.querySelector('.carousel__track');
    var slides = carousel.querySelectorAll('.carousel__slide');
    var dots = carousel.querySelectorAll('.carousel__dot');
    var prevBtn = carousel.querySelector('.carousel__btn--prev');
    var nextBtn = carousel.querySelector('.carousel__btn--next');
    if (!track || !slides.length) return;

    var current = 0;
    var total = slides.length;

    function goTo(index) {
      current = ((index % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      if (dots.length) {
        dots.forEach(function (d, i) {
          d.classList.toggle('carousel__dot--active', i === current);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(this.getAttribute('data-index'), 10));
      });
    });

    goTo(0);
  }

  /* ==========================================================
     Newsletter Form
     ========================================================== */
  function initNewsletter() {
    var form = document.querySelector('.newsletter__form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('.newsletter__input');
      var btn = form.querySelector('button');
      if (input && btn) {
        btn.textContent = 'Subscribed';
        btn.disabled = true;
        input.value = '';
        setTimeout(function () {
          btn.textContent = 'Subscribe';
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  /* ==========================================================
     Scroll-triggered animations
     ========================================================== */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================================
     Initialize all
     ========================================================== */
  function init() {
    initHeaderScroll();
    initMegaMenu();
    initMobileNav();
    initTabs();
    initCarousel();
    initNewsletter();
    initScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
