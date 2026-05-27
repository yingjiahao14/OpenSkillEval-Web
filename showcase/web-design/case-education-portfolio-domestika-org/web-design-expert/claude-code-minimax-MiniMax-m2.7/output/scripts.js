// CreativeHub Shared JavaScript

// Promotional Banner Dismiss
function initPromoBanner() {
  const banner = document.querySelector('.promo-banner');
  const closeBtn = banner?.querySelector('.promo-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }
}

// Countdown Timer
function initCountdown() {
  const countdownEl = document.querySelector('.countdown-timer');
  if (!countdownEl) return;

  // Set countdown to 24 hours from now (for demo purposes)
  let endTime = new Date().getTime() + 24 * 60 * 60 * 1000;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
      countdownEl.textContent = 'EXPIRED';
      return;
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Hero Carousel
function initHeroCarousel() {
  const wrapper = document.querySelector('.hero-carousel');
  if (!wrapper) return;

  const track = wrapper.querySelector('.carousel-track');
  const slides = wrapper.querySelectorAll('.carousel-slide');
  const prevBtn = wrapper.querySelector('.carousel-prev');
  const nextBtn = wrapper.querySelector('.carousel-next');
  const dots = wrapper.querySelectorAll('.carousel-dot');

  if (!track || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }

  prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-advance every 5 seconds
  setInterval(() => goToSlide(currentSlide + 1), 5000);
}

// Course Carousel (Horizontal scroll with arrows)
function initCourseCarousel(carouselSelector) {
  const wrapper = document.querySelector(carouselSelector);
  if (!wrapper) return;

  const track = wrapper.querySelector('.course-carousel-track');
  const prevBtn = wrapper.querySelector('.carousel-prev');
  const nextBtn = wrapper.querySelector('.carousel-next');

  if (!track) return;

  const scrollAmount = 320;

  prevBtn?.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

// Credits Carousel
function initCreditsCarousel() {
  initCourseCarousel('.credits-carousel');
}

// Plus Pricing Toggle
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  const priceAmounts = document.querySelectorAll('.price-amount');
  const billedAmounts = document.querySelectorAll('.billed-amount');
  const savingsBadges = document.querySelectorAll('.savings-badge');
  const monthlyLabel = document.getElementById('monthly-label');
  const yearlyLabel = document.getElementById('yearly-label');

  if (!toggle) return;

  const prices = {
    yearly: { amount: '$14.59', billed: 'Billed as $174.50/year' },
    monthly: { amount: '$33.90', billed: 'Billed monthly' }
  };

  function updatePricing() {
    const isYearly = toggle.classList.contains('active');

    priceAmounts.forEach(el => {
      el.textContent = isYearly ? prices.yearly.amount : prices.monthly.amount;
    });

    billedAmounts.forEach(el => {
      el.textContent = isYearly ? prices.yearly.billed : prices.monthly.billed;
    });

    savingsBadges.forEach(el => {
      el.style.display = isYearly ? 'inline-block' : 'none';
    });

    if (monthlyLabel) {
      monthlyLabel.classList.toggle('active', !isYearly);
    }
    if (yearlyLabel) {
      yearlyLabel.classList.toggle('active', isYearly);
    }
  }

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    updatePricing();
  });

  // Initialize state
  updatePricing();
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// Footer Accordion (Mobile)
function initFooterAccordion() {
  const accordionItems = document.querySelectorAll('.footer-accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.footer-accordion-header');

    header?.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

// Sidebar Category Filtering
function initSidebarFilters() {
  const sidebarButtons = document.querySelectorAll('.sidebar-list button');
  const courseCards = document.querySelectorAll('.course-row-card');

  sidebarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      sidebarButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Filter logic would go here - for demo, all courses are visible
      courseCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Projects Sort and Filter
function initProjectFilters() {
  const sortSelect = document.querySelector('.sort-select');
  const timeFilters = document.querySelectorAll('.time-filter');
  const fieldFilters = document.querySelectorAll('.field-filter');
  const projectItems = document.querySelectorAll('.masonry-item');

  sortSelect?.addEventListener('change', (e) => {
    console.log('Sort by:', e.target.value);
    // Sort logic would reorder items
  });

  timeFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      timeFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      console.log('Time filter:', btn.dataset.time);
    });
  });

  fieldFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      fieldFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      console.log('Field filter:', btn.dataset.field);
    });
  });
}

// Login Form
function initLoginForm() {
  const form = document.querySelector('.login-form');
  const passwordInput = document.querySelector('#password');
  const passwordToggle = document.querySelector('.password-toggle');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Form validation and submission would be handled here
    const email = form.querySelector('#email')?.value;
    const password = passwordInput?.value;

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Login submitted:', { email });
  });

  passwordToggle?.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
  });
}

// Mobile Navigation Toggle
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.header-nav');

  toggle?.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  initPromoBanner();
  initCountdown();
  initHeroCarousel();
  initCourseCarousel('.course-carousel');
  initCreditsCarousel();
  initPricingToggle();
  initFaqAccordion();
  initFooterAccordion();
  initSidebarFilters();
  initProjectFilters();
  initLoginForm();
  initMobileNav();
});
