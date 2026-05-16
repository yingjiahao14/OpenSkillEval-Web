function qs(root, selector) {
  return (root || document).querySelector(selector);
}

function qsa(root, selector) {
  return Array.from((root || document).querySelectorAll(selector));
}

function initDropdowns() {
  function syncExpanded() {
    qsa(document, '[data-dropdown="root"]').forEach((root) => {
      const trigger = qs(root, '[data-dropdown="trigger"]');
      const menu = qs(root, '[data-dropdown="menu"]');
      if (!trigger || !menu) return;
      trigger.setAttribute('aria-expanded', menu.dataset.open === 'true' ? 'true' : 'false');
    });
  }

  function closeAll(except) {
    qsa(document, '[data-dropdown="menu"]').forEach((menu) => {
      if (except && menu === except) return;
      menu.dataset.open = 'false';
    });
    syncExpanded();
  }

  qsa(document, '[data-dropdown="trigger"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const menu = qs(btn.closest('[data-dropdown="root"]'), '[data-dropdown="menu"]');
      const open = menu.dataset.open === 'true';
      closeAll();
      menu.dataset.open = open ? 'false' : 'true';
      syncExpanded();
    });
  });

  document.addEventListener('click', (e) => {
    const inside = e.target.closest('[data-dropdown="root"]');
    if (!inside) closeAll();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  syncExpanded();
}

function initMobileNav() {
  const toggle = qs(document, '[data-mobile="toggle"]');
  const panel = qs(document, '[data-mobile="panel"]');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const open = panel.dataset.open === 'true';
    panel.dataset.open = open ? 'false' : 'true';
    toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
  });
}

function initTabs() {
  qsa(document, '[data-tabs]').forEach((root) => {
    const tablist = qs(root, '[role="tablist"]');
    const tabs = qsa(root, '[role="tab"]');
    const panels = qsa(root, '[role="tabpanel"]');
    if (!tablist || tabs.length === 0 || panels.length === 0) return;

    function selectTab(id, setFocus) {
      tabs.forEach((t) => {
        const selected = t.id === id;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        const show = p.getAttribute('aria-labelledby') === id;
        p.hidden = !show;
      });
      root.dataset.active = id;

      // Smooth state-change: fade the active panel in.
      const activePanel = panels.find((p) => p.getAttribute('aria-labelledby') === id);
      if (activePanel) {
        activePanel.style.opacity = '0';
        activePanel.style.transform = 'translateY(4px)';
        requestAnimationFrame(() => {
          activePanel.style.transition = 'opacity 180ms ease, transform 180ms ease';
          activePanel.style.opacity = '1';
          activePanel.style.transform = 'translateY(0px)';
        });
      }
      if (setFocus) {
        const active = tabs.find((t) => t.id === id);
        if (active) active.focus();
      }
    }

    function currentIndex() {
      return tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    }

    tabs.forEach((t) => {
      t.addEventListener('click', () => selectTab(t.id, false));
    });

    tablist.addEventListener('keydown', (e) => {
      const idx = currentIndex();
      if (idx < 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = e.key === 'ArrowRight' ? idx + 1 : idx - 1;
        const bounded = (next + tabs.length) % tabs.length;
        selectTab(tabs[bounded].id, true);
      }
      if (e.key === 'Home') {
        e.preventDefault();
        selectTab(tabs[0].id, true);
      }
      if (e.key === 'End') {
        e.preventDefault();
        selectTab(tabs[tabs.length - 1].id, true);
      }
    });

    const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
    selectTab(initial.id, false);
  });
}

function initAccordion() {
  qsa(document, '[data-accordion]').forEach((root) => {
    const items = qsa(root, '[data-acc-item]');
    if (items.length === 0) return;

    function setOpen(targetId) {
      items.forEach((item) => {
        const trigger = qs(item, '[data-acc-trigger]');
        const panel = qs(item, '[data-acc-panel]');
        const open = item.id === targetId;
        item.dataset.open = open ? 'true' : 'false';
        if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (panel) {
          panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
          panel.hidden = !open;
        }
      });
    }

    items.forEach((item) => {
      const trigger = qs(item, '[data-acc-trigger]');
      if (!trigger) return;
      trigger.addEventListener('click', () => setOpen(item.id));
    });

    const first = items.find((i) => i.dataset.open === 'true') || items[0];
    setOpen(first.id);
    window.addEventListener('resize', () => {
      const open = items.find((i) => i.dataset.open === 'true');
      if (open) {
        const panel = qs(open, '[data-acc-panel]');
        if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

function initCarousel() {
  qsa(document, '[data-carousel]').forEach((root) => {
    const track = qs(root, '[data-carousel="track"]');
    const dots = qsa(root, '[data-carousel="dot"]');
    if (!track || dots.length === 0) return;
    let index = 0;

    function setIndex(i) {
      index = Math.max(0, Math.min(dots.length - 1, i));
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, di) => d.setAttribute('aria-current', di === index ? 'true' : 'false'));
    }

    dots.forEach((d, di) => {
      d.addEventListener('click', () => setIndex(di));
    });

    setIndex(0);
  });
}

function initCookieBanner() {
  const banner = qs(document, '[data-cookie="banner"]');
  if (!banner) return;

  const key = 'wellstream_cookie_pref';
  const stored = localStorage.getItem(key);
  if (!stored) banner.dataset.show = 'true';

  function setPref(value) {
    localStorage.setItem(key, value);
    banner.dataset.show = 'false';
  }

  const accept = qs(banner, '[data-cookie="accept"]');
  const decline = qs(banner, '[data-cookie="decline"]');
  if (accept) accept.addEventListener('click', () => setPref('accepted'));
  if (decline) decline.addEventListener('click', () => setPref('declined'));
}

function initDemoForm() {
  const form = qs(document, '[data-demo-form]');
  if (!form) return;

  const success = qs(document, '[data-form-success]');

  function setInvalid(field, msg) {
    field.dataset.invalid = 'true';
    const err = qs(field, '.error');
    if (err) err.textContent = msg;
  }

  function clearInvalid(field) {
    field.dataset.invalid = 'false';
  }

  function validate() {
    const required = qsa(form, '[data-required="true"]');
    let ok = true;

    required.forEach((input) => {
      const field = input.closest('.field');
      if (!field) return;
      const value = (input.value || '').trim();
      clearInvalid(field);
      if (!value) {
        ok = false;
        setInvalid(field, 'This field is required.');
      }
    });

    const email = qs(form, 'input[name="email"]');
    if (email) {
      const field = email.closest('.field');
      const value = (email.value || '').trim();
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (field) {
        clearInvalid(field);
        if (!value) {
          ok = false;
          setInvalid(field, 'Business email is required.');
        } else if (!re.test(value)) {
          ok = false;
          setInvalid(field, 'Enter a valid email address.');
        }
      }
    }

    return ok;
  }

  qsa(form, 'input, select, textarea').forEach((input) => {
    input.addEventListener('input', () => {
      const field = input.closest('.field');
      if (field) clearInvalid(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData(form);
    const payload = {};
    for (const [k, v] of fd.entries()) payload[k] = String(v);
    localStorage.setItem('wellstream_demo_request', JSON.stringify({ payload, ts: Date.now() }));
    form.reset();
    if (success) {
      success.dataset.show = 'true';
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
  initMobileNav();
  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initDemoForm();
});
