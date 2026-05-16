/* DeployCloud Blog interactions: mega menus, filters, and progressive reveal */

const state = {
  category: 'All Posts',
  query: '',
  visibleCount: 6,
};

const CATEGORY_ORDER = [
  'All Posts',
  'Engineering',
  'Community',
  'Company News',
  'Customers',
  'Security',
  'v0',
  'Changelog',
  'Press',
];

const posts = [
  {
    id: 'durable-exec',
    title: 'A new programming model for durable execution',
    category: 'General',
    dateLabel: 'Apr 16',
    author: 'Pranav Mehta',
    excerpt:
      "The gap between prototypes and production-ready systems is huge. Workflows extends framework-defined infrastructure to long-running systems.",
    featured: true,
  },
  {
    id: 'agentic-infra',
    title: 'Agentic Infrastructure',
    category: 'General',
    dateLabel: 'Apr 9',
    author: 'Tom Reeves',
    excerpt:
      "LLMs and coding agents are driving the next transition: infrastructure derived from the application itself — and it’s happening fast.",
    featured: true,
    stats: [
      { value: '30% of deployments', detail: 'initiated by coding agents' },
      { value: '1000% increase', detail: 'from six months ago' },
      { value: '20× more likely', detail: 'to call AI inference providers' },
    ],
  },
  {
    id: 'agent-responsibly',
    title: 'Agent responsibly',
    category: 'General',
    dateLabel: 'Mar 30',
    author: 'Matthew Carr',
    excerpt:
      "Agents generate code at unprecedented speeds — but without judgment, they ship bad assumptions directly to production.",
    featured: true,
  },

  // Latest news / feed items (preloaded; progressively revealed)
  {
    id: 'zdr-ai-gateway',
    title: 'Zero Data Retention on AI Gateway',
    category: 'General',
    dateLabel: 'Apr 6',
    author: 'Jerlyn and Dan',
    excerpt:
      'Building with multiple AI models means wrestling with fragmented data policies. With many different model providers, it…',
  },
  {
    id: 'sandbox-snapshots',
    title: 'Optimizing Sandbox snapshots',
    category: 'General',
    dateLabel: 'Apr 2',
    author: 'Tom, Rob, and 2 others',
    excerpt:
      'When we recently shipped filesystem snapshots in Sandbox to let teams capture and restore a sandbox…',
  },
  {
    id: 'blog-platform-humans-ai',
    title: 'How a startup made a blog platform work for humans and AI alike',
    category: 'Customers',
    dateLabel: 'Apr 1',
    author: 'Nic Vargas',
    excerpt:
      'A two-person, YC-backed startup that built an agentic CMS for businesses…',
  },
  {
    id: 'build-tool-faster',
    title: 'Making build tool 96% faster with agents, sandboxes, and humans',
    category: 'Engineering',
    dateLabel: 'Mar 30',
    author: 'Anthony Shew',
    excerpt:
      'Build tool is now 81–91% faster to compute the task graph in our repositories, scaling with repo size…',
  },
  {
    id: 'ai-gateway-reporting',
    title: 'Unified reporting for all AI Gateway usage',
    category: 'General',
    dateLabel: 'Mar 25',
    author: 'Jerlyn and Dan',
    excerpt:
      "If you’re shipping AI features, you already have usage data. The problem is that it’s across providers, keys, an…",
  },
  // Duplicate title appears in brief as item 8; keep as separate feed card
  {
    id: 'agent-responsibly-2',
    title: 'Agent responsibly',
    category: 'General',
    dateLabel: 'Mar 30',
    author: 'Matthew Carr',
    excerpt:
      "The talk that became our internal rubric for shipping with agents — now shared publicly for any team shipping with agents.",
  },
  // Extra categories to make pills meaningful
  {
    id: 'platform-waf',
    title: 'Hardening edge routes with a modern WAF',
    category: 'Security',
    dateLabel: 'Mar 18',
    author: 'Kara Liu',
    excerpt:
      'From bot traffic to injection attempts: a pragmatic playbook for protecting fast-moving apps without slowing down developers.',
  },
  {
    id: 'deploycloud-changelog-042',
    title: 'Changelog: Workflows retries & tracing improvements',
    category: 'Changelog',
    dateLabel: 'Mar 12',
    author: 'DeployCloud',
    excerpt:
      'More resilient retries, clearer traces, and better failure summaries — plus a new “Replay from step” debugging flow.',
  },
  {
    id: 'v0-design-systems',
    title: 'Shipping design systems faster with v0',
    category: 'v0',
    dateLabel: 'Mar 8',
    author: 'Avery Patel',
    excerpt:
      'A practical workflow: from prototype to components to production UI — with guardrails that keep teams consistent.',
  },
  {
    id: 'community-office-hours',
    title: 'Community office hours: performance, caching, and deployments',
    category: 'Community',
    dateLabel: 'Feb 28',
    author: 'Community Team',
    excerpt:
      'A recap of the most useful questions and tactical answers from our monthly engineering office hours.',
  },
  {
    id: 'press-analyst',
    title: 'DeployCloud named a Leader in modern deployment platforms',
    category: 'Press',
    dateLabel: 'Feb 12',
    author: 'Company',
    excerpt:
      'An industry report highlights fast iteration loops, agent-friendly workflows, and security-first edge delivery.',
  },
  {
    id: 'company-news-enterprise',
    title: 'Company News: DeployCloud Enterprise product tour is live',
    category: 'Company News',
    dateLabel: 'Feb 5',
    author: 'DeployCloud',
    excerpt:
      'A guided, interactive tour covering AI Gateway governance, Sandbox controls, and org-wide observability.',
  },
];

