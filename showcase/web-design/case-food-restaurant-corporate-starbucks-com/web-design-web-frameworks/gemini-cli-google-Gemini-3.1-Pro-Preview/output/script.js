document.addEventListener('DOMContentLoaded', () => {

  // 1. Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAgreeBtn = document.getElementById('cookie-agree');
  if (cookieBanner && cookieAgreeBtn) {
    cookieAgreeBtn.addEventListener('click', () => {
      cookieBanner.classList.add('hidden');
    });
  }

  // 2. Footer Accordion (Mobile)
  const footerCols = document.querySelectorAll('.footer-col');
  footerCols.forEach(col => {
    const heading = col.querySelector('h4');
    if (heading) {
      heading.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          col.classList.toggle('active');
        }
      });
    }
  });

  // 3. Rewards Tier Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (tabBtns.length > 0 && tabPanes.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // 4 & 5. Carousels (Featured and Categories)
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (track && prevBtn && nextBtn) {
      nextBtn.addEventListener('click', () => {
        const itemWidth = track.querySelector('.carousel-item').offsetWidth + 24; // width + gap
        track.scrollBy({ left: itemWidth, behavior: 'smooth' });
      });
      prevBtn.addEventListener('click', () => {
        const itemWidth = track.querySelector('.carousel-item').offsetWidth + 24;
        track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      });
    }
  });

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });

  // Store Locator Specifics
  const searchInput = document.getElementById('store-search');
  const orderTypeBtns = document.querySelectorAll('.toggle-btn');
  const filterBtn = document.getElementById('store-filter-btn');
  const mapPlaceholderText = document.getElementById('map-status-text');
  const resultsList = document.getElementById('store-results-list');

  // 6. Store Locator Search
  if (searchInput && mapPlaceholderText && resultsList) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if (query.length > 0) {
        mapPlaceholderText.textContent = `Showing results for "${query}"`;
        // In a real app we'd update resultsList here
      } else {
        mapPlaceholderText.textContent = 'Enter a location to see nearby stores';
      }
    });
  }

  // 7. Store Locator Filter
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      // Toggle a filter panel (just an alert for this prototype)
      alert('Filter options panel opened.');
    });
  }

  // 8. Store Locator Order Type Toggle
  if (orderTypeBtns.length > 0) {
    orderTypeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        orderTypeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Update results based on type
        if(mapPlaceholderText) {
           mapPlaceholderText.textContent = `Showing ${btn.textContent.trim()} options...`;
        }
      });
    });
  }

});
