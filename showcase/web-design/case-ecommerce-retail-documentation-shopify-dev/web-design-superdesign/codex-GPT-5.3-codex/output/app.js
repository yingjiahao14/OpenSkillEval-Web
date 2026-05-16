(() => {
  const currentPage = document.body.dataset.page;

  document.querySelectorAll('.nav a[data-page]').forEach((link) => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  const pkgTabs = document.querySelectorAll('[data-pkg-tab]');
  const pkgCode = document.querySelector('[data-pkg-code]');
  if (pkgTabs.length && pkgCode) {
    const commands = {
      npm: 'npm i -g @commerceforge/cli@latest',
      yarn: 'yarn global add @commerceforge/cli@latest',
      pnpm: 'pnpm add -g @commerceforge/cli@latest'
    };
    pkgTabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        pkgTabs.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        pkgCode.textContent = commands[btn.dataset.pkgTab] || commands.npm;
      });
    });
  }

  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    const items = Array.from(accordion.querySelectorAll('.acc-item'));
    items.forEach((item) => {
      const trigger = item.querySelector('.acc-trigger');
      trigger.addEventListener('click', () => {
        items.forEach((other) => other.classList.remove('open'));
        item.classList.add('open');
      });
    });
    if (items[0]) items[0].classList.add('open');
  }

  document.querySelectorAll('[data-sidebar-toggle]').forEach((btn) => {
    const targetId = btn.dataset.sidebarToggle;
    const sidebar = document.getElementById(targetId);
    if (!sidebar) return;

    const autoCollapse = () => {
      if (window.innerWidth < 981) sidebar.classList.add('collapsed');
      else sidebar.classList.remove('collapsed');
    };

    autoCollapse();
    window.addEventListener('resize', autoCollapse);

    btn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  });
})();
