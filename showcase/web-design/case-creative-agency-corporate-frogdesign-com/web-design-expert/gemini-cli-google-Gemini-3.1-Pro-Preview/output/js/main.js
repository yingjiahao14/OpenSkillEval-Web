document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
  }

  // Language Dropdown Toggle
  const langToggle = document.querySelector('.language-toggle');
  const langDropdown = document.querySelector('.language-dropdown');
  
  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = langToggle.getAttribute('aria-expanded') === 'true';
      langToggle.setAttribute('aria-expanded', !isExpanded);
      langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        langToggle.setAttribute('aria-expanded', 'false');
        langDropdown.classList.remove('show');
      }
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
      header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
      header.style.padding = '0';
      header.style.background = 'rgba(12, 12, 14, 0.8)';
    }
  });

  // Hero Carousel
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');
  const dotsNav = document.querySelector('.carousel-dots');
  const dots = Array.from(dotsNav.children);

  let currentSlideIndex = 0;
  let autoplayInterval;

  const updateCarousel = (index) => {
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    
    slides.forEach(slide => slide.classList.remove('current-slide'));
    slides[index].classList.add('current-slide');
    
    dots.forEach(dot => dot.classList.remove('current-dot'));
    dots[index].classList.add('current-dot');
  };

  const nextSlide = () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateCarousel(currentSlideIndex);
  };

  const prevSlide = () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateCarousel(currentSlideIndex);
  };

  if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });

    prevButton.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlideIndex = index;
      updateCarousel(currentSlideIndex);
      resetAutoplay();
    });
  });

  const startAutoplay = () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  startAutoplay();

  // Team Region Tabs
  const regionTabs = document.querySelectorAll('.region-tab');
  const teamRegions = document.querySelectorAll('.team-region');

  regionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active classes
      regionTabs.forEach(t => t.classList.remove('active'));
      teamRegions.forEach(r => r.classList.remove('active'));

      // Add active class to clicked tab and corresponding region
      tab.classList.add('active');
      const regionId = tab.getAttribute('data-region');
      document.getElementById('region-' + regionId).classList.add('active');
    });
  });

  // Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');

  if (cookieBanner) {
    // Show banner after short delay if not previously accepted/declined
    if (!localStorage.getItem('cookieConsent')) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1000);
    }

    const closeBanner = () => {
      cookieBanner.classList.remove('show');
    };

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        closeBanner();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        closeBanner();
      });
    }
  }
});
