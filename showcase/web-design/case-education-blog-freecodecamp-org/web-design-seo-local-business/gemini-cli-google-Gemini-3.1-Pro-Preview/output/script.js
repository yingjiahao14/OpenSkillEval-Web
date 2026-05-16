document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Load More Articles
  const loadMoreBtn = document.getElementById('load-more-btn');
  const articleGrid = document.getElementById('article-grid');
  
  if (loadMoreBtn && articleGrid) {
    loadMoreBtn.addEventListener('click', () => {
      const newCard = document.createElement('div');
      newCard.className = 'article-card';
      newCard.innerHTML = `
        <div class="thumbnail"></div>
        <div class="card-content">
          <a href="#" class="tag-label">#new</a>
          <h3><a href="#">Newly Loaded Article Example</a></h3>
          <div class="author-info">
            <div class="avatar"></div>
            <span class="author-name">John Doe</span>
            <span class="timestamp">Just now</span>
          </div>
        </div>
      `;
      articleGrid.appendChild(newCard);
    });
  }

  // Donation Amount Tabs
  const amountBtns = document.querySelectorAll('.amount-btn');
  const donationDesc = document.getElementById('donation-desc');
  const subLabelAmount = document.getElementById('sub-label-amount');
  
  if (amountBtns.length > 0 && donationDesc && subLabelAmount) {
    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const amount = btn.dataset.amount;
        donationDesc.textContent = `Your $${amount} donation will provide ${amount * 50} hours of learning to people around the world each month.`;
        subLabelAmount.textContent = `$${amount}`;
      });
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('open');
      });
    });
  }
});
