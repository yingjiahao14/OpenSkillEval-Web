document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.track');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    if (!track) return;
    const scrollByAmount = () => Math.max(280, Math.floor(track.clientWidth * 0.82));
    prev?.addEventListener('click', () => track.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: scrollByAmount(), behavior: 'smooth' }));
  });

  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const buttons = tabs.querySelectorAll('[data-tab]');
    const panels = tabs.parentElement.querySelectorAll('[data-panel]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tab;
        buttons.forEach((b) => b.classList.toggle('active', b === button));
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === target));
      });
    });
  });

  document.querySelectorAll('.footer-section button').forEach((button) => {
    button.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 640px)').matches) {
        button.closest('.footer-section').classList.toggle('open');
      }
    });
  });
});
