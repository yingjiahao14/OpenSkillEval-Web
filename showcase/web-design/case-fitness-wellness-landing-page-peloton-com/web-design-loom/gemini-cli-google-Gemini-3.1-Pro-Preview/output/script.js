document.addEventListener('DOMContentLoaded', () => {
  // Tabs Interactivity
  const tabGroups = document.querySelectorAll('.tabs-container');
  tabGroups.forEach(group => {
    const tabBtns = group.querySelectorAll('.tab-btn');
    const tabContents = group.querySelectorAll('.tab-content');

    tabBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active to current
        btn.classList.add('active');
        if(tabContents[index]) {
          tabContents[index].classList.add('active');
        }
      });
    });
  });

  // Accordion Interactivity
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        // close others (optional, depending on UX. The prompt said "other panels collapse")
        accordions.forEach(otherAcc => {
          if (otherAcc !== this) {
            otherAcc.classList.remove('active');
            otherAcc.nextElementSibling.style.maxHeight = null;
          }
        });
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Carousel Interactivity
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const contents = [
      { text: `"WellStream cut our reporting cycle from days to minutes. We finally have one source of truth."`, author: "VP Operations, Mid-Continent E&P" },
      { text: `"Implementation was seamless. The team had us live in under four weeks."`, author: "Data Manager, Permian Basin Operator" },
      { text: `"The mobile app changed how our field teams capture data—no more paper tickets."`, author: "Completions Engineer, Rockies Operator" }
    ];
    let currentIndex = 0;
    const contentEl = carousel.querySelector('.carousel-content');
    const authorEl = carousel.querySelector('.carousel-author');
    const dots = carousel.querySelectorAll('.dot');

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    function updateCarousel() {
      contentEl.textContent = contents[currentIndex].text;
      authorEl.textContent = contents[currentIndex].author;
      dots.forEach(d => d.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }
  }

  // Cookie Banner Interactivity
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    if (!localStorage.getItem('cookieConsent')) {
      cookieBanner.style.display = 'block';
    }
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    if(acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.style.display = 'none';
      });
    }
    if(declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.style.display = 'none';
      });
    }
  }

  // Form Validation
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation (assume required attributes catch empties)
      alert('Thank you! Your demo request has been submitted successfully.');
      demoForm.reset();
    });
  }
});
