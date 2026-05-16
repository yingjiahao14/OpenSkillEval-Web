(() => {
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  function initActiveNav() {
    const page = document.body?.dataset?.page;
    if (!page) return;
    const current = qs(`.nav a[data-page="${page}"]`);
    if (current) current.setAttribute('aria-current', 'page');
  }

  function initCliTabs() {
    const root = qs('[data-cli-tabs]');
    if (!root) return;
    const tabs = qsa('[role="tab"]', root);
    const output = qs('[data-cli-install]', root);
    const copyBtn = qs('[data-copy-btn]', root);
    if (!output) return;

    const commands = {
      npm: 'npm i -g @commerceforge/cli@latest',
      yarn: 'yarn global add @commerceforge/cli@latest',
      pnpm: 'pnpm add -g @commerceforge/cli@latest',
    };

    function setTab(id) {
      tabs.forEach((t) => {
        const selected = t.dataset.tab === id;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      output.textContent = commands[id] ?? commands.npm;
    }

    tabs.forEach((t) => {
      t.addEventListener('click', () => setTab(t.dataset.tab));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        const idx = tabs.indexOf(t);
        const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        setTab(tabs[next].dataset.tab);
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(output.textContent.trim());
          copyBtn.textContent = 'Copied';
          setTimeout(() => (copyBtn.textContent = 'Copy'), 900);
        } catch {
          copyBtn.textContent = 'Copy failed';
          setTimeout(() => (copyBtn.textContent = 'Copy'), 900);
        }
      });
    }

    setTab('npm');
  }

  function initAccordion() {
    const root = qs('[data-accordion="cli"]');
    if (!root) return;
    const items = qsa('[data-acc-item]', root);

    function openItem(item) {
      items.forEach((it) => {
        const btn = qs('button[data-acc-btn]', it);
        const panel = qs('[data-acc-panel]', it);
        const isTarget = it === item;
        it.dataset.open = isTarget ? 'true' : 'false';
        if (btn) btn.setAttribute('aria-expanded', isTarget ? 'true' : 'false');
        if (panel) panel.style.maxHeight = isTarget ? `${panel.scrollHeight}px` : '0px';
      });
    }

    items.forEach((it) => {
      const btn = qs('button[data-acc-btn]', it);
      btn?.addEventListener('click', () => openItem(it));
    });

    // Default open the first accordion.
    if (items[0]) openItem(items[0]);

    // Recompute heights on resize.
    window.addEventListener('resize', () => {
      const open = items.find((it) => it.dataset.open === 'true');
      if (!open) return;
      const panel = qs('[data-acc-panel]', open);
      if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
  }

  function initSidebarCollapse() {
    const wrap = qs('[data-docs-wrap]');
    if (!wrap) return;
    const btn = qs('[data-sidebar-toggle]', wrap);
    const storageKey = `cf.sidebar.${document.body?.dataset?.page || 'docs'}`;

    function apply(state) {
      wrap.dataset.sidebar = state;
      if (btn) {
        const collapsed = state === 'collapsed';
        btn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
        btn.textContent = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
      }
    }

    const saved = localStorage.getItem(storageKey);
    if (saved === 'collapsed' || saved === 'expanded') apply(saved);

    // Auto-collapse on small screens.
    if (window.matchMedia('(max-width: 1023px)').matches) apply('collapsed');

    btn?.addEventListener('click', () => {
      const next = wrap.dataset.sidebar === 'collapsed' ? 'expanded' : 'collapsed';
      apply(next);
      localStorage.setItem(storageKey, next);
    });
  }

  function initAssistantSearch() {
    const openBtn = qs('[data-open-assistant]');
    const modal = qs('[data-assistant-modal]');
    const closeBtn = qs('[data-close-assistant]');
    const input = qs('[data-assistant-input]');
    const results = qs('[data-assistant-results]');
    if (!openBtn || !modal || !input || !results) return;

    const index = (window.__CF_SEARCH_INDEX__ || []).map((r) => ({
      ...r,
      hay: `${r.title} ${r.description}`.toLowerCase(),
    }));

    function render(list) {
      results.innerHTML = '';
      if (!list.length) {
        results.innerHTML = '<div class="result"><div class="muted">No matches. Try “CLI”, “UCP”, or “Hydrogen”.</div></div>';
        return;
      }
      list.slice(0, 8).forEach((r) => {
        const div = document.createElement('div');
        div.className = 'result';
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start;">
            <div>
              <div style="font-weight:650; letter-spacing:-0.01em;">
                <a href="${r.href}">${r.title}</a>
              </div>
              <div class="muted" style="margin-top:4px;">${r.description}</div>
            </div>
            <div class="kbd">${r.kbd || 'Enter'}</div>
          </div>
        `;
        results.appendChild(div);
      });
    }

    function open() {
      modal.dataset.open = 'true';
      input.value = '';
      render(index);
      setTimeout(() => input.focus(), 0);
    }

    function close() {
      modal.dataset.open = 'false';
      openBtn.focus();
    }

    openBtn.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
    document.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      const cmdK = (isMac && e.metaKey && e.key.toLowerCase() === 'k') || (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k');
      if (cmdK) {
        e.preventDefault();
        modal.dataset.open === 'true' ? close() : open();
      }
      if (e.key === 'Escape' && modal.dataset.open === 'true') close();
    });

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) return render(index);
      render(index.filter((r) => r.hay.includes(q)));
    });
  }

  initActiveNav();
  initCliTabs();
  initAccordion();
  initSidebarCollapse();
  initAssistantSearch();
})();

