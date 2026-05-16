/* GlobalStone — Interactive Behaviors */

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // Mobile hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Mobile accordion
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      trigger.classList.toggle('open');
      content.classList.toggle('open');
    });
  });

  // Desktop mega menu
  const servicesTrigger = document.querySelector('.nav-services-trigger');
  const megaMenu = document.querySelector('.mega-menu');
  if (servicesTrigger && megaMenu) {
    let closeTimeout;

    const openMenu = () => {
      clearTimeout(closeTimeout);
      servicesTrigger.classList.add('open');
      megaMenu.classList.add('open');
    };
    const closeMenu = () => {
      closeTimeout = setTimeout(() => {
        servicesTrigger.classList.remove('open');
        megaMenu.classList.remove('open');
      }, 200);
    };

    servicesTrigger.addEventListener('mouseenter', openMenu);
    servicesTrigger.addEventListener('mouseleave', closeMenu);
    megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
    megaMenu.addEventListener('mouseleave', closeMenu);

    servicesTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (megaMenu.classList.contains('open')) {
        servicesTrigger.classList.remove('open');
        megaMenu.classList.remove('open');
      } else {
        openMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && megaMenu.classList.contains('open')) {
        servicesTrigger.classList.remove('open');
        megaMenu.classList.remove('open');
      }
    });
  }

  // Vertical tabs (What We Do)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (tabBtns.length && tabPanels.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  }

  // Carousel
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (track && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });
  }

  // Newsletter form
  const nlForm = document.querySelector('.newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nlForm.querySelector('input');
      if (input && input.value.trim()) {
        const btn = nlForm.querySelector('button');
        btn.textContent = 'Subscribed!';
        btn.style.background = 'var(--color-teal)';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
        }, 3000);
      }
    });
  }
});
