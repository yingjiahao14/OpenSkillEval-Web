/* WellStream Platform — Shared Scripts */

// Tab functionality
function initTabs(container) {
  const buttons = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = container.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

// Accordion
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

// Carousel
function initCarousel(container) {
  const track = container.querySelector('.carousel-track');
  const dots = container.querySelectorAll('.carousel-dot');
  let current = 0;
  const total = dots.length;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  setInterval(() => goTo((current + 1) % total), 6000);
}

// Mobile nav
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (links.classList.contains('open')) {
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

// Cookie banner
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('ws-cookies')) {
    banner.classList.add('hidden');
    return;
  }
  banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('ws-cookies', 'accepted');
    banner.classList.add('hidden');
  });
  banner.querySelector('.cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('ws-cookies', 'declined');
    banner.classList.add('hidden');
  });
}

// Form validation
function initDemoForm() {
  const form = document.getElementById('demo-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('.form-group[data-required]').forEach(group => {
      const input = group.querySelector('input, select, textarea');
      const error = group.querySelector('.form-error');
      group.classList.remove('error');

      if (!input.value.trim()) {
        group.classList.add('error');
        if (error) error.textContent = 'This field is required';
        valid = false;
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        group.classList.add('error');
        if (error) error.textContent = 'Please enter a valid email address';
        valid = false;
      }
    });

    if (valid) {
      const btn = form.querySelector('.btn-primary');
      btn.textContent = 'Thank You!';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      form.querySelectorAll('input, select, textarea').forEach(el => { el.disabled = true; });
    }
  });

  form.querySelectorAll('.form-group[data-required] input, .form-group[data-required] select').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.form-group').classList.remove('error');
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// Stat circle animation
function initStatCircles() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target.querySelector('.stat-circle-fill');
        if (circle) {
          const pct = parseFloat(circle.dataset.percent) || 0;
          const circumference = 2 * Math.PI * 70;
          circle.style.strokeDasharray = circumference;
          circle.style.strokeDashoffset = circumference - (circumference * pct / 100);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stat-circle').forEach(el => observer.observe(el));
}

// Init all
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tabs-container').forEach(initTabs);
  initAccordions();
  document.querySelectorAll('.carousel').forEach(initCarousel);
  initMobileNav();
  initCookieBanner();
  initDemoForm();
  initScrollAnimations();
  initStatCircles();
});
