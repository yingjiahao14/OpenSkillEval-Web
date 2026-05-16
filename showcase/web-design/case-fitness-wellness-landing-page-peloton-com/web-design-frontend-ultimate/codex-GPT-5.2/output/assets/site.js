(function () {
  function qs(root, sel) {
    var el = root.querySelector(sel);
    if (!el) throw new Error('Missing element: ' + sel);
    return el;
  }

  function qsa(root, sel) {
    return Array.prototype.slice.call(root.querySelectorAll(sel));
  }

  function on(el, event, handler) {
    el.addEventListener(event, handler);
    return function () {
      el.removeEventListener(event, handler);
    };
  }

  function wireTopbarInteractions(root) {
    if (root === void 0) root = document;
    var topbar = root.querySelector('[data-topbar]');
    if (!topbar) return;

    var dd = topbar.querySelector('[data-dd]');
    var ddTrigger = topbar.querySelector('[data-dd-trigger]');
    var ddPanel = topbar.querySelector('[data-dd-panel]');

    if (dd && ddTrigger && ddPanel) {
      var close = function () {
        ddTrigger.setAttribute('aria-expanded', 'false');
        ddPanel.classList.remove('is-open');
      };
      var open = function () {
        ddTrigger.setAttribute('aria-expanded', 'true');
        ddPanel.classList.add('is-open');
      };
      on(ddTrigger, 'click', function () {
        var isOpen = ddTrigger.getAttribute('aria-expanded') === 'true';
        if (isOpen) close();
        else open();
      });
      on(document, 'click', function (ev) {
        var target = ev.target;
        if (!dd.contains(target)) close();
      });
      on(document, 'keydown', function (ev) {
        if (ev.key === 'Escape') close();
      });
    }

    var hamburger = topbar.querySelector('[data-hamburger]');
    var drawer = topbar.querySelector('[data-drawer]');
    if (hamburger && drawer) {
      var setOpen = function (open) {
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
          drawer.hidden = false;
          requestAnimationFrame(function () {
            drawer.classList.add('is-open');
          });
          document.body.classList.add('no-scroll');
        } else {
          drawer.classList.remove('is-open');
          document.body.classList.remove('no-scroll');
          window.setTimeout(function () {
            drawer.hidden = true;
          }, 220);
        }
      };

      on(hamburger, 'click', function () {
        var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        setOpen(!isOpen);
      });
      qsa(drawer, 'a').forEach(function (a) {
        on(a, 'click', function () {
          setOpen(false);
        });
      });
    }
  }

  function wireTabs(scope, id, initial) {
    var root = qs(scope, '[data-tabs="' + id + '"]');
    var triggers = qsa(root, '[data-tab-trigger]');
    var panels = qsa(root, '[data-tab-panel]');

    var set = function (value) {
      triggers.forEach(function (t) {
        var isActive = t.dataset.tabTrigger === value;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        t.tabIndex = isActive ? 0 : -1;
      });
      panels.forEach(function (p) {
        var isActive = p.dataset.tabPanel === value;
        p.classList.toggle('is-active', isActive);
        if (!isActive) p.setAttribute('hidden', '');
        else p.removeAttribute('hidden');
      });
    };

    var start =
      initial ||
      (triggers.find(function (t) {
        return t.dataset.tabTrigger;
      }) || {}).dataset?.tabTrigger ||
      '';
    if (start) set(start);

    triggers.forEach(function (t) {
      on(t, 'click', function () {
        var value = t.dataset.tabTrigger;
        if (value) set(value);
      });
    });

    on(root, 'keydown', function (ev) {
      if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
      var activeIndex = triggers.findIndex(function (t) {
        return t.getAttribute('aria-selected') === 'true';
      });
      if (activeIndex === -1) return;
      var dir = ev.key === 'ArrowRight' ? 1 : -1;
      var next = (activeIndex + dir + triggers.length) % triggers.length;
      if (triggers[next]) triggers[next].focus();
      var value = triggers[next] && triggers[next].dataset.tabTrigger;
      if (value) set(value);
    });
  }

  function wireAccordion(scope, id) {
    var root = qs(scope, '[data-accordion="' + id + '"]');
    var items = qsa(root, '[data-acc-item]');

    var setOpen = function (key) {
      items.forEach(function (item) {
        var isOpen = item.dataset.accItem === key;
        item.classList.toggle('is-open', isOpen);
        var btn = item.querySelector('[data-acc-trigger]');
        var panel = item.querySelector('[data-acc-panel]');
        if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (panel) {
          if (!isOpen) panel.setAttribute('hidden', '');
          else panel.removeAttribute('hidden');
        }
      });
    };

    var first = items[0] && items[0].dataset.accItem;
    if (first) setOpen(first);

    items.forEach(function (item) {
      var btn = item.querySelector('[data-acc-trigger]');
      if (!btn) return;
      on(btn, 'click', function () {
        var key = item.dataset.accItem;
        if (!key) return;
        var open = item.classList.contains('is-open');
        setOpen(open ? '' : key);
      });
    });
  }

  function wireCarousel(scope, id) {
    var root = qs(scope, '[data-carousel="' + id + '"]');
    var track = qs(root, '[data-carousel-track]');
    var slides = qsa(track, '[data-carousel-slide]');
    var dots = qsa(root, '[data-carousel-dot]');
    var index = 0;

    var set = function (next) {
      index = ((next % slides.length) + slides.length) % slides.length;
      track.style.transform = 'translateX(' + -index * 100 + '%)';
      dots.forEach(function (d) {
        var isActive = Number(d.dataset.carouselDot) === index;
        d.classList.toggle('is-active', isActive);
        d.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    };

    set(0);
    dots.forEach(function (d) {
      on(d, 'click', function () {
        var next = Number(d.dataset.carouselDot);
        set(next);
      });
    });
  }

  function wireCookieBanner(scope) {
    if (scope === void 0) scope = document;
    var banner = scope.querySelector('[data-cookie-banner]');
    if (!banner) return;

    var key = 'wellstream_cookie_pref';
    var existing = window.localStorage.getItem(key);
    if (existing) {
      banner.remove();
      return;
    }

    var accept = banner.querySelector('[data-cookie-accept]');
    var decline = banner.querySelector('[data-cookie-decline]');
    var dismiss = function (pref) {
      window.localStorage.setItem(key, pref);
      banner.classList.add('is-hiding');
      window.setTimeout(function () {
        banner.remove();
      }, 250);
    };

    if (accept) on(accept, 'click', function () {
      dismiss('accept');
    });
    if (decline) on(decline, 'click', function () {
      dismiss('decline');
    });
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function wireDemoForm(scope) {
    var form = scope.querySelector('form');
    if (!form) return;

    var fields = [
      { name: 'firstName', required: true, kind: 'text' },
      { name: 'lastName', required: true, kind: 'text' },
      { name: 'email', required: true, kind: 'email' },
      { name: 'company', required: true, kind: 'text' },
      { name: 'jobTitle', required: true, kind: 'text' },
      { name: 'country', required: true, kind: 'select' },
      { name: 'phone', required: false, kind: 'text' },
    ];

    var setError = function (name, message) {
      var err = scope.querySelector('[data-err="' + name + '"]');
      if (err) err.textContent = message;
      var input = scope.querySelector('[name="' + name + '"]');
      if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
    };
    var clearErrors = function () {
      fields.forEach(function (f) {
        setError(f.name, '');
      });
    };
    var validate = function () {
      clearErrors();
      var ok = true;
      fields.forEach(function (f) {
        var el = scope.querySelector('[name="' + f.name + '"]');
        if (!el) return;
        var value = String(el.value || '').trim();
        if (f.required && !value) {
          setError(f.name, 'This field is required.');
          ok = false;
          return;
        }
        if (f.kind === 'email' && value && !validateEmail(value)) {
          setError(f.name, 'Enter a valid business email address.');
          ok = false;
        }
      });
      return ok;
    };

    on(form, 'submit', function (ev) {
      ev.preventDefault();
      var ok = validate();
      if (!ok) {
        var firstInvalid = scope.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var panel = qs(scope, '.form');
      var data = new FormData(form);
      var name =
        String(data.get('firstName') || '') +
        ' ' +
        String(data.get('lastName') || '');
      name = name.trim();

      panel.innerHTML =
        '<div class="form__inner">' +
        '<div class="banner" style="grid-template-columns: 1fr">' +
        '<div>' +
        '<div class="banner__title">Request received</div>' +
        '<div class="banner__sub">Thanks' +
        (name ? ', ' + escapeHtml(name) : '') +
        '. We’ll follow up to schedule your demo and discuss integration needs.</div>' +
        '</div>' +
        '<div style="height: 10px"></div>' +
        '<a class="btn btn--primary" href="platform-overview.html">Explore the Platform</a>' +
        '</div>' +
        '</div>';
    });

    fields.forEach(function (f) {
      var el = scope.querySelector('[name="' + f.name + '"]');
      if (!el) return;
      on(el, 'input', function () {
        setError(f.name, '');
      });
      on(el, 'blur', function () {
        var v = String(el.value || '').trim();
        if (f.required && !v) {
          setError(f.name, 'This field is required.');
        }
        if (f.kind === 'email' && v && !validateEmail(v)) {
          setError(f.name, 'Enter a valid business email address.');
        }
      });
    });
  }

  function init() {
    document.documentElement.classList.add('grain');
    wireTopbarInteractions(document);

    var page = document.documentElement.dataset.page || 'home';
    if (page === 'home') {
      wireTabs(document, 'industries', 'E&P');
      wireCookieBanner(document);
    }
    if (page === 'platform-overview') {
      wireAccordion(document, 'platform');
      wireCarousel(document, 't');
      wireTabs(document, 'company', 'Our Company');
    }
    if (page === 'security') {
      wireTabs(document, 'security', 'Security');
    }
    if (page === 'integration') {
      wireTabs(document, 'integration', 'ETL');
    }
    if (page === 'request-demo') {
      wireDemoForm(document);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

