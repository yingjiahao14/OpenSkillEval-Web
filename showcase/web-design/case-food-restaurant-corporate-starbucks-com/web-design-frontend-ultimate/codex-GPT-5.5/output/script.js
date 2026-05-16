document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.hamburger');
  if (menuButton && header) menuButton.addEventListener('click', () => header.classList.toggle('open'));

  document.querySelectorAll('[data-footer-toggle]').forEach((button) => {
    button.addEventListener('click', () => button.closest('.footer-col')?.classList.toggle('open'));
  });

  const cookie = document.querySelector('.cookie');
  const agree = document.querySelector('[data-cookie-agree]');
  if (cookie && localStorage.getItem('greenbean-cookie-ok') === 'yes') cookie.classList.add('hidden');
  if (agree && cookie) agree.addEventListener('click', () => {
    localStorage.setItem('greenbean-cookie-ok', 'yes');
    cookie.classList.add('hidden');
  });

  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const buttons = tabs.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll(`[data-tab-panel-group="${tabs.dataset.tabs}"]`);
    buttons.forEach((button) => button.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      button.classList.add('active');
      document.querySelector(`[data-tab-panel="${button.dataset.tab}"]`)?.classList.add('active');
    }));
  });

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const cards = carousel.querySelectorAll('.gift-card');
    let index = 0;
    const update = () => {
      if (!track || !cards.length) return;
      const cardWidth = cards[0].getBoundingClientRect().width + 16;
      const visible = window.innerWidth < 720 ? 1 : window.innerWidth < 980 ? 2 : 3;
      const max = Math.max(0, cards.length - visible);
      index = Math.min(Math.max(index, 0), max);
      track.style.transform = `translateX(${-index * cardWidth}px)`;
    };
    carousel.querySelector('[data-next]')?.addEventListener('click', () => { index += 1; update(); });
    carousel.querySelector('[data-prev]')?.addEventListener('click', () => { index -= 1; update(); });
    window.addEventListener('resize', update);
    update();
  });

  const search = document.querySelector('[data-store-search]');
  const suggestions = document.querySelector('.suggestions');
  const mapLabel = document.querySelector('.map-label strong');
  if (search && suggestions) {
    search.addEventListener('input', () => {
      const hasValue = search.value.trim().length > 0;
      suggestions.classList.toggle('show', hasValue);
      if (mapLabel) mapLabel.textContent = hasValue ? `Showing results near ${search.value}` : 'Three nearby cafés found';
    });
    suggestions.querySelectorAll('.suggestion').forEach((item) => item.addEventListener('click', () => {
      search.value = item.textContent.trim();
      suggestions.classList.remove('show');
      if (mapLabel) mapLabel.textContent = `Showing results near ${search.value}`;
    }));
  }

  document.querySelector('[data-filter-toggle]')?.addEventListener('click', () => {
    document.querySelector('.filter-panel')?.classList.toggle('show');
  });

  document.querySelectorAll('[data-order-type]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-order-type]').forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      document.querySelectorAll('[data-order-copy]').forEach((copy) => {
        copy.textContent = button.dataset.orderType === 'Delivery' ? 'Delivery available in 25–35 min' : 'Pickup ready in 8–12 min';
      });
    });
  });
});
