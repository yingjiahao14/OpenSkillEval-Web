document.addEventListener('DOMContentLoaded', () => {
  // Banner Dismissal
  const banner = document.querySelector('.top-banner');
  const closeBanner = document.querySelector('.close-banner');
  if (closeBanner && banner) {
    closeBanner.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  // Carousels
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(container => {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');

    if (track && prevBtn && nextBtn) {
      nextBtn.addEventListener('click', () => {
        const item = track.querySelector('.carousel-item');
        if (item) {
          const itemWidth = item.offsetWidth + 24; // including gap
          track.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      });

      prevBtn.addEventListener('click', () => {
        const item = track.querySelector('.carousel-item');
        if (item) {
          const itemWidth = item.offsetWidth + 24;
          track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
      });
    }
  });

  // Footer Accordions (Mobile)
  const footerCols = document.querySelectorAll('.footer-col h4');
  footerCols.forEach(col => {
    col.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        col.parentElement.classList.toggle('active');
      }
    });
  });

  // Pricing Toggle
  const pricingTabs = document.querySelectorAll('.pricing-toggle button');
  const priceDisplays = document.querySelectorAll('.dynamic-price');
  const billingDisplays = document.querySelectorAll('.dynamic-billing');
  const creditsDisplays = document.querySelectorAll('.dynamic-credits');
  
  if (pricingTabs.length > 0) {
    pricingTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        pricingTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const isYearly = tab.dataset.plan === 'yearly';
        
        priceDisplays.forEach(p => {
          p.textContent = isYearly ? '$14.59' : '$33.90';
        });
        billingDisplays.forEach(b => {
          b.textContent = isYearly ? '$174.50/year' : '$33.90/month';
        });
        creditsDisplays.forEach(c => {
          c.textContent = isYearly ? '12 Plus credits every year' : '1 Plus credit every month';
        });
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    }
  });

  // Password Toggle
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.querySelector('input[type="password"]');
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.innerHTML = type === 'password' 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>' 
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
    });
  }

  // Sidebar Filter Interaction (Courses)
  const filterBtns = document.querySelectorAll('.filter-list button');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('ul').querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
});