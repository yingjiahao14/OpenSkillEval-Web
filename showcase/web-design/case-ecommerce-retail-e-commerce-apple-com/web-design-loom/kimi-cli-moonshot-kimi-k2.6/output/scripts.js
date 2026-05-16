/* ============================================
   Orchard — Premium Tech E-Commerce Store
   Global Scripts
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     Carousel System
     ------------------------------------------ */
  function initCarousels() {
    const wrappers = document.querySelectorAll('.carousel-wrapper');

    wrappers.forEach(function (wrapper) {
      const track = wrapper.querySelector('.carousel-track-container');
      const prevBtn = wrapper.querySelector('.carousel-arrow.prev');
      const nextBtn = wrapper.querySelector('.carousel-arrow.next');
      if (!track || !prevBtn || !nextBtn) return;

      const scrollAmount = 340;

      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      // Show/hide arrows based on scroll position
      function updateArrows() {
        const maxScroll = track.scrollWidth - track.clientWidth;
        prevBtn.style.opacity = track.scrollLeft > 5 ? '1' : '0';
        prevBtn.style.pointerEvents = track.scrollLeft > 5 ? 'auto' : 'none';
        nextBtn.style.opacity = track.scrollLeft < maxScroll - 5 ? '1' : '0';
        nextBtn.style.pointerEvents = track.scrollLeft < maxScroll - 5 ? 'auto' : 'none';
      }

      track.addEventListener('scroll', updateArrows);
      // Initial check after layout
      setTimeout(updateArrows, 100);
      window.addEventListener('resize', updateArrows);
    });
  }

  /* ------------------------------------------
     Entertainment Tabs
     ------------------------------------------ */
  function initEntertainmentTabs() {
    const tabContainer = document.querySelector('.entertainment-tabs');
    if (!tabContainer) return;

    const tabs = tabContainer.querySelectorAll('.entertainment-tab');
    const panels = document.querySelectorAll('.entertainment-panel');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.dataset.tab;

        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        panels.forEach(function (p) {
          if (p.dataset.panel === target) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    });
  }

  /* ------------------------------------------
     Footer Accordion (Mobile)
     ------------------------------------------ */
  function initFooterAccordion() {
    const toggles = document.querySelectorAll('.footer-column-toggle');
    if (!toggles.length) return;

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        const column = toggle.closest('.footer-column');
        const isOpen = column.classList.contains('open');

        // Close all others (optional accordion behavior)
        document.querySelectorAll('.footer-column').forEach(function (c) {
          c.classList.remove('open');
        });

        if (!isOpen) {
          column.classList.add('open');
        }
      });
    });
  }

  /* ------------------------------------------
     Smooth Scroll for Section Nav
     ------------------------------------------ */
  function initSectionNav() {
    const navLinks = document.querySelectorAll('.section-nav a[href^="#"]');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 96; // header + section nav
          const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ------------------------------------------
     Initialize on DOM Ready
     ------------------------------------------ */
  function init() {
    initCarousels();
    initEntertainmentTabs();
    initFooterAccordion();
    initSectionNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
