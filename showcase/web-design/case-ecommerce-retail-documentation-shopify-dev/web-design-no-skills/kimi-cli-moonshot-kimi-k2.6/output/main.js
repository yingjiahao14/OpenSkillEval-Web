// CommerceForge Dev Docs — Global Interactions

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initCodeTabs();
  initSidebar();
  initMobileNav();
});

// Accordions (only one open at a time)
function initAccordions() {
  const groups = document.querySelectorAll('.accordion-group');
  groups.forEach(group => {
    const items = group.querySelectorAll('.accordion');
    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  });
}

// Code tabs
function initCodeTabs() {
  const tabGroups = document.querySelectorAll('.code-block[data-tabs]');
  tabGroups.forEach(block => {
    const tabs = block.querySelectorAll('.code-tab');
    const panes = block.querySelectorAll('.code-pane');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const pane = block.querySelector(`.code-pane[data-pane="${target}"]`);
        if (pane) pane.classList.add('active');
      });
    });
  });
}

// Sidebar collapse
function initSidebar() {
  const toggles = document.querySelectorAll('.sidebar-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const sidebar = btn.closest('.sidebar');
      if (sidebar) sidebar.classList.toggle('collapsed');
    });
  });
}

// Mobile nav
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = btn.querySelector('svg');
    if (nav.classList.contains('open')) {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    } else {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    }
  });
}
