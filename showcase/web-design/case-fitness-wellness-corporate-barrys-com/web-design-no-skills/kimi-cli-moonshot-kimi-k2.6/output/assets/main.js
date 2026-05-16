/* ============================================
   RedRoom Fitness — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCarousel();
  initWorkoutToggle();
  initInstructorFilter();
  initFAQAccordion();
  initNewsletterForm();
  initCountrySelector();
});

/* Mobile Nav */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', links.classList.contains('open'));
  });
}

/* Carousel */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = track.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  let current = 0;
  let startX = 0;

  if (slides.length === 0) return;

  // Create dots
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;

    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Swipe support
  const carousel = track.closest('.carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(current + (diff > 0 ? 1 : -1));
      }
    }, { passive: true });
  }
}

/* Workout Toggle */
function initWorkoutToggle() {
  const btns = document.querySelectorAll('.toggle-btn');
  const panels = document.querySelectorAll('.toggle-panel');
  if (btns.length === 0) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      btns.forEach(b => b.classList.toggle('active', b.dataset.target === target));
      panels.forEach(p => p.classList.toggle('active', p.id === target));
    });
  });
}

/* Instructor Filter */
function initInstructorFilter() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.instructor-card');
  if (pills.length === 0) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const location = pill.dataset.location;

      pills.forEach(p => p.classList.toggle('active', p === pill));

      cards.forEach(card => {
        const cardLoc = card.dataset.location;
        const show = location === 'all' || cardLoc === location;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'fadeIn 0.35s ease';
        }
      });
    });
  });
}

/* FAQ Accordion */
function initFAQAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (items.length === 0) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
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

/* Newsletter Form */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const msg = form.parentElement.querySelector('.newsletter-msg');
    const email = input.value.trim();

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'newsletter-msg error';
      return;
    }

    msg.textContent = 'You\'re in! Check your inbox for confirmation.';
    msg.className = 'newsletter-msg success';
    input.value = '';
  });
}

/* Country Selector */
function initCountrySelector() {
  const btn = document.querySelector('.country-select-btn');
  const dropdown = document.querySelector('.country-dropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });

  dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const country = link.textContent;
      btn.querySelector('span').textContent = country;
      dropdown.classList.remove('open');
    });
  });
}
