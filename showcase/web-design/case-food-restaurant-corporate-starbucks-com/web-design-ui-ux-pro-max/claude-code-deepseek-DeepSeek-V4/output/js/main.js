/* ============================================
   GreenBean Coffee — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  /* --- Cookie Banner --- */
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    const agreeBtn = cookieBanner.querySelector('[data-action="agree"]');
    if (agreeBtn) {
      agreeBtn.addEventListener('click', function() {
        cookieBanner.classList.add('hidden');
        try { localStorage.setItem('gb_cookie_consent', 'true'); } catch(e) {}
      });
    }
    // Check if already consented
    try {
      if (localStorage.getItem('gb_cookie_consent') === 'true') {
        cookieBanner.classList.add('hidden');
      }
    } catch(e) {}
  }

  /* --- Mobile Navigation --- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      const isOpen = mobileNav.classList.toggle('mobile-nav--open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('mobile-nav--open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Footer Accordion (mobile) --- */
  document.querySelectorAll('.footer__accordion-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      const links = this.nextElementSibling;
      if (links) {
        links.classList.toggle('footer__links--open');
      }
    });
  });

  /* --- Rewards Redemption Tabs --- */
  document.querySelectorAll('.redemption__tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var tabs = this.parentElement.querySelectorAll('.redemption__tab');
      tabs.forEach(function(t) { t.classList.remove('redemption__tab--active'); });
      this.classList.add('redemption__tab--active');

      var panelId = this.getAttribute('data-panel');
      var panels = document.querySelectorAll('.redemption__panel');
      panels.forEach(function(p) { p.classList.remove('redemption__panel--active'); });
      var panel = document.getElementById(panelId);
      if (panel) {
        panel.classList.add('redemption__panel--active');
      }
    });
  });

  /* --- Gift Card Carousels --- */
  document.querySelectorAll('.carousel').forEach(function(carousel) {
    var track = carousel.querySelector('.carousel__track');
    var slides = carousel.querySelectorAll('.carousel__slide');
    var prevBtn = carousel.querySelector('.carousel__btn--prev');
    var nextBtn = carousel.querySelector('.carousel__btn--next');

    if (!track || !slides.length) return;

    var index = 0;
    var slideWidth = 0;

    function getSlideWidth() {
      if (!slides[0]) return 260;
      var style = getComputedStyle(track);
      var gap = parseInt(style.gap) || 24;
      return slides[0].offsetWidth + gap;
    }

    function getVisibleSlides() {
      if (!track.parentElement) return 1;
      var trackWidth = track.parentElement.offsetWidth;
      var sw = getSlideWidth();
      return Math.max(1, Math.floor(trackWidth / sw));
    }

    function updateButtons() {
      var visible = getVisibleSlides();
      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = index >= slides.length - visible;
    }

    function slideTo(newIndex) {
      var visible = getVisibleSlides();
      var maxIndex = Math.max(0, slides.length - visible);
      index = Math.max(0, Math.min(newIndex, maxIndex));
      slideWidth = getSlideWidth();
      track.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
      updateButtons();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        slideTo(index - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        slideTo(index + 1);
      });
    }

    // Initial state
    updateButtons();

    // Update on resize
    var resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        slideTo(index);
      }, 100);
    });

    // Touch swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          slideTo(index + 1);
        } else {
          slideTo(index - 1);
        }
      }
    });
  });

  /* --- Store Locator --- */
  var searchInput = document.getElementById('store-search');
  var suggestions = document.getElementById('store-suggestions');
  var filterBtn = document.getElementById('filter-toggle');
  var filterPanel = document.getElementById('filter-panel');
  var pickupBtn = document.getElementById('type-pickup');
  var deliveryBtn = document.getElementById('type-delivery');
  var resultsContainer = document.getElementById('store-results');

  // Placeholder store data
  var stores = [
    { name: 'GreenBean Coffee — Downtown', address: '123 Main Street, Downtown, NY 10001', hours: 'Open today 6:00 AM – 9:00 PM', features: ['Drive-Thru', 'Mobile Ordering', 'Wi-Fi'], type: 'pickup' },
    { name: 'GreenBean Coffee — Midtown', address: '456 Park Avenue, Midtown, NY 10022', hours: 'Open today 5:30 AM – 10:00 PM', features: ['Mobile Ordering', 'Outdoor Seating'], type: 'pickup' },
    { name: 'GreenBean Coffee — SoHo', address: '789 Broadway, SoHo, NY 10012', hours: 'Open today 7:00 AM – 8:00 PM', features: ['Wi-Fi', 'Mobile Ordering'], type: 'pickup' },
    { name: 'GreenBean Coffee — Upper East', address: '321 Lexington Ave, Upper East Side, NY 10065', hours: 'Open today 6:00 AM – 9:00 PM', features: ['Drive-Thru', 'Wi-Fi'], type: 'pickup' },
    { name: 'GreenBean Coffee — Brooklyn', address: '555 Atlantic Ave, Brooklyn, NY 11217', hours: 'Open today 6:30 AM – 9:30 PM', features: ['Mobile Ordering', 'Drive-Thru', 'Outdoor Seating'], type: 'pickup' },
    { name: 'GreenBean Coffee — Williamsburg', address: '88 Bedford Ave, Brooklyn, NY 11211', hours: 'Open today 7:00 AM – 10:00 PM', features: ['Wi-Fi', 'Outdoor Seating'], type: 'delivery' },
    { name: 'GreenBean Coffee — Chelsea', address: '200 W 24th St, Chelsea, NY 10011', hours: 'Open today 6:00 AM – 9:00 PM', features: ['Mobile Ordering', 'Wi-Fi'], type: 'delivery' },
    { name: 'GreenBean Coffee — Financial District', address: '1 Wall Street, Financial District, NY 10005', hours: 'Open today 6:00 AM – 8:00 PM', features: ['Mobile Ordering'], type: 'pickup' }
  ];

  var currentType = 'pickup';

  function renderResults(filteredStores) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = filteredStores.map(function(s) {
      return '<div class="store-card">' +
        '<div class="store-card__name">' + s.name + '</div>' +
        '<div class="store-card__address">' + s.address + '</div>' +
        '<div class="store-card__hours">' + s.hours + '</div>' +
        '<div class="store-card__features">' +
          s.features.map(function(f) { return '<span class="store-card__feature">' + f + '</span>'; }).join('') +
        '</div>' +
      '</div>';
    }).join('');
    if (filteredStores.length === 0) {
      resultsContainer.innerHTML = '<div class="text-center text-muted" style="padding: var(--space-8);">No stores found matching your criteria.</div>';
    }
  }

  function filterStores() {
    var query = searchInput ? searchInput.value.toLowerCase() : '';
    var filtered = stores.filter(function(s) {
      var matchesType = s.type === currentType || currentType === 'both';
      var matchesQuery = !query || s.name.toLowerCase().indexOf(query) > -1 || s.address.toLowerCase().indexOf(query) > -1;
      return matchesType && matchesQuery;
    });
    renderResults(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var query = this.value.toLowerCase();
      if (suggestions) {
        if (query.length > 0) {
          var matches = stores.filter(function(s) {
            return s.name.toLowerCase().indexOf(query) > -1 || s.address.toLowerCase().indexOf(query) > -1;
          }).slice(0, 5);
          if (matches.length > 0) {
            suggestions.innerHTML = matches.map(function(s) {
              return '<div class="suggestions__item" data-address="' + s.address + '">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
                s.name + ' — ' + s.address +
              '</div>';
            }).join('');
            suggestions.classList.add('suggestions--open');
          } else {
            suggestions.classList.remove('suggestions--open');
          }
        } else {
          suggestions.classList.remove('suggestions--open');
        }
      }
      filterStores();
    });

    // Hide suggestions on click outside
    document.addEventListener('click', function(e) {
      if (suggestions && !searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.classList.remove('suggestions--open');
      }
    });

    // Suggestion click
    if (suggestions) {
      suggestions.addEventListener('click', function(e) {
        var item = e.target.closest('.suggestions__item');
        if (item && searchInput) {
          searchInput.value = item.getAttribute('data-address');
          suggestions.classList.remove('suggestions--open');
          filterStores();
        }
      });
    }
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', function() {
      filterPanel.classList.toggle('filter-panel--open');
    });
  }

  if (pickupBtn && deliveryBtn) {
    pickupBtn.addEventListener('click', function() {
      pickupBtn.classList.add('store-locator__type-btn--active');
      deliveryBtn.classList.remove('store-locator__type-btn--active');
      currentType = 'pickup';
      filterStores();
    });

    deliveryBtn.addEventListener('click', function() {
      deliveryBtn.classList.add('store-locator__type-btn--active');
      pickupBtn.classList.remove('store-locator__type-btn--active');
      currentType = 'delivery';
      filterStores();
    });
  }

  // Initial render
  filterStores();

  /* --- Menu Sidebar Active State --- */
  document.querySelectorAll('.menu-sidebar__link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      document.querySelectorAll('.menu-sidebar__link').forEach(function(l) {
        l.classList.remove('menu-sidebar__link--active');
      });
      this.classList.add('menu-sidebar__link--active');
    });
  });

});
