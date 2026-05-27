// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

if (hamburger) {
  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
}
if (mobileNavClose) {
  mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('open'));
}
if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener('click', () => mobileNav.classList.remove('open'));
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ===== TESTIMONIAL CAROUSEL =====
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const dotsContainer = document.getElementById('carouselDots');

if (track && prevBtn && nextBtn) {
  let currentSlide = 0;
  const cards = track.querySelectorAll('.testimonial-card');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
  const totalSlides = cards.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    cards.forEach((c, i) => c.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
}

// ===== STATS COUNT-UP =====
function animateStats() {
  const statValues = document.querySelectorAll('.stat-value[data-target]');
  statValues.forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      let display = current.toLocaleString();
      el.textContent = prefix + display + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  });
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  let statsAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateStats();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ===== PRICING TOGGLE =====
const billingToggle = document.getElementById('billingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');
const starterPrice = document.getElementById('starterPrice');
const premiumPrice = document.getElementById('premiumPrice');
const starterPeriod = document.getElementById('starterPeriod');
const premiumPeriod = document.getElementById('premiumPeriod');

if (billingToggle) {
  let isAnnual = false;

  billingToggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    billingToggle.classList.toggle('active', isAnnual);

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

    if (isAnnual) {
      if (starterPrice) starterPrice.textContent = '$23.99';
      if (premiumPrice) premiumPrice.textContent = '$55.99';
      if (starterPeriod) starterPeriod.textContent = '/month, billed annually';
      if (premiumPeriod) premiumPeriod.textContent = '/month, billed annually';
    } else {
      if (starterPrice) starterPrice.textContent = '$29.99';
      if (premiumPrice) premiumPrice.textContent = '$69.99';
      if (starterPeriod) starterPeriod.textContent = '/month';
      if (premiumPeriod) premiumPeriod.textContent = '/month';
    }
  });
}

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

    if (!wasOpen) {
      item.classList.add('open');
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.closest('.form-group').classList.add('has-error');
      }

      if (field.type === 'email' && field.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value.trim())) {
          valid = false;
          field.closest('.form-group').classList.add('has-error');
        }
      }
    });

    if (valid) {
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
    }
  });
}
