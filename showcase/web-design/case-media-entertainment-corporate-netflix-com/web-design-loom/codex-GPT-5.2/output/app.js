(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  // --- Trending carousel ---
  qsa('[data-carousel]').forEach(function (carousel) {
    var track = qs('[data-track]', carousel);
    var prevBtn = qs('[data-prev]', carousel);
    var nextBtn = qs('[data-next]', carousel);

    if (!track) return;

    function step(direction) {
      var card = track.querySelector('.card');
      var gap = 14;
      var delta = (card ? card.getBoundingClientRect().width : 220) + gap;
      track.scrollBy({ left: direction * delta * 2, behavior: 'smooth' });
    }

    function updateDisabled() {
      if (!prevBtn || !nextBtn) return;
      var maxLeft = track.scrollWidth - track.clientWidth;
      var left = track.scrollLeft;
      prevBtn.disabled = left <= 2;
      nextBtn.disabled = left >= maxLeft - 2;
      prevBtn.setAttribute('aria-disabled', String(prevBtn.disabled));
      nextBtn.setAttribute('aria-disabled', String(nextBtn.disabled));
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        step(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        step(1);
      });
    }

    track.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateDisabled);
    });
    window.addEventListener('resize', updateDisabled);

    updateDisabled();
  });

  // --- FAQ accordion (single-open) ---
  qsa('[data-accordion]').forEach(function (accordion) {
    var items = qsa('[data-acc-item]', accordion);

    function closeAll(exceptId) {
      items.forEach(function (item) {
        var btn = qs('[data-acc-btn]', item);
        var panel = qs('[data-acc-panel]', item);
        var isOpen = item.id === exceptId;
        item.dataset.open = isOpen ? 'true' : 'false';
        if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (panel) panel.hidden = !isOpen;
      });
    }

    items.forEach(function (item) {
      var btn = qs('[data-acc-btn]', item);
      var panel = qs('[data-acc-panel]', item);
      if (!btn || !panel) return;

      // Keep panels in the a11y tree only when open.
      panel.hidden = true;
      item.dataset.open = 'false';
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', function () {
        var isOpen = item.dataset.open === 'true';
        closeAll(isOpen ? null : item.id);
      });
    });

    // Open first item on desktop-ish screens, closed on mobile.
    if (window.matchMedia('(min-width: 900px)').matches && items[0] && items[0].id) {
      closeAll(items[0].id);
    }
  });

  // --- Email capture UX (non-blocking) ---
  qsa('[data-email-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var msg = form.querySelector('[data-form-msg]');
      var email = input ? input.value.trim() : '';

      if (!input) return;

      if (!email || !input.checkValidity()) {
        input.focus();
        if (msg) msg.textContent = 'Please enter a valid email address.';
        return;
      }

      if (msg) msg.textContent = 'Nice — check your inbox to continue.';
      form.reset();
      input.blur();
    });
  });

  // --- Login help toggle ---
  qsa('[data-help]').forEach(function (wrap) {
    var btn = qs('[data-help-btn]', wrap);
    var panel = qs('[data-help-panel]', wrap);
    if (!btn || !panel) return;

    function setOpen(open) {
      wrap.dataset.open = open ? 'true' : 'false';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.hidden = !open;
    }

    panel.hidden = true;
    setOpen(false);

    btn.addEventListener('click', function () {
      setOpen(!(wrap.dataset.open === 'true'));
    });
  });

  // --- Login validation ---
  qsa('[data-login-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[name="identifier"]');
      var pw = form.querySelector('input[name="password"]');
      var msg = form.querySelector('[data-form-msg]');

      var ok = true;
      if (email && !email.value.trim()) {
        ok = false;
        email.focus();
      }
      if (pw && !pw.value.trim()) {
        ok = false;
        if (ok && pw) pw.focus();
      }

      if (!ok) {
        if (msg) msg.textContent = 'Please enter your email/mobile and password.';
        return;
      }

      if (msg) msg.textContent = 'Submitting…';
      window.setTimeout(function () {
        if (msg) msg.textContent = 'Done. (Demo only — no backend.)';
      }, 500);
    });
  });
})();

