document.addEventListener('DOMContentLoaded', () => {
  // Promo banner toggle
  const promoBanner = document.querySelector('.promo-banner');
  const closePromoBtn = document.querySelector('.promo-banner .close-btn');
  if (closePromoBtn && promoBanner) {
    closePromoBtn.addEventListener('click', () => {
      promoBanner.style.display = 'none';
    });
  }

  // Mobile Footer Accordion
  const footerCols = document.querySelectorAll('.footer-col h4');
  footerCols.forEach(col => {
    col.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const parent = col.parentElement;
        parent.classList.toggle('active');
      }
    });
  });

  // Hero Carousel
  const heroInner = document.querySelector('.hero-carousel .carousel-inner');
  const heroPrev = document.querySelector('.hero-carousel .prev-btn');
  const heroNext = document.querySelector('.hero-carousel .next-btn');
  
  if (heroInner && heroPrev && heroNext) {
    let currentSlide = 0;
    const slidesCount = heroInner.children.length;
    
    const updateCarousel = () => {
      heroInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    heroNext.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slidesCount;
      updateCarousel();
    });

    heroPrev.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
      updateCarousel();
    });
  }

  // Course / Project Sorting & Filtering (Mock functionality)
  const filterSelects = document.querySelectorAll('.filter-select');
  if (filterSelects.length > 0) {
    filterSelects.forEach(select => {
      select.addEventListener('change', (e) => {
        // Mocking the visual update
        const grid = document.querySelector('.masonry-grid') || document.querySelector('.grid-cols-4');
        if (grid) {
          grid.style.opacity = '0.5';
          setTimeout(() => {
            grid.style.opacity = '1';
            // In a real app, this would re-render or re-order elements
          }, 300);
        }
      });
    });
  }
  
  // Courses Sidebar Filtering
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove('active', 'font-bold', 'text-dark'));
      link.classList.add('active', 'font-bold', 'text-dark');
      
      const grid = document.querySelector('.courses-layout .grid');
      if (grid) {
        grid.style.opacity = '0.5';
        setTimeout(() => {
          grid.style.opacity = '1';
        }, 300);
      }
    });
  });

  // Plus Pricing Tabs
  const pricingToggleBtns = document.querySelectorAll('.pricing-toggle button');
  if (pricingToggleBtns.length > 0) {
    pricingToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pricingToggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const type = btn.dataset.type;
        const priceElement = document.querySelector('.pricing-amount');
        const billedElement = document.querySelector('.pricing-billed');
        const creditsElement = document.querySelector('.pricing-credits');
        const savingsBadge = document.querySelector('.savings-badge');
        
        if (type === 'yearly') {
          priceElement.innerHTML = '$14.59<span class="text-xl font-normal text-gray">/month</span>';
          billedElement.textContent = 'Billed as $174.50/year';
          creditsElement.textContent = '12 Plus credits every year';
          if(savingsBadge) savingsBadge.style.display = 'inline-block';
        } else {
          priceElement.innerHTML = '$33.90<span class="text-xl font-normal text-gray">/month</span>';
          billedElement.textContent = 'Billed as $33.90/month';
          creditsElement.textContent = '1 Plus credit every month';
          if(savingsBadge) savingsBadge.style.display = 'none';
        }
      });
    });
  }

  // Plus FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.style.maxHeight;
      
      // Close all other answers
      document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.style.maxHeight = null;
      });
      document.querySelectorAll('.faq-question span:last-child').forEach(icon => {
        icon.textContent = '+';
      });

      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.querySelector('span:last-child').textContent = '-';
      }
    });
  });

  // Login Password Toggle
  const togglePassword = document.querySelector('.password-toggle');
  const passwordInput = document.querySelector('input[type="password"]');
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️'; // basic icon swap
    });
  }
});