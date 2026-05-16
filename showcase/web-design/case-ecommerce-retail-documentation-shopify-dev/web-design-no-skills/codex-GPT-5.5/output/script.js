document.addEventListener('DOMContentLoaded', () => {
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

  let packageManager = 'npm';
  let activeAccordion = document.querySelector('.accordion-item.open')?.dataset.target || 'apps';

  const installCode = document.querySelector('[data-install-code]');
  const initCode = document.querySelector('[data-init-code]');

  function syncCode() {
    if (installCode) installCode.textContent = installCommands[packageManager];
    if (initCode) initCode.textContent = initCommands[activeAccordion];
  }

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      packageManager = tab.dataset.package;
      document.querySelectorAll('.tab').forEach((button) => button.classList.toggle('active', button === tab));
      syncCode();
    });
  });

  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      activeAccordion = item.dataset.target;
      document.querySelectorAll('.accordion-item').forEach((candidate) => {
        const isActive = candidate === item;
        candidate.classList.toggle('open', isActive);
        candidate.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', String(isActive));
      });
      syncCode();
    });
  });

  document.querySelectorAll('[data-sidebar-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const layout = button.closest('.docs-layout');
      const collapsed = layout.classList.toggle('sidebar-collapsed');
      button.textContent = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
      button.setAttribute('aria-expanded', String(!collapsed));
    });
  });

  const compactDocs = window.matchMedia('(max-width: 940px)');
  function autoCollapseSidebars() {
    if (!compactDocs.matches) return;
    document.querySelectorAll('.docs-layout').forEach((layout) => {
      layout.classList.add('sidebar-collapsed');
      const button = layout.querySelector('[data-sidebar-toggle]');
      if (button) {
        button.textContent = 'Expand sidebar';
        button.setAttribute('aria-expanded', 'false');
      }
    });
  }

  autoCollapseSidebars();
  compactDocs.addEventListener?.('change', autoCollapseSidebars);

  syncCode();
});
