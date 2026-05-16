/* ============================================
   REDROOM FITNESS — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // Mobile Navigation
  // =============================================
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // =============================================
  // Lifestyle Carousel (Homepage)
  // =============================================
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    const dotsContainer = carousel.querySelector('.carousel__dots');
    let currentIndex = 0;
    let autoPlayInterval;
    let isTransitioning = false;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateSlide(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      currentIndex = index;
    }

    function goToSlide(index) {
      if (isTransitioning || index === currentIndex) return;
      if (index < 0 || index >= slides.length) return;
      isTransitioning = true;
      updateSlide(index);
      setTimeout(() => { isTransitioning = false; }, 400);
    }

    function nextSlide() { goToSlide((currentIndex + 1) % slides.length); }
    function prevSlide() { goToSlide((currentIndex - 1 + slides.length) % slides.length); }

    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
        resetAutoPlay();
      }
    });

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    updateSlide(0);
    startAutoPlay();
  }

  // =============================================
  // Floor / Treadmill Toggle (Workout Page)
  // =============================================
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const toggleContents = document.querySelectorAll('.toggle-content');

  if (toggleBtns.length && toggleContents.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        toggleContents.forEach(c => {
          c.classList.toggle('active', c.id === target);
        });
      });
    });
  }

  // =============================================
  // Instructor Location Filter
  // =============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorCards = document.querySelectorAll('.instructor-card');

  if (filterBtns.length && instructorCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        instructorCards.forEach(card => {
          if (filter === 'all' || card.dataset.location === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // =============================================
  // FAQ Accordion (RIDE FAQ Page)
  // =============================================
  const accordionItems = document.querySelectorAll('.accordion__item');

  if (accordionItems.length) {
    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion__trigger');
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all items (single-open behavior)
        accordionItems.forEach(i => i.classList.remove('open'));

        // Open clicked item if it wasn't already open
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // =============================================
  // Newsletter Validation
  // =============================================
  const newsletterForms = document.querySelectorAll('.newsletter__form');

  newsletterForms.forEach(form => {
    const input = form.querySelector('.newsletter__input');
    const errorEl = form.querySelector('.newsletter__error');
    const successEl = form.querySelector('.newsletter__success');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();

      // Clear previous states
      input.classList.remove('error');
      if (errorEl) errorEl.textContent = '';

      // Validate
      if (!email) {
        input.classList.add('error');
        if (errorEl) errorEl.textContent = 'Please enter your email address.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        input.classList.add('error');
        if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
        return;
      }

      // Success
      form.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
    });

    // Clear error on input
    input.addEventListener('input', () => {
      input.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
    });
  });

  // =============================================
  // Footer Country Selector
  // =============================================
  const countryTrigger = document.querySelector('.footer__country-trigger');
  const countryMenu = document.querySelector('.footer__country-menu');

  if (countryTrigger && countryMenu) {
    const countryLabel = countryTrigger.querySelector('.footer__country-label');

    countryTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      countryMenu.classList.toggle('open');
    });

    countryMenu.querySelectorAll('.footer__country-option').forEach(option => {
      option.addEventListener('click', () => {
        countryLabel.textContent = option.textContent;
        countryMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', () => {
      countryMenu.classList.remove('open');
    });
  }

  // =============================================
  // Active Nav Link Highlighting
  // =============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pageMap = {
    'index.html': 'home',
    'the-workout.html': 'workout',
    'instructors.html': 'instructors',
    'ride-faq.html': 'ride',
    'digital-platform.html': 'digital'
  };

  const currentSection = pageMap[currentPage];
  if (currentSection) {
    document.querySelectorAll(`.nav__link[data-page="${currentSection}"]`).forEach(link => {
      link.classList.add('nav__link--active');
    });
  }
});
