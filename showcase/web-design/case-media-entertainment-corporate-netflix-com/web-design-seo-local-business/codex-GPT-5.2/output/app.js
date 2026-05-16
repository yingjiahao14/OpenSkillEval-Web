const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function initFaqAccordion() {
  const items = qsa('[data-faq-item]');
  if (!items.length) return;

  const openItem = (target) => {
    for (const item of items) item.dataset.open = item === target ? 'true' : 'false';
  };

  for (const item of items) {
    const button = qs('[data-faq-button]', item);
    if (!button) continue;
    button.addEventListener('click', () => openItem(item));
  }

  openItem(items[0]);
}

function initTrendingCarousel() {
  const track = qs('[data-carousel-track]');
  const next = qs('[data-carousel-next]');
  if (!track || !next) return;

  const step = () => {
    const card = qs('.title-card', track);
    const gap = 14;
    const cardWidth = card ? card.getBoundingClientRect().width : 240;
    return Math.round(cardWidth + gap);
  };

  next.addEventListener('click', () => {
    track.scrollBy({ left: step() * 2, behavior: 'smooth' });
  });
}

function initEmailCapture(formSelector) {
  const form = qs(formSelector);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = qs('input[type="email"]', form);
    const email = input ? input.value.trim() : '';
    if (!email) {
      input?.focus();
      input?.setCustomValidity('Please enter your email address.');
      input?.reportValidity();
      return;
    }
    input?.setCustomValidity('');

    try {
      sessionStorage.setItem('streamwave_email', email);
    } catch {}

    form.dataset.submitted = 'true';
    const msg = qs('[data-form-status]', form);
    if (msg) msg.textContent = 'Perfect. Next: create your account.';
  });
}

function initLoginForm() {
  const form = qs('[data-login-form]');
  if (!form) return;

  const email = qs('input[name="identifier"]', form);
  const pass = qs('input[name="password"]', form);

  try {
    const saved = sessionStorage.getItem('streamwave_email');
    if (saved && email && !email.value) email.value = saved;
  } catch {}

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const identifier = (email?.value || '').trim();
    const password = (pass?.value || '').trim();

    if (!identifier) {
      email?.focus();
      email?.setCustomValidity('Please enter your email or mobile number.');
      email?.reportValidity();
      return;
    }
    email?.setCustomValidity('');

    if (!password) {
      pass?.focus();
      pass?.setCustomValidity('Please enter your password.');
      pass?.reportValidity();
      return;
    }
    pass?.setCustomValidity('');

    const status = qs('[data-login-status]');
    if (status) status.textContent = 'Signing you in…';

    window.setTimeout(() => {
      if (status) status.textContent = 'Demo only — no account created.';
    }, 700);
  });
}

function initHelpToggle() {
  const help = qs('[data-help]');
  const toggle = qs('[data-help-toggle]');
  if (!help || !toggle) return;

  toggle.addEventListener('click', () => {
    help.dataset.open = help.dataset.open === 'true' ? 'false' : 'true';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
  initTrendingCarousel();
  initEmailCapture('[data-email-form="hero"]');
  initEmailCapture('[data-email-form="cta"]');
  initLoginForm();
  initHelpToggle();
});

