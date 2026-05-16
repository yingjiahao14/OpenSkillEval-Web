(function () {
  const cookieAgree = document.querySelector('[data-cookie-agree]');
  const cookieBanner = document.querySelector('[data-cookie-banner]');
  if (cookieAgree && cookieBanner) {
    cookieAgree.addEventListener('click', () => cookieBanner.style.display = 'none');
  }

  document.querySelectorAll('[data-footer-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.footer-section');
      if (window.matchMedia('(max-width: 680px)').matches && section) section.classList.toggle('open');
    });
  });

  document.querySelectorAll('[data-tab-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tabs]');
      if (!group) return;
      group.querySelectorAll('[data-tab-btn]').forEach((b) => b.classList.remove('active'));
      group.querySelectorAll('[data-tab-panel]').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector(`[data-tab-panel="${btn.dataset.tabBtn}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const items = Array.from(carousel.querySelectorAll('[data-card]'));
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    let index = 0;
    function chunkSize() { return window.innerWidth < 680 ? 1 : window.innerWidth < 920 ? 2 : 3; }
    function render() {
      const size = chunkSize();
      items.forEach((el, i) => {
        el.style.display = (i >= index && i < index + size) ? 'block' : 'none';
      });
    }
    prev && prev.addEventListener('click', () => { index = Math.max(0, index - chunkSize()); render(); });
    next && next.addEventListener('click', () => { index = Math.min(Math.max(0, items.length - chunkSize()), index + chunkSize()); render(); });
    window.addEventListener('resize', render);
    render();
  });

  const search = document.querySelector('[data-store-search]');
  const sugg = document.querySelector('[data-suggestions]');
  const results = document.querySelector('[data-results]');
  const mapLabel = document.querySelector('[data-map-label]');
  const filterBtn = document.querySelector('[data-filter-btn]');
  const filterPanel = document.querySelector('[data-filter-panel]');
  const orderBtns = document.querySelectorAll('[data-order-type]');
  const allSuggestions = ['Downtown Seattle, WA', 'Capitol Hill, Seattle, WA', 'Bellevue, WA', 'Portland, OR', 'San Francisco, CA'];

  function renderStores(orderType, keyword) {
    if (!results) return;
    const base = [
      `${orderType} • GreenBean ${keyword || 'Market'} • 0.6 mi`,
      `${orderType} • GreenBean Riverside • 1.2 mi`,
      `${orderType} • GreenBean Midtown • 2.0 mi`
    ];
    results.innerHTML = base.map((t) => `<li>${t}</li>`).join('');
    if (mapLabel) mapLabel.textContent = `${orderType} results near ${keyword || 'your area'}`;
  }

  if (search && sugg) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      if (!q) { sugg.style.display = 'none'; return; }
      const picks = allSuggestions.filter((s) => s.toLowerCase().includes(q)).slice(0, 4);
      sugg.innerHTML = picks.map((s) => `<button type="button">${s}</button>`).join('');
      sugg.style.display = picks.length ? 'block' : 'none';
      renderStores(document.querySelector('[data-order-type].active')?.dataset.orderType || 'Pickup', search.value.trim());
    });
    sugg.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      search.value = btn.textContent;
      sugg.style.display = 'none';
      renderStores(document.querySelector('[data-order-type].active')?.dataset.orderType || 'Pickup', search.value.trim());
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.hidden = !filterPanel.hidden;
    });
  }

  orderBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      orderBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderStores(btn.dataset.orderType, search?.value?.trim());
    });
  });
  if (orderBtns[0]) renderStores(orderBtns[0].dataset.orderType, '');
})();
