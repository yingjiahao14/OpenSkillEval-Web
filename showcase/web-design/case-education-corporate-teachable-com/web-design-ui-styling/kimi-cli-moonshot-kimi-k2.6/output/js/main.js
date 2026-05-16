/**
 * LearnForge Website - Main JavaScript
 * Handles navigation, carousels, tabs, accordions, and scroll animations
 */

(function() {
  'use strict';

  // ==========================================
  // Navigation
  // ==========================================
  const nav = document.querySelector('.nav');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    });
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ==========================================
  // Scroll Reveal Animation
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(function(el) {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  if (revealElements.length > 0) {
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    checkReveal();
  }

  // ==========================================
  // Hero Tab Switcher (Homepage)
  // ==========================================
  const heroTabs = document.querySelectorAll('.hero-tab');
  const heroVisualTabs = document.querySelectorAll('.hero-visual-tab');

  heroTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const target = tab.dataset.tab;

      heroTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');

      heroVisualTabs.forEach(function(vt) {
        vt.classList.toggle('active', vt.dataset.tab === target);
      });
    });
  });

  // ==========================================
  // Why Choose Us Tabs (Homepage)
  // ==========================================
  const whyTabs = document.querySelectorAll('.why-tab');
  const whyPanels = document.querySelectorAll('.why-panel');

  whyTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const target = tab.dataset.panel;

      whyTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');

      whyPanels.forEach(function(panel) {
        panel.classList.toggle('active', panel.dataset.panel === target);
      });
    });
  });

  // ==========================================
  // FAQ Accordion
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');

        // Close all siblings if you want accordion behavior (single open)
        const parent = item.closest('.faq-list');
        if (parent) {
          parent.querySelectorAll('.faq-item').forEach(function(sib) {
            sib.classList.remove('active');
          });
        }

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ==========================================
  // Product Demo Accordion (Online Courses)
  // ==========================================
  const demoAccordion = document.querySelector('.demo-accordion');
  if (demoAccordion) {
    const demoHeader = demoAccordion.querySelector('.demo-header');
    if (demoHeader) {
      demoHeader.addEventListener('click', function() {
        demoAccordion.classList.toggle('open');
      });
    }
  }

  // ==========================================
  // Testimonials Carousel
  // ==========================================
  function initCarousel(container) {
    if (!container) return;

    const track = container.querySelector('.testimonials-track');
    const cards = container.querySelectorAll('.testimonial-card');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const dotsContainer = container.querySelector('.carousel-dots');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let itemsPerView = 1;

    function updateItemsPerView() {
      if (window.innerWidth >= 1024) {
        itemsPerView = 3;
      } else if (window.innerWidth >= 768) {
        itemsPerView = 2;
      } else {
        itemsPerView = 1;
      }
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - itemsPerView);
    }

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth;
      track.style.transform = 'translateX(' + (-currentIndex * cardWidth) + 'px)';

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(function(dot, i) {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
        updateCarousel();
      });
    }

    // Create dots
    if (dotsContainer) {
      const maxIndex = getMaxIndex();
      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function() {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    window.addEventListener('resize', function() {
      updateItemsPerView();
      currentIndex = Math.min(currentIndex, getMaxIndex());
      updateCarousel();
    });

    updateItemsPerView();
    updateCarousel();

    // Auto-play
    let autoPlay = setInterval(function() {
      const maxIndex = getMaxIndex();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    }, 5000);

    container.addEventListener('mouseenter', function() {
      clearInterval(autoPlay);
    });

    container.addEventListener('mouseleave', function() {
      autoPlay = setInterval(function() {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      }, 5000);
    });
  }

  document.querySelectorAll('.testimonials-carousel').forEach(initCarousel);

  // ==========================================
  // Smooth scroll for anchor links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

})();
