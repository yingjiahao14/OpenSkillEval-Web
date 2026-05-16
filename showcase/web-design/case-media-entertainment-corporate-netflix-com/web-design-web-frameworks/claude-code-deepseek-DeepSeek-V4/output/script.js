/* ==============================================
   StreamWave — Interactive Behaviors
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header scroll effect ---- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Trending Carousel ---- */
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');

  if (carouselTrack && carouselWrapper) {
    let scrollPos = 0;
    const cardWidth = () => {
      const card = carouselTrack.querySelector('.trending-card');
      return card ? card.offsetWidth + 16 : 216; // width + gap
    };

    const updateArrows = () => {
      const maxScroll = carouselTrack.scrollWidth - carouselWrapper.clientWidth;
      if (prevBtn) prevBtn.disabled = scrollPos <= 0;
      if (nextBtn) nextBtn.disabled = scrollPos >= maxScroll - 1;
    };

    const scrollTo = (pos) => {
      scrollPos = Math.max(0, Math.min(pos, carouselTrack.scrollWidth - carouselWrapper.clientWidth));
      carouselTrack.style.transform = `translateX(-${scrollPos}px)`;
      updateArrows();
    };

    if (nextBtn) nextBtn.addEventListener('click', () => scrollTo(scrollPos + cardWidth() * 2));
    if (prevBtn) prevBtn.addEventListener('click', () => scrollTo(scrollPos - cardWidth() * 2));

    // Touch swipe support
    let touchStartX = 0;
    let touchCurrentX = 0;
    let isDragging = false;

    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      isDragging = true;
      carouselTrack.style.transition = 'none';
    }, { passive: true });

    carouselTrack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      touchCurrentX = e.touches[0].clientX;
      const diff = touchStartX - touchCurrentX;
      carouselTrack.style.transform = `translateX(-${scrollPos + diff}px)`;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      const diff = touchStartX - touchCurrentX;
      if (Math.abs(diff) > 40) {
        scrollTo(scrollPos + diff + (diff > 0 ? cardWidth() : -cardWidth()));
      } else {
        scrollTo(scrollPos);
      }
    });

    window.addEventListener('resize', updateArrows);
    updateArrows();
  }

  /* ---- FAQ Accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Open clicked (unless it was already open)
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Email form validation ---- */
  document.querySelectorAll('.email-form').forEach(form => {
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('.btn-cta');

    if (btn) {
      btn.addEventListener('click', (e) => {
        if (!input || !input.value.trim() || !input.checkValidity()) {
          e.preventDefault();
          if (input) {
            input.focus();
            input.style.borderColor = 'var(--accent)';
            setTimeout(() => { input.style.borderColor = ''; }, 1500);
          }
        }
      });
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (btn) btn.click();
        }
      });
    }
  });

  /* ---- Login: Get Help Toggle ---- */
  const getHelp = document.querySelector('.get-help');
  const getHelpToggle = document.querySelector('.get-help-toggle');

  if (getHelpToggle && getHelp) {
    getHelpToggle.addEventListener('click', () => {
      getHelp.classList.toggle('open');
    });
  }

  /* ---- Login: Form validation ---- */
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = loginForm.querySelector('#identifier');
      const password = loginForm.querySelector('#password');

      let valid = true;

      if (!identifier || !identifier.value.trim()) {
        valid = false;
        if (identifier) {
          identifier.style.borderColor = 'var(--accent)';
          setTimeout(() => { identifier.style.borderColor = ''; }, 1500);
        }
      }

      if (!password || !password.value.trim()) {
        valid = false;
        if (password) {
          password.style.borderColor = 'var(--accent)';
          setTimeout(() => { password.style.borderColor = ''; }, 1500);
        }
      }

      if (valid) {
        console.log('Login submitted:', { identifier: identifier?.value, password: '***' });
        const continueBtn = loginForm.querySelector('.btn-continue');
        if (continueBtn) {
          continueBtn.textContent = 'Signing in...';
          continueBtn.disabled = true;
          continueBtn.style.opacity = '0.7';
        }
      }
    });
  }
});
