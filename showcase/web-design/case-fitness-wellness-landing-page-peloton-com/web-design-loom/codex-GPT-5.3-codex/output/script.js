function initDropdown() {
  document.querySelectorAll('.dropdown').forEach((dropdown) => {
    const button = dropdown.querySelector('.dropdown-toggle');
    button?.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) dropdown.classList.remove('open');
    });
  });
}

function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const buttons = group.querySelectorAll('[role="tab"]');
    const panels = group.querySelectorAll('[role="tabpanel"]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.target;
        buttons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        panels.forEach((panel) => panel.classList.remove('active'));
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        group.querySelector(`#${target}`)?.classList.add('active');
      });
    });
  });
}

function initAccordion() {
  document.querySelectorAll('[data-accordion]').forEach((wrap) => {
    const items = wrap.querySelectorAll('.accordion-item');
    items.forEach((item) => {
      item.querySelector('.accordion-header')?.addEventListener('click', () => {
        items.forEach((candidate) => candidate.classList.remove('active'));
        item.classList.add('active');
      });
    });
  });
}

function initCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const sets = JSON.parse(carousel.dataset.sets || '[]');
  const track = carousel.querySelector('.carousel-track');
  const dots = carousel.querySelectorAll('.dot');

  function render(index) {
    if (!track || !sets[index]) return;
    track.innerHTML = sets[index].map((item) => `\n      <article class="card testimonial">\n        <p>“${item.quote}”</p>\n        <strong>${item.author}</strong><br/>\n        <span>${item.title}</span>\n      </article>`).join('');
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => render(index));
  });

  render(0);
}

function initDemoForm() {
  const form = document.querySelector('#demo-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelectorAll('.error').forEach((e) => (e.textContent = ''));

    const required = ['firstName', 'lastName', 'email', 'company', 'industry'];
    let valid = true;

    required.forEach((name) => {
      const field = form.elements[name];
      if (!field || !String(field.value).trim()) {
        valid = false;
        const err = form.querySelector(`[data-error="${name}"]`);
        if (err) err.textContent = 'This field is required.';
      }
    });

    const email = form.elements.email;
    if (email && email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
      valid = false;
      const err = form.querySelector('[data-error="email"]');
      if (err) err.textContent = 'Enter a valid email address.';
    }

    if (!valid) return;

    const existing = form.querySelector('.success-msg');
    if (existing) existing.remove();
    const msg = document.createElement('div');
    msg.className = 'success-msg';
    msg.textContent = 'Demo request submitted successfully. Our team will contact you shortly.';
    form.appendChild(msg);
    form.reset();
  });
}

function initCookieBanner() {
  const banner = document.querySelector('#cookie-banner');
  if (!banner) return;
  const saved = localStorage.getItem('wellstream_cookie_pref');
  if (!saved) banner.style.display = 'block';

  banner.querySelectorAll('[data-cookie]').forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.setItem('wellstream_cookie_pref', button.dataset.cookie);
      banner.style.display = 'none';
    });
  });
}

initDropdown();
initTabs();
initAccordion();
initCarousel();
initDemoForm();
initCookieBanner();
