(function(){
  const q = (sel, root=document) => root.querySelector(sel);
  const qa = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // Mobile nav
  const nav = q('[data-nav]');
  const navBtn = q('[data-nav-toggle]');
  if (nav && navBtn){
    navBtn.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      navBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  // Smooth micro-animations on scroll
  const animated = qa('[data-animate]');
  if (animated.length){
    const io = new IntersectionObserver((entries) => {
      for (const e of entries){
        if (e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12 });
    animated.forEach(el => io.observe(el));
  }

  // Generic tabs
  qa('[data-tabs]').forEach((root) => {
    const buttons = qa('[role="tab"]', root);
    const panels = qa('[role="tabpanel"]', root);
    const activate = (id) => {
      buttons.forEach(b => b.setAttribute('aria-selected', b.getAttribute('data-tab') === id ? 'true' : 'false'));
      panels.forEach(p => p.setAttribute('data-active', p.getAttribute('data-panel') === id ? 'true' : 'false'));
    };
    buttons.forEach(btn => {
      btn.addEventListener('click', () => activate(btn.getAttribute('data-tab')));
      btn.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const idx = buttons.indexOf(btn);
        const next = e.key === 'ArrowRight' ? (idx + 1) : (idx - 1);
        const target = buttons[(next + buttons.length) % buttons.length];
        target.focus();
        activate(target.getAttribute('data-tab'));
      });
    });
    const initial = q('[role="tab"][aria-selected="true"]', root) || buttons[0];
    if (initial) activate(initial.getAttribute('data-tab'));
  });

  // Accordions (FAQ)
  qa('[data-accordion]').forEach((root) => {
    const items = qa('[data-acc-item]', root);
    items.forEach((item) => {
      const btn = q('[data-acc-btn]', item);
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.getAttribute('data-open') === 'true';
        items.forEach(i => i.setAttribute('data-open', 'false'));
        item.setAttribute('data-open', isOpen ? 'false' : 'true');
      });
    });
  });

  // Carousels
  qa('[data-carousel]').forEach((root) => {
    const track = q('[data-track]', root);
    const prev = q('[data-prev]', root);
    const next = q('[data-next]', root);
    if (!track || !prev || !next) return;

    const pageBy = () => {
      const firstSlide = q('[data-slide]', track);
      if (!firstSlide) return track.clientWidth;
      return firstSlide.getBoundingClientRect().width + 14;
    };

    prev.addEventListener('click', () => track.scrollBy({ left: -pageBy(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: pageBy(), behavior: 'smooth' }));

    // Optional autoplay
    const autoplay = root.getAttribute('data-autoplay');
    if (autoplay === 'true'){
      let t = setInterval(() => track.scrollBy({ left: pageBy(), behavior: 'smooth' }), 7000);
      root.addEventListener('mouseenter', () => { clearInterval(t); });
      root.addEventListener('mouseleave', () => {
        clearInterval(t);
        t = setInterval(() => track.scrollBy({ left: pageBy(), behavior: 'smooth' }), 7000);
      });
    }
  });
})();

