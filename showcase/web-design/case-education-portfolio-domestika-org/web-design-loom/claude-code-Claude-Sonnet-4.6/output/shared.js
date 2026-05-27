/* shared.js — CreativeHub interactive behaviours */

// ---- Countdown Banner ----
function initCountdown() {
  const banner = document.getElementById('promo-banner');
  if (!banner) return;
  const dismiss = banner.querySelector('.dismiss');
  if (dismiss) dismiss.addEventListener('click', () => { banner.remove(); });

  const end = Date.now() + (2 * 60 * 60 + 37 * 60 + 14) * 1000; // 2h 37m 14s from load
  const els = { h: document.getElementById('cd-h'), m: document.getElementById('cd-m'), s: document.getElementById('cd-s') };
  if (!els.h) return;
  function tick() {
    const left = Math.max(0, end - Date.now());
    const h = Math.floor(left / 3600000);
    const m = Math.floor((left % 3600000) / 60000);
    const s = Math.floor((left % 60000) / 1000);
    els.h.textContent = String(h).padStart(2, '0');
    els.m.textContent = String(m).padStart(2, '0');
    els.s.textContent = String(s).padStart(2, '0');
    if (left > 0) setTimeout(tick, 1000);
  }
  tick();
}

// ---- Generic Carousel ----
function initCarousel(carouselEl) {
  const track = carouselEl.querySelector('.carousel-track');
  if (!track) return;
  const prevBtn = carouselEl.querySelector('.carousel-btn.prev');
  const nextBtn = carouselEl.querySelector('.carousel-btn.next');
  const dotsContainer = carouselEl.querySelector('.carousel-dots');
  const items = track.children;
  if (!items.length) return;

  let currentIndex = 0;
  let visibleCount = 1;

  function getVisibleCount() {
    const w = carouselEl.offsetWidth;
    if (w >= 1100) return parseInt(carouselEl.dataset.visible || 4);
    if (w >= 800) return Math.min(3, parseInt(carouselEl.dataset.visible || 3));
    if (w >= 520) return Math.min(2, parseInt(carouselEl.dataset.visible || 2));
    return 1;
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const count = Math.ceil(items.length / visibleCount);
    for (let i = 0; i < count; i++) {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', `Slide ${i + 1}`);
      btn.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(btn);
    }
  }

  function update() {
    visibleCount = getVisibleCount();
    const gap = 20;
    const totalGapWidth = gap * (visibleCount - 1);
    const itemWidth = (track.offsetWidth - totalGapWidth) / visibleCount;
    const maxIndex = Math.max(0, items.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);

    const offset = currentIndex * (itemWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    track.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';

    Array.from(items).forEach(item => {
      item.style.minWidth = itemWidth + 'px';
      item.style.maxWidth = itemWidth + 'px';
    });

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;

    // update dots
    if (dotsContainer) {
      const dotBtns = dotsContainer.querySelectorAll('button');
      const dotIndex = Math.floor(currentIndex / visibleCount);
      dotBtns.forEach((d, i) => d.classList.toggle('active', i === dotIndex));
    }
  }

  function goTo(dotIndex) {
    currentIndex = dotIndex * visibleCount;
    update();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { currentIndex = Math.max(0, currentIndex - visibleCount); update(); });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    const maxIndex = Math.max(0, items.length - visibleCount);
    currentIndex = Math.min(currentIndex + visibleCount, maxIndex);
    update();
  });

  buildDots();
  update();
  window.addEventListener('resize', () => { buildDots(); update(); });
}

