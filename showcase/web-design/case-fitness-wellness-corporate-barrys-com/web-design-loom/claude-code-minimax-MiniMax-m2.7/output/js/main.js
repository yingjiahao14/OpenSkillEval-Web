/* =============================================
   REDROOM FITNESS — JavaScript Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCarousel();
  initToggle();
  initFAQ();
  initNewsletter();
  initCountrySelector();
  initInstructorFilter();
});

/* --- Mobile Navigation --- */
function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__mobile-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav__mobile-menu .nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
    });
  });
}

/* --- Hero Carousel --- */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const prevBtn = carousel.querySelector('.carousel__arrow--prev');
  const nextBtn = carousel.querySelector('.carousel__arrow--next');
  const dotsContainer = carousel.querySelector('.carousel__controls');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval;

  // Create dots
  if (dotsContainer) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel__dot');
      if (i === 0) dot.classList.add('carousel__dot--active');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    if (currentIndex >= totalSlides) currentIndex = 0;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
        dot.classList.toggle('carousel__dot--active', i === currentIndex);
      });
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (diff > swipeThreshold) {
      nextSlide();
    } else if (diff < -swipeThreshold) {
      prevSlide();
    }
  }

  // Start autoplay
  startAutoplay();
}

/* --- Floor/Treadmill Toggle --- */
function initToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const toggleContents = document.querySelectorAll('.toggle-content');

  if (toggleBtns.length === 0) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      // Update button states
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content
      toggleContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
        }
      });
    });
  });
}

/* --- FAQ Accordion (Single Open) --- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items (single-open behavior)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });
}

/* --- Newsletter Form --- */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter__form');

  forms.forEach(form => {
    const input = form.querySelector('.newsletter__input');
    const submitBtn = form.querySelector('.newsletter__submit');
    const errorEl = form.parentElement.querySelector('.newsletter__error');
    const successEl = form.parentElement.querySelector('.newsletter__success');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Reset states
      input.classList.remove('error');
      if (errorEl) errorEl.classList.remove('show');
      if (successEl) successEl.classList.remove('show');

      // Validate
      if (!email) {
        input.classList.add('error');
        if (errorEl) {
          errorEl.textContent = 'Please enter your email address.';
          errorEl.classList.add('show');
        }
        return;
      }

      if (!emailRegex.test(email)) {
        input.classList.add('error');
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid email address.';
          errorEl.classList.add('show');
        }
        return;
      }

      // Success
      if (successEl) {
        successEl.textContent = 'Thanks for subscribing! Check your inbox for confirmation.';
        successEl.classList.add('show');
      }
      input.value = '';
    });
  });
}

/* --- Country Selector --- */
function initCountrySelector() {
  const selectors = document.querySelectorAll('.country-selector');

  selectors.forEach(selector => {
    const btn = selector.querySelector('.country-selector__btn');
    const options = selector.querySelectorAll('.country-selector__option');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other open selectors
        selectors.forEach(other => {
          if (other !== selector) other.classList.remove('open');
        });
        selector.classList.toggle('open');
      });
    }

    options.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.dataset.value;
        const text = option.textContent;

        // Update button text
        if (btn) {
          btn.innerHTML = `${text} <span>▼</span>`;
        }

        selector.classList.remove('open');
      });
    });
  });

  // Close on outside click
  document.addEventListener('click', () => {
    selectors.forEach(selector => {
      selector.classList.remove('open');
    });
  });
}

/* --- Instructor Location Filter --- */
function initInstructorFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorCards = document.querySelectorAll('.instructor-card');

  if (filterBtns.length === 0 || instructorCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const location = btn.dataset.location;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      instructorCards.forEach(card => {
        const cardLocation = card.dataset.location;

        if (location === 'all' || cardLocation === location) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
