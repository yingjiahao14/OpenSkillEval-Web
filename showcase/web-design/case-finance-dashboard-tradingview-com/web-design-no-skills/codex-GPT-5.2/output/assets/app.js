/* ChartPulse UI interactions (no build step). */
(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function setupTabs(groupEl) {
    const tabs = qsa('[role="tab"]', groupEl);
    const panels = qsa('[role="tabpanel"]', groupEl);
    const setActive = (id) => {
      tabs.forEach((t) => {
        const on = t.getAttribute('data-tab') === id;
        t.setAttribute('aria-selected', String(on));
      });
      panels.forEach((p) => {
        p.hidden = p.getAttribute('data-panel') !== id;
      });
    };

    tabs.forEach((t) => {
      t.addEventListener('click', () => setActive(t.getAttribute('data-tab')));
    });

    const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.getAttribute('data-tab') || tabs[0]?.getAttribute('data-tab');
    if (initial) setActive(initial);
  }

  function setupAccordions() {
    qsa('[data-accordion]').forEach((acc) => {
      qsa('.section', acc).forEach((sec) => {
        const btn = qs('.accBtn', sec);
        if (!btn) return;
        btn.addEventListener('click', () => {
          const expanded = sec.getAttribute('aria-expanded') !== 'false';
          sec.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
      });
    });
  }

  function setupTimeframes() {
    const tfWrap = qs('[data-timeframes]');
    const chart = qs('[data-chart]');
    const legendRange = qs('[data-range-label]');
    if (!tfWrap || !chart) return;

    const setTf = (id) => {
      qsa('.tf', tfWrap).forEach((b) => b.setAttribute('aria-selected', String(b.getAttribute('data-tf') === id)));
      chart.setAttribute('data-range', id);
      if (legendRange) legendRange.textContent = id;
    };

    qsa('.tf', tfWrap).forEach((b) => b.addEventListener('click', () => setTf(b.getAttribute('data-tf'))));
    const init = qsa('.tf', tfWrap).find((b) => b.getAttribute('aria-selected') === 'true')?.getAttribute('data-tf') || '1D';
    setTf(init);
  }

  function setupDetailTabs() {
    qsa('[data-detail-tabs]').forEach((wrap) => setupTabs(wrap));
  }

  function setupGlobalTabs() {
    qsa('[data-tabs]').forEach((wrap) => setupTabs(wrap));
  }

  function setupIdeaFeedFilters() {
    const root = qs('[data-ideas-page]');
    if (!root) return;

    const feed = qs('[data-idea-feed]', root);
    const assetSel = qs('[data-asset-filter]', root);
    const sortSel = qs('[data-sort-filter]', root);
    if (!feed || !assetSel || !sortSel) return;

    const allCards = qsa('[data-idea-card]', feed);
    const apply = () => {
      const asset = assetSel.value;
      const sort = sortSel.value;
      let cards = [...allCards];

      cards.forEach((c) => (c.hidden = false));
      if (asset !== 'All') {
        cards.forEach((c) => {
          c.hidden = c.getAttribute('data-asset') !== asset;
        });
      }

      // simple front-end sort based on data-score / data-date
      cards = cards.filter((c) => !c.hidden);
      if (sort === 'Popular') {
        cards.sort((a, b) => Number(b.getAttribute('data-score')) - Number(a.getAttribute('data-score')));
      } else if (sort === 'Newest') {
        cards.sort((a, b) => Number(b.getAttribute('data-date')) - Number(a.getAttribute('data-date')));
      }
      cards.forEach((c) => feed.appendChild(c));
    };

    assetSel.addEventListener('change', apply);
    sortSel.addEventListener('change', apply);
    apply();
  }

  function setupPagination() {
    const feed = qs('[data-idea-feed]');
    const pager = qs('[data-pagination]');
    if (!feed || !pager) return;

    const cards = qsa('[data-idea-card]', feed);
    const pageSize = Number(pager.getAttribute('data-page-size') || 6);
    let page = 1;

    const render = () => {
      const visible = cards.filter((c) => !c.hidden);
      const pages = Math.max(1, Math.ceil(visible.length / pageSize));
      page = Math.min(page, pages);
      visible.forEach((c, idx) => {
        const p = Math.floor(idx / pageSize) + 1;
        c.dataset.page = String(p);
        c.style.display = p === page ? '' : 'none';
      });
      qsa('[data-page-btn]', pager).forEach((b) => {
        const target = Number(b.getAttribute('data-page-btn'));
        b.setAttribute('aria-selected', String(target === page));
      });
      const label = qs('[data-page-label]', pager);
      if (label) label.textContent = `Page ${page} / ${pages}`;
    };

    const buildButtons = () => {
      pager.innerHTML = '';
      const label = document.createElement('div');
      label.className = 'muted';
      label.style.alignSelf = 'center';
      label.style.padding = '0 10px';
      label.setAttribute('data-page-label', '');

      const mk = (n) => {
        const b = document.createElement('button');
        b.className = 'btn small';
        b.type = 'button';
        b.textContent = String(n);
        b.setAttribute('data-page-btn', String(n));
        b.addEventListener('click', () => {
          page = n;
          render();
        });
        return b;
      };

      const left = document.createElement('button');
      left.className = 'btn small';
      left.type = 'button';
      left.textContent = 'Prev';
      left.addEventListener('click', () => {
        page = Math.max(1, page - 1);
        render();
      });

      const right = document.createElement('button');
      right.className = 'btn small';
      right.type = 'button';
      right.textContent = 'Next';
      right.addEventListener('click', () => {
        page = page + 1;
        render();
      });

      pager.appendChild(left);
      for (let i = 1; i <= 5; i++) pager.appendChild(mk(i));
      pager.appendChild(right);
      pager.appendChild(label);
    };

    buildButtons();
    render();
    window.addEventListener('resize', render);
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupGlobalTabs();
    setupAccordions();
    setupTimeframes();
    setupDetailTabs();
    setupIdeaFeedFilters();
    setupPagination();
  });
})();

