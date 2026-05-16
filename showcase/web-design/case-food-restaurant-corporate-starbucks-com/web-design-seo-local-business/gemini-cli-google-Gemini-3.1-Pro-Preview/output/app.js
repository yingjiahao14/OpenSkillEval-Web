document.addEventListener('DOMContentLoaded', () => {
  // Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAgreeBtn = document.getElementById('cookie-agree-btn');
  
  if (cookieBanner && cookieAgreeBtn) {
    if(!localStorage.getItem('cookies-agreed')) {
      cookieBanner.style.display = 'flex';
    } else {
      cookieBanner.style.display = 'none';
    }

    cookieAgreeBtn.addEventListener('click', () => {
      cookieBanner.style.display = 'none';
      localStorage.setItem('cookies-agreed', 'true');
    });
  }

  // Mobile Footer Accordion
  const footerCols = document.querySelectorAll('.footer-col h4');
  if (window.innerWidth <= 768) {
    footerCols.forEach(col => {
      col.addEventListener('click', () => {
        const parent = col.parentElement;
        parent.classList.toggle('expanded');
      });
    });
  }

  // Rewards Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active to current
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Gift Card Carousels
  const carousels = document.querySelectorAll('.gift-carousel-container');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    if(track && prevBtn && nextBtn) {
      let scrollPos = 0;
      const itemWidth = 274; // 250px + 24px gap

      nextBtn.addEventListener('click', () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        scrollPos = Math.min(scrollPos + itemWidth * 2, maxScroll);
        track.style.transform = `translateX(-${scrollPos}px)`;
      });

      prevBtn.addEventListener('click', () => {
        scrollPos = Math.max(scrollPos - itemWidth * 2, 0);
        track.style.transform = `translateX(-${scrollPos}px)`;
      });
    }
  });

  // Store Locator Interactivity
  const searchInput = document.getElementById('store-search');
  const storeList = document.getElementById('store-results-list');
  const orderTypeBtns = document.querySelectorAll('.toggle-btn');
  const filterBtn = document.getElementById('filter-btn');

  // Dummy stores
  const dummyStores = [
    { name: 'Surry Hills', address: '123 Espresso St, Surry Hills NSW 2010', type: 'pickup' },
    { name: 'Sydney CBD', address: '45 George St, Sydney NSW 2000', type: 'both' },
    { name: 'Bondi Junction', address: 'Westfield Bondi, NSW 2022', type: 'delivery' }
  ];

  if (storeList) {
    let currentType = 'pickup';

    const renderStores = (query = '') => {
      storeList.innerHTML = '';
      const filtered = dummyStores.filter(store => {
        const matchesQuery = store.name.toLowerCase().includes(query.toLowerCase()) || store.address.toLowerCase().includes(query.toLowerCase());
        const matchesType = store.type === 'both' || store.type === currentType;
        return matchesQuery && matchesType;
      });

      if(filtered.length === 0) {
        storeList.innerHTML = '<div class="store-item"><p>No stores found matching your criteria.</p></div>';
        return;
      }

      filtered.forEach(store => {
        const div = document.createElement('div');
        div.className = 'store-item';
        div.innerHTML = `<h4>GreenBean ${store.name}</h4><p>${store.address}</p><p>Hours: 6:00 AM - 6:00 PM</p>`;
        storeList.appendChild(div);
      });
    };

    renderStores();

    if(searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderStores(e.target.value);
      });
    }

    orderTypeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        orderTypeBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentType = e.target.getAttribute('data-type');
        renderStores(searchInput ? searchInput.value : '');
      });
    });

    if(filterBtn) {
      filterBtn.addEventListener('click', () => {
        alert('Filter options panel opened (prototype).');
      });
    }
  }
});
