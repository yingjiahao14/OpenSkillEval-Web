document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '80px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(17,17,17,0.95)';
      navLinks.style.padding = '2rem';
    });
  }

  // Newsletter Validation
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const message = form.querySelector('.form-message');
      
      if (!input.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        message.textContent = 'Please enter a valid email address.';
        message.className = 'form-message error';
      } else {
        message.textContent = 'Thank you for subscribing!';
        message.className = 'form-message success';
        input.value = '';
      }
    });
  });

  // Carousel
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  
  if (track && slides.length > 0) {
    let currentIndex = 0;
    
    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    
    nextBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
    
    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Simple swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }
      if (touchEndX - touchStartX > 50) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      }
    }, {passive: true});
  }

  // Workout Toggle
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const toggleContents = document.querySelectorAll('.toggle-content');
  if (toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        toggleBtns.forEach(b => b.classList.remove('active'));
        toggleContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // Instructor Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorItems = document.querySelectorAll('.instructor-item');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        instructorItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-location') === filterValue) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Single open behavior
        faqItems.forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
});
