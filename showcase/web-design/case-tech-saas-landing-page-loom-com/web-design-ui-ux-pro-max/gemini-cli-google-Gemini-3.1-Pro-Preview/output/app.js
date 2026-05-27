document.addEventListener('DOMContentLoaded', () => {
  
  // 1. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        faqItems.forEach(i => i.classList.remove('active'));
        // Open clicked if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 2. Pricing Toggle (Monthly / Annually)
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const planPrices = document.querySelectorAll('.plan-price-value');
  
  // Prices map (data-monthly, data-annual)
  // Assuming HTML structure: <div class="plan-price">$<span class="plan-price-value" data-monthly="18" data-annual="15">18</span><span>/user/mo</span></div>
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update toggle buttons
      toggleBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const isAnnual = e.target.textContent.toLowerCase().includes('annual');
      
      // Update prices
      planPrices.forEach(priceEl => {
        const monthly = priceEl.getAttribute('data-monthly');
        const annual = priceEl.getAttribute('data-annual');
        if (monthly && annual) {
          priceEl.textContent = isAnnual ? annual : monthly;
        }
      });
    });
  });

  // 3. Team Size Slider
  const teamSlider = document.getElementById('teamSizeSlider');
  const teamSizeValue = document.getElementById('teamSizeValue');
  
  if (teamSlider && teamSizeValue) {
    teamSlider.addEventListener('input', (e) => {
      teamSizeValue.textContent = e.target.value;
      // Could add logic here to highlight a specific plan based on team size
    });
  }

  // 4. Comparison Table Expand
  const expandFeaturesBtns = document.querySelectorAll('.expand-features-btn');
  const comparisonTableSection = document.getElementById('comparison-table-section');
  
  expandFeaturesBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (comparisonTableSection) {
        comparisonTableSection.style.display = 'block';
        comparisonTableSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Cookie Consent Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');
  const rejectCookiesBtn = document.getElementById('reject-cookies');
  const manageCookiesBtn = document.getElementById('manage-cookies');
  const cookieModal = document.getElementById('cookie-modal');
  const savePreferencesBtn = document.getElementById('save-preferences');

  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    cookieBanner.style.display = 'flex';
  }

  const dismissBanner = () => {
    if (cookieBanner) cookieBanner.style.display = 'none';
    localStorage.setItem('cookieConsent', 'true');
  };

  if (acceptCookiesBtn) acceptCookiesBtn.addEventListener('click', dismissBanner);
  if (rejectCookiesBtn) rejectCookiesBtn.addEventListener('click', dismissBanner);
  
  if (manageCookiesBtn && cookieModal) {
    manageCookiesBtn.addEventListener('click', () => {
      cookieModal.classList.add('active');
    });
  }

  if (savePreferencesBtn && cookieModal) {
    savePreferencesBtn.addEventListener('click', () => {
      cookieModal.classList.remove('active');
      dismissBanner();
    });
  }

  // 6. Forms (Login/Signup)
  const authForms = document.querySelectorAll('.auth-form');
  authForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add visual feedback
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Processing...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        // Redirect logic would go here
        console.log('Form submitted');
      }, 1000);
    });
  });

});