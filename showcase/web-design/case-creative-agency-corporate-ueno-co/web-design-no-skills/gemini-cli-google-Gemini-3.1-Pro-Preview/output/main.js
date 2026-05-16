document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      mobileOverlay.classList.toggle('is-active');
      
      // Prevent scrolling when menu is open
      if (mobileOverlay.classList.contains('is-active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
});
