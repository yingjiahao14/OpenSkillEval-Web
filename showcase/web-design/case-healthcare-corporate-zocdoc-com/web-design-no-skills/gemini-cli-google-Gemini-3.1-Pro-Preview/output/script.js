document.addEventListener('DOMContentLoaded', () => {
  // Mobile drawer toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const closeDrawerBtn = document.querySelector('.close-drawer');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileMenuToggle && closeDrawerBtn && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });

    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  // Search input autocomplete dropdown
  const searchQueryInput = document.getElementById('search-query');
  const autocompleteDropdown = document.querySelector('.autocomplete-dropdown');

  if (searchQueryInput && autocompleteDropdown) {
    searchQueryInput.addEventListener('input', (e) => {
      if (e.target.value.length > 0) {
        autocompleteDropdown.classList.add('active');
      } else {
        autocompleteDropdown.classList.remove('active');
      }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchQueryInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
        autocompleteDropdown.classList.remove('active');
      }
    });

    // Select an option
    const options = autocompleteDropdown.querySelectorAll('li');
    options.forEach(option => {
      option.addEventListener('click', () => {
        searchQueryInput.value = option.textContent;
        autocompleteDropdown.classList.remove('active');
      });
    });
  }

  // Form submission
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate navigation to search results
      console.log('Navigating to search results...');
    });
  }
});