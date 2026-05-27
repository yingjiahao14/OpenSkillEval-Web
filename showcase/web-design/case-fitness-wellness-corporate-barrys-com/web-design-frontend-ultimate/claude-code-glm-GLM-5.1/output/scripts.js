/* ============================================
   RedRoom Fitness — Shared Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCarousels();
  initToggles();
  initFilters();
  initFaqAccordion();
  initNewsletterForms();
});

/* ---- Mobile Navigation ---- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Carousel ---- */
function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.carousel-btn-prev');
    const nextBtn = container.querySelector('.carousel-btn-next');
    const dotsWrap = container.querySelector('.carousel-dots');
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    function goTo(idx) {
      current = ((idx % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
    }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    if (dotsWrap) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goTo(current + 1) : goTo(current - 1);
      }
    }, { passive: true });

    // Auto-advance every 5s
    let autoPlay = setInterval(() => goTo(current + 1), 5000);
    container.addEventListener('mouseenter', () => clearInterval(autoPlay));
    container.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => goTo(current + 1), 5000);
    });
  });
}

/* ---- Floor/Treadmill Toggle ---- */
function initToggles() {
  document.querySelectorAll('.toggle-group').forEach(group => {
    const btns = group.querySelectorAll('.toggle-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Toggle content panels
        const wrapper = group.closest('.toggle-wrapper');
        if (wrapper) {
          wrapper.querySelectorAll('.toggle-content').forEach(c => {
            c.classList.toggle('active', c.dataset.id === target);
          });
        }
      });
    });
  });
}

/* ---- Instructor Filter ---- */
function initFilters() {
  const filterGroup = document.querySelector('.filter-group');
  const grid = document.querySelector('.instructor-grid');
  if (!filterGroup || !grid) return;

  const btns = filterGroup.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const loc = btn.dataset.location;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = grid.querySelectorAll('.instructor-card');
      cards.forEach(card => {
        const cardLoc = card.dataset.location;
        if (loc === 'all' || cardLoc === loc) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ---- FAQ Accordion (single-open) ---- */
function initFaqAccordion() {
  const faqList = document.querySelector('.faq-list');
  if (!faqList) return;

  faqList.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      faqList.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Open clicked if it wasn't open
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ---- Newsletter Form ---- */
function initNewsletterForms() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    const input = form.querySelector('.newsletter-input');
    const msg = form.querySelector('.newsletter-msg');
    if (!input || !msg) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!email) {
        msg.textContent = 'Please enter your email address.';
        msg.className = 'newsletter-msg error';
      } else if (!valid) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'newsletter-msg error';
      } else {
        msg.textContent = 'You\'re in! Check your inbox for a confirmation.';
        msg.className = 'newsletter-msg success';
        input.value = '';
      }

      // Clear message after 4s
      setTimeout(() => {
        if (msg.classList.contains('success') || msg.classList.contains('error')) {
          msg.textContent = '';
          msg.className = 'newsletter-msg';
        }
      }, 4000);
    });
  });
}
