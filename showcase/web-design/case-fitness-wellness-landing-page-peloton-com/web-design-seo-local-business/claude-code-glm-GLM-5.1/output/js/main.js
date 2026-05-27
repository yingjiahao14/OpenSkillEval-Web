// ===== TABS =====
function initTabs(container) {
  const tabBtns = container.querySelectorAll('.tabs__tab');
  const panels = container.querySelectorAll('.tabs__panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = container.querySelector(`[data-panel="${btn.dataset.tab}"]`);
      if (target) target.classList.add('active');
    });
  });
}

// ===== ACCORDION =====
function initAccordion(container) {
  const items = container.querySelectorAll('.accordion__item');

  items.forEach(item => {
    const header = item.querySelector('.accordion__header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ===== CAROUSEL =====
function initCarousel(container) {
  const track = container.querySelector('.carousel__track');
  const slides = container.querySelectorAll('.carousel__slide');
  const dots = container.querySelectorAll('.carousel__dot');
  let current = 0;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  return { goTo };
}

// ===== MOBILE NAV =====
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ===== COOKIE BANNER =====
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  if (localStorage.getItem('cookie-consent')) {
    banner.classList.add('hidden');
    return;
  }

  setTimeout(() => banner.classList.add('visible'), 500);

  banner.querySelector('.cookie-accept').addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.classList.remove('visible');
    banner.classList.add('hidden');
  });

  banner.querySelector('.cookie-decline').addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'declined');
    banner.classList.remove('visible');
    banner.classList.add('hidden');
  });
}

// ===== FORM VALIDATION =====
function initDemoForm() {
  const form = document.getElementById('demo-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group.classList.add('has-error');
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        group.classList.add('has-error');
        valid = false;
      } else {
        group.classList.remove('has-error');
      }
    });

    if (valid) {
      const btn = form.querySelector('.btn--primary');
      btn.textContent = 'Submitted!';
      btn.disabled = true;
      btn.style.opacity = '0.7';
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group').classList.remove('has-error');
    });
  });
}

// ===== STAT CIRCLE ANIMATION =====
function initStatCircles() {
  const circles = document.querySelectorAll('.stat__circle-fill');
  if (!circles.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const offset = circle.dataset.offset;
        circle.style.strokeDashoffset = offset;
        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.3 });

  circles.forEach(c => observer.observe(c));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCookieBanner();
  initDemoForm();
  initStatCircles();

  document.querySelectorAll('.tabs').forEach(t => initTabs(t));
  document.querySelectorAll('.accordion').forEach(a => initAccordion(a));
  document.querySelectorAll('.carousel').forEach(c => initCarousel(c));
});
