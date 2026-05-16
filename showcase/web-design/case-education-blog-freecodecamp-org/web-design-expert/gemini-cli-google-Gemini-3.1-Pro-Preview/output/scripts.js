document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Donate Page: Amount Tabs
  const amountBtns = document.querySelectorAll('.amount-btn');
  const donationDesc = document.getElementById('donation-desc');
  const donateSub = document.getElementById('donate-sub');
  
  if (amountBtns.length > 0 && donationDesc && donateSub) {
    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        amountBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');
        
        const amount = btn.dataset.amount;
        let descText = '';
        
        switch(amount) {
          case '5':
            descText = 'Your $5 donation will provide 250 hours of learning to people around the world each month.';
            break;
          case '10':
            descText = 'Your $10 donation will provide 500 hours of learning to people around the world each month.';
            break;
          case '20':
            descText = 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.';
            break;
          case '40':
            descText = 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.';
            break;
        }
        
        donationDesc.textContent = descText;
        donateSub.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
      });
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
      });
    });
  }

  // Load More Articles on Home
  const loadMoreBtn = document.getElementById('load-more-btn');
  const articleGrid = document.getElementById('article-grid');
  
  if (loadMoreBtn && articleGrid) {
    loadMoreBtn.addEventListener('click', () => {
      // Create some dummy articles
      const newArticles = [
        { tag: 'React', title: 'A Complete Guide to React useEffect Hook', author: 'Jane Doe', time: '2 days ago' },
        { tag: 'CSS', title: 'Understanding CSS Grid: A Comprehensive Tutorial', author: 'John Smith', time: '3 days ago' },
        { tag: 'JavaScript', title: '10 Array Methods You Should Know', author: 'Alice Johnson', time: '4 days ago' }
      ];
      
      newArticles.forEach(article => {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML = `
          <div class="article-thumb"></div>
          <div class="article-content">
            <span class="article-tag">#${article.tag}</span>
            <h3 class="article-title"><a href="#">${article.title}</a></h3>
            <div class="article-meta">
              <div class="author-avatar">${article.author.charAt(0)}</div>
              <div class="author-info">
                <span class="author-name">${article.author}</span>
                <span class="article-time">${article.time}</span>
              </div>
            </div>
          </div>
        `;
        articleGrid.appendChild(card);
      });
      
      // Optionally remove button after one click for demo purposes
      // loadMoreBtn.style.display = 'none';
    });
  }

});
