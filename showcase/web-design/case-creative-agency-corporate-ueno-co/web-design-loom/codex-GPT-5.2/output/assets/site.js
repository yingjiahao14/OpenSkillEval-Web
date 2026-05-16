(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function setAriaExpanded(el, expanded) {
    el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function setAriaHidden(el, hidden) {
    el.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  }

  function setupMobileMenu() {
    var btn = qs('[data-menu-button]');
    var overlay = qs('[data-menu-overlay]');
    if (!btn || !overlay) return;

    var isOpen = false;
    var lastFocused = null;

    function closeMenu() {
      if (!isOpen) return;
      isOpen = false;
      setAriaExpanded(btn, false);
      setAriaHidden(overlay, true);
      document.body.style.overflow = '';
      btn.classList.remove('is-open');
      if (lastFocused) lastFocused.focus();
    }

    function openMenu() {
      if (isOpen) return;
      isOpen = true;
      lastFocused = document.activeElement;
      setAriaExpanded(btn, true);
      setAriaHidden(overlay, false);
      document.body.style.overflow = 'hidden';
      btn.classList.add('is-open');
      var firstLink = qs('a', overlay);
      if (firstLink) firstLink.focus();
    }

    function toggleMenu() {
      if (isOpen) closeMenu();
      else openMenu();
    }

    btn.addEventListener('click', function () {
      toggleMenu();
    });

    overlay.addEventListener('click', function (e) {
      if (e.target && e.target.matches('[data-overlay-dismiss]')) {
        closeMenu();
      }
    });

    // Basic focus trap to keep keyboard users inside the dialog.
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key !== 'Tab') return;

      var focusables = qsa('a, button', overlay).filter(function (el) {
        return !el.hasAttribute('disabled');
      });
      if (!focusables.length) return;

      var first = focusables[0];
      var last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    qsa('a', overlay).forEach(function (a) {
      a.addEventListener('click', function () {
        closeMenu();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
      }
    });
  }

  function setupHamburgerIcon() {
    var btn = qs('[data-menu-button]');
    if (!btn) return;
    var bars = qsa('.menu-icon span', btn);
    if (bars.length !== 3) return;

    function sync() {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      if (!expanded) {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
        return;
      }
      bars[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    }

    var obs = new MutationObserver(sync);
    obs.observe(btn, { attributes: true, attributeFilter: ['aria-expanded'] });
    sync();
  }

  function setupMarquee() {
    var rows = qsa('[data-marquee-row]');
    if (!rows.length) return;

    rows.forEach(function (row) {
      var track = qs('[data-marquee-track]', row);
      if (!track) return;

      // Duplicate content for seamless loop. Keep minimal DOM to reduce jank.
      // We need 2x content so keyframes can translate -50%.
      if (track.getAttribute('data-duplicated') === 'true') return;
      var html = track.innerHTML;
      track.innerHTML = html + html;
      track.setAttribute('data-duplicated', 'true');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
    setupHamburgerIcon();
    setupMarquee();
  });
})();
