/* ============================================
   RedRoom Fitness — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile Nav Toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* --- Lifestyle Carousel --- */
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let current = 0;
    const total = slides.length;

    // Create dots
    if (dotsContainer) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      current = ((index % total) + total) % total;
      carouselTrack.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Swipe support
    let touchStartX = 0;
    carouselTrack.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    carouselTrack.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goTo(current + 1) : goTo(current - 1);
      }
    }, { passive: true });

    // Auto-advance
    let autoPlay = setInterval(() => goTo(current + 1), 5000);
    carouselTrack.closest('.carousel-section')?.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carouselTrack.closest('.carousel-section')?.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => goTo(current + 1), 5000);
    });
  }

  /* --- Floor / Treadmill Toggle --- */
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const toggleContents = document.querySelectorAll('.toggle-content');
  if (toggleBtns.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        toggleContents.forEach(c => {
          c.classList.toggle('active', c.dataset.panel === target);
        });
      });
    });
  }

  /* --- Instructor Location Filter --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorCards = document.querySelectorAll('.instructor-card');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const location = btn.dataset.location;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        instructorCards.forEach(card => {
          const match = location === 'all' || card.dataset.location === location;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* --- FAQ Accordion (single-open) --- */
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const inner = item.querySelector('.faq-answer-inner');
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(fi => {
          fi.classList.remove('open');
          const a = fi.querySelector('.faq-answer');
          a.style.maxHeight = null;
        });
        // Open clicked (if it was closed)
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = inner.scrollHeight + 'px';
        }
      });
    });
  }

  /* --- Newsletter Form Validation --- */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    const input = form.querySelector('.newsletter-input');
    const errorEl = form.querySelector('.newsletter-error');
    const successEl = form.querySelector('.newsletter-success');
    const btn = form.querySelector('.btn');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      input.classList.remove('error', 'success');
      errorEl.classList.remove('show');
      successEl.classList.remove('show');

      if (!email) {
        input.classList.add('error');
        errorEl.textContent = 'Please enter your email address.';
        errorEl.classList.add('show');
        return;
      }
      if (!valid) {
        input.classList.add('error');
        errorEl.textContent = 'Please enter a valid email address.';
        errorEl.classList.add('show');
        return;
      }

      input.classList.add('success');
      successEl.textContent = 'You\'re in! Welcome to the RedRoom community.';
      successEl.classList.add('show');
      input.value = '';
      btn.textContent = 'SUBSCRIBED';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'SUBSCRIBE';
        btn.disabled = false;
        input.classList.remove('success');
        successEl.classList.remove('show');
      }, 4000);
    });
  });

  /* --- Country Selector --- */
  const countryBtn = document.querySelector('.footer-country-btn');
  const countryDropdown = document.querySelector('.footer-country-dropdown');
  if (countryBtn && countryDropdown) {
    countryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      countryDropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => {
      countryDropdown.classList.remove('open');
    });
    countryDropdown.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        countryBtn.querySelector('span').textContent = a.textContent;
        countryDropdown.classList.remove('open');
      });
    });
  }

});
