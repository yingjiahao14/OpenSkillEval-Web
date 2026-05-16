document.addEventListener('DOMContentLoaded', () => {

  // Tabs Logic
  const setupTabs = (tabNavClass, tabContentClass) => {
    const tabBtns = document.querySelectorAll(`.${tabNavClass} .tab-btn`);
    const tabContents = document.querySelectorAll(`.${tabContentClass}`);

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');
      });
    });
  };

  setupTabs('industry-tabs', 'industry-content');
  setupTabs('integration-tabs-nav', 'integration-content');
  setupTabs('security-tabs-nav', 'security-content');

  // Accordion Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = header.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        h.nextElementSibling.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Carousel Logic
  const track = document.querySelector('.carousel-track');
  if (track) {
    const slides = Array.from(track.children);
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = Array.from(dotsNav.children);

    const updateCarousel = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => updateCarousel(index));
    });
  }

  // Cookie Banner Logic
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setTimeout(() => cookieBanner.classList.add('show'), 1000);
    }

    document.getElementById('accept-cookies')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      cookieBanner.classList.remove('show');
    });

    document.getElementById('decline-cookies')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'false');
      cookieBanner.classList.remove('show');
    });
  }

  // Form Validation Logic
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = demoForm.querySelectorAll('.form-control[required]');
      
      inputs.forEach(input => {
        const group = input.parentElement;
        if (!input.value.trim()) {
          group.classList.add('error');
          isValid = false;
        } else {
          group.classList.remove('error');
        }
      });

      if (isValid) {
        // Simulate submission
        demoForm.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>Your demo request has been submitted successfully. Our team will contact you shortly.</p></div>';
      }
    });
  }
});
