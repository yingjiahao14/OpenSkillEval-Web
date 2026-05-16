/**
 * CommerceForge Dev Docs — Shared JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initTabs();
  initSidebars();
  initCopyButtons();
  initMobileNav();
});

/* ============================================
   Accordions (only one open at a time)
   ============================================ */

function initAccordions() {
  const accordionGroups = document.querySelectorAll('.accordion-group');

  accordionGroups.forEach(group => {
    const items = group.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all in group
        items.forEach(i => i.classList.remove('open'));

        // Open clicked if it wasn't already open
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  });
}

/* ============================================
   Tabs
   ============================================ */

function initTabs() {
  const tabBars = document.querySelectorAll('.tab-bar');

  tabBars.forEach(bar => {
    const buttons = bar.querySelectorAll('.tab-btn');
    const panels = bar.closest('.accordion-body')
      ? bar.closest('.accordion-body').querySelectorAll('.tab-panel')
      : document.querySelectorAll(`[data-tab-group="${bar.dataset.tabGroup}"]`);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        // Update buttons
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update panels
        panels.forEach(panel => {
          if (panel.dataset.tab === target) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  });
}

/* ============================================
   Sidebar Collapse
   ============================================ */

function initSidebars() {
  const toggles = document.querySelectorAll('.sidebar-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const sidebar = toggle.closest('.sidebar');
      sidebar.classList.toggle('collapsed');

      // Update aria
      const isCollapsed = sidebar.classList.contains('collapsed');
      toggle.setAttribute('aria-expanded', !isCollapsed);
    });
  });
}

/* ============================================
   Copy to Clipboard
   ============================================ */

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.closest('.code-block').querySelector('code');
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.innerText);
        const original = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => (btn.innerText = original), 1500);
      } catch (err) {
        console.error('Copy failed', err);
      }
    });
  });
}

/* ============================================
   Mobile Navigation
   ============================================ */

function initMobileNav() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });
}
