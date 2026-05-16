/* CommerceForge Dev Docs - Interactions */

// Accordion (one open at a time)
function initAccordion() {
  const accordions = document.querySelectorAll('.cli-accordion');

  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all items in this accordion
        items.forEach(i => i.classList.remove('open'));

        // Open clicked item if it wasn't already open
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  });
}

// Package manager tabs
function initCodeTabs() {
  const tabContainers = document.querySelectorAll('.code-tabs-container');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.code-tab');
    const contents = container.querySelectorAll('.code-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding content
        contents.forEach(content => {
          content.classList.remove('active');
          if (content.dataset.content === target) {
            content.classList.add('active');
          }
        });
      });
    });
  });
}

// Sidebar collapse
function initSidebar() {
  const sidebars = document.querySelectorAll('.sidebar');

  sidebars.forEach(sidebar => {
    const toggle = sidebar.querySelector('.sidebar-toggle');

    if (toggle) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');

        // Update button icon
        const isCollapsed = sidebar.classList.contains('collapsed');
        toggle.setAttribute('aria-label', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
      });
    }
  });
}

// Search modal (placeholder)
function initSearch() {
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      // Placeholder for search functionality
      alert('Search functionality would open here');
    });
  }
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initCodeTabs();
  initSidebar();
  initSearch();
});
