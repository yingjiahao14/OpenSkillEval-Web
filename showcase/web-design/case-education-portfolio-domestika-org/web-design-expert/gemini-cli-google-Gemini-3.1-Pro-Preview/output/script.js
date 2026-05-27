document.addEventListener('DOMContentLoaded', () => {
  // Dismiss Promo Banner
  const promoClose = document.querySelector('.promo-close');
  const promoBanner = document.querySelector('.promo-banner');
  if (promoClose && promoBanner) {
    promoClose.addEventListener('click', () => {
      promoBanner.style.display = 'none';
    });
  }

  // Carousels
  const carousels = document.querySelectorAll('.carousel-wrapper');
  carousels.forEach(wrapper => {
    const container = wrapper.querySelector('.carousel-container');
    const prevBtn = wrapper.querySelector('.carousel-nav.prev');
    const nextBtn = wrapper.querySelector('.carousel-nav.next');
    
    if (container && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        const itemWidth = container.querySelector('.carousel-item').offsetWidth + 24;
        container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        const itemWidth = container.querySelector('.carousel-item').offsetWidth + 24;
        container.scrollBy({ left: itemWidth, behavior: 'smooth' });
      });
    }
  });

  // Footer Accordion (Mobile)
  const footerCols = document.querySelectorAll('.footer-col h4');
  footerCols.forEach(col => {
    col.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        col.parentElement.classList.toggle('active');
      }
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });

  // Pricing Toggle
  const toggleBtns = document.querySelectorAll('.pricing-toggle .toggle-btn');
  const priceDisplay = document.querySelector('.price-display');
  const billingInfo = document.querySelector('.billing-info');
  const pricePeriod = document.querySelector('.price-period');
  
  if (toggleBtns.length > 0 && priceDisplay) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (btn.dataset.plan === 'yearly') {
          priceDisplay.textContent = '$14.59';
          pricePeriod.textContent = '/month';
          if (billingInfo) billingInfo.textContent = 'Billed as $174.50/year. 12 Plus credits every year.';
        } else {
          priceDisplay.textContent = '$33.90';
          pricePeriod.textContent = '/month';
          if (billingInfo) billingInfo.textContent = 'Billed as $33.90/month. 1 Plus credit per month.';
        }
      });
    });
  }

  // Password Visibility Toggle
  const passwordToggle = document.querySelector('.password-toggle');
  const passwordInput = document.querySelector('input[type="password"]');
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      passwordToggle.innerHTML = type === 'password' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>' : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
    });
  }

  // Project Sorting/Filtering mock
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const parent = btn.parentElement;
        parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // In a real app this would filter the masonry grid
      });
    });
  }

  // Sidebar Filtering mock
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  if (sidebarItems.length > 0) {
    sidebarItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const parent = item.parentElement;
        parent.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        // In a real app this would filter the courses
      });
    });
  }
});
