document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('close-nav-btn');
  const overlay = document.getElementById('overlay');

  if (hamburger && mobileNav && closeBtn && overlay) {
    const toggleNav = () => {
      mobileNav.classList.toggle('open');
      overlay.classList.toggle('open');
    };

    hamburger.addEventListener('click', toggleNav);
    closeBtn.addEventListener('click', toggleNav);
    overlay.addEventListener('click', toggleNav);
  }

  // 2. Testimonial Carousel
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const cards = document.querySelectorAll('.testimonial-card');
  
  if (cards.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;

    const showCard = (index) => {
      cards.forEach((card, i) => {
        if (i === index) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
      showCard(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
      showCard(currentIndex);
    });
  }

  // 3. Pricing Toggle
  const pricingToggle = document.getElementById('pricing-toggle');
  const starterPrice = document.getElementById('starter-price');
  const premiumPrice = document.getElementById('premium-price');

  if (pricingToggle && starterPrice && premiumPrice) {
    pricingToggle.addEventListener('click', () => {
      pricingToggle.classList.toggle('annual');
      const isAnnual = pricingToggle.classList.contains('annual');
      
      // Values based on 20% savings for annual
      // Starter: $29.99/mo -> $23.99/mo
      // Premium: $69.99/mo -> $55.99/mo
      
      if (isAnnual) {
        starterPrice.innerHTML = '$23.99<span>/mo</span>';
        premiumPrice.innerHTML = '$55.99<span>/mo</span>';
      } else {
        starterPrice.innerHTML = '$29.99<span>/mo</span>';
        premiumPrice.innerHTML = '$69.99<span>/mo</span>';
      }
    });
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // 5. Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const fields = ['name', 'email', 'company', 'message'];
      
      fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const group = input.closest('.form-group');
        
        if (!input.value.trim()) {
          group.classList.add('invalid');
          isValid = false;
        } else {
          group.classList.remove('invalid');
          
          if (fieldId === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
              group.classList.add('invalid');
              isValid = false;
            }
          }
        }
      });
      
      if (isValid) {
        document.getElementById('form-success').classList.add('show');
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          document.getElementById('form-success').classList.remove('show');
        }, 5000);
      }
    });
    
    // Remove invalid class on input
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('invalid');
      });
    });
  }
});
