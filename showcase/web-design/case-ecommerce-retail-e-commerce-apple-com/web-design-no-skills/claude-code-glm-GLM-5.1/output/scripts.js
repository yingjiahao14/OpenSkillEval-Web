(function() {
  'use strict';

  // ===== Carousel =====
  function initCarousels() {
    var arrows = document.querySelectorAll('.carousel-arrow');
    arrows.forEach(function(arrow) {
      arrow.addEventListener('click', function() {
        var target = this.getAttribute('data-target');
        var dir = parseInt(this.getAttribute('data-dir'));
        var track = document.querySelector('[data-carousel="' + target + '"]');
        if (!track) return;

        var wrapper = track.parentElement;
        var wrapperWidth = wrapper.clientWidth;
        var cards = track.querySelectorAll('.carousel-card');
        if (cards.length === 0) return;

        var cardStyle = window.getComputedStyle(cards[0]);
        var cardWidth = cards[0].offsetWidth + parseInt(cardStyle.marginRight || 0);
        var gap = parseInt(window.getComputedStyle(track).gap) || 12;
        var scrollAmount = cardWidth + gap;

        var currentTransform = getTranslateX(track);
        var trackWidth = track.scrollWidth;
        var maxTranslate = Math.max(0, trackWidth - wrapperWidth);

        var newTranslate = currentTransform + (-dir * scrollAmount);
        newTranslate = Math.max(-maxTranslate, Math.min(0, newTranslate));

        track.style.transform = 'translateX(' + newTranslate + 'px)';
      });
    });
  }

  function getTranslateX(el) {
    var style = window.getComputedStyle(el);
    var matrix = style.transform;
    if (matrix === 'none' || !matrix) return 0;
    var values = matrix.match(/matrix.*\((.+)\)/);
    if (values && values[1]) {
      var parts = values[1].split(',');
      return parseFloat(parts[4]) || 0;
    }
    return 0;
  }

  // ===== Entertainment Tabs =====
  function initTabs() {
    var tabs = document.querySelectorAll('.ent-tab');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var tabName = this.getAttribute('data-tab');
        // Deactivate all tabs
        tabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        // Switch content
        var contents = document.querySelectorAll('.ent-content');
        contents.forEach(function(c) { c.classList.remove('active'); });
        var active = document.querySelector('[data-content="' + tabName + '"]');
        if (active) active.classList.add('active');
      });
    });
  }

  // ===== Footer Accordion =====
  function initAccordion() {
    var toggles = document.querySelectorAll('.accordion-toggle');
    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        var col = this.parentElement;
        col.classList.toggle('open');
      });
    });
  }

  // ===== Category Sticky Nav - Smooth Scroll & Active State =====
  function initStickyNav() {
    var navWrapper = document.querySelector('[data-sticky-nav]');
    if (!navWrapper) return;

    var navLinks = navWrapper.querySelectorAll('.category-nav a');

    // Smooth scroll on click
    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href').substring(1);
        var target = document.getElementById(targetId);
        if (target) {
          var navHeight = navWrapper.offsetHeight + 48; // top nav + category nav
          var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
        // Update active
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        this.classList.add('active');
      });
    });

    // Update active state on scroll
    var sections = [];
    navLinks.forEach(function(link) {
      var targetId = link.getAttribute('href').substring(1);
      var section = document.getElementById(targetId);
      if (section) sections.push({ el: section, link: link });
    });

    function onScroll() {
      var navHeight = navWrapper.offsetHeight + 48;
      var scrollPos = window.pageYOffset + navHeight + 100;
      sections.forEach(function(s) {
        var top = s.el.offsetTop;
        var bottom = top + s.el.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach(function(l) { l.classList.remove('active'); });
          s.link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ===== Initialize =====
  document.addEventListener('DOMContentLoaded', function() {
    initCarousels();
    initTabs();
    initAccordion();
    initStickyNav();
  });

})();
