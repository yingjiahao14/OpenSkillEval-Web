/* ===== RedRoom Fitness — Global JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== Mobile Navigation ===== */
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.querySelector('.nav__mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      if (navMobile.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* ===== Lifestyle Carousel ===== */
  const carouselTrack = document.querySelector('.carousel__track');
  const carouselBtns = document.querySelectorAll('.carousel__btn');
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

    carouselBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const direction = btn.classList.contains('carousel__btn--prev') ? -1 : 1;
        goToSlide(currentSlide + direction);
      });
    });

    carouselDots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        goToSlide(currentSlide + (diff > 0 ? 1 : -1));
      }
    }, { passive: true });

    // Auto-play
    let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
    const carouselEl = document.querySelector('.carousel');
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', () => clearInterval(autoPlay));
      carouselEl.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
      });
    }
  }

  /* ===== Floor / Treadmill Toggle ===== */
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const toggleContents = document.querySelectorAll('.toggle-content');

  if (toggleBtns.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.toggle;
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        toggleContents.forEach(c => {
          c.classList.toggle('active', c.dataset.toggle === target);
        });
      });
    });
  }

  /* ===== Instructor Location Filter ===== */
  const filterSelect = document.getElementById('location-filter');

  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      const location = filterSelect.value;
      const cards = document.querySelectorAll('.instructor-card');
      cards.forEach(card => {
        const cardLocation = card.dataset.location;
        if (location === 'all' || cardLocation === location) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }

  /* ===== FAQ Accordion (single-open) ===== */
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-item__question');
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Open clicked if it wasn't already open
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  /* ===== Newsletter Form Validation ===== */
  const newsletterForms = document.querySelectorAll('.newsletter__form');

  newsletterForms.forEach(form => {
    const input = form.querySelector('.newsletter__input');
    const msg = form.querySelector('.newsletter__msg');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        input.classList.add('error');
        input.classList.remove('success');
        msg.textContent = 'Please enter your email address.';
        msg.className = 'newsletter__msg error';
        return;
      }

      if (!emailRegex.test(email)) {
        input.classList.add('error');
        input.classList.remove('success');
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'newsletter__msg error';
        return;
      }

      input.classList.remove('error');
      input.classList.add('success');
      msg.textContent = 'Thank you for subscribing!';
      msg.className = 'newsletter__msg success';
      input.value = '';

      setTimeout(() => {
        input.classList.remove('success');
        msg.textContent = '';
        msg.className = 'newsletter__msg';
      }, 4000);
    });

    input.addEventListener('input', () => {
      input.classList.remove('error', 'success');
      if (msg) {
        msg.textContent = '';
        msg.className = 'newsletter__msg';
      }
    });
  });

  /* ===== Scroll Fade-in Animation ===== */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ===== Active Nav Link ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__links a, .nav__mobile a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
