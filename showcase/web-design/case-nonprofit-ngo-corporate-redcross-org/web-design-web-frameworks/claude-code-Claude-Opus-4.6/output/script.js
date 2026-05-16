document.addEventListener('DOMContentLoaded', function () {
  // ===== Mobile Navigation =====
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleMobileNav() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    navOverlay.classList.toggle('visible');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileNav);
  navOverlay.addEventListener('click', toggleMobileNav);

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileNav.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  });

  // ===== Donate Modal =====
  var modalOverlay = document.querySelector('.modal-overlay');
  var donateButtons = document.querySelectorAll('[data-donate]');
  var modalClose = document.querySelector('.modal-close');
  var amountOptions = document.querySelectorAll('.amount-option');
  var customInput = document.querySelector('.custom-amount-input input');

  function openModal() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  donateButtons.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
  });

  amountOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      amountOptions.forEach(function (o) { o.classList.remove('selected'); });
      option.classList.add('selected');
      customInput.value = '';
    });
  });

  customInput.addEventListener('focus', function () {
    amountOptions.forEach(function (o) { o.classList.remove('selected'); });
  });

  // ===== Program Accordion =====
  var accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      var item = header.parentElement;
      var body = item.querySelector('.accordion-body');
      var inner = body.querySelector('.accordion-body-inner');
      var isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(function (otherItem) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-body').style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion item by default
  var firstAccordion = document.querySelector('.accordion-item');
  if (firstAccordion) {
    firstAccordion.classList.add('active');
    var firstBody = firstAccordion.querySelector('.accordion-body');
    var firstInner = firstBody.querySelector('.accordion-body-inner');
    firstBody.style.maxHeight = firstInner.scrollHeight + 'px';
  }

  // ===== News Carousel =====
  var carousel = document.querySelector('.news-carousel');
  var cards = document.querySelectorAll('.news-card');
  var prevBtn = document.querySelector('.carousel-btn-prev');
  var nextBtn = document.querySelector('.carousel-btn-next');
  var dots = document.querySelectorAll('.carousel-dot');
  var currentSlide = 0;

  function getVisibleCards() {
    var width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
  }

  function getMaxSlide() {
    return Math.max(0, cards.length - getVisibleCards());
  }

  function updateCarousel() {
    var visibleCards = getVisibleCards();
    var gap = 24;
    var containerWidth = carousel.parentElement.offsetWidth;
    var cardWidth = (containerWidth - gap * (visibleCards - 1)) / visibleCards;

    cards.forEach(function (card) {
      card.style.minWidth = cardWidth + 'px';
    });

    var offset = currentSlide * (cardWidth + gap);
    carousel.style.transform = 'translateX(-' + offset + 'px)';

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= getMaxSlide();

    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  prevBtn.addEventListener('click', function () {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', function () {
    if (currentSlide < getMaxSlide()) {
      currentSlide++;
      updateCarousel();
    }
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      currentSlide = Math.min(i, getMaxSlide());
      updateCarousel();
    });
  });

  window.addEventListener('resize', function () {
    if (currentSlide > getMaxSlide()) currentSlide = getMaxSlide();
    updateCarousel();
  });

  updateCarousel();

  // ===== Animated Counters =====
  var statNumbers = document.querySelectorAll('.stat-number');
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    statNumbers.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = target % 1 !== 0 ? 1 : 0;
      var duration = 2000;
      var startTime = null;

      function easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var easedProgress = easeOut(progress);
        var current = easedProgress * target;

        if (decimals > 0) {
          el.textContent = prefix + current.toFixed(decimals) + suffix;
        } else {
          el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          if (decimals > 0) {
            el.textContent = prefix + target.toFixed(decimals) + suffix;
          } else {
            el.textContent = prefix + target.toLocaleString() + suffix;
          }
        }
      }

      requestAnimationFrame(step);
    });
  }

  // ===== Scroll Animations (IntersectionObserver) =====
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    observer.observe(el);
  });

  var statsSection = document.querySelector('.impact');
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Header shrink on scroll =====
  var header = document.querySelector('.header');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (scrollY > 50) {
      header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = 'var(--shadow-sm)';
    }
    lastScroll = scrollY;
  });
});
