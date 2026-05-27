document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTestimonialCarousel();
  initPricingToggle();
  initFaqAccordion();
  initCounters();
  initContactForm();
});

function initMobileNav() {
  const btn = document.querySelector('[data-mobile-menu-btn]');
  const drawer = document.querySelector('[data-mobile-drawer]');
  const overlay = document.querySelector('[data-drawer-overlay]');
  const close = document.querySelector('[data-mobile-close]');
  if (!btn || !drawer || !overlay) return;

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    overlay.classList.toggle('show', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  overlay.addEventListener('click', closeDrawer);
  if (close) close.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));
}

function initTestimonialCarousel() {
  const track = document.querySelector('[data-testimonial-track]');
  const prev = document.querySelector('[data-testimonial-prev]');
  const next = document.querySelector('[data-testimonial-next]');
  if (!track || !prev || !next) return;

  const slides = Array.from(track.children);
  let index = 0;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });
}

function initPricingToggle() {
  const toggleWrap = document.querySelector('[data-pricing-toggle]');
  if (!toggleWrap) return;

  const buttons = toggleWrap.querySelectorAll('button');
  const prices = document.querySelectorAll('[data-price-monthly]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.billing;
      buttons.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');

      prices.forEach((priceEl) => {
        const monthly = priceEl.dataset.priceMonthly;
        const annual = priceEl.dataset.priceAnnual;
        const period = priceEl.dataset.period || '/mo';
        if (mode === 'annual') {
          priceEl.innerHTML = `$${annual} <small>${period} billed annually</small>`;
        } else {
          priceEl.innerHTML = `$${monthly} <small>${period}</small>`;
        }
      });
    });
  });
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach((item) => {
    const btn = item.querySelector('.accordion-btn');
    btn.addEventListener('click', () => {
      items.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = Number(el.dataset.counterTarget);
    const duration = 1200;
    const start = 0;
    const startTime = performance.now();
    const suffix = el.dataset.counterSuffix || '';

    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const value = Math.floor(start + (target - start) * progress);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => observer.observe(counter));
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const success = document.querySelector('[data-form-success]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const requiredFields = [
      { id: 'name', label: 'Full name' },
      { id: 'email', label: 'Email' },
      { id: 'message', label: 'Message' }
    ];

    let valid = true;

    requiredFields.forEach((field) => {
      const input = form.querySelector(`#${field.id}`);
      const error = form.querySelector(`[data-error-for="${field.id}"]`);
      const value = input.value.trim();

      if (!value) {
        error.textContent = `${field.label} is required.`;
        valid = false;
      } else {
        error.textContent = '';
      }

      if (field.id === 'email' && value) {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!emailOk) {
          error.textContent = 'Enter a valid email address.';
          valid = false;
        }
      }
    });

    if (!valid) return;

    form.reset();
    if (success) {
      success.style.display = 'block';
      success.textContent = 'Thanks! Your message has been received. Our team will follow up shortly.';
    }
  });
}
