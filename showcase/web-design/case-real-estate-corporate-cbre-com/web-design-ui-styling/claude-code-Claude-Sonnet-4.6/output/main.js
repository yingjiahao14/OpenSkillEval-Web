// GlobalStone — Shared JavaScript

// ===========================
// Header scroll effect
// ===========================
(function() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

// ===========================
// Mobile navigation
// ===========================
(function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Mobile accordion
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.mobile-nav-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.mobile-nav-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ===========================
// Mega menu keyboard nav
// ===========================
(function() {
  document.querySelectorAll('.nav-item').forEach(item => {
    const link = item.querySelector('.nav-link');
    if (!link) return;
    link.addEventListener('click', (e) => {
      const hasMega = item.querySelector('.mega-menu');
      if (hasMega) {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      }
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!item.contains(e.target)) item.classList.remove('open');
    });
  });
})();

// ===========================
// What We Do tabs
// ===========================
(function() {
  const tabs = document.querySelectorAll('.wwd-tab');
  const panels = document.querySelectorAll('.wwd-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('wwd-' + target);
      if (panel) panel.classList.add('active');
    });
  });
})();

// ===========================
// Carousel
// ===========================
(function() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const dotsContainer = container.querySelector('.carousel-dots');
    if (!track || !slides.length) return;

    let current = 0;
    const perView = window.innerWidth < 768 ? 1 : 3;
    const total = Math.ceil(slides.length / perView);

    // Create dots
    if (dotsContainer) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, total - 1));
      const slideWidth = slides[0].offsetWidth + 24; // gap
      track.style.transform = `translateX(-${current * slideWidth * perView}px)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  });
})();

// ===========================
// Newsletter form
// ===========================
(function() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Subscribed!';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }
  });
})();
