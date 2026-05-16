/* ===== Orchard Shared JavaScript ===== */
(function() {
  'use strict';

  /* ----- Carousels ----- */
  function initCarousels() {
    document.querySelectorAll('.carousel-wrapper').forEach(function(wrapper) {
      var container = wrapper.querySelector('.carousel-container');
      var leftBtn = wrapper.querySelector('.carousel-arrow-left');
      var rightBtn = wrapper.querySelector('.carousel-arrow-right');
      if (!container) return;

      var scrollAmount = 300;

      function updateArrows() {
        if (!leftBtn || !rightBtn) return;
        leftBtn.disabled = container.scrollLeft <= 0;
        rightBtn.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth - 2;
      }

      if (leftBtn) {
        leftBtn.addEventListener('click', function() {
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }
      if (rightBtn) {
        rightBtn.addEventListener('click', function() {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }

      container.addEventListener('scroll', updateArrows);
      updateArrows();

      // Update on resize
      window.addEventListener('resize', function() {
        updateArrows();
      });
    });
  }

  /* ----- Entertainment Tabs ----- */
  function initTabs() {
    document.querySelectorAll('.ent-tabs').forEach(function(tabBar) {
      var tabs = tabBar.querySelectorAll('.ent-tab');
      var panels = document.querySelectorAll('.ent-panel');

      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          var target = this.getAttribute('data-tab');

          tabs.forEach(function(t) { t.classList.remove('active'); });
          this.classList.add('active');

          panels.forEach(function(p) {
            p.classList.remove('active');
            if (p.getAttribute('data-panel') === target) {
              p.classList.add('active');
            }
          });
        });
      });
    });
  }

  /* ----- Footer Accordion (Mobile) ----- */
  function initFooterAccordion() {
    if (window.innerWidth > 768) return;

    document.querySelectorAll('.footer-col').forEach(function(col) {
      var header = col.querySelector('.footer-col-header');
      var body = col.querySelector('.footer-col-body');
      if (!header || !body) return;

      // Remove any existing listeners by cloning
      var newHeader = header.cloneNode(true);
      header.parentNode.replaceChild(newHeader, header);

      newHeader.addEventListener('click', function() {
        var isOpen = col.classList.contains('open');
        // Close all
        document.querySelectorAll('.footer-col.open').forEach(function(c) {
          c.classList.remove('open');
        });
        // Toggle clicked
        if (!isOpen) {
          col.classList.add('open');
        }
      });
    });
  }

  /* ----- Sticky Section Navigation ----- */
  function initSectionNav() {
    var nav = document.querySelector('.section-nav');
    if (!nav) return;

    var navItems = nav.querySelectorAll('.section-nav-item');

    navItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          var target = document.querySelector(targetId);
          if (target) {
            var navHeight = 48; // header height
            var sectionNavHeight = nav.offsetHeight;
            var offset = navHeight + sectionNavHeight + 8;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        }
      });
    });

    // Highlight active section on scroll
    var sections = [];
    navItems.forEach(function(item) {
      var href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        var el = document.querySelector(href);
        if (el) sections.push({ id: href, el: el, nav: item });
      }
    });

    function updateActiveNav() {
      var scrollPos = window.scrollY + 150;
      var active = null;
      sections.forEach(function(s) {
        if (s.el.offsetTop <= scrollPos) {
          active = s;
        }
      });
      navItems.forEach(function(item) { item.classList.remove('active'); });
      if (active) active.nav.classList.add('active');
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
  }

  /* ----- Header Active Link ----- */
  function setActiveNavLink() {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    document.querySelectorAll('.header-nav a').forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === page) {
        link.classList.add('active');
      }
    });
  }

  /* ----- Init All ----- */
  function init() {
    initCarousels();
    initTabs();
    initFooterAccordion();
    initSectionNav();
    setActiveNavLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init footer accordion on resize
  var resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      initFooterAccordion();
    }, 250);
  });

})();
