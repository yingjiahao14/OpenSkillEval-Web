/**
 * GlobalStone — Main JavaScript
 * Handles navigation, tabs, carousel, and mobile interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initMobileNav();
  initMegaMenu();
  initVerticalTabs();
  initCarousel();
});

/* ========================================
   HEADER SCROLL EFFECT
   ======================================== */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ========================================
   MOBILE NAVIGATION
   ======================================== */
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when clicking a link
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      toggle.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Mobile accordion
  const accordions = document.querySelectorAll('.nav-mobile-accordion-header');
  accordions.forEach(function(acc) {
    acc.addEventListener('click', function() {
      const parent = this.parentElement;
      const isOpen = parent.classList.contains('open');

      // Close all accordions
      document.querySelectorAll('.nav-mobile-accordion').forEach(function(a) {
        a.classList.remove('open');
      });

      // Open clicked one if it was closed
      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });
}

/* ========================================
   MEGA MENU
   ======================================== */
function initMegaMenu() {
  const trigger = document.querySelector('.mega-menu-trigger');
  if (!trigger) return;

  // Desktop: hover to show
  trigger.addEventListener('mouseenter', function() {
    if (window.innerWidth >= 1024) {
      trigger.classList.add('active');
    }
  });

  trigger.addEventListener('mouseleave', function() {
    if (window.innerWidth >= 1024) {
      trigger.classList.remove('active');
    }
  });

  // Click to toggle on desktop (for accessibility)
  const megaLink = trigger.querySelector('.nav-link');
  if (megaLink) {
    megaLink.addEventListener('click', function(e) {
      if (window.innerWidth >= 1024) {
        e.preventDefault();
        trigger.classList.toggle('active');
      }
    });
  }

  // Close mega menu on outside click
  document.addEventListener('click', function(e) {
    if (!trigger.contains(e.target)) {
      trigger.classList.remove('active');
    }
  });
}

/* ========================================
   VERTICAL TABS
   ======================================== */
function initVerticalTabs() {
  const tabContainers = document.querySelectorAll('.tabs-vertical');

  tabContainers.forEach(function(container) {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');

    tabBtns.forEach(function(btn, index) {
      btn.addEventListener('click', function() {
        // Remove active from all
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        tabPanels.forEach(function(p) { p.classList.remove('active'); });

        // Add active to clicked
        btn.classList.add('active');
        if (tabPanels[index]) {
          tabPanels[index].classList.add('active');
        }
      });
    });

    // Activate first tab by default
    if (tabBtns.length > 0 && tabPanels.length > 0) {
      tabBtns[0].classList.add('active');
      tabPanels[0].classList.add('active');
    }
  });
}

/* ========================================
   CAROUSEL
   ======================================== */
function initCarousel() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(function(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const slidesPerView = window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = Math.max(0, slides.length - slidesPerView);

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      const slideWidth = 100 / slidesPerView;
      track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + '%)';

      // Update dots
      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        goTo(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        goTo(currentIndex + 1);
      });
    }

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        goTo(i);
      });
    });

    // Handle resize
    window.addEventListener('resize', function() {
      const newSlidesPerView = window.innerWidth >= 768 ? 2 : 1;
      if (newSlidesPerView !== slidesPerView) {
        location.reload();
      }
    });
  });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
