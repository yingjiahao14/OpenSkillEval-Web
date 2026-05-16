document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

  if (mobileMenuToggle && mobileMenuOverlay) {
    mobileMenuToggle.addEventListener('click', () => {
      const isActive = mobileMenuToggle.classList.contains('is-active');
      
      if (isActive) {
        mobileMenuToggle.classList.remove('is-active');
        mobileMenuOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
      } else {
        mobileMenuToggle.classList.add('is-active');
        mobileMenuOverlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
});
