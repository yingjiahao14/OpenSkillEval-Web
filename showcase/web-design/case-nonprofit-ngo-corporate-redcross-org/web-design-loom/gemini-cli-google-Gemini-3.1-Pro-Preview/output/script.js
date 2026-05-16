/**
 * Global Aid Alliance - UI Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordion();
  initNewsCarousel();
  initDonateModal();
});

/* Mobile Navigation Drawer */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const drawer = document.getElementById('mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!toggleBtn || !drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Expose closeMenu globally if inline handlers need it
  window.closeMobileMenu = closeMenu;
}

/* Programs Accordion */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const contentId = header.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Optional: Close others (accordion behavior vs independent toggles)
      // For this implementation, allowing independent toggles to make it easier to read multiple.
      
      if (!isExpanded) {
        header.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
        // Set max-height for CSS transition
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        header.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        content.style.maxHeight = null;
      }
    });
  });
}

/* News Carousel */
let currentSlideIndex = 0;
function initNewsCarousel() {
  const track = document.getElementById('news-track');
  const cards = document.querySelectorAll('.news-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!track || cards.length === 0) return;

  function updateCarousel() {
    // Determine how many cards are visible based on container width vs card width
    // Simplified logic: adjust translation based on card width + gap
    if(cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth;
    // Get computed gap
    const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
    
    const moveAmount = (cardWidth + gap) * currentSlideIndex;
    track.style.transform = `translateX(-${moveAmount}px)`;
    
    // Update button states (disabled visual if at bounds)
    // Needs complex logic for varying viewport widths to know true "end", 
    // sticking to basic index bounds for prototype.
    const maxIndex = cards.length - 1; // Assuming 1 card view at minimum
    
    if (prevBtn) prevBtn.style.opacity = currentSlideIndex === 0 ? '0.5' : '1';
  }

  window.moveCarousel = function(direction) {
    const trackWidth = track.scrollWidth;
    const containerWidth = track.parentElement.offsetWidth;
    const maxScroll = trackWidth - containerWidth;
    
    if (direction === 1) { // Next
        currentSlideIndex++;
        // Don't scroll past the end
        if(currentSlideIndex >= cards.length) {
            currentSlideIndex = cards.length - 1;
        }
    } else { // Prev
        currentSlideIndex--;
        if(currentSlideIndex < 0) {
            currentSlideIndex = 0;
        }
    }
    
    updateCarousel();
  };
  
  // Handle resize to reset or recalculate bounds
  window.addEventListener('resize', () => {
    currentSlideIndex = 0;
    updateCarousel();
  });
  
  // Initial state
  if(prevBtn) prevBtn.style.opacity = '0.5';
}

/* Donate Modal & Dynamic Form */
function initDonateModal() {
  const modal = document.getElementById('donate-modal');
  
  window.openDonateModal = function() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    setTimeout(() => {
      const closeBtn = modal.querySelector('.modal-close');
      if(closeBtn) closeBtn.focus();
    }, 100);
  };
  
  window.closeDonateModal = function() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeDonateModal();
    }
  });
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeDonateModal();
    }
  });

  // Gift type toggle logic (styling active state)
  const giftTypeRadios = document.querySelectorAll('input[name="gift_type"]');
  giftTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.toggle-option').forEach(el => el.classList.remove('active'));
      if(e.target.checked) {
        e.target.closest('.toggle-option').classList.add('active');
      }
    });
  });

  // Impact description logic
  const impactMap = {
    '25': 'Provides 5 emergency blankets for displaced families.',
    '50': 'Supplies a family with food and water for one week.',
    '100': 'Funds emergency shelter materials for a household.',
    '250': 'Equips a volunteer with disaster response training.',
    'custom': 'Every dollar counts toward saving lives.'
  };

  const amountRadios = document.querySelectorAll('input[name="amount"]');
  const impactDesc = document.getElementById('impact-desc');
  
  amountRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if(e.target.checked && impactDesc) {
        impactDesc.textContent = impactMap[e.target.value] || impactMap['custom'];
      }
    });
  });
}
