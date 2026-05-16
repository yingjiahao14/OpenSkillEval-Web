const carousel = document.querySelector('[data-carousel]');
const nextButton = document.querySelector('[data-carousel-next]');

if (carousel && nextButton) {
  nextButton.addEventListener('click', () => {
    const distance = Math.min(carousel.clientWidth * 0.82, 720);
    carousel.scrollBy({ left: distance, behavior: 'smooth' });
  });
}

document.querySelectorAll('[data-accordion]').forEach((accordion) => {
  accordion.querySelectorAll('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const selectedItem = button.closest('.faq-item');
      accordion.querySelectorAll('.faq-item').forEach((item) => {
        const isSelected = item === selectedItem;
        item.classList.toggle('open', isSelected && !item.classList.contains('open'));
        item.querySelector('button').setAttribute('aria-expanded', String(item.classList.contains('open')));
      });
    });
  });
});

document.querySelectorAll('[data-signup-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const message = form.querySelector('.form-message');
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    message.textContent = 'Great — your membership can start with this email.';
  });
});

const loginForm = document.querySelector('[data-login-form]');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = loginForm.querySelector('.form-message');
    if (!loginForm.checkValidity()) {
      loginForm.reportValidity();
      return;
    }
    message.textContent = 'Credentials accepted for this demo.';
  });
}

const helpPanel = document.querySelector('[data-help]');
if (helpPanel) {
  const toggle = helpPanel.querySelector('.help-toggle');
  toggle.addEventListener('click', () => {
    helpPanel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(helpPanel.classList.contains('open')));
  });
}
