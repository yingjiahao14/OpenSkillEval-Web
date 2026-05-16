(function () {
  const accordions = document.querySelectorAll('[data-accordion] .accordion-item');
  accordions.forEach((item) => {
    const btn = item.querySelector('.acc-btn');
    btn?.addEventListener('click', () => {
      accordions.forEach((other) => other.classList.remove('active'));
      item.classList.add('active');
    });
  });

  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach((group) => {
    const tabs = group.querySelectorAll('.tab');
    const code = group.querySelector('code[data-code]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        if (code) code.textContent = tab.dataset.command || '';
      });
    });
  });

  const sidebar = document.querySelector('[data-sidebar]');
  const collapseBtn = document.querySelector('[data-sidebar-toggle]');
  if (sidebar && collapseBtn) {
    const applyAuto = () => {
      if (window.innerWidth < 980) {
        sidebar.classList.add('collapsed');
        collapseBtn.setAttribute('aria-expanded', 'false');
      }
    };
    applyAuto();
    window.addEventListener('resize', applyAuto);
    collapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const expanded = !sidebar.classList.contains('collapsed');
      collapseBtn.setAttribute('aria-expanded', String(expanded));
    });
  }
})();
