/* ===== GlobalStone Interactive Scripts ===== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('active');
      document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });
  }

  // --- Mobile Accordion Sub-nav ---
  document.querySelectorAll('.mobile-nav-item > a').forEach(link => {
    const subNav = link.nextElementSibling;
    if (subNav && subNav.classList.contains('mobile-sub-nav')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = link.parentElement;
        const isOpen = parent.classList.contains('open');
        // Close all other accordions
        document.querySelectorAll('.mobile-nav-item.open').forEach(item => {
          if (item !== parent) item.classList.remove('open');
        });
        parent.classList.toggle('open', !isOpen);
      });
    }
  });

  // --- Desktop Mega Menu (click toggle for accessibility, hover for pointer) ---
  const megaItems = document.querySelectorAll('.nav-desktop .nav-item');
  megaItems.forEach(item => {
    const megaMenu = item.querySelector('.mega-menu');
    if (!megaMenu) return;

    // Hover
    item.addEventListener('mouseenter', () => {
      closeAllMegaMenus(item);
      item.classList.add('open');
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('open');
    });

    // Click toggle
    item.querySelector(':scope > a').addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('open');
      closeAllMegaMenus();
      if (!isOpen) item.classList.add('open');
    });
  });

  function closeAllMegaMenus(except) {
    megaItems.forEach(item => {
      if (item !== except) item.classList.remove('open');
    });
  }

  // Close mega menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-desktop')) {
      closeAllMegaMenus();
    }
  });

  // --- What We Do Vertical Tabs ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // --- Carousel ---
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
      });
    }
  }

  // --- Newsletter Subscribe ---
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#2E7D32';
        input.value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = currentScroll;
    });
  }

  // --- Intersection Observer for fade-in animations ---
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
