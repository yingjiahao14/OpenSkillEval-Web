(function () {
  const overlay = document.querySelector('[data-mobile-overlay]');
  const toggle = document.querySelector('[data-mobile-toggle]');

  function setOverlay(open) {
    if (!overlay || !toggle) return;
    overlay.dataset.open = open ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }

  if (overlay && toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = overlay.dataset.open === 'true';
      setOverlay(!isOpen);
    });

    overlay.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.matches('[data-close-overlay]')) setOverlay(false);
      if (target.closest('a')) setOverlay(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOverlay(false);
    });
  }

  // Marquee: pixel-based animation for consistent speed.
  const marqueeRows = Array.from(document.querySelectorAll('[data-marquee-row]'));
  if (marqueeRows.length) {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      const rows = marqueeRows
        .map((row) => {
          const track = row.querySelector('[data-marquee-track]');
          if (!track) return null;

          const content = track.innerHTML;
          track.innerHTML = content + content;
          return { row, track, dir: row.dataset.dir === 'right' ? 1 : -1, x: 0, w: 0 };
        })
        .filter(Boolean);

      function measure() {
        for (const r of rows) {
          // half width because we duplicated content.
          r.w = r.track.scrollWidth / 2;
          r.x = ((r.x % r.w) + r.w) % r.w;
        }
      }

      let last = performance.now();
      const speeds = [52, 44, 48];

      function tick(now) {
        const dt = Math.min(0.04, (now - last) / 1000);
        last = now;

        rows.forEach((r, i) => {
          const speed = speeds[i % speeds.length];
          r.x = r.x + r.dir * speed * dt;
          // Keep x within [0, w)
          if (r.w) {
            r.x = ((r.x % r.w) + r.w) % r.w;
            r.track.style.transform = `translate3d(${-r.x}px, 0, 0)`;
          }
        });

        requestAnimationFrame(tick);
      }

      const ro = new ResizeObserver(measure);
      marqueeRows.forEach((r) => ro.observe(r));
      measure();
      requestAnimationFrame(tick);
    }
  }
})();
