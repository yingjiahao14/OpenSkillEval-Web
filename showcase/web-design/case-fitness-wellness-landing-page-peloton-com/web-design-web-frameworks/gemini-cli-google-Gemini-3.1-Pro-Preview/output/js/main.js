document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabContainers = document.querySelectorAll('.tabs-container');
  tabContainers.forEach(container => {
    const btns = container.querySelectorAll('.tab-btn');
    const panes = container.querySelectorAll('.tab-pane');
    
    btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        panes[index].classList.add('active');
      });
    });
  });

  // Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      accordionItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Carousel
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const dots = carousel.querySelectorAll('.dot');
    let currentIndex = 0;

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    function updateCarousel() {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }
  });

  // Form Validation
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    const inputs = demoForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        input.classList.add('touched');
      });
    });

    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      inputs.forEach(input => {
        input.classList.add('touched');
        if (!input.checkValidity()) {
          isValid = false;
        }
      });

      if (isValid) {
        alert('Thank you for your request. We will contact you shortly.');
        demoForm.reset();
        inputs.forEach(input => input.classList.remove('touched'));
      }
    });
  }

  // Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setTimeout(() => cookieBanner.classList.add('show'), 1000);
    }

    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

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
});
