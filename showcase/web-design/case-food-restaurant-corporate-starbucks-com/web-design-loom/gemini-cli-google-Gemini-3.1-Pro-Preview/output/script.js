document.addEventListener('DOMContentLoaded', () => {
  // Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAgreeBtn = document.getElementById('cookie-agree');
  
  if (cookieBanner && cookieAgreeBtn) {
    // Check if already agreed in a real app, here we just handle the click
    cookieAgreeBtn.addEventListener('click', () => {
      cookieBanner.classList.add('hidden');
    });
  }

  // Footer Accordion (Mobile)
  const footerCols = document.querySelectorAll('.footer-col');
  footerCols.forEach(col => {
    const heading = col.querySelector('h3');
    if (heading) {
      heading.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          const isActive = col.classList.contains('active');
          footerCols.forEach(c => c.classList.remove('active'));
          if (!isActive) {
            col.classList.add('active');
          }
        }
      });
    }
  });

  // Rewards Tier Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // Carousels (Gift Cards)
  const carousels = document.querySelectorAll('.carousel-section');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    if (track && prevBtn && nextBtn) {
      let scrollAmount = 0;
      const scrollStep = 304; // card width (280) + gap (24)
      
      prevBtn.addEventListener('click', () => {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) scrollAmount = 0;
        track.style.transform = `translateX(-${scrollAmount}px)`;
      });
      
      nextBtn.addEventListener('click', () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        scrollAmount += scrollStep;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
        track.style.transform = `translateX(-${scrollAmount}px)`;
      });
    }
  });

  // Store Locator Interactivity
  const searchInput = document.getElementById('store-search');
  const filterBtn = document.getElementById('filter-btn');
  const filterPanel = document.getElementById('filter-panel');
  const orderToggles = document.querySelectorAll('.order-toggles button');
  const storeResults = document.getElementById('store-results');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      // Simulate search results filtering
      const val = e.target.value.toLowerCase();
      const results = storeResults.querySelectorAll('.store-result');
      results.forEach(result => {
        const text = result.textContent.toLowerCase();
        if (text.includes(val) || val === '') {
          result.style.display = 'block';
        } else {
          result.style.display = 'none';
        }
      });
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('active');
    });
  }

  if (orderToggles.length > 0) {
    orderToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        orderToggles.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Simulate changing results based on order type
        const type = btn.getAttribute('data-type');
        // Simple visual feedback
        storeResults.style.opacity = '0.5';
        setTimeout(() => {
          storeResults.style.opacity = '1';
        }, 200);
      });
    });
  }
});
