/* ============================================
   CommerceForge Dev Docs — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initTabs();
  initSidebar();
  initMobileNav();
  initCodeCopy();
});

/* --- Accordion (single-open) --- */
function initAccordion() {
  const containers = document.querySelectorAll('[data-accordion]');

  containers.forEach(container => {
    const items = container.querySelectorAll('.accordion__item');

    items.forEach(item => {
      const trigger = item.querySelector('.accordion__trigger');

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all items in this accordion group
        items.forEach(i => i.classList.remove('is-open'));

        // Toggle clicked item
        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    });

    // Open first item by default
    if (items.length > 0 && !container.querySelector('.is-open')) {
      items[0].classList.add('is-open');
    }
  });
}

/* --- Tabs --- */
function initTabs() {
  const tabGroups = document.querySelectorAll('[data-tabs]');

  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll('.tabs__tab');
    const panels = group.querySelectorAll('.tabs__panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        // Deactivate all
        tabs.forEach(t => t.classList.remove('is-active'));
        panels.forEach(p => p.classList.remove('is-active'));

        // Activate target
        tab.classList.add('is-active');
        const targetPanel = group.querySelector(`[data-panel="${target}"]`);
        if (targetPanel) targetPanel.classList.add('is-active');
      });
    });
  });
}

/* --- Sidebar --- */
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  const toggleBtn = document.querySelector('[data-sidebar-toggle]');

  if (!sidebar || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('is-collapsed');
    if (mainContent) {
      mainContent.classList.toggle('is-expanded');
    }

    // Update toggle icon
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      if (sidebar.classList.contains('is-collapsed')) {
        icon.className = 'ri-menu-line';
        toggleBtn.querySelector('span').textContent = 'Expand sidebar';
      } else {
        icon.className = 'ri-side-bar-line';
        toggleBtn.querySelector('span').textContent = 'Collapse sidebar';
      }
    }
  });

  // Mobile: auto-collapse sidebar
  const mql = window.matchMedia('(max-width: 768px)');
  function handleMobile(e) {
    if (e.matches) {
      sidebar.classList.add('is-collapsed');
      if (mainContent) mainContent.classList.add('is-expanded');
    } else {
      sidebar.classList.remove('is-collapsed');
      if (mainContent) mainContent.classList.remove('is-expanded');
    }
  }
  mql.addEventListener('change', handleMobile);
  handleMobile(mql);
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('.nav__links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
    });
  });
}

/* --- Code Copy --- */
function initCodeCopy() {
  document.querySelectorAll('.code-block__copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block');
      const text = codeBlock.textContent.replace('Copy', '').trim();

      navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = '<i class="ri-check-line"></i> Copied';
        setTimeout(() => {
          btn.innerHTML = '<i class="ri-file-copy-line"></i> Copy';
        }, 2000);
      });
    });
  });
}
