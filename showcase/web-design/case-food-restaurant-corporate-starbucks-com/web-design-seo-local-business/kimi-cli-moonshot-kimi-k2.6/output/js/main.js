/**
 * GreenBean Coffee — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  initCookieBanner();
  initFooterAccordion();
  initMobileNav();
  initRedemptionTabs();
  initGiftCarousels();
  initStoreLocator();
  initFAQ();
});

/* ============================================
   Cookie Banner
   ============================================ */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const agreeBtn = document.getElementById('cookie-agree');
  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
      localStorage.setItem('greenbean-cookies', 'accepted');
    });
  }

  // Auto-hide if already accepted
  if (localStorage.getItem('greenbean-cookies') === 'accepted') {
    banner.classList.add('hidden');
  }
}

/* ============================================
   Footer Accordion (Mobile)
   ============================================ */
function initFooterAccordion() {
  const toggles = document.querySelectorAll('.footer-column-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const column = toggle.closest('.footer-column');
      const isOpen = column.classList.contains('open');

      // Close all others
      document.querySelectorAll('.footer-column').forEach(c => c.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        column.classList.add('open');
      }
    });
  });
}

/* ============================================
   Mobile Navigation
   ============================================ */
function initMobileNav() {
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const nav = document.getElementById('mobile-nav');

  if (openBtn && nav) {
    openBtn.addEventListener('click', () => nav.classList.add('open'));
  }

  if (closeBtn && nav) {
    closeBtn.addEventListener('click', () => nav.classList.remove('open'));
  }

  // Close on backdrop click
  if (nav) {
    nav.addEventListener('click', (e) => {
      if (e.target === nav) nav.classList.remove('open');
    });
  }
}

/* ============================================
   Rewards Redemption Tabs
   ============================================ */
function initRedemptionTabs() {
  const tabsContainer = document.getElementById('redemption-tabs');
  const contentContainer = document.getElementById('redemption-content');
  if (!tabsContainer || !contentContainer) return;

  const redemptionData = [
    {
      stars: '25',
      label: '25 Stars',
      reward: '$1 off a drink customization',
      value: 'Up to $1',
      description: 'Add an extra espresso shot, flavored syrup, or cold foam to your favorite drink — on us! Perfect for customizing your daily ritual just the way you like it.'
    },
    {
      stars: '60',
      label: '60 Stars',
      reward: 'Up to $2 off your order',
      value: 'Up to $2',
      description: 'Save on any purchase up to $2. Whether it\'s a pastry, a coffee upgrade, or a snack, every bit counts toward making your day a little brighter.'
    },
    {
      stars: '100',
      label: '100 Stars',
      reward: 'Brewed coffee, tea, bakery item & more',
      value: 'Up to $6',
      description: 'Enjoy a freshly brewed coffee or tea, pick a bakery item like a croissant or muffin, or grab packaged snacks. A perfect treat for your morning break.'
    },
    {
      stars: '200',
      label: '200 Stars',
      reward: 'Handcrafted drink or hot breakfast',
      value: 'Up to $10',
      description: 'Indulge in any handcrafted beverage — from lattes to Refreshers — or start your day with a hot breakfast sandwich. The choice is yours!'
    },
    {
      stars: '300',
      label: '300 Stars',
      reward: 'Sandwich, protein box or packaged coffee',
      value: 'Up to $16',
      description: 'Fuel up with a protein box, enjoy a hearty sandwich for lunch, or take home packaged coffee to brew your favorites anytime.'
    },
    {
      stars: '400',
      label: '400 Stars',
      reward: 'Select GreenBean merchandise',
      value: 'Up to $20',
      description: 'Show your GreenBean pride with select merchandise — mugs, tumblers, apparel, and more. The perfect way to represent your daily coffee ritual.'
    }
  ];

  function renderTab(stars) {
    const data = redemptionData.find(d => d.stars === stars);
    if (!data) return;

    contentContainer.innerHTML = `
      <div class="stars-value">${data.stars} ★</div>
      <h3>${data.reward}</h3>
      <p class="reward-value">Value: ${data.value}</p>
      <p>${data.description}</p>
    `;

    tabsContainer.querySelectorAll('.redemption-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.stars === stars);
    });
  }

  tabsContainer.querySelectorAll('.redemption-tab').forEach(tab => {
    tab.addEventListener('click', () => renderTab(tab.dataset.stars));
  });

  // Render first tab by default
  const firstTab = tabsContainer.querySelector('.redemption-tab');
  if (firstTab) renderTab(firstTab.dataset.stars);
}

/* ============================================
   Gift Card Carousels
   ============================================ */
function initGiftCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.gift-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 20; // includes gap
    let position = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) return 3;
      return 4;
    }

    function updateButtons() {
      const visible = getVisibleCount();
      const maxPosition = Math.max(0, cards.length - visible);
      prevBtn.disabled = position <= 0;
      nextBtn.disabled = position >= maxPosition;
      prevBtn.style.opacity = prevBtn.disabled ? '0.4' : '1';
      nextBtn.style.opacity = nextBtn.disabled ? '0.4' : '1';
    }

    function slide(dir) {
      const visible = getVisibleCount();
      const maxPosition = Math.max(0, cards.length - visible);
      position = Math.max(0, Math.min(maxPosition, position + dir));
      track.style.transform = `translateX(-${position * cardWidth}px)`;
      updateButtons();
    }

    prevBtn.addEventListener('click', () => slide(-1));
    nextBtn.addEventListener('click', () => slide(1));

    updateButtons();
    window.addEventListener('resize', () => {
      position = 0;
      track.style.transform = 'translateX(0)';
      updateButtons();
    });
  });
}

/* ============================================
   Store Locator
   ============================================ */
function initStoreLocator() {
  const orderToggle = document.getElementById('order-toggle');
  const filterBtn = document.getElementById('filter-btn');
  const filterPanel = document.getElementById('filter-panel');
  const searchInput = document.getElementById('store-search');
  const suggestions = document.getElementById('search-suggestions');

  if (orderToggle) {
    orderToggle.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        orderToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
    });
  }

  // Demo search suggestions
  if (searchInput && suggestions) {
    const demoLocations = [
      'New York, NY',
      'Los Angeles, CA',
      'Chicago, IL',
      'Houston, TX',
      'Phoenix, AZ',
      'Philadelphia, PA',
      'San Antonio, TX',
      'San Diego, CA',
      'Dallas, TX',
      'San Jose, CA'
    ];

    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (val.length < 2) {
        suggestions.style.display = 'none';
        return;
      }

      const matches = demoLocations.filter(loc => loc.toLowerCase().includes(val));
      if (matches.length > 0) {
        suggestions.innerHTML = matches.map(loc =>
          `<div class="suggestion-item" style="padding:10px 16px;cursor:pointer;font-size:14px;border-bottom:1px solid #eee;" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='white'">${loc}</div>`
        ).join('');
        suggestions.style.display = 'block';

        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
          item.addEventListener('click', () => {
            searchInput.value = item.textContent;
            suggestions.style.display = 'none';
          });
        });
      } else {
        suggestions.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.style.display = 'none';
      }
    });
  }
}

/* ============================================
   FAQ Accordion
   ============================================ */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}
