// Fresh Pantry - Interactions

document.addEventListener('DOMContentLoaded', () => {
  initProductCarousel();
  initStoreLocator();
  initNewsletter();
});

// Product Carousel
function initProductCarousel() {
  const track = document.getElementById('productTrack');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!track || !prevBtn || !nextBtn) return;

  const cardWidth = 280 + 24; // card width + gap
  let currentPosition = 0;
  const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;

  function updateButtons() {
    prevBtn.disabled = currentPosition <= 0;
    nextBtn.disabled = currentPosition >= maxScroll;
  }

  function slide(direction) {
    const containerWidth = track.parentElement.offsetWidth;
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const scrollAmount = cardWidth * visibleCards;

    if (direction === 'next') {
      currentPosition = Math.min(currentPosition + scrollAmount, maxScroll);
    } else {
      currentPosition = Math.max(currentPosition - scrollAmount, 0);
    }

    track.style.transform = `translateX(-${currentPosition}px)`;
    updateButtons();
  }

  prevBtn.addEventListener('click', () => slide('prev'));
  nextBtn.addEventListener('click', () => slide('next'));

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        slide('next');
      } else {
        slide('prev');
      }
    }
  }, { passive: true });

  // Initial button state
  updateButtons();

  // Update on resize
  window.addEventListener('resize', () => {
    const newMaxScroll = track.scrollWidth - track.parentElement.offsetWidth;
    if (currentPosition > newMaxScroll) {
      currentPosition = Math.max(0, newMaxScroll);
      track.style.transform = `translateX(-${currentPosition}px)`;
    }
    updateButtons();
  });
}

// Store Locator
function initStoreLocator() {
  const searchBtn = document.getElementById('searchBtn');
  const zipInput = document.getElementById('zipInput');
  const results = document.getElementById('storeResults');

  if (!searchBtn || !zipInput || !results) return;

  // Mock store data
  const stores = [
    {
      name: 'Fresh Pantry — Lincoln Park',
      address: '2140 N. Halsted St, Chicago, IL 60614',
      hours: '8am – 9pm Daily',
      distance: '0.8 mi'
    },
    {
      name: 'Fresh Pantry — Wicker Park',
      address: '1840 W. North Ave, Chicago, IL 60622',
      hours: '8am – 9pm Daily',
      distance: '1.4 mi'
    },
    {
      name: 'Fresh Pantry — Lakeview',
      address: '3745 N. Lincoln Ave, Chicago, IL 60613',
      hours: '8am – 9pm Daily',
      distance: '2.1 mi'
    }
  ];

  function displayResults() {
    results.innerHTML = stores.map(store => `
      <div class="store-result-card">
        <div class="store-name">${store.name}</div>
        <div class="store-info">
          <span class="store-address">${store.address}</span>
          <span class="store-hours">${store.hours}</span>
        </div>
        <span class="store-distance">${store.distance}</span>
      </div>
    `).join('');

    results.classList.add('active');
  }

  function handleSearch() {
    const zip = zipInput.value.trim();

    if (!zip) {
      zipInput.focus();
      return;
    }

    // Simulate search delay
    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;

    setTimeout(() => {
      searchBtn.textContent = 'Search';
      searchBtn.disabled = false;
      displayResults();
    }, 600);
  }

  searchBtn.addEventListener('click', handleSearch);

  zipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  // Only allow numbers in zip input
  zipInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
  });
}

// Newsletter Signup
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const confirmation = document.getElementById('newsletterConfirmation');

  if (!form || !confirmation) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();

    if (!email) return;

    // Get the submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      form.style.display = 'none';
      confirmation.classList.add('active');
    }, 800);
  });
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
  const nav = document.querySelector('.nav');

  mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});