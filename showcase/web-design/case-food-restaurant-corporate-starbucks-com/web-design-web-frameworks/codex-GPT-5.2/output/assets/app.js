(function () {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  // Mobile nav
  const navToggle = $('[data-nav-toggle]');
  const navPanel = $('[data-nav-panel]');
  if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => {
      const open = navPanel.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Cookie banner (home)
  const cookie = $('[data-cookie-banner]');
  const cookieAgree = $('[data-cookie-agree]');
  if (cookie && cookieAgree) {
    const dismissed = localStorage.getItem('gb_cookie_dismissed') === '1';
    if (dismissed) cookie.remove();
    cookieAgree.addEventListener('click', () => {
      localStorage.setItem('gb_cookie_dismissed', '1');
      cookie.remove();
    });
  }

  // Footer accordion (mobile)
  $$('[data-footer-accordion] .footer-col').forEach((col) => {
    const btn = $('[data-accordion-btn]', col);
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = col.getAttribute('data-accordion-open') === 'true';
      col.setAttribute('data-accordion-open', String(!isOpen));
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Rewards redemption tabs
  const tabsRoot = $('[data-tabs]');
  if (tabsRoot) {
    const tabs = $$('[role="tab"]', tabsRoot);
    const panels = $$('[role="tabpanel"]', tabsRoot);

    const activate = (id) => {
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t.getAttribute('aria-controls') === id)));
      panels.forEach((p) => {
        const on = p.id === id;
        p.classList.toggle('active', on);
        p.hidden = !on;
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activate(tab.getAttribute('aria-controls')));
      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const idx = tabs.indexOf(tab);
        const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        activate(tabs[next].getAttribute('aria-controls'));
      });
    });

    if (tabs[0]) activate(tabs[0].getAttribute('aria-controls'));
  }

  // Carousels (gift)
  $$('[data-carousel]').forEach((root) => {
    const track = $('[data-carousel-track]', root);
    const prev = $('[data-carousel-prev]', root);
    const next = $('[data-carousel-next]', root);
    if (!track || !prev || !next) return;

    const cards = $$('[data-card]', track);
    let index = 0;

    const visibleCount = () => {
      const w = root.getBoundingClientRect().width;
      if (w < 520) return 1;
      if (w < 820) return 2;
      return 3;
    };

    const update = () => {
      const count = visibleCount();
      const maxIndex = Math.max(0, cards.length - count);
      index = Math.min(Math.max(0, index), maxIndex);
      const step = cards[0] ? cards[0].getBoundingClientRect().width + 12 : 252;
      track.style.transform = `translateX(${-index * step}px)`;
      prev.disabled = index === 0;
      next.disabled = index >= maxIndex;
    };

    prev.addEventListener('click', () => {
      index -= 1;
      update();
    });

    next.addEventListener('click', () => {
      index += 1;
      update();
    });

    window.addEventListener('resize', update);
    update();
  });

  // Store locator
  const locator = $('[data-store-locator]');
  if (locator) {
    const input = $('[data-locator-input]', locator);
    const suggestions = $('[data-locator-suggestions]', locator);
    const filterBtn = $('[data-locator-filter-btn]', locator);
    const filterPanel = $('[data-locator-filter-panel]', locator);
    const pickupBtn = $('[data-locator-pickup]', locator);
    const deliveryBtn = $('[data-locator-delivery]', locator);
    const resultsRoot = $('[data-locator-results]', locator);
    const mapHint = $('[data-map-hint]', locator);

    const allStores = [
      {
        name: 'GreenBean — Downtown',
        city: 'Seattle, WA',
        address: '120 Pine St, Seattle, WA 98101',
        hours: '6:00 a.m. – 7:30 p.m.',
        features: ['Mobile order', 'Drive-thru'],
        delivery: true,
      },
      {
        name: 'GreenBean — Capitol Hill',
        city: 'Seattle, WA',
        address: '502 E Pike St, Seattle, WA 98122',
        hours: '6:30 a.m. – 8:00 p.m.',
        features: ['Mobile order', 'Reserve bar'],
        delivery: false,
      },
      {
        name: 'GreenBean — South Lake Union',
        city: 'Seattle, WA',
        address: '810 Westlake Ave N, Seattle, WA 98109',
        hours: '6:00 a.m. – 6:00 p.m.',
        features: ['Mobile order', 'Patio'],
        delivery: true,
      },
      {
        name: 'GreenBean — Portland Pearl',
        city: 'Portland, OR',
        address: '323 NW 10th Ave, Portland, OR 97209',
        hours: '6:30 a.m. – 6:30 p.m.',
        features: ['Mobile order', 'Drive-thru'],
        delivery: true,
      },
      {
        name: 'GreenBean — San Francisco',
        city: 'San Francisco, CA',
        address: '88 Market St, San Francisco, CA 94105',
        hours: '6:00 a.m. – 7:00 p.m.',
        features: ['Mobile order', 'Curbside'],
        delivery: false,
      },
      {
        name: 'GreenBean — Chicago Loop',
        city: 'Chicago, IL',
        address: '15 W Adams St, Chicago, IL 60603',
        hours: '6:00 a.m. – 6:00 p.m.',
        features: ['Mobile order', 'Drive-thru'],
        delivery: true,
      },
    ];

    let orderType = 'pickup';

    const renderStores = (stores) => {
      if (!resultsRoot) return;
      resultsRoot.innerHTML = '';
      stores.forEach((s) => {
        const el = document.createElement('div');
        el.className = 'store';
        el.innerHTML = `
          <div class="title">
            <strong>${s.name}</strong>
            <span class="badge">${orderType === 'delivery' ? (s.delivery ? 'Delivery' : 'Pickup only') : 'Pickup'}</span>
          </div>
          <div class="meta">${s.address}<br/>${s.hours}</div>
          <div class="features">${s.features.map((f) => `<span class="chip">${f}</span>`).join('')}</div>
        `;
        resultsRoot.appendChild(el);
      });

      if (mapHint) {
        mapHint.textContent = stores.length
          ? `Showing ${stores.length} nearby stores for ${orderType}.`
          : 'No matching stores found — try another search.';
      }
    };

    const applyFilters = (query) => {
      const q = (query || '').trim().toLowerCase();
      let stores = allStores;

      if (q) {
        stores = stores.filter((s) => (s.city + ' ' + s.address + ' ' + s.name).toLowerCase().includes(q));
      }

      if (orderType === 'delivery') {
        stores = stores.filter((s) => s.delivery);
      }

      renderStores(stores);
      return stores;
    };

    const showSuggestions = (items) => {
      if (!suggestions) return;
      suggestions.innerHTML = '';
      if (!items.length) {
        suggestions.classList.remove('open');
        return;
      }
      suggestions.classList.add('open');
      items.slice(0, 4).forEach((txt) => {
        const b = document.createElement('div');
        b.className = 'sugg';
        b.textContent = txt;
        b.addEventListener('click', () => {
          input.value = txt;
          suggestions.classList.remove('open');
          applyFilters(txt);
        });
        suggestions.appendChild(b);
      });
    };

    if (input) {
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) {
          showSuggestions([]);
          applyFilters('');
          return;
        }
        const matches = allStores
          .filter((s) => (s.city + ' ' + s.address + ' ' + s.name).toLowerCase().includes(q))
          .map((s) => s.city);
        const unique = Array.from(new Set(matches));
        showSuggestions(unique);
        applyFilters(input.value);
      });

      input.addEventListener('blur', () => {
        setTimeout(() => suggestions && suggestions.classList.remove('open'), 120);
      });
    }

    if (filterBtn && filterPanel) {
      filterBtn.addEventListener('click', () => {
        const open = filterPanel.classList.toggle('open');
        filterBtn.setAttribute('aria-expanded', String(open));
      });
    }

    const setOrderType = (nextType) => {
      orderType = nextType;
      if (pickupBtn) pickupBtn.classList.toggle('active', orderType === 'pickup');
      if (deliveryBtn) deliveryBtn.classList.toggle('active', orderType === 'delivery');
      applyFilters(input ? input.value : '');
    };

    if (pickupBtn) pickupBtn.addEventListener('click', () => setOrderType('pickup'));
    if (deliveryBtn) deliveryBtn.addEventListener('click', () => setOrderType('delivery'));

    renderStores(allStores.slice(0, 4));
    setOrderType('pickup');
  }
})();

