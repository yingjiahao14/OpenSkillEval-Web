/* LearnForge — Shared JavaScript */

// ---- Mobile Nav ----
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
  }

  // ---- Hero Tab Switch ----
  const heroTabs = document.querySelectorAll('.hero-tab');
  const heroPreviews = document.querySelectorAll('.hero-preview');
  heroTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      heroTabs.forEach(function (t) { t.classList.remove('active'); });
      heroPreviews.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  // ---- Why Choose Us Tabs ----
  const whyTabs = document.querySelectorAll('.why-tab');
  const whyPanels = document.querySelectorAll('.why-panel');
  whyTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      whyTabs.forEach(function (t) { t.classList.remove('active'); });
      whyPanels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;
    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(function (fi) {
        fi.classList.remove('open');
        const a = fi.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- Demo Toggle (product-demo accordion) ----
  const demoToggles = document.querySelectorAll('.demo-toggle');
  demoToggles.forEach(function (toggle) {
    const header = toggle.querySelector('.demo-toggle-header');
    const body = toggle.querySelector('.demo-body');
    if (!header || !body) return;
    header.addEventListener('click', function () {
      const isOpen = toggle.classList.contains('open');
      toggle.classList.toggle('open');
      body.style.maxHeight = isOpen ? null : body.scrollHeight + 'px';
    });
  });

  // ---- Testimonial Carousels ----
  document.querySelectorAll('.testimonials-wrapper').forEach(function (wrapper) {
    const track = wrapper.querySelector('.testimonials-track');
    const cards = wrapper.querySelectorAll('.testimonial-card');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');
    const dotsContainer = wrapper.querySelector('.carousel-dots');
    if (!track || !cards.length) return;

    let current = 0;
    const total = cards.length;

    function getVisible() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function getMax() {
      return Math.max(0, total - getVisible());
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const max = getMax();
      for (let i = 0; i <= max; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === current ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      const max = getMax();
      current = Math.max(0, Math.min(index, max));
      const cardWidth = cards[0].offsetWidth + 24; // gap
      track.style.transform = 'translateX(-' + (current * cardWidth) + 'px)';
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === current);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    buildDots();
    window.addEventListener('resize', function () {
      current = 0;
      buildDots();
      goTo(0);
    });
  });

  // ---- Scroll Fade-up Animations ----
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }
});
