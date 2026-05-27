const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function setupMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggle || !drawer) return;
  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function setupTestimonialCarousel() {
  const container = document.getElementById('testimonialCarousel');
  if (!container) return;
  const items = $$('.t-item', container);
  const prev = document.getElementById('tPrev');
  const next = document.getElementById('tNext');
  let index = 0;
  const render = () => {
    items.forEach((item, i) => { item.style.display = i === index ? 'block' : 'none'; });
  };
  prev?.addEventListener('click', () => { index = (index - 1 + items.length) % items.length; render(); });
  next?.addEventListener('click', () => { index = (index + 1) % items.length; render(); });
  render();
}

function setupPricingToggle() {
  const scope = document.getElementById('pricingToggle');
  if (!scope) return;
  const monthlyBtn = document.getElementById('monthlyBtn');
  const annualBtn = document.getElementById('annualBtn');
  const prices = $$('[data-monthly]', document);
  function applyCycle(cycle) {
    prices.forEach((el) => {
      const monthly = Number(el.dataset.monthly || 0);
      const annual = Number(el.dataset.annual || 0);
      const isFree = monthly === 0 && annual === 0;
      if (isFree) {
        el.textContent = '$0';
        return;
      }
      const value = cycle === 'annual' ? annual : monthly;
      el.textContent = `$${value.toFixed(2)}`;
    });
    $$('.billing-label', document).forEach((el) => {
      const isFree = el.dataset.free === 'true';
      el.textContent = isFree ? '/mo' : cycle === 'annual' ? '/mo (billed annually)' : '/mo';
    });
    monthlyBtn?.classList.toggle('active', cycle === 'monthly');
    annualBtn?.classList.toggle('active', cycle === 'annual');
  }
  monthlyBtn?.addEventListener('click', () => applyCycle('monthly'));
  annualBtn?.addEventListener('click', () => applyCycle('annual'));
  applyCycle('monthly');
}

function setupFaqAccordion() {
  const items = $$('.faq-item');
  if (!items.length) return;
  items.forEach((item) => {
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => {
      items.forEach((other) => { if (other !== item) other.classList.remove('open'); });
      item.classList.toggle('open');
    });
  });
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    $$('.error', form).forEach((el) => { el.textContent = ''; });
    let valid = true;
    const required = ['name', 'email', 'message'];
    required.forEach((id) => {
      const input = document.getElementById(id);
      const err = document.querySelector(`[data-error-for="${id}"]`);
      if (!input || !err) return;
      if (!input.value.trim()) {
        err.textContent = 'This field is required.';
        valid = false;
      }
    });
    const email = document.getElementById('email');
    const emailErr = document.querySelector('[data-error-for="email"]');
    if (email && email.value.trim() && !/^\S+@\S+\.\S+$/.test(email.value)) {
      emailErr.textContent = 'Please enter a valid email.';
      valid = false;
    }
    if (!valid) return;
    success.hidden = false;
    form.reset();
  });
}

function setupCountups() {
  const stats = $$('[data-count-to]');
  if (!stats.length) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = Number(el.dataset.countTo);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1300;
      const startTime = performance.now();
      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * end);
        el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  stats.forEach((s) => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();
  setupTestimonialCarousel();
  setupPricingToggle();
  setupFaqAccordion();
  setupContactForm();
  setupCountups();
});
