/* ========================================
   GlobalStone — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Header Scroll Effect --- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* --- Mobile Navigation --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('active');
      document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });

    // Mobile accordion
    document.querySelectorAll('.nav-mobile__link').forEach(link => {
      if (link.nextElementSibling && link.nextElementSibling.classList.contains('nav-mobile__sub')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const item = link.parentElement;
          const wasOpen = item.classList.contains('open');

          // Close all other accordions
          document.querySelectorAll('.nav-mobile__item.open').forEach(el => {
            if (el !== item) el.classList.remove('open');
          });

          item.classList.toggle('open', !wasOpen);
        });
      }
    });
  }

  /* --- Desktop Mega Menu (click toggle) --- */
  document.querySelectorAll('.nav-desktop__item').forEach(item => {
    const megaMenu = item.querySelector('.mega-menu');
    const link = item.querySelector('.nav-desktop__link');

    if (megaMenu && link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const wasOpen = item.classList.contains('open');

        // Close all other mega menus
        document.querySelectorAll('.nav-desktop__item.open').forEach(el => {
          if (el !== item) el.classList.remove('open');
        });

        item.classList.toggle('open', !wasOpen);
      });
    }
  });

  // Close mega menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-desktop__item')) {
      document.querySelectorAll('.nav-desktop__item.open').forEach(el => {
        el.classList.remove('open');
      });
    }
  });

  /* --- What We Do Tabs --- */
  const tabs = document.querySelectorAll('.what-we-do__tab');
  const panels = document.querySelectorAll('.what-we-do__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(target);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  /* --- Carousel --- */
  const carouselTrack = document.querySelector('.carousel__track');
  const carouselPrev = document.querySelector('.carousel__btn--prev');
  const carouselNext = document.querySelector('.carousel__btn--next');
  const carouselDots = document.querySelectorAll('.carousel__dot');

  if (carouselTrack) {
    let currentSlide = 0;
    const slides = carouselTrack.querySelectorAll('.carousel__slide');
    const totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      carouselDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    if (carouselPrev) {
      carouselPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
    }

    if (carouselNext) {
      carouselNext.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    carouselDots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });
  }

  /* --- Newsletter Form --- */
  const newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter__input');
      if (input && input.value.trim()) {
        const btn = newsletterForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Thank you!';
        btn.style.pointerEvents = 'none';
        input.value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.pointerEvents = '';
        }, 3000);
      }
    });
  }

  /* --- Scroll Animations --- */
  const animateElements = document.querySelectorAll('.animate-in');
  if (animateElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(el => observer.observe(el));
  }

  /* --- Close mobile nav on link click --- */
  document.querySelectorAll('.nav-mobile__sub-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle && navMobile) {
        navToggle.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

});
