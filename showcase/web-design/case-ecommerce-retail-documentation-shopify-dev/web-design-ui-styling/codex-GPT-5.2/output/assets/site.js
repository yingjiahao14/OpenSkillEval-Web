(function () {
  const storageKeys = {
    theme: "cf_theme",
    sidebar: (page) => `cf_sidebar_${page}`,
  };

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }

  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function setTheme(next) {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(storageKeys.theme, next);
    } catch (_) {}
  }

  function getTheme() {
    try {
      return localStorage.getItem(storageKeys.theme);
    } catch (_) {
      return null;
    }
  }

  function initThemeToggle() {
    const btn = qs("[data-theme-toggle]");
    if (!btn) return;

    const initial = getTheme() || "dark";
    setTheme(initial);

    function syncLabel() {
      const theme = document.documentElement.getAttribute("data-theme") || "dark";
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      const label = theme === "dark" ? "Dark" : "Light";
      btn.setAttribute("title", `Theme: ${label}`);
      const text = qs(".theme-label", btn);
      if (text) text.textContent = label;
    }

    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
      syncLabel();
    });

    syncLabel();
  }

  function initCliTabs() {
    const root = qs("[data-cli]");
    if (!root) return;

    const tabs = qsa("[data-cli-tab]", root);
    const codeEl = qs("[data-cli-install-code]", root);
    const copyBtn = qs("[data-copy]", root);

    const installCmd = {
      npm: "npm i -g @commerceforge/cli@latest",
      yarn: "yarn global add @commerceforge/cli@latest",
      pnpm: "pnpm add -g @commerceforge/cli@latest",
    };

    function setActive(pkg) {
      tabs.forEach((t) => t.setAttribute("aria-selected", t.dataset.cliTab === pkg ? "true" : "false"));
      if (codeEl) codeEl.textContent = installCmd[pkg] || installCmd.npm;
      root.setAttribute("data-cli-pm", pkg);
    }

    tabs.forEach((t) => {
      t.addEventListener("click", () => setActive(t.dataset.cliTab));
    });

    if (copyBtn && codeEl) {
      copyBtn.addEventListener("click", async () => {
        const text = codeEl.textContent || "";
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.textContent = "Copied";
          setTimeout(() => (copyBtn.textContent = "Copy"), 850);
        } catch (_) {
          // Fallback
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          copyBtn.textContent = "Copied";
          setTimeout(() => (copyBtn.textContent = "Copy"), 850);
        }
      });
    }

    // Generic copy support for any element with data-copy-text.
    qsa("[data-copy-text]", root).forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = btn.getAttribute("data-copy-text") || "";
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          const prev = btn.textContent;
          btn.textContent = "Copied";
          setTimeout(() => (btn.textContent = prev || "Copy"), 850);
        } catch (_) {}
      });
    });

    setActive("npm");
  }

  function initCliAccordion() {
    const root = qs("[data-cli]");
    if (!root) return;
    const items = qsa("[data-acc-item]", root);
    if (!items.length) return;

    function openOnly(id) {
      items.forEach((item) => {
        const isOpen = item.dataset.accItem === id;
        item.setAttribute("data-open", isOpen ? "true" : "false");
        const trigger = qs("button[data-acc-trigger]", item);
        if (trigger) trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    items.forEach((item) => {
      const trigger = qs("button[data-acc-trigger]", item);
      if (!trigger) return;
      trigger.addEventListener("click", () => {
        const currentlyOpen = item.getAttribute("data-open") === "true";
        openOnly(currentlyOpen ? "" : item.dataset.accItem);
      });
    });

    openOnly(items[0].dataset.accItem);
  }

  function initSidebarCollapse() {
    const layout = qs("[data-docs-layout]");
    if (!layout) return;

    const page = layout.dataset.page || "docs";
    const toggle = qs("[data-sidebar-toggle]");
    const mobileToggle = qs("[data-sidebar-mobile-toggle]");

    function setCollapsed(collapsed) {
      layout.setAttribute("data-sidebar", collapsed ? "collapsed" : "open");
      try {
        localStorage.setItem(storageKeys.sidebar(page), collapsed ? "collapsed" : "open");
      } catch (_) {}
    }

    function getCollapsed() {
      try {
        return localStorage.getItem(storageKeys.sidebar(page)) === "collapsed";
      } catch (_) {
        return false;
      }
    }

    const prefersCollapsed = window.matchMedia && window.matchMedia("(max-width: 980px)").matches;
    setCollapsed(prefersCollapsed ? true : getCollapsed());

    if (toggle) {
      toggle.addEventListener("click", () => {
        const collapsed = layout.getAttribute("data-sidebar") === "collapsed";
        setCollapsed(!collapsed);
      });
    }

    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        const collapsed = layout.getAttribute("data-sidebar") === "collapsed";
        setCollapsed(!collapsed);
      });
    }
  }

  function initAssistantSearch() {
    const form = qs("[data-assistant-form]");
    if (!form) return;

    const input = qs("[data-assistant-input]", form);
    const out = qs("[data-assistant-output]");

    function render(q) {
      if (!out) return;
      const trimmed = (q || "").trim();
      if (!trimmed) {
        out.innerHTML = "";
        out.hidden = true;
        return;
      }
      out.hidden = false;
      out.innerHTML =
        `<div class="callout"><strong>Ask assistant</strong><div style="margin-top:6px;color:var(--muted)">` +
        `This is a static docs demo. Try searching in-page (Ctrl/⌘+F) for <span class="inline-code">${escapeHtml(trimmed)}</span> or navigate via sidebar.` +
        `</div></div>`;
    }

    function escapeHtml(s) {
      return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      render(input ? input.value : "");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initCliTabs();
    initCliAccordion();
    initSidebarCollapse();
    initAssistantSearch();
  });
})();
