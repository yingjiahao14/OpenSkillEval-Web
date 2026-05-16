const nav = document.querySelector('.nav');
document.querySelectorAll('[data-menu-toggle]').forEach((button) => {
  button.addEventListener('click', () => nav?.classList.toggle('open'));
});

document.querySelectorAll('.footer-heading').forEach((heading) => {
  heading.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 640px)').matches) {
      heading.closest('.footer-section')?.classList.toggle('open');
    }
  });
});

const cookie = document.querySelector('[data-cookie-banner]');
if (cookie && localStorage.getItem('greenbean-cookie-ok') === 'yes') cookie.classList.add('hidden');
document.querySelector('[data-cookie-agree]')?.addEventListener('click', () => {
  localStorage.setItem('greenbean-cookie-ok', 'yes');
  cookie?.classList.add('hidden');
});

const tabs = document.querySelectorAll('[role="tab"]');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const group = tab.closest('.redemption-wrap');
    group?.querySelectorAll('[role="tab"]').forEach((item) => item.setAttribute('aria-selected', 'false'));
    group?.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel?.classList.add('active');
  });
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  let index = 0;
  const track = carousel.querySelector('.carousel-track');
  const cards = Array.from(carousel.querySelectorAll('.gift-card'));
  const move = (direction) => {
    const visible = window.matchMedia('(max-width: 640px)').matches ? 1 : window.matchMedia('(max-width: 980px)').matches ? 2 : 3;
    const max = Math.max(0, cards.length - visible);
    index = Math.min(max, Math.max(0, index + direction));
    const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
    track.style.transform = `translateX(${-index * (cardWidth + 16)}px)`;
  };
  carousel.querySelector('[data-prev]')?.addEventListener('click', () => move(-1));
  carousel.querySelector('[data-next]')?.addEventListener('click', () => move(1));
  window.addEventListener('resize', () => { index = 0; track.style.transform = 'translateX(0)'; });
});

const filterButton = document.querySelector('[data-filter-toggle]');
filterButton?.addEventListener('click', () => {
  document.querySelector('[data-filter-panel]')?.classList.toggle('open');
});

const searchInput = document.querySelector('[data-store-search]');
searchInput?.addEventListener('input', () => {
  const suggestions = document.querySelector('[data-suggestions]');
  const query = searchInput.value.trim();
  if (!suggestions) return;
  if (query.length) {
    suggestions.classList.add('open');
    suggestions.innerHTML = `<strong>Suggestions for “${query}”</strong><p>Downtown ${query} · ${query} Market Square · ${query} Station</p>`;
    document.querySelectorAll('.store-card').forEach((card, i) => {
      card.style.outline = i === 0 ? '3px solid oklch(69% 0.118 63 / .45)' : 'none';
    });
  } else {
    suggestions.classList.remove('open');
  }
});

document.querySelectorAll('[data-order-type]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-order-type]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const type = button.dataset.orderType;
    document.querySelector('[data-results-label]').textContent = type === 'delivery' ? 'Stores delivering near you' : 'Nearby pickup stores';
    document.querySelectorAll('.availability').forEach((item) => {
      item.textContent = type === 'delivery' ? 'Delivery estimate: 25–35 min' : 'Pickup ready in 8–12 min';
    });
  });
});
