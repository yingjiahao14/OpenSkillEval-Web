const featuredProducts = [
  {
    name: 'Organic Maple Granola',
    description: 'Crunchy clusters with real maple syrup and toasted oats',
    price: '$3.99',
    image:
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Everything But The Bagel Seasoning',
    description: 'A savory blend of sesame, garlic, onion & poppy seeds',
    price: '$2.49',
    image:
      'https://images.unsplash.com/photo-1528823872057-9c018a7f0b5e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Dark Chocolate Peanut Butter Cups',
    description: 'Rich dark chocolate with creamy peanut butter filling',
    price: '$3.49',
    image:
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Cauliflower Gnocchi',
    description: 'Light, pillowy gnocchi made with real cauliflower',
    price: '$2.99',
    image:
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Mandarin Orange Chicken',
    description: 'Crispy chicken bites in a sweet & tangy mandarin sauce',
    price: '$4.99',
    image:
      'https://images.unsplash.com/photo-1604909052743-94e158d4a8d4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Unexpected Cheddar Cheese',
    description: 'Aged cheddar with crystalline crunch and complex flavor',
    price: '$3.99',
    image:
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Spicy Mango Lemonade',
    description: 'Tropical mango with a kick of chili and fresh lemon',
    price: '$2.79',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Truffle Marcona Almonds',
    description: 'Roasted marcona almonds dusted with black truffle salt',
    price: '$4.49',
    image:
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
  },
];

const storesChicago = [
  {
    name: 'Fresh Pantry — Lincoln Park',
    address: '2140 N. Halsted St, Chicago, IL 60614',
    hours: '8am – 9pm Daily',
    distance: '0.8 mi',
  },
  {
    name: 'Fresh Pantry — Wicker Park',
    address: '1840 W. North Ave, Chicago, IL 60622',
    hours: '8am – 9pm Daily',
    distance: '1.4 mi',
  },
  {
    name: 'Fresh Pantry — Lakeview',
    address: '3745 N. Lincoln Ave, Chicago, IL 60613',
    hours: '8am – 9pm Daily',
    distance: '2.1 mi',
  },
];

function $(selector) {
  return document.querySelector(selector);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function buildProductCard(product) {
  return `
    <article class="product" aria-label="${escapeHtml(product.name)}">
      <div class="thumb" aria-hidden="true">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
      </div>
      <div class="body">
        <h3 class="name">${escapeHtml(product.name)}</h3>
        <p class="desc">${escapeHtml(product.description)}</p>
        <div class="price-row">
          <span class="price">${escapeHtml(product.price)}</span>
          <span class="pill">Staff Pick</span>
        </div>
      </div>
    </article>
  `;
}

function initCarousel() {
  const track = $('#productTrack');
  const prev = $('#carouselPrev');
  const next = $('#carouselNext');

  if (!track || !prev || !next) return;

  track.innerHTML = featuredProducts.map(buildProductCard).join('');

  function scrollByCards(direction) {
    const card = track.querySelector('.product');
    if (!card) return;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    const delta = (card.getBoundingClientRect().width + gap) * 2.1;
    track.scrollBy({ left: direction * delta, behavior: 'smooth' });
  }

  function updateDisabled() {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const left = Math.round(track.scrollLeft);
    prev.disabled = left <= 0;
    next.disabled = left >= Math.round(maxScrollLeft);
  }

  prev.addEventListener('click', () => scrollByCards(-1));
  next.addEventListener('click', () => scrollByCards(1));
  track.addEventListener('scroll', () => window.requestAnimationFrame(updateDisabled));
  window.addEventListener('resize', updateDisabled);

  updateDisabled();
}

function initStoreLocator() {
  const input = $('#zipInput');
  const button = $('#zipSearch');
  const results = $('#storeResults');
  const helper = $('#storeHelper');

  if (!input || !button || !results || !helper) return;

  function renderRows(rows, zipLabel) {
    results.innerHTML = rows
      .map(
        (s) => `
        <div class="store" role="listitem">
          <div><strong>${escapeHtml(s.name)}</strong></div>
          <div>${escapeHtml(s.address)}</div>
          <div>${escapeHtml(s.hours)}</div>
          <div class="dist">${escapeHtml(s.distance)}</div>
        </div>
      `,
      )
      .join('');

    helper.textContent = `Showing stores near ${zipLabel}. (Mock results)`;
  }

  function onSearch() {
    const raw = (input.value || '').trim();

    const zipOk = /^\d{5}(-\d{4})?$/.test(raw);
    const zipLabel = zipOk ? raw : 'your area';
    const rows = storesChicago;

    renderRows(rows, zipLabel);
  }

  button.addEventListener('click', onSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onSearch();
  });
}

function initNewsletter() {
  const email = $('#emailInput');
  const button = $('#emailSubscribe');
  const toast = $('#newsletterToast');

  if (!email || !button || !toast) return;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');
  }

  function onSubscribe() {
    const value = (email.value || '').trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!ok) {
      showToast('Please enter a valid email address.');
      email.focus();
      return;
    }
    showToast("Thanks for subscribing! Check your inbox for a welcome treat.");
    email.value = '';
  }

  button.addEventListener('click', onSubscribe);
  email.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onSubscribe();
  });
}

function initSmoothNav() {
  const links = document.querySelectorAll('a[data-scroll]');
  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothNav();
  initCarousel();
  initStoreLocator();
  initNewsletter();
});

