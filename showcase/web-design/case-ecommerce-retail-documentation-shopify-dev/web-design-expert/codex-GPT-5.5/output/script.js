const pages = {
  'index.html': 'home',
  'apps-build.html': 'apps',
  'storefronts.html': 'storefronts',
  'agents.html': 'agents',
  'support.html': 'help'
};

function currentFile() {
  const file = location.pathname.split('/').pop() || 'index.html';
  return file;
}

document.querySelectorAll('[data-nav]').forEach(link => {
  if (link.dataset.nav === pages[currentFile()]) link.classList.add('active');
});

const mobileMenu = document.querySelector('[data-mobile-menu]');
const navLinks = document.querySelector('[data-nav-links]');
if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const themeToggle = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('cf-theme');
if (savedTheme === 'light') document.body.classList.add('light');
function syncThemeLabel() {
  if (themeToggle) themeToggle.textContent = document.body.classList.contains('light') ? '☀ Light' : '☾ Dark';
}
syncThemeLabel();
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('cf-theme', document.body.classList.contains('light') ? 'light' : 'dark');
    syncThemeLabel();
  });
}

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
let activePackageManager = 'npm';
let activeCliTarget = document.querySelector('.accordion-item.open')?.dataset.target || 'apps';

function updateCliCode() {
  const install = document.querySelector('[data-install-code]');
  const init = document.querySelector('[data-init-code]');
  if (install) install.textContent = installCommands[activePackageManager];
  if (init) init.textContent = initCommands[activeCliTarget];
}

document.querySelectorAll('[data-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    activePackageManager = tab.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach(item => item.classList.toggle('active', item === tab));
    updateCliCode();
  });
});

document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    activeCliTarget = item.dataset.target;
    document.querySelectorAll('.accordion-item').forEach(row => row.classList.toggle('open', row === item));
    updateCliCode();
  });
});
updateCliCode();

const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
const docsLayout = document.querySelector('[data-docs-layout]');
if (sidebarToggle && docsLayout) {
  const key = `cf-sidebar-${currentFile()}`;
  if (localStorage.getItem(key) === 'collapsed' || matchMedia('(max-width: 760px)').matches) {
    docsLayout.classList.add('collapsed');
  }
  function syncSidebarLabel() {
    sidebarToggle.textContent = docsLayout.classList.contains('collapsed') ? '→' : '←';
    sidebarToggle.setAttribute('aria-label', docsLayout.classList.contains('collapsed') ? 'Expand sidebar' : 'Collapse sidebar');
  }
  syncSidebarLabel();
  sidebarToggle.addEventListener('click', () => {
    docsLayout.classList.toggle('collapsed');
    localStorage.setItem(key, docsLayout.classList.contains('collapsed') ? 'collapsed' : 'expanded');
    syncSidebarLabel();
  });
}
