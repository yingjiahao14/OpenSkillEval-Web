document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Country Selector (Footer)
  const countryBtn = document.querySelector('.country-btn');
  const countryDropdown = document.querySelector('.country-dropdown');
  const currentCountry = document.querySelector('.current-country');
  
  if (countryBtn && countryDropdown) {
    countryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      countryDropdown.classList.toggle('active');
    });
    
    countryDropdown.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        if (currentCountry) {
          currentCountry.textContent = e.target.textContent;
        }
        countryDropdown.classList.remove('active');
      }
    });

    document.addEventListener('click', () => {
      countryDropdown.classList.remove('active');
    });
  }

  // Newsletter Form
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.input-field');
      const feedback = form.querySelector('.form-feedback');
      const email = input.value.trim();
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailRegex.test(email)) {
        feedback.textContent = 'Thanks for subscribing!';
        feedback.className = 'form-feedback success';
        input.value = '';
      } else {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'form-feedback error';
      }
    });
  });

  // Carousel
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    
    function updateCarousel() {
      carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateCarousel();
      });
      
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
      });
    }

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carouselContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
      }
      if (touchEndX > touchStartX + 50) {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateCarousel();
      }
    }
  }

  // Floor / Treadmill Toggle
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const toggleContents = document.querySelectorAll('.toggle-content');
  if (toggleBtns.length > 0 && toggleContents.length > 0) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        toggleBtns.forEach(b => b.classList.remove('active'));
        toggleContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // Instructor Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorCards = document.querySelectorAll('.instructor-card');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        instructorCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-location') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
        });
        
        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
});
