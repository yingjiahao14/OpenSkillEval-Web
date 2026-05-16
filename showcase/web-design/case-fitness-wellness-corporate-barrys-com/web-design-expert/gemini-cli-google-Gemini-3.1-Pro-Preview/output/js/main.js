document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu (optional placeholder)
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      if(navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'rgba(0,0,0,0.9)';
        navLinks.style.padding = '1rem';
      }
    });
  }

  // 2. Carousel Interaction (Home)
  const track = document.getElementById('carousel-track');
  if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');
    let currentIndex = 0;
    
    // Set initial track position
    function updateCarousel() {
      // Each slide is 80% width + some padding. We want active slide centered.
      // Easiest is to transform based on index and screen width.
      const slideWidth = slides[0].getBoundingClientRect().width;
      // move track left by slideWidth * index
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      slides.forEach((slide, i) => {
        if(i === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    }

    if(nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      });
      
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    // Basic swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50 && currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
      }
      if (touchEndX - touchStartX > 50 && currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    // Initial call
    // Set timeout to ensure CSS is applied
    setTimeout(updateCarousel, 100);
    window.addEventListener('resize', updateCarousel);
  }

  // 3. Floor vs Treadmill Toggle (The Workout)
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const togglePanes = document.querySelectorAll('.toggle-content-pane');
  
  if (toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        // Update buttons
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update panes
        togglePanes.forEach(pane => {
          if(pane.id === targetId) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
  }

  // 4. Instructor Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorCards = document.querySelectorAll('.instructor-card');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        instructorCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-location') === filterValue) {
            card.classList.remove('d-none');
          } else {
            card.classList.add('d-none');
          }
        });
      });
    });
  }

  // 5. FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        accordionItems.forEach(acc => acc.classList.remove('active'));
        
        // Open clicked if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // 6. Newsletter Validation
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const msg = document.getElementById('newsletter-msg');
      const email = input.value.trim();
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailRegex.test(email)) {
        msg.textContent = 'Success! You are now subscribed.';
        msg.className = 'newsletter-msg success';
        input.value = '';
      } else {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'newsletter-msg error';
      }
    });
  }

  // 7. Country Selector
  const countrySelect = document.getElementById('country-select-footer');
  if (countrySelect) {
    countrySelect.addEventListener('change', (e) => {
      console.log('Country changed to: ', e.target.value);
      // In a real app, this might redirect or reload with locale settings.
    });
  }
});