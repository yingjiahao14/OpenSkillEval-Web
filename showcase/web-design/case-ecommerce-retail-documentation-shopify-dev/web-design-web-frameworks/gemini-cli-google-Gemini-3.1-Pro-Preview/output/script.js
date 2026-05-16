document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
      themeToggle.innerHTML = isLight ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
    });
  }

  // Sidebar Toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const isCollapsed = sidebar.classList.contains('collapsed');
      sidebarToggle.innerHTML = isCollapsed ? '<i class="ri-menu-unfold-line"></i> Expand sidebar' : '<i class="ri-menu-fold-line"></i> Collapse sidebar';
    });
  }

  // CLI Accordions
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      // If clicking already active, do nothing or collapse? Let's just do accordion style
      const isActive = acc.classList.contains('active');
      
      // Collapse all
      accordions.forEach(a => {
        a.classList.remove('active');
        a.nextElementSibling.classList.remove('active');
      });

      if (!isActive) {
        acc.classList.add('active');
        acc.nextElementSibling.classList.add('active');
        
        // Update code area based on accordion
        updateCodeDisplay();
      }
    });
  });

  // CLI Tabs
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateCodeDisplay();
    });
  });

  function updateCodeDisplay() {
    const activeTab = document.querySelector('.tab-btn.active');
    const activeAccordion = document.querySelector('.accordion-header.active');
    
    if (!activeTab || !activeAccordion) return;

    const pm = activeTab.getAttribute('data-pm'); // npm, yarn, pnpm
    const type = activeAccordion.getAttribute('data-type'); // apps, themes, headless

    // Base install command
    const installCmds = {
      npm: 'npm i -g @commerceforge/cli@latest',
      yarn: 'yarn global add @commerceforge/cli@latest',
      pnpm: 'pnpm add -g @commerceforge/cli@latest'
    };

    // Init command
    const initCmds = {
      apps: 'commerceforge app init',
      themes: 'commerceforge theme init',
      headless: 'commerceforge hydrogen init'
    };

    const codeBlock1 = document.getElementById('code-install');
    const codeBlock2 = document.getElementById('code-init');
    
    if(codeBlock1) {
        codeBlock1.querySelector('.command').textContent = installCmds[pm];
    }
    if(codeBlock2) {
        codeBlock2.querySelector('.command').textContent = initCmds[type];
    }
  }

  // Initialize display
  if(document.querySelector('.accordion-header')) {
    updateCodeDisplay();
  }
});