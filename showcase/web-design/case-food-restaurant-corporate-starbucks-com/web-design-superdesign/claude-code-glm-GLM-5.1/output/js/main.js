/* ===== GreenBean Coffee — Shared JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initMobileMenu();
  initFooterAccordion();
});

/* --- Cookie Banner --- */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  if (localStorage.getItem('greenbean-cookies-accepted')) {
    banner.remove();
    return;
  }

  setTimeout(() => banner.classList.add('is-visible'), 500);

  const agreeBtn = banner.querySelector('[data-cookie-agree]');
  const settingsBtn = banner.querySelector('[data-cookie-settings]');

  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      localStorage.setItem('greenbean-cookies-accepted', 'true');
      banner.classList.remove('is-visible');
      setTimeout(() => banner.remove(), 400);
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      alert('Cookie settings would open here.');
    });
  }
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    nav.classList.toggle('is-open');
    const icon = btn.querySelector('svg use');
    if (icon) {
      icon.setAttribute('href', isOpen ? '#icon-menu' : '#icon-x');
    }
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });
}

/* --- Footer Accordion (mobile) --- */
function initFooterAccordion() {
  const toggles = document.querySelectorAll('.footer-accordion-toggle');
  if (!toggles.length) return;

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (window.innerWidth >= 768) return;
      const content = toggle.nextElementSibling;
      const isOpen = toggle.classList.contains('is-open');

      toggle.classList.toggle('is-open');
      if (isOpen) {
        content.style.maxHeight = '0';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --- Tabs --- */
function initTabs(container) {
  const tabBtns = container.querySelectorAll('.tab-btn');
  const tabPanels = container.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('is-active'));
      tabPanels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      const panel = container.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('is-active');
    });
  });
}

/* --- Carousel --- */
function initCarousel(container, options = {}) {
  const track = container.querySelector('.carousel-track');
  const slides = container.querySelectorAll('.carousel-slide');
  const prevBtn = container.querySelector('.carousel-btn-prev');
  const nextBtn = container.querySelector('.carousel-btn-next');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const slidesPerView = options.slidesPerView || getSlidesPerView();
  const totalSteps = Math.max(0, slides.length - slidesPerView);

  function getSlidesPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return options.desktopSlides || 3;
  }

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    const offset = currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    if (prevBtn) prevBtn.disabled = currentIndex <= 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= totalSteps;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalSteps) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  updateCarousel();

  window.addEventListener('resize', () => {
    currentIndex = Math.min(currentIndex, totalSteps);
    updateCarousel();
  });
}

/* --- Toggle Group --- */
function initToggleGroup(container) {
  const btns = container.querySelectorAll('.toggle-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      container.dispatchEvent(new CustomEvent('toggle-change', {
        detail: { value: btn.dataset.value }
      }));
    });
  });
}

/* --- Filter Panel --- */
function initFilterPanel(container) {
  const filterBtn = container.querySelector('[data-filter-toggle]');
  const filterPanel = container.querySelector('.filter-panel');
  if (!filterBtn || !filterPanel) return;

  filterBtn.addEventListener('click', () => {
    filterPanel.classList.toggle('is-open');
    const isOpen = filterPanel.classList.contains('is-open');
    filterBtn.setAttribute('aria-expanded', isOpen);
  });
}

/* --- FAQ Accordion --- */
function initFaqAccordion(container) {
  const items = container.querySelectorAll('.faq-item');
  items.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    const content = item.querySelector('.faq-content');
    if (!toggle || !content) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.contains('is-open');
      toggle.classList.toggle('is-open');

      if (isOpen) {
        content.style.maxHeight = '0';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --- Search with Suggestions --- */
function initSearchWithSuggestions(input, suggestionsEl, options = {}) {
  if (!input || !suggestionsEl) return;

  const suggestions = options.suggestions || [];

  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase().trim();
    if (!val) {
      suggestionsEl.classList.remove('is-visible');
      return;
    }

    const matches = suggestions.filter(s => s.toLowerCase().includes(val));
    if (!matches.length) {
      suggestionsEl.classList.remove('is-visible');
      return;
    }

    suggestionsEl.innerHTML = matches.map(m => `
      <div class="search-suggestion-item" data-value="${m}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>${m}</span>
      </div>
    `).join('');

    suggestionsEl.classList.add('is-visible');

    suggestionsEl.querySelectorAll('.search-suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        input.value = item.dataset.value;
        suggestionsEl.classList.remove('is-visible');
        if (options.onSelect) options.onSelect(item.dataset.value);
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !suggestionsEl.contains(e.target)) {
      suggestionsEl.classList.remove('is-visible');
    }
  });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}
