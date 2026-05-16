/* ============================================================
   MedBook — Interactive Behaviors
   ============================================================ */

(function () {
  'use strict';

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // --- Mobile hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (mobileDrawer.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  drawerOverlay.addEventListener('click', closeMenu);

  var drawerLinks = mobileDrawer.querySelectorAll('a');
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // --- Search autocomplete ---
  var searchInput = document.getElementById('search-input');
  var dropdown = document.getElementById('autocomplete-dropdown');
  var allItems = dropdown.querySelectorAll('.autocomplete-item');
  var highlightedIndex = -1;

  var autocompleteData = [
    { group: 'Specialties', icon: '🩺', name: 'Primary Care', desc: 'Annual checkups and preventive care' },
    { group: 'Specialties', icon: '🦷', name: 'Dentist', desc: 'Cleanings, fillings, and oral health' },
    { group: 'Specialties', icon: '🧴', name: 'Dermatologist', desc: 'Skin conditions and cosmetic care' },
    { group: 'Specialties', icon: '🧠', name: 'Psychiatrist', desc: 'Mental health and medication management' },
    { group: 'Specialties', icon: '👁️', name: 'Eye Doctor', desc: 'Vision exams and eye health' },
    { group: 'Specialties', icon: '🦴', name: 'Orthopedic Surgeon', desc: 'Joint pain, fractures, sports injuries' },
    { group: 'Conditions', icon: '💊', name: 'Back pain', desc: 'Orthopedics, Physical Therapy' },
    { group: 'Conditions', icon: '💊', name: 'Anxiety', desc: 'Psychiatry, Therapy' },
    { group: 'Conditions', icon: '💊', name: 'Acne', desc: 'Dermatology' },
    { group: 'Conditions', icon: '💊', name: 'Headache', desc: 'Neurology, Primary Care' },
    { group: 'Doctors', icon: '👩‍⚕️', name: 'Dr. Sarah Chen', desc: 'Primary Care · 4.9 ★ · Midtown' },
    { group: 'Doctors', icon: '👨‍⚕️', name: 'Dr. James Patel', desc: 'Dentist · 4.8 ★ · Downtown' },
    { group: 'Doctors', icon: '👩‍⚕️', name: 'Dr. Lisa Wong', desc: 'Dermatology · 4.9 ★ · West Side' }
  ];

  function renderDropdown(query) {
    var q = query.toLowerCase().trim();
    if (q.length === 0) {
      dropdown.classList.remove('active');
      return;
    }

    var filtered = autocompleteData.filter(function (item) {
      return item.name.toLowerCase().indexOf(q) !== -1 ||
             item.desc.toLowerCase().indexOf(q) !== -1;
    });

    if (filtered.length === 0) {
      dropdown.classList.remove('active');
      return;
    }

    var html = '';
    var currentGroup = '';

    filtered.forEach(function (item, i) {
      if (item.group !== currentGroup) {
        currentGroup = item.group;
        html += '<div class="autocomplete-group-label">' + currentGroup + '</div>';
      }
      html += '<div class="autocomplete-item" role="option" data-value="' + item.name + '" data-index="' + i + '">' +
        '<div class="autocomplete-item-icon">' + item.icon + '</div>' +
        '<div class="autocomplete-item-text">' +
          '<strong>' + highlightMatch(item.name, q) + '</strong>' +
          '<span>' + item.desc + '</span>' +
        '</div></div>';
    });

    dropdown.innerHTML = html;
    dropdown.classList.add('active');
    highlightedIndex = -1;

    dropdown.querySelectorAll('.autocomplete-item').forEach(function (el) {
      el.addEventListener('mousedown', function (e) {
        e.preventDefault();
        searchInput.value = el.getAttribute('data-value');
        dropdown.classList.remove('active');
      });
    });
  }

  function highlightMatch(text, query) {
    var idx = text.toLowerCase().indexOf(query);
    if (idx === -1) return text;
    return text.substring(0, idx) +
           '<mark style="background:rgba(255,217,48,0.3);border-radius:2px;padding:0 1px">' +
           text.substring(idx, idx + query.length) + '</mark>' +
           text.substring(idx + query.length);
  }

  searchInput.addEventListener('input', function () {
    renderDropdown(this.value);
  });

  searchInput.addEventListener('focus', function () {
    if (this.value.trim().length > 0) {
      renderDropdown(this.value);
    }
  });

  searchInput.addEventListener('blur', function () {
    setTimeout(function () {
      dropdown.classList.remove('active');
    }, 150);
  });

  searchInput.addEventListener('keydown', function (e) {
    var items = dropdown.querySelectorAll('.autocomplete-item');
    if (!dropdown.classList.contains('active') || items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = Math.max(highlightedIndex - 1, 0);
      updateHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        searchInput.value = items[highlightedIndex].getAttribute('data-value');
        dropdown.classList.remove('active');
      }
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('active');
    }
  });

  function updateHighlight(items) {
    items.forEach(function (item, i) {
      if (i === highlightedIndex) {
        item.classList.add('highlighted');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('highlighted');
      }
    });
  }

  // --- Search form submission ---
  document.getElementById('search-btn').addEventListener('click', function () {
    var query = searchInput.value.trim();
    var location = document.getElementById('location-input').value.trim();
    var insurance = document.getElementById('insurance-select').value;
    if (query) {
      alert('Searching for "' + query + '"' +
            (location ? ' in ' + location : '') +
            (insurance ? ' with ' + insurance + ' insurance' : '') +
            '.\n\nIn a full implementation, this would navigate to search results.');
    } else {
      searchInput.focus();
    }
  });

  // --- Popular search tags ---
  document.querySelectorAll('.search-tag').forEach(function (tag) {
    tag.addEventListener('click', function () {
      searchInput.value = tag.getAttribute('data-search');
      searchInput.focus();
      renderDropdown(searchInput.value);
    });
  });

  // --- Specialty cards ---
  document.querySelectorAll('.specialty-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      var specialty = card.getAttribute('data-specialty');
      searchInput.value = specialty;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(function () {
        searchInput.focus();
        renderDropdown(specialty);
      }, 500);
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Animate elements on scroll ---
  var animatedElements = document.querySelectorAll(
    '.specialty-card, .step-card, .testimonial-card, .stat-card'
  );

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animatedElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

})();
