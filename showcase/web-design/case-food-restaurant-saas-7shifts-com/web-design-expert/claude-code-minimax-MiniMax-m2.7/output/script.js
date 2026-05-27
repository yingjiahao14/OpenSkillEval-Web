// ShiftWise Shared JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileNav();
  initHeaderScroll();
  initTestimonialCarousel();
  initPricingToggle();
  initFAQAccordion();
  initContactForm();
  initAnimatedStats();
  initSmoothScroll();
});

// === MOBILE NAVIGATION ===
function initMobileNav() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!mobileMenuBtn || !mobileNav) return;

  mobileMenuBtn.addEventListener('click', function() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav when clicking a link
  const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// === HEADER SCROLL EFFECT ===
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  });
}

// === TESTIMONIAL CAROUSEL ===
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonials-track');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.dot');

  if (!track) return;

  const testimonials = track.querySelectorAll('.testimonial');
  let currentIndex = 0;
  const totalSlides = testimonials.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-advance every 5 seconds
  setInterval(() => goToSlide(currentIndex + 1), 5000);
}

// === PRICING TOGGLE ===
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  const monthlyLabel = document.querySelector('.toggle-monthly');
  const annualLabel = document.querySelector('.toggle-annual');
  const saveBadge = document.querySelector('.save-badge');

  if (!toggle) return;

  // Pricing data
  const prices = {
    starter: { monthly: 29.99, annual: 23.99 },
    premium: { monthly: 69.99, annual: 55.99 }
  };

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');

    const isAnnual = toggle.classList.contains('active');

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);
    if (saveBadge) saveBadge.style.display = isAnnual ? 'inline-block' : 'none';

    // Update prices on the page
    updatePrices(isAnnual);
  });

  function updatePrices(isAnnual) {
    // Update Starter price
    const starterPrice = document.querySelector('.price-starter');
    if (starterPrice) {
      const price = isAnnual ? prices.starter.annual : prices.starter.monthly;
      starterPrice.textContent = `$${price.toFixed(2)}`;
    }

    // Update Premium price
    const premiumPrice = document.querySelector('.price-premium');
    if (premiumPrice) {
      const price = isAnnual ? prices.premium.annual : prices.premium.monthly;
      premiumPrice.textContent = `$${price.toFixed(2)}`;
    }

    // Update period text
    const periodElements = document.querySelectorAll('.pricing-period');
    periodElements.forEach(el => {
      el.textContent = isAnnual ? '/mo (billed annually)' : '/mo';
    });
  }
}

// === FAQ ACCORDION ===
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// === CONTACT FORM ===
function initContactForm() {
  const form = document.querySelector('.contact-form form');
  const successMessage = document.querySelector('.form-success');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous errors
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('error'));

    // Validate required fields
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const value = field.value.trim();
      const group = field.closest('.form-group');

      if (!value) {
        group.classList.add('error');
        isValid = false;
      } else if (field.type === 'email' && !isValidEmail(value)) {
        group.classList.add('error');
        isValid = false;
      }
    });

    if (isValid) {
      // Show success message
      if (successMessage) {
        successMessage.classList.add('show');
        form.reset();
      }
    }
  });

  // Real-time validation
  const formInputs = form.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      const group = this.closest('.form-group');
      if (this.hasAttribute('required') && !this.value.trim()) {
        group.classList.add('error');
      } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
        group.classList.add('error');
      } else {
        group.classList.remove('error');
      }
    });

    input.addEventListener('input', function() {
      const group = this.closest('.form-group');
      group.classList.remove('error');
    });
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// === ANIMATED STATS ===
function initAnimatedStats() {
  const stats = document.querySelectorAll('.stat-value[data-value]');

  if (!stats.length) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  stats.forEach(stat => observer.observe(stat));
}

function animateValue(element) {
  const target = parseFloat(element.dataset.value);
  const suffix = element.dataset.suffix || '';
  const prefix = element.dataset.prefix || '';
  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;

  let current = 0;
  const increment = target / steps;
  const isDecimal = target % 1 !== 0;

  const timer = setInterval(function() {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
    element.textContent = prefix + displayValue + suffix;
  }, stepDuration);
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
