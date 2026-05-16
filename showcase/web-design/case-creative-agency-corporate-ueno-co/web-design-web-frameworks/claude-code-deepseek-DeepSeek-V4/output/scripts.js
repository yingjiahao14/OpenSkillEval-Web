(function() {
  // === Mobile Menu Toggle ===
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      var isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('open');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // === Client Marquee Animation ===
  var marqueeRows = document.querySelectorAll('.marquee-track');

  marqueeRows.forEach(function(track) {
    var content = track.innerHTML;
    // Duplicate content for seamless loop
    track.innerHTML = content + content;
  });
})();
