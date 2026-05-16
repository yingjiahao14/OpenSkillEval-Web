(function () {
  const accs = document.querySelectorAll('[data-accordion] .accordion-item');
  accs.forEach((item) => {
    const head = item.querySelector('.accordion-head');
    if (!head) return;
    head.addEventListener('click', () => {
      const group = item.closest('[data-accordion]');
      group.querySelectorAll('.accordion-item').forEach((node) => {
        if (node !== item) node.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach((group) => {
    const tabs = group.querySelectorAll('.tab');
    const code = group.querySelector('code[data-code]');
    const commands = {
      npm: 'npm i -g @commerceforge/cli@latest',
      yarn: 'yarn global add @commerceforge/cli@latest',
      pnpm: 'pnpm add -g @commerceforge/cli@latest'
    };
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const manager = tab.dataset.manager;
        if (code && commands[manager]) code.textContent = commands[manager];
      });
    });
  });

  const layouts = document.querySelectorAll('[data-doc-layout]');
  layouts.forEach((layout) => {
    const toggle = layout.querySelector('[data-sidebar-toggle]');
    if (!toggle) return;
    if (window.matchMedia('(max-width: 960px)').matches) {
      layout.classList.add('collapsed');
    }
    toggle.addEventListener('click', () => {
      layout.classList.toggle('collapsed');
      toggle.textContent = layout.classList.contains('collapsed') ? 'Expand sidebar' : 'Collapse sidebar';
    });
  });
})();
