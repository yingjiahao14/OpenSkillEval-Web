const setPanelHeight = (panel, isOpen) => {
  panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : '0px';
};

document.querySelectorAll('[data-faq-list]').forEach((list) => {
  const items = [...list.querySelectorAll('.faq-item')];

  const syncHeights = () => {
    items.forEach((item) => {
      setPanelHeight(item.querySelector('.faq-answer'), item.classList.contains('open'));
    });
  };

  items.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    setPanelHeight(answer, item.classList.contains('open'));

    button.addEventListener('click', () => {
      const shouldOpen = !item.classList.contains('open');
      items.forEach((otherItem) => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        setPanelHeight(otherItem.querySelector('.faq-answer'), false);
      });

      if (shouldOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        setPanelHeight(answer, true);
      }
    });
  });

  window.addEventListener('resize', syncHeights);
});

const carousel = document.querySelector('[data-carousel]');
const nextButton = document.querySelector('[data-carousel-next]');
const prevButton = document.querySelector('[data-carousel-prev]');

if (carousel && nextButton && prevButton) {
  const scrollByCard = (direction) => {
    const card = carousel.querySelector('.title-card');
    const distance = card ? card.getBoundingClientRect().width + 22 : 260;
    carousel.scrollBy({ left: direction * distance * 2, behavior: 'smooth' });
  };

  nextButton.addEventListener('click', () => scrollByCard(1));
  prevButton.addEventListener('click', () => scrollByCard(-1));
}

document.querySelectorAll('[data-signup-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Let’s go ›';
    setTimeout(() => {
      button.textContent = originalText;
    }, 1200);
  });
});

const helpToggle = document.querySelector('[data-help-toggle]');
const helpPanel = document.querySelector('[data-help-panel]');

if (helpToggle && helpPanel) {
  helpToggle.addEventListener('click', () => {
    const isOpen = helpToggle.getAttribute('aria-expanded') === 'true';
    helpToggle.setAttribute('aria-expanded', String(!isOpen));
    helpToggle.querySelector('span:last-child').textContent = isOpen ? '+' : '–';
    setPanelHeight(helpPanel, !isOpen);
  });
}

const loginForm = document.querySelector('[data-login-form]');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('[data-login-status]');
    if (loginForm.checkValidity()) {
      status.textContent = 'Thanks — your sign-in details are ready to submit.';
    }
  });
}
