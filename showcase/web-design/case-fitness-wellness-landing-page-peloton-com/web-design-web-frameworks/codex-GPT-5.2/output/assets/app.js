(function () {
  "use strict";

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  // -----------------------------
  // Header dropdown + mobile menu
  // -----------------------------
  function initHeader() {
    var dropdowns = qsa("[data-dropdown]");

    function closeAll() {
      dropdowns.forEach(function (d) {
        d.dataset.open = "false";
        var btn = qs("button", d);
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }

    dropdowns.forEach(function (d) {
      var btn = qs("button", d);
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var next = d.dataset.open !== "true";
        closeAll();
        d.dataset.open = next ? "true" : "false";
        btn.setAttribute("aria-expanded", next ? "true" : "false");
      });
    });

    document.addEventListener("click", function (e) {
      var inside = e.target.closest && e.target.closest("[data-dropdown]");
      if (!inside) closeAll();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });

    var menuBtn = qs("[data-menu-btn]");
    var mobilePanel = qs("[data-mobile-panel]");
    if (menuBtn && mobilePanel) {
      menuBtn.addEventListener("click", function () {
        var isOpen = mobilePanel.classList.toggle("show");
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }
  }

  // -----------------------------
  // Tabs (generic)
  // -----------------------------
  function initTabs() {
    qsa("[data-tabs]").forEach(function (root) {
      var tabs = qsa('[role="tab"]', root);
      var panels = qsa('[role="tabpanel"]', root);
      if (tabs.length === 0 || panels.length === 0) return;

      function activate(tab) {
        var id = tab.getAttribute("aria-controls");
        tabs.forEach(function (t) {
          var selected = t === tab;
          t.setAttribute("aria-selected", selected ? "true" : "false");
          t.tabIndex = selected ? 0 : -1;
        });
        panels.forEach(function (p) {
          var active = p.id === id;
          p.hidden = !active;
          p.classList.toggle("active", active);
        });
      }

      tabs.forEach(function (t) {
        t.addEventListener("click", function () {
          activate(t);
        });
        t.addEventListener("keydown", function (e) {
          var idx = tabs.indexOf(t);
          if (e.key === "ArrowRight") {
            e.preventDefault();
            var nxt = tabs[(idx + 1) % tabs.length];
            nxt.focus();
            activate(nxt);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            var prv = tabs[(idx - 1 + tabs.length) % tabs.length];
            prv.focus();
            activate(prv);
          }
        });
      });

      // Default to the tab marked selected; otherwise first.
      var initial = tabs.find(function (t) {
        return t.getAttribute("aria-selected") === "true";
      });
      activate(initial || tabs[0]);
    });
  }

  // -----------------------------
  // Accordion (single-open)
  // -----------------------------
  function initAccordion() {
    qsa("[data-accordion]").forEach(function (root) {
      var items = qsa("[data-acc-item]", root);
      if (items.length === 0) return;

      function openItem(item) {
        items.forEach(function (it) {
          var isOpen = it === item;
          it.dataset.open = isOpen ? "true" : "false";
          var btn = qs("button", it);
          if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
      }

      items.forEach(function (it, index) {
        var btn = qs("button", it);
        if (!btn) return;
        btn.addEventListener("click", function () {
          var isOpen = it.dataset.open === "true";
          openItem(isOpen ? null : it);
          if (isOpen) {
            // close all
            items.forEach(function (x) {
              x.dataset.open = "false";
              var b = qs("button", x);
              if (b) b.setAttribute("aria-expanded", "false");
            });
          }
        });
        if (index === 0) {
          it.dataset.open = "true";
          btn.setAttribute("aria-expanded", "true");
        }
      });

      // ensure only the first is open initially
      var first = items[0];
      if (first) openItem(first);
    });
  }

  // -----------------------------
  // Testimonials carousel (dots)
  // -----------------------------
  function initCarousel() {
    qsa("[data-carousel]").forEach(function (root) {
      var track = qs("[data-carousel-track]", root);
      var slides = qsa("[data-slide]", root);
      var dots = qsa("[data-dot]", root);
      if (!track || slides.length === 0 || dots.length === 0) return;

      function goTo(i) {
        i = Math.max(0, Math.min(i, slides.length - 1));
        track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
        dots.forEach(function (d, idx) {
          d.setAttribute("aria-current", idx === i ? "true" : "false");
        });
      }

      dots.forEach(function (d, idx) {
        d.addEventListener("click", function () {
          goTo(idx);
        });
      });

      window.addEventListener("resize", function () {
        var current = dots.findIndex(function (d) {
          return d.getAttribute("aria-current") === "true";
        });
        goTo(current >= 0 ? current : 0);
      });

      goTo(0);
    });
  }

  // -----------------------------
  // Cookie banner (home only)
  // -----------------------------
  function initCookieBanner() {
    var banner = qs("[data-cookie]");
    if (!banner) return;

    var key = "wellstream_cookie_pref";
    var pref = null;
    try {
      pref = localStorage.getItem(key);
    } catch (_) {}

    if (!pref) {
      banner.classList.add("show");
    }

    function setPref(v) {
      try {
        localStorage.setItem(key, v);
      } catch (_) {}
      banner.classList.remove("show");
    }

    var accept = qs("[data-cookie-accept]", banner);
    var decline = qs("[data-cookie-decline]", banner);
    if (accept) accept.addEventListener("click", function () { setPref("accept"); });
    if (decline) decline.addEventListener("click", function () { setPref("decline"); });
  }

  // -----------------------------
  // Demo form validation
  // -----------------------------
  function initDemoForm() {
    var form = qs("[data-demo-form]");
    if (!form) return;

    var toast = qs("[data-toast]");

    function setInvalid(field, message) {
      var wrap = field.closest(".field");
      if (!wrap) return;
      wrap.dataset.invalid = "true";
      var err = qs(".error", wrap);
      if (err) err.textContent = message;
    }
    function clearInvalid(field) {
      var wrap = field.closest(".field");
      if (!wrap) return;
      wrap.dataset.invalid = "false";
    }
    function isEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
    }

    qsa("input,select,textarea", form).forEach(function (el) {
      el.addEventListener("input", function () {
        clearInvalid(el);
      });
      el.addEventListener("blur", function () {
        clearInvalid(el);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (toast) toast.classList.remove("show");

      var required = qsa("[data-required]", form);
      var ok = true;

      required.forEach(function (el) {
        var value = (el.value || "").trim();
        clearInvalid(el);
        if (!value) {
          ok = false;
          setInvalid(el, "This field is required.");
          return;
        }
        if (el.name === "email" && !isEmail(value)) {
          ok = false;
          setInvalid(el, "Enter a valid business email.");
        }
      });

      // Basic business email hint (not strict)
      var email = qs('input[name="email"]', form);
      if (email) {
        var v = (email.value || "").trim();
        if (v && /@(gmail|yahoo|outlook|hotmail)\./i.test(v)) {
          // still allow, but nudge
          // only show if other validations passed
          if (ok) {
            setInvalid(email, "Please use a business email if available.");
            ok = false;
          }
        }
      }

      if (!ok) {
        var firstBad = qs('.field[data-invalid="true"] input, .field[data-invalid="true"] select, .field[data-invalid="true"] textarea', form);
        if (firstBad && firstBad.focus) firstBad.focus();
        return;
      }

      // Simulate submission (static site)
      var payload = {};
      qsa("input,select,textarea", form).forEach(function (el) {
        if (!el.name) return;
        payload[el.name] = (el.value || "").trim();
      });

      try {
        sessionStorage.setItem("wellstream_demo_request", JSON.stringify({
          at: new Date().toISOString(),
          payload: payload,
        }));
      } catch (_) {}

      form.reset();
      if (toast) toast.classList.add("show");
    });
  }

  // -----------------------------
  // Use case cards behavior
  // -----------------------------
  function initUseCases() {
    qsa("[data-usecase]").forEach(function (card) {
      card.addEventListener("click", function () {
        var title = card.getAttribute("data-usecase") || "Use case";
        // Spec allows either navigate or show details. We'll show details.
        var detail = qs("[data-usecase-detail]");
        if (!detail) return;
        var heading = qs("[data-usecase-detail-title]", detail);
        var body = qs("[data-usecase-detail-body]", detail);
        if (heading) heading.textContent = title;
        if (body) body.textContent = card.getAttribute("data-usecase-desc") || "";
        detail.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initTabs();
    initAccordion();
    initCarousel();
    initCookieBanner();
    initDemoForm();
    initUseCases();
  });
})();

