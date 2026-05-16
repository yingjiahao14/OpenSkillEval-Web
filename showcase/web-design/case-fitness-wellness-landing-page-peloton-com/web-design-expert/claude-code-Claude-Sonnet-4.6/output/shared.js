// ===== WELLSTREAM SHARED JS =====

// Navbar scroll effect
(function() {
  var nav = document.getElementById('navbar');
  if (!nav) return;
  function onScroll() {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Mobile nav toggle
(function() {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function() {
    links.classList.toggle('open');
  });
})();

// Dropdown menus
document.querySelectorAll('.nav-dropdown').forEach(function(dd) {
  var btn = dd.querySelector('.dropdown-toggle');
  if (!btn) return;
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelectorAll('.nav-dropdown').forEach(function(other) {
      if (other !== dd) other.classList.remove('open');
    });
    dd.classList.toggle('open');
  });
});
document.addEventListener('click', function() {
  document.querySelectorAll('.nav-dropdown').forEach(function(dd) {
    dd.classList.remove('open');
  });
});

// Animate elements on scroll
(function() {
  if (!('IntersectionObserver' in window)) return;
  var style = document.createElement('style');
  style.textContent = '.ws-fade{opacity:0;transform:translateY(24px);transition:opacity 0.5s ease,transform 0.5s ease}.ws-fade.visible{opacity:1;transform:none}';
  document.head.appendChild(style);
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.use-case-card,.card,.eco-pillar,.culture-stat,.feat-item,.stat-circle,.timeline-item').forEach(function(el) {
    el.classList.add('ws-fade');
    obs.observe(el);
  });
})();
