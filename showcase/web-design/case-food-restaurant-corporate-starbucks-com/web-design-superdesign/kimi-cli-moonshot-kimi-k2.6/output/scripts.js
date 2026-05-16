/**
 * GreenBean Coffee — Site Scripts
 */

(function () {
  'use strict';

  /* ============================================
     Mobile Navigation
     ============================================ */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        const isOpen = mobileNav.classList.contains('open');
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons();
      }
    });
  }

  /* ============================================
     Cookie Banner
     ============================================ */
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAgree = document.getElementById('cookieAgree');

  if (cookieBanner && cookieAgree) {
    // Check if already dismissed
    if (localStorage.getItem('greenbean-cookies-accepted') === 'true') {
      cookieBanner.classList.add('hidden');
    }

    cookieAgree.addEventListener('click', () => {
      cookieBanner.classList.add('hidden');
      localStorage.setItem('greenbean-cookies-accepted', 'true');
    });
  }

  /* ============================================
     Footer Accordion (Mobile)
     ============================================ */
  document.querySelectorAll('.footer-accordion-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      content.classList.toggle('open');
    });
  });

  /* ============================================
     Rewards Tabs
     ============================================ */
  const rewardsTabs = document.getElementById('rewardsTabs');
  if (rewardsTabs) {
    const tabBtns = rewardsTabs.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        tabPanels.forEach((panel) => {
          panel.classList.toggle('active', panel.id === target);
        });
      });
    });
  }

  /* ============================================
     Gift Card Carousels
     ============================================ */
  function initCarousel(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const carousel = wrapper.querySelector('.carousel');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');
    if (!carousel || !prevBtn || !nextBtn) return;

    const scrollAmount = 280;

    function updateButtons() {
      prevBtn.disabled = carousel.scrollLeft <= 0;
      nextBtn.disabled =
        carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
    }

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateButtons);
    updateButtons();
  }

  initCarousel('featuredCarousel');
  initCarousel('birthdayCarousel');
  initCarousel('thankYouCarousel');
  initCarousel('celebrationCarousel');
  initCarousel('appreciationCarousel');
  initCarousel('encouragementCarousel');
  initCarousel('workplaceCarousel');
  initCarousel('anytimeCarousel');

  /* ============================================
     Store Locator
     ============================================ */
  const filterBtn = document.getElementById('filterBtn');
  const filterPanel = document.getElementById('filterPanel');

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
    });
  }

  // Order type toggle
  const pickupBtn = document.getElementById('pickupBtn');
  const deliveryBtn = document.getElementById('deliveryBtn');

  if (pickupBtn && deliveryBtn) {
    pickupBtn.addEventListener('click', () => {
      pickupBtn.classList.add('active');
      deliveryBtn.classList.remove('active');
      updateStoreResults('pickup');
    });

    deliveryBtn.addEventListener('click', () => {
      deliveryBtn.classList.add('active');
      pickupBtn.classList.remove('active');
      updateStoreResults('delivery');
    });
  }

  // Search suggestions
  const searchInput = document.getElementById('storeSearch');
  const suggestions = document.getElementById('searchSuggestions');

  const dummyLocations = [
    'Seattle, WA',
    'Portland, OR',
    'San Francisco, CA',
    'Los Angeles, CA',
    'New York, NY',
    'Chicago, IL',
    'Austin, TX',
    'Denver, CO',
    'Boston, MA',
    'Miami, FL',
  ];

  if (searchInput && suggestions) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      if (val.length < 2) {
        suggestions.classList.remove('open');
        return;
      }

      const matches = dummyLocations.filter((loc) =>
        loc.toLowerCase().includes(val)
      );

      if (matches.length) {
        suggestions.innerHTML = matches
          .map((loc) => `<div class="suggestion-item">${loc}</div>`)
          .join('');
        suggestions.classList.add('open');

        suggestions.querySelectorAll('.suggestion-item').forEach((item) => {
          item.addEventListener('click', () => {
            searchInput.value = item.textContent;
            suggestions.classList.remove('open');
            updateStoreResults('search');
          });
        });
      } else {
        suggestions.classList.remove('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.classList.remove('open');
      }
    });
  }

  function updateStoreResults(type) {
    const list = document.getElementById('resultsList');
    if (!list) return;
    // Simple visual feedback — in production this would fetch real data
    list.style.opacity = '0.5';
    setTimeout(() => {
      list.style.opacity = '1';
    }, 300);
  }

  /* ============================================
     FAQ Accordion
     ============================================ */
  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      // Close others
      document.querySelectorAll('.faq-question').forEach((q) => {
        if (q !== question) {
          q.setAttribute('aria-expanded', 'false');
          q.nextElementSibling.classList.remove('open');
        }
      });

      question.setAttribute('aria-expanded', String(!isOpen));
      answer.classList.toggle('open');
    });
  });

  /* ============================================
     Scroll Animations
     ============================================ */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });

  /* ============================================
     Smooth scroll for anchor links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
