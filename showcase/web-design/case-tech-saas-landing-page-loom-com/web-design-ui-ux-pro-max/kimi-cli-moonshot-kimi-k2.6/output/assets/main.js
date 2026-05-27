/**
 * ClipCast - Main JavaScript
 */

(function() {
  'use strict';

  // ============================================
  // Navbar scroll effect
  // ============================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // Mobile menu toggle
  // ============================================
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // ============================================
  // Pricing Billing Toggle
  // ============================================
  const pricingToggleMonthly = document.getElementById('pricing-monthly');
  const pricingToggleAnnual = document.getElementById('pricing-annual');
  const pricingCards = document.querySelectorAll('.pricing-card');

  function updatePricing(isAnnual) {
    const prices = {
      starter: { monthly: '$0', annual: '$0' },
      business: { monthly: '$18', annual: '$15' },
      businessAi: { monthly: '$24', annual: '$20' },
      enterprise: { monthly: 'Contact Sales', annual: 'Contact Sales' }
    };

    pricingCards.forEach(card => {
      const plan = card.dataset.plan;
      if (!plan) return;
      const priceEl = card.querySelector('.pricing-price');
      const periodEl = card.querySelector('.pricing-period');
      if (!priceEl) return;

      const data = prices[plan];
      if (!data) return;

      if (plan === 'enterprise') {
        priceEl.textContent = data.monthly;
        if (periodEl) periodEl.textContent = 'Custom pricing for your team';
      } else {
        const price = isAnnual ? data.annual : data.monthly;
        priceEl.innerHTML = price + '<span>/user</span>';
        if (periodEl) {
          periodEl.textContent = isAnnual ? 'per user / month, billed annually' : 'per user / month, billed monthly';
        }
      }
    });
  }

  if (pricingToggleMonthly && pricingToggleAnnual) {
    pricingToggleMonthly.addEventListener('click', function() {
      pricingToggleMonthly.classList.add('active');
      pricingToggleAnnual.classList.remove('active');
      updatePricing(false);
    });
    pricingToggleAnnual.addEventListener('click', function() {
      pricingToggleAnnual.classList.add('active');
      pricingToggleMonthly.classList.remove('active');
      updatePricing(true);
    });
  }

  // ============================================
  // Team Size Slider
  // ============================================
  const teamSlider = document.getElementById('team-size-slider');
  const teamSizeValue = document.getElementById('team-size-value');
  const teamSizeText = document.getElementById('team-size-text');

  if (teamSlider && teamSizeValue) {
    teamSlider.addEventListener('input', function() {
      const val = this.value;
      teamSizeValue.textContent = val;
      if (teamSizeText) {
        if (val <= 1) {
          teamSizeText.textContent = 'Starter plan is perfect for you';
        } else if (val <= 10) {
          teamSizeText.textContent = 'Business plan recommended';
        } else if (val <= 50) {
          teamSizeText.textContent = 'Business + AI scales with your team';
        } else {
          teamSizeText.textContent = 'Contact us for Enterprise pricing';
        }
      }
    });
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');
        // Close all others (optional - accordion behavior)
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open', !isOpen);
      });
    }
  });

  // ============================================
  // Cookie Consent
  // ============================================
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieReject = document.getElementById('cookie-reject');
  const cookieManage = document.getElementById('cookie-manage');
  const cookieModal = document.getElementById('cookie-modal');
  const cookieModalClose = document.getElementById('cookie-modal-close');
  const cookieModalSave = document.getElementById('cookie-modal-save');
  const cookieToggles = document.querySelectorAll('.cookie-toggle');

  // Show banner if not already decided
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      localStorage.setItem('cookieTargeting', 'true');
      localStorage.setItem('cookieFunctional', 'true');
      localStorage.setItem('cookiePerformance', 'true');
      cookieBanner.classList.remove('show');
    });
  }

  if (cookieReject) {
    cookieReject.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'rejected');
      localStorage.setItem('cookieTargeting', 'false');
      localStorage.setItem('cookieFunctional', 'false');
      localStorage.setItem('cookiePerformance', 'false');
      cookieBanner.classList.remove('show');
    });
  }

  if (cookieManage && cookieModal) {
    cookieManage.addEventListener('click', function() {
      cookieModal.classList.add('show');
      // Load saved preferences
      cookieToggles.forEach(toggle => {
        const category = toggle.dataset.category;
        const saved = localStorage.getItem('cookie' + category.charAt(0).toUpperCase() + category.slice(1));
        toggle.classList.toggle('on', saved === 'true');
      });
    });
  }

  if (cookieModalClose && cookieModal) {
    cookieModalClose.addEventListener('click', function() {
      cookieModal.classList.remove('show');
    });
  }

  if (cookieModal) {
    cookieModal.addEventListener('click', function(e) {
      if (e.target === cookieModal) {
        cookieModal.classList.remove('show');
      }
    });
  }

  cookieToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      this.classList.toggle('on');
    });
  });

  if (cookieModalSave && cookieModal) {
    cookieModalSave.addEventListener('click', function() {
      cookieToggles.forEach(toggle => {
        const category = toggle.dataset.category;
        const enabled = toggle.classList.contains('on');
        localStorage.setItem('cookie' + category.charAt(0).toUpperCase() + category.slice(1), enabled);
      });
      localStorage.setItem('cookieConsent', 'custom');
      cookieModal.classList.remove('show');
      cookieBanner.classList.remove('show');
    });
  }

  // ============================================
  // Comparison Table Expand
  // ============================================
  const expandTriggers = document.querySelectorAll('[data-expand]');
  expandTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const targetId = this.dataset.expand;
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.toggle('hidden');
        this.textContent = target.classList.contains('hidden') ? 'See all features' : 'Hide features';
      }
    });
  });

  // ============================================
  // Intersection Observer for animations
  // ============================================
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => observer.observe(el));
  }

  // ============================================
  // Form validation helpers
  // ============================================
  const authForms = document.querySelectorAll('.auth-form');
  authForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput) {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          emailInput.setCustomValidity('Please enter your work email');
          emailInput.reportValidity();
          return;
        }
        if (!emailRegex.test(email)) {
          emailInput.setCustomValidity('Please enter a valid email address');
          emailInput.reportValidity();
          return;
        }
        emailInput.setCustomValidity('');
        // Simulate proceeding
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          const originalText = btn.textContent;
          btn.textContent = 'Continuing...';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            alert('Proceeding to authentication flow...');
          }, 800);
        }
      }
    });
  });

  // ============================================
  // Testimonials carousel (simple)
  // ============================================
  const testimonialCarousel = document.querySelector('.testimonials-carousel');
  if (testimonialCarousel) {
    const track = testimonialCarousel.querySelector('.carousel-track');
    const prevBtn = testimonialCarousel.querySelector('.carousel-prev');
    const nextBtn = testimonialCarousel.querySelector('.carousel-next');
    const dots = testimonialCarousel.querySelectorAll('.carousel-dot');
    let currentIndex = 0;

    function goToSlide(index) {
      if (!track) return;
      const slides = track.children;
      const total = slides.length;
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      currentIndex = index;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });
  }

})();
