// ClipCast Main JavaScript

(function() {
  'use strict';

  // Initialize Lucide icons
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    initMobileMenu();
    initPricingToggle();
    initTeamSizeSlider();
    initFAQAccordion();
    initCookieConsent();
    initScrollAnimations();
    initComparisonTableExpand();
  });

  // Mobile menu
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn && mobileMenu) {
      closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  // Pricing billing toggle
  function initPricingToggle() {
    const toggleMonthly = document.getElementById('toggle-monthly');
    const toggleAnnual = document.getElementById('toggle-annual');
    const saveBadge = document.getElementById('save-badge');
    const priceBusiness = document.getElementById('price-business');
    const priceBusinessAI = document.getElementById('price-business-ai');
    const periodLabels = document.querySelectorAll('.price-period');

    if (!toggleMonthly || !toggleAnnual) return;

    function setMonthly() {
      toggleMonthly.classList.add('active');
      toggleAnnual.classList.remove('active');
      if (saveBadge) saveBadge.style.display = 'none';
      if (priceBusiness) priceBusiness.textContent = '$18';
      if (priceBusinessAI) priceBusinessAI.textContent = '$24';
      periodLabels.forEach(function(el) {
        el.textContent = '/user/mo';
      });
    }

    function setAnnual() {
      toggleAnnual.classList.add('active');
      toggleMonthly.classList.remove('active');
      if (saveBadge) saveBadge.style.display = 'inline-flex';
      // Annual: 17% off
      if (priceBusiness) priceBusiness.textContent = '$15';
      if (priceBusinessAI) priceBusinessAI.textContent = '$20';
      periodLabels.forEach(function(el) {
        el.textContent = '/user/mo billed annually';
      });
    }

    toggleMonthly.addEventListener('click', setMonthly);
    toggleAnnual.addEventListener('click', setAnnual);
  }

  // Team size slider
  function initTeamSizeSlider() {
    const slider = document.getElementById('team-size-slider');
    const display = document.getElementById('team-size-display');
    const recommendation = document.getElementById('plan-recommendation');

    if (!slider || !display) return;

    function updateSlider() {
      const val = parseInt(slider.value);
      display.textContent = val + (val === 100 ? '+' : '');

      if (recommendation) {
        let rec = '';
        if (val <= 5) {
          rec = 'Starter is perfect for your team size.';
        } else if (val <= 20) {
          rec = 'Business plan is recommended for your team.';
        } else if (val <= 50) {
          rec = 'Business + AI will supercharge your workflow.';
        } else {
          rec = 'Enterprise is built for teams your size.';
        }
        recommendation.textContent = rec;
      }
    }

    slider.addEventListener('input', updateSlider);
    updateSlider();
  }

  // FAQ Accordion
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');

        // Close all others (optional accordion behavior)
        faqItems.forEach(function(other) {
          if (other !== item) {
            other.classList.remove('open');
            const otherAnswer = other.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.classList.remove('open');
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          answer.classList.remove('open');
        } else {
          item.classList.add('open');
          answer.classList.add('open');
        }
      });
    });
  }

  // Cookie consent
  function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const manageBtn = document.getElementById('cookie-manage');
    const modal = document.getElementById('cookie-modal');
    const modalClose = document.getElementById('cookie-modal-close');
    const modalSave = document.getElementById('cookie-modal-save');

    // Check if already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent && banner) {
      setTimeout(function() {
        banner.classList.add('show');
      }, 800);
    }

    if (acceptBtn && banner) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookie-consent', 'accepted');
        banner.classList.remove('show');
      });
    }

    if (rejectBtn && banner) {
      rejectBtn.addEventListener('click', function() {
        localStorage.setItem('cookie-consent', 'rejected');
        banner.classList.remove('show');
      });
    }

    if (manageBtn && modal) {
      manageBtn.addEventListener('click', function() {
        modal.classList.add('open');
      });
    }

    if (modalClose && modal) {
      modalClose.addEventListener('click', function() {
        modal.classList.remove('open');
      });
    }

    if (modalSave && modal) {
      modalSave.addEventListener('click', function() {
        localStorage.setItem('cookie-consent', 'custom');
        modal.classList.remove('open');
        if (banner) banner.classList.remove('show');
      });
    }

    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }
  }

  // Scroll animations (simple intersection observer)
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const animation = el.getAttribute('data-animate');
          const delay = el.getAttribute('data-delay') || '0';
          el.style.animationDelay = delay + 'ms';
          el.classList.add('animate-' + animation);
          el.style.opacity = '1';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(function(el) {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // Comparison table expand
  function initComparisonTableExpand() {
    const expandBtn = document.getElementById('comparison-expand-btn');
    const expandRows = document.querySelectorAll('.comparison-expandable');

    if (!expandBtn || !expandRows.length) return;

    let expanded = false;
    expandBtn.addEventListener('click', function() {
      expanded = !expanded;
      expandRows.forEach(function(row) {
        row.style.display = expanded ? 'table-row' : 'none';
      });
      expandBtn.textContent = expanded ? 'Show fewer features' : 'See all features';
    });
  }
})();
