/* ========================================
   LearnForge — Interactive Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnimations();
  initFAQAccordions();
  initTestimonialCarousels();
  initTabComponents();
  initHeroViewTabs();
  initSmoothScroll();
});

/* --- Navigation --- */
function initNav() {
  const nav = document.querySelector('.nav-fixed');
  if (!nav) return;

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

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

  elements.forEach(el => observer.observe(el));
}

/* --- FAQ Accordion --- */
function initFAQAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others in the same FAQ group
      const parent = item.closest('.faq-group');
      if (parent) {
        parent.querySelectorAll('.faq-item.open').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('open');
          }
        });
      }

      // Toggle current
      item.classList.toggle('open', !isOpen);
    });
  });
}

/* --- Testimonial Carousel --- */
function initTestimonialCarousels() {
  const carousels = document.querySelectorAll('.testimonial-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.testimonial-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    function getCardsPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - cardsPerView);
    }

    function updateCarousel() {
      const cardWidth = cards[0] ? cards[0].offsetWidth : 0;
      const gap = 24; // gap-6 = 1.5rem = 24px
      track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      const totalDots = getMaxIndex() + 1;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
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
        currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
        updateCarousel();
      });
    }

    // Auto-advance
    let autoPlayInterval = setInterval(() => {
      currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
      updateCarousel();
    }, 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(() => {
        currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
        updateCarousel();
      }, 5000);
    });

    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cardsPerView = getCardsPerView();
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateCarousel();
      }, 200);
    });

    updateCarousel();
  });
}

/* --- Tab Components (Why Choose Us, etc.) --- */
function initTabComponents() {
  const tabGroups = document.querySelectorAll('[data-tabs]');

  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('[data-tab-btn]');
    const panels = group.querySelectorAll('[data-tab-panel]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab-btn');

        // Deactivate all
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => {
          p.style.display = 'none';
          p.style.opacity = '0';
        });

        // Activate target
        btn.classList.add('active');
        const targetPanel = group.querySelector(`[data-tab-panel="${targetTab}"]`);
        if (targetPanel) {
          targetPanel.style.display = 'block';
          requestAnimationFrame(() => {
            targetPanel.style.opacity = '1';
          });
        }
      });
    });

    // Show first tab by default
    if (buttons.length && panels.length) {
      buttons[0].classList.add('active');
      panels.forEach((p, i) => {
        if (i === 0) {
          p.style.display = 'block';
          p.style.opacity = '1';
        } else {
          p.style.display = 'none';
          p.style.opacity = '0';
        }
      });
    }
  });
}

/* --- Hero View Tabs (Creator vs Student) --- */
function initHeroViewTabs() {
  const viewTabs = document.querySelectorAll('.view-tab');
  const viewPanels = document.querySelectorAll('.view-panel');

  if (!viewTabs.length || !viewPanels.length) return;

  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-view');

      viewTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      viewPanels.forEach(panel => {
        if (panel.getAttribute('data-view-panel') === target) {
          panel.style.display = 'block';
          panel.classList.add('preview-content');
        } else {
          panel.style.display = 'none';
          panel.classList.remove('preview-content');
        }
      });
    });
  });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav-fixed')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
