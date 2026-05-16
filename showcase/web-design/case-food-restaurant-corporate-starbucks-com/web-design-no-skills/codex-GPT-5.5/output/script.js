const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

$('.mobile-toggle')?.addEventListener('click', () => $('.site-header')?.classList.toggle('open'));

$$('.footer-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.footer-col')?.classList.toggle('open');
  });
});

$('#agreeCookies')?.addEventListener('click', () => {
  const banner = $('#cookieBanner');
  if (banner) banner.hidden = true;
  try { localStorage.setItem('greenbeanCookies', 'agreed'); } catch {}
});
try {
  if (localStorage.getItem('greenbeanCookies') === 'agreed' && $('#cookieBanner')) $('#cookieBanner').hidden = true;
} catch {}

const rewards = {
  25: { reward: '$1 off a drink customization', detail: 'Add an espresso shot, syrup, or cloud-like cold foam to make your regular order feel special.', value: 'Up to $1' },
  60: { reward: 'Up to $2 off your order', detail: 'Take a little perk off any eligible order when you need a quick coffee run.', value: 'Up to $2' },
  100: { reward: 'Brewed coffee, tea, bakery item and more', detail: 'Enjoy a warm cup, a favorite pastry, packaged snacks, or other café classics.', value: 'Up to $6' },
  200: { reward: 'Handcrafted drink or hot breakfast', detail: 'Redeem for signature espresso drinks, Refreshers, matcha, breakfast sandwiches, and more.', value: 'Up to $10' },
  300: { reward: 'Sandwich, protein box or packaged coffee', detail: 'Fuel up with lunch favorites or bring GreenBean home with packaged coffee.', value: 'Up to $16' },
  400: { reward: 'Select GreenBean merchandise', detail: 'Treat yourself to tumblers, mugs, and seasonal café gear.', value: 'Up to $20' }
};
$$('.star-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    $$('.star-tab').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const stars = tab.dataset.stars;
    const data = rewards[stars];
    if (!data) return;
    $('#rewardStars').textContent = `${stars}★`;
    $('#rewardTitle').textContent = data.reward;
    $('#rewardDetail').textContent = data.detail;
    $('#rewardValue').textContent = data.value;
  });
});

$$('[data-carousel]').forEach((carousel) => {
  const track = $('.carousel-track', carousel);
  const next = $('[data-next]', carousel);
  const prev = $('[data-prev]', carousel);
  const amount = () => Math.min(track.clientWidth * 0.85, 560);
  next?.addEventListener('click', () => track.scrollBy({ left: amount(), behavior: 'smooth' }));
  prev?.addEventListener('click', () => track.scrollBy({ left: -amount(), behavior: 'smooth' }));
});

const stores = [
  { name: 'GreenBean Market Street', address: '118 Market St · 0.4 mi', pickup: true, delivery: true },
  { name: 'GreenBean Riverwalk', address: '22 Riverwalk Ave · 0.9 mi', pickup: true, delivery: false },
  { name: 'GreenBean Garden Plaza', address: '805 Garden Pl · 1.6 mi', pickup: true, delivery: true }
];
let orderType = 'pickup';
function renderStores(query = '') {
  const list = $('#storeResults');
  if (!list) return;
  const filtered = stores.filter((store) => store[orderType]).filter((store) => `${store.name} ${store.address}`.toLowerCase().includes(query.toLowerCase()) || !query);
  list.innerHTML = filtered.map((store) => `<article class="store-card"><h3>${store.name}</h3><p class="meta">${store.address}</p><p>${orderType === 'pickup' ? 'Order ahead pickup available now.' : 'Delivery available to your area.'}</p><a class="btn btn-primary" href="#">Select store</a></article>`).join('') || '<p class="lead">No matching stores yet. Try a nearby city or ZIP code.</p>';
  const status = $('#mapStatusText');
  if (status) status.textContent = `${filtered.length} ${orderType} result${filtered.length === 1 ? '' : 's'} shown`;
}
$('#storeSearch')?.addEventListener('input', (event) => {
  const value = event.target.value.trim();
  $('#suggestions')?.classList.toggle('show', value.length > 0);
  renderStores(value);
});
$$('.suggestion').forEach((button) => button.addEventListener('click', () => {
  const input = $('#storeSearch');
  input.value = button.textContent;
  $('#suggestions')?.classList.remove('show');
  renderStores(input.value);
}));
$('#filterToggle')?.addEventListener('click', () => $('#filterPanel')?.classList.toggle('open'));
$$('[data-order]').forEach((button) => button.addEventListener('click', () => {
  orderType = button.dataset.order;
  $$('[data-order]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  renderStores($('#storeSearch')?.value || '');
}));
renderStores();
