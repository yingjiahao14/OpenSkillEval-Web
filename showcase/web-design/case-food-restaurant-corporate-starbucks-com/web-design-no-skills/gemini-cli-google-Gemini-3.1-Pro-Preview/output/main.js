document.addEventListener('DOMContentLoaded', () => {
  // Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const agreeBtn = document.getElementById('cookie-agree');
  
  if (cookieBanner && agreeBtn) {
    if (!localStorage.getItem('cookieConsent')) {
      cookieBanner.style.display = 'flex';
    } else {
      cookieBanner.style.display = 'none';
    }
    
    agreeBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  // Footer Accordion (Mobile)
  const footerHeaders = document.querySelectorAll('.footer-col h3');
  footerHeaders.forEach(header => {
    header.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        header.classList.toggle('active');
        const ul = header.nextElementSibling;
        if (ul) {
          ul.classList.toggle('active');
        }
      }
    });
  });

  // Rewards Tabs
  const rewardTabs = document.querySelectorAll('.reward-tab');
  const rewardContents = document.querySelectorAll('.reward-content');
  if (rewardTabs.length > 0) {
    rewardTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active from all
        rewardTabs.forEach(t => t.classList.remove('active'));
        rewardContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // Gift Card Carousels
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(container => {
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    const carousel = container.querySelector('.carousel');
    
    if (prevBtn && nextBtn && carousel) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });

  // Store Locator stubs
  const orderToggles = document.querySelectorAll('input[name="orderType"]');
  const storeList = document.getElementById('store-list');
  const searchInput = document.getElementById('store-search');
  
  if (orderToggles.length > 0 && storeList) {
    orderToggles.forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        // Just a stub for interaction
        const type = e.target.value;
        storeList.innerHTML = `<div class="store-item">
          <h4>GreenBean ${type === 'pickup' ? 'Pickup' : 'Delivery'} Hub</h4>
          <p>Results updated for ${type}.</p>
        </div>`;
      });
    });
  }
  
  if (searchInput && storeList) {
    searchInput.addEventListener('input', (e) => {
      if (e.target.value.length > 2) {
        storeList.innerHTML = `<div class="store-item">
          <h4>GreenBean ${e.target.value}</h4>
          <p>Open until 8:00 PM</p>
          <a href="#" class="btn btn-outline" style="padding: 5px 15px; margin-top: 10px;">Select</a>
        </div>`;
      }
    });
  }
});
