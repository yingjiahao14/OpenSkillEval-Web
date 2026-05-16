/**
 * LearnForge — Main JavaScript
 * Handles navigation, tabs, carousels, accordions, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroTabs();
  initWhyTabs();
  initCarousels();
  initAccordions();
  initScrollReveal();
  initDemoAccordion();
});

/* ============================================
   Navigation
   ============================================ */
function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  if (!nav) return;

  // Scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }
}

/* ============================================
   Hero Tabs (Creator vs Student View)
   ============================================ */
function initHeroTabs() {
  const tabs = document.querySelectorAll('.hero-tab');
  const views = document.querySelectorAll('.hero-view');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.view;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      views.forEach(v => {
        v.classList.remove('active');
        if (v.dataset.view === target) {
          v.classList.add('active');
        }
      });
    });
  });
}

/* ============================================
   Why Choose Us Tabs
   ============================================ */
function initWhyTabs() {
  const tabs = document.querySelectorAll('.why-tab');
  const contents = document.querySelectorAll('.why-content');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => {
        c.classList.remove('active');
        if (c.dataset.tab === target) {
          c.classList.add('active');
        }
      });
    });
  });
}

/* ============================================
   Testimonials Carousel
   ============================================ */
function initCarousels() {
  document.querySelectorAll('.testimonials-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonials-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || !cards.length) return;

    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    const totalSlides = Math.ceil(cards.length / itemsPerView);

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function getItemsPerView() {
      const width = window.innerWidth;
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    }

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth;
      track.style.transform = `translateX(-${currentIndex * cardWidth * itemsPerView}px)`;

      // Update dots
      const dots = carousel.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
      updateCarousel();
    }

    function next() {
      goToSlide((currentIndex + 1) % totalSlides);
    }

    function prev() {
      goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Auto-advance every 6 seconds
    let autoAdvance = setInterval(next, 6000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    carousel.addEventListener('mouseleave', () => {
      autoAdvance = setInterval(next, 6000);
    });

    // Handle resize
    window.addEventListener('resize', () => {
      const newItemsPerView = getItemsPerView();
      if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        currentIndex = 0;
        updateCarousel();
      }
    });

    updateCarousel();
  });
}

/* ============================================
   FAQ Accordion
   ============================================ */
function initAccordions() {
  document.querySelectorAll('.faq-list').forEach(list => {
    const items = list.querySelectorAll('.faq-item');

    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all in this list
        items.forEach(i => i.classList.remove('open'));

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  });
}

/* ============================================
   Product Demo Accordion
   ============================================ */
function initDemoAccordion() {
  const accordion = document.querySelector('.demo-accordion');
  if (!accordion) return;

  const header = accordion.querySelector('.demo-header');
  if (!header) return;

  header.addEventListener('click', () => {
    accordion.classList.toggle('open');
    const icon = header.querySelector('.faq-icon');
    if (icon) {
      icon.style.transform = accordion.classList.contains('open') ? 'rotate(45deg)' : 'rotate(0)';
    }
  });
}

/* ============================================
   Scroll Reveal
   ============================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}
