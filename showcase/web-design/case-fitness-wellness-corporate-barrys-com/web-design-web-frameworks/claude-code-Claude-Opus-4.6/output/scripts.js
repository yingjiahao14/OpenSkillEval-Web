document.addEventListener('DOMContentLoaded', () => {

  // ========== Mobile Navigation ==========
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
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

  // ========== Carousel ==========
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let autoplayInterval;

  function goToSlide(index) {
    if (!carouselTrack || carouselSlides.length === 0) return;
    currentSlide = ((index % carouselSlides.length) + carouselSlides.length) % carouselSlides.length;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); startAutoplay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); }));

  if (carouselTrack) {
    let touchStartX = 0;
    let touchEndX = 0;
    carouselTrack.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    carouselTrack.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        startAutoplay();
      }
    });
    startAutoplay();
  }

  // ========== Floor / Treadmill Toggle ==========
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const togglePanels = document.querySelectorAll('.toggle-panel');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      togglePanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === target);
      });
    });
  });

  // ========== Instructor Location Filter ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorCards = document.querySelectorAll('.instructor-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const location = btn.dataset.location;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      instructorCards.forEach(card => {
        if (location === 'all' || card.dataset.location === location) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = 'fadeInUp 0.4s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ========== FAQ Accordion ==========
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ========== Newsletter Validation ==========
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const msg = form.parentElement.querySelector('.newsletter-msg');
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        msg.textContent = 'Please enter your email address.';
        msg.className = 'newsletter-msg error';
      } else if (!emailRegex.test(email)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'newsletter-msg error';
      } else {
        msg.textContent = 'Thank you for subscribing! Check your inbox for confirmation.';
        msg.className = 'newsletter-msg success';
        input.value = '';
      }
    });
  });

  // ========== Scroll Animations ==========
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.way-card, .feature-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});
