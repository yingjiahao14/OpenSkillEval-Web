document.addEventListener('DOMContentLoaded', () => {

  // 1. Floor vs Treadmill Toggle
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  if (toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        
        // Remove active class from all buttons and contents
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.toggle-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and target content
        e.target.classList.add('active');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // 2. Instructor Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const instructorCards = document.querySelectorAll('.instructor-card');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');

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

  // 3. Carousel
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');

  if (track && slides.length > 0) {
    let currentIndex = 0;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Optional: Swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    track.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) { currentIndex = (currentIndex + 1) % slides.length; updateCarousel(); }
      else if (endX - startX > 50) { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateCarousel(); }
    });
  }

  // 4. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const isActive = question.classList.contains('active');
        
        // Close all
        faqQuestions.forEach(q => {
          q.classList.remove('active');
          q.nextElementSibling.style.maxHeight = null;
        });

        // Open if wasn't active
        if (!isActive) {
          question.classList.add('active');
          const answer = question.nextElementSibling;
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  // 5. Newsletter Validation
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email-input').value;
      const msgArea = document.getElementById('form-msg');
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailRegex.test(emailInput)) {
        msgArea.textContent = 'Thanks for subscribing! Check your inbox.';
        msgArea.style.color = '#4CAF50'; // Green
        newsletterForm.reset();
      } else {
        msgArea.textContent = 'Please enter a valid email address.';
        msgArea.style.color = 'var(--primary-red)';
      }
    });
  }
});
