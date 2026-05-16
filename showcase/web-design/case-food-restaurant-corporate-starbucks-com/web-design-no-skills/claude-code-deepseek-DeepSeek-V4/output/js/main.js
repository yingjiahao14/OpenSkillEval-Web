/**
 * GreenBean Coffee — Shared JavaScript
 * Handles: mobile nav, cookie banner, footer accordion, rewards tabs,
 * gift carousels, store locator search/filter/toggle
 */
(function () {
  'use strict';

  /* ========== Mobile Menu ========== */
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const headerNav = document.querySelector('.header-nav');

  if (mobileBtn && headerNav) {
    mobileBtn.addEventListener('click', function () {
      this.classList.toggle('active');
      headerNav.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
      if (!mobileBtn.contains(e.target) && !headerNav.contains(e.target)) {
        mobileBtn.classList.remove('active');
        headerNav.classList.remove('active');
      }
    });
  }

  /* ========== Active Nav Link ========== */
  (function () {
    const page = document.body.dataset.page;
    if (!page) return;
    const links = document.querySelectorAll('.header-nav a');
    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && href.includes(page)) {
        link.classList.add('active');
      }
    });
  })();

  /* ========== Cookie Banner ========== */
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    const agreeBtn = cookieBanner.querySelector('.js-cookie-agree');
    const settingsBtn = cookieBanner.querySelector('.js-cookie-settings');

    function hideBanner() {
      cookieBanner.classList.add('hidden');
      try { localStorage.setItem('gb-cookie-consent', 'true'); } catch (e) {}
    }

    if (agreeBtn) {
      agreeBtn.addEventListener('click', hideBanner);
    }
    if (settingsBtn) {
      settingsBtn.addEventListener('click', function () {
        alert('Cookie settings would open here.');
        hideBanner();
      });
    }

    // Don't show if already consented
    try {
      if (localStorage.getItem('gb-cookie-consent') === 'true') {
        cookieBanner.classList.add('hidden');
      }
    } catch (e) {}
  }

  /* ========== Footer Accordion (Mobile) ========== */
  const footerCols = document.querySelectorAll('.footer-col');
  footerCols.forEach(function (col) {
    const heading = col.querySelector('h4');
    if (!heading) return;
    heading.addEventListener('click', function () {
      if (window.innerWidth > 768) return;
      col.classList.toggle('expanded');
    });
  });

  /* ========== Rewards Redemption Tabs ========== */
  const tabButtons = document.querySelectorAll('.redemption-tab');
  const tabPanels = document.querySelectorAll('.redemption-panel');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = this.dataset.tab;

      tabButtons.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      tabPanels.forEach(function (panel) {
        panel.classList.remove('active');
        if (panel.dataset.tab === target) {
          panel.classList.add('active');
        }
      });
    });
  });

  /* ========== Gift Card Carousels ========== */
  function initCarousel(wrapper) {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');
    const cards = track ? track.children : [];
    if (!track || cards.length === 0) return;

    let position = 0;
    const gap = 20;
    const cardWidth = cards[0] ? cards[0].offsetWidth : 220;

    function getVisibleCards() {
      return Math.floor(track.parentElement.offsetWidth / (cardWidth + gap)) || 1;
    }

    function getMaxPosition() {
      return Math.max(0, cards.length - getVisibleCards());
    }

    function updateButtons() {
      var max = getMaxPosition();
      if (prevBtn) prevBtn.disabled = position <= 0;
      if (nextBtn) nextBtn.disabled = position >= max;
    }

    function slideTo(pos) {
      position = Math.max(0, Math.min(pos, getMaxPosition()));
      var offset = position * (cardWidth + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';
      updateButtons();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        slideTo(position - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        slideTo(position + 1);
      });
    }

    // Recalculate on resize
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        position = 0;
        track.style.transform = 'translateX(0)';
        updateButtons();
      }, 250);
    });

    updateButtons();
  }

  document.querySelectorAll('.carousel-wrapper').forEach(function (wrapper) {
    initCarousel(wrapper);
  });

  /* ========== Store Locator ========== */
  // Search suggestions
  const searchInput = document.querySelector('.locator-search input');
  const suggestionsBox = document.querySelector('.locator-search-suggestions');

  if (searchInput && suggestionsBox) {
    var mockSuggestions = [
      'Seattle, WA',
      'Portland, OR',
      'San Francisco, CA',
      'Chicago, IL',
      'New York, NY',
      'Austin, TX',
      'Denver, CO',
      'Nashville, TN'
    ];

    searchInput.addEventListener('input', function () {
      var val = this.value.trim().toLowerCase();
      if (val.length === 0) {
        suggestionsBox.classList.remove('active');
        return;
      }
      var filtered = mockSuggestions.filter(function (s) {
        return s.toLowerCase().includes(val);
      });
      suggestionsBox.innerHTML = filtered.map(function (s) {
        return '<div class="suggestion">&#x1F4CD; ' + s + '</div>';
      }).join('');
      suggestionsBox.classList.toggle('active', filtered.length > 0);

      // Click on suggestion
      suggestionsBox.querySelectorAll('.suggestion').forEach(function (el) {
        el.addEventListener('click', function () {
          searchInput.value = this.textContent.replace('\uD83D\uDCCD ', '');
          suggestionsBox.classList.remove('active');
          updateStoreResults(searchInput.value);
        });
      });
    });

    document.addEventListener('click', function (e) {
      if (!searchInput.parentElement.contains(e.target)) {
        suggestionsBox.classList.remove('active');
      }
    });
  }

  // Filter toggle
  const filterBtn = document.querySelector('.filter-btn');
  const filterPanel = document.querySelector('.filter-panel');

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', function () {
      filterPanel.classList.toggle('active');
      filterBtn.classList.toggle('active');
    });
  }

  // Order type toggle
  const orderBtns = document.querySelectorAll('.order-type-btn');
  orderBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      orderBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      updateStoreResults(searchInput ? searchInput.value : '');
    });
  });

  function updateStoreResults(location) {
    var resultsContainer = document.querySelector('.locator-results');
    if (!resultsContainer) return;

    var activeType = document.querySelector('.order-type-btn.active');
    var type = activeType ? activeType.dataset.type : 'pickup';

    var stores = [
      { name: 'GreenBean — Pike Place', address: '1912 Pike Place, Seattle, WA 98101', distance: '0.3 mi', open: true, hours: '5:00 AM – 9:00 PM', features: ['Mobile Order', 'Drive-Thru', 'Indoor Seating'] },
      { name: 'GreenBean — Capitol Hill', address: '401 Broadway E, Seattle, WA 98102', distance: '0.8 mi', open: true, hours: '5:30 AM – 8:00 PM', features: ['Mobile Order', 'Outdoor Seating', 'Wi-Fi'] },
      { name: 'GreenBean — Belltown', address: '2201 4th Ave, Seattle, WA 98121', distance: '1.1 mi', open: true, hours: '6:00 AM – 7:00 PM', features: ['Mobile Order', 'Indoor Seating'] },
      { name: 'GreenBean — Queen Anne', address: '520 Queen Anne Ave N, Seattle, WA 98109', distance: '1.6 mi', open: false, hours: '6:00 AM – 6:00 PM', features: ['Drive-Thru', 'Indoor Seating', 'Wi-Fi'] },
      { name: 'GreenBean — Fremont', address: '3401 Fremont Ave N, Seattle, WA 98103', distance: '2.2 mi', open: true, hours: '5:00 AM – 8:30 PM', features: ['Mobile Order', 'Drive-Thru', 'Outdoor Seating', 'Wi-Fi'] }
    ];

    var filtered = location ? stores.filter(function (s) {
      return s.address.toLowerCase().includes(location.toLowerCase()) ||
             s.name.toLowerCase().includes(location.toLowerCase());
    }) : stores;

    if (filtered.length === 0) {
      filtered = stores;
    }

    resultsContainer.innerHTML = filtered.map(function (store, i) {
      var featuresHtml = store.features.map(function (f) {
        return '<span class="store-feature">' + f + '</span>';
      }).join('');

      return '<div class="locator-result">' +
        '<h4>' + (i + 1) + '. ' + store.name + '</h4>' +
        '<div class="store-address">' + store.address + '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<div class="store-meta">' + featuresHtml + '</div>' +
          '<div style="text-align:right;">' +
            '<span class="store-distance">' + store.distance + '</span><br>' +
            '<span class="store-status ' + (store.open ? 'open' : 'closed') + '">' +
              (store.open ? 'Open' : 'Closed') + ' · ' + store.hours +
            '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // Initial render of store results
  if (document.querySelector('.locator-results')) {
    updateStoreResults();
  }

  /* ========== Filter checkboxes update results ========== */
  var filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
  filterCheckboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      updateStoreResults(searchInput ? searchInput.value : '');
    });
  });

})();
