/* =============================================
   RedRoom Fitness — Shared JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu ---
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  let overlay = document.querySelector('.mobile-overlay');

  if (menuToggle && primaryNav) {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-overlay';
      document.body.appendChild(overlay);
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      overlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    overlay.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      menuToggle.classList.remove('active');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });

    // Close menu on nav link click
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        menuToggle.classList.remove('active');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Active Nav Highlight ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // --- Carousel ---
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        goToSlide(currentSlide + (diff > 0 ? 1 : -1));
      }
    });

    // Auto-advance every 5s
    let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
  }

  // --- Newsletter Forms ---
  document.querySelectorAll('.newsletter-form').forEach(form => {
    const input = form.querySelector('.newsletter-input');
    const msgEl = form.querySelector('.newsletter-msg');
    const btn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Clear previous states
      input.classList.remove('error');
      if (msgEl) {
        msgEl.textContent = '';
        msgEl.classList.remove('success', 'error');
      }

      if (!email) {
        input.classList.add('error');
        if (msgEl) {
          msgEl.textContent = 'Please enter your email address.';
          msgEl.classList.add('error');
        }
        return;
      }

      if (!emailRegex.test(email)) {
        input.classList.add('error');
        if (msgEl) {
          msgEl.textContent = 'Please enter a valid email address.';
          msgEl.classList.add('error');
        }
        return;
      }

      // Success
      input.value = '';
      if (msgEl) {
        msgEl.textContent = 'You\'re in! Check your inbox for a confirmation.';
        msgEl.classList.add('success');
      }
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#4ade80';
        btn.style.borderColor = '#4ade80';
        btn.style.color = '#000';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 3000);
      }
    });
  });

  // --- Floor / Treadmill Toggle ---
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  if (toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        // Deactivate all
        toggleBtns.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.toggle-content').forEach(c => c.classList.remove('active'));
        // Activate selected
        btn.classList.add('active');
        const content = document.getElementById(target);
        if (content) content.classList.add('active');
      });
    });
  }

  // --- Instructor Location Filter ---
  const filterChips = document.querySelectorAll('.filter-chip');
  if (filterChips.length > 0) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        // Update active chip
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        // Filter cards
        const cards = document.querySelectorAll('.instructor-card');
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.location === filter) {
            card.style.display = '';
            card.style.animation = 'fadeSlideIn 0.4s ease both';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Open clicked (unless it was already open)
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // --- Schedule Table: Highlight today ---
  const scheduleTable = document.querySelector('.schedule-table');
  if (scheduleTable) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    const rows = scheduleTable.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const dayCell = row.querySelector('.day');
      if (dayCell && dayCell.textContent.trim() === today) {
        row.classList.add('today');
      }
    });
  }

  // --- Country Selector ---
  const countrySelects = document.querySelectorAll('.country-select');
  countrySelects.forEach(select => {
    select.addEventListener('change', (e) => {
      const country = e.target.value;
      if (country) {
        console.log('Country selected:', country);
        // In production, this would redirect or update content
      }
    });
  });

  // --- Scroll-triggered animations ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-header, .way-card, .feature-card, .instructor-card, .studio-visual, .community-visual').forEach(el => {
    observer.observe(el);
  });

});
