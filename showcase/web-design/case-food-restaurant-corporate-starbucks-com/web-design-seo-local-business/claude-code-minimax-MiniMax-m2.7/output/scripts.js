/* GreenBean Coffee — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initFooterAccordion();
});

/* Cookie Banner */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  const agreeBtn = document.querySelector('.cookie-banner__actions .btn--primary');
  const settingsBtn = document.querySelector('.cookie-banner__actions .btn--secondary');

  if (!banner) return;

  if (!localStorage.getItem('cookiesAccepted')) {
    banner.classList.add('show');
  }

  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      banner.classList.remove('show');
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      console.log('Cookie settings clicked');
    });
  }
}

/* Footer Accordion (Mobile) */
function initFooterAccordion() {
  const accordionItems = document.querySelectorAll('.footer__accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.footer__accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.footer__accordion-item').forEach(i => {
          i.classList.remove('active');
        });
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* Reward Tabs */
function initRewardTabs() {
  const tabs = document.querySelectorAll('.redemption-tab');
  const contents = document.querySelectorAll('.redemption-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* Carousel Navigation */
function initCarousel(carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const cards = carousel.querySelectorAll('.carousel__card');
  const prevBtn = carousel.querySelector('.carousel__btn--prev');
  const nextBtn = carousel.querySelector('.carousel__btn--next');

  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 20;
  const visibleCount = getVisibleCount();

  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  function updateCarousel() {
    const maxIndex = Math.max(0, cards.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);
    currentIndex = Math.max(currentIndex, 0);
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) currentIndex = cards.length - visibleCount;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex > cards.length - visibleCount) currentIndex = 0;
      updateCarousel();
    });
  }

  window.addEventListener('resize', () => {
    const newVisibleCount = getVisibleCount();
    if (newVisibleCount !== visibleCount) {
      location.reload();
    }
  });
}

/* Store Locator */
function initStoreLocator() {
  const orderTypeButtons = document.querySelectorAll('.order-type-toggle button');
  const filterBtn = document.querySelector('.filter-btn');
  const filterPanel = document.querySelector('.filter-panel');
  const searchInput = document.querySelector('.search-input-wrapper input');
  const storeCards = document.querySelectorAll('.store-card');

  if (orderTypeButtons.length) {
    orderTypeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        orderTypeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('show');
    });
  }

  if (searchInput) {
    const suggestions = document.querySelector('.search-suggestions');
    searchInput.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      if (suggestions) {
        suggestions.style.display = value ? 'block' : 'none';
      }
    });

    searchInput.addEventListener('blur', () => {
      setTimeout(() => {
        if (suggestions) suggestions.style.display = 'none';
      }, 200);
    });
  }

  storeCards.forEach(card => {
    card.addEventListener('click', () => {
      storeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* FAQ Accordion */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* Initialize page-specific scripts */
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.redemption-tabs')) {
    initRewardTabs();
  }

  if (document.querySelector('.carousel')) {
    document.querySelectorAll('.carousel').forEach(carousel => {
      initCarousel(carousel.id);
    });
  }

  if (document.querySelector('.store-search')) {
    initStoreLocator();
  }

  if (document.querySelector('.faq-section')) {
    initFAQ();
  }
});