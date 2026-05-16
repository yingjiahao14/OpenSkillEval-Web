/* CommerceForge Dev Docs — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Accordion (single-open) =====
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(acc => {
    const triggers = acc.querySelectorAll('.accordion-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const isActive = item.classList.contains('active');
        // Close all items in this accordion group
        const siblings = acc.querySelectorAll('.accordion-item');
        siblings.forEach(s => s.classList.remove('active'));
        // Open clicked item if it was closed
        if (!isActive) {
          item.classList.add('active');
          const panel = item.querySelector('.accordion-panel');
          if (panel) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        }
        // Update max-heights after transition
        requestAnimationFrame(updateAccordionHeights);
      });
    });
    // Initialize heights
    updateAccordionHeights();
  });

  function updateAccordionHeights() {
    document.querySelectorAll('.accordion-item').forEach(item => {
      const panel = item.querySelector('.accordion-panel');
      if (!panel) return;
      if (item.classList.contains('active')) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = '0';
      }
    });
  }

  // ===== Package Manager Tabs =====
  const tabGroups = document.querySelectorAll('.tabs');
  tabGroups.forEach(tabs => {
    const tabBtns = tabs.querySelectorAll('.tab-btn');
    const tabPanels = tabs.querySelectorAll('.tab-panel');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabPanels.forEach(p => {
          if (p.getAttribute('data-tab') === target) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    });
  });

  // ===== Sidebar Collapse =====
  const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
  sidebarToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const sidebar = toggle.closest('.with-sidebar').querySelector('.sidebar');
      if (!sidebar) return;
      sidebar.classList.toggle('collapsed');
      const icon = toggle.querySelector('.sidebar-toggle-icon');
      if (icon) {
        icon.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✕';
      }
      // Store preference
      const page = document.body.getAttribute('data-page');
      if (page) {
        localStorage.setItem('cf-sidebar-' + page, sidebar.classList.contains('collapsed'));
      }
    });
  });

  // Restore sidebar state
  document.querySelectorAll('.with-sidebar').forEach(container => {
    const sidebar = container.querySelector('.sidebar');
    const page = document.body.getAttribute('data-page');
    if (sidebar && page && localStorage.getItem('cf-sidebar-' + page) === 'true') {
      sidebar.classList.add('collapsed');
      const icon = container.querySelector('.sidebar-toggle-icon');
      if (icon) icon.textContent = '☰';
    }
  });

  // Auto-collapse sidebar on small screens
  function handleSidebarResponsive() {
    document.querySelectorAll('.with-sidebar').forEach(container => {
      const sidebar = container.querySelector('.sidebar');
      if (!sidebar) return;
      if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
      } else {
        const page = document.body.getAttribute('data-page');
        if (page && localStorage.getItem('cf-sidebar-' + page) === 'true') {
          sidebar.classList.add('collapsed');
        } else {
          sidebar.classList.remove('collapsed');
        }
      }
      const icon = container.querySelector('.sidebar-toggle-icon');
      if (icon) {
        icon.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✕';
      }
    });
  }

  window.addEventListener('resize', handleSidebarResponsive);
  handleSidebarResponsive();

  // ===== Mobile Nav Toggle =====
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== Active Nav Link =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== Copy to Clipboard =====
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.code-block').querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--accent)';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        // Fallback
        const range = document.createRange();
        range.selectNode(code);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    });
  });

  // ===== Dark Mode Toggle =====
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('cf-theme');
    if (savedTheme === 'light') {
      setLightMode();
    }
    themeToggle.addEventListener('click', () => {
      if (document.body.classList.contains('light-mode')) {
        setDarkMode();
      } else {
        setLightMode();
      }
    });
  }

  function setDarkMode() {
    document.body.classList.remove('light-mode');
    localStorage.setItem('cf-theme', 'dark');
    updateThemeIcon();
  }

  function setLightMode() {
    document.body.classList.add('light-mode');
    localStorage.setItem('cf-theme', 'light');
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const icon = themeToggle?.querySelector('svg');
    if (icon && document.body.classList.contains('light-mode')) {
      icon.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor"/>';
    } else if (icon) {
      icon.innerHTML = '<circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
    }
  }
});
