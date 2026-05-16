(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function setOpen(el, open) {
    el.setAttribute('data-open', open ? 'true' : 'false');
  }

  // FAQ accordion (single-open)
  var accordion = qs('[data-accordion="faq"]');
  if (accordion) {
    var items = qsa('.acc-item', accordion);

    function openOnly(target) {
      items.forEach(function (item) {
        setOpen(item, item === target);
        var btn = qs('.acc-button', item);
        var expanded = item === target;
        if (btn) btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
    }

    items.forEach(function (item) {
      var btn = qs('.acc-button', item);
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isOpen = item.getAttribute('data-open') === 'true';
        if (isOpen) {
          setOpen(item, false);
          btn.setAttribute('aria-expanded', 'false');
        } else {
          openOnly(item);
        }
      });
    });

    // Open first item by default on large screens for scannability
    if (window.matchMedia && window.matchMedia('(min-width: 1024px)').matches && items[0]) {
      openOnly(items[0]);
    }
  }

  // Trending carousel arrows
  var carousel = qs('[data-carousel="trending"]');
  if (carousel) {
    var nextBtn = qs('[data-carousel-next]');
    var prevBtn = qs('[data-carousel-prev]');

    function scrollByCards(dir) {
      var card = qs('.poster', carousel);
      var step = (card ? card.getBoundingClientRect().width : 240) + 14;
      carousel.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCards(1); });
    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCards(-1); });
  }

  // Email capture (hero + bottom CTA)
  qsa('form[data-email-capture]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = qs('input[type="email"]', form);
      if (!input) return;
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }

      // Lightweight, no-backend behavior: acknowledge + keep friction low.
      var msg = qs('[data-email-success]', form);
      if (msg) {
        msg.textContent = 'Great — check your inbox to finish setup.';
      }
    });
  });

  // Login form submit (client validation)
  var loginForm = qs('form[data-login-form]');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = qs('input[name="identifier"]', loginForm);
      var pass = qs('input[name="password"]', loginForm);
      var ok = true;
      if (email && !email.value.trim()) {
        ok = false;
        email.setCustomValidity('Please enter your email or mobile number.');
        email.reportValidity();
        email.setCustomValidity('');
      }
      if (ok && pass && pass.value.length < 1) {
        ok = false;
        pass.setCustomValidity('Please enter your password.');
        pass.reportValidity();
        pass.setCustomValidity('');
      }
      if (!ok) return;

      var status = qs('[data-login-status]', loginForm);
      if (status) status.textContent = 'Submitting…';

      // No backend; simulate submit success.
      window.setTimeout(function () {
        if (status) status.textContent = 'Signed in (demo).';
      }, 600);
    });
  }

  // Get help toggle on login page
  var help = qs('[data-help]');
  if (help) {
    var helpBtn = qs('[data-help-toggle]', help);
    if (helpBtn) {
      helpBtn.addEventListener('click', function () {
        var isOpen = help.getAttribute('data-open') === 'true';
        setOpen(help, !isOpen);
        helpBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });
    }
  }
})();

