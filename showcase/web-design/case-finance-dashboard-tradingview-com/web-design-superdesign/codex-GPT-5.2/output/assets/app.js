/* ChartPulse — minimal JS for tabs/toggles/accordion (no build) */
(function () {
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function setActiveTab(group, value) {
    const root = document;
    const tabs = qsa(`[data-tab-group="${group}"] [role="tab"]`, root);
    tabs.forEach((t) => {
      const selected = t.getAttribute('data-tab') === value;
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.tabIndex = selected ? 0 : -1;
    });

    const panels = qsa(`[data-tab-panels="${group}"] [role="tabpanel"]`, root);
    panels.forEach((p) => {
      const show = p.getAttribute('data-panel') === value;
      p.hidden = !show;
    });
  }

  function initTabs() {
    qsa('[data-tab-group]').forEach((wrap) => {
      const group = wrap.getAttribute('data-tab-group');
      const tabs = qsa('[role="tab"]', wrap);
      if (!tabs.length) return;

      const defaultTab = wrap.getAttribute('data-default-tab') || tabs[0].getAttribute('data-tab');
      setActiveTab(group, defaultTab);

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => setActiveTab(group, tab.getAttribute('data-tab')));
        tab.addEventListener('keydown', (e) => {
          const i = tabs.indexOf(tab);
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
            tabs[next].focus();
          }
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setActiveTab(group, tab.getAttribute('data-tab'));
          }
        });
      });
    });
  }

  function initAccordion() {
    qsa('[data-accordion]').forEach((acc) => {
      qsa('[data-accordion-btn]', acc).forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('aria-controls');
          const panel = qs(`#${CSS.escape(id)}`, acc);
          if (!panel) return;
          const expanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          panel.hidden = expanded;
        });
      });
    });
  }

  function initToggleButtons() {
    // For timeframe + chart-type toggle groups
    qsa('[data-toggle-group]').forEach((wrap) => {
      const group = wrap.getAttribute('data-toggle-group');
      const buttons = qsa('button[data-toggle]', wrap);
      if (!buttons.length) return;
      const defaultVal = wrap.getAttribute('data-default') || buttons[0].getAttribute('data-toggle');

      function setVal(val) {
        buttons.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-toggle') === val ? 'true' : 'false'));
        // Optional: update label targets
        const label = qs(`[data-toggle-label="${group}"]`);
        if (label) label.textContent = val;
      }

      setVal(defaultVal);
      buttons.forEach((b) => b.addEventListener('click', () => setVal(b.getAttribute('data-toggle'))));
    });
  }

  function initCheckboxToggles() {
    qsa('[data-filter-checkbox]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const targetGroup = cb.getAttribute('data-target-group');
        const only = cb.checked;
        qsa(`[data-filter-group="${targetGroup}"] [data-filter-item]`).forEach((el) => {
          const isVideo = el.getAttribute('data-video') === 'true';
          el.hidden = only ? !isVideo : false;
        });
      });
    });
  }

  function initAnchorNav() {
    // markets asset tabs: scroll to section
    qsa('[data-scrollto]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-scrollto');
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initAccordion();
    initToggleButtons();
    initCheckboxToggles();
    initAnchorNav();

    // lucide icons (if present)
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();
