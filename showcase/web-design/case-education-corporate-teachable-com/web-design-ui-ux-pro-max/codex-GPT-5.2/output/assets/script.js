(function(){
  const q = (sel, el=document) => el.querySelector(sel);
  const qa = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  // Mobile nav
  qa('[data-nav-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nav = btn.closest('[data-nav]');
      const links = q('[data-nav-links]', nav);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('is-open', !expanded);
    });
  });

  // Tabs (generic)
  qa('[data-tabs]').forEach((root) => {
    const tabs = qa('[role="tab"]', root);
    const panels = qa('[role="tabpanel"]', root);
    const activate = (id) => {
      tabs.forEach((t) => {
        const isOn = t.getAttribute('aria-controls') === id;
        t.setAttribute('aria-selected', String(isOn));
        t.tabIndex = isOn ? 0 : -1;
      });
      panels.forEach((p) => {
        p.classList.toggle('is-active', p.id === id);
        p.hidden = p.id !== id;
      });
    };
    tabs.forEach((t) => {
      t.addEventListener('click', () => activate(t.getAttribute('aria-controls')));
      t.addEventListener('keydown', (e) => {
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
        e.preventDefault();
        const i = tabs.indexOf(t);
        const next = (dir) => tabs[(i + dir + tabs.length) % tabs.length];
        const target = e.key === 'ArrowLeft' ? next(-1)
          : e.key === 'ArrowRight' ? next(1)
          : e.key === 'Home' ? tabs[0]
          : tabs[tabs.length - 1];
        target.focus();
        activate(target.getAttribute('aria-controls'));
      });
    });
    const selected = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
    activate(selected.getAttribute('aria-controls'));
  });

  // Accordion (single-open)
  qa('[data-accordion]').forEach((root) => {
    const items = qa('.acc-item', root);
    const open = (item) => {
      items.forEach((it) => {
        const btn = q('.acc-btn', it);
        const isOpen = it === item;
        it.classList.toggle('is-open', isOpen);
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    };
    items.forEach((it) => {
      const btn = q('.acc-btn', it);
      btn.addEventListener('click', () => {
        const isOpen = it.classList.contains('is-open');
        open(isOpen ? null : it);
      });
    });
    open(items[0] || null);
  });

  // Carousel (simple translate)
  qa('[data-carousel]').forEach((root) => {
    const track = q('[data-carousel-track]', root);
    const slides = qa('[data-carousel-slide]', root);
    const prev = q('[data-carousel-prev]', root);
    const next = q('[data-carousel-next]', root);
    const status = q('[data-carousel-status]', root);
    let index = 0;

    const perView = () => {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 980) return 2;
      return 3;
    };
    const maxIndex = () => Math.max(0, slides.length - perView());
    const update = () => {
      index = Math.min(Math.max(index, 0), maxIndex());
      const slide = slides[0];
      const gap = 16; // 1rem
      const slideW = slide.getBoundingClientRect().width;
      const x = (slideW + gap) * index;
      track.style.transform = `translateX(${-x}px)`;
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === maxIndex();
      if (status) status.textContent = `${index + 1} / ${maxIndex() + 1}`;
    };
    prev && prev.addEventListener('click', () => { index -= 1; update(); });
    next && next.addEventListener('click', () => { index += 1; update(); });
    window.addEventListener('resize', update);
    update();
  });

  // Scroll reveal
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    qa('.reveal').forEach((el) => io.observe(el));
  } else {
    qa('.reveal').forEach((el) => el.classList.add('is-in'));
  }
})();

