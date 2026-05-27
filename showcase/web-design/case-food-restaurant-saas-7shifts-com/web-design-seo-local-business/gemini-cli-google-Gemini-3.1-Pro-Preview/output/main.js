document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all others
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Pricing Toggle
  const billingToggle = document.getElementById('billing-toggle');
  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      const isAnnual = billingToggle.classList.toggle('annual');
      
      const starterPrice = document.getElementById('price-starter');
      const premiumPrice = document.getElementById('price-premium');
      const starterPeriod = document.getElementById('period-starter');
      const premiumPeriod = document.getElementById('period-premium');
      
      if (isAnnual) {
        if (starterPrice) starterPrice.textContent = '$23.99';
        if (premiumPrice) premiumPrice.textContent = '$55.99';
        if (starterPeriod) starterPeriod.textContent = '/mo (billed annually)';
        if (premiumPeriod) premiumPeriod.textContent = '/mo (billed annually)';
      } else {
        if (starterPrice) starterPrice.textContent = '$29.99';
        if (premiumPrice) premiumPrice.textContent = '$69.99';
        if (starterPeriod) starterPeriod.textContent = '/mo';
        if (premiumPeriod) premiumPeriod.textContent = '/mo';
      }
    });
  }

  // Testimonial Carousel
  const track = document.querySelector('.carousel-inner');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = Array.from(track.children);
    
    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const inputs = contactForm.querySelectorAll('[required]');
      inputs.forEach(input => {
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          isValid = false;
          group.classList.add('invalid');
        } else if (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
          isValid = false;
          group.classList.add('invalid');
        } else {
          group.classList.remove('invalid');
        }
      });
      
      if (isValid) {
        const successMsg = document.getElementById('form-success');
        if (successMsg) {
          successMsg.style.display = 'block';
          contactForm.reset();
        }
      }
    });
    
    // Clear validation on input
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('invalid');
      });
    });
  }
});