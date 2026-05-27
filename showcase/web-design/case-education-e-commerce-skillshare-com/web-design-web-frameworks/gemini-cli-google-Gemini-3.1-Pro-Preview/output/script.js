document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-answer').style.maxHeight = null;
      });
      
      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Course Category Tabs Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      tabBtns.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      btn.classList.add('active');
      
      const category = btn.getAttribute('data-category');
      
      // Filter courses
      courseCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category').includes(category)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Hero Sign Up Buttons Interaction simulation
  const btnGoogle = document.querySelector('.btn-google');
  if (btnGoogle) {
    btnGoogle.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Initiating OAuth sign-up flow with Google...');
    });
  }

  const btnEmail = document.querySelector('.btn-email');
  if (btnEmail) {
    btnEmail.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Opening Email sign-up modal...');
    });
  }

  // Teacher Carousel Scroll indicators/affordance
  const teacherCarousel = document.querySelector('.teachers-carousel');
  if (teacherCarousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    teacherCarousel.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - teacherCarousel.offsetLeft;
      scrollLeft = teacherCarousel.scrollLeft;
    });
    teacherCarousel.addEventListener('mouseleave', () => {
      isDown = false;
    });
    teacherCarousel.addEventListener('mouseup', () => {
      isDown = false;
    });
    teacherCarousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - teacherCarousel.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      teacherCarousel.scrollLeft = scrollLeft - walk;
    });
  }
});