const header = document.querySelector('.site-header');
const menuButton = document.querySelector('[data-menu-toggle]');
if (menuButton && header) {
  menuButton.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

const cliData = {
  apps: {
    title: 'Apps',
    init: 'commerceforge app init',
    comment: 'Create a new CommerceForge app in a subdirectory'
  },
  themes: {
    title: 'Themes',
    init: 'commerceforge theme init',
    comment: 'Clone a starter theme with live store data'
  },
  headless: {
    title: 'Headless storefronts',
    init: 'commerceforge hydrogen init',
    comment: 'Initialize a Hydrogen storefront'
  }
};
const installCommands = {
  npm: 'npm i -g @commerceforge/cli@latest',
  yarn: 'yarn global add @commerceforge/cli@latest',
  pnpm: 'pnpm add -g @commerceforge/cli@latest'
};
let activeCli = 'apps';
let activePackage = 'npm';
function renderCliCode() {
  const code = document.querySelector('[data-cli-code]');
  if (!code) return;
  const data = cliData[activeCli];
  code.innerHTML = `<span class="code-muted"># Install CommerceForge CLI 3.0</span>\n<span class="code-accent">${installCommands[activePackage]}</span>\n\n<span class="code-muted"># ${data.comment}</span>\n<span class="code-blue">${data.init}</span>\n\n<span class="code-muted"># Start local development</span>\n<span class="code-warn">commerceforge dev</span>`;
}

document.querySelectorAll('[data-accordion]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const key = trigger.dataset.accordion;
    activeCli = key;
    document.querySelectorAll('.accordion-item').forEach((item) => {
      const isOpen = item.dataset.item === key;
      item.classList.toggle('open', isOpen);
      const button = item.querySelector('[data-accordion]');
      const panel = item.querySelector('.accordion-content');
      button.setAttribute('aria-expanded', String(isOpen));
      panel.hidden = !isOpen;
    });
    renderCliCode();
  });
});

document.querySelectorAll('[data-package]').forEach((tab) => {
  tab.addEventListener('click', () => {
    activePackage = tab.dataset.package;
    document.querySelectorAll('[data-package]').forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    renderCliCode();
  });
});
renderCliCode();

document.querySelectorAll('[data-sidebar-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const layout = button.closest('.docs-layout');
    const collapsed = layout.classList.toggle('collapsed');
    button.setAttribute('aria-expanded', String(!collapsed));
  });
});
