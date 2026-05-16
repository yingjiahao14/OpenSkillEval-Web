/* ============================================
   LearnForge — Global Interactions
   ============================================ */

(function() {
  'use strict';

  /* ---------- Mobile Nav ---------- */
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  /* ---------- Hero Tabs ---------- */
  function initHeroTabs() {
    const tabs = document.querySelectorAll('.hero-tab');
    const contents = document.querySelectorAll('.hero-preview-content');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        contents.forEach(c => {
          c.classList.toggle('active', c.dataset.tab === target);
        });
      });
    });
  }
  initHeroTabs();

  /* ---------- Why Choose Us Tabs ---------- */
  function initWhyTabs() {
    const tabs = document.querySelectorAll('.why-tab');
    const contents = document.querySelectorAll('.why-content');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        contents.forEach(c => {
          c.classList.toggle('active', c.dataset.tab === target);
        });
      });
    });
  }
  initWhyTabs();

  /* ---------- FAQ Accordion ---------- */
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all siblings if you want accordion behavior (single open)
        const parent = item.closest('.faq-list');
        if (parent) {
          parent.querySelectorAll('.faq-item').forEach(sib => {
            if (sib !== item) sib.classList.remove('open');
          });
        }
        item.classList.toggle('open', !isOpen);
      });
    });
  }
  initFAQ();

  /* ---------- Demo Accordion ---------- */
  function initDemoAccordion() {
    const accordions = document.querySelectorAll('.demo-accordion');
    if (!accordions.length) return;

    accordions.forEach(acc => {
      const header = acc.querySelector('.demo-header');
      if (!header) return;
      header.addEventListener('click', () => {
        acc.classList.toggle('open');
      });
    });
  }
  initDemoAccordion();

  /* ---------- Testimonials Carousel ---------- */
  function initCarousels() {
    document.querySelectorAll('.testimonials-wrap').forEach(wrap => {
      const track = wrap.querySelector('.testimonials-track');
      const prevBtn = wrap.querySelector('.carousel-prev');
      const nextBtn = wrap.querySelector('.carousel-next');
      const dots = wrap.querySelectorAll('.carousel-dot');
      const cards = wrap.querySelectorAll('.testimonial-card');
      if (!track || !cards.length) return;

      let current = 0;
      const total = cards.length;

      function getPerPage() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
      }

      function update() {
        const perPage = getPerPage();
        const maxIndex = Math.max(0, total - perPage);
        current = Math.min(current, maxIndex);
        const percent = current * (100 / perPage);
        track.style.transform = `translateX(-${percent}%)`;

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          current = Math.max(0, current - 1);
          update();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const perPage = getPerPage();
          const maxIndex = Math.max(0, total - perPage);
          current = Math.min(maxIndex, current + 1);
          update();
        });
      }

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          current = i;
          update();
        });
      });

      window.addEventListener('resize', update);
      update();
    });
  }
  initCarousels();

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('[data-reveal]');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }
  initScrollReveal();

})();
