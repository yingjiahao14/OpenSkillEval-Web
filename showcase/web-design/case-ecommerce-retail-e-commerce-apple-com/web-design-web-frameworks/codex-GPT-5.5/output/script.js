document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach((section) => {
    const track = section.querySelector('.carousel');
    if (!track) return;
    section.querySelectorAll('[data-dir]').forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.dataset.dir === 'prev' ? -1 : 1;
        const amount = Math.min(track.clientWidth * 0.86, 760);
        track.scrollBy({ left: direction * amount, behavior: 'smooth' });
      });
    });
  });

  document.querySelectorAll('.tabs-wrap').forEach((wrap) => {
    const tabs = wrap.querySelectorAll('.tab');
    const panels = wrap.querySelectorAll('.tab-panel');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((item) => item.classList.remove('active'));
        panels.forEach((panel) => panel.classList.remove('active'));
        tab.classList.add('active');
        const panel = wrap.querySelector(`#${tab.dataset.tab}`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  document.querySelectorAll('.footer-col h4').forEach((heading) => {
    heading.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 820px)').matches) {
        heading.parentElement.classList.toggle('open');
      }
    });
  });
});
