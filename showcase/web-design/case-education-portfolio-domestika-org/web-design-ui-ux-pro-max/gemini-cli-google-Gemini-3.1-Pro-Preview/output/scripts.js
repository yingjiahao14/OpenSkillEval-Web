document.addEventListener('DOMContentLoaded', () => {

  // 1. Promotional Banner Dismissal
  const banner = document.getElementById('promo-banner');
  const dismissBtn = document.getElementById('close-banner');
  if (banner && dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
    });
  }

  // 2. Carousel Functionality
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.btn-prev');
    const nextBtn = carousel.querySelector('.btn-next');

    if (track && prevBtn && nextBtn) {
      const scrollAmount = () => track.clientWidth > 768 ? track.clientWidth / 2 : track.clientWidth;
      
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
      
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    }
  });

  // 3. Plus Pricing Toggle
  const pricingToggleWrap = document.getElementById('pricing-toggle-wrap');
  const priceDisplayAmount = document.getElementById('price-amount');
  const billingInfo = document.getElementById('billing-info');
  const creditsInfo = document.getElementById('credits-info');

  if (pricingToggleWrap) {
    pricingToggleWrap.addEventListener('click', () => {
      const isMonthly = pricingToggleWrap.classList.contains('monthly');
      
      if (isMonthly) {
        // Switch to Yearly
        pricingToggleWrap.classList.remove('monthly');
        priceDisplayAmount.innerHTML = '$14.59<span>/month</span>';
        billingInfo.textContent = 'Billed as $174.50/year. Cancel anytime.';
        creditsInfo.textContent = '12 annual credits';
      } else {
        // Switch to Monthly
        pricingToggleWrap.classList.add('monthly');
        priceDisplayAmount.innerHTML = '$33.90<span>/month</span>';
        billingInfo.textContent = 'Billed as $33.90/month. Cancel anytime.';
        creditsInfo.textContent = '1 credit per month';
      }
    });
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close others (optional)
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      // Toggle current
      item.classList.toggle('active');
    });
  });

  // 5. Course Filtering (Sidebar)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card-wrapper'); // Wrapper needed if grid items

  if (filterBtns.length > 0 && courseCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');

        courseCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
          } else {
            const categories = card.getAttribute('data-category');
            if (categories && categories.includes(filterValue)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // 6. Project Filtering (Masonry)
  const projectFilters = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  if (projectFilters.length > 0 && projectCards.length > 0) {
    projectFilters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        projectFilters.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
          } else {
            const fields = card.getAttribute('data-field');
            if (fields && fields.includes(filterValue)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // 7. Password Visibility Toggle
  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
    });
  }

  // 8. Footer Mobile Accordion
  const footerCols = document.querySelectorAll('.footer-col h3');
  if (window.innerWidth <= 768) {
    footerCols.forEach(col => {
      col.addEventListener('click', () => {
        col.parentElement.classList.toggle('active');
      });
    });
  }

});