// Shared helpers used across pages (kept tiny and dependency-free)
// - Sets active nav links
// - Creates lucide icons (if loaded)
(function () {
  "use strict";

  function initActiveNav() {
    const current = document.body.getAttribute("data-page");
    if (!current) return;

    document.querySelectorAll("[data-nav-page]").forEach((el) => {
      const page = el.getAttribute("data-nav-page");
      if (page === current) {
        el.setAttribute("aria-current", "page");
      }
    });
  }

  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function init() {
    initActiveNav();
    initIcons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

