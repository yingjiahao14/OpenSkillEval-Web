const state = {
  activeCategory: "All Posts",
  query: "",
  visibleCount: 6,
  pageSize: 3,
}

const data = {
  featured: [
    {
      id: "featured-agentic-infra",
      category: "General",
      date: "Apr 9",
      title: "Agentic Infrastructure",
      author: "Tom Reeves",
      excerpt:
        "Every generation of software eventually demands a new generation of infrastructure. LLMs and coding agents are driving the next transition — and it's happening fast.",
      kind: "stats",
      stats: [
        { k: "30%", v: "deployments initiated by coding agents" },
        { k: "1000%", v: "increase from six months ago" },
        { k: "20×", v: "more likely to call inference providers" },
      ],
      href: "#",
    },
    {
      id: "featured-durable-exec",
      category: "General",
      date: "Apr 16",
      title: "A new programming model for durable execution",
      author: "Pranav Mehta",
      excerpt:
        "Code that's trivial to run locally falls apart when it needs to handle failures, restarts, and real traffic. Workflows extends the framework-defined model to long-running systems.",
      kind: "normal",
      href: "#",
    },
    {
      id: "featured-agent-responsibly",
      category: "General",
      date: "Mar 30",
      title: "Agent responsibly",
      author: "Matthew Carr",
      excerpt:
        "Coding agents generate code at unprecedented speeds — but without rigorous judgment, they are a fast way to ship bad assumptions directly to production.",
      kind: "normal",
      href: "#",
    },
  ],
  posts: [
    {
      id: "durable-exec",
      category: "General",
      date: "Apr 16",
      title: "A new programming model for durable execution",
      author: "Pranav Mehta",
      excerpt: "The gap between prototypes and production-ready systems is huge. Workflows extends the framework-defined model to long-running systems.",
      href: "#",
    },
    {
      id: "agentic-infra",
      category: "General",
      date: "Apr 9",
      title: "Agentic Infrastructure",
      author: "Tom Reeves",
      excerpt: "Infrastructure derived from the application itself is here. Agents are changing how we deploy — faster, and at massive scale.",
      href: "#",
    },
    {
      id: "zero-data-retention",
      category: "Company News",
      date: "Apr 6",
      title: "Zero Data Retention on AI Gateway",
      author: "Jerlyn and Dan",
      excerpt:
        "Building with multiple AI models means wrestling with fragmented data policies. With many different model providers, it’s hard to keep guarantees consistent.",
      href: "#",
    },
    {
      id: "sandbox-snapshots",
      category: "Engineering",
      date: "Apr 2",
      title: "Optimizing Sandbox snapshots",
      author: "Tom, Rob, and 2 others",
      excerpt:
        "When we shipped filesystem snapshots in Sandbox, we wanted teams to capture and restore a sandbox instantly — without paying a performance tax.",
      href: "#",
    },
    {
      id: "cms-humans-ai",
      category: "Customers",
      date: "Apr 1",
      title: "How a startup made a blog platform work for humans and AI alike",
      author: "Nic Vargas",
      excerpt: "A two-person, YC-backed startup built an agentic CMS for businesses — with editorial workflows that still feel human.",
      href: "#",
    },
    {
      id: "build-tool-faster",
      category: "Engineering",
      date: "Mar 30",
      title: "Making build tool 96% faster with agents, sandboxes, and humans",
      author: "Anthony Shew",
      excerpt: "Build tool is now 81–91% faster to compute the task graph in our repositories, scaling with repo size — and agents helped get us there.",
      href: "#",
    },
    {
      id: "gateway-reporting",
      category: "General",
      date: "Mar 25",
      title: "Unified reporting for all AI Gateway usage",
      author: "Jerlyn and Dan",
      excerpt:
        "If you're shipping AI features, you already have usage data — the problem is that it's spread across providers, keys, and accounts.",
      href: "#",
    },
    {
      id: "agent-responsibly",
      category: "General",
      date: "Mar 30",
      title: "Agent responsibly",
      author: "Matthew Carr",
      excerpt:
        "Based on an internal talk at DeployCloud. A practical framework for shipping with agents — without shipping assumptions.",
      href: "#",
    },
    {
      id: "community-tools",
      category: "Community",
      date: "Mar 18",
      title: "Community toolchains for faster deploy previews",
      author: "Ava Nguyen",
      excerpt:
        "A roundup of how teams stitch together preview environments across frameworks — plus the patterns we see in high-signal developer communities.",
      href: "#",
    },
    {
      id: "security-waf",
      category: "Security",
      date: "Mar 12",
      title: "Shipping a WAF rule engine that developers can reason about",
      author: "Kofi Mensah",
      excerpt:
        "Security tooling has to be explainable. We redesigned rule evaluation so teams can debug protection without reading a novel.",
      href: "#",
    },
    {
      id: "changelog-workflows",
      category: "Changelog",
      date: "Mar 6",
      title: "Workflows: retry policies, durable timers, and observability hooks",
      author: "DeployCloud Team",
      excerpt:
        "New Workflows primitives for long-running systems: retry policies, durable timers, and end-to-end traces — now in GA.",
      href: "#",
    },
    {
      id: "press-award",
      category: "Press",
      date: "Feb 24",
      title: "DeployCloud named a top platform for modern deployments",
      author: "Press Desk",
      excerpt:
        "Industry recognition for performance, reliability, and developer experience — and what we’re building next.",
      href: "#",
    },
  ],
}

