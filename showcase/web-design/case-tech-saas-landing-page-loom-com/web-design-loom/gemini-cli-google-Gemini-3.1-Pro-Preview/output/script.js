document.addEventListener('DOMContentLoaded', () => {
  
  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // Pricing Toggle (Monthly / Annual)
  const toggleBtns = document.querySelectorAll('.pricing-toggle .toggle-btn');
  const priceDisplays = document.querySelectorAll('[data-monthly][data-annual]');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      toggleBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const isAnnual = e.target.textContent.toLowerCase().includes('annual');
      
      // Update prices
      priceDisplays.forEach(display => {
        const value = isAnnual ? display.getAttribute('data-annual') : display.getAttribute('data-monthly');
        display.innerHTML = value === 'Contact Sales' ? value : `${value}<span>/user/mo</span>`;
      });
    });
  });

  // Pricing Feature Toggle
  const featureBtns = document.querySelectorAll('.toggle-features-btn');
  featureBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const list = e.target.nextElementSibling;
      if (list.style.display === 'none') {
        list.style.display = 'block';
        e.target.textContent = 'Hide features';
      } else {
        list.style.display = 'none';
        e.target.textContent = 'See all features';
      }
    });
  });

  // Team Size Slider
  const slider = document.getElementById('teamSizeSlider');
  const sliderValue = document.getElementById('teamSizeValue');
  if (slider && sliderValue) {
    slider.addEventListener('input', (e) => {
      sliderValue.textContent = e.target.value;
      // Could add logic here to highlight a specific plan based on size
    });
  }

  // Cookie Banner
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookies = document.getElementById('acceptCookies');
  const rejectCookies = document.getElementById('rejectCookies');
  const manageCookies = document.getElementById('manageCookies');
  const cookieModal = document.getElementById('cookieModal');
  const closeCookieModal = document.getElementById('closeCookieModal');
  
  if (cookieBanner) {
    // Check if already dismissed
    if (!localStorage.getItem('cookieConsent')) {
      cookieBanner.style.display = 'flex';
    } else {
      cookieBanner.style.display = 'none';
    }

    const dismissBanner = () => {
      cookieBanner.style.display = 'none';
      localStorage.setItem('cookieConsent', 'true');
    };

    if (acceptCookies) acceptCookies.addEventListener('click', dismissBanner);
    if (rejectCookies) rejectCookies.addEventListener('click', dismissBanner);
    
    if (manageCookies && cookieModal) {
      manageCookies.addEventListener('click', () => {
        cookieModal.classList.add('active');
      });
    }
    
    if (closeCookieModal) {
      closeCookieModal.addEventListener('click', () => {
        cookieModal.classList.remove('active');
        dismissBanner();
      });
    }
  }

  // Auth Forms handling
  const authForms = document.querySelectorAll('form');
  authForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple mock redirection for demo purposes
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert(`Proceeding with ${emailInput.value}...`);
      }
    });
  });
});
