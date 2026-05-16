document.addEventListener('DOMContentLoaded', () => {
  
  // Accordion Logic
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      // Close all others
      accordions.forEach(other => {
        if (other !== acc) {
          other.classList.remove('active');
          const otherContent = document.getElementById(other.getAttribute('aria-controls'));
          if(otherContent) otherContent.classList.remove('active');
        }
      });
      // Toggle current
      acc.classList.toggle('active');
      const content = document.getElementById(acc.getAttribute('aria-controls'));
      if(content) content.classList.toggle('active');
    });
  });

  // Tab Logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if(!targetId) return;

      const group = btn.closest('.tabs-container');
      if(!group) return;

      // Deactivate all in group
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      // Activate selected
      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if(targetPane) targetPane.classList.add('active');
    });
  });

  // Sidebar Collapse Logic
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const docsContent = document.querySelector('.docs-content');

  if (sidebarToggle && sidebar && docsContent) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      docsContent.classList.toggle('expanded');
    });
  }

  // Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
    });
  }

  // Mobile menu simulation (if needed)
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }
});