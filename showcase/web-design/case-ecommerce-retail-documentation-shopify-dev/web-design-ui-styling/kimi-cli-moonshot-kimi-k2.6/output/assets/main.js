// CommerceForge Dev Docs — Global Scripts

(function() {
  'use strict';

  // Mobile nav toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('svg');
      if (mobileNav.classList.contains('active')) {
        icon.innerHTML = '<line x1=\'18\' y1=\'6\' x2=\'6\' y2=\'18\'></line><line x1=\'6\' y1=\'6\' x2=\'18\' y2=\'18\'></line>';
      } else {
        icon.innerHTML = '<line x1=\'3\' y1=\'12\' x2=\'21\' y2=\'12\'></line><line x1=\'3\' y1=\'6\' x2=\'21\' y2=\'6\'></line><line x1=\'3\' y1=\'18\' x2=\'21\' y2=\'18\'></line>';
      }
    });
  }

  // Accordion (single open at a time)
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      accordionItems.forEach(i => i.classList.remove('active'));
      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Tabs
  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = group.querySelector(`.tab-panel[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  // Sidebar collapse
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      if (mainContent) {
        mainContent.classList.toggle('sidebar-collapsed');
      }
      // Update aria
      const expanded = !sidebar.classList.contains('collapsed');
      sidebarToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Mobile sidebar overlay
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileSidebarToggle = document.querySelector('.mobile-sidebar-toggle');

  if (mobileSidebarToggle && sidebar) {
    mobileSidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      if (mobileOverlay) mobileOverlay.classList.toggle('active');
    });
  }

  if (mobileOverlay && sidebar) {
    mobileOverlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      mobileOverlay.classList.remove('active');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a, .sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
