(() => {
  const stepByCard = (carousel) => {
    const first = carousel.querySelector(':scope > *');
    if (!first) return 320;
    const style = getComputedStyle(carousel);
    const gap = parseFloat(style.columnGap || style.gap || '0');
    return first.getBoundingClientRect().width + gap;
  };

  document.querySelectorAll('[data-carousel]').forEach((wrap) => {
    const carousel = wrap.querySelector('.carousel');
    const prev = wrap.querySelector('.carousel-btn.prev');
    const next = wrap.querySelector('.carousel-btn.next');
    if (!carousel || !prev || !next) return;
    prev.addEventListener('click', () => carousel.scrollBy({ left: -stepByCard(carousel) * 2, behavior: 'smooth' }));
    next.addEventListener('click', () => carousel.scrollBy({ left: stepByCard(carousel) * 2, behavior: 'smooth' }));
  });

  document.querySelectorAll('[data-tabs]').forEach((tabRoot) => {
    const tabs = tabRoot.querySelectorAll('.tab');
    const panels = tabRoot.querySelectorAll('.tab-panel');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const id = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-panel') === id));
      });
    });
  });

  document.querySelectorAll('.footer-accordion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      col.classList.toggle('open');
    });
  });
})();
