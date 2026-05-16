// App behavior
document.addEventListener('DOMContentLoaded', () => {
  // Setup theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
      // swap icon
      themeToggle.innerHTML = isLight 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
    });
  }

  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileMenuBtn.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    });
  }

  // Sidebar toggle
  const sidebarBtn = document.getElementById('sidebar-collapse-btn');
  const sidebarBtnMobile = document.getElementById('sidebar-mobile-toggle');
  const sidebar = document.getElementById('sidebar');
  const appContainer = document.querySelector('.app-container');
  
  if (sidebarBtn && sidebar && appContainer) {
    sidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      appContainer.classList.toggle('sidebar-collapsed');
      
      const isCollapsed = sidebar.classList.contains('collapsed');
      sidebarBtn.innerHTML = isCollapsed
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg> <span>Expand sidebar</span>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg> <span>Collapse sidebar</span>';
    });
  }

  // Accordions
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(acc => {
    const header = acc.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // Close others
      accordions.forEach(other => {
        if (other !== acc) {
          other.classList.remove('active');
        }
      });
      // Toggle current
      acc.classList.toggle('active');
    });
  });

  // Code Tabs
  const codeBlocks = document.querySelectorAll('.code-block');
  codeBlocks.forEach(block => {
    const tabs = block.querySelectorAll('.code-tab');
    const content = block.querySelector('.code-content code');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active from all tabs in this block
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update content
        const pm = tab.getAttribute('data-pm');
        const isInit = tab.getAttribute('data-cmd') === 'init';
        const type = tab.getAttribute('data-type');
        
        let installCmd = '';
        if (pm === 'npm') installCmd = 'npm i -g @commerceforge/cli@latest';
        else if (pm === 'yarn') installCmd = 'yarn global add @commerceforge/cli@latest';
        else if (pm === 'pnpm') installCmd = 'pnpm add -g @commerceforge/cli@latest';

        let runCmd = '';
        if (type === 'app') runCmd = 'commerceforge app init';
        else if (type === 'theme') runCmd = 'commerceforge theme init';
        else if (type === 'hydrogen') runCmd = 'commerceforge hydrogen init';

        if (isInit) {
          content.innerHTML = `<span class="command-prefix">$</span>${runCmd}`;
        } else {
          content.innerHTML = `<span class="command-prefix">$</span>${installCmd}`;
        }
      });
    });
  });
});