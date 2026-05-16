/* LearnForge — Shared JavaScript */

// ─── NAV SCROLL ───
(function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.08)' : '';
  });
})();

// ─── HAMBURGER ───
(function() {
  const btn = document.querySelector('.nav-hamburger');
  const mobile = document.querySelector('.nav-mobile');
  if (!btn || !mobile) return;
  btn.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
})();

// ─── FAQ ACCORDION ───
function initFAQ(selector) {
  const items = document.querySelectorAll(selector || '.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ─── HERO TABS ───
function initHeroTabs() {
  const tabs = document.querySelectorAll('.hero-tab');
  const panels = document.querySelectorAll('.hero-preview-content');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('preview-' + target)?.classList.add('active');
    });
  });
}

// ─── WHY CHOOSE TABS ───
function initWhyTabs() {
  const tabs = document.querySelectorAll('.why-tab');
  const panels = document.querySelectorAll('.why-panel');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('why-' + target)?.classList.add('active');
    });
  });
}

// ─── TESTIMONIAL CAROUSEL ───
function initCarousel(wrapSelector) {
  const wrap = document.querySelector(wrapSelector || '.testimonials-carousel');
  if (!wrap) return;
  const track = wrap.querySelector('.testimonials-track');
  const cards = wrap.querySelectorAll('.testimonial-card');
  const dotsWrap = wrap.querySelector('.carousel-dots');
  const prev = wrap.querySelector('.carousel-prev');
  const next = wrap.querySelector('.carousel-next');
  if (!cards.length) return;

  // On mobile show 1, on tablet 2, on desktop 3
  let perPage = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  let current = 0;
  let totalPages = () => Math.ceil(cards.length / perPage());

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const d = document.createElement('button');
      d.className = 'carousel-dot' + (i === current ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function show(page) {
    current = Math.max(0, Math.min(page, totalPages() - 1));
    const pp = perPage();
    cards.forEach((c, i) => {
      const inRange = i >= current * pp && i < (current + 1) * pp;
      c.style.display = inRange ? 'flex' : 'none';
    });
    dotsWrap?.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(page) { show(page); }

  prev?.addEventListener('click', () => goTo(current - 1));
  next?.addEventListener('click', () => goTo(current + 1));

  buildDots();
  show(0);
  window.addEventListener('resize', () => { buildDots(); show(0); });
}

// ─── DEMO ACCORDION ───
function initDemo() {
  const header = document.querySelector('.demo-header');
  const content = document.querySelector('.demo-content');
  const toggle = document.querySelector('.demo-toggle');
  if (!header) return;
  header.addEventListener('click', () => {
    const open = content.classList.toggle('open');
    if (toggle) toggle.style.transform = open ? 'rotate(45deg)' : '';
  });
}

// ─── SCROLL REVEAL ───
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initHeroTabs();
  initWhyTabs();
  initCarousel();
  initDemo();
  initReveal();
});
