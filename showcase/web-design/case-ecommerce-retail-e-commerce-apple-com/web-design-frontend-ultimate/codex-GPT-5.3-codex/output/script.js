function wireCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((wrap) => {
    const track = wrap.querySelector('.carousel');
    const prev = wrap.querySelector('[data-prev]');
    const next = wrap.querySelector('[data-next]');
    const step = Number(wrap.dataset.step || 340);
    if (!track) return;
    prev?.addEventListener('click', () => track.scrollBy({ left: -step, behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: step, behavior: 'smooth' }));
  });
}

function wireTabs() {
  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach((group) => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.tab;
        buttons.forEach((b) => b.classList.toggle('active', b === btn));
        panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === key));
      });
    });
  });
}

function wireFooterAccordion() {
  if (window.innerWidth > 760) return;
  document.querySelectorAll('.footer-col h4').forEach((heading) => {
    heading.addEventListener('click', () => heading.parentElement.classList.toggle('open'));
  });
}

wireCarousels();
wireTabs();
wireFooterAccordion();
