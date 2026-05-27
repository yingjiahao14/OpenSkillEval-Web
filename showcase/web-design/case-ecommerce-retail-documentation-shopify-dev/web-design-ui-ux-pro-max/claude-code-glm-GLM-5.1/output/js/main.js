/* CommerceForge Dev Docs — Interactions */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordion();
  initTabs();
  initSidebar();
  initActiveNav();
});

/* --- Mobile Menu --- */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const expanded = menu.classList.contains('open');
    btn.setAttribute('aria-expanded', expanded);
    const icon = btn.querySelector('svg use');
    if (icon) icon.setAttribute('href', expanded ? '#icon-x' : '#icon-menu');
  });
}

/* --- Accordion (single-open) --- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      items.forEach(i => {
        i.classList.remove('active');
        const h = i.querySelector('.accordion-header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --- Tabs --- */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const container = tabGroup.closest('.tabbed-code') || tabGroup.parentElement;
    const panels = container.querySelectorAll('.tab-panel');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* --- Sidebar --- */
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  const mobileBtn = document.querySelector('.mobile-sidebar-btn');
  if (!sidebar) return;

  // Desktop toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const icon = toggle.querySelector('svg');
      if (icon) icon.style.transform = sidebar.classList.contains('collapsed') ? 'rotate(180deg)' : '';
    });
  }

  // Mobile sidebar open
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Auto-collapse on mobile
  function checkMobile() {
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('mobile-open');
    }
  }
  window.addEventListener('resize', checkMobile);
  checkMobile();
}

/* --- Active Nav Link --- */
function initActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });
}
