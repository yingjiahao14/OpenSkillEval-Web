(function () {
  const drawerButtons = document.querySelectorAll('[data-mobile-toggle]');
  drawerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const drawer = document.getElementById('mobile-drawer');
      if (!drawer) return;
      drawer.classList.toggle('open');
      button.setAttribute('aria-expanded', String(drawer.classList.contains('open')));
    });
  });

  const carouselRoot = document.querySelector('[data-testimonial-carousel]');
  if (carouselRoot) {
    const items = JSON.parse(carouselRoot.getAttribute('data-items') || '[]');
    const quote = carouselRoot.querySelector('[data-quote]');
    const author = carouselRoot.querySelector('[data-author]');
    let idx = 0;
    const render = () => {
      if (!items.length) return;
      quote.textContent = items[idx].quote;
      author.textContent = `${items[idx].name} — ${items[idx].title}`;
    };
    render();
    carouselRoot.querySelector('[data-prev]')?.addEventListener('click', () => {
      idx = (idx - 1 + items.length) % items.length;
      render();
    });
    carouselRoot.querySelector('[data-next]')?.addEventListener('click', () => {
      idx = (idx + 1) % items.length;
      render();
    });
  }

  const stats = document.querySelectorAll('[data-count-to]');
  const animateCounts = () => {
    stats.forEach((el) => {
      const target = Number(el.getAttribute('data-count-to'));
      const suffix = el.getAttribute('data-suffix') || '';
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 70));
      const timer = setInterval(() => {
        value += step;
        if (value >= target) {
          value = target;
          clearInterval(timer);
        }
        el.textContent = `${value.toLocaleString()}${suffix}`;
      }, 18);
    });
  };
  if (stats.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounts();
          observer.disconnect();
        }
      });
    });
    observer.observe(stats[0]);
  }

  const pricingRoot = document.querySelector('[data-pricing]');
  if (pricingRoot) {
    const prices = JSON.parse(pricingRoot.getAttribute('data-prices') || '{}');
    const buttons = pricingRoot.querySelectorAll('[data-cycle]');
    const labels = pricingRoot.querySelectorAll('[data-price-tier]');
    const render = (cycle) => {
      labels.forEach((node) => {
        const tier = node.getAttribute('data-price-tier');
        const value = prices?.[tier]?.[cycle] ?? 'Custom';
        node.textContent = value;
      });
      buttons.forEach((btn) => btn.classList.toggle('active', btn.getAttribute('data-cycle') === cycle));
    };
    buttons.forEach((btn) => btn.addEventListener('click', () => render(btn.getAttribute('data-cycle'))));
    render('monthly');
  }

  const faq = document.querySelector('[data-faq]');
  if (faq) {
    faq.querySelectorAll('.faq-q').forEach((btn) => {
      btn.addEventListener('click', () => {
        faq.querySelectorAll('.faq-item').forEach((item) => item.classList.remove('open'));
        btn.closest('.faq-item')?.classList.add('open');
      });
    });
  }

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      contactForm.querySelectorAll('[data-required]').forEach((input) => {
        const error = input.parentElement.querySelector('.error');
        if (!input.value.trim()) {
          valid = false;
          if (error) error.textContent = 'This field is required.';
        } else if (error) {
          error.textContent = '';
        }
      });
      const email = contactForm.querySelector('input[type="email"]');
      const emailError = email?.parentElement.querySelector('.error');
      if (email && email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
        valid = false;
        if (emailError) emailError.textContent = 'Please enter a valid email.';
      }
      const success = contactForm.querySelector('.success-message');
      if (valid) {
        contactForm.reset();
        if (success) success.style.display = 'block';
      } else if (success) {
        success.style.display = 'none';
      }
    });
  }
})();
