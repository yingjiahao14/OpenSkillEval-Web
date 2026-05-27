document.addEventListener('DOMContentLoaded', () => {

  // 1. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const answerInner = item.querySelector('.faq-answer-inner');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answerInner.scrollHeight + 'px';
      }
    });
  });

  // 2. Course Category Tabs Logic (Simulation)
  const courseTabs = document.querySelectorAll('.course-tab');
  const courseCards = document.querySelectorAll('.course-card');
  
  courseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      courseTabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');
      
      const category = tab.dataset.category;
      
      // Simple visual transition simulation for filtering
      courseCards.forEach(card => {
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.98)';
      });
      
      setTimeout(() => {
        courseCards.forEach(card => {
          const cardCat = card.dataset.category;
          
          if (category === 'All' || category === 'Featured') {
            card.style.display = 'flex';
          } else {
            // Since we only have static demo data, we randomly show/hide to simulate filtering
            // In a real app, this would match `cardCat === category`
            const shouldShow = Math.random() > 0.3; 
            card.style.display = shouldShow ? 'flex' : 'none';
          }
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        });
      }, 200);
    });
  });

  // 3. Hero Sign-up buttons logic
  const googleBtn = document.getElementById('signup-google');
  const emailBtn = document.getElementById('signup-email');

  if (googleBtn) {
    googleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Interaction [hero-signup-google]: Initiating Google OAuth flow...');
      alert('Initiating Google sign-up flow...');
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Interaction [hero-signup-email]: Opening email sign-up modal...');
      alert('Opening email sign-up form...');
    });
  }

  // 4. Header interactions
  const authLinks = document.querySelectorAll('header a[href="#"]');
  authLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const text = e.target.textContent;
      console.log(`Navigation triggered: ${text}`);
      if(text.includes('Sign In') || text.includes('Sign Up')) {
        alert(`${text} modal opened.`);
      }
    });
  });

  // 5. Duplicate Marquee content for seamless scroll
  const marquee = document.querySelector('.marquee-content');
  if (marquee) {
    const clone = marquee.cloneNode(true);
    // Move all items from clone to original marquee to make it double length
    Array.from(clone.children).forEach(child => {
      marquee.appendChild(child);
    });
  }
});
