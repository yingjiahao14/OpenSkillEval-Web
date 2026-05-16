document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle (simple version)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(17, 17, 17, 0.95)';
        navLinks.style.padding = '1rem';
      }
    });
  }

  // Newsletter Validation
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const msg = form.querySelector('.newsletter-msg');
      if (input.value && input.value.includes('@')) {
        msg.style.display = 'block';
        msg.style.color = '#fff';
        msg.textContent = 'Thanks for subscribing! Check your inbox soon.';
        input.value = '';
      } else {
        msg.style.display = 'block';
        msg.style.color = '#ffcccc';
        msg.textContent = 'Please enter a valid email address.';
      }
    });
  });

  // Home Carousel
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  
  if (track && slides.length > 0) {
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    
    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    
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

    // Touch events for swipe
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });
    
    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
    });
    
    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      if (diffX > 50) {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      } else if (diffX < -50) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      }
    });
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
      });
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Floor vs Treadmill Toggle
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const toggleContents = document.querySelectorAll('.toggle-content');
  if (toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        toggleContents.forEach(content => {
          if (content.id === target) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });
  }

  // Instructor Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorCards = document.querySelectorAll('.instructor-card');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        instructorCards.forEach(card => {
          if (filter === 'all' || card.dataset.location === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
