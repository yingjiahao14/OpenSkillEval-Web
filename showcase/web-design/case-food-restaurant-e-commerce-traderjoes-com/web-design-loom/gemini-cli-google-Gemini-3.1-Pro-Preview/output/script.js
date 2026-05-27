document.addEventListener('DOMContentLoaded', () => {
  // 1. Featured Products Carousel Interaction
  const track = document.getElementById('product-carousel');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (track && prevBtn && nextBtn) {
    const scrollAmount = 300; // Approximate card width + gap
    
    prevBtn.addEventListener('click', () => {
      track.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    nextBtn.addEventListener('click', () => {
      track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  }

  // 2. Store Locator Interaction
  const locatorForm = document.getElementById('locator-form');
  const locatorResults = document.getElementById('locator-results');
  
  if (locatorForm && locatorResults) {
    locatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Show mock results
      locatorResults.classList.remove('hidden');
      // Scroll slightly to show results clearly
      locatorResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // 3. Newsletter Interaction
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const emailInput = document.getElementById('email');
  
  if (newsletterForm && newsletterSuccess && emailInput) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Hide input group
      const inputGroup = newsletterForm.querySelector('.input-group');
      if (inputGroup) {
        inputGroup.style.display = 'none';
      }
      // Show success message
      newsletterSuccess.classList.remove('hidden');
    });
  }
  
  // Note: Category hover effects are handled purely via CSS in styles.css
});