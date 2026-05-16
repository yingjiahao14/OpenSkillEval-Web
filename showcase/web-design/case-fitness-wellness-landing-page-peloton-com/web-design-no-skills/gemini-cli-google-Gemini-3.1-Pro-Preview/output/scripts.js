document.addEventListener('DOMContentLoaded', () => {

  // Tabs Logic
  const tabGroups = document.querySelectorAll('.tabs-container');
  tabGroups.forEach(group => {
    const tabBtns = group.querySelectorAll('.tab-btn');
    const tabContents = group.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetContent = group.querySelector(`#${targetId}`);
        if(targetContent) targetContent.classList.add('active');
      });
    });
  });

  // Accordion Logic
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const parent = item.parentElement;
      
      // Close others
      parent.querySelectorAll('.accordion-item').forEach(otherItem => {
        if(otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active');
    });
  });

  // Carousel Logic
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const dots = carousel.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        inner.style.transform = `translateX(-${index * 100}%)`;
      });
    });
  });

  // Cookie Banner Logic
  const cookieBanner = document.getElementById('cookie-banner');
  if(cookieBanner) {
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    if(!localStorage.getItem('cookieConsent')) {
      cookieBanner.style.display = 'flex';
    } else {
      cookieBanner.style.display = 'none';
    }

    const dismissBanner = () => {
      cookieBanner.style.display = 'none';
      localStorage.setItem('cookieConsent', 'true');
    };

    if(acceptBtn) acceptBtn.addEventListener('click', dismissBanner);
    if(declineBtn) declineBtn.addEventListener('click', dismissBanner);
  }

  // Form Validation Logic
  const demoForm = document.getElementById('demo-form');
  if(demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation check (html5 handles most of it due to 'required' attributes)
      if(demoForm.checkValidity()) {
        alert('Demo Request Submitted Successfully!');
        demoForm.reset();
      } else {
        demoForm.reportValidity();
      }
    });
  }

});