(function () {
  "use strict";

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function showToast(message) {
    var toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.setAttribute("data-show", "true");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.setAttribute("data-show", "false");
    }, 2200);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  }

  function mountEmailCapture(formId, inputId) {
    var form = document.getElementById(formId);
    var input = document.getElementById(inputId);
    if (!form || !input) return;

    var hint = form.querySelector("[data-hint]");

    function setError(msg) {
      input.classList.add("input-error");
      input.setAttribute("aria-invalid", "true");
      if (hint) {
        hint.textContent = msg;
        hint.hidden = false;
      }
    }

    function clearError() {
      input.classList.remove("input-error");
      input.removeAttribute("aria-invalid");
      if (hint) {
        hint.textContent = "";
        hint.hidden = true;
      }
    }

    input.addEventListener("input", function () {
      if (input.classList.contains("input-error")) clearError();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = String(input.value || "").trim();
      if (!isValidEmail(value)) {
        setError("Please enter a valid email address.");
        input.focus();
        return;
      }

      clearError();
      showToast("Nice — we’ll email you a sign-up link.");
    });
  }

  function mountCarousel() {
    var viewport = $("[data-carousel-viewport]");
    if (!viewport) return;

    var nextBtn = $("[data-carousel-next]");
    var prevBtn = $("[data-carousel-prev]");

    function scrollByCards(dir) {
      var firstCard = viewport.querySelector("[data-carousel-card]");
      var cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 220;
      var gap = 14;
      var amount = (cardWidth + gap) * 2 * dir;
      viewport.scrollBy({ left: amount, behavior: "smooth" });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        scrollByCards(1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        scrollByCards(-1);
      });
    }
  }

  function mountFaqAccordion() {
    var items = $all("[data-faq-item]");
    if (!items.length) return;

    function closeAllExcept(exceptId) {
      items.forEach(function (item) {
        var id = item.getAttribute("data-faq-item");
        var open = id === exceptId;
        item.setAttribute("data-open", open ? "true" : "false");
        var btn = item.querySelector("button");
        if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    items.forEach(function (item) {
      var btn = item.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var id = item.getAttribute("data-faq-item");
        var currentlyOpen = item.getAttribute("data-open") === "true";
        closeAllExcept(currentlyOpen ? "" : id);
      });
    });

    // Default open first.
    closeAllExcept(items[0].getAttribute("data-faq-item"));
  }

  function mountLoginForm() {
    var form = document.getElementById("login-form");
    if (!form) return;

    var email = document.getElementById("login-email");
    var pass = document.getElementById("login-password");
    var hint = $("#login-hint");

    function setError(msg) {
      if (hint) {
        hint.textContent = msg;
        hint.hidden = false;
      }
    }

    function clearError() {
      if (hint) {
        hint.textContent = "";
        hint.hidden = true;
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearError();

      var emailVal = String(email && email.value ? email.value : "").trim();
      var passVal = String(pass && pass.value ? pass.value : "");

      if (!emailVal) {
        setError("Enter your email address or mobile number.");
        if (email) email.focus();
        return;
      }

      if (!passVal) {
        setError("Enter your password.");
        if (pass) pass.focus();
        return;
      }

      showToast("Signed in (demo) — redirecting…");
      window.setTimeout(function () {
        window.location.href = "index.html";
      }, 900);
    });

    var helpBtn = $("#help-toggle");
    var helpPanel = $("#help-panel");
    if (helpBtn && helpPanel) {
      helpBtn.addEventListener("click", function () {
        var open = helpPanel.getAttribute("data-open") === "true";
        helpPanel.setAttribute("data-open", open ? "false" : "true");
        helpBtn.setAttribute("aria-expanded", open ? "false" : "true");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    mountEmailCapture("hero-email-form", "hero-email");
    mountEmailCapture("cta-email-form", "cta-email");
    mountCarousel();
    mountFaqAccordion();
    mountLoginForm();
  });
})();
