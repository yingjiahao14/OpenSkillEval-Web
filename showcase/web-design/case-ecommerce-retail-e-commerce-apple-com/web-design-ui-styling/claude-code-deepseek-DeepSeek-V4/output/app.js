(function() {
'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

// --- Carousel ---
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(function(carousel) {
    var track = carousel.querySelector('.carousel-track');
    var prev = carousel.querySelector('.carousel-prev');
    var next = carousel.querySelector('.carousel-next');
    if (!track || !prev || !next) return;

    var cachedCard = track.querySelector('.carousel-card');

    function getScrollAmount() {
      var card = cachedCard || track.querySelector('.carousel-card');
      cachedCard = card;
      return card ? card.offsetWidth + 20 : 300;
    }

    function updateButtons() {
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;
    }

    var scrollTicking = false;
    track.addEventListener('scroll', function() {
      if (!scrollTicking) {
        requestAnimationFrame(function() {
          updateButtons();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });

    prev.addEventListener('click', function() {
      track.scrollBy({ left: -getScrollAmount(), behavior: scrollBehavior });
    });
    next.addEventListener('click', function() {
      track.scrollBy({ left: getScrollAmount(), behavior: scrollBehavior });
    });

    var resizeTicking = false;
    var onResize = function() {
      if (!resizeTicking) {
        requestAnimationFrame(function() {
          cachedCard = track.querySelector('.carousel-card');
          updateButtons();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    };
    window.addEventListener('resize', onResize, { passive: true });

    updateButtons();
  });
}

// --- Entertainment Tabs ---
function initTabs() {
  var tabContainer = document.querySelector('[data-tabs]');
  if (!tabContainer) return;

  var tabButtons = tabContainer.querySelectorAll('[data-tab]');
  var tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(function(btn) {
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');

    btn.addEventListener('click', function() {
      var tabId = btn.dataset.tab;

      tabButtons.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      tabPanels.forEach(function(p) {
        p.classList.remove('active');
        p.setAttribute('aria-hidden', 'true');
      });
      var target = document.getElementById('tab-' + tabId);
      if (target) {
        target.classList.add('active');
        target.setAttribute('aria-hidden', 'false');
      }
    });
  });

  tabPanels.forEach(function(panel, i) {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-hidden', panel.classList.contains('active') ? 'false' : 'true');
    if (tabButtons[i]) {
      panel.setAttribute('aria-labelledby', tabButtons[i].id || ('tab-btn-' + i));
      tabButtons[i].id = tabButtons[i].id || ('tab-btn-' + i);
      tabButtons[i].setAttribute('aria-controls', panel.id);
    }
  });
}

// --- Section Navigation (category pages) ---
function initSectionNav() {
  var navLinks = document.querySelectorAll('[data-scroll-to]');
  if (!navLinks.length) return;

  var activeLink = navLinks[0];
  var navHeight = document.querySelector('.nav').offsetHeight;
  var sectionNavHeight = document.querySelector('.section-nav').offsetHeight;
  var totalNavOffset = navHeight + sectionNavHeight;

  // Cache nav heights — only update on resize
  var resizeTicking = false;
  window.addEventListener('resize', function() {
    if (!resizeTicking) {
      requestAnimationFrame(function() {
        navHeight = document.querySelector('.nav').offsetHeight;
        sectionNavHeight = document.querySelector('.section-nav').offsetHeight;
        totalNavOffset = navHeight + sectionNavHeight;
        resizeTicking = false;
      });
      resizeTicking = true;
    }
  }, { passive: true });

  // Click handler
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      var target = document.getElementById(link.dataset.scrollTo);
      if (!target) return;

      if (activeLink) {
        activeLink.classList.remove('active');
      }
      link.classList.add('active');
      activeLink = link;

      var top = target.getBoundingClientRect().top + window.pageYOffset - totalNavOffset - 8;
      window.scrollTo({ top: top, behavior: scrollBehavior });
    });
  });

  // Use IntersectionObserver for scroll-spy
  var sections = Array.from(document.querySelectorAll('section[id]'));
  if (!sections.length) return;

  var sectionIds = sections.map(function(s) { return s.id; });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(link) {
          var match = link.dataset.scrollTo === entry.target.id;
          link.classList.toggle('active', match);
          if (match) activeLink = link;
        });
      }
    });
  }, { rootMargin: '-' + (totalNavOffset) + 'px 0px 0px 0px', threshold: 0 });

  sections.forEach(function(s) { observer.observe(s); });
}

// --- Footer Accordion ---
function initFooterAccordion() {
  document.querySelectorAll('.footer-col-toggle').forEach(function(toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    var ul = toggle.parentElement.querySelector('ul');
    if (ul) {
      toggle.setAttribute('aria-controls', ul.id || 'footer-list-' + Math.random().toString(36).slice(2, 8));
      ul.id = ul.id || toggle.getAttribute('aria-controls');
    }

    toggle.addEventListener('click', function() {
      var col = toggle.parentElement;
      var expanded = col.classList.toggle('open');
      toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
}

// --- Init ---
initCarousels();
initTabs();
initSectionNav();
initFooterAccordion();

})();
