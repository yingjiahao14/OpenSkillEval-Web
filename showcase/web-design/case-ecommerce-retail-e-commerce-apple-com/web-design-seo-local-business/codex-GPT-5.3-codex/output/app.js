(function(){
  document.querySelectorAll('[data-carousel]').forEach((wrap) => {
    const track = wrap.querySelector('.carousel-track');
    const prev = wrap.querySelector('[data-prev]');
    const next = wrap.querySelector('[data-next]');
    if (!track) return;
    const move = () => Math.max(280, Math.floor(track.clientWidth * 0.88));
    prev && prev.addEventListener('click', () => track.scrollBy({left: -move(), behavior: 'smooth'}));
    next && next.addEventListener('click', () => track.scrollBy({left: move(), behavior: 'smooth'}));
  });

  document.querySelectorAll('[data-tabs]').forEach((tabsWrap) => {
    const tabs = tabsWrap.querySelectorAll('[role="tab"]');
    const panels = tabsWrap.querySelectorAll('[role="tabpanel"]');
    const activate = (target) => {
      tabs.forEach(t => {
        const on = t.dataset.tab === target;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(p => p.hidden = p.dataset.panel !== target);
    };
    tabs.forEach(tab => tab.addEventListener('click', () => activate(tab.dataset.tab)));
    if (tabs[0]) activate(tabs[0].dataset.tab);
  });

  document.querySelectorAll('[data-footer-accordion] .footer-section').forEach((section) => {
    const btn = section.querySelector('.acc-btn');
    if (!btn) return;
    btn.addEventListener('click', () => section.classList.toggle('open'));
  });
})();
