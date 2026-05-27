document.addEventListener('DOMContentLoaded', () => {

  // Cookie Consent Banner
  const cookieBanner = document.getElementById('cookie-consent-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');
  const rejectCookiesBtn = document.getElementById('reject-cookies');
  const managePrefsBtn = document.getElementById('manage-preferences');
  const cookieModal = document.getElementById('cookie-modal');
  const savePrefsBtn = document.getElementById('save-preferences');

  if (cookieBanner) {
    if (!localStorage.getItem('cookieConsent')) {
      cookieBanner.style.display = 'flex';
    } else {
      cookieBanner.style.display = 'none';
    }

    if (acceptCookiesBtn) {
      acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.style.display = 'none';
      });
    }

    if (rejectCookiesBtn) {
      rejectCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.style.display = 'none';
      });
    }

    if (managePrefsBtn && cookieModal) {
      managePrefsBtn.addEventListener('click', () => {
        cookieModal.classList.add('active');
      });
    }

    if (savePrefsBtn) {
      savePrefsBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'custom');
        cookieModal.classList.remove('active');
        cookieBanner.style.display = 'none';
      });
    }
  }

  // Pricing Toggle (Monthly / Annually)
  const billingToggle = document.getElementById('billing-toggle');
  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      const prices = document.querySelectorAll('.dynamic-price');
      prices.forEach(priceEl => {
        const monthly = priceEl.getAttribute('data-monthly');
        const annual = priceEl.getAttribute('data-annual');
        if (monthly !== null && annual !== null) {
          priceEl.innerHTML = `\$${isAnnual ? annual : monthly}<span>/user/mo</span>`;
        }
      });
    });
  }

  // Pricing Team Size Slider
  const teamSlider = document.getElementById('team-size-slider');
  const teamSizeDisplay = document.getElementById('team-size-display');
  if (teamSlider && teamSizeDisplay) {
    teamSlider.addEventListener('input', (e) => {
      teamSizeDisplay.textContent = e.target.value;
      // Could add logic to highlight a plan based on value
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        faqItems.forEach(faq => faq.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Comparison Table Expand
  const expandBtns = document.querySelectorAll('.expand-features-btn');
  const comparisonTableWrap = document.querySelector('.comparison-table-wrap');
  if (expandBtns.length > 0 && comparisonTableWrap) {
    expandBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        comparisonTableWrap.scrollIntoView({ behavior: 'smooth' });
        // Can add blinking or highlighting to the table
      });
    });
  }

  // Forms
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Proceed to email auth flow mock
      alert('Proceeding to authentication...');
    });
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Proceed to signup flow mock
      alert('Proceeding to account creation...');
    });
  }

});

// Make table hidden initially
document.addEventListener('DOMContentLoaded', () => {
  const compTableWrap = document.querySelector('.comparison-table-wrap');
  if (compTableWrap) {
    compTableWrap.style.display = 'none';
  }

  const expandButtons = document.querySelectorAll('.expand-features-btn');
  expandButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (compTableWrap) {
        compTableWrap.style.display = 'block';
        compTableWrap.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
