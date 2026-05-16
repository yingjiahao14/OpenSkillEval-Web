document.addEventListener('DOMContentLoaded', () => {
  // Tabs functionality
  const tabContainers = document.querySelectorAll('.tabs-container');
  tabContainers.forEach(container => {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabContents = container.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents in this container
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        container.querySelector(`#${targetId}`).classList.add('active');
      });
    });
  });

  // Accordion functionality
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // Check if current item is active
      const isActive = item.classList.contains('active');
      
      // Close all items
      accordionItems.forEach(i => i.classList.remove('active'));
      
      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Testimonial Carousel
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        slides[index].classList.add('active');
        dot.classList.add('active');
      });
    });
  }

  // Demo Form Validation
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation
      const requiredFields = demoForm.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'red';
        } else {
          field.style.borderColor = 'var(--border)';
        }
      });
      
      if (isValid) {
        alert('Thank you! Your demo request has been submitted.');
        demoForm.reset();
      } else {
        alert('Please fill out all required fields.');
      }
    });
  }

  // Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    // Check if already dismissed
    if (localStorage.getItem('cookieConsent')) {
      cookieBanner.classList.add('hidden');
    }
    
    const dismissBanner = (val) => {
      localStorage.setItem('cookieConsent', val);
      cookieBanner.classList.add('hidden');
    };
    
    acceptBtn.addEventListener('click', () => dismissBanner('accepted'));
    declineBtn.addEventListener('click', () => dismissBanner('declined'));
  }
});
