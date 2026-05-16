/* LearnForge — Shared JS */

// ─── MOBILE NAV ───
function initMobileNav() {
  const hamburger = document.querySelectorAll('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!hamburger.length || !mobileNav) return;
  hamburger.forEach(btn => {
    btn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });
}

// ─── HERO TAB SWITCH ───
function initHeroTabs() {
  const tabs = document.querySelectorAll('.hero-tab');
  const screens = document.querySelectorAll('.hero-screen');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      screens.forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

// ─── WHY CHOOSE TABS ───
function initWhyTabs() {
  const tabs = document.querySelectorAll('.why-tab');
  const contents = document.querySelectorAll('.why-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

// ─── FAQ ACCORDION ───
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ─── CAROUSEL ───
function initCarousel(wrapper) {
  const track = wrapper.querySelector('.carousel-track');
  const cards = track.querySelectorAll('.testimonial-card');
  const prevBtn = wrapper.querySelector('.carousel-btn-prev');
  const nextBtn = wrapper.querySelector('.carousel-btn-next');
  const dotsContainer = wrapper.querySelector('.carousel-dots');
  if (!track || !cards.length) return;

  let current = 0;
  const total = cards.length;

  // Build dots
  if (dotsContainer) {
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function getVisible() {
    const w = wrapper.offsetWidth;
    if (w < 600) return 1;
    if (w < 1000) return 2;
    return 3;
  }

  function goTo(idx) {
    const vis = getVisible();
    const maxIdx = Math.max(0, total - vis);
    current = Math.min(Math.max(idx, 0), maxIdx);
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * cardW}px)`;
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-play
  let timer = setInterval(() => {
    const vis = getVisible();
    const maxIdx = Math.max(0, total - vis);
    goTo(current >= maxIdx ? 0 : current + 1);
  }, 5000);

  wrapper.addEventListener('mouseenter', () => clearInterval(timer));
  wrapper.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
      const vis = getVisible();
      const maxIdx = Math.max(0, total - vis);
      goTo(current >= maxIdx ? 0 : current + 1);
    }, 5000);
  });

  window.addEventListener('resize', () => goTo(current));
}

function initAllCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(w => initCarousel(w));
}

// ─── DEMO ACCORDION ───
function initDemoAccordion() {
  document.querySelectorAll('.demo-accordion').forEach(acc => {
    const header = acc.querySelector('.demo-header');
    if (!header) return;
    header.addEventListener('click', () => acc.classList.toggle('open'));
  });
}

// ─── SCROLL ANIMATIONS ───
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll('.product-card, .feature-card, .stat-item, .step-card, .value-prop-card, .spotlight-card, .resource-card, .file-type-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 500ms ease, transform 500ms ease';
    observer.observe(el);
  });
}

// ─── ACTIVE NAV ───
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroTabs();
  initWhyTabs();
  initFAQ();
  initAllCarousels();
  initDemoAccordion();
  initScrollAnimations();
  setActiveNav();
});
