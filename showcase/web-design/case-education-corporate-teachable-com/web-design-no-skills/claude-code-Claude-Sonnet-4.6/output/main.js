// LearnForge — Shared Interactive Components

// ── NAV MOBILE TOGGLE ──────────────────────────────
function initMobileNav() {
  const btn = document.querySelector('.nav-mobile-btn');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('mobile-open'));
}

// ── HERO TAB SWITCHER ──────────────────────────────
function initHeroTabs() {
  const btns = document.querySelectorAll('.hero-tab-btn');
  const panels = document.querySelectorAll('.hero-preview-panel');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.toggle('active', b === btn));
      panels.forEach(p => p.classList.toggle('active', p.dataset.tab === target));
    });
  });
}

// ── WHY CHOOSE US TABS ─────────────────────────────
function initWhyTabs() {
  const btns = document.querySelectorAll('.why-tab-btn');
  const panels = document.querySelectorAll('.why-tab-panel');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.toggle('active', b === btn));
      panels.forEach(p => p.classList.toggle('active', p.dataset.tab === target));
    });
  });
}

// ── FAQ ACCORDION ──────────────────────────────────
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── TESTIMONIALS CAROUSEL ──────────────────────────
function initCarousel(wrap) {
  const track = wrap.querySelector('.carousel-track');
  const prevBtn = wrap.querySelector('.carousel-btn.prev');
  const nextBtn = wrap.querySelector('.carousel-btn.next');
  const dots = wrap.querySelectorAll('.carousel-dot');
  const cards = track ? track.querySelectorAll('.testimonial-card') : [];

  if (!track || !cards.length) return;

  let current = 0;
  const maxIdx = cards.length - 1;

  function getVisibleCount() {
    return window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 1 : 2;
  }

  function getCardWidth() {
    return cards[0].offsetWidth + 24; // 24px gap
  }

  function goTo(idx) {
    const visible = getVisibleCount();
    const last = Math.max(0, cards.length - visible);
    current = Math.max(0, Math.min(idx, last));
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  window.addEventListener('resize', () => goTo(current));
  goTo(0);
}

function initAllCarousels() {
  document.querySelectorAll('.carousel-wrap').forEach(wrap => initCarousel(wrap));
}

// ── DEMO ACCORDION ─────────────────────────────────
function initDemoAccordion() {
  const acc = document.querySelector('.demo-accordion');
  if (!acc) return;
  const header = acc.querySelector('.demo-accordion-header');
  if (header) header.addEventListener('click', () => acc.classList.toggle('open'));
}

// ── SCROLL ANIMATIONS ──────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .product-card, .testimonial-card, .step-card, .resource-card, .spotlight-card').forEach(el => {
    observer.observe(el);
  });
}

// ── INIT ALL ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroTabs();
  initWhyTabs();
  initFaqAccordion();
  initAllCarousels();
  initDemoAccordion();
  initScrollAnimations();
});
