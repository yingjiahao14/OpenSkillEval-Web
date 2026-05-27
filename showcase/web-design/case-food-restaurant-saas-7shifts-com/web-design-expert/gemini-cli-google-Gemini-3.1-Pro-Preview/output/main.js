document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('span');
      if (mobileNavDrawer.classList.contains('open')) {
        icon.innerHTML = '✕'; // Close icon
      } else {
        icon.innerHTML = '☰'; // Hamburger icon
      }
    });
  }

  // Pricing Toggle (Monthly/Annual)
  const billingToggle = document.getElementById('billingToggle');
  const priceStarter = document.getElementById('priceStarter');
  const pricePremium = document.getElementById('pricePremium');
  const billingPeriodLabels = document.querySelectorAll('.billing-period');

  if (billingToggle && priceStarter && pricePremium) {
    const prices = {
      monthly: { starter: '$29.99', premium: '$69.99' },
      annual: { starter: '$23.99', premium: '$55.99' } // 20% off
    };

    billingToggle.addEventListener('click', () => {
      const isAnnual = billingToggle.classList.toggle('annual');
      const period = isAnnual ? 'annual' : 'monthly';
      
      priceStarter.textContent = prices[period].starter;
      pricePremium.textContent = prices[period].premium;
      
      billingPeriodLabels.forEach(label => {
        label.textContent = isAnnual ? '/mo (billed annually)' : '/mo';
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
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

  // Testimonial Carousel
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  
  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalCards - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const fields = ['fullName', 'email', 'companyName', 'locations', 'message'];
      
      fields.forEach(field => {
        const input = document.getElementById(field);
        const group = input.closest('.form-group');
        
        if (!input.value.trim()) {
          isValid = false;
          group.classList.add('has-error');
        } else {
          group.classList.remove('has-error');
          // Basic email validation
          if (field === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
            isValid = false;
            group.classList.add('has-error');
          }
        }
      });
      
      if (isValid) {
        // Show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
      }
    });
    
    // Clear errors on input
    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('has-error');
      });
    });
  }
});
