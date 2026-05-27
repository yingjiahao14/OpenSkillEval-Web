// CreativeHub JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initMobileMenu();
  initPromoBanner();
  initPricingToggle();
  initFAQAccordion();
  initFooterAccordion();
  initProjectFilters();
  initPasswordToggle();
  initSidebarFilters();
});

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }
}

// Promo Banner
function initPromoBanner() {
  const banner = document.querySelector('.promo-banner');
  const closeBtn = banner?.querySelector('.close-btn');

  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }
}

// Carousel System
function initCarousels() {
  document.querySelectorAll('.hero-carousel').forEach(initHeroCarousel);
  document.querySelectorAll('.mini-carousel').forEach(initMiniCarousel);
}

function initHeroCarousel(carousel) {
  const track = carousel.querySelector('.hero-carousel-track');
  const slides = carousel.querySelectorAll('.hero-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const prevBtn = carousel.querySelector('.carousel-arrow.prev');
  const nextBtn = carousel.querySelector('.carousel-arrow.next');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-play
  let autoplay = setInterval(() => goToSlide(currentIndex + 1), 5000);

  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });
}

function initMiniCarousel(carousel) {
  const track = carousel.querySelector('.mini-carousel-track');
  const items = carousel.querySelectorAll('.mini-carousel-item');
  const prevBtn = carousel.querySelector('.carousel-btn-small.prev');
  const nextBtn = carousel.querySelector('.carousel-btn-small.next');

  if (!track || items.length === 0) return;

  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth + 24; // including gap
  const visibleItems = Math.floor(carousel.offsetWidth / itemWidth) || 3;
  const maxIndex = Math.max(0, items.length - visibleItems);

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateCarousel();
    });
  }
}

// Pricing Toggle
function initPricingToggle() {
  const toggleBtns = document.querySelectorAll('.pricing-toggle-btn');
  const pricingCards = document.querySelectorAll('.pricing-card');

  if (toggleBtns.length === 0) return;

  const prices = {
    yearly: { monthly: '$14.59', billed: '$174.50/year' },
    monthly: { monthly: '$33.90', billed: '$33.90/month' }
  };

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const period = btn.dataset.period;

      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update visible cards based on period
      pricingCards.forEach(card => {
        const cardPeriod = card.dataset.period;
        card.style.display = cardPeriod === period ? 'block' : 'none';
      });
    });
  });
}

// FAQ Accordion
function initFAQAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');

    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) activeItem.classList.remove('active');
      });

      item.classList.toggle('active', !isActive);
    });
  });
}

// Footer Accordion (Mobile)
function initFooterAccordion() {
  document.querySelectorAll('.footer-accordion').forEach(accordion => {
    const header = accordion.querySelector('.footer-accordion-header');

    header?.addEventListener('click', () => {
      const isActive = accordion.classList.contains('active');

      document.querySelectorAll('.footer-accordion.active').forEach(active => {
        if (active !== accordion) active.classList.remove('active');
      });

      accordion.classList.toggle('active', !isActive);
    });
  });
}

// Project Filters
function initProjectFilters() {
  const sortSelect = document.querySelector('.filter-sort');
  const timeFilters = document.querySelectorAll('.filter-chip[data-filter="time"]');
  const fieldFilters = document.querySelectorAll('.filter-chip[data-filter="field"]');
  const gallery = document.querySelector('.masonry-gallery');

  if (!gallery) return;

  const projects = Array.from(gallery.querySelectorAll('.masonry-item'));

  function filterProjects() {
    const sortValue = sortSelect?.value || 'featured';
    const activeTime = document.querySelector('.filter-chip[data-filter="time"].active')?.dataset.value || 'all';
    const activeField = document.querySelector('.filter-chip[data-filter="field"].active')?.dataset.value || 'all';

    // Simple filter simulation - in real app would filter by data attributes
    let filtered = projects;

    // Re-sort
    if (sortValue === 'featured') {
      filtered.sort(() => 0.5 - Math.random());
    } else if (sortValue === 'most-liked') {
      filtered.sort((a, b) => {
        const likesA = parseInt(a.dataset.likes || 0);
        const likesB = parseInt(b.dataset.likes || 0);
        return likesB - likesA;
      });
    } else if (sortValue === 'most-viewed') {
      filtered.sort((a, b) => {
        const viewsA = parseInt(a.dataset.views || 0);
        const viewsB = parseInt(b.dataset.views || 0);
        return viewsB - viewsA;
      });
    }

    // Re-append in order
    filtered.forEach(project => gallery.appendChild(project));
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', filterProjects);
  }

  [timeFilters, fieldFilters].forEach(filters => {
    filters.forEach(chip => {
      chip.addEventListener('click', () => {
        filters.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        filterProjects();
      });
    });
  });
}

// Password Toggle
function initPasswordToggle() {
  const toggleBtn = document.querySelector('.password-toggle');
  const passwordInput = document.querySelector('input[type="password"]');

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleBtn.innerHTML = isPassword
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    });
  }
}

// Sidebar Filters (Courses page)
function initSidebarFilters() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  const courseCards = document.querySelectorAll('.course-card');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      filterCourses({ category });
    });
  });

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const filter = link.dataset.filter;
      filterCourses({ filter });
    });
  });

  function filterCourses({ category, filter }) {
    courseCards.forEach(card => {
      const cardCategory = card.dataset.category;
      const cardType = card.dataset.type;

      const showByCategory = !category || cardCategory === category;
      const showByFilter = !filter || cardType === filter || filter === 'all';

      card.style.display = showByCategory && showByFilter ? 'block' : 'none';
    });
  }
}
