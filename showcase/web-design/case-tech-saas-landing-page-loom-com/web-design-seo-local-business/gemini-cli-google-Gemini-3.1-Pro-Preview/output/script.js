document.addEventListener('DOMContentLoaded', () => {
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if(question) {
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });

  // Pricing Toggle
  const billingToggle = document.getElementById('billingToggle');
  if(billingToggle) {
    billingToggle.addEventListener('click', () => {
      billingToggle.classList.toggle('active');
      const isAnnual = billingToggle.classList.contains('active');
      
      const prices = document.querySelectorAll('.dynamic-price');
      prices.forEach(p => {
        const monthly = p.getAttribute('data-monthly');
        const annual = p.getAttribute('data-annual');
        if(monthly && annual) {
          p.textContent = isAnnual ? annual : monthly;
        }
      });
    });
  }

  // Team Size Slider
  const teamSlider = document.getElementById('teamSizeSlider');
  const teamSizeVal = document.getElementById('teamSizeVal');
  if(teamSlider && teamSizeVal) {
    teamSlider.addEventListener('input', (e) => {
      teamSizeVal.textContent = e.target.value;
      // Simple logic to highlight recommended plan
      const cards = document.querySelectorAll('.pricing-card');
      cards.forEach(c => c.classList.remove('popular'));
      if(e.target.value > 100) {
        document.getElementById('plan-enterprise')?.classList.add('popular');
      } else if(e.target.value > 20) {
        document.getElementById('plan-business-ai')?.classList.add('popular');
      } else {
        document.getElementById('plan-business')?.classList.add('popular');
      }
    });
  }

  // Comparison Expand
  const expandBtns = document.querySelectorAll('.expand-features-btn');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if(target) {
        if(target.style.display === 'none' || !target.style.display) {
          target.style.display = 'block';
          btn.textContent = 'Hide features';
        } else {
          target.style.display = 'none';
          btn.textContent = 'See all features';
        }
      }
    });
  });

  // Cookie Consent
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookies');
  const rejectBtn = document.getElementById('rejectCookies');
  const manageBtn = document.getElementById('manageCookies');
  const cookieModal = document.getElementById('cookieModal');
  const closeCookieModal = document.getElementById('closeCookieModal');

  if(cookieBanner && !localStorage.getItem('cookieConsent')) {
    cookieBanner.style.display = 'flex';
  } else if(cookieBanner) {
    cookieBanner.style.display = 'none';
  }

  if(acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.style.display = 'none';
    });
  }
  if(rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'rejected');
      cookieBanner.style.display = 'none';
    });
  }
  if(manageBtn && cookieModal) {
    manageBtn.addEventListener('click', () => {
      cookieModal.classList.add('active');
    });
  }
  if(closeCookieModal) {
    closeCookieModal.addEventListener('click', () => {
      cookieModal.classList.remove('active');
      localStorage.setItem('cookieConsent', 'managed');
      if(cookieBanner) cookieBanner.style.display = 'none';
    });
  }

  // Auth Forms
  const authForms = document.querySelectorAll('.auth-form form');
  authForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Mock proceed
      alert("Proceeding to authentication flow...");
      window.location.href = 'index.html';
    });
  });

});
