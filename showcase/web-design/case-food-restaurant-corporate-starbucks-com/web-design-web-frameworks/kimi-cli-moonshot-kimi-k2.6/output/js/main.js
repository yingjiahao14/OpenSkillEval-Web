/* ============================================
   GreenBean Coffee — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // Cookie Banner
  // ==========================================
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAgree = document.getElementById('cookieAgree');

  if (cookieBanner && cookieAgree) {
    // Check if already dismissed
    if (localStorage.getItem('greenbean-cookie-dismissed')) {
      cookieBanner.classList.add('hidden');
    }
    cookieAgree.addEventListener('click', function() {
      cookieBanner.classList.add('hidden');
      localStorage.setItem('greenbean-cookie-dismissed', 'true');
    });
  }

  // ==========================================
  // Mobile Menu
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMain = document.getElementById('navMain');

  if (mobileMenuBtn && navMain) {
    mobileMenuBtn.addEventListener('click', function() {
      navMain.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (navMain.classList.contains('open')) {
        icon.classList.remove('ri-menu-line');
        icon.classList.add('ri-close-line');
        navMain.style.display = 'flex';
        navMain.style.flexDirection = 'column';
        navMain.style.position = 'absolute';
        navMain.style.top = '64px';
        navMain.style.left = '0';
        navMain.style.right = '0';
        navMain.style.background = 'rgba(255,255,255,0.98)';
        navMain.style.padding = '24px';
        navMain.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
        navMain.style.gap = '16px';
        navMain.style.zIndex = '99';
      } else {
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
        navMain.style.display = '';
      }
    });
  }

  // ==========================================
  // Footer Accordion (Mobile)
  // ==========================================
  const footerCols = document.querySelectorAll('.footer-col');

  footerCols.forEach(function(col) {
    const heading = col.querySelector('h4');
    if (heading) {
      heading.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          col.classList.toggle('open');
        }
      });
    }
  });

  // ==========================================
  // Rewards Redemption Tabs
  // ==========================================
  const redemptionTabs = document.querySelectorAll('.redemption-tab');
  const redemptionPanels = document.querySelectorAll('.redemption-panel');

  redemptionTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const target = tab.dataset.tab;

      redemptionTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');

      redemptionPanels.forEach(function(panel) {
        panel.classList.toggle('active', panel.dataset.panel === target);
      });
    });
  });

  // ==========================================
  // Gift Card Carousels
  // ==========================================
  function initCarousel(trackId, prevId, nextId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    if (!track) return;

    const scrollAmount = 260;

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  }

  initCarousel('featuredTrack', 'featuredPrev', 'featuredNext');
  initCarousel('birthdayTrack', 'birthdayPrev', 'birthdayNext');
  initCarousel('thankYouTrack', 'thankYouPrev', 'thankYouNext');
  initCarousel('celebrationTrack', 'celebrationPrev', 'celebrationNext');
  initCarousel('appreciationTrack', 'appreciationPrev', 'appreciationNext');
  initCarousel('encouragementTrack', 'encouragementPrev', 'encouragementNext');
  initCarousel('workplaceTrack', 'workplacePrev', 'workplaceNext');
  initCarousel('anytimeTrack', 'anytimePrev', 'anytimeNext');

  // ==========================================
  // Store Locator
  // ==========================================
  const orderToggleBtns = document.querySelectorAll('.order-toggle button');
  orderToggleBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      orderToggleBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  const filterBtn = document.getElementById('filterBtn');
  const filterPanel = document.getElementById('filterPanel');

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', function() {
      filterPanel.classList.toggle('open');
    });
  }

  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      chip.classList.toggle('active');
    });
  });

  // Store search with suggestions
  const searchInput = document.getElementById('storeSearch');
  const suggestionsBox = document.getElementById('searchSuggestions');

  const sampleLocations = [
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

  if (searchInput && suggestionsBox) {
    searchInput.addEventListener('input', function() {
      const val = searchInput.value.toLowerCase().trim();
      if (val.length < 1) {
        suggestionsBox.classList.remove('open');
        return;
      }
      const matches = sampleLocations.filter(function(loc) {
        return loc.toLowerCase().includes(val);
      });
      if (matches.length > 0) {
        suggestionsBox.innerHTML = matches.map(function(m) {
          return '<div class="suggestion-item">' + m + '</div>';
        }).join('');
        suggestionsBox.classList.add('open');

        suggestionsBox.querySelectorAll('.suggestion-item').forEach(function(item) {
          item.addEventListener('click', function() {
            searchInput.value = item.textContent;
            suggestionsBox.classList.remove('open');
          });
        });
      } else {
        suggestionsBox.classList.remove('open');
      }
    });

    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.classList.remove('open');
      }
    });
  }

  // ==========================================
  // FAQ Accordion
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(function(i) { i.classList.remove('open'); });
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ==========================================
  // Active nav link
  // ==========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main a').forEach(function(link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

});
