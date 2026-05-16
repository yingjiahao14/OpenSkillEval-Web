/* Orchard — Shared Scripts */

(function () {
  'use strict';

  // Carousel navigation
  document.querySelectorAll('.carousel-wrap').forEach(function (wrap) {
    const carousel = wrap.querySelector('.carousel');
    const prev = wrap.querySelector('.carousel-nav.prev');
    const next = wrap.querySelector('.carousel-nav.next');
    if (!carousel) return;

    function updateButtons() {
      if (prev) {
        prev.classList.toggle('hidden', carousel.scrollLeft <= 1);
      }
      if (next) {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        next.classList.toggle('hidden', carousel.scrollLeft >= maxScroll - 1);
      }
    }

    if (prev) {
      prev.addEventListener('click', function () {
        carousel.scrollBy({ left: -carousel.clientWidth * 0.75, behavior: 'smooth' });
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        carousel.scrollBy({ left: carousel.clientWidth * 0.75, behavior: 'smooth' });
      });
    }

    carousel.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    // initial state
    setTimeout(updateButtons, 0);
  });

  // Entertainment tabs
  document.querySelectorAll('.tabs').forEach(function (tabList) {
    const buttons = tabList.querySelectorAll('.tab-btn');
    const panels = tabList.parentElement.querySelectorAll('.tab-panel');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.dataset.tab;
        buttons.forEach(function (b) { b.classList.toggle('active', b === btn); });
        panels.forEach(function (p) { p.classList.toggle('active', p.dataset.panel === target); });
      });
    });
  });

  // Mobile footer accordion
  function initFooterAccordion() {
    const cols = document.querySelectorAll('.footer-col');
    const isMobile = window.innerWidth <= 768;

    cols.forEach(function (col) {
      const heading = col.querySelector('h4');
      if (!heading) return;

      if (isMobile) {
        heading.classList.add('accordion-toggle');
        heading.addEventListener('click', toggleCol);
      } else {
        heading.classList.remove('accordion-toggle');
        heading.removeEventListener('click', toggleCol);
        col.classList.remove('open');
      }
    });
  }

  function toggleCol(e) {
    const col = e.currentTarget.closest('.footer-col');
    col.classList.toggle('open');
  }

  initFooterAccordion();
  window.addEventListener('resize', initFooterAccordion);
})();
