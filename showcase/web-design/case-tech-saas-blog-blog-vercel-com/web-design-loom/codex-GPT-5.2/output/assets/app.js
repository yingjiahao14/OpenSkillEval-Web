/* DeployCloud Blog interactions: mega menus, filters, progressive load */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function debounce(fn, wait = 120) {
  let t;
  return (...args) => {
    window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), wait);
  };
}

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function formatVisibleCount(count) {
  return `${count} post${count === 1 ? "" : "s"}`;
}

function initMegaMenus() {
  const nav = $("[data-nav]");
  if (!nav) return;

  const items = $$('[data-menu-item="true"]', nav);

  function closeAll(exceptId = null) {
    for (const item of items) {
      const id = item.getAttribute("data-menu-id");
      const btn = $("button", item);
      const menu = $("[data-mega]", item);
      const open = id === exceptId;
      if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (menu) menu.setAttribute("data-open", open ? "true" : "false");
    }
  }

  function openMenu(id) {
    closeAll(id);
  }

  function isSmall() {
    return window.matchMedia("(max-width: 980px)").matches;
  }

  for (const item of items) {
    const id = item.getAttribute("data-menu-id");
    const btn = $("button", item);
    if (!btn) continue;

    // Hover (desktop)
    item.addEventListener("mouseenter", () => {
      if (isSmall()) return;
      openMenu(id);
    });
    item.addEventListener("mouseleave", () => {
      if (isSmall()) return;
      closeAll(null);
    });

    // Click (all)
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) closeAll(null);
      else openMenu(id);
    });
  }

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) closeAll(null);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll(null);
  });
}

function initFiltering() {
  const state = {
    activeCategory: "All Posts",
    query: "",
    // Progressive reveal state
    visibleCount: 0,
    step: 6,
  };

  const pills = $$("[data-category-pill]");
  const search = $("#search");
  const grid = $("#postsGrid");
  const noResults = $("#noResults");
  const count = $("#resultsCount");
  const live = $("#resultsLive");
  const loadMore = $("#loadMore");

  if (!grid) return;

  const allPosts = $$("[data-post]", grid).map((el) => {
    const data = {
      el,
      title: el.getAttribute("data-title") || "",
      excerpt: el.getAttribute("data-excerpt") || "",
      author: el.getAttribute("data-author") || "",
      category: el.getAttribute("data-category") || "General",
      date: el.getAttribute("data-date") || "",
    };
    data.search = normalize(`${data.title} ${data.excerpt} ${data.author} ${data.category} ${data.date}`);
    return data;
  });

  function matches(post) {
    const catOk =
      state.activeCategory === "All Posts" ||
      normalize(post.category) === normalize(state.activeCategory);
    const q = normalize(state.query);
    const qOk = !q || post.search.includes(q);
    return catOk && qOk;
  }

  function getFiltered() {
    return allPosts.filter(matches);
  }

  function setPillActive(name) {
    for (const pill of pills) {
      const isActive = pill.getAttribute("data-category") === name;
      pill.setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  function updateLoadMoreVisibility(filteredTotal) {
    if (!loadMore) return;
    const show = state.visibleCount < filteredTotal;
    loadMore.style.display = show ? "inline-flex" : "none";
    loadMore.disabled = !show;
    loadMore.setAttribute("aria-disabled", show ? "false" : "true");
  }

  function render() {
    const filtered = getFiltered();
    const total = filtered.length;

    // Hide all first
    for (const post of allPosts) post.el.style.display = "none";

    // Show visible slice
    const visible = filtered.slice(0, state.visibleCount);
    for (const post of visible) post.el.style.display = "block";

    if (count) count.textContent = `Showing ${visible.length} of ${total} ${formatVisibleCount(total)}.`;
    if (live) live.textContent = `Showing ${visible.length} of ${total} ${formatVisibleCount(total)}.`;

    if (noResults) {
      noResults.style.display = total === 0 ? "block" : "none";
    }

    updateLoadMoreVisibility(total);
  }

  function resetAndRender() {
    state.visibleCount = state.step;
    render();
  }

  // Category pills
  for (const pill of pills) {
    pill.addEventListener("click", () => {
      state.activeCategory = pill.getAttribute("data-category") || "All Posts";
      setPillActive(state.activeCategory);
      resetAndRender();
    });
  }

  // Search input
  if (search) {
    const onInput = debounce(() => {
      state.query = search.value || "";
      resetAndRender();
    }, 110);

    search.addEventListener("input", onInput);

    // Cmd/Ctrl+K focus
    document.addEventListener("keydown", (e) => {
      const isK = e.key.toLowerCase() === "k";
      const mod = e.metaKey || e.ctrlKey;
      if (mod && isK) {
        e.preventDefault();
        search.focus();
      }
    });
  }

  // Load more
  if (loadMore) {
    loadMore.addEventListener("click", () => {
      const total = getFiltered().length;
      state.visibleCount = Math.min(total, state.visibleCount + state.step);
      render();
    });
  }

  // Init
  setPillActive(state.activeCategory);
  state.visibleCount = state.step;
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  initMegaMenus();
  initFiltering();
});

