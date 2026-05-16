(function () {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  // Active nav link
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('[data-nav] a').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  // Mobile menu
  const mobileBtn = $('[data-mobile-toggle]');
  const mobileMenu = $('[data-mobile-menu]');
  if (mobileBtn && mobileMenu) {
    const setOpen = (open) => {
      mobileBtn.setAttribute('aria-expanded', String(open));
      mobileMenu.style.display = open ? 'block' : 'none';
    };
    setOpen(false);

    mobileBtn.addEventListener('click', () => {
      const open = mobileBtn.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
    });

    // Close on link click
    $$('#' + mobileMenu.id + ' a', document).forEach((a) => {
      a.addEventListener('click', () => setOpen(false));
    });
  }

  // Country selector (footer)
  const regionBtn = $('[data-region-trigger]');
  const dialog = $('[data-region-dialog]');
  if (regionBtn && dialog) {
    const closeBtn = $('[data-region-close]', dialog);
    const live = $('[data-region-live]');
    const setOpen = (open) => {
      dialog.dataset.open = open ? 'true' : 'false';
      regionBtn.setAttribute('aria-expanded', String(open));
      if (open) {
        const focusTarget = $('[data-region-close]', dialog) || dialog;
        setTimeout(() => focusTarget.focus(), 0);
      } else {
        regionBtn.focus();
      }
    };

    regionBtn.addEventListener('click', () => {
      const open = dialog.dataset.open !== 'true';
      setOpen(open);
    });
    closeBtn?.addEventListener('click', () => setOpen(false));
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dialog.dataset.open === 'true') setOpen(false);
    });

    $$('[data-region]', dialog).forEach((btn) => {
      btn.addEventListener('click', () => {
        const label = btn.getAttribute('data-region') || 'Region selected';
        regionBtn.querySelector('[data-region-label]')?.replaceChildren(document.createTextNode(label));
        if (live) live.textContent = `Region set to ${label}.`;
        setOpen(false);
      });
    });

    // init
    setOpen(false);
  }
})();

