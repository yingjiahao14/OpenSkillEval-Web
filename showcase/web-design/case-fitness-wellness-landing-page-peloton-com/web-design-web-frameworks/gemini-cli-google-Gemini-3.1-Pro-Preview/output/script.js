document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const desktopNav = document.querySelector('.desktop-nav');
  if (menuToggle && desktopNav) {
    menuToggle.addEventListener('click', () => {
      desktopNav.classList.toggle('active');
    });
  }

  // Tabs Logic
  const tabLists = document.querySelectorAll('.tab-list');
  tabLists.forEach(tabList => {
    tabList.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      
      const targetId = btn.getAttribute('data-target');
      const tabsWrapper = btn.closest('.tabs-wrapper');
      
      // Deactivate all buttons & panels in this wrapper
      tabsWrapper.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabsWrapper.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      
      // Activate clicked button and target panel
      btn.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Accordion Logic
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(accordion => {
    accordion.addEventListener('click', (e) => {
      const header = e.target.closest('.accordion-header');
      if (!header) return;
      
      const item = header.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isActive = item.classList.contains('active');
      
      // Close all items in this accordion
      accordion.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-body').style.maxHeight = null;
      });
      
      // Open if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
    
    // Initialize open for the first item
    const firstItem = accordion.querySelector('.accordion-item');
    if (firstItem) {
      firstItem.classList.add('active');
      const firstBody = firstItem.querySelector('.accordion-body');
      firstBody.style.maxHeight = firstBody.scrollHeight + "px";
    }
  });

  // Testimonial Carousel Logic
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const inner = carousel.querySelector('.carousel-inner');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Remove active from all dots
        dots.forEach(d => d.classList.remove('active'));
        // Add active to clicked
        dot.classList.add('active');
        // Slide
        inner.style.transform = `translateX(-${index * 100}%)`;
      });
    });
  }

  // Cookie Banner Logic
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1000);
    }
    
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');
      });
    }
    
    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('show');
      });
    }
  }

  // Form Validation (Demo Request)
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const requiredFields = demoForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          isValid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });
      
      if (isValid) {
        // Simulate form submission
        const submitBtn = demoForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Submitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          demoForm.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="ri-checkbox-circle-fill" style="font-size: 4rem; color: var(--success);"></i><h3 style="margin-top: 1rem;">Request Submitted</h3><p>Our team will contact you shortly to schedule your demo.</p></div>';
        }, 1500);
      }
    });
    
    // Clear validation error on input
    demoForm.addEventListener('input', (e) => {
      if (e.target.classList.contains('is-invalid')) {
        e.target.classList.remove('is-invalid');
      }
    });
  }
});