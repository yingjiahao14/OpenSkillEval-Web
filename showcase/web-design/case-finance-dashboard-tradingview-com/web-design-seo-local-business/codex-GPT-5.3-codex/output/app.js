function setupTabs(scope=document) {
  scope.querySelectorAll('[data-tabs]').forEach(container => {
    const buttons = container.querySelectorAll('[data-tab-btn]');
    const panels = container.querySelectorAll('[data-tab-panel]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tabBtn;
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`[data-tab-panel="${id}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

function setupAccordions() {
  document.querySelectorAll('[data-watch-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.watchToggle);
      if (target) target.classList.toggle('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupAccordions();
});
