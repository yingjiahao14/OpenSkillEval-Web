(function(){
  const step = () => Math.max(280, Math.round(window.innerWidth * 0.72));
  document.querySelectorAll('[data-carousel-wrap]').forEach((wrap) => {
    const carousel = wrap.querySelector('[data-carousel]');
    const prev = wrap.querySelector('[data-prev]');
    const next = wrap.querySelector('[data-next]');
    if (!carousel) return;
    prev && prev.addEventListener('click', () => carousel.scrollBy({left: -step(), behavior: 'smooth'}));
    next && next.addEventListener('click', () => carousel.scrollBy({left: step(), behavior: 'smooth'}));
  });

  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabPanels = document.querySelectorAll('[data-panel]');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      tabButtons.forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
      tabPanels.forEach((panel) => panel.classList.toggle('active', panel.getAttribute('data-panel') === tab));
    });
  });

  document.querySelectorAll('.accordion-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      col && col.classList.toggle('open');
    });
  });
})();
