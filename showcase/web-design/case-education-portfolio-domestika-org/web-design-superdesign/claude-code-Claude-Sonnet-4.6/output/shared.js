// CreativeHub — Shared JS

// ─── Promo Banner Countdown ───
function initCountdown() {
  const el = document.getElementById('countdown-banner');
  if (!el) return;
  const closeBtn = el.querySelector('.close-btn');
  if (closeBtn) closeBtn.addEventListener('click', () => { el.style.display = 'none'; });

  let end = Date.now() + 3 * 60 * 60 * 1000 + 27 * 60 * 1000 + 14 * 1000;
  function tick() {
    const diff = Math.max(0, end - Date.now());
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    const hEl = el.querySelector('.cd-h'); if (hEl) hEl.textContent = h;
    const mEl = el.querySelector('.cd-m'); if (mEl) mEl.textContent = m;
    const sEl = el.querySelector('.cd-s'); if (sEl) sEl.textContent = s;
  }
  tick();
  setInterval(tick, 1000);
}

// ─── Mobile Nav ───
function initMobileNav() {
  const btn = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-nav');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

// ─── Carousel ───
function initCarousel(id, opts = {}) {
  const wrap = document.getElementById(id);
  if (!wrap) return;
  const track = wrap.querySelector('.carousel-track');
  const outer = wrap.querySelector('.carousel-track-outer');
  const prevBtn = wrap.querySelector('.carousel-arrow.prev');
  const nextBtn = wrap.querySelector('.carousel-arrow.next');
  const dotsWrap = wrap.querySelector('.carousel-dots');
  if (!track) return;

  const { visibleCount = 4, gap = 20 } = opts;
  let current = 0;
  const items = track.querySelectorAll(':scope > *');
  const total = items.length;

  function getVisible() {
    const w = outer ? outer.offsetWidth : 800;
    if (w < 480) return 1;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    return visibleCount;
  }

  function itemWidth() {
    const vis = getVisible();
    const outerW = outer ? outer.offsetWidth : 800;
    return (outerW - gap * (vis - 1)) / vis;
  }

  function setWidths() {
    const w = itemWidth();
    items.forEach(el => { el.style.flex = `0 0 ${w}px`; el.style.width = `${w}px`; });
  }

  function maxIndex() { return Math.max(0, total - getVisible()); }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i <= maxIndex(); i++) {
      const d = document.createElement('button');
      d.className = 'carousel-dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(idx) {
    current = Math.min(Math.max(0, idx), maxIndex());
    const w = itemWidth();
    track.style.transform = `translateX(-${current * (w + gap)}px)`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= maxIndex();
    updateDots();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  function init() { setWidths(); buildDots(); goTo(0); }
  init();
  window.addEventListener('resize', () => { setWidths(); goTo(Math.min(current, maxIndex())); buildDots(); });
}

// ─── Footer Accordion ───
function initFooterAccordions() {
  document.querySelectorAll('.footer-acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      if (!body) return;
      body.classList.toggle('open');
      btn.querySelector('.acc-icon').textContent = body.classList.contains('open') ? '−' : '+';
    });
  });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMobileNav();
  initFooterAccordions();
});
