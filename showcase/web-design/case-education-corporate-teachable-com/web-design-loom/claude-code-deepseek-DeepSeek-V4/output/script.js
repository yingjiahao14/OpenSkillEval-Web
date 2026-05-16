/* ===== LearnForge Interactive Components ===== */
(function() {
  'use strict';

  /* ---- Mobile Nav Toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* ---- Hero Tab Switch (homepage) ---- */
  const heroTabs = document.querySelectorAll('.hero-tab');
  const heroPreview = document.querySelector('.hero-preview-inner');
  const previewTitle = heroPreview ? heroPreview.querySelector('.preview-header span:last-child') : null;
  const previewGrid = heroPreview ? heroPreview.querySelector('.preview-grid') : null;

  if (heroTabs.length && heroPreview) {
    const creatorCards = [
      { title: 'Total Students', stat: '1,247' },
      { title: 'Revenue (MTD)', stat: '$8,432' },
      { title: 'Courses Live', stat: '5' }
    ];
    const studentCards = [
      { title: 'My Courses', stat: '3 Active' },
      { title: 'Progress', stat: '67%' }
    ];

    function renderPreview(isCreator) {
      const cards = isCreator ? creatorCards : studentCards;
      previewGrid.innerHTML = cards.map(function(c) {
        return '<div class="preview-card"><div class="pc-title">' + c.title + '</div><div class="pc-stat">' + c.stat + '</div></div>';
      }).join('');
      if (previewTitle) {
        previewTitle.textContent = isCreator ? 'Creator Dashboard' : 'Student Dashboard';
      }
      if (isCreator) {
        previewGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        heroPreview.classList.remove('student-view');
      } else {
        previewGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        heroPreview.classList.add('student-view');
      }
    }

    heroTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        heroTabs.forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var isCreator = tab.dataset.view === 'creator';
        renderPreview(isCreator);
      });
    });
  }

  /* ---- Why Choose Us Tabs (homepage) ---- */
  var tabBtns = document.querySelectorAll('.why-tabs .tab-btn');
  var tabPanels = document.querySelectorAll('.why-tabs .tab-panel');

  if (tabBtns.length && tabPanels.length) {
    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        tabPanels.forEach(function(p) { p.classList.remove('active'); });
        var panel = document.querySelector('.tab-panel[data-panel="' + btn.dataset.tab + '"]');
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ---- FAQ Accordion (found on multiple pages) ---- */
  var faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function(q) {
    q.addEventListener('click', function() {
      var item = q.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      // Close all siblings
      var parent = item.parentElement;
      var siblings = parent.querySelectorAll('.faq-item');
      siblings.forEach(function(s) { s.classList.remove('open'); });
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Product Demo Accordion (online-courses page) ---- */
  var demoAccordion = document.querySelector('.demo-accordion');
  if (demoAccordion) {
    var demoHeader = demoAccordion.querySelector('.demo-header');
    if (demoHeader) {
      demoHeader.addEventListener('click', function() {
        demoAccordion.classList.toggle('open');
      });
    }
  }

  /* ---- Testimonial Carousel (found on multiple pages) ---- */
  var carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(function(carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var prevBtn = carousel.querySelector('[data-carousel-prev]');
    var nextBtn = carousel.querySelector('[data-carousel-next]');
    var dotsContainer = carousel.querySelector('.carousel-dots');
    var current = 0;
    var total = slides.length;

    if (!track || total < 2) return;

    // Create dots
    if (dotsContainer) {
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.dataset.index = i;
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', (function(idx) {
          return function() { goTo(idx); };
        })(i));
        dotsContainer.appendChild(dot);
      }
    }

    var dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

    function goTo(index) {
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        goTo((current - 1 + total) % total);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        goTo((current + 1) % total);
      });
    }

    // Auto-advance every 6 seconds
    setInterval(function() {
      goTo((current + 1) % total);
    }, 6000);
  });

  /* ---- Scroll Animations ---- */
  var animatedElements = document.querySelectorAll('.animate');

  if (animatedElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedElements.forEach(function(el) { observer.observe(el); });
  } else if (animatedElements.length) {
    // Fallback: show all immediately
    animatedElements.forEach(function(el) { el.classList.add('visible'); });
  }
})();
