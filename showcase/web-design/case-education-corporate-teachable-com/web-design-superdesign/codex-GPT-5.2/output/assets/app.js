(function () {
  "use strict";

  function qs(root, sel) {
    return (root || document).querySelector(sel);
  }

  function qsa(root, sel) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function initMobileNav() {
    var btn = qs(document, "[data-nav-toggle]");
    var panel = qs(document, "[data-nav-panel]");
    if (!btn || !panel) return;

    function setOpen(nextOpen) {
      btn.setAttribute("aria-expanded", String(nextOpen));
      panel.classList.toggle("open", nextOpen);
    }

    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    document.addEventListener("click", function (e) {
      if (!panel.classList.contains("open")) return;
      var target = e.target;
      if (panel.contains(target) || btn.contains(target)) return;
      setOpen(false);
    });
  }

  function initReveal() {
    var els = qsa(document, "[data-reveal]");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    els.forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  function initTabs() {
    qsa(document, "[data-tabs]").forEach(function (wrap) {
      var buttons = qsa(wrap, "[role='tab']");
      var panels = qsa(wrap, "[role='tabpanel']");
      if (!buttons.length || !panels.length) return;

      function activate(id) {
        buttons.forEach(function (b) {
          var selected = b.getAttribute("aria-controls") === id;
          b.setAttribute("aria-selected", String(selected));
          b.tabIndex = selected ? 0 : -1;
        });
        panels.forEach(function (p) {
          var show = p.id === id;
          p.hidden = !show;
        });
      }

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          activate(btn.getAttribute("aria-controls"));
        });

        btn.addEventListener("keydown", function (e) {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          e.preventDefault();
          var idx = buttons.indexOf(btn);
          var next = e.key === "ArrowRight" ? idx + 1 : idx - 1;
          next = (next + buttons.length) % buttons.length;
          buttons[next].focus();
          activate(buttons[next].getAttribute("aria-controls"));
        });
      });

      var initially = buttons.find(function (b) {
        return b.getAttribute("aria-selected") === "true";
      });
      activate((initially || buttons[0]).getAttribute("aria-controls"));
    });
  }

  function initAccordions() {
    qsa(document, "[data-accordion]").forEach(function (wrap) {
      var items = qsa(wrap, "details");
      if (!items.length) return;

      var single = wrap.getAttribute("data-accordion") !== "multi";
      if (!single) return;

      items.forEach(function (d) {
        d.addEventListener("toggle", function () {
          if (!d.open) return;
          items.forEach(function (other) {
            if (other !== d) other.open = false;
          });
        });
      });
    });
  }

  function initCarousels() {
    qsa(document, "[data-carousel]").forEach(function (wrap) {
      var track = qs(wrap, "[data-carousel-track]");
      var prev = qs(wrap, "[data-carousel-prev]");
      var next = qs(wrap, "[data-carousel-next]");
      var dotsWrap = qs(wrap, "[data-carousel-dots]");
      if (!track) return;

      var slides = qsa(track, "[data-carousel-slide]");
      if (!slides.length) return;

      var idx = 0;
      var autoplayMs = Number(wrap.getAttribute("data-autoplay")) || 0;
      var timer = null;

      function slideWidth() {
        var rect = slides[0].getBoundingClientRect();
        return rect.width;
      }

      function go(nextIdx) {
        idx = clamp(nextIdx, 0, slides.length - 1);
        track.scrollTo({ left: idx * slideWidth(), behavior: "smooth" });
        if (dotsWrap) {
          qsa(dotsWrap, "button").forEach(function (b, i) {
            b.setAttribute("aria-current", String(i === idx));
          });
        }
      }

      function nextFn() {
        go((idx + 1) % slides.length);
      }

      function prevFn() {
        go((idx - 1 + slides.length) % slides.length);
      }

      if (prev) prev.addEventListener("click", prevFn);
      if (next) next.addEventListener("click", nextFn);

      if (dotsWrap) {
        dotsWrap.innerHTML = "";
        slides.forEach(function (_, i) {
          var b = document.createElement("button");
          b.className = "dot";
          b.type = "button";
          b.setAttribute("aria-label", "Go to testimonial " + (i + 1));
          b.setAttribute("aria-current", String(i === idx));
          b.addEventListener("click", function () {
            go(i);
          });
          dotsWrap.appendChild(b);
        });
      }

      window.addEventListener("resize", function () {
        go(idx);
      });

      if (autoplayMs > 0) {
        var stop = function () {
          if (timer) window.clearInterval(timer);
          timer = null;
        };
        var start = function () {
          stop();
          timer = window.setInterval(nextFn, autoplayMs);
        };
        start();
        wrap.addEventListener("mouseenter", stop);
        wrap.addEventListener("mouseleave", start);
        wrap.addEventListener("focusin", stop);
        wrap.addEventListener("focusout", start);
      }
    });
  }

  function initAll() {
    initMobileNav();
    initReveal();
    initTabs();
    initAccordions();
    initCarousels();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();

