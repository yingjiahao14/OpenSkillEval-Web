(function () {
  document.querySelectorAll('[data-accordion]').forEach((group) => {
    group.querySelectorAll('.acc-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.acc-item');
        group.querySelectorAll('.acc-item').forEach((other) => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    });
  });

  document.querySelectorAll('[data-tab-group]').forEach((group) => {
    const tabs = group.querySelectorAll('.tab');
    const output = group.querySelector('[data-tab-output]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        output.textContent = tab.dataset.code;
      });
    });
  });

  document.querySelectorAll('[data-sidebar]').forEach((sidebar) => {
    const btn = sidebar.querySelector('[data-collapse-btn]');
    if (!btn) return;
    const syncForViewport = () => {
      if (window.innerWidth < 980) {
        sidebar.classList.add('collapsed');
      }
    };
    syncForViewport();
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const collapsed = sidebar.classList.contains('collapsed');
      btn.textContent = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
      btn.setAttribute('aria-expanded', String(!collapsed));
    });
    window.addEventListener('resize', syncForViewport);
  });
})();
