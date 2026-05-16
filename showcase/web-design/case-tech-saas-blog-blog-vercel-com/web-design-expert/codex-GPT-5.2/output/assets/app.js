(function () {
  "use strict";

  const state = {
    activeCategory: "All Posts",
    query: "",
    pageSize: 6,
    shown: 6,
  };

  const CATEGORY_ALIASES = {
    General: "All Posts",
  };

  const els = {
    pills: document.querySelector("#categoryPills"),
    search: document.querySelector("#searchInput"),
    latestGrid: document.querySelector("#latestGrid"),
    noResults: document.querySelector("#noResults"),
    resultsCount: document.querySelector("#resultsCount"),
    showMore: document.querySelector("#showMoreBtn"),
    productsToggle: document.querySelector("#productsToggle"),
    resourcesToggle: document.querySelector("#resourcesToggle"),
    productsMenu: document.querySelector("#productsMenu"),
    resourcesMenu: document.querySelector("#resourcesMenu"),
    mobileToggle: document.querySelector("#mobileToggle"),
    mobileMenu: document.querySelector("#mobileMenu"),
  };

  const posts = (window.DEPLOYCLOUD_POSTS || []).map((p) => {
    const category = CATEGORY_ALIASES[p.category] || p.category;
    const haystack = [p.title, p.excerpt, p.author, category].join(" ").toLowerCase();
    return { ...p, category, _haystack: haystack };
  });

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function matchesFilters(p) {
    const catOk = state.activeCategory === "All Posts" || p.category === state.activeCategory;
    const q = state.query.trim().toLowerCase();
    const qOk = q.length === 0 || p._haystack.includes(q);
    return catOk && qOk;
  }

  function getFiltered() {
    return posts.filter(matchesFilters);
  }

  function initials(name) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "DC";
    const first = parts[0]?.[0] || "D";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "C";
    return (first + last).toUpperCase();
  }

  function readTimeFromExcerpt(excerpt) {
    const words = String(excerpt || "").split(/\s+/).filter(Boolean).length;
    const minutes = clamp(Math.round(words / 35) + 2, 3, 7);
    return `${minutes} min read`;
  }

  function tagSwatch(category) {
    const map = {
      Engineering: "oklch(56% 0.23 265)",
      Customers: "oklch(72% 0.18 52)",
      Security: "oklch(60% 0.18 20)",
      Community: "oklch(64% 0.17 145)",
      "Company News": "oklch(62% 0.15 285)",
      v0: "oklch(66% 0.16 310)",
      Changelog: "oklch(62% 0.14 230)",
      Press: "oklch(70% 0.12 90)",
      "All Posts": "oklch(56% 0.23 265)",
    };
    return map[category] || "oklch(56% 0.23 265)";
  }

  function renderCard(p) {
    const rt = readTimeFromExcerpt(p.excerpt);
    const sw = tagSwatch(p.category);
    return `
      <article class="card compact" data-post-id="${escapeHtml(p.id)}">
        <a href="#" aria-label="Read: ${escapeAttr(p.title)}">
          <div class="card-inner">
            <div class="card-top">
              <div class="tag"><span class="swatch" style="background:${sw}"></span>${escapeHtml(p.category)}</div>
              <div class="meta">${escapeHtml(p.date)}</div>
            </div>
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.excerpt)}</p>
            <div class="card-footer">
              <div class="author">
                <div class="avatar" aria-hidden="true">${escapeHtml(initials(p.author))}</div>
                <span>${escapeHtml(p.author)}</span>
              </div>
              <div class="readtime">${escapeHtml(rt)}</div>
            </div>
          </div>
        </a>
      </article>
    `.trim();
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replaceAll("`", "&#96;");
  }

  function setPillActive(category) {
    const buttons = els.pills?.querySelectorAll("button[data-category]") || [];
    buttons.forEach((b) => {
      const isActive = b.getAttribute("data-category") === category;
      b.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function updateResults() {
    const filtered = getFiltered();
    const visibleCount = clamp(state.shown, 0, filtered.length);
    const visible = filtered.slice(0, visibleCount);

    els.latestGrid.innerHTML = visible.map(renderCard).join("\n");

    const showNoResults = filtered.length === 0;
    els.noResults.setAttribute("data-show", showNoResults ? "true" : "false");

    const label = `${filtered.length} post${filtered.length === 1 ? "" : "s"} · ` +
      `${state.activeCategory === "All Posts" ? "All categories" : state.activeCategory}` +
      (state.query.trim() ? ` · “${state.query.trim()}”` : "");
    els.resultsCount.textContent = label;

    const canShowMore = filtered.length > visibleCount;
    els.showMore.disabled = !canShowMore;
    els.showMore.style.opacity = canShowMore ? "1" : "0.55";
    els.showMore.style.cursor = canShowMore ? "pointer" : "not-allowed";
  }

  function resetPaging() {
    state.shown = state.pageSize;
  }

  function closeMenus() {
    if (els.productsMenu) els.productsMenu.setAttribute("data-open", "false");
    if (els.resourcesMenu) els.resourcesMenu.setAttribute("data-open", "false");
    if (els.productsToggle) els.productsToggle.setAttribute("aria-expanded", "false");
    if (els.resourcesToggle) els.resourcesToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu(which) {
    const isProducts = which === "products";
    const menu = isProducts ? els.productsMenu : els.resourcesMenu;
    const toggle = isProducts ? els.productsToggle : els.resourcesToggle;
    const otherMenu = isProducts ? els.resourcesMenu : els.productsMenu;
    const otherToggle = isProducts ? els.resourcesToggle : els.productsToggle;

    const openNow = menu.getAttribute("data-open") === "true";

    // Close other
    otherMenu.setAttribute("data-open", "false");
    otherToggle.setAttribute("aria-expanded", "false");

    // Toggle this
    menu.setAttribute("data-open", openNow ? "false" : "true");
    toggle.setAttribute("aria-expanded", openNow ? "false" : "true");
  }

  function setup() {
    // Pills
    els.pills?.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-category]");
      if (!btn) return;
      state.activeCategory = btn.getAttribute("data-category") || "All Posts";
      setPillActive(state.activeCategory);
      resetPaging();
      updateResults();
    });

    // Search
    els.search?.addEventListener("input", (e) => {
      state.query = e.target.value || "";
      resetPaging();
      updateResults();
    });

    // Show more
    els.showMore?.addEventListener("click", () => {
      state.shown += state.pageSize;
      updateResults();
    });

    // Mega menus: click toggles
    const bindMega = (toggle, which) => {
      if (!toggle) return;
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu(which);
      });

      // Hover open on desktop
      toggle.addEventListener("mouseenter", () => {
        if (window.matchMedia("(max-width: 740px)").matches) return;
        toggleMenu(which);
      });
    };

    bindMega(els.productsToggle, "products");
    bindMega(els.resourcesToggle, "resources");

    // Keep menus open when hovering
    [els.productsMenu, els.resourcesMenu].forEach((m) => {
      if (!m) return;
      m.addEventListener("click", (e) => e.stopPropagation());
      m.addEventListener("mouseenter", () => {
        if (window.matchMedia("(max-width: 740px)").matches) return;
        m.setAttribute("data-open", "true");
      });
      m.addEventListener("mouseleave", () => {
        if (window.matchMedia("(max-width: 740px)").matches) return;
        m.setAttribute("data-open", "false");
        if (m === els.productsMenu) els.productsToggle.setAttribute("aria-expanded", "false");
        if (m === els.resourcesMenu) els.resourcesToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click / Esc
    document.addEventListener("click", closeMenus);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenus();
        if (els.mobileMenu) els.mobileMenu.setAttribute("data-open", "false");
        if (els.mobileToggle) els.mobileToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Mobile menu
    els.mobileToggle?.addEventListener("click", () => {
      const openNow = els.mobileMenu.getAttribute("data-open") === "true";
      els.mobileMenu.setAttribute("data-open", openNow ? "false" : "true");
      els.mobileToggle.setAttribute("aria-expanded", openNow ? "false" : "true");
      closeMenus();
    });

    // Initial
    setPillActive(state.activeCategory);
    updateResults();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
