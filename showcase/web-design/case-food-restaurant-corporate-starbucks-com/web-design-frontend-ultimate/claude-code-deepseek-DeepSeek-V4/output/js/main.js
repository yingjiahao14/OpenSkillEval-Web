/* ============================================================
   GreenBean Coffee — Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================================
  // Cookie Banner
  // ==========================================================
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAgree = document.getElementById('cookie-agree');
  const cookieSettings = document.getElementById('cookie-settings');

  if (cookieBanner) {
    // Show banner if not previously dismissed
    if (!localStorage.getItem('cookie-consent')) {
      cookieBanner.classList.add('visible');
    }

    function dismissCookieBanner() {
      cookieBanner.classList.remove('visible');
      localStorage.setItem('cookie-consent', 'true');
    }

    if (cookieAgree) {
      cookieAgree.addEventListener('click', dismissCookieBanner);
    }

    if (cookieSettings) {
      cookieSettings.addEventListener('click', dismissCookieBanner);
    }
  }

  // ==========================================================
  // Mobile Menu
  // ==========================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

  function openMobileMenu() {
    if (mobileNav) mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileNav) mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
  }

  // ==========================================================
  // Header Scroll Shadow
  // ==========================================================
  const header = document.querySelector('.header');
  if (header) {
    function updateHeaderShadow() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateHeaderShadow, { passive: true });
    updateHeaderShadow();
  }

  // ==========================================================
  // Footer Accordion (Mobile)
  // ==========================================================
  const footerColHeaders = document.querySelectorAll('.footer-col-header');

  footerColHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      if (window.innerWidth > 768) return;
      const col = header.parentElement;
      const isOpen = col.classList.contains('open');
      header.classList.toggle('open');
      col.classList.toggle('open');
    });
  });

  // ==========================================================
  // Rewards Redemption Tabs
  // ==========================================================
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      tabContents.forEach(function (content) {
        if (content.getAttribute('data-tab') === target) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // ==========================================================
  // Gift Card Carousels
  // ==========================================================
  function initCarousel(id) {
    const carousel = document.getElementById(id);
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || !slides.length) return;

    const slideWidth = slides[0].offsetWidth + 16; // width + gap
    let currentIndex = 0;
    let maxIndex = Math.max(0, slides.length - getVisibleSlides());

    function getVisibleSlides() {
      const carouselWidth = carousel.offsetWidth;
      return Math.max(1, Math.floor(carouselWidth / (240 + 16)));
    }

    function updateCarousel() {
      const newMaxIndex = Math.max(0, slides.length - getVisibleSlides());
      if (currentIndex > newMaxIndex) currentIndex = newMaxIndex;
      maxIndex = newMaxIndex;

      track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
        }
      });
    }

    // Create dots
    if (dotsContainer && slides.length > 1) {
      dotsContainer.innerHTML = '';
      const totalDots = Math.min(slides.length, 7);
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', function () {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    updateCarousel();

    // Recalculate on resize
    let resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        currentIndex = 0;
        updateCarousel();
      }, 200);
    });
  }

  // Initialize all carousels
  initCarousel('featured-carousel');
  initCarousel('birthday-carousel');
  initCarousel('thankyou-carousel');
  initCarousel('celebration-carousel');
  initCarousel('appreciation-carousel');
  initCarousel('encouragement-carousel');
  initCarousel('workplace-carousel');
  initCarousel('anytime-carousel');

  // ==========================================================
  // Gift Card Category Chips (scroll to carousel section)
  // ==========================================================
  const categoryChips = document.querySelectorAll('.category-chip[data-category]');

  categoryChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      // Update active chip
      categoryChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');

      // Scroll to corresponding carousel
      const targetId = chip.getAttribute('data-category') + '-carousel';
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================================
  // Store Locator
  // ==========================================================

  // Order type toggle
  const orderBtns = document.querySelectorAll('.locator-order-btn');
  orderBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      orderBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      updateStoreResults();
    });
  });

  // Filter toggle
  const filterBtn = document.getElementById('filter-toggle-btn');
  const filterPanel = document.getElementById('filter-panel');
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', function () {
      filterPanel.classList.toggle('open');
    });

    // Close filter on click outside
    document.addEventListener('click', function (e) {
      if (!filterPanel.contains(e.target) && e.target !== filterBtn && !filterBtn.contains(e.target)) {
        filterPanel.classList.remove('open');
      }
    });
  }

  // Search with suggestions
  const searchInput = document.getElementById('store-search');
  const suggestionsBox = document.getElementById('location-suggestions');

  if (searchInput && suggestionsBox) {
    const mockSuggestions = [
      'Seattle, WA',
      'Portland, OR',
      'San Francisco, CA',
      'Los Angeles, CA',
      'New York, NY',
      'Chicago, IL',
      'Austin, TX',
      'Denver, CO',
      'Boston, MA',
      'Miami, FL'
    ];

    searchInput.addEventListener('input', function () {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 1) {
        suggestionsBox.classList.remove('open');
        return;
      }

      const filtered = mockSuggestions.filter(function (s) {
        return s.toLowerCase().includes(query);
      });

      if (filtered.length > 0) {
        suggestionsBox.innerHTML = filtered.map(function (s) {
          return '<div class="location-suggestion-item">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>' +
            s +
            '</div>';
        }).join('');

        // Add click handlers
        suggestionsBox.querySelectorAll('.location-suggestion-item').forEach(function (item) {
          item.addEventListener('click', function () {
            searchInput.value = item.textContent.trim();
            suggestionsBox.classList.remove('open');
            updateStoreResults();
          });
        });

        suggestionsBox.classList.add('open');
      } else {
        suggestionsBox.classList.remove('open');
      }
    });

    // Close suggestions on click outside
    document.addEventListener('click', function (e) {
      if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
        suggestionsBox.classList.remove('open');
      }
    });

    // Search on Enter
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        suggestionsBox.classList.remove('open');
        updateStoreResults();
      }
    });
  }

  // Filter checkboxes update results
  const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
  filterCheckboxes.forEach(function (cb) {
    cb.addEventListener('change', updateStoreResults);
  });

  function updateStoreResults() {
    const resultsContainer = document.getElementById('store-results');
    if (!resultsContainer) return;

    // Get the active order type
    const activeOrderBtn = document.querySelector('.locator-order-btn.active');
    const orderType = activeOrderBtn ? activeOrderBtn.textContent.trim() : 'Pickup';

    // Get active filters
    const activeFilters = [];
    filterCheckboxes.forEach(function (cb) {
      if (cb.checked) activeFilters.push(cb.parentElement.textContent.trim());
    });

    // Show filtered results (placeholder stores)
    const stores = getMockStores(orderType, activeFilters);

    resultsContainer.innerHTML = stores.map(function (store) {
      return '<div class="store-card">' +
        '<div class="store-card-header">' +
        '<h4>' + store.name + '</h4>' +
        '<span class="distance">' + store.distance + '</span>' +
        '</div>' +
        '<p class="address">' + store.address + '</p>' +
        '<p class="hours">' + store.hours + '</p>' +
        '<div class="store-features">' +
        store.features.map(function (f) {
          return '<span class="store-feature">' + f + '</span>';
        }).join('') +
        '</div>' +
        '</div>';
    }).join('');
  }

  function getMockStores(orderType, filters) {
    var allStores = [
      {
        name: 'GreenBean Coffee — Pike & 4th',
        address: '1420 4th Ave, Seattle, WA 98101',
        distance: '0.3 mi',
        hours: 'Open · Closes 9:00 PM',
        features: ['Drive-Thru', 'Mobile Order & Pay', 'Wi-Fi', 'Outdoor Seating']
      },
      {
        name: 'GreenBean Coffee — Capitol Hill',
        address: '1600 E Olive Way, Seattle, WA 98102',
        distance: '0.8 mi',
        hours: 'Open · Closes 8:00 PM',
        features: ['Mobile Order & Pay', 'Wi-Fi', 'Indoor Seating']
      },
      {
        name: 'GreenBean Coffee — Belltown',
        address: '2201 3rd Ave, Seattle, WA 98121',
        distance: '1.2 mi',
        hours: 'Open · Closes 10:00 PM',
        features: ['Drive-Thru', 'Mobile Order & Pay', 'Wi-Fi', 'Nitrogen Cold Brew']
      },
      {
        name: 'GreenBean Coffee — South Lake Union',
        address: '400 Terry Ave N, Seattle, WA 98109',
        distance: '1.5 mi',
        hours: 'Open · Closes 7:00 PM',
        features: ['Mobile Order & Pay', 'Outdoor Seating']
      },
      {
        name: 'GreenBean Coffee — Pioneer Square',
        address: '505 1st Ave S, Seattle, WA 98104',
        distance: '1.8 mi',
        hours: 'Open · Closes 8:00 PM',
        features: ['Drive-Thru', 'Wi-Fi', 'Indoor Seating']
      },
      {
        name: 'GreenBean Coffee — Queen Anne',
        address: '1625 Queen Anne Ave N, Seattle, WA 98109',
        distance: '2.1 mi',
        hours: 'Open · Closes 6:00 PM',
        features: ['Mobile Order & Pay', 'Wi-Fi', 'Outdoor Seating']
      }
    ];

    // Filter based on order type (simulated)
    if (orderType === 'Delivery') {
      allStores = allStores.filter(function (_, i) { return i % 2 === 0; });
    }

    // Apply feature filters
    if (filters.length > 0) {
      allStores = allStores.filter(function (store) {
        return filters.every(function (f) {
          return store.features.some(function (sf) {
            return sf.toLowerCase().includes(f.toLowerCase());
          });
        });
      });
    }

    return allStores;
  }

  // Initial store results
  updateStoreResults();

  // ==========================================================
  // Menu Sidebar - Mobile Toggle
  // ==========================================================
  const menuSidebarToggle = document.getElementById('menu-sidebar-toggle');
  const menuSidebarNav = document.getElementById('menu-sidebar-nav');

  if (menuSidebarToggle && menuSidebarNav) {
    menuSidebarToggle.addEventListener('click', function () {
      menuSidebarNav.classList.toggle('open');
      var icon = menuSidebarToggle.querySelector('svg');
      if (icon) {
        icon.style.transform = menuSidebarNav.classList.contains('open') ? 'rotate(180deg)' : '';
      }
    });

    // Close sidebar links on mobile after click
    menuSidebarNav.querySelectorAll('.menu-sidebar-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          menuSidebarNav.classList.remove('open');
        }
      });
    });
  }

  // ==========================================================
  // Scroll Reveal Animations
  // ==========================================================
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    revealElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal(); // Check on load

  // ==========================================================
  // FAQ Accordion
  // ==========================================================
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var content = trigger.nextElementSibling;
      var isOpen = content.classList.contains('open');

      trigger.classList.toggle('open');
      content.classList.toggle('open');
    });
  });

  // ==========================================================
  // Active nav link highlighting
  // ==========================================================
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
  var pageToNav = {
    'index.html': 'Home',
    'menu.html': 'Menu',
    'rewards.html': 'Rewards',
    'gift.html': 'Gift Cards',
    'store-locator.html': 'Find a store'
  };

  navLinks.forEach(function (link) {
    var linkText = link.textContent.trim();
    if (pageToNav[currentPage] && linkText === pageToNav[currentPage]) {
      link.classList.add('active');
    }
  });

});
