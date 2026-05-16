/* === Volta Studio — Shared Scripts === */

(function() {
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  var menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
})();
