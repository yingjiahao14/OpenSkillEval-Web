document.addEventListener('DOMContentLoaded', () => {
  // 1. Mega Menu Toggle
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');
  const megaMenu = document.getElementById('mega-menu');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close others if open
      navItems.forEach(nav => {
        if (nav !== item) nav.classList.remove('active');
      });

      const isActive = item.classList.toggle('active');
      
      if (isActive) {
        megaMenu.classList.add('active');
      } else {
        megaMenu.classList.remove('active');
      }
    });
  });

  // Close mega menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
      navItems.forEach(nav => nav.classList.remove('active'));
      megaMenu.classList.remove('active');
    }
  });

  // 2. Health Topics Carousel
  const topicsCarousel = document.getElementById('topics-carousel');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');

  if (topicsCarousel && btnPrev && btnNext) {
    let scrollPosition = 0;
    const scrollAmount = 300; // pixels to scroll

    btnNext.addEventListener('click', () => {
      // Basic implementation - in reality we'd calculate max scroll
      const maxScroll = topicsCarousel.scrollWidth - topicsCarousel.clientWidth;
      if (scrollPosition < maxScroll) {
        scrollPosition += scrollAmount;
        if (scrollPosition > maxScroll) scrollPosition = maxScroll;
        topicsCarousel.style.transform = `translateX(-${scrollPosition}px)`;
      }
    });

    btnPrev.addEventListener('click', () => {
      if (scrollPosition > 0) {
        scrollPosition -= scrollAmount;
        if (scrollPosition < 0) scrollPosition = 0;
        topicsCarousel.style.transform = `translateX(-${scrollPosition}px)`;
      }
    });
  }

  // 3. Recommended Reads Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  // Using generic mock functionality for tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // In a real app we would filter or fetch articles here
      // For the prototype we just trigger a tiny opacity animation
      const articlesGrid = document.querySelector('.articles-grid');
      if (articlesGrid) {
        articlesGrid.style.opacity = '0';
        setTimeout(() => {
          articlesGrid.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 4. Newsletter Form
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      
      if (input.value) {
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Subscribed!';
        btn.classList.add('btn-primary');
        input.value = '';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('btn-primary');
        }, 3000);
      }
    });
  });
});
