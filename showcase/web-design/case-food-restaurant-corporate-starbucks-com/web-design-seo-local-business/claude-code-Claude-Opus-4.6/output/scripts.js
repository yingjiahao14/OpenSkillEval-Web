document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initMobileMenu();
  initFooterAccordion();
  initRedemptionTabs();
  initCarousels();
  initFAQ();
  initStoreLocator();
  initMenuSidebar();
});

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  const agreeBtn = banner.querySelector('[data-cookie-agree]');
  const settingsBtn = banner.querySelector('[data-cookie-settings]');
  if (agreeBtn) agreeBtn.addEventListener('click', () => banner.classList.add('hidden'));
  if (settingsBtn) settingsBtn.addEventListener('click', () => banner.classList.add('hidden'));
}

function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('active');
    const spans = btn.querySelectorAll('span');
    if (nav.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

function initFooterAccordion() {
  if (window.innerWidth > 768) return;
  document.querySelectorAll('.footer-col h3').forEach(h3 => {
    h3.addEventListener('click', () => {
      const col = h3.parentElement;
      const wasExpanded = col.classList.contains('expanded');
      document.querySelectorAll('.footer-col').forEach(c => c.classList.remove('expanded'));
      if (!wasExpanded) col.classList.add('expanded');
    });
  });
}

function initRedemptionTabs() {
  const tabs = document.querySelectorAll('.redemption-tab');
  const contents = document.querySelectorAll('.redemption-content');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('[data-prev]');
    const nextBtn = carousel.querySelector('[data-next]');
    if (!track || !prevBtn || !nextBtn) return;
    let offset = 0;
    const items = track.children;
    const gap = 20;

    function getVisibleCount() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) return 3;
      return 4;
    }

    function getItemWidth() {
      if (items.length === 0) return 0;
      return items[0].offsetWidth + gap;
    }

    function update() {
      const maxOffset = Math.max(0, items.length - getVisibleCount());
      offset = Math.max(0, Math.min(offset, maxOffset));
      track.style.transform = `translateX(-${offset * getItemWidth()}px)`;
      prevBtn.disabled = offset === 0;
      nextBtn.disabled = offset >= maxOffset;
    }

    prevBtn.addEventListener('click', () => { offset--; update(); });
    nextBtn.addEventListener('click', () => { offset++; update(); });
    window.addEventListener('resize', () => { offset = 0; update(); });
    update();
  });
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = q.classList.contains('active');
      document.querySelectorAll('.faq-question').forEach(oq => {
        oq.classList.remove('active');
        oq.nextElementSibling.style.maxHeight = '0';
      });
      if (!isOpen) {
        q.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

function initStoreLocator() {
  const searchInput = document.getElementById('store-search');
  const suggestions = document.getElementById('search-suggestions');
  const filterBtn = document.querySelector('[data-filter-toggle]');
  const filterPanel = document.getElementById('filter-panel');
  const orderBtns = document.querySelectorAll('.order-type-btn');

  if (searchInput && suggestions) {
    const sampleLocations = [
      { name: 'Seattle, WA 98101', icon: 'city' },
      { name: 'Portland, OR 97201', icon: 'city' },
      { name: 'San Francisco, CA 94102', icon: 'city' },
      { name: '1912 Pike Place, Seattle, WA', icon: 'pin' },
      { name: 'Capitol Hill, Seattle, WA', icon: 'area' }
    ];
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim().toLowerCase();
      if (val.length < 2) { suggestions.classList.remove('active'); return; }
      const filtered = sampleLocations.filter(l => l.name.toLowerCase().includes(val));
      if (filtered.length) {
        suggestions.innerHTML = filtered.map(l =>
          `<div class="suggestion-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${l.name}</div>`
        ).join('');
        suggestions.classList.add('active');
        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
          item.addEventListener('click', () => {
            searchInput.value = item.textContent.trim();
            suggestions.classList.remove('active');
          });
        });
      } else {
        suggestions.classList.remove('active');
      }
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.search-input-wrap')) suggestions.classList.remove('active');
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => filterPanel.classList.toggle('active'));
  }

  if (filterPanel) {
    filterPanel.querySelectorAll('.filter-option').forEach(opt => {
      opt.addEventListener('click', () => opt.classList.toggle('checked'));
    });
  }

  orderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function initMenuSidebar() {
  document.querySelectorAll('.menu-sidebar a').forEach(link => {
    link.addEventListener('click', e => {
      document.querySelectorAll('.menu-sidebar a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}
