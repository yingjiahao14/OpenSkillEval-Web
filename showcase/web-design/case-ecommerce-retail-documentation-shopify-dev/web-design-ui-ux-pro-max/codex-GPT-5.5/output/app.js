(function () {
  const navToggle = document.querySelector('[data-mobile-toggle]');
  const navLinks = document.querySelector('[data-navlinks]');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  const commands = {
    npm: 'npm i -g @commerceforge/cli@latest',
    yarn: 'yarn global add @commerceforge/cli@latest',
    pnpm: 'pnpm add -g @commerceforge/cli@latest'
  };
  const initCommands = {
    apps: 'commerceforge app init',
    themes: 'commerceforge theme init',
    headless: 'commerceforge hydrogen init'
  };
  const labels = {
    apps: 'Create a new embedded app',
    themes: 'Clone a starter theme',
    headless: 'Initialize a Hydrogen storefront'
  };
  let packageManager = 'npm';
  let cliType = 'apps';

  function updateCliCode() {
    const install = document.querySelector('[data-install-command]');
    const init = document.querySelector('[data-init-command]');
    const label = document.querySelector('[data-init-label]');
    if (install) install.textContent = commands[packageManager];
    if (init) init.textContent = initCommands[cliType];
    if (label) label.textContent = labels[cliType];
  }

  document.querySelectorAll('[data-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      packageManager = tab.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      updateCliCode();
    });
  });

  document.querySelectorAll('[data-accordion]').forEach((button) => {
    button.addEventListener('click', () => {
      cliType = button.dataset.accordion;
      document.querySelectorAll('.accordion-item').forEach((item) => item.classList.remove('open'));
      document.querySelectorAll('[data-accordion]').forEach((item) => item.setAttribute('aria-expanded', 'false'));
      const parent = button.closest('.accordion-item');
      if (parent) parent.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      updateCliCode();
    });
  });
  updateCliCode();

  document.querySelectorAll('[data-collapse-sidebar]').forEach((button) => {
    const layout = button.closest('.docs-layout');
    if (layout && window.matchMedia('(max-width: 980px)').matches) {
      layout.classList.add('sidebar-collapsed');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Expand sidebar');
    }

    button.addEventListener('click', () => {
      if (!layout) return;
      const collapsed = layout.classList.toggle('sidebar-collapsed');
      button.setAttribute('aria-expanded', String(!collapsed));
      button.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    });
  });
})();