function normalize(s) {
  return (s || '').toLowerCase().trim();
}

function matchesCategory(post, category) {
  if (category === 'All Posts') return true;
  return normalize(post.category) === normalize(category);
}

function matchesQuery(post, query) {
  if (!query) return true;
  const q = normalize(query);
  const hay = normalize(`${post.title} ${post.excerpt} ${post.author} ${post.category}`);
  return hay.includes(q);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function el(id) {
  return document.getElementById(id);
}

function setActivePill(category) {
  document.querySelectorAll('[data-pill]').forEach((btn) => {
    btn.dataset.active = btn.dataset.pill === category ? 'true' : 'false';
  });
}

function updateCounts(filteredTotal) {
  const countEl = el('resultsCount');
  if (!countEl) return;
  const cat = state.category;
  const label = cat === 'All Posts' ? 'All posts' : cat;
  countEl.textContent = `${filteredTotal} result${filteredTotal === 1 ? '' : 's'} · ${label}`;
}

function renderFeatured() {
  const mount = el('featuredMount');
  if (!mount) return;

  const featured = posts.filter((p) => p.featured);
  mount.innerHTML = featured
    .map((p, idx) => {
      const isHero = idx === 1; // make Agentic Infrastructure the hero card
      const stats = p.stats
        ? `
          <div class="stats" aria-label="Agentic infrastructure stats">
            ${p.stats
              .map(
                (s) => `
              <div class="stat">
                <b>${escapeHtml(s.value)}</b>
                <span>${escapeHtml(s.detail)}</span>
              </div>`
              )
              .join('')}
          </div>`
        : '';

      return `
        <a class="card ${isHero ? 'featured' : ''}" href="#" aria-label="Read article: ${escapeHtml(
          p.title
        )}">
          <div class="meta">
            <span class="tag accent">Featured</span>
            <span class="date">${escapeHtml(p.dateLabel)}</span>
          </div>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.excerpt)}</p>
          ${stats}
          <div class="footer">
            <div class="author">
              <div class="avatar" aria-hidden="true"></div>
              <div class="author-name">${escapeHtml(p.author)}</div>
            </div>
            <span class="read">Read</span>
          </div>
        </a>`;
    })
    .join('');
}

function cardHtml(p) {
  return `
    <a class="card" href="#" aria-label="Read article: ${escapeHtml(p.title)}">
      <div class="meta">
        <span class="tag">${escapeHtml(p.category)}</span>
        <span class="date">${escapeHtml(p.dateLabel)}</span>
      </div>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.excerpt)}</p>
      <div class="footer">
        <div class="author">
          <div class="avatar" aria-hidden="true"></div>
          <div class="author-name">${escapeHtml(p.author)}</div>
        </div>
        <span class="read">Read</span>
      </div>
    </a>`;
}

function getFeed() {
  return posts.filter((p) => !p.featured);
}

function applyFilters(list) {
  return list.filter((p) => matchesCategory(p, state.category) && matchesQuery(p, state.query));
}

function renderFeed() {
  const grid = el('newsGrid');
  const noResults = el('noResults');
  const showMore = el('showMoreBtn');
  if (!grid || !noResults || !showMore) return;

  const filtered = applyFilters(getFeed());
  updateCounts(filtered.length);

  const visible = filtered.slice(0, state.visibleCount);
  grid.innerHTML = visible.map(cardHtml).join('');

  const hasAny = filtered.length > 0;
  noResults.style.display = hasAny ? 'none' : 'block';
  showMore.style.display = hasAny && visible.length < filtered.length ? 'inline-flex' : 'none';
}

function resetPagination() {
  state.visibleCount = 6;
}

function setupPills() {
  const mount = el('pillMount');
  if (!mount) return;
  mount.innerHTML = CATEGORY_ORDER.map((c) => {
    const active = c === state.category ? 'true' : 'false';
    return `<button class="pill" type="button" data-pill="${escapeHtml(
      c
    )}" data-active="${active}">${escapeHtml(c)}</button>`;
  }).join('');

  mount.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pill]');
    if (!btn) return;
    const next = btn.dataset.pill;
    state.category = next;
    setActivePill(next);
    resetPagination();
    renderFeed();
  });
}

