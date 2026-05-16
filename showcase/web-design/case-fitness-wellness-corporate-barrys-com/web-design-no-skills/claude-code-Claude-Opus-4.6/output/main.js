// Mobile Nav Toggle
function toggleMobileNav() {
  var nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

// Carousel
var carouselIndex = 0;
var carouselTotal = 0;

function initCarousel() {
  var track = document.getElementById('carouselTrack');
  if (!track) return;
  var slides = track.querySelectorAll('.carousel-slide');
  carouselTotal = slides.length;
  var dotsContainer = document.getElementById('carouselDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (var i = 0; i < carouselTotal; i++) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.setAttribute('data-index', i);
      dot.addEventListener('click', function() {
        goToSlide(parseInt(this.getAttribute('data-index')));
      });
      dotsContainer.appendChild(dot);
    }
  }
}

function moveCarousel(dir) {
  carouselIndex += dir;
  if (carouselIndex < 0) carouselIndex = carouselTotal - 1;
  if (carouselIndex >= carouselTotal) carouselIndex = 0;
  updateCarousel();
}

function goToSlide(index) {
  carouselIndex = index;
  updateCarousel();
}

function updateCarousel() {
  var track = document.getElementById('carouselTrack');
  if (!track) return;
  track.style.transform = 'translateX(-' + (carouselIndex * 100) + '%)';
  var dots = document.querySelectorAll('.carousel-dot');
  dots.forEach(function(dot, i) {
    dot.classList.toggle('active', i === carouselIndex);
  });
}

// Touch/Swipe support for carousel
var touchStartX = 0;
var touchEndX = 0;

function initCarouselTouch() {
  var wrapper = document.querySelector('.carousel-wrapper');
  if (!wrapper) return;
  wrapper.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  wrapper.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      moveCarousel(diff > 0 ? 1 : -1);
    }
  }, { passive: true });
}

// Floor/Treadmill Toggle
function switchToggle(target, btn) {
  document.querySelectorAll('.toggle-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  document.querySelectorAll('.toggle-panel').forEach(function(panel) {
    panel.classList.remove('active');
  });
  var targetPanel = document.getElementById('panel-' + target);
  if (targetPanel) targetPanel.classList.add('active');
}

// Instructor Filter
function filterInstructors(location, btn) {
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  var cards = document.querySelectorAll('.instructor-card');
  cards.forEach(function(card) {
    if (location === 'all' || card.getAttribute('data-location') === location) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// FAQ Accordion (single-open)
function toggleFaq(button) {
  var item = button.parentElement;
  var isActive = item.classList.contains('active');

  document.querySelectorAll('.faq-item').forEach(function(faqItem) {
    faqItem.classList.remove('active');
  });

  if (!isActive) {
    item.classList.add('active');
  }
}

// Newsletter Form
function handleNewsletter(event) {
  event.preventDefault();
  var emailInput = document.getElementById('newsletterEmail');
  var msgEl = document.getElementById('newsletterMsg');
  var email = emailInput.value.trim();

  emailInput.classList.remove('error', 'success');
  msgEl.classList.remove('error', 'success');

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    emailInput.classList.add('error');
    msgEl.className = 'newsletter-msg error';
    msgEl.textContent = 'Please enter your email address.';
    return false;
  }

  if (!emailRegex.test(email)) {
    emailInput.classList.add('error');
    msgEl.className = 'newsletter-msg error';
    msgEl.textContent = 'Please enter a valid email address.';
    return false;
  }

  emailInput.classList.add('success');
  msgEl.className = 'newsletter-msg success';
  msgEl.textContent = 'You\'re in! Welcome to the RedRoom community.';
  emailInput.value = '';
  setTimeout(function() {
    emailInput.classList.remove('success');
  }, 3000);

  return false;
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initCarousel();
  initCarouselTouch();
});
