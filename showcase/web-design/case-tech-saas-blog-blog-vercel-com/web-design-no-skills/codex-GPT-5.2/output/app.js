const state = {
  category: 'All Posts',
  query: '',
  pageSize: 6,
  visibleCount: 0,
};

const CATEGORY_KEYS = {
  'All Posts': 'all',
  Engineering: 'engineering',
  Community: 'community',
  'Company News': 'company-news',
  Customers: 'customers',
  'v0': 'v0',
  Security: 'security',
  Changelog: 'changelog',
  Press: 'press',
};

const posts = [
  {
    id: 'durable-execution',
    category: 'General',
    date: 'Apr 16',
    title: 'A new programming model for durable execution',
    excerpt: 'The gap between prototypes and production-ready systems is huge. Workflows extends the framework-defined infrastructure model to long-running systems.',
    author: 'Pranav Mehta',
  },
  {
    id: 'agentic-infrastructure',
    category: 'General',
    date: 'Apr 9',
    title: 'Agentic Infrastructure',
    excerpt: 'Every generation of software eventually demands a new generation of infrastructure. LLMs and coding agents are driving the next transition, and it\'s happening fast.',
    author: 'Tom Reeves',
  },
  {
    id: 'zero-data-retention',
    category: 'General',
    date: 'Apr 6',
    title: 'Zero Data Retention on AI Gateway',
    excerpt: 'Building with multiple AI models means wrestling with fragmented data policies. With many different model providers, it…',
    author: 'Jerlyn and Dan',
  },
  {
    id: 'sandbox-snapshots',
    category: 'General',
    date: 'Apr 2',
    title: 'Optimizing Sandbox snapshots',
    excerpt: 'When we shipped filesystem snapshots in Sandbox to let teams capture and restore a sandbox, we had to make them fast, reliable, and cheap.',
    author: 'Tom, Rob, and 2 others',
  },
  {
    id: 'cms-humans-ai',
    category: 'Customers',
    date: 'Apr 1',
    title: 'How a startup made a blog platform work for humans and AI alike',
    excerpt: 'A two-person, YC-backed startup that built an agentic CMS for businesses and learned where “automate everything” breaks down.',
    author: 'Nic Vargas',
  },
  {
    id: 'build-tool-faster',
    category: 'Engineering',
    date: 'Mar 30',
    title: 'Making build tool 96% faster with agents, sandboxes, and humans',
    excerpt: 'Build tool is now 81–91% faster to compute the task graph, scaling with repo size by combining agent analysis, sandboxes, and human review.',
    author: 'Anthony Shew',
  },
  {
    id: 'gateway-reporting',
    category: 'General',
    date: 'Mar 25',
    title: 'Unified reporting for all AI Gateway usage',
    excerpt: 'If you\'re shipping AI features, you already have usage data — but it\'s split across providers, keys, and dashboards. Here\'s how we unified it.',
    author: 'Jerlyn and Dan',
  },
  {
    id: 'agent-responsibly',
    category: 'General',
    date: 'Mar 30',
    title: 'Agent responsibly',
    excerpt: 'Coding agents generate code at unprecedented speeds — but without rigorous judgment, they ship bad assumptions directly to production.',
    author: 'Matthew Carr',
  },
  {
    id: 'waf-deep-dive',
    category: 'Security',
    date: 'Mar 18',
    title: 'WAF rules that don\'t block your users',
    excerpt: 'A practical approach to tuning web application firewall policies without breaking signups, logins, and critical flows.',
    author: 'Platform Security',
  },
  {
    id: 'v0-teams',
    category: 'v0',
    date: 'Mar 12',
    title: 'v0 for teams: reusable UI patterns at scale',
    excerpt: 'How design engineers and developers can standardize components, tokens, and best practices while keeping velocity high.',
    author: 'v0 Team',
  },
  {
    id: 'community-office-hours',
    category: 'Community',
    date: 'Mar 8',
    title: 'Community office hours: shipping with agents',
    excerpt: 'What we learned from listening to teams adopt coding agents in CI: guardrails, review loops, and the metrics that matter.',
    author: 'Developer Relations',
  },
  {
    id: 'company-news-workflows',
    category: 'Company News',
    date: 'Feb 28',
    title: 'Workflows is now generally available',
    excerpt: 'Durable execution is a core platform primitive. Today we\'re shipping Workflows to make long-running systems as approachable as web apps.',
    author: 'DeployCloud Team',
  },
  {
    id: 'changelog-ai-gateway',
    category: 'Changelog',
    date: 'Feb 21',
    title: 'Changelog: AI Gateway now supports per-route policies',
    excerpt: 'Roll out provider-specific policies by route, enforce retention requirements, and ship safer AI features with fewer knobs.',
    author: 'Changelog',
  },
  {
    id: 'press-series-b',
    category: 'Press',
    date: 'Feb 10',
    title: 'DeployCloud announces Series B to scale agentic infrastructure',
    excerpt: 'We\'re investing in safer, faster deployment workflows as coding agents become a first-class actor in production environments.',
    author: 'Press',
  },
];

