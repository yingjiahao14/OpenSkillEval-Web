(function () {
  function qs(root, selector) {
    return root.querySelector(selector);
  }

  function qsa(root, selector) {
    return Array.from(root.querySelectorAll(selector));
  }

  function setCurrentNav() {
    var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    qsa(document, '[data-nav-link]').forEach(function (a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      if (href === path) a.setAttribute('aria-current', 'page');
    });
  }

  function initTabs() {
    qsa(document, '[data-tabs]').forEach(function (tabsRoot) {
      var tablist = qs(tabsRoot, '[role="tablist"]');
      if (!tablist) return;
      var tabs = qsa(tablist, '[role="tab"]');
      var panels = qsa(tabsRoot, '[role="tabpanel"]');

      function activateTab(tab) {
        tabs.forEach(function (t) {
          var selected = t === tab;
          t.setAttribute('aria-selected', selected ? 'true' : 'false');
          t.tabIndex = selected ? 0 : -1;
        });
        var id = tab.getAttribute('aria-controls');
        panels.forEach(function (p) {
          var show = p.id === id;
          p.hidden = !show;
        });
      }

      tabs.forEach(function (tab, idx) {
        tab.addEventListener('click', function () {
          activateTab(tab);
        });
        tab.addEventListener('keydown', function (e) {
          var key = e.key;
          if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Home' && key !== 'End') return;
          e.preventDefault();
          var nextIdx = idx;
          if (key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
          if (key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
          if (key === 'Home') nextIdx = 0;
          if (key === 'End') nextIdx = tabs.length - 1;
          tabs[nextIdx].focus();
          activateTab(tabs[nextIdx]);
        });
      });

      var selected = tabs.find(function (t) {
        return t.getAttribute('aria-selected') === 'true';
      });
      activateTab(selected || tabs[0]);
    });
  }

  function initAccordions() {
    qsa(document, '[data-accordion]').forEach(function (root) {
      var items = qsa(root, '[data-accordion-item]');

      function setOpen(item, open) {
        item.dataset.open = open ? 'true' : 'false';
        var btn = qs(item, '[data-accordion-trigger]');
        var panel = qs(item, '[data-accordion-panel]');
        if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (panel) panel.hidden = !open;
      }

      items.forEach(function (item) {
        var btn = qs(item, '[data-accordion-trigger]');
        var panel = qs(item, '[data-accordion-panel]');
        if (!btn || !panel) return;
        var startOpen = item.dataset.open === 'true';
        btn.setAttribute('aria-expanded', startOpen ? 'true' : 'false');
        panel.hidden = !startOpen;

        btn.addEventListener('click', function () {
          var isOpen = item.dataset.open === 'true';
          var single = root.dataset.single === 'true';
          if (single) items.forEach(function (it) {
            if (it !== item) setOpen(it, false);
          });
          setOpen(item, !isOpen);
        });
      });
    });
  }

  function initCarousels() {
    qsa(document, '[data-carousel]').forEach(function (root) {
      var track = qs(root, '[data-carousel-track]');
      var slides = qsa(root, '[data-carousel-slide]');
      var prev = qs(root, '[data-carousel-prev]');
      var next = qs(root, '[data-carousel-next]');
      var dots = qsa(root, '[data-carousel-dot]');
      var live = qs(root, '[data-carousel-live]');

      if (!track || slides.length === 0) return;

      var index = 0;

      function render() {
        track.style.transform = 'translateX(' + (-index * 100) + '%)';
        dots.forEach(function (d, i) {
          d.setAttribute('aria-selected', i === index ? 'true' : 'false');
        });
        if (live) live.textContent = 'Showing testimonial ' + (index + 1) + ' of ' + slides.length;
      }

      function goTo(i) {
        index = (i + slides.length) % slides.length;
        render();
      }

      if (prev) prev.addEventListener('click', function () { goTo(index - 1); });
      if (next) next.addEventListener('click', function () { goTo(index + 1); });
      dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); }); });

      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
      });

      render();
    });
  }

  function initRevealOnScroll() {
    var els = qsa(document, '.reveal');
    if (els.length === 0) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initMobileNav() {
    var btn = document.querySelector('[data-mobile-toggle]');
    var panel = document.querySelector('[data-mobile-panel]');
    if (!btn || !panel) return;

    function setOpen(open) {
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    setOpen(false);
    btn.addEventListener('click', function () {
      setOpen(panel.hidden);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function boot() {
    setCurrentNav();
    initTabs();
    initAccordions();
    initCarousels();
    initRevealOnScroll();
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

