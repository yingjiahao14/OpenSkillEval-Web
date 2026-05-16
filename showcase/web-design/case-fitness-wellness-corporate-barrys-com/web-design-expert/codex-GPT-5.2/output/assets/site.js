function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function setText(el, text) {
  if (!el) return;
  el.textContent = text;
}

function initMobileNav() {
  const btn = $('[data-mobile-nav-btn]');
  const drawer = $('[data-mobile-nav]');
  if (!btn || !drawer) return;

  function setOpen(isOpen) {
    btn.setAttribute('aria-expanded', String(isOpen));
    drawer.setAttribute('aria-hidden', String(!isOpen));
  }

  setOpen(false);

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !btn.contains(e.target)) {
      setOpen(false);
    }
  });
}

function initCountrySelect() {
  const trigger = $('[data-country-trigger]');
  const menu = $('[data-country-menu]');
  const label = $('[data-country-label]');

  if (!trigger || !menu || !label) return;

  function setOpen(isOpen) {
    trigger.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
  }

  setOpen(false);

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  $all('button[data-country]', menu).forEach((btn) => {
    btn.addEventListener('click', () => {
      label.textContent = btn.getAttribute('data-country') || btn.textContent.trim();
      setOpen(false);
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !trigger.contains(e.target)) {
      setOpen(false);
    }
  });
}

function initNewsletterForms() {
  $all('form[data-newsletter]').forEach((form) => {
    const input = $('input[type="email"]', form);
    const help = $('[data-newsletter-help]', form);

    function validate(value) {
      const trimmed = String(value || '').trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
      return { ok, trimmed };
    }

    function setHelp(state, msg) {
      if (!help) return;
      help.classList.remove('help--ok', 'help--err');
      if (state === 'ok') help.classList.add('help--ok');
      if (state === 'err') help.classList.add('help--err');
      setText(help, msg);
    }

    if (input) {
      input.addEventListener('input', () => {
        const v = validate(input.value);
        if (!input.value) {
          setHelp('idle', '');
          input.setAttribute('aria-invalid', 'false');
          return;
        }
        if (!v.ok) {
          input.setAttribute('aria-invalid', 'true');
          setHelp('err', 'Please enter a valid email address.');
          return;
        }
        input.setAttribute('aria-invalid', 'false');
        setHelp('ok', 'Looks good — you can subscribe.');
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input) return;

      const v = validate(input.value);
      if (!v.ok) {
        input.setAttribute('aria-invalid', 'true');
        setHelp('err', 'Please enter a valid email address.');
        input.focus();
        return;
      }

      input.value = '';
      input.setAttribute('aria-invalid', 'false');
      setHelp('ok', "You're in. Check your inbox for updates and offers.");
    });
  });
}

function initCarousel() {
  const root = $('[data-carousel]');
  if (!root) return;

  const track = $('[data-carousel-track]', root);
  const prevBtn = $('[data-carousel-prev]', root);
  const nextBtn = $('[data-carousel-next]', root);
  const dotsWrap = $('[data-carousel-dots]', root);
  const slides = $all('[data-slide]', root);

  if (!track || slides.length === 0) return;

  let idx = 0;
  let startX = null;
  let isPointerDown = false;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot';
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      b.setAttribute('aria-current', String(i === idx));
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
    });
  }

  function goTo(nextIdx) {
    idx = (nextIdx + slides.length) % slides.length;
    track.style.transform = `translateX(${-idx * 100}%)`;
    $all('.dot', dotsWrap || root).forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
  }

  function next() { goTo(idx + 1); }
  function prev() { goTo(idx - 1); }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // Pointer (mouse/touch) swipe.
  root.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    startX = e.clientX;
    root.setPointerCapture?.(e.pointerId);
  });

  root.addEventListener('pointerup', (e) => {
    if (!isPointerDown || startX === null) return;
    const dx = e.clientX - startX;
    isPointerDown = false;
    startX = null;
    if (Math.abs(dx) < 30) return;
    if (dx < 0) next();
    else prev();
  });

  root.addEventListener('pointercancel', () => {
    isPointerDown = false;
    startX = null;
  });

  // Keyboard.
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  renderDots();
  goTo(0);
}

function initWorkoutToggle() {
  const root = $('[data-workout-toggle]');
  if (!root) return;

  const btnFloor = $('[data-toggle="floor"]', root);
  const btnTread = $('[data-toggle="treadmill"]', root);
  const panels = {
    floor: $('[data-panel="floor"]', root),
    treadmill: $('[data-panel="treadmill"]', root),
  };

  function setMode(mode) {
    const isFloor = mode === 'floor';
    btnFloor?.setAttribute('aria-pressed', String(isFloor));
    btnTread?.setAttribute('aria-pressed', String(!isFloor));
    if (panels.floor) panels.floor.hidden = !isFloor;
    if (panels.treadmill) panels.treadmill.hidden = isFloor;
    if (panels[mode]) {
      panels[mode].classList.remove('fade');
      // force reflow
      void panels[mode].offsetWidth;
      panels[mode].classList.add('fade');
    }
  }

  btnFloor?.addEventListener('click', () => setMode('floor'));
  btnTread?.addEventListener('click', () => setMode('treadmill'));
  setMode('floor');
}

function initInstructorFilter() {
  const root = $('[data-instructors]');
  if (!root) return;

  const select = $('[data-location-select]', root);
  const cards = $all('[data-instructor-card]', root);
  const counter = $('[data-instructor-count]', root);

  if (!select || cards.length === 0) return;

  function applyFilter() {
    const v = (select.value || 'all').toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const loc = (card.getAttribute('data-location') || '').toLowerCase();
      const show = v === 'all' || loc === v;
      card.style.display = show ? '' : 'none';
      if (show) visible += 1;
    });

    if (counter) counter.textContent = String(visible);
  }

  select.addEventListener('change', applyFilter);
  applyFilter();
}

function initFaqAccordion() {
  const root = $('[data-accordion]');
  if (!root) return;

  const items = $all('[data-acc-item]', root);
  if (items.length === 0) return;

  function closeAll(except) {
    items.forEach((it) => {
      if (it === except) return;
      it.removeAttribute('open');
      const btn = $('[data-acc-btn]', it);
      btn?.setAttribute('aria-expanded', 'false');
    });
  }

  items.forEach((it) => {
    const btn = $('[data-acc-btn]', it);
    const panel = $('[data-acc-panel]', it);
    if (!btn || !panel) return;
    btn.setAttribute('aria-expanded', it.hasAttribute('open') ? 'true' : 'false');
    btn.addEventListener('click', () => {
      const willOpen = !it.hasAttribute('open');
      closeAll(willOpen ? it : null);
      if (willOpen) {
        it.setAttribute('open', '');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        it.removeAttribute('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function init() {
  initMobileNav();
  initCountrySelect();
  initNewsletterForms();
  initCarousel();
  initWorkoutToggle();
  initInstructorFilter();
  initFaqAccordion();
}

document.addEventListener('DOMContentLoaded', init);

