document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initPkgTabs();
  initSidebars();
  initMobileMenu();
});

function initAccordions() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const parent = item.parentElement;
      const isActive = item.classList.contains('active');
      parent.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
      updateCodePanel(item);
    });
  });
  const first = document.querySelector('.accordion-item');
  if (first) {
    first.classList.add('active');
    updateCodePanel(first);
  }
}

function updateCodePanel(item) {
  const type = item.dataset.type;
  if (!type) return;
  const initCmds = {
    apps: 'commerceforge app init',
    themes: 'commerceforge theme init',
    storefronts: 'commerceforge hydrogen init'
  };
  document.querySelectorAll('.init-command').forEach(el => {
    el.textContent = initCmds[type] || '';
  });
}

function initPkgTabs() {
  const tabs = document.querySelectorAll('.pkg-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.pkg;
      const panel = tab.closest('.cli-code-panel');
      panel.querySelectorAll('.pkg-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panel.querySelectorAll('.code-block').forEach(b => b.classList.remove('active'));
      const block = panel.querySelector(`.code-block[data-pkg="${target}"]`);
      if (block) block.classList.add('active');
    });
  });
}

function initSidebars() {
  const toggleBtns = document.querySelectorAll('.sidebar-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (!sidebar) return;
      sidebar.classList.toggle('collapsed');
      btn.classList.toggle('collapsed-pos');
      const icon = btn.querySelector('svg use, svg path');
      const isCollapsed = sidebar.classList.contains('collapsed');
      btn.setAttribute('aria-label', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
      btn.querySelector('svg').style.transform = isCollapsed ? 'rotate(180deg)' : '';
    });
  });

  if (window.innerWidth <= 1024) {
    const sidebar = document.querySelector('.sidebar');
    const btn = document.querySelector('.sidebar-toggle');
    if (sidebar) sidebar.classList.add('collapsed');
    if (btn) btn.classList.add('collapsed-pos');
  }
}

function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-nav');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.innerHTML = isOpen
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
  });
}