function setupSearch() {
  const input = el('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    state.query = input.value;
    resetPagination();
    renderFeed();
  });
}

function setupShowMore() {
  const btn = el('showMoreBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    state.visibleCount += 6;
    renderFeed();
  });
}

function closeAllMenus(exceptId = null) {
  document.querySelectorAll('[data-menu]').forEach((menu) => {
    if (exceptId && menu.id === exceptId) return;
    menu.dataset.open = 'false';
  });
  document.querySelectorAll('[data-menu-trigger]').forEach((btn) => {
    if (exceptId && btn.getAttribute('aria-controls') === exceptId) return;
    btn.setAttribute('aria-expanded', 'false');
  });
}

function toggleMenu(trigger, open) {
  const id = trigger.getAttribute('aria-controls');
  const menu = document.getElementById(id);
  if (!menu) return;
  const nextOpen = typeof open === 'boolean' ? open : menu.dataset.open !== 'true';
  closeAllMenus(nextOpen ? id : null);
  menu.dataset.open = nextOpen ? 'true' : 'false';
  trigger.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
}

function setupMenus() {
  document.querySelectorAll('[data-menu-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu(trigger);
    });

    // Hover intent on desktop-ish pointers
    trigger.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) toggleMenu(trigger, true);
    });
  });

  document.querySelectorAll('[data-menu]').forEach((menu) => {
    menu.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover)').matches) closeAllMenus();
    });
    menu.addEventListener('mouseenter', () => {
      const id = menu.id;
      const trigger = document.querySelector(`[aria-controls="${id}"]`);
      if (!trigger) return;
      if (window.matchMedia('(hover: hover)').matches) toggleMenu(trigger, true);
    });
  });

  document.addEventListener('click', (e) => {
    const inside = e.target.closest('[data-dropdown]');
    if (!inside) closeAllMenus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMenus();
  });
}

function setupA11yDescriptions() {
  const sr = el('srStatus');
  if (!sr) return;
  const update = () => {
    const filtered = applyFilters(getFeed());
    sr.textContent = `${filtered.length} posts match the current filters.`;
  };

  const observer = new MutationObserver(update);
  observer.observe(el('newsGrid'), { childList: true });
  update();
}

function init() {
  renderFeatured();
  setupPills();
  setupSearch();
  setupShowMore();
  setupMenus();
  renderFeed();
  setupA11yDescriptions();
}

document.addEventListener('DOMContentLoaded', init);

