document.addEventListener('click', e => {
  const btn = e.target.closest('[data-scroll]');
  if (btn) {
    const wrap = btn.closest('.carousel-wrap');
    const carousel = wrap && wrap.querySelector('.carousel');
    if (carousel) carousel.scrollBy({ left: (btn.dataset.scroll === 'next' ? 1 : -1) * Math.min(760, carousel.clientWidth * .9), behavior: 'smooth' });
  }
  const tab = e.target.closest('[data-tab]');
  if (tab) {
    const tabs = tab.closest('.tabs');
    tabs.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b === tab));
    tabs.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === tab.dataset.tab));
  }
  const footerHead = e.target.closest('.footer-section h4');
  if (footerHead && matchMedia('(max-width: 820px)').matches) footerHead.parentElement.classList.toggle('open');
});
