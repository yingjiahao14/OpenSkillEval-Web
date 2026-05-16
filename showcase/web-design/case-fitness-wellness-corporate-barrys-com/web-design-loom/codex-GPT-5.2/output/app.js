(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  // Mobile menu (simple: toggles visibility by inserting a sheet)
  function initMobileNav() {
    const btn = qs('[data-menu-btn]');
    const menu = qs('[data-mobile-menu]');
    if (!btn || !menu) return;

    function setOpen(open) {
      btn.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      if (open) {
        const first = qs('a', menu);
        if (first) first.focus();
      }
    }

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (btn.getAttribute('aria-expanded') !== 'true') return;
      setOpen(false);
      btn.focus();
    });

    document.addEventListener('click', (e) => {
      if (menu.hidden) return;
      if (menu.contains(e.target) || btn.contains(e.target)) return;
      setOpen(false);
    });
  }

  // Smooth carousel with buttons, dots, swipe, and keyboard
  function initCarousel() {
    const root = qs('[data-carousel]');
    if (!root) return;

    const track = qs('[data-carousel-track]', root);
    const slides = qsa('[data-slide]', root);
    const prevBtn = qs('[data-carousel-prev]', root);
    const nextBtn = qs('[data-carousel-next]', root);
    const dots = qsa('[data-carousel-dot]', root);
    const live = qs('[data-carousel-live]', root);

    if (!track || slides.length === 0) return;

    let index = 0;
    let startX = null;
    let lastX = null;

    function clamp(i) {
      const max = slides.length - 1;
      if (i < 0) return max;
      if (i > max) return 0;
      return i;
    }

    function render(announce) {
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
      slides.forEach((s, i) => (s.setAttribute('aria-hidden', String(i !== index))));
      if (announce && live) {
        const label = slides[index].getAttribute('data-label') || `Slide ${index + 1}`;
        live.textContent = label;
      }
    }

    function go(delta, announce = true) {
      index = clamp(index + delta);
      render(announce);
    }

    prevBtn && prevBtn.addEventListener('click', () => go(-1));
    nextBtn && nextBtn.addEventListener('click', () => go(1));
    dots.forEach((d, i) => d.addEventListener('click', () => {
      index = i;
      render(true);
    }));

    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    });

    function onPointerDown(e) {
      if (prefersReducedMotion) return;
      startX = e.clientX;
      lastX = e.clientX;
      root.setPointerCapture && root.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e) {
      if (startX == null) return;
      lastX = e.clientX;
    }

    function onPointerUp() {
      if (startX == null || lastX == null) return;
      const delta = lastX - startX;
      startX = null;
      lastX = null;
      if (Math.abs(delta) < 40) return;
      go(delta > 0 ? -1 : 1);
    }

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerUp);

    render(false);
  }

  // Floor/Treadmill toggle
  function initWorkoutToggle() {
    const root = qs('[data-toggle]');
    if (!root) return;

    const buttons = qsa('[data-toggle-btn]', root);
    const panels = qsa('[data-toggle-panel]');

    function setActive(id) {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-toggle-btn') === id)));
      panels.forEach((p) => {
        const match = p.getAttribute('data-toggle-panel') === id;
        p.hidden = !match;
      });
    }

    buttons.forEach((b) => {
      b.addEventListener('click', () => setActive(b.getAttribute('data-toggle-btn')));
    });

    setActive(buttons[0] ? buttons[0].getAttribute('data-toggle-btn') : 'floor');
  }

  // Instructors filter by location
  function initInstructorFilter() {
    const select = qs('[data-instructor-filter]');
    const cards = qsa('[data-instructor-card]');
    const empty = qs('[data-instructor-empty]');
    if (!select || cards.length === 0) return;

    function render() {
      const v = select.value;
      let shown = 0;
      cards.forEach((c) => {
        const loc = c.getAttribute('data-location');
        const match = v === 'All Locations' || v === loc;
        c.classList.toggle('is-hidden', !match);
        if (match) shown += 1;
      });
      if (empty) empty.hidden = shown !== 0;
    }

    select.addEventListener('change', render);
    render();
  }

  // Single-open accordion
  function initAccordion() {
    const root = qs('[data-accordion]');
    if (!root) return;

    const buttons = qsa('[data-acc-btn]', root);
    const panels = qsa('[data-acc-panel]', root);

    function closeAll(exceptId) {
      buttons.forEach((b) => {
        const id = b.getAttribute('aria-controls');
        const open = id === exceptId;
        b.setAttribute('aria-expanded', String(open));
      });
      panels.forEach((p) => {
        p.hidden = p.id !== exceptId;
      });
    }

    buttons.forEach((b) => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('aria-controls');
        const isOpen = b.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          closeAll(null);
        } else {
          closeAll(id);
        }
      });
    });

    closeAll(null);
  }

  // Newsletter validation with inline feedback
  function initNewsletter() {
    qsa('[data-newsletter]').forEach((root) => {
      const form = qs('form', root);
      const input = qs('input[type="email"]', root);
      const help = qs('[data-help]', root);
      if (!form || !input || !help) return;

      function setState(state, message) {
        help.classList.remove('is-bad', 'is-good');
        if (state === 'bad') help.classList.add('is-bad');
        if (state === 'good') help.classList.add('is-good');
        help.textContent = message;
      }

      function validEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      }

      input.addEventListener('input', () => {
        const v = input.value.trim();
        if (!v) {
          setState(null, 'Get weekly drops: schedule, offers, and new releases.');
          return;
        }
        setState(validEmail(v) ? 'good' : 'bad', validEmail(v) ? 'Looks good. Ready to subscribe.' : 'Enter a valid email address.');
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = input.value.trim();
        if (!validEmail(v)) {
          setState('bad', 'Please enter a valid email to subscribe.');
          input.focus();
          return;
        }
        setState('good', 'You’re in. Check your inbox for confirmation.');
        form.reset();
      });
    });
  }

  // Footer country selector
  function initCountrySelector() {
    const root = qs('[data-country]');
    if (!root) return;
    const btn = qs('[data-country-btn]', root);
    const menu = qs('[data-country-menu]', root);
    const label = qs('[data-country-label]', root);
    if (!btn || !menu || !label) return;

    function setOpen(open) {
      btn.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    }

    btn.addEventListener('click', () => {
      setOpen(!(btn.getAttribute('aria-expanded') === 'true'));
    });

    qsa('button[data-country-option]', menu).forEach((opt) => {
      opt.addEventListener('click', () => {
        label.textContent = opt.getAttribute('data-country-option');
        setOpen(false);
        btn.focus();
      });
    });

    document.addEventListener('click', (e) => {
      if (menu.hidden) return;
      if (root.contains(e.target)) return;
      setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (menu.hidden) return;
      setOpen(false);
      btn.focus();
    });
  }

  function init() {
    initMobileNav();
    initCarousel();
    initWorkoutToggle();
    initInstructorFilter();
    initAccordion();
    initNewsletter();
    initCountrySelector();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

