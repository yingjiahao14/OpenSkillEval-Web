(function () {
  const state = {
    menuOpen: false,
  };

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function setMenu(open) {
    state.menuOpen = open;
    const menu = qs('[data-mobile-nav]');
    const btn = qs('[data-menu-btn]');
    if (!menu || !btn) return;
    menu.dataset.open = open ? 'true' : 'false';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function initMenu() {
    const btn = qs('[data-menu-btn]');
    if (!btn) return;
    btn.addEventListener('click', () => setMenu(!state.menuOpen));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });

    // Close when navigating
    const mobile = qs('[data-mobile-nav]');
    if (mobile) {
      qsa('a', mobile).forEach((a) => {
        a.addEventListener('click', () => setMenu(false));
      });
    }
  }

  function initLoadMore() {
    const btn = qs('[data-load-more]');
    const grid = qs('[data-article-grid]');
    if (!btn || !grid) return;

    const template = qsa('template[data-article-template]').map((t) => t.content);
    let page = 0;

    btn.addEventListener('click', () => {
      page += 1;
      const frag = document.createDocumentFragment();
      template.forEach((content) => {
        const node = document.importNode(content, true);
        const card = node.querySelector('[data-article-card]');
        if (card) card.dataset.appended = String(page);
        frag.appendChild(node);
      });
      grid.appendChild(frag);
      btn.blur();
    });
  }

  function initDonationTabs() {
    const root = qs('[data-donation]');
    if (!root) return;
    const desc = qs('[data-donation-desc]', root);
    const tabs = qsa('[data-amount]', root);
    const sub = qs('[data-donation-sub]', root);

    function setAmount(amount) {
      tabs.forEach((t) => t.setAttribute('aria-pressed', t.dataset.amount === String(amount) ? 'true' : 'false'));
      if (desc) desc.textContent = `Your $${amount} donation will provide 1,000 hours of learning to people around the world each month.`;
      if (sub) sub.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
    }

    tabs.forEach((t) => {
      t.addEventListener('click', () => setAmount(t.dataset.amount));
    });

    const active = tabs.find((t) => t.getAttribute('aria-pressed') === 'true');
    setAmount(active ? active.dataset.amount : 20);
  }

  function initAccordion() {
    const acc = qs('[data-accordion]');
    if (!acc) return;

    qsa('[data-acc-btn]', acc).forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('[data-acc-item]');
        const panel = item ? qs('[data-acc-panel]', item) : null;
        if (!item || !panel) return;

        const isOpen = item.dataset.open === 'true';
        item.dataset.open = isOpen ? 'false' : 'true';
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

        if (isOpen) {
          panel.style.maxHeight = '0px';
        } else {
          // Measure content height for smooth animation
          const inner = qs('.inner', panel);
          const height = inner ? inner.scrollHeight : panel.scrollHeight;
          panel.style.maxHeight = `${height}px`;
        }
      });
    });

    // Initialize open panels based on data-open
    qsa('[data-acc-item]', acc).forEach((item) => {
      const panel = qs('[data-acc-panel]', item);
      if (!panel) return;
      if (item.dataset.open === 'true') {
        const inner = qs('.inner', panel);
        const height = inner ? inner.scrollHeight : panel.scrollHeight;
        panel.style.maxHeight = `${height}px`;
      } else {
        panel.style.maxHeight = '0px';
      }
    });
  }

  function initActiveNav() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    qsa('[data-nav] a').forEach((a) => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      const isCurrent = href === path;
      if (isCurrent) a.setAttribute('aria-current', 'page');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initActiveNav();
    initLoadMore();
    initDonationTabs();
    initAccordion();
  });
})();
