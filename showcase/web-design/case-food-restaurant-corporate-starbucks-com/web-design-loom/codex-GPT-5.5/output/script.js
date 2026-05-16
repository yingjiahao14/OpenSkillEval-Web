const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function initCookieBanner() {
  const banner = $('[data-cookie-banner]');
  const agree = $('[data-cookie-agree]');
  if (!banner || !agree) return;
  const storage = {
    get() {
      try { return localStorage.getItem('greenbeanCookiesOk'); } catch { return null; }
    },
    set() {
      try { localStorage.setItem('greenbeanCookiesOk', 'true'); } catch { /* Direct file browsing may block storage. */ }
    }
  };
  if (storage.get() === 'true') banner.classList.add('hidden');
  agree.addEventListener('click', () => {
    storage.set();
    banner.classList.add('hidden');
  });
}

function initFooterAccordions() {
  $$('.footer-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      if (!window.matchMedia('(max-width: 920px)').matches) return;
      const section = button.closest('.footer-section');
      const isOpen = section.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

function initRewardTabs() {
  const tabs = $$('[role="tab"]');
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const panelId = tab.getAttribute('aria-controls');
      tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
      $$('.tab-panel').forEach((panel) => panel.classList.toggle('active', panel.id === panelId));
    });
  });
}

function initCarousels() {
  $$('[data-carousel]').forEach((carousel) => {
    const track = $('.carousel-track', carousel);
    const next = $('[data-next]', carousel);
    const prev = $('[data-prev]', carousel);
    if (!track || !next || !prev) return;
    const move = (direction) => {
      const card = $('.gift-card', track);
      const amount = card ? card.offsetWidth + 18 : 260;
      track.scrollBy({ left: direction * amount * 2, behavior: 'smooth' });
    };
    next.addEventListener('click', () => move(1));
    prev.addEventListener('click', () => move(-1));
  });
}

function initStoreLocator() {
  const search = $('[data-store-search]');
  if (!search) return;
  const suggestions = $('[data-suggestions]');
  const resultCount = $('[data-result-count]');
  const filterButton = $('[data-filter-toggle]');
  const filterPanel = $('[data-filter-panel]');
  const orderButtons = $$('[data-order-type]');
  const mapLabel = $('[data-map-label]');

  const stores = [
    { name: 'GreenBean Market Street', address: '120 Market Street · Open until 8 PM', features: ['Mobile order', 'Pickup', 'Nitro cold brew'] },
    { name: 'GreenBean Garden Plaza', address: '44 Garden Plaza · Open until 9 PM', features: ['Drive-thru', 'Delivery', 'Breakfast'] },
    { name: 'GreenBean Riverside', address: '8 Riverside Ave · Open until 7 PM', features: ['Pickup', 'Outdoor seating', 'Bakery'] }
  ];

  function renderSuggestions(value) {
    if (!value.trim()) {
      suggestions.classList.remove('open');
      suggestions.innerHTML = '';
      resultCount.textContent = 'Showing 3 nearby coffeehouses';
      return;
    }
    suggestions.innerHTML = `<strong>Suggestions</strong><p>${value} downtown · ${value} plaza · ${value} near me</p>`;
    suggestions.classList.add('open');
    resultCount.textContent = `Showing ${stores.length} results for “${value}”`;
    if (mapLabel) mapLabel.textContent = `Map refreshed with GreenBean locations near ${value}.`;
  }

  search.addEventListener('input', (event) => renderSuggestions(event.target.value));

  filterButton?.addEventListener('click', () => {
    const isOpen = filterPanel.classList.toggle('open');
    filterButton.setAttribute('aria-expanded', String(isOpen));
  });

  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      orderButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const type = button.dataset.orderType;
      resultCount.textContent = `Showing stores available for ${type}`;
      if (mapLabel) mapLabel.textContent = `Map pins updated for ${type} availability.`;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initFooterAccordions();
  initRewardTabs();
  initCarousels();
  initStoreLocator();
});
