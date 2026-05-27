/* RedRoom Fitness — Shared JavaScript */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Mobile Menu ── */
  var menuBtn = document.getElementById('mobile-menu-btn');
  var mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      menuBtn.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
    });
  }

  /* ── Newsletter Validation ── */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('.newsletter-input');
      var msg   = form.querySelector('.newsletter-msg');
      var email = input.value.trim();
      if (!email) {
        msg.textContent = 'Please enter your email address.';
        msg.className = 'newsletter-msg error';
        input.classList.add('error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'newsletter-msg error';
        input.classList.add('error');
        return;
      }
      msg.textContent = 'Welcome to the Red Room! Check your inbox for confirmation.';
      msg.className = 'newsletter-msg success';
      input.classList.remove('error');
      input.value = '';
    });
  });

  /* ── FAQ Accordion (single-open) ── */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.querySelector('.faq-question').addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      faqItems.forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── Floor / Treadmill Toggle ── */
  document.querySelectorAll('.toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.dataset.target;
      document.querySelectorAll('.toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.toggle-content').forEach(function (c) { c.style.display = 'none'; });
      var el = document.getElementById(target);
      if (el) el.style.display = 'block';
    });
  });

  /* ── Instructor Location Filter ── */
  var locFilter = document.getElementById('location-filter');
  if (locFilter) {
    locFilter.addEventListener('change', function () {
      var sel = this.value;
      document.querySelectorAll('.instructor-card').forEach(function (card) {
        card.style.display = (sel === 'all' || card.dataset.location === sel) ? '' : 'none';
      });
    });
  }

  /* ── Carousel ── */
  initCarousel();

  /* ── Scroll Reveal ── */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      observer.observe(el);
    });
  }
});

/* ── Carousel Logic ── */
function initCarousel() {
  var track = document.querySelector('.carousel-track');
  if (!track) return;
  var slides   = track.querySelectorAll('.carousel-slide');
  var prevBtn  = document.querySelector('.carousel-arrow.prev');
  var nextBtn  = document.querySelector('.carousel-arrow.next');
  var dotsBox  = document.querySelector('.carousel-dots');
  var current  = 0;
  var total    = slides.length;

  if (dotsBox) {
    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      (function (idx) {
        dot.addEventListener('click', function () { goTo(idx); });
      })(i);
      dotsBox.appendChild(dot);
    }
  }

  function goTo(n) {
    current = n;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    if (dotsBox) {
      dotsBox.querySelectorAll('.carousel-dot').forEach(function (d, j) {
        d.classList.toggle('active', j === current);
      });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', function () {
    goTo(current === 0 ? total - 1 : current - 1);
  });
  if (nextBtn) nextBtn.addEventListener('click', function () {
    goTo(current === total - 1 ? 0 : current + 1);
  });

  /* auto-play */
  var auto = setInterval(function () {
    goTo(current === total - 1 ? 0 : current + 1);
  }, 5000);

  var container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('mouseenter', function () { clearInterval(auto); });
    container.addEventListener('mouseleave', function () {
      auto = setInterval(function () { goTo(current === total - 1 ? 0 : current + 1); }, 5000);
    });

    /* swipe */
    var sx = 0;
    container.addEventListener('touchstart', function (e) {
      sx = e.changedTouches[0].screenX;
    }, { passive: true });
    container.addEventListener('touchend', function (e) {
      var diff = sx - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0
          ? (current === total - 1 ? 0 : current + 1)
          : (current === 0 ? total - 1 : current - 1));
      }
    }, { passive: true });
  }
}
