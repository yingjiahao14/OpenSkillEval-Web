document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function closeMobileMenu() {
    mobileNavDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', () => {
    mobileNavDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileOverlay.addEventListener('click', closeMobileMenu);
  
  // Close menu when a link is clicked
  const mobileLinks = mobileNavDrawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Modal Logic
  const donateBtns = document.querySelectorAll('.donate-trigger');
  const modal = document.getElementById('donate-modal');
  const modalClose = document.querySelector('.modal-close');
  const amtBtns = document.querySelectorAll('.amt-btn');

  function openModal(e) {
    if(e) e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  donateBtns.forEach(btn => btn.addEventListener('click', openModal));
  modalClose.addEventListener('click', closeModal);
  
  // Close modal on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Donation Amount Selection
  amtBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amtBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Accordion Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other accordions (optional, but good UX)
      document.querySelectorAll('.accordion-item').forEach(acc => {
        acc.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Carousel Logic
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (track && prevBtn && nextBtn) {
    const scrollAmount = 300; // arbitrary scroll amount
    
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Number Counter Animation for Impact Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateValue = (obj, start, end, duration, prefix = '', suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeProgress * (end - start) + start);
      
      obj.innerHTML = prefix + current.toLocaleString() + suffix;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = prefix + end.toLocaleString() + suffix;
      }
    };
    window.requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-target'), 10);
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        
        animateValue(target, 0, finalValue, 2000, prefix, suffix);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
});