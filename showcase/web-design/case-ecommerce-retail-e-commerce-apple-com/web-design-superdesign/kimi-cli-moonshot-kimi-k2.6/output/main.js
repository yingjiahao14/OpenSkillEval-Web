/**
 * Orchard — Main JavaScript
 * Handles carousels, tabs, mobile footer accordion, section nav
 */

(function () {
  'use strict';

  /* ============================================
     Carousel Logic
     ============================================ */
  function initCarousels() {
    document.querySelectorAll('.carousel-wrap').forEach(function (wrap) {
      var carousel = wrap.querySelector('.carousel');
      var prevBtn = wrap.querySelector('.carousel-arrow.prev');
      var nextBtn = wrap.querySelector('.carousel-arrow.next');
      if (!carousel) return;

      var scrollAmount = 340; // default card width + gap
      var firstCard = carousel.querySelector('.carousel-card, .info-card');
      if (firstCard) {
        scrollAmount = firstCard.offsetWidth + 16;
      }

      function updateArrows() {
        if (prevBtn) {
          prevBtn.classList.toggle('hidden', carousel.scrollLeft <= 1);
        }
        if (nextBtn) {
          var maxScroll = carousel.scrollWidth - carousel.clientWidth;
          nextBtn.classList.toggle('hidden', carousel.scrollLeft >= maxScroll - 1);
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }

      carousel.addEventListener('scroll', updateArrows, { passive: true });
      // Initial state
      window.addEventListener('load', updateArrows);
      updateArrows();
    });
  }

  /* ============================================
     Entertainment Tabs
     ============================================ */
  function initTabs() {
    document.querySelectorAll('.tab-bar').forEach(function (bar) {
      var buttons = bar.querySelectorAll('.tab-btn');
      var panels = bar.parentElement.querySelectorAll('.tab-panel');

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.dataset.tab;

          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');

          panels.forEach(function (p) {
            p.classList.toggle('active', p.dataset.panel === target);
          });
        });
      });
    });
  }

  /* ============================================
     Mobile Footer Accordion
     ============================================ */
  function initFooterAccordion() {
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    document.querySelectorAll('.footer-col').forEach(function (col) {
      var toggle = col.querySelector('.accordion-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', function () {
        col.classList.toggle('open');
      });
    });
  }

  /* ============================================
     Section Nav Active State (scroll spy)
     ============================================ */
  function initScrollSpy() {
    var nav = document.querySelector('.section-nav');
    if (!nav) return;

    var links = nav.querySelectorAll('a[href^="#"]');
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) sections.push({ link: link, section: section });
    });

    function onScroll() {
      var scrollPos = window.scrollY + 120;
      sections.forEach(function (item) {
        var top = item.section.offsetTop;
        var bottom = top + item.section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          sections.forEach(function (s) { s.link.classList.remove('active'); });
          item.link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================
     Mobile Menu Toggle
     ============================================ */
  function initMobileMenu() {
    var btn = document.querySelector('.mobile-menu-btn');
    var menu = document.querySelector('.nav-links');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle('mobile-open');
    });
  }

  /* ============================================
     Initialize everything on DOM ready
     ============================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCarousels();
      initTabs();
      initFooterAccordion();
      initScrollSpy();
      initMobileMenu();
      if (window.lucide) lucide.createIcons();
    });
  } else {
    initCarousels();
    initTabs();
    initFooterAccordion();
    initScrollSpy();
    initMobileMenu();
    if (window.lucide) lucide.createIcons();
  }
})();
