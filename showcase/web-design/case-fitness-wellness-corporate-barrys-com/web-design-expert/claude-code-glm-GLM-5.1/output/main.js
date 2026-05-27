/* ============================================
   RedRoom Fitness — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initNewsletterForms();
  initCountrySelector();
});

/* --- Navigation --- */
function initNav() {
  const burger = document.querySelector('.nav__burger');
  const mobileNav = document.querySelector('.nav__mobile');

  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
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

  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();
  let maxIndex = Math.max(0, slides.length - slidesPerView);

  function getSlidesPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    const slideWidth = slides[0] ? slides[0].offsetWidth : 0;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    const totalDots = maxIndex + 1;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel__dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
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

  // Touch / swipe support
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < maxIndex) {
        currentIndex++;
      } else if (diff < 0 && currentIndex > 0) {
        currentIndex--;
      }
      updateCarousel();
    }
  }, { passive: true });

  // Resize handler
  window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    maxIndex = Math.max(0, slides.length - slidesPerView);
    currentIndex = Math.min(currentIndex, maxIndex);
    updateCarousel();
  });

  updateCarousel();
}

/* --- Floor / Treadmill Toggle --- */
function initToggle() {
  const tabs = document.querySelectorAll('.toggle-tab');
  const contents = document.querySelectorAll('.toggle-content');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.querySelector(`.toggle-content[data-tab="${target}"]`).classList.add('active');
    });
  });
}

/* --- Instructor Filter --- */
function initInstructorFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.instructor-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const location = btn.dataset.location;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        if (location === 'all' || card.dataset.location === location) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- FAQ Accordion --- */
function initAccordion() {
  const items = document.querySelectorAll('.faq-item');

  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others (single-open behavior)
      items.forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* --- Newsletter Forms --- */
function initNewsletterForms() {
  document.querySelectorAll('.newsletter__form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter__input');
      const msg = form.querySelector('.newsletter__msg');
      const email = input.value.trim();

      // Reset
      input.classList.remove('error', 'success');
      msg.classList.remove('error', 'success');
      msg.textContent = '';

      if (!email) {
        input.classList.add('error');
        msg.classList.add('error');
        msg.textContent = 'Please enter your email address.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        input.classList.add('error');
        msg.classList.add('error');
        msg.textContent = 'Please enter a valid email address.';
        return;
      }

      input.classList.add('success');
      msg.classList.add('success');
      msg.textContent = 'You\'re in! Welcome to the RedRoom community.';
      input.value = '';
    });
  });
}

/* --- Country Selector --- */
function initCountrySelector() {
  const btn = document.querySelector('.footer__country-btn');
  const dropdown = document.querySelector('.footer__country-dropdown');

  if (!btn || !dropdown) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  dropdown.querySelectorAll('.footer__country-option').forEach(option => {
    option.addEventListener('click', () => {
      btn.querySelector('span').textContent = option.textContent;
      dropdown.querySelectorAll('.footer__country-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      dropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });
}
