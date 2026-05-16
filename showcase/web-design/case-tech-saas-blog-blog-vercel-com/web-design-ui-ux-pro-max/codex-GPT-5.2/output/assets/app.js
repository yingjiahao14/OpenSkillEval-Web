/* DeployCloud Blog — interaction + rendering */

const FEATURED_POSTS = [
  {
    id: "agentic-infrastructure",
    title: "Agentic Infrastructure",
    category: "Engineering",
    dateLabel: "Apr 9",
    author: "Tom Reeves",
    excerpt:
      "Every generation of software eventually demands a new generation of infrastructure. LLMs and coding agents are driving the next transition — and it's happening fast.",
    isFeatured: true,
    stats: [
      { value: "30%", label: "deployments started by agents" },
      { value: "1000%", label: "increase vs. six months ago" },
      { value: "20×", label: "more likely to call inference" },
    ],
  },
  {
    id: "durable-execution",
    title: "A new programming model for durable execution",
    category: "Engineering",
    dateLabel: "Apr 16",
    author: "Pranav Mehta",
    excerpt:
      "The gap between prototypes and production-ready systems is huge. Workflows brings framework-defined infrastructure to long-running systems.",
    isFeatured: true,
  },
  {
    id: "agent-responsibly",
    title: "Agent responsibly",
    category: "Security",
    dateLabel: "Mar 30",
    author: "Matthew Carr",
    excerpt:
      "Coding agents generate code at unprecedented speeds — but without rigorous judgment, they can ship bad assumptions directly to production.",
    isFeatured: true,
  },
];

const ALL_POSTS = [
  {
    id: "durable-execution",
    title: "A new programming model for durable execution",
    category: "General",
    dateLabel: "Apr 16",
    author: "Pranav Mehta",
    excerpt:
      "The gap between prototypes and production-ready systems is huge. Workflows extends framework-defined infrastructure to long-running systems.",
  },
  {
    id: "agentic-infrastructure",
    title: "Agentic Infrastructure",
    category: "General",
    dateLabel: "Apr 9",
    author: "Tom Reeves",
    excerpt:
      "Every generation of software eventually demands a new generation of infrastructure. Agents are reshaping how deployments get initiated.",
  },
  {
    id: "zdr-ai-gateway",
    title: "Zero Data Retention on AI Gateway",
    category: "Company News",
    dateLabel: "Apr 6",
    author: "Jerlyn and Dan",
    excerpt:
      "Building with multiple AI models means wrestling with fragmented data policies. With many different providers, it's easy to lose control of retention guarantees.",
  },
  {
    id: "sandbox-snapshots",
    title: "Optimizing Sandbox snapshots",
    category: "Engineering",
    dateLabel: "Apr 2",
    author: "Tom, Rob, and 2 others",
    excerpt:
      "When we shipped filesystem snapshots in Sandbox, we had to make restore times predictable without blowing up storage costs — here's how we tuned the pipeline.",
  },
  {
    id: "agentic-cms",
    title: "How a startup made a blog platform work for humans and AI alike",
    category: "Customers",
    dateLabel: "Apr 1",
    author: "Nic Vargas",
    excerpt:
      "A two-person, YC-backed startup built an agentic CMS for businesses. The trick: write once, serve both humans and crawlers without sacrificing editorial quality.",
  },
  {
    id: "build-tool-faster",
    title: "Making build tool 96% faster with agents, sandboxes, and humans",
    category: "Engineering",
    dateLabel: "Mar 30",
    author: "Anthony Shew",
    excerpt:
      "Build tool is now 81–91% faster to compute the task graph in our repositories, scaling with repo size. We combined agent assistance with careful profiling to land the win.",
  },
  {
    id: "unified-reporting",
    title: "Unified reporting for all AI Gateway usage",
    category: "Company News",
    dateLabel: "Mar 25",
    author: "Jerlyn and Dan",
    excerpt:
      "If you're shipping AI features, you already have usage data. The problem is that it's across providers, keys, and dashboards. Here's how we unified reporting.",
  },
  {
    id: "agent-responsibly",
    title: "Agent responsibly",
    category: "General",
    dateLabel: "Mar 30",
    author: "Matthew Carr",
    excerpt:
      "Based on an internal talk at DeployCloud: a framework for shipping with agents without turning speed into a liability.",
  },
  {
    id: "community-summit",
    title: "DeployCloud Community Summit: what we learned",
    category: "Community",
    dateLabel: "Mar 18",
    author: "Amina Rahman",
    excerpt:
      "From edge-caching patterns to practical agent workflows, the community shared the things that actually held up in production.",
  },
  {
    id: "security-botid",
    title: "BotID: stopping credential stuffing at the edge",
    category: "Security",
    dateLabel: "Mar 10",
    author: "Mina Kwon",
    excerpt:
      "Bot traffic looks human until it doesn't. We built BotID to detect automation with low false positives and predictable latency.",
  },
  {
    id: "press-seriesb",
    title: "DeployCloud announces Series B funding",
    category: "Press",
    dateLabel: "Feb 26",
    author: "DeployCloud Press",
    excerpt:
      "DeployCloud secured new funding to accelerate our work on agentic infrastructure, security, and platform reliability.",
  },
  {
    id: "changelog-workflows",
    title: "Changelog: Workflows reach general availability",
    category: "Changelog",
    dateLabel: "Feb 12",
    author: "Product Team",
    excerpt:
      "Workflows are now GA with improved retry semantics, durable timers, and developer-first observability.",
  },
];

