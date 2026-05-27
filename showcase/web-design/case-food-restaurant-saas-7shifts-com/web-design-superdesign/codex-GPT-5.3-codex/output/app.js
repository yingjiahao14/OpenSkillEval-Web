const testimonials = [
  {
    quote: 'ShiftWise cut our scheduling time in half and gave every manager instant visibility into labor spend.',
    name: 'Maya Lopez',
    role: 'Operations Director, Urban Fork Group'
  },
  {
    quote: 'Our team actually reads updates now because messaging, swaps, and announcements live in one place.',
    name: 'Jordan Kim',
    role: 'General Manager, Ember & Salt'
  },
  {
    quote: 'Compliance alerts alone paid for the platform in month one by helping us avoid overtime surprises.',
    name: 'Ethan Ross',
    role: 'Owner, Northside Hospitality Co.'
  }
];

let testimonialIndex = 0;

function updateTestimonial() {
  const quote = document.getElementById('testimonial-quote');
  const author = document.getElementById('testimonial-author');
  if (!quote || !author) return;
  quote.textContent = testimonials[testimonialIndex].quote;
  author.textContent = `${testimonials[testimonialIndex].name} — ${testimonials[testimonialIndex].role}`;
}

function initCarousel() {
  const prev = document.getElementById('testimonial-prev');
  const next = document.getElementById('testimonial-next');
  if (!prev || !next) return;
  updateTestimonial();
  prev.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
  });
  next.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    updateTestimonial();
  });
}

function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    let value = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      value += step;
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      counter.textContent = `${value.toLocaleString()}${suffix}`;
    }, 24);
  });
}

function initMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  if (!btn || !drawer) return;
  btn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    btn.setAttribute('aria-expanded', drawer.classList.contains('open') ? 'true' : 'false');
  });
}

function initPricingToggle() {
  const monthlyBtn = document.getElementById('billing-monthly');
  const annualBtn = document.getElementById('billing-annual');
  if (!monthlyBtn || !annualBtn) return;

  const priceEls = document.querySelectorAll('[data-monthly][data-annual]');
  const setMode = (mode) => {
    monthlyBtn.classList.toggle('active', mode === 'monthly');
    annualBtn.classList.toggle('active', mode === 'annual');
    priceEls.forEach((el) => {
      el.textContent = mode === 'monthly' ? el.dataset.monthly : el.dataset.annual;
    });
  };

  monthlyBtn.addEventListener('click', () => setMode('monthly'));
  annualBtn.addEventListener('click', () => setMode('annual'));
  setMode('monthly');
}

function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;
  items.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      items.forEach((other) => other.classList.remove('open'));
      item.classList.add('open');
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const success = document.getElementById('contact-success');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const required = ['name', 'email', 'message'];
    let valid = true;

    required.forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      const error = form.querySelector(`[data-error="${field}"]`);
      const value = input.value.trim();
      error.textContent = '';

      if (!value) {
        error.textContent = 'This field is required.';
        valid = false;
      } else if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
        error.textContent = 'Please enter a valid email.';
        valid = false;
      }
    });

    if (!valid) {
      success.classList.remove('show');
      return;
    }

    form.reset();
    success.classList.add('show');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCarousel();
  initPricingToggle();
  initFaq();
  initContactForm();
  animateCounters();
});
