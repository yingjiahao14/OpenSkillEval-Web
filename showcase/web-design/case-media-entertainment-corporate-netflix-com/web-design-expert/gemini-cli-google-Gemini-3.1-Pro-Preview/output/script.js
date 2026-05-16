document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Trending Carousel
  const carousel = document.querySelector('.carousel');
  const nextBtn = document.querySelector('.carousel-arrow');
  
  if (carousel && nextBtn) {
    nextBtn.addEventListener('click', () => {
      const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
      const gap = parseInt(window.getComputedStyle(carousel).gap || '0', 10);
      carousel.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
    });
  }

  // Login Get Help Toggle
  const helpBtn = document.querySelector('.help-btn');
  const helpContent = document.querySelector('.help-content');
  
  if (helpBtn && helpContent) {
    helpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      helpContent.classList.toggle('show');
    });
  }
});
