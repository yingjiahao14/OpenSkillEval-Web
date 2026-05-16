/* ===== StayQuest Shared Scripts ===== */
(function() {
  'use strict';

  // ===== Tab System =====
  function initTabs(container) {
    if (!container) return;
    const tabs = container.querySelectorAll('[role="tab"]');
    const panels = container.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.setAttribute('aria-selected', 'false'); t.classList.remove('tab--active'); });
        panels.forEach(function(p) { p.classList.remove('tab-panel--active'); });

        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('tab--active');

        var panelId = tab.getAttribute('aria-controls');
        var panel = document.getElementById(panelId);
        if (panel) panel.classList.add('tab-panel--active');
      });
    });

    // Activate first tab if none active
    if (!container.querySelector('.tab--active') && tabs.length > 0) {
      tabs[0].click();
    }
  }

  // ===== Carousel =====
  function initCarousel(container) {
    if (!container) return;
    var viewport = container.querySelector('.carousel__viewport');
    var track = container.querySelector('.carousel__track');
    var prevBtn = container.querySelector('.carousel__nav--prev');
    var nextBtn = container.querySelector('.carousel__nav--next');
    if (!viewport || !track) return;

    var scrollAmount = 300;

    function updateButtons() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = viewport.scrollLeft <= 0;
      nextBtn.disabled = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        viewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        viewport.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    viewport.addEventListener('scroll', updateButtons);
    updateButtons();
    window.addEventListener('resize', updateButtons);
  }

  // ===== Accordion =====
  function initAccordion(container) {
    if (!container) return;
    var triggers = container.querySelectorAll('.accordion__trigger');

    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        var item = trigger.closest('.accordion__item');
        var isOpen = item.classList.contains('accordion__item--open');

        // Close all
        container.querySelectorAll('.accordion__item--open').forEach(function(openItem) {
          openItem.classList.remove('accordion__item--open');
        });

        // Open clicked (if wasn't already open)
        if (!isOpen) {
          item.classList.add('accordion__item--open');
        }
      });
    });
  }

  // ===== Mobile Menu =====
  function initMobileMenu() {
    var toggle = document.querySelector('.header__mobile-toggle');
    var nav = document.querySelector('.header__nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
      var isOpen = nav.classList.toggle('header__nav--open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!nav.classList.contains('header__nav--open')) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('header__nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== Package Type Radio =====
  function initPackageRadios() {
    var radios = document.querySelectorAll('.radio-option input[type="radio"]');
    var fieldsContainer = document.getElementById('package-fields');
    if (!radios.length || !fieldsContainer) return;

    var fieldConfigs = {
      'hotel-flight': '<div class="search-form__group"><label class="search-form__label">Destination</label><input type="text" class="search-form__input" placeholder="Where are you going?"></div><div class="search-form__group"><label class="search-form__label">Check-in</label><input type="date" class="search-form__input"></div><div class="search-form__group"><label class="search-form__label">Check-out</label><input type="date" class="search-form__input"></div><div class="search-form__group"><label class="search-form__label">Guests</label><select class="search-form__select"><option>2 adults</option><option>1 adult</option><option>3 adults</option><option>4 adults</option></select></div>',
      'hotel-flight-car': '<div class="search-form__group"><label class="search-form__label">Destination</label><input type="text" class="search-form__input" placeholder="Where are you going?"></div><div class="search-form__group"><label class="search-form__label">Check-in</label><input type="date" class="search-form__input"></div><div class="search-form__group"><label class="search-form__label">Check-out</label><input type="date" class="search-form__input"></div><div class="search-form__group"><label class="search-form__label">Pick-up location</label><input type="text" class="search-form__input" placeholder="Car pick-up location"></div>',
      'flight-car': '<div class="search-form__group"><label class="search-form__label">From</label><input type="text" class="search-form__input" placeholder="Departure city"></div><div class="search-form__group"><label class="search-form__label">To</label><input type="text" class="search-form__input" placeholder="Arrival city"></div><div class="search-form__group"><label class="search-form__label">Depart</label><input type="date" class="search-form__input"></div><div class="search-form__group"><label class="search-form__label">Pick-up location</label><input type="text" class="search-form__input" placeholder="Car pick-up location"></div>',
      'hotel-car': '<div class="search-form__group"><label class="search-form__label">Destination</label><input type="text" class="search-form__input" placeholder="Where are you going?"></div><div class="search-form__group"><label class="search-form__label">Check-in</label><input type="date" class="search-form__input"></div><div class="search-form__group"><label class="search-form__label">Check-out</label><input type="date" class="search-form__input"></div><div class="search-form__group"><label class="search-form__label">Pick-up location</label><input type="text" class="search-form__input" placeholder="Car pick-up location"></div>'
    };

    radios.forEach(function(radio) {
      radio.addEventListener('change', function() {
        if (this.checked && fieldConfigs[this.value]) {
          fieldsContainer.innerHTML = fieldConfigs[this.value] + '<button type="submit" class="btn btn--primary btn--lg">Search</button>';
        }
      });
    });
  }

  // ===== Search Form Submission =====
  function initSearchForms() {
    document.querySelectorAll('.search-form').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var destInput = form.querySelector('input[placeholder*="Where"]') || form.querySelector('input[placeholder*="Destination"]') || form.querySelector('input[placeholder*="Departure"]') || form.querySelector('input:first-of-type');
        var dest = destInput ? destInput.value.trim() : '';
        var btn = form.querySelector('button[type="submit"]');
        if (btn) {
          var origText = btn.textContent;
          btn.textContent = 'Searching...';
          btn.disabled = true;
          setTimeout(function() {
            btn.textContent = origText;
            btn.disabled = false;
            if (dest) {
              alert('Searching for: ' + dest + '\n\n(This is a demo — no real search is performed.)');
            } else {
              alert('Please enter a destination to search.');
            }
          }, 800);
        }
      });
    });
  }

  // ===== Checkbox/Date Fallback =====
  function initDateFields() {
    document.querySelectorAll('input[type="date"]').forEach(function(input) {
      if (!input.value) {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        input.value = yyyy + '-' + mm + '-' + dd;
      }
    });
  }

  // ===== Init all on DOM ready =====
  function init() {
    // Date defaults
    initDateFields();

    // Tabs
    document.querySelectorAll('.tabs-container').forEach(initTabs);

    // Carousels
    document.querySelectorAll('.carousel').forEach(initCarousel);

    // Accordions
    document.querySelectorAll('.accordion').forEach(initAccordion);

    // Mobile menu
    initMobileMenu();

    // Package radios
    initPackageRadios();

    // Search forms
    initSearchForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
