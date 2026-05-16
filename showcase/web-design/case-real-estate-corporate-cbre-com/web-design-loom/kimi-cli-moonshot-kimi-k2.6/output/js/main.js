/* ============================================
   GlobalStone — Global Commercial Real Estate
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initMobileNav();
  initMegaMenu();
  initTabs();
  initCarousel();
  initScrollAnimations();
});

/* Header scroll effect */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
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

/* Mobile navigation */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Accordion submenus
  const accordionToggles = document.querySelectorAll('.mobile-accordion-toggle');
  accordionToggles.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const submenu = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');

      // Close all others
      accordionToggles.forEach(function(other) {
        if (other !== btn) {
          other.classList.remove('active');
          other.nextElementSibling?.classList.remove('open');
        }
      });

      btn.classList.toggle('active', !isOpen);
      if (submenu) submenu.classList.toggle('open', !isOpen);
    });
  });
}

/* Mega menu desktop */
function initMegaMenu() {
  const megaItems = document.querySelectorAll('.nav-item-has-mega');
  if (!megaItems.length) return;

  megaItems.forEach(function(item) {
    let timeout;

    item.addEventListener('mouseenter', function() {
      clearTimeout(timeout);
      item.classList.add('active');
    });

    item.addEventListener('mouseleave', function() {
      timeout = setTimeout(function() {
        item.classList.remove('active');
      }, 150);
    });

    // Click toggle for touch devices
    const link = item.querySelector('a');
    if (link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth >= 1024) {
          e.preventDefault();
          const isActive = item.classList.contains('active');
          megaItems.forEach(function(mi) { mi.classList.remove('active'); });
          if (!isActive) item.classList.add('active');
        }
      });
    }
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    megaItems.forEach(function(item) {
      if (!item.contains(e.target)) {
        item.classList.remove('active');
      }
    });
  });
}

/* Vertical tabs */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length || !tabPanels.length) return;

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const target = btn.dataset.tab;

      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabPanels.forEach(function(p) { p.classList.remove('active'); });

      btn.classList.add('active');
      const panel = document.querySelector('.tab-panel[data-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });
}

/* Carousel */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  if (!track || !slides.length) return;

  let current = 0;
  const total = slides.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() { goTo(current - 1); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function() { goTo(current + 1); });
  }
}

/* Scroll animations */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animatedElements.forEach(function(el) {
    observer.observe(el);
  });
}
