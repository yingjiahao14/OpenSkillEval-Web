const featuredProducts = [
  {
    name: 'Organic Maple Granola',
    description: 'Crunchy clusters with real maple syrup and toasted oats',
    price: '$3.99',
    image: "./assets/prod-granola.jpg",
    tag: 'Breakfast',
  },
  {
    name: 'Everything But The Bagel Seasoning',
    description: 'A savory blend of sesame, garlic, onion & poppy seeds',
    price: '$2.49',
    image: "./assets/prod-seasoning.jpg",
    tag: 'Pantry',
  },
  {
    name: 'Dark Chocolate Peanut Butter Cups',
    description: 'Rich dark chocolate with creamy peanut butter filling',
    price: '$3.49',
    image: "./assets/prod-cups.jpg",
    tag: 'Treat',
  },
  {
    name: 'Cauliflower Gnocchi',
    description: 'Light, pillowy gnocchi made with real cauliflower',
    price: '$2.99',
    image: "./assets/prod-gnocchi.jpg",
    tag: 'Frozen',
  },
  {
    name: 'Mandarin Orange Chicken',
    description: 'Crispy chicken bites in a sweet & tangy mandarin sauce',
    price: '$4.99',
    image: "./assets/prod-chicken.jpg",
    tag: 'Dinner',
  },
  {
    name: 'Unexpected Cheddar Cheese',
    description: 'Aged cheddar with crystalline crunch and complex flavor',
    price: '$3.99',
    image: "./assets/prod-cheddar.jpg",
    tag: 'Dairy',
  },
  {
    name: 'Spicy Mango Lemonade',
    description: 'Tropical mango with a kick of chili and fresh lemon',
    price: '$2.79',
    image: "./assets/prod-lemonade.jpg",
    tag: 'Sip',
  },
  {
    name: 'Truffle Marcona Almonds',
    description: 'Roasted marcona almonds dusted with black truffle salt',
    price: '$4.49',
    image: "./assets/prod-almonds.jpg",
    tag: 'Snack',
  },
];

const sampleStores = [
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

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.dataset.open = open ? 'true' : 'false';
  }

  setOpen(false);

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  menu.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName === 'A') setOpen(false);
  });

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Node)) return;
    if (!menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
}

function initFeaturedCarousel() {
  const track = document.querySelector('[data-carousel-track]');
  const viewport = document.querySelector('[data-carousel-viewport]');
  if (!track || !viewport) return;

  track.innerHTML = featuredProducts
    .map(
      (p) => `
      <article class="product-card" role="group" aria-label="${escapeHtml(p.name)}">
        <div class="product-img" style="--img: url('${escapeAttr(p.image)}')"></div>
        <div class="product-body">
          <div>
            <div class="product-title">${escapeHtml(p.name)}</div>
            <p class="product-desc">${escapeHtml(p.description)}</p>
          </div>
          <div class="product-foot">
            <span class="price">${escapeHtml(p.price)}</span>
            <span class="chip">${escapeHtml(p.tag)}</span>
          </div>
        </div>
      </article>
    `.trim(),
    )
    .join('');

  let index = 0;
  let perView = 3;

  function measure() {
    const card = track.querySelector('.product-card');
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width;
    const viewportWidth = viewport.getBoundingClientRect().width;
    perView = clampNumber(Math.round(viewportWidth / cardWidth), 1, 4);
  }

  function update() {
    const card = track.querySelector('.product-card');
    if (!card) return;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '14') || 14;
    const step = card.getBoundingClientRect().width + gap;
    const maxIndex = Math.max(0, featuredProducts.length - perView);
    index = clampNumber(index, 0, maxIndex);
    track.style.transform = `translateX(${-index * step}px)`;
  }

  function goNext() {
    index += 1;
    update();
  }

  function goPrev() {
    index -= 1;
    update();
  }

  document.querySelector('[data-carousel-btn="next"]')?.addEventListener('click', goNext);
  document.querySelector('[data-carousel-btn="prev"]')?.addEventListener('click', goPrev);

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  });

  // Shift + wheel scroll feels carousel-ish without trapping normal scroll.
  viewport.addEventListener(
    'wheel',
    (e) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      if (e.deltaY > 0 || e.deltaX > 0) goNext();
      else goPrev();
    },
    { passive: false },
  );

  const ro = new ResizeObserver(() => {
    measure();
    update();
  });
  ro.observe(viewport);
  measure();
  update();
}

function initStoreLocator() {
  const form = document.getElementById('store-form');
  const zip = document.getElementById('zip');
  const results = document.getElementById('store-results');
  const meta = document.getElementById('results-meta');
  if (!form || !zip || !results || !meta) return;

  function renderStores(zipValue) {
    results.innerHTML = '';

    const stores = sampleStores;
    meta.textContent = `Showing ${stores.length} results near ${zipValue}`;

    for (const s of stores) {
      const el = document.createElement('div');
      el.className = 'store-card';
      el.innerHTML = `
        <div>
          <div class="store-name">${escapeHtml(s.name)}</div>
          <div class="store-addr">${escapeHtml(s.address)}</div>
        </div>
        <div class="store-meta">
          <div class="store-hours">${escapeHtml(s.hours)}</div>
          <div class="store-dist">${escapeHtml(s.distance)}</div>
        </div>
      `.trim();
      results.appendChild(el);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = String(zip.value || '').trim();
    const zipValue = raw.length ? raw : 'your area';
    renderStores(zipValue);
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const email = document.getElementById('email');
  const note = document.getElementById('newsletter-note');
  if (!form || !email || !note) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = String(email.value || '').trim();
    if (!value) return;
    note.textContent = "Thanks for subscribing! Check your inbox for a welcome treat.";
    form.reset();
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttr(str) {
  // Minimal attr escaping for URL strings.
  return String(str).replaceAll('"', '%22').replaceAll("'", '%27');
}

initNav();
initFeaturedCarousel();
initStoreLocator();
initNewsletter();

