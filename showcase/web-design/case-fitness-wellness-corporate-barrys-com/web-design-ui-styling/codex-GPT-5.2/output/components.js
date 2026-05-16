(function () {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  // Newsletter validation
  $$('[data-newsletter]').forEach((form) => {
    const input = $('[data-email]', form);
    const msg = $('[data-msg]', form);
    const btn = $('[data-submit]', form);
    const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(value || '').trim());
    const setMsg = (type, text) => {
      if (!msg) return;
      msg.classList.remove('error', 'success');
      if (type) msg.classList.add(type);
      msg.textContent = text;
    };
    const setAria = (invalid) => {
      input?.setAttribute('aria-invalid', String(!!invalid));
    };

    const validate = () => {
      const value = String(input?.value || '').trim();
      if (!value) {
        setAria(true);
        setMsg('error', 'Email is required.');
        return false;
      }
      if (!emailOk(value)) {
        setAria(true);
        setMsg('error', 'Please enter a valid email address.');
        return false;
      }
      setAria(false);
      setMsg('', '');
      return true;
    };

    input?.addEventListener('input', () => {
      if (!msg?.textContent) return;
      validate();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;
      btn && (btn.disabled = true);
      setMsg('success', 'You’re in. Watch your inbox for RedRoom drops.');
      setTimeout(() => {
        btn && (btn.disabled = false);
      }, 900);
      form.reset();
      setAria(false);
    });
  });

  // Home carousel
  $$('[data-carousel]').forEach((root) => {
    const track = $('[data-carousel-track]', root);
    const prev = $('[data-carousel-prev]', root);
    const next = $('[data-carousel-next]', root);
    const dots = $$('[data-carousel-dot]', root);
    if (!track) return;
    const slides = $$('.slide', track);
    let index = 0;
    const setIndex = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, di) => d.setAttribute('aria-current', di === index ? 'true' : 'false'));
    };
    prev?.addEventListener('click', () => setIndex(index - 1));
    next?.addEventListener('click', () => setIndex(index + 1));
    dots.forEach((d, di) => d.addEventListener('click', () => setIndex(di)));

    // Swipe support
    let startX = null;
    const onDown = (e) => {
      startX = e.touches ? e.touches[0].clientX : e.clientX;
    };
    const onUp = (e) => {
      if (startX == null) return;
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const dx = endX - startX;
      startX = null;
      if (Math.abs(dx) < 40) return;
      setIndex(index + (dx < 0 ? 1 : -1));
    };
    track.addEventListener('touchstart', onDown, { passive: true });
    track.addEventListener('touchend', onUp, { passive: true });
    track.addEventListener('mousedown', onDown);
    track.addEventListener('mouseup', onUp);

    setIndex(0);
  });

  // Workout toggle (Floor/Treadmill)
  $$('[data-toggle]').forEach((root) => {
    const buttons = $$('[data-toggle-btn]', root);
    const panels = $$('[data-toggle-panel]', root);
    if (!buttons.length || !panels.length) return;
    const set = (value) => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-toggle-btn') === value ? 'true' : 'false'));
      panels.forEach((p) => {
        const on = p.getAttribute('data-toggle-panel') === value;
        p.style.display = on ? 'block' : 'none';
        p.toggleAttribute('data-active', on);
        if (on) p.classList.add('fade-enter');
      });
    };
    buttons.forEach((b) => b.addEventListener('click', () => set(b.getAttribute('data-toggle-btn'))));
    set(buttons[0].getAttribute('data-toggle-btn'));
  });

  // Instructors filter
  $$('[data-instructors]').forEach((root) => {
    const select = $('[data-location]', root);
    const cards = $$('[data-instructor]', root);
    const count = $('[data-count]', root);
    if (!select) return;

    const apply = () => {
      const loc = select.value;
      let visible = 0;
      cards.forEach((c) => {
        const match = loc === 'All Locations' || c.getAttribute('data-location') === loc;
        c.style.display = match ? 'block' : 'none';
        if (match) {
          visible += 1;
          c.classList.remove('fade-enter');
          // reflow for animation restart
          void c.offsetWidth;
          c.classList.add('fade-enter');
        }
      });
      if (count) count.textContent = `${visible} instructor${visible === 1 ? '' : 's'}`;
    };
    select.addEventListener('change', apply);
    apply();
  });

  // FAQ accordion (single-open)
  $$('[data-accordion]').forEach((root) => {
    const items = $$('[data-acc-item]', root);
    const closeAll = () => {
      items.forEach((it) => {
        it.dataset.open = 'false';
        const btn = $('[data-acc-btn]', it);
        const panel = $('[data-acc-panel]', it);
        btn?.setAttribute('aria-expanded', 'false');
        panel && (panel.style.maxHeight = '0px');
      });
    };
    const openItem = (it) => {
      const panel = $('[data-acc-panel]', it);
      const inner = $('[data-acc-panel-inner]', it);
      const btn = $('[data-acc-btn]', it);
      it.dataset.open = 'true';
      btn?.setAttribute('aria-expanded', 'true');
      if (panel && inner) panel.style.maxHeight = inner.scrollHeight + 20 + 'px';
    };

    items.forEach((it) => {
      const btn = $('[data-acc-btn]', it);
      const panel = $('[data-acc-panel]', it);
      btn?.addEventListener('click', () => {
        const isOpen = it.dataset.open === 'true';
        closeAll();
        if (!isOpen) openItem(it);
      });
      // start closed
      it.dataset.open = 'false';
      btn?.setAttribute('aria-expanded', 'false');
      panel && (panel.style.maxHeight = '0px');
    });

    // keep heights correct on resize
    window.addEventListener('resize', () => {
      const open = items.find((it) => it.dataset.open === 'true');
      if (open) openItem(open);
    });
  });
})();

