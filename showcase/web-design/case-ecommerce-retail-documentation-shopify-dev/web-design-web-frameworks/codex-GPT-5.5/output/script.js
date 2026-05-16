const cliData = {
  apps: {
    title: 'Apps',
    init: 'commerceforge app init',
    steps: [
      'Install CommerceForge CLI globally.',
      'Navigate to the directory where you want to create your app.',
      'Run the second command to create a new app. Your app will be added as a new subdirectory.'
    ]
  },
  themes: {
    title: 'Themes',
    init: 'commerceforge theme init',
    steps: [
      'Install CommerceForge CLI globally.',
      'Navigate to the directory where you want to create your theme.',
      'Run the second command to clone a starter theme. Your theme will be created in a new subdirectory.'
    ]
  },
  headless: {
    title: 'Headless storefronts',
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
let activePackage = 'npm';

function renderCode() {
  const block = document.querySelector('[data-cli-code]');
  const label = document.querySelector('[data-code-label]');
  if (!block) return;
  const data = cliData[activeCli];
  label.textContent = `${data.title} quick-start`;
  block.innerHTML = `<span class="comment"># Install the latest CommerceForge CLI</span>\n<span class="prompt">$</span> ${installCommands[activePackage]}\n\n<span class="comment"># Initialize ${data.title.toLowerCase()}</span>\n<span class="prompt">$</span> ${data.init}`;
}

function initCliAccordion() {
  document.querySelectorAll('[data-accordion]').forEach((item) => {
    item.querySelector('button').addEventListener('click', () => {
      activeCli = item.dataset.accordion;
      document.querySelectorAll('[data-accordion]').forEach((other) => {
        other.classList.toggle('active', other === item);
        other.querySelector('button').setAttribute('aria-expanded', other === item ? 'true' : 'false');
      });
      renderCode();
    });
  });

  document.querySelectorAll('[data-package]').forEach((tab) => {
    tab.addEventListener('click', () => {
      activePackage = tab.dataset.package;
      document.querySelectorAll('[data-package]').forEach((other) => {
        other.classList.toggle('active', other === tab);
        other.setAttribute('aria-selected', other === tab ? 'true' : 'false');
      });
      renderCode();
    });
  });
  renderCode();
}

function initSidebar() {
  const layout = document.querySelector('[data-docs-layout]');
  const toggle = document.querySelector('[data-sidebar-toggle]');
  if (!layout || !toggle) return;
  const mq = window.matchMedia('(max-width: 960px)');
  const syncSmall = () => {
    if (mq.matches) layout.classList.add('collapsed');
  };
  toggle.addEventListener('click', () => {
    layout.classList.toggle('collapsed');
    const collapsed = layout.classList.contains('collapsed');
    toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  });
  syncSmall();
  mq.addEventListener('change', syncSmall);
}

function initMobileNav() {
  const toggle = document.querySelector('[data-mobile-nav]');
  const nav = document.querySelector('.nav-wrap');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCliAccordion();
  initSidebar();
});
