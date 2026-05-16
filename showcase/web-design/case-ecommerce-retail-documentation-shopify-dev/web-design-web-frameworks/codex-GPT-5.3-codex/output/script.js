(function () {
  const tabs = document.querySelectorAll('[data-tab]');
  const codeEl = document.querySelector('[data-cli-code]');
  const codeMap = {
    npm: 'npm i -g @commerceforge/cli@latest',
    yarn: 'yarn global add @commerceforge/cli@latest',
    pnpm: 'pnpm add -g @commerceforge/cli@latest'
  };

  if (tabs.length && codeEl) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');
        const manager = tab.getAttribute('data-tab');
        codeEl.textContent = codeMap[manager] || codeMap.npm;
      });
    });
  }

  const items = document.querySelectorAll('.acc-item');
  items.forEach((item) => {
    const trigger = item.querySelector('.acc-trigger');
    trigger?.addEventListener('click', () => {
      items.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  const collapseBtn = document.querySelector('[data-collapse-sidebar]');
  if (collapseBtn) {
    if (window.matchMedia('(max-width: 960px)').matches) {
      document.body.classList.add('sidebar-collapsed');
    }
    collapseBtn.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-collapsed');
    });
  }
})();
