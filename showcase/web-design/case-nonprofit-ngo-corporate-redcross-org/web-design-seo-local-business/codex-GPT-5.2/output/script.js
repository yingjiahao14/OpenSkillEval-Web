(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function trapFocus(container, onClose) {
    const focusables = Array.from(container.querySelectorAll(focusableSelector));
    if (focusables.length === 0) return () => {};
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    function handleKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== "Tab") return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    container.addEventListener("keydown", handleKeydown);

    // Focus the first focusable element.
    requestAnimationFrame(() => first.focus());

    return () => container.removeEventListener("keydown", handleKeydown);
  }

  // Mobile drawer
  const drawer = document.getElementById("mobile-drawer");
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  let releaseDrawerFocus = null;
  let lastFocusedBeforeDrawer = null;

  function openDrawer() {
    if (!drawer || !mobileMenuButton) return;
    lastFocusedBeforeDrawer = document.activeElement;
    drawer.hidden = false;
    drawer.dataset.open = "true";
    mobileMenuButton.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
    releaseDrawerFocus = trapFocus(drawer.querySelector(".drawer__panel"), closeDrawer);
  }

  function closeDrawer() {
    if (!drawer || !mobileMenuButton) return;
    drawer.dataset.open = "false";
    mobileMenuButton.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
    releaseDrawerFocus?.();
    releaseDrawerFocus = null;
    drawer.hidden = true;
    if (lastFocusedBeforeDrawer && lastFocusedBeforeDrawer.focus) {
      lastFocusedBeforeDrawer.focus();
    }
  }

  mobileMenuButton?.addEventListener("click", () => {
    const isOpen = drawer && !drawer.hidden;
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  drawer?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches("[data-close-drawer]")) {
      closeDrawer();
    }
  });

  // Donate modal
  const donateModal = document.getElementById("donate-modal");
  const donateForm = document.getElementById("donateForm");
  const impactPreview = document.getElementById("impactPreview");
  const donateTotal = document.getElementById("donateTotal");
  const customAmountField = document.getElementById("customAmountField");
  let releaseDonateFocus = null;
  let lastFocusedBeforeDonate = null;

  const impactByAmount = new Map([
    ["25", "Provides 5 emergency blankets"],
    ["50", "Supplies food and water for a week"],
    ["100", "Funds emergency shelter materials"],
    ["250", "Equips a volunteer with response training"],
    ["custom", "Every dollar counts toward saving lives"],
  ]);

  function getSelectedAmount() {
    const checked = donateForm?.querySelector('input[name="amount"]:checked');
    if (!(checked instanceof HTMLInputElement)) return { amount: 100, mode: "preset" };
    if (checked.value === "custom") {
      const customInput = donateForm.querySelector('input[name="customAmount"]');
      const value = customInput instanceof HTMLInputElement ? Number(customInput.value) : 0;
      return { amount: Number.isFinite(value) && value > 0 ? value : 0, mode: "custom" };
    }
    return { amount: Number(checked.value), mode: "preset" };
  }

  function syncDonateUI() {
    if (!donateForm) return;
    const checked = donateForm.querySelector('input[name="amount"]:checked');
    const isCustom = checked instanceof HTMLInputElement && checked.value === "custom";
    if (customAmountField) {
      customAmountField.hidden = !isCustom;
    }

    const { amount, mode } = getSelectedAmount();
    const key = isCustom ? "custom" : String(amount);
    const impact = impactByAmount.get(isCustom ? "custom" : key) || impactByAmount.get("custom");

    if (impactPreview) {
      impactPreview.innerHTML = `Donation impact: <strong>${impact}</strong>`;
    }

    if (donateTotal) {
      if (mode === "custom") {
        donateTotal.textContent = amount > 0 ? `$${amount}` : "$—";
      } else {
        donateTotal.textContent = `$${amount}`;
      }
    }
  }

  function openDonate() {
    if (!donateModal) return;
    lastFocusedBeforeDonate = document.activeElement;
    donateModal.hidden = false;
    document.documentElement.style.overflow = "hidden";
    syncDonateUI();
    releaseDonateFocus = trapFocus(donateModal.querySelector(".modal__panel"), closeDonate);
  }

  function closeDonate() {
    if (!donateModal) return;
    donateModal.hidden = true;
    document.documentElement.style.overflow = "";
    releaseDonateFocus?.();
    releaseDonateFocus = null;
    if (lastFocusedBeforeDonate && lastFocusedBeforeDonate.focus) {
      lastFocusedBeforeDonate.focus();
    }
  }

  document.querySelectorAll("[data-open-donate]").forEach((el) => {
    el.addEventListener("click", openDonate);
  });

  donateModal?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches("[data-close-donate]")) {
      closeDonate();
    }
  });

  donateForm?.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (
      target.matches('input[name="amount"]') ||
      target.matches('input[name="customAmount"]')
    ) {
      syncDonateUI();
    }
  });

  donateForm?.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches('input[name="customAmount"]')) {
      syncDonateUI();
    }
  });

  donateForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    // Static demo: show a lightweight confirmation.
    const { amount, mode } = getSelectedAmount();
    const finalAmount = mode === "custom" ? amount : amount;
    if (!finalAmount || finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    alert(
      `Thank you. This is a demo — no payment processed.\nSelected amount: $${finalAmount}.`,
    );
    closeDonate();
  });

  // Accordion
  document.querySelectorAll("[data-accordion] .accordion__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion__item");
      const panel = item?.querySelector(".accordion__panel");
      if (!(panel instanceof HTMLElement)) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");

      if (prefersReducedMotion) {
        panel.hidden = expanded;
        return;
      }

      panel.hidden = false;
      panel.style.height = expanded ? `${panel.scrollHeight}px` : "0px";
      panel.style.overflow = "hidden";
      panel.style.transition = "height 220ms ease";

      requestAnimationFrame(() => {
        panel.style.height = expanded ? "0px" : `${panel.scrollHeight}px`;
      });

      const onEnd = () => {
        panel.style.transition = "";
        panel.style.height = "";
        panel.style.overflow = "";
        panel.hidden = expanded;
        panel.removeEventListener("transitionend", onEnd);
      };

      panel.addEventListener("transitionend", onEnd);
    });
  });

  // News carousel
  const carousel = document.querySelector("[data-carousel]");
  const track = carousel?.querySelector(".carousel__track");
  const prevBtn = document.querySelector("[data-carousel-prev]");
  const nextBtn = document.querySelector("[data-carousel-next]");
  let carouselIndex = 0;

  function getCarouselPageSize() {
    if (!(track instanceof HTMLElement)) return 1;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const firstCard = track.children[0];
    if (!(firstCard instanceof HTMLElement)) return 1;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const viewport = carousel?.querySelector(".carousel__viewport");
    if (!(viewport instanceof HTMLElement) || !cardWidth) return 1;
    const viewportWidth = viewport.getBoundingClientRect().width;
    const perPage = Math.max(1, Math.floor((viewportWidth + gap) / (cardWidth + gap)));
    return perPage;
  }

  function getMaxCarouselIndex() {
    if (!(track instanceof HTMLElement)) return 0;
    const total = track.children.length;
    const perPage = getCarouselPageSize();
    return Math.max(0, total - perPage);
  }

  function updateCarousel() {
    if (!(track instanceof HTMLElement)) return;
    const firstCard = track.children[0];
    if (!(firstCard instanceof HTMLElement)) return;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const offset = carouselIndex * (cardWidth + gap);
    track.style.transform = `translateX(${-offset}px)`;

    const max = getMaxCarouselIndex();
    if (prevBtn instanceof HTMLButtonElement) prevBtn.disabled = carouselIndex <= 0;
    if (nextBtn instanceof HTMLButtonElement) nextBtn.disabled = carouselIndex >= max;
  }

  prevBtn?.addEventListener("click", () => {
    carouselIndex = Math.max(0, carouselIndex - 1);
    updateCarousel();
  });

  nextBtn?.addEventListener("click", () => {
    carouselIndex = Math.min(getMaxCarouselIndex(), carouselIndex + 1);
    updateCarousel();
  });

  window.addEventListener("resize", () => {
    carouselIndex = Math.min(getMaxCarouselIndex(), carouselIndex);
    updateCarousel();
  });

  // Impact counters
  const counters = Array.from(document.querySelectorAll(".counter"));
  if (counters.length) {
    const formatter = new Intl.NumberFormat(undefined);
    function animateCounter(el) {
      const target = Number(el.dataset.counter || "0");
      const duration = prefersReducedMotion ? 0 : 1200;

      if (!duration) {
        el.textContent = formatter.format(target);
        return;
      }

      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.floor(target * eased);
        el.textContent = formatter.format(value);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = formatter.format(target);
      }
      requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          animateCounter(el);
          io.unobserve(el);
        }
      },
      { threshold: 0.25 },
    );

    counters.forEach((c) => io.observe(c));
  }

  // Initial sync
  syncDonateUI();
  updateCarousel();
})();

