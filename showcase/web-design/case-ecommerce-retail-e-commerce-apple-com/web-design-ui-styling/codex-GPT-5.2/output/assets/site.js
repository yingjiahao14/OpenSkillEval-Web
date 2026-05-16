(function () {
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getScrollAmount(track) {
    var first = track.querySelector('.card');
    if (!first) return Math.round(track.clientWidth * 0.85);
    var style = window.getComputedStyle(track);
    var gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  }

  function wireCarousel(root) {
    var track = root.querySelector('[data-carousel-track]');
    if (!track) return;

    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');

    function scrollByDir(dir) {
      var amount = getScrollAmount(track);
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }

    if (prev) {
      prev.addEventListener('click', function () {
        scrollByDir(-1);
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        scrollByDir(1);
      });
    }

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByDir(1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByDir(-1);
      }
    });

    function updateButtons() {
      var max = track.scrollWidth - track.clientWidth;
      var left = clamp(track.scrollLeft, 0, max);
      if (prev) prev.disabled = left <= 2;
      if (next) next.disabled = left >= max - 2;
    }

    track.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateButtons);
    });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  }

  function wireTabs(root) {
    var tabs = root.querySelectorAll('[data-tab]');
    var panels = root.querySelectorAll('[data-tab-panel]');
    if (!tabs.length || !panels.length) return;

    function activate(id) {
      tabs.forEach(function (t) {
        var selected = t.getAttribute('data-tab') === id;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(function (p) {
        var show = p.getAttribute('data-tab-panel') === id;
        p.style.display = show ? 'block' : 'none';
      });
    }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        activate(t.getAttribute('data-tab'));
      });
      t.addEventListener('keydown', function (e) {
        var idx = Array.prototype.indexOf.call(tabs, t);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          tabs[(idx + 1) % tabs.length].click();
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          tabs[(idx - 1 + tabs.length) % tabs.length].click();
        }
      });
    });

    activate(tabs[0].getAttribute('data-tab'));
  }

  function wireFooterAccordion() {
    var sections = document.querySelectorAll('[data-footer-section]');
    if (!sections.length) return;
    sections.forEach(function (section) {
      var btn = section.querySelector('[data-footer-toggle]');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var expanded = section.getAttribute('aria-expanded') === 'true';
        section.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-carousel]').forEach(wireCarousel);
    document.querySelectorAll('[data-tabs]').forEach(wireTabs);
    wireFooterAccordion();
  });
})();

