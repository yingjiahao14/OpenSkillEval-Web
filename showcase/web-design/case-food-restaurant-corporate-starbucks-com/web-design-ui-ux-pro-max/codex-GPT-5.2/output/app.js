(function () {
  const storage = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // ignore
      }
    },
  };

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }

  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function initMobileNav() {
    const toggle = qs('[data-mobile-toggle]');
    const drawer = qs('[data-mobile-drawer]');
    if (!toggle || !drawer) return;

    function setOpen(open) {
      drawer.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    setOpen(false);
    toggle.addEventListener('click', () => setOpen(drawer.hidden));
    drawer.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', (e) => {
      if (drawer.hidden) return;
      if (e.target.closest('[data-mobile-drawer]')) return;
      if (e.target.closest('[data-mobile-toggle]')) return;
      setOpen(false);
    });
  }

  function initCookieBanner() {
    const banner = qs('[data-cookie-banner]');
    if (!banner) return;

    const agreed = storage.get('gb_cookie_agreed', false);
    if (agreed) {
      banner.remove();
      return;
    }

    const agree = qs('[data-cookie-agree]', banner);
    if (agree) {
      agree.addEventListener('click', () => {
        storage.set('gb_cookie_agreed', true);
        banner.style.transition = 'opacity 180ms var(--ease), transform 180ms var(--ease)';
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(8px)';
        setTimeout(() => banner.remove(), 220);
      });
    }
  }

  function initFooterAccordion() {
    const sections = qsa('[data-footer-section]');
    if (!sections.length) return;

    sections.forEach((section) => {
      const btn = qs('button[data-footer-toggle]', section);
      if (!btn) return;
      btn.addEventListener('click', () => {
        const open = section.getAttribute('data-open') === 'true';
        const next = !open;
        section.setAttribute('data-open', next ? 'true' : 'false');
        btn.setAttribute('aria-expanded', next ? 'true' : 'false');
      });
    });
  }

  function initTabs() {
    const roots = qsa('[data-tabs]');
    roots.forEach((root) => {
      const tabs = qsa('[role="tab"]', root);
      const panels = qsa('[role="tabpanel"]', root);
      if (!tabs.length || !panels.length) return;

      function activate(id, focus = false) {
        tabs.forEach((t) => {
          const selected = t.getAttribute('aria-controls') === id;
          t.setAttribute('aria-selected', selected ? 'true' : 'false');
          t.tabIndex = selected ? 0 : -1;
          if (selected && focus) t.focus();
        });

        const nextPanel = panels.find((p) => p.id === id);
        panels.forEach((p) => {
          const show = p.id === id;
          p.hidden = !show;
        });

        if (nextPanel) {
          nextPanel.animate(
            [
              { opacity: 0, transform: 'translateY(4px) scale(0.99)' },
              { opacity: 1, transform: 'translateY(0) scale(1)' },
            ],
            {
              duration: 220,
              easing: 'cubic-bezier(.2,.8,.2,1)',
            }
          );
        }
      }

      tabs.forEach((t) => {
        t.addEventListener('click', () => activate(t.getAttribute('aria-controls'), false));
        t.addEventListener('keydown', (e) => {
          const i = tabs.indexOf(t);
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const dir = e.key === 'ArrowRight' ? 1 : -1;
            const next = (i + dir + tabs.length) % tabs.length;
            activate(tabs[next].getAttribute('aria-controls'), true);
          }
        });
      });

      const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
      activate(initial.getAttribute('aria-controls'));
    });
  }

  function initCarousels() {
    const carousels = qsa('[data-carousel]');
    carousels.forEach((root) => {
      const track = qs('[data-carousel-track]', root);
      const prev = qs('[data-carousel-prev]', root);
      const next = qs('[data-carousel-next]', root);
      if (!track || !prev || !next) return;

      function step(dir) {
        const card = track.querySelector(':scope > *');
        const w = card ? card.getBoundingClientRect().width : 240;
        const gap = 12;
        track.scrollBy({ left: dir * (w + gap) * 2, behavior: 'smooth' });
      }
      prev.addEventListener('click', () => step(-1));
      next.addEventListener('click', () => step(1));
    });
  }

  function initStoreLocator() {
    const root = qs('[data-store-locator]');
    if (!root) return;

    const input = qs('[data-locator-input]', root);
    const suggestions = qs('[data-locator-suggestions]', root);
    const results = qs('[data-locator-results]', root);
    const filterBtn = qs('[data-locator-filter-btn]', root);
    const filters = qs('[data-locator-filters]', root);
    const pickupBtn = qs('[data-order-pickup]', root);
    const deliveryBtn = qs('[data-order-delivery]', root);
    const map = qs('[data-map]', root);

    const allStores = [
      {
        id: 'gb-001',
        name: 'GreenBean Downtown',
        address: '101 Market St, San Francisco, CA',
        hours: '5:30a–7:00p',
        features: ['Mobile order', 'Drive-thru'],
        supports: ['pickup', 'delivery'],
        pin: { x: 32, y: 34 },
      },
      {
        id: 'gb-002',
        name: 'GreenBean Mission',
        address: '245 Valencia St, San Francisco, CA',
        hours: '6:00a–6:30p',
        features: ['Mobile order', 'Patio'],
        supports: ['pickup'],
        pin: { x: 54, y: 48 },
      },
      {
        id: 'gb-003',
        name: 'GreenBean Sunset',
        address: '1720 Irving St, San Francisco, CA',
        hours: '6:00a–7:00p',
        features: ['Drive-thru', 'Delivery'],
        supports: ['pickup', 'delivery'],
        pin: { x: 72, y: 62 },
      },
      {
        id: 'gb-004',
        name: 'GreenBean Berkeley',
        address: '2000 Shattuck Ave, Berkeley, CA',
        hours: '6:00a–6:00p',
        features: ['Mobile order'],
        supports: ['pickup', 'delivery'],
        pin: { x: 22, y: 58 },
      },
      {
        id: 'gb-005',
        name: 'GreenBean Palo Alto',
        address: '351 University Ave, Palo Alto, CA',
        hours: '5:30a–7:30p',
        features: ['Mobile order', 'Drive-thru'],
        supports: ['pickup'],
        pin: { x: 60, y: 30 },
      },
    ];

    const suggestionSeeds = [
      'San Francisco, CA',
      'Berkeley, CA',
      'Oakland, CA',
      'Palo Alto, CA',
      '94107',
      '10001',
      'Austin, TX',
    ];

    const state = {
      query: '',
      orderType: 'pickup',
      filterDriveThru: false,
      filterMobileOrder: false,
    };

    function renderPins(stores) {
      if (!map) return;
      qsa('.pin', map).forEach((p) => p.remove());
      stores.slice(0, 6).forEach((s) => {
        const pin = document.createElement('div');
        pin.className = 'pin';
        pin.style.left = `${s.pin.x}%`;
        pin.style.top = `${s.pin.y}%`;
        pin.title = s.name;
        map.appendChild(pin);
      });
    }

    function matchesFilters(store) {
      if (!store.supports.includes(state.orderType)) return false;
      if (state.filterDriveThru && !store.features.some((f) => f.toLowerCase().includes('drive'))) return false;
      if (state.filterMobileOrder && !store.features.some((f) => f.toLowerCase().includes('mobile'))) return false;
      if (state.query.trim().length >= 2) {
        const q = state.query.toLowerCase();
        return (
          store.name.toLowerCase().includes(q) ||
          store.address.toLowerCase().includes(q) ||
          store.features.join(' ').toLowerCase().includes(q)
        );
      }
      return true;
    }

    function renderResults() {
      if (!results) return;
      const filtered = allStores.filter(matchesFilters);
      results.innerHTML = '';

      const header = document.createElement('div');
      header.className = 'muted';
      header.style.fontSize = '13px';
      header.style.margin = '2px 0 10px';
      header.textContent = `${filtered.length} store${filtered.length === 1 ? '' : 's'} found · ${
        state.orderType === 'pickup' ? 'Pickup' : 'Delivery'
      }`;
      results.appendChild(header);

      filtered.forEach((s) => {
        const el = document.createElement('div');
        el.className = 'store';
        el.innerHTML = `
          <div class="top">
            <div>
              <h3>${escapeHtml(s.name)}</h3>
              <div class="meta">${escapeHtml(s.address)} · <strong>${escapeHtml(s.hours)}</strong></div>
            </div>
            <span class="badge">${state.orderType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
          </div>
          <div class="features">
            ${s.features
              .slice(0, 4)
              .map((f) => `<span class="tag">${escapeHtml(f)}</span>`)
              .join('')}
          </div>
        `;
        results.appendChild(el);
      });

      renderPins(filtered.length ? filtered : allStores);
    }

    function escapeHtml(s) {
      return String(s)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    function renderSuggestions(value) {
      if (!suggestions) return;
      const v = value.trim().toLowerCase();
      if (!v) {
        suggestions.hidden = true;
        suggestions.innerHTML = '';
        return;
      }
      const items = suggestionSeeds
        .filter((s) => s.toLowerCase().includes(v))
        .slice(0, 5);
      if (!items.length) {
        suggestions.hidden = true;
        suggestions.innerHTML = '';
        return;
      }
      suggestions.hidden = false;
      suggestions.innerHTML = items
        .map((s) => `<button type="button" data-suggestion="${escapeHtml(s)}">${escapeHtml(s)}</button>`)
        .join('');
    }

    input?.addEventListener('input', () => {
      state.query = input.value;
      renderSuggestions(state.query);
      renderResults();
    });

    suggestions?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-suggestion]');
      if (!btn || !input) return;
      input.value = btn.getAttribute('data-suggestion') || '';
      state.query = input.value;
      suggestions.hidden = true;
      renderResults();
      input.focus();
    });

    filterBtn?.addEventListener('click', () => {
      const open = filters && !filters.hidden;
      if (filters) filters.hidden = open;
      filterBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    qsa('input[type="checkbox"][data-filter]', root).forEach((cb) => {
      cb.addEventListener('change', () => {
        state.filterDriveThru = !!qs('[data-filter="drive-thru"]', root)?.checked;
        state.filterMobileOrder = !!qs('[data-filter="mobile-order"]', root)?.checked;
        renderResults();
      });
    });

    function setOrderType(type) {
      state.orderType = type;
      pickupBtn?.setAttribute('aria-pressed', type === 'pickup' ? 'true' : 'false');
      deliveryBtn?.setAttribute('aria-pressed', type === 'delivery' ? 'true' : 'false');
      renderResults();
    }
    pickupBtn?.addEventListener('click', () => setOrderType('pickup'));
    deliveryBtn?.addEventListener('click', () => setOrderType('delivery'));
    setOrderType('pickup');
    renderResults();

    document.addEventListener('click', (e) => {
      if (suggestions?.hidden) return;
      if (e.target.closest('[data-locator-suggestions]')) return;
      if (e.target.closest('[data-locator-input]')) return;
      suggestions.hidden = true;
    });
  }

  function setActiveNavLink() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    qsa('a[data-nav]').forEach((a) => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      const match = href === path;
      if (match) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initMobileNav();
    initCookieBanner();
    initFooterAccordion();
    initTabs();
    initCarousels();
    initStoreLocator();
  });
})();
