/* ============================================
   LearnForge — Shared JavaScript
   Interactions: Carousel, Accordion, Tabs, Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTestimonialCarousels();
  initFAQAccordions();
  initHeroTabs();
  initWhyChooseTabs();
  initProductDemoAccordions();
});

/* --- Sticky Nav --- */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const mobileToggle = nav.querySelector('.nav__mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu__link') : [];

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}

/* --- Testimonial Carousel --- */
function initTestimonialCarousels() {
  document.querySelectorAll('.testimonials').forEach(carousel => {
    const track = carousel.querySelector('.testimonials__track');
    if (!track) return;

    const slides = track.querySelectorAll('.testimonials__slide');
    const prevBtn = carousel.querySelector('.testimonials__btn--prev');
    const nextBtn = carousel.querySelector('.testimonials__btn--next');
    const dotsContainer = carousel.querySelector('.testimonials__dots');

    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();

    function getSlidesPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function getTotalPages() {
      return Math.max(1, slides.length - slidesPerView + 1);
    }

    function updateCarousel() {
      const slideWidth = slides[0] ? slides[0].offsetWidth : 0;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      const totalPages = getTotalPages();
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = `testimonials__dot${i === currentIndex ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function goNext() {
      const maxIndex = slides.length - slidesPerView;
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }

    function goPrev() {
      const maxIndex = slides.length - slidesPerView;
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        slidesPerView = getSlidesPerView();
        currentIndex = Math.min(currentIndex, slides.length - slidesPerView);
        updateCarousel();
      }, 150);
    });

    updateCarousel();
  });
}

/* --- FAQ Accordion --- */
function initFAQAccordions() {
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close siblings
      const parent = item.parentElement;
      parent.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });
}

/* --- Hero Tab Switch (Creator View / Student View) --- */
function initHeroTabs() {
  const toggle = document.querySelector('.hero__tab-toggle');
  if (!toggle) return;

  const buttons = toggle.querySelectorAll('.hero__tab-btn');
  const panels = document.querySelectorAll('.hero__preview-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn);
      });

      panels.forEach(panel => {
        panel.classList.toggle('active', panel.dataset.panel === target);
      });
    });
  });
}

/* --- Why Choose Us Tabs --- */
function initWhyChooseTabs() {
  const nav = document.querySelector('.why-tabs__nav');
  if (!nav) return;

  const buttons = nav.querySelectorAll('.why-tabs__btn');
  const panels = document.querySelectorAll('.why-tabs__panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn);
      });

      panels.forEach(panel => {
        panel.classList.toggle('active', panel.dataset.panel === target);
      });
    });
  });
}

/* --- Product Demo Accordion (Online Courses page) --- */
function initProductDemoAccordions() {
  document.querySelectorAll('.product-demo__header').forEach(header => {
    header.addEventListener('click', () => {
      const demo = header.closest('.product-demo');
      const isOpen = demo.classList.contains('open');
      demo.classList.toggle('open', !isOpen);
      header.setAttribute('aria-expanded', !isOpen);
    });
  });
}
