/* ============================================
   Orchard — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initTabs();
  initFooterAccordion();
});

/* ---------- Carousels ---------- */
function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const carousel = wrapper.querySelector('.carousel');
    const prevBtn = wrapper.querySelector('.carousel-nav.prev');
    const nextBtn = wrapper.querySelector('.carousel-nav.next');
    if (!carousel) return;

    const getScrollAmount = () => {
      const firstCard = carousel.querySelector('.card, .card-small, .card-info, .card-entertainment');
      return firstCard ? firstCard.offsetWidth + 20 : 340;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });
    }
  });
}

/* ---------- Entertainment Tabs ---------- */
function initTabs() {
  const tabBars = document.querySelectorAll('.tab-bar');
  tabBars.forEach(bar => {
    const buttons = bar.querySelectorAll('.tab-btn');
    const panels = bar.closest('section')?.querySelectorAll('.tab-panel');
    if (!panels) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => {
          p.classList.toggle('active', p.dataset.tab === target);
        });
      });
    });
  });
}

/* ---------- Footer Accordion ---------- */
function initFooterAccordion() {
  const footerCols = document.querySelectorAll('.footer-col');
  footerCols.forEach(col => {
    const toggle = col.querySelector('.accordion-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isOpen = col.classList.contains('open');
      // Close all on mobile
      footerCols.forEach(c => c.classList.remove('open'));
      if (!isOpen) {
        col.classList.add('open');
      }
    });
  });
}
