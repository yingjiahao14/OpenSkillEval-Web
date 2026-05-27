document.addEventListener('DOMContentLoaded', function () {

  // =============================================
  // MOBILE NAVIGATION TOGGLE
  // =============================================
  var mobileToggle = document.getElementById('mobileToggle');
  var mainNav = document.getElementById('mainNav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', function (e) {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =============================================
  // TABS (Security, Integration, Platform)
  // =============================================
  document.querySelectorAll('.tabs').forEach(function (tabContainer) {
    var buttons = tabContainer.querySelectorAll('.tab-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-tab');
        buttons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        var parent = tabContainer.parentElement;
        parent.querySelectorAll('.tab-panel').forEach(function (panel) {
          panel.classList.remove('active');
        });
        var target = document.getElementById(targetId);
        if (target) {
          target.classList.add('active');
        }
      });
    });
  });

  // =============================================
  // INDUSTRY TABS (Home page)
  // =============================================
  var industryTabs = document.querySelectorAll('.industry-tab');
  var useCaseCards = document.querySelectorAll('.use-case-card');

  if (industryTabs.length > 0 && useCaseCards.length > 0) {
    industryTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        industryTabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        var industry = tab.getAttribute('data-industry');
        useCaseCards.forEach(function (card) {
          var industries = card.getAttribute('data-industries');
          if (!industries || industries.indexOf(industry) !== -1) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // =============================================
  // ACCORDION
  // =============================================
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var item = header.parentElement;
      var isOpen = item.classList.contains('open');
      var accordion = item.parentElement;

      accordion.querySelectorAll('.accordion-item').forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // =============================================
  // TESTIMONIAL CAROUSEL
  // =============================================
  var carouselTrack = document.getElementById('carouselTrack');
  var carouselDots = document.getElementById('carouselDots');
  if (carouselTrack && carouselDots) {
    var currentSlide = 0;
    var dots = carouselDots.querySelectorAll('.carousel-dot');
    var totalSlides = dots.length;

    function goToSlide(index) {
      currentSlide = index;
      carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goToSlide(parseInt(dot.getAttribute('data-slide'), 10));
      });
    });

    setInterval(function () {
      goToSlide((currentSlide + 1) % totalSlides);
    }, 6000);
  }

  // =============================================
  // CIRCULAR STAT INDICATORS (Intersection Observer)
  // =============================================
  var statCircles = document.querySelectorAll('.stat-circle');
  if (statCircles.length > 0) {
    var circumference = 2 * Math.PI * 65;
    var statsAnimated = false;

    function animateStats() {
      if (statsAnimated) return;
      statsAnimated = true;
      statCircles.forEach(function (circle) {
        var value = parseInt(circle.getAttribute('data-value'), 10);
        var max = parseInt(circle.getAttribute('data-max'), 10) || 100;
        var progress = circle.querySelector('.progress');
        if (progress) {
          var offset = circumference - (value / max) * circumference;
          progress.style.strokeDasharray = circumference;
          progress.style.strokeDashoffset = offset;
        }
      });
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateStats();
            observer.disconnect();
          }
        });
      }, { threshold: 0.3 });
      statCircles.forEach(function (el) { observer.observe(el); });
    } else {
      animateStats();
    }
  }

  // =============================================
  // PROGRESS BARS (Intersection Observer)
  // =============================================
  var progressFills = document.querySelectorAll('.progress-fill');
  if (progressFills.length > 0) {
    function animateProgress() {
      progressFills.forEach(function (fill) {
        var width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
      });
    }
    if ('IntersectionObserver' in window) {
      var progressObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateProgress();
            progressObserver.disconnect();
          }
        });
      }, { threshold: 0.3 });
      progressFills.forEach(function (el) { progressObserver.observe(el); });
    } else {
      animateProgress();
    }
  }

  // =============================================
  // DEMO FORM VALIDATION
  // =============================================
  var demoForm = document.getElementById('demoForm');
  var formSuccess = document.getElementById('formSuccess');
  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      var requiredFields = demoForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        var group = field.closest('.form-group');
        group.classList.remove('error');

        var value = field.value.trim();
        if (!value) {
          group.classList.add('error');
          isValid = false;
        }

        if (field.type === 'email' && value) {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            group.classList.add('error');
            isValid = false;
          }
        }
      });

      if (isValid) {
        var submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        setTimeout(function () {
          demoForm.style.display = 'none';
          formSuccess.classList.add('show');
        }, 1200);
      } else {
        var firstError = demoForm.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea');
        if (firstError) {
          firstError.focus();
        }
      }
    });

    demoForm.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('blur', function () {
        var group = field.closest('.form-group');
        if (group.classList.contains('error')) {
          var value = field.value.trim();
          if (value) {
            if (field.type === 'email') {
              var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (emailRegex.test(value)) {
                group.classList.remove('error');
              }
            } else {
              group.classList.remove('error');
            }
          }
        }
      });
    });
  }

  // =============================================
  // COOKIE BANNER
  // =============================================
  var cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    var stored = localStorage.getItem('wellstream_cookies');
    if (stored) {
      cookieBanner.classList.add('hidden');
    }
    var acceptBtn = document.getElementById('cookieAccept');
    var declineBtn = document.getElementById('cookieDecline');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem('wellstream_cookies', 'accepted');
        cookieBanner.classList.add('hidden');
      });
    }
    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        localStorage.setItem('wellstream_cookies', 'declined');
        cookieBanner.classList.add('hidden');
      });
    }
  }

  // =============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // HEADER SCROLL EFFECT
  // =============================================
  var header = document.querySelector('.header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scroll = window.pageYOffset;
      if (scroll > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = scroll;
    }, { passive: true });
  }

});
