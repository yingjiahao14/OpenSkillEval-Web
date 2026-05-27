document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('active');
      const expanded = mobileNav.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded);
    });
  }
});
