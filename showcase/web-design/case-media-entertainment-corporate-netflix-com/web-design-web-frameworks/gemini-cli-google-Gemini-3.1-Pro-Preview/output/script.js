document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all open items
      faqItems.forEach(faq => {
        faq.classList.remove('active');
      });

      // If it wasn't active before, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Trending Carousel
  const carouselContainer = document.querySelector('.carousel-container');
  const btnLeft = document.querySelector('.btn-left');
  const btnRight = document.querySelector('.btn-right');

  if (carouselContainer && btnLeft && btnRight) {
    btnRight.addEventListener('click', () => {
      carouselContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    btnLeft.addEventListener('click', () => {
      carouselContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }

  // Login Get Help Toggle
  const helpToggle = document.querySelector('.login-help-toggle');
  const helpContent = document.querySelector('.login-help-content');
  if (helpToggle && helpContent) {
    helpToggle.addEventListener('click', () => {
      helpContent.classList.toggle('active');
    });
  }
});
