(function () {
  var hamburger = document.querySelector('.hamburger');
  var body = document.body;

  if (!hamburger) return;

  hamburger.addEventListener('click', function () {
    body.classList.toggle('menu-open');
  });

  var overlayLinks = document.querySelectorAll('.mobile-nav-list a');
  overlayLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      body.classList.remove('menu-open');
    });
  });

  var header = document.querySelector('.site-header');
  if (header) {
    var scrollTimer;
    window.addEventListener('scroll', function () {
      if (scrollTimer) return;
      scrollTimer = setTimeout(function () {
        scrollTimer = null;
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, 10);
    }, { passive: true });
  }
})();
