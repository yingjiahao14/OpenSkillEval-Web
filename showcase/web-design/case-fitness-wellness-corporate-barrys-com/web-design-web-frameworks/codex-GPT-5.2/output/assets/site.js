function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setAriaCurrent() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $all("[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const isHome = path === "" || path === "index.html";
    const active = (isHome && href.endsWith("index.html")) || href.endsWith(path);
    if (active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

function initMobileNav() {
  const btn = $("[data-mobile-toggle]");
  const menu = $("[data-navlinks]");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const open = menu.getAttribute("data-open") === "true";
    menu.setAttribute("data-open", String(!open));
    btn.setAttribute("aria-expanded", String(!open));
  });
}

function initCountrySelect() {
  const trigger = $("[data-country-trigger]");
  const panel = $("[data-country-panel]");
  const label = $("[data-country-label]");
  if (!trigger || !panel || !label) return;

  function close() {
    panel.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
  }
  function open() {
    panel.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
  }

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const hidden = panel.getAttribute("aria-hidden") !== "false";
    if (hidden) open();
    else close();
  });

  $all("button[data-country]", panel).forEach((b) => {
    b.addEventListener("click", () => {
      label.textContent = b.getAttribute("data-country") || "US";
      close();
    });
  });

  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !trigger.contains(e.target)) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function initNewsletterForms() {
  $all("form[data-newsletter]").forEach((form) => {
    const input = $("input[type=email]", form);
    const feedback = $("[data-feedback]", form);
    if (!input || !feedback) return;

    function show(msg, ok) {
      feedback.textContent = msg;
      feedback.classList.remove("ok", "error");
      feedback.classList.add(ok ? "ok" : "error");
    }

    function validate(val) {
      const v = String(val || "").trim();
      if (!v) return { ok: false, msg: "Please enter your email." };
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (!ok) return { ok: false, msg: "Enter a valid email (example: name@email.com)." };
      return { ok: true, msg: "You’re in. Watch your inbox for RedRoom drops." };
    }

    input.addEventListener("input", () => {
      if (!feedback.textContent) return;
      const res = validate(input.value);
      show(res.msg, res.ok);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const res = validate(input.value);
      show(res.msg, res.ok);
      if (res.ok) {
        form.reset();
      }
    });
  });
}

function initCarousel() {
  const root = $("[data-carousel]");
  if (!root) return;
  const track = $("[data-track]", root);
  const slides = $all("[data-slide]", root);
  const prev = $("[data-prev]", root);
  const next = $("[data-next]", root);
  const dots = $all("[data-dot]", root);
  if (!track || slides.length === 0) return;

  let idx = 0;

  function render() {
    const x = -idx * 100;
    track.style.transform = `translateX(${x}%)`;
    dots.forEach((d, i) => d.setAttribute("aria-current", String(i === idx)));
  }

  function go(n) {
    idx = (n + slides.length) % slides.length;
    render();
  }

  prev?.addEventListener("click", () => go(idx - 1));
  next?.addEventListener("click", () => go(idx + 1));
  dots.forEach((d, i) => d.addEventListener("click", () => go(i)));

  // touch / swipe
  let startX = 0;
  let active = false;
  const viewport = $("[data-viewport]", root);
  const threshold = 40;
  viewport?.addEventListener("pointerdown", (e) => {
    active = true;
    startX = e.clientX;
    viewport.setPointerCapture(e.pointerId);
  });
  viewport?.addEventListener("pointerup", (e) => {
    if (!active) return;
    active = false;
    const dx = e.clientX - startX;
    if (dx > threshold) go(idx - 1);
    if (dx < -threshold) go(idx + 1);
  });
  viewport?.addEventListener("pointercancel", () => (active = false));

  render();
}

function initFloorTreadToggle() {
  const root = $("[data-floor-tread]");
  if (!root) return;

  const buttons = $all("button[data-mode]", root);
  const panels = $all("[data-panel]");
  if (buttons.length === 0 || panels.length === 0) return;

  function setMode(mode) {
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === mode)));
    panels.forEach((p) => {
      if (!p.hasAttribute("data-panel")) return;
      const on = p.getAttribute("data-panel") === mode;
      p.hidden = !on;
    });
  }

  buttons.forEach((b) => b.addEventListener("click", () => setMode(b.getAttribute("data-mode"))));
  setMode("floor");
}

function initInstructorFilter() {
  const root = $("[data-instructors]");
  if (!root) return;
  const select = $("select[data-location]", root);
  const cards = $all("[data-instructor]", root);
  const count = $("[data-count]", root);
  if (!select) return;

  function render() {
    const value = select.value;
    let visible = 0;
    cards.forEach((c) => {
      const loc = c.getAttribute("data-location") || "";
      const show = value === "all" || loc === value;
      c.style.display = show ? "block" : "none";
      if (show) visible += 1;
    });
    if (count) count.textContent = `${visible} instructor${visible === 1 ? "" : "s"}`;
  }

  select.addEventListener("change", render);
  render();
}

function initFaqAccordion() {
  const root = $("[data-faq]");
  if (!root) return;
  const items = $all("[data-faq-item]", root);
  items.forEach((item) => {
    const btn = $("button[data-faq-q]", item);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";
      items.forEach((i) => i.setAttribute("data-open", "false"));
      item.setAttribute("data-open", String(!isOpen));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setAriaCurrent();
  initMobileNav();
  initCountrySelect();
  initNewsletterForms();
  initCarousel();
  initFloorTreadToggle();
  initInstructorFilter();
  initFaqAccordion();
});
