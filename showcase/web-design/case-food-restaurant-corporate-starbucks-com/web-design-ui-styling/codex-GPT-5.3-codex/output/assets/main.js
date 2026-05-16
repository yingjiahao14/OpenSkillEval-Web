(function () {
  const navBtn = document.querySelector('[data-mobile-nav-toggle]');
  const navMenu = document.querySelector('[data-mobile-nav]');
  if (navBtn && navMenu) {
    navBtn.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });
  }

  const cookie = document.querySelector('[data-cookie-banner]');
  const cookieAgree = document.querySelector('[data-cookie-agree]');
  if (cookie && cookieAgree) {
    if (localStorage.getItem('gb_cookie_agree') === 'yes') cookie.style.display = 'none';
    cookieAgree.addEventListener('click', function () {
      cookie.style.display = 'none';
      localStorage.setItem('gb_cookie_agree', 'yes');
    });
  }

  document.querySelectorAll('[data-footer-accordion]').forEach(function (col) {
    const head = col.querySelector('[data-footer-head]');
    if (!head) return;
    head.addEventListener('click', function () {
      if (window.innerWidth > 760) return;
      col.classList.toggle('open');
    });
  });

  const rewardsTabs = document.querySelectorAll('[data-reward-tab]');
  const rewardsPanel = document.querySelector('[data-reward-panel]');
  if (rewardsTabs.length && rewardsPanel) {
    const rewardsMap = {
      '25': 'Customize your drink: add an extra espresso shot, dairy alternative, or flavored syrup.',
      '60': 'Enjoy a bakery favorite like a croissant, cookie, or cake pop on us.',
      '100': 'Redeem for a handcrafted drink, hot breakfast, or parfait.',
      '200': 'Treat yourself to a sandwich, protein box, or a signature salad item.',
      '300': 'Take home whole-bean coffee, ready-to-brew packs, or select merchandise.',
      '400': 'Celebrate with premium gear including tumblers and limited seasonal merch.'
    };
    rewardsTabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        rewardsTabs.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        const key = btn.getAttribute('data-reward-tab');
        rewardsPanel.innerHTML = '<h3 class="h3">' + key + ' Stars</h3><p class="lead" style="margin:.55rem 0 0;">' + rewardsMap[key] + '</p>';
      });
    });
  }

  function initCarousel(root) {
    const track = root.querySelector('[data-carousel-track]');
    if (!track) return;
    const slides = Array.from(track.children);
    let index = 0;
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');

    function render() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
    }

    if (prev) {
      prev.addEventListener('click', function () {
        index = (index - 1 + slides.length) % slides.length;
        render();
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        index = (index + 1) % slides.length;
        render();
      });
    }
  }

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);

  const storeSearch = document.querySelector('[data-store-search]');
  const storeSuggestions = document.querySelector('[data-store-suggestions]');
  const results = document.querySelector('[data-store-results]');
  const filterBtn = document.querySelector('[data-filter-toggle]');
  const filterPanel = document.querySelector('[data-filter-panel]');
  const orderButtons = document.querySelectorAll('[data-order-type]');

  const mockResults = {
    pickup: ['GreenBean Central', 'Riverside Plaza', 'Maple & 7th'],
    delivery: ['Midtown Delivery Hub', 'Northside Express', 'University District']
  };

  function renderResults(type, query) {
    if (!results) return;
    const q = (query || '').toLowerCase();
    const list = mockResults[type].filter(function (item) {
      return !q || item.toLowerCase().includes(q);
    });
    results.innerHTML = list.map(function (name) {
      return '<article class="result-item"><h3 class="h3" style="font-size:1rem;">' + name + '</h3><p class="muted" style="margin:.35rem 0 0;">Open until 9:00 PM · 0.8 mi</p></article>';
    }).join('');
  }

  let activeType = 'pickup';
  if (storeSearch && storeSuggestions) {
    storeSearch.addEventListener('input', function () {
      const val = storeSearch.value.trim();
      if (val.length > 0) {
        storeSuggestions.style.display = 'block';
      } else {
        storeSuggestions.style.display = 'none';
      }
      renderResults(activeType, val);
    });
    storeSuggestions.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        storeSearch.value = b.textContent;
        storeSuggestions.style.display = 'none';
        renderResults(activeType, b.textContent);
      });
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', function () {
      filterPanel.style.display = filterPanel.style.display === 'block' ? 'none' : 'block';
    });
  }

  if (orderButtons.length) {
    orderButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        orderButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeType = btn.getAttribute('data-order-type');
        renderResults(activeType, storeSearch ? storeSearch.value : '');
      });
    });
    renderResults(activeType, '');
  }
})();
