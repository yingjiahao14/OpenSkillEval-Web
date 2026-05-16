/* ============================================
   RedRoom Fitness — Global Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCarousel();
  initNewsletter();
  initCountrySelect();
  initWorkoutToggle();
  initInstructorFilter();
  initFaqAccordion();
});

/* ============================================
   Mobile Navigation
   ============================================ */
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-nav');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const spans = btn.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      const spans = btn.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

/* ============================================
   Lifestyle Carousel
   ============================================ */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!track || slides.length === 0) return;

  let current = 0;
  const total = slides.length;

  // Create dots
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.carousel-dot');

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch / swipe support
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      goTo(current + (diff > 0 ? 1 : -1));
    }
    isDragging = false;
  }, { passive: true });

  // Auto-play
  setInterval(() => goTo(current + 1), 6000);
}

/* ============================================
   Newsletter Form
   ============================================ */
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const message = document.querySelector('.newsletter-message');
    const email = input.value.trim();

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email) {
      showMessage(message, 'Please enter your email address.', 'error');
      return;
    }

    if (!isValid) {
      showMessage(message, 'Please enter a valid email address.', 'error');
      return;
    }

    showMessage(message, 'You\'re in! Check your inbox for confirmation.', 'success');
    input.value = '';
  });
}

function showMessage(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = 'newsletter-message ' + type;
}

/* ============================================
   Country Selector
   ============================================ */
function initCountrySelect() {
  const btn = document.querySelector('.country-select-btn');
  const dropdown = document.querySelector('.country-dropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  dropdown.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const label = btn.querySelector('.country-label');
      if (label) label.textContent = item.textContent;
      dropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });
}

/* ============================================
   Workout Toggle (Floor / Treadmill)
   ============================================ */
function initWorkoutToggle() {
  const btns = document.querySelectorAll('.toggle-btn');
  const panels = document.querySelectorAll('.toggle-panel');
  if (btns.length === 0) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => {
        p.classList.toggle('active', p.id === target);
      });
    });
  });
}

/* ============================================
   Instructor Filter
   ============================================ */
function initInstructorFilter() {
  const select = document.querySelector('.filter-select');
  const cards = document.querySelectorAll('.instructor-card');
  if (!select) return;

  select.addEventListener('change', () => {
    const location = select.value;

    cards.forEach(card => {
      const cardLocation = card.dataset.location;
      if (location === 'all' || cardLocation === location) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ============================================
   FAQ Accordion (single-open)
   ============================================ */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (items.length === 0) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => i.classList.remove('open'));

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}
