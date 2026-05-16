(function () {
  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabCode = document.querySelector('[data-cli-code]');

  const commands = {
    npm: 'npm install -g @commerceforge/cli@latest',
    yarn: 'yarn global add @commerceforge/cli@latest',
    pnpm: 'pnpm add -g @commerceforge/cli@latest'
  };

  function setTab(tab) {
    tabButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tab));
    if (tabCode) tabCode.textContent = commands[tab] || commands.npm;
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => setTab(btn.dataset.tab));
  });

  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const btn = item.querySelector('.accordion-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      accordionItems.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  const docsLayout = document.querySelector('.docs-layout');
  const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
  if (docsLayout && sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      docsLayout.classList.toggle('sidebar-collapsed');
    });
  }

  if (tabCode && tabCode.textContent.trim() === '') setTab('npm');
})();
