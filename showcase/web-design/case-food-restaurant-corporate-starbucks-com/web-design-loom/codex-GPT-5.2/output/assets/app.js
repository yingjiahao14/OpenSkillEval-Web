/* GreenBean Coffee site interactions (no build step). */
(function () {
  const byId = (id) => document.getElementById(id);

  function setCurrentNav() {
    const page = document.documentElement.getAttribute('data-page');
    if (!page) return;
    const link = document.querySelector(`[data-nav="${page}"]`);
    if (link) link.setAttribute('aria-current', 'page');
  }

  function initCookieBanner() {
    const banner = byId('cookie-banner');
    if (!banner) return;
    const agree = byId('cookie-agree');
    const storageKey = 'greenbean_cookie_ok';

    const already = localStorage.getItem(storageKey) === '1';
    banner.dataset.open = already ? 'false' : 'true';

    if (agree) {
      agree.addEventListener('click', () => {
        localStorage.setItem(storageKey, '1');
        banner.dataset.open = 'false';
      });
    }
  }

  function initFooterAccordion() {
    const footer = document.querySelector('[data-footer]');
    if (!footer) return;

    const media = window.matchMedia('(max-width: 760px)');
    const sections = Array.from(footer.querySelectorAll('[data-footer-section]'));

    function applyMode() {
      const mobile = media.matches;
      for (const sec of sections) {
        const btn = sec.querySelector('button[data-footer-toggle]');
        const panel = sec.querySelector('.footer-links');
        if (!btn || !panel) continue;
        if (mobile) {
          btn.hidden = false;
          btn.setAttribute('aria-controls', panel.id);
          btn.setAttribute('aria-expanded', sec.dataset.open === 'true' ? 'true' : 'false');
        } else {
          sec.dataset.open = 'true';
          btn.hidden = true;
          btn.setAttribute('aria-expanded', 'true');
        }
      }
    }

    for (const sec of sections) {
      const btn = sec.querySelector('button[data-footer-toggle]');
      const panel = sec.querySelector('.footer-links');
      if (!btn || !panel) continue;

      if (!panel.id) {
        panel.id = `footer-panel-${Math.random().toString(16).slice(2)}`;
      }

      btn.addEventListener('click', () => {
        const next = sec.dataset.open !== 'true';
        sec.dataset.open = next ? 'true' : 'false';
        btn.setAttribute('aria-expanded', next ? 'true' : 'false');
      });
    }

    media.addEventListener('change', applyMode);
    applyMode();
  }

  function initRewardsTabs() {
    const tabs = document.querySelector('[data-tabs="rewards"]');
    if (!tabs) return;

    const tabButtons = Array.from(tabs.querySelectorAll('[role="tab"]'));
    const panel = document.querySelector('[data-tabpanel="rewards"]');
    if (!panel || tabButtons.length === 0) return;

    const content = JSON.parse(tabs.getAttribute('data-tabs-content') || '{}');

    function select(id, focus = false) {
      for (const btn of tabButtons) {
        const selected = btn.getAttribute('data-tab') === id;
        btn.setAttribute('aria-selected', selected ? 'true' : 'false');
        btn.tabIndex = selected ? 0 : -1;
        if (selected && focus) btn.focus();
      }
      const data = content[id];
      if (!data) return;
      panel.classList.remove('fade');
      // Trigger reflow for animation restart.
      void panel.offsetWidth;
      panel.innerHTML = `
        <div class="stack fade">
          <div class="row">
            <span class="pill">${data.stars} ★</span>
            <span class="pill">Value: ${data.value}</span>
          </div>
          <h3 class="h3">${data.reward}</h3>
          <p class="muted" style="margin:0;">${data.helper}</p>
          <div class="divider"></div>
          <div class="row">
            <a class="btn btn-primary" href="menu.html">Browse the menu</a>
            <a class="btn btn-ghost" href="gift.html">Send a gift card</a>
          </div>
        </div>
      `.trim();
    }

    for (const btn of tabButtons) {
      btn.addEventListener('click', () => select(btn.getAttribute('data-tab') || '25', false));
      btn.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        const idx = tabButtons.indexOf(btn);
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = (idx + dir + tabButtons.length) % tabButtons.length;
        select(tabButtons[next].getAttribute('data-tab') || '25', true);
      });
    }

    const initial = tabs.getAttribute('data-initial') || tabButtons[0].getAttribute('data-tab') || '25';
    select(initial, false);
  }

  function initCarousels() {
    const carousels = Array.from(document.querySelectorAll('[data-carousel]'));
    for (const c of carousels) {
      const inner = c.querySelector('[data-carousel-inner]');
      const prev = c.querySelector('[data-carousel-prev]');
      const next = c.querySelector('[data-carousel-next]');
      const track = c.querySelector('[data-carousel-track]');
      if (!inner || !prev || !next || !track) continue;

      const cards = Array.from(inner.children);
      let index = 0;

      function pageSize() {
        const card = cards[0];
        if (!card) return 1;
        const cardWidth = card.getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(inner).columnGap || '12') || 12;
        const visible = track.getBoundingClientRect().width;
        return Math.max(1, Math.floor((visible + gap) / (cardWidth + gap)));
      }

      function apply() {
        const size = pageSize();
        const maxIndex = Math.max(0, cards.length - size);
        index = Math.min(Math.max(0, index), maxIndex);
        const card = cards[0];
        const cardWidth = card ? card.getBoundingClientRect().width : 220;
        const gap = parseFloat(getComputedStyle(inner).columnGap || '12') || 12;
        const offset = index * (cardWidth + gap);
        inner.style.transform = `translateX(${-offset}px)`;
        prev.disabled = index <= 0;
        next.disabled = index >= maxIndex;
      }

      prev.addEventListener('click', () => {
        index = Math.max(0, index - pageSize());
        apply();
      });

      next.addEventListener('click', () => {
        index = index + pageSize();
        apply();
      });

      window.addEventListener('resize', apply);
      apply();
    }
  }

  function initStoreLocator() {
    const root = document.querySelector('[data-locator]');
    if (!root) return;

    const input = root.querySelector('input[data-locator-input]');
    const suggest = root.querySelector('[data-locator-suggestions]');
    const results = root.querySelector('[data-locator-results]');
    const map = root.querySelector('[data-locator-map]');
    const filterBtn = root.querySelector('[data-locator-filter-btn]');
    const filterPanel = root.querySelector('[data-locator-filters]');
    const pickupBtn = root.querySelector('[data-order-type="pickup"]');
    const deliveryBtn = root.querySelector('[data-order-type="delivery"]');
    const announcer = root.querySelector('[data-live]');

    const stores = [
      {
        name: 'GreenBean Market Street',
        address: '125 Market St',
        city: 'San Francisco, CA',
        pickup: true,
        delivery: true,
        tags: ['Drive-thru', 'Mobile order'],
        x: 62,
        y: 54,
      },
      {
        name: 'GreenBean Sunset',
        address: '905 Irving St',
        city: 'San Francisco, CA',
        pickup: true,
        delivery: false,
        tags: ['Patio', 'Mobile order'],
        x: 36,
        y: 68,
      },
      {
        name: 'GreenBean Palo Alto',
        address: '456 University Ave',
        city: 'Palo Alto, CA',
        pickup: true,
        delivery: true,
        tags: ['Reserve beans', 'Wi‑Fi'],
        x: 70,
        y: 78,
      },
      {
        name: 'GreenBean Mission',
        address: '325 Valencia St',
        city: 'San Francisco, CA',
        pickup: false,
        delivery: true,
        tags: ['Delivery only', 'Cold foam bar'],
        x: 58,
        y: 35,
      },
    ];

    const locations = [
      'San Francisco, CA',
      'Palo Alto, CA',
      'Oakland, CA',
      'San Jose, CA',
      'Berkeley, CA',
    ];

    let orderType = 'pickup';
    let query = '';

    function setLive(text) {
      if (!announcer) return;
      announcer.textContent = text;
    }

    function setOrderType(nextType) {
      orderType = nextType;
      if (pickupBtn) pickupBtn.setAttribute('aria-pressed', orderType === 'pickup' ? 'true' : 'false');
      if (deliveryBtn) deliveryBtn.setAttribute('aria-pressed', orderType === 'delivery' ? 'true' : 'false');
      render();
    }

    function matchStore(s) {
      const q = query.trim().toLowerCase();
      if (orderType === 'pickup' && !s.pickup) return false;
      if (orderType === 'delivery' && !s.delivery) return false;
      if (!q) return true;
      return (s.name + ' ' + s.address + ' ' + s.city).toLowerCase().includes(q);
    }

    function renderMap(list) {
      if (!map) return;
      map.innerHTML = '<div class="label" style="left:12px;top:12px;">Map preview (placeholder)</div>';
      list.slice(0, 3).forEach((s, i) => {
        const pin = document.createElement('div');
        pin.className = 'pin';
        pin.style.left = `${s.x}%`;
        pin.style.top = `${s.y}%`;
        pin.title = s.name;
        map.appendChild(pin);

        const label = document.createElement('div');
        label.className = 'label';
        label.style.left = `calc(${s.x}% + 10px)`;
        label.style.top = `calc(${s.y}% - 10px)`;
        label.textContent = `${i + 1}. ${s.name}`;
        map.appendChild(label);
      });
    }

    function renderResults(list) {
      if (!results) return;
      results.innerHTML = '';

      if (list.length === 0) {
        results.innerHTML = `
          <div class="card card-pad">
            <h3 class="h3">No stores match that search</h3>
            <p class="muted" style="margin:6px 0 0;">Try a nearby city or clear filters.</p>
          </div>
        `.trim();
        setLive('Showing 0 stores');
        return;
      }

      const frag = document.createDocumentFragment();
      list.forEach((s, idx) => {
        const el = document.createElement('div');
        el.className = 'card card-pad';
        el.innerHTML = `
          <div class="row" style="justify-content:space-between;align-items:flex-start;gap:12px;">
            <div class="stack" style="gap:6px;">
              <div class="row"><span class="pill">#${idx + 1}</span><span class="pill">${orderType === 'pickup' ? 'Pickup' : 'Delivery'}</span></div>
              <h3 class="h3">${s.name}</h3>
              <div class="muted">${s.address} · ${s.city}</div>
              <div class="chips" aria-label="Store features">
                ${s.tags.map((t) => `<span class="chip">${t}</span>`).join('')}
              </div>
            </div>
            <div class="stack" style="justify-items:end;align-content:start;">
              <a class="btn btn-primary" href="menu.html">Start order</a>
              <a class="btn btn-ghost" href="#" onclick="return false;">View hours</a>
            </div>
          </div>
        `.trim();
        frag.appendChild(el);
      });
      results.appendChild(frag);
      setLive(`Showing ${list.length} stores`);
    }

    function render() {
      const list = stores.filter(matchStore);
      renderResults(list);
      renderMap(list);
    }

    function renderSuggestions() {
      if (!suggest || !input) return;
      const q = input.value.trim().toLowerCase();
      query = input.value;
      if (q.length === 0) {
        suggest.innerHTML = '';
        suggest.hidden = true;
        render();
        return;
      }

      const matches = locations
        .filter((l) => l.toLowerCase().includes(q))
        .slice(0, 5);

      if (matches.length === 0) {
        suggest.innerHTML = '';
        suggest.hidden = true;
        render();
        return;
      }

      suggest.innerHTML = '';
      for (const m of matches) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = m;
        btn.addEventListener('click', () => {
          input.value = m;
          query = m;
          suggest.innerHTML = '';
          suggest.hidden = true;
          render();
        });
        suggest.appendChild(btn);
      }
      suggest.hidden = false;
      render();
    }

    if (input) {
      input.addEventListener('input', renderSuggestions);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (suggest) {
            suggest.innerHTML = '';
            suggest.hidden = true;
          }
        }
      });
    }

    if (filterBtn && filterPanel) {
      filterBtn.addEventListener('click', () => {
        const open = filterPanel.dataset.open === 'true';
        filterPanel.dataset.open = open ? 'false' : 'true';
        filterBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    }

    if (pickupBtn) pickupBtn.addEventListener('click', () => setOrderType('pickup'));
    if (deliveryBtn) deliveryBtn.addEventListener('click', () => setOrderType('delivery'));

    render();
    setOrderType('pickup');
  }

  document.addEventListener('DOMContentLoaded', () => {
    setCurrentNav();
    initCookieBanner();
    initFooterAccordion();
    initRewardsTabs();
    initCarousels();
    initStoreLocator();
  });
})();

