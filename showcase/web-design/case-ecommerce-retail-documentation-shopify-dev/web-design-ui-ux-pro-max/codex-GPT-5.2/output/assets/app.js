(function () {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function setToast(message) {
    const toast = qs('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.dataset.open = 'true';
    window.clearTimeout(setToast._t);
    setToast._t = window.setTimeout(() => {
      toast.dataset.open = 'false';
    }, 2200);
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      setToast('Copied to clipboard');
    } catch {
      setToast('Copy failed — select and copy manually');
    }
  }

  // ----- CLI accordion (single open) + install tabs -----
  function initCliSetup() {
    const root = qs('[data-cli-setup]');
    if (!root) return;

    const accordion = qs('[data-accordion]', root);
    const accItems = accordion ? qsa('[data-acc-item]', accordion) : [];

    function openItem(targetId) {
      accItems.forEach((item) => {
        const isTarget = item.getAttribute('data-acc-item') === targetId;
        item.dataset.open = isTarget ? 'true' : 'false';
        const trigger = qs('[data-acc-trigger]', item);
        const panel = qs('[data-acc-panel]', item);
        if (trigger) trigger.setAttribute('aria-expanded', isTarget ? 'true' : 'false');
        if (panel) panel.hidden = !isTarget;
      });
    }

    accItems.forEach((item) => {
      const trigger = qs('[data-acc-trigger]', item);
      const id = item.getAttribute('data-acc-item');
      if (!trigger || !id) return;
      trigger.addEventListener('click', () => openItem(id));
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openItem(id);
        }
      });
    });

    // Install tabs update install command string in both accordion + standalone block.
    const tablist = qs('[data-tablist]', root);
    const codeEl = qs('[data-install-code]', root);
    const copyBtn = qs('[data-copy-install]', root);
    if (!tablist || !codeEl) {
      if (accItems.length) openItem(accItems[0].getAttribute('data-acc-item'));
      return;
    }

    const commands = {
      npm: 'npm i -g @commerceforge/cli@latest',
      yarn: 'yarn global add @commerceforge/cli@latest',
      pnpm: 'pnpm add -g @commerceforge/cli@latest'
    };

    function setPm(pm) {
      qsa('[role="tab"]', tablist).forEach((t) => {
        const selected = t.getAttribute('data-pm') === pm;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      codeEl.textContent = commands[pm] || commands.npm;
      root.setAttribute('data-pm', pm);
    }

    tablist.addEventListener('click', (e) => {
      const btn = e.target.closest('[role="tab"]');
      if (!btn) return;
      const pm = btn.getAttribute('data-pm');
      if (pm) setPm(pm);
    });

    tablist.addEventListener('keydown', (e) => {
      const tabs = qsa('[role="tab"]', tablist);
      const current = document.activeElement;
      const idx = tabs.indexOf(current);
      if (idx < 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        const pm = tabs[next].getAttribute('data-pm');
        if (pm) setPm(pm);
      }
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => copyToClipboard(codeEl.textContent));
    }

    // Default states
    setPm('npm');
    if (accItems.length) openItem(accItems[0].getAttribute('data-acc-item'));
  }

  // ----- Docs sidebar collapse -----
  function initSidebarCollapse() {
    const root = qs('[data-docs]');
    if (!root) return;
    const btn = qs('[data-sidebar-toggle]', root);
    const sidebar = qs('[data-sidebar]', root);
    if (!btn || !sidebar) return;

    const key = root.getAttribute('data-sidebar-key') || 'cf_sidebar';

    function setCollapsed(collapsed) {
      root.dataset.sidebarCollapsed = collapsed ? 'true' : 'false';
      sidebar.hidden = !!collapsed;
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      btn.textContent = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
      if (!reducedMotion) {
        root.style.transition = 'grid-template-columns 180ms ease';
      }
    }

    btn.addEventListener('click', () => {
      const collapsed = root.dataset.sidebarCollapsed === 'true';
      const next = !collapsed;
      setCollapsed(next);
      try {
        localStorage.setItem(key, next ? '1' : '0');
      } catch {}
    });

    // Auto-collapse on small screens.
    const mq = window.matchMedia('(max-width: 980px)');
    const stored = (() => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    })();

    const initial = mq.matches ? true : stored === '1';
    setCollapsed(initial);
    if (mq.addEventListener) {
      mq.addEventListener('change', (e) => {
        if (e.matches) setCollapsed(true);
      });
    }
  }

  // ----- Home in-page nav stubs -----
  function initDisabledLinks() {
    qsa('a[aria-disabled="true"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        setToast('This link is a placeholder in the static build');
      });
    });
  }

  // ----- Sidebar active-link highlighting -----
  function initSidebarActiveLinks() {
    const root = qs('[data-docs]');
    if (!root) return;
    const links = qsa('.side-nav a', root);
    if (!links.length) return;

    function setActive() {
      const y = window.scrollY || window.pageYOffset || 0;
      let activeId = null;
      const targets = links
        .map((a) => {
          const href = a.getAttribute('href') || '';
          if (!href.startsWith('#')) return null;
          const el = qs(href);
          if (!el) return null;
          return { a, el, id: href };
        })
        .filter(Boolean);

      for (const t of targets) {
        const top = t.el.getBoundingClientRect().top + y;
        if (y + 120 >= top) activeId = t.id;
      }

      targets.forEach((t) => {
        const on = t.id === activeId;
        t.a.setAttribute('aria-current', on ? 'true' : 'false');
      });
    }

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  // ----- “Ask assistant” (fake search) -----
  function initAskAssistant() {
    const btn = qs('[data-ask]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      setToast('Assistant search is a demo in this static build');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCliSetup();
    initSidebarCollapse();
    initSidebarActiveLinks();
    initAskAssistant();
    initDisabledLinks();
  });
})();
