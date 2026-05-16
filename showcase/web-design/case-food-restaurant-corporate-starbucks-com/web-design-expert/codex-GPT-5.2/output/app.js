/* GreenBean Coffee - site interactions (no build required) */

function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
}

function setHidden(el, hidden) {
  if (!el) return;
  el.hidden = hidden;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function setupCookieBanner() {
  const banner = $('[data-cookie-banner]');
  if (!banner) return;

  const key = 'gb.cookiesAccepted.v1';
  const stored = localStorage.getItem(key);
  if (stored === 'true') {
    setHidden(banner, true);
    return;
  }

  const agree = $('[data-cookie-agree]', banner);
  if (agree) {
    agree.addEventListener('click', () => {
      localStorage.setItem(key, 'true');
      setHidden(banner, true);
    });
  }
}

function setupFooterAccordion() {
  const footer = $('footer');
  if (!footer) return;

  const cols = $all('[data-footer-col]', footer);
  if (cols.length === 0) return;

  function applyCollapsedState() {
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    cols.forEach((col, idx) => {
      const btn = $('[data-footer-accordion]', col);
      if (!btn) return;
      if (!isMobile) {
        col.dataset.open = 'true';
        btn.setAttribute('aria-expanded', 'true');
      } else {
        // default: first open for affordance
        const open = idx === 0;
        col.dataset.open = open ? 'true' : 'false';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    });
  }

  cols.forEach((col) => {
    const btn = $('[data-footer-accordion]', col);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = col.dataset.open === 'true';
      col.dataset.open = open ? 'false' : 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });

  applyCollapsedState();
  window.addEventListener('resize', applyCollapsedState);
}

function setupTabs() {
  const tabs = $all('[data-tabs]');
  if (tabs.length === 0) return;

  tabs.forEach((root) => {
    const tabButtons = $all('[role="tab"]', root);
    const panels = $all('[role="tabpanel"]', root);
    if (tabButtons.length === 0 || panels.length === 0) return;

    function activate(tabId) {
      tabButtons.forEach((btn) => {
        const selected = btn.id === tabId;
        btn.setAttribute('aria-selected', selected ? 'true' : 'false');
        btn.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        const match = p.getAttribute('aria-labelledby') === tabId;
        p.hidden = !match;
      });
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => activate(btn.id));
      btn.addEventListener('keydown', (e) => {
        const i = tabButtons.indexOf(btn);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const next = (i + dir + tabButtons.length) % tabButtons.length;
          tabButtons[next].focus();
          activate(tabButtons[next].id);
        }
      });
    });

    // Initialize to first selected or first tab
    const initial = tabButtons.find((b) => b.getAttribute('aria-selected') === 'true') || tabButtons[0];
    activate(initial.id);
  });
}

function setupCarousel(root) {
  const track = $('[data-carousel-track]', root);
  const prev = $('[data-carousel-prev]', root);
  const next = $('[data-carousel-next]', root);
  if (!track || !prev || !next) return;

  let index = 0;

  function visibleCount() {
    const slides = $all('[data-carousel-slide]', track);
    if (slides.length === 0) return 1;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const trackWidth = track.getBoundingClientRect().width;
    const count = Math.max(1, Math.floor(trackWidth / slideWidth));
    return clamp(count, 1, 3);
  }

  function maxIndex() {
    const slides = $all('[data-carousel-slide]', track);
    return Math.max(0, slides.length - visibleCount());
  }

  function update() {
    const slides = $all('[data-carousel-slide]', track);
    const gap = parseFloat(getComputedStyle(track).gap || '0');
    if (slides.length === 0) return;
    index = clamp(index, 0, maxIndex());

    const slideW = slides[0].getBoundingClientRect().width;
    const x = index * (slideW + gap);
    track.style.transform = `translateX(${-x}px)`;
    track.style.transition = `transform 240ms cubic-bezier(.16,1,.3,1)`;

    prev.disabled = index === 0;
    next.disabled = index === maxIndex();
    prev.setAttribute('aria-disabled', prev.disabled ? 'true' : 'false');
    next.setAttribute('aria-disabled', next.disabled ? 'true' : 'false');
  }

  // Ensure the track doesn't wrap.
  track.style.display = 'flex';
  track.style.flexWrap = 'nowrap';

  prev.addEventListener('click', () => {
    index -= 1;
    update();
  });
  next.addEventListener('click', () => {
    index += 1;
    update();
  });

  // Touch swipe (basic)
  let startX = 0;
  let dragging = false;
  track.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = e.clientX;
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) {
      index += dx < 0 ? 1 : -1;
      update();
    }
  });

  window.addEventListener('resize', update);
  update();
}

function setupCarousels() {
  $all('[data-carousel]').forEach(setupCarousel);
}

