const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function initNav() {
  const nav = $('.nav');
  const toggle = $('.mobile-toggle');
  if (nav && toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

function initCookie() {
  const banner = $('.cookie');
  const agree = $('[data-cookie-agree]');
  if (!banner || !agree) return;
  if (localStorage.getItem('greenbeanCookieOk') === 'yes') banner.classList.add('hide');
  agree.addEventListener('click', () => {
    localStorage.setItem('greenbeanCookieOk', 'yes');
    banner.classList.add('hide');
  });
}

function initFooterAccordions() {
  $$('.footer-col button').forEach((button) => {
    button.addEventListener('click', () => button.closest('.footer-col').classList.toggle('open'));
  });
}

function initRewardsTabs() {
  const tabs = $$('.tab[data-stars]');
  const panel = $('#redemptionPanel');
  if (!tabs.length || !panel) return;
  const data = {
    '25': ['25 Stars', '$1 off a drink customization', 'Add an espresso shot, syrup, or cold foam to make your go-to sip feel special.', 'Up to $1'],
    '60': ['60 Stars', 'Up to $2 off your order', 'Use a small reward toward any eligible order when you want a quick treat.', 'Up to $2'],
    '100': ['100 Stars', 'Coffee, tea, bakery and snacks', 'Redeem for brewed coffee or tea, bakery items, packaged snacks and more.', 'Up to $6'],
    '200': ['200 Stars', 'Handcrafted drink or hot breakfast', 'Choose a crafted beverage or a warm breakfast favorite on your next visit.', 'Up to $10'],
    '300': ['300 Stars', 'Lunch or packaged coffee', 'Pick a sandwich, protein box, or packaged coffee to keep the ritual going.', 'Up to $16'],
    '400': ['400 Stars', 'Select GreenBean merchandise', 'Bring home tumblers, mugs, and select GreenBean gear.', 'Up to $20']
  };
  function render(stars) {
    const [label, title, body, value] = data[stars];
    tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.stars === stars));
    panel.innerHTML = `<div><span class="eyebrow">${label}</span><h3>${title}</h3><p>${body}</p></div><div class="value"><span>Value</span><strong>${value}</strong></div>`;
  }
  tabs.forEach((tab) => tab.addEventListener('click', () => render(tab.dataset.stars)));
  render('25');
}

function initCarousels() {
  $$('[data-carousel]').forEach((block) => {
    const track = $('.carousel-track', block);
    const next = $('[data-next]', block);
    const prev = $('[data-prev]', block);
    if (!track) return;
    const amount = () => Math.max(240, track.clientWidth * .72);
    next?.addEventListener('click', () => track.scrollBy({ left: amount(), behavior: 'smooth' }));
    prev?.addEventListener('click', () => track.scrollBy({ left: -amount(), behavior: 'smooth' }));
  });
}

function initStoreLocator() {
  const input = $('#storeSearch');
  const suggestions = $('#suggestions');
  const filterButton = $('#filterButton');
  const filterPanel = $('#filterPanel');
  const typeButtons = $$('[data-order-type]');
  const results = $('#storeResults');
  const label = $('#mapLabel');
  if (!input || !results) return;
  const stores = [
    ['GreenBean Market Street', '101 Market Street, Downtown', 'Open until 8:30 PM', ['Mobile order', 'Pickup', 'Nitro Cold Brew']],
    ['GreenBean Garden District', '24 Magnolia Ave, Garden District', 'Open until 9:00 PM', ['Drive-thru', 'Delivery', 'Outdoor seating']],
    ['GreenBean Riverside', '808 Riverwalk Lane, Riverside', 'Open until 7:00 PM', ['Pickup', 'Bakery', 'Reserve coffee']]
  ];
  let orderType = 'Pickup';
  function render(query = '') {
    const suffix = query ? ` near “${query}”` : '';
    results.innerHTML = stores.map((store, index) => `<article class="store-card"><strong>${store[0]}</strong><p>${store[1]}</p><div class="meta">${store[2]} · ${orderType}${suffix}</div><div class="features">${store[3].map((feature) => `<span>${feature}</span>`).join('')}</div><button class="btn btn-light" style="margin-top:14px">Order here</button></article>`).join('');
    if (label) label.innerHTML = `<strong>${stores.length} stores found</strong><p>${orderType} options${suffix}. Map pins update as you search.</p>`;
  }
  input.addEventListener('input', () => {
    const query = input.value.trim();
    suggestions.classList.toggle('open', query.length > 0);
    suggestions.innerHTML = query ? `<strong>Suggestions</strong><p>${query} Downtown</p><p>${query} Garden District</p><p>${query} Riverside</p>` : '';
    render(query);
  });
  filterButton?.addEventListener('click', () => filterPanel.classList.toggle('open'));
  typeButtons.forEach((button) => button.addEventListener('click', () => {
    orderType = button.dataset.orderType;
    typeButtons.forEach((other) => other.classList.toggle('active', other === button));
    render(input.value.trim());
  }));
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCookie();
  initFooterAccordions();
  initRewardsTabs();
  initCarousels();
  initStoreLocator();
});
