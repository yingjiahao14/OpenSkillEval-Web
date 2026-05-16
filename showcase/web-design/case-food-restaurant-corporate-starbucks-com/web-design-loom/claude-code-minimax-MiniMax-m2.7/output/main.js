// GreenBean Coffee - Shared JavaScript

document.addEventListener('DOMContentLoaded', function() {
  initCookieBanner();
  initFooterAccordion();
  initRewardsTabs();
  initGiftCarousels();
  initStoreLocator();
  initFAQ();
  initMenuSidebar();
});

// Cookie Banner
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  const agreeBtn = document.querySelector('.cookie-agree');
  const settingsBtn = document.querySelector('.cookie-settings');

  if (!banner) return;

  // Show banner after 1 second
  setTimeout(() => {
    if (!localStorage.getItem('cookiesAccepted')) {
      banner.classList.add('show');
    }
  }, 1000);

  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      banner.classList.remove('show');
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      // Open settings modal (placeholder)
      alert('Cookie settings would open here');
    });
  }
}

// Footer Accordion (Mobile)
function initFooterAccordion() {
  const accordions = document.querySelectorAll('.footer-accordion');

  accordions.forEach(accordion => {
    const btn = accordion.querySelector('.footer-accordion-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        accordions.forEach(other => {
          if (other !== accordion) other.classList.remove('open');
        });
        accordion.classList.toggle('open');
      });
    }
  });
}

// Rewards Tabs
function initRewardsTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.redemption-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetId) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Gift Card Carousels
function initGiftCarousels() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.parentElement.querySelector('.carousel-prev');
    const nextBtn = carousel.parentElement.querySelector('.carousel-next');

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cards = track.querySelectorAll('.gift-card');
    const cardWidth = cards[0].offsetWidth + 24; // Including gap

    function getVisibleCount() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) return 3;
      return 4;
    }

    function updateCarousel() {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visibleCount);
      currentIndex = Math.min(currentIndex, maxIndex);
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visibleCount);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    window.addEventListener('resize', updateCarousel);
  });
}

// Store Locator
function initStoreLocator() {
  const searchInput = document.querySelector('.store-search input');
  const filterBtn = document.querySelector('.filter-btn');
  const filterPanel = document.querySelector('.filter-panel');
  const orderTypeBtns = document.querySelectorAll('.toggle-btn');
  const storeItems = document.querySelectorAll('.store-item');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      storeItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
      });
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('show');
    });
  }

  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  storeItems.forEach(item => {
    item.addEventListener('click', () => {
      storeItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Filter chips
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    }
  });
}

// Menu Sidebar Active State
function initMenuSidebar() {
  const menuLinks = document.querySelectorAll('.menu-nav a');

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      menuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// Category Filter for Gift Cards
function filterGiftCategory(category) {
  const cards = document.querySelectorAll('.gift-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
