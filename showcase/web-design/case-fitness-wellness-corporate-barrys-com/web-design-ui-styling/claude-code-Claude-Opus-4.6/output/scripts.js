document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile Navigation ──
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Carousel ──
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (track && slides.length) {
    let current = 0;
    const total = slides.length;
    let autoplay;

    function goTo(i) {
      current = ((i % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
    }

    function startAutoplay() {
      stopAutoplay();
      autoplay = setInterval(() => goTo(current + 1), 5000);
    }

    function stopAutoplay() {
      if (autoplay) clearInterval(autoplay);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAutoplay(); }));

    // Swipe support
    let startX = 0, isDragging = false;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
    track.addEventListener('touchend', e => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
        startAutoplay();
      }
    });

    startAutoplay();
  }

  // ── Floor/Treadmill Toggle ──
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const togglePanels = document.querySelectorAll('.toggle-panel');
  if (toggleBtns.length && togglePanels.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        toggleBtns.forEach(b => b.classList.toggle('active', b === btn));
        togglePanels.forEach(p => p.classList.toggle('active', p.id === target));
      });
    });
  }

  // ── Instructor Location Filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.instructor-card');
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const loc = btn.dataset.location;
        filterBtns.forEach(b => b.classList.toggle('active', b === btn));
        cards.forEach(card => {
          if (loc === 'all' || card.dataset.location === loc) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeUp 0.4s ease';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ── FAQ Accordion (single-open) ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(fi => fi.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ── Newsletter Validation ──
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const feedback = form.parentElement.querySelector('.newsletter-feedback') || form.nextElementSibling;
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        input.classList.add('error');
        if (feedback) {
          feedback.textContent = 'Please enter your email address.';
          feedback.className = 'newsletter-feedback error';
        }
      } else if (!emailRegex.test(email)) {
        input.classList.add('error');
        if (feedback) {
          feedback.textContent = 'Please enter a valid email address.';
          feedback.className = 'newsletter-feedback error';
        }
      } else {
        input.classList.remove('error');
        input.value = '';
        if (feedback) {
          feedback.textContent = 'Thanks for subscribing! Check your inbox soon.';
          feedback.className = 'newsletter-feedback success';
        }
      }
    });

    const input = form.querySelector('input[type="email"]');
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const feedback = form.parentElement.querySelector('.newsletter-feedback') || form.nextElementSibling;
        if (feedback && feedback.classList.contains('error')) {
          feedback.textContent = '';
          feedback.className = 'newsletter-feedback';
        }
      });
    }
  });

  // ── Scroll Reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.section, .two-ways-card, .feature-card, .instructor-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
