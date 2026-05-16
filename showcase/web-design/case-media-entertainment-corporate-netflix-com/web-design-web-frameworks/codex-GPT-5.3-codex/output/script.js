(() => {
  const track = document.getElementById('trending-track');
  const next = document.getElementById('trend-next');
  const prev = document.getElementById('trend-prev');

  if (track && next && prev) {
    const scrollAmount = () => Math.min(track.clientWidth * 0.85, 420);
    next.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
    prev.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
  }

  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;
    button.addEventListener('click', () => {
      faqItems.forEach((other) => {
        const otherBtn = other.querySelector('.faq-question');
        const shouldOpen = other === item && !other.classList.contains('open');
        other.classList.toggle('open', shouldOpen);
        if (otherBtn) otherBtn.setAttribute('aria-expanded', String(shouldOpen));
      });
    });
  });

  const helpToggle = document.getElementById('help-toggle');
  const helpContent = document.getElementById('help-content');
  if (helpToggle && helpContent) {
    helpToggle.addEventListener('click', () => {
      const isOpen = helpToggle.getAttribute('aria-expanded') === 'true';
      helpToggle.setAttribute('aria-expanded', String(!isOpen));
      helpContent.hidden = isOpen;
    });
  }
})();
