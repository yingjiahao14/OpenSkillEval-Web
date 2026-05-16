/* ===== GreenBean Coffee — Shared JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== Mobile Menu ===== */
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      mainNav.classList.toggle('open');
    });
  }

  /* ===== Cookie Banner ===== */
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    const agreeBtn = document.getElementById('cookieAgree');
    const settingsBtn = document.getElementById('cookieSettings');
    const dismissBanner = () => {
      cookieBanner.classList.add('hidden');
      localStorage.setItem('cookieConsent', 'true');
    };
    if (localStorage.getItem('cookieConsent') === 'true') {
      cookieBanner.classList.add('hidden');
    }
    if (agreeBtn) agreeBtn.addEventListener('click', dismissBanner);
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        showToast('Cookie settings opened');
        dismissBanner();
      });
    }
  }

  /* ===== Footer Accordion (Mobile) ===== */
  document.querySelectorAll('.footer-col-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const col = toggle.parentElement;
      col.classList.toggle('open');
      toggle.classList.toggle('active');
    });
  });

  /* ===== Rewards Redemption Tabs ===== */
  const tabs = document.querySelectorAll('.redemption-tab');
  const panels = document.querySelectorAll('.redemption-panel');
  if (tabs.length && panels.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const stars = tab.getAttribute('data-stars');
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        panels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.getAttribute('data-panel') === stars) {
            panel.classList.add('active');
          }
        });
      });
    });
  }

  /* ===== Gift Card Carousels ===== */
  function setupCarousel(trackId, prevBtn, nextBtn) {
    const track = document.getElementById(trackId);
    const prev = document.getElementById(prevBtn);
    const next = document.getElementById(nextBtn);
    if (!track || !prev || !next) return;

    let position = 0;
    const cardWidth = 240; // 220px card + 20px gap
    const visibleCards = () => {
      const wrapper = track.parentElement;
      return Math.floor(wrapper.offsetWidth / cardWidth);
    };

    function updateButtons() {
      const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
      prev.disabled = position <= 0;
      next.disabled = position >= maxScroll - 1;
    }

    prev.addEventListener('click', () => {
      const count = visibleCards();
      position = Math.max(0, position - cardWidth * count);
      track.style.transform = `translateX(-${position}px)`;
      updateButtons();
    });

    next.addEventListener('click', () => {
      const count = visibleCards();
      const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
      position = Math.min(maxScroll, position + cardWidth * count);
      track.style.transform = `translateX(-${position}px)`;
      updateButtons();
    });

    window.addEventListener('resize', () => {
      const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
      if (position > maxScroll) position = maxScroll;
      track.style.transform = `translateX(-${position}px)`;
      updateButtons();
    });

    updateButtons();
  }

  // Featured carousel uses dedicated IDs
  setupCarousel('featuredCarousel', 'featuredPrev', 'featuredNext');

  // Category carousels use data-cat attributes
  function setupCatCarousel(catName) {
    const track = document.getElementById(catName + 'Carousel');
    const section = track && track.closest('.carousel-section');
    if (!section) return;
    const prevBtn = section.querySelector('.cat-prev[data-cat="' + catName + '"]');
    const nextBtn = section.querySelector('.cat-next[data-cat="' + catName + '"]');
    if (!prevBtn || !nextBtn) return;

    let position = 0;
    const cardWidth = 240;

    function updateButtons() {
      const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
      prevBtn.disabled = position <= 0;
      nextBtn.disabled = position >= maxScroll - 1;
    }

    prevBtn.addEventListener('click', () => {
      const visible = Math.floor(track.parentElement.offsetWidth / cardWidth);
      position = Math.max(0, position - cardWidth * visible);
      track.style.transform = `translateX(-${position}px)`;
      updateButtons();
    });
    nextBtn.addEventListener('click', () => {
      const visible = Math.floor(track.parentElement.offsetWidth / cardWidth);
      const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
      position = Math.min(maxScroll, position + cardWidth * visible);
      track.style.transform = `translateX(-${position}px)`;
      updateButtons();
    });
    window.addEventListener('resize', () => {
      const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
      if (position > maxScroll) position = maxScroll;
      track.style.transform = `translateX(-${position}px)`;
      updateButtons();
    });
    updateButtons();
  }

  ['birthday', 'thankyou', 'celebration', 'appreciation', 'encouragement', 'workplace', 'anytime'].forEach(setupCatCarousel);

  /* ===== Store Locator ===== */

  // Order type toggle
  document.querySelectorAll('.order-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.order-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.getAttribute('data-type');
      filterStores(type);
    });
  });

  // Store data
  const allStores = [
    { name: 'GreenBean — Downtown', addr: '123 Main Street, New York, NY 10001', hours: 'Open today: 5:00 AM – 9:00 PM', features: ['drive-thru', 'mobile-order', 'wifi'] },
    { name: 'GreenBean — Midtown', addr: '456 Park Avenue, New York, NY 10022', hours: 'Open today: 5:30 AM – 8:00 PM', features: ['mobile-order', 'wifi', 'seating'] },
    { name: 'GreenBean — SoHo', addr: '789 Broadway, New York, NY 10003', hours: 'Open today: 6:00 AM – 10:00 PM', features: ['nitro', 'patio', 'wifi'] },
    { name: 'GreenBean — Upper West Side', addr: '321 Amsterdam Ave, New York, NY 10024', hours: 'Open today: 5:00 AM – 9:00 PM', features: ['drive-thru', 'mobile-order', 'seating'] },
    { name: 'GreenBean — Brooklyn Heights', addr: '150 Montague Street, Brooklyn, NY 11201', hours: 'Open today: 6:00 AM – 8:30 PM', features: ['wifi', 'patio'] },
    { name: 'GreenBean — Chelsea', addr: '200 8th Avenue, New York, NY 10011', hours: 'Open today: 5:30 AM – 9:30 PM', features: ['drive-thru', 'nitro', 'mobile-order', 'wifi'] },
    { name: 'GreenBean — Williamsburg', addr: '250 Bedford Ave, Brooklyn, NY 11211', hours: 'Open today: 6:00 AM – 10:00 PM', features: ['nitro', 'patio', 'seating', 'wifi'] },
    { name: 'GreenBean — Financial District', addr: '88 Wall Street, New York, NY 10005', hours: 'Open today: 4:30 AM – 7:00 PM', features: ['mobile-order', 'wifi', 'drive-thru'] },
  ];

  const searchInput = document.getElementById('storeSearch');
  const suggestionsEl = document.getElementById('searchSuggestions');
  const storeResults = document.getElementById('storeResults');

  function renderStores(stores) {
    if (!storeResults) return;
    storeResults.innerHTML = stores.map(s => `
      <div class="store-card">
        <h4>${s.name}</h4>
        <p class="store-addr">${s.addr}</p>
        <p class="store-hours">${s.hours}</p>
        <div class="store-features">
          ${s.features.map(f => `<span class="store-feature">${featureLabel(f)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  function featureLabel(f) {
    const labels = {
      'drive-thru': 'Drive-thru',
      'mobile-order': 'Mobile ordering',
      'wifi': 'Wi-Fi',
      'nitro': 'Nitro cold brew',
      'seating': 'Indoor seating',
      'patio': 'Outdoor patio'
    };
    return labels[f] || f;
  }

  let activeFilters = [];
  let activeOrderType = 'pickup';

  function filterStores(orderType) {
    activeOrderType = orderType || activeOrderType;
    let filtered = [...allStores];
    if (activeFilters.length > 0) {
      filtered = filtered.filter(s => activeFilters.some(f => s.features.includes(f)));
    }
    renderStores(filtered);
  }

  // Search suggestions
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 1) {
        suggestionsEl.classList.remove('open');
        return;
      }
      const matches = allStores.filter(s =>
        s.name.toLowerCase().includes(query) || s.addr.toLowerCase().includes(query)
      ).slice(0, 5);
      suggestionsEl.innerHTML = matches.map(s =>
        `<div class="search-suggestion-item">📍 ${s.name} — ${s.addr}</div>`
      ).join('');
      suggestionsEl.classList.toggle('open', matches.length > 0);

      // Filter results as user types
      if (matches.length > 0) {
        renderStores(matches);
      } else {
        renderStores(allStores);
      }
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length > 0) {
        suggestionsEl.classList.add('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestionsEl.contains(e.target)) {
        suggestionsEl.classList.remove('open');
      }
    });

    suggestionsEl.addEventListener('click', (e) => {
      const item = e.target.closest('.search-suggestion-item');
      if (item) {
        searchInput.value = item.textContent.replace('📍 ', '').split(' — ')[0];
        suggestionsEl.classList.remove('open');
        const addr = item.textContent.split(' — ')[1];
        const found = allStores.filter(s => s.addr === addr);
        renderStores(found.length ? found : allStores);
      }
    });
  }

  // Filter panel toggle
  const filterToggle = document.getElementById('filterToggle');
  const filterPanel = document.getElementById('filterPanel');
  if (filterToggle && filterPanel) {
    filterToggle.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
      filterToggle.classList.toggle('active');
    });
  }

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const filter = chip.getAttribute('data-filter');
      if (chip.classList.contains('active')) {
        activeFilters.push(filter);
      } else {
        activeFilters = activeFilters.filter(f => f !== filter);
      }
      filterStores();
    });
  });

  /* ===== Menu Sidebar Active Link Highlight ===== */
  document.querySelectorAll('.menu-sidebar-list a').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.menu-sidebar-list a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ===== Toast Utility ===== */
  window.showToast = function(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

});
