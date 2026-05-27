/* Orchard — Shared JavaScript */
(function () {
  'use strict';

  // ─── Carousel ───
  function initCarousels() {
    document.querySelectorAll('.carousel-wrapper').forEach(function (wrapper) {
      var track = wrapper.querySelector('.carousel-track');
      var leftBtn = wrapper.querySelector('.carousel-arrow.left');
      var rightBtn = wrapper.querySelector('.carousel-arrow.right');
      if (!track) return;

      var scrollAmount = 300;

      function updateArrows() {
        if (leftBtn) leftBtn.disabled = track.scrollLeft <= 5;
        if (rightBtn) rightBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
      }

      if (leftBtn) {
        leftBtn.addEventListener('click', function () {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }
      if (rightBtn) {
        rightBtn.addEventListener('click', function () {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }

      track.addEventListener('scroll', updateArrows);
      updateArrows();
    });
  }

  // ─── Entertainment Tabs ───
  function initTabs() {
    document.querySelectorAll('.ent-tabs').forEach(function (tabBar) {
      var tabs = tabBar.querySelectorAll('.ent-tab');
      var section = tabBar.closest('.entertainment-section');
      if (!section) return;
      var contents = section.querySelectorAll('.ent-content');

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = tab.getAttribute('data-tab');
          tabs.forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          contents.forEach(function (c) {
            c.classList.toggle('active', c.getAttribute('data-tab') === target);
          });
        });
      });
    });
  }

  // ─── Mobile Nav ───
  function initMobileNav() {
    var hamburger = document.querySelector('.nav-hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      hamburger.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.textContent = '☰';
      });
    });
  }

  // ─── Footer Accordion (mobile) ───
  function initFooterAccordion() {
    var isMobile = function () { return window.innerWidth <= 768; };

    document.querySelectorAll('.footer-col h5').forEach(function (heading) {
      heading.addEventListener('click', function () {
        if (!isMobile()) return;
        var col = heading.closest('.footer-col');
        col.classList.toggle('expanded');
      });
    });
  }

  // ─── Sticky Section Nav ───
  function initSectionNav() {
    var nav = document.querySelector('.section-nav');
    if (!nav) return;
    var links = nav.querySelectorAll('a');
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        var el = document.querySelector(id);
        if (el) sections.push({ el: el, link: link });
      }
    });

    function updateActive() {
      var scrollTop = window.scrollY + 120;
      var active = sections[0];
      sections.forEach(function (s) {
        if (s.el.offsetTop <= scrollTop) active = s;
      });
      links.forEach(function (l) { l.classList.remove('active'); });
      if (active) active.link.classList.add('active');
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  // ─── Init All ───
  document.addEventListener('DOMContentLoaded', function () {
    initCarousels();
    initTabs();
    initMobileNav();
    initFooterAccordion();
    initSectionNav();
  });
})();
