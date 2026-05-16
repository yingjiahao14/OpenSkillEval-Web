document.querySelectorAll('[data-tab-group]').forEach(group => {
  const tabs = group.querySelectorAll('[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      const scope = group.getAttribute('data-tab-group');
      document.querySelectorAll(`[data-panel-group="${scope}"] [data-panel]`).forEach(p => {
        p.style.display = p.getAttribute('data-panel') === target ? 'block' : 'none';
      });
    });
  });
});

document.querySelectorAll('.watchlist-header').forEach(h => {
  h.addEventListener('click', () => h.parentElement.classList.toggle('open'));
});

document.querySelectorAll('[data-toggle]').forEach(toggle => {
  toggle.addEventListener('click', () => toggle.classList.toggle('active'));
});
