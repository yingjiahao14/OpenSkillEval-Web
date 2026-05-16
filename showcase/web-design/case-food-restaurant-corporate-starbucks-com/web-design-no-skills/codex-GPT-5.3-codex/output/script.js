function initFooterAccordion() {
  const toggles = document.querySelectorAll('[data-footer-toggle]');
  toggles.forEach((button) => {
    button.addEventListener('click', () => {
      if (window.innerWidth > 640) return;
      button.parentElement.classList.toggle('open');
    });
  });
}

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const agree = document.getElementById('cookie-agree');
  if (!banner || !agree) return;
  agree.addEventListener('click', () => banner.style.display = 'none');
}

function initTabs() {
  const groups = document.querySelectorAll('[data-tab-group]');
  groups.forEach((group) => {
    const buttons = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-panel]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.tab;
        buttons.forEach((b) => b.classList.toggle('active', b === button));
        panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === key));
      });
    });
  });
}

function initCarousel() {
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.track');
    const slides = Array.from(track.children);
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    let index = 0;
    const visible = () => window.innerWidth < 640 ? 1 : (window.innerWidth < 920 ? 2 : 3);
    function render() {
      const max = Math.max(0, slides.length - visible());
      index = Math.max(0, Math.min(index, max));
      const pct = 100 / visible();
      track.style.transform = `translateX(-${index * pct}%)`;
    }
    prev?.addEventListener('click', () => { index--; render(); });
    next?.addEventListener('click', () => { index++; render(); });
    window.addEventListener('resize', render);
    render();
  });
}

function initStoreLocator() {
  const input = document.getElementById('store-search');
  const suggestions = document.getElementById('suggestions');
  const filterBtn = document.getElementById('filter-toggle');
  const panel = document.getElementById('filter-panel');
  const results = document.getElementById('store-results');
  const orderButtons = document.querySelectorAll('[data-order-type]');
  if (!input) return;

  const stores = [
    { name: 'GreenBean Downtown', loc: 'Seattle, WA 98101', type: 'pickup', features: 'Drive-thru · Mobile order' },
    { name: 'GreenBean Lakeside', loc: 'Seattle, WA 98109', type: 'delivery', features: 'Delivery · Wi‑Fi' },
    { name: 'GreenBean Pine Street', loc: 'Bellevue, WA 98004', type: 'pickup', features: 'Mobile order · Patio' },
    { name: 'GreenBean Capitol', loc: 'Seattle, WA 98122', type: 'delivery', features: 'Delivery · Open late' }
  ];
  let activeType = 'pickup';

  function renderResults(term = '') {
    const value = term.toLowerCase();
    const filtered = stores.filter(s => s.type === activeType && (s.name.toLowerCase().includes(value) || s.loc.toLowerCase().includes(value)));
    results.innerHTML = filtered.length ? filtered.map(s => `<div class="card"><strong>${s.name}</strong><p>${s.loc}</p><small>${s.features}</small></div>`).join('') : '<div class="card">No stores found for this search.</div>';
  }

  input.addEventListener('input', () => {
    const value = input.value.trim();
    if (!value) { suggestions.classList.remove('show'); renderResults(''); return; }
    const picks = ['Seattle, WA', '98101', 'Bellevue, WA', 'Portland, OR'].filter(x => x.toLowerCase().includes(value.toLowerCase()));
    suggestions.innerHTML = picks.map(p => `<button type="button">${p}</button>`).join('');
    suggestions.classList.toggle('show', picks.length > 0);
    suggestions.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        input.value = button.textContent;
        suggestions.classList.remove('show');
        renderResults(button.textContent);
      });
    });
    renderResults(value);
  });

  filterBtn?.addEventListener('click', () => panel.hidden = !panel.hidden);

  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeType = button.dataset.orderType;
      orderButtons.forEach(b => b.classList.toggle('active', b === button));
      renderResults(input.value);
    });
  });

  renderResults('');
}

document.addEventListener('DOMContentLoaded', () => {
  initFooterAccordion();
  initCookieBanner();
  initTabs();
  initCarousel();
  initStoreLocator();
});
