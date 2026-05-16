document.addEventListener('DOMContentLoaded', () => {

  // Mobile Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('navbar-nav');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Newsletter Validation
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const feedback = form.querySelector('.form-feedback') || document.createElement('div');
      
      if (!form.querySelector('.form-feedback')) {
        feedback.className = 'form-feedback';
        form.appendChild(feedback);
      }

      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        feedback.textContent = 'Please enter an email address.';
        feedback.className = 'form-feedback feedback-error';
      } else if (!emailRegex.test(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'form-feedback feedback-error';
      } else {
        feedback.textContent = 'Thank you for subscribing!';
        feedback.className = 'form-feedback feedback-success';
        input.value = '';
      }
    });
  });

  // Carousel
  const track = document.getElementById('carousel-track');
  if (track) {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      });
    }

    // Optional: Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        // Swipe left
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      } else if (touchEndX - touchStartX > 50) {
        // Swipe right
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      }
    }, {passive: true});
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
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // Instructor Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorCards = document.querySelectorAll('.instructor-card');
  if (filterBtns.length > 0 && instructorCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        instructorCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-location') === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Workout Toggle
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const workoutContents = document.querySelectorAll('.workout-content');
  if (toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        workoutContents.forEach(content => {
          if (content.id === target) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });
  }

  // Country Selector (Footer)
  const countrySelect = document.getElementById('country-select');
  if (countrySelect) {
    // A simple mock for country selection interaction
    countrySelect.addEventListener('change', (e) => {
      console.log('Country changed to: ' + e.target.value);
    });
  }
});