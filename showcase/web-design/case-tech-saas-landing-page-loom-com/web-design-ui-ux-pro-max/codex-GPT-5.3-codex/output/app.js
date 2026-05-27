(function () {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const CONSENT_KEY = "clipcast_cookie_consent";
  const PREF_KEY = "clipcast_cookie_prefs";

  function initCookieBanner() {
    const banner = $("#cookie-banner");
    if (!banner) return;

    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved) banner.classList.add("hidden");

    const modalBackdrop = $("#cookie-modal-backdrop");
    const openBtn = $("#manage-cookies-btn");
    const acceptBtn = $("#accept-cookies-btn");
    const rejectBtn = $("#reject-cookies-btn");
    const savePrefsBtn = $("#save-cookie-prefs-btn");
    const closeModalBtn = $("#close-cookie-modal-btn");

    const prefButtons = $$(".switch[data-pref]");
    const defaultPrefs = { targeting: false, functional: true, performance: true };
    let prefs = JSON.parse(localStorage.getItem(PREF_KEY) || "null") || defaultPrefs;

    function syncSwitches() {
      prefButtons.forEach((btn) => {
        const key = btn.dataset.pref;
        const on = !!prefs[key];
        btn.classList.toggle("on", on);
        btn.setAttribute("aria-checked", String(on));
      });
    }

    function saveConsent(value) {
      localStorage.setItem(CONSENT_KEY, value);
      localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
      banner.classList.add("hidden");
      modalBackdrop?.classList.add("hidden");
    }

    syncSwitches();

    openBtn?.addEventListener("click", () => modalBackdrop?.classList.remove("hidden"));
    closeModalBtn?.addEventListener("click", () => modalBackdrop?.classList.add("hidden"));

    acceptBtn?.addEventListener("click", () => {
      prefs = { targeting: true, functional: true, performance: true };
      syncSwitches();
      saveConsent("accepted");
    });

    rejectBtn?.addEventListener("click", () => {
      prefs = { targeting: false, functional: false, performance: false };
      syncSwitches();
      saveConsent("rejected");
    });

    savePrefsBtn?.addEventListener("click", () => saveConsent("custom"));

    prefButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.pref;
        prefs[key] = !prefs[key];
        syncSwitches();
      });
    });
  }

  function initPricingPage() {
    const pricingRoot = document.body.dataset.page === "pricing";
    if (!pricingRoot) return;

    const monthlyBtn = $("#billing-monthly");
    const annualBtn = $("#billing-annual");
    const saveBadge = $("#save-badge");
    const priceNodes = $$("[data-monthly][data-annual]");

    function applyBilling(mode) {
      const annual = mode === "annual";
      monthlyBtn?.classList.toggle("active", !annual);
      annualBtn?.classList.toggle("active", annual);
      saveBadge?.classList.toggle("hidden", !annual);
      priceNodes.forEach((node) => {
        node.textContent = annual ? node.dataset.annual : node.dataset.monthly;
      });
    }

    monthlyBtn?.addEventListener("click", () => applyBilling("monthly"));
    annualBtn?.addEventListener("click", () => applyBilling("annual"));
    applyBilling("monthly");

    const teamSlider = $("#team-size-slider");
    const teamCount = $("#team-size-count");
    const recommendation = $("#team-recommendation");

    function updateRecommendation(val) {
      const n = Number(val);
      if (teamCount) teamCount.textContent = String(n);
      if (!recommendation) return;
      if (n <= 5) recommendation.textContent = "Recommended plan: Starter or Business for growing teams.";
      else if (n <= 30) recommendation.textContent = "Recommended plan: Business for collaboration at scale.";
      else if (n <= 100) recommendation.textContent = "Recommended plan: Business + AI for advanced workflows.";
      else recommendation.textContent = "Recommended plan: Enterprise for security, governance, and volume discounts.";
    }

    teamSlider?.addEventListener("input", (e) => updateRecommendation(e.target.value));
    updateRecommendation(teamSlider?.value || 10);

    $$(".expand-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const panel = targetId ? document.getElementById(targetId) : null;
        if (!panel) return;
        const open = panel.classList.toggle("open");
        btn.textContent = open ? "Hide all features" : "See all features";
        btn.setAttribute("aria-expanded", String(open));
      });
    });

    $$(".faq-q").forEach((q) => {
      q.addEventListener("click", () => {
        const answer = q.nextElementSibling;
        const isOpen = answer.classList.toggle("open");
        q.setAttribute("aria-expanded", String(isOpen));
      });
    });
  }

  function initAuthForms() {
    if (!["login", "signup"].includes(document.body.dataset.page || "")) return;
    const emailInput = $("#work-email");
    const continueBtn = $("#continue-email-btn");
    const message = $("#email-flow-message");

    continueBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const value = (emailInput?.value || "").trim();
      if (!value || !value.includes("@")) {
        if (message) message.textContent = "Please enter a valid work email.";
        return;
      }
      if (message) message.textContent = `Continuing with ${value}...`;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCookieBanner();
    initPricingPage();
    initAuthForms();
  });
})();
