document.addEventListener('DOMContentLoaded', () => {

  // ─── Nav scroll effect ───
  const navHeader = document.getElementById('navHeader');
  window.addEventListener('scroll', () => {
    navHeader.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ─── Mobile nav toggle ───
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ─── Language selector close on outside click ───
  document.addEventListener('click', (e) => {
    const sel = document.getElementById('langSelector');
    if (!sel.contains(e.target)) sel.classList.remove('open');
  });
  document.querySelectorAll('.lang-dropdown a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lang-dropdown a').forEach(el => el.classList.remove('active'));
      a.classList.add('active');
      document.querySelector('.lang-toggle span').textContent = a.textContent;
      document.getElementById('langSelector').classList.remove('open');
    });
  });

  // ─── Hero Carousel ───
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const progressBar = document.getElementById('heroProgressBar');
  let currentHero = 0;
  const heroInterval = 6000;
  let heroTimer;
  let progressStart;
  let progressRaf;

  function goToHeroSlide(index) {
    heroSlides[currentHero].classList.remove('active');
    heroDots[currentHero].classList.remove('active');
    currentHero = index;
    heroSlides[currentHero].classList.add('active');
    heroDots[currentHero].classList.add('active');
    startProgress();
  }

  function startProgress() {
    cancelAnimationFrame(progressRaf);
    progressBar.style.width = '0%';
    progressStart = performance.now();
    function tick(now) {
      const elapsed = now - progressStart;
      const pct = Math.min((elapsed / heroInterval) * 100, 100);
      progressBar.style.width = pct + '%';
      if (pct < 100) progressRaf = requestAnimationFrame(tick);
    }
    progressRaf = requestAnimationFrame(tick);
  }

  function nextHeroSlide() {
    goToHeroSlide((currentHero + 1) % heroSlides.length);
  }

  function resetHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(nextHeroSlide, heroInterval);
  }

  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToHeroSlide(parseInt(dot.dataset.slide));
      resetHeroTimer();
    });
  });

  document.querySelector('.hero-prev').addEventListener('click', () => {
    goToHeroSlide((currentHero - 1 + heroSlides.length) % heroSlides.length);
    resetHeroTimer();
  });
  document.querySelector('.hero-next').addEventListener('click', () => {
    goToHeroSlide((currentHero + 1) % heroSlides.length);
    resetHeroTimer();
  });

  // Touch support for hero
  let heroTouchStartX = 0;
  const heroEl = document.getElementById('heroCarousel');
  heroEl.addEventListener('touchstart', (e) => {
    heroTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  heroEl.addEventListener('touchend', (e) => {
    const diff = heroTouchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToHeroSlide((currentHero + 1) % heroSlides.length);
      else goToHeroSlide((currentHero - 1 + heroSlides.length) % heroSlides.length);
      resetHeroTimer();
    }
  }, { passive: true });

  startProgress();
  resetHeroTimer();

  // ─── Team Region Toggle ───
  const regionTabs = document.querySelectorAll('.region-tab');
  const teamCards = document.querySelectorAll('.team-card');

  function filterTeam(region) {
    teamCards.forEach(card => {
      if (card.dataset.region === region) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .4s ease, transform .4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        });
      } else {
        card.style.display = 'none';
      }
    });
    document.getElementById('teamCarousel').scrollLeft = 0;
  }

  regionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      regionTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterTeam(tab.dataset.region);
    });
  });

  // ─── Horizontal scroll helpers ───
  function setupScrollNav(carousel, prevBtn, nextBtn) {
    const scrollAmount = () => carousel.querySelector(':scope > *')?.offsetWidth + 28 || 300;
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  }

  setupScrollNav(
    document.getElementById('teamCarousel'),
    document.querySelector('.team-prev'),
    document.querySelector('.team-next')
  );

  setupScrollNav(
    document.getElementById('workCarousel'),
    document.querySelector('.work-prev'),
    document.querySelector('.work-next')
  );

  // ─── Scroll-triggered fade-in ───
  const fadeEls = document.querySelectorAll('.section-header, .principle-card, .how-content, .how-visual, .footer-cta-block, .cta-banner .container');
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));

});
