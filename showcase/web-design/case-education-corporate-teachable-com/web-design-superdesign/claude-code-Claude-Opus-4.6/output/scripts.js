// ═══════════════════════════════════════════════════════════════
// LearnForge — Interactive behaviors
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroTabs();
  initWhyChooseTabs();
  initCarousels();
  initFAQ();
  initScrollAnimations();
  initMobileNav();
});

// ───── Navbar scroll effect ─────
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}

// ───── Mobile nav toggle ─────
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const isOpen = mobileNav.classList.contains('open');
    hamburger.innerHTML = isOpen
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// ───── Hero creator/student tabs ─────
function initHeroTabs() {
  const tabs = document.querySelectorAll('.hero-tab');
  const panels = document.querySelectorAll('.preview-panel');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

// ───── "Why choose us" feature tabs ─────
function initWhyChooseTabs() {
  const tabs = document.querySelectorAll('.why-tab');
  const panels = document.querySelectorAll('.why-panel');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.why;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

// ───── Testimonial carousels ─────
function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const slides = track ? track.querySelectorAll('.carousel-slide') : [];
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const dotsContainer = container.querySelector('.carousel-dots');
    if (!track || slides.length === 0) return;

    let index = 0;
    const total = slides.length;

    // Build dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.classList.toggle('active', i === index);
        });
      }
    }
    function goTo(i) { index = (i + total) % total; update(); }
    function prev() { goTo(index - 1); }
    function next() { goTo(index + 1); }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Auto-advance
    let autoplay = setInterval(next, 7000);
    container.addEventListener('mouseenter', () => clearInterval(autoplay));
    container.addEventListener('mouseleave', () => { autoplay = setInterval(next, 7000); });
  });
}

// ───── FAQ accordion ─────
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close siblings in same list
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.faq-item.open').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const a = other.querySelector('.faq-answer');
            if (a) a.style.maxHeight = '0';
          }
        });
      }
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ───── Scroll-triggered animations ─────
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}
