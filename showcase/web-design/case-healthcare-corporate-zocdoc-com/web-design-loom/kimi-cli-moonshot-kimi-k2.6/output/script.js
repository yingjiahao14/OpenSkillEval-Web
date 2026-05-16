/**
 * MedBook — Corporate Landing Page Interactions
 */

(function () {
  'use strict';

  // ========================================
  // Mobile Navigation
  // ========================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openMobileNav() {
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileNavOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus first link for accessibility
    const firstLink = mobileNav.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMobileNav() {
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNavOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    mobileMenuToggle.focus();
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileNav);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMobileNav();
    }
  });

  // Close mobile nav when clicking a link
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileNav();
    });
  });

  // ========================================
  // Search Autocomplete
  // ========================================
  const searchInput = document.getElementById('searchInput');
  const searchSuggestions = document.getElementById('searchSuggestions');

  const suggestionsData = [
    { text: 'Dentist', type: 'Specialty' },
    { text: 'Primary Care', type: 'Specialty' },
    { text: 'Dermatologist', type: 'Specialty' },
    { text: 'Psychiatrist', type: 'Specialty' },
    { text: 'Eye Doctor', type: 'Specialty' },
    { text: 'Orthopedic Surgeon', type: 'Specialty' },
    { text: 'Back pain', type: 'Condition' },
    { text: 'Annual physical', type: 'Condition' },
    { text: 'Teeth cleaning', type: 'Condition' },
    { text: 'Skin rash', type: 'Condition' },
    { text: 'Anxiety', type: 'Condition' },
    { text: 'Vision exam', type: 'Condition' },
    { text: 'Dr. Sarah Chen', type: 'Doctor' },
    { text: 'Dr. Michael Torres', type: 'Doctor' },
    { text: 'Dr. Emily Park', type: 'Doctor' },
  ];

  let activeSuggestionIndex = -1;

  function renderSuggestions(query) {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) {
      searchSuggestions.hidden = true;
      searchInput.setAttribute('aria-expanded', 'false');
      return;
    }

    const filtered = suggestionsData.filter(function (item) {
      return item.text.toLowerCase().includes(lowerQuery);
    });

    if (filtered.length === 0) {
      searchSuggestions.hidden = true;
      searchInput.setAttribute('aria-expanded', 'false');
      return;
    }

    searchSuggestions.innerHTML = filtered
      .slice(0, 6)
      .map(function (item, index) {
        const highlighted = item.text.replace(
          new RegExp('(' + escapeRegex(lowerQuery) + ')', 'gi'),
          '<strong>$1</strong>'
        );
        return (
          '<li role="option" data-index="' +
          index +
          '" tabindex="-1">' +
          highlighted +
          ' <span style="color:#98A2B3;font-size:12px;margin-left:4px;">' +
          item.type +
          '</span></li>'
        );
      })
      .join('');

    searchSuggestions.hidden = false;
    searchInput.setAttribute('aria-expanded', 'true');
    activeSuggestionIndex = -1;
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', function () {
      renderSuggestions(searchInput.value);
    });

    searchInput.addEventListener('keydown', function (e) {
      const items = searchSuggestions.querySelectorAll('li');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeSuggestionIndex = Math.min(activeSuggestionIndex + 1, items.length - 1);
        updateActiveSuggestion(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeSuggestionIndex = Math.max(activeSuggestionIndex - 1, -1);
        updateActiveSuggestion(items);
      } else if (e.key === 'Enter') {
        if (activeSuggestionIndex >= 0 && items[activeSuggestionIndex]) {
          e.preventDefault();
          const text = items[activeSuggestionIndex].childNodes[0].textContent.trim();
          searchInput.value = text;
          searchSuggestions.hidden = true;
          searchInput.setAttribute('aria-expanded', 'false');
        }
      } else if (e.key === 'Escape') {
        searchSuggestions.hidden = true;
        searchInput.setAttribute('aria-expanded', 'false');
        activeSuggestionIndex = -1;
      }
    });

    searchSuggestions.addEventListener('click', function (e) {
      const li = e.target.closest('li');
      if (li) {
        const text = li.childNodes[0].textContent.trim();
        searchInput.value = text;
        searchSuggestions.hidden = true;
        searchInput.setAttribute('aria-expanded', 'false');
        searchInput.focus();
      }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', function (e) {
      if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.hidden = true;
        searchInput.setAttribute('aria-expanded', 'false');
        activeSuggestionIndex = -1;
      }
    });
  }

  function updateActiveSuggestion(items) {
    items.forEach(function (item, index) {
      if (index === activeSuggestionIndex) {
        item.setAttribute('aria-selected', 'true');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.removeAttribute('aria-selected');
      }
    });
  }

  // ========================================
  // Insurance Dropdown
  // ========================================
  const insuranceInput = document.getElementById('insuranceInput');
  const insuranceSuggestions = document.getElementById('insuranceSuggestions');

  const insurancePlans = [
    'Aetna',
    'Blue Cross Blue Shield',
    'Cigna',
    'UnitedHealthcare',
    'Humana',
    'Kaiser Permanente',
    'Medicare',
    'Medicaid',
    'Oscar Health',
    'Anthem',
  ];

  let activeInsuranceIndex = -1;

  function renderInsuranceDropdown() {
    insuranceSuggestions.innerHTML = insurancePlans
      .map(function (plan, index) {
        return '<li role="option" data-index="' + index + '" tabindex="-1">' + plan + '</li>';
      })
      .join('');
    insuranceSuggestions.hidden = false;
    insuranceInput.setAttribute('aria-expanded', 'true');
    activeInsuranceIndex = -1;
  }

  if (insuranceInput && insuranceSuggestions) {
    insuranceInput.addEventListener('click', function () {
      if (insuranceSuggestions.hidden) {
        renderInsuranceDropdown();
      } else {
        insuranceSuggestions.hidden = true;
        insuranceInput.setAttribute('aria-expanded', 'false');
      }
    });

    insuranceInput.addEventListener('keydown', function (e) {
      const items = insuranceSuggestions.querySelectorAll('li');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (insuranceSuggestions.hidden) {
          renderInsuranceDropdown();
          return;
        }
        activeInsuranceIndex = Math.min(activeInsuranceIndex + 1, items.length - 1);
        updateActiveSuggestion(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeInsuranceIndex = Math.max(activeInsuranceIndex - 1, -1);
        updateActiveSuggestion(items);
      } else if (e.key === 'Enter') {
        if (activeInsuranceIndex >= 0 && items[activeInsuranceIndex]) {
          e.preventDefault();
          insuranceInput.value = items[activeInsuranceIndex].textContent.trim();
          insuranceSuggestions.hidden = true;
          insuranceInput.setAttribute('aria-expanded', 'false');
        }
      } else if (e.key === 'Escape') {
        insuranceSuggestions.hidden = true;
        insuranceInput.setAttribute('aria-expanded', 'false');
        activeInsuranceIndex = -1;
      }
    });

    insuranceSuggestions.addEventListener('click', function (e) {
      const li = e.target.closest('li');
      if (li) {
        insuranceInput.value = li.textContent.trim();
        insuranceSuggestions.hidden = true;
        insuranceInput.setAttribute('aria-expanded', 'false');
        insuranceInput.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!insuranceInput.contains(e.target) && !insuranceSuggestions.contains(e.target)) {
        insuranceSuggestions.hidden = true;
        insuranceInput.setAttribute('aria-expanded', 'false');
        activeInsuranceIndex = -1;
      }
    });
  }

  // ========================================
  // Location Detect
  // ========================================
  const locationDetect = document.getElementById('locationDetect');
  const locationInput = document.getElementById('locationInput');

  if (locationDetect && locationInput) {
    locationDetect.addEventListener('click', function () {
      if (navigator.geolocation) {
        locationDetect.style.color = 'var(--color-primary)';
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // In a real app, reverse geocode here
            locationInput.value = 'Current Location';
            locationDetect.style.color = '';
          },
          function () {
            locationInput.value = '';
            locationDetect.style.color = '';
            alert('Unable to retrieve your location. Please enter it manually.');
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    });
  }

  // ========================================
  // Specialty Cards
  // ========================================
  const specialtyCards = document.querySelectorAll('.specialty-card');

  specialtyCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      const specialty = card.getAttribute('data-specialty');
      if (specialty && searchInput) {
        searchInput.value = specialty;
        searchInput.focus();
        // Scroll to search
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // Search Form Submit
  // ========================================
  const searchForm = document.getElementById('searchForm');

  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const q = searchInput ? searchInput.value.trim() : '';
      const loc = locationInput ? locationInput.value.trim() : '';
      const ins = insuranceInput ? insuranceInput.value.trim() : '';

      if (!q && !loc) {
        searchInput.focus();
        return;
      }

      // Build query params
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (loc) params.set('location', loc);
      if (ins) params.set('insurance', ins);

      // In a real app, navigate to search results
      alert('Searching for: ' + (q || 'all doctors') + (loc ? ' in ' + loc : '') + (ins ? ' with ' + ins : ''));
    });
  }

  // ========================================
  // Smooth scroll for anchor links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
