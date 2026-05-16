document.querySelectorAll('[data-tabs]').forEach((tabsWrap) => {
  const buttons = tabsWrap.querySelectorAll('[data-tab-target]');
  const panels = tabsWrap.querySelectorAll('[data-tab-panel]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = tabsWrap.querySelector(`[data-tab-panel="${btn.dataset.tabTarget}"]`);
      if (target) target.classList.add('active');
    });
  });
});

document.querySelectorAll('.watch-header').forEach((header) => {
  header.addEventListener('click', () => {
    const panel = header.nextElementSibling;
    panel.classList.toggle('open');
  });
});
