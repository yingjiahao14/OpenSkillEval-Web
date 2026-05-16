function setupCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((wrap) => {
    const track = wrap.querySelector('.carousel');
    const prev = wrap.querySelector('.carousel-btn.prev');
    const next = wrap.querySelector('.carousel-btn.next');
    if (!track || !prev || !next) return;
    const scrollAmt = () => Math.max(track.clientWidth * 0.82, 260);
    prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmt(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: scrollAmt(), behavior: 'smooth' }));
  });
}

function setupTabs() {
  const tabsRoot = document.querySelector('[data-tabs]');
  if (!tabsRoot) return;
  const tabs = tabsRoot.querySelectorAll('.tab');
  const panels = tabsRoot.querySelectorAll('.panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      tabsRoot.querySelector(`#${target}`)?.classList.add('active');
    });
  });
}

function setupFooterAccordion() {
  document.querySelectorAll('.footer-accordion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.footer-column')?.classList.toggle('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupCarousels();
  setupTabs();
  setupFooterAccordion();
});
