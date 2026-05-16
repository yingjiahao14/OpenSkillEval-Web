(function () {
  const cookie = document.getElementById('cookieBanner');
  const agree = document.getElementById('cookieAgree');
  if (cookie && agree) {
    if (localStorage.getItem('gb_cookie_ok') === '1') cookie.style.display = 'none';
    agree.addEventListener('click', () => {
      localStorage.setItem('gb_cookie_ok', '1');
      cookie.style.display = 'none';
    });
  }

  const footerCols = document.querySelectorAll('[data-footer-col]');
  footerCols.forEach((col) => {
    const btn = col.querySelector('.accordion-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => col.classList.toggle('open'));
  });

  const rewardsTabs = document.querySelectorAll('[data-reward-tab]');
  const rewardPanels = document.querySelectorAll('[data-reward-panel]');
  rewardsTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-reward-tab');
      rewardsTabs.forEach((t) => t.classList.remove('active'));
      rewardPanels.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector('[data-reward-panel="' + key + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  function initCarousel(root) {
    const track = root.querySelector('.carousel-track');
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    if (!track || !prev || !next) return;
    const groups = JSON.parse(track.getAttribute('data-groups') || '[]');
    let idx = 0;
    function render() {
      const set = groups[idx] || [];
      track.innerHTML = set.map((item) => `<article class="slide"><h3>${item.title}</h3><p>${item.copy}</p><button class="btn btn-secondary">Choose</button></article>`).join('');
    }
    prev.addEventListener('click', () => { idx = (idx - 1 + groups.length) % groups.length; render(); });
    next.addEventListener('click', () => { idx = (idx + 1) % groups.length; render(); });
    render();
  }
  document.querySelectorAll('[data-carousel]').forEach(initCarousel);

  const searchInput = document.getElementById('storeSearch');
  const suggestions = document.getElementById('suggestions');
  const results = document.getElementById('storeResults');
  const mapLabel = document.getElementById('mapLabel');
  const filterToggle = document.getElementById('filterToggle');
  const filterPanel = document.getElementById('filterPanel');
  const orderPills = document.querySelectorAll('[data-order-type]');

  const storeData = [
    { name: 'GreenBean Downtown', area: 'Seattle, WA', distance: '0.4 mi', pickup: true, delivery: true },
    { name: 'GreenBean Capitol Hill', area: 'Seattle, WA', distance: '1.2 mi', pickup: true, delivery: false },
    { name: 'GreenBean Fremont', area: 'Seattle, WA', distance: '3.1 mi', pickup: true, delivery: true },
    { name: 'GreenBean Bellevue', area: 'Bellevue, WA', distance: '5.8 mi', pickup: true, delivery: true },
    { name: 'GreenBean U-District', area: 'Seattle, WA', distance: '2.7 mi', pickup: true, delivery: false }
  ];
  let activeOrder = 'pickup';

  function renderStores(query) {
    if (!results) return;
    const q = (query || '').toLowerCase();
    const filtered = storeData.filter((s) => {
      const matchesQ = !q || s.name.toLowerCase().includes(q) || s.area.toLowerCase().includes(q);
      const matchesOrder = activeOrder === 'pickup' ? s.pickup : s.delivery;
      return matchesQ && matchesOrder;
    });
    results.innerHTML = filtered.map((s) => `<article class="result"><h3>${s.name}</h3><p>${s.area} • ${s.distance}</p><p class="small">${s.pickup ? 'Pickup' : ''}${s.pickup && s.delivery ? ' & ' : ''}${s.delivery ? 'Delivery' : ''} available</p><button class="btn btn-secondary">Select Store</button></article>`).join('') || '<p class="small">No stores match this filter yet.</p>';
    if (mapLabel) mapLabel.textContent = filtered.length + ' stores shown for ' + (query || 'current area') + ' (' + activeOrder + ')';
  }

  if (searchInput && suggestions) {
    const suggested = ['Seattle, WA', 'Bellevue, WA', 'Fremont, Seattle', 'Capitol Hill, Seattle'];
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim().toLowerCase();
      const list = suggested.filter((s) => s.toLowerCase().includes(val));
      suggestions.innerHTML = list.map((s) => `<button type="button">${s}</button>`).join('');
      suggestions.style.display = val ? 'block' : 'none';
      renderStores(searchInput.value);
    });
    suggestions.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName !== 'BUTTON') return;
      searchInput.value = target.textContent;
      suggestions.style.display = 'none';
      renderStores(searchInput.value);
    });
  }

  if (filterToggle && filterPanel) {
    filterToggle.addEventListener('click', () => filterPanel.classList.toggle('open'));
  }

  orderPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      orderPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeOrder = pill.getAttribute('data-order-type');
      renderStores(searchInput ? searchInput.value : '');
    });
  });

  if (results) renderStores('');
})();
