/* LearnForge Corporate Website Interactions */

(function () {
  'use strict';

  // --- Hero tab switch ---
  function initHeroTabs() {
    const tabs = document.querySelectorAll('.hero-tab');
    const panels = document.querySelectorAll('.hero-preview-panel');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        panels.forEach((p) => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });
    });
  }

  // --- Why Choose Us tabs ---
  function initFeatureTabs() {
    const nav = document.querySelector('.tabs-nav');
    if (!nav) return;
    const pills = nav.querySelectorAll('.tab-pill');
    const contents = document.querySelectorAll('.tab-content');

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const target = pill.dataset.tab;
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        contents.forEach((c) => {
          c.classList.toggle('active', c.dataset.content === target);
        });
      });
    });
  }

  // --- FAQ Accordions ---
  function initAccordions() {
    document.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasOpen = item.classList.contains('open');

        // Close siblings if desired (single-open behavior)
        const parent = item.closest('.faq-list');
        if (parent && parent.dataset.single === 'true') {
          parent.querySelectorAll('.faq-item.open').forEach((sib) => {
            if (sib !== item) sib.classList.remove('open');
          });
        }

        item.classList.toggle('open', !wasOpen);
      });
    });
  }

  // --- Testimonials Carousel ---
  function initCarousels() {
    document.querySelectorAll('.carousel-controls').forEach((controls) => {
      const track = controls.closest('.testimonials-wrap')?.querySelector('.testimonials-track');
      if (!track) return;
      const prev = controls.querySelector('.carousel-prev');
      const next = controls.querySelector('.carousel-next');
      const card = track.querySelector('.testimonial-card');
      if (!card) return;
      const scrollAmount = card.offsetWidth + 24; // gap

      prev?.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
      next?.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    });
  }

  // --- Product Demo Accordion ---
  function initDemoAccordion() {
    const btn = document.querySelector('.demo-toggle');
    const panel = document.querySelector('.demo-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  // --- Scroll reveal ---
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  // --- Mobile nav toggle ---
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroTabs();
    initFeatureTabs();
    initAccordions();
    initCarousels();
    initDemoAccordion();
    initScrollReveal();
    initMobileNav();
  });
})();
