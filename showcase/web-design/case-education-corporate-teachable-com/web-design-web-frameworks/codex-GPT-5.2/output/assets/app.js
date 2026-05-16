function ready(fn){
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
  else fn();
}

function clamp(n, min, max){
  return Math.max(min, Math.min(max, n));
}

ready(() => {
  // Mobile nav
  const menuBtn = document.querySelector('[data-menu-btn]');
  const navLinks = document.querySelector('[data-nav-links]');
  if(menuBtn && navLinks){
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.getAttribute('data-open') === 'true';
      navLinks.setAttribute('data-open', String(!isOpen));
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // Scroll reveal
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  if(revealEls.length){
    const io = new IntersectionObserver((entries) => {
      for(const e of entries){
        if(e.isIntersecting){
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    }, {threshold: 0.12});
    revealEls.forEach(el => io.observe(el));
  }

  // Generic tabsets
  document.querySelectorAll('[data-tabset]').forEach((tabset) => {
    const tabs = Array.from(tabset.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabset.querySelectorAll('[role="tabpanel"]'));
    const byId = new Map(panels.map(p => [p.id, p]));

    function select(tab){
      const controls = tab.getAttribute('aria-controls');
      tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
      panels.forEach(p => {
        const isActive = p.id === controls;
        p.hidden = !isActive;
      });
    }

    tabs.forEach((t) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        if(e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        const idx = tabs.indexOf(t);
        const nextIdx = e.key === 'ArrowRight' ? idx + 1 : idx - 1;
        const next = tabs[clamp(nextIdx, 0, tabs.length - 1)];
        next.focus();
        select(next);
      });
    });

    // Ensure initial state
    const initial = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
    if(initial) select(initial);
  });

  // Accordions
  document.querySelectorAll('[data-accordion]').forEach((acc) => {
    const items = Array.from(acc.querySelectorAll('[data-acc-item]'));
    items.forEach((item) => {
      const btn = item.querySelector('[data-acc-btn]');
      const panel = item.querySelector('[data-acc-panel]');
      if(!btn || !panel) return;

      btn.addEventListener('click', () => {
        const isOpen = item.getAttribute('data-open') === 'true';
        // close others for a clean experience
        items.forEach(i => i.setAttribute('data-open', 'false'));
        item.setAttribute('data-open', String(!isOpen));
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  });

  // Carousels
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('[data-carousel-track]');
    const slides = Array.from(root.querySelectorAll('[data-slide]'));
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    const dots = Array.from(root.querySelectorAll('[data-dot]'));
    if(!track || !slides.length) return;

    let index = 0;
    let timer = null;
    const autoplay = root.getAttribute('data-autoplay') !== 'false';
    const interval = Number(root.getAttribute('data-interval') || '6500');

    function render(){
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
    }

    function go(i){
      index = (i + slides.length) % slides.length;
      render();
    }

    function start(){
      if(!autoplay) return;
      stop();
      timer = window.setInterval(() => go(index + 1), interval);
    }

    function stop(){
      if(timer) window.clearInterval(timer);
      timer = null;
    }

    prev?.addEventListener('click', () => { stop(); go(index - 1); start(); });
    next?.addEventListener('click', () => { stop(); go(index + 1); start(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { stop(); go(i); start(); }));

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    render();
    start();
  });
});

