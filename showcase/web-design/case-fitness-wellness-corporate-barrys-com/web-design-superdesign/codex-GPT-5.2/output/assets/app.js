(function () {
  "use strict";

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  // Mobile nav
  (function initMobileNav() {
    var btn = $("[data-mobile-nav-toggle]");
    var sheet = $("[data-mobile-nav]");
    if (!btn || !sheet) return;

    function setOpen(next) {
      sheet.setAttribute("aria-hidden", next ? "false" : "true");
      btn.setAttribute("aria-expanded", next ? "true" : "false");
    }

    setOpen(false);
    btn.addEventListener("click", function () {
      var open = sheet.getAttribute("aria-hidden") === "false";
      setOpen(!open);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      setOpen(false);
    });
  })();

  // Footer country select
  (function initCountrySelect() {
    var btn = $("[data-country-button]");
    var menu = $("[data-country-menu]");
    var label = $("[data-country-label]");
    if (!btn || !menu) return;

    function close() {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }

    function open() {
      menu.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    }

    close();
    btn.addEventListener("click", function () {
      if (menu.hidden) open();
      else close();
    });

    $all("button[data-country-option]", menu).forEach(function (option) {
      option.addEventListener("click", function () {
        var next = option.getAttribute("data-country-option") || option.textContent.trim();
        if (label) label.textContent = next;
        close();
      });
    });

    document.addEventListener("click", function (e) {
      if (btn.contains(e.target) || menu.contains(e.target)) return;
      close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      close();
    });
  })();

  // Newsletter validation
  (function initNewsletter() {
    $all("form[data-newsletter]").forEach(function (form) {
      var input = $("input[type='email']", form);
      var help = $("[data-newsletter-help]", form);
      var ok = $("[data-newsletter-success]", form);
      if (!input) return;

      function setState(state, message) {
        if (!help) return;
        help.classList.remove("help--error", "help--success");
        if (state === "error") help.classList.add("help--error");
        if (state === "success") help.classList.add("help--success");
        help.textContent = message || "";
      }

      function isValidEmail(value) {
        // Basic, clear validation (no overfitting).
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || "").trim());
      }

      input.addEventListener("input", function () {
        if (!input.value) {
          setState("", "Stay in the know. Get workout tips, class updates, and exclusive offers.");
          if (ok) ok.hidden = true;
          return;
        }
        if (!isValidEmail(input.value)) {
          setState("error", "Please enter a valid email address.");
          if (ok) ok.hidden = true;
        } else {
          setState("success", "Looks good — you’re one click away.");
          if (ok) ok.hidden = true;
        }
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!isValidEmail(input.value)) {
          setState("error", "Please enter a valid email address to subscribe.");
          if (ok) ok.hidden = true;
          input.focus();
          return;
        }

        setState("success", "Subscribed. Welcome to the RedRoom newsletter.");
        if (ok) ok.hidden = false;
        form.reset();
      });
    });
  })();

  // Home carousel
  (function initCarousel() {
    var root = $("[data-carousel]");
    if (!root) return;

    var track = $("[data-carousel-track]", root);
    var slides = $all("[data-carousel-slide]", root);
    var prev = $("[data-carousel-prev]", root);
    var next = $("[data-carousel-next]", root);
    var dots = $all("[data-carousel-dot]", root);

    if (!track || slides.length === 0) return;
    var index = 0;

    function apply() {
      index = (index + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      dots.forEach(function (d, i) {
        d.setAttribute("aria-current", i === index ? "true" : "false");
      });
      if (prev) prev.disabled = false;
      if (next) next.disabled = false;
    }

    function goTo(nextIndex) {
      index = nextIndex;
      apply();
    }

    if (prev) {
      prev.addEventListener("click", function () {
        goTo(index - 1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        goTo(index + 1);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
      });
    });

    // Swipe gestures
    var startX = null;
    var active = false;

    function onStart(x) {
      startX = x;
      active = true;
    }

    function onMove(x) {
      if (!active || startX == null) return;
      // no-op for now; we keep it simple with thresholding.
      void x;
    }

    function onEnd(x) {
      if (!active || startX == null) return;
      var dx = x - startX;
      active = false;
      startX = null;
      var threshold = 48;
      if (Math.abs(dx) < threshold) return;
      if (dx < 0) goTo(index + 1);
      else goTo(index - 1);
    }

    root.addEventListener("touchstart", function (e) {
      if (!e.touches || !e.touches[0]) return;
      onStart(e.touches[0].clientX);
    }, { passive: true });
    root.addEventListener("touchmove", function (e) {
      if (!e.touches || !e.touches[0]) return;
      onMove(e.touches[0].clientX);
    }, { passive: true });
    root.addEventListener("touchend", function (e) {
      var x = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : 0;
      onEnd(x);
    });

    // Keyboard
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });

    apply();
  })();

  // Workout floor/tread toggle
  (function initWorkoutToggle() {
    var root = $("[data-workout-toggle]");
    if (!root) return;

    var floorBtn = $("[data-toggle='floor']", root);
    var treadBtn = $("[data-toggle='treadmill']", root);
    var floorPanel = $("[data-panel='floor']", root);
    var treadPanel = $("[data-panel='treadmill']", root);

    if (!floorBtn || !treadBtn || !floorPanel || !treadPanel) return;

    function set(mode) {
      var floor = mode === "floor";
      floorBtn.setAttribute("aria-pressed", floor ? "true" : "false");
      treadBtn.setAttribute("aria-pressed", floor ? "false" : "true");

      floorPanel.hidden = !floor;
      treadPanel.hidden = floor;

      // Micro animation: fade/slide
      var panel = floor ? floorPanel : treadPanel;
      panel.animate(
        [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 260, easing: "ease-out" }
      );
    }

    floorBtn.addEventListener("click", function () {
      set("floor");
    });
    treadBtn.addEventListener("click", function () {
      set("treadmill");
    });

    set("floor");
  })();

  // Instructor location filter
  (function initInstructorFilter() {
    var root = $("[data-instructors]");
    if (!root) return;

    var select = $("select[data-location-filter]", root);
    var cards = $all("[data-instructor-card]", root);
    if (!select || cards.length === 0) return;

    function apply() {
      var value = select.value;
      var any = value === "all";

      var visible = 0;
      cards.forEach(function (card) {
        var loc = (card.getAttribute("data-location") || "").toLowerCase();
        var show = any || loc === value;
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });

      var count = $("[data-filter-count]", root);
      if (count) count.textContent = String(visible);
    }

    select.addEventListener("change", function () {
      apply();
      var grid = $("[data-instructor-grid]", root);
      if (grid) {
        grid.animate(
          [{ opacity: 0.7, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 220, easing: "ease-out" }
        );
      }
    });

    apply();
  })();

  // FAQ accordion (single-open)
  (function initAccordion() {
    var root = $("[data-accordion]");
    if (!root) return;
    var items = $all("[data-acc-item]", root);
    if (items.length === 0) return;

    function closeAll(except) {
      items.forEach(function (item) {
        if (except && item === except) return;
        item.setAttribute("aria-expanded", "false");
        var panel = $("[data-acc-panel]", item);
        if (panel) panel.hidden = true;
      });
    }

    items.forEach(function (item) {
      var btn = $("[data-acc-button]", item);
      var panel = $("[data-acc-panel]", item);
      if (!btn || !panel) return;

      item.setAttribute("aria-expanded", "false");
      panel.hidden = true;

      btn.addEventListener("click", function () {
        var isOpen = item.getAttribute("aria-expanded") === "true";
        if (isOpen) {
          item.setAttribute("aria-expanded", "false");
          panel.hidden = true;
          return;
        }

        closeAll(item);
        item.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        panel.animate(
          [{ opacity: 0, transform: "translateY(-4px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 220, easing: "ease-out" }
        );
      });
    });

    // Open first item by default for scannability
    var first = items[0];
    if (first) {
      var firstPanel = $("[data-acc-panel]", first);
      first.setAttribute("aria-expanded", "true");
      if (firstPanel) firstPanel.hidden = false;
    }
  })();

  // Progressive enhancement: lucide icons if available
  (function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  })();
})();

