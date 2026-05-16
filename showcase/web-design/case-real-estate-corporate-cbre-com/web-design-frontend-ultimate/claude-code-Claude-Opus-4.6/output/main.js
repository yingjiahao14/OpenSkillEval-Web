document.addEventListener('DOMContentLoaded', function () {

  // ===== HEADER SCROLL =====
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // ===== MOBILE NAV =====
  var mobileToggle = document.getElementById('mobile-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
  }

  // ===== MOBILE ACCORDION =====
  var accordionBtns = document.querySelectorAll('.mobile-accordion-btn');
  accordionBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-accordion'));
      if (!target) return;
      var isOpen = target.classList.contains('open');
      document.querySelectorAll('.mobile-accordion-panel').forEach(function (p) { p.classList.remove('open'); });
      document.querySelectorAll('.mobile-accordion-btn').forEach(function (b) { b.classList.remove('active'); });
      if (!isOpen) {
        target.classList.add('open');
        btn.classList.add('active');
      }
    });
  });

  // ===== WHAT WE DO TABS =====
  var tabButtons = document.querySelectorAll('.wwd-tab');
  tabButtons.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var panels = tab.closest('.wwd-container').querySelectorAll('.wwd-panel');
      var tabs = tab.closest('.wwd-tabs').querySelectorAll('.wwd-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      var target = document.getElementById(tab.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });

  // ===== CAROUSEL =====
  var track = document.getElementById('carousel-track');
  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  var dotsContainer = document.getElementById('carousel-dots');

  if (track && prevBtn && nextBtn) {
    var slides = track.querySelectorAll('.carousel-slide');
    var currentSlide = 0;
    var totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
    }

    prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); });
    nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); });

    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach(function (dot) {
        dot.addEventListener('click', function () {
          goToSlide(parseInt(dot.getAttribute('data-slide'), 10));
        });
      });
    }

    setInterval(function () { goToSlide(currentSlide + 1); }, 6000);
  }

  // ===== SCROLL ANIMATIONS =====
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ===== MEGA MENU KEYBOARD ACCESSIBILITY =====
  var megaMenuBtns = document.querySelectorAll('.desktop-nav > li > button[aria-haspopup]');
  megaMenuBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var li = btn.closest('li');
      var isOpen = li.classList.contains('mega-open');
      document.querySelectorAll('.desktop-nav > li').forEach(function (item) { item.classList.remove('mega-open'); });
      if (!isOpen) {
        li.classList.add('mega-open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        btn.closest('li').classList.remove('mega-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.desktop-nav > li')) {
      document.querySelectorAll('.desktop-nav > li').forEach(function (item) {
        item.classList.remove('mega-open');
        var b = item.querySelector('button[aria-haspopup]');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });

});
