document.addEventListener('DOMContentLoaded', () => {
  // Mega Menu Toggle
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Toggle current
      item.classList.toggle('active');
      
      // Close others
      navItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      e.stopPropagation();
    });
  });

  // Close mega menu when clicking outside
  document.addEventListener('click', () => {
    navItems.forEach(item => {
      item.classList.remove('active');
    });
  });

  // Prevent closing when clicking inside the mega menu
  const megaMenus = document.querySelectorAll('.mega-menu');
  megaMenus.forEach(menu => {
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Health Topics Carousel
  const topicsWrap = document.querySelector('.topics-carousel');
  const btnPrev = document.querySelector('.topics-prev');
  const btnNext = document.querySelector('.topics-next');
  
  if (topicsWrap && btnPrev && btnNext) {
    let scrollAmount = 0;
    const cardWidth = 192; // 160px width + 32px gap
    
    btnNext.addEventListener('click', () => {
      const maxScroll = topicsWrap.scrollWidth - topicsWrap.parentElement.clientWidth;
      scrollAmount += cardWidth * 2;
      if (scrollAmount > maxScroll) scrollAmount = maxScroll;
      topicsWrap.style.transform = `translateX(-${scrollAmount}px)`;
    });
    
    btnPrev.addEventListener('click', () => {
      scrollAmount -= cardWidth * 2;
      if (scrollAmount < 0) scrollAmount = 0;
      topicsWrap.style.transform = `translateX(-${scrollAmount}px)`;
    });
  }

  // Recommended Reads Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const readCards = document.querySelectorAll('.read-card');
  
  // All articles mapped to possible categories for filtering logic
  // For demo, we just randomly shuffle or show a subset to simulate loading different categories
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active tab
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Simulate grid update
      readCards.forEach(card => {
        card.style.opacity = '0.5';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 150);
      });
    });
  });

  // Newsletter Form
  const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input.value) {
        alert('Thank you for subscribing to WellSource!');
        input.value = '';
      }
    });
  });
});
