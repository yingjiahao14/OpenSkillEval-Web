document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      } else {
        mobileDrawer.classList.add('open');
        mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      }
    });
  }

  // Testimonial Carousel
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (track && slides.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });
  }

  // Pricing Toggle
  const pricingToggle = document.getElementById('billing-toggle');
  const starterPrice = document.getElementById('price-starter');
  const premiumPrice = document.getElementById('price-premium');

  if (pricingToggle && starterPrice && premiumPrice) {
    const starterMonthly = "$29.99";
    const premiumMonthly = "$69.99";
    const starterAnnual = "$23.99";
    const premiumAnnual = "$55.99";

    pricingToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        // Annual
        starterPrice.textContent = starterAnnual;
        premiumPrice.textContent = premiumAnnual;
      } else {
        // Monthly
        starterPrice.textContent = starterMonthly;
        premiumPrice.textContent = premiumMonthly;
      }
    });
  }

  // FAQ Accordion
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

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        if (!field.value.trim()) {
          isValid = false;
          formGroup.classList.add('has-error');
        } else {
          formGroup.classList.remove('has-error');
        }

        if (field.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            isValid = false;
            formGroup.classList.add('has-error');
          }
        }
      });

      if (isValid) {
        contactForm.reset();
        formMessage.textContent = 'Thank you! Your message has been sent successfully. We will be in touch shortly.';
        formMessage.className = 'form-message success';
        
        // Remove error classes if any
        requiredFields.forEach(field => field.closest('.form-group').classList.remove('has-error'));
      } else {
        formMessage.textContent = 'Please fill out all required fields correctly.';
        formMessage.className = 'form-message error';
        formMessage.style.backgroundColor = '#FDE8E8';
        formMessage.style.color = '#9B1C1C';
        formMessage.style.border = '1px solid #F98080';
        formMessage.style.display = 'block';
      }
    });

    // Remove error class on input
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('has-error');
      });
    });
  }
});
