function qsa(root, sel){
  return Array.from((root || document).querySelectorAll(sel));
}

function initReveal(){
  const items = qsa(document, '[data-reveal]');
  if (!items.length) return;

  const obs = new IntersectionObserver((entries)=>{
    for (const e of entries){
      if (e.isIntersecting){
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    }
  }, {threshold: 0.12});

  for (const el of items){
    el.classList.add('reveal');
    obs.observe(el);
  }
}

function initTabs(){
  const tabsets = qsa(document, '[data-tabset]');
  for (const set of tabsets){
    const buttons = qsa(set, '[role="tab"]');
    const panels = qsa(set, '[role="tabpanel"]');
    if (!buttons.length || !panels.length) continue;

    const activate = (btn)=>{
      const target = btn.getAttribute('aria-controls');
      for (const b of buttons){
        const isActive = b === btn;
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        b.tabIndex = isActive ? 0 : -1;
      }
      for (const p of panels){
        const isActive = p.id === target;
        p.classList.toggle('is-active', isActive);
        p.hidden = !isActive;
      }
    };

    const firstSelected = buttons.find(b => b.getAttribute('aria-selected') === 'true') || buttons[0];
    activate(firstSelected);

    for (const b of buttons){
      b.addEventListener('click', ()=> activate(b));
      b.addEventListener('keydown', (e)=>{
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        const idx = buttons.indexOf(b);
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = buttons[(idx + dir + buttons.length) % buttons.length];
        next.focus();
        activate(next);
      });
    }
  }
}

function initAccordions(){
  const accordions = qsa(document, '[data-accordion]');
  for (const acc of accordions){
    const items = qsa(acc, '[data-acc-item]');
    const allowMultiple = acc.getAttribute('data-accordion') === 'multi';

    const closeItem = (item)=>{
      const btn = item.querySelector('[data-acc-trigger]');
      const panel = item.querySelector('[data-acc-panel]');
      item.classList.remove('is-open');
      if (btn) btn.setAttribute('aria-expanded','false');
      if (panel) panel.hidden = true;
    };

    const openItem = (item)=>{
      const btn = item.querySelector('[data-acc-trigger]');
      const panel = item.querySelector('[data-acc-panel]');
      item.classList.add('is-open');
      if (btn) btn.setAttribute('aria-expanded','true');
      if (panel) panel.hidden = false;

      // Resize max-height for smoother transition with dynamic content
      if (panel){
        panel.style.maxHeight = '0px';
        const h = panel.scrollHeight;
        panel.style.maxHeight = Math.min(360, h + 20) + 'px';
      }
    };

    for (const item of items){
      const btn = item.querySelector('[data-acc-trigger]');
      const panel = item.querySelector('[data-acc-panel]');
      if (!btn || !panel) continue;
      panel.hidden = true;
      btn.setAttribute('aria-expanded','false');

      btn.addEventListener('click', ()=>{
        const isOpen = item.classList.contains('is-open');
        if (!allowMultiple){
          for (const other of items){
            if (other !== item) closeItem(other);
          }
        }
        if (isOpen) closeItem(item);
        else openItem(item);
      });
    }
  }
}

function initCarousels(){
  const carousels = qsa(document, '[data-carousel]');
  for (const root of carousels){
    const track = root.querySelector('[data-carousel-track]');
    const slides = qsa(root, '[data-slide]');
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    const dotsbar = root.querySelector('[data-carousel-dots]');
    if (!track || !slides.length) continue;

    let index = 0;
    const autoplay = root.getAttribute('data-carousel') === 'autoplay';
    const intervalMs = Number(root.getAttribute('data-interval') || 6500);
    let timer = null;

    const render = ()=>{
      track.style.transform = `translateX(${-index * 100}%)`;
      if (dotsbar){
        for (const [i, btn] of qsa(dotsbar, 'button').entries()){
          btn.setAttribute('aria-current', i === index ? 'true' : 'false');
        }
      }
    };

    const go = (i)=>{
      index = (i + slides.length) % slides.length;
      render();
    };

    if (prev) prev.addEventListener('click', ()=> go(index - 1));
    if (next) next.addEventListener('click', ()=> go(index + 1));

    if (dotsbar){
      dotsbar.innerHTML = '';
      slides.forEach((_, i)=>{
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        b.addEventListener('click', ()=> go(i));
        dotsbar.appendChild(b);
      });
    }

    root.addEventListener('mouseenter', ()=>{ if (timer) { clearInterval(timer); timer=null; }});
    root.addEventListener('mouseleave', ()=>{ if (autoplay) start(); });

    const start = ()=>{
      if (!autoplay) return;
      if (timer) return;
      timer = setInterval(()=> go(index + 1), intervalMs);
    };

    go(0);
    start();
  }
}

function initNavActive(){
  const page = document.documentElement.getAttribute('data-page');
  if (!page) return;
  for (const a of qsa(document, '[data-nav] a')){
    if (a.getAttribute('data-page') === page){
      a.setAttribute('aria-current', 'page');
    }
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  initNavActive();
  initTabs();
  initAccordions();
  initCarousels();
  initReveal();
});

