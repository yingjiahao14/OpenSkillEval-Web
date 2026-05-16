(function () {
  const installCommands = {
    npm: 'npm i -g @commerceforge/cli@latest',
    yarn: 'yarn global add @commerceforge/cli@latest',
    pnpm: 'pnpm add -g @commerceforge/cli@latest'
  };
  const initCommands = {
    apps: 'commerceforge app init',
    themes: 'commerceforge theme init',
    headless: 'commerceforge hydrogen init'
  };
  let activePackage = 'npm';
  let activeAccordion = document.querySelector('.acc-item.open')?.dataset.target || 'apps';

  function renderCommands() {
    const install = document.querySelector('[data-install-command]');
    const init = document.querySelector('[data-init-command]');
    if (install) install.textContent = installCommands[activePackage];
    if (init) init.textContent = initCommands[activeAccordion] || initCommands.apps;
  }

  document.querySelectorAll('.acc-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item');
      activeAccordion = item.dataset.target;
      document.querySelectorAll('.acc-item').forEach((other) => {
        const panel = other.querySelector('.acc-panel');
        const isOpen = other === item;
        other.classList.toggle('open', isOpen);
        other.querySelector('.acc-trigger').setAttribute('aria-expanded', String(isOpen));
        if (panel) panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0px';
      });
      renderCommands();
    });
  });

  document.querySelectorAll('.acc-item.open .acc-panel').forEach((panel) => {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  });

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      activePackage = tab.dataset.package;
      document.querySelectorAll('.tab').forEach((other) => other.classList.toggle('active', other === tab));
      renderCommands();
    });
  });
  renderCommands();

  document.querySelectorAll('[data-collapse-docs]').forEach((button) => {
    button.addEventListener('click', () => {
      const layout = button.closest('.docs-layout');
      const collapsed = layout.classList.toggle('collapsed');
      button.setAttribute('aria-expanded', String(!collapsed));
      button.textContent = collapsed ? 'Expand' : 'Collapse';
    });
  });
})();
