(function () {
  const drawer = document.querySelector('[data-drawer]');
  const overlay = document.querySelector('[data-overlay]');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');

  function closeDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  openBtn && openBtn.addEventListener('click', openDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  overlay && overlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('[data-close-drawer]').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  const testimonialEl = document.querySelector('[data-testimonial-text]');
  const nameEl = document.querySelector('[data-testimonial-name]');
  const roleEl = document.querySelector('[data-testimonial-role]');
  const prevBtn = document.querySelector('[data-testimonial-prev]');
  const nextBtn = document.querySelector('[data-testimonial-next]');

  const testimonials = [
    {
      text: 'ShiftWise cut schedule creation from 4 hours to 25 minutes. Labor costs are finally predictable.',
      name: 'Marina Patel',
      role: 'General Manager, Tide & Table'
    },
    {
      text: 'Our team communicates in one place, swap requests are automatic, and no one misses shifts anymore.',
      name: 'Luis Romero',
      role: 'Owner, Barrio Kitchen Group'
    },
    {
      text: 'Compliance alerts alone paid for the subscription in month one. It removed constant legal guesswork.',
      name: 'Dana Collins',
      role: 'Operations Director, Ember Hospitality'
    }
  ];

  let testimonialIndex = 0;
  function renderTestimonial() {
    if (!testimonialEl || !nameEl || !roleEl) return;
    const item = testimonials[testimonialIndex];
    testimonialEl.textContent = `“${item.text}”`;
    nameEl.textContent = item.name;
    roleEl.textContent = item.role;
  }

  prevBtn && prevBtn.addEventListener('click', function () {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  });
  nextBtn && nextBtn.addEventListener('click', function () {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
  });
  renderTestimonial();

  const stats = document.querySelectorAll('[data-count-to]');
  function animateCount(el) {
    const targetRaw = el.getAttribute('data-count-to') || '0';
    const target = parseFloat(targetRaw);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * (1 - Math.pow(1 - progress, 3));
      let formatted;
      if (target >= 1000) {
        formatted = Math.round(value).toLocaleString();
      } else if (target % 1 !== 0) {
        formatted = value.toFixed(1);
      } else {
        formatted = Math.round(value).toString();
      }
      el.textContent = formatted + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (stats.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach((el) => obs.observe(el));
  }

  const billingToggle = document.querySelector('[data-billing-toggle]');
  if (billingToggle) {
    const monthBtn = billingToggle.querySelector('[data-billing="monthly"]');
    const annualBtn = billingToggle.querySelector('[data-billing="annual"]');
    const priceEls = document.querySelectorAll('[data-monthly][data-annual]');

    function setBilling(mode) {
      priceEls.forEach((el) => {
        const val = mode === 'annual' ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
        el.textContent = val;
      });
      monthBtn.classList.toggle('active', mode === 'monthly');
      annualBtn.classList.toggle('active', mode === 'annual');
    }

    monthBtn.addEventListener('click', () => setBilling('monthly'));
    annualBtn.addEventListener('click', () => setBilling('annual'));
    setBilling('monthly');
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-q');
    button.addEventListener('click', () => {
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const requiredFields = contactForm.querySelectorAll('[data-required]');
      requiredFields.forEach((field) => {
        const wrap = field.closest('[data-field-wrap]');
        const error = wrap ? wrap.querySelector('.error') : null;
        const value = field.value.trim();
        let fieldValid = value.length > 0;

        if (field.type === 'email' && value) {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        if (!fieldValid) {
          valid = false;
          if (error) error.style.display = 'block';
          field.setAttribute('aria-invalid', 'true');
        } else {
          if (error) error.style.display = 'none';
          field.removeAttribute('aria-invalid');
        }
      });

      const success = contactForm.querySelector('.success');
      if (valid) {
        contactForm.reset();
        if (success) success.style.display = 'block';
      } else if (success) {
        success.style.display = 'none';
      }
    });
  }
})();
