
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Tabs
  const tabContainers = document.querySelectorAll('.tabs-container');
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        contents[index].classList.add('active');
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

  // Testimonial Carousel
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  if (track && dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        track.style.transform = `translateX(-${index * 100}%)`;
      });
    });
  }

  // Form Validation
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const requiredFields = demoForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const errorMsg = field.nextElementSibling;
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ef4444';
          if (errorMsg && errorMsg.classList.contains('form-error')) {
            errorMsg.style.display = 'block';
          }
        } else {
          field.style.borderColor = '';
          if (errorMsg && errorMsg.classList.contains('form-error')) {
            errorMsg.style.display = 'none';
          }
        }
      });
      
      if (isValid) {
        // Simulate submission
        const btn = demoForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Submitting...';
        btn.disabled = true;
        
        setTimeout(() => {
          alert('Demo request submitted successfully!');
          demoForm.reset();
          btn.textContent = originalText;
          btn.disabled = false;
        }, 1000);
      }
    });
  }

  // Cookie Banner
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookies');
  const declineBtn = document.getElementById('declineCookies');
  
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
    
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
