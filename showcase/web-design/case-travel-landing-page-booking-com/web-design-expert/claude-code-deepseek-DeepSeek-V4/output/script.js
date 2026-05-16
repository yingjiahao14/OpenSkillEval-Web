/* === STAYQUEST INTERACTIONS === */

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initTabs();
  initCarousels();
  initFAQ();
  initPackageRadios();
  initSearchForms();
  setActiveNav();
});

/* Mobile menu toggle */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.primary-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', function() {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', function(e) {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Tab switching - uses data-tab attribute on buttons and panels */
function initTabs() {
  document.querySelectorAll('.tabs-nav').forEach(function(tabNav) {
    const buttons = tabNav.querySelectorAll('.tab-btn');
    const container = tabNav.closest('[data-tabs]') || tabNav.parentElement;

    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        if (!tabId) return;

        // Update active button
        buttons.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        // Update active panel - search within the container
        const panels = container.querySelectorAll('.tab-panel');
        panels.forEach(function(panel) {
          panel.classList.remove('active');
          if (panel.getAttribute('data-tab') === tabId) {
            panel.classList.add('active');
          }
        });
      });
    });
  });
}

/* Carousel with arrow navigation */
function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(function(wrapper) {
    const carousel = wrapper.querySelector('.carousel');
    const leftArrow = wrapper.querySelector('.carousel-arrow--left');
    const rightArrow = wrapper.querySelector('.carousel-arrow--right');
    if (!carousel) return;

    function updateArrows() {
      if (!leftArrow || !rightArrow) return;
      var threshold = 4;
      leftArrow.disabled = carousel.scrollLeft <= threshold;
      rightArrow.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - threshold;
    }

    if (leftArrow) {
      leftArrow.addEventListener('click', function() {
        carousel.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }

    if (rightArrow) {
      rightArrow.addEventListener('click', function() {
        carousel.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }

    carousel.addEventListener('scroll', updateArrows);
    updateArrows();
    window.addEventListener('resize', updateArrows);
  });
}

/* FAQ accordion - one open at a time */
function initFAQ() {
  document.querySelectorAll('.faq-list').forEach(function(faqList) {
    const items = faqList.querySelectorAll('.faq-item');

    items.forEach(function(item) {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', function() {
        var isOpen = item.classList.contains('open');

        // Close all items
        items.forEach(function(i) { i.classList.remove('open'); });

        // Open clicked item if it wasn't already open
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  });
}

/* Package type radio buttons */
function initPackageRadios() {
  document.querySelectorAll('.package-type-option').forEach(function(option) {
    option.addEventListener('click', function() {
      var group = this.closest('.package-type-selector');
      if (!group) return;

      group.querySelectorAll('.package-type-option').forEach(function(o) {
        o.classList.remove('active');
      });

      this.classList.add('active');
      var radio = this.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
}

/* Search form handling */
function initSearchForms() {
  document.querySelectorAll('.search-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var destination = form.querySelector('[name="destination"]');
      var checkin = form.querySelector('[name="checkin"]');
      var checkout = form.querySelector('[name="checkout"]');

      if (destination && !destination.value.trim()) {
        destination.style.borderColor = 'var(--color-error)';
        destination.focus();
        setTimeout(function() { destination.style.borderColor = ''; }, 2000);
        return;
      }

      // Show brief feedback
      var feedback = document.createElement('div');
      feedback.style.cssText = 'text-align:center;color:var(--color-success);padding:12px;font-weight:600;font-size:14px;';
      feedback.textContent = '\u2713 Searching for the best deals...';
      form.appendChild(feedback);
      setTimeout(function() { feedback.remove(); }, 2500);
    });
  });
}

/* Set active nav link based on current page */
function setActiveNav() {
  var path = window.location.pathname;
  var page = 'home';

  if (path.indexOf('packages') > -1) page = 'packages';
  else if (path.indexOf('car-rental') > -1) page = 'car-rental';
  else if (path.indexOf('attractions') > -1) page = 'attractions';

  document.querySelectorAll('.primary-nav a[data-page]').forEach(function(link) {
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
    }
  });
}
