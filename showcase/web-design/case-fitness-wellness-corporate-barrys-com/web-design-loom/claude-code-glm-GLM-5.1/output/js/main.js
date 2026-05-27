/* ============================================
   RedRoom Fitness — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initCarousel();
  initToggle();
  initInstructorFilter();
  initAccordion();
  initNewsletter();
});

/* --- Navigation Scroll --- */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const handleScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav__mobile-toggle');
  const menu = document.querySelector('.nav__mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Carousel --- */
function initCarousel() {
  const track = document.querySelector('.carousel__track');
  if (!track) return;

  const slides = track.querySelectorAll('.carousel__slide');
  const prevBtn = document.querySelector('.carousel__btn--prev');
  const nextBtn = document.querySelector('.carousel__btn--next');
  const dotsContainer = document.querySelector('.carousel__dots');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();
  let maxIndex = Math.max(0, slides.length - slidesPerView);

  function getSlidesPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth + 16;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const dotCount = maxIndex + 1;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = `carousel__dot${i === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function next() {
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function prev() {
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
  }

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  createDots();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      slidesPerView = getSlidesPerView();
      maxIndex = Math.max(0, slides.length - slidesPerView);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      createDots();
      updateCarousel();
    }, 150);
  });

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }, { passive: true });
}

/* --- Floor/Treadmill Toggle --- */
function initToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const toggleContents = document.querySelectorAll('.toggle-content');

  if (toggleBtns.length === 0) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      toggleContents.forEach(content => {
        content.classList.toggle('active', content.id === target);
      });
    });
  });
}

/* --- Instructor Filter --- */
function initInstructorFilter() {
  const filterSelect = document.querySelector('.filter-select');
  const cards = document.querySelectorAll('.instructor-card');

  if (!filterSelect || cards.length === 0) return;

  filterSelect.addEventListener('change', () => {
    const location = filterSelect.value;

    cards.forEach(card => {
      const cardLocation = card.dataset.location;
      if (location === 'all' || cardLocation === location) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
}

/* --- FAQ Accordion --- */
function initAccordion() {
  const items = document.querySelectorAll('.faq-item');

  if (items.length === 0) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items (single-open behavior)
      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it wasn't already open
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --- Newsletter Validation --- */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter__form');

  forms.forEach(form => {
    const input = form.querySelector('.newsletter__input');
    const message = form.querySelector('.newsletter__message');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Reset
      input.classList.remove('error', 'success');
      message.classList.remove('error', 'success');
      message.textContent = '';

      if (!email) {
        input.classList.add('error');
        message.classList.add('error');
        message.textContent = 'Please enter your email address.';
        return;
      }

      if (!emailRegex.test(email)) {
        input.classList.add('error');
        message.classList.add('error');
        message.textContent = 'Please enter a valid email address.';
        return;
      }

      // Success
      input.classList.add('success');
      message.classList.add('success');
      message.textContent = 'Welcome to the RedRoom community! Check your inbox.';
      input.value = '';
    });
  });
}
