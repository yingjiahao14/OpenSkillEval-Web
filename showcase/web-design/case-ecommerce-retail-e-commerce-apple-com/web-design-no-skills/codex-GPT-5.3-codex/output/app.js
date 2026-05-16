function setupCarousels() {
  document.querySelectorAll('[data-carousel-wrap]').forEach((wrap) => {
    const carousel = wrap.querySelector('.carousel');
    if (!carousel) return;
    const prev = wrap.querySelector('.arrow.prev');
    const next = wrap.querySelector('.arrow.next');
    const step = () => Math.max(260, Math.floor(carousel.clientWidth * 0.82));
    prev?.addEventListener('click', () => carousel.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => carousel.scrollBy({ left: step(), behavior: 'smooth' }));
  });
}

function setupTabs() {
  const container = document.querySelector('[data-tabs]');
  if (!container) return;
  const buttons = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      container.querySelector(`[data-panel="${btn.dataset.tab}"]`)?.classList.add('active');
    });
  });
}

function setupFooterAccordion() {
  if (window.matchMedia('(max-width: 700px)').matches) {
    document.querySelectorAll('.footer .col').forEach((col) => {
      const btn = col.querySelector('.acc-head');
      btn?.addEventListener('click', () => col.classList.toggle('open'));
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupCarousels();
  setupTabs();
  setupFooterAccordion();
});
