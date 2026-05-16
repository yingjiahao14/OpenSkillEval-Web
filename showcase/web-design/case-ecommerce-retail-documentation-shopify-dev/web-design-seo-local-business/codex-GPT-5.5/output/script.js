const installCommands = {
  npm: 'npm i -g @commerceforge/cli@latest',
  yarn: 'yarn global add @commerceforge/cli@latest',
  pnpm: 'pnpm add -g @commerceforge/cli@latest'
};

const initCommands = {
  apps: 'commerceforge app init',
  themes: 'commerceforge theme init',
  storefronts: 'commerceforge hydrogen init'
};

let selectedPackageManager = 'npm';
let selectedCliTarget = 'apps';

function updateCliCode() {
  const install = document.querySelector('[data-install-code]');
  const init = document.querySelector('[data-init-code]');
  if (install) install.textContent = installCommands[selectedPackageManager];
  if (init) init.textContent = initCommands[selectedCliTarget];
}

function initCliInteractions() {
  document.querySelectorAll('[data-accordion]').forEach((accordion) => {
    const button = accordion.querySelector('button');
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-accordion]').forEach((item) => item.classList.remove('active'));
      accordion.classList.add('active');
      selectedCliTarget = accordion.dataset.accordion;
      updateCliCode();
    });
  });

  document.querySelectorAll('[data-package-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-package-tab]').forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
      selectedPackageManager = tab.dataset.packageTab;
      updateCliCode();
    });
  });
  updateCliCode();
}

function initSidebar() {
  const layout = document.querySelector('[data-docs-layout]');
  const toggle = document.querySelector('[data-sidebar-toggle]');
  if (!layout || !toggle) return;
  const autoCollapse = () => {
    if (window.matchMedia('(max-width: 980px)').matches) layout.classList.add('collapsed');
  };
  toggle.addEventListener('click', () => layout.classList.toggle('collapsed'));
  autoCollapse();
  window.addEventListener('resize', autoCollapse);
}

document.addEventListener('DOMContentLoaded', () => {
  initCliInteractions();
  initSidebar();
});
