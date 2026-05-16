/* CommerceForge Dev Docs — Main JavaScript */

(function () {
  'use strict';

  // ── Mobile Menu ──
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        const isOpen = mobileNav.classList.contains('open');
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons();
      }
    });
  }

  // ── Sidebar Collapse ──
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        const isCollapsed = sidebar.classList.contains('collapsed');
        icon.setAttribute('data-lucide', isCollapsed ? 'chevrons-right' : 'chevrons-left');
        lucide.createIcons();
      }
    });
  }

  // ── Mobile Sidebar Toggle ──
  const mobileSidebarBtn = document.querySelector('.mobile-sidebar-btn');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');

  if (mobileSidebarBtn && sidebar) {
    mobileSidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('open');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });
  }

  // ── Accordion (single open) ──
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all siblings
      const parent = item.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('open');
        });
      }

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ── Code Tabs ──
  const codeBlocks = document.querySelectorAll('.code-block');

  codeBlocks.forEach(block => {
    const tabs = block.querySelectorAll('.code-tab');
    const panels = block.querySelectorAll('.code-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach(p => {
          p.classList.toggle('hidden', p.dataset.panel !== target);
        });
      });
    });
  });

  // ── Copy Code ──
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.code-block').querySelector('.code-body pre');
      if (!code) return;

      navigator.clipboard.writeText(code.textContent).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" style="width:14px;height:14px;"></i> Copied';
        lucide.createIcons();
        setTimeout(() => {
          btn.innerHTML = original;
          lucide.createIcons();
        }, 1500);
      });
    });
  });

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Initialize Lucide icons ──
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
})();
