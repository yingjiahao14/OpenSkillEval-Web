/* ChartPulse static interactions (no build step). */

function qsa(root, sel) {
  return Array.from((root || document).querySelectorAll(sel));
}

function qs(root, sel) {
  return (root || document).querySelector(sel);
}

function formatPercent(value) {
  if (value === null || value === undefined) return '';
  const v = String(value).trim();
  if (v === '—' || v === '-') return '—';
  return v;
}

function badgeClassFromText(changeText) {
  const t = String(changeText || '').trim();
  if (!t || t === '—' || t === '-') return 'flat';
  if (t.startsWith('+')) return 'up';
  if (t.startsWith('−') || t.startsWith('-')) return 'down';
  return 'flat';
}

function sparklinePath(values, width, height, padding) {
  const w = width;
  const h = height;
  const p = padding;
  const min = Math.min.apply(null, values);
  const max = Math.max.apply(null, values);
  const span = max - min || 1;
  const step = (w - p * 2) / (values.length - 1);
  return values
    .map((v, i) => {
      const x = p + i * step;
      const y = p + (h - p * 2) * (1 - (v - min) / span);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}

function makeSparkline(svgEl, series, trend) {
  const w = Number(svgEl.getAttribute('width') || 78);
  const h = Number(svgEl.getAttribute('height') || 18);
  const p = 1.5;
  const path = sparklinePath(series, w, h, p);

  const ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g');

  const glow = document.createElementNS(ns, 'path');
  glow.setAttribute('d', path);
  glow.setAttribute('fill', 'none');
  glow.setAttribute('stroke-width', '2.8');
  glow.setAttribute('stroke-linecap', 'round');
  glow.setAttribute('stroke-linejoin', 'round');
  glow.setAttribute('opacity', '0.28');
  glow.setAttribute('stroke', trend === 'down' ? '#F7525F' : '#1fda7a');

  const line = document.createElementNS(ns, 'path');
  line.setAttribute('d', path);
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke-width', '1.7');
  line.setAttribute('stroke-linecap', 'round');
  line.setAttribute('stroke-linejoin', 'round');
  line.setAttribute('stroke', trend === 'down' ? '#F7525F' : '#1fda7a');

  const area = document.createElementNS(ns, 'path');
  area.setAttribute('d', `${path} L${w - p},${h - p} L${p},${h - p} Z`);
  area.setAttribute('fill', trend === 'down' ? 'rgba(247,82,95,.12)' : 'rgba(31,218,122,.10)');
  area.setAttribute('stroke', 'none');

  g.appendChild(area);
  g.appendChild(glow);
  g.appendChild(line);
  svgEl.appendChild(g);
}

function initSparklines() {
  qsa(document, 'svg[data-spark]').forEach((svg) => {
    const trend = svg.getAttribute('data-trend') || 'up';
    const seed = Number(svg.getAttribute('data-seed') || 0);
    // Deterministic pseudo series for visual density (not "live" data).
    const series = [];
    let v = 50 + (seed % 11);
    for (let i = 0; i < 18; i += 1) {
      const wobble = ((seed + i * 13) % 9) - 4;
      v += wobble * (trend === 'down' ? 0.7 : 0.55);
      series.push(v);
    }
    makeSparkline(svg, series, trend);
  });
}

function initTabGroups() {
  qsa(document, '[data-tabs]').forEach((tabsRoot) => {
    const group = tabsRoot.getAttribute('data-tabs');
    const tabButtons = qsa(tabsRoot, '[role="tab"]');
    const panels = qsa(document, `[data-tab-panel="${group}"]`);

    function activate(id) {
      tabButtons.forEach((b) => b.setAttribute('aria-selected', String(b.getAttribute('data-tab') === id)));
      panels.forEach((p) => {
        const isActive = p.getAttribute('data-panel') === id;
        p.style.display = isActive ? '' : 'none';
      });
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => activate(btn.getAttribute('data-tab')));
    });

    const initially = tabButtons.find((b) => b.getAttribute('aria-selected') === 'true') || tabButtons[0];
    if (initially) activate(initially.getAttribute('data-tab'));
  });
}

