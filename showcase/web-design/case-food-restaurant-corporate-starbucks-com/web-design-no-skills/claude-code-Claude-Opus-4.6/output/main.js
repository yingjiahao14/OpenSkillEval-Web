/* GreenBean Coffee — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCookieBanner();
  initFooterAccordion();
  initRedemptionTabs();
  initCarousels();
  initStoreLocator();
  initFAQ();
});

/* ===== Mobile Navigation ===== */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (nav.classList.contains('open')) {
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

/* ===== Cookie Banner ===== */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  const agreeBtn = banner.querySelector('.cookie-agree');
  const settingsBtn = banner.querySelector('.cookie-settings');

  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
    });
  }
}

/* ===== Footer Accordion (Mobile) ===== */
function initFooterAccordion() {
  const cols = document.querySelectorAll('.footer-col');
  cols.forEach(col => {
    const heading = col.querySelector('h3');
    if (!heading) return;

    heading.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      const wasOpen = col.classList.contains('open');
      cols.forEach(c => c.classList.remove('open'));
      if (!wasOpen) col.classList.add('open');
    });
  });
}

/* ===== Rewards Redemption Tabs ===== */
function initRedemptionTabs() {
  const tabs = document.querySelectorAll('.redemption-tab');
  const panels = document.querySelectorAll('.redemption-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ===== Carousels ===== */
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel-wrapper');
  carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');
    if (!track || !prevBtn || !nextBtn) return;

    let offset = 0;
    const cardWidth = () => {
      const card = track.querySelector('.gift-card');
      if (!card) return 240;
      return card.offsetWidth + 20;
    };

    const maxScroll = () => {
      const visibleWidth = wrapper.offsetWidth;
      return Math.max(0, track.scrollWidth - visibleWidth);
    };

    const slide = (direction) => {
      const step = cardWidth() * 2;
      offset += direction * step;
      offset = Math.max(0, Math.min(offset, maxScroll()));
      track.style.transform = `translateX(-${offset}px)`;
    };

    prevBtn.addEventListener('click', () => slide(-1));
    nextBtn.addEventListener('click', () => slide(1));
  });
}

/* ===== Store Locator ===== */
function initStoreLocator() {
  const orderBtns = document.querySelectorAll('.order-type-btn');
  const filterBtn = document.querySelector('.filter-btn');
  const filterPanel = document.querySelector('.filter-panel');
  const filterChips = document.querySelectorAll('.filter-chip');
  const searchInput = document.querySelector('.search-input');
  const suggestionsEl = document.querySelector('.search-suggestions');

  orderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      animateStoreResults();
    });
  });

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
      filterBtn.classList.toggle('active');
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  if (searchInput && suggestionsEl) {
    const suggestions = [
      '1234 Pike Place, Seattle, WA',
      '555 Broadway, New York, NY',
      '200 Michigan Ave, Chicago, IL',
      '100 Market St, San Francisco, CA',
      '800 Congress Ave, Austin, TX'
    ];

    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim();
      if (val.length > 1) {
        const filtered = suggestions.filter(s =>
          s.toLowerCase().includes(val.toLowerCase())
        );
        if (filtered.length > 0) {
          suggestionsEl.innerHTML = filtered.map(s =>
            `<div class="suggestion-item">${s}</div>`
          ).join('');
          suggestionsEl.classList.add('active');
        } else {
          suggestionsEl.classList.remove('active');
        }
      } else {
        suggestionsEl.classList.remove('active');
      }
    });

    suggestionsEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('suggestion-item')) {
        searchInput.value = e.target.textContent;
        suggestionsEl.classList.remove('active');
        animateStoreResults();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box') && !e.target.closest('.search-suggestions')) {
        suggestionsEl.classList.remove('active');
      }
    });
  }
}

function animateStoreResults() {
  const cards = document.querySelectorAll('.store-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    setTimeout(() => {
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 80);
  });
}

/* ===== FAQ Accordion ===== */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}
