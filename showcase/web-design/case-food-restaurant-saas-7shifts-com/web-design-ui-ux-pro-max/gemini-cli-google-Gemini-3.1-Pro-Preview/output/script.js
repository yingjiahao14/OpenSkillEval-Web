document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
    });
  }

  // Testimonial Carousel
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;

    const updateSlide = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlide();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide();
    });
  }

  // Pricing Toggle
  const pricingToggle = document.getElementById('billingToggle');
  const starterPrice = document.getElementById('starterPrice');
  const premiumPrice = document.getElementById('premiumPrice');
  
  if (pricingToggle && starterPrice && premiumPrice) {
    // Annual saves 20%
    const monthlyStarter = 29.99;
    const monthlyPremium = 69.99;
    const annualStarter = (monthlyStarter * 0.8).toFixed(2);
    const annualPremium = (monthlyPremium * 0.8).toFixed(2);

    pricingToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        // Annual
        starterPrice.innerHTML = `$${annualStarter}<span>/mo</span>`;
        premiumPrice.innerHTML = `$${annualPremium}<span>/mo</span>`;
      } else {
        // Monthly
        starterPrice.innerHTML = `$${monthlyStarter}<span>/mo</span>`;
        premiumPrice.innerHTML = `$${monthlyPremium}<span>/mo</span>`;
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        // Close others
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        // Toggle current
        item.classList.toggle('active');
      });
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const fields = ['name', 'email', 'company', 'locations', 'message'];
      
      fields.forEach(field => {
        const input = document.getElementById(field);
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          group.classList.add('error');
          isValid = false;
        } else {
          group.classList.remove('error');
          // Basic email validation
          if (field === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
            group.classList.add('error');
            group.querySelector('.error-message').innerText = "Please enter a valid email address.";
            isValid = false;
          }
        }
      });

      if (isValid) {
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
      }
    });
    
    // Clear error on input
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('error');
      });
    });
  }
});