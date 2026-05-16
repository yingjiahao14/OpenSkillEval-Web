(function () {
  "use strict";

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  // Mobile menu (all pages)
  function initMenuToggle() {
    var btn = document.querySelector('[data-ui="menu-toggle"]');
    var panel = document.querySelector('[data-ui="mobile-nav"]');
    if (!btn || !panel) return;

    function setOpen(open) {
      btn.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
    }

    var open = btn.getAttribute("aria-expanded") === "true";
    setOpen(open);

    btn.addEventListener("click", function () {
      open = !(btn.getAttribute("aria-expanded") === "true");
      setOpen(open);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // Home: load more articles
  function initLoadMoreArticles() {
    var btn = document.querySelector('[data-ui="load-more"]');
    var grid = document.querySelector('[data-ui="article-grid"]');
    var template = document.querySelector('[data-ui="article-template"]');
    if (!btn || !grid || !template) return;

    var loaded = 0;

    btn.addEventListener("click", function () {
      var batch = 3;
      var items = $all(".article-card", template);
      var added = 0;

      while (loaded < items.length && added < batch) {
        var node = items[loaded].cloneNode(true);
        node.classList.remove("is-template");
        node.removeAttribute("aria-hidden");
        grid.appendChild(node);
        loaded += 1;
        added += 1;
      }

      if (loaded >= items.length) {
        btn.disabled = true;
        btn.textContent = "No more articles";
      }
    });
  }

  // Donate: amount selector
  function initDonationTabs() {
    var root = document.querySelector('[data-ui="donation-tabs"]');
    var out = document.querySelector('[data-ui="donation-description"]');
    var sub = document.querySelector('[data-ui="donation-sublabel"]');
    if (!root || !out || !sub) return;

    var buttons = $all("button[data-amount]", root);
    if (!buttons.length) return;

    var map = {
      5: "Your $5 donation will help keep our tutorials free for anyone with an internet connection.",
      10: "Your $10 donation will help us maintain our platform and publish new lessons every week.",
      20: "Your $20 donation will provide 1,000 hours of learning to people around the world each month.",
      40: "Your $40 donation will help fund new curricula and translations for learners worldwide."
    };

    function setAmount(amount) {
      buttons.forEach(function (b) {
        b.setAttribute("aria-selected", String(b.getAttribute("data-amount") === String(amount)));
      });
      out.textContent = map[amount] || map[20];
      sub.textContent = "Donating $" + amount + " / month: edit amount · Secure donation";
    }

    root.addEventListener("click", function (e) {
      var target = e.target;
      if (!(target instanceof HTMLElement)) return;
      var btn = target.closest("button[data-amount]");
      if (!btn) return;
      setAmount(btn.getAttribute("data-amount"));
    });

    // default to aria-selected=true if provided, else 20
    var initial = buttons.find(function (b) {
      return b.getAttribute("aria-selected") === "true";
    });
    setAmount(initial ? initial.getAttribute("data-amount") : 20);
  }

  // Donate: FAQ accordion
  function initAccordion() {
    var root = document.querySelector('[data-ui="faq-accordion"]');
    if (!root) return;
    var items = $all(".accordion-item", root);

    items.forEach(function (item) {
      var btn = $(".accordion-btn", item);
      if (!btn) return;

      function toggle() {
        var open = item.getAttribute("data-open") === "true";
        item.setAttribute("data-open", String(!open));
        btn.setAttribute("aria-expanded", String(!open));
      }

      btn.addEventListener("click", toggle);
    });
  }

  function init() {
    initMenuToggle();
    initLoadMoreArticles();
    initDonationTabs();
    initAccordion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

