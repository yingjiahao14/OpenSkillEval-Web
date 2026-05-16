/**
 * GreenBean Coffee — Shared Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Cookie Banner =====
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    const agreeBtn = cookieBanner.querySelector('.js-cookie-agree');
    const settingsBtn = cookieBanner.querySelector('.js-cookie-settings');

    function hideBanner() {
      cookieBanner.classList.add('hidden');
      try { localStorage.setItem('gb-cookie-consent', 'true'); } catch (e) {}
    }

    // Check if already consented
    try {
      if (localStorage.getItem('gb-cookie-consent') === 'true') {
        cookieBanner.classList.add('hidden');
      }
    } catch (e) {}

    if (agreeBtn) agreeBtn.addEventListener('click', hideBanner);
    if (settingsBtn) settingsBtn.addEventListener('click', () => {
      alert('Cookie settings would open here.');
    });
  }

  // ===== Mobile Menu =====
  const menuBtn = document.querySelector('.js-mobile-menu-toggle');
  const mobileNav = document.querySelector('.js-mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuBtn.querySelector('i').className = isOpen ? 'ri-close-line' : 'ri-menu-line';
    });

    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuBtn.querySelector('i').className = 'ri-menu-line';
      });
    });
  }

  // ===== Footer Accordion (Mobile) =====
  const footerCols = document.querySelectorAll('.footer-col');
  footerCols.forEach(col => {
    const heading = col.querySelector('h4');
    if (heading) {
      heading.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          col.classList.toggle('open');
        }
      });
    }
  });

  // ===== Rewards Redemption Tabs =====
  const tabBtns = document.querySelectorAll('.js-tab-btn');
  const tabPanels = document.querySelectorAll('.js-tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabPanels.forEach(p => {
        p.classList.toggle('active', p.dataset.tab === target);
      });
    });
  });

  // ===== Gift Card Carousels =====
  document.querySelectorAll('.js-carousel').forEach(carousel => {
    const track = carousel.querySelector('.js-carousel-track');
    const prevBtn = carousel.querySelector('.js-carousel-prev');
    const nextBtn = carousel.querySelector('.js-carousel-next');
    const items = track.querySelectorAll('.gift-card-item');

    if (!track || !prevBtn || !nextBtn || items.length === 0) return;

    let position = 0;
    const gap = 16;

    function getItemWidth() {
      const first = items[0];
      return first ? first.offsetWidth + gap : 220;
    }

    function getVisibleCount() {
      const trackWidth = track.parentElement.offsetWidth;
      return Math.floor(trackWidth / getItemWidth());
    }

    function updateButtons() {
      const maxPos = items.length - getVisibleCount();
      prevBtn.style.opacity = position <= 0 ? '0.4' : '1';
      prevBtn.style.pointerEvents = position <= 0 ? 'none' : 'auto';
      nextBtn.style.opacity = position >= maxPos ? '0.4' : '1';
      nextBtn.style.pointerEvents = position >= maxPos ? 'none' : 'auto';
    }

    function slide() {
      const offset = position * getItemWidth();
      track.style.transform = `translateX(-${offset}px)`;
      updateButtons();
    }

    prevBtn.addEventListener('click', () => {
      if (position > 0) {
        position = Math.max(0, position - 1);
        slide();
      }
    });

    nextBtn.addEventListener('click', () => {
      const maxPos = items.length - getVisibleCount();
      if (position < maxPos) {
        position = Math.min(maxPos, position + 1);
        slide();
      }
    });

    // Recalculate on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        position = 0;
        slide();
      }, 200);
    });

    // Initial state
    updateButtons();
  });

  // ===== Store Locator Search =====
  const searchInput = document.querySelector('.js-store-search');
  const suggestionsList = document.querySelector('.js-search-suggestions');
  const storeCards = document.querySelectorAll('.js-store-card');

  if (searchInput && suggestionsList) {
    const suggestions = [
      'New York, NY',
      'Los Angeles, CA',
      'Chicago, IL',
      'San Francisco, CA',
      'Seattle, WA',
      'Austin, TX',
      'Portland, OR',
      'Denver, CO',
    ];

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (query.length < 1) {
        suggestionsList.classList.remove('open');
        return;
      }

      const filtered = suggestions.filter(s =>
        s.toLowerCase().includes(query)
      );

      if (filtered.length > 0) {
        suggestionsList.innerHTML = filtered
          .map(s => `<li>${s}</li>`)
          .join('');
        suggestionsList.classList.add('open');
      } else {
        suggestionsList.classList.remove('open');
      }

      // Filter store cards
      if (storeCards.length > 0) {
        storeCards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? '' : 'none';
        });
      }
    });

    // Select suggestion
    suggestionsList.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        searchInput.value = e.target.textContent;
        suggestionsList.classList.remove('open');
      }
    });

    // Close suggestions on outside click
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.classList.remove('open');
      }
    });
  }

  // ===== Store Locator Filter Toggle =====
  const filterBtn = document.querySelector('.js-filter-toggle');
  const filterPanel = document.querySelector('.js-filter-panel');
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      const isOpen = filterPanel.classList.toggle('open');
      filterBtn.classList.toggle('active', isOpen);
    });
  }

  // ===== Store Locator Order Type Toggle =====
  const orderTypeBtns = document.querySelectorAll('.js-order-type-btn');
  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter stores by order type
      const type = btn.dataset.type;
      storeCards.forEach(card => {
        if (type === 'all' || card.dataset.orderTypes.includes(type)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== FAQ Accordion =====
  document.querySelectorAll('.js-faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    }
  });

  // ===== Store Card Selection =====
  storeCards.forEach(card => {
    card.addEventListener('click', () => {
      storeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  // ===== Set active nav link =====
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