const PAGE_SIZE = 6;

const elements = {
  featuredGrid: document.getElementById("featuredGrid"),
  postGrid: document.getElementById("postGrid"),
  pills: Array.from(document.querySelectorAll(".pill")),
  search: document.getElementById("search"),
  clearSearch: document.getElementById("clearSearch"),
  resultsMeta: document.getElementById("resultsMeta"),
  noResults: document.getElementById("noResults"),
  resetFilters: document.getElementById("resetFilters"),
  showMore: document.getElementById("showMore"),
  year: document.getElementById("year"),
};

const state = {
  activeCategory: "All Posts",
  query: "",
  shownCount: PAGE_SIZE,
};

function initials(name) {
  const parts = String(name).split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "D";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "C";
  return (first + last).toUpperCase();
}

function normalize(text) {
  return String(text).toLowerCase();
}

function matchesQuery(post, query) {
  if (!query) return true;
  const hay = normalize(`${post.title} ${post.excerpt} ${post.author} ${post.category}`);
  return hay.includes(normalize(query));
}

function matchesCategory(post, activeCategory) {
  if (activeCategory === "All Posts") return true;
  return post.category === activeCategory;
}

function filterPosts() {
  return ALL_POSTS.filter((p) => matchesCategory(p, state.activeCategory)).filter((p) => matchesQuery(p, state.query));
}

function createCard({ post, variant, index }) {
  const card = document.createElement("article");
  const classNames = ["card"];
  if (variant === "featured") {
    classNames.push(`featured-card-${index + 1}`);
  } else {
    classNames.push("post-card");
  }
  card.className = classNames.join(" ");

  const tagAccent = variant === "featured";
  const titleSize = variant === "featured" ? "big" : "medium";
  const tagClass = tagAccent ? "tag is-accent" : "tag";
  const href = "#";

  const stats = post.stats?.length
    ? `
      <div class="card-hero">
        <div class="stat-row" aria-label="Key stats">
          ${post.stats
            .map(
              (s) => `
            <div class="stat">
              <strong>${s.value}</strong>
              <span>${s.label}</span>
            </div>`
            )
            .join("")}
        </div>
      </div>`
    : "";

  card.innerHTML = `
    <a href="${href}" aria-label="Read: ${post.title}">
      ${stats}
      <div class="card-inner">
        <div class="card-top">
          <span class="${tagClass}">${post.category}</span>
          <span class="meta">${post.dateLabel}</span>
        </div>
        <h3 class="card-title ${titleSize}">${post.title}</h3>
        <p class="excerpt">${post.excerpt}</p>
        <div class="byline">
          <div class="author">
            <div class="avatar" aria-hidden="true">${initials(post.author)}</div>
            <div>
              <div class="author-name">${post.author}</div>
              <div class="author-role">DeployCloud</div>
            </div>
          </div>
          <span class="meta">Read →</span>
        </div>
      </div>
    </a>
  `;

  return card;
}

function renderFeatured() {
  elements.featuredGrid.innerHTML = "";
  FEATURED_POSTS.forEach((post, i) => {
    elements.featuredGrid.appendChild(createCard({ post, variant: "featured", index: i }));
  });
}

