(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }

  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  // Mobile drawer
  const menuBtn = qs("[data-menu-btn]");
  const drawerCloseBtn = qs("[data-drawer-close]");
  const drawerBackdrop = qs("[data-drawer-backdrop]");
  const drawer = qs("[data-drawer]");

  function setDrawerOpen(open) {
    document.body.classList.toggle("drawer-open", open);
    if (drawer) drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open && drawerCloseBtn) drawerCloseBtn.focus();
    if (!open && menuBtn) menuBtn.focus();
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", () => setDrawerOpen(!document.body.classList.contains("drawer-open")));
  }
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", () => setDrawerOpen(false));
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", () => setDrawerOpen(false));
  if (drawer) {
    drawer.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) setDrawerOpen(false);
    });
  }

  // Donate modal
  const donateOpeners = qsa("[data-open-donate]");
  const modalBackdrop = qs("[data-modal-backdrop]");
  const modalCloseBtn = qs("[data-modal-close]");
  const donationForm = qs("[data-donation-form]");
  const amountButtons = qsa("[data-amount]");
  const customAmountInput = qs("#donationCustom");
  const selectedAmountLabel = qs("[data-selected-amount]");
  let lastFocus = null;

  function setModalOpen(open) {
    if (!modalBackdrop) return;
    modalBackdrop.setAttribute("data-open", open ? "true" : "false");
    modalBackdrop.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      lastFocus = document.activeElement;
      window.setTimeout(() => {
        const target = qs("[data-autofocus]") || modalCloseBtn;
        if (target) target.focus();
      }, 0);
    } else if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function setSelectedAmount(amountValue, impactText, isCustom) {
    amountButtons.forEach((btn) => {
      btn.setAttribute("data-selected", btn.getAttribute("data-amount") === String(amountValue) && !isCustom ? "true" : "false");
      btn.setAttribute("aria-pressed", btn.getAttribute("data-amount") === String(amountValue) && !isCustom ? "true" : "false");
    });

    if (selectedAmountLabel) {
      selectedAmountLabel.textContent = isCustom ? "Custom amount" : `$${amountValue}`;
    }

    if (customAmountInput) {
      if (isCustom) {
        customAmountInput.removeAttribute("disabled");
        customAmountInput.focus();
      } else {
        customAmountInput.value = "";
        customAmountInput.setAttribute("disabled", "disabled");
      }
    }

    const hidden = qs("#donationAmount");
    if (hidden) hidden.value = isCustom ? "custom" : String(amountValue);

    const impact = qs("[data-impact]");
    if (impact && impactText) impact.textContent = impactText;
  }

  donateOpeners.forEach((btn) => btn.addEventListener("click", () => setModalOpen(true)));
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", () => setModalOpen(false));
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) setModalOpen(false);
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (document.body.classList.contains("drawer-open")) setDrawerOpen(false);
      if (modalBackdrop && modalBackdrop.getAttribute("data-open") === "true") setModalOpen(false);
    }

    // Focus trap for modal
    if (e.key === "Tab" && modalBackdrop && modalBackdrop.getAttribute("data-open") === "true") {
      const modal = qs("[data-modal]");
      if (!modal) return;
      const focusables = qsa(
        "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
        modal
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  amountButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = btn.getAttribute("data-amount");
      const impact = btn.getAttribute("data-impact") || "";
      setSelectedAmount(amount, impact, false);
    });
  });

  const customToggle = qs("[data-custom-toggle]");
  if (customToggle) {
    customToggle.addEventListener("click", () => {
      setSelectedAmount("custom", "Every dollar counts toward saving lives.", true);
    });
  }

  if (donationForm) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const amountMode = qs("#donationAmount")?.value || "";
      const custom = (customAmountInput && !customAmountInput.disabled) ? customAmountInput.value.trim() : "";
      const amount = amountMode === "custom" ? custom : amountMode;

      const receipt = qs("[data-receipt]");
      if (receipt) {
        receipt.textContent = amount ? `Thank you — donation initiated for $${amount}.` : "Thank you — donation initiated.";
      }
      setModalOpen(false);
    });
  }

  // Programs accordion
  const accItems = qsa("[data-accordion-item]");
  function setAccOpen(item, open) {
    item.setAttribute("data-open", open ? "true" : "false");
    const btn = qs("button", item);
    const panel = qs("[data-accordion-panel]", item);
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (panel) {
      const inner = qs("[data-accordion-inner]", panel);
      const target = inner ? inner.scrollHeight : 0;
      panel.style.maxHeight = open ? `${target}px` : "0px";
    }
  }
  accItems.forEach((item, idx) => {
    const btn = qs("[data-accordion-btn]", item);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";
      // allow multiple open; keeps mobile discoverability
      setAccOpen(item, !isOpen);
    });

    // Open first by default (helps information scent)
    if (idx === 0) setAccOpen(item, true);
  });
  window.addEventListener("resize", () => {
    // Recompute panel heights on resize
    accItems.forEach((item) => {
      const open = item.getAttribute("data-open") === "true";
      if (open) setAccOpen(item, true);
    });
  });

  // News carousel controls
  const track = qs("[data-carousel-track]");
  const prevBtn = qs("[data-carousel-prev]");
  const nextBtn = qs("[data-carousel-next]");
  const pageLabel = qs("[data-carousel-page]");
  let page = 0;

  function getCardWidth() {
    if (!track) return 0;
    const card = qs("[data-news-card]", track);
    if (!card) return 0;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function maxPage() {
    if (!track) return 0;
    const cardW = getCardWidth();
    if (!cardW) return 0;
    const visible = clamp(Math.floor(track.getBoundingClientRect().width / cardW), 1, 6);
    const cards = qsa("[data-news-card]", track).length;
    return Math.max(0, Math.ceil(cards / visible) - 1);
  }

  function updateCarouselUI() {
    const m = maxPage();
    page = clamp(page, 0, m);
    if (prevBtn) prevBtn.disabled = page === 0;
    if (nextBtn) nextBtn.disabled = page === m;
    if (pageLabel) pageLabel.textContent = `Page ${page + 1} of ${m + 1}`;
  }

  function scrollToPage() {
    if (!track) return;
    const cardW = getCardWidth();
    const x = Math.round(page * cardW);
    if (prefersReducedMotion) track.scrollLeft = x;
    else track.scrollTo({ left: x, behavior: "smooth" });
    updateCarouselUI();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      page -= 1;
      scrollToPage();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      page += 1;
      scrollToPage();
    });
  }

  if (track) {
    track.addEventListener("scroll", () => {
      // Snap-ish: infer page from scroll position
      const cardW = getCardWidth();
      if (!cardW) return;
      const inferred = Math.round(track.scrollLeft / cardW);
      if (inferred !== page) {
        page = inferred;
        updateCarouselUI();
      }
    }, { passive: true });
  }

  window.addEventListener("resize", () => {
    updateCarouselUI();
    scrollToPage();
  });

  updateCarouselUI();

  // Animated counters
  const statEls = qsa("[data-count-to]");
  function animateCount(el) {
    const to = parseFloat(el.getAttribute("data-count-to") || "0");
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = prefersReducedMotion ? 0 : 900;
    const start = performance.now();
    const from = 0;

    function fmt(n) {
      const rounded = Math.round(n);
      return `${prefix}${rounded.toLocaleString()}${suffix}`;
    }

    if (duration === 0) {
      el.textContent = fmt(to);
      return;
    }

    function step(now) {
      const t = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (to - from) * eased;
      el.textContent = fmt(v);
      if (t < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    statEls.forEach((el) => io.observe(el));
  } else {
    statEls.forEach(animateCount);
  }
})();

