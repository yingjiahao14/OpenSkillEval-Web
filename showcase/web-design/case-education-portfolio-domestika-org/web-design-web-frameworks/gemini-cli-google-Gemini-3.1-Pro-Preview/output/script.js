
document.addEventListener('DOMContentLoaded', () => {
  // Dismiss Promo Banner
  const banner = document.getElementById('promo-banner');
  const closeBanner = document.getElementById('close-banner');
  if (closeBanner && banner) {
    closeBanner.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  // Countdown Timer
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    let hours = 23, minutes = 59, seconds = 59;
    setInterval(() => {
      seconds--;
      if (seconds < 0) { seconds = 59; minutes--; }
      if (minutes < 0) { minutes = 59; hours--; }
      countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }

  // Carousels
  const carousels = document.querySelectorAll('.carousel-wrapper');
  carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-arrow.prev');
    const nextBtn = wrapper.querySelector('.carousel-arrow.next');
    
    if (track && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        const item = track.querySelector('.carousel-item');
        const scrollAmount = item ? item.offsetWidth + 24 : 324;
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        const item = track.querySelector('.carousel-item');
        const scrollAmount = item ? item.offsetWidth + 24 : 324;
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });

  // Footer Accordion (Mobile)
  const footerHeaders = document.querySelectorAll('.footer-col h4');
  footerHeaders.forEach(header => {
    header.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const col = header.parentElement;
        col.classList.toggle('active');
        const icon = header.querySelector('i');
        if (col.classList.contains('active')) {
          icon.classList.replace('ri-add-line', 'ri-subtract-line');
        } else {
          icon.classList.replace('ri-subtract-line', 'ri-add-line');
        }
      }
    });
  });

  // Plus Pricing Toggle
  const toggleMonthly = document.getElementById('toggle-monthly');
  const toggleYearly = document.getElementById('toggle-yearly');
  const priceDisplay = document.getElementById('price-display');
  const billedDisplay = document.getElementById('billed-display');
  const savingsBadge = document.getElementById('savings-badge');
  const creditsText = document.getElementById('credits-text');

  if (toggleMonthly && toggleYearly) {
    toggleMonthly.addEventListener('click', () => {
      toggleMonthly.classList.replace('inactive', 'active');
      toggleYearly.classList.replace('active', 'inactive');
      priceDisplay.innerHTML = '$33.90<span>/month</span>';
      billedDisplay.textContent = 'Billed $33.90 monthly';
      savingsBadge.style.display = 'none';
      creditsText.innerHTML = '1 Plus credit every month';
    });

    toggleYearly.addEventListener('click', () => {
      toggleYearly.classList.replace('inactive', 'active');
      toggleMonthly.classList.replace('active', 'inactive');
      priceDisplay.innerHTML = '$14.59<span>/month</span>';
      billedDisplay.textContent = 'Billed as $174.50/year';
      savingsBadge.style.display = 'block';
      savingsBadge.textContent = 'SAVE 57%';
      creditsText.innerHTML = '12 Plus credits every year';
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.accordion-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Login Password Toggle
  const passToggle = document.getElementById('password-toggle');
  const passInput = document.getElementById('password');
  if (passToggle && passInput) {
    passToggle.addEventListener('click', () => {
      if (passInput.type === 'password') {
        passInput.type = 'text';
        passToggle.classList.replace('ri-eye-off-line', 'ri-eye-line');
      } else {
        passInput.type = 'password';
        passToggle.classList.replace('ri-eye-line', 'ri-eye-off-line');
      }
    });
  }
  
  // Login Form Submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulation: reset form
      loginForm.reset();
    });
  }

  // Sidebar Filtering (Simulation)
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  if (sidebarLinks.length > 0) {
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const grid = document.querySelector('.courses-grid');
        if(grid) {
          grid.style.opacity = '0.5';
          setTimeout(() => {
            grid.style.opacity = '1';
          }, 300);
        }
      });
    });
  }

  // Projects Filtering (Simulation)
  const projectFilters = document.querySelectorAll('.project-filters select');
  if (projectFilters.length > 0) {
    projectFilters.forEach(filter => {
      filter.addEventListener('change', () => {
        const grid = document.querySelector('.masonry-grid');
        if(grid) {
          grid.style.opacity = '0.5';
          setTimeout(() => {
            grid.style.opacity = '1';
          }, 300);
        }
      });
    });
  }
});
