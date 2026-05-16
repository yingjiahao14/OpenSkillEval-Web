(function () {
  "use strict";

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function on(element, eventName, handler, options) {
    element.addEventListener(eventName, handler, options);
  }

  function setAriaExpanded(trigger, isExpanded) {
    trigger.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  }

  function initDropdowns() {
    qsa("[data-dropdown]").forEach((wrap) => {
      const button = qs("button", wrap);
      const panel = qs(".dropdown-panel", wrap);
      if (!button || !panel) return;

      function close() {
        wrap.dataset.open = "false";
        button.setAttribute("aria-expanded", "false");
      }

      function open() {
        wrap.dataset.open = "true";
        button.setAttribute("aria-expanded", "true");
      }

      on(button, "click", (e) => {
        e.preventDefault();
        const isOpen = wrap.dataset.open === "true";
        if (isOpen) close();
        else open();
      });

      on(document, "click", (e) => {
        if (!wrap.contains(e.target)) close();
      });

      on(document, "keydown", (e) => {
        if (e.key === "Escape") close();
      });

      // Close on focus leaving the dropdown (keyboard users)
      on(panel, "keydown", (e) => {
        if (e.key !== "Tab") return;
        // Let focus move first, then evaluate
        setTimeout(() => {
          if (!wrap.contains(document.activeElement)) close();
        }, 0);
      });

      close();
    });
  }

  function initMobileNav() {
    const toggle = qs("[data-mobile-toggle]");
    const menu = qs("[data-mobile-menu]");
    if (!toggle || !menu) return;

    function setOpen(isOpen) {
      menu.hidden = !isOpen;
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    setOpen(false);

    on(toggle, "click", () => {
      setOpen(menu.hidden);
    });

    on(document, "keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function initTabs() {
    qsa("[data-tabs]").forEach((tabsRoot) => {
      const tabButtons = qsa("[role=tab]", tabsRoot);
      const panels = qsa("[role=tabpanel]", tabsRoot);
      if (!tabButtons.length || !panels.length) return;

      function activate(tabId, setFocus) {
        tabButtons.forEach((btn) => {
          const isActive = btn.getAttribute("aria-controls") === tabId;
          btn.setAttribute("aria-selected", isActive ? "true" : "false");
          btn.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach((panel) => {
          const isActive = panel.id === tabId;
          panel.dataset.active = isActive ? "true" : "false";
          panel.hidden = !isActive;
        });

        if (setFocus) {
          const activeBtn = tabButtons.find(
            (btn) => btn.getAttribute("aria-controls") === tabId,
          );
          if (activeBtn) activeBtn.focus();
        }
      }

      tabButtons.forEach((btn) => {
        on(btn, "click", () => {
          activate(btn.getAttribute("aria-controls"), false);
        });

        on(btn, "keydown", (e) => {
          const currentIndex = tabButtons.indexOf(btn);
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            const dir = e.key === "ArrowRight" ? 1 : -1;
            const nextIndex = (currentIndex + dir + tabButtons.length) % tabButtons.length;
            activate(tabButtons[nextIndex].getAttribute("aria-controls"), true);
          }
        });
      });

      const initiallySelected = tabButtons.find((btn) => btn.getAttribute("aria-selected") === "true");
      activate((initiallySelected || tabButtons[0]).getAttribute("aria-controls"), false);
    });
  }

  function initAccordion() {
    qsa("[data-accordion]").forEach((root) => {
      const triggers = qsa(".accordion-trigger", root);
      if (!triggers.length) return;

      function setOpen(indexToOpen) {
        triggers.forEach((trigger, idx) => {
          const panelId = trigger.getAttribute("aria-controls");
          const panel = panelId ? document.getElementById(panelId) : null;
          const isOpen = idx === indexToOpen;
          setAriaExpanded(trigger, isOpen);
          if (panel) {
            panel.dataset.open = isOpen ? "true" : "false";
            panel.hidden = !isOpen;
          }
        });
      }

      triggers.forEach((trigger, idx) => {
        on(trigger, "click", () => {
          setOpen(idx);
          const panelId = trigger.getAttribute("aria-controls");
          if (panelId) {
            const panel = document.getElementById(panelId);
            if (panel) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        });
        on(trigger, "keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(idx);
          }
        });
      });

      // Initialize state (open first by default)
      setOpen(0);
    });
  }

  function initCarousel() {
    qsa("[data-carousel]").forEach((root) => {
      const track = qs(".carousel-track", root);
      const slides = qsa(".carousel-slide", root);
      const dots = qsa(".dot", root);
      if (!track || slides.length === 0) return;

      let index = 0;

      function render() {
        track.style.transform = `translateX(${-index * 100}%)`;
        dots.forEach((d, i) => d.setAttribute("aria-current", i === index ? "true" : "false"));
      }

      dots.forEach((dot, i) => {
        on(dot, "click", () => {
          index = i;
          render();
        });
      });

      // Basic swipe support (mobile)
      let startX = null;
      on(track, "pointerdown", (e) => {
        startX = e.clientX;
      });
      on(track, "pointerup", (e) => {
        if (startX === null) return;
        const dx = e.clientX - startX;
        startX = null;
        if (Math.abs(dx) < 40) return;
        if (dx < 0) index = Math.min(index + 1, slides.length - 1);
        else index = Math.max(index - 1, 0);
        render();
      });

      render();
    });
  }

  function initCookieBanner() {
    const banner = qs("[data-cookie-banner]");
    if (!banner) return;

    const accept = qs("[data-cookie-accept]", banner);
    const decline = qs("[data-cookie-decline]", banner);
    if (!accept || !decline) return;

    const key = "wellstream_cookie_pref";
    const existing = localStorage.getItem(key);
    if (!existing) {
      banner.dataset.show = "true";
    }

    function dismiss(value) {
      localStorage.setItem(key, value);
      banner.dataset.show = "false";
    }

    on(accept, "click", () => dismiss("accepted"));
    on(decline, "click", () => dismiss("declined"));
  }

  function initDemoForm() {
    const form = qs("[data-demo-form]");
    if (!form) return;

    const success = qs("[data-form-success]");

    function setError(input, message) {
      const wrap = input.closest(".field");
      const err = wrap ? qs(".error", wrap) : null;
      if (err) {
        err.textContent = message;
        err.dataset.show = "true";
      }
      input.setAttribute("aria-invalid", "true");
    }

    function clearError(input) {
      const wrap = input.closest(".field");
      const err = wrap ? qs(".error", wrap) : null;
      if (err) err.dataset.show = "false";
      input.removeAttribute("aria-invalid");
    }

    function validate() {
      let ok = true;
      const required = qsa("[data-required]", form);

      required.forEach((input) => {
        clearError(input);
        if (!input.value || String(input.value).trim().length === 0) {
          ok = false;
          setError(input, "This field is required.");
          return;
        }

        if (input.type === "email") {
          const email = input.value.trim();
          if (!/^\S+@\S+\.\S+$/.test(email)) {
            ok = false;
            setError(input, "Enter a valid business email.");
          }
        }
      });

      return ok;
    }

    qsa("input,select,textarea", form).forEach((el) => {
      on(el, "input", () => clearError(el));
      on(el, "blur", () => {
        // light re-check for required fields
        if (el.hasAttribute("data-required") && (!el.value || !el.value.trim())) {
          setError(el, "This field is required.");
        }
      });
    });

    on(form, "submit", (e) => {
      e.preventDefault();
      if (!validate()) {
        const firstInvalid = qs("[aria-invalid=true]", form);
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const payload = Object.fromEntries(new FormData(form).entries());
      // No backend in this static deliverable: simulate a submit.
      console.log("Demo request payload:", payload);

      form.reset();
      qsa("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
      qsa(".error", form).forEach((el) => (el.dataset.show = "false"));

      if (success) {
        success.hidden = false;
        success.focus();
      }
    });
  }

  function init() {
    initDropdowns();
    initMobileNav();
    initTabs();
    initAccordion();
    initCarousel();
    initCookieBanner();
    initDemoForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
