/* ============================================
   Orchard — Shared Scripts
   ============================================ */

(function () {
  'use strict';

  /* ---------- Carousel Logic ---------- */
  function initCarousels() {
    document.querySelectorAll('.carousel-wrapper').forEach(function (wrapper) {
      const carousel = wrapper.querySelector('.carousel');
      const prevBtn = wrapper.querySelector('.carousel-nav.prev');
      const nextBtn = wrapper.querySelector('.carousel-nav.next');
      if (!carousel) return;

      function updateButtons() {
        if (prevBtn) {
          prevBtn.classList.toggle('hidden', carousel.scrollLeft <= 1);
        }
        if (nextBtn) {
          const maxScroll = carousel.scrollWidth - carousel.clientWidth;
          nextBtn.classList.toggle('hidden', carousel.scrollLeft >= maxScroll - 1);
        }
      }

      function scrollByCard(direction) {
        const card = carousel.querySelector('.product-card, .info-card, .entertainment-card');
        const gap = 20;
        const amount = card ? (card.offsetWidth + gap) * direction : 340 * direction;
        carousel.scrollBy({ left: amount, behavior: 'smooth' });
      }

      if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCard(-1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCard(1); });

      carousel.addEventListener('scroll', updateButtons, { passive: true });
      // initial state
      window.addEventListener('load', updateButtons);
      updateButtons();
    });
  }

  /* ---------- Entertainment Tabs ---------- */
  function initEntertainmentTabs() {
    const tabContainer = document.querySelector('.entertainment-tabs');
    if (!tabContainer) return;

    const tabs = tabContainer.querySelectorAll('button');
    const panels = document.querySelectorAll('.entertainment-panel');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.dataset.tab;
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        panels.forEach(function (p) {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });
    });
  }

  /* ---------- Footer Accordion (mobile) ---------- */
  function initFooterAccordion() {
    const cols = document.querySelectorAll('.footer-col');
    const mql = window.matchMedia('(max-width: 768px)');

    function toggleCol(e) {
      if (!mql.matches) return;
      const col = e.currentTarget.closest('.footer-col');
      col.classList.toggle('open');
    }

    cols.forEach(function (col) {
      const heading = col.querySelector('h4');
      if (heading) {
        heading.addEventListener('click', toggleCol);
      }
    });

    // Reset on resize to desktop
    mql.addEventListener('change', function (e) {
      if (!e.matches) {
        cols.forEach(function (col) { col.classList.remove('open'); });
      }
    });
  }

  /* ---------- Section Nav Active State ---------- */
  function initSectionNav() {
    const nav = document.querySelector('.section-nav');
    if (!nav) return;
    const links = nav.querySelectorAll('a[href^="#"]');
    const sections = [];
    links.forEach(function (link) {
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) sections.push({ link: link, section: section });
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          sections.forEach(function (s) {
            s.link.style.opacity = s.section === entry.target ? '1' : '0.6';
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s.section); });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initCarousels();
    initEntertainmentTabs();
    initFooterAccordion();
    initSectionNav();
  });
})();
