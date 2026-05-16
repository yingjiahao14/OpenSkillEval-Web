/* ===== LearnForge — Interactive Components ===== */

// ===== Mobile Navigation =====
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function() {
    this.classList.toggle('active');
    links.classList.toggle('open');
  });
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      toggle.classList.remove('active');
      links.classList.remove('open');
    }
  });
})();

// ===== Hero Tab Switch (Home) =====
(function() {
  const tabs = document.querySelectorAll('.hero-tab');
  const panels = document.querySelectorAll('.hero-tab-panel');
  if (!tabs.length) return;
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = this.getAttribute('data-tab');
      tabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
      panels.forEach(function(p) {
        p.classList.toggle('active', p.getAttribute('data-panel') === target);
      });
    });
  });
})();

// ===== Why Choose Us Tabs (Home) =====
(function() {
  var btns = document.querySelectorAll('.why-tab-btn');
  var panels = document.querySelectorAll('.why-tab-panel');
  if (!btns.length) return;
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = this.getAttribute('data-tab');
      btns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      panels.forEach(function(p) {
        p.classList.toggle('active', p.getAttribute('data-panel') === target);
      });
    });
  });
})();

// ===== Testimonial Carousel =====
function initCarousel(selector) {
  var carousel = document.querySelector(selector);
  if (!carousel) return;
  var track = carousel.querySelector('.testimonials-track');
  var cards = carousel.querySelectorAll('.testimonial-card');
  var prevBtn = carousel.querySelector('.carousel-prev');
  var nextBtn = carousel.querySelector('.carousel-next');
  var dotsContainer = carousel.querySelector('.carousel-dots');
  var current = 0;
  var total = cards.length;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', (function(idx) { return function() { goTo(idx); }; })(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    current = index;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    var dots = carousel.querySelectorAll('.carousel-dot');
    dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
  }

  function next() { goTo((current + 1) % total); }
  function prev() { goTo((current - 1 + total) % total); }

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  // Auto-advance
  var interval = setInterval(next, 5000);
  carousel.addEventListener('mouseenter', function() { clearInterval(interval); });
  carousel.addEventListener('mouseleave', function() { interval = setInterval(next, 5000); });
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.testimonials-carousel').forEach(function(el, i) {
    initCarousel('[data-carousel="' + (i + 1) + '"]');
  });
});

// Alternative: find all carousels and init them
(function() {
  var carousels = document.querySelectorAll('.testimonials-carousel');
  carousels.forEach(function(carousel) {
    var track = carousel.querySelector('.testimonials-track');
    var cards = carousel.querySelectorAll('.testimonial-card');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var dotsContainer = carousel.querySelector('.carousel-dots');
    if (!track || !cards.length) return;
    var current = 0;
    var total = cards.length;
    var initialized = carousel.getAttribute('data-initialized');
    if (initialized === 'true') return;
    carousel.setAttribute('data-initialized', 'true');

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        (function(idx) {
          dot.addEventListener('click', function() { goTo(idx); });
        })(i);
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      var dots = carousel.querySelectorAll('.carousel-dot');
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    function next() { goTo((current + 1) % total); }
    function prev() { goTo((current - 1 + total) % total); }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    var interval = setInterval(next, 5000);
    carousel.addEventListener('mouseenter', function() { clearInterval(interval); });
    carousel.addEventListener('mouseleave', function() { interval = setInterval(next, 5000); });
  });
})();

// ===== FAQ Accordions =====
(function() {
  document.querySelectorAll('.faq-item').forEach(function(item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function() {
      var isActive = item.classList.contains('active');
      // Close all in same list
      var list = item.closest('.faq-list');
      if (list) {
        list.querySelectorAll('.faq-item').forEach(function(sibling) {
          sibling.classList.remove('active');
        });
      }
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
})();

// ===== Product Demo Accordion (Online Courses) =====
(function() {
  var toggle = document.querySelector('.product-demo-toggle');
  var content = document.querySelector('.product-demo-content');
  if (!toggle || !content) return;
  toggle.addEventListener('click', function() {
    var isOpen = content.classList.contains('open');
    content.classList.toggle('open', !isOpen);
    toggle.classList.toggle('active', !isOpen);
    toggle.textContent = isOpen ? 'Click to preview the course dashboard' : 'Hide preview';
  });
})();

// ===== Scroll Animations =====
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });
})();
