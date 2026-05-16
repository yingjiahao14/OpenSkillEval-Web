document.addEventListener('DOMContentLoaded', function () {

  // ─── Mobile Nav Toggle ───
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ─── Carousel ───
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn) {
    const slides = track.querySelectorAll('.carousel__slide');
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let maxIndex = Math.max(0, slides.length - slidesPerView);

    function getSlidesPerView() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 992) return 2;
      return 3;
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const count = maxIndex + 1;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel__dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      const gap = 20;
      const slideWidth = slides[0].offsetWidth + gap;
      track.style.transform = 'translateX(' + -(currentIndex * slideWidth) + 'px)';
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel__dot').forEach(function (d, i) {
          d.className = 'carousel__dot' + (i === currentIndex ? ' active' : '');
        });
      }
    }

    prevBtn.addEventListener('click', function () {
      currentIndex = Math.max(0, currentIndex - 1);
      updateCarousel();
    });

    nextBtn.addEventListener('click', function () {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateCarousel();
    });

    let touchStartX = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          currentIndex = Math.min(maxIndex, currentIndex + 1);
        } else {
          currentIndex = Math.max(0, currentIndex - 1);
        }
        updateCarousel();
      }
    }, { passive: true });

    window.addEventListener('resize', function () {
      slidesPerView = getSlidesPerView();
      maxIndex = Math.max(0, slides.length - slidesPerView);
      currentIndex = Math.min(currentIndex, maxIndex);
      buildDots();
      updateCarousel();
    });

    buildDots();
  }

  // ─── Floor/Treadmill Toggle ───
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  if (toggleBtns.length) {
    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-target');

        toggleBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        document.querySelectorAll('.toggle-panel').forEach(function (panel) {
          panel.classList.remove('active');
        });
        var targetPanel = document.getElementById(target);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  }

  // ─── Instructor Filter ───
  const filterBar = document.getElementById('filterBar');
  const instructorGrid = document.getElementById('instructorGrid');
  if (filterBar && instructorGrid) {
    const filterBtns = filterBar.querySelectorAll('.filter-btn');
    const cards = instructorGrid.querySelectorAll('.instructor-card');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const location = btn.getAttribute('data-location');

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        cards.forEach(function (card) {
          if (location === 'all' || card.getAttribute('data-location') === location) {
            card.style.display = '';
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = 'fadeIn 0.4s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ─── FAQ Accordion (single-open) ───
  const faqList = document.getElementById('faqList');
  if (faqList) {
    const faqItems = faqList.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        faqItems.forEach(function (other) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ─── Newsletter Validation ───
  var newsletterForms = document.querySelectorAll('#newsletterForm');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('#newsletterEmail');
      var msg = form.parentElement.querySelector('#newsletterMsg') || form.nextElementSibling;
      var email = input.value.trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      input.classList.remove('error', 'success');
      if (msg) { msg.className = 'newsletter__msg'; msg.textContent = ''; }

      if (!email) {
        input.classList.add('error');
        if (msg) { msg.className = 'newsletter__msg newsletter__msg--error'; msg.textContent = 'Please enter your email address.'; }
        return;
      }

      if (!emailRegex.test(email)) {
        input.classList.add('error');
        if (msg) { msg.className = 'newsletter__msg newsletter__msg--error'; msg.textContent = 'Please enter a valid email address.'; }
        return;
      }

      input.classList.add('success');
      if (msg) { msg.className = 'newsletter__msg newsletter__msg--success'; msg.textContent = 'Thanks for subscribing! Check your inbox for confirmation.'; }
      input.value = '';
      setTimeout(function () { input.classList.remove('success'); }, 3000);
    });
  });

});
