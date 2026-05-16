(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // -----------------------------
  // Dropdown (header)
  // -----------------------------
  function initDropdowns() {
    qsa('[data-dropdown]').forEach((wrap) => {
      const button = qs('button', wrap);
      const menu = qs('[data-dropdown-menu]', wrap);
      if (!button || !menu) return;

      function setOpen(open) {
        wrap.dataset.open = open ? 'true' : 'false';
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (!open) button.focus({ preventScroll: true });
      }

      function onDocClick(e) {
        if (!wrap.contains(e.target)) setOpen(false);
      }

      button.addEventListener('click', () => {
        const open = wrap.dataset.open === 'true';
        setOpen(!open);
      });

      button.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setOpen(false);
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
          const first = qs('a', menu);
          if (first) first.focus();
        }
      });

      menu.addEventListener('keydown', (e) => {
        const items = qsa('a', menu);
        const idx = items.indexOf(document.activeElement);
        if (e.key === 'Escape') {
          e.preventDefault();
          setOpen(false);
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = items[Math.min(items.length - 1, idx + 1)] || items[0];
          if (next) next.focus();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = items[Math.max(0, idx - 1)] || items[items.length - 1];
          if (prev) prev.focus();
        }
      });

      document.addEventListener('click', onDocClick);
    });
  }

  // -----------------------------
  // Tabs
  // -----------------------------
  function initTabs() {
    qsa('[data-tabs]').forEach((root) => {
      const tablist = qs('[role="tablist"]', root);
      const tabs = qsa('[role="tab"]', root);
      const panels = qsa('[role="tabpanel"]', root);
      if (!tablist || tabs.length === 0 || panels.length === 0) return;

      function activate(tab) {
        const id = tab.getAttribute('aria-controls');
        tabs.forEach((t) => {
          const selected = t === tab;
          t.setAttribute('aria-selected', selected ? 'true' : 'false');
          t.tabIndex = selected ? 0 : -1;
        });
        panels.forEach((p) => {
          const show = p.id === id;
          p.hidden = !show;
          p.dataset.active = show ? 'true' : 'false';
        });
      }

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => activate(tab));
        tab.addEventListener('keydown', (e) => {
          const idx = tabs.indexOf(tab);
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            const next = tabs[(idx + 1) % tabs.length];
            next.focus();
            activate(next);
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
            prev.focus();
            activate(prev);
          }
          if (e.key === 'Home') {
            e.preventDefault();
            tabs[0].focus();
            activate(tabs[0]);
          }
          if (e.key === 'End') {
            e.preventDefault();
            tabs[tabs.length - 1].focus();
            activate(tabs[tabs.length - 1]);
          }
        });
      });

      const selected = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
      activate(selected);
    });
  }

  // -----------------------------
  // Accordion
  // -----------------------------
  function initAccordion() {
    qsa('[data-accordion]').forEach((root) => {
      const items = qsa('[data-accordion-item]', root);
      if (items.length === 0) return;

      function openItem(item) {
        items.forEach((it) => {
          const open = it === item;
          it.dataset.open = open ? 'true' : 'false';
          const btn = qs('button', it);
          const panel = qs('[data-accordion-panel]', it);
          if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          if (panel) panel.hidden = !open;
        });
      }

      items.forEach((item) => {
        const btn = qs('button', item);
        if (!btn) return;
        btn.addEventListener('click', () => {
          const isOpen = item.dataset.open === 'true';
          openItem(isOpen ? items[0] : item);
        });
        btn.addEventListener('keydown', (e) => {
          const idx = items.indexOf(item);
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = items[(idx + 1) % items.length];
            const nb = qs('button', next);
            if (nb) nb.focus();
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = items[(idx - 1 + items.length) % items.length];
            const pb = qs('button', prev);
            if (pb) pb.focus();
          }
        });
      });

      // Default: first item open
      openItem(items.find((it) => it.dataset.open === 'true') || items[0]);
    });
  }

  // -----------------------------
  // Carousel (testimonials)
  // -----------------------------
  function initCarousel() {
    qsa('[data-carousel]').forEach((root) => {
      const track = qs('[data-carousel-track]', root);
      const slides = qsa('[data-carousel-slide]', root);
      const dots = qsa('[data-carousel-dot]', root);
      if (!track || slides.length === 0 || dots.length === 0) return;

      let idx = 0;
      function setIndex(next) {
        idx = Math.max(0, Math.min(slides.length - 1, next));
        track.style.transform = `translateX(${-idx * 100}%)`;
        dots.forEach((d, i) => d.setAttribute('aria-current', i === idx ? 'true' : 'false'));
      }

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => setIndex(i));
      });

      root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') setIndex(idx + 1);
        if (e.key === 'ArrowLeft') setIndex(idx - 1);
      });

      setIndex(0);
    });
  }

  // -----------------------------
  // Cookie banner (home only)
  // -----------------------------
  function initCookieBanner() {
    const banner = qs('[data-cookie]');
    if (!banner) return;

    const key = 'wellstream_cookie_pref_v1';
    const stored = localStorage.getItem(key);
    if (!stored) banner.dataset.visible = 'true';

    const accept = qs('[data-cookie-accept]', banner);
    const decline = qs('[data-cookie-decline]', banner);
    const hide = (value) => {
      localStorage.setItem(key, value);
      banner.dataset.visible = 'false';
    };
    if (accept) accept.addEventListener('click', () => hide('accept'));
    if (decline) decline.addEventListener('click', () => hide('decline'));
  }

  // -----------------------------
  // Demo form validation
  // -----------------------------
  function initDemoForm() {
    const form = qs('[data-demo-form]');
    if (!form) return;

    const status = qs('[data-form-status]');
    const requiredNames = new Set([
      'firstName',
      'lastName',
      'email',
      'company',
      'phone',
      'jobTitle',
      'country',
    ]);

    const validators = {
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      phone: (v) => v.replace(/\D/g, '').length >= 7,
    };

    function setInvalid(fieldEl, invalid) {
      const wrap = fieldEl.closest('[data-field]');
      if (!wrap) return;
      wrap.dataset.invalid = invalid ? 'true' : 'false';
    }

    function validateField(input) {
      const name = input.name;
      const value = (input.value || '').trim();
      let ok = true;
      if (requiredNames.has(name) && !value) ok = false;
      if (ok && validators[name]) ok = validators[name](value);
      setInvalid(input, !ok);
      return ok;
    }

    qsa('input,select,textarea', form).forEach((el) => {
      el.addEventListener('blur', () => validateField(el));
      el.addEventListener('input', () => {
        if (el.closest('[data-field]')?.dataset.invalid === 'true') validateField(el);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = qsa('input,select,textarea', form);
      const invalid = inputs.map(validateField).some((ok) => !ok);
      if (invalid) {
        if (status) {
          status.textContent = 'Please fix the highlighted fields and try again.';
          status.dataset.kind = 'error';
        }
        const firstBad = inputs.find((el) => el.closest('[data-field]')?.dataset.invalid === 'true');
        if (firstBad) firstBad.focus();
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      // No backend in static build; simulate success and store request.
      const key = 'wellstream_demo_requests_v1';
      const all = JSON.parse(localStorage.getItem(key) || '[]');
      all.push({ ...data, submittedAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(all));

      if (status) {
        status.textContent = 'Thanks — your demo request has been submitted. We’ll reach out shortly.';
        status.dataset.kind = 'success';
      }
      form.reset();
    });
  }

  function init() {
    initDropdowns();
    initTabs();
    initAccordion();
    initCarousel();
    initCookieBanner();
    initDemoForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

