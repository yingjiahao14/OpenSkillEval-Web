/* RedRoom Fitness — Shared JS */

// Navbar scroll effect
(function() {
  var nb = document.getElementById('navbar');
  if (!nb) return;
  window.addEventListener('scroll', function() {
    nb.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// Mobile nav toggle
(function() {
  var btn = document.getElementById('navHamburger');
  var links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', function() {
    var open = links.classList.toggle('open');
    btn.innerHTML = open ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
    btn.setAttribute('aria-expanded', String(open));
  });
  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!nb.contains(e.target)) {
      links.classList.remove('open');
      btn.innerHTML = '<i class="ri-menu-line"></i>';
    }
  });
  var nb = document.getElementById('navbar');
})();

// Newsletter validation
(function() {
  var form = document.getElementById('newsletterForm');
  if (!form) return;
  var input = document.getElementById('nlEmail');
  var errEl = document.getElementById('nlError');
  var okEl  = document.getElementById('nlSuccess');

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    errEl.textContent = '';
    okEl.textContent = '';
    input.classList.remove('error');
    var val = input.value;
    if (!val.trim()) {
      errEl.textContent = 'Please enter your email address.';
      input.classList.add('error');
      return;
    }
    if (!validateEmail(val)) {
      errEl.textContent = 'Please enter a valid email address.';
      input.classList.add('error');
      return;
    }
    okEl.textContent = 'Thanks! You\'re now subscribed to RedRoom updates.';
    input.value = '';
  });

  input.addEventListener('input', function() {
    if (input.classList.contains('error') && validateEmail(input.value)) {
      input.classList.remove('error');
      errEl.textContent = '';
    }
  });
})();
