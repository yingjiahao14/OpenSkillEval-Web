/* CommerceForge docs interactions (no build step). */
(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function q(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function setText(el, text) {
    if (!el) return;
    el.textContent = text;
  }

  // Mobile menu
  const mobileToggle = q('[data-mobile-toggle]');
  const mobileNav = q('[data-mobile-nav]');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const open = mobileNav.getAttribute('data-open') === 'true';
      mobileNav.setAttribute('data-open', String(!open));
      mobileToggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // CLI tabs
  const tabs = qa('[data-cli-tab]');
  const installPre = q('[data-install-code]');
  const installLabel = q('[data-install-label]');
  const installCopy = q('[data-copy-install]');
  const installCommands = {
    npm: 'npm i -g @commerceforge/cli@latest',
    yarn: 'yarn global add @commerceforge/cli@latest',
    pnpm: 'pnpm add -g @commerceforge/cli@latest',
  };

  function setActiveTab(id) {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.getAttribute('data-cli-tab') === id)));
    setText(installPre, installCommands[id] || installCommands.npm);
    setText(installLabel, `Install (${id})`);
    if (installCopy) installCopy.setAttribute('data-copy-text', installCommands[id] || installCommands.npm);
  }

  if (tabs.length) {
    tabs.forEach((t) => {
      t.addEventListener('click', () => setActiveTab(t.getAttribute('data-cli-tab')));
    });
    setActiveTab('npm');
  }

  // CLI accordion (one open at a time)
  const accItems = qa('[data-acc-item]');
  function openAccordion(id) {
    accItems.forEach((item) => {
      const isMatch = item.getAttribute('data-acc-item') === id;
      item.setAttribute('data-open', String(isMatch));
      const btn = q('button[data-acc-btn]', item);
      if (btn) btn.setAttribute('aria-expanded', String(isMatch));
    });

    const initCode = q('[data-init-code]');
    const initLabel = q('[data-init-label]');
    const initCopy = q('[data-copy-init]');

    const initCommands = {
      apps: 'commerceforge app init',
      themes: 'commerceforge theme init',
      headless: 'commerceforge hydrogen init',
    };

    setText(initCode, initCommands[id] || initCommands.apps);
    setText(initLabel, `Initialize (${id === 'headless' ? 'headless storefronts' : id})`);
    if (initCopy) initCopy.setAttribute('data-copy-text', initCommands[id] || initCommands.apps);
  }

  if (accItems.length) {
    accItems.forEach((item) => {
      const btn = q('button[data-acc-btn]', item);
      if (!btn) return;
      btn.addEventListener('click', () => openAccordion(item.getAttribute('data-acc-item')));
      btn.addEventListener('keydown', (e) => {
        // Simple roving for accessibility (Up/Down)
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();
        const idx = accItems.indexOf(item);
        const nextIdx = e.key === 'ArrowDown' ? Math.min(accItems.length - 1, idx + 1) : Math.max(0, idx - 1);
        const nextBtn = q('button[data-acc-btn]', accItems[nextIdx]);
        if (nextBtn) nextBtn.focus();
      });
    });
    openAccordion('apps');
  }

  // Copy buttons
  qa('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy-text') || '';
      try {
        await navigator.clipboard.writeText(text);
        const prev = btn.textContent;
        btn.textContent = 'Copied';
        window.setTimeout(() => (btn.textContent = prev), prefersReducedMotion ? 0 : 900);
      } catch {
        // Clipboard may be blocked in file://. Fallback to selection.
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        const prev = btn.textContent;
        btn.textContent = 'Copied';
        window.setTimeout(() => (btn.textContent = prev), prefersReducedMotion ? 0 : 900);
      }
    });
  });

  // Sidebar collapse (apps + agents)
  qa('[data-sidebar]').forEach((sidebar) => {
    const key = sidebar.getAttribute('data-storage-key') || 'cf_sidebar_collapsed';
    const toggle = q('[data-sidebar-toggle]', sidebar);
    const persisted = window.localStorage.getItem(key);
    if (persisted === 'true') sidebar.setAttribute('data-collapsed', 'true');
    // Auto-collapse on small screens
    if (window.matchMedia && window.matchMedia('(max-width: 980px)').matches) sidebar.setAttribute('data-collapsed', 'true');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const collapsed = sidebar.getAttribute('data-collapsed') === 'true';
        sidebar.setAttribute('data-collapsed', String(!collapsed));
        toggle.setAttribute('aria-expanded', String(collapsed));
        window.localStorage.setItem(key, String(!collapsed));
      });
    }
  });

  // Search (simple client-side: highlights matches on current page)
  const searchBtn = q('[data-search-open]');
  const searchInput = q('[data-search-input]');
  const searchStatus = q('[data-search-status]');
  function clearMarks() {
    qa('mark[data-search-mark]').forEach((m) => {
      const parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }

  function markMatches(query) {
    clearMarks();
    if (!query) {
      setText(searchStatus, '');
      return;
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
        if (p.closest('[data-search-ui]')) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const matches = [];
    const qLower = query.toLowerCase();
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const txt = node.nodeValue;
      const idx = txt.toLowerCase().indexOf(qLower);
      if (idx === -1) continue;
      matches.push([node, idx]);
    }
    matches.forEach(([node, idx]) => {
      const txt = node.nodeValue;
      const before = document.createTextNode(txt.slice(0, idx));
      const hit = document.createElement('mark');
      hit.setAttribute('data-search-mark', '');
      hit.textContent = txt.slice(idx, idx + query.length);
      hit.style.background = 'rgba(33,243,194,.18)';
      hit.style.color = 'rgba(255,255,255,.92)';
      hit.style.border = '1px solid rgba(33,243,194,.22)';
      hit.style.borderRadius = '8px';
      hit.style.padding = '0 .16rem';
      const after = document.createTextNode(txt.slice(idx + query.length));
      const parent = node.parentNode;
      parent.insertBefore(before, node);
      parent.insertBefore(hit, node);
      parent.insertBefore(after, node);
      parent.removeChild(node);
    });
    setText(searchStatus, matches.length ? `${matches.length} match${matches.length === 1 ? '' : 'es'} on this page` : 'No matches on this page');
    const first = q('mark[data-search-mark]');
    if (first) first.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      searchInput.focus();
      searchInput.select();
    });
    searchInput.addEventListener('input', () => markMatches(searchInput.value.trim()));
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        clearMarks();
        setText(searchStatus, '');
        searchInput.blur();
      }
    });
  }
})();

