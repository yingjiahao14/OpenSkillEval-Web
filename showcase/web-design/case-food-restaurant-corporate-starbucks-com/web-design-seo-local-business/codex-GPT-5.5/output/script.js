const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

document.addEventListener('DOMContentLoaded', () => {
  const header = $('.site-header');
  const menuButton = $('.mobile-menu-btn');
  if (menuButton && header) {
    menuButton.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  const cookieBanner = $('.cookie-banner');
  const agreeButton = $('[data-cookie-agree]');
  if (cookieBanner && agreeButton) {
    if (localStorage.getItem('greenbeanCookies') === 'agreed') cookieBanner.classList.add('hidden');
    agreeButton.addEventListener('click', () => {
      localStorage.setItem('greenbeanCookies', 'agreed');
      cookieBanner.classList.add('hidden');
    });
  }

  $$('.footer-section button').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.closest('.footer-section');
      section.classList.toggle('open');
      button.setAttribute('aria-expanded', String(section.classList.contains('open')));
    });
  });

  $$('.tabs').forEach((tabs) => {
    const group = tabs.dataset.tabs;
    if (!group) return;
    tabs.addEventListener('click', (event) => {
      const button = event.target.closest('.tab-btn');
      if (!button) return;
      const target = button.dataset.tabTarget;
      $$(`.tab-btn[data-tab-target][data-tab-group="${group}"]`).forEach((tab) => tab.classList.toggle('active', tab === button));
      $$(`.tab-panel[data-tab-panel][data-tab-group="${group}"]`).forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
    });
  });

  $$('.carousel').forEach((carousel) => {
    const track = $('.carousel-track', carousel);
    $$('.carousel-btn', carousel).forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.dataset.direction === 'prev' ? -1 : 1;
        track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.82, 720), behavior: 'smooth' });
      });
    });
  });

  const searchInput = $('#store-search');
  const suggestions = $('#suggestions');
  const results = $('#store-results');
  const mapLabel = $('#map-label-text');
  const stores = [
    { name: 'GreenBean Market Street', address: '125 Market Street, Downtown', hours: 'Open until 8:30 PM', features: ['Drive-thru', 'Mobile order', 'Pickup'] },
    { name: 'GreenBean Garden District', address: '82 Garden Avenue, Midtown', hours: 'Open until 9:00 PM', features: ['Delivery', 'Nitro cold brew', 'Outdoor seats'] },
    { name: 'GreenBean Riverside', address: '410 Riverside Drive', hours: 'Open until 7:30 PM', features: ['Pickup', 'Reserve bar', 'Bakery'] }
  ];
  const renderStores = (orderType = 'Pickup') => {
    if (!results) return;
    results.innerHTML = stores.map((store, index) => `
      <article class="result-card">
        <strong>${index + 1}. ${store.name}</strong>
        <p>${store.address}</p>
        <p>${store.hours} · ${orderType} available</p>
        <div class="features">${store.features.map((feature) => `<span class="feature-tag">${feature}</span>`).join('')}</div>
        <a class="btn btn-small btn-outline" href="#">Order from this store</a>
      </article>
    `).join('');
  };
  renderStores();
  if (searchInput && suggestions) {
    searchInput.addEventListener('input', () => {
      const value = searchInput.value.trim();
      suggestions.classList.toggle('open', value.length > 0);
      suggestions.innerHTML = value.length ? ['Downtown', 'Garden District', 'Riverside'].map((place) => `<button type="button">${value} near ${place}</button>`).join('') : '';
      if (mapLabel && value.length) mapLabel.textContent = `Showing GreenBean stores near “${value}”`;
    });
    suggestions.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) return;
      searchInput.value = button.textContent;
      suggestions.classList.remove('open');
      if (mapLabel) mapLabel.textContent = `Map updated for ${button.textContent}`;
    });
  }
  const filterButton = $('#filter-toggle');
  const filterPanel = $('#filter-panel');
  if (filterButton && filterPanel) {
    filterButton.addEventListener('click', () => {
      const open = filterPanel.classList.toggle('open');
      filterButton.setAttribute('aria-expanded', String(open));
    });
  }
  $$('.order-type').forEach((button) => {
    button.addEventListener('click', () => {
      $$('.order-type').forEach((item) => item.classList.toggle('active', item === button));
      renderStores(button.textContent.trim());
      if (mapLabel) mapLabel.textContent = `${button.textContent.trim()} stores are highlighted on the map`;
    });
  });
});
