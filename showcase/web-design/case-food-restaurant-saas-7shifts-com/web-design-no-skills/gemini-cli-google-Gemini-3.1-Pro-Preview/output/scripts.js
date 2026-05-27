document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      menuToggle.innerHTML = mobileNav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.style.maxHeight;

      // Close all answers
      document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.style.maxHeight = null;
      });
      faqQuestions.forEach(q => {
        q.querySelector('.icon').textContent = '+';
      });

      // Open clicked answer if it was not open
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.querySelector('.icon').textContent = '−';
      }
    });
  });

  // Pricing Toggle
  const billingToggle = document.getElementById('billing-toggle');
  const priceStarter = document.getElementById('price-starter');
  const pricePremium = document.getElementById('price-premium');
  const billingCycleLabels = document.querySelectorAll('.billing-cycle-label');

  if (billingToggle && priceStarter && pricePremium) {
    billingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      
      if (isAnnual) {
        priceStarter.textContent = '$23.99';
        pricePremium.textContent = '$55.99';
        billingCycleLabels.forEach(label => label.textContent = '/mo (billed annually)');
      } else {
        priceStarter.textContent = '$29.99';
        pricePremium.textContent = '$69.99';
        billingCycleLabels.forEach(label => label.textContent = '/mo');
      }
    });
  }

  // Testimonial Carousel
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let currentIndex = 0;

  if (track && prevBtn && nextBtn) {
    const testimonials = document.querySelectorAll('.testimonial');
    const total = testimonials.length;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % total;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + total) % total;
      updateCarousel();
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation check
      let isValid = true;
      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = 'var(--border)';
        }
      });

      if (isValid) {
        formMessage.style.display = 'block';
        formMessage.textContent = 'Thank you! Your message has been sent successfully. We will respond within one business day.';
        contactForm.reset();
        
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }
    });
  }
});
