// GlobalStone — Main JavaScript
(function() {
  'use strict';

  // --- Header scroll effect ---
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // --- Mega Menu (Desktop) ---
  const servicesNavItem = document.getElementById('servicesNavItem');
  const megaMenu = document.getElementById('megaMenu');

  if (servicesNavItem && megaMenu) {
    const navWrap = servicesNavItem.closest('.nav-item-wrap');
    let closeTimeout;

    function openMega() {
      clearTimeout(closeTimeout);
      megaMenu.classList.add('active');
    }

    function closeMega() {
      closeTimeout = setTimeout(function() {
        megaMenu.classList.remove('active');
      }, 200);
    }

    if (navWrap) {
      navWrap.addEventListener('mouseenter', openMega);
      navWrap.addEventListener('mouseleave', closeMega);
    }

    megaMenu.addEventListener('mouseenter', function() {
      clearTimeout(closeTimeout);
    });

    megaMenu.addEventListener('mouseleave', closeMega);

    servicesNavItem.addEventListener('click', function(e) {
      if (window.innerWidth > 768) {
        e.preventDefault();
        megaMenu.classList.toggle('active');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') megaMenu.classList.remove('active');
    });
  }

  // --- Mobile Navigation ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';

      const spans = mobileToggle.querySelectorAll('span');
      if (mobileNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // --- Mobile Accordion ---
  document.querySelectorAll('[data-accordion]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetId = this.getAttribute('data-accordion');
      var target = document.getElementById(targetId);
      if (target) {
        var isOpen = target.classList.contains('active');
        document.querySelectorAll('.mobile-accordion').forEach(function(acc) {
          acc.classList.remove('active');
        });
        if (!isOpen) {
          target.classList.add('active');
        }
        var chevron = this.querySelector('.chevron');
        document.querySelectorAll('[data-accordion] .chevron').forEach(function(c) {
          c.style.transform = '';
        });
        if (!isOpen && chevron) {
          chevron.style.transform = 'rotate(180deg)';
        }
      }
    });
  });

  // --- What We Do Tabs ---
  var wwdTabs = document.querySelectorAll('.wwd-tab');
  var wwdPanels = document.querySelectorAll('.wwd-panel');

  if (wwdTabs.length && wwdPanels.length) {
    var tabMap = {
      'insights': 'panel-insights',
      'services': 'panel-services',
      'careers': 'panel-careers'
    };

    wwdTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        wwdTabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        wwdPanels.forEach(function(p) { p.classList.remove('active'); });

        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        var key = this.getAttribute('data-tab');
        var panelId = tabMap[key];
        var panel = document.getElementById(panelId);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // --- Carousel (Invest page) ---
  var carouselTrack = document.getElementById('carouselTrack');
  var prevBtn = document.getElementById('carouselPrev');
  var nextBtn = document.getElementById('carouselNext');

  if (carouselTrack && prevBtn && nextBtn) {
    var currentSlide = 0;
    var slides = carouselTrack.querySelectorAll('.carousel-slide');
    var totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    }

    prevBtn.addEventListener('click', function() { goToSlide(currentSlide - 1); });
    nextBtn.addEventListener('click', function() { goToSlide(currentSlide + 1); });
  }

  // --- Close mobile nav on resize ---
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileNav) {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
      if (mobileToggle) {
        mobileToggle.querySelectorAll('span').forEach(function(s) {
          s.style.transform = '';
          s.style.opacity = '';
        });
      }
    }
  });

})();
