(function () {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  // Mobile nav
  const header = document.querySelector('[data-site-header]');
  const menuBtn = document.querySelector('[data-menu-btn]');
  if (header && menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = header.getAttribute('data-open') === 'true';
      header.setAttribute('data-open', String(!open));
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  // Home carousel (arrows + dots + swipe)
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = $('[data-carousel-track]', carousel);
    const slides = $$('[data-slide]', carousel);
    const prevBtn = $('[data-carousel-prev]', carousel);
    const nextBtn = $('[data-carousel-next]', carousel);
    const dots = $$('[data-dot]', carousel);
    let idx = 0;

    const clampIndex = (n) => {
      const len = slides.length;
      return ((n % len) + len) % len;
    };

    const render = (nextIdx, { focusDot = false } = {}) => {
      idx = clampIndex(nextIdx);
      track.style.transform = `translateX(${-idx * 100}%)`;
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
      if (focusDot && dots[idx]) dots[idx].focus();
    };

    const goPrev = () => render(idx - 1);
    const goNext = () => render(idx + 1);

    prevBtn?.addEventListener('click', goPrev);
    nextBtn?.addEventListener('click', goNext);
    dots.forEach((d) => {
      d.addEventListener('click', () => render(Number(d.getAttribute('data-dot'))));
    });

    // Keyboard
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    });

    // Touch
    let startX = 0;
    let active = false;
    const threshold = 35;
    carousel.addEventListener('touchstart', (e) => {
      active = true;
      startX = e.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      if (!active) return;
      active = false;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      if (Math.abs(dx) < threshold) return;
      if (dx > 0) goPrev();
      else goNext();
    });

    render(0);
  }

  // Workout toggle (Floor vs Treadmill)
  const toggle = document.querySelector('[data-workout-toggle]');
  if (toggle) {
    const buttons = $$('button[data-toggle]', toggle);
    const panel = document.querySelector('[data-toggle-panel]');
    const content = {
      floor: {
        title: 'Floor',
        body:
          'Dumbbells, resistance bands, and bodyweight movements target specific muscle groups each day. Our instructors guide every rep to ensure proper form and maximum results.',
      },
      treadmill: {
        title: 'Treadmill',
        body:
          "From power walks to all-out sprints, the treadmill portion is designed to torch calories and build cardiovascular endurance. Every speed and incline is coach-led — all levels welcome.",
      },
    };

    const setActive = (key) => {
      buttons.forEach((b) => {
        const isOn = b.getAttribute('data-toggle') === key;
        b.setAttribute('aria-pressed', String(isOn));
      });

      if (!panel) return;
      panel.classList.add('is-hidden');
      window.setTimeout(() => {
        const next = content[key];
        panel.innerHTML = `
          <div class="card">
            <strong>${next.title}</strong>
            <p>${next.body}</p>
          </div>
        `;
        panel.classList.remove('is-hidden');
      }, 140);
    };

    buttons.forEach((b) => b.addEventListener('click', () => setActive(b.getAttribute('data-toggle'))));
    setActive('floor');
  }

  // Instructors filter
  const filter = document.querySelector('[data-instructor-filter]');
  if (filter) {
    const select = $('[data-location-select]', filter);
    const cards = $$('[data-instructor-card]');

    const apply = () => {
      const val = (select?.value || 'all').toLowerCase();
      cards.forEach((c) => {
        const loc = (c.getAttribute('data-location') || '').toLowerCase();
        const show = val === 'all' || loc === val;
        c.classList.toggle('hidden', !show);
      });
    };

    select?.addEventListener('change', apply);
    apply();
  }

  // FAQ accordion (single open)
  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    const items = $$('[data-acc-item]', accordion);
    const closeAll = () => {
      items.forEach((it) => {
        const btn = $('[data-acc-btn]', it);
        const panel = $('[data-acc-panel]', it);
        btn?.setAttribute('aria-expanded', 'false');
        if (panel) panel.hidden = true;
      });
    };

    items.forEach((it) => {
      const btn = $('[data-acc-btn]', it);
      const panel = $('[data-acc-panel]', it);
      if (!btn || !panel) return;

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        closeAll();
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          panel.hidden = false;
        }
      });
    });

    closeAll();
  }

  // Newsletter validation
  $$('[data-newsletter-form]').forEach((form) => {
    const input = $('[data-email]', form);
    const help = $('[data-help]', form);
    if (!input || !help) return;

    const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(s).trim());
    const show = (msg, type) => {
      help.textContent = msg;
      help.classList.remove('error', 'success');
      if (type) help.classList.add(type);
    };

    input.addEventListener('input', () => {
      const v = input.value.trim();
      if (!v) return show('');
      if (!isValidEmail(v)) return show('Please enter a valid email address.', 'error');
      return show('Looks good. Hit subscribe when ready.', 'success');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) return show('Email is required.', 'error');
      if (!isValidEmail(v)) return show('Please enter a valid email address.', 'error');
      show("You're in. Watch your inbox for RedRoom updates.", 'success');
      input.value = '';
    });
  });

  // Footer country selector (native select already toggles)
  // Keep for parity with spec: add subtle live label
  const country = document.querySelector('[data-country-select]');
  const countryLabel = document.querySelector('[data-country-label]');
  if (country && countryLabel) {
    const update = () => {
      const txt = country.options[country.selectedIndex]?.textContent || 'US';
      countryLabel.textContent = txt;
    };
    country.addEventListener('change', update);
    update();
  }
})();

