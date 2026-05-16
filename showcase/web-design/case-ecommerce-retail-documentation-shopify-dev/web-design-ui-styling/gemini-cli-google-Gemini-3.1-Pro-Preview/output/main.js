document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Nav Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Accordion Logic
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (!item) return;
      
      const parent = item.parentElement;
      const allItems = parent.querySelectorAll('.accordion-item');
      
      const isCurrentlyActive = item.classList.contains('active');
      
      // Close others
      allItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-content').setAttribute('aria-expanded', 'false');
      });
      
      if (!isCurrentlyActive) {
        item.classList.add('active');
        item.querySelector('.accordion-content').setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Package Manager Tabs
  const pmTabs = document.querySelectorAll('.tab-btn[data-pm]');
  pmTabs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pm = e.target.dataset.pm;
      updatePackageManagers(pm);
    });
  });

  function updatePackageManagers(pm) {
    const snippets = {
      'npm': 'npm i -g @commerceforge/cli@latest',
      'yarn': 'yarn global add @commerceforge/cli@latest',
      'pnpm': 'pnpm add -g @commerceforge/cli@latest'
    };
    
    document.querySelectorAll('.cli-install-snippet').forEach(el => {
      el.textContent = snippets[pm];
    });
    
    pmTabs.forEach(b => {
      if (b.dataset.pm === pm) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  // Sidebar Collapse
  const sidebarBtn = document.getElementById('sidebar-collapse-btn');
  const sidebar = document.getElementById('sidebar');
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      
      // Optional: Store preference in localStorage
      if (sidebar.classList.contains('collapsed')) {
        localStorage.setItem('sidebarCollapsed', 'true');
      } else {
        localStorage.setItem('sidebarCollapsed', 'false');
      }
    });
    
    // Check initial state
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
      sidebar.classList.add('collapsed');
    }
  }
});
