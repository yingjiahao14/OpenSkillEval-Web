// LearnForge — Global JavaScript

// ── Mobile Menu ──────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  const close = document.querySelector('.mobile-menu-close');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => menu.classList.add('open'));
  if (close) close.addEventListener('click', () => menu.classList.remove('open'));
}

// ── FAQ Accordions ────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(open => open.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── Testimonial Carousels ─────────────────────────────────
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    if (!track || cards.length === 0) return;

    let current = 0;
    const cardWidth = () => cards[0].offsetWidth + 24; // width + gap
    const visibleCount = () => Math.max(1, Math.floor(carousel.offsetWidth / cardWidth()));
    const maxIndex = () => Math.max(0, cards.length - visibleCount());

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIndex()));
      track.style.transform = `translateX(-${current * cardWidth()}px)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    goTo(0);

    // Auto-advance
    let autoplay = setInterval(() => goTo(current + 1 > maxIndex() ? 0 : current + 1), 4500);
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1 > maxIndex() ? 0 : current + 1), 4500);
    });
  });
}

// ── Why Choose Us Tabs ────────────────────────────────────
function initWhyTabs() {
  document.querySelectorAll('.why-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.why-tab');
    const panels = tabGroup.closest('.why-choose-section')?.querySelectorAll('.why-panel') || [];
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });
}

// ── Hero Tab Switcher ─────────────────────────────────────
function initHeroTabs() {
  const tabs = document.querySelectorAll('.hero-tab');
  const panels = document.querySelectorAll('.hero-preview-panel');
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      if (panels[i]) panels[i].classList.add('active');
    });
  });
}

// ── Demo Accordion ────────────────────────────────────────
function initDemoAccordion() {
  document.querySelectorAll('.demo-header').forEach(header => {
    const body = header.nextElementSibling;
    const toggleBtn = header.querySelector('.demo-toggle');
    if (!body) return;
    header.addEventListener('click', () => {
      const isOpen = body.classList.contains('open');
      body.classList.toggle('open', !isOpen);
      if (toggleBtn) toggleBtn.textContent = isOpen ? '+' : '−';
    });
    // Open by default
    body.classList.add('open');
    if (toggleBtn) toggleBtn.textContent = '−';
  });
}

// ── Scroll Animations ─────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFAQ();
  initCarousels();
  initWhyTabs();
  initHeroTabs();
  initDemoAccordion();
  initScrollAnimations();
});
