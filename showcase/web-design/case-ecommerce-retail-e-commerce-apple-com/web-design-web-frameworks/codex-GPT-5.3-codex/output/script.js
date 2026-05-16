(function () {
  document.querySelectorAll('[data-carousel]').forEach(function (track) {
    var id = track.getAttribute('data-carousel');
    var prev = document.querySelector('[data-carousel-prev="' + id + '"]');
    var next = document.querySelector('[data-carousel-next="' + id + '"]');
    var step = function () {
      var first = track.querySelector('.carousel-card');
      return first ? first.getBoundingClientRect().width + 16 : 280;
    };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step() * 1.2, behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step() * 1.2, behavior: 'smooth' }); });
  });

  var tabs = document.querySelectorAll('[data-tab]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var group = tab.getAttribute('data-tab-group');
      var target = tab.getAttribute('data-tab');
      document.querySelectorAll('[data-tab-group="' + group + '"]').forEach(function (btn) { btn.classList.remove('active'); });
      document.querySelectorAll('[data-panel-group="' + group + '"]').forEach(function (panel) { panel.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.querySelector('[data-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  document.querySelectorAll('.footer-col').forEach(function (col) {
    var toggle = col.querySelector('.footer-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      col.classList.toggle('open');
    });
  });
})();
