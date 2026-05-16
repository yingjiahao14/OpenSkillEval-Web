(function () {
  const cliState = {
    selectedAccordion: 'apps',
    selectedTab: 'npm',
    install: {
      npm: 'npm i -g @commerceforge/cli@latest',
      yarn: 'yarn global add @commerceforge/cli@latest',
      pnpm: 'pnpm add -g @commerceforge/cli@latest'
    },
    init: {
      apps: 'commerceforge app init',
      themes: 'commerceforge theme init',
      headless: 'commerceforge hydrogen init'
    }
  };

  const stepsByAccordion = {
    apps: [
      'Install CommerceForge CLI globally.',
      'Navigate to the directory where you want to create your app.',
      'Run the second command to create a new app. Your app will be added as a new subdirectory.'
    ],
    themes: [
      'Install CommerceForge CLI globally.',
      'Navigate to the directory where you want to create your theme.',
      'Run the second command to clone a starter theme. Your theme will be created in a new subdirectory.'
    ],
    headless: [
      'Install CommerceForge CLI globally.',
      'Navigate to the directory where you want to create your Hydrogen storefront.',
      'Run the second command to initialize a Hydrogen storefront in a new subdirectory.'
    ]
  };

  function renderCli() {
    const installEl = document.getElementById('install-command');
    const initEl = document.getElementById('init-command');
    const stepsEl = document.getElementById('cli-steps');
    if (!installEl || !initEl || !stepsEl) return;

    installEl.textContent = cliState.install[cliState.selectedTab];
    initEl.textContent = cliState.init[cliState.selectedAccordion];
    stepsEl.innerHTML = stepsByAccordion[cliState.selectedAccordion]
      .map(step => `<li>${step}</li>`)
      .join('');

    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === cliState.selectedTab);
      btn.setAttribute('aria-selected', btn.dataset.tab === cliState.selectedTab ? 'true' : 'false');
    });

    document.querySelectorAll('[data-accordion]').forEach(btn => {
      const expanded = btn.dataset.accordion === cliState.selectedAccordion;
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', function () {
      cliState.selectedTab = this.dataset.tab;
      renderCli();
    });
  });

  document.querySelectorAll('[data-accordion]').forEach(btn => {
    btn.addEventListener('click', function () {
      cliState.selectedAccordion = this.dataset.accordion;
      renderCli();
    });
  });

  renderCli();

  function setupSidebar(layoutId, btnId, storageKey) {
    const layout = document.getElementById(layoutId);
    const btn = document.getElementById(btnId);
    if (!layout || !btn) return;

    const shouldAutoCollapse = window.matchMedia('(max-width: 980px)').matches;
    const saved = localStorage.getItem(storageKey);
    const collapsed = saved ? saved === '1' : shouldAutoCollapse;
    if (collapsed) layout.classList.add('collapsed');

    btn.addEventListener('click', function () {
      layout.classList.toggle('collapsed');
      const isCollapsed = layout.classList.contains('collapsed');
      localStorage.setItem(storageKey, isCollapsed ? '1' : '0');
      btn.textContent = isCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
    });

    btn.textContent = layout.classList.contains('collapsed') ? 'Expand sidebar' : 'Collapse sidebar';
  }

  setupSidebar('apps-layout', 'apps-sidebar-toggle', 'cf_apps_sidebar_collapsed');
  setupSidebar('agents-layout', 'agents-sidebar-toggle', 'cf_agents_sidebar_collapsed');
})();