function qs(sel, el = document) {
  return el.querySelector(sel)
}

function qsa(sel, el = document) {
  return Array.from(el.querySelectorAll(sel))
}

function normalizeText(s) {
  return (s ?? "").toString().trim().toLowerCase()
}

function avatarInitials(name) {
  const parts = (name ?? "").split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? "D"
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "C"
  return (first + last).toUpperCase()
}

function postMatchesFilters(post) {
  const categoryOk = state.activeCategory === "All Posts" || post.category === state.activeCategory
  if (!categoryOk) return false

  const q = normalizeText(state.query)
  if (!q) return true

  const haystack = normalizeText([post.title, post.excerpt, post.author, post.category].join(" "))
  return haystack.includes(q)
}

function formatCountLabel({ shown, total, filteredTotal }) {
  const q = normalizeText(state.query)
  const cat = state.activeCategory
  const filtersOn = (cat && cat !== "All Posts") || Boolean(q)

  if (!filtersOn) return `Showing ${shown} of ${total} posts`
  const bits = []
  if (cat && cat !== "All Posts") bits.push(cat)
  if (q) bits.push(`“${state.query.trim()}”`)
  const suffix = bits.length ? ` for ${bits.join(" · ")}` : ""
  return `Showing ${shown} of ${filteredTotal} posts${suffix}`
}

function createCard(post, { featured = false } = {}) {
  const card = document.createElement("a")
  card.className = `card${featured ? " card--featured" : ""}`
  card.href = post.href || "#"

  const badgeClass = featured ? "badge badge--accent" : "badge"
  const dot = `<span class="badge__dot" aria-hidden="true"></span>`

  const metric =
    featured && post.kind === "stats"
      ? `
      <div class="featured-metric" aria-label="Agentic infrastructure stats">
        ${post.stats
          .map(
            (s) => `
          <div class="featured-metric__row">
            <div class="featured-metric__k">${escapeHtml(s.k)}</div>
            <div class="featured-metric__v">${escapeHtml(s.v)}</div>
          </div>`
          )
          .join("")}
      </div>`
      : ""

  card.innerHTML = `
    <div class="card__top">
      <span class="${badgeClass}">${dot}${escapeHtml(post.category)}</span>
      <span class="meta">${escapeHtml(post.date)}</span>
    </div>
    <div class="card__body">
      <h3 class="card__title">${escapeHtml(post.title)}</h3>
      <p class="card__excerpt">${escapeHtml(post.excerpt)}</p>
      ${metric}
    </div>
    <div class="card__footer">
      <div class="author" aria-label="Author">
        <div class="avatar" aria-hidden="true">${escapeHtml(avatarInitials(post.author))}</div>
        <div class="author__name">${escapeHtml(post.author)}</div>
      </div>
      <div class="read">Read <span aria-hidden="true">→</span></div>
    </div>
  `

  return card
}

