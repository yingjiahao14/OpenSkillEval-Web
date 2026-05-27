document.addEventListener('DOMContentLoaded', () => {

  // Promotional Banner Dismiss
  const banner = document.getElementById('promo-banner');
  const closeBannerBtn = document.getElementById('close-banner');
  if (banner && closeBannerBtn) {
    closeBannerBtn.addEventListener('click', () => {
      banner.classList.add('dismissed');
    });
  }

  // Generic Carousel Logic
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(container => {
    const track = container.querySelector('.carousel-track, .hero-track');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    if (!track || (!prevBtn && !nextBtn)) return;

    let index = 0;
    const items = track.children;
    const itemWidth = items[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const moveAmount = itemWidth + gap;
    const visibleItems = Math.floor(container.getBoundingClientRect().width / moveAmount) || 1;
    const maxIndex = items.length - visibleItems;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${index * moveAmount}px)`;
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (index < maxIndex) {
          index++;
          updateCarousel();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (index > 0) {
          index--;
          updateCarousel();
        }
      });
    }

    // Handle resize
    window.addEventListener('resize', () => {
      index = 0;
      updateCarousel();
    });
  });

  // Footer Mobile Accordion
  const footerCols = document.querySelectorAll('.footer-col h4');
  if (window.innerWidth <= 768) {
    footerCols.forEach(col => {
      col.addEventListener('click', () => {
        const parent = col.parentElement;
        parent.classList.toggle('active');
      });
    });
  }

  // Plus Page: Pricing Toggle
  const pricingTabs = document.querySelectorAll('.pricing-tab');
  const yearlyPrice = document.getElementById('yearly-price');
  const monthlyPrice = document.getElementById('monthly-price');
  if (pricingTabs.length > 0 && yearlyPrice && monthlyPrice) {
    pricingTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Remove active class
        pricingTabs.forEach(t => t.classList.remove('btn-primary'));
        pricingTabs.forEach(t => t.classList.add('btn-outline'));
        
        // Add active class to clicked
        const clicked = e.target;
        clicked.classList.remove('btn-outline');
        clicked.classList.add('btn-primary');

        // Toggle visibility
        if (clicked.dataset.plan === 'yearly') {
          yearlyPrice.classList.remove('hidden');
          monthlyPrice.classList.add('hidden');
        } else {
          yearlyPrice.classList.add('hidden');
          monthlyPrice.classList.remove('hidden');
        }
      });
    });
  }

  // Plus Page: FAQ Accordion
  const faqItems = document.querySelectorAll('.accordion-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        faqItems.forEach(faq => faq.classList.remove('active'));
        // Open clicked if not previously active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Courses Page: Sidebar Filtering (Visual Mock)
  const filterLinks = document.querySelectorAll('.filter-link');
  const courseCards = document.querySelectorAll('.course-card');
  if (filterLinks.length > 0) {
    filterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active state in sidebar
        filterLinks.forEach(l => l.style.fontWeight = 'normal');
        filterLinks.forEach(l => l.style.color = 'inherit');
        e.target.style.fontWeight = '700';
        e.target.style.color = 'var(--primary)';

        const category = e.target.dataset.category;
        
        // Filter cards (basic implementation for demo)
        courseCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Projects Page: Sort and Filter (Visual Mock)
  const projectFilters = document.querySelectorAll('.project-filter');
  const masonryItems = document.querySelectorAll('.masonry-item');
  if (projectFilters.length > 0) {
    projectFilters.forEach(filter => {
      filter.addEventListener('change', (e) => {
        // Randomly shuffle or hide elements to mock filtering behavior
        masonryItems.forEach(item => {
          // just simulating state change
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
            // Randomly order them
            item.style.order = Math.floor(Math.random() * 10);
          }, 300);
        });
      });
    });
  }

  // Login Page: Password Toggle
  const togglePassword = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password-input');
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });
  }

});