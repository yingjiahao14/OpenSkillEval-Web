const byId = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {
  const cookie = byId('cookieBanner');
  const agree = byId('cookieAgree');
  if (agree && cookie) agree.addEventListener('click', () => cookie.setAttribute('hidden', 'hidden'));

  const footerButtons = document.querySelectorAll('.accordion-toggle');
  footerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.closest('.footer-section');
      section?.classList.toggle('open');
    });
  });

  const tabs = document.querySelectorAll('[data-tab-target]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const group = tab.closest('[data-tab-group]');
      if (!group) return;
      group.querySelectorAll('.tab').forEach((t) => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');
      group.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
      const target = group.querySelector(`#${tab.dataset.tabTarget}`);
      if (target) target.classList.add('active');
    });
  });

  const setupCarousel = (selector) => {
    document.querySelectorAll(selector).forEach((carousel) => {
      const track = carousel.querySelector('.carousel-track');
      const prev = carousel.querySelector('[data-prev]');
      const next = carousel.querySelector('[data-next]');
      if (!track || !prev || !next) return;
      const step = () => track.clientWidth + 16;
      next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
      prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    });
  };
  setupCarousel('[data-carousel]');

  const searchInput = byId('storeSearch');
  const suggestions = byId('suggestions');
  const resultsTitle = byId('resultsTitle');
  const stores = document.querySelectorAll('[data-store]');
  const filterBtn = byId('filterBtn');
  const filterPanel = byId('filterPanel');
  const orderButtons = document.querySelectorAll('[data-order-type]');
  const sampleSuggestions = ['Seattle, WA', 'Portland, OR', 'San Diego, CA', 'Austin, TX', 'Chicago, IL'];

  if (searchInput && suggestions) {
    searchInput.addEventListener('input', () => {
      const value = searchInput.value.trim().toLowerCase();
      if (!value) {
        suggestions.classList.remove('show');
        return;
      }
      suggestions.innerHTML = '';
      sampleSuggestions
        .filter((city) => city.toLowerCase().includes(value))
        .slice(0, 4)
        .forEach((city) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = city;
          btn.addEventListener('click', () => {
            searchInput.value = city;
            suggestions.classList.remove('show');
            if (resultsTitle) resultsTitle.textContent = `Stores near ${city}`;
          });
          suggestions.appendChild(btn);
        });
      if (!suggestions.children.length) {
        const empty = document.createElement('button');
        empty.type = 'button';
        empty.textContent = 'No matches yet';
        suggestions.appendChild(empty);
      }
      suggestions.classList.add('show');
    });
  }

  if (filterBtn && filterPanel) filterBtn.addEventListener('click', () => filterPanel.toggleAttribute('hidden'));

  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      orderButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const mode = button.dataset.orderType;
      stores.forEach((store) => {
        const isDelivery = store.dataset.delivery === 'yes';
        const show = mode === 'pickup' ? true : isDelivery;
        store.style.display = show ? 'block' : 'none';
      });
    });
  });
});
