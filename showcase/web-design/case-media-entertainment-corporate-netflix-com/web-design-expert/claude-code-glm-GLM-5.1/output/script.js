/* StreamWave Interactions */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFaq();
  initCarousel();
  initLoginForm();
});

/* ---- Sticky Header ---- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- FAQ Accordion ---- */
function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      items.forEach(other => {
        const otherBtn = other.querySelector('.faq-question');
        const otherAnswer = other.querySelector('.faq-answer');
        otherBtn.setAttribute('aria-expanded', 'false');
        otherAnswer.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
}

/* ---- Trending Carousel ---- */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const arrow = document.querySelector('.carousel-arrow');
  if (!track || !arrow) return;

  const scrollAmount = 600;

  arrow.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Touch/swipe support
  let startX = 0;
  let isDown = false;

  track.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - track.offsetLeft;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    isDown = false;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (startX - x) * 0.8;
    track.scrollLeft += walk;
    startX = x;
  }, { passive: true });
}

/* ---- Login Form ---- */
function initLoginForm() {
  const form = document.querySelector('.login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="text"]');
    const password = form.querySelector('input[type="password"]');

    let valid = true;

    if (email && !email.value.trim()) {
      email.style.borderColor = 'oklch(55% 0.26 25)';
      valid = false;
    } else if (email) {
      email.style.borderColor = '';
    }

    if (password && !password.value.trim()) {
      password.style.borderColor = 'oklch(55% 0.26 25)';
      valid = false;
    } else if (password) {
      password.style.borderColor = '';
    }

    if (valid) {
      // In production this would submit to a server
      console.log('Login submitted:', { email: email?.value });
    }
  });

  // Help toggle
  const helpBtn = document.querySelector('.help-toggle-btn');
  const helpContent = document.querySelector('.help-content');
  if (helpBtn && helpContent) {
    helpBtn.addEventListener('click', () => {
      helpContent.classList.toggle('open');
      const expanded = helpContent.classList.contains('open');
      helpBtn.setAttribute('aria-expanded', expanded);
    });
  }
}
