/* RedRoom Fitness — site interactions (no build step) */

function qs(sel, root = document){ return root.querySelector(sel); }
function qsa(sel, root = document){ return Array.from(root.querySelectorAll(sel)); }

function initMobileNav(){
  const toggle = qs('[data-mobile-toggle]');
  const links = qs('[data-nav-links]');
  if(!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.getAttribute('data-open') === 'true';
    links.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });
}

function initCountrySelector(){
  const btn = qs('[data-country-button]');
  const menu = qs('[data-country-menu]');
  if(!btn || !menu) return;

  function close(){
    menu.setAttribute('data-open','false');
    btn.setAttribute('aria-expanded','false');
  }
  function open(){
    menu.setAttribute('data-open','true');
    btn.setAttribute('aria-expanded','true');
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = menu.getAttribute('data-open') === 'true';
    (isOpen ? close : open)();
  });

  qsa('button[data-country-option]', menu).forEach((option) => {
    option.addEventListener('click', () => {
      const label = option.getAttribute('data-country-option');
      const span = qs('[data-country-label]', btn);
      if(span && label) span.textContent = label;
      close();
    });
  });

  document.addEventListener('click', (e) => {
    if(!menu.contains(e.target) && !btn.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') close();
  });
}

function initCarousel(){
  const root = qs('[data-carousel]');
  if(!root) return;

  const track = qs('[data-carousel-track]', root);
  const slides = qsa('[data-slide]', root);
  const prev = qs('[data-carousel-prev]', root);
  const next = qs('[data-carousel-next]', root);
  const label = qs('[data-carousel-label]', root);
  const dots = qsa('[data-dot]', root);

  if(!track || slides.length === 0) return;

  let idx = 0;
  let startX = null;

  function render(){
    track.style.transform = `translateX(${-idx * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    const name = slides[idx]?.getAttribute('data-caption') || `Slide ${idx+1}`;
    if(label) label.textContent = name;
  }

  function go(n){
    idx = (n + slides.length) % slides.length;
    render();
  }

  prev?.addEventListener('click', () => go(idx - 1));
  next?.addEventListener('click', () => go(idx + 1));

  // Touch / pointer swipe
  root.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
  });
  root.addEventListener('pointerup', (e) => {
    if(startX == null) return;
    const dx = e.clientX - startX;
    startX = null;
    if(Math.abs(dx) < 40) return;
    if(dx < 0) go(idx + 1);
    else go(idx - 1);
  });

  render();
}

function initWorkoutToggle(){
  const root = qs('[data-workout-toggle]');
  if(!root) return;
  const buttons = qsa('button[data-toggle]', root);
  const panel = qs('[data-toggle-panel]');
  if(buttons.length === 0 || !panel) return;

  const floorHtml = panel.getAttribute('data-floor') || '';
  const treadHtml = panel.getAttribute('data-treadmill') || '';
  let current = 'floor';

  function setState(next){
    current = next;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-toggle') === next)));
    panel.setAttribute('data-state','exiting');
    window.setTimeout(() => {
      panel.innerHTML = next === 'floor' ? floorHtml : treadHtml;
      panel.setAttribute('data-state','entering');
      window.setTimeout(() => panel.removeAttribute('data-state'), 40);
    }, 170);
  }

  buttons.forEach((b) => {
    b.addEventListener('click', () => {
      const next = b.getAttribute('data-toggle');
      if(!next || next === current) return;
      setState(next);
    });
  });

  setState('floor');
}

function initInstructorsFilter(){
  const select = qs('[data-instructor-filter]');
  const cards = qsa('[data-instructor-card]');
  if(!select || cards.length === 0) return;

  function render(){
    const value = select.value;
    cards.forEach((card) => {
      const loc = card.getAttribute('data-location') || '';
      const show = value === 'all' || loc === value;
      card.hidden = !show;
    });
  }
  select.addEventListener('change', render);
  render();
}

function initAccordion(){
  const root = qs('[data-accordion]');
  if(!root) return;
  const items = qsa('[data-acc-item]', root);
  if(items.length === 0) return;

  function closeAll(except){
    items.forEach((item) => {
      if(item === except) return;
      item.setAttribute('data-open','false');
      const btn = qs('button[data-acc-button]', item);
      btn?.setAttribute('aria-expanded','false');
    });
  }

  items.forEach((item) => {
    const btn = qs('button[data-acc-button]', item);
    if(!btn) return;
    btn.addEventListener('click', () => {
      const open = item.getAttribute('data-open') === 'true';
      closeAll(item);
      item.setAttribute('data-open', String(!open));
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  // start collapsed
  closeAll();
}

function initNewsletter(){
  qsa('form[data-newsletter]').forEach((form) => {
    const input = qs('input[type="email"]', form);
    const help = qs('[data-newsletter-help]', form);
    const ok = qs('[data-newsletter-ok]', form);
    if(!input || !help || !ok) return;

    function validate(email){
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setState(state, msg){
      help.textContent = '';
      ok.textContent = '';
      help.classList.remove('error');
      ok.classList.remove('ok');
      if(state === 'error'){
        help.textContent = msg;
        help.classList.add('error');
      }
      if(state === 'ok'){
        ok.textContent = msg;
        ok.classList.add('ok');
      }
    }

    input.addEventListener('input', () => {
      const v = input.value.trim();
      if(!v) return setState('error','');
      if(!validate(v)) return setState('error','Enter a valid email (e.g. name@example.com).');
      return setState('ok','Looks good.');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if(!validate(v)){
        input.focus();
        return setState('error','Please enter a valid email to subscribe.');
      }
      form.reset();
      setState('ok','Subscribed — check your inbox for updates.');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCountrySelector();
  initCarousel();
  initWorkoutToggle();
  initInstructorsFilter();
  initAccordion();
  initNewsletter();
});

