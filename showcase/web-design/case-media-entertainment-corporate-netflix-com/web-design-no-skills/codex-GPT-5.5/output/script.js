document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-carousel]');
  const nextButton = document.querySelector('[data-carousel-next]');
  const prevButton = document.querySelector('[data-carousel-prev]');

  if (carousel && nextButton && prevButton) {
    const scrollCarousel = (direction) => {
      const amount = Math.max(carousel.clientWidth * 0.82, 260);
      carousel.scrollBy({ left: amount * direction, behavior: 'smooth' });
    };

    nextButton.addEventListener('click', () => scrollCarousel(1));
    prevButton.addEventListener('click', () => scrollCarousel(-1));
  }

  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    const items = Array.from(accordion.querySelectorAll('.faq-item'));
    items.forEach((item) => {
      const button = item.querySelector('.faq-question');
      button.addEventListener('click', () => {
        const shouldOpen = !item.classList.contains('is-open');
        items.forEach((otherItem) => {
          otherItem.classList.remove('is-open');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (shouldOpen) {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  const helpPanel = document.querySelector('[data-help]');
  if (helpPanel) {
    const helpToggle = helpPanel.querySelector('.help-toggle');
    helpToggle.addEventListener('click', () => {
      const isOpen = helpPanel.classList.toggle('is-open');
      helpToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        return;
      }
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      if (!button) return;
      const originalText = button.textContent;
      button.textContent = 'Ready to stream';
      button.disabled = true;
      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1600);
    });
  });
});
