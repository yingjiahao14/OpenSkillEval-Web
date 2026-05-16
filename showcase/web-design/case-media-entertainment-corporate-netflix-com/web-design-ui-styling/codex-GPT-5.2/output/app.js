(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function setExpanded(btn, region, expanded) {
    btn.setAttribute("aria-expanded", String(expanded));
    region.setAttribute("aria-hidden", String(!expanded));
  }

  // --- Home: trending carousel ---
  (function initTrending() {
    var track = qs("#trendingTrack");
    if (!track) return;

    var next = qs("#trendingNext");
    var prev = qs("#trendingPrev");

    function scrollByCards(dir) {
      var firstTile = qs(".tile", track);
      var tileWidth = firstTile ? firstTile.getBoundingClientRect().width : 180;
      var gap = 14;
      var delta = (tileWidth + gap) * 2.2;
      track.scrollBy({ left: dir * delta, behavior: "smooth" });
    }

    if (next) next.addEventListener("click", function () { scrollByCards(1); });
    if (prev) prev.addEventListener("click", function () { scrollByCards(-1); });

    // Keyboard support
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByCards(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByCards(-1);
      }
    });
  })();

  // --- Home: FAQ accordion (single-open) ---
  (function initFaq() {
    var faq = qs("#faq");
    if (!faq) return;

    var items = qsa(".faq-item", faq);
    items.forEach(function (item) {
      var btn = qs(".faq-q", item);
      var region = qs(".faq-a", item);
      if (!btn || !region) return;

      // Set initial state
      item.dataset.open = "false";
      setExpanded(btn, region, false);

      function openItem() {
        items.forEach(function (other) {
          if (other === item) return;
          var otherBtn = qs(".faq-q", other);
          var otherRegion = qs(".faq-a", other);
          if (!otherBtn || !otherRegion) return;
          other.dataset.open = "false";
          otherRegion.style.maxHeight = "0px";
          setExpanded(otherBtn, otherRegion, false);
        });

        item.dataset.open = "true";
        // Measure content for smooth expand
        var inner = qs(".faq-a-inner", region);
        var target = inner ? inner.scrollHeight : region.scrollHeight;
        region.style.maxHeight = clamp(target + 8, 0, 2000) + "px";
        setExpanded(btn, region, true);
      }

      function closeItem() {
        item.dataset.open = "false";
        region.style.maxHeight = "0px";
        setExpanded(btn, region, false);
      }

      btn.addEventListener("click", function () {
        var isOpen = item.dataset.open === "true";
        if (isOpen) closeItem();
        else openItem();
      });
    });
  })();

  // --- Email capture forms (hero + CTA) ---
  (function initEmailForms() {
    function wire(formId, inputId, hintId) {
      var form = qs("#" + formId);
      if (!form) return;
      var input = qs("#" + inputId);
      var hint = qs("#" + hintId);
      if (!input) return;

      function setHint(msg, tone) {
        if (!hint) return;
        hint.textContent = msg;
        hint.style.color =
          tone === "error"
            ? "rgba(255,140,140,.92)"
            : tone === "ok"
              ? "rgba(170,255,200,.85)"
              : "rgba(255,255,255,.55)";
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var val = String(input.value || "").trim();
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (!ok) {
          input.setAttribute("aria-invalid", "true");
          setHint("Please enter a valid email address.", "error");
          input.focus();
          return;
        }

        input.removeAttribute("aria-invalid");
        setHint("Thanks — you're one step from pressing play.", "ok");
        // Simulate conversion flow: take user to login.
        window.setTimeout(function () {
          window.location.href = "login.html";
        }, 650);
      });

      input.addEventListener("input", function () {
        input.removeAttribute("aria-invalid");
      });
    }

    wire("heroEmailForm", "heroEmail", "heroEmailHint");
    wire("ctaEmailForm", "ctaEmail", "ctaEmailHint");
  })();

  // --- Login: validation + submit + help toggle ---
  (function initLogin() {
    var form = qs("#loginForm");
    if (!form) return;

    var identity = qs("#loginIdentity");
    var password = qs("#loginPassword");
    var identityError = qs("#loginIdentityError");
    var passwordError = qs("#loginPasswordError");
    var hint = qs("#loginHint");

    function setErr(el, errEl, msg) {
      if (msg) {
        el.setAttribute("aria-invalid", "true");
        if (errEl) {
          errEl.style.display = "block";
          errEl.textContent = msg;
        }
      } else {
        el.removeAttribute("aria-invalid");
        if (errEl) errEl.style.display = "none";
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (hint) {
        hint.textContent = "";
        hint.style.color = "rgba(255,255,255,.55)";
      }

      var idVal = String(identity && identity.value ? identity.value : "").trim();
      var pwVal = String(password && password.value ? password.value : "");

      var ok = true;
      if (!idVal) {
        ok = false;
        setErr(identity, identityError, "Enter your email address or mobile number.");
      } else {
        setErr(identity, identityError, "");
      }

      if (pwVal.length < 6) {
        ok = false;
        setErr(password, passwordError, "Your password must be at least 6 characters.");
      } else {
        setErr(password, passwordError, "");
      }

      if (!ok) {
        (identity.getAttribute("aria-invalid") === "true" ? identity : password).focus();
        return;
      }

      if (hint) {
        hint.textContent = "Signing in…";
        hint.style.color = "rgba(170,255,200,.85)";
      }
      window.setTimeout(function () {
        if (hint) {
          hint.textContent = "Signed in (demo). Redirecting…";
        }
        window.setTimeout(function () {
          window.location.href = "index.html";
        }, 700);
      }, 650);
    });

    [identity, password].forEach(function (el) {
      if (!el) return;
      el.addEventListener("input", function () {
        if (el === identity) setErr(identity, identityError, "");
        if (el === password) setErr(password, passwordError, "");
      });
    });

    var helpBtn = qs("#helpBtn");
    var helpPanel = qs("#helpPanel");
    if (helpBtn && helpPanel) {
      function openHelp(open) {
        helpBtn.setAttribute("aria-expanded", String(open));
        helpPanel.setAttribute("aria-hidden", String(!open));
        helpPanel.style.maxHeight = open ? helpPanel.scrollHeight + 12 + "px" : "0px";
      }
      openHelp(false);
      helpBtn.addEventListener("click", function () {
        var isOpen = helpBtn.getAttribute("aria-expanded") === "true";
        openHelp(!isOpen);
      });
    }
  })();
})();

