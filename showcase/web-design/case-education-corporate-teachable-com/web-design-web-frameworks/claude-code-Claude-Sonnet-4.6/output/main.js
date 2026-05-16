/* LearnForge — Shared JS */
(function () {
  'use strict';

  // ─── Nav scroll shadow ───
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ─── Mobile nav toggle ───
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      if (navCta) navCta.classList.toggle('open', open);
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        if (navCta) navCta.classList.remove('open');
      }
    });
  }

  // ─── Hero tab switcher ───
  const heroTabs = document.querySelectorAll('.hero-tab');
  const heroPreviews = document.querySelectorAll('.hero-preview');
  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      heroTabs.forEach(t => t.classList.remove('active'));
      heroPreviews.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // ─── Why Choose Us tabs ───
  const whyTabs = document.querySelectorAll('.why-tab');
  const whyPanels = document.querySelectorAll('.why-panel');
  whyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.panel;
      whyTabs.forEach(t => t.classList.remove('active'));
      whyPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // ─── FAQ Accordions ───
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ─── Testimonials Carousels ───
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const cards = wrapper.querySelectorAll('.testimonial-card');
    const dots = wrapper.querySelectorAll('.carousel-dot');
    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');
    if (!track || cards.length === 0) return;

    let current = 0;
    const visibleCount = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    const maxIndex = () => Math.max(0, cards.length - visibleCount());

    function update() {
      const idx = Math.min(current, maxIndex());
      const cardWidth = cards[0].getBoundingClientRect().width + 24;
      track.style.transform = `translateX(-${idx * cardWidth}px)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    function next() { current = current >= maxIndex() ? 0 : current + 1; update(); }
    function prev() { current = current <= 0 ? maxIndex() : current - 1; update(); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    dots.forEach((dot, i) => dot.addEventListener('click', () => { current = i; update(); }));

    // Auto-advance
    let timer = setInterval(next, 5000);
    wrapper.addEventListener('mouseenter', () => clearInterval(timer));
    wrapper.addEventListener('mouseleave', () => { timer = setInterval(next, 5000); });

    window.addEventListener('resize', update, { passive: true });
    update();
  });

  // ─── Product Demo Accordion ───
  document.querySelectorAll('.demo-toggle').forEach(toggle => {
    const target = document.getElementById(toggle.dataset.target);
    if (!target) return;
    toggle.addEventListener('click', () => {
      const open = target.classList.toggle('open');
      toggle.classList.toggle('open', open);
      target.style.maxHeight = open ? target.scrollHeight + 'px' : '0';
      toggle.querySelector('.demo-chevron').textContent = open ? '▲' : '▼';
    });
  });

  // ─── Scroll reveal ───
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();
