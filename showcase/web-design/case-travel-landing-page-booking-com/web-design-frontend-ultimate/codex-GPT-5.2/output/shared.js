(function () {
  function setActiveNav() {
    var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var tabs = document.querySelectorAll('[data-nav]');
    tabs.forEach(function (a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      if (!href) return;
      if (href === current) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  function initTabs(root) {
    var el = typeof root === 'string' ? document.querySelector(root) : root;
    if (!el) return;
    var buttons = el.querySelectorAll('[data-tab]');
    var panels = el.querySelectorAll('[data-panel]');

    function activate(name) {
      buttons.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-tab') === name);
        b.setAttribute('aria-selected', b.getAttribute('data-tab') === name ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        p.style.display = p.getAttribute('data-panel') === name ? 'block' : 'none';
      });
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        activate(b.getAttribute('data-tab'));
      });
    });

    var first = buttons[0];
    if (first) activate(first.getAttribute('data-tab'));
  }

  function initCarousel(root) {
    var el = typeof root === 'string' ? document.querySelector(root) : root;
    if (!el) return;
    var scroller = el.querySelector('[data-carousel]');
    if (!scroller) return;
    var left = el.querySelector('[data-left]');
    var right = el.querySelector('[data-right]');
    var step = function () {
      var card = scroller.querySelector('.card');
      return card ? card.getBoundingClientRect().width + 14 : 320;
    };
    function scrollBy(dir) {
      scroller.scrollBy({ left: dir * step(), behavior: 'smooth' });
    }
    if (left) left.addEventListener('click', function () { scrollBy(-1); });
    if (right) right.addEventListener('click', function () { scrollBy(1); });
  }

  function initAccordion(root) {
    var el = typeof root === 'string' ? document.querySelector(root) : root;
    if (!el) return;
    var items = el.querySelectorAll('.faq-item');
    function closeAll(except) {
      items.forEach(function (it) {
        if (it === except) return;
        it.classList.remove('open');
      });
    }
    items.forEach(function (it) {
      var q = it.querySelector('.faq-q');
      if (!q) return;
      q.addEventListener('click', function () {
        var isOpen = it.classList.contains('open');
        closeAll(isOpen ? null : it);
        it.classList.toggle('open');
      });
    });
    if (items[0]) items[0].classList.add('open');
  }

  function initHomeSearchValidation() {
    var form = document.querySelector('[data-search-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var dest = form.querySelector('input[name="destination"]');
      var inDate = form.querySelector('input[name="checkin"]');
      var outDate = form.querySelector('input[name="checkout"]');
      var msg = form.querySelector('[data-search-msg]');
      var ok = true;
      var problems = [];
      if (!dest || !dest.value.trim()) { ok = false; problems.push('Add a destination'); }
      if (!inDate || !inDate.value) { ok = false; problems.push('Choose a check-in date'); }
      if (!outDate || !outDate.value) { ok = false; problems.push('Choose a check-out date'); }
      if (inDate && outDate && inDate.value && outDate.value && outDate.value <= inDate.value) {
        ok = false;
        problems.push('Check-out must be after check-in');
      }
      if (msg) {
        msg.textContent = ok ? 'Searching stays… (demo)' : problems.join(' · ');
        msg.style.color = ok ? '#0b6b2b' : '#7a1d1d';
        msg.style.background = ok ? 'rgba(16,185,129,.12)' : 'rgba(239,68,68,.12)';
        msg.style.borderColor = ok ? 'rgba(16,185,129,.25)' : 'rgba(239,68,68,.25)';
        msg.style.display = 'block';
      }
    });
  }

  function initPackagesRadio() {
    var form = document.querySelector('[data-packages-form]');
    if (!form) return;
    var output = form.querySelector('[data-package-summary]');
    var groups = {
      'Hotel + Flight': ['Hotel', 'Flight'],
      'Hotel + Flight + Car': ['Hotel', 'Flight', 'Car'],
      'Flight + Car': ['Flight', 'Car'],
      'Hotel + Car': ['Hotel', 'Car']
    };
    function render(type) {
      var parts = groups[type] || [];
      if (output) {
        output.textContent = parts.length ? ('Included: ' + parts.join(' + ')) : '';
      }
      var hotel = form.querySelector('[data-field="hotel"]');
      var flight = form.querySelector('[data-field="flight"]');
      var car = form.querySelector('[data-field="car"]');
      if (hotel) hotel.style.display = parts.includes('Hotel') ? 'block' : 'none';
      if (flight) flight.style.display = parts.includes('Flight') ? 'block' : 'none';
      if (car) car.style.display = parts.includes('Car') ? 'block' : 'none';
    }
    form.querySelectorAll('input[name="package_type"]').forEach(function (r) {
      r.addEventListener('change', function () { render(r.value); });
      if (r.checked) render(r.value);
    });
  }

  window.StayQuest = {
    initTabs: initTabs,
    initCarousel: initCarousel,
    initAccordion: initAccordion
  };

  document.addEventListener('DOMContentLoaded', function () {
    setActiveNav();
    initHomeSearchValidation();
    initPackagesRadio();
  });
})();

