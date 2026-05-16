const cliData = {
  apps: {
    init: 'commerceforge app init',
    steps: [
      'Install CommerceForge CLI globally.',
      'Navigate to the directory where you want to create your app.',
      'Run the second command to create a new app. Your app will be added as a new subdirectory.'
    ]
  },
  themes: {
    init: 'commerceforge theme init',
    steps: [
      'Install CommerceForge CLI globally.',
      'Navigate to the directory where you want to create your theme.',
      'Run the second command to clone a starter theme. Your theme will be created in a new subdirectory.'
    ]
  },
  headless: {
    init: 'commerceforge hydrogen init',
    steps: [
      'Install CommerceForge CLI globally.',
      'Navigate to the directory where you want to create your Hydrogen storefront.',
      'Run the second command to initialize a Hydrogen storefront in a new subdirectory.'
    ]
  }
};

const installCommands = {
  npm: 'npm i -g @commerceforge/cli@latest',
  yarn: 'yarn global add @commerceforge/cli@latest',
  pnpm: 'pnpm add -g @commerceforge/cli@latest'
};

let activeCli = 'apps';
let activePackageManager = 'npm';

function renderCli() {
  const install = document.querySelector('[data-install-command]');
  const init = document.querySelector('[data-init-command]');
  const title = document.querySelector('[data-cli-title]');
  if (!install || !init || !title) return;
  install.textContent = installCommands[activePackageManager];
  init.textContent = cliData[activeCli].init;
  title.textContent = activeCli === 'apps' ? 'Apps quick-start' : activeCli === 'themes' ? 'Themes quick-start' : 'Headless storefronts quick-start';
}

function initCliAccordion() {
  document.querySelectorAll('[data-accordion]').forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger?.addEventListener('click', () => {
      activeCli = item.dataset.accordion;
      document.querySelectorAll('[data-accordion]').forEach((other) => {
        const isOpen = other === item;
        other.classList.toggle('open', isOpen);
        other.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', String(isOpen));
      });
      renderCli();
    });
  });

  document.querySelectorAll('[data-package]').forEach((tab) => {
    tab.addEventListener('click', () => {
      activePackageManager = tab.dataset.package;
      document.querySelectorAll('[data-package]').forEach((other) => other.classList.toggle('active', other === tab));
      renderCli();
    });
  });
  renderCli();
}

function initSidebar() {
  document.querySelectorAll('[data-collapse-sidebar]').forEach((button) => {
    button.addEventListener('click', () => {
      const layout = button.closest('.docs-layout');
      layout?.classList.toggle('sidebar-collapsed');
      const collapsed = layout?.classList.contains('sidebar-collapsed');
      button.setAttribute('aria-expanded', String(!collapsed));
      button.setAttribute('title', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    });
  });
}

function initMobileNav() {
  const toggle = document.querySelector('[data-mobile-menu]');
  const links = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => links?.classList.toggle('open'));
}

function initDarkToggle() {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      document.body.classList.toggle('dim-mode');
      button.textContent = document.body.classList.contains('dim-mode') ? 'High contrast' : 'Dark mode';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCliAccordion();
  initSidebar();
  initDarkToggle();
});
