// ============================================
// CommerceForge Dev Docs — Shared Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordions();
  initTabs();
  initSidebar();
  initScrollAnimations();
});

// --- Mobile Menu ---
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Accordions (only one open at a time) ---
function initAccordions() {
  const accordionGroups = document.querySelectorAll('.accordion');

  accordionGroups.forEach(group => {
    const items = group.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all in this group
        items.forEach(i => i.classList.remove('active'));

        // Open clicked if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  });
}

// --- Tabs ---
function initTabs() {
  const tabGroups = document.querySelectorAll('.tab-group');

  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = group.querySelector(`.tab-panel[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

// --- Sidebar Collapse ---
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const collapseBtn = document.querySelector('.collapse-btn');
  const overlay = document.querySelector('.sidebar-overlay');
  const mobileToggle = document.querySelector('.mobile-sidebar-toggle');

  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const isCollapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebar-collapsed', isCollapsed);
    });

    // Restore state
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') sidebar.classList.add('collapsed');
  }

  // Mobile sidebar toggle
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
    });
  }

  // Close mobile sidebar on overlay click
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
}

// --- Scroll Animations ---
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.card, .section-header, .launch-card, .community-card, .support-card, .protocol-actor').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}
