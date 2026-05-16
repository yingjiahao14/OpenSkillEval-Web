/* GreenBean Coffee — shared interactions (static, no build step) */

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  // Cookie banner (home)
  function initCookieBanner() {
    const banner = $('[data-cookie]');
    if (!banner) return;

    const key = 'gb_cookie_consent_v1';
    const agreed = localStorage.getItem(key) === '1';
    if (agreed) {
      banner.setAttribute('hidden', '');
      return;
    }

    const btn = $('[data-cookie-agree]', banner);
    if (!btn) return;

    btn.addEventListener('click', () => {
      localStorage.setItem(key, '1');
      banner.setAttribute('hidden', '');
    });
  }

  // Footer accordion (mobile)
  function initFooterAccordion() {
    const sections = $$('[data-footer-section]');
    if (!sections.length) return;

    sections.forEach((sec) => {
      const head = $('[data-footer-head]', sec);
      if (!head) return;

      head.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 640px)').matches) {
          const isOpen = sec.getAttribute('data-open') === 'true';
          sec.setAttribute('data-open', isOpen ? 'false' : 'true');
        }
      });
    });
  }

  // Rewards redemption tabs
  function initTabs() {
    const root = $('[data-tabs]');
    if (!root) return;

    const tabs = $$('[role="tab"]', root);
    const panels = $$('[role="tabpanel"]', root);

    function activate(tabId) {
      tabs.forEach((t) => {
        const selected = t.id === tabId;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        const active = p.getAttribute('aria-labelledby') === tabId;
        if (active) {
          p.removeAttribute('hidden');
          p.style.opacity = '1';
          p.style.transform = 'translateY(0px)';
        } else {
          p.setAttribute('hidden', '');
        }
      });
    }

    tabs.forEach((t) => {
      t.addEventListener('click', () => activate(t.id));
      t.addEventListener('keydown', (e) => {
        const idx = tabs.indexOf(t);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const next = tabs[(idx + dir + tabs.length) % tabs.length];
          next.focus();
          activate(next.id);
        }
      });
    });

    // Initial
    const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initial) activate(initial.id);

    // Subtle animation for panel reveal
    panels.forEach((p) => {
      p.style.transition = 'opacity 220ms ease, transform 220ms ease';
      p.style.opacity = '1';
      p.style.transform = 'translateY(0px)';
    });
  }

  // Generic carousel
  function initCarousels() {
    const carousels = $$('[data-carousel]');
    carousels.forEach((root) => {
      const track = $('[data-carousel-track]', root);
      const prev = $('[data-carousel-prev]', root);
      const next = $('[data-carousel-next]', root);
      if (!track || !prev || !next) return;

      let index = 0;

      function cardsPerView() {
        const w = root.getBoundingClientRect().width;
        if (w < 540) return 1;
        if (w < 860) return 2;
        return 3;
      }

      function update() {
        const cards = $$('.carousel-card', track);
        const per = cardsPerView();
        const maxIndex = Math.max(0, cards.length - per);
        index = clamp(index, 0, maxIndex);

        const first = cards[0];
        const cardW = first ? first.getBoundingClientRect().width : 240;
        const gap = 14;
        const offset = index * (cardW + gap);

        track.style.transform = `translateX(${-offset}px)`;
        prev.disabled = index === 0;
        next.disabled = index === maxIndex;
        prev.setAttribute('aria-disabled', prev.disabled ? 'true' : 'false');
        next.setAttribute('aria-disabled', next.disabled ? 'true' : 'false');
      }

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
  }

  // Store locator interactions
  function initStoreLocator() {
    const root = $('[data-store-locator]');
    if (!root) return;

    const input = $('[data-store-search]', root);
    const suggestions = $('[data-store-suggestions]', root);
    const results = $('[data-store-results]', root);
    const filterBtn = $('[data-filter-toggle]', root);
    const filterPanel = $('[data-filter-panel]', root);
    const pickupBtn = $('[data-order-pickup]', root);
    const deliveryBtn = $('[data-order-delivery]', root);
    const mapChip = $('[data-map-chip]', root);

    const data = [
      {
        name: 'GreenBean Downtown',
        address: '101 Market St, San Francisco, CA',
        distance: '0.6 mi',
        pickup: true,
        delivery: true,
        features: ['Drive-thru', 'Mobile order']
      },
      {
        name: 'GreenBean Mission',
        address: '245 Valencia St, San Francisco, CA',
        distance: '1.8 mi',
        pickup: true,
        delivery: false,
        features: ['Patio', 'Nitro']
      },
      {
        name: 'GreenBean Sunset',
        address: '1701 Irving St, San Francisco, CA',
        distance: '3.9 mi',
        pickup: true,
        delivery: true,
        features: ['Bakery', 'Mobile order']
      },
      {
        name: 'GreenBean Oakland',
        address: '12 Broadway, Oakland, CA',
        distance: '9.2 mi',
        pickup: true,
        delivery: true,
        features: ['Reserve bar', 'Cold brew']
      }
    ];

    let orderType = 'pickup';

    function renderStores(list) {
      if (!results) return;
      results.innerHTML = '';
      list.forEach((s) => {
        const el = document.createElement('div');
        el.className = 'store';
        el.innerHTML = `
          <h4>${s.name}</h4>
          <div class="meta">${s.address} • ${s.distance}</div>
          <div class="tags">${s.features.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        `;
        results.appendChild(el);
      });

      if (mapChip) {
        mapChip.textContent = `${list.length} result${list.length === 1 ? '' : 's'} • ${orderType === 'pickup' ? 'Pickup' : 'Delivery'}`;
      }
    }

    function applyFilters(query) {
      const q = (query || '').trim().toLowerCase();
      let list = data;

      if (orderType === 'pickup') list = list.filter((s) => s.pickup);
      if (orderType === 'delivery') list = list.filter((s) => s.delivery);

      if (q) {
        list = list.filter((s) => (s.name + ' ' + s.address).toLowerCase().includes(q));
      }

      renderStores(list);
      return list;
    }

    function setOrderType(nextType) {
      orderType = nextType;
      if (pickupBtn && deliveryBtn) {
        pickupBtn.setAttribute('aria-pressed', orderType === 'pickup' ? 'true' : 'false');
        deliveryBtn.setAttribute('aria-pressed', orderType === 'delivery' ? 'true' : 'false');
      }
      applyFilters(input ? input.value : '');
    }

    if (filterBtn && filterPanel) {
      filterBtn.addEventListener('click', () => {
        const hidden = filterPanel.hasAttribute('hidden');
        if (hidden) filterPanel.removeAttribute('hidden');
        else filterPanel.setAttribute('hidden', '');
      });
    }

    if (pickupBtn) pickupBtn.addEventListener('click', () => setOrderType('pickup'));
    if (deliveryBtn) deliveryBtn.addEventListener('click', () => setOrderType('delivery'));

    if (input && suggestions) {
      input.addEventListener('input', () => {
        const q = input.value.trim();
        if (!q) {
          suggestions.setAttribute('hidden', '');
          applyFilters('');
          return;
        }

        const list = applyFilters(q);
        const sugg = list.slice(0, 4).map((s) => s.address);
        suggestions.innerHTML = sugg
          .map((s) => `<button type="button" data-suggestion>${s}</button>`)
          .join('');
        suggestions.removeAttribute('hidden');
      });

      suggestions.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-suggestion]');
        if (!btn) return;
        input.value = btn.textContent || '';
        suggestions.setAttribute('hidden', '');
        applyFilters(input.value);
      });

      document.addEventListener('click', (e) => {
        if (!root.contains(e.target)) suggestions.setAttribute('hidden', '');
      });
    }

    // Initial
    setOrderType('pickup');
    applyFilters('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCookieBanner();
    initFooterAccordion();
    initTabs();
    initCarousels();
    initStoreLocator();
  });
})();
