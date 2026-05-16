/* ===== LearnForge — Shared Interactions ===== */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTabs();
  initAccordions();
  initCarousels();
  initScrollAnimation();
  initDemoAccordion();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });
}

/* Tab Switching (Hero + Why Choose Us) */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('[data-tab-btn]');
    const panels = tabGroup.querySelectorAll('[data-tab-panel]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab-btn');
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-tab-panel') === target);
        });
      });
    });
  });
}

/* Accordions (FAQ + Product Demo) */
function initAccordions() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

/* Product Demo Accordion */
function initDemoAccordion() {
  const trigger = document.querySelector('.demo-trigger');
  const content = document.querySelector('.demo-content');
  if (!trigger || !content) return;
  trigger.addEventListener('click', () => {
    content.classList.toggle('open');
    const icon = trigger.querySelector('.demo-trigger-icon');
    if (icon) icon.textContent = content.classList.contains('open') ? '−' : '+';
  });
}

/* Testimonial Carousels */
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');
    const cards = track.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    let index = 0;
    const total = cards.length;

    /* Build dots */
    if (dotsContainer) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(i) {
      index = ((i % total) + total) % total;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, di) => {
          d.classList.toggle('active', di === index);
        });
      }
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === total - 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

    /* Touch swipe */
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    track.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(index + (diff > 0 ? 1 : -1));
    });

    /* Init disabled state */
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn && total <= 1) nextBtn.disabled = true;
  });
}

/* Scroll Animation */
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* Highlight active nav link based on current page */
(function highlightNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === 'index.html' && (href === './' || href === '/' || href === 'index.html'))) {
      link.classList.add('active');
    }
  });
})();
