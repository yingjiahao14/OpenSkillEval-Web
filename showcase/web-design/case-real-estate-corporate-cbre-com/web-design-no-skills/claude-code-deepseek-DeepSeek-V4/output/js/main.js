/**
 * GlobalStone — Interactive Elements
 */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initMegaMenu();
  initTabs();
  initCarousel();
  initNewsletterModal();
  initSmoothScroll();
});

/* --- Mobile Navigation --- */
function initMobileNav() {
  var toggle = document.getElementById('mobileMenuToggle');
  var nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.contains('open');
    if (isOpen) {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      nav.classList.add('open');
      toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Accordion behavior for mobile subnavs
  var items = nav.querySelectorAll('.mobile-nav-item');
  items.forEach(function (item) {
    var link = item.querySelector('.mobile-nav-link');
    if (!link || !link.classList.contains('has-dropdown')) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      item.classList.toggle('open');
    });
  });

  // Close mobile nav on window resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* --- Mega Menu (Desktop) --- */
function initMegaMenu() {
  var navItems = document.querySelectorAll('.primary-nav .nav-item');
  var isHoverSupported = window.matchMedia('(hover: hover)').matches;

  navItems.forEach(function (item) {
    var link = item.querySelector('.nav-link.has-dropdown');
    if (!link) return;

    if (isHoverSupported) {
      // Hover mode
      item.addEventListener('mouseenter', function () {
        closeAllMegaMenus();
        item.classList.add('open');
      });
      item.addEventListener('mouseleave', function () {
        item.classList.remove('open');
      });
    }

    // Click toggle (works for both touch and mouse)
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var wasOpen = item.classList.contains('open');
      closeAllMegaMenus();
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });

  // Close mega menu on click outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.primary-nav')) {
      closeAllMegaMenus();
    }
  });
}

function closeAllMegaMenus() {
  document.querySelectorAll('.primary-nav .nav-item.open').forEach(function (item) {
    item.classList.remove('open');
  });
}

/* --- What We Do Tabs --- */
function initTabs() {
  var tabContainer = document.querySelector('.what-we-do');
  if (!tabContainer) return;

  var tabBtns = tabContainer.querySelectorAll('.tab-btn');
  var tabPanels = tabContainer.querySelectorAll('.tab-panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');

      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });

      this.classList.add('active');
      var panel = tabContainer.querySelector('.tab-panel[data-tab="' + target + '"]');
      if (panel) {
        panel.classList.add('active');
      }
    });
  });
}

/* --- Partner Carousel --- */
function initCarousel() {
  var carousel = document.querySelector('.carousel');
  if (!carousel) return;

  var track = carousel.querySelector('.carousel-track');
  var slides = carousel.querySelectorAll('.carousel-slide');
  var prevBtn = carousel.querySelector('.carousel-prev');
  var nextBtn = carousel.querySelector('.carousel-next');
  var dots = carousel.querySelectorAll('.carousel-dot');
  var currentIndex = 0;

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

    if (dots.length) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentIndex + 1);
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToSlide(i);
    });
  });

  // Auto-advance every 5 seconds
  setInterval(function () {
    goToSlide(currentIndex + 1);
  }, 5000);
}

/* --- Newsletter Modal --- */
function initNewsletterModal() {
  var subscribeBtn = document.getElementById('newsletterSubscribeBtn');
  var modalOverlay = document.getElementById('newsletterModal');
  var modalClose = document.getElementById('modalClose');
  var subscribeForm = document.getElementById('subscribeForm');
  var subscribeEmail = document.getElementById('subscribeEmail');
  var modalBody = document.getElementById('modalBody');
  var modalSuccess = document.getElementById('modalSuccess');

  if (!subscribeBtn || !modalOverlay) return;

  function openModal() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (modalBody) modalBody.style.display = 'block';
    if (modalSuccess) modalSuccess.style.display = 'none';
    if (subscribeEmail) subscribeEmail.value = '';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  subscribeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (modalBody) modalBody.style.display = 'none';
      if (modalSuccess) modalSuccess.style.display = 'block';

      setTimeout(function () {
        closeModal();
      }, 2500);
    });
  }

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --- Smooth Scroll for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
