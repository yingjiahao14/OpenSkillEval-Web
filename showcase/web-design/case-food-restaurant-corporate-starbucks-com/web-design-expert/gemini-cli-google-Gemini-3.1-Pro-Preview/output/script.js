document.addEventListener('DOMContentLoaded', () => {
  // Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAgreeBtn = document.getElementById('cookie-agree');
  
  if (cookieBanner && cookieAgreeBtn) {
    cookieAgreeBtn.addEventListener('click', () => {
      cookieBanner.style.display = 'none';
    });
  }

  // Footer Accordion (Mobile)
  const footerHeadings = document.querySelectorAll('.footer-col h3');
  footerHeadings.forEach(heading => {
    heading.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        heading.parentElement.classList.toggle('expanded');
      }
    });
  });

  // Rewards Tier Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // Carousel Next/Prev logic
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    if (track && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -300, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });

  // Store Locator Filter Toggle
  const filterBtn = document.getElementById('filter-btn');
  const filterPanel = document.getElementById('filter-panel');
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
    });
  }

  // Store Locator Order Type Toggle
  const typeBtns = document.querySelectorAll('.type-btn');
  if (typeBtns.length > 0) {
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // A real app would filter results here
      });
    });
  }

  // Store Locator Search
  const searchInput = document.getElementById('store-search');
  const searchSuggestions = document.getElementById('search-suggestions');
  if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', (e) => {
      if (e.target.value.length > 2) {
        searchSuggestions.style.display = 'block';
      } else {
        searchSuggestions.style.display = 'none';
      }
    });
  }
});
