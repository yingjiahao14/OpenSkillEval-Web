/* ============================================================
   GlobalStone — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- Scroll: header shadow ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---- Mobile nav: hamburger ---- */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ---- Mobile nav: accordion items ---- */
  document.querySelectorAll('.mobile-nav-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.mobile-nav-item');
      var wasOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.mobile-nav-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---- Desktop mega menu: click toggle ---- */
  document.querySelectorAll('.nav-item.has-mega-menu').forEach(function (item) {
    var link = item.querySelector('.nav-link');
    if (!link) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var wasOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.nav-item.has-mega-menu.open').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* Close mega menus on outside click */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item.has-mega-menu')) {
      document.querySelectorAll('.nav-item.has-mega-menu.open').forEach(function (el) {
        el.classList.remove('open');
      });
    }
  });

  /* ---- What We Do tabs ---- */
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.dataset.tab;
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.querySelector('.tab-panel[data-tab="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  /* ---- Partners Carousel ---- */
  var track = document.querySelector('.carousel-track');
  if (track) {
    var slides = track.querySelectorAll('.carousel-slide');
    var totalSlides = slides.length;
    var visibleCount = window.innerWidth >= 900 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    var current = 0;
    var maxIndex = Math.max(0, totalSlides - visibleCount);

    function updateCarousel() {
      var slideWidth = slides[0].offsetWidth + 24; // gap: 24px
      track.style.transform = 'translateX(-' + (current * slideWidth) + 'px)';
    }

    var prevBtn = document.querySelector('.carousel-btn.prev');
    var nextBtn = document.querySelector('.carousel-btn.next');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        current = current <= 0 ? maxIndex : current - 1;
        updateCarousel();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        current = current >= maxIndex ? 0 : current + 1;
        updateCarousel();
      });
    }

    window.addEventListener('resize', function () {
      visibleCount = window.innerWidth >= 900 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      maxIndex = Math.max(0, totalSlides - visibleCount);
      current = Math.min(current, maxIndex);
      updateCarousel();
    });
  }

  /* ---- Newsletter form ---- */
  var newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector('.newsletter-input');
      var btn = newsletterForm.querySelector('.newsletter-btn');
      if (input && btn && input.value.trim()) {
        btn.textContent = 'Subscribed!';
        btn.style.background = '#4ade80';
        input.value = '';
        setTimeout(function () {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
        }, 3000);
      }
    });
  }
})();