function initAccordion() {
  qsa(document, '[data-accordion]').forEach((accRoot) => {
    qsa(accRoot, '[data-acc-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const group = btn.closest('[data-acc-group]');
        const open = group.getAttribute('data-open') === 'true';
        group.setAttribute('data-open', open ? 'false' : 'true');
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
  });
}

function initTimeframeToggle() {
  const root = qs(document, '[data-timeframes]');
  if (!root) return;
  const buttons = qsa(root, 'button[data-tf]');
  const label = qs(document, '[data-tf-label]');
  buttons.forEach((b) => {
    b.addEventListener('click', () => {
      buttons.forEach((x) => x.setAttribute('aria-selected', 'false'));
      b.setAttribute('aria-selected', 'true');
      if (label) label.textContent = b.getAttribute('data-tf');
    });
  });
}

function initBrokerFilters() {
  const search = qs(document, '[data-broker-search]');
  const tierTabs = qs(document, '[data-broker-tiers]');
  const cards = qsa(document, '[data-broker-card]');
  if (!search && !tierTabs) return;

  function apply() {
    const q = (search ? search.value : '').trim().toLowerCase();
    const activeTierBtn = tierTabs ? qs(tierTabs, '[role="tab"][aria-selected="true"]') : null;
    const tier = activeTierBtn ? activeTierBtn.getAttribute('data-tier') : 'all';

    cards.forEach((c) => {
      const name = (c.getAttribute('data-name') || '').toLowerCase();
      const cardTier = (c.getAttribute('data-tier') || '').toLowerCase();
      const okQ = !q || name.includes(q);
      const okT = tier === 'all' || cardTier === tier;
      c.style.display = okQ && okT ? '' : 'none';
    });
  }

  if (search) search.addEventListener('input', apply);
  if (tierTabs) {
    qsa(tierTabs, '[role="tab"]').forEach((b) => {
      b.addEventListener('click', () => {
        qsa(tierTabs, '[role="tab"]').forEach((x) => x.setAttribute('aria-selected', 'false'));
        b.setAttribute('aria-selected', 'true');
        apply();
      });
    });
  }
  apply();
}

function initIdeaFilters() {
  const search = qs(document, '[data-idea-search]');
  const assetTabs = qs(document, '[data-idea-assets]');
  const sortTabs = qs(document, '[data-idea-sort]');
  const cards = qsa(document, '[data-idea-card]');
  if (!search && !assetTabs && !sortTabs) return;

  function apply() {
    const q = (search ? search.value : '').trim().toLowerCase();
    const assetBtn = assetTabs ? qs(assetTabs, '[role="tab"][aria-selected="true"]') : null;
    const sortBtn = sortTabs ? qs(sortTabs, '[role="tab"][aria-selected="true"]') : null;
    const asset = assetBtn ? assetBtn.getAttribute('data-asset') : 'all';
    const sort = sortBtn ? sortBtn.getAttribute('data-sort') : 'popular';

    const filtered = cards
      .filter((c) => {
        const title = (c.getAttribute('data-title') || '').toLowerCase();
        const body = (c.getAttribute('data-body') || '').toLowerCase();
        const sym = (c.getAttribute('data-symbol') || '').toLowerCase();
        const cardAsset = (c.getAttribute('data-asset') || '').toLowerCase();
        const okQ = !q || title.includes(q) || body.includes(q) || sym.includes(q);
        const okA = asset === 'all' || cardAsset === asset;
        return okQ && okA;
      })
      .sort((a, b) => {
        const av = Number(a.getAttribute(sort === 'new' ? 'data-ts' : 'data-score') || 0);
        const bv = Number(b.getAttribute(sort === 'new' ? 'data-ts' : 'data-score') || 0);
        return bv - av;
      });

    cards.forEach((c) => (c.style.display = 'none'));
    filtered.forEach((c) => (c.style.display = ''));
  }

  if (search) search.addEventListener('input', apply);
  [assetTabs, sortTabs].filter(Boolean).forEach((root) => {
    qsa(root, '[role="tab"]').forEach((b) => {
      b.addEventListener('click', () => {
        qsa(root, '[role="tab"]').forEach((x) => x.setAttribute('aria-selected', 'false'));
        b.setAttribute('aria-selected', 'true');
        apply();
      });
    });
  });
  apply();
}

function initPagination() {
  const root = qs(document, '[data-pagination]');
  if (!root) return;
  const perPage = Number(root.getAttribute('data-per-page') || 6);
  const cards = qsa(document, '[data-paginate-item]');
  const btnPrev = qs(root, '[data-page-prev]');
  const btnNext = qs(root, '[data-page-next]');
  const label = qs(root, '[data-page-label]');
  let page = 1;

  function visible() {
    return cards.filter((c) => c.style.display !== 'none');
  }

  function render() {
    const v = visible();
    const totalPages = Math.max(1, Math.ceil(v.length / perPage));
    page = Math.min(page, totalPages);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    v.forEach((c, i) => {
      c.style.visibility = i >= start && i < end ? 'visible' : 'hidden';
      c.style.position = i >= start && i < end ? '' : 'absolute';
      c.style.pointerEvents = i >= start && i < end ? '' : 'none';
    });
    if (label) label.textContent = `${page} / ${totalPages}`;
    if (btnPrev) btnPrev.disabled = page <= 1;
    if (btnNext) btnNext.disabled = page >= totalPages;
  }

  if (btnPrev) btnPrev.addEventListener('click', () => {
    page = Math.max(1, page - 1);
    render();
  });
  if (btnNext) btnNext.addEventListener('click', () => {
    page = page + 1;
    render();
  });

  // Re-render when any filter changes visibility.
  const obs = new MutationObserver(() => render());
  cards.forEach((c) => obs.observe(c, { attributes: true, attributeFilter: ['style'] }));
  render();
}

function initBadges() {
  qsa(document, '[data-badge]').forEach((el) => {
    const t = el.textContent || '';
    el.classList.remove('up', 'down', 'flat');
    el.classList.add(badgeClassFromText(t));
    el.textContent = formatPercent(t);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabGroups();
  initAccordion();
  initTimeframeToggle();
  initBrokerFilters();
  initIdeaFilters();
  initPagination();
  initBadges();
  initSparklines();
});

