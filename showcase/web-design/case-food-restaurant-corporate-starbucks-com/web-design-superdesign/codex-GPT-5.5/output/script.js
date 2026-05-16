const page = document.body.dataset.page;

function initHeader() {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.mobile-menu');
  if (!header || !button) return;
  button.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
}

function initFooterAccordions() {
  document.querySelectorAll('.footer-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      if (!window.matchMedia('(max-width: 920px)').matches) return;
      const section = toggle.closest('.footer-section');
      const open = section.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  });
}

function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  const agree = document.querySelector('[data-cookie-agree]');
  if (!banner || !agree) return;
  if (localStorage.getItem('greenbeanCookies') !== 'accepted') banner.classList.add('show');
  agree.addEventListener('click', () => {
    localStorage.setItem('greenbeanCookies', 'accepted');
    banner.classList.remove('show');
  });
}

function initRewardsTabs() {
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
      panels.forEach((panel) => panel.classList.toggle('active', panel.id === target));
    });
  });
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.track');
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    if (!track || !prev || !next) return;
    let index = 0;
    const update = () => {
      const card = track.querySelector('.gift-card');
      const cardWidth = card ? card.getBoundingClientRect().width + 18 : 278;
      const visible = Math.max(1, Math.floor(carousel.getBoundingClientRect().width / cardWidth));
      const max = Math.max(0, track.children.length - visible);
      index = Math.min(Math.max(index, 0), max);
      track.style.transform = `translateX(${-index * cardWidth}px)`;
      prev.disabled = index === 0;
      next.disabled = index === max;
    };
    prev.addEventListener('click', () => { index -= 1; update(); });
    next.addEventListener('click', () => { index += 1; update(); });
    window.addEventListener('resize', update);
    update();
  });
}

function initStoreLocator() {
  const input = document.querySelector('#store-search');
  const suggestions = document.querySelector('.suggestions');
  const mapStatus = document.querySelector('.map-status');
  const filterButton = document.querySelector('[data-filter-toggle]');
  const filterPanel = document.querySelector('.filter-panel');
  const orderButtons = document.querySelectorAll('[data-order-type]');
  const resultMode = document.querySelectorAll('[data-result-mode]');
  if (!input) return;

  const suggestionData = ['Downtown GreenBean — 0.4 mi', 'Riverside Café — 1.1 mi', 'Oak & 5th Coffeehouse — 1.8 mi'];
  input.addEventListener('input', () => {
    const value = input.value.trim();
    suggestions.innerHTML = '';
    if (!value) {
      suggestions.classList.remove('active');
      mapStatus.textContent = 'Map view: enter a city, zip code, or address to update nearby GreenBean stores.';
      return;
    }
    suggestionData.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = item;
      button.addEventListener('click', () => {
        input.value = item.split(' — ')[0];
        suggestions.classList.remove('active');
        mapStatus.textContent = `Map updated for ${input.value}: showing 3 nearby stores with pins.`;
      });
      suggestions.appendChild(button);
    });
    suggestions.classList.add('active');
    mapStatus.textContent = `Searching for “${value}” — suggested stores are ready below.`;
  });

  filterButton.addEventListener('click', () => {
    const open = filterPanel.classList.toggle('active');
    filterButton.setAttribute('aria-expanded', String(open));
  });

  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.orderType;
      orderButtons.forEach((item) => item.classList.toggle('active', item === button));
      resultMode.forEach((item) => { item.textContent = type; });
      mapStatus.textContent = `Map updated for ${type.toLowerCase()} availability at nearby stores.`;
    });
  });
}

initHeader();
initFooterAccordions();
initCookieBanner();
if (page === 'rewards') initRewardsTabs();
if (page === 'gift') initCarousels();
if (page === 'store-locator') initStoreLocator();
