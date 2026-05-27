// ===== Navigation =====
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('mobile-open');
  });

  // Close mobile menu on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('mobile-open'));
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) {
      links.classList.remove('mobile-open');
    }
  });
}

// ===== Tabs =====
function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const btns = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = container.querySelector(`[data-tab-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ===== Accordion =====
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const inner = body.querySelector('.accordion-body-inner');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
}

// ===== Testimonial Carousel =====
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let current = 0;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto-advance every 6s
  setInterval(() => {
    goTo((current + 1) % slides.length);
  }, 6000);
}

// ===== Cookie Banner =====
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  const accepted = localStorage.getItem('cookie-consent');
  if (accepted) return;

  setTimeout(() => banner.classList.add('visible'), 1000);

  banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.classList.remove('visible');
    banner.classList.add('hidden');
  });

  banner.querySelector('.cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'declined');
    banner.classList.remove('visible');
    banner.classList.add('hidden');
  });
}

// ===== Demo Form =====
function initDemoForm() {
  const form = document.getElementById('demo-form');
  if (!form) return;

  const successMsg = document.querySelector('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(err => err.classList.remove('visible'));
    form.querySelectorAll('.form-input, .form-select').forEach(inp => inp.classList.remove('error'));

    // Required fields
    const required = ['firstName', 'lastName', 'email', 'company'];
    required.forEach(name => {
      const field = form.querySelector(`[name="${name}"]`);
      if (!field || !field.value.trim()) {
        valid = false;
        field?.classList.add('error');
        const err = field?.parentElement.querySelector('.form-error');
        err?.classList.add('visible');
      }
    });

    // Email validation
    const emailField = form.querySelector('[name="email"]');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      valid = false;
      emailField.classList.add('error');
      const err = emailField.parentElement.querySelector('.form-error');
      if (err) err.textContent = 'Please enter a valid email address';
      err?.classList.add('visible');
    }

    if (valid && successMsg) {
      form.style.display = 'none';
      successMsg.classList.add('visible');
    }
  });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initDemoForm();

  // Init all tab containers
  initTabs('.tabs-container');
});
