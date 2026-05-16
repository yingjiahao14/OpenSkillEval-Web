const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function setupCarousels() {
  $$("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    if (!track) return;

    const prev = carousel.querySelector('[data-carousel-btn="prev"]');
    const next = carousel.querySelector('[data-carousel-btn="next"]');

    const scrollByCards = (dir) => {
      const card = track.querySelector(".card");
      const cardWidth = card ? card.getBoundingClientRect().width : 320;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "14");
      const delta = (cardWidth + (Number.isFinite(gap) ? gap : 14)) * 2;
      track.scrollBy({ left: dir * delta, behavior: "smooth" });
    };

    prev?.addEventListener("click", () => scrollByCards(-1));
    next?.addEventListener("click", () => scrollByCards(1));

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const x = clamp(track.scrollLeft, 0, Math.max(0, max));
      const atStart = x <= 1;
      const atEnd = x >= max - 1;
      if (prev) prev.disabled = atStart;
      if (next) next.disabled = atEnd;
      if (prev) prev.style.opacity = atStart ? "0.35" : "1";
      if (next) next.style.opacity = atEnd ? "0.35" : "1";
    };

    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  });
}

function setupEntertainmentTabs() {
  const root = document.querySelector("[data-tabs]");
  if (!root) return;

  const tabs = $$("[role=tab]", root);
  const panels = $$("[role=tabpanel]", root);
  if (!tabs.length || !panels.length) return;

  const activate = (id) => {
    tabs.forEach((t) => {
      const selected = t.getAttribute("aria-controls") === id;
      t.setAttribute("aria-selected", selected ? "true" : "false");
      t.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((p) => {
      p.hidden = p.id !== id;
    });
  };

  tabs.forEach((t) => {
    t.addEventListener("click", () => activate(t.getAttribute("aria-controls")));
    t.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const idx = tabs.indexOf(t);
      const nextIdx = e.key === "ArrowRight" ? idx + 1 : idx - 1;
      const nxt = tabs[(nextIdx + tabs.length) % tabs.length];
      nxt.focus();
      activate(nxt.getAttribute("aria-controls"));
    });
  });

  const initial = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
  activate(initial.getAttribute("aria-controls"));
}

function setupFooterAccordion() {
  $$("[data-footer-col]").forEach((col) => {
    const btn = col.querySelector("button.accordion-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const open = col.getAttribute("data-open") === "true";
      col.setAttribute("data-open", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });
}

function setupSectionNav() {
  const nav = document.querySelector("[data-section-nav]");
  if (!nav) return;
  const tabs = $$("a.section-tab", nav);
  const map = new Map();

  tabs.forEach((t) => {
    const href = t.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href);
    if (el) map.set(href, el);
    t.addEventListener("click", (e) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  });

  const update = () => {
    if (!map.size) return;
    const y = window.scrollY + 120;
    let current = tabs[0]?.getAttribute("href");
    for (const [href, el] of map.entries()) {
      if (el.offsetTop <= y) current = href;
    }
    tabs.forEach((t) => t.setAttribute("aria-current", t.getAttribute("href") === current ? "true" : "false"));
  };

  document.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  setupCarousels();
  setupEntertainmentTabs();
  setupFooterAccordion();
  setupSectionNav();
});

