/* IdeaForum 404 — interactions */

(function () {
  "use strict";

  /* ---- Year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  /* ---- Search ---- */
  window.handleSearch = function (e) {
    e.preventDefault();
    var q = document.getElementById("q").value.trim();
    if (q) {
      window.location.href = "https://www.ideaforum.com/search?q=" + encodeURIComponent(q);
    }
    return false;
  };

  /* ---- Cookie banner ---- */
  var banner = document.getElementById("cookie-banner");
  var acceptBtn = document.getElementById("accept-all");
  var openPrefsBtn = document.getElementById("open-prefs");
  var savedConsent = false;

  try {
    savedConsent = localStorage.getItem("ideaforum_cookie_consent") === "1";
  } catch (_) {}

  if (!savedConsent) {
    setTimeout(function () {
      banner.classList.add("visible");
    }, 800);
  }

  function hideBanner() {
    banner.classList.remove("visible");
    banner.classList.add("hidden");
    try {
      localStorage.setItem("ideaforum_cookie_consent", "1");
    } catch (_) {}
  }

  acceptBtn.addEventListener("click", hideBanner);

  /* ---- Preferences modal ---- */
  var modal = document.getElementById("prefs");
  var saveBtn = document.getElementById("save-prefs");
  var closeBtns = modal.querySelectorAll("[data-close]");
  var lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    var firstFocusable = modal.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (firstFocusable) firstFocusable.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  openPrefsBtn.addEventListener("click", function () {
    openModal();
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });

  saveBtn.addEventListener("click", function () {
    hideBanner();
    closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  /* Trap focus inside modal */
  modal.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var focusable = modal.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* Update toggle labels when toggled */
  var toggles = document.querySelectorAll(".toggle:not(.toggle--locked) input");
  toggles.forEach(function (input) {
    input.addEventListener("change", function () {
      var label = this.closest(".toggle").querySelector(".toggle__label");
      if (label) label.textContent = this.checked ? "On" : "Off";
    });
  });
})();
