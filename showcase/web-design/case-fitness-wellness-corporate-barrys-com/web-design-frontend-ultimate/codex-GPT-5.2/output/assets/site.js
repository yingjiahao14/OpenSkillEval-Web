(() => {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const initMobileNav = () => {
    const toggle = document.querySelector("[data-mobile-toggle]");
    const panel = document.querySelector("[data-mobile-panel]");
    if (!toggle || !panel) return;

    const setOpen = (open) => {
      panel.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.contains("open");
      setOpen(!isOpen);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  };

  const initCountrySelector = () => {
    const btn = document.querySelector("[data-country-button]");
    const menu = document.querySelector("[data-country-menu]");
    const label = document.querySelector("[data-country-label]");
    if (!btn || !menu || !label) return;

    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    };

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setOpen(!menu.classList.contains("open"));
    });

    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const value = target.getAttribute("data-value");
      if (!value) return;
      label.textContent = value;
      setOpen(false);
    });

    document.addEventListener("click", (e) => {
      if (!(e.target instanceof Node)) return;
      if (btn.contains(e.target) || menu.contains(e.target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  };

  const initCarousel = () => {
    const root = document.querySelector("[data-carousel]");
    if (!root) return;

    const track = root.querySelector("[data-carousel-track]");
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    const dots = Array.from(root.querySelectorAll("[data-carousel-dot]"));

    if (!track || !prev || !next) return;

    const slides = Array.from(track.children);
    let index = 0;
    let startX = 0;
    let deltaX = 0;
    let pointerDown = false;

    const render = (animate = true) => {
      if (prefersReducedMotion) animate = false;
      track.style.transition = animate
        ? "transform 520ms cubic-bezier(0.2, 0.9, 0.2, 1)"
        : "none";
      track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
      dots.forEach((d, i) => d.setAttribute("aria-selected", String(i === index)));
      root.setAttribute("data-carousel-index", String(index));
    };

    const go = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      render(true);
    };

    prev.addEventListener("click", () => go(index - 1));
    next.addEventListener("click", () => go(index + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));

    const onPointerDown = (e) => {
      pointerDown = true;
      startX = e.clientX;
      deltaX = 0;
      track.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!pointerDown) return;
      deltaX = e.clientX - startX;
      const damp = clamp(deltaX / root.clientWidth, -0.35, 0.35);
      track.style.transition = "none";
      track.style.transform = `translate3d(${-index * 100 + damp * 100}%, 0, 0)`;
    };
    const onPointerUp = () => {
      if (!pointerDown) return;
      pointerDown = false;
      const threshold = 40;
      if (deltaX > threshold) go(index - 1);
      else if (deltaX < -threshold) go(index + 1);
      else render(true);
    };

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("pointerleave", onPointerUp);

    render(false);
  };

  const initToggle = () => {
    const root = document.querySelector("[data-toggle]");
    if (!root) return;

    const buttons = Array.from(root.querySelectorAll("[data-toggle-button]"));
    const panels = Array.from(document.querySelectorAll("[data-toggle-panel]"));
    if (buttons.length === 0 || panels.length === 0) return;

    const setActive = (id) => {
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.getAttribute("data-toggle-button") === id)));
      panels.forEach((p) => p.classList.toggle("active", p.getAttribute("data-toggle-panel") === id));
    };

    buttons.forEach((b) => {
      b.addEventListener("click", () => setActive(b.getAttribute("data-toggle-button")));
    });

    setActive(buttons[0].getAttribute("data-toggle-button"));
  };

  const initInstructorFilter = () => {
    const select = document.querySelector("[data-instructor-filter]");
    const cards = Array.from(document.querySelectorAll("[data-instructor-location]"));
    const count = document.querySelector("[data-instructor-count]");
    if (!select || cards.length === 0) return;

    const apply = () => {
      const value = select.value;
      let visible = 0;
      cards.forEach((card) => {
        const loc = card.getAttribute("data-instructor-location");
        const show = value === "all" || value === loc;
        card.style.display = show ? "block" : "none";
        if (show) visible += 1;
      });
      if (count) count.textContent = String(visible);
    };

    select.addEventListener("change", apply);
    apply();
  };

  const initAccordion = () => {
    const root = document.querySelector("[data-accordion]");
    if (!root) return;

    const items = Array.from(root.querySelectorAll("[data-accordion-item]"));
    if (items.length === 0) return;

    const closeAll = (except) => {
      items.forEach((item) => {
        if (item === except) return;
        item.setAttribute("data-open", "false");
        const panel = item.querySelector("[data-accordion-panel]");
        const btn = item.querySelector("[data-accordion-button]");
        if (panel) panel.style.maxHeight = "0px";
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    };

    const toggle = (item) => {
      const isOpen = item.getAttribute("data-open") === "true";
      closeAll(item);

      const nextOpen = !isOpen;
      item.setAttribute("data-open", nextOpen ? "true" : "false");
      const panel = item.querySelector("[data-accordion-panel]");
      const btn = item.querySelector("[data-accordion-button]");
      if (btn) btn.setAttribute("aria-expanded", nextOpen ? "true" : "false");
      if (!panel) return;

      if (nextOpen) {
        const inner = panel.querySelector(".accordion-panel-inner");
        const h = inner ? inner.scrollHeight : panel.scrollHeight;
        panel.style.maxHeight = `${h}px`;
      } else {
        panel.style.maxHeight = "0px";
      }
    };

    items.forEach((item) => {
      const btn = item.querySelector("[data-accordion-button]");
      if (!btn) return;
      btn.addEventListener("click", () => toggle(item));
    });

    // Default: first closed
    closeAll(null);
  };

  const initNewsletter = () => {
    const form = document.querySelector("[data-newsletter-form]");
    if (!form) return;
    const input = form.querySelector("[data-newsletter-email]");
    const help = form.querySelector("[data-newsletter-help]");
    const ok = form.querySelector("[data-newsletter-ok]");
    if (!input || !help) return;

    const isValidEmail = (value) => {
      const v = String(value || "").trim();
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    };

    const setState = (state, message) => {
      help.classList.remove("error", "ok");
      if (state) help.classList.add(state);
      help.textContent = message;
      if (ok) ok.hidden = !(state === "ok");
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = input.value;
      if (!isValidEmail(email)) {
        setState("error", "Please enter a valid email address (e.g., name@example.com)."
        );
        input.focus();
        return;
      }
      setState("ok", "Subscribed — welcome to the RedRoom intel feed."
      );
      form.reset();
    });

    input.addEventListener("input", () => {
      if (help.classList.contains("error") || help.classList.contains("ok")) {
        setState("", "Stay in the know. Get workout tips, class updates, and exclusive offers.");
      }
    });
  };

  const markActiveNav = () => {
    const path = location.pathname.split("/").pop() || "index.html";
    const links = Array.from(document.querySelectorAll("[data-nav] a[href]"));
    links.forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href === path) a.setAttribute("aria-current", "page");
    });
  };

  window.addEventListener("DOMContentLoaded", () => {
    markActiveNav();
    initMobileNav();
    initCountrySelector();
    initCarousel();
    initToggle();
    initInstructorFilter();
    initAccordion();
    initNewsletter();
  });
})();

