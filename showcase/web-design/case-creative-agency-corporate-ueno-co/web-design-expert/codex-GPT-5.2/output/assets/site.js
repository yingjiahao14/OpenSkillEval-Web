(function(){
  const root = document.documentElement;

  // --- Mobile overlay nav ---
  const overlay = document.querySelector('[data-overlay]');
  const menuBtn = document.querySelector('[data-menu-button]');
  const overlayClose = document.querySelector('[data-overlay-close]');

  function setOverlay(open){
    if(!overlay || !menuBtn) return;
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    root.style.overflow = open ? 'hidden' : '';
  }

  function toggleOverlay(){
    const open = overlay?.getAttribute('aria-hidden') !== 'false';
    setOverlay(open);
  }

  menuBtn?.addEventListener('click', toggleOverlay);
  overlayClose?.addEventListener('click', () => setOverlay(false));
  overlay?.addEventListener('click', (e) => {
    const target = e.target;
    if(target?.matches?.('[data-overlay-backdrop]')) setOverlay(false);
  });
  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') setOverlay(false);
  });
  overlay?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOverlay(false)));

  // --- Client marquee (smooth, no-jank) ---
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const marqueeRows = document.querySelectorAll('[data-marquee-row]');

  if(!prefersReduced && marqueeRows.length){
    const state = [];

    marqueeRows.forEach((row, idx) => {
      const track = row.querySelector('[data-marquee-track]');
      if(!track) return;

      // Duplicate once for seamless wrap.
      if(!track.dataset.duped){
        track.innerHTML = track.innerHTML + track.innerHTML;
        track.dataset.duped = 'true';
      }

      state.push({
        row,
        track,
        dir: idx % 2 === 0 ? 1 : -1,
        x: 0,
        w: 0,
        speed: 36 + (idx * 8) // px/sec
      });
    });

    function measure(){
      state.forEach((s) => {
        // Half width because we duplicated once.
        s.w = s.track.scrollWidth / 2;
      });
    }

    let last = performance.now();
    function tick(now){
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      state.forEach((s) => {
        if(!s.w) return;
        s.x += s.dir * s.speed * dt;

        // Wrap within [-w, w]
        if(s.x >= s.w) s.x -= s.w;
        if(s.x <= -s.w) s.x += s.w;

        s.track.style.transform = `translate3d(${-s.x}px, 0, 0)`;
      });

      requestAnimationFrame(tick);
    }

    // Measure after fonts load to avoid jump.
    const ready = document.fonts?.ready;
    (ready ? ready.then(measure) : Promise.resolve().then(measure)).finally(() => {
      measure();
      requestAnimationFrame((t) => {
        last = t;
        requestAnimationFrame(tick);
      });
    });

    window.addEventListener('resize', () => {
      measure();
    }, { passive: true });
  }
})();

