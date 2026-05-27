/* GreenBean Coffee — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCookieBanner();
  initFooterAccordion();
});

/* ── Header ── */
function initHeader() {
  const header = document.querySelector('.site-header');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  // Scroll shadow
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // Mobile menu toggle
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ── Cookie Banner ── */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  if (localStorage.getItem('gb-cookies-accepted')) {
    banner.remove();
    return;
  }

  setTimeout(() => banner.classList.add('visible'), 800);

  const agreeBtn = document.getElementById('cookie-agree');
  const settingsBtn = document.getElementById('cookie-settings');

  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      localStorage.setItem('gb-cookies-accepted', 'true');
      banner.classList.remove('visible');
      banner.classList.add('hidden');
      setTimeout(() => banner.remove(), 500);
    });
  }
}

/* ── Footer Accordion (mobile) ── */
function initFooterAccordion() {
  const isMobile = () => window.innerWidth < 768;
  const headings = document.querySelectorAll('.footer-heading');

  headings.forEach(heading => {
    heading.addEventListener('click', () => {
      if (!isMobile()) return;
      const links = heading.nextElementSibling;
      const isOpen = heading.classList.toggle('open');
      if (links && links.classList.contains('footer-links')) {
        links.classList.toggle('open', isOpen);
      }
    });
  });
}

/* ── Carousel ── */
function initCarousel(containerId, trackId, prevId, nextId, itemWidth, gap) {
  const container = document.getElementById(containerId);
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  if (!container || !track || !prevBtn || !nextBtn) return;

  let position = 0;
  const step = (itemWidth + gap) * 2;

  function getMaxScroll() {
    return Math.max(0, track.scrollWidth - container.clientWidth);
  }

  function updateButtons() {
    prevBtn.disabled = position <= 0;
    nextBtn.disabled = position >= getMaxScroll();
  }

  function slide(dir) {
    const max = getMaxScroll();
    position = dir === 'next'
      ? Math.min(position + step, max)
      : Math.max(position - step, 0);
    track.style.transform = `translateX(-${position}px)`;
    updateButtons();
  }

  prevBtn.addEventListener('click', () => slide('prev'));
  nextBtn.addEventListener('click', () => slide('next'));
  updateButtons();

  window.addEventListener('resize', () => {
    position = Math.min(position, getMaxScroll());
    track.style.transform = `translateX(-${position}px)`;
    updateButtons();
  });
}

/* ── Tabs ── */
function initTabs(tabGroupId) {
  const group = document.getElementById(tabGroupId);
  if (!group) return;

  const buttons = group.querySelectorAll('.tab-btn');
  const contents = group.querySelectorAll('.tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      buttons.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector(`[data-tab-content="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ── Store Locator ── */
function initStoreLocator() {
  const searchInput = document.getElementById('store-search');
  const suggestions = document.getElementById('search-suggestions');
  const filterBtn = document.getElementById('filter-btn');
  const filterPanel = document.getElementById('filter-panel');
  const pickupBtn = document.getElementById('pickup-btn');
  const deliveryBtn = document.getElementById('delivery-btn');

  // Search suggestions
  const sampleLocations = [
    { name: 'New York, NY', icon: '📍' },
    { name: 'Los Angeles, CA', icon: '📍' },
    { name: 'Chicago, IL', icon: '📍' },
    { name: 'Seattle, WA', icon: '📍' },
    { name: 'Portland, OR', icon: '📍' },
  ];

  if (searchInput && suggestions) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim().toLowerCase();
      if (val.length < 2) {
        suggestions.classList.remove('visible');
        return;
      }
      const matches = sampleLocations.filter(l => l.name.toLowerCase().includes(val));
      if (matches.length === 0) {
        suggestions.classList.remove('visible');
        return;
      }
      suggestions.innerHTML = matches.map(l =>
        `<a href="#" onclick="event.preventDefault()">
          <span>${l.icon}</span>
          <span>${l.name}</span>
        </a>`
      ).join('');
      suggestions.classList.add('visible');
    });

    searchInput.addEventListener('blur', () => {
      setTimeout(() => suggestions.classList.remove('visible'), 200);
    });
  }

  // Filter panel toggle
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
      const isOpen = filterPanel.classList.contains('open');
      filterBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // Order type toggle
  if (pickupBtn && deliveryBtn) {
    pickupBtn.addEventListener('click', () => {
      pickupBtn.classList.add('active');
      deliveryBtn.classList.remove('active');
    });
    deliveryBtn.addEventListener('click', () => {
      deliveryBtn.classList.add('active');
      pickupBtn.classList.remove('active');
    });
  }
}

/* ── FAQ Accordion ── */
function initFaq() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.toggle('open');
      if (answer) answer.classList.toggle('open', isOpen);
    });
  });
}