function $(sel, root = document) {
  return root.querySelector(sel);
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function normalize(s) {
  return (s || '').toLowerCase().trim();
}

function matchesCategory(post, category) {
  if (category === 'All Posts') return true;
  return normalize(post.category) === normalize(category);
}

function matchesQuery(post, query) {
  const q = normalize(query);
  if (!q) return true;
  const hay = normalize(`${post.title} ${post.excerpt} ${post.author} ${post.category}`);
  return hay.includes(q);
}

function getFilteredPosts() {
  return posts.filter((p) => matchesCategory(p, state.category) && matchesQuery(p, state.query));
}

function createPostCard(post) {
  const el = document.createElement('a');
  el.className = 'card';
  el.href = '#';
  el.setAttribute('role', 'article');
  el.setAttribute('aria-label', post.title);

  el.innerHTML = `
    <div class="pad">
      <div class="kicker">
        <span class="tag">${escapeHtml(post.category)}</span>
        <span>${escapeHtml(post.date)}</span>
      </div>
      <h3 class="title">${escapeHtml(post.title)}</h3>
      <p class="excerpt">${escapeHtml(post.excerpt)}</p>
      <div class="meta">
        <div class="author">
          <div class="avatar" aria-hidden="true"></div>
          <div style="min-width:0">
            <div class="name">${escapeHtml(post.author)}</div>
            <div class="role">DeployCloud</div>
          </div>
        </div>
        <span style="color: rgba(11,76,203,.98); font-weight:700">Read →</span>
      </div>
    </div>
  `;
  return el;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderResults({ resetVisible = false } = {}) {
  const grid = $('#postsGrid');
  const noResults = $('#noResults');
  const countEl = $('#resultsCount');
  const showMoreBtn = $('#showMoreBtn');

  const filtered = getFilteredPosts();
  if (resetVisible) state.visibleCount = 0;
  if (state.visibleCount === 0) state.visibleCount = Math.min(state.pageSize, filtered.length);
  state.visibleCount = clamp(state.visibleCount, 0, filtered.length);

  grid.innerHTML = '';
  filtered.slice(0, state.visibleCount).forEach((p) => grid.appendChild(createPostCard(p)));

  const showing = Math.min(state.visibleCount, filtered.length);
  countEl.textContent = filtered.length === 0 ? '0 results' : `Showing ${showing} of ${filtered.length}`;

  if (filtered.length === 0) {
    noResults.classList.add('open');
    showMoreBtn.disabled = true;
    showMoreBtn.style.display = 'none';
  } else {
    noResults.classList.remove('open');
    showMoreBtn.style.display = filtered.length > showing ? 'inline-flex' : 'none';
    showMoreBtn.disabled = filtered.length <= showing;
  }
}

function setActiveCategory(next) {
  state.category = next;
  document.querySelectorAll('[data-category]').forEach((btn) => {
    const isActive = btn.getAttribute('data-category') === next;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
  renderResults({ resetVisible: true });
}

function wirePills() {
  document.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => setActiveCategory(btn.getAttribute('data-category')));
  });
}

function wireSearch() {
  const input = $('#searchInput');
  input.addEventListener('input', (e) => {
    state.query = e.target.value;
    renderResults({ resetVisible: true });
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      state.query = '';
      renderResults({ resetVisible: true });
      input.blur();
    }
  });
}

function wireShowMore() {
  $('#showMoreBtn').addEventListener('click', () => {
    const filtered = getFilteredPosts();
    state.visibleCount = Math.min(filtered.length, state.visibleCount + state.pageSize);
    renderResults();
  });
}

function closeAllMenus() {
  document.querySelectorAll('[data-menu-panel]').forEach((p) => p.classList.remove('open'));
  document.querySelectorAll('[data-menu-trigger]').forEach((t) => t.setAttribute('aria-expanded', 'false'));
}

function toggleMenu(id, nextOpen = null) {
  const trigger = document.querySelector(`[data-menu-trigger="${id}"]`);
  const panel = document.querySelector(`[data-menu-panel="${id}"]`);
  if (!trigger || !panel) return;

  const isOpen = panel.classList.contains('open');
  const open = nextOpen === null ? !isOpen : nextOpen;
  closeAllMenus();
  if (open) {
    panel.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }
}

function wireMenus() {
  document.querySelectorAll('[data-menu-trigger]').forEach((el) => {
    const id = el.getAttribute('data-menu-trigger');
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const panel = document.querySelector(`[data-menu-panel="${id}"]`);
      const isOpen = panel?.classList.contains('open');
      toggleMenu(id, !isOpen);
    });
    el.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) toggleMenu(id, true);
    });
    el.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        window.setTimeout(() => {
          const panel = document.querySelector(`[data-menu-panel="${id}"]`);
          const hovering = panel?.matches(':hover') || el.matches(':hover');
          if (!hovering) toggleMenu(id, false);
        }, 120);
      }
    });
  });

  document.querySelectorAll('[data-menu-panel]').forEach((panel) => {
    panel.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        const id = panel.getAttribute('data-menu-panel');
        toggleMenu(id, false);
      }
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-menu-panel]') || target.closest('[data-menu-trigger]')) return;
    closeAllMenus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMenus();
  });
}

function wireMobile() {
  const btn = $('#mobileMenuBtn');
  const panel = $('#mobilePanel');
  btn.addEventListener('click', () => {
    const open = !panel.classList.contains('open');
    panel.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

function init() {
  wirePills();
  wireSearch();
  wireShowMore();
  wireMenus();
  wireMobile();
  setActiveCategory('All Posts');
  renderResults({ resetVisible: true });
}

document.addEventListener('DOMContentLoaded', init);