function setupStoreLocator() {
  const root = $('[data-store-locator]');
  if (!root) return;

  const input = $('[data-store-search]', root);
  const suggestions = $('[data-suggestions]', root);
  const suggestionsList = $('[data-suggestions-list]', root);
  const results = $('[data-store-results]', root);
  const filterBtn = $('[data-filter-btn]', root);
  const filterPanel = $('[data-filter-panel]', root);
  const orderToggle = $('[data-order-toggle]', root);
  const map = $('[data-map]', root);

  const stores = [
    {
      name: 'GreenBean Market Street',
      address: '101 Market St, San Francisco, CA',
      pickup: true,
      delivery: true,
      tags: ['Drive-thru', 'Mobile Order'],
      pin: { left: '28%', top: '36%' },
    },
    {
      name: 'GreenBean Mission Bay',
      address: '456 3rd St, San Francisco, CA',
      pickup: true,
      delivery: false,
      tags: ['Pickup', 'Outdoor Seating'],
      pin: { left: '42%', top: '56%' },
    },
    {
      name: 'GreenBean Oakland Lake Merritt',
      address: '700 Grand Ave, Oakland, CA',
      pickup: true,
      delivery: true,
      tags: ['Delivery', 'Wi‑Fi'],
      pin: { left: '62%', top: '44%' },
    },
    {
      name: 'GreenBean Berkeley Campus',
      address: '2000 University Ave, Berkeley, CA',
      pickup: true,
      delivery: false,
      tags: ['Pickup', 'Community Board'],
      pin: { left: '72%', top: '30%' },
    },
  ];

  let activeOrderType = 'pickup';
  let activeChips = new Set();
  let activeQuery = '';

  function setSuggestionsOpen(open) {
    if (!suggestionsList) return;
    suggestionsList.dataset.open = open ? 'true' : 'false';
  }

  function normalize(s) {
    return (s || '').toLowerCase().trim();
  }

  function filteredStores() {
    const q = normalize(activeQuery);
    let list = stores.slice();

    list = list.filter((s) => (activeOrderType === 'pickup' ? s.pickup : s.delivery));

    if (q) {
      list = list.filter((s) => normalize(s.name).includes(q) || normalize(s.address).includes(q));
    }

    if (activeChips.size > 0) {
      list = list.filter((s) => {
        return Array.from(activeChips).every((chip) => s.tags.map(normalize).includes(normalize(chip)));
      });
    }

    return list;
  }

  function renderResults() {
    if (!results) return;
    const list = filteredStores();
    results.innerHTML = '';

    if (list.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'store';
      empty.innerHTML = `<strong>No stores match that search.</strong><small>Try a different area or clear filters.</small>`;
      results.appendChild(empty);
      renderPins([]);
      return;
    }

    list.forEach((s) => {
      const el = document.createElement('div');
      el.className = 'store';
      el.innerHTML = `
        <div class="row">
          <div>
            <strong>${s.name}</strong>
            <small>${s.address}</small>
          </div>
          <span class="badge">${activeOrderType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
        </div>
        <div class="tags">
          ${s.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
      `;
      results.appendChild(el);
    });
    renderPins(list);
  }

  function renderPins(list) {
    if (!map) return;
    $all('.pin', map).forEach((p) => p.remove());
    list.forEach((s) => {
      const pin = document.createElement('div');
      pin.className = 'pin';
      pin.style.left = s.pin.left;
      pin.style.top = s.pin.top;
      pin.title = s.name;
      map.appendChild(pin);
    });
  }

  function renderSuggestions() {
    if (!suggestionsList) return;
    const q = normalize(activeQuery);
    if (!q) {
      setSuggestionsOpen(false);
      suggestionsList.innerHTML = '';
      return;
    }
    const matches = stores
      .filter((s) => normalize(s.name).includes(q) || normalize(s.address).includes(q))
      .slice(0, 5);
    if (matches.length === 0) {
      setSuggestionsOpen(false);
      suggestionsList.innerHTML = '';
      return;
    }

    suggestionsList.innerHTML = matches
      .map((s) => `<button type="button" data-suggestion="${s.name}"><strong>${s.name}</strong><div style="color:var(--muted);font-size:12px">${s.address}</div></button>`)
      .join('');
    setSuggestionsOpen(true);

    $all('button[data-suggestion]', suggestionsList).forEach((btn) => {
      btn.addEventListener('click', () => {
        activeQuery = btn.getAttribute('data-suggestion') || '';
        if (input) input.value = activeQuery;
        setSuggestionsOpen(false);
        renderResults();
      });
    });
  }

  if (input) {
    input.addEventListener('input', () => {
      activeQuery = input.value;
      renderSuggestions();
      renderResults();
    });
    input.addEventListener('focus', () => {
      renderSuggestions();
    });
    input.addEventListener('blur', () => {
      // allow clicks to register
      setTimeout(() => setSuggestionsOpen(false), 120);
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      const open = filterPanel.dataset.open === 'true';
      filterPanel.dataset.open = open ? 'false' : 'true';
      filterBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  if (filterPanel) {
    $all('[data-chip]', filterPanel).forEach((chip) => {
      chip.addEventListener('click', () => {
        const key = chip.getAttribute('data-chip') || '';
        if (!key) return;
        if (activeChips.has(key)) activeChips.delete(key);
        else activeChips.add(key);
        chip.dataset.active = activeChips.has(key) ? 'true' : 'false';
        renderResults();
      });
    });
  }

  if (orderToggle) {
    $all('button[data-order]', orderToggle).forEach((btn) => {
      btn.addEventListener('click', () => {
        activeOrderType = btn.getAttribute('data-order') || 'pickup';
        $all('button[data-order]', orderToggle).forEach((b) => {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        renderResults();
      });
    });
  }

  // Initial render
  renderResults();
}

onReady(() => {
  setupCookieBanner();
  setupFooterAccordion();
  setupTabs();
  setupCarousels();
  setupStoreLocator();
});
