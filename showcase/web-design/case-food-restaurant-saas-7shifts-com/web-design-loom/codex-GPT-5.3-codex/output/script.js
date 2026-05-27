(() => {
  const drawer = document.querySelector('[data-mobile-drawer]');
  const backdrop = document.querySelector('[data-backdrop]');
  const toggle = document.querySelector('[data-mobile-toggle]');
  if (drawer && toggle && backdrop) {
    const closeDrawer = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const openDrawer = () => {
      drawer.classList.add('open');
      backdrop.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
    };
    toggle.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
    backdrop.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
  }

  const statEls = document.querySelectorAll('[data-count]');
  if (statEls.length) {
    const runCount = (el) => {
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      let n = 0;
      const steps = 30;
      const inc = target / steps;
      const timer = setInterval(() => {
        n += inc;
        if (n >= target) {
          n = target;
          clearInterval(timer);
        }
        el.textContent = `${prefix}${Math.round(n).toLocaleString()}${suffix}`;
      }, 28);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.done) {
          entry.target.dataset.done = '1';
          runCount(entry.target);
        }
      });
    }, { threshold: .4 });
    statEls.forEach((el) => io.observe(el));
  }

  const track = document.querySelector('[data-testimonial]');
  if (track) {
    const items = JSON.parse(track.dataset.items || '[]');
    let idx = 0;
    const render = () => {
      const item = items[idx];
      track.innerHTML = `<div class="card"><p>“${item.quote}”</p><strong>${item.name}</strong><div>${item.role}</div></div>`;
    };
    document.querySelector('[data-prev]')?.addEventListener('click', () => { idx = (idx - 1 + items.length) % items.length; render(); });
    document.querySelector('[data-next]')?.addEventListener('click', () => { idx = (idx + 1) % items.length; render(); });
    render();
  }

  const switchWrap = document.querySelector('[data-pricing-switch]');
  if (switchWrap) {
    const buttons = switchWrap.querySelectorAll('.switch-btn');
    const prices = document.querySelectorAll('[data-price-monthly]');
    const applyMode = (mode) => {
      buttons.forEach((b) => b.classList.toggle('active', b.dataset.mode === mode));
      prices.forEach((p) => {
        p.textContent = mode === 'annual' ? p.dataset.priceAnnual : p.dataset.priceMonthly;
      });
      const notes = document.querySelectorAll('[data-billing-note]');
      notes.forEach((n) => n.textContent = mode === 'annual' ? 'Billed annually (save 20%)' : 'Billed monthly');
    };
    buttons.forEach((b) => b.addEventListener('click', () => applyMode(b.dataset.mode)));
    applyMode('monthly');
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      faqItems.forEach((other) => { if (other !== item) other.classList.remove('open'); });
      item.classList.toggle('open');
    });
  });

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[data-required]').forEach((field) => {
        const err = form.querySelector(`[data-error-for="${field.name}"]`);
        if (!field.value.trim()) {
          valid = false;
          if (err) err.textContent = 'This field is required.';
        } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
          valid = false;
          if (err) err.textContent = 'Enter a valid email address.';
        } else {
          if (err) err.textContent = '';
        }
      });
      const success = form.querySelector('[data-success]');
      if (valid) {
        success.hidden = false;
        form.reset();
      } else {
        success.hidden = true;
      }
    });
  }
})();
