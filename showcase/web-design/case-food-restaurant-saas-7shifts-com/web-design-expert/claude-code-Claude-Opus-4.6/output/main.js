document.addEventListener('DOMContentLoaded', function () {

  // ── Mobile Navigation ──
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var overlay = document.getElementById('overlay');

  if (hamburger && mobileNav && overlay) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    overlay.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });

    var mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Header scroll effect ──
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 2px 16px rgba(0,0,0,.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // ── Animated Stats Counter ──
  var statNumbers = document.querySelectorAll('.stat__number[data-target]');
  if (statNumbers.length > 0) {
    var statsObserved = false;

    function formatNumber(n) {
      if (n >= 1000) {
        return n.toLocaleString('en-US');
      }
      return n.toString();
    }

    function animateCounters() {
      if (statsObserved) return;
      statsObserved = true;

      statNumbers.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var isRaw = el.hasAttribute('data-raw');
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(eased * target);

          if (isRaw) {
            el.textContent = current + suffix;
          } else {
            el.textContent = formatNumber(current) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            if (isRaw) {
              el.textContent = target + suffix;
            } else {
              el.textContent = formatNumber(target) + suffix;
            }
          }
        }

        requestAnimationFrame(step);
      });
    }

    var statsSection = document.getElementById('statsSection');
    if (statsSection && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(statsSection);
    } else {
      animateCounters();
    }
  }

  // ── Testimonial Carousel ──
  var track = document.getElementById('testimonialTrack');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var dotsContainer = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    var slides = track.querySelectorAll('.testimonial-slide');
    var currentSlide = 0;
    var totalSlides = slides.length;
    var dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); });
    nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goToSlide(parseInt(dot.getAttribute('data-index'), 10));
      });
    });

    setInterval(function () { goToSlide(currentSlide + 1); }, 5000);
  }

  // ── Pricing Toggle ──
  var billingToggle = document.getElementById('billingToggle');
  var monthlyLabel = document.getElementById('monthlyLabel');
  var annualLabel = document.getElementById('annualLabel');

  if (billingToggle) {
    var isAnnual = false;

    billingToggle.addEventListener('click', function () {
      isAnnual = !isAnnual;
      billingToggle.classList.toggle('active', isAnnual);
      billingToggle.setAttribute('aria-checked', isAnnual.toString());
      if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
      if (annualLabel) annualLabel.classList.toggle('active', isAnnual);
      updatePrices();
    });

    billingToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        billingToggle.click();
      }
    });

    function updatePrices() {
      var priceEls = document.querySelectorAll('.pricing-card__price[data-monthly]');
      priceEls.forEach(function (el) {
        var monthly = parseFloat(el.getAttribute('data-monthly'));
        var annual = parseFloat(el.getAttribute('data-annual'));
        var price = isAnnual ? annual : monthly;
        if (price === 0) {
          el.innerHTML = '$0<span>/mo</span>';
        } else {
          el.innerHTML = '$' + price.toFixed(2) + '<span>/mo</span>';
        }
      });
    }
  }

  // ── FAQ Accordion ──
  var faqList = document.getElementById('faqList');
  if (faqList) {
    var faqItems = faqList.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        faqItems.forEach(function (other) {
          other.classList.remove('open');
        });

        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // ── Contact Form Validation ──
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      var requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        } else if (field.type === 'email') {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            field.classList.add('error');
            isValid = false;
          }
        }
      });

      if (isValid) {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        window.scrollTo({ top: formSuccess.offsetTop - 120, behavior: 'smooth' });
      }
    });

    var fields = contactForm.querySelectorAll('input, textarea');
    fields.forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('error');
      });
    });
  }

});
