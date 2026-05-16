(function () {
  const emailForms = [document.getElementById('hero-email-form'), document.getElementById('bottom-email-form')].filter(Boolean);
  emailForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input.value.trim() || !input.checkValidity()) {
        input.reportValidity();
        return;
      }
      alert('Great! We\'ll use ' + input.value.trim() + ' to get you started.');
    });
  });

  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    button?.addEventListener('click', () => {
      faqItems.forEach((other) => {
        const active = other === item;
        other.classList.toggle('open', active);
        const question = other.querySelector('.faq-question');
        if (question) question.setAttribute('aria-expanded', active ? 'true' : 'false');
      });
    });
  });

  const carousel = document.getElementById('trending-carousel');
  const next = document.getElementById('next-trending');
  const prev = document.getElementById('prev-trending');
  if (carousel && next && prev) {
    const scrollAmount = () => Math.max(260, Math.floor(carousel.clientWidth * 0.75));
    next.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
    prev.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const identity = document.getElementById('login-identity');
      const password = document.getElementById('login-password');
      if (!identity.value.trim()) return identity.reportValidity();
      if (!password.value.trim() || password.value.trim().length < 6) return password.reportValidity();
      alert('Login submitted.');
    });
  }

  const helpToggle = document.getElementById('help-toggle');
  const helpPanel = document.getElementById('help-panel');
  if (helpToggle && helpPanel) {
    helpToggle.addEventListener('click', () => {
      const expanded = helpToggle.getAttribute('aria-expanded') === 'true';
      helpToggle.setAttribute('aria-expanded', String(!expanded));
      helpPanel.hidden = expanded;
    });
  }
})();