// ---- Hero Specialization Carousel (full-width slide) ----
function initHeroCarousel(el) {
  if (!el) return;
  const slides = el.querySelectorAll('.hero-slide');
  const prevBtn = el.querySelector('.carousel-btn.prev');
  const nextBtn = el.querySelector('.carousel-btn.next');
  const dotsContainer = el.querySelector('.carousel-dots');
  let current = 0;

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Slide ${i+1}`);
      b.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(b);
    });
  }

  function goTo(idx) {
    slides[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dotsContainer) {
      dotsContainer.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === current));
    }
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-advance
  setInterval(() => goTo(current + 1), 5000);

  buildDots();
  goTo(0);
}

// ---- FAQ Accordion ----
function initAccordion(container) {
  if (!container) return;
  container.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const body = item.querySelector('.faq-answer');
    if (!btn || !body) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      container.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
        i.querySelector('.faq-question .faq-icon').textContent = '+';
      });
      if (!open) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        btn.querySelector('.faq-icon').textContent = '−';
      }
    });
  });
}

// ---- Pricing Toggle ----
function initPricingToggle() {
  const yearly = document.getElementById('pricing-yearly');
  const monthly = document.getElementById('pricing-monthly');
  const btnYearly = document.getElementById('tab-yearly');
  const btnMonthly = document.getElementById('tab-monthly');
  if (!yearly || !monthly) return;

  function show(plan) {
    if (plan === 'yearly') {
      yearly.style.display = '';
      monthly.style.display = 'none';
      btnYearly.classList.add('active');
      btnMonthly.classList.remove('active');
    } else {
      yearly.style.display = 'none';
      monthly.style.display = '';
      btnYearly.classList.remove('active');
      btnMonthly.classList.add('active');
    }
  }

  if (btnYearly) btnYearly.addEventListener('click', () => show('yearly'));
  if (btnMonthly) btnMonthly.addEventListener('click', () => show('monthly'));
  show('yearly');
}

// ---- Sidebar Category Filter ----
function initSidebarFilter() {
  const sidebar = document.querySelector('.sidebar-nav');
  const rows = document.querySelectorAll('.category-row');
  if (!sidebar || !rows.length) return;

  sidebar.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      sidebar.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const filter = link.dataset.filter;
      rows.forEach(row => {
        if (!filter || filter === 'all' || row.dataset.category === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

// ---- Projects Sort/Filter ----
function initProjectsFilter() {
  const gallery = document.getElementById('projects-gallery');
  if (!gallery) return;
  const cards = Array.from(gallery.querySelectorAll('.project-card'));

  document.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-sort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sort = btn.dataset.sort;
      const sorted = [...cards].sort((a, b) => {
        if (sort === 'liked') return parseInt(b.dataset.likes || 0) - parseInt(a.dataset.likes || 0);
        if (sort === 'viewed') return parseInt(b.dataset.views || 0) - parseInt(a.dataset.views || 0);
        return 0; // featured / default
      });
      sorted.forEach(c => gallery.appendChild(c));
    });
  });

  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(c => {
        if (!filter || filter === 'all' || c.dataset.field === filter) {
          c.style.display = '';
        } else {
          c.style.display = 'none';
        }
      });
    });
  });
}

// ---- Password Toggle ----
function initPasswordToggle() {
  const toggle = document.getElementById('pw-toggle');
  const field = document.getElementById('password');
  if (!toggle || !field) return;
  toggle.addEventListener('click', () => {
    const visible = field.type === 'text';
    field.type = visible ? 'password' : 'text';
    toggle.textContent = visible ? '👁' : '🙈';
  });
}

// ---- Footer Accordion (mobile) ----
function initFooterAccordion() {
  document.querySelectorAll('.footer-col-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      const links = col.querySelector('.footer-links');
      const open = col.classList.contains('open');
      col.classList.toggle('open', !open);
      if (links) links.style.maxHeight = open ? '0' : links.scrollHeight + 'px';
    });
  });
}

// ---- Init all on DOMContentLoaded ----
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initHeroCarousel(document.getElementById('hero-carousel'));
  document.querySelectorAll('.carousel-wrap[data-carousel]').forEach(initCarousel);
  initAccordion(document.getElementById('faq-accordion'));
  initPricingToggle();
  initSidebarFilter();
  initProjectsFilter();
  initPasswordToggle();
  initFooterAccordion();
});
