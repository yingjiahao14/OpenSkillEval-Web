/* CreativeHub JavaScript */

/* ===== Promo Banner ===== */
function initPromoBanner() {
  const banner = document.querySelector('.promo-banner');
  const closeBtn = banner?.querySelector('.promo-close');

  if (!banner) return;

  // Check if banner was previously closed
  if (sessionStorage.getItem('promoClosed')) {
    banner.style.display = 'none';
    return;
  }

  // Countdown timer
  const countdownEl = banner.querySelector('.countdown-timer');
  if (countdownEl) {
    let hours = 23;
    let minutes = 59;
    let seconds = 59;

    setInterval(() => {
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
          if (hours < 0) {
            hours = 23;
            minutes = 59;
            seconds = 59;
          }
        }
      }
      updateCountdown();
    }, 1000);

    function updateCountdown() {
      const hoursEl = countdownEl.querySelector('.hours');
      const minutesEl = countdownEl.querySelector('.minutes');
      const secondsEl = countdownEl.querySelector('.seconds');

      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
  }

  // Close button
  closeBtn?.addEventListener('click', () => {
    banner.style.display = 'none';
    sessionStorage.setItem('promoClosed', 'true');
  });
}

/* ===== Hero Carousel ===== */
function initHeroCarousel() {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.hero-track');
  const slides = carousel.querySelectorAll('.hero-slide');
  const prevBtn = carousel.querySelector('.carousel-arrow.prev');
  const nextBtn = carousel.querySelector('.carousel-arrow.next');
  const dots = carousel.querySelectorAll('.carousel-dot');

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

  prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

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

/* ===== Course Carousel ===== */
function initCourseCarousel() {
  const carousels = document.querySelectorAll('.course-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.course-carousel-track');
    const prevBtn = carousel.querySelector('.carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.carousel-arrow.next');

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 320;

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

/* ===== Credits Carousel ===== */
function initCreditsCarousel() {
  const carousel = document.querySelector('.credits-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.credits-track');
  const prevBtn = carousel.querySelector('.carousel-arrow.prev');
  const nextBtn = carousel.querySelector('.carousel-arrow.next');

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 340;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

/* ===== Courses Sidebar Filter ===== */
function initCoursesSidebar() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active from all links
      sidebarLinks.forEach(l => l.classList.remove('active'));
      // Add active to clicked link
      link.classList.add('active');

      const category = link.dataset.category;

      // Filter courses (simplified - in real app would filter actual courses)
      const courseCards = document.querySelectorAll('.course-list .course-card');
      courseCards.forEach(card => {
        if (!category || category === 'all') {
          card.style.display = '';
        } else {
          const cardCategory = card.dataset.category;
          card.style.display = cardCategory === category ? '' : 'none';
        }
      });
    });
  });
}

/* ===== Projects Masonry Filter ===== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSelect = document.querySelector('.sort-select select');
  const masonryItems = document.querySelectorAll('.masonry-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      masonryItems.forEach(item => {
        if (!filter || filter === 'all') {
          item.style.display = '';
        } else {
          const itemField = item.dataset.field;
          item.style.display = itemField === filter ? '' : 'none';
        }
      });
    });
  });

  sortSelect?.addEventListener('change', () => {
    // In a real app, would re-sort items
    console.log('Sort by:', sortSelect.value);
  });
}

/* ===== Pricing Toggle ===== */
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  const toggleLabel = document.querySelectorAll('.toggle-label');
  const yearlyPrice = document.querySelector('.price-yearly');
  const monthlyPrice = document.querySelector('.price-monthly');
  const billedYearly = document.querySelector('.billed-yearly');
  const billedMonthly = document.querySelector('.billed-monthly');
  const creditsYearly = document.querySelector('.credits-yearly');
  const creditsMonthly = document.querySelector('.credits-monthly');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('yearly');

    const isYearly = toggle.classList.contains('yearly');

    toggleLabel.forEach((label, i) => {
      label.classList.toggle('active', (i === 0 && isYearly) || (i === 1 && !isYearly));
    });

    if (yearlyPrice && monthlyPrice) {
      if (isYearly) {
        yearlyPrice.textContent = '$14.59';
        monthlyPrice.textContent = '$33.90';
      } else {
        yearlyPrice.textContent = '$33.90';
        monthlyPrice.textContent = '$14.59';
      }
    }

    if (billedYearly && billedMonthly) {
      billedYearly.style.display = isYearly ? '' : 'none';
      billedMonthly.style.display = !isYearly ? '' : 'none';
    }

    if (creditsYearly && creditsMonthly) {
      creditsYearly.style.display = isYearly ? '' : 'none';
      creditsMonthly.style.display = !isYearly ? '' : 'none';
    }
  });
}

/* ===== FAQ Accordion ===== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ===== Login Form ===== */
function initLoginForm() {
  const form = document.querySelector('.login-form');
  const passwordToggle = document.querySelector('.password-toggle');
  const passwordInput = document.querySelector('input[type="password"]');

  passwordToggle?.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    passwordToggle.innerHTML = isPassword
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]')?.value;
    const password = form.querySelector('input[type="password"]')?.value;

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate login
    console.log('Login:', { email, password });
    alert('Login functionality would submit to server');
  });
}

/* ===== Footer Accordion ===== */
function initFooterAccordion() {
  const accordions = document.querySelectorAll('.footer-accordion');

  accordions.forEach(accordion => {
    const header = accordion.querySelector('.footer-accordion-header');

    header?.addEventListener('click', () => {
      const isActive = accordion.classList.contains('active');

      // Close all
      accordions.forEach(a => a.classList.remove('active'));

      // Toggle clicked
      if (!isActive) {
        accordion.classList.add('active');
      }
    });
  });
}

/* ===== Plus Catalog Carousel ===== */
function initPlusCatalogCarousel() {
  const carousel = document.querySelector('.plus-catalog-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.course-carousel-track');
  const prevBtn = carousel.querySelector('.carousel-arrow.prev');
  const nextBtn = carousel.querySelector('.carousel-arrow.next');

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 320;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

/* ===== Initialize All ===== */
document.addEventListener('DOMContentLoaded', () => {
  initPromoBanner();
  initHeroCarousel();
  initCourseCarousel();
  initCreditsCarousel();
  initCoursesSidebar();
  initProjectsFilter();
  initPricingToggle();
  initFaqAccordion();
  initLoginForm();
  initFooterAccordion();
  initPlusCatalogCarousel();
});
