(function () {
  const state = {
    storageOk: true,
  };

  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      state.storageOk = false;
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      state.storageOk = false;
    }
  }

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }

  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function initMobileNav() {
    const btn = qs('[data-action="nav-toggle"]');
    const menu = qs('[data-ui="mobile-menu"]');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      const open = menu.getAttribute('data-open') === 'true';
      menu.setAttribute('data-open', open ? 'false' : 'true');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  function initCookieBanner() {
    const banner = qs('[data-ui="cookie-banner"]');
    if (!banner) return;

    const agreed = safeGet('gb_cookie_agree') === 'true';
    if (agreed) {
      banner.classList.add('hidden');
      return;
    }

    const agreeBtn = qs('[data-action="cookie-agree"]', banner);
    if (agreeBtn) {
      agreeBtn.addEventListener('click', () => {
        safeSet('gb_cookie_agree', 'true');
        banner.classList.add('hidden');
      });
    }
  }

  function initFooterAccordion() {
    const footer = qs('[data-ui="footer"]');
    if (!footer) return;

    const groups = qsa('[data-ui="footer-group"]', footer);
    groups.forEach((group) => {
      const heading = qs('h4', group);
      if (!heading) return;

      heading.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 760px)').matches) {
          const open = group.getAttribute('data-open') === 'true';
          group.setAttribute('data-open', open ? 'false' : 'true');
        }
      });
    });
  }

  function initTabs() {
    const root = qs('[data-ui="tabs"]');
    if (!root) return;

    const tabs = qsa('[role="tab"]', root);
    const panels = qsa('[role="tabpanel"]', root);

    function activate(tab) {
      const target = tab.getAttribute('aria-controls');
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach((p) => {
        const on = p.id === target;
        p.classList.toggle('hidden', !on);
        if (on) {
          p.classList.remove('fade-enter');
          // restart animation
          void p.offsetWidth;
          p.classList.add('fade-enter');
        }
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (e) => {
        const idx = tabs.indexOf(tab);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const next = tabs[(idx + dir + tabs.length) % tabs.length];
          next.focus();
          activate(next);
        }
      });
    });
  }

  function initCarousels() {
    qsa('[data-ui="carousel"]').forEach((carousel) => {
      const track = qs('[data-ui="carousel-track"]', carousel);
      const prev = qs('[data-action="carousel-prev"]', carousel);
      const next = qs('[data-action="carousel-next"]', carousel);
      if (!track) return;

      function step(dir) {
        const card = track.querySelector(':scope > *');
        const width = card ? card.getBoundingClientRect().width : 240;
        track.scrollBy({ left: dir * (width + 14), behavior: 'smooth' });
      }

      if (prev) prev.addEventListener('click', () => step(-1));
      if (next) next.addEventListener('click', () => step(1));
    });
  }

  function initStoreLocator() {
    const root = qs('[data-ui="store-locator"]');
    if (!root) return;

    const input = qs('[data-ui="locator-input"]', root);
    const suggestions = qs('[data-ui="locator-suggestions"]', root);
    const results = qs('[data-ui="locator-results"]', root);
    const filterBtn = qs('[data-action="locator-filter-toggle"]', root);
    const filtersPanel = qs('[data-ui="locator-filters"]', root);
    const orderToggle = qs('[data-ui="locator-order-toggle"]', root);
    const mapLabel = qs('[data-ui="map-label"]', root);

    const stores = [
      {
        name: 'GreenBean Downtown',
        city: 'Seattle',
        zip: '98101',
        address: '120 Pine St, Seattle, WA',
        hours: 'Open · 5:30am – 8:00pm',
        features: ['Mobile order', 'Drive‑thru'],
        pickup: true,
        delivery: true,
      },
      {
        name: 'GreenBean Capitol Hill',
        city: 'Seattle',
        zip: '98102',
        address: '820 Olive Way, Seattle, WA',
        hours: 'Open · 6:00am – 7:00pm',
        features: ['Mobile order', 'Patio'],
        pickup: true,
        delivery: false,
      },
      {
        name: 'GreenBean Bellevue Square',
        city: 'Bellevue',
        zip: '98004',
        address: '500 Bellevue Sq, Bellevue, WA',
        hours: 'Open · 6:00am – 9:00pm',
        features: ['Mobile order', 'Café seating'],
        pickup: true,
        delivery: true,
      },
      {
        name: 'GreenBean Portland Pearl',
        city: 'Portland',
        zip: '97209',
        address: '310 NW 10th Ave, Portland, OR',
        hours: 'Open · 6:00am – 6:30pm',
        features: ['Mobile order', 'Drive‑thru'],
        pickup: true,
        delivery: true,
      },
    ];

    const ui = {
      query: '',
      orderType: 'pickup',
      filters: {
        driveThru: false,
        mobileOrder: false,
      },
    };

    function matches(store) {
      const q = ui.query.trim().toLowerCase();
      const orderOk = ui.orderType === 'pickup' ? store.pickup : store.delivery;
      const qOk =
        !q ||
        store.city.toLowerCase().includes(q) ||
        store.zip.includes(q) ||
        store.address.toLowerCase().includes(q);
      const filterOk =
        (!ui.filters.driveThru || store.features.join(' ').toLowerCase().includes('drive')) &&
        (!ui.filters.mobileOrder || store.features.join(' ').toLowerCase().includes('mobile'));
      return orderOk && qOk && filterOk;
    }

    function render() {
      const filtered = stores.filter(matches);
      if (results) {
        results.innerHTML = filtered
          .map((s) => {
            const badges = s.features
              .map((f) => `<span class="mini-badge">${escapeHtml(f)}</span>`)
              .join('');
            return `
              <article class="store">
                <h3>${escapeHtml(s.name)}</h3>
                <p>${escapeHtml(s.address)}</p>
                <p>${escapeHtml(s.hours)} · ${ui.orderType === 'pickup' ? 'Pickup' : 'Delivery'} available</p>
                <div class="badge-row">${badges}</div>
              </article>
            `;
          })
          .join('');
      }

      if (mapLabel) {
        mapLabel.textContent = filtered.length
          ? `Showing ${filtered.length} store pin${filtered.length === 1 ? '' : 's'} near “${ui.query || 'your area'}”.`
          : `No matches yet — try another search or relax filters.`;
      }

      if (suggestions && input) {
        const q = input.value.trim().toLowerCase();
        const sugg = q
          ? Array.from(
              new Set(
                stores
                  .map((s) => [s.city, s.zip])
                  .flat()
                  .filter((x) => x.toLowerCase().includes(q))
              )
            ).slice(0, 5)
          : [];
        suggestions.innerHTML = sugg.map((t) => `<button type="button">${escapeHtml(t)}</button>`).join('');
        suggestions.style.display = sugg.length ? 'block' : 'none';
        qsa('button', suggestions).forEach((b) => {
          b.addEventListener('click', () => {
            input.value = b.textContent || '';
            ui.query = input.value;
            suggestions.style.display = 'none';
            render();
          });
        });
      }
    }

    function escapeHtml(str) {
      return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    if (input) {
      input.addEventListener('input', () => {
        ui.query = input.value;
        render();
      });
    }

    if (filterBtn && filtersPanel) {
      filterBtn.addEventListener('click', () => {
        const open = filtersPanel.style.display === 'flex';
        filtersPanel.style.display = open ? 'none' : 'flex';
        filterBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    }

    if (filtersPanel) {
      qsa('input[type="checkbox"]', filtersPanel).forEach((cb) => {
        cb.addEventListener('change', () => {
          ui.filters.driveThru = !!qs('[name="driveThru"]', filtersPanel)?.checked;
          ui.filters.mobileOrder = !!qs('[name="mobileOrder"]', filtersPanel)?.checked;
          render();
        });
      });
    }

    if (orderToggle) {
      qsa('button[data-value]', orderToggle).forEach((b) => {
        b.addEventListener('click', () => {
          ui.orderType = b.getAttribute('data-value') || 'pickup';
          qsa('button[data-value]', orderToggle).forEach((x) => {
            x.classList.toggle('btn-primary', x === b);
            x.classList.toggle('btn-ghost', x !== b);
            x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
          });
          render();
        });
      });
    }

    render();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initCookieBanner();
    initFooterAccordion();
    initTabs();
    initCarousels();
    initStoreLocator();
  });
})();

