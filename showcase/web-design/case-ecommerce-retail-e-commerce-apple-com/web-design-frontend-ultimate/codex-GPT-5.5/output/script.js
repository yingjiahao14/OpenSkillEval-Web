document.addEventListener('click', (event) => {
  const arrow = event.target.closest('[data-scroll]');
  if (arrow) {
    const wrap = arrow.closest('.carousel-wrap');
    const carousel = wrap && wrap.querySelector('.carousel');
    if (carousel) {
      const direction = arrow.dataset.scroll === 'next' ? 1 : -1;
      carousel.scrollBy({ left: direction * Math.min(760, carousel.clientWidth * 0.85), behavior: 'smooth' });
    }
  }
  const tab = event.target.closest('[data-tab]');
  if (tab) {
    const group = tab.closest('.tabs-area');
    group.querySelectorAll('[data-tab]').forEach((button) => button.classList.toggle('active', button === tab));
    group.querySelectorAll('.entertainment-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === tab.dataset.tab));
  }
  const footerButton = event.target.closest('.foot-section button');
  if (footerButton) {
    footerButton.closest('.foot-section').classList.toggle('open');
  }
});
