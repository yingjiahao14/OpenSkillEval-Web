(() => {
  const overlay = document.querySelector('[data-overlay]');
  const menuBtn = document.querySelector('[data-menu-button]');
  const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  const setMenuOpen = (open) => {
    if (!overlay || !menuBtn) return;
    overlay.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      lastFocused = document.activeElement;
      const firstLink = overlay.querySelector('a');
      firstLink?.focus();
    } else {
      lastFocused?.focus?.();
    }
  };

  const isOpen = () => overlay?.classList.contains('is-open');

  menuBtn?.addEventListener('click', () => setMenuOpen(!isOpen()));

  overlay?.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.matches('[data-overlay-close]')) setMenuOpen(false);
    if (t && t.matches('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setMenuOpen(false);
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = Array.from(overlay.querySelectorAll(focusableSelector)).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
    );
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Marquee: smooth JS-driven transform to avoid jank.
  const rows = Array.from(document.querySelectorAll('[data-marquee-row]'));
  if (!rows.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const state = rows.map((row) => {
    const speed = Number(row.getAttribute('data-speed') || '28'); // px/s
    const direction = row.getAttribute('data-direction') === 'right' ? 1 : -1;
    return { row, speed, direction, width: 0, x: 0 };
  });

  const setupRow = (s) => {
    const content = s.row.querySelector('[data-marquee-content]');
    if (!content) return;
    const clone = content.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('is-clone');
    s.row.innerHTML = '';
    s.row.appendChild(content);
    s.row.appendChild(clone);

    const recalc = () => {
      const w = content.scrollWidth;
      s.width = w;
      s.x = 0;
    };
    recalc();
    return recalc;
  };

  const recalcs = state.map(setupRow).filter(Boolean);
  const onResize = () => recalcs.forEach((fn) => fn());
  window.addEventListener('resize', onResize, { passive: true });

  let last = performance.now();
  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    for (const s of state) {
      if (!s.width) continue;
      s.x += (s.speed * dt * s.direction);
      // keep in [-width, 0]
      if (s.direction < 0 && s.x <= -s.width) s.x += s.width;
      if (s.direction > 0 && s.x >= 0) s.x -= s.width;
      const tx = Math.round(s.x * dpr) / dpr;
      s.row.style.transform = `translate3d(${tx}px,0,0)`;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

