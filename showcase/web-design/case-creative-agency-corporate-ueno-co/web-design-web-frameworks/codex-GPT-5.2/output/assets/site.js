(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function setHeaderScrollState() {
    var header = qs('[data-site-header]');
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 6);
  }

  function initMobileMenu() {
    var toggle = qs('[data-menu-toggle]');
    var overlay = qs('[data-menu-overlay]');
    if (!toggle || !overlay) return;

    var iconOpen = toggle.getAttribute('data-icon-open') || '☰';
    var iconClose = toggle.getAttribute('data-icon-close') || '✕';

    function setOpen(open) {
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.innerHTML = open
        ? '<span class="nav-icon" aria-hidden="true">' + iconClose + '</span>'
        : '<span class="nav-icon" aria-hidden="true">' + iconOpen + '</span>';
      document.documentElement.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      var isOpen = overlay.getAttribute('aria-hidden') === 'false';
      setOpen(!isOpen);
    });

    overlay.addEventListener('click', function (e) {
      if (e.target && e.target.matches('[data-menu-overlay]')) setOpen(false);
    });

    qsa('[data-menu-link]', overlay).forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    setOpen(false);
  }

  function initMarquee() {
    var root = qs('[data-client-marquee]');
    if (!root) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var rows = qsa('[data-marquee-row]', root);
    if (!rows.length) return;

    rows.forEach(function (row) {
      var track = qs('[data-marquee-track]', row);
      if (!track) return;

      // Duplicate once; we will translate half the width.
      if (!track.dataset.duped) {
        track.innerHTML = track.innerHTML + track.innerHTML;
        track.dataset.duped = 'true';
      }
    });

    var state = {
      last: performance.now(),
      offsets: rows.map(function () {
        return 0;
      }),
    };

    function step(now) {
      var dt = Math.min(32, now - state.last);
      state.last = now;

      rows.forEach(function (row, idx) {
        var track = qs('[data-marquee-track]', row);
        if (!track) return;

        var speed = parseFloat(row.getAttribute('data-speed') || '34'); // px/s
        var dir = row.getAttribute('data-direction') === 'right' ? 1 : -1;
        state.offsets[idx] += (dir * speed * dt) / 1000;

        var half = track.scrollWidth / 2;
        if (!half || !isFinite(half)) return;

        // Wrap without jumps.
        if (state.offsets[idx] <= -half) state.offsets[idx] += half;
        if (state.offsets[idx] >= 0) state.offsets[idx] -= half;

        row.style.transform = 'translate3d(' + state.offsets[idx].toFixed(2) + 'px, 0, 0)';
      });

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setHeaderScrollState();
    window.addEventListener('scroll', setHeaderScrollState, { passive: true });
    initMobileMenu();
    initMarquee();
  });
})();

