/* Orchard — Shared Scripts */

// Carousels
function initCarousels() {
  document.querySelectorAll('.carousel-wrap').forEach(function(wrap) {
    var carousel = wrap.querySelector('.carousel');
    var prev = wrap.querySelector('.carousel-arrow.prev');
    var next = wrap.querySelector('.carousel-arrow.next');
    if (!carousel) return;

    function updateArrows() {
      if (prev) prev.style.opacity = carousel.scrollLeft <= 4 ? '0.4' : '0.9';
      if (next) next.style.opacity = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4 ? '0.4' : '0.9';
    }

    if (prev) prev.addEventListener('click', function() {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });

    if (next) next.addEventListener('click', function() {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateArrows);
    updateArrows();
    window.addEventListener('resize', updateArrows);
  });
}

// Entertainment Tabs
function initTabs() {
  var tabBtns = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var target = btn.getAttribute('data-tab');
      panels.forEach(function(p) {
        p.classList.toggle('active', p.getAttribute('data-tab') === target);
      });
    });
  });
}

// Footer Accordion (mobile)
function initFooterAccordion() {
  var headers = document.querySelectorAll('.footer-col h4');
  headers.forEach(function(h4) {
    h4.addEventListener('click', function() {
      if (window.innerWidth > 768) return;
      var col = h4.parentElement;
      col.classList.toggle('open');
    });
  });
}

// Sticky Section Nav (category pages)
function initSectionNav() {
  var navLinks = document.querySelectorAll('.section-nav a[href^="#"]');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var offset = 100; // nav + section-nav height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initCarousels();
  initTabs();
  initFooterAccordion();
  initSectionNav();
});