function renderPosts({ resetGrid } = { resetGrid: true }) {
  const filtered = filterPosts();
  const visible = filtered.slice(0, state.shownCount);

  if (resetGrid) elements.postGrid.innerHTML = "";

  visible.forEach((post, i) => {
    if (!resetGrid && i < elements.postGrid.children.length) return;
    elements.postGrid.appendChild(createCard({ post, variant: "list", index: i }));
  });

  const countLabel = filtered.length === 1 ? "post" : "posts";
  const queryText = state.query ? ` for “${state.query}”` : "";
  const catText = state.activeCategory === "All Posts" ? "" : ` in ${state.activeCategory}`;
  elements.resultsMeta.textContent = `${filtered.length} ${countLabel}${catText}${queryText}`;

  const hasResults = filtered.length > 0;
  elements.noResults.hidden = hasResults;

  const canShowMore = state.shownCount < filtered.length;
  elements.showMore.disabled = !canShowMore;
  elements.showMore.textContent = canShowMore ? "Show more posts" : "All caught up";

  // Clear/Search button
  elements.clearSearch.hidden = !state.query;
}

function setActiveCategory(category) {
  state.activeCategory = category;
  state.shownCount = PAGE_SIZE;

  elements.pills.forEach((pill) => {
    const isActive = pill.dataset.category === category;
    pill.classList.toggle("is-active", isActive);
    pill.setAttribute("aria-selected", String(isActive));
  });

  // Featured always stays visible; feed filters.
  renderPosts({ resetGrid: true });
}

function setQuery(query) {
  state.query = query;
  state.shownCount = PAGE_SIZE;
  renderPosts({ resetGrid: true });
}

function resetAll() {
  elements.search.value = "";
  setQuery("");
  setActiveCategory("All Posts");
}

function bindFiltering() {
  elements.pills.forEach((pill) => {
    pill.addEventListener("click", () => setActiveCategory(pill.dataset.category));
  });

  let searchTimer = null;
  elements.search.addEventListener("input", (e) => {
    window.clearTimeout(searchTimer);
    const val = e.target.value;
    searchTimer = window.setTimeout(() => setQuery(val.trim()), 80);
  });

  elements.clearSearch.addEventListener("click", () => {
    elements.search.value = "";
    setQuery("");
    elements.search.focus();
  });

  elements.resetFilters.addEventListener("click", resetAll);
}

function bindShowMore() {
  elements.showMore.addEventListener("click", () => {
    const filtered = filterPosts();
    const next = Math.min(state.shownCount + PAGE_SIZE, filtered.length);
    if (next === state.shownCount) return;
    state.shownCount = next;
    renderPosts({ resetGrid: false });
  });
}

function closeAllMegaMenus() {
  document.querySelectorAll(".mega").forEach((m) => m.classList.remove("is-open"));
  document.querySelectorAll(".nav-item").forEach((li) => li.classList.remove("is-open"));
  document.querySelectorAll("[data-mega-trigger]").forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function toggleMega(trigger, which) {
  const navItem = trigger.closest(".nav-item");
  const panel = document.querySelector(`[data-mega="${which}"]`);
  const isOpen = panel.classList.contains("is-open");
  closeAllMegaMenus();
  if (!isOpen) {
    panel.classList.add("is-open");
    navItem.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  }
}

function bindMegaMenus() {
  const triggers = Array.from(document.querySelectorAll("[data-mega-trigger]"));
  triggers.forEach((trigger) => {
    const which = trigger.dataset.megaTrigger;
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMega(trigger, which);
    });

    // Hover intent for desktop
    trigger.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 960px)").matches) toggleMega(trigger, which);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllMegaMenus();
  });

  document.addEventListener("click", (e) => {
    const isInside = e.target.closest(".nav-item") || e.target.closest(".mega");
    if (!isInside) closeAllMegaMenus();
  });
}

function bindMobileDrawer() {
  const openBtn = document.querySelector(".mobile-nav");
  const drawer = document.getElementById("mobile-drawer");
  const closeBtn = document.querySelector("[data-close-drawer]");

  function setOpen(open) {
    drawer.hidden = !open;
    openBtn.setAttribute("aria-expanded", String(open));
    if (open) closeAllMegaMenus();
  }

  openBtn.addEventListener("click", () => setOpen(drawer.hidden));
  closeBtn.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function init() {
  elements.year.textContent = String(new Date().getFullYear());
  renderFeatured();
  renderPosts({ resetGrid: true });
  bindFiltering();
  bindShowMore();
  bindMegaMenus();
  bindMobileDrawer();
}

init();

