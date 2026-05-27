const setupMobileNav = () => {
  const toggles = document.querySelectorAll('[data-mobile-toggle]');
  toggles.forEach((toggle) => {
    const targetId = toggle.getAttribute('data-mobile-toggle');
    const drawer = document.getElementById(targetId);
    if (!drawer) return;
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => drawer.classList.remove('open'));
    });
  });
};

const setupTestimonialCarousel = () => {
  const root = document.getElementById('testimonial-carousel');
  if (!root) return;
  const quotes = [
    {
      quote: 'ShiftWise gave us clear labor visibility across five locations. We cut overtime by 18% in six weeks.',
      name: 'Amanda R.',
      role: 'Operations Director, Harbor Grill Group'
    },
    {
      quote: 'The drag-and-drop scheduler and instant team alerts replaced three separate tools and endless texts.',
      name: 'Leo M.',
      role: 'General Manager, Ember Kitchen'
    },
    {
      quote: 'Compliance alerts saved us from costly mistakes during peak season staffing. It feels built for restaurants.',
      name: 'Priya T.',
      role: 'Owner, Northside Bistro'
    }
  ];

  let index = 0;
  const quoteEl = root.querySelector('[data-quote]');
  const authorEl = root.querySelector('[data-author]');

  const render = () => {
    quoteEl.textContent = quotes[index].quote;
    authorEl.textContent = `${quotes[index].name} — ${quotes[index].role}`;
  };

  root.querySelector('[data-prev]').addEventListener('click', () => {
    index = (index - 1 + quotes.length) % quotes.length;
    render();
  });
  root.querySelector('[data-next]').addEventListener('click', () => {
    index = (index + 1) % quotes.length;
    render();
  });

  render();
};

const setupCountUps = () => {
  const statNumbers = document.querySelectorAll('[data-count-target]');
  if (!statNumbers.length) return;

  const parseTarget = (value) => Number(value.replace(/[^\d]/g, ''));

  const animate = (element) => {
    const rawTarget = element.getAttribute('data-count-target');
    const target = parseTarget(rawTarget);
    if (!target) return;
    const suffix = rawTarget.replace(/[\d,]/g, '');
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      element.textContent = `${current.toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((element) => observer.observe(element));
};

const setupPricingToggle = () => {
  const root = document.getElementById('pricing-toggle');
  if (!root) return;

  const prices = {
    monthly: {
      free: '$0',
      starter: '$29.99',
      premium: '$69.99'
    },
    annual: {
      free: '$0',
      starter: '$24.99',
      premium: '$59.99'
    }
  };

  const buttons = root.querySelectorAll('button[data-cycle]');
  const priceEls = {
    free: document.querySelector('[data-plan-price="free"]'),
    starter: document.querySelector('[data-plan-price="starter"]'),
    premium: document.querySelector('[data-plan-price="premium"]')
  };
  const suffixEls = document.querySelectorAll('[data-price-suffix]');

  const setCycle = (cycle) => {
    buttons.forEach((button) => button.classList.toggle('active', button.dataset.cycle === cycle));
    priceEls.free.textContent = prices[cycle].free;
    priceEls.starter.textContent = prices[cycle].starter;
    priceEls.premium.textContent = prices[cycle].premium;
    suffixEls.forEach((el) => {
      el.textContent = cycle === 'monthly' ? '/mo' : '/mo billed annually';
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => setCycle(button.dataset.cycle));
  });

  setCycle('monthly');
};

const setupFAQAccordion = () => {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const button = item.querySelector('.faq-btn');
    button.addEventListener('click', () => {
      items.forEach((other) => {
        if (other !== item) other.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
};

const setupContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = ['name', 'email', 'subject', 'message'];
  const success = document.getElementById('form-success');

  const validate = () => {
    let valid = true;
    fields.forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      const error = form.querySelector(`[data-error="${field}"]`);
      let message = '';

      if (!input.value.trim()) {
        message = 'This field is required.';
      } else if (field === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
        message = 'Please enter a valid email.';
      }

      error.textContent = message;
      if (message) valid = false;
    });
    return valid;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate()) {
      success.style.display = 'none';
      return;
    }
    success.style.display = 'block';
    form.reset();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();
  setupTestimonialCarousel();
  setupCountUps();
  setupPricingToggle();
  setupFAQAccordion();
  setupContactForm();
});
