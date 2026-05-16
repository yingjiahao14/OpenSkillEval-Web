function initCliExperience() {
  const accordionItems = document.querySelectorAll('[data-accordion] .accordion-item');
  accordionItems.forEach((item) => {
    item.querySelector('.acc-btn')?.addEventListener('click', () => {
      accordionItems.forEach((other) => other.classList.remove('active'));
      item.classList.add('active');
    });
  });

  const tabButtons = document.querySelectorAll('[data-cli-tabs] .tab');
  const code = document.querySelector('[data-cli-code]');
  const commands = {
    npm: 'npm i -g @commerceforge/cli@latest',
    yarn: 'yarn global add @commerceforge/cli@latest',
    pnpm: 'pnpm add -g @commerceforge/cli@latest'
  };
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const pm = btn.dataset.pm;
      if (code && pm && commands[pm]) code.textContent = commands[pm];
    });
  });
}

function initSidebarToggle() {
  const layout = document.querySelector('[data-doc-layout]');
  const btn = document.querySelector('[data-sidebar-toggle]');
  if (!layout || !btn) return;

  const autoCollapse = () => {
    if (window.innerWidth <= 980) {
      layout.classList.add('collapsed');
      btn.textContent = 'Expand sidebar';
    }
  };
  autoCollapse();

  btn.addEventListener('click', () => {
    layout.classList.toggle('collapsed');
    btn.textContent = layout.classList.contains('collapsed') ? 'Expand sidebar' : 'Collapse sidebar';
  });
}

initCliExperience();
initSidebarToggle();
