/* ===== LearnForge Shared JavaScript ===== */
(function () {
  'use strict';

  /* ---- Nav scroll shadow ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ---- Mobile menu toggle ---- */
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Homepage: Hero Tab Switch ---- */
  const heroTabs = document.querySelectorAll('.hero-tab');
  const previewCreator = document.getElementById('preview-creator');
  const previewStudent = document.getElementById('preview-student');
  if (heroTabs.length && previewCreator && previewStudent) {
    heroTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        heroTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        var view = this.getAttribute('data-view');
        if (view === 'student') {
          previewCreator.style.display = 'none';
          previewStudent.style.display = 'block';
        } else {
          previewCreator.style.display = 'block';
          previewStudent.style.display = 'none';
        }
      });
    });
  }

  /* ---- Why Choose Us Tabs ---- */
  var whyTabBtns = document.querySelectorAll('.why-tab-btn');
  var whyTabContents = document.querySelectorAll('.why-tab-content');
  if (whyTabBtns.length && whyTabContents.length) {
    whyTabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        whyTabBtns.forEach(function (b) { b.classList.remove('active'); });
        whyTabContents.forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active');
        var target = document.querySelector(this.getAttribute('data-target'));
        if (target) target.classList.add('active');
      });
    });
  }

  /* ---- FAQ Accordion ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');
        // Close all
        faqItems.forEach(function (faq) { faq.classList.remove('active'); });
        // Open clicked (unless it was already open)
        if (!isActive) item.classList.add('active');
      });
    });
  }

  /* ---- Product Demo Accordion (Online Courses) ---- */
  var demoAccordion = document.querySelector('.demo-accordion');
  if (demoAccordion) {
    var demoToggle = demoAccordion.querySelector('.demo-trigger');
    if (demoToggle) {
      demoToggle.addEventListener('click', function () {
        demoAccordion.classList.toggle('active');
      });
    }
  }

  /* ---- Testimonial Carousel ---- */
  function initCarousel(carouselEl) {
    if (!carouselEl) return;
    var track = carouselEl.querySelector('.carousel-track');
    var slides = carouselEl.querySelectorAll('.carousel-slide');
    var dots = carouselEl.querySelectorAll('.carousel-dot');
    var prevBtn = carouselEl.querySelector('.carousel-btn-prev');
    var nextBtn = carouselEl.querySelector('.carousel-btn-next');
    var current = 0;
    var total = slides.length;
    if (total < 2) return;

    function goTo(index) {
      current = ((index % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    // Auto-advance every 5s
    var interval = setInterval(function () { goTo(current + 1); }, 5000);
    carouselEl.addEventListener('mouseenter', function () { clearInterval(interval); });
    carouselEl.addEventListener('mouseleave', function () {
      interval = setInterval(function () { goTo(current + 1); }, 5000);
    });
  }

  var carousels = document.querySelectorAll('.carousel');
  carousels.forEach(initCarousel);

  /* ---- Scroll-triggered animations ---- */
  var animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedElements.forEach(function (el) { observer.observe(el); });
  } else if (animatedElements.length) {
    // Fallback: show all immediately
    animatedElements.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Active nav link based on current page ---- */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && (href === 'index.html' || href === './'))) {
      link.classList.add('active');
    }
  });
})();
