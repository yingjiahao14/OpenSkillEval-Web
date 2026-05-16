(function () {
  function setupCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function (shell) {
      var track = shell.querySelector('.carousel-track');
      var prev = shell.querySelector('[data-prev]');
      var next = shell.querySelector('[data-next]');
      if (!track || !prev || !next) return;
      function amount() {
        var card = track.querySelector('.card, .category-item');
        return card ? card.getBoundingClientRect().width + 18 : track.clientWidth * 0.8;
      }
      function update() {
        var max = track.scrollWidth - track.clientWidth - 4;
        prev.disabled = track.scrollLeft <= 4;
        next.disabled = track.scrollLeft >= max;
      }
      prev.addEventListener('click', function () { track.scrollBy({ left: -amount(), behavior: 'smooth' }); });
      next.addEventListener('click', function () { track.scrollBy({ left: amount(), behavior: 'smooth' }); });
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
    });
  }

  function setupTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (root) {
      var buttons = root.querySelectorAll('[data-tab]');
      var panels = root.querySelectorAll('[data-panel]');
      buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          var id = button.getAttribute('data-tab');
          buttons.forEach(function (btn) {
            var active = btn === button;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
          });
          panels.forEach(function (panel) {
            var active = panel.getAttribute('data-panel') === id;
            panel.classList.toggle('active', active);
            panel.hidden = !active;
          });
        });
      });
    });
  }

  function setupFooter() {
    document.querySelectorAll('.footer-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        if (!window.matchMedia('(max-width: 640px)').matches) return;
        var section = button.closest('.footer-section');
        var open = section.classList.toggle('open');
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupCarousels();
    setupTabs();
    setupFooter();
  });
}());
