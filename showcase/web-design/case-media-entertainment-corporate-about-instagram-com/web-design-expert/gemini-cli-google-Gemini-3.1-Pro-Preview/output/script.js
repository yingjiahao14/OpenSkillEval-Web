document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const closeMenuBtn = document.querySelector('.close-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  function toggleMenu() {
    const isActive = mobileMenu.classList.contains('active');
    if (isActive) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Optional: smooth scroll handling for nav links if needed
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});