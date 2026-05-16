const setMessage = (form, message) => {
  const note = form.querySelector('.form-note');
  if (note) note.textContent = message;
};

document.querySelectorAll('.signup-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]');
    if (!email.checkValidity()) {
      setMessage(form, 'Enter a valid email address to continue.');
      email.focus();
      return;
    }
    setMessage(form, `Great — ${email.value} is ready to start StreamWave.`);
  });
});

const carousel = document.querySelector('#trending-carousel');
if (carousel) {
  document.querySelectorAll('[data-carousel]').forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.carousel === 'next' ? 1 : -1;
      carousel.scrollBy({ left: direction * Math.max(260, carousel.clientWidth * 0.72), behavior: 'smooth' });
    });
  });
}

document.querySelectorAll('[data-accordion]').forEach((accordion) => {
  const questions = accordion.querySelectorAll('.faq-question');
  questions.forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const shouldOpen = question.getAttribute('aria-expanded') !== 'true';

      questions.forEach((otherQuestion) => {
        const otherItem = otherQuestion.closest('.faq-item');
        otherQuestion.setAttribute('aria-expanded', 'false');
        otherItem.querySelector('.faq-answer').hidden = true;
      });

      if (shouldOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });
});

const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const identifier = loginForm.elements.identifier;
    const password = loginForm.elements.password;
    const status = document.querySelector('#login-status');

    if (!identifier.value.trim()) {
      status.textContent = 'Enter your email address or mobile number.';
      identifier.focus();
      return;
    }
    if (!password.value || password.value.length < 6) {
      status.textContent = 'Enter a password with at least 6 characters.';
      password.focus();
      return;
    }
    status.textContent = 'Credentials accepted for this prototype.';
  });
}

const helpToggle = document.querySelector('.help-toggle');
if (helpToggle) {
  helpToggle.addEventListener('click', () => {
    const content = document.querySelector(`#${helpToggle.getAttribute('aria-controls')}`);
    const expanded = helpToggle.getAttribute('aria-expanded') === 'true';
    helpToggle.setAttribute('aria-expanded', String(!expanded));
    content.hidden = expanded;
  });
}
