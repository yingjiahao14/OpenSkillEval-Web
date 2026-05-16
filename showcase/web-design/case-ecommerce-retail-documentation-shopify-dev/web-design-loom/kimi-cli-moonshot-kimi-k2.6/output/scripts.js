/**
 * CommerceForge Dev Docs — Shared Scripts
 */

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-open');
    nav.style.display = isOpen ? 'flex' : '';
  });
}

// ============================================
// Accordion (single-open)
// ============================================
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-item');
  if (!accordions.length) return;

  accordions.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      accordions.forEach(a => a.classList.remove('active'));

      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ============================================
// Code Tabs
// ============================================
function initCodeTabs() {
  const tabGroups = document.querySelectorAll('.code-tabs');
  if (!tabGroups.length) return;

  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll('.code-tab');
    const block = group.closest('.code-block');
    if (!block) return;

    const contents = block.querySelectorAll('.code-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        contents.forEach(c => {
          c.classList.toggle('hidden', c.dataset.tab !== target);
        });
      });
    });
  });
}

// ============================================
// Sidebar Collapse
// ============================================
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  if (!sidebar || !toggle) return;

  // Restore state
  const collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
  if (collapsed) sidebar.classList.add('collapsed');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
  });
}

// ============================================
// Smooth scroll for anchor links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// Active nav link highlighting
// ============================================
function initActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// Initialize all
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordions();
  initCodeTabs();
  initSidebar();
  initSmoothScroll();
  initActiveNav();
});