function escapeHtml(s) {
  return (s ?? "")
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function renderFeatured() {
  const grid = qs("#featuredGrid")
  grid.innerHTML = ""
  data.featured.forEach((p, idx) => {
    const card = createCard(p, { featured: true })
    if (idx === 0) card.style.minHeight = "330px"
    grid.appendChild(card)
  })
}

function renderPosts() {
  const grid = qs("#postGrid")
  const empty = qs("#emptyState")
  const resultsCount = qs("#resultsCount")
  const moreHint = qs("#moreHint")
  const showMoreBtn = qs("#showMore")

  const filtered = data.posts.filter(postMatchesFilters)
  const total = data.posts.length

  const slice = filtered.slice(0, state.visibleCount)
  grid.innerHTML = ""
  slice.forEach((p) => grid.appendChild(createCard(p)))

  const shown = slice.length
  resultsCount.textContent = formatCountLabel({ shown, total, filteredTotal: filtered.length })

  const isEmpty = filtered.length === 0
  empty.hidden = !isEmpty
  grid.style.display = isEmpty ? "none" : "grid"

  const canShowMore = filtered.length > state.visibleCount
  showMoreBtn.disabled = !canShowMore
  showMoreBtn.style.opacity = canShowMore ? "1" : "0.55"
  showMoreBtn.style.cursor = canShowMore ? "pointer" : "not-allowed"
  moreHint.textContent = canShowMore
    ? `Showing ${state.visibleCount} of ${filtered.length}.`
    : filtered.length
      ? `You’ve reached the end (${filtered.length} posts).`
      : ""
}

function setActiveCategory(category) {
  state.activeCategory = category
  state.visibleCount = 6
  qsa(".pill").forEach((b) => {
    const active = b.dataset.category === category
    b.classList.toggle("is-active", active)
    b.setAttribute("aria-selected", active ? "true" : "false")
  })
  renderPosts()
}

function setQuery(q) {
  state.query = q
  state.visibleCount = 6

  const clear = qs(".search__clear")
  const has = Boolean(normalizeText(q))
  clear.hidden = !has
  renderPosts()
}

function setupFilters() {
  qsa(".pill").forEach((pill) => {
    pill.addEventListener("click", () => setActiveCategory(pill.dataset.category || "All Posts"))
  })

  const search = qs("#searchInput")
  const clear = qs(".search__clear")
  let t = null

  search.addEventListener("input", (e) => {
    const val = e.target.value
    window.clearTimeout(t)
    t = window.setTimeout(() => setQuery(val), 80)
  })

  clear.addEventListener("click", () => {
    search.value = ""
    search.focus()
    setQuery("")
  })

  qs("#resetFilters").addEventListener("click", () => {
    search.value = ""
    setQuery("")
    setActiveCategory("All Posts")
  })
}

function setupShowMore() {
  const btn = qs("#showMore")
  btn.addEventListener("click", () => {
    state.visibleCount += state.pageSize
    renderPosts()
  })
}

function setupDropdowns() {
  const dropdowns = qsa("[data-dropdown]")

  function closeAll(except) {
    dropdowns.forEach((d) => {
      if (d !== except) {
        d.dataset.open = "false"
        const btn = d.querySelector("button")
        if (btn) btn.setAttribute("aria-expanded", "false")
      }
    })
  }

  dropdowns.forEach((d) => {
    const btn = d.querySelector("button")
    if (!btn) return

    const open = () => {
      closeAll(d)
      d.dataset.open = "true"
      btn.setAttribute("aria-expanded", "true")
    }

    const close = () => {
      d.dataset.open = "false"
      btn.setAttribute("aria-expanded", "false")
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      const isOpen = d.dataset.open === "true"
      if (isOpen) close()
      else open()
    })

    d.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover)").matches) open()
    })
    d.addEventListener("mouseleave", () => {
      if (window.matchMedia("(hover: hover)").matches) close()
    })
  })

  document.addEventListener("click", () => closeAll(null))
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll(null)
  })
}

function setupMobileMenu() {
  const header = qs(".header")
  const toggle = qs(".mobile-toggle")
  const nav = qs(".nav")

  function setOpen(open) {
    header.dataset.mobileOpen = open ? "true" : "false"
    toggle.setAttribute("aria-expanded", open ? "true" : "false")
    if (!open) {
      qsa("[data-dropdown]").forEach((d) => {
        d.dataset.open = "false"
        const btn = d.querySelector("button")
        if (btn) btn.setAttribute("aria-expanded", "false")
      })
    }
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation()
    setOpen(!(header.dataset.mobileOpen === "true"))
  })

  nav.addEventListener("click", (e) => e.stopPropagation())
  document.addEventListener("click", () => setOpen(false))
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false)
  })
}

function main() {
  qs("#year").textContent = new Date().getFullYear().toString()
  renderFeatured()
  setupDropdowns()
  setupFilters()
  setupShowMore()
  setupMobileMenu()
  renderPosts()
}

main()

