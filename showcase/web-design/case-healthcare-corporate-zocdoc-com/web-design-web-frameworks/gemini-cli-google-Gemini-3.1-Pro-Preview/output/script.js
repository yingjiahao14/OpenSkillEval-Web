document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('ri-menu-line');
        icon.classList.add('ri-close-line');
      } else {
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
      }
    });
  }

  // Autocomplete functionality
  const searchInput = document.getElementById('specialty-search');
  const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
  const searchForm = document.getElementById('main-search-form');

  if (searchInput && autocompleteDropdown) {
    const suggestions = [
      { text: 'Dentist', icon: 'ri-tooth-line' },
      { text: 'Primary Care', icon: 'ri-stethoscope-line' },
      { text: 'Dermatologist', icon: 'ri-magic-line' },
      { text: 'Back pain', icon: 'ri-body-scan-line' },
      { text: 'Dr. Sarah Chen', icon: 'ri-user-smile-line' }
    ];

    searchInput.addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase();
      autocompleteDropdown.innerHTML = '';
      
      if (value.length > 0) {
        const filtered = suggestions.filter(s => s.text.toLowerCase().includes(value));
        
        if (filtered.length > 0) {
          filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'autocomplete-item';
            div.innerHTML = `<i class="${item.icon}"></i><span>${item.text}</span>`;
            div.addEventListener('click', () => {
              searchInput.value = item.text;
              autocompleteDropdown.classList.remove('active');
            });
            autocompleteDropdown.appendChild(div);
          });
          autocompleteDropdown.classList.add('active');
        } else {
          autocompleteDropdown.classList.remove('active');
        }
      } else {
        autocompleteDropdown.classList.remove('active');
      }
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-field')) {
        autocompleteDropdown.classList.remove('active');
      }
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Navigation interaction mock
      console.log('Search submitted');
      window.location.href = '#search-results';
    });
  }

  // Specialty Cards interaction
  const specialtyCards = document.querySelectorAll('.specialty-card');
  specialtyCards.forEach(card => {
    card.addEventListener('click', () => {
      // Navigation interaction mock
      console.log('Navigating to filtered search results for:', card.querySelector('h3').innerText);
      window.location.href = '#search-results';
    });
  });
});
