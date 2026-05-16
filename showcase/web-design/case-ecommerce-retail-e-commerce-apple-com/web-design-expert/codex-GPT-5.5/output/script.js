document.addEventListener('click', (event) => {
  const arrow = event.target.closest('[data-scroll]');
  if (arrow) {
    const carousel = arrow.closest('.carousel');
    const rail = carousel && carousel.querySelector('.rail');
    if (rail) {
      const dir = arrow.dataset.scroll === 'next' ? 1 : -1;
      rail.scrollBy({ left: dir * Math.min(rail.clientWidth * 0.86, 760), behavior: 'smooth' });
    }
  }

  const tab = event.target.closest('[data-tab]');
  if (tab) {
    const group = tab.closest('.entertainment');
    const target = tab.dataset.tab;
    group.querySelectorAll('[data-tab]').forEach(btn => btn.classList.toggle('active', btn === tab));
    group.querySelectorAll('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === target));
  }

  const footerButton = event.target.closest('.foot-toggle');
  if (footerButton) {
    footerButton.closest('.foot-section').classList.toggle('open');
  }
});
