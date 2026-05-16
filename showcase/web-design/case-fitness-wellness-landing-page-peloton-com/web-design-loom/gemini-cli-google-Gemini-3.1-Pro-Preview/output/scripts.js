document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Tabs Logic
  const initTabs = () => {
    const tabGroups = document.querySelectorAll('.tabs-container');
    
    tabGroups.forEach(group => {
      const tabBtns = group.querySelectorAll('.tab-btn');
      const tabPanes = group.querySelectorAll('.tab-pane');
      
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active classes
          tabBtns.forEach(b => b.classList.remove('active'));
          tabPanes.forEach(p => p.classList.remove('active'));
          
          // Add active class to current
          btn.classList.add('active');
          const targetId = btn.getAttribute('data-target');
          const targetPane = document.getElementById(targetId);
          if(targetPane) {
            targetPane.classList.add('active');
          }
        });
      });
    });
  };

  // 2. Accordion Logic
  const initAccordion = () => {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(acc => {
      const items = acc.querySelectorAll('.accordion-item');
      
      items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all items in this accordion
          items.forEach(i => i.classList.remove('active'));
          
          // If it wasn't active, open it
          if (!isActive) {
            item.classList.add('active');
          }
        });
      });
    });
  };

  // 3. Testimonial Carousel Logic
  const initCarousel = () => {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
      const inner = carousel.querySelector('.carousel-inner');
      const cards = carousel.querySelectorAll('.testimonial-card');
      const dots = carousel.querySelectorAll('.dot');
      
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          // Remove active class from all dots
          dots.forEach(d => d.classList.remove('active'));
          
          // Add active class to clicked dot
          dot.classList.add('active');
          
          // Translate inner container
          inner.style.transform = `translateX(-${index * 100}%)`;
        });
      });
    });
  };

  // 4. Form Validation Logic
  const initForm = () => {
    const demoForm = document.getElementById('demo-form');
    if (!demoForm) return;
    
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const requiredFields = demoForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        const errorEl = formGroup.querySelector('.form-error');
        
        if (!field.value.trim()) {
          isValid = false;
          formGroup.classList.add('error');
          if(errorEl) errorEl.textContent = 'This field is required';
        } else {
          formGroup.classList.remove('error');
        }
        
        // Simple email validation if type is email
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            isValid = false;
            formGroup.classList.add('error');
            if(errorEl) errorEl.textContent = 'Please enter a valid email';
          }
        }
      });
      
      if (isValid) {
        // Show success state (normally would submit via fetch/AJAX)
        demoForm.innerHTML = '<div class="text-center p-4"><h3>Thank You!</h3><p>Your demo request has been submitted successfully. Our team will contact you shortly.</p></div>';
      }
    });
    
    // Clear errors on input
    const inputs = demoForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if(group.classList.contains('error')) {
          group.classList.remove('error');
        }
      });
    });
  };

  // 5. Cookie Banner Logic
  const initCookieBanner = () => {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    
    // Check if already accepted/declined
    const cookiePref = localStorage.getItem('wellstream_cookie_pref');
    
    if (!cookiePref) {
      setTimeout(() => {
        banner.classList.add('show');
      }, 1000);
    }
    
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('wellstream_cookie_pref', 'accepted');
        banner.classList.remove('show');
      });
    }
    
    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('wellstream_cookie_pref', 'declined');
        banner.classList.remove('show');
      });
    }
  };

  // Initialize all components
  initTabs();
  initAccordion();
  initCarousel();
  initForm();
  initCookieBanner();
});