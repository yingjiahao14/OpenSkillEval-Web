document.addEventListener('click', event => {
  const arrow = event.target.closest('[data-scroll]');
  if (arrow) {
    const scope = arrow.closest('.section') || arrow.closest('main') || document;
    const rail = scope.querySelector('.carousel .rail');
    if (rail) {
      const direction = arrow.dataset.scroll === 'next' ? 1 : -1;
      rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.86, 520), behavior: 'smooth' });
    }
  }
  const tab = event.target.closest('[data-tab]');
  if (tab) {
    const group = tab.closest('[data-tabs]');
    const target = tab.dataset.tab;
    group.querySelectorAll('[data-tab]').forEach(btn => btn.classList.toggle('active', btn === tab));
    group.querySelectorAll('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === target));
  }
  const foot = event.target.closest('.foot-section button');
  if (foot) foot.closest('.foot-section').classList.toggle('open');
});
document.querySelectorAll('.sticky-tabs a').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');
    if (id && id.startsWith('#')) {
      event.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
