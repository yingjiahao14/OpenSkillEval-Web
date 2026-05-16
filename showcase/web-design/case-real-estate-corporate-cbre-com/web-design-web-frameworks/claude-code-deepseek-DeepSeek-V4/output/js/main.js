/* ===== GlobalStone — Interactive Behaviors ===== */
(function(){
  'use strict';

  /* ===== Mobile Navigation ===== */
  var mobileToggle = document.querySelector('.mobile-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function(){
      this.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
  }

  /* ===== Mobile Submenu Accordion ===== */
  var submenuTriggers = document.querySelectorAll('.mobile-nav-link[data-submenu]');
  submenuTriggers.forEach(function(trigger){
    trigger.addEventListener('click', function(e){
      e.preventDefault();
      var submenu = document.querySelector(this.getAttribute('data-submenu'));
      if (submenu) {
        submenu.classList.toggle('open');
        var icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : '';
        }
      }
    });
  });

  /* ===== What We Do Tabs ===== */
  var wwdTabs = document.querySelectorAll('.wwd-tab');
  var wwdPanels = document.querySelectorAll('.wwd-panel');
  wwdTabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      var target = this.getAttribute('data-tab');
      wwdTabs.forEach(function(t){ t.classList.remove('active'); });
      wwdPanels.forEach(function(p){ p.classList.remove('active'); });
      this.classList.add('active');
      var panel = document.getElementById('panel-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ===== Header Scroll Effect ===== */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function(){
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ===== Partners Carousel ===== */
  var track = document.querySelector('.partners-track');
  var prevBtn = document.querySelector('.carousel-btn-prev');
  var nextBtn = document.querySelector('.carousel-btn-next');
  if (track && prevBtn && nextBtn) {
    var index = 0;
    var cardEl = track.querySelector('.partner-card');
    var cardWidth = cardEl ? cardEl.offsetWidth + 24 : 300; // card width + gap
    var maxIndex = track.children.length - 1;

    function updateCarousel() {
      track.style.transform = 'translateX(' + (-index * cardWidth) + 'px)';
    }

    // Recalculate card width on resize
    window.addEventListener('resize', function(){
      var c = track.querySelector('.partner-card');
      if (c) cardWidth = c.offsetWidth + 24;
      updateCarousel();
    });

    prevBtn.addEventListener('click', function(){
      index = Math.max(0, index - 1);
      updateCarousel();
    });
    nextBtn.addEventListener('click', function(){
      index = Math.min(maxIndex - 2, index + 1); // show 3 at a time
      updateCarousel();
    });
  }

  /* ===== Newsletter Subscription ===== */
  var newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e){
      e.preventDefault();
      var input = this.querySelector('.newsletter-input');
      var btn = this.querySelector('button');
      if (input && input.value.trim()) {
        btn.textContent = 'Subscribed!';
        btn.style.background = '#003F2D';
        btn.style.borderColor = '#003F2D';
        btn.style.color = '#fff';
        input.value = '';
        setTimeout(function(){
          btn.textContent = 'Subscribe';
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 3000);
      }
    });
  }

  /* ===== Scroll Reveal ===== */
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    var windowHeight = window.innerHeight;
    reveals.forEach(function(el){
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  /* ===== Active Nav State ===== */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function(link){
    var href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  /* ===== Close mobile nav on link click ===== */
  var mobileNavLinks = document.querySelectorAll('.mobile-nav a:not([data-submenu])');
  mobileNavLinks.forEach(function(link){
    link.addEventListener('click', function(){
      if (mobileNav) mobileNav.classList.remove('active');
      if (mobileToggle) mobileToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

})();
