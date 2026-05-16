function attachCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const id = carousel.getAttribute('id');
    const prev = document.querySelector(`[data-prev="${id}"]`);
    const next = document.querySelector(`[data-next="${id}"]`);
    if (!prev || !next) return;
    const scrollAmount = 300;
    prev.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    next.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
  });
}

function attachTabs() {
  const tabButtons = document.querySelectorAll('[data-tab]');
  const panels = document.querySelectorAll('[data-panel]');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      panels.forEach((panel) => panel.classList.remove('active'));
      button.classList.add('active');
      const panel = document.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

function attachFooterAccordion() {
  if (window.matchMedia('(max-width: 760px)').matches) {
    document.querySelectorAll('.footer-group h4').forEach((heading) => {
      heading.addEventListener('click', () => {
        heading.parentElement.classList.toggle('open');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  attachCarousels();
  attachTabs();
  attachFooterAccordion();
});
