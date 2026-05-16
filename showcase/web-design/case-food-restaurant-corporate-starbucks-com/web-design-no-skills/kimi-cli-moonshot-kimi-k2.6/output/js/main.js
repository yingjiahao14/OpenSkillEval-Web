/* ============================================
   GreenBean Coffee — Global JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initMobileMenu();
  initFooterAccordion();
});

/* Cookie Banner */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  const agreeBtn = banner.querySelector('.cookie-btn-agree');
  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
      localStorage.setItem('greenbean-cookies-accepted', 'true');
    });
  }

  // Auto-hide if previously accepted
  if (localStorage.getItem('greenbean-cookies-accepted') === 'true') {
    banner.classList.add('hidden');
  }
}

/* Mobile Menu */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-btn');
  const navMain = document.querySelector('.nav-main');
  const navActions = document.querySelector('.nav-actions');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));

    if (navMain) navMain.classList.toggle('mobile-open');
    if (navActions) navActions.classList.toggle('mobile-open');
  });
}

/* Footer Accordion (Mobile) */
function initFooterAccordion() {
  const toggles = document.querySelectorAll('.footer-col-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const col = toggle.closest('.footer-col');
      col.classList.toggle('collapsed');
      const isCollapsed = col.classList.contains('collapsed');
      toggle.setAttribute('aria-expanded', String(!isCollapsed));
    });
  });
}

/* ============================================
   Rewards Redemption Tabs
   ============================================ */
function initRedemptionTabs() {
  const tabs = document.querySelectorAll('.redemption-tab');
  const panels = document.querySelectorAll('.redemption-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });
}

/* ============================================
   Gift Card Carousels
   ============================================ */
function initCarousel(trackSelector, prevSelector, nextSelector, itemsVisible = 4) {
  const track = document.querySelector(trackSelector);
  const prevBtn = document.querySelector(prevSelector);
  const nextBtn = document.querySelector(nextSelector);

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = track.children;
  const totalCards = cards.length;
  const cardWidth = cards[0]?.getBoundingClientRect().width + 20 || 240; // includes gap

  function update() {
    const maxIndex = Math.max(0, totalCards - itemsVisible);
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    prevBtn.style.opacity = prevBtn.disabled ? '0.4' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.4' : '1';
  }

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    update();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    update();
  });

  // Responsive items visible
  function handleResize() {
    const w = window.innerWidth;
    let visible = itemsVisible;
    if (w <= 768) visible = 1;
    else if (w <= 1024) visible = 2;
    else visible = itemsVisible;
    update();
  }

  window.addEventListener('resize', handleResize);
  update();
}

/* ============================================
   Store Locator
   ============================================ */
function initStoreLocator() {
  const searchInput = document.querySelector('.search-box input');
  const suggestions = document.querySelector('.search-suggestions');
  const filterBtn = document.querySelector('.filter-btn');
  const filterPanel = document.querySelector('.filter-panel');
  const orderTypeBtns = document.querySelectorAll('.order-type-toggle button');

  // Mock suggestions
  const mockLocations = [
    'Seattle, WA', 'Portland, OR', 'San Francisco, CA',
    'Los Angeles, CA', 'New York, NY', 'Chicago, IL',
    'Austin, TX', 'Denver, CO', 'Boston, MA',
    'Miami, FL', 'Atlanta, GA', 'Phoenix, AZ'
  ];

  if (searchInput && suggestions) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (val.length < 1) {
        suggestions.classList.remove('active');
        return;
      }

      const matches = mockLocations.filter(loc =>
        loc.toLowerCase().includes(val)
      );

      suggestions.innerHTML = matches.length
        ? matches.map(loc => `<li onclick="selectSuggestion('${loc}')">${loc}</li>`).join('')
        : `<li>No results found</li>`;
      suggestions.classList.add('active');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        suggestions.classList.remove('active');
      }
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('active');
      const expanded = filterPanel.classList.contains('active');
      filterBtn.setAttribute('aria-expanded', String(expanded));
    });
  }

  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // In a real app, this would refresh store results
    });
  });
}

function selectSuggestion(loc) {
  const input = document.querySelector('.search-box input');
  const suggestions = document.querySelector('.search-suggestions');
  if (input) input.value = loc;
  if (suggestions) suggestions.classList.remove('active');
}

/* ============================================
   FAQ Accordion
   ============================================ */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}
