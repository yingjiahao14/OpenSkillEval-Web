document.addEventListener('DOMContentLoaded', () => {
  // Accordion Logic
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(acc => {
    const header = acc.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // Close all others
      accordions.forEach(other => {
        if (other !== acc) other.classList.remove('active');
      });
      // Toggle current
      acc.classList.toggle('active');
    });
  });

  // Package Manager Tab Logic
  const tabs = document.querySelectorAll('.tab');
  const installCodes = document.querySelectorAll('.install-cmd');

  const commands = {
    npm: 'npm i -g @commerceforge/cli@latest',
    yarn: 'yarn global add @commerceforge/cli@latest',
    pnpm: 'pnpm add -g @commerceforge/cli@latest'
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const pkg = tab.dataset.pkg;
      
      // Update all install command snippets
      installCodes.forEach(codeEl => {
        codeEl.textContent = commands[pkg];
      });
    });
  });

  // Sidebar Collapse Logic
  const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  sidebarToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (sidebar) {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        toggle.innerHTML = isCollapsed ? 
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg> Expand sidebar' : 
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg> Collapse sidebar';
      }
    });
  });
});