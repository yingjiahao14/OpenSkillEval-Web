document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Donate Amount Tabs
  const amountBtns = document.querySelectorAll('.amount-btn');
  const donateText = document.querySelector('#dynamic-donate-text');
  const donateBtnLabel = document.querySelector('#donate-btn-label');
  
  if (amountBtns.length > 0 && donateText) {
    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const amount = parseInt(btn.dataset.amount, 10);
        const hours = amount * 50; // Based on $20 = 1000 hours
        donateText.textContent = `Your $${amount} donation will provide ${hours.toLocaleString()} hours of learning to people around the world each month.`;
        if(donateBtnLabel) {
          donateBtnLabel.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
        }
      });
    });
  }

  // FAQ Accordion
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  if (accordionBtns.length > 0) {
    accordionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const isActive = content.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.accordion-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
        
        if (!isActive) {
          content.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // Load More Articles
  const loadMoreBtn = document.querySelector('#load-more-btn');
  const hiddenArticles = document.querySelectorAll('.article-card.hidden');
  if (loadMoreBtn && hiddenArticles.length > 0) {
    loadMoreBtn.addEventListener('click', () => {
      hiddenArticles.forEach(card => card.classList.remove('hidden'));
      loadMoreBtn.style.display = 'none'; // hide button after loading
    });
  }
});