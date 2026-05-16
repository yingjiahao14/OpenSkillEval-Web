/* === Carousel === */
function initCarousels() {
  var resizeTicking = false;

  document.querySelectorAll('.carousel-container').forEach(function(container) {
    var trackWrapper = container.querySelector('.carousel-track-wrapper');
    var track = trackWrapper ? trackWrapper.querySelector('.carousel-track') : null;
    if (!trackWrapper || !track) return;

    var leftBtn = container.querySelector('.carousel-arrow-left');
    var rightBtn = container.querySelector('.carousel-arrow-right');
    var scrollAmount = 320;
    var scrollTicking = false;

    function updateArrows() {
      if (!leftBtn || !rightBtn) return;
      leftBtn.disabled = trackWrapper.scrollLeft <= 4;
      rightBtn.disabled = trackWrapper.scrollLeft + trackWrapper.clientWidth >= trackWrapper.scrollWidth - 4;
    }

    if (leftBtn) {
      leftBtn.addEventListener('click', function() {
        trackWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
    if (rightBtn) {
      rightBtn.addEventListener('click', function() {
        trackWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    trackWrapper.addEventListener('scroll', function() {
      if (!scrollTicking) {
        requestAnimationFrame(function() {
          updateArrows();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });

    updateArrows();
  });

  window.addEventListener('resize', function() {
    if (!resizeTicking) {
      requestAnimationFrame(function() {
        document.querySelectorAll('.carousel-container').forEach(function(c) {
          var tw = c.querySelector('.carousel-track-wrapper');
          var lb = c.querySelector('.carousel-arrow-left');
          var rb = c.querySelector('.carousel-arrow-right');
          if (!tw || !lb || !rb) return;
          lb.disabled = tw.scrollLeft <= 4;
          rb.disabled = tw.scrollLeft + tw.clientWidth >= tw.scrollWidth - 4;
        });
        resizeTicking = false;
      });
      resizeTicking = true;
    }
  });
}

/* === Entertainment Tabs === */
function initTabs() {
  document.querySelectorAll('.entertainment-tabs').forEach(function(tabBar) {
    tabBar.setAttribute('role', 'tablist');

    var btns = tabBar.querySelectorAll('.tab-btn');
    var panels = document.querySelectorAll('.tab-panel');

    btns.forEach(function(btn) {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');

      btn.addEventListener('click', function() {
        var target = this.getAttribute('data-tab');

        btns.forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        panels.forEach(function(p) {
          var isTarget = p.getAttribute('data-tab') === target;
          p.classList.toggle('active', isTarget);
          p.setAttribute('aria-hidden', isTarget ? 'false' : 'true');
        });
      });
    });

    panels.forEach(function(p) {
      p.setAttribute('role', 'tabpanel');
      var panelTab = p.getAttribute('data-tab');
      if (panelTab) p.setAttribute('aria-labelledby', panelTab + '-tab');
    });
  });
}

/* === Footer Accordion (Mobile) === */
function initFooterAccordion() {
  document.querySelectorAll('.footer-col-toggle').forEach(function(toggle, index) {
    var col = toggle.closest('.footer-col');
    var ul = col ? col.querySelector('ul') : null;
    var toggleId = 'footer-toggle-' + index;
    var ulId = 'footer-section-' + index;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', ulId);
    toggle.id = toggleId;
    if (ul) {
      ul.setAttribute('role', 'region');
      ul.setAttribute('aria-labelledby', toggleId);
      ul.id = ulId;
    }

    toggle.addEventListener('click', function() {
      var isOpen = col.classList.contains('open');
      col.classList.toggle('open');
      this.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });
}

/* === Sticky Section Nav Active State (Category Pages) === */
function initSectionNav() {
  var nav = document.querySelector('.section-nav');
  if (!nav) return;

  var links = nav.querySelectorAll('.section-nav-link');
  var sections = [];

  links.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      var target = document.querySelector(href);
      if (target) sections.push({ link: link, target: target, id: href.substring(1) });
    }
  });

  var ticking = false;

  function updateActive() {
    var scrollY = window.scrollY + 120;
    var current = sections[0];

    sections.forEach(function(s) {
      if (s.target.offsetTop <= scrollY) current = s;
    });

    links.forEach(function(l) { l.classList.remove('active'); });
    if (current) current.link.classList.add('active');
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateActive);
      ticking = true;
    }
  }, { passive: true });

  updateActive();
}

/* === Mobile Menu === */
function initMobileMenu() {
  var hamburger = document.querySelector('.hamburger');
  if (!hamburger) return;

  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Menu');

  hamburger.addEventListener('click', function() {
    var navLinks = document.querySelector('.nav-links');
    var isOpen = navLinks.classList.toggle('mobile-open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

/* === Init All === */
document.addEventListener('DOMContentLoaded', function() {
  initCarousels();
  initTabs();
  initFooterAccordion();
  initSectionNav();
  initMobileMenu();
});
